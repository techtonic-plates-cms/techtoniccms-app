// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
import type { MeQuery } from 'techtonic-client-gql';

type AuthUser = NonNullable<MeQuery['auth']['me']>;

declare global {
	namespace App {
		// interface Error {}
		interface AuthToken {
			tokenValue: string;
			expiresAt: number | null; // Unix ms timestamp
		}
		interface Locals {
			user: AuthUser | null;
			accessToken: AuthToken | null;
			refreshToken: AuthToken | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
