<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
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
</script>

{#if !role}
	<p class="text-muted-foreground">Role not found.</p>
{:else}
	<div class="space-y-8">
		<div class="flex items-center gap-3">
			<a href="/settings/roles" class="text-muted-foreground hover:text-foreground transition-colors">
				<ArrowLeftIcon class="size-4" />
			</a>
			<div>
				<h1 class="text-2xl font-bold">{role.name}</h1>
				{#if role.description}
					<p class="text-muted-foreground text-sm">{role.description}</p>
				{/if}
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
						class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
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
								<div class="flex items-center gap-2">
									<a href="/settings/policies/{policy.id}" class="font-medium transition-colors hover:text-primary">
										{policy.name}
									</a>
									<Badge variant={EFFECT_VARIANT[policy.effect] ?? 'outline'}>
										{policy.effect.toLowerCase()}
									</Badge>
								</div>
								<p class="text-muted-foreground text-xs">
									{policy.actionType.toLowerCase()} · {policy.resourceType.toLowerCase()}
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
				<p class="text-muted-foreground text-sm">No policies assigned.</p>
			{/if}

			<form {...assignPolicyToRole} class="flex gap-2">
				<input type="hidden" name="roleId" value={role.id} />
				<Input name="policyId" placeholder="Policy ID" class="flex-1" />
				<Button type="submit" variant="outline">Assign Policy</Button>
			</form>
		</section>

		<section class="space-y-4 rounded-lg border p-6">
			<h2 class="font-semibold">Members</h2>
			{#if role.users.length > 0}
				<div class="divide-y rounded-md border">
					{#each role.users as u (u.id)}
						<div class="flex items-center justify-between px-4 py-3">
							<a href="/settings/users/{u.id}" class="font-medium transition-colors hover:text-primary">
								{u.name}
							</a>
							<Badge variant={u.status === 'ACTIVE' ? 'default' : u.status === 'BANNED' ? 'destructive' : 'secondary'}>
								{u.status.toLowerCase()}
							</Badge>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-muted-foreground text-sm">No members.</p>
			{/if}
		</section>

		<section class="space-y-3 rounded-lg border border-destructive/30 p-6">
			<h2 class="text-destructive font-semibold">Danger Zone</h2>
			<form
				{...deleteRole}
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
