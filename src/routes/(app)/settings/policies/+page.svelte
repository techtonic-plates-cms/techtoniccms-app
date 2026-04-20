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

	const policies = $derived(await getPolicies({ search, resourceType, actionType, effect, isActive }));

	const EFFECT_VARIANT: Record<string, 'default' | 'destructive'> = {
		ALLOW: 'default',
		DENY: 'destructive'
	};
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Policies</h1>
			<p class="text-muted-foreground text-sm">Define attribute-based access control rules</p>
		</div>
		<a href="/settings/policies/create">
			<Button>
				<PlusIcon class="mr-2 size-4" />
				New Policy
			</Button>
		</a>
	</div>

	{#if policies.length === 0}
		<p class="text-muted-foreground py-8 text-center text-sm">No policies yet.</p>
	{:else}
		<div class="rounded-lg border">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b">
						<th class="text-muted-foreground px-4 py-3 text-left font-medium">Name</th>
						<th class="text-muted-foreground px-4 py-3 text-left font-medium">Effect</th>
						<th class="text-muted-foreground hidden px-4 py-3 text-left font-medium md:table-cell">Resource</th>
						<th class="text-muted-foreground hidden px-4 py-3 text-left font-medium md:table-cell">Action</th>
						<th class="text-muted-foreground px-4 py-3 text-left font-medium">Rules</th>
					</tr>
				</thead>
				<tbody>
					{#each policies as policy (policy.id)}
						<tr class="hover:bg-muted/50 border-b last:border-0 transition-colors">
							<td class="px-4 py-3">
								<a href="/settings/policies/{policy.id}" class="font-medium transition-colors hover:text-primary">
									{policy.name}
								</a>
								{#if !policy.isActive}
									<span class="text-muted-foreground ml-1 text-xs">(inactive)</span>
								{/if}
							</td>
							<td class="px-4 py-3">
								<Badge variant={EFFECT_VARIANT[policy.effect] ?? 'outline'}>
									{policy.effect.toLowerCase()}
								</Badge>
							</td>
							<td class="text-muted-foreground hidden px-4 py-3 md:table-cell">
								{policy.resourceType.toLowerCase()}
							</td>
							<td class="text-muted-foreground hidden px-4 py-3 md:table-cell">
								{policy.actionType.toLowerCase().replace(/_/g, ' ')}
							</td>
							<td class="text-muted-foreground px-4 py-3">{policy.rules.length}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
