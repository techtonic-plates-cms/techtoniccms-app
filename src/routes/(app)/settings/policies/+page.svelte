<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import FilterIcon from '@lucide/svelte/icons/filter';
	import SearchIcon from '@lucide/svelte/icons/search';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import ShieldXIcon from '@lucide/svelte/icons/shield-x';
	import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { getPolicies } from '$lib/remotes/policies.remote';
	import { policyToSentence } from '$lib/components/policy-rule-utils';
	import ImpactBadge from '$lib/components/impact-badge.svelte';

	const search = $derived(page.url.searchParams.get('search') ?? undefined);
	const resourceType = $derived(page.url.searchParams.get('resourceType') ?? undefined);
	const actionType = $derived(page.url.searchParams.get('actionType') ?? undefined);
	const effect = $derived(page.url.searchParams.get('effect') ?? undefined);
	const isActive = $derived(page.url.searchParams.get('isActive') ?? undefined);
	const after = $derived(page.url.searchParams.get('after') ?? undefined);

	const policiesData = $derived(
		await getPolicies({ search, resourceType, actionType, effect, isActive, after })
	);
	const policies = $derived(policiesData.nodes);

	const EFFECT_VARIANT: Record<string, 'default' | 'destructive'> = {
		ALLOW: 'default',
		DENY: 'destructive'
	};

	const metrics = $derived({
		total: policies.length,
		allow: policies.filter((p) => p.effect === 'ALLOW').length,
		deny: policies.filter((p) => p.effect === 'DENY').length,
		unassigned: policies.filter(
			(p) => p.assignedToRoles.length === 0 && p.assignedToUsers.length === 0
		).length
	});

	const RESOURCE_TYPES = ['ASSETS', 'COLLECTIONS', 'ENTRIES', 'USERS'];

	let searchInput = $state(page.url.searchParams.get('search') ?? '');

	function updateSearch() {
		const url = new URL(page.url);
		if (searchInput) {
			url.searchParams.set('search', searchInput);
		} else {
			url.searchParams.delete('search');
		}
		window.location.href = url.toString();
	}

	function updateFilter(key: string, value: string | undefined) {
		const url = new URL(page.url);
		if (value) {
			url.searchParams.set(key, value);
		} else {
			url.searchParams.delete(key);
		}
		url.searchParams.delete('after');
		window.location.href = url.toString();
	}

	function clearFilters() {
		window.location.href = '/settings/policies';
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Policies</h1>
			<p class="text-sm text-muted-foreground">Define attribute-based access control rules</p>
		</div>
		<a href={resolve('/settings/policies/create')}>
			<Button>
				<PlusIcon class="mr-2 size-4" />
				New Policy
			</Button>
		</a>
	</div>

	<!-- Metrics -->
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-lg border p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Total Policies</p>
			<p class="mt-1 text-3xl font-bold">{metrics.total}</p>
		</div>
		<div class="rounded-lg border border-l-4 border-l-copper p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Allow Rules</p>
			<div class="mt-1 flex items-center gap-2">
				<ShieldCheckIcon class="size-5 text-copper" />
				<p class="text-3xl font-bold">{metrics.allow}</p>
			</div>
		</div>
		<div class="rounded-lg border border-l-4 border-l-destructive p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Block Rules</p>
			<div class="mt-1 flex items-center gap-2">
				<ShieldXIcon class="size-5 text-destructive" />
				<p class="text-3xl font-bold">{metrics.deny}</p>
			</div>
		</div>
		<div class="rounded-lg border p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Unassigned</p>
			<div class="mt-1 flex items-center gap-2">
				<AlertCircleIcon class="size-5 text-muted-foreground" />
				<p class="text-3xl font-bold">{metrics.unassigned}</p>
			</div>
			{#if metrics.unassigned > 0}
				<p class="mt-1 text-xs text-muted-foreground">Not linked to any role or user</p>
			{/if}
		</div>
	</div>

	<!-- Filters -->
	<div class="flex flex-wrap items-end gap-3">
		<div class="relative max-w-sm min-w-[200px] flex-1">
			<SearchIcon class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				placeholder="Search policies..."
				class="pl-9"
				bind:value={searchInput}
				onkeydown={(e) => e.key === 'Enter' && updateSearch()}
			/>
		</div>
		<Select.Root
			type="single"
			value={resourceType}
			onValueChange={(v) => updateFilter('resourceType', v)}
		>
			<Select.Trigger class="w-[140px]">
				<span
					>{resourceType
						? resourceType.charAt(0) + resourceType.slice(1).toLowerCase()
						: 'All Resources'}</span
				>
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="">All Resources</Select.Item>
				{#each RESOURCE_TYPES as rt (rt)}
					<Select.Item value={rt}>{rt.charAt(0) + rt.slice(1).toLowerCase()}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		<Select.Root type="single" value={effect} onValueChange={(v) => updateFilter('effect', v)}>
			<Select.Trigger class="w-[130px]">
				<span>
					{#if effect === 'ALLOW'}
						Allow
					{:else if effect === 'DENY'}
						Block
					{:else}
						All Effects
					{/if}
				</span>
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="">All Effects</Select.Item>
				<Select.Item value="ALLOW">Allow</Select.Item>
				<Select.Item value="DENY">Block</Select.Item>
			</Select.Content>
		</Select.Root>
		{#if search || resourceType || actionType || effect || isActive}
			<Button variant="ghost" size="sm" onclick={clearFilters}>Clear filters</Button>
		{/if}
	</div>

	{#if policies.length === 0}
		<div class="rounded-lg border border-dashed p-12 text-center">
			<div class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
				<FilterIcon class="size-6 text-muted-foreground" />
			</div>
			<p class="font-medium">No policies found</p>
			{#if search || resourceType || effect}
				<p class="mt-1 text-sm text-muted-foreground">Try adjusting your filters</p>
			{:else}
				<p class="mt-1 text-sm text-muted-foreground">Get started by creating your first policy</p>
				<a href={resolve('/settings/policies/create')} class="mt-4 inline-block">
					<Button>
						<PlusIcon class="mr-2 size-4" />
						Create Policy
					</Button>
				</a>
			{/if}
		</div>
	{:else}
		<div class="rounded-lg border">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b bg-muted/50">
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Policy</th>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
							Effect
						</th>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">
							Rules
						</th>
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Impact</th>
					</tr>
				</thead>
				<tbody>
					{#each policies as policy (policy.id)}
						<tr
							class="border-b transition-colors last:border-0 hover:bg-muted/50 {policy.effect ===
							'ALLOW'
								? 'border-l-2 border-l-copper'
								: 'border-l-2 border-l-destructive'}"
						>
							<td class="px-4 py-3">
								<a
									href={resolve(`/settings/policies/${policy.id}`)}
									class="font-medium transition-colors hover:text-primary"
								>
									{policy.name}
								</a>
								{#if !policy.isActive}
									<span class="ml-2 text-xs text-muted-foreground">(inactive)</span>
								{/if}
								<p class="mt-1 line-clamp-2 max-w-md text-xs text-muted-foreground">
									{policyToSentence(
										policy.resourceType,
										policy.actionType,
										policy.effect,
										policy.ruleConnector,
										policy.rules
									)}
								</p>
								<div class="mt-1 flex flex-wrap gap-1">
									<span class="text-[10px] text-muted-foreground">
										{policy.resourceType.toLowerCase()} · {policy.actionType
											.toLowerCase()
											.replace(/_/g, ' ')}
									</span>
								</div>
							</td>
							<td class="hidden px-4 py-3 md:table-cell">
								<Badge variant={EFFECT_VARIANT[policy.effect] ?? 'outline'}>
									{policy.effect === 'ALLOW' ? 'Allow' : 'Block'}
								</Badge>
								<div class="mt-1 text-xs text-muted-foreground">Priority {policy.priority}</div>
							</td>
							<td class="hidden px-4 py-3 text-muted-foreground lg:table-cell">
								{policy.rules.length}
								{policy.rules.length === 1 ? 'rule' : 'rules'}
							</td>
							<td class="px-4 py-3">
								<ImpactBadge
									roleCount={policy.assignedToRoles.length}
									userCount={policy.assignedToUsers.length}
								/>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		{#if policiesData.pageInfo.hasNextPage}
			<div class="flex justify-center border-t p-4">
				<a
					href={resolve(
						`/settings/policies?after=${policiesData.pageInfo.endCursor}${
							search ? '&search=' + encodeURIComponent(search) : ''
						}${resourceType ? '&resourceType=' + resourceType : ''}${
							actionType ? '&actionType=' + actionType : ''
						}${effect ? '&effect=' + effect : ''}${isActive ? '&isActive=' + isActive : ''}`
					)}
				>
					<Button variant="outline">Load more</Button>
				</a>
			</div>
		{/if}
	{/if}
</div>
