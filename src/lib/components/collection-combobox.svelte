<script lang="ts">
	import { Combobox } from 'bits-ui';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import { cn } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { getCollectionsForCombobox } from '$lib/remotes/collections.remote';

	interface Props {
		value: string;
		onValueChange: (id: string) => void;
		class?: string;
	}

	let { value, onValueChange, class: className }: Props = $props();

	let results = $state<Array<{ id: string; name: string; slug: string }>>([]);
	let selectedItem = $state<{ id: string; name: string; slug: string } | undefined>(undefined);

	let search = $state('');
	let open = $state(false);

	onMount(async () => {
		results = await getCollectionsForCombobox({});
		selectedItem = results.find((c) => c.id === value);
	});

	let debounceTimer: ReturnType<typeof setTimeout>;
	$effect(() => {
		const q = search;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			results = await getCollectionsForCombobox({ search: q || undefined });
		}, 300);
		return () => clearTimeout(debounceTimer);
	});

	function handleSelect(collectionId: string) {
		selectedItem = results.find((c) => c.id === collectionId);
		onValueChange(collectionId);
		search = '';
		open = false;
	}
</script>

<Combobox.Root
	type="single"
	{value}
	onValueChange={handleSelect}
	bind:open
	inputValue={open ? search : (selectedItem?.name ?? '')}
>
	<div class={cn('relative', className)}>
		<Combobox.Input
			placeholder="Search collections..."
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
		{#each results as collection (collection.id)}
			<Combobox.Item
				value={collection.id}
				label={collection.name}
				class="data-highlighted:bg-accent data-highlighted:text-accent-foreground flex cursor-default items-center gap-2 px-3 py-2 text-sm outline-none"
			>
				{#snippet children({ selected })}
					<CheckIcon class={cn('size-3.5 shrink-0', selected ? 'opacity-100' : 'opacity-0')} />
					<span class="truncate">{collection.name}</span>
					<span class="text-muted-foreground ml-auto shrink-0 font-mono text-xs">{collection.slug}</span>
				{/snippet}
			</Combobox.Item>
		{/each}
		{#if results.length === 0}
			<div class="text-muted-foreground px-3 py-2 text-sm">No collections found.</div>
		{/if}
	</Combobox.Content>
</Combobox.Root>
