<script lang="ts">
	import { untrack } from 'svelte';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import type { Collection } from '$lib/remotes/collections.remote';
	import type { EntryNode } from '$lib/remotes/entries.remote';
	import {
		createEntry,
		updateEntry,
		publishEntry,
		unpublishEntry,
		archiveEntry,
		restoreEntry,
		deleteEntry
	} from '$lib/remotes/entries.remote';
	import AssetCombobox from '$lib/components/asset-combobox.svelte';
	import EntriesCombobox from '$lib/components/entries-combobox.svelte';
	import { resolve } from '$app/paths';

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

	let schedulePublishFor = $state('');

	function confirmDelete(): boolean {
		return confirm(`Delete entry "${entryName}"? This cannot be undone.`);
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between gap-4">
		<div class="flex items-center gap-3">
			<a
				href={resolve(('/collections/' + collectionSlug) as Parameters<typeof resolve>[0])}
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeftIcon class="size-4" />
			</a>
			<div>
				<h1 class="text-xl font-bold">{isNew ? 'New Entry' : entryName}</h1>
				<div class="flex items-center gap-2">
					<span class="font-mono text-xs text-muted-foreground">{collection.name}</span>
					{#if !isNew}
						<Badge variant={STATUS_VARIANT[entryStatus] ?? 'outline'}>
							{entryStatus.charAt(0) + entryStatus.slice(1).toLowerCase()}
						</Badge>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="grid gap-6 lg:grid-cols-3">
		<div class="lg:col-span-2">
			<form {...isNew ? createEntry : updateEntry} class="space-y-5 rounded-lg border p-6">
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
									<span class="ml-0.5 text-destructive">*</span>
								{/if}
							</Label>
							{#if field.helpText}
								<p class="text-xs text-muted-foreground">{field.helpText}</p>
							{/if}

							{#if field.dataType === 'TEXT'}
								<textarea
									id="field-{field.name}"
									rows="4"
									class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
									placeholder={field.description ?? ''}
									required={isNew && field.isRequired}
									value={getFieldValue(field.name)}
									oninput={(e) =>
										setFieldValue(field.name, (e.target as HTMLTextAreaElement).value)}
								></textarea>
							{:else if field.dataType === 'NUMBER'}
								<Input
									id="field-{field.name}"
									type="number"
									required={isNew && field.isRequired}
									value={getFieldValue(field.name)}
									oninput={(e) =>
										setFieldValue(field.name, parseFloat((e.target as HTMLInputElement).value))}
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
										<p class="text-xs text-muted-foreground">
											Relates to: <a
												href={resolve(
													('/collections/' + field.relatedCollection.slug) as Parameters<
														typeof resolve
													>[0]
												)}
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
				<input type="hidden" name="schedulePublishFor" value={schedulePublishFor} />

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
					class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
				>
					<option value="DRAFT">Draft</option>
					<option value="PUBLISHED">Published</option>
					<option value="ARCHIVED">Archived</option>
				</select>
			</div>

			{#if isNew || entryStatus === 'DRAFT'}
				<div class="rounded-lg border p-4">
					<h3 class="mb-3 font-semibold">Schedule publication</h3>
					<input
						type="datetime-local"
						bind:value={schedulePublishFor}
						class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
					/>
					<p class="mt-1.5 text-xs text-muted-foreground">Leave blank to publish immediately.</p>
				</div>
			{/if}

			{#if !isNew && entry}
				{@const entryId = entry.id}
				{#snippet actionForm(
					formAction: Record<string, unknown>,
					label: string,
					variant: 'default' | 'outline' | 'destructive' = 'default',
					onsubmit?: (e: SubmitEvent) => void
				)}
					<form {...formAction} {onsubmit}>
						<input type="hidden" name="collectionSlug" value={collectionSlug} />
						<input type="hidden" name="entryId" value={entryId} />
						<div class="space-y-1.5">
							<input
								type="datetime-local"
								name="scheduleFor"
								class="w-full rounded-md border border-input bg-background px-3 py-2 text-xs"
							/>
							<Button type="submit" {variant} size="sm" class="w-full">{label}</Button>
						</div>
					</form>
				{/snippet}
				<div class="rounded-lg border p-4">
					<h3 class="mb-3 font-semibold">Actions</h3>
					<p class="mb-3 text-xs text-muted-foreground">
						Set a date to schedule, or leave blank to act immediately.
					</p>
					<div class="space-y-3">
						{#if entry.status === 'DRAFT'}
							{@render actionForm(publishEntry, 'Publish')}
							{@render actionForm(archiveEntry, 'Archive', 'outline')}
						{:else if entry.status === 'PUBLISHED'}
							{@render actionForm(unpublishEntry, 'Unpublish', 'outline')}
							{@render actionForm(archiveEntry, 'Archive', 'outline')}
						{:else if entry.status === 'ARCHIVED' || entry.status === 'DELETED'}
							{@render actionForm(restoreEntry, 'Restore')}
						{/if}
						{#if entry.status !== 'DELETED'}
							{@render actionForm(deleteEntry, 'Delete', 'destructive', (e) => {
								if (!confirmDelete()) e.preventDefault();
							})}
						{/if}
					</div>
				</div>
			{/if}

			{#if !isNew && entry}
				<div class="space-y-1.5 rounded-lg border p-4 text-xs text-muted-foreground">
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
					<p class="font-mono break-all">
						<span class="font-sans font-medium">ID:</span>
						{entry.id}
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
