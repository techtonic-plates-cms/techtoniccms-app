<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Checkbox from '$lib/components/ui/checkbox/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as v from 'valibot';
	import { requireAuth } from '$lib/remotes/auth.remote';
	import { createRole } from '$lib/remotes/roles.remote';
	import { getPolicies } from '$lib/remotes/policies.remote';

	await requireAuth();

	const nameField = createRole.fields.name.as('text');

	const policies = await getPolicies({});

	let selectedPolicyIds = $state<string[]>([]);
	const policyIdsStr = $derived(selectedPolicyIds.join(','));

	const preflight = v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required'))
	});

	const EFFECT_VARIANT: Record<string, 'default' | 'destructive' | 'outline'> = {
		ALLOW: 'default',
		DENY: 'destructive'
	};
</script>

<div class="mx-auto max-w-3xl space-y-8 px-4 py-8">
	<div class="space-y-2">
		<a
			href="/settings/roles"
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
				<h2 class="text-lg font-semibold">Policies</h2>
				<span class="text-sm text-muted-foreground">
					{selectedPolicyIds.length} selected
				</span>
			</div>
			<Separator />

			{#if policies.length === 0}
				<p class="text-sm text-muted-foreground italic">No policies available</p>
			{:else}
				<div class="flex flex-col gap-2">
					{#each policies as policy (policy.id)}
						<label
							class="flex cursor-pointer items-center gap-3 rounded-md p-2 text-sm transition-colors hover:bg-muted/50"
						>
							<Checkbox.Root
								checked={selectedPolicyIds.includes(policy.id)}
								onCheckedChange={(c) => {
									if (c) {
										selectedPolicyIds = [...selectedPolicyIds, policy.id];
									} else {
										selectedPolicyIds = selectedPolicyIds.filter((id) => id !== policy.id);
									}
								}}
							/>
							<span class="font-medium">{policy.name}</span>
							<Badge variant={EFFECT_VARIANT[policy.effect] ?? 'outline'} class="text-xs">
								{policy.effect.toLowerCase()}
							</Badge>
							<span class="text-xs text-muted-foreground"
								>{policy.resourceType.toLowerCase()} · {policy.actionType
									.toLowerCase()
									.replace(/_/g, ' ')}</span
							>
							{#if policy.description}
								<span class="text-xs text-muted-foreground">— {policy.description}</span>
							{/if}
						</label>
					{/each}
				</div>
			{/if}
		</div>

		<div class="flex items-center justify-between border-t pt-4">
			<a href="/settings/roles">
				<Button type="button" variant="ghost">Cancel</Button>
			</a>
			<Button type="submit">Create Role</Button>
		</div>
	</form>
</div>
