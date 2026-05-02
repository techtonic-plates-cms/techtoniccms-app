<script lang="ts">
	import { Badge } from '$lib/components/ui/badge/index.js';
	import type { PolicyRule } from 'techtonic-client-gql';
	import { policyToSentence } from './policy-rule-utils';

	let {
		name,
		description,
		resourceType,
		actionType,
		effect,
		priority,
		ruleConnector,
		rules,
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
		rules: Array<PolicyRule>;
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
		</div>
	{/if}
</div>
