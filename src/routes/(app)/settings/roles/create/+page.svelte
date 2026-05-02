<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Checkbox from '$lib/components/ui/checkbox/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as v from 'valibot';
	import { resolve } from '$app/paths';
	import { isHttpError } from '@sveltejs/kit';
	import { requireAuth } from '$lib/remotes/auth.remote';
	import { createRole } from '$lib/remotes/roles.remote';
	import { getPolicies } from '$lib/remotes/policies.remote';
	import { policyToSentence, type RuleValue } from '$lib/components/policy-rule-utils';

	await requireAuth();

	const nameField = createRole.fields.name.as('text');

	const policiesData = await getPolicies({}).catch((err) => {
		if (isHttpError(err, 403)) {
			return { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } };
		}
		throw err;
	});
	const policies = policiesData.nodes;

	let selectedPolicyIds = $state<string[]>([]);
	const policyIdsStr = $derived(selectedPolicyIds.join(','));

	const preflight = v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required'))
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
		for (const policy of policies || []) {
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
			href={resolve('/settings/roles')}
			class="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
		>
			<ArrowLeftIcon class="size-4" />
			Back to Roles
		</a>
		<h1 class="text-3xl font-bold">New Role</h1>
		<p class="text-muted-foreground">Create a new role to group policies</p>
	</div>

	<form {...createRole.preflight(preflight)} class="space-y-6">
		<input type="hidden" name="policyIds" value={policyIdsStr} />

		{#each createRole.fields.allIssues() as issue (issue.message)}
			<div
				class="rounded border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
			>
				{issue.message}
			</div>
		{/each}

		<div class="space-y-5 rounded-lg border p-6">
			<h2 class="text-lg font-semibold">General</h2>
			<Separator />

			<div class="space-y-1.5">
				<Label for="r-name">Name *</Label>
				{#each createRole.fields.name.issues() as issue (issue.message)}
					<p class="text-xs text-destructive">{issue.message}</p>
				{/each}
				<Input
					id="r-name"
					name={nameField.name}
					aria-invalid={nameField['aria-invalid']}
					autocomplete="off"
					placeholder="editor"
				/>
			</div>

			<div class="space-y-1.5">
				<Label for="r-desc">Description</Label>
				<textarea
					id="r-desc"
					name="description"
					rows="2"
					placeholder="A brief description of this role"
					class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
				></textarea>
			</div>
		</div>

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

			{#if policies?.length === 0}
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

		<div class="flex items-center justify-between border-t pt-4">
			<a href={resolve('/settings/roles')}>
				<Button type="button" variant="ghost">Cancel</Button>
			</a>
			<Button type="submit">Create Role</Button>
		</div>
	</form>
</div>
