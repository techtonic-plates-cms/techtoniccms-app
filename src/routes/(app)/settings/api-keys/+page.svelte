<script lang="ts">
	import { resolve } from '$app/paths';
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
			<p class="text-sm text-muted-foreground">Manage API keys for programmatic access</p>
		</div>
		<a href={resolve('/settings/api-keys/create')}>
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
					<th class="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
					<th class="px-4 py-3 text-left font-medium text-muted-foreground">Prefix</th>
					<th class="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
					<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell"
						>Expires</th
					>
					<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell"
						>Last used</th
					>
				</tr>
			</thead>
			<tbody>
				{#each apiKeys.nodes as apiKey (apiKey.id)}
					<tr class="border-b transition-colors last:border-0 hover:bg-muted/50">
						<td class="px-4 py-3">
							<a
								href={resolve('/settings/api-keys/{apiKey.id}')}
								class="font-medium transition-colors hover:text-primary"
							>
								{apiKey.name}
							</a>
						</td>
						<td class="px-4 py-3 font-mono text-xs text-muted-foreground">
							{apiKey.keyPrefix}
						</td>
						<td class="px-4 py-3">
							<Badge variant={apiKey.isActive ? 'default' : 'secondary'}>
								{apiKey.isActive ? 'Active' : 'Revoked'}
							</Badge>
						</td>
						<td class="hidden px-4 py-3 text-muted-foreground md:table-cell">
							{apiKey.expiresAt ? new Date(apiKey.expiresAt).toLocaleDateString() : '—'}
						</td>
						<td class="hidden px-4 py-3 text-muted-foreground lg:table-cell">
							{apiKey.lastUsedAt ? new Date(apiKey.lastUsedAt).toLocaleDateString() : '—'}
						</td>
					</tr>
				{/each}
				{#if apiKeys?.nodes?.length === 0}
					<tr>
						<td colspan="5" class="px-4 py-8 text-center text-muted-foreground italic">
							No API keys yet
						</td>
					</tr>
				{/if}
			</tbody>
		</table>
	</div>

	{#if apiKeys.pageInfo.hasNextPage}
		<div class="flex justify-center">
			<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
			<a href="?after={apiKeys.pageInfo.endCursor}">
				<Button variant="outline">Load more</Button>
			</a>
		</div>
	{/if}
</div>
