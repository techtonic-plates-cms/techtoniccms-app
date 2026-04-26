<script lang="ts">
	import { Combobox } from 'bits-ui';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import { cn } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { getAssetsForCombobox } from '$lib/remotes/assets.remote';

	interface Props {
		value: string;
		onValueChange: (id: string) => void;
		class?: string;
	}

	let { value, onValueChange, class: className }: Props = $props();

	let results = $state<Array<{ id: string; filename: string; caption: string | null }>>([]);
	let selectedItem = $state<{ id: string; filename: string; caption: string | null } | undefined>(
		undefined
	);

	let search = $state('');
	let open = $state(false);

	onMount(async () => {
		results = await getAssetsForCombobox({});
		selectedItem = results.find((a) => a.id === value);
	});

	let debounceTimer: ReturnType<typeof setTimeout>;
	$effect(() => {
		const q = search;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			results = await getAssetsForCombobox({ search: q || undefined });
		}, 300);
		return () => clearTimeout(debounceTimer);
	});

	function handleSelect(assetId: string) {
		selectedItem = results.find((a) => a.id === assetId);
		onValueChange(assetId);
		search = '';
		open = false;
	}

	$inspect(results);
</script>

<Combobox.Root
	type="single"
	{value}
	onValueChange={handleSelect}
	bind:open
	inputValue={open ? search : (selectedItem?.filename ?? '')}
>
	<div class={cn('relative', className)}>
		<Combobox.Input
			placeholder="Search assets..."
			class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 pr-8 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
			oninput={(e) => {
				search = (e.target as HTMLInputElement).value;
			}}
		/>
		<Combobox.Trigger
			class="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-muted-foreground"
		>
			<ChevronsUpDownIcon class="size-4" />
		</Combobox.Trigger>
	</div>
	<Combobox.Content
		class="z-50 mt-1 max-h-60 min-w-48 overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md"
		sideOffset={4}
	>
		{#each results as asset (asset.id)}
			<Combobox.Item
				value={asset.id}
				label={asset.filename}
				class="flex cursor-default items-center gap-2 px-3 py-2 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
			>
				{#snippet children({ selected })}
					<CheckIcon class={cn('size-3.5 shrink-0', selected ? 'opacity-100' : 'opacity-0')} />
					<span class="truncate">{asset.filename}</span>
					{#if asset.caption}
						<span class="ml-auto shrink-0 text-xs text-muted-foreground">{asset.caption}</span>
					{/if}
				{/snippet}
			</Combobox.Item>
		{/each}
		{#if results.length === 0}
			<div class="px-3 py-2 text-sm text-muted-foreground">No assets found.</div>
		{/if}
	</Combobox.Content>
</Combobox.Root>
