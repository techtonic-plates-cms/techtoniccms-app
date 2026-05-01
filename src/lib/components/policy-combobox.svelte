<script lang="ts">
	import { Combobox } from 'bits-ui';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import XIcon from '@lucide/svelte/icons/x';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { cn } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { getPoliciesForCombobox } from '$lib/remotes/policies.remote';

	interface Props {
		value?: string;
		selectedIds?: string[];
		multiple?: boolean;
		placeholder?: string;
		class?: string;
	}

	let {
		value = $bindable(''),
		selectedIds = $bindable<string[]>([]),
		multiple = false,
		placeholder = 'Search policies...',
		class: className
	}: Props = $props();

	let results = $state<
		Array<{ id: string; name: string; effect: string; resourceType: string; actionType: string }>
	>([]);
	let selectedItem = $state<
		| { id: string; name: string; effect: string; resourceType: string; actionType: string }
		| undefined
	>(undefined);

	let search = $state('');
	let open = $state(false);

	onMount(async () => {
		results = await getPoliciesForCombobox({});
		if (!multiple) {
			selectedItem = results.find((p) => p.id === value);
		}
	});

	let debounceTimer: ReturnType<typeof setTimeout>;
	$effect(() => {
		const q = search;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			results = await getPoliciesForCombobox({ search: q || undefined }).run();
		}, 300);
		return () => clearTimeout(debounceTimer);
	});

	function handleSelect(policyId: string) {
		if (multiple) {
			if (!selectedIds.includes(policyId)) {
				selectedIds = [...selectedIds, policyId];
			}
			search = '';
			open = false;
		} else {
			selectedItem = results.find((p) => p.id === policyId);
			value = policyId;
			search = '';
			open = false;
		}
	}

	function removePolicy(policyId: string) {
		selectedIds = selectedIds.filter((id) => id !== policyId);
	}

	const filteredResults = $derived(
		multiple ? results.filter((p) => !selectedIds.includes(p.id)) : results
	);

	$inspect(results);
</script>

<Combobox.Root
	type="single"
	value={multiple ? '' : value}
	onValueChange={handleSelect}
	bind:open
	inputValue={open ? search : (selectedItem?.name ?? '')}
>
	<div class={cn('relative', className)}>
		<Combobox.Input
			{placeholder}
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
		{#each filteredResults as policy (policy.id)}
			<Combobox.Item
				value={policy.id}
				label={policy.name}
				class="flex cursor-default items-center gap-2 px-3 py-2 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
			>
				{#snippet children({ selected })}
					<CheckIcon class={cn('size-3.5 shrink-0', selected ? 'opacity-100' : 'opacity-0')} />
					<span class="truncate">{policy.name}</span>
					<span class="ml-auto shrink-0 text-xs text-muted-foreground">
						{policy.effect.toLowerCase()} · {policy.resourceType.toLowerCase()} · {policy.actionType
							.toLowerCase()
							.replace(/_/g, ' ')}
					</span>
				{/snippet}
			</Combobox.Item>
		{/each}
		{#if filteredResults.length === 0}
			<div class="px-3 py-2 text-sm text-muted-foreground">No policies found.</div>
		{/if}
	</Combobox.Content>
</Combobox.Root>

{#if multiple && selectedIds.length > 0}
	<div class="flex flex-wrap gap-1.5 pt-2">
		{#each selectedIds as policyId (policyId)}
			{@const policy = results.find((p) => p.id === policyId)}
			{#if policy}
				<Badge variant="secondary" class="gap-1 pr-1.5">
					{policy.name}
					<button
						type="button"
						class="rounded-full hover:bg-muted"
						onclick={() => removePolicy(policyId)}
					>
						<XIcon class="size-3" />
					</button>
				</Badge>
			{/if}
		{/each}
	</div>
{/if}
