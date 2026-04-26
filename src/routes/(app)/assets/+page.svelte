<script lang="ts">
	import { page } from '$app/state';
	import ImageIcon from '@lucide/svelte/icons/image';
	import TrashIcon from '@lucide/svelte/icons/trash-2';
	import PencilIcon from '@lucide/svelte/icons/pencil';
	import DownloadIcon from '@lucide/svelte/icons/download';
	import UploadIcon from '@lucide/svelte/icons/upload';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { getAssets, updateAsset, deleteAsset, type Asset } from '@/remotes/assets.remote';

	const after = $derived(page.url.searchParams.get('after') ?? undefined);

	const assetsData = $derived(await getAssets({ after }));
	const assets = $derived(assetsData.nodes);

	let editingAsset = $state<Asset | null>(null);

	function formatSize(bytes: number): string {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}

	function isImage(mimeType: string): boolean {
		return mimeType.startsWith('image/');
	}

	function confirmDelete(filename: string): boolean {
		return confirm(`Delete "${filename}"? This cannot be undone.`);
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Media Library</h1>
			<p class="text-sm text-muted-foreground">Manage uploaded assets</p>
		</div>
		<Button href="/assets/create">
			<UploadIcon class="mr-2 size-4" />
			Upload
		</Button>
	</div>

	{#if assets.length === 0}
		<div
			class="flex flex-col items-center justify-center rounded-lg border border-dashed py-16 text-center"
		>
			<ImageIcon class="mb-4 size-12 text-muted-foreground" />
			<h3 class="text-lg font-semibold">No assets yet</h3>
			<p class="mt-1 text-sm text-muted-foreground">Upload your first file to get started</p>
			<Button href="/assets/create" class="mt-4">
				<UploadIcon class="mr-2 size-4" />
				Upload asset
			</Button>
		</div>
	{:else}
		<div class="grid gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
			{#each assets as asset (asset.id)}
				<div class="group relative overflow-hidden rounded-lg border">
					<div class="flex aspect-square items-center justify-center bg-muted">
						{#if isImage(asset.mimeType)}
							<img
								src="/assets/_api/{asset.id}"
								alt={asset.alt ?? asset.filename}
								class="h-full w-full object-cover"
								loading="lazy"
							/>
						{:else}
							<div class="flex flex-col items-center gap-1 p-2">
								<ImageIcon class="size-8 text-muted-foreground" />
								<span class="w-full truncate text-center text-xs text-muted-foreground">
									{asset.mimeType.split('/')[1] ?? 'file'}
								</span>
							</div>
						{/if}
					</div>
					<div class="p-2">
						<p class="truncate text-xs font-medium" title={asset.filename}>{asset.filename}</p>
						<p class="text-xs text-muted-foreground">{formatSize(asset.fileSize)}</p>
					</div>
					<div class="absolute top-1 right-1 hidden gap-1 group-hover:flex">
						<a
							href="/assets/_api/{asset.id}"
							download={asset.filename}
							class="rounded bg-background/80 p-1 shadow backdrop-blur-sm hover:bg-background"
							title="Download"
						>
							<DownloadIcon class="size-3" />
						</a>
						<button
							type="button"
							class="rounded bg-background/80 p-1 shadow backdrop-blur-sm hover:bg-background"
							onclick={() => (editingAsset = asset)}
						>
							<PencilIcon class="size-3" />
						</button>
						<form
							{...deleteAsset}
							onsubmit={(e) => {
								if (!confirmDelete(asset.filename)) e.preventDefault();
							}}
						>
							<input type="hidden" name="id" value={asset.id} />
							<button
								type="submit"
								class="hover:text-destructive-foreground rounded bg-background/80 p-1 shadow backdrop-blur-sm hover:bg-destructive"
							>
								<TrashIcon class="size-3" />
							</button>
						</form>
					</div>
				</div>
			{/each}
		</div>

		{#if assetsData.pageInfo.hasNextPage}
			<div class="flex justify-center pt-4">
				<a href="/assets?after={assetsData.pageInfo.endCursor}">
					<Button variant="outline">Load more</Button>
				</a>
			</div>
		{/if}
	{/if}
</div>

<Sheet.Root
	open={editingAsset !== null}
	onOpenChange={(open) => {
		if (!open) editingAsset = null;
	}}
>
	<Sheet.Content side="right" class="sm:max-w-sm">
		<Sheet.Header>
			<Sheet.Title>Edit Asset</Sheet.Title>
			<Sheet.Description>{editingAsset?.filename}</Sheet.Description>
		</Sheet.Header>
		{#if editingAsset}
			<form {...updateAsset} class="mt-6 space-y-4 px-1">
				<input type="hidden" name="id" value={editingAsset.id} />

				<div class="space-y-1.5">
					<Label for="alt">Alt text</Label>
					<Input
						id="alt"
						name="alt"
						value={editingAsset.alt ?? ''}
						placeholder="Describe the image"
					/>
				</div>

				<div class="space-y-1.5">
					<Label for="caption">Caption</Label>
					<textarea
						id="caption"
						name="caption"
						rows="2"
						class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
						>{editingAsset.caption ?? ''}</textarea
					>
				</div>

				<div class="flex items-center gap-2">
					<input
						id="isPublic"
						type="checkbox"
						name="isPublic"
						class="size-4 rounded"
						checked={editingAsset.isPublic}
					/>
					<Label for="isPublic">Publicly accessible</Label>
				</div>

				<div class="space-y-1 rounded-md border p-3 text-xs text-muted-foreground">
					<p class="font-mono break-all">{editingAsset.id}</p>
					<p>{formatSize(editingAsset.fileSize)} · {editingAsset.mimeType}</p>
				</div>

				<Button type="submit" class="w-full">Save</Button>
			</form>
		{/if}
	</Sheet.Content>
</Sheet.Root>
