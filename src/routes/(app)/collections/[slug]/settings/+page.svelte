<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import TrashIcon from '@lucide/svelte/icons/trash-2';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import {
		getCollection,
		updateCollectionMeta,
		addCollectionField,
		deleteCollectionField
	} from '$lib/remotes/collections.remote';
	import AssetCombobox from '$lib/components/asset-combobox.svelte';
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
	const slug = $derived(params.slug);

	const collection = $derived(await getCollection({ slug }));

	const DATA_TYPES = [
		{ value: 'TEXT', label: 'Text' },
		{ value: 'NUMBER', label: 'Number' },
		{ value: 'BOOLEAN', label: 'Boolean' },
		{ value: 'DATE_TIME', label: 'Date / Time' },
		{ value: 'ASSET', label: 'Asset' },
		{ value: 'OBJECT', label: 'Object (JSON)' },
		{ value: 'RELATION', label: 'Relation' }
	];

	let newFieldType = $state('TEXT');
	let iconOverride = $state<string | null>(null);

	function confirmDeleteField(fieldName: string): boolean {
		return confirm(`Delete field "${fieldName}"? All data in this field will be lost.`);
	}
</script>

{#if !collection}
	<p class="text-muted-foreground">Collection not found.</p>
{:else}
	<div class="space-y-8">
		<div class="flex items-center gap-3">
			<a
				href="/collections/{collection.slug}"
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeftIcon class="size-4" />
			</a>
			<div>
				<h1 class="text-2xl font-bold">Settings — {collection.name}</h1>
				<p class="font-mono text-xs text-muted-foreground">{collection.slug}</p>
			</div>
		</div>

		<!-- Metadata -->
		<section class="space-y-5 rounded-lg border p-6">
			<h2 class="text-lg font-semibold">General</h2>
			<form {...updateCollectionMeta} class="space-y-4">
				<input type="hidden" name="id" value={collection.id} />

				{#each updateCollectionMeta.fields.allIssues() as issue (issue.message)}
					<p
						class="rounded border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive"
					>
						{issue.message}
					</p>
				{/each}

				<div class="grid gap-4 sm:grid-cols-2">
					<div class="space-y-1.5">
						<Label for="meta-name">Name</Label>
						<Input id="meta-name" name="name" value={collection.name} required />
					</div>
					<div class="space-y-1.5">
						<Label>Icon (asset)</Label>
						<input type="hidden" name="icon" value={iconOverride ?? collection.icon?.id ?? ''} />
						<AssetCombobox
							value={iconOverride ?? collection.icon?.id ?? ''}
							onValueChange={(id) => {
								iconOverride = id;
							}}
						/>
					</div>
				</div>

				<div class="space-y-1.5">
					<Label for="meta-desc">Description</Label>
					<textarea
						id="meta-desc"
						name="description"
						rows="2"
						class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
						>{collection.description ?? ''}</textarea
					>
				</div>

				<div class="space-y-1.5">
					<Label for="meta-color">Color</Label>
					<Input
						id="meta-color"
						name="color"
						type="color"
						value={collection.color ?? '#6366f1'}
						class="h-9 w-20 cursor-pointer px-2"
					/>
				</div>

				<Button type="submit">Save changes</Button>
			</form>
		</section>

		<!-- Fields -->
		<section class="space-y-5 rounded-lg border p-6">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold">Fields</h2>
				<span class="text-sm text-muted-foreground"
					>{collection.fields.length} field{collection.fields.length !== 1 ? 's' : ''}</span
				>
			</div>

			{#if collection.fields.length > 0}
				<div class="divide-y rounded-md border">
					{#each collection.fields as field (field.id)}
						<div class="flex items-center justify-between px-4 py-3">
							<div class="min-w-0 flex-1">
								<div class="flex items-center gap-2">
									<span class="font-medium">{field.label ?? field.name}</span>
									{#if field.isRequired}
										<span class="text-xs text-destructive">required</span>
									{/if}
								</div>
								<div class="flex items-center gap-2 text-xs text-muted-foreground">
									<span class="font-mono">{field.name}</span>
									<span>·</span>
									<span>{field.dataType.toLowerCase()}</span>
									{#if field.relatedCollection}
										<span>→ {field.relatedCollection.name}</span>
									{/if}
								</div>
							</div>
							<form
								{...deleteCollectionField}
								onsubmit={(e) => {
									if (!confirmDeleteField(field.name)) e.preventDefault();
								}}
							>
								<input type="hidden" name="collectionId" value={collection.id} />
								<input type="hidden" name="collectionSlug" value={collection.slug} />
								<input type="hidden" name="fieldId" value={field.id} />
								<button
									type="submit"
									class="p-1 text-muted-foreground transition-colors hover:text-destructive"
								>
									<TrashIcon class="size-4" />
								</button>
							</form>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-sm text-muted-foreground">No fields yet. Add your first field below.</p>
			{/if}

			<!-- Add field form -->
			<div class="space-y-4 rounded-md border p-4">
				<h3 class="flex items-center gap-2 font-medium">
					<PlusIcon class="size-4" />
					Add Field
				</h3>
				<form {...addCollectionField} class="space-y-4">
					<input type="hidden" name="collectionId" value={collection.id} />
					<input type="hidden" name="collectionSlug" value={collection.slug} />

					{#each addCollectionField.fields.allIssues() as issue (issue.message)}
						<p class="text-sm text-destructive">{issue.message}</p>
					{/each}

					<div class="grid gap-3 sm:grid-cols-3">
						<div class="space-y-1.5">
							<Label for="field-name">Field name</Label>
							{#each addCollectionField.fields.name.issues() as issue (issue.message)}
								<p class="text-xs text-destructive">{issue.message}</p>
							{/each}
							<Input
								id="field-name"
								{...addCollectionField.fields.name.as('text')}
								placeholder="bodyText"
							/>
						</div>
						<div class="space-y-1.5">
							<Label for="field-label">Label (display)</Label>
							<Input id="field-label" name="label" placeholder="Body Text" />
						</div>
						<div class="space-y-1.5">
							<Label for="field-type">Type</Label>
							{#each addCollectionField.fields.dataType.issues() as issue (issue.message)}
								<p class="text-xs text-destructive">{issue.message}</p>
							{/each}
							<select
								id="field-type"
								{...addCollectionField.fields.dataType.as('text')}
								bind:value={newFieldType}
								class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
							>
								{#each DATA_TYPES as dt (dt.value)}
									<option value={dt.value}>{dt.label}</option>
								{/each}
							</select>
						</div>
					</div>

					{#if newFieldType === 'RELATION'}
						<div class="space-y-1.5">
							<Label for="related-collection">Related collection ID</Label>
							<Input
								id="related-collection"
								name="relatedCollectionId"
								placeholder="Collection ID"
							/>
						</div>
					{/if}

					<div class="flex items-center gap-4">
						<label class="flex items-center gap-2 text-sm">
							<input type="checkbox" name="isRequired" class="size-4 rounded" />
							Required
						</label>
						<label class="flex items-center gap-2 text-sm">
							<input type="checkbox" name="isUnique" class="size-4 rounded" />
							Unique
						</label>
					</div>

					<Button type="submit" variant="outline">
						<PlusIcon class="mr-2 size-4" />
						Add Field
					</Button>
				</form>
			</div>
		</section>

		<!-- Danger zone -->
		<section class="space-y-3 rounded-lg border border-destructive/30 p-6">
			<h2 class="font-semibold text-destructive">Danger Zone</h2>
			<p class="text-sm text-muted-foreground">
				Deleting this collection will permanently remove all entries and cannot be undone.
			</p>
			<a href="/collections">
				<Button variant="destructive" size="sm">Delete Collection</Button>
			</a>
		</section>
	</div>
{/if}
