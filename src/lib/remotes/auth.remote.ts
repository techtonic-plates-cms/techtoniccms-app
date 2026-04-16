import * as v from 'valibot';
import { redirect, invalid } from '@sveltejs/kit';
import { getRequestEvent, query, form, command } from '$app/server';
import { gqlFetch } from '$lib/server/gql';
import { LOGIN_MUTATION, LOGOUT_MUTATION, REFRESH_MUTATION } from '$lib/server/auth.operations';
import type {
	LoginMutation,
	LoginMutationVariables,
	LogoutMutation,
	LogoutMutationVariables,
	RefreshMutation,
	RefreshMutationVariables
} from 'techtonic-client-gql';
import { setAuthCookies, clearAuthCookies } from '$lib/server/auth.cookies';

/**
 * Returns the current user and token info, redirecting to /login if not authenticated.
 * Token refresh is handled upstream in hooks.server.ts before this runs.
 * Use this in protected layouts and pages.
 */
export const requireAuth = query(async () => {
	const { locals, url } = getRequestEvent();
	if (!locals.user) {
		redirect(302, `/login?redirectTo=${encodeURIComponent(url.pathname)}`);
	}
	return { user: locals.user, accessToken: locals.accessToken };
});

/**
 * Returns the current user or null — no redirect.
 * Use this on public pages (e.g. login) that need to check auth state.
 */
export const getMe = query(async () => {
	return getRequestEvent().locals.user ?? null;
});

/**
 * Proactively refreshes the access token using the stored refresh token cookie.
 * Returns the new accessToken, or null if the refresh failed.
 * Call this client-side before the access token expires to maintain the session.
 */
export const refreshAuth = command(async () => {
	const { cookies, locals } = getRequestEvent();
	if (!locals.refreshToken) return null;

	try {
		const result = await gqlFetch<RefreshMutation, RefreshMutationVariables>(
			REFRESH_MUTATION,
			{ refreshToken: locals.refreshToken.tokenValue }
		);
		const { accessToken, refreshToken } = result.auth.refresh;
		setAuthCookies(cookies, {
			accessToken: accessToken.tokenValue,
			accessTokenExpiresAt: accessToken.expiresAt,
			refreshToken: refreshToken.tokenValue,
			refreshTokenExpiresAt: refreshToken.expiresAt
		});
		locals.accessToken = { tokenValue: accessToken.tokenValue, expiresAt: accessToken.expiresAt };
		locals.refreshToken = { tokenValue: refreshToken.tokenValue, expiresAt: refreshToken.expiresAt };
		return { accessToken: locals.accessToken };
	} catch {
		return null;
	}
});

/**
 * Login form — validates credentials, sets auth cookies, redirects on success.
 * The _password field prefix prevents the value from being sent back to the client.
 */
export const login = form(
	v.object({
		name: v.pipe(v.string(), v.nonEmpty('Username is required')),
		_password: v.pipe(v.string(), v.nonEmpty('Password is required'))
	}),
	async ({ name, _password }) => {
		const { cookies, url } = getRequestEvent();
		try {
			const result = await gqlFetch<LoginMutation, LoginMutationVariables>(
				LOGIN_MUTATION,
				{ name, password: _password }
			);
			//console.log('Login result:', result);
			setAuthCookies(cookies, {
				accessToken: result.auth.login.accessToken.tokenValue,
				accessTokenExpiresAt: result.auth.login.accessToken.expiresAt,
				refreshToken: result.auth.login.refreshToken.tokenValue,
				refreshTokenExpiresAt: result.auth.login.refreshToken.expiresAt
			});
			const redirectTo = url.searchParams.get('redirectTo') ?? '/';
			redirect(303, redirectTo.startsWith('/') ? redirectTo : '/');
		} catch (err) {
			//console.log(err);
			// Re-throw SvelteKit redirects
			if (err instanceof Response || (err as { status?: number }).status !== undefined) {
				throw err;
			}
			invalid('Invalid username or password');
		}
	}
);

/**
 * Logout form — clears auth cookies and redirects to login.
 */
export const logout = form(v.object({}), async () => {
	const { cookies, locals } = getRequestEvent();
	if (locals.accessToken) {
		try {
			await gqlFetch<LogoutMutation, LogoutMutationVariables>(
				LOGOUT_MUTATION,
				{},
				{ token: locals.accessToken.tokenValue }
			);
		} catch {
			// Best-effort — clear cookies regardless
		}
	}
	clearAuthCookies(cookies);
	redirect(303, '/login');
});
