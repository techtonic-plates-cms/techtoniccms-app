import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch, handleGraphQLError, handleGraphQLErrorForm } from '$lib/server/gql';
import * as v from 'valibot';
import { redirect } from '@sveltejs/kit';
import { graphql } from 'techtonic-client-gql';
import type {GetApiKeyQuery, GetApiKeysQuery, GetApiKeyQueryVariables,  GetApiKeysQueryVariables, CreateApiKeyMutation, CreateApiKeyMutationVariables, RevokeApiKeyMutation, RevokeApiKeyMutationVariables, DeleteApiKeyMutation, DeleteApiKeyMutationVariables } from 'techtonic-client-gql';

function toDateTime(value: string | undefined): string | undefined {
	if (!value) return undefined;
	// datetime-local yields YYYY-MM-DDTHH:mm or YYYY-MM-DDTHH:mm:ss
	// Append seconds and Z to form a valid ISO-8601 DateTime
	if (value.length === 16) return value + ':00Z';
	if (!value.endsWith('Z')) return value + 'Z';
	return value;
}

const API_KEYS_QUERY = graphql(`
	query GetApiKeys($first: Int, $after: String) {
		apiKeys {
			apiKeys(first: $first, after: $after) {
				nodes {
					id name keyPrefix isActive createdAt updatedAt expiresAt lastUsedAt
				}
				pageInfo { hasNextPage endCursor }
			}
		}
	}
`);

const API_KEY_QUERY = graphql(`
	query GetApiKey($id: UUID!) {
		apiKeys {
			apiKey(id: $id) {
				id name keyPrefix isActive createdAt updatedAt expiresAt lastUsedAt
			}
		}
	}
`);

const CREATE_API_KEY_MUTATION = graphql(`
	mutation CreateApiKey($input: CreateApiKeyInput!) {
		apiKeys {
			createApiKey(input: $input) {
				apiKey { id }
				key
			}
		}
	}
`);

const UPDATE_API_KEY_MUTATION = graphql(`
	mutation UpdateApiKey($input: UpdateApiKeyInput!) {
		apiKeys {
			updateApiKey(input: $input) { id name isActive }
		}
	}
`);

const REVOKE_API_KEY_MUTATION = graphql(`
	mutation RevokeApiKey($id: UUID!) {
		apiKeys {
			revokeApiKey(id: $id) { id isActive }
		}
	}
`);

const DELETE_API_KEY_MUTATION = graphql(`
	mutation DeleteApiKey($id: UUID!) {
		apiKeys { deleteApiKey(id: $id) }
	}
`);

export const getApiKeys = query(
	v.object({
		after: v.optional(v.string())
	}),
	async ({ after }) => {
		const { locals } = getRequestEvent();
		try {
			const result = await gqlFetch<GetApiKeysQuery, GetApiKeysQueryVariables>(
				API_KEYS_QUERY,
				{ first: 25, after },
				{ token: locals.accessToken?.tokenValue }
			);
			return (
				result.apiKeys.apiKeys ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } }
			);
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const getApiKey = query(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			const result = await gqlFetch<GetApiKeyQuery, GetApiKeyQueryVariables>(API_KEY_QUERY, { id }, { token: locals.accessToken?.tokenValue });
			return result?.apiKeys.apiKey;
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const createApiKey = form(
	v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required')),
		expiresAt: v.optional(v.string())
	}),
	async ({ name, expiresAt }) => {
		const { locals } = getRequestEvent();
		try {
			const result = await gqlFetch<CreateApiKeyMutation, CreateApiKeyMutationVariables>(
				CREATE_API_KEY_MUTATION,
				{ input: { name, expiresAt: toDateTime(expiresAt) } },
				{ token: locals.accessToken?.tokenValue }
			);
			const { apiKey, key } = result.apiKeys.createApiKey;
			redirect(303, `/settings/api-keys/${apiKey!.id}?key=${encodeURIComponent(key)}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const updateApiKey = form(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty()),
		name: v.optional(v.string()),
		expiresAt: v.optional(v.string()),
		isActive: v.optional(v.string())
	}),
	async ({ id, name, expiresAt, isActive }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch(
				UPDATE_API_KEY_MUTATION,
				{
					input: {
						id,
						name: name || undefined,
						expiresAt: toDateTime(expiresAt),
						isActive: isActive !== undefined ? isActive === 'true' : undefined
					}
				},
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/api-keys/${id}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const revokeApiKey = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<RevokeApiKeyMutation, RevokeApiKeyMutationVariables>(
				REVOKE_API_KEY_MUTATION,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/settings/api-keys/${id}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const deleteApiKey = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<DeleteApiKeyMutation, DeleteApiKeyMutationVariables>(
				DELETE_API_KEY_MUTATION,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, '/settings/api-keys');
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);
