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
			<p class="text-sm text-muted-foreground">Group permissions into reusable roles</p>
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
					<th class="px-4 py-3 text-left font-medium text-muted-foreground">Name</th>
					<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell"
						>Description</th
					>
					<th class="px-4 py-3 text-left font-medium text-muted-foreground">Policies</th>
					<th class="px-4 py-3 text-left font-medium text-muted-foreground">Users</th>
				</tr>
			</thead>
			<tbody>
				{#each roles.nodes as role (role.id)}
					<tr class="border-b transition-colors last:border-0 hover:bg-muted/50">
						<td class="px-4 py-3">
							<a
								href="/settings/roles/{role.id}"
								class="font-medium transition-colors hover:text-primary"
							>
								{role.name}
							</a>
						</td>
						<td class="hidden px-4 py-3 text-muted-foreground md:table-cell">
							{role.description ?? '—'}
						</td>
						<td class="px-4 py-3 text-muted-foreground">{role.policies.length}</td>
						<td class="px-4 py-3 text-muted-foreground">{role.users.length}</td>
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
