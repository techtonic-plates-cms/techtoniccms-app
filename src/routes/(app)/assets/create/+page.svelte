<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import UploadIcon from '@lucide/svelte/icons/upload';
	import FileIcon from '@lucide/svelte/icons/file';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { requireAuth } from '$lib/remotes/auth.remote';

	await requireAuth();

	let fileInput = $state<HTMLInputElement | null>(null);
	let selectedFile = $state<File | null>(null);
	let previewUrl = $state<string | null>(null);
	let isDragging = $state(false);
	let isPublic = $state(false);

	function onFileChange(files: FileList | null) {
		const file = files?.[0] ?? null;
		if (!file) return;
		selectedFile = file;
		if (previewUrl) URL.revokeObjectURL(previewUrl);
		previewUrl = file.type.startsWith('image/') ? URL.createObjectURL(file) : null;
	}

	function onDrop(e: DragEvent) {
		isDragging = false;
		onFileChange(e.dataTransfer?.files ?? null);
	}

	function formatSize(bytes: number): string {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}
</script>

<div class="mx-auto max-w-xl space-y-6">
	<div class="flex items-center gap-3">
		<Button variant="ghost" size="icon" href="/assets">
			<ArrowLeftIcon class="size-4" />
		</Button>
		<div>
			<h1 class="text-2xl font-bold">Upload Asset</h1>
			<p class="text-muted-foreground text-sm">Add a file to your media library</p>
		</div>
	</div>

	<form
		action="/assets/create"
		method="post"
		enctype="multipart/form-data"
		class="space-y-5"
	>
		<!-- Drop zone -->
		<div
			role="button"
			tabindex="0"
			class="relative flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 text-center transition-colors
				{isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}"
			ondragover={(e) => { e.preventDefault(); isDragging = true; }}
			ondragleave={() => (isDragging = false)}
			ondrop={(e) => { e.preventDefault(); onDrop(e); }}
			onclick={() => fileInput?.click()}
			onkeydown={(e) => e.key === 'Enter' && fileInput?.click()}
		>
			<input
				bind:this={fileInput}
				type="file"
				name="file"
				class="sr-only"
				onchange={(e) => onFileChange((e.currentTarget as HTMLInputElement).files)}
			/>

			{#if previewUrl}
				<img src={previewUrl} alt="Preview" class="mb-3 max-h-48 rounded object-contain" />
			{:else if selectedFile}
				<FileIcon class="text-muted-foreground mb-3 size-12" />
			{:else}
				<UploadIcon class="text-muted-foreground mb-3 size-10" />
			{/if}

			{#if selectedFile}
				<p class="text-sm font-medium">{selectedFile.name}</p>
				<p class="text-muted-foreground text-xs">{formatSize(selectedFile.size)}</p>
				<p class="text-muted-foreground mt-1 text-xs">Click to change file</p>
			{:else}
				<p class="text-sm font-medium">Drop a file or click to browse</p>
				<p class="text-muted-foreground text-xs">Images, documents, and other files</p>
			{/if}
		</div>

		<!-- Metadata -->
		<div class="space-y-1.5">
			<Label for="alt">Alt text</Label>
			<Input id="alt" name="alt" placeholder="Describe the file for accessibility" />
		</div>

		<div class="space-y-1.5">
			<Label for="caption">Caption</Label>
			<Textarea id="caption" name="caption" rows={2} placeholder="Optional caption" />
		</div>

		<div class="flex items-center gap-3">
			<input
				id="isPublic"
				type="checkbox"
				name="isPublic"
				class="size-4 rounded"
				bind:checked={isPublic}
			/>
			<div>
				<Label for="isPublic" class="cursor-pointer">Publicly accessible</Label>
				<p class="text-muted-foreground text-xs">Anyone with the URL can view this file</p>
			</div>
		</div>

		<Button type="submit" class="w-full" disabled={!selectedFile}>
			<UploadIcon class="mr-2 size-4" />
			Upload
		</Button>
	</form>
</div>
