<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Checkbox from '$lib/components/ui/checkbox/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as v from 'valibot';
	import { requireAuth } from '$lib/remotes/auth.remote';
	import { createUser } from '$lib/remotes/users.remote';
	import { getRoles } from '$lib/remotes/roles.remote';
	import { getPolicies } from '$lib/remotes/policies.remote';

	await requireAuth();

	const nameField = createUser.fields.name.as('text');
	const passwordField = createUser.fields._password.as('password');

	const roles = await getRoles({});
	const policiesData = await getPolicies({});
	const policies = policiesData.nodes;

	let selectedRoleIds = $state<string[]>([]);
	const roleIdsStr = $derived(selectedRoleIds.join(','));

	let selectedPolicyIds = $state<string[]>([]);
	const policyIdsStr = $derived(selectedPolicyIds.join(','));

	const preflight = v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required')),
		_password: v.pipe(v.string(), v.nonEmpty('Password is required'))
	});
</script>

<div class="mx-auto max-w-3xl space-y-8 px-4 py-8">
	<div class="space-y-2">
		<a
			href="/settings/users"
			class="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
		>
			<ArrowLeftIcon class="size-4" />
			Back to Users
		</a>
		<h1 class="text-3xl font-bold">New User</h1>
		<p class="text-muted-foreground">Create a new user account</p>
	</div>

	<form {...createUser.preflight(preflight)} class="space-y-6">
		<input type="hidden" name="roleIds" value={roleIdsStr} />
		<input type="hidden" name="policyIds" value={policyIdsStr} />

		{#each createUser.fields.allIssues() as issue (issue.message)}
			<div
				class="rounded border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
			>
				{issue.message}
			</div>
		{/each}

		<!-- Section 1: General -->
		<div class="space-y-5 rounded-lg border p-6">
			<h2 class="text-lg font-semibold">General</h2>
			<Separator />

			<div class="grid gap-4 sm:grid-cols-2">
				<div class="space-y-1.5">
					<Label for="u-name">Username *</Label>
					{#each createUser.fields.name.issues() as issue (issue.message)}
						<p class="text-xs text-destructive">{issue.message}</p>
					{/each}
					<Input
						id="u-name"
						name={nameField.name}
						aria-invalid={nameField['aria-invalid']}
						autocomplete="off"
						placeholder="john_doe"
					/>
				</div>

				<div class="space-y-1.5">
					<Label for="u-pass">Password *</Label>
					{#each createUser.fields._password.issues() as issue (issue.message)}
						<p class="text-xs text-destructive">{issue.message}</p>
					{/each}
					<Input
						id="u-pass"
						name={passwordField.name}
						aria-invalid={passwordField['aria-invalid']}
						type="password"
						autocomplete="new-password"
						placeholder="••••••••"
					/>
				</div>
			</div>

			<div class="space-y-1.5">
				<Label for="u-status">Status</Label>
				<Select.Root type="single" name="status" value="ACTIVE">
					<Select.Trigger id="u-status" class="w-48">
						<span>Active</span>
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="ACTIVE">Active</Select.Item>
						<Select.Item value="INACTIVE">Inactive</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<!-- Section 2: Policies -->
		<div class="space-y-5 rounded-lg border p-6">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold">Policies</h2>
				<span class="text-sm text-muted-foreground">
					{selectedPolicyIds.length} selected
				</span>
			</div>
			<Separator />

			{#if policies.length === 0}
				<p class="text-sm text-muted-foreground italic">No policies available</p>
			{:else}
				<div class="flex flex-wrap gap-3">
					{#each policies as policy (policy.id)}
						<label class="flex cursor-pointer items-center gap-2 text-sm">
							<Checkbox.Root
								checked={selectedPolicyIds.includes(policy.id)}
								onCheckedChange={(c) => {
									if (c) {
										selectedPolicyIds = [...selectedPolicyIds, policy.id];
									} else {
										selectedPolicyIds = selectedPolicyIds.filter((id) => id !== policy.id);
									}
								}}
							/>
							<span>{policy.name}</span>
							<span class="text-xs text-muted-foreground"
								>— {policy.effect.toLowerCase()} · {policy.actionType.toLowerCase()} · {policy.resourceType.toLowerCase()}</span
							>
						</label>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Section 3: Roles -->
		<div class="space-y-5 rounded-lg border p-6">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold">Roles</h2>
				<span class="text-sm text-muted-foreground">
					{selectedRoleIds.length} selected
				</span>
			</div>
			<Separator />

			{#if roles.nodes.length === 0}
				<p class="text-sm text-muted-foreground italic">No roles available</p>
			{:else}
				<div class="flex flex-wrap gap-3">
					{#each roles.nodes as role (role.id)}
						<label class="flex cursor-pointer items-center gap-2 text-sm">
							<Checkbox.Root
								checked={selectedRoleIds.includes(role.id)}
								onCheckedChange={(c) => {
									if (c) {
										selectedRoleIds = [...selectedRoleIds, role.id];
									} else {
										selectedRoleIds = selectedRoleIds.filter((id) => id !== role.id);
									}
								}}
							/>
							<span>{role.name}</span>
							{#if role.description}
								<span class="text-xs text-muted-foreground">— {role.description}</span>
							{/if}
						</label>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Form actions -->
		<div class="flex items-center justify-between border-t pt-4">
			<a href="/settings/users">
				<Button type="button" variant="ghost">Cancel</Button>
			</a>
			<Button type="submit">Create User</Button>
		</div>
	</form>
</div>
