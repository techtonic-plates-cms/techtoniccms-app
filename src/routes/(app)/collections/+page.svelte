<script lang="ts">
	import LayersIcon from '@lucide/svelte/icons/layers';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import TrashIcon from '@lucide/svelte/icons/trash-2';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { getCollections, deleteCollection } from '$lib/remotes/collections.remote';

	const collections = await getCollections();

	function confirmDelete(collectionName: string): boolean {
		return confirm(`Delete collection "${collectionName}"? This cannot be undone.`);
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Collections</h1>
			<p class="text-sm text-muted-foreground">Manage your content types and their entries</p>
		</div>
		<a href="/collections/create">
			<Button>
				<PlusIcon class="mr-2 size-4" />
				New Collection
			</Button>
		</a>
	</div>

	{#if collections.length === 0}
		<div
			class="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center"
		>
			<LayersIcon class="mb-4 size-12 text-muted-foreground" />
			<h3 class="text-lg font-semibold">No collections yet</h3>
			<p class="mt-1 text-sm text-muted-foreground">
				Create your first collection to start managing content
			</p>
		</div>
	{:else}
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each collections as collection (collection.id)}
				{console.log(collection)}
				<!-- for debugging, to check if collection.icon is present -->

				<Card.Root class="group relative transition-shadow hover:shadow-md">
					<Card.Content class="p-5">
						<div class="mb-3 flex items-start justify-between gap-2">
							<div class="flex min-w-0 items-center gap-2">
								{#if collection.icon}
									<img
										src="/assets/_api/{collection.icon.id}"
										alt={collection.icon.filename}
										class="size-9 rounded-md object-cover"
									/>
								{:else}
									<div
										class="flex size-9 shrink-0 items-center justify-center rounded-md text-sm font-bold text-white"
										style={collection.color
											? `background-color: ${collection.color}`
											: 'background-color: hsl(var(--primary))'}
									>
										{collection.name.charAt(0).toUpperCase()}
									</div>
								{/if}
								<div class="min-w-0">
									<a
										href="/collections/{collection.slug}"
										class="block truncate font-semibold transition-colors hover:text-primary"
									>
										{collection.name}
									</a>
									<p class="truncate font-mono text-xs text-muted-foreground">{collection.slug}</p>
								</div>
							</div>
							<a
								href="/collections/{collection.slug}/settings"
								class="shrink-0 p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-foreground"
							>
								<SettingsIcon class="size-4" />
							</a>
						</div>

						{#if collection.description}
							<p class="mb-3 line-clamp-2 text-sm text-muted-foreground">
								{collection.description}
							</p>
						{/if}

						<div class="flex items-center gap-4 text-xs text-muted-foreground">
							<span
								>{collection.entryCount} {collection.entryCount === 1 ? 'entry' : 'entries'}</span
							>
							<span
								>{collection.fields.length}
								{collection.fields.length === 1 ? 'field' : 'fields'}</span
							>
							{#if collection.isLocalized}
								<span class="text-blue-500">localized</span>
							{/if}
						</div>
					</Card.Content>
					<Card.Footer class="border-t px-5 py-3">
						<form
							{...deleteCollection}
							class="ml-auto"
							onsubmit={(e) => {
								if (!confirmDelete(collection.name)) e.preventDefault();
							}}
						>
							<input type="hidden" name="id" value={collection.id} />
							<button
								type="submit"
								class="flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-destructive"
							>
								<TrashIcon class="size-3" />
								Delete
							</button>
						</form>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	{/if}
</div>
