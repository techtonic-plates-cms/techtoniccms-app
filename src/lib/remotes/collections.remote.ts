import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch } from '$lib/server/gql';
import * as v from 'valibot';
import { redirect } from '@sveltejs/kit';

export type CollectionField = {
	id: string;
	name: string;
	label: string | null;
	dataType: string;
	isRequired: boolean;
	isUnique: boolean;
	defaultValue: string | null;
	description: string | null;
	helpText: string | null;
	relatedCollectionId: string | null;
	relatedCollection: { id: string; name: string; slug: string } | null;
};

export type IconAsset = {
	id: string;
	url: string;
	filename: string;
};

export type Collection = {
	id: string;
	name: string;
	slug: string;
	icon: IconAsset | null;
	color: string | null;
	description: string | null;
	entryCount: number;
	isLocalized: boolean;
	defaultLocale: string;
	supportedLocales: string[];
	createdAt: string | null;
	updatedAt: string | null;
	fields: CollectionField[];
};


const COLLECTIONS_QUERY = `
	query Collections {
		collections {
			collectionsData {
				nodes {
					id name slug color description entryCount
					isLocalized defaultLocale createdAt
					icon { id url filename }
					fields { id }
				}
			}
		}
	}
`;

const COLLECTION_QUERY = `
	query Collection($slug: String) {
		collections {
			collectionData(slug: $slug) {
				id name slug color description entryCount
				isLocalized defaultLocale supportedLocales createdAt updatedAt
				icon { id url filename }
				fields {
					id name label dataType isRequired isUnique
					defaultValue description helpText relatedCollectionId
				}
			}
		}
	}
`;

const CREATE_COLLECTION_MUTATION = `
	mutation CreateCollection($input: CreateCollectionInput!) {
		collections {
			create(input: $input) { id slug }
		}
	}
`;

const DELETE_COLLECTION_MUTATION = `
	mutation DeleteCollection($id: UUID!) {
		collections {
			delete(id: $id)
		}
	}
`;

const UPDATE_COLLECTION_MUTATION = `
	mutation UpdateCollection($input: UpdateCollectionInput!) {
		collections {
			update(input: $input) { id slug }
		}
	}
`;

export const getCollections = query(async () => {
	const { locals } = getRequestEvent();
	const token = locals.accessToken?.tokenValue;
	const result = await gqlFetch<
		{ collections: { collectionsData: { nodes: Array<Omit<Collection, 'supportedLocales' | 'updatedAt' | 'fields'> & { fields: Array<{ id: string }> }> } } },
		Record<string, never>
	>(COLLECTIONS_QUERY, {}, { token });
	return result.collections.collectionsData?.nodes ?? [];
});

export const getCollection = query(
	v.object({
		slug: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ slug }) => {
		const { locals } = getRequestEvent();
		const token = locals.accessToken?.tokenValue;
		const result = await gqlFetch<
			{ collections: { collectionData: Collection | null } },
			{ slug: string }
		>(COLLECTION_QUERY, { slug }, { token });
		return result.collections.collectionData;
	}
);

export const createCollection = form(
	v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required')),
		slug: v.pipe(v.string(), v.nonEmpty('Slug is required')),
		description: v.optional(v.string()),
		icon: v.optional(v.string()),
		color: v.optional(v.string()),
		isLocalized: v.optional(v.string()),
		defaultLocale: v.optional(v.string()),
		fields: v.optional(v.string()),
		supportedLocales: v.optional(v.string())
	}),
	async ({ name, slug, description, icon, color, isLocalized, defaultLocale, fields, supportedLocales }) => {
		const { locals } = getRequestEvent();
		try {
			let parsedFields: Array<Record<string, unknown>> = [];
			if (fields) {
				try {
					const draftFields = JSON.parse(fields) as Array<{ dataType: string; relatedCollectionId?: string; [key: string]: unknown }>;
					parsedFields = draftFields.map(f => ({
						name: f.name,
						label: f.label || undefined,
						isRequired: f.isRequired,
						isUnique: f.isUnique,
						defaultValue: f.defaultValue || undefined,
						description: f.description || undefined,
						helpText: f.helpText || undefined,
						validationRules: f.validationRules || undefined,
						config: f.dataType === 'RELATION'
							? { relation: { relatedCollectionId: f.relatedCollectionId } }
							: { simple: { dataType: f.dataType } }
					}));
				} catch {
					// Silently ignore malformed JSON — collection still created without fields
				}
			}

			const result = await gqlFetch<
				{ collections: { create: { id: string; slug: string } } },
				{ input: Record<string, unknown> }
			>(CREATE_COLLECTION_MUTATION, {
				input: {
					name,
					slug,
					description: description || undefined,
					icon: icon || undefined,
					color: color || undefined,
					isLocalized: isLocalized === 'on',
					defaultLocale: defaultLocale || 'EN',
					supportedLocales: supportedLocales ? supportedLocales.split(',').filter(Boolean) : undefined,
					fields: parsedFields.length > 0 ? parsedFields : undefined
				}
			}, { token: locals.accessToken?.tokenValue });

			getCollections().refresh();
			redirect(303, `/collections/${result.collections.create.slug}`);
		} catch (err) {
			if ((err as { status?: number }).status) throw err;
			throw err;
		}
	}
);

