<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import XIcon from '@lucide/svelte/icons/x';
	import { getPolicies } from '$lib/remotes/policies.remote';

	let {
		value = $bindable(''),
		selectedIds = $bindable<string[]>([]),
		multiple = false,
		placeholder = 'Search policies...',
		onSelect
	}: {
		value?: string;
		selectedIds?: string[];
		multiple?: boolean;
		placeholder?: string;
		onSelect?: (policyId: string, policyName: string) => void;
	} = $props();

	let search = $state('');
	let open = $state(false);
	let policies = $state<
		Array<{ id: string; name: string; effect: string; resourceType: string; actionType: string }>
	>([]);

	async function loadPolicies() {
		const result = await getPolicies({}).run();
		policies = result.nodes;
	}

	const filtered = $derived(
		policies
			.filter((p) => {
				const matches = p.name.toLowerCase().includes(search.toLowerCase());
				if (!multiple) return matches;
				return matches && !selectedIds.includes(p.id);
			})
			.slice(0, 8)
	);

	function selectPolicy(policy: { id: string; name: string }) {
		if (multiple) {
			if (!selectedIds.includes(policy.id)) {
				selectedIds = [...selectedIds, policy.id];
			}
			search = '';
		} else {
			value = policy.id;
			search = policy.name;
		}
		open = false;
		onSelect?.(policy.id, policy.name);
	}

	function removePolicy(policyId: string) {
		selectedIds = selectedIds.filter((id) => id !== policyId);
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

	{#if multiple && selectedIds.length > 0}
		<div class="flex flex-wrap gap-1.5">
			{#each selectedIds as policyId (policyId)}
				{@const policy = policies.find((p) => p.id === policyId)}
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
</div>
