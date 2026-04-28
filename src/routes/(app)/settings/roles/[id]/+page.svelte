<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import InfoIcon from '@lucide/svelte/icons/info';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import PolicyPicker from '$lib/components/policy-picker.svelte';
	import {
		getRole,
		updateRole,
		deleteRole,
		assignPolicyToRole,
		unassignPolicyFromRole
	} from '$lib/remotes/roles.remote';
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
	const id = $derived(params.id);

	const role = $derived(await getRole({ id }));

	const EFFECT_VARIANT: Record<string, 'default' | 'destructive'> = {
		ALLOW: 'default',
		DENY: 'destructive'
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

	let selectedPolicyId = $state('');
	let policyExpiresAt = $state('');

	const allowedActions = $derived(
		role?.policies
			.filter((p) => p.effect === 'ALLOW')
			.map(
				(p) => `${p.actionType.toLowerCase().replace(/_/g, ' ')} ${p.resourceType.toLowerCase()}`
			) ?? []
	);

	const blockedActions = $derived(
		role?.policies
			.filter((p) => p.effect === 'DENY')
			.map(
				(p) => `${p.actionType.toLowerCase().replace(/_/g, ' ')} ${p.resourceType.toLowerCase()}`
			) ?? []
	);
</script>

{#if !role}
	<p class="text-muted-foreground">Role not found.</p>
{:else}
	<div class="space-y-8">
		<div class="flex items-center gap-3">
			<a
				href="/settings/roles"
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeftIcon class="size-4" />
			</a>
			<div>
				<h1 class="text-2xl font-bold">{role.name}</h1>
				{#if role.description}
					<p class="text-sm text-muted-foreground">{role.description}</p>
				{/if}
			</div>
		</div>

		<!-- Plain-English summary -->
		<div class="rounded-lg border p-5">
			<div class="flex items-center gap-2">
				<InfoIcon class="size-4 text-primary" />
				<h2 class="font-semibold">What this role does</h2>
			</div>
			{#if role.policies.length === 0}
				<p class="mt-3 text-sm text-muted-foreground italic">
					This role has no policies assigned. Members of this role currently have no permissions.
				</p>
			{:else}
				<div class="mt-3 space-y-3">
					{#if allowedActions.length > 0}
						<div>
							<p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Members can:
							</p>
							<ul class="mt-1 space-y-0.5">
								{#each allowedActions as action (action)}
									<li class="text-sm">
										<span class="text-copper">✓</span>
										{action}
									</li>
								{/each}
							</ul>
						</div>
					{/if}
					{#if blockedActions.length > 0}
						<div>
							<p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Members are blocked from:
							</p>
							<ul class="mt-1 space-y-0.5">
								{#each blockedActions as action (action)}
									<li class="text-sm">
										<span class="text-destructive">✗</span>
										{action}
									</li>
								{/each}
							</ul>
						</div>
					{/if}
				</div>
			{/if}
			<div class="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
				<span>{role.policies.length} {role.policies.length === 1 ? 'policy' : 'policies'}</span>
				<span>·</span>
				<span>{role.users.length} {role.users.length === 1 ? 'member' : 'members'}</span>
			</div>
		</div>

		<section class="space-y-4 rounded-lg border p-6">
			<h2 class="font-semibold">Details</h2>
			<form {...updateRole} class="space-y-4">
				<input type="hidden" name="id" value={role.id} />
				<div class="space-y-1.5">
					<Label for="r-name">Name</Label>
					<Input id="r-name" name="name" value={role.name} />
				</div>
				<div class="space-y-1.5">
					<Label for="r-desc">Description</Label>
					<textarea
						id="r-desc"
						name="description"
						rows="2"
						class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
						>{role.description ?? ''}</textarea>
				</div>
				<Button type="submit">Save</Button>
			</form>
		</section>

		<section class="space-y-4 rounded-lg border p-6">
			<h2 class="font-semibold">Policies</h2>
			{#if role.policies.length > 0}
				<div class="divide-y rounded-md border">
					{#each role.policies as policy (policy.id)}
						<div class="flex items-center justify-between px-4 py-3">
							<div class="min-w-0 flex-1">
								<div class="flex flex-wrap items-center gap-2">
									<a
										href="/settings/policies/{policy.id}"
										class="font-medium transition-colors hover:text-primary"
									>
										{policy.name}
									</a>
									<Badge variant={EFFECT_VARIANT[policy.effect] ?? 'outline'} class="text-xs">
										{policy.effect.toLowerCase()}
									</Badge>
								</div>
								<p class="text-xs text-muted-foreground">
									{policy.actionType.toLowerCase()} · {policy.resourceType.toLowerCase()}
									{#if policy.expiresAt}
										<span class:text-destructive={isExpired(policy.expiresAt)}>
											— {isExpired(policy.expiresAt) ? 'Expired' : 'Expires'}: {formatDate(
												policy.expiresAt
											)}
										</span>
									{/if}
								</p>
							</div>
							<form {...unassignPolicyFromRole}>
								<input type="hidden" name="roleId" value={role.id} />
								<input type="hidden" name="policyId" value={policy.id} />
								<Button type="submit" variant="ghost" size="sm">Remove</Button>
							</form>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-sm text-muted-foreground">No policies assigned.</p>
			{/if}

			<form {...assignPolicyToRole} class="space-y-3 border-t pt-3">
				<input type="hidden" name="roleId" value={role.id} />
				<input type="hidden" name="policyId" value={selectedPolicyId} />
				<div class="grid gap-3 sm:grid-cols-2">
					<div class="space-y-1.5">
						<Label class="text-xs text-muted-foreground">Add policy</Label>
						<PolicyPicker bind:value={selectedPolicyId} placeholder="Search for a policy..." />
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
		</section>

		<section class="space-y-4 rounded-lg border p-6">
			<h2 class="font-semibold">Members</h2>
			{#if role.users.length > 0}
				<div class="divide-y rounded-md border">
					{#each role.users as u (u.id)}
						<div class="flex items-center justify-between px-4 py-3">
							<a
								href="/settings/users/{u.id}"
								class="font-medium transition-colors hover:text-primary"
							>
								{u.name}
							</a>
							<div class="flex items-center gap-2">
								<Badge
									variant={u.status === 'ACTIVE'
										? 'default'
										: u.status === 'BANNED'
											? 'destructive'
											: 'secondary'}
									class="text-xs"
								>
									{u.status.toLowerCase()}
								</Badge>
								{#if u.expiresAt}
									<span
										class="text-xs text-muted-foreground"
										class:text-destructive={isExpired(u.expiresAt)}
									>
										{isExpired(u.expiresAt) ? 'Expired' : 'Expires'}: {formatDate(u.expiresAt)}
									</span>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-sm text-muted-foreground">No members.</p>
			{/if}
		</section>

		<section class="space-y-3 rounded-lg border border-destructive/30 p-6">
			<h2 class="font-semibold text-destructive">Danger Zone</h2>
			<form
				{...deleteRole}
				class="flex items-center gap-3"
				onsubmit={(e) => {
					if (!confirm(`Delete role "${role.name}"?`)) e.preventDefault();
				}}
			>
				<input type="hidden" name="id" value={role.id} />
				<Button type="submit" variant="destructive" size="sm">Delete Role</Button>
			</form>
		</section>
	</div>
{/if}
