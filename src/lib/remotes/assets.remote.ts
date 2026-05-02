import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch, handleGraphQLError, handleGraphQLErrorForm } from '$lib/server/gql';
import * as v from 'valibot';
import { redirect } from '@sveltejs/kit';

export type Asset = {
	id: string;
	filename: string;
	mimeType: string;
	fileSize: number;
	url: string;
	alt: string | null;
	caption: string | null;
	isPublic: boolean;
	uploadedAt: string;
	uploadedByUser: { id: string; name: string } | null;
};

const ASSETS_QUERY = `
	query Assets($first: Int, $after: String) {
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
`;

const ASSETS_COMBOBOX_QUERY = `
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
`;

const UPDATE_ASSET_MUTATION = `
	mutation UpdateAsset($input: UpdateAssetInput!) {
		assets {
			update(input: $input) { id filename alt caption isPublic }
		}
	}
`;

const DELETE_ASSET_MUTATION = `
	mutation DeleteAsset($id: UUID!) {
		assets {
			delete(id: $id)
		}
	}
`;

export const getAssets = query(
	v.object({
		after: v.optional(v.string())
	}),
	async ({ after }) => {
		const { locals } = getRequestEvent();
		try {
			const result = await gqlFetch<
				{
					assets: {
						assets: {
							nodes: Asset[];
							pageInfo: { hasNextPage: boolean; endCursor: string | null };
						};
					};
				},
				{ first: number; after?: string }
			>(ASSETS_QUERY, { first: 24, after }, { token: locals.accessToken?.tokenValue });
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
			const result = await gqlFetch<
				{
					assets: {
						assets: { nodes: Array<{ id: string; filename: string; caption: string | null }> };
					};
				},
				{ search?: string; first: number }
			>(
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
			await gqlFetch<unknown, { input: Record<string, unknown> }>(
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
			await gqlFetch<unknown, { id: string }>(
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
