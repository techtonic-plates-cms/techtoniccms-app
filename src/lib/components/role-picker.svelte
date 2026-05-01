<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import XIcon from '@lucide/svelte/icons/x';
	import { getRoles } from '$lib/remotes/roles.remote';

	let {
		// eslint-disable-next-line no-useless-assignment
		value = $bindable(''),
		// eslint-disable-next-line no-useless-assignment
		selectedIds = $bindable<string[]>([]),
		multiple = false,
		placeholder = 'Search roles...',
		onSelect
	}: {
		value?: string;
		selectedIds?: string[];
		multiple?: boolean;
		placeholder?: string;
		onSelect?: (roleId: string, roleName: string) => void;
	} = $props();

	let search = $state('');
	let open = $state(false);
	let roles = $state<Array<{ id: string; name: string; description: string | null }>>([]);

	async function loadRoles() {
		const result = await getRoles({});
		roles = result.nodes;
	}

	const filtered = $derived(
		roles
			.filter((r) => {
				const matches = r.name.toLowerCase().includes(search.toLowerCase());
				if (!multiple) return matches;
				return matches && !selectedIds.includes(r.id);
			})
			.slice(0, 8)
	);

	function selectRole(role: { id: string; name: string }) {
		if (multiple) {
			if (!selectedIds.includes(role.id)) {
				selectedIds = [...selectedIds, role.id];
			}
			search = '';
		} else {
			value = role.id;
			search = role.name;
		}
		open = false;
		onSelect?.(role.id, role.name);
	}

	function removeRole(roleId: string) {
		selectedIds = selectedIds.filter((id) => id !== roleId);
	}

	function handleFocus() {
		loadRoles();
		open = true;
	}

	function handleBlur() {
		setTimeout(() => {
			open = false;
		}, 150);
	}
</script>

<div class="relative space-y-2">
	<Input
		{placeholder}
		value={search}
		oninput={(e) => {
			search = e.currentTarget.value;
			open = true;
		}}
		onfocus={handleFocus}
		onblur={handleBlur}
		autocomplete="off"
	/>
	{#if open && filtered.length > 0}
		<div class="absolute z-10 mt-1 w-full rounded-md border bg-popover shadow-md">
			{#each filtered as role (role.id)}
				<button
					type="button"
					class="w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
					onmousedown={() => selectRole(role)}
				>
					<span class="font-medium">{role.name}</span>
					{#if role.description}
						<span class="text-xs text-muted-foreground"> — {role.description}</span>
					{/if}
				</button>
			{/each}
		</div>
	{/if}

	{#if multiple && selectedIds.length > 0}
		<div class="flex flex-wrap gap-1.5">
			{#each selectedIds as roleId (roleId)}
				{@const role = roles.find((r) => r.id === roleId)}
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
</div>
