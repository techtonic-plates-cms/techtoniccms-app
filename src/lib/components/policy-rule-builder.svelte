<script lang="ts">
	import PlusIcon from '@lucide/svelte/icons/plus';
	import TrashIcon from '@lucide/svelte/icons/trash-2';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import {
		ATTRIBUTE_PATHS,
		OPERATOR_LABELS,
		CONTEXT_REF_LABELS,
		getNaturalType,
		getAttributeLabel,
		getOperatorLabel,
		getContextRefLabel,
		buildValue,
		readValue,
		ruleToSentence,
		type RuleValue
	} from './policy-rule-utils';

	export type RuleRow = {
		_id: number;
		attributePath: string;
		operator: string;
		value?: RuleValue;
		rawValue: string | boolean | number | string[];
		description: string;
		isActive: boolean;
	};

	let { rules = $bindable([]) }: { rules?: RuleRow[] } = $props();

	let nextId = 0;

	const ALL_OPERATORS = Object.keys(OPERATOR_LABELS);

	const OPERATORS_FOR_TYPE: Record<string, string[]> = {
		string: [
			'EQ',
			'NE',
			'IN',
			'NOT_IN',
			'CONTAINS',
			'STARTS_WITH',
			'ENDS_WITH',
			'REGEX',
			'IS_NULL',
			'IS_NOT_NULL',
			'EQ_CONTEXT_REF'
		],
		number: ['EQ', 'NE', 'GT', 'GTE', 'LT', 'LTE', 'IS_NULL', 'IS_NOT_NULL'],
		boolean: ['EQ', 'NE', 'IS_NULL', 'IS_NOT_NULL', 'EQ_CONTEXT_REF'],
		datetime: ['EQ', 'NE', 'GT', 'GTE', 'LT', 'LTE', 'IS_NULL', 'IS_NOT_NULL', 'EQ_CONTEXT_REF'],
		uuid: ['EQ', 'NE', 'IN', 'NOT_IN', 'IS_NULL', 'IS_NOT_NULL', 'EQ_CONTEXT_REF']
	};

	function getOperatorsForAttribute(attributePath: string): string[] {
		const naturalType = getNaturalType(attributePath);
		return OPERATORS_FOR_TYPE[naturalType] ?? OPERATORS_FOR_TYPE.string;
	}

	function addRule() {
		const defaultAttr = 'SUBJECT_ROLE';
		const ops = getOperatorsForAttribute(defaultAttr);
		rules = [
			...rules,
			{
				_id: nextId++,
				attributePath: defaultAttr,
				operator: ops[0],
				rawValue: '',
				description: '',
				isActive: true
			}
		];
	}

	function removeRule(index: number) {
		rules = rules.filter((_, i) => i !== index);
	}

	function updateRuleValue(index: number, rawValue: string | boolean | number | string[]) {
		const rule = rules[index];
		const naturalType = getNaturalType(rule.attributePath);
		const value = buildValue(rule.operator, naturalType, rawValue);
		rules = rules.map((r, i) => (i === index ? { ...r, rawValue, value } : r));
	}

	function updateAttribute(index: number, attributePath: string) {
		const ops = getOperatorsForAttribute(attributePath);
		const rule = rules[index];
		const newOp = ops.includes(rule.operator) ? rule.operator : ops[0];
		const naturalType = getNaturalType(attributePath);
		const value = buildValue(newOp, naturalType, '');
		rules = rules.map((r, i) =>
			i === index ? { ...r, attributePath, operator: newOp, rawValue: '', value } : r
		);
	}

	function updateOperator(index: number, operator: string) {
		const rule = rules[index];
		const naturalType = getNaturalType(rule.attributePath);
		let rawValue: string | boolean | number | string[] = '';
		if (operator === 'IS_NULL' || operator === 'IS_NOT_NULL') {
			rawValue = '';
		} else if (operator === 'EQ_CONTEXT_REF') {
			rawValue = 'SUBJECT_ID';
		} else if (operator === 'IN' || operator === 'NOT_IN') {
			rawValue = [];
		} else if (naturalType === 'boolean') {
			rawValue = true;
		}
		const value = buildValue(operator, naturalType, rawValue);
		rules = rules.map((r, i) => (i === index ? { ...r, operator, rawValue, value } : r));
	}

	function needsValueInput(operator: string): boolean {
		return operator !== 'IS_NULL' && operator !== 'IS_NOT_NULL';
	}

	function isContextRefOperator(operator: string): boolean {
		return operator === 'EQ_CONTEXT_REF';
	}

	function isArrayOperator(operator: string): boolean {
		return operator === 'IN' || operator === 'NOT_IN';
	}
</script>

