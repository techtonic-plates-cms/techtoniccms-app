<script lang="ts">
	import { untrack } from 'svelte';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Collection } from '$lib/remotes/collections.remote';
	import type { EntryNode } from '$lib/remotes/entries.remote';
	import { createEntry, updateEntry, publishEntry, deleteEntry } from '$lib/remotes/entries.remote';
	import AssetCombobox from '$lib/components/asset-combobox.svelte';
	import EntriesCombobox from '$lib/components/entries-combobox.svelte';

	interface Props {
		collection: Collection;
		entry?: EntryNode | null;
	}

	const { collection, entry = null }: Props = $props();

	const isNew = $derived(entry === null);
	const collectionSlug = $derived(collection.slug);

	let entryName = $state(untrack(() => entry?.name ?? ''));
	let entrySlug = $state(untrack(() => entry?.slug ?? ''));
	let entryStatus = $state<string>(untrack(() => entry?.status ?? 'DRAFT'));
	let fieldValues = $state<Record<string, unknown>>(
		untrack(() =>
			entry?.data
				? Object.fromEntries(Object.entries(entry.data).filter(([k]) => k !== '__typename'))
				: {}
		)
	);
	let dirtyFieldNames = $state(new Set<string>());

	$inspect(entry?.data.body);

	const dataJson = $derived(
		isNew
			? JSON.stringify(fieldValues)
			: JSON.stringify(Object.fromEntries([...dirtyFieldNames].map((k) => [k, fieldValues[k]])))
	);

	const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
		PUBLISHED: 'default',
		DRAFT: 'secondary',
		ARCHIVED: 'outline',
		DELETED: 'destructive'
	};

	function getFieldValue(fieldName: string): string {
		const val = fieldValues[fieldName];
		if (val === null || val === undefined) return '';
		return String(val);
	}

	function setFieldValue(fieldName: string, value: unknown) {
		fieldValues = { ...fieldValues, [fieldName]: value };
		dirtyFieldNames = new Set([...dirtyFieldNames, fieldName]);
	}

	function confirmDelete(): boolean {
		return confirm(`Delete entry "${entryName}"? This cannot be undone.`);
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between gap-4">
		<div class="flex items-center gap-3">
			<a
				href="/collections/{collectionSlug}"
				class="text-muted-foreground hover:text-foreground transition-colors"
			>
				<ArrowLeftIcon class="size-4" />
			</a>
			<div>
				<h1 class="text-xl font-bold">{isNew ? 'New Entry' : entryName}</h1>
				<div class="flex items-center gap-2">
					<span class="text-muted-foreground font-mono text-xs">{collection.name}</span>
					{#if !isNew}
						<Badge variant={STATUS_VARIANT[entryStatus] ?? 'outline'}>
							{entryStatus.charAt(0) + entryStatus.slice(1).toLowerCase()}
						</Badge>
					{/if}
				</div>
			</div>
		</div>

		{#if !isNew && entry}
			<div class="flex items-center gap-2">
				{#if entry.status === 'DRAFT'}
					<form {...publishEntry}>
						<input type="hidden" name="collectionSlug" value={collectionSlug} />
						<input type="hidden" name="entryId" value={entry.id} />
						<Button type="submit" size="sm">Publish</Button>
					</form>
				{/if}
				<form
					{...deleteEntry}
					onsubmit={(e) => {
						if (!confirmDelete()) e.preventDefault();
					}}
				>
					<input type="hidden" name="collectionSlug" value={collectionSlug} />
					<input type="hidden" name="entryId" value={entry.id} />
					<Button type="submit" variant="destructive" size="sm">Delete</Button>
				</form>
			</div>
		{/if}
	</div>

	<div class="grid gap-6 lg:grid-cols-3">
		<div class="lg:col-span-2">
			<form
				{...(isNew ? createEntry : updateEntry)}
				class="space-y-5 rounded-lg border p-6"
			>
				<input type="hidden" name="collectionSlug" value={collectionSlug} />
				{#if !isNew && entry}
					<input type="hidden" name="entryId" value={entry.id} />
				{/if}
				<input type="hidden" name="status" value={entryStatus} />
				<input type="hidden" name="data" value={dataJson} />

				<div class="space-y-1.5">
					<Label for="entry-name">Entry name</Label>
					<Input
						id="entry-name"
						name="name"
						bind:value={entryName}
						placeholder="My entry name"
						required
					/>
				</div>

				<div class="space-y-1.5">
					<Label for="entry-slug">Slug <span class="text-muted-foreground">(optional)</span></Label>
					<Input id="entry-slug" name="slug" bind:value={entrySlug} placeholder="my-entry-slug" />
				</div>

				{#if collection.fields.length > 0}
					<hr class="border-border" />
					{#each collection.fields as field (field.id)}
						<div class="space-y-1.5">
							<Label for="field-{field.name}">
								{field.label ?? field.name}
								{#if isNew && field.isRequired}
									<span class="text-destructive ml-0.5">*</span>
								{/if}
							</Label>
							{#if field.helpText}
								<p class="text-muted-foreground text-xs">{field.helpText}</p>
							{/if}

							{#if field.dataType === 'TEXT'}
								
								<textarea
									id="field-{field.name}"
									rows="4"
									class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
									placeholder={field.description ?? ''}
									required={isNew && field.isRequired}
									value={getFieldValue(field.name)}
									oninput={(e) => setFieldValue(field.name, (e.target as HTMLTextAreaElement).value)}
								></textarea>
							{:else if field.dataType === 'NUMBER'}
								<Input
									id="field-{field.name}"
									type="number"
									required={isNew && field.isRequired}
									value={getFieldValue(field.name)}
									oninput={(e) =>
										setFieldValue(
											field.name,
											parseFloat((e.target as HTMLInputElement).value)
										)}
								/>
							{:else if field.dataType === 'BOOLEAN'}
								<div class="flex items-center gap-2">
									<input
										id="field-{field.name}"
										type="checkbox"
										class="size-4 rounded"
										checked={fieldValues[field.name] === true}
										onchange={(e) =>
											setFieldValue(field.name, (e.target as HTMLInputElement).checked)}
									/>
									<span class="text-sm">{field.label ?? field.name}</span>
								</div>
							{:else if field.dataType === 'DATE_TIME'}
								<Input
									id="field-{field.name}"
									type="datetime-local"
									required={isNew && field.isRequired}
									value={getFieldValue(field.name)}
									oninput={(e) => setFieldValue(field.name, (e.target as HTMLInputElement).value)}
								/>
							{:else if field.dataType === 'ASSET'}
								<AssetCombobox
									value={getFieldValue(field.name)}
									onValueChange={(id) => setFieldValue(field.name, id)}
								/>
							{:else if field.dataType === 'RELATION'}
								<div class="space-y-1">
									{#if field.relatedCollection}
										<EntriesCombobox
											value={getFieldValue(field.name)}
											collectionSlug={field.relatedCollection.slug}
											onValueChange={(id) => setFieldValue(field.name, id)}
										/>
										<p class="text-muted-foreground text-xs">
											Relates to: <a
												href="/collections/{field.relatedCollection.slug}"
												class="hover:underline">{field.relatedCollection.name}</a
											>
										</p>
									{:else}
										<Input
											id="field-{field.name}"
											type="text"
											placeholder="Entry ID"
											required={isNew && field.isRequired}
											value={getFieldValue(field.name)}
											oninput={(e) =>
												setFieldValue(field.name, (e.target as HTMLInputElement).value)}
										/>
									{/if}
								</div>
							{:else}
								<Input
									id="field-{field.name}"
									type="text"
									required={isNew && field.isRequired}
									value={getFieldValue(field.name)}
									oninput={(e) => setFieldValue(field.name, (e.target as HTMLInputElement).value)}
								/>
							{/if}
						</div>
					{/each}
				{/if}

				<input type="hidden" name="oldSlug" value={entry?.slug ?? ''} />

				<div class="pt-2">
					<Button type="submit">{isNew ? 'Create Entry' : 'Save Changes'}</Button>
				</div>
			</form>
		</div>

		<div class="space-y-4">
			<div class="rounded-lg border p-4">
				<h3 class="mb-3 font-semibold">Status</h3>
				<select
					bind:value={entryStatus}
					class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
				>
					<option value="DRAFT">Draft</option>
					<option value="PUBLISHED">Published</option>
					<option value="ARCHIVED">Archived</option>
				</select>
			</div>

			{#if !isNew && entry}
				<div class="text-muted-foreground space-y-1.5 rounded-lg border p-4 text-xs">
					<p>
						<span class="font-medium">Created:</span>
						{new Date(entry.createdAt).toLocaleString()}
					</p>
					<p>
						<span class="font-medium">Updated:</span>
						{new Date(entry.updatedAt).toLocaleString()}
					</p>
					{#if entry.publishedAt}
						<p>
							<span class="font-medium">Published:</span>
							{new Date(entry.publishedAt).toLocaleString()}
						</p>
					{/if}
					<p class="break-all font-mono"><span class="font-sans font-medium">ID:</span> {entry.id}</p>
				</div>
			{/if}
		</div>
	</div>
</div>
