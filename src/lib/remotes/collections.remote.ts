import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch, handleGraphQLError, handleGraphQLErrorForm } from '$lib/server/gql';
import * as v from 'valibot';
import { redirect } from '@sveltejs/kit';
import { type FieldDefinitionInput, graphql, Locale, type GetCollectionQuery, type GetCollectionQueryVariables, type GetCollectionsQuery, type GetCollectionsQueryVariables, type CreateCollectionMutation, type CreateCollectionMutationVariables, type CollectionsComboboxQuery, type CollectionsComboboxQueryVariables, type UpdateCollectionMutation, type UpdateCollectionMutationVariables, FieldDataType } from 'techtonic-client-gql';

const COLLECTIONS_QUERY = graphql(`
	query GetCollections {
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
`);

const COLLECTIONS_COMBOBOX_QUERY = graphql(`
	query CollectionsCombobox($search: String) {
		collections {
			collectionsData(first: 20, where: { name: { contains: $search } }) {
				nodes { id name slug }
			}
		}
	}
`);

const COLLECTION_QUERY = graphql(`
	query GetCollection($slug: String) {
		collections {
			collectionData(slug: $slug) {
				id name slug color description entryCount
				isLocalized defaultLocale supportedLocales createdAt updatedAt
				icon { id url filename }
				fields {
					id name label dataType isRequired isUnique
					defaultValue description helpText relatedCollectionId 
					relatedCollection {
						color
						createdAt
						defaultLocale
						description
						entryCount
						id
						isLocalized
						name
						slug
						supportedLocales
						updatedAt
					}
				}
			}
		}
	}
`);

const CREATE_COLLECTION_MUTATION = graphql(`
	mutation CreateCollection($input: CreateCollectionInput!) {
		collections {
			create(input: $input) { id slug }
		}
	}
`);

const DELETE_COLLECTION_MUTATION = graphql(`
	mutation DeleteCollection($id: UUID!) {
		collections {
			delete(id: $id)
		}
	}
`);

const UPDATE_COLLECTION_MUTATION = graphql(`
	mutation UpdateCollection($input: UpdateCollectionInput!) {
		collections {
			update(input: $input) { id slug }
		}
	}
`);

