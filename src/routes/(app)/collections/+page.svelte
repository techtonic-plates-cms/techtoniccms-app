<script lang="ts">
	import LayersIcon from '@lucide/svelte/icons/layers';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import TrashIcon from '@lucide/svelte/icons/trash-2';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as v from 'valibot';
	import { getCollections, createCollection, deleteCollection } from '$lib/remotes/collections.remote';

	const collections = await getCollections();

	const preflight = v.object({
		name: v.pipe(v.string(), v.nonEmpty('Required')),
		slug: v.pipe(v.string(), v.nonEmpty('Required'))
	});

	let nameInput = $state('');
	let slugInput = $derived(
		nameInput
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^a-z0-9-]/g, '')
	);

	function confirmDelete(collectionName: string): boolean {
		return confirm(`Delete collection "${collectionName}"? This cannot be undone.`);
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Collections</h1>
			<p class="text-muted-foreground text-sm">Manage your content types and their entries</p>
		</div>
		<Sheet.Root>
			<Sheet.Trigger>
				{#snippet child({ props })}
					<Button {...props}>
						<PlusIcon class="mr-2 size-4" />
						New Collection
					</Button>
				{/snippet}
			</Sheet.Trigger>
			<Sheet.Content side="right" class="w-full sm:max-w-md">
				<Sheet.Header>
					<Sheet.Title>New Collection</Sheet.Title>
					<Sheet.Description>Define a new content type</Sheet.Description>
				</Sheet.Header>
				<form {...createCollection.preflight(preflight)} class="mt-6 space-y-4 px-1">
					{#each createCollection.fields.allIssues() as issue (issue.message)}
						<p class="rounded border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
							{issue.message}
						</p>
					{/each}

					<div class="space-y-1.5">
						<Label for="col-name">Name</Label>
						{#each createCollection.fields.name.issues() as issue (issue.message)}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
						<Input
							id="col-name"
							{...createCollection.fields.name.as('text')}
							bind:value={nameInput}
							placeholder="Blog Posts"
						/>
					</div>

					<div class="space-y-1.5">
						<Label for="col-slug">Slug</Label>
						{#each createCollection.fields.slug.issues() as issue (issue.message)}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
						<Input
							id="col-slug"
							{...createCollection.fields.slug.as('text')}
							value={slugInput}
							placeholder="blog-posts"
						/>
					</div>

					<div class="space-y-1.5">
						<Label for="col-desc">Description</Label>
						<textarea
							id="col-desc"
							name="description"
							rows="3"
							placeholder="Optional description..."
							class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
						></textarea>
					</div>

					<div class="grid grid-cols-2 gap-3">
						<div class="space-y-1.5">
							<Label for="col-icon">Icon (emoji)</Label>
							<Input id="col-icon" name="icon" placeholder="📝" />
						</div>
						<div class="space-y-1.5">
							<Label for="col-color">Color</Label>
							<Input id="col-color" name="color" type="color" class="h-9 cursor-pointer px-2" />
						</div>
					</div>

					<div class="flex items-center gap-2">
						<input id="col-localized" type="checkbox" name="isLocalized" class="size-4 rounded" />
						<Label for="col-localized">Enable localization</Label>
					</div>

					<input type="hidden" name="defaultLocale" value="EN" />

					<div class="pt-2">
						<Button type="submit" class="w-full">Create Collection</Button>
					</div>
				</form>
			</Sheet.Content>
		</Sheet.Root>
	</div>

	{#if collections.length === 0}
		<div class="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center">
			<LayersIcon class="text-muted-foreground mb-4 size-12" />
			<h3 class="text-lg font-semibold">No collections yet</h3>
			<p class="text-muted-foreground mt-1 text-sm">Create your first collection to start managing content</p>
		</div>
	{:else}
		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{#each collections as collection (collection.id)}
				<Card.Root class="group relative transition-shadow hover:shadow-md">
					<Card.Content class="p-5">
						<div class="mb-3 flex items-start justify-between gap-2">
							<div class="flex min-w-0 items-center gap-2">
								{#if collection.icon}
									<span class="text-2xl leading-none">{collection.icon}</span>
								{:else}
									<div
										class="flex size-9 shrink-0 items-center justify-center rounded-md text-sm font-bold text-white"
										style={collection.color ? `background-color: ${collection.color}` : 'background-color: hsl(var(--primary))'}
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
									<p class="text-muted-foreground truncate font-mono text-xs">{collection.slug}</p>
								</div>
							</div>
							<a
								href="/collections/{collection.slug}/settings"
								class="text-muted-foreground hover:text-foreground shrink-0 p-1 opacity-0 transition-opacity group-hover:opacity-100"
							>
								<SettingsIcon class="size-4" />
							</a>
						</div>

						{#if collection.description}
							<p class="text-muted-foreground mb-3 line-clamp-2 text-sm">{collection.description}</p>
						{/if}

						<div class="text-muted-foreground flex items-center gap-4 text-xs">
							<span>{collection.entryCount} {collection.entryCount === 1 ? 'entry' : 'entries'}</span>
							<span>{collection.fields.length} {collection.fields.length === 1 ? 'field' : 'fields'}</span>
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
								class="text-muted-foreground hover:text-destructive flex items-center gap-1 text-xs transition-colors"
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
