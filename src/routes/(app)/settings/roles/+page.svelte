<script lang="ts">
	import { page } from '$app/state';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import SearchIcon from '@lucide/svelte/icons/search';
	import UsersIcon from '@lucide/svelte/icons/users';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { resolve } from '$app/paths';
	import { getRoles } from '$lib/remotes/roles.remote';

	const search = $derived(page.url.searchParams.get('search') ?? undefined);
	const after = $derived(page.url.searchParams.get('after') ?? undefined);

	const roles = $derived(await getRoles({ search, after }));

	const EFFECT_VARIANT: Record<string, 'default' | 'destructive' | 'outline'> = {
		ALLOW: 'default',
		DENY: 'destructive'
	};

	const metrics = $derived({
		total: roles.nodes.length,
		totalUsers: roles.nodes.reduce((sum, r) => sum + r.users.length, 0),
		totalPolicies: roles.nodes.reduce((sum, r) => sum + r.policies.length, 0),
		unused: roles.nodes.filter((r) => r.users.length === 0).length
	});

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

	function clearFilters() {
		window.location.href = '/settings/roles';
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Roles</h1>
			<p class="text-sm text-muted-foreground">Group permissions into reusable roles</p>
		</div>
		<a href={resolve('/settings/roles/create')}>
			<Button>
				<PlusIcon class="mr-2 size-4" />
				New Role
			</Button>
		</a>
	</div>

	<!-- Metrics -->
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-lg border p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Total Roles</p>
			<p class="mt-1 text-3xl font-bold">{metrics.total}</p>
		</div>
		<div class="rounded-lg border p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Users with Roles</p>
			<div class="mt-1 flex items-center gap-2">
				<UsersIcon class="size-5 text-muted-foreground" />
				<p class="text-3xl font-bold">{metrics.totalUsers}</p>
			</div>
		</div>
		<div class="rounded-lg border p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Policies in Use</p>
			<div class="mt-1 flex items-center gap-2">
				<ShieldIcon class="size-5 text-muted-foreground" />
				<p class="text-3xl font-bold">{metrics.totalPolicies}</p>
			</div>
		</div>
		<div class="rounded-lg border p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Unused Roles</p>
			<div class="mt-1 flex items-center gap-2">
				<AlertCircleIcon class="size-5 text-muted-foreground" />
				<p class="text-3xl font-bold">{metrics.unused}</p>
			</div>
			{#if metrics.unused > 0}
				<p class="mt-1 text-xs text-muted-foreground">No users assigned</p>
			{/if}
		</div>
	</div>

	<!-- Search -->
	<div class="flex flex-wrap items-end gap-3">
		<div class="relative max-w-sm min-w-[200px] flex-1">
			<SearchIcon class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				placeholder="Search roles..."
				class="pl-9"
				bind:value={searchInput}
				onkeydown={(e) => e.key === 'Enter' && updateSearch()}
			/>
		</div>
		{#if search}
			<Button variant="ghost" size="sm" onclick={clearFilters}>Clear search</Button>
		{/if}
	</div>

	{#if roles.nodes.length === 0}
		<div class="rounded-lg border border-dashed p-12 text-center">
			<div class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
				<UsersIcon class="size-6 text-muted-foreground" />
			</div>
			<p class="font-medium">No roles found</p>
			{#if search}
				<p class="mt-1 text-sm text-muted-foreground">Try a different search term</p>
			{:else}
				<p class="mt-1 text-sm text-muted-foreground">Get started by creating your first role</p>
				<a href={resolve('/settings/roles/create')} class="mt-4 inline-block">
					<Button>
						<PlusIcon class="mr-2 size-4" />
						Create Role
					</Button>
				</a>
			{/if}
		</div>
	{:else}
		<div class="rounded-lg border">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b bg-muted/50">
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Role</th>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
							Policies
						</th>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">
							Members
						</th>
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Impact</th>
					</tr>
				</thead>
				<tbody>
					{#each roles.nodes as role (role.id)}
						<tr class="border-b transition-colors last:border-0 hover:bg-muted/50">
							<td class="px-4 py-3">
								<a
									href={resolve(('/settings/roles/' + role.id) as Parameters<typeof resolve>[0])}
									class="font-medium transition-colors hover:text-primary"
								>
									{role.name}
								</a>
								{#if role.description}
									<p class="mt-1 line-clamp-1 max-w-xs text-xs text-muted-foreground">
										{role.description}
									</p>
								{/if}
							</td>
							<td class="hidden px-4 py-3 md:table-cell">
								{#if role.policies.length > 0}
									<div class="flex flex-wrap gap-1">
										{#each role.policies.slice(0, 3) as policy (policy.id)}
											<Badge
												variant={EFFECT_VARIANT[policy.effect] ?? 'outline'}
												class="text-[10px]"
											>
												{policy.effect === 'ALLOW' ? 'Allow' : 'Block'}
												{policy.resourceType.toLowerCase()}
											</Badge>
										{/each}
										{#if role.policies.length > 3}
											<span class="text-xs text-muted-foreground">
												+{role.policies.length - 3} more
											</span>
										{/if}
									</div>
								{:else}
									<span class="text-xs text-muted-foreground italic">No policies</span>
								{/if}
							</td>
							<td class="hidden px-4 py-3 lg:table-cell">
								{#if role.users.length > 0}
									<div class="flex items-center gap-1">
										{#each role.users.slice(0, 3) as user (user.id)}
											<div
												class="flex size-7 items-center justify-center rounded-full bg-moss text-[10px] font-medium text-white"
											>
												{user.name.charAt(0).toUpperCase()}
											</div>
										{/each}
										{#if role.users.length > 3}
											<span class="text-xs text-muted-foreground">
												+{role.users.length - 3}
											</span>
										{/if}
									</div>
								{:else}
									<span class="text-xs text-muted-foreground italic">No members</span>
								{/if}
							</td>
							<td class="px-4 py-3">
								<span class="text-xs text-muted-foreground">
									{role.policies.length}
									{role.policies.length === 1 ? 'policy' : 'policies'}
									·
									{role.users.length}
									{role.users.length === 1 ? 'member' : 'members'}
								</span>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
		{#if roles.pageInfo.hasNextPage}
			<div class="flex justify-center">
				<a href={resolve(('?after=' + roles.pageInfo.endCursor) as Parameters<typeof resolve>[0])}>
					<Button variant="outline">Load more</Button>
				</a>
			</div>
		{/if}
	{/if}
</div>
