<script lang="ts">
	import { resolve } from '$app/paths';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import FileTextIcon from '@lucide/svelte/icons/file-text';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { getCollection } from '$lib/remotes/collections.remote';
	import { getEntries } from '$lib/remotes/entries.remote';
	import { page } from '$app/state';
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
	const slug = $derived(params.slug);
	const after = $derived(page.url.searchParams.get('after') ?? undefined);

	const collection = $derived(await getCollection({ slug }));
	const entries = $derived(await getEntries({ slug, after }));

	const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
		PUBLISHED: 'default',
		DRAFT: 'secondary',
		ARCHIVED: 'outline',
		DELETED: 'destructive'
	};

	function formatDate(iso: string): string {
		return new Date(iso).toLocaleDateString(undefined, { dateStyle: 'medium' });
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between gap-4">
		<div class="flex items-center gap-3">
			<a
				href={resolve('/collections')}
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeftIcon class="size-4" />
			</a>
			<div>
				<div class="flex items-center gap-2">
					{#if collection?.icon}
						<img
							src="/assets/_api/{collection.icon.id}"
							alt={collection.icon.filename}
							class="size-7 rounded-md object-cover"
						/>
					{/if}
					<h1 class="text-2xl font-bold">{collection?.name ?? 'Entries'}</h1>
				</div>
				<p class="font-mono text-xs text-muted-foreground">{collection?.slug}</p>
			</div>
		</div>
		<div class="flex items-center gap-2">
			<a href={resolve(`/collections/${collection?.slug}/settings`)}>
				<Button variant="outline" size="sm">Settings</Button>
			</a>
			<a href={resolve(`/collections/${collection?.slug}/entries/new`)}>
				<Button size="sm">
					<PlusIcon class="mr-2 size-4" />
					New Entry
				</Button>
			</a>
		</div>
	</div>

	{#if entries.nodes.length === 0}
		<div
			class="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center"
		>
			<FileTextIcon class="mb-4 size-12 text-muted-foreground" />
			<h3 class="text-lg font-semibold">No entries yet</h3>
			<p class="mt-1 mb-4 text-sm text-muted-foreground">
				Create your first entry for this collection
			</p>
			<a href={resolve(`/collections/${collection?.slug}/entries/new`)}>
				<Button size="sm">
					<PlusIcon class="mr-2 size-4" />
					New Entry
				</Button>
			</a>
		</div>
	{:else}
		<div class="rounded-lg border">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b">
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell"
							>Slug</th
						>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell"
							>Updated</th
						>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell"
							>Created</th
						>
					</tr>
				</thead>
				<tbody>
					{#each entries.nodes as entry (entry.id)}
						<tr class="border-b transition-colors last:border-0 hover:bg-muted/50">
							<td class="px-4 py-3">
								<a
									href={resolve(`/collections/${collection?.slug}/entries/${entry.id}`)}
									class="font-medium transition-colors hover:text-primary"
								>
									{entry.name}
								</a>
							</td>
							<td class="px-4 py-3">
								<Badge variant={STATUS_VARIANT[entry.status] ?? 'outline'}>
									{entry.status.charAt(0) + entry.status.slice(1).toLowerCase()}
								</Badge>
							</td>
							<td class="hidden px-4 py-3 font-mono text-xs text-muted-foreground md:table-cell">
								{entry.slug ?? '—'}
							</td>
							<td class="hidden px-4 py-3 text-muted-foreground lg:table-cell">
								{formatDate(entry.updatedAt)}
							</td>
							<td class="hidden px-4 py-3 text-muted-foreground lg:table-cell">
								{formatDate(entry.createdAt)}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if entries.pageInfo.hasNextPage}
			<div class="flex justify-center">
				<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
				<a href="?after={entries.pageInfo.endCursor}">
					<Button variant="outline">Load more</Button>
				</a>
			</div>
		{/if}
	{/if}
</div>
