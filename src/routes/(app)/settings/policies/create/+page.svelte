<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import InfoIcon from '@lucide/svelte/icons/info';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import ChevronUpIcon from '@lucide/svelte/icons/chevron-up';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as v from 'valibot';
	import { requireAuth } from '$lib/remotes/auth.remote';
	import { createPolicy } from '$lib/remotes/policies.remote';
	import PolicyRuleBuilder from '$lib/components/policy-rule-builder.svelte';
	import HelpTooltip from '$lib/components/help-tooltip.svelte';
	import { policyToSentence, type RuleValue } from '$lib/components/policy-rule-utils';

	await requireAuth();

	const nameField = createPolicy.fields.name.as('text');
	const actionTypeField = createPolicy.fields.actionType.as('text');
	const effectField = createPolicy.fields.effect.as('text');
	const resourceTypeField = createPolicy.fields.resourceType.as('text');

	const RESOURCE_TYPES = ['ASSETS', 'COLLECTIONS', 'ENTRIES', 'USERS'];
	const ACTION_TYPES = [
		'ACTIVATE',
		'ARCHIVE',
		'BAN',
		'CONFIGURE_FIELDS',
		'CREATE',
		'DEACTIVATE',
		'DELETE',
		'DOWNLOAD',
		'DRAFT',
		'MANAGE_SCHEMA',
		'PUBLISH',
		'READ',
		'RESTORE',
		'SCHEDULE',
		'TRANSFORM',
		'UNBAN',
		'UNPUBLISH',
		'UPDATE',
		'UPLOAD'
	];

	type Template = {
		name: string;
		description: string;
		resourceType: string;
		actionType: string;
		effect: string;
		priority: number;
		rules: Array<{
			attributePath: string;
			operator: string;
			value?: RuleValue;
			rawValue: string | boolean | number | string[];
		}>;
	};

	const TEMPLATES: Template[] = [
		{
			name: 'Let someone view content',
			description: 'Allow reading entries and collections. No restrictions.',
			resourceType: 'ENTRIES',
			actionType: 'READ',
			effect: 'ALLOW',
			priority: 100,
			rules: []
		},
		{
			name: 'Let someone edit their own content',
			description: 'Allow updating entries that the current user created.',
			resourceType: 'ENTRIES',
			actionType: 'UPDATE',
			effect: 'ALLOW',
			priority: 500,
			rules: [
				{
					attributePath: 'RESOURCE_ENTRY_CREATED_BY',
					operator: 'EQ_CONTEXT_REF',
					value: { contextReferencePath: 'SUBJECT_ID' },
					rawValue: 'SUBJECT_ID'
				}
			]
		},
		{
			name: 'Make an editor',
			description: 'Allow creating, reading, and updating entries.',
			resourceType: 'ENTRIES',
			actionType: 'CREATE',
			effect: 'ALLOW',
			priority: 500,
			rules: []
		},
		{
			name: 'Make a viewer',
			description: 'Allow reading but not changing anything.',
			resourceType: 'ENTRIES',
			actionType: 'READ',
			effect: 'ALLOW',
			priority: 100,
			rules: []
		},
		{
			name: 'Block access after hours',
			description: 'Deny access outside 9am–5pm. High priority.',
			resourceType: 'ENTRIES',
			actionType: 'READ',
			effect: 'DENY',
			priority: 2000,
			rules: [
				{
					attributePath: 'ENVIRONMENT_CURRENT_TIME',
					operator: 'LT',
					value: { dateTimeValue: '2026-01-01T09:00:00' },
					rawValue: '2026-01-01T09:00:00'
				}
			]
		}
	];

	let selectedTemplate = $state<Template | null>(null);
	let useCustom = $state(false);
	let showExplainer = $state(true);

	let name = $state('');
	let description = $state('');
	let resourceType = $state('ENTRIES');
	let actionType = $state('READ');
	let effect = $state('ALLOW');
	let priority = $state(100);
	let ruleConnector = $state('AND');
	let isActive = $state(true);

	let rules = $state<
		Array<{
			_id: number;
			attributePath: string;
			operator: string;
			value?: RuleValue;
			rawValue: string | boolean | number | string[];
			description: string;
			isActive: boolean;
		}>
	>([]);

	let nextId = 0;

	function applyTemplate(template: Template) {
		selectedTemplate = template;
		useCustom = false;
		name = template.name;
		description = template.description;
		resourceType = template.resourceType;
		actionType = template.actionType;
		effect = template.effect;
		priority = template.priority;
		rules = template.rules.map((r, i) => ({
			_id: nextId++,
			attributePath: r.attributePath,
			operator: r.operator,
			value: r.value,
			rawValue: r.rawValue,
			description: '',
			isActive: true
		}));
	}

	function startCustom() {
		selectedTemplate = null;
		useCustom = true;
		name = '';
		description = '';
		resourceType = 'ENTRIES';
		actionType = 'READ';
		effect = 'ALLOW';
		priority = 100;
		ruleConnector = 'AND';
		rules = [];
	}

	const rulesJson = $derived(
		JSON.stringify(
			rules.map((r, i) => ({
				attributePath: r.attributePath,
				operator: r.operator,
				value: r.value,
				description: r.description || undefined,
				isActive: r.isActive,
				order: i
			}))
		)
	);

	const liveSummary = $derived(
		policyToSentence(
			resourceType,
			actionType,
			effect,
			ruleConnector,
			rules
				.filter((r) => r.isActive)
				.map((r) => ({
					attributePath: r.attributePath,
					operator: r.operator,
					value: r.value
				}))
		)
	);

	const preflight = v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required')),
		actionType: v.pipe(v.string(), v.nonEmpty('Action type is required')),
		effect: v.pipe(v.string(), v.nonEmpty('Effect is required')),
		resourceType: v.pipe(v.string(), v.nonEmpty('Resource type is required'))
	});
