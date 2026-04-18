<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import Trash2Icon from '@lucide/svelte/icons/trash-2';
	import ChevronDownIcon from '@lucide/svelte/icons/chevron-down';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Checkbox from '$lib/components/ui/checkbox/index.js';
	import * as Switch from '$lib/components/ui/switch/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as v from 'valibot';
	import { requireAuth } from '$lib/remotes/auth.remote';
	import { createCollection } from '$lib/remotes/collections.remote';
	import AssetCombobox from '$lib/components/asset-combobox.svelte';
	import CollectionCombobox from '$lib/components/collection-combobox.svelte';

	await requireAuth();

	// --- General ---
	const nameField = createCollection.fields.name.as('text');
	const slugField = createCollection.fields.slug.as('text');
	let nameInput = $state(String(nameField.value ?? ''));
	let slugInput = $state(String(slugField.value ?? ''));
	let slugOverridden = $state(false);
	let descriptionInput = $state('');
	let iconInput = $state('');
	let colorInput = $state('#6366f1');

	$effect(() => {
		if (!slugOverridden) {
			slugInput = nameInput
				.toLowerCase()
				.replace(/\s+/g, '-')
				.replace(/[^a-z0-9-]/g, '');
		}
	});

	// --- Localization ---
	let isLocalized = $state(false);
	let defaultLocale = $state('EN');
	let supportedLocales = $state<string[]>([]);

	const LOCALES = ['AR', 'DE', 'EN', 'ES', 'FR', 'IT', 'JA', 'KO', 'PT', 'RU', 'ZH'];

	// --- Fields ---
	type DraftField = {
		id: string;
		name: string;
		label: string;
		dataType: string;
		isRequired: boolean;
		isUnique: boolean;
		defaultValue: string;
		description: string;
		helpText: string;
		validationRules: string;
		relatedCollectionId: string;
		advancedOpen: boolean;
	};

	let fields = $state<DraftField[]>([]);

	function addField() {
		fields.push({
			id: crypto.randomUUID(),
			name: '',
			label: '',
			dataType: 'TEXT',
			isRequired: false,
			isUnique: false,
			defaultValue: '',
			description: '',
			helpText: '',
			validationRules: '',
			relatedCollectionId: '',
			advancedOpen: false
		});
	}

	function removeField(id: string) {
		fields = fields.filter(f => f.id !== id);
	}

	function updateField(id: string, patch: Partial<DraftField>) {
		const idx = fields.findIndex(f => f.id === id);
		if (idx !== -1) fields[idx] = { ...fields[idx], ...patch };
	}

	// Serialized for hidden inputs
	const fieldsJson = $derived(
		JSON.stringify(fields.map(({ id, advancedOpen, ...rest }) => rest))
	);
	const supportedLocalesStr = $derived(supportedLocales.join(','));

	// Preflight validation
	const preflight = v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required')),
		slug: v.pipe(v.string(), v.nonEmpty('Slug is required'))
	});

	const DATA_TYPES = [
		{ value: 'TEXT', label: 'Text' },
		{ value: 'NUMBER', label: 'Number' },
		{ value: 'BOOLEAN', label: 'Boolean' },
		{ value: 'DATE_TIME', label: 'Date / Time' },
		{ value: 'ASSET', label: 'Asset' },
		{ value: 'OBJECT', label: 'Object (JSON)' },
		{ value: 'RELATION', label: 'Relation' }
	];

	const COLOR_PRESETS = [
		'#6366f1',
		'#8b5cf6',
		'#ec4899',
		'#f97316',
		'#eab308',
		'#22c55e',
		'#14b8a6',
		'#0ea5e9'
	];

</script>

