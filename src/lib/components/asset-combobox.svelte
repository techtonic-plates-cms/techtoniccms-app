<script lang="ts">
	import { Combobox } from 'bits-ui';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import { cn } from '$lib/utils.js';
	import { getAssetsForCombobox } from '$lib/remotes/assets.remote';

	interface Props {
		value: string;
		onValueChange: (id: string, url: string) => void;
		class?: string;
	}

	let { value, onValueChange, class: className }: Props = $props();

	const assets = await getAssetsForCombobox();

	let search = $state('');
	let open = $state(false);

	const filtered = $derived(
		search.trim()
			? assets.filter(
					(a) =>
						a.filename.toLowerCase().includes(search.toLowerCase()) ||
						(a.caption?.toLowerCase().includes(search.toLowerCase()) ?? false)
				)
			: assets
	);

	const selectedAsset = $derived(assets.find((a) => a.id === value));

	function handleSelect(assetId: string) {
		const asset = assets.find((a) => a.id === assetId);
		if (asset) {
			onValueChange(asset.id, asset.url);
			search = '';
			open = false;
		}
	}
</script>

<Combobox.Root
	type="single"
	{value}
	onValueChange={handleSelect}
	bind:open
	inputValue={open ? search : (selectedAsset?.filename ?? '')}
>
	<div class={cn('relative', className)}>
		<Combobox.Input
			placeholder="Search assets..."
			class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 pr-8 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
			oninput={(e) => {
				search = (e.target as HTMLInputElement).value;
			}}
		/>
		<Combobox.Trigger
			class="text-muted-foreground absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
		>
			<ChevronsUpDownIcon class="size-4" />
		</Combobox.Trigger>
	</div>
	<Combobox.Content
		class="bg-popover text-popover-foreground z-50 mt-1 max-h-60 min-w-48 overflow-y-auto rounded-md border shadow-md"
		sideOffset={4}
	>
		{#each filtered as asset (asset.id)}
			<Combobox.Item
				value={asset.id}
				label={asset.filename}
				class="data-highlighted:bg-accent data-highlighted:text-accent-foreground flex cursor-default items-center gap-2 px-3 py-2 text-sm outline-none"
			>
				{#snippet children({ selected })}
					<CheckIcon class={cn('size-3.5 shrink-0', selected ? 'opacity-100' : 'opacity-0')} />
					<span class="truncate">{asset.filename}</span>
					{#if asset.caption}
						<span class="text-muted-foreground ml-auto shrink-0 text-xs">{asset.caption}</span>
					{/if}
				{/snippet}
			</Combobox.Item>
		{/each}
		{#if filtered.length === 0}
			<div class="text-muted-foreground px-3 py-2 text-sm">No assets found.</div>
		{/if}
	</Combobox.Content>
</Combobox.Root>
