<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { getRoles } from '$lib/remotes/roles.remote';

	let {
		value = $bindable(''),
		placeholder = 'Search roles...',
		onSelect
	}: {
		value?: string;
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
		roles.filter((r) => r.name.toLowerCase().includes(search.toLowerCase())).slice(0, 8)
	);

	function selectRole(role: { id: string; name: string }) {
		value = role.id;
		search = role.name;
		open = false;
		onSelect?.(role.id, role.name);
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

<div class="relative">
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
</div>
