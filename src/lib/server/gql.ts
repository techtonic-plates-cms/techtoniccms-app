import { GraphQLClient } from 'graphql-request';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';

export { ClientError } from 'graphql-request';

export function createClient(token?: string | null): GraphQLClient {
	return new GraphQLClient(env.API_URL + '/graphql', {
		headers: token ? { Authorization: `Bearer ${token}` } : {}
	});
}

export async function gqlFetch<TResult, TVariables extends Record<string, unknown>>(
	document: unknown,
	variables?: TVariables,
	options?: { token?: string | null }
): Promise<TResult> {
	const client = createClient(options?.token);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return client.request<TResult>(document as any, variables as Record<string, unknown>);
}

export function isForbiddenError(err: unknown): boolean {
	if (!(err instanceof Error)) return false;
	const response = (err as { response?: { errors?: Array<{ extensions?: { code?: string } }> } })
		.response;
	if (!response?.errors) return false;
	return response.errors.some((e) => e.extensions?.code === 'FORBIDDEN');
}

export function handleGraphQLError(err: unknown): never {
	if (isForbiddenError(err)) {
		error(403, 'Permission denied');
	}
	throw err;
}
