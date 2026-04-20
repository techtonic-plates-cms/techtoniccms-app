<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import TrashIcon from '@lucide/svelte/icons/trash-2';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Checkbox from '$lib/components/ui/checkbox/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as v from 'valibot';
	import { requireAuth } from '$lib/remotes/auth.remote';
	import { createPolicy } from '$lib/remotes/policies.remote';

	await requireAuth();

	const nameField = createPolicy.fields.name.as('text');
	const actionTypeField = createPolicy.fields.actionType.as('text');
	const effectField = createPolicy.fields.effect.as('text');
	const resourceTypeField = createPolicy.fields.resourceType.as('text');

	const RESOURCE_TYPES = ['ASSETS', 'COLLECTIONS', 'ENTRIES', 'USERS'];
	const ACTION_TYPES = [
		'ACTIVATE', 'ARCHIVE', 'BAN', 'CONFIGURE_FIELDS', 'CREATE', 'DEACTIVATE',
		'DELETE', 'DOWNLOAD', 'DRAFT', 'MANAGE_SCHEMA', 'PUBLISH', 'READ',
		'RESTORE', 'SCHEDULE', 'TRANSFORM', 'UNBAN', 'UNPUBLISH', 'UPDATE', 'UPLOAD'
	];
	const ATTRIBUTE_PATHS = [
		{ value: 'SUBJECT_ID', label: 'Subject: ID' },
		{ value: 'SUBJECT_ROLE', label: 'Subject: Role' },
		{ value: 'SUBJECT_STATUS', label: 'Subject: Status' },
		{ value: 'SUBJECT_CREATED_AT', label: 'Subject: Created At' },
		{ value: 'RESOURCE_ENTRY_ID', label: 'Entry: ID' },
		{ value: 'RESOURCE_ENTRY_STATUS', label: 'Entry: Status' },
		{ value: 'RESOURCE_ENTRY_CREATED_BY', label: 'Entry: Created By' },
		{ value: 'RESOURCE_ENTRY_COLLECTION_ID', label: 'Entry: Collection ID' },
		{ value: 'RESOURCE_ENTRY_LOCALE', label: 'Entry: Locale' },
		{ value: 'RESOURCE_ENTRY_PUBLISHED_AT', label: 'Entry: Published At' },
		{ value: 'RESOURCE_COLLECTION_ID', label: 'Collection: ID' },
		{ value: 'RESOURCE_COLLECTION_SLUG', label: 'Collection: Slug' },
		{ value: 'RESOURCE_COLLECTION_CREATED_BY', label: 'Collection: Created By' },
		{ value: 'RESOURCE_COLLECTION_IS_LOCALIZED', label: 'Collection: Is Localized' },
		{ value: 'RESOURCE_ASSET_ID', label: 'Asset: ID' },
		{ value: 'RESOURCE_ASSET_UPLOADED_BY', label: 'Asset: Uploaded By' },
		{ value: 'RESOURCE_ASSET_MIME_TYPE', label: 'Asset: MIME Type' },
		{ value: 'RESOURCE_ASSET_FILE_SIZE', label: 'Asset: File Size' },
		{ value: 'ENVIRONMENT_CURRENT_TIME', label: 'Environment: Current Time' },
		{ value: 'ENVIRONMENT_IP_ADDRESS', label: 'Environment: IP Address' },
		{ value: 'ENVIRONMENT_USER_AGENT', label: 'Environment: User Agent' },
		{ value: 'ACTION_TYPE', label: 'Action Type' }
	];
	const OPERATOR_TYPES = [
		'CONTAINS', 'ENDS_WITH', 'EQ', 'GT', 'GTE', 'IN',
		'IS_NOT_NULL', 'IS_NULL', 'LT', 'LTE', 'NE', 'NOT_IN', 'REGEX', 'STARTS_WITH'
	];
	const VALUE_TYPES = ['ARRAY', 'BOOLEAN', 'DATETIME', 'NUMBER', 'STRING', 'UUID'];

	type RuleRow = {
		_id: number;
		attributePath: string;
		operator: string;
		expectedValue: string;
		valueType: string;
		description: string;
		isActive: boolean;
	};

	let nextId = 0;
	let rules = $state<RuleRow[]>([]);

	function addRule() {
		rules = [...rules, {
			_id: nextId++,
			attributePath: 'SUBJECT_ID',
			operator: 'EQ',
			expectedValue: '',
			valueType: 'STRING',
			description: '',
			isActive: true
		}];
	}

	function removeRule(index: number) {
		rules = rules.filter((_, i) => i !== index);
	}

	const rulesJson = $derived(JSON.stringify(rules.map((r, i) => ({
		attributePath: r.attributePath,
		operator: r.operator,
		expectedValue: r.expectedValue,
		valueType: r.valueType,
		description: r.description || undefined,
		isActive: r.isActive,
		order: i
	}))));

	const preflight = v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required')),
		actionType: v.pipe(v.string(), v.nonEmpty('Action type is required')),
		effect: v.pipe(v.string(), v.nonEmpty('Effect is required')),
		resourceType: v.pipe(v.string(), v.nonEmpty('Resource type is required'))
	});
