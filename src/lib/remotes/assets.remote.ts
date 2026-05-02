import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch, handleGraphQLError, handleGraphQLErrorForm } from '$lib/server/gql';
import * as v from 'valibot';
import { redirect } from '@sveltejs/kit';
import type { AssetsComboboxQuery, GetAssetsQuery, AssetsComboboxQueryVariables, GetAssetsQueryVariables } from 'techtonic-client-gql';
import { graphql } from 'techtonic-client-gql';

const ASSETS_QUERY = graphql(`
	query GetAssets($first: Int, $after: String) {
		assets {
			assets(first: $first, after: $after) {
				nodes {
					id filename mimeType fileSize url alt caption isPublic uploadedAt
					uploadedByUser { id name }
				}
				pageInfo { hasNextPage endCursor }
			}
		}
	}
`);

const ASSETS_COMBOBOX_QUERY = graphql(`
	query AssetsCombobox($search: String, $first: Int) {
		assets {
			assets(first: $first, where: {
				or: [
					{ filename: { contains: $search } }
					{ caption: { contains: $search } }
				]
			}) {
				nodes { id filename caption }
			}
		}
	}
`);

const UPDATE_ASSET_MUTATION = graphql(`
	mutation UpdateAsset($input: UpdateAssetInput!) {
		assets {
			update(input: $input) { id filename alt caption isPublic }
		}
	}
`);

const DELETE_ASSET_MUTATION = graphql(`
	mutation DeleteAsset($id: UUID!) {
		assets {
			delete(id: $id)
		}
	}
`);

export const getAssets = query(
	v.object({
		after: v.optional(v.string())
	}),
	async ({ after }) => {
		const { locals } = getRequestEvent();
		try {
			const result = await gqlFetch<GetAssetsQuery, GetAssetsQueryVariables>(
				ASSETS_QUERY,
				{ first: 24, after },
				{ token: locals.accessToken?.tokenValue }
			);
			return (
				result.assets.assets ?? { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } }
			);
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const getAssetsForCombobox = query(
	v.object({ search: v.optional(v.string()) }),
	async ({ search }) => {
		const { locals } = getRequestEvent();
		try {
			const result = await gqlFetch<AssetsComboboxQuery, AssetsComboboxQueryVariables>(
				ASSETS_COMBOBOX_QUERY,
				{ search: search ?? '', first: 20 },
				{ token: locals.accessToken?.tokenValue }
			);
			return result.assets.assets?.nodes ?? [];
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const updateAsset = form(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty()),
		alt: v.optional(v.string()),
		caption: v.optional(v.string()),
		isPublic: v.optional(v.string())
	}),
	async ({ id, alt, caption, isPublic }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch(
				UPDATE_ASSET_MUTATION,
				{
					input: {
						id,
						alt: alt || undefined,
						caption: caption || undefined,
						isPublic: isPublic === 'on'
					}
				},
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, '/assets');
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const deleteAsset = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch(
				DELETE_ASSET_MUTATION,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, '/assets');
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);
