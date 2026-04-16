<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import TrashIcon from '@lucide/svelte/icons/trash-2';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import {
		getPolicy,
		updatePolicy,
		deletePolicy,
		addPolicyRule,
		deletePolicyRule
	} from '$lib/remotes/policies.remote';
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
	const id = $derived(params.id);

	const policy = $derived(await getPolicy({ id }));

	const ATTRIBUTE_PATHS = [
		'SUBJECT_ID', 'SUBJECT_ROLE', 'SUBJECT_STATUS', 'SUBJECT_CREATED_AT',
		'RESOURCE_ENTRY_ID', 'RESOURCE_ENTRY_STATUS', 'RESOURCE_ENTRY_CREATED_BY',
		'RESOURCE_ENTRY_COLLECTION_ID', 'RESOURCE_ENTRY_LOCALE', 'RESOURCE_ENTRY_PUBLISHED_AT',
		'RESOURCE_COLLECTION_ID', 'RESOURCE_COLLECTION_SLUG', 'RESOURCE_COLLECTION_CREATED_BY',
		'RESOURCE_COLLECTION_IS_LOCALIZED', 'RESOURCE_ASSET_ID', 'RESOURCE_ASSET_UPLOADED_BY',
		'RESOURCE_ASSET_MIME_TYPE', 'RESOURCE_ASSET_FILE_SIZE',
		'ENVIRONMENT_CURRENT_TIME', 'ENVIRONMENT_IP_ADDRESS', 'ENVIRONMENT_USER_AGENT',
		'ACTION_TYPE'
	];

	const OPERATORS = [
		'EQ', 'NE', 'GT', 'GTE', 'LT', 'LTE',
		'IN', 'NOT_IN', 'CONTAINS', 'STARTS_WITH', 'ENDS_WITH',
		'IS_NULL', 'IS_NOT_NULL', 'REGEX'
	];

	const VALUE_TYPES = ['STRING', 'NUMBER', 'BOOLEAN', 'DATETIME', 'UUID', 'ARRAY'];

	const EFFECT_VARIANT: Record<string, 'default' | 'destructive'> = {
		ALLOW: 'default',
		DENY: 'destructive'
	};
</script>

