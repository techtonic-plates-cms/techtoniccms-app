<script lang="ts">
	import { Combobox } from 'bits-ui';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import { cn } from '$lib/utils.js';
	import { untrack } from 'svelte';
	import { getEntriesForCombobox } from '$lib/remotes/entries.remote';

	interface Props {
		value: string;
		collectionSlug: string;
		onValueChange: (id: string) => void;
		class?: string;
	}

	let { value, collectionSlug, onValueChange, class: className }: Props = $props();

	const entries = await getEntriesForCombobox({ slug: untrack(() => collectionSlug) });

	let search = $state('');
	let open = $state(false);

	const filtered = $derived(
		search.trim()
			? entries.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()))
			: entries
	);

	const selectedEntry = $derived(entries.find((e) => e.id === value));

	function handleSelect(entryId: string) {
		onValueChange(entryId);
		search = '';
		open = false;
	}
</script>

<Combobox.Root
	type="single"
	{value}
	onValueChange={handleSelect}
	bind:open
	inputValue={open ? search : (selectedEntry?.name ?? '')}
>
	<div class={cn('relative', className)}>
		<Combobox.Input
			placeholder="Search entries..."
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
		{#each filtered as entry (entry.id)}
			<Combobox.Item
				value={entry.id}
				label={entry.name}
				class="data-highlighted:bg-accent data-highlighted:text-accent-foreground flex cursor-default items-center gap-2 px-3 py-2 text-sm outline-none"
			>
				{#snippet children({ selected })}
					<CheckIcon class={cn('size-3.5 shrink-0', selected ? 'opacity-100' : 'opacity-0')} />
					<span class="truncate">{entry.name}</span>
					{#if entry.slug}
						<span class="text-muted-foreground ml-auto shrink-0 font-mono text-xs">{entry.slug}</span>
					{/if}
				{/snippet}
			</Combobox.Item>
		{/each}
		{#if filtered.length === 0}
			<div class="text-muted-foreground px-3 py-2 text-sm">No entries found.</div>
		{/if}
	</Combobox.Content>
</Combobox.Root>
