import { GraphQLClient } from 'graphql-request';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { env } from '$env/dynamic/private';
import { error, invalid, redirect } from '@sveltejs/kit';

export { ClientError } from 'graphql-request';

export function createClient(token?: string | null): GraphQLClient {
	return new GraphQLClient(env.API_URL + '/graphql', {
		headers: token ? { Authorization: `Bearer ${token}` } : {}
	});
}

export async function gqlFetch<TResult, TVariables extends Record<string, unknown>>(
	document: TypedDocumentNode<TResult, TVariables> | string,
	variables?: TVariables,
	options?: { token?: string | null }
): Promise<TResult> {
	const client = createClient(options?.token);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	return client.request<TResult>(document as any, variables as Record<string, unknown>);
}

function getGraphQLErrors(
	err: unknown
): Array<{ message: string; extensions?: { code?: string } }> | undefined {
	if (!(err instanceof Error)) return undefined;
	const response = (
		err as { response?: { errors?: Array<{ message: string; extensions?: { code?: string } }> } }
	).response;
	return response?.errors;
}

export function getGraphQLErrorCode(err: unknown): string | undefined {
	return getGraphQLErrors(err)?.[0]?.extensions?.code;
}

export function getGraphQLErrorMessages(err: unknown): string[] {
	return getGraphQLErrors(err)?.map((e) => e.message) ?? [];
}

export function isForbiddenError(err: unknown): boolean {
	return getGraphQLErrorCode(err) === 'FORBIDDEN';
}

export function handleGraphQLError(err: unknown): never {
	const code = getGraphQLErrorCode(err);
	const messages = getGraphQLErrorMessages(err);
	const message = messages[0] ?? 'An error occurred';

	switch (code) {
		case 'UNAUTHENTICATED':
			error(401, 'Session expired');
			break;
		case 'FORBIDDEN':
			error(403, 'Permission denied');
			break;
		case 'NOT_FOUND':
			error(404, 'Resource not found');
			break;
		case 'CONFLICT':
			error(409, message);
			break;
		case 'BAD_REQUEST':
		case 'INVALID_ENUM':
			error(400, message);
			break;
		default:
			error(500, message);
	}
}

export function handleGraphQLErrorForm(err: unknown): never {
	const code = getGraphQLErrorCode(err);
	const messages = getGraphQLErrorMessages(err);
	const message = messages[0] ?? 'An error occurred';

	switch (code) {
		case 'UNAUTHENTICATED':
			redirect(303, '/login');
			break;
		case 'FORBIDDEN':
			invalid('Permission denied');
			break;
		case 'NOT_FOUND':
			invalid('Resource not found');
			break;
		case 'CONFLICT':
		case 'BAD_REQUEST':
		case 'INVALID_ENUM':
			invalid(message);
			break;
		default:
			invalid(message);
	}
}
