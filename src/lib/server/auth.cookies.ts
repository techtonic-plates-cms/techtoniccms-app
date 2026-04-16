import { dev } from '$app/environment';
import type { Cookies } from '@sveltejs/kit';

export const ACCESS_TOKEN_COOKIE = 'access_token';
export const ACCESS_TOKEN_EXPIRES_AT_COOKIE = 'access_token_expires_at';
export const REFRESH_TOKEN_COOKIE = 'refresh_token';
export const REFRESH_TOKEN_EXPIRES_AT_COOKIE = 'refresh_token_expires_at';

const BASE_OPTIONS = {
	httpOnly: true,
	sameSite: 'lax' as const,
	path: '/',
	secure: !dev
};

function isoToMaxAge(iso: string): number | null {
	const ms = new Date(iso).getTime();
	if (!isFinite(ms)) return null;
	const secs = Math.floor((ms - Date.now()) / 1000);
	return secs > 0 ? secs : null;
}

export function setAuthCookies(
	cookies: Cookies,
	tokens: {
		accessToken: string;
		accessTokenExpiresAt?: string | null;
		refreshToken?: string;
		refreshTokenExpiresAt?: string | null;
	}
): void {
	const accessMaxAge =
		(tokens.accessTokenExpiresAt ? isoToMaxAge(tokens.accessTokenExpiresAt) : null) ?? 60 * 14;

	cookies.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
		...BASE_OPTIONS,
		maxAge: accessMaxAge
	});

	if (tokens.accessTokenExpiresAt) {
		cookies.set(
			ACCESS_TOKEN_EXPIRES_AT_COOKIE,
			String(new Date(tokens.accessTokenExpiresAt).getTime()),
			{ ...BASE_OPTIONS, maxAge: accessMaxAge }
		);
	}

	if (tokens.refreshToken) {
		const refreshMaxAge =
			(tokens.refreshTokenExpiresAt ? isoToMaxAge(tokens.refreshTokenExpiresAt) : null) ??
			60 * 60 * 24 * 7;

		cookies.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
			...BASE_OPTIONS,
			maxAge: refreshMaxAge
		});

		if (tokens.refreshTokenExpiresAt) {
			cookies.set(
				REFRESH_TOKEN_EXPIRES_AT_COOKIE,
				String(new Date(tokens.refreshTokenExpiresAt).getTime()),
				{ ...BASE_OPTIONS, maxAge: refreshMaxAge }
			);
		}
	}
}

export function clearAuthCookies(cookies: Cookies): void {
	cookies.delete(ACCESS_TOKEN_COOKIE, { path: '/' });
	cookies.delete(ACCESS_TOKEN_EXPIRES_AT_COOKIE, { path: '/' });
	cookies.delete(REFRESH_TOKEN_COOKIE, { path: '/' });
	cookies.delete(REFRESH_TOKEN_EXPIRES_AT_COOKIE, { path: '/' });
}

export function getAccessToken(cookies: Cookies): string | null {
	return cookies.get(ACCESS_TOKEN_COOKIE) ?? null;
}

export function getRefreshToken(cookies: Cookies): string | null {
	return cookies.get(REFRESH_TOKEN_COOKIE) ?? null;
}

export function getAccessTokenExpiresAt(cookies: Cookies): number | null {
	const raw = cookies.get(ACCESS_TOKEN_EXPIRES_AT_COOKIE);
	return raw ? Number(raw) : null;
}

export function getRefreshTokenExpiresAt(cookies: Cookies): number | null {
	const raw = cookies.get(REFRESH_TOKEN_EXPIRES_AT_COOKIE);
	return raw ? Number(raw) : null;
}
