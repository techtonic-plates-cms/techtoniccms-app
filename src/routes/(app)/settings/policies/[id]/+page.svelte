<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import TrashIcon from '@lucide/svelte/icons/trash-2';
	import CopyIcon from '@lucide/svelte/icons/copy';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
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
		getOperatorLabel
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
</script>

{#if !policy}
	<p class="text-muted-foreground">Policy not found.</p>
{:else}
	<div class="space-y-8">
		<div class="flex items-center justify-between gap-4">
			<div class="flex items-center gap-3">
				<a
					href="/settings/policies"
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
						<Label for="p-connector">Rule connector</Label>
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
				<div class="divide-y rounded-md border">
					{#each policy.rules as rule (rule.id)}
						<div class="flex items-center justify-between px-4 py-3">
							<div class="min-w-0 flex-1">
								<div class="text-sm">
									{ruleToSentence(rule.attributePath, rule.operator, rule.value)}
								</div>
								{#if rule.description}
									<p class="text-xs text-muted-foreground">{rule.description}</p>
								{/if}
								{#if !rule.isActive}<span class="text-xs text-destructive"> · inactive</span>{/if}
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
							<Label for="r-attr">When</Label>
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
							<Label for="r-op">Condition</Label>
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
							&#123;"contextReferencePath":"SUBJECT_ID"&#125;
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
									href="/settings/roles/{role.id}"
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
									href="/settings/users/{u.id}"
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
