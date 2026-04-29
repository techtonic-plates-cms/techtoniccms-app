<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { resolve } from '$app/paths';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import RolePicker from '$lib/components/role-picker.svelte';
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

	function formatDate(dateStr: string | null | undefined): string {
		if (!dateStr) return '';
		try {
			return new Date(dateStr).toLocaleDateString();
		} catch {
			return dateStr;
		}
	}

	function isExpired(dateStr: string | null | undefined): boolean {
		if (!dateStr) return false;
		try {
			return new Date(dateStr) < new Date();
		} catch {
			return false;
		}
	}

	let selectedRoleId = $state('');
	let roleExpiresAt = $state('');
	let selectedPolicyId = $state('');
	let policyExpiresAt = $state('');
</script>

{#if !user}
	<p class="text-muted-foreground">User not found.</p>
{:else}
	<div class="space-y-8">
		<div class="flex items-center justify-between gap-4">
			<div class="flex items-center gap-3">
				<a
					href={resolve('/settings/users')}
					class="text-muted-foreground transition-colors hover:text-foreground"
				>
					<ArrowLeftIcon class="size-4" />
				</a>
				<div>
					<div class="flex items-center gap-2">
						<h1 class="text-2xl font-bold">{user.name}</h1>
						<Badge variant={STATUS_VARIANT[user.status] ?? 'outline'}>
							{user.status.charAt(0) + user.status.slice(1).toLowerCase()}
						</Badge>
					</div>
					<p class="text-xs text-muted-foreground">
						Created: {user.creationTime ? new Date(user.creationTime).toLocaleDateString() : '—'}
						· Last login: {user.lastLoginTime
							? new Date(user.lastLoginTime).toLocaleDateString()
							: '—'}
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
								<a
									href={resolve(('/settings/roles/' + role.id) as Parameters<typeof resolve>[0])}
									class="font-medium transition-colors hover:text-primary"
								>
									{role.name}
								</a>
								{#if role.expiresAt}
									<p
										class="text-xs"
										class:text-muted-foreground={!isExpired(role.expiresAt)}
										class:text-destructive={isExpired(role.expiresAt)}
									>
										{isExpired(role.expiresAt) ? 'Expired' : 'Expires'}: {formatDate(
											role.expiresAt
										)}
									</p>
								{:else if role.assignedAt}
									<p class="text-xs text-muted-foreground">Since {formatDate(role.assignedAt)}</p>
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
				<p class="text-sm text-muted-foreground">No roles assigned.</p>
			{/if}

			<form {...assignRole} class="space-y-3 border-t pt-3">
				<input type="hidden" name="userId" value={user.id} />
				<input type="hidden" name="roleId" value={selectedRoleId} />
				<div class="grid gap-3 sm:grid-cols-2">
					<div class="space-y-1.5">
						<Label class="text-xs text-muted-foreground">Add role</Label>
						<RolePicker bind:value={selectedRoleId} placeholder="Search for a role..." />
					</div>
					<div class="space-y-1.5">
						<Label class="text-xs text-muted-foreground">Optional expiration</Label>
						<Input type="datetime-local" name="expiresAt" bind:value={roleExpiresAt} />
					</div>
				</div>
				<Button type="submit" variant="outline" size="sm" disabled={!selectedRoleId}
					>Assign Role</Button
				>
			</form>
		</section>

		<section class="space-y-4 rounded-lg border p-6">
			<h2 class="font-semibold">Policies</h2>
			<p class="text-sm text-muted-foreground">
				Assign policies directly to this user for one-off exceptions.
			</p>
			<form {...assignPolicyToUser} class="space-y-3">
				<input type="hidden" name="userId" value={user.id} />
				<input type="hidden" name="policyId" value={selectedPolicyId} />
				<div class="grid gap-3 sm:grid-cols-2">
					<div class="space-y-1.5">
						<Label class="text-xs text-muted-foreground">Add policy</Label>
						<!-- For now we use a simple text input since PolicyPicker needs integration -->
						<Input name="policyId" placeholder="Policy ID" bind:value={selectedPolicyId} />
					</div>
					<div class="space-y-1.5">
						<Label class="text-xs text-muted-foreground">Optional expiration</Label>
						<Input type="datetime-local" name="expiresAt" bind:value={policyExpiresAt} />
					</div>
				</div>
				<Button type="submit" variant="outline" size="sm" disabled={!selectedPolicyId}
					>Assign Policy</Button
				>
			</form>

			<form {...unassignPolicyFromUser} class="flex gap-2 pt-2">
				<input type="hidden" name="userId" value={user.id} />
				<Input name="policyId" placeholder="Policy ID to remove" class="flex-1" />
				<Button type="submit" variant="ghost">Unassign</Button>
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
			<h2 class="font-semibold text-destructive">Danger Zone</h2>
			<form
				{...deleteUser}
				class="flex items-center gap-3"
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
