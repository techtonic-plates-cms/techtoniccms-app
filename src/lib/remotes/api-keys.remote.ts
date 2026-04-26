import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch } from '$lib/server/gql';
import * as v from 'valibot';
import { redirect } from '@sveltejs/kit';

export type ApiKey = {
	id: string;
	name: string;
	keyPrefix: string;
	isActive: boolean;
	createdAt: string;
	updatedAt: string;
	expiresAt?: string | null;
	lastUsedAt?: string | null;
};

const API_KEYS_QUERY = `
	query ApiKeys($first: Int, $after: String) {
		apiKeys {
			apiKeys(first: $first, after: $after) {
				nodes {
					id name keyPrefix isActive createdAt expiresAt lastUsedAt
				}
				pageInfo { hasNextPage endCursor }
			}
		}
	}
`;

const API_KEY_QUERY = `
	query ApiKey($id: UUID!) {
		apiKeys {
			apiKey(id: $id) {
				id name keyPrefix isActive createdAt updatedAt expiresAt lastUsedAt
			}
		}
	}
`;

const CREATE_API_KEY_MUTATION = `
	mutation CreateApiKey($input: CreateApiKeyInput!) {
		apiKeys {
			createApiKey(input: $input) {
				apiKey { id }
				key
			}
		}
	}
`;

const UPDATE_API_KEY_MUTATION = `
	mutation UpdateApiKey($input: UpdateApiKeyInput!) {
		apiKeys {
			updateApiKey(input: $input) { id name isActive }
		}
	}
`;

const REVOKE_API_KEY_MUTATION = `
	mutation RevokeApiKey($id: UUID!) {
		apiKeys {
			revokeApiKey(id: $id) { id isActive }
		}
	}
`;

const DELETE_API_KEY_MUTATION = `
	mutation DeleteApiKey($id: UUID!) {
		apiKeys { deleteApiKey(id: $id) }
	}
`;

export const getApiKeys = query(
	v.object({
		after: v.optional(v.string())
	}),
	async ({ after }) => {
		const { locals } = getRequestEvent();
		const result = await gqlFetch<
			{
				apiKeys: {
					apiKeys: {
						nodes: ApiKey[];
						pageInfo: { hasNextPage: boolean; endCursor: string | null };
					};
				};
			},
			Record<string, unknown>
		>(API_KEYS_QUERY, { first: 25, after }, { token: locals.accessToken?.tokenValue });
		return (
			result.apiKeys.apiKeys ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } }
		);
	}
);

export const getApiKey = query(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		const result = await gqlFetch<{ apiKeys: { apiKey: ApiKey | null } }, { id: string }>(
			API_KEY_QUERY,
			{ id },
			{ token: locals.accessToken?.tokenValue }
		);
		return result.apiKeys.apiKey;
	}
);

export const createApiKey = form(
	v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required')),
		expiresAt: v.optional(v.string())
	}),
	async ({ name, expiresAt }) => {
		const { locals } = getRequestEvent();
		const result = await gqlFetch<
			{ apiKeys: { createApiKey: { apiKey: { id: string }; key: string } } },
			{ input: Record<string, unknown> }
		>(
			CREATE_API_KEY_MUTATION,
			{
				input: {
					name,
					expiresAt: expiresAt || undefined
				}
			},
			{ token: locals.accessToken?.tokenValue }
		);
		const { apiKey, key } = result.apiKeys.createApiKey;
		redirect(303, `/settings/api-keys/${apiKey.id}?key=${encodeURIComponent(key)}`);
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
		await gqlFetch<unknown, { input: Record<string, unknown> }>(
			UPDATE_API_KEY_MUTATION,
			{
				input: {
					id,
					name: name || undefined,
					expiresAt: expiresAt || undefined,
					isActive: isActive !== undefined ? isActive === 'true' : undefined
				}
			},
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/api-keys/${id}`);
	}
);

export const revokeApiKey = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { id: string }>(
			REVOKE_API_KEY_MUTATION,
			{ id },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, `/settings/api-keys/${id}`);
	}
);

export const deleteApiKey = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { id: string }>(
			DELETE_API_KEY_MUTATION,
			{ id },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, '/settings/api-keys');
	}
);