{#if !policy}
	<p class="text-muted-foreground">Policy not found.</p>
{:else}
	<div class="space-y-8">
		<div class="flex items-center justify-between gap-4">
			<div class="flex items-center gap-3">
				<a href="/settings/policies" class="text-muted-foreground hover:text-foreground transition-colors">
					<ArrowLeftIcon class="size-4" />
				</a>
				<div>
					<div class="flex items-center gap-2 flex-wrap">
						<h1 class="text-2xl font-bold">{policy.name}</h1>
						<Badge variant={EFFECT_VARIANT[policy.effect] ?? 'outline'}>{policy.effect.toLowerCase()}</Badge>
						{#if !policy.isActive}
							<Badge variant="secondary">inactive</Badge>
						{/if}
					</div>
					<p class="text-muted-foreground text-xs">
						{policy.resourceType.toLowerCase()} · {policy.actionType.toLowerCase().replace(/_/g, ' ')}
						· priority {policy.priority}
					</p>
				</div>
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
						class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
					>{policy.description ?? ''}</textarea>
				</div>
				<div class="grid gap-3 sm:grid-cols-2">
					<div class="space-y-1.5">
						<Label for="p-effect">Effect</Label>
						<select id="p-effect" name="effect" class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm">
							<option value="ALLOW" selected={policy.effect === 'ALLOW'}>Allow</option>
							<option value="DENY" selected={policy.effect === 'DENY'}>Deny</option>
						</select>
					</div>
					<div class="space-y-1.5">
						<Label for="p-connector">Rule connector</Label>
						<select id="p-connector" name="ruleConnector" class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm">
							<option value="AND" selected={policy.ruleConnector === 'AND'}>AND (all rules must match)</option>
							<option value="OR" selected={policy.ruleConnector === 'OR'}>OR (any rule matches)</option>
						</select>
					</div>
				</div>
				<div class="flex items-center gap-2">
					<input id="p-active" type="checkbox" name="isActive" class="size-4 rounded" checked={policy.isActive} />
					<Label for="p-active">Active</Label>
				</div>
				<Button type="submit">Save changes</Button>
			</form>
		</section>

		<!-- Rules -->
		<section class="space-y-4 rounded-lg border p-6">
			<div class="flex items-center justify-between">
				<h2 class="font-semibold">Rules</h2>
				<span class="text-muted-foreground text-xs">Connected with <strong>{policy.ruleConnector}</strong></span>
			</div>

			{#if policy.rules.length > 0}
				<div class="divide-y rounded-md border">
					{#each policy.rules as rule (rule.id)}
						<div class="flex items-center justify-between px-4 py-3">
							<div class="min-w-0 flex-1">
								<div class="text-sm font-medium font-mono">
									{rule.attributePath.toLowerCase().replace(/_/g, '.')}
									<span class="text-muted-foreground font-sans font-normal">
										{rule.operator.toLowerCase().replace(/_/g, ' ')}
									</span>
									<span class="text-primary">"{rule.expectedValue}"</span>
								</div>
								<p class="text-muted-foreground text-xs">
									{rule.valueType.toLowerCase()}
									{#if !rule.isActive}<span class="text-destructive"> · inactive</span>{/if}
								</p>
							</div>
							<form
								{...deletePolicyRule}
								onsubmit={(e) => { if (!confirm('Delete this rule?')) e.preventDefault(); }}
							>
								<input type="hidden" name="policyId" value={policy.id} />
								<input type="hidden" name="ruleId" value={rule.id} />
								<button type="submit" class="text-muted-foreground hover:text-destructive p-1 transition-colors">
									<TrashIcon class="size-4" />
								</button>
							</form>
						</div>
					{/each}
				</div>
			{:else}
				<p class="text-muted-foreground text-sm">No rules. This policy matches all requests for its resource/action.</p>
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
							<Label for="r-attr">Attribute path</Label>
							<select id="r-attr" name="attributePath" class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm">
								{#each ATTRIBUTE_PATHS as ap (ap)}
									<option value={ap}>{ap.toLowerCase().replace(/_/g, '.')}</option>
								{/each}
							</select>
						</div>
						<div class="space-y-1.5">
							<Label for="r-op">Operator</Label>
							<select id="r-op" name="operator" class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm">
								{#each OPERATORS as op (op)}
									<option value={op}>{op.toLowerCase().replace(/_/g, ' ')}</option>
								{/each}
							</select>
						</div>
					</div>
					<div class="grid gap-3 sm:grid-cols-2">
						<div class="space-y-1.5">
							<Label for="r-val">Expected value</Label>
							<Input id="r-val" name="expectedValue" placeholder="e.g. PUBLISHED" />
						</div>
						<div class="space-y-1.5">
							<Label for="r-vtype">Value type</Label>
							<select id="r-vtype" name="valueType" class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm">
								{#each VALUE_TYPES as vt (vt)}
									<option value={vt}>{vt.toLowerCase()}</option>
								{/each}
							</select>
						</div>
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
						<p class="text-muted-foreground mb-2 text-xs uppercase tracking-wide">Roles</p>
						<div class="flex flex-wrap gap-2">
							{#each policy.assignedToRoles as role (role.id)}
								<a href="/settings/roles/{role.id}" class="text-sm hover:underline">{role.name}</a>
							{/each}
						</div>
					</div>
				{/if}
				{#if policy.assignedToUsers.length > 0}
					<div>
						<p class="text-muted-foreground mb-2 text-xs uppercase tracking-wide">Users</p>
						<div class="flex flex-wrap gap-2">
							{#each policy.assignedToUsers as u (u.id)}
								<a href="/settings/users/{u.id}" class="text-sm hover:underline">{u.name}</a>
							{/each}
						</div>
					</div>
				{/if}
			</section>
		{/if}

		<!-- Danger zone -->
		<section class="space-y-3 rounded-lg border border-destructive/30 p-6">
			<h2 class="text-destructive font-semibold">Danger Zone</h2>
			<form
				{...deletePolicy}
				onsubmit={(e) => { if (!confirm(`Delete policy "${policy.name}"?`)) e.preventDefault(); }}
			>
				<input type="hidden" name="id" value={policy.id} />
				<Button type="submit" variant="destructive" size="sm">Delete Policy</Button>
			</form>
		</section>
	</div>
{/if}
