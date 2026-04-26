<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { getPolicies } from '$lib/remotes/policies.remote';

	let {
		value = $bindable(''),
		placeholder = 'Search policies...',
		onSelect
	}: {
		value?: string;
		placeholder?: string;
		onSelect?: (policyId: string, policyName: string) => void;
	} = $props();

	let search = $state('');
	let open = $state(false);
	let policies = $state<
		Array<{ id: string; name: string; effect: string; resourceType: string; actionType: string }>
	>([]);

	async function loadPolicies() {
		const result = await getPolicies({});
		policies = result.nodes;
	}

	const filtered = $derived(
		policies.filter((p) => p.name.toLowerCase().includes(search.toLowerCase())).slice(0, 8)
	);

	function selectPolicy(policy: { id: string; name: string }) {
		value = policy.id;
		search = policy.name;
		open = false;
		onSelect?.(policy.id, policy.name);
	}

	function handleFocus() {
		loadPolicies();
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
		<div
			class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover shadow-md"
		>
			{#each filtered as policy (policy.id)}
				<button
					type="button"
					class="w-full px-3 py-2 text-left text-sm transition-colors hover:bg-muted"
					onmousedown={() => selectPolicy(policy)}
				>
					<span class="font-medium">{policy.name}</span>
					<span class="text-xs text-muted-foreground">
						— {policy.effect.toLowerCase()} · {policy.resourceType.toLowerCase()} · {policy.actionType
							.toLowerCase()
							.replace(/_/g, ' ')}
					</span>
				</button>
			{/each}
		</div>
	{/if}
</div>
