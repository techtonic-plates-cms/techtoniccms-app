<script lang="ts">
	import { page } from '$app/state';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { getApiKeys } from '$lib/remotes/api-keys.remote';

	const after = $derived(page.url.searchParams.get('after') ?? undefined);

	const apiKeys = $derived(await getApiKeys({ after }));
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">API Keys</h1>
			<p class="text-muted-foreground text-sm">Manage API keys for programmatic access</p>
		</div>
		<a href="/settings/api-keys/create">
			<Button>
				<PlusIcon class="mr-2 size-4" />
				New API Key
			</Button>
		</a>
	</div>

	<div class="rounded-lg border">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b">
					<th class="text-muted-foreground px-4 py-3 text-left font-medium">Name</th>
					<th class="text-muted-foreground px-4 py-3 text-left font-medium">Prefix</th>
					<th class="text-muted-foreground px-4 py-3 text-left font-medium">Status</th>
					<th class="text-muted-foreground hidden px-4 py-3 text-left font-medium md:table-cell">Expires</th>
					<th class="text-muted-foreground hidden px-4 py-3 text-left font-medium lg:table-cell">Last used</th>
				</tr>
			</thead>
			<tbody>
				{#each apiKeys.nodes as apiKey (apiKey.id)}
					<tr class="hover:bg-muted/50 border-b last:border-0 transition-colors">
						<td class="px-4 py-3">
							<a href="/settings/api-keys/{apiKey.id}" class="font-medium transition-colors hover:text-primary">
								{apiKey.name}
							</a>
						</td>
						<td class="text-muted-foreground px-4 py-3 font-mono text-xs">
							{apiKey.keyPrefix}
						</td>
						<td class="px-4 py-3">
							<Badge variant={apiKey.isActive ? 'default' : 'secondary'}>
								{apiKey.isActive ? 'Active' : 'Revoked'}
							</Badge>
						</td>
						<td class="text-muted-foreground hidden px-4 py-3 md:table-cell">
							{apiKey.expiresAt ? new Date(apiKey.expiresAt).toLocaleDateString() : '—'}
						</td>
						<td class="text-muted-foreground hidden px-4 py-3 lg:table-cell">
							{apiKey.lastUsedAt ? new Date(apiKey.lastUsedAt).toLocaleDateString() : '—'}
						</td>
					</tr>
				{/each}
				{#if apiKeys.nodes.length === 0}
					<tr>
						<td colspan="5" class="text-muted-foreground px-4 py-8 text-center italic">
							No API keys yet
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>

	{#if apiKeys.pageInfo.hasNextPage}
		<div class="flex justify-center">
			<a href="?after={apiKeys.pageInfo.endCursor}">
				<Button variant="outline">Load more</Button>
			</a>
		</div>
	{/if}
</div>
