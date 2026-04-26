import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch } from '$lib/server/gql';
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
	query Assets($limit: Int, $offset: Int) {
		assets {
			assets(limit: $limit, offset: $offset) {
				id filename mimeType fileSize url alt caption isPublic uploadedAt
				uploadedByUser { id name }
			}
		}
	}
`;

const ASSETS_COMBOBOX_QUERY = `
	query AssetsCombobox($search: String, $limit: Int) {
		assets {
			assets(limit: $limit, where: {
				or: [
					{ filename: { contains: $search } }
					{ caption: { contains: $search } }
				]
			}) {
				id filename caption
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
		offset: v.optional(
			v.pipe(
				v.string(),
				v.transform((s) => parseInt(s, 10))
			)
		)
	}),
	async ({ offset }) => {
		const { locals } = getRequestEvent();
		const result = await gqlFetch<
			{ assets: { assets: Asset[] } },
			{ limit: number; offset: number }
		>(ASSETS_QUERY, { limit: 24, offset: offset ?? 0 }, { token: locals.accessToken?.tokenValue });
		return result.assets.assets ?? [];
	}
);

export const getAssetsForCombobox = query(
	v.object({ search: v.optional(v.string()) }),
	async ({ search }) => {
		const { locals } = getRequestEvent();
		const result = await gqlFetch<
			{ assets: { assets: Array<{ id: string; filename: string; caption: string | null }> } },
			{ search?: string; limit: number }
		>(
			ASSETS_COMBOBOX_QUERY,
			{ search: search ?? '', limit: 20 },
			{ token: locals.accessToken?.tokenValue }
		);
		return result.assets.assets ?? [];
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
	}
);

export const deleteAsset = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { id: string }>(
			DELETE_ASSET_MUTATION,
			{ id },
			{ token: locals.accessToken?.tokenValue }
		);
		redirect(303, '/assets');
	}
);
