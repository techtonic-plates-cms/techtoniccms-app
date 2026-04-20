<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import {
		getUser,
		updateUser,
		deleteUser,
		assignRole,
		unassignRole,
		assignPolicyToUser,
		unassignPolicyFromUser,
		activateUser,
		deactivateUser,
		banUser,
		unbanUser,
		changePassword
	} from '$lib/remotes/users.remote';
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
	const id = $derived(params.id);

	const user = $derived(await getUser({ id }));

	const STATUS_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
		ACTIVE: 'default',
		INACTIVE: 'secondary',
		BANNED: 'destructive'
	};

</script>

{#if !user}
	<p class="text-muted-foreground">User not found.</p>
{:else}
	<div class="space-y-8">
		<div class="flex items-center justify-between gap-4">
			<div class="flex items-center gap-3">
				<a href="/settings/users" class="text-muted-foreground hover:text-foreground transition-colors">
					<ArrowLeftIcon class="size-4" />
				</a>
				<div>
					<div class="flex items-center gap-2">
						<h1 class="text-2xl font-bold">{user.name}</h1>
						<Badge variant={STATUS_VARIANT[user.status] ?? 'outline'}>
							{user.status.charAt(0) + user.status.slice(1).toLowerCase()}
						</Badge>
					</div>
					<p class="text-muted-foreground text-xs">
						Created: {user.creationTime ? new Date(user.creationTime).toLocaleDateString() : '—'}
						· Last login: {user.lastLoginTime ? new Date(user.lastLoginTime).toLocaleDateString() : '—'}
					</p>
				</div>
			</div>

			<div class="flex items-center gap-2">
				{#if user.status === 'INACTIVE'}
					<form {...activateUser}>
						<input type="hidden" name="id" value={user.id} />
						<Button type="submit" size="sm" variant="outline">Activate</Button>
					</form>
				{:else if user.status === 'ACTIVE'}
					<form {...deactivateUser}>
						<input type="hidden" name="id" value={user.id} />
						<Button type="submit" size="sm" variant="outline">Deactivate</Button>
					</form>
				{/if}
				{#if user.status === 'BANNED'}
					<form {...unbanUser}>
						<input type="hidden" name="id" value={user.id} />
						<Button type="submit" size="sm" variant="outline">Unban</Button>
					</form>
				{:else}
					<form {...banUser}>
						<input type="hidden" name="id" value={user.id} />
						<Button type="submit" size="sm" variant="destructive">Ban</Button>
					</form>
				{/if}
			</div>
		</div>

		<section class="space-y-4 rounded-lg border p-6">
			<h2 class="font-semibold">Details</h2>
			<form {...updateUser} class="space-y-4">
				<input type="hidden" name="id" value={user.id} />
				<div class="space-y-1.5">
					<Label for="u-name">Username</Label>
					<Input id="u-name" name="name" value={user.name} />
				</div>
				<Button type="submit">Save</Button>
			</form>
		</section>

		<section class="space-y-4 rounded-lg border p-6">
			<h2 class="font-semibold">Roles</h2>
			{#if user.roles.length > 0}
				<div class="divide-y rounded-md border">
					{#each user.roles as role (role.id)}
						<div class="flex items-center justify-between px-4 py-3">
							<div>
								<a href="/settings/roles/{role.id}" class="font-medium transition-colors hover:text-primary">
									{role.name}
								</a>
								{#if role.assignedAt}
									<p class="text-muted-foreground text-xs">
										Since {new Date(role.assignedAt).toLocaleDateString()}
									</p>
								{/if}
							</div>
							<form {...unassignRole}>
								<input type="hidden" name="userId" value={user.id} />
								<input type="hidden" name="roleId" value={role.id} />
								<Button type="submit" variant="ghost" size="sm">Remove</Button>
							</form>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-muted-foreground text-sm">No roles assigned.</p>
			{/if}

			<form {...assignRole} class="flex gap-2">
				<input type="hidden" name="userId" value={user.id} />
				<Input name="roleId" placeholder="Role ID" class="flex-1" />
				<Button type="submit" variant="outline">Assign Role</Button>
			</form>
		</section>

		<section class="space-y-4 rounded-lg border p-6">
			<h2 class="font-semibold">Policies</h2>
			<form {...assignPolicyToUser} class="flex gap-2">
				<input type="hidden" name="userId" value={user.id} />
				<Input name="policyId" placeholder="Policy ID" class="flex-1" />
				<Button type="submit" variant="outline">Assign Policy</Button>
			</form>
			<form {...unassignPolicyFromUser} class="flex gap-2">
				<input type="hidden" name="userId" value={user.id} />
				<Input name="policyId" placeholder="Policy ID" class="flex-1" />
				<Button type="submit" variant="ghost">Unassign Policy</Button>
			</form>
		</section>

		<section class="space-y-4 rounded-lg border p-6">
			<h2 class="font-semibold">Change Password</h2>
			<form {...changePassword} class="space-y-4">
				<input type="hidden" name="userId" value={user.id} />
				{#each changePassword.fields._newPassword.issues() as issue (issue.message)}
					<p class="text-xs text-destructive">{issue.message}</p>
				{/each}
				<div class="space-y-1.5">
					<Label for="new-pass">New password</Label>
					<Input
						id="new-pass"
						{...changePassword.fields._newPassword.as('password')}
						autocomplete="new-password"
					/>
				</div>
				<Button type="submit" variant="outline">Change Password</Button>
			</form>
		</section>

		<section class="space-y-3 rounded-lg border border-destructive/30 p-6">
			<h2 class="text-destructive font-semibold">Danger Zone</h2>
			<form
				{...deleteUser}
				onsubmit={(e) => {
					if (!confirm(`Delete user "${user.name}"?`)) e.preventDefault();
				}}
			>
				<input type="hidden" name="id" value={user.id} />
				<Button type="submit" variant="destructive" size="sm">Delete User</Button>
			</form>
		</section>
	</div>
{/if}
