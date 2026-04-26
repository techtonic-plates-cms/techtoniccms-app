import type { Handle, RequestEvent } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { getTextDirection } from '$lib/paraglide/runtime';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { gqlFetch } from '$lib/server/gql';
import { ME_QUERY, REFRESH_MUTATION } from '$lib/server/auth.operations';
import type {
	MeQuery,
	MeQueryVariables,
	RefreshMutation,
	RefreshMutationVariables
} from 'techtonic-client-gql';
import {
	getAccessToken,
	getAccessTokenExpiresAt,
	getRefreshToken,
	getRefreshTokenExpiresAt,
	setAuthCookies,
	clearAuthCookies
} from '$lib/server/auth.cookies';

async function tryRefresh(event: RequestEvent): Promise<void> {
	const refreshTokenValue = getRefreshToken(event.cookies);
	if (!refreshTokenValue) return;

	try {
		const result = await gqlFetch<RefreshMutation, RefreshMutationVariables>(REFRESH_MUTATION, {
			refreshToken: refreshTokenValue
		});
		const { accessToken, refreshToken } = result.auth.refresh;
		setAuthCookies(event.cookies, {
			accessToken: accessToken.tokenValue,
			accessTokenExpiresAt: accessToken.expiresAt,
			refreshToken: refreshToken.tokenValue,
			refreshTokenExpiresAt: refreshToken.expiresAt
		});

		const me = await gqlFetch<MeQuery, MeQueryVariables>(
			ME_QUERY,
			{},
			{ token: accessToken.tokenValue }
		);
		event.locals.user = me.auth.me ?? null;
		event.locals.accessToken = {
			tokenValue: accessToken.tokenValue,
			expiresAt: accessToken.expiresAt
		};
		event.locals.refreshToken = {
			tokenValue: refreshToken.tokenValue,
			expiresAt: refreshToken.expiresAt
		};
	} catch (err) {
		console.error('[auth] tryRefresh failed:', err);
		clearAuthCookies(event.cookies);
	}
}

const handleAuth: Handle = async ({ event, resolve }) => {
	event.locals.user = null;
	event.locals.accessToken = null;
	event.locals.refreshToken = null;

	const accessTokenValue = getAccessToken(event.cookies);
	const refreshTokenValue = getRefreshToken(event.cookies);

	console.log(
		'[auth] cookies present — access:',
		!!accessTokenValue,
		'refresh:',
		!!refreshTokenValue
	);

	if (accessTokenValue) {
		try {
			const result = await gqlFetch<MeQuery, MeQueryVariables>(
				ME_QUERY,
				{},
				{ token: accessTokenValue }
			);
			event.locals.user = result.auth.me ?? null;
			event.locals.accessToken = {
				tokenValue: accessTokenValue,
				expiresAt: getAccessTokenExpiresAt(event.cookies)
			};
			event.locals.refreshToken = refreshTokenValue
				? { tokenValue: refreshTokenValue, expiresAt: getRefreshTokenExpiresAt(event.cookies) }
				: null;
		} catch (err) {
			console.error('[auth] ME_QUERY failed (token present):', err);
			if (refreshTokenValue) {
				await tryRefresh(event);
			} else {
				clearAuthCookies(event.cookies);
			}
		}
	} else if (refreshTokenValue) {
		await tryRefresh(event);
	}

	return resolve(event);
};

const handleParaglide: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html
					.replace('%paraglide.lang%', locale)
					.replace('%paraglide.dir%', getTextDirection(locale))
		});
	});

export const handle: Handle = sequence(handleAuth, handleParaglide);