</script>

<div class="mx-auto max-w-3xl space-y-8 px-4 py-8">
	<div class="space-y-2">
		<a
			href="/settings/policies"
			class="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
		>
			<ArrowLeftIcon class="size-4" />
			Back to Policies
		</a>
		<h1 class="text-3xl font-bold">New Policy</h1>
		<p class="text-muted-foreground">Define who can do what</p>
	</div>

	{#if !selectedTemplate && !useCustom}
		<div class="space-y-4">
			<h2 class="text-lg font-semibold">What do you want to allow?</h2>
			<p class="text-sm text-muted-foreground">
				Pick a template to get started quickly, or build your own.
			</p>
			<div class="grid gap-3 sm:grid-cols-2">
				{#each TEMPLATES as template (template.name)}
					<button
						type="button"
						class="space-y-1 rounded-lg border p-4 text-left transition-colors hover:bg-muted/50"
						onclick={() => applyTemplate(template)}
					>
						<p class="font-medium">{template.name}</p>
						<p class="text-xs text-muted-foreground">{template.description}</p>
					</button>
				{/each}
				<button
					type="button"
					class="space-y-1 rounded-lg border border-dashed p-4 text-left transition-colors hover:bg-muted/50"
					onclick={startCustom}
				>
					<p class="font-medium">Custom rule</p>
					<p class="text-xs text-muted-foreground">Build a policy from scratch</p>
				</button>
			</div>
		</div>
	{:else}
		<form {...createPolicy.preflight(preflight)} class="space-y-6">
			<input type="hidden" name="rulesJson" value={rulesJson} />
			<input type="hidden" name="name" value={name} />
			<input type="hidden" name="description" value={description} />
			<input type="hidden" name="resourceType" value={resourceType} />
			<input type="hidden" name="actionType" value={actionType} />
			<input type="hidden" name="effect" value={effect} />
			<input type="hidden" name="priority" value={String(priority)} />
			<input type="hidden" name="ruleConnector" value={ruleConnector} />
			<input type="hidden" name="isActive" value={isActive ? 'on' : ''} />

			{#each createPolicy.fields.allIssues() as issue (issue.message)}
				<div
					class="rounded border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
				>
					{issue.message}
				</div>
			{/each}

			<!-- ABAC Explainer -->
			{#if showExplainer}
				<div class="rounded-lg border border-primary/20 bg-primary/5 p-5">
					<div class="flex items-start justify-between gap-3">
						<div class="flex items-center gap-2">
							<InfoIcon class="size-4 text-primary" />
							<h3 class="font-semibold text-primary">How policies work</h3>
						</div>
						<Button
							type="button"
							variant="ghost"
							size="sm"
							class="h-auto p-0 text-xs text-muted-foreground"
							onclick={() => (showExplainer = false)}
						>
							Dismiss
						</Button>
					</div>
					<div class="mt-3 space-y-2 text-sm">
						<p>
							<strong>Resource</strong> — The thing being protected. Entries, collections,
							assets, or users.
						</p>
						<p>
							<strong>Action</strong> — What someone is trying to do. Read, create, update,
							delete, etc.
						</p>
						<p>
							<strong>Effect</strong> — Allow grants access. Block denies access. A Block
							policy at higher priority always wins.
						</p>
						<p>
							<strong>Priority</strong> — Higher numbers are checked first. Use 2000 for
							block rules that should override everything.
						</p>
						<p>
							<strong>Rules</strong> — Optional conditions that narrow when the policy
							applies. No rules = applies to everyone.
						</p>
					</div>
				</div>
			{/if}

			<!-- Live summary -->
			<div class="rounded-lg border border-primary/30 bg-primary/5 p-4">
				<p class="text-sm font-medium text-primary">This policy will: {liveSummary}</p>
			</div>

			<div class="space-y-5 rounded-lg border p-6">
				<div class="flex items-center justify-between">
					<h2 class="text-lg font-semibold">General</h2>
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onclick={() => {
							selectedTemplate = null;
							useCustom = false;
						}}
					>
						← Back to templates
					</Button>
				</div>
				<Separator />

				<div class="space-y-1.5">
					<Label for="p-name">Name *</Label>
					{#each createPolicy.fields.name.issues() as issue (issue.message)}
						<p class="text-xs text-destructive">{issue.message}</p>
					{/each}
					<Input
						id="p-name"
						name={nameField.name}
						aria-invalid={nameField['aria-invalid']}
						autocomplete="off"
						placeholder="e.g. Editor can read entries"
						bind:value={name}
					/>
				</div>

				<div class="space-y-1.5">
					<Label for="p-desc">Description</Label>
					<textarea
						id="p-desc"
						name="description"
						rows="2"
						placeholder="A brief description of this policy"
						class="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
						bind:value={description}
					></textarea>
				</div>
			</div>

			<div class="space-y-5 rounded-lg border p-6">
				<div class="flex items-center gap-2">
					<h2 class="text-lg font-semibold">Configuration</h2>
					<HelpTooltip
						text="These settings define what this policy protects and whether it grants or denies access."
					/>
				</div>
				<Separator />

				<div class="grid gap-4 sm:grid-cols-2">
					<div class="space-y-1.5">
						<div class="flex items-center gap-1.5">
							<Label for="p-resource">Resource *</Label>
							<HelpTooltip
								text="What type of content does this policy protect? Entries are individual content items, Collections are content types, Assets are files, and Users are people."
							/>
						</div>
						{#each createPolicy.fields.resourceType.issues() as issue (issue.message)}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
						<Select.Root
							type="single"
							name={resourceTypeField.name}
							bind:value={resourceType}
						>
							<Select.Trigger
								id="p-resource"
								aria-invalid={resourceTypeField['aria-invalid']}
							>
								<span>{resourceType.charAt(0) + resourceType.slice(1).toLowerCase()}</span>
							</Select.Trigger>
							<Select.Content>
								{#each RESOURCE_TYPES as rt (rt)}
									<Select.Item value={rt}
										>{rt.charAt(0) + rt.slice(1).toLowerCase()}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>

					<div class="space-y-1.5">
						<div class="flex items-center gap-1.5">
							<Label for="p-action">Action *</Label>
							<HelpTooltip
								text="What is the user trying to do? Read = view content. Create = add new content. Update = edit existing content. Delete = remove content."
							/>
						</div>
						{#each createPolicy.fields.actionType.issues() as issue (issue.message)}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
						<Select.Root
							type="single"
							name={actionTypeField.name}
							bind:value={actionType}
						>
							<Select.Trigger
								id="p-action"
								aria-invalid={actionTypeField['aria-invalid']}
							>
								<span>{actionType.toLowerCase().replace(/_/g, ' ')}</span>
							</Select.Trigger>
							<Select.Content>
								{#each ACTION_TYPES as at (at)}
									<Select.Item value={at}>{at.toLowerCase().replace(/_/g, ' ')}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>
				</div>

				<div class="grid gap-4 sm:grid-cols-2">
					<div class="space-y-1.5">
						<div class="flex items-center gap-1.5">
							<Label for="p-effect">Effect *</Label>
							<HelpTooltip
								text="Allow grants access. Block denies access regardless of other policies. A Block rule with higher priority always overrides an Allow rule."
							/>
						</div>
						{#each createPolicy.fields.effect.issues() as issue (issue.message)}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
						<Select.Root type="single" name={effectField.name} bind:value={effect}>
							<Select.Trigger id="p-effect" aria-invalid={effectField['aria-invalid']}>
								<span>{effect === 'ALLOW' ? 'Allow' : 'Block'}</span>
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="ALLOW">Allow — grant access</Select.Item>
								<Select.Item value="DENY">Block — deny access</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>

					<div class="space-y-1.5">
						<div class="flex items-center gap-1.5">
							<Label for="p-connector">Rule Connector</Label>
							<HelpTooltip
								text="All rules must match = every condition must be true. Any rule matches = at least one condition must be true."
							/>
						</div>
						<Select.Root type="single" name="ruleConnector" bind:value={ruleConnector}>
							<Select.Trigger id="p-connector">
								<span>
									{ruleConnector === 'AND' ? 'All rules must match' : 'Any rule matches'}
								</span>
							</Select.Trigger>
							<Select.Content>
								<Select.Item value="AND">All rules must match</Select.Item>
								<Select.Item value="OR">Any rule matches</Select.Item>
							</Select.Content>
						</Select.Root>
					</div>
				</div>

				<div class="space-y-1.5">
					<div class="flex items-center gap-1.5">
						<Label for="p-priority">Priority</Label>
						<HelpTooltip
							text="Higher numbers are checked first. A Block rule at priority 2000 will override an Allow rule at priority 100. Use high priorities for security-critical blocks."
						/>
					</div>
					<p class="text-xs text-muted-foreground">
						Higher numbers are checked first. Block rules should usually be higher than Allow
						rules.
					</p>
					<div class="flex items-center gap-3">
						<input
							type="range"
							min="0"
							max="2000"
							step="100"
							bind:value={priority}
							class="flex-1"
						/>
						<Input
							id="p-priority"
							name="priority"
							type="number"
							min="0"
							bind:value={priority}
							class="w-24"
						/>
					</div>
					<div class="flex flex-wrap gap-2 text-xs text-muted-foreground">
					<button
						type="button"
						class="rounded bg-muted px-2 py-1 transition-colors hover:bg-muted/80"
						onclick={() => (priority = 100)}>Standard (100)</button
					>
					<button
						type="button"
						class="rounded bg-muted px-2 py-1 transition-colors hover:bg-muted/80"
						onclick={() => (priority = 500)}>Creator (500)</button
					>
					<button
						type="button"
						class="rounded bg-muted px-2 py-1 transition-colors hover:bg-muted/80"
						onclick={() => (priority = 1000)}>Admin (1000)</button
					>
					<button
						type="button"
						class="rounded bg-destructive/10 px-2 py-1 text-destructive transition-colors hover:bg-destructive/20"
						onclick={() => (priority = 2000)}>Block (2000)</button
					>
					</div>
				</div>
			</div>

			<PolicyRuleBuilder bind:rules />

			<div class="flex items-center justify-between border-t pt-4">
				<a href="/settings/policies">
					<Button type="button" variant="ghost">Cancel</Button>
				</a>
				<Button type="submit">Create Policy</Button>
			</div>
		</form>
	{/if}
</div>