<div class="mx-auto max-w-3xl space-y-8 py-8 px-4">
	<!-- Header -->
	<div class="space-y-2">
		<a
			href="/collections"
			class="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
		>
			<ArrowLeftIcon class="size-4" />
			Back to Collections
		</a>
		<h1 class="text-3xl font-bold">New Collection</h1>
		<p class="text-muted-foreground">Define a new content type and its fields</p>
	</div>

	<form {...createCollection.preflight(preflight)} class="space-y-6">
		<!-- Hidden serialized inputs -->
		<input type="hidden" name="fields" value={fieldsJson} />
		<input type="hidden" name="supportedLocales" value={supportedLocalesStr} />
		<input type="hidden" name="isLocalized" value={isLocalized ? 'on' : ''} />
		<input type="hidden" name="defaultLocale" value={defaultLocale} />

		<!-- Global error banner -->
		{#each createCollection.fields.allIssues() as issue (issue.message)}
			<div class="rounded border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
				{issue.message}
			</div>
		{/each}

		<!-- Section 1: General -->
		<div class="rounded-lg border p-6 space-y-5">
			<h2 class="text-lg font-semibold">General</h2>
			<Separator />

			<!-- Name & Slug -->
			<div class="grid gap-4 sm:grid-cols-2">
				<div class="space-y-1.5">
					<Label for="col-name">Name *</Label>
					{#each createCollection.fields.name.issues() as issue (issue.message)}
						<p class="text-xs text-destructive">{issue.message}</p>
					{/each}
					<Input
						id="col-name"
						name={nameField.name}
						aria-invalid={nameField['aria-invalid']}
						bind:value={nameInput}
						placeholder="Blog Posts"
					/>
				</div>

				<div class="space-y-1.5">
					<Label for="col-slug">
						Slug * {#if slugOverridden}
							<button
								type="button"
								class="ml-2 text-xs text-muted-foreground hover:underline"
								onclick={() => (slugOverridden = false)}
							>
								reset
							</button>
						{/if}
					</Label>
					{#each createCollection.fields.slug.issues() as issue (issue.message)}
						<p class="text-xs text-destructive">{issue.message}</p>
					{/each}
					<Input
						id="col-slug"
						name={slugField.name}
						aria-invalid={slugField['aria-invalid']}
						bind:value={slugInput}
						oninput={() => (slugOverridden = true)}
						placeholder="blog-posts"
					/>
				</div>
			</div>

			<!-- Description -->
			<div class="space-y-1.5">
				<Label for="col-desc">Description</Label>
				<Textarea
					id="col-desc"
					name="description"
					placeholder="A brief description of this collection..."
					bind:value={descriptionInput}
				/>
			</div>

			<!-- Icon & Color -->
			<div class="grid gap-4 sm:grid-cols-2">
				<div class="space-y-1.5">
					<Label>Icon (asset)</Label>
					<input type="hidden" name="iconId" value={iconInput} />
					<AssetCombobox
						value={iconInput}
						onValueChange={(id) => { iconInput = id; }}
					/>
				</div>

				<div class="space-y-1.5">
					<Label for="col-color">Color</Label>
					<div class="flex items-center gap-2">
						<Input
							id="col-color"
							name="color"
							type="color"
							bind:value={colorInput}
							class="h-9 w-20 cursor-pointer"
						/>
						<div class="flex gap-1">
							{#each COLOR_PRESETS as preset}
								<button
									type="button"
									class="size-6 rounded transition-transform hover:scale-110"
									style={`background-color: ${preset}`}
									title={preset}
									onclick={() => (colorInput = preset)}
								></button>
							{/each}
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Section 2: Localization -->
		<div class="rounded-lg border p-6 space-y-5">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold">Localization</h2>
				<Switch.Root bind:checked={isLocalized} />
			</div>
			<Separator />

			{#if isLocalized}
				<div class="space-y-4 animate-in fade-in">
					<div class="space-y-1.5">
						<Label for="locale-default">Default Locale</Label>
						<Select.Root type="single" value={defaultLocale} onValueChange={(v: string) => (defaultLocale = v)}>
							<Select.Trigger id="locale-default">
								<span>{defaultLocale}</span>
							</Select.Trigger>
							<Select.Content>
								{#each LOCALES as locale}
									<Select.Item value={locale}>{locale}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
					</div>

					<div class="space-y-2">
						<Label>Supported Locales</Label>
						<div class="flex flex-wrap gap-2">
							{#each LOCALES as locale}
								<label class="flex items-center gap-2 text-sm cursor-pointer">
									<Checkbox.Root
										checked={supportedLocales.includes(locale)}
										onCheckedChange={(c) => {
											if (c) {
												supportedLocales = [...supportedLocales, locale];
											} else {
												supportedLocales = supportedLocales.filter(l => l !== locale);
											}
										}}
									/>
									{locale}
								</label>
							{/each}
						</div>
					</div>
				</div>
			{/if}
		</div>

		<!-- Section 3: Fields -->
		<div class="rounded-lg border p-6 space-y-5">
			<div class="flex items-center justify-between">
				<h2 class="text-lg font-semibold">Fields</h2>
				<span class="text-sm text-muted-foreground"
					>{fields.length} field{fields.length !== 1 ? 's' : ''}</span
				>
			</div>
			<Separator />

			{#if fields.length === 0}
				<div class="rounded-lg border border-dashed p-6 text-center">
					<p class="text-muted-foreground text-sm mb-3">No fields yet</p>
					<p class="text-muted-foreground text-xs mb-4"
						>Add fields to define the structure of entries in this collection</p
					>
					<Button type="button" variant="outline" size="sm" onclick={addField}>
						<PlusIcon class="mr-2 size-4" />
						Add Your First Field
					</Button>
				</div>
			{:else}
				<div class="space-y-3">
					{#each fields as field (field.id)}
					{console.log(field.dataType)}
						<div class="rounded-md border p-4 space-y-3">
							<!-- Row 1: name, label, dataType, remove -->
							<div class="grid grid-cols-12 gap-2 items-end">
								<div class="col-span-4 space-y-1.5">
									<Label class="text-xs">Name *</Label>
									<Input
										placeholder="field_name"
										bind:value={field.name}
										onchange={() => updateField(field.id, { name: field.name })}
									/>
								</div>
								<div class="col-span-4 space-y-1.5">
									<Label class="text-xs">Label</Label>
									<Input
										placeholder="Field Label"
										bind:value={field.label}
										onchange={() => updateField(field.id, { label: field.label })}
									/>
								</div>
								<div class="col-span-3 space-y-1.5">
									<Label class="text-xs">Type</Label>
									<Select.Root
										type="single"
										value={field.dataType}
										onValueChange={(v: string) => {
											updateField(field.id, {
												dataType: v,
												relatedCollectionId: v !== 'RELATION' ? '' : field.relatedCollectionId
											});
										}}
									>
										<Select.Trigger class="h-9">
											<span>{field.dataType}</span>
										</Select.Trigger>
										<Select.Content>
											{#each DATA_TYPES as dt}
												<Select.Item value={dt.value}>{dt.label}</Select.Item>
											{/each}
										</Select.Content>
									</Select.Root>
								</div>
								<div class="col-span-1">
									<Button
										type="button"
										variant="ghost"
										size="icon"
										class="h-8 w-8"
										onclick={() => removeField(field.id)}
									>
										<Trash2Icon class="size-4" />
									</Button>
								</div>
							</div>

							<!-- RELATION picker -->
							{#if field.dataType === 'RELATION'}
								<div class="space-y-1.5">
									<Label class="text-xs">Related Collection</Label>
									<CollectionCombobox
										value={field.relatedCollectionId}
										onValueChange={(id) => updateField(field.id, { relatedCollectionId: id })}
									/>
								</div>
							{/if}

							<!-- Toggles -->
							<div class="flex items-center gap-6">
								<label class="flex items-center gap-2 text-sm cursor-pointer">
									<Checkbox.Root
										checked={field.isRequired}
										onCheckedChange={(c) => updateField(field.id, { isRequired: !!c })}
									/>
									Required
								</label>
								<label class="flex items-center gap-2 text-sm cursor-pointer">
									<Checkbox.Root
										checked={field.isUnique}
										onCheckedChange={(c) => updateField(field.id, { isUnique: !!c })}
									/>
									Unique
								</label>
							</div>

							<!-- Advanced collapsible -->
							<Collapsible.Root bind:open={field.advancedOpen}>
								<Collapsible.Trigger class="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
									<ChevronDownIcon
										class="size-4 transition-transform"
										style={field.advancedOpen ? 'transform: rotate(180deg)' : ''}
									/>
									Advanced options
								</Collapsible.Trigger>
								<Collapsible.Content class="mt-3 space-y-3">
									<div class="space-y-1.5">
										<Label class="text-xs">Default Value</Label>
										<Input
											placeholder="Default value for new entries"
											bind:value={field.defaultValue}
											onchange={() => updateField(field.id, { defaultValue: field.defaultValue })}
										/>
									</div>
									<div class="space-y-1.5">
										<Label class="text-xs">Description</Label>
										<Textarea
											placeholder="Describe this field..."
											bind:value={field.description}
											onchange={() => updateField(field.id, { description: field.description })}
											class="resize-none"
											rows={2}
										/>
									</div>
									<div class="space-y-1.5">
										<Label class="text-xs">Help Text</Label>
										<Textarea
											placeholder="Help text shown to content editors..."
											bind:value={field.helpText}
											onchange={() => updateField(field.id, { helpText: field.helpText })}
											class="resize-none"
											rows={2}
										/>
									</div>
									<div class="space-y-1.5">
										<Label class="text-xs">Validation Rules (JSON)</Label>
										<Textarea
											placeholder={`{"pattern": "^[a-z]+$"}`}
											bind:value={field.validationRules}
											onchange={() => updateField(field.id, { validationRules: field.validationRules })}
											class="resize-none font-mono text-xs"
											rows={2}
										/>
									</div>
								</Collapsible.Content>
							</Collapsible.Root>
						</div>
					{/each}
				</div>

				<Button type="button" variant="outline" onclick={addField}>
					<PlusIcon class="mr-2 size-4" />
					Add Field
				</Button>
			{/if}
		</div>

		<!-- Form actions -->
		<div class="flex items-center justify-between pt-4 border-t">
			<a href="/collections">
				<Button type="button" variant="ghost">Cancel</Button>
			</a>
			<Button type="submit">Create Collection</Button>
		</div>
	</form>
</div>
