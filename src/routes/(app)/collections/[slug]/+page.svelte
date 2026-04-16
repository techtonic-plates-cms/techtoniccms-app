<script lang="ts">
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
			<a href="/collections" class="text-muted-foreground hover:text-foreground transition-colors">
				<ArrowLeftIcon class="size-4" />
			</a>
			<div>
				<div class="flex items-center gap-2">
					{#if collection?.icon}
						<span class="text-xl">{collection.icon}</span>
					{/if}
					<h1 class="text-2xl font-bold">{collection?.name ?? 'Entries'}</h1>
				</div>
				<p class="text-muted-foreground font-mono text-xs">{collection?.slug}</p>
			</div>
		</div>
		<div class="flex items-center gap-2">
			<a href="/collections/{collection?.slug}/settings">
				<Button variant="outline" size="sm">Settings</Button>
			</a>
			<a href="/collections/{collection?.slug}/entries/new">
				<Button size="sm">
					<PlusIcon class="mr-2 size-4" />
					New Entry
				</Button>
			</a>
		</div>
	</div>

	{#if entries.nodes.length === 0}
		<div class="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
			<FileTextIcon class="text-muted-foreground mb-4 size-12" />
			<h3 class="text-lg font-semibold">No entries yet</h3>
			<p class="text-muted-foreground mt-1 mb-4 text-sm">Create your first entry for this collection</p>
			<a href="/collections/{collection?.slug}/entries/new">
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
						<th class="text-muted-foreground px-4 py-3 text-left font-medium">Name</th>
						<th class="text-muted-foreground px-4 py-3 text-left font-medium">Status</th>
						<th class="text-muted-foreground hidden px-4 py-3 text-left font-medium md:table-cell">Slug</th>
						<th class="text-muted-foreground hidden px-4 py-3 text-left font-medium lg:table-cell">Updated</th>
						<th class="text-muted-foreground hidden px-4 py-3 text-left font-medium lg:table-cell">Created</th>
					</tr>
				</thead>
				<tbody>
					{#each entries.nodes as entry (entry.id)}
						<tr class="hover:bg-muted/50 border-b last:border-0 transition-colors">
							<td class="px-4 py-3">
								<a
									href="/collections/{collection?.slug}/entries/{entry.id}"
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
							<td class="text-muted-foreground hidden px-4 py-3 font-mono text-xs md:table-cell">
								{entry.slug ?? '—'}
							</td>
							<td class="text-muted-foreground hidden px-4 py-3 lg:table-cell">
								{formatDate(entry.updatedAt)}
							</td>
							<td class="text-muted-foreground hidden px-4 py-3 lg:table-cell">
								{formatDate(entry.createdAt)}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if entries.pageInfo.hasNextPage}
			<div class="flex justify-center">
				<a href="?after={entries.pageInfo.endCursor}">
					<Button variant="outline">Load more</Button>
				</a>
			</div>
		{/if}
	{/if}
</div>
