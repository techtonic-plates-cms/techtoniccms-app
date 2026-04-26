<script lang="ts">
	import { page } from '$app/state';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { getPolicies } from '$lib/remotes/policies.remote';

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
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Policies</h1>
			<p class="text-sm text-muted-foreground">Define attribute-based access control rules</p>
		</div>
		<a href="/settings/policies/create">
			<Button>
				<PlusIcon class="mr-2 size-4" />
				New Policy
			</Button>
		</a>
	</div>

	{#if policies.length === 0}
		<p class="py-8 text-center text-sm text-muted-foreground">No policies yet.</p>
	{:else}
		<div class="rounded-lg border">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b">
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Effect</th>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell"
							>Resource</th
						>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell"
							>Action</th
						>
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Rules</th>
					</tr>
				</thead>
				<tbody>
					{#each policies as policy (policy.id)}
						<tr class="border-b transition-colors last:border-0 hover:bg-muted/50">
							<td class="px-4 py-3">
								<a
									href="/settings/policies/{policy.id}"
									class="font-medium transition-colors hover:text-primary"
								>
									{policy.name}
								</a>
								{#if !policy.isActive}
									<span class="ml-1 text-xs text-muted-foreground">(inactive)</span>
								{/if}
							</td>
							<td class="px-4 py-3">
								<Badge variant={EFFECT_VARIANT[policy.effect] ?? 'outline'}>
									{policy.effect.toLowerCase()}
								</Badge>
							</td>
							<td class="hidden px-4 py-3 text-muted-foreground md:table-cell">
								{policy.resourceType.toLowerCase()}
							</td>
							<td class="hidden px-4 py-3 text-muted-foreground md:table-cell">
								{policy.actionType.toLowerCase().replace(/_/g, ' ')}
							</td>
							<td class="px-4 py-3 text-muted-foreground">{policy.rules.length}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		{#if policiesData.pageInfo.hasNextPage}
			<div class="flex justify-center border-t p-4">
				<a
					href="/settings/policies?after={policiesData.pageInfo.endCursor}{search
						? '&search=' + encodeURIComponent(search)
						: ''}{resourceType ? '&resourceType=' + resourceType : ''}{actionType
						? '&actionType=' + actionType
						: ''}{effect ? '&effect=' + effect : ''}{isActive ? '&isActive=' + isActive : ''}"
				>
					<Button variant="outline">Load more</Button>
				</a>
			</div>
		{/if}
	{/if}
</div>
