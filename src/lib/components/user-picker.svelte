<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { getUsers } from '$lib/remotes/users.remote';

	let {
		// eslint-disable-next-line no-useless-assignment
		value = $bindable(''),
		placeholder = 'Search users...',
		onSelect
	}: {
		value?: string;
		placeholder?: string;
		onSelect?: (userId: string, userName: string) => void;
	} = $props();

	let search = $state('');
	let open = $state(false);
	let users = $state<Array<{ id: string; name: string; status: string }>>([]);

	async function loadUsers() {
		const result = await getUsers({});
		users = result.nodes;
	}

	const filtered = $derived(
		users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase())).slice(0, 8)
	);

	function selectUser(user: { id: string; name: string }) {
		value = user.id;
		search = user.name;
		open = false;
		onSelect?.(user.id, user.name);
	}

	function handleFocus() {
		loadUsers();
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
			{#each filtered as user (user.id)}
				<button
					type="button"
					class="flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
					onmousedown={() => selectUser(user)}
				>
					<span class="font-medium">{user.name}</span>
					<span
						class="rounded-full px-1.5 py-0.5 text-xs"
						class:bg-green-100={user.status === 'ACTIVE'}
						class:text-green-700={user.status === 'ACTIVE'}
						class:bg-gray-100={user.status !== 'ACTIVE'}
						class:text-gray-600={user.status !== 'ACTIVE'}
					>
						{user.status.toLowerCase()}
					</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