export const getCollectionsForCombobox = query(
	v.object({ search: v.optional(v.string()) }),
	async ({ search }) => {
		const { locals } = getRequestEvent();
		const token = locals.accessToken?.tokenValue;
		try {
			const result = await gqlFetch<
				CollectionsComboboxQuery, CollectionsComboboxQueryVariables
			>(COLLECTIONS_COMBOBOX_QUERY, { search: search ?? '' }, { token });
			return result.collections.collectionsData?.nodes ?? [];
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const getCollections = query(async () => {
	const { locals } = getRequestEvent();
	const token = locals.accessToken?.tokenValue;
	try {
		const result = await gqlFetch<
			GetCollectionsQuery, GetCollectionsQueryVariables
		>(COLLECTIONS_QUERY, {}, { token });
		return result.collections.collectionsData?.nodes ?? [];
	} catch (err) {
		handleGraphQLError(err);
	}
});

export const getCollection = query(
	v.object({
		slug: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ slug }) => {
		const { locals } = getRequestEvent();
		const token = locals.accessToken?.tokenValue;
		try {
			const result = await gqlFetch<
				GetCollectionQuery, GetCollectionQueryVariables
			>(COLLECTION_QUERY, { slug }, { token });
			return result.collections.collectionData;
		} catch (err) {
			handleGraphQLError(err);
		}
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
		defaultLocale: v.optional(v.enum(Locale)),
		fields: v.optional(v.string()),
		supportedLocales: v.optional(v.array(v.enum(Locale)))
	}),
	async ({
		name,
		slug,
		description,
		icon,
		color,
		isLocalized,
		defaultLocale,
		fields,
		supportedLocales
	}) => {
		const { locals } = getRequestEvent();
		try {
			let parsedFields: Array<FieldDefinitionInput> = [];
			if (fields) {
				try {
					const draftFields = JSON.parse(fields) as Array<FieldDefinitionInput>;
					parsedFields = draftFields;
				} catch {
					// Silently ignore malformed JSON — collection still created without fields
				}
			}

			const result = await gqlFetch<CreateCollectionMutation, CreateCollectionMutationVariables
			>(
				CREATE_COLLECTION_MUTATION,
				{
					input: {
						name,
						slug,
						description: description || undefined,
						iconId: icon || undefined,
						color: color || undefined,
						isLocalized: isLocalized === 'on',
						defaultLocale: defaultLocale || Locale.En,
						supportedLocales: supportedLocales,
						fields: parsedFields.length > 0 ? parsedFields : undefined
					}
				},
				{ token: locals.accessToken?.tokenValue }
			);

			getCollections().refresh();

			redirect(303, `/collections/${result.collections.create.slug}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const deleteCollection = form(
	v.object({ id: v.pipe(v.string(), v.nonEmpty()) }),
	async ({ id }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<unknown, { id: string }>(
				DELETE_COLLECTION_MUTATION,
				{ id },
				{ token: locals.accessToken?.tokenValue }
			);
			getCollections().refresh();
			redirect(303, '/collections');
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const updateCollectionMeta = form(
	v.object({
		id: v.pipe(v.string(), v.nonEmpty()),
		name: v.optional(v.string()),
		description: v.optional(v.string()),
		iconId: v.optional(v.string()),
		color: v.optional(v.string())
	}),
	async ({ id, name, description, iconId, color }) => {
		const { locals } = getRequestEvent();
		try {
			const result = await gqlFetch<
				UpdateCollectionMutation, UpdateCollectionMutationVariables
			>(
				UPDATE_COLLECTION_MUTATION,
				{
					input: {
						id,
						name: name || undefined,
						description: description || undefined,
						iconId: iconId || undefined,
						color: color || undefined
					}
				},
				{ token: locals.accessToken?.tokenValue }
			);
			getCollection({ slug: result.collections.update.slug }).refresh();
			redirect(303, `/collections/${result.collections.update.slug}/settings`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const addCollectionField = form(
	v.object({
		collectionId: v.pipe(v.string(), v.nonEmpty()),
		collectionSlug: v.pipe(v.string(), v.nonEmpty()),
		name: v.pipe(v.string(), v.nonEmpty('Field name is required')),
		label: v.optional(v.string()),
		dataType: v.pipe(v.enum(FieldDataType), v.nonEmpty('Data type is required')),
		isRequired: v.optional(v.string()),
		isUnique: v.optional(v.string()),
		defaultValue: v.optional(v.string()),
		description: v.optional(v.string()),
		helpText: v.optional(v.string()),
		relatedCollectionId: v.optional(v.string())
	}),
	async ({
		collectionId,
		collectionSlug,
		name,
		label,
		dataType,
		isRequired,
		isUnique,
		defaultValue,
		description,
		helpText,
		relatedCollectionId
	}) => {
		const { locals } = getRequestEvent();
		const isRelation = dataType === 'RELATION';
		try {
			await gqlFetch<UpdateCollectionMutation, UpdateCollectionMutationVariables>(
				UPDATE_COLLECTION_MUTATION,
				{
					input: {
						id: collectionId,
						fields: [
							{
								name,
								label: label || undefined,
								dataType: isRelation ? undefined : dataType,
								isRequired: isRequired === 'on',
								isUnique: isUnique === 'on',
								defaultValue: defaultValue || undefined,
								description: description || undefined,
								helpText: helpText || undefined,
								relatedCollectionId: relatedCollectionId || undefined
							}
						]
					}
				},
				{ token: locals.accessToken?.tokenValue }
			);

			getCollection({ slug: collectionSlug }).refresh();
			redirect(303, `/collections/${collectionSlug}/settings`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
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
		try {
			await gqlFetch<UpdateCollectionMutation, UpdateCollectionMutationVariables>(
				UPDATE_COLLECTION_MUTATION,
				{ input: { id: collectionId, deleteFieldIds: [fieldId] } },
				{ token: locals.accessToken?.tokenValue }
			);
			getCollection({ slug: collectionSlug }).refresh();
			redirect(303, `/collections/${collectionSlug}/settings`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);
