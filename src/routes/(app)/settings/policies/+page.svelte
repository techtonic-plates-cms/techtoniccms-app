<script lang="ts">
	import { page } from '$app/state';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as v from 'valibot';
	import { getPolicies, createPolicy } from '$lib/remotes/policies.remote';

	const search = $derived(page.url.searchParams.get('search') ?? undefined);
	const resourceType = $derived(page.url.searchParams.get('resourceType') ?? undefined);
	const actionType = $derived(page.url.searchParams.get('actionType') ?? undefined);
	const effect = $derived(page.url.searchParams.get('effect') ?? undefined);
	const isActive = $derived(page.url.searchParams.get('isActive') ?? undefined);

	const policies = $derived(await getPolicies({ search, resourceType, actionType, effect, isActive }));

	const RESOURCE_TYPES = ['ASSETS', 'COLLECTIONS', 'ENTRIES', 'FIELDS', 'USERS'];
	const ACTION_TYPES = [
		'READ', 'CREATE', 'UPDATE', 'DELETE', 'PUBLISH', 'UNPUBLISH',
		'ARCHIVE', 'RESTORE', 'UPLOAD', 'DOWNLOAD', 'MANAGE_SCHEMA',
		'CONFIGURE_FIELDS', 'DRAFT', 'ACTIVATE', 'DEACTIVATE', 'BAN', 'UNBAN'
	];

	const preflight = v.object({
		name: v.pipe(v.string(), v.nonEmpty('Required')),
		actionType: v.pipe(v.string(), v.nonEmpty('Required')),
		effect: v.pipe(v.string(), v.nonEmpty('Required')),
		resourceType: v.pipe(v.string(), v.nonEmpty('Required'))
	});

	const EFFECT_VARIANT: Record<string, 'default' | 'destructive'> = {
		ALLOW: 'default',
		DENY: 'destructive'
	};
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Policies</h1>
			<p class="text-muted-foreground text-sm">Define attribute-based access control rules</p>
		</div>
		<Sheet.Root>
			<Sheet.Trigger>
				{#snippet child({ props })}
					<Button {...props}>
						<PlusIcon class="mr-2 size-4" />
						New Policy
					</Button>
				{/snippet}
			</Sheet.Trigger>
			<Sheet.Content side="right" class="sm:max-w-md">
				<Sheet.Header>
					<Sheet.Title>New Policy</Sheet.Title>
				</Sheet.Header>
				<form {...createPolicy.preflight(preflight)} class="mt-6 space-y-4 px-1">
					{#each createPolicy.fields.allIssues() as issue (issue.message)}
						<p class="rounded border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
							{issue.message}
						</p>
					{/each}

					<div class="space-y-1.5">
						<Label for="p-name">Name</Label>
						{#each createPolicy.fields.name.issues() as issue (issue.message)}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
						<Input id="p-name" {...createPolicy.fields.name.as('text')} />
					</div>

					<div class="space-y-1.5">
						<Label for="p-desc">Description</Label>
						<textarea
							id="p-desc"
							name="description"
							rows="2"
							class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
						></textarea>
					</div>

					<div class="grid grid-cols-2 gap-3">
						<div class="space-y-1.5">
							<Label for="p-resource">Resource</Label>
							{#each createPolicy.fields.resourceType.issues() as issue (issue.message)}
								<p class="text-xs text-destructive">{issue.message}</p>
							{/each}
							<select
								id="p-resource"
								{...createPolicy.fields.resourceType.as('text')}
								class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
							>
								<option value="">Select…</option>
								{#each RESOURCE_TYPES as rt (rt)}
									<option value={rt}>{rt.toLowerCase()}</option>
								{/each}
							</select>
						</div>
						<div class="space-y-1.5">
							<Label for="p-action">Action</Label>
							{#each createPolicy.fields.actionType.issues() as issue (issue.message)}
								<p class="text-xs text-destructive">{issue.message}</p>
							{/each}
							<select
								id="p-action"
								{...createPolicy.fields.actionType.as('text')}
								class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
							>
								<option value="">Select…</option>
								{#each ACTION_TYPES as at (at)}
									<option value={at}>{at.toLowerCase().replace(/_/g, ' ')}</option>
								{/each}
							</select>
						</div>
					</div>

					<div class="space-y-1.5">
						<Label for="p-effect">Effect</Label>
						{#each createPolicy.fields.effect.issues() as issue (issue.message)}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
						<select
							id="p-effect"
							{...createPolicy.fields.effect.as('text')}
							class="border-input bg-background w-full rounded-md border px-3 py-2 text-sm"
						>
							<option value="ALLOW">Allow</option>
							<option value="DENY">Deny</option>
						</select>
					</div>

					<div class="flex items-center gap-2">
						<input id="p-active" type="checkbox" name="isActive" class="size-4 rounded" checked />
						<Label for="p-active">Active</Label>
					</div>

					<Button type="submit" class="w-full">Create Policy</Button>
				</form>
			</Sheet.Content>
		</Sheet.Root>
	</div>

	{#if policies.length === 0}
		<p class="text-muted-foreground py-8 text-center text-sm">No policies yet.</p>
	{:else}
		<div class="rounded-lg border">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b">
						<th class="text-muted-foreground px-4 py-3 text-left font-medium">Name</th>
						<th class="text-muted-foreground px-4 py-3 text-left font-medium">Effect</th>
						<th class="text-muted-foreground hidden px-4 py-3 text-left font-medium md:table-cell">Resource</th>
						<th class="text-muted-foreground hidden px-4 py-3 text-left font-medium md:table-cell">Action</th>
						<th class="text-muted-foreground px-4 py-3 text-left font-medium">Rules</th>
					</tr>
				</thead>
				<tbody>
					{#each policies as policy (policy.id)}
						<tr class="hover:bg-muted/50 border-b last:border-0 transition-colors">
							<td class="px-4 py-3">
								<a href="/settings/policies/{policy.id}" class="font-medium transition-colors hover:text-primary">
									{policy.name}
								</a>
								{#if !policy.isActive}
									<span class="text-muted-foreground ml-1 text-xs">(inactive)</span>
								{/if}
							</td>
							<td class="px-4 py-3">
								<Badge variant={EFFECT_VARIANT[policy.effect] ?? 'outline'}>
									{policy.effect.toLowerCase()}
								</Badge>
							</td>
							<td class="text-muted-foreground hidden px-4 py-3 md:table-cell">
								{policy.resourceType.toLowerCase()}
							</td>
							<td class="text-muted-foreground hidden px-4 py-3 md:table-cell">
								{policy.actionType.toLowerCase().replace(/_/g, ' ')}
							</td>
							<td class="text-muted-foreground px-4 py-3">{policy.rules.length}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