export const deleteCollection = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { id: string }>(
			DELETE_COLLECTION_MUTATION,
			{ id },
			{ token: locals.accessToken?.tokenValue }
		);
		getCollections().refresh();
		redirect(303, '/collections');
	}
);

export const updateCollectionMeta = form(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty()),
		name: v.optional(v.string()),
		description: v.optional(v.string()),
		icon: v.optional(v.string()),
		color: v.optional(v.string())
	}),
	async ({ id, name, description, icon, color }) => {
		const { locals } = getRequestEvent();
		const result = await gqlFetch<
			{ collections: { update: { id: string; slug: string } } },
			{ input: Record<string, unknown> }
		>(UPDATE_COLLECTION_MUTATION, {
			input: { id, name: name || undefined, description: description || undefined, icon: icon || undefined, color: color || undefined }
		}, { token: locals.accessToken?.tokenValue });
		getCollection({slug: result.collections.update.slug}).refresh();
		redirect(303, `/collections/${result.collections.update.slug}/settings`);
	}
);

export const addCollectionField = form(
	v.object({
		collectionId: v.pipe(v.string(), v.nonEmpty()),
		collectionSlug: v.pipe(v.string(), v.nonEmpty()),
		name: v.pipe(v.string(), v.nonEmpty('Field name is required')),
		label: v.optional(v.string()),
		dataType: v.pipe(v.string(), v.nonEmpty('Data type is required')),
		isRequired: v.optional(v.string()),
		isUnique: v.optional(v.string()),
		defaultValue: v.optional(v.string()),
		description: v.optional(v.string()),
		helpText: v.optional(v.string()),
		relatedCollectionId: v.optional(v.string())
	}),
	async ({ collectionId, collectionSlug, name, label, dataType, isRequired, isUnique, defaultValue, description, helpText, relatedCollectionId }) => {
		const { locals } = getRequestEvent();
		const isRelation = dataType === 'RELATION';
		const config = isRelation
			? { relation: { relatedCollectionId: relatedCollectionId! } }
			: { simple: { dataType } };
		await gqlFetch<unknown, { input: Record<string, unknown> }>(
			UPDATE_COLLECTION_MUTATION,
			{
				input: {
					id: collectionId,
					fields: [{
						name,
						label: label || undefined,
						dataType: isRelation ? undefined : dataType,
						isRequired: isRequired === 'on',
						isUnique: isUnique === 'on',
						defaultValue: defaultValue || undefined,
						description: description || undefined,
						helpText: helpText || undefined,
						relatedCollectionId: relatedCollectionId || undefined,
						config
					}]
				}
			},
			{ token: locals.accessToken?.tokenValue }
		);

		getCollection({slug: collectionSlug}).refresh();
		redirect(303, `/collections/${collectionSlug}/settings`);
	}
);

export const deleteCollectionField = form(
	v.object({
		collectionId: v.pipe(v.string(), v.nonEmpty()),
		collectionSlug: v.pipe(v.string(), v.nonEmpty()),
		fieldId: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ collectionId, collectionSlug, fieldId }) => {
		const { locals } = getRequestEvent();
		await gqlFetch<unknown, { input: Record<string, unknown> }>(
			UPDATE_COLLECTION_MUTATION,
			{ input: { id: collectionId, deleteFieldIds: [fieldId] } },
			{ token: locals.accessToken?.tokenValue }
		);
		getCollection({slug: collectionSlug}).refresh();
		redirect(303, `/collections/${collectionSlug}/settings`);
	}
);
