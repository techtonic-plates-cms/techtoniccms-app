<script lang="ts">
	import { Combobox } from 'bits-ui';
	import CheckIcon from '@lucide/svelte/icons/check';
	import ChevronsUpDownIcon from '@lucide/svelte/icons/chevrons-up-down';
	import XIcon from '@lucide/svelte/icons/x';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { cn } from '$lib/utils.js';
	import { onMount } from 'svelte';
	import { getRolesForCombobox } from '$lib/remotes/roles.remote';

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
		placeholder = 'Search roles...',
		class: className
	}: Props = $props();

	let results = $state<Array<{ id: string; name: string; description: string | null }>>([]);
	let selectedItem = $state<{ id: string; name: string; description: string | null } | undefined>(
		undefined
	);

	let search = $state('');
	let open = $state(false);

	onMount(async () => {
		results = await getRolesForCombobox({});
		if (!multiple) {
			selectedItem = results.find((r) => r.id === value);
		}
	});

	let debounceTimer: ReturnType<typeof setTimeout>;
	$effect(() => {
		const q = search;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(async () => {
			results = await getRolesForCombobox({ search: q || undefined }).run();
		}, 300);
		return () => clearTimeout(debounceTimer);
	});

	function handleSelect(roleId: string) {
		if (multiple) {
			if (!selectedIds.includes(roleId)) {
				selectedIds = [...selectedIds, roleId];
			}
			search = '';
			open = false;
		} else {
			selectedItem = results.find((r) => r.id === roleId);
			value = roleId;
			search = '';
			open = false;
		}
	}

	function removeRole(roleId: string) {
		selectedIds = selectedIds.filter((id) => id !== roleId);
	}

	const filteredResults = $derived(
		multiple ? results.filter((r) => !selectedIds.includes(r.id)) : results
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
		{#each filteredResults as role (role.id)}
			<Combobox.Item
				value={role.id}
				label={role.name}
				class="flex cursor-default items-center gap-2 px-3 py-2 text-sm outline-none data-highlighted:bg-accent data-highlighted:text-accent-foreground"
			>
				{#snippet children({ selected })}
					<CheckIcon class={cn('size-3.5 shrink-0', selected ? 'opacity-100' : 'opacity-0')} />
					<span class="truncate">{role.name}</span>
					{#if role.description}
						<span class="ml-auto shrink-0 text-xs text-muted-foreground">{role.description}</span>
					{/if}
				{/snippet}
			</Combobox.Item>
		{/each}
		{#if filteredResults.length === 0}
			<div class="px-3 py-2 text-sm text-muted-foreground">No roles found.</div>
		{/if}
	</Combobox.Content>
</Combobox.Root>

{#if multiple && selectedIds.length > 0}
	<div class="flex flex-wrap gap-1.5 pt-2">
		{#each selectedIds as roleId (roleId)}
			{@const role = results.find((r) => r.id === roleId)}
			{#if role}
				<Badge variant="secondary" class="gap-1 pr-1.5">
					{role.name}
					<button
						type="button"
						class="rounded-full hover:bg-muted"
						onclick={() => removeRole(roleId)}
					>
						<XIcon class="size-3" />
					</button>
				</Badge>
			{/if}
		{/each}
	</div>
{/if}
