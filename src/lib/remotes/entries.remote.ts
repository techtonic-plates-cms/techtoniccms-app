import { query, form, getRequestEvent } from '$app/server';
import { gqlFetch, handleGraphQLError, handleGraphQLErrorForm } from '$lib/server/gql';
import * as v from 'valibot';
import { redirect } from '@sveltejs/kit';

export type EntryNode = {
	id: string;
	name: string;
	slug: string | null;
	status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'DELETED';
	createdAt: string;
	updatedAt: string;
	publishedAt: string | null;
	data: Record<string, unknown>;
};

export type EntriesPage = {
	nodes: EntryNode[];
	pageInfo: { hasNextPage: boolean; endCursor: string | null };
};

/** GraphQL field name from slug: 'my-blog' → 'myBlog' */
function slugToFieldName(slug: string): string {
	return slug.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

function buildEntriesQuery(slug: string, dataFields: string[]): string {
	const field = slugToFieldName(slug);
	const dataSelection = dataFields.length > 0 ? dataFields.join(' ') : '__typename';
	return `
		query GetEntries($first: Int, $after: String) {
			collections {
				entries {
					${field}(first: $first, after: $after) {
						nodes {
							id name slug status createdAt updatedAt publishedAt
							data { ${dataSelection} }
						}
						pageInfo { hasNextPage endCursor }
					}
				}
			}
		}
	`;
}

function buildCreateMutation(slug: string): string {
	const field = slugToFieldName(slug);
	const dataType = `${toPascalCase(slug)}CreateEntryDataInput`;
	return `
		mutation CreateEntry($name: String!, $slug: String, $status: EntryStatus, $data: ${dataType}!, $schedulePublishFor: DateTime) {
			collections {
				entries {
					${field} {
						create(name: $name, slug: $slug, status: $status, data: $data, schedulePublishFor: $schedulePublishFor) {
							id name slug status
						}
					}
				}
			}
		}
	`;
}

function buildUpdateMutation(slug: string): string {
	const field = slugToFieldName(slug);
	const dataType = `${toPascalCase(slug)}UpdateEntryDataInput`;
	return `
		mutation UpdateEntry($id: ID!, $name: String, $slug: String, $status: EntryStatus, $data: ${dataType}, $schedulePublishFor: DateTime) {
			collections {
				entries {
					${field} {
						update(id: $id, name: $name, slug: $slug, status: $status, data: $data, schedulePublishFor: $schedulePublishFor) {
							id name slug status
						}
					}
				}
			}
		}
	`;
}

function buildPublishMutation(slug: string): string {
	const field = slugToFieldName(slug);
	return `
		mutation PublishEntry($id: ID!, $scheduleFor: DateTime) {
			collections {
				entries {
					${field} {
						publish(id: $id, scheduleFor: $scheduleFor) { id status }
					}
				}
			}
		}
	`;
}

function buildUnpublishMutation(slug: string): string {
	const field = slugToFieldName(slug);
	return `
		mutation UnpublishEntry($id: ID!, $scheduleFor: DateTime) {
			collections {
				entries {
					${field} {
						unpublish(id: $id, scheduleFor: $scheduleFor) { id status }
					}
				}
			}
		}
	`;
}

function buildArchiveMutation(slug: string): string {
	const field = slugToFieldName(slug);
	return `
		mutation ArchiveEntry($id: ID!, $scheduleFor: DateTime) {
			collections {
				entries {
					${field} {
						archive(id: $id, scheduleFor: $scheduleFor) { id status }
					}
				}
			}
		}
	`;
}

function buildRestoreMutation(slug: string): string {
	const field = slugToFieldName(slug);
	return `
		mutation RestoreEntry($id: ID!, $scheduleFor: DateTime) {
			collections {
				entries {
					${field} {
						restore(id: $id, scheduleFor: $scheduleFor) { id status }
					}
				}
			}
		}
	`;
}

function buildDeleteMutation(slug: string): string {
	const field = slugToFieldName(slug);
	return `
		mutation DeleteEntry($id: ID!, $scheduleFor: DateTime) {
			collections {
				entries {
					${field} {
						delete(id: $id, scheduleFor: $scheduleFor) { id status }
					}
				}
			}
		}
	`;
}

function toPascalCase(slug: string): string {
	return slug
		.split(/[-_]/)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join('');
}

async function fetchCollectionFieldNames(
	slug: string,
	token: string | undefined
): Promise<string[]> {
	const result = await gqlFetch<
		{ collections: { collectionData: { fields: { name: string }[] } | null } },
		{ slug: string }
	>(
		`query CollectionFields($slug: String) {
			collections {
				collectionData(slug: $slug) {
					fields { name }
				}
			}
		}`,
		{ slug },
		{ token }
	);
	return result.collections.collectionData?.fields.map((f) => f.name) ?? [];
}

type EntriesResult = {
	collections: {
		entries: Record<
			string,
			{ nodes: EntryNode[]; pageInfo: { hasNextPage: boolean; endCursor: string | null } }
		>;
	};
};

function buildEntriesComboboxQuery(slug: string): string {
	const field = slugToFieldName(slug);
	return `
		query GetEntriesCombobox($search: String) {
			collections {
				entries {
					${field}(first: 20, where: { name: { contains: $search } }) {
						nodes { id name slug }
					}
				}
			}
		}
	`;
}

export const getEntriesForCombobox = query(
	v.object({
		slug: v.pipe(v.string(), v.nonEmpty()),
		search: v.optional(v.string())
	}),
	async ({ slug, search }) => {
		const { locals } = getRequestEvent();
		try {
			const result = await gqlFetch<
				{
					collections: {
						entries: Record<
							string,
							{ nodes: Array<{ id: string; name: string; slug: string | null }> }
						>;
					};
				},
				{ search?: string }
			>(
				buildEntriesComboboxQuery(slug),
				{ search: search ?? '' },
				{ token: locals.accessToken?.tokenValue }
			);
			const field = slugToFieldName(slug);
			return result.collections.entries[field]?.nodes ?? [];
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const getEntries = query(
	v.object({
		slug: v.pipe(v.string(), v.nonEmpty()),
		after: v.optional(v.string())
	}),
	async ({ slug, after }) => {
		const { locals } = getRequestEvent();
		const first = 20;
		try {
			const dataFields = await fetchCollectionFieldNames(slug, locals.accessToken?.tokenValue);
			const result = await gqlFetch<EntriesResult, { first: number; after?: string }>(
				buildEntriesQuery(slug, dataFields),
				{ first, after },
				{ token: locals.accessToken?.tokenValue }
			);
			const field = slugToFieldName(slug);
			return (
				result.collections.entries[field] ?? {
					nodes: [],
					pageInfo: { hasNextPage: false, endCursor: null }
				}
			);
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const getEntry = query(
	v.object({
		slug: v.pipe(v.string(), v.nonEmpty()),
		id: v.pipe(v.string(), v.nonEmpty())
	}),
	async ({ slug, id }) => {
		const { locals } = getRequestEvent();
		const field = slugToFieldName(slug);
		try {
			const dataFields = await fetchCollectionFieldNames(slug, locals.accessToken?.tokenValue);

			// Fetch by querying entries and filtering client-side, since filter types are per-collection
			const result = await gqlFetch<EntriesResult, { first: number }>(
				buildEntriesQuery(slug, dataFields),
				{ first: 100 },
				{ token: locals.accessToken?.tokenValue }
			);
			const entries = result.collections.entries[field]?.nodes ?? [];
			return entries.find((e) => e.id === id) ?? null;
		} catch (err) {
			handleGraphQLError(err);
		}
	}
);

export const createEntry = form(
	v.object({
		collectionSlug: v.pipe(v.string(), v.nonEmpty()),
		name: v.pipe(v.string(), v.nonEmpty('Name is required')),
		slug: v.optional(v.string()),
		status: v.optional(v.string()),
		data: v.optional(v.string()),
		schedulePublishFor: v.optional(v.string())
	}),
	async ({ collectionSlug, name, slug, status, data, schedulePublishFor }) => {
		const { locals } = getRequestEvent();
		try {
			const fieldData = data ? JSON.parse(data) : {};
			const result = await gqlFetch<
				{ collections: { entries: Record<string, { create: { id: string } }> } },
				Record<string, unknown>
			>(
				buildCreateMutation(collectionSlug),
				{
					name,
					slug: slug || undefined,
					status: status || 'DRAFT',
					data: fieldData,
					schedulePublishFor: schedulePublishFor || undefined
				},
				{ token: locals.accessToken?.tokenValue }
			);
			const field = slugToFieldName(collectionSlug);
			const entry = result.collections.entries[field].create;
			redirect(303, `/collections/${collectionSlug}/entries/${entry.id}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const updateEntry = form(
	v.object({
		collectionSlug: v.pipe(v.string(), v.nonEmpty()),
		entryId: v.pipe(v.string(), v.nonEmpty()),
		oldSlug: v.pipe(v.string(), v.nonEmpty()),
		name: v.optional(v.string()),
		slug: v.optional(v.string()),
		status: v.optional(v.string()),
		data: v.optional(v.string()),
		schedulePublishFor: v.optional(v.string())
	}),
	async ({ collectionSlug, entryId, oldSlug, name, slug, status, data, schedulePublishFor }) => {
		const { locals } = getRequestEvent();
		try {
			const parsedData = data ? JSON.parse(data) : null;
			const fieldData = parsedData && Object.keys(parsedData).length > 0 ? parsedData : undefined;
			await gqlFetch<unknown, Record<string, unknown>>(
				buildUpdateMutation(collectionSlug),
				{
					id: entryId,
					name: name || undefined,
					slug: slug || undefined,
					status: status || undefined,
					data: fieldData,
					schedulePublishFor: schedulePublishFor || undefined
				},
				{ token: locals.accessToken?.tokenValue }
			);
			getEntry({ slug: oldSlug, id: entryId }).refresh();
			redirect(303, `/collections/${collectionSlug}/entries/${entryId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const publishEntry = form(
	v.object({
		collectionSlug: v.pipe(v.string(), v.nonEmpty()),
		entryId: v.pipe(v.string(), v.nonEmpty()),
		scheduleFor: v.optional(v.string())
	}),
	async ({ collectionSlug, entryId, scheduleFor }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<unknown, Record<string, unknown>>(
				buildPublishMutation(collectionSlug),
				{ id: entryId, scheduleFor: scheduleFor || undefined },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/collections/${collectionSlug}/entries/${entryId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const unpublishEntry = form(
	v.object({
		collectionSlug: v.pipe(v.string(), v.nonEmpty()),
		entryId: v.pipe(v.string(), v.nonEmpty()),
		scheduleFor: v.optional(v.string())
	}),
	async ({ collectionSlug, entryId, scheduleFor }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<unknown, Record<string, unknown>>(
				buildUnpublishMutation(collectionSlug),
				{ id: entryId, scheduleFor: scheduleFor || undefined },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/collections/${collectionSlug}/entries/${entryId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const archiveEntry = form(
	v.object({
		collectionSlug: v.pipe(v.string(), v.nonEmpty()),
		entryId: v.pipe(v.string(), v.nonEmpty()),
		scheduleFor: v.optional(v.string())
	}),
	async ({ collectionSlug, entryId, scheduleFor }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<unknown, Record<string, unknown>>(
				buildArchiveMutation(collectionSlug),
				{ id: entryId, scheduleFor: scheduleFor || undefined },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/collections/${collectionSlug}/entries/${entryId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const restoreEntry = form(
	v.object({
		collectionSlug: v.pipe(v.string(), v.nonEmpty()),
		entryId: v.pipe(v.string(), v.nonEmpty()),
		scheduleFor: v.optional(v.string())
	}),
	async ({ collectionSlug, entryId, scheduleFor }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<unknown, Record<string, unknown>>(
				buildRestoreMutation(collectionSlug),
				{ id: entryId, scheduleFor: scheduleFor || undefined },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/collections/${collectionSlug}/entries/${entryId}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);

export const deleteEntry = form(
	v.object({
		collectionSlug: v.pipe(v.string(), v.nonEmpty()),
		entryId: v.pipe(v.string(), v.nonEmpty()),
		scheduleFor: v.optional(v.string())
	}),
	async ({ collectionSlug, entryId, scheduleFor }) => {
		const { locals } = getRequestEvent();
		try {
			await gqlFetch<unknown, Record<string, unknown>>(
				buildDeleteMutation(collectionSlug),
				{ id: entryId, scheduleFor: scheduleFor || undefined },
				{ token: locals.accessToken?.tokenValue }
			);
			redirect(303, `/collections/${collectionSlug}`);
		} catch (err) {
			if ((err as { status?: number }).status !== undefined) throw err;
			handleGraphQLErrorForm(err);
		}
	}
);
