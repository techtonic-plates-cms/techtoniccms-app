import { GraphQLClient } from 'graphql-request';
import { GRAPHQL_API_URL } from '$env/static/private';

export { ClientError } from 'graphql-request';

export function createClient(token?: string | null): GraphQLClient {
	return new GraphQLClient(GRAPHQL_API_URL, {
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
