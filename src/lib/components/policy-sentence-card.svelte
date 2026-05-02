<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { policyToSentence } from './policy-rule-utils';
	import type { PolicyRuleValue } from '$lib/remotes/policies.remote';

	let {
		name,
		description,
		resourceType,
		actionType,
		effect,
		priority,
		ruleConnector,
		rules,
		assignedToRoles = [],
		assignedToUsers = [],
		isActive = true,
		compact = false
	}: {
		name: string;
		description?: string | null;
		resourceType: string;
		actionType: string;
		effect: string;
		priority: number;
		ruleConnector?: string;
		rules: Array<{ attributePath: string; operator: string; value?: PolicyRuleValue }>;
		assignedToRoles?: Array<{ id: string; role: { id: string; name: string } }>;
		assignedToUsers?: Array<{ id: string; user: { id: string; name: string } }>;
		isActive?: boolean;
		compact?: boolean;
	} = $props();

	const EFFECT_VARIANT: Record<string, 'default' | 'destructive' | 'outline'> = {
		ALLOW: 'default',
		DENY: 'destructive'
	};

	const effectColor = $derived(effect === 'ALLOW' ? 'border-l-copper' : 'border-l-destructive');

	const sentence = $derived(
		policyToSentence(
			resourceType,
			actionType,
			effect,
			ruleConnector ?? 'AND',
			rules.filter((r) => r)
		)
	);

	const totalAssignments = $derived(assignedToRoles.length + assignedToUsers.length);
</script>

<div
	class="relative overflow-hidden rounded-lg border bg-card {effectColor} border-l-4 p-5 transition-colors hover:bg-muted/30"
>
	<div class="flex items-start justify-between gap-3">
		<div class="min-w-0 flex-1 space-y-1">
			<div class="flex flex-wrap items-center gap-2">
				<h3 class="truncate font-semibold">{name}</h3>
				{#if !isActive}
					<Badge variant="secondary" class="text-[10px]">inactive</Badge>
				{/if}
			</div>
			{#if description}
				<p class="text-xs text-muted-foreground">{description}</p>
			{/if}
		</div>
		<Badge variant={EFFECT_VARIANT[effect] ?? 'outline'} class="shrink-0 text-xs">
			{effect === 'ALLOW' ? 'Allow' : 'Block'}
		</Badge>
	</div>

	<div class="mt-3 rounded-md bg-muted/50 px-3 py-2">
		<p class="text-sm leading-relaxed">{sentence}</p>
	</div>

	{#if !compact}
		<div class="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
			<span class="inline-flex items-center gap-1">
				<span class="font-medium text-foreground">{priority}</span> priority
			</span>
			<span class="text-border">·</span>
			<span>{rules.length} {rules.length === 1 ? 'rule' : 'rules'}</span>
			{#if totalAssignments > 0}
				<span class="text-border">·</span>
				<span>
					{assignedToRoles.length}
					{assignedToRoles.length === 1 ? 'role' : 'roles'}
					·
					{assignedToUsers.length}
					{assignedToUsers.length === 1 ? 'user' : 'users'}
				</span>
			{:else}
				<span class="text-border">·</span>
				<span class="italic">Unassigned</span>
			{/if}
		</div>
	{/if}
</div>
