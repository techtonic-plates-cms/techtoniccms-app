<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Checkbox from '$lib/components/ui/checkbox/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as v from 'valibot';
	import { requireAuth } from '$lib/remotes/auth.remote';
	import { createUser } from '$lib/remotes/users.remote';
	import { getRoles } from '$lib/remotes/roles.remote';
	import { getPolicies } from '$lib/remotes/policies.remote';
	import { policyToSentence, type RuleValue } from '$lib/components/policy-rule-utils';

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

	const EFFECT_VARIANT: Record<string, 'default' | 'destructive' | 'outline'> = {
		ALLOW: 'default',
		DENY: 'destructive'
	};

	// Group policies by resource type
	const groupedPolicies = $derived(() => {
		const groups: Record<
			string,
			Array<{
				id: string;
				name: string;
				description: string | null;
				effect: string;
				resourceType: string;
				actionType: string;
				rules: Array<{ attributePath: string; operator: string; value?: RuleValue }>;
				ruleConnector: string;
			}>
		> = {};
		for (const policy of policies) {
			const rt = policy.resourceType;
			if (!groups[rt]) groups[rt] = [];
			groups[rt].push(policy as (typeof groups)[string][number]);
		}
		return groups;
	});

	const resourceTypeOrder = ['ENTRIES', 'COLLECTIONS', 'ASSETS', 'USERS'];
	const resourceTypeLabels: Record<string, string> = {
		ENTRIES: 'Entries',
		COLLECTIONS: 'Collections',
		ASSETS: 'Assets',
		USERS: 'Users'
	};

	function togglePolicy(policyId: string, checked: boolean) {
		if (checked) {
			selectedPolicyIds = [...selectedPolicyIds, policyId];
		} else {
			selectedPolicyIds = selectedPolicyIds.filter((id) => id !== policyId);
		}
	}
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
				<div class="flex items-center gap-2">
					<h2 class="text-lg font-semibold">Policies</h2>
					<span class="text-sm text-muted-foreground">
						{selectedPolicyIds.length} selected
					</span>
				</div>
			</div>
			<Separator />

			{#if policies.length === 0}
				<p class="text-sm text-muted-foreground italic">No policies available</p>
			{:else}
				<div class="space-y-6">
					{#each resourceTypeOrder as resourceType (resourceType)}
						{@const groupPolicies = groupedPolicies()[resourceType] ?? []}
						{#if groupPolicies.length > 0}
							<div>
								<h3
									class="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase"
								>
									{resourceTypeLabels[resourceType]}
								</h3>
								<div class="space-y-2">
									{#each groupPolicies as policy (policy.id)}
										<label
											class="flex cursor-pointer items-start gap-3 rounded-md p-3 text-sm transition-colors hover:bg-muted/50"
										>
											<Checkbox.Root
												checked={selectedPolicyIds.includes(policy.id)}
												onCheckedChange={(c) => togglePolicy(policy.id, !!c)}
												class="mt-0.5"
											/>
											<div class="min-w-0 flex-1">
												<div class="flex flex-wrap items-center gap-2">
													<span class="font-medium">{policy.name}</span>
													<Badge
														variant={EFFECT_VARIANT[policy.effect] ?? 'outline'}
														class="text-[10px]"
													>
														{policy.effect === 'ALLOW' ? 'Allow' : 'Block'}
													</Badge>
												</div>
												<p class="mt-1 text-xs text-muted-foreground">
													{policyToSentence(
														policy.resourceType,
														policy.actionType,
														policy.effect,
														policy.ruleConnector,
														policy.rules
													)}
												</p>
												{#if policy.description}
													<p class="mt-0.5 text-xs text-muted-foreground">
														{policy.description}
													</p>
												{/if}
											</div>
										</label>
									{/each}
								</div>
							</div>
						{/if}
					{/each}
				</div>
			{/if}
		</div>

		<!-- Section 3: Roles -->
		<div class="space-y-5 rounded-lg border p-6">
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-2">
					<h2 class="text-lg font-semibold">Roles</h2>
					<span class="text-sm text-muted-foreground">
						{selectedRoleIds.length} selected
					</span>
				</div>
			</div>
			<Separator />

			{#if roles.nodes.length === 0}
				<p class="text-sm text-muted-foreground italic">No roles available</p>
			{:else}
				<div class="space-y-2">
					{#each roles.nodes as role (role.id)}
						<label
							class="flex cursor-pointer items-start gap-3 rounded-md p-3 text-sm transition-colors hover:bg-muted/50"
						>
							<Checkbox.Root
								checked={selectedRoleIds.includes(role.id)}
								onCheckedChange={(c) => {
									if (c) {
										selectedRoleIds = [...selectedRoleIds, role.id];
									} else {
										selectedRoleIds = selectedRoleIds.filter((id) => id !== role.id);
									}
								}}
								class="mt-0.5"
							/>
							<div class="min-w-0 flex-1">
								<span class="font-medium">{role.name}</span>
								{#if role.description}
									<p class="mt-0.5 text-xs text-muted-foreground">
										{role.description}
									</p>
								{/if}
							</div>
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
