<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import TrashIcon from '@lucide/svelte/icons/trash-2';
	import CopyIcon from '@lucide/svelte/icons/copy';
	import InfoIcon from '@lucide/svelte/icons/info';
	import UsersIcon from '@lucide/svelte/icons/users';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import { resolve } from '$app/paths';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import HelpTooltip from '$lib/components/help-tooltip.svelte';
	import {
		getPolicy,
		updatePolicy,
		deletePolicy,
		addPolicyRule,
		deletePolicyRule,
		duplicatePolicy
	} from '$lib/remotes/policies.remote';
	import {
		ruleToSentence,
		valueToDisplayString,
		getAttributeLabel,
		getOperatorLabel,
		policyToSentence
	} from '$lib/components/policy-rule-utils';
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
	const id = $derived(params.id);

	const policy = $derived(await getPolicy({ id }));

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

	const totalAssignments = $derived(
		(policy?.assignedToRoles.length ?? 0) + (policy?.assignedToUsers.length ?? 0)
	);
</script>

{#if !policy}
	<p class="text-muted-foreground">Policy not found.</p>
{:else}
	<div class="space-y-8">
		<div class="flex items-center justify-between gap-4">
			<div class="flex items-center gap-3">
				<a
					href={resolve('/settings/policies')}
					class="text-muted-foreground transition-colors hover:text-foreground"
				>
					<ArrowLeftIcon class="size-4" />
				</a>
				<div>
					<div class="flex flex-wrap items-center gap-2">
						<h1 class="text-2xl font-bold">{policy.name}</h1>
						<Badge variant={EFFECT_VARIANT[policy.effect] ?? 'outline'}
							>{policy.effect === 'ALLOW' ? 'Allow' : 'Block'}</Badge
						>
						{#if !policy.isActive}
							<Badge variant="secondary">inactive</Badge>
						{/if}
					</div>
					<p class="text-xs text-muted-foreground">
						{policy.resourceType.toLowerCase()} · {policy.actionType
							.toLowerCase()
							.replace(/_/g, ' ')}
						· priority {policy.priority}
					</p>
				</div>
			</div>
			<form {...duplicatePolicy}>
				<input type="hidden" name="id" value={policy.id} />
				<Button type="submit" variant="outline" size="sm">
					<CopyIcon class="mr-1.5 size-3.5" />
					Duplicate
				</Button>
			</form>
		</div>

		<!-- Policy at a glance -->
		<div class="rounded-lg border p-5">
			<div class="flex items-center gap-2">
				<InfoIcon class="size-4 text-primary" />
				<h2 class="font-semibold">Policy at a glance</h2>
			</div>
			<div class="mt-3 rounded-md bg-muted/50 p-4">
				<p class="text-base leading-relaxed">
					{policyToSentence(
						policy.resourceType,
						policy.actionType,
						policy.effect,
						policy.ruleConnector,
						policy.rules
					)}
				</p>
			</div>
			<div class="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
				<span class="inline-flex items-center gap-1">
					<ShieldIcon class="size-3.5" />
					{policy.assignedToRoles.length}
					{policy.assignedToRoles.length === 1 ? 'role' : 'roles'}
				</span>
				<span class="inline-flex items-center gap-1">
					<UsersIcon class="size-3.5" />
					{policy.assignedToUsers.length}
					{policy.assignedToUsers.length === 1 ? 'user' : 'users'}
				</span>
				{#if totalAssignments === 0}
					<span class="text-xs italic">This policy is not assigned to anyone yet.</span>
				{/if}
			</div>
		</div>

		<!-- Metadata -->
		<section class="space-y-4 rounded-lg border p-6">
			<h2 class="font-semibold">Details</h2>
			<form {...updatePolicy} class="space-y-4">
				<input type="hidden" name="id" value={policy.id} />
				<div class="grid gap-4 sm:grid-cols-2">
					<div class="space-y-1.5">
						<Label for="p-name">Name</Label>
						<Input id="p-name" name="name" value={policy.name} />
					</div>
					<div class="space-y-1.5">
						<Label for="p-priority">Priority</Label>
						<Input id="p-priority" name="priority" type="number" value={policy.priority} />
					</div>
				</div>
				<div class="space-y-1.5">
					<Label for="p-desc">Description</Label>
					<textarea
						id="p-desc"
						name="description"
						rows="2"
						class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
						>{policy.description ?? ''}</textarea
					>
				</div>
				<div class="grid gap-3 sm:grid-cols-2">
					<div class="space-y-1.5">
						<Label for="p-effect">Effect</Label>
						<select
							id="p-effect"
							name="effect"
							class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
						>
							<option value="ALLOW" selected={policy.effect === 'ALLOW'}>Allow</option>
							<option value="DENY" selected={policy.effect === 'DENY'}>Block</option>
						</select>
					</div>
					<div class="space-y-1.5">
						<div class="flex items-center gap-1.5">
							<Label for="p-connector">Rule connector</Label>
							<HelpTooltip
								text="AND = all rules must match. OR = any single rule matching is enough."
							/>
						</div>
						<select
							id="p-connector"
							name="ruleConnector"
							class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
						>
							<option value="AND" selected={policy.ruleConnector === 'AND'}
								>AND (all rules must match)</option
							>
							<option value="OR" selected={policy.ruleConnector === 'OR'}
								>OR (any rule matches)</option
							>
						</select>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<input
						id="p-active"
						type="checkbox"
						name="isActive"
						class="size-4 rounded"
						checked={policy.isActive}
					/>
					<Label for="p-active">Active</Label>
				</div>
				<Button type="submit">Save changes</Button>
			</form>
		</section>

		<!-- Rules -->
		<section class="space-y-4 rounded-lg border p-6">
			<div class="flex items-center justify-between">
				<h2 class="font-semibold">Rules</h2>
				<span class="text-xs text-muted-foreground"
					>Connected with <strong>{policy.ruleConnector}</strong></span
				>
			</div>

			{#if policy.rules.length > 0}
				<div class="space-y-3">
					{#each policy.rules as rule (rule.id)}
						<div class="rounded-md border p-4 transition-colors hover:bg-muted/30">
							<div class="flex items-start justify-between gap-3">
								<div class="min-w-0 flex-1">
									<p class="text-sm leading-relaxed">
										{ruleToSentence(rule.attributePath, rule.operator, rule.value)}
									</p>
									{#if rule.description}
										<p class="mt-1 text-xs text-muted-foreground">{rule.description}</p>
									{/if}
									{#if !rule.isActive}
										<span class="mt-1 inline-block text-xs text-destructive">inactive</span>
									{/if}
								</div>
								<form
									{...deletePolicyRule}
									class="ml-4"
									onsubmit={(e) => {
										if (!confirm('Delete this rule?')) e.preventDefault();
									}}
								>
									<input type="hidden" name="policyId" value={policy.id} />
									<input type="hidden" name="ruleId" value={rule.id} />
									<button
										type="submit"
										class="p-1 text-muted-foreground transition-colors hover:text-destructive"
									>
										<TrashIcon class="size-4" />
									</button>
								</form>
							</div>
							<div class="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
								<span class="rounded bg-muted px-1.5 py-0.5"
									>{getAttributeLabel(rule.attributePath)}</span
								>
								<span class="rounded bg-muted px-1.5 py-0.5">{getOperatorLabel(rule.operator)}</span
								>
								{#if rule.value}
									<span class="rounded bg-muted px-1.5 py-0.5">
										{valueToDisplayString(rule.value)}
									</span>
								{/if}
							</div>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-sm text-muted-foreground">
					No rules. This policy matches all requests for its resource/action.
				</p>
			{/if}

			<!-- Add rule -->
			<div class="space-y-4 rounded-md border p-4">
				<h3 class="flex items-center gap-2 font-medium">
					<PlusIcon class="size-4" />
					Add Rule
				</h3>
				<form {...addPolicyRule} class="space-y-3">
					<input type="hidden" name="policyId" value={policy.id} />
					<div class="grid gap-3 sm:grid-cols-2">
						<div class="space-y-1.5">
							<div class="flex items-center gap-1.5">
								<Label for="r-attr">When</Label>
								<HelpTooltip
									text="The property we're checking. 'User's role' checks the person making the request. 'Who created the entry' checks the content itself."
								/>
							</div>
							<select
								id="r-attr"
								name="attributePath"
								class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
							>
								<option value="SUBJECT_ROLE">User's role</option>
								<option value="SUBJECT_STATUS">User's status</option>
								<option value="RESOURCE_ENTRY_CREATED_BY">Who created the entry</option>
								<option value="RESOURCE_ENTRY_COLLECTION_ID"
									>Which collection the entry belongs to</option
								>
								<option value="RESOURCE_ENTRY_STATUS">Entry status</option>
								<option value="ENVIRONMENT_CURRENT_TIME">Current time</option>
							</select>
						</div>
						<div class="space-y-1.5">
							<div class="flex items-center gap-1.5">
								<Label for="r-op">Condition</Label>
								<HelpTooltip
									text="How we compare the property to the value. 'Is exactly' for exact matches. 'Is the same as' to compare two properties."
								/>
							</div>
							<select
								id="r-op"
								name="operator"
								class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
							>
								<option value="EQ">is exactly</option>
								<option value="NE">is not</option>
								<option value="IN">is one of</option>
								<option value="GT">is greater than</option>
								<option value="LT">is less than</option>
								<option value="IS_NULL">is empty / not set</option>
								<option value="IS_NOT_NULL">is set</option>
								<option value="EQ_CONTEXT_REF">is the same as</option>
							</select>
						</div>
					</div>
					<div class="space-y-1.5">
						<Label for="r-val">Value</Label>
						<Input id="r-val" name="valueJson" placeholder="e.g. editor or editor, admin or true" />
						<p class="text-xs text-muted-foreground">
							For "is the same as", enter a JSON object like
							<code class="rounded bg-muted px-1 py-0.5 text-[10px]">
								&#123;"contextReferencePath":"SUBJECT_ID"&#125;
							</code>
						</p>
					</div>
					<div class="flex items-center gap-2">
						<input id="r-active" type="checkbox" name="isActive" class="size-4 rounded" checked />
						<Label for="r-active">Active</Label>
					</div>
					<Button type="submit" variant="outline">
						<PlusIcon class="mr-2 size-4" />
						Add Rule
					</Button>
				</form>
			</div>
		</section>

		<!-- Assignments -->
		{#if policy.assignedToRoles.length > 0 || policy.assignedToUsers.length > 0}
			<section class="space-y-3 rounded-lg border p-6">
				<h2 class="font-semibold">Assigned to</h2>
				{#if policy.assignedToRoles.length > 0}
					<div>
						<p class="mb-2 text-xs tracking-wide text-muted-foreground uppercase">Roles</p>
						<div class="flex flex-wrap gap-2">
							{#each policy.assignedToRoles as role (role.id)}
								<a
									href={resolve(`/(app)/settings/roles/[id]`, { id: role.id })}
									class="inline-flex items-center gap-1 text-sm hover:underline"
								>
									{role.name}
									{#if role.expiresAt}
										<span
											class="text-xs text-muted-foreground"
											class:text-destructive={isExpired(role.expiresAt)}
										>
											({isExpired(role.expiresAt) ? 'expired' : 'expires'}
											{formatDate(role.expiresAt)})
										</span>
									{/if}
								</a>
							{/each}
						</div>
					</div>
				{/if}
				{#if policy.assignedToUsers.length > 0}
					<div>
						<p class="mb-2 text-xs tracking-wide text-muted-foreground uppercase">Users</p>
						<div class="flex flex-wrap gap-2">
							{#each policy.assignedToUsers as u (u.id)}
								<a
									href={resolve("/(app)/settings/users/[id]", { id: u.id })}
									class="inline-flex items-center gap-1 text-sm hover:underline"
								>
									{u.name}
									{#if u.expiresAt}
										<span
											class="text-xs text-muted-foreground"
											class:text-destructive={isExpired(u.expiresAt)}
										>
											({isExpired(u.expiresAt) ? 'expired' : 'expires'}
											{formatDate(u.expiresAt)})
										</span>
									{/if}
								</a>
							{/each}
						</div>
					</div>
				{/if}
			</section>
		{/if}

		<!-- Danger zone -->
		<section class="space-y-3 rounded-lg border border-destructive/30 p-6">
			<h2 class="font-semibold text-destructive">Danger Zone</h2>
			<form
				{...deletePolicy}
				class="flex items-center gap-3"
				onsubmit={(e) => {
					if (!confirm(`Delete policy "${policy.name}"?`)) e.preventDefault();
				}}
			>
				<input type="hidden" name="id" value={policy.id} />
				<Button type="submit" variant="destructive" size="sm">Delete Policy</Button>
			</form>
		</section>
	</div>
{/if}
