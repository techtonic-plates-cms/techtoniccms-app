<script lang="ts">
	import { page } from '$app/state';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as v from 'valibot';
	import { getUsers, createUser } from '$lib/remotes/users.remote';

	const search = $derived(page.url.searchParams.get('search') ?? undefined);
	const status = $derived(page.url.searchParams.get('status') ?? undefined);
	const after = $derived(page.url.searchParams.get('after') ?? undefined);

	const users = $derived(await getUsers({ search, status, after }));

	const preflight = v.object({
		name: v.pipe(v.string(), v.nonEmpty('Required')),
		_password: v.pipe(v.string(), v.nonEmpty('Required'))
	});

	const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
		ACTIVE: 'default',
		INACTIVE: 'secondary',
		BANNED: 'destructive'
	};
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Users</h1>
			<p class="text-muted-foreground text-sm">Manage user accounts and roles</p>
		</div>
		<Sheet.Root>
			<Sheet.Trigger>
				{#snippet child({ props })}
					<Button {...props}>
						<PlusIcon class="mr-2 size-4" />
						New User
					</Button>
				{/snippet}
			</Sheet.Trigger>
			<Sheet.Content side="right" class="sm:max-w-sm">
				<Sheet.Header>
					<Sheet.Title>New User</Sheet.Title>
				</Sheet.Header>
				<form {...createUser.preflight(preflight)} class="mt-6 space-y-4 px-1">
					{#each createUser.fields.allIssues() as issue (issue.message)}
						<p class="rounded border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
							{issue.message}
						</p>
					{/each}

					<div class="space-y-1.5">
						<Label for="u-name">Username</Label>
						{#each createUser.fields.name.issues() as issue (issue.message)}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
						<Input id="u-name" {...createUser.fields.name.as('text')} autocomplete="off" />
					</div>

					<div class="space-y-1.5">
						<Label for="u-pass">Password</Label>
						{#each createUser.fields._password.issues() as issue (issue.message)}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
						<Input id="u-pass" {...createUser.fields._password.as('password')} autocomplete="new-password" />
					</div>

					<div class="space-y-1.5">
						<Label for="u-status">Status</Label>
						<select id="u-status" name="status" class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm">
							<option value="ACTIVE">Active</option>
							<option value="INACTIVE">Inactive</option>
						</select>
					</div>

					<Button type="submit" class="w-full">Create User</Button>
				</form>
			</Sheet.Content>
		</Sheet.Root>
	</div>

	<div class="rounded-lg border">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b">
					<th class="text-muted-foreground px-4 py-3 text-left font-medium">Username</th>
					<th class="text-muted-foreground px-4 py-3 text-left font-medium">Status</th>
					<th class="text-muted-foreground hidden px-4 py-3 text-left font-medium md:table-cell">Roles</th>
					<th class="text-muted-foreground hidden px-4 py-3 text-left font-medium lg:table-cell">Last login</th>
				</tr>
			</thead>
			<tbody>
				{#each users.nodes as user (user.id)}
					<tr class="hover:bg-muted/50 border-b last:border-0 transition-colors">
						<td class="px-4 py-3">
							<a href="/settings/users/{user.id}" class="font-medium transition-colors hover:text-primary">
								{user.name}
							</a>
						</td>
						<td class="px-4 py-3">
							<Badge variant={STATUS_VARIANT[user.status] ?? 'outline'}>
								{user.status.charAt(0) + user.status.slice(1).toLowerCase()}
							</Badge>
						</td>
						<td class="text-muted-foreground hidden px-4 py-3 md:table-cell">
							{#if user.roles.length > 0}
								{user.roles.map((r) => r.name).join(', ')}
							{:else}
								<span class="italic">No roles</span>
							{/if}
						</td>
						<td class="text-muted-foreground hidden px-4 py-3 lg:table-cell">
							{user.lastLoginTime ? new Date(user.lastLoginTime).toLocaleDateString() : '—'}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if users.pageInfo.hasNextPage}
		<div class="flex justify-center">
			<a href="?after={users.pageInfo.endCursor}">
				<Button variant="outline">Load more</Button>
			</a>
		</div>
	{/if}
</div>