<div class="space-y-4">
	<div class="flex items-center justify-between">
		<div>
			<h2 class="text-lg font-semibold">Rules</h2>
			<p class="text-sm text-muted-foreground">
				{rules.length === 0
					? 'No rules added. The policy will apply unconditionally.'
					: rules.length === 1
						? '1 rule'
						: `${rules.length} rules`}
			</p>
		</div>
		<Button type="button" variant="outline" size="sm" onclick={addRule}>
			<PlusIcon class="mr-1.5 size-3.5" />
			Add Rule
		</Button>
	</div>

	{#if rules.length > 0}
		<div class="space-y-3">
			{#each rules as rule, i (rule._id)}
				<div class="space-y-3 rounded-md border p-4">
					<div class="flex items-center justify-between gap-2">
						<div class="flex flex-wrap items-center gap-2">
							<span class="text-xs font-medium tracking-wide text-muted-foreground uppercase"
								>Rule {i + 1}</span
							>
							<span class="text-sm text-muted-foreground"
								>— {ruleToSentence(rule.attributePath, rule.operator, rule.value)}</span
							>
						</div>
						<div class="flex items-center gap-2">
							<div class="flex items-center gap-1.5">
								<Switch
									id="rule-active-{rule._id}"
									checked={rule.isActive}
									onCheckedChange={(c) => {
										rules = rules.map((r, idx) => (idx === i ? { ...r, isActive: !!c } : r));
									}}
									class="scale-75"
								/>
								<Label
									for="rule-active-{rule._id}"
									class="cursor-pointer text-xs text-muted-foreground">Active</Label
								>
							</div>
							<Button
								type="button"
								variant="ghost"
								size="sm"
								class="size-7 p-0 text-muted-foreground hover:text-destructive"
								onclick={() => removeRule(i)}
							>
								<TrashIcon class="size-3.5" />
							</Button>
						</div>
					</div>

					<div class="grid gap-3 sm:grid-cols-2">
						<div class="space-y-1.5">
							<Label class="text-xs text-muted-foreground">When</Label>
							<select
								value={rule.attributePath}
								onchange={(e) => updateAttribute(i, e.currentTarget.value)}
								class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
							>
								{#each ATTRIBUTE_PATHS as ap (ap.value)}
									<option value={ap.value}>{ap.label}</option>
								{/each}
							</select>
						</div>

						<div class="space-y-1.5">
							<Label class="text-xs text-muted-foreground">Condition</Label>
							<select
								value={rule.operator}
								onchange={(e) => updateOperator(i, e.currentTarget.value)}
								class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
							>
								{#each getOperatorsForAttribute(rule.attributePath) as op (op)}
									<option value={op}>{getOperatorLabel(op)}</option>
								{/each}
							</select>
						</div>
					</div>

					{#if needsValueInput(rule.operator)}
						<div class="space-y-1.5">
							{#if isContextRefOperator(rule.operator)}
								<Label class="text-xs text-muted-foreground">Compare to</Label>
								<select
									value={String(rule.rawValue ?? 'SUBJECT_ID')}
									onchange={(e) => updateRuleValue(i, e.currentTarget.value)}
									class="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
								>
									{#each ATTRIBUTE_PATHS as ap (ap.value)}
										<option value={ap.value}>{getContextRefLabel(ap.value)}</option>
									{/each}
								</select>
							{:else if isArrayOperator(rule.operator)}
								<Label class="text-xs text-muted-foreground">Values (comma-separated)</Label>
								<Input
									value={Array.isArray(rule.rawValue)
										? rule.rawValue.join(', ')
										: String(rule.rawValue ?? '')}
									oninput={(e) => updateRuleValue(i, e.currentTarget.value)}
									placeholder="editor, admin, viewer"
								/>
							{:else if getNaturalType(rule.attributePath) === 'boolean'}
								<div class="flex items-center gap-2">
									<Switch
										checked={Boolean(rule.rawValue)}
										onCheckedChange={(c) => updateRuleValue(i, !!c)}
									/>
									<span class="text-sm">{Boolean(rule.rawValue) ? 'Yes / True' : 'No / False'}</span
									>
								</div>
							{:else if getNaturalType(rule.attributePath) === 'number'}
								<Label class="text-xs text-muted-foreground">Number</Label>
								<Input
									type="number"
									value={String(rule.rawValue ?? '')}
									oninput={(e) => updateRuleValue(i, e.currentTarget.value)}
									placeholder="e.g. 42"
								/>
							{:else if getNaturalType(rule.attributePath) === 'datetime'}
								<Label class="text-xs text-muted-foreground">Date & time</Label>
								<Input
									type="datetime-local"
									value={String(rule.rawValue ?? '')}
									oninput={(e) => updateRuleValue(i, e.currentTarget.value)}
								/>
							{:else}
								<Label class="text-xs text-muted-foreground">Value</Label>
								<Input
									value={String(rule.rawValue ?? '')}
									oninput={(e) => updateRuleValue(i, e.currentTarget.value)}
									placeholder="Enter value..."
								/>
							{/if}
						</div>
					{/if}

					<div class="space-y-1.5">
						<Label class="text-xs text-muted-foreground">Description (optional)</Label>
						<Input
							value={rule.description}
							oninput={(e) => {
								rules = rules.map((r, idx) =>
									idx === i ? { ...r, description: e.currentTarget.value } : r
								);
							}}
							placeholder="Brief note about this rule"
						/>
					</div>
				</div>
			{/each}
		</div>
	{:else}
		<div class="rounded-md border border-dashed p-6 text-center">
			<p class="mb-3 text-sm text-muted-foreground">
				No rules yet. This policy will match all requests for its resource and action.
			</p>
			<Button type="button" variant="outline" size="sm" onclick={addRule}>
				<PlusIcon class="mr-1.5 size-3.5" />
				Add your first rule
			</Button>
		</div>
	{/if}
</div>
