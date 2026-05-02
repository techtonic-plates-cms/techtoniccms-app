<script lang="ts">
	import { page } from '$app/state';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import SearchIcon from '@lucide/svelte/icons/search';
	import UsersIcon from '@lucide/svelte/icons/users';
	import UserCheckIcon from '@lucide/svelte/icons/user-check';
	import UserXIcon from '@lucide/svelte/icons/user-x';
	import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { resolve } from '$app/paths';
	import { getUsers } from '$lib/remotes/users.remote';

	const search = $derived(page.url.searchParams.get('search') ?? undefined);
	const status = $derived(page.url.searchParams.get('status') ?? undefined);
	const after = $derived(page.url.searchParams.get('after') ?? undefined);

	const users = $derived(await getUsers({ search, status, after }));

	const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
		ACTIVE: 'default',
		INACTIVE: 'secondary'
	};

	const metrics = $derived({
		total: users.nodes.length,
		active: users.nodes.filter((u) => u.status === 'ACTIVE').length,
		inactive: users.nodes.filter((u) => u.status === 'INACTIVE').length,
		noRoles: users.nodes.filter((u) => u.roles.length === 0).length
	});

	let searchInput = $state(page.url.searchParams.get('search') ?? '');

	function updateSearch() {
		const url = new URL(page.url);
		if (searchInput) {
			url.searchParams.set('search', searchInput);
		} else {
			url.searchParams.delete('search');
		}
		url.searchParams.delete('after');
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
		window.location.href = '/settings/users';
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Users</h1>
			<p class="text-sm text-muted-foreground">Manage user accounts and roles</p>
		</div>
		<a href={resolve('/settings/users/create')}>
			<Button>
				<PlusIcon class="mr-2 size-4" />
				New User
			</Button>
		</a>
	</div>

	<!-- Metrics -->
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-lg border p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Total Users</p>
			<p class="mt-1 text-3xl font-bold">{metrics.total}</p>
		</div>
		<div class="rounded-lg border border-l-4 border-l-copper p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Active Users</p>
			<div class="mt-1 flex items-center gap-2">
				<UserCheckIcon class="size-5 text-copper" />
				<p class="text-3xl font-bold">{metrics.active}</p>
			</div>
		</div>
		<div class="rounded-lg border border-l-4 border-l-muted p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Inactive Users</p>
			<div class="mt-1 flex items-center gap-2">
				<UserXIcon class="size-5 text-muted-foreground" />
				<p class="text-3xl font-bold">{metrics.inactive}</p>
			</div>
		</div>
		<div class="rounded-lg border p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Without Roles</p>
			<div class="mt-1 flex items-center gap-2">
				<AlertCircleIcon class="size-5 text-muted-foreground" />
				<p class="text-3xl font-bold">{metrics.noRoles}</p>
			</div>
			{#if metrics.noRoles > 0}
				<p class="mt-1 text-xs text-muted-foreground">No roles assigned</p>
			{/if}
		</div>
	</div>

	<!-- Filters -->
	<div class="flex flex-wrap items-end gap-3">
		<div class="relative max-w-sm min-w-50 flex-1">
			<SearchIcon class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				placeholder="Search users..."
				class="pl-9"
				bind:value={searchInput}
				onkeydown={(e) => e.key === 'Enter' && updateSearch()}
			/>
		</div>
		<Select.Root type="single" value={status} onValueChange={(v) => updateFilter('status', v)}>
			<Select.Trigger class="w-35">
				<span>
					{#if status === 'ACTIVE'}
						Active
					{:else if status === 'INACTIVE'}
						Inactive
					{:else}
						All Status
					{/if}
				</span>
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="">All Status</Select.Item>
				<Select.Item value="ACTIVE">Active</Select.Item>
				<Select.Item value="INACTIVE">Inactive</Select.Item>
			</Select.Content>
		</Select.Root>
		{#if search || status}
			<Button variant="ghost" size="sm" onclick={clearFilters}>Clear filters</Button>
		{/if}
	</div>

	{#if users.nodes.length === 0}
		<div class="rounded-lg border border-dashed p-12 text-center">
			<div class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
				<UsersIcon class="size-6 text-muted-foreground" />
			</div>
			<p class="font-medium">No users found</p>
			{#if search || status}
				<p class="mt-1 text-sm text-muted-foreground">Try adjusting your filters</p>
			{:else}
				<p class="mt-1 text-sm text-muted-foreground">Get started by creating your first user</p>
				<a href={resolve('/settings/users/create')} class="mt-4 inline-block">
					<Button>
						<PlusIcon class="mr-2 size-4" />
						Create User
					</Button>
				</a>
			{/if}
		</div>
	{:else}
		<div class="rounded-lg border">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b bg-muted/50">
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Username</th>
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Status</th>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell"
							>Roles</th
						>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell"
							>Last login</th
						>
					</tr>
				</thead>
				<tbody>
					{#each users.nodes as user (user.id)}
						<tr class="border-b transition-colors last:border-0 hover:bg-muted/50">
							<td class="px-4 py-3">
								<a
									href={resolve(`/settings/users/${user.id}`)}
									class="font-medium transition-colors hover:text-primary"
								>
									{user.name}
								</a>
								{#if user.roles.length === 0}
									<span class="ml-2 text-xs text-muted-foreground">(no roles)</span>
								{/if}
							</td>
							<td class="px-4 py-3">
								<Badge variant={STATUS_VARIANT[user.status] ?? 'outline'}>
									{user.status.charAt(0) + user.status.slice(1).toLowerCase()}
								</Badge>
							</td>
							<td class="hidden px-4 py-3 text-muted-foreground md:table-cell">
								{#if user.roles.length > 0}
									{user.roles.map((r) => r.role.name).join(', ')}
								{:else}
									<span class="italic">No roles</span>
								{/if}
							</td>
							<td class="hidden px-4 py-3 text-muted-foreground lg:table-cell">
								{user.lastLoginTime ? new Date(user.lastLoginTime).toLocaleDateString() : '—'}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if users.pageInfo.hasNextPage}
			<div class="flex justify-center">
				<a
					href={resolve(
						`/(app)/settings/users?after=${users.pageInfo.endCursor}&search=${search || undefined}&status=${status || undefined}`
					)}
				>
					<Button variant="outline">Load more</Button>
				</a>
			</div>
		{/if}
	{/if}
</div>
