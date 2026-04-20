<script lang="ts">
	import { page } from '$app/state';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import { Button } from '$lib/components/ui/button/index.js';
	import { getRoles } from '$lib/remotes/roles.remote';

	const search = $derived(page.url.searchParams.get('search') ?? undefined);
	const after = $derived(page.url.searchParams.get('after') ?? undefined);

	const roles = $derived(await getRoles({ search, after }));
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Roles</h1>
			<p class="text-muted-foreground text-sm">Group permissions into reusable roles</p>
		</div>
		<a href="/settings/roles/create">
			<Button>
				<PlusIcon class="mr-2 size-4" />
				New Role
			</Button>
		</a>
	</div>

	<div class="rounded-lg border">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b">
					<th class="text-muted-foreground px-4 py-3 text-left font-medium">Name</th>
					<th class="text-muted-foreground hidden px-4 py-3 text-left font-medium md:table-cell">Description</th>
					<th class="text-muted-foreground px-4 py-3 text-left font-medium">Policies</th>
					<th class="text-muted-foreground px-4 py-3 text-left font-medium">Users</th>
				</tr>
			</thead>
			<tbody>
				{#each roles.nodes as role (role.id)}
					<tr class="hover:bg-muted/50 border-b last:border-0 transition-colors">
						<td class="px-4 py-3">
							<a href="/settings/roles/{role.id}" class="font-medium transition-colors hover:text-primary">
								{role.name}
							</a>
						</td>
						<td class="text-muted-foreground hidden px-4 py-3 md:table-cell">
							{role.description ?? '—'}
						</td>
						<td class="text-muted-foreground px-4 py-3">{role.policies.length}</td>
						<td class="text-muted-foreground px-4 py-3">{role.users.length}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if roles.pageInfo.hasNextPage}
		<div class="flex justify-center">
			<a href="?after={roles.pageInfo.endCursor}">
				<Button variant="outline">Load more</Button>
			</a>
		</div>
	{/if}
</div>