</script>

<div class="mx-auto max-w-3xl space-y-8 py-8 px-4">
	<div class="space-y-2">
		<a
			href="/settings/policies"
			class="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
		>
			<ArrowLeftIcon class="size-4" />
			Back to Policies
		</a>
		<h1 class="text-3xl font-bold">New Policy</h1>
		<p class="text-muted-foreground">Define an attribute-based access control policy</p>
	</div>

	<form {...createPolicy.preflight(preflight)} class="space-y-6">
		<input type="hidden" name="rulesJson" value={rulesJson} />

		{#each createPolicy.fields.allIssues() as issue (issue.message)}
			<div class="rounded border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
				{issue.message}
			</div>
		{/each}

		<div class="rounded-lg border p-6 space-y-5">
			<h2 class="text-lg font-semibold">General</h2>
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
					placeholder="read-published-entries"
				/>
			</div>

			<div class="space-y-1.5">
				<Label for="p-desc">Description</Label>
				<textarea
					id="p-desc"
					name="description"
					rows="2"
					placeholder="A brief description of this policy"
					class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
				></textarea>
			</div>

			<div class="flex items-center gap-2">
				<Checkbox.Root id="p-active" name="isActive" checked={true} value="on" />
				<Label for="p-active">Active</Label>
			</div>
		</div>

		<div class="rounded-lg border p-6 space-y-5">
			<h2 class="text-lg font-semibold">Configuration</h2>
			<Separator />

			<div class="grid gap-4 sm:grid-cols-2">
				<div class="space-y-1.5">
					<Label for="p-resource">Resource *</Label>
					{#each createPolicy.fields.resourceType.issues() as issue (issue.message)}
						<p class="text-xs text-destructive">{issue.message}</p>
					{/each}
					<Select.Root type="single" name={resourceTypeField.name}>
						<Select.Trigger id="p-resource" aria-invalid={resourceTypeField['aria-invalid']}>
							<span>Select resource…</span>
						</Select.Trigger>
						<Select.Content>
							{#each RESOURCE_TYPES as rt (rt)}
								<Select.Item value={rt}>{rt.charAt(0) + rt.slice(1).toLowerCase()}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</div>

				<div class="space-y-1.5">
					<Label for="p-action">Action *</Label>
					{#each createPolicy.fields.actionType.issues() as issue (issue.message)}
						<p class="text-xs text-destructive">{issue.message}</p>
					{/each}
					<Select.Root type="single" name={actionTypeField.name}>
						<Select.Trigger id="p-action" aria-invalid={actionTypeField['aria-invalid']}>
							<span>Select action…</span>
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
					<Label for="p-effect">Effect *</Label>
					{#each createPolicy.fields.effect.issues() as issue (issue.message)}
						<p class="text-xs text-destructive">{issue.message}</p>
					{/each}
					<Select.Root type="single" name={effectField.name} value="ALLOW">
						<Select.Trigger id="p-effect" aria-invalid={effectField['aria-invalid']}>
							<span>Allow</span>
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="ALLOW">Allow</Select.Item>
							<Select.Item value="DENY">Deny</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>

				<div class="space-y-1.5">
					<Label for="p-connector">Rule Connector</Label>
					<Select.Root type="single" name="ruleConnector" value="AND">
						<Select.Trigger id="p-connector">
							<span>AND</span>
						</Select.Trigger>
						<Select.Content>
							<Select.Item value="AND">AND — all rules must match</Select.Item>
							<Select.Item value="OR">OR — any rule must match</Select.Item>
						</Select.Content>
					</Select.Root>
				</div>
			</div>

			<div class="space-y-1.5">
				<Label for="p-priority">Priority</Label>
				<p class="text-xs text-muted-foreground">Higher value = evaluated first</p>
				<Input
					id="p-priority"
					name="priority"
					type="number"
					min="0"
					value="0"
					class="w-32"
				/>
			</div>
		</div>

		<div class="rounded-lg border p-6 space-y-5">
			<div class="flex items-center justify-between">
				<div>
					<h2 class="text-lg font-semibold">Rules</h2>
					<p class="text-sm text-muted-foreground">Attribute conditions that must be satisfied</p>
				</div>
				<div class="flex items-center gap-3">
					<span class="text-sm text-muted-foreground">{rules.length} rule{rules.length !== 1 ? 's' : ''}</span>
					<Button type="button" variant="outline" size="sm" onclick={addRule}>
						<PlusIcon class="mr-1.5 size-3.5" />
						Add Rule
					</Button>
				</div>
			</div>
			<Separator />

			{#if rules.length === 0}
				<p class="text-sm text-muted-foreground italic">No rules added. The policy will apply unconditionally.</p>
			{:else}
				<div class="space-y-4">
					{#each rules as rule, i (rule._id)}
						<div class="rounded-md border p-4 space-y-3">
							<div class="flex items-center justify-between">
								<span class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Rule {i + 1}</span>
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

							<div class="grid gap-3 sm:grid-cols-3">
								<div class="space-y-1.5">
									<Label>Attribute</Label>
									<select
										bind:value={rule.attributePath}
										class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
									>
										{#each ATTRIBUTE_PATHS as ap (ap.value)}
											<option value={ap.value}>{ap.label}</option>
										{/each}
									</select>
								</div>

								<div class="space-y-1.5">
									<Label>Operator</Label>
									<select
										bind:value={rule.operator}
										class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
									>
										{#each OPERATOR_TYPES as op (op)}
											<option value={op}>{op.toLowerCase().replace(/_/g, ' ')}</option>
										{/each}
									</select>
								</div>

								<div class="space-y-1.5">
									<Label>Value Type</Label>
									<select
										bind:value={rule.valueType}
										class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
									>
										{#each VALUE_TYPES as vt (vt)}
											<option value={vt}>{vt.charAt(0) + vt.slice(1).toLowerCase()}</option>
										{/each}
									</select>
								</div>
							</div>

							<div class="space-y-1.5">
								<Label>Expected Value</Label>
								<Input
									bind:value={rule.expectedValue}
									placeholder="Value to compare against"
								/>
							</div>

							<div class="grid gap-3 sm:grid-cols-2">
								<div class="space-y-1.5">
									<Label>Description <span class="text-muted-foreground">(optional)</span></Label>
									<Input
										bind:value={rule.description}
										placeholder="Brief note about this rule"
									/>
								</div>

								<div class="flex items-end gap-2 pb-0.5">
									<Checkbox.Root
										id="rule-active-{i}"
										checked={rule.isActive}
										onCheckedChange={(c) => { rule.isActive = !!c; }}
									/>
									<Label for="rule-active-{i}">Active</Label>
								</div>
							</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>

		<div class="flex items-center justify-between pt-4 border-t">
			<a href="/settings/policies">
				<Button type="button" variant="ghost">Cancel</Button>
			</a>
			<Button type="submit">Create Policy</Button>
		</div>
	</form>
</div>
