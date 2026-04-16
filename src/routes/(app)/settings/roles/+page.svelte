<script lang="ts">
	import { page } from '$app/state';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as v from 'valibot';
	import { getRoles, createRole } from '$lib/remotes/roles.remote';

	const search = $derived(page.url.searchParams.get('search') ?? undefined);
	const after = $derived(page.url.searchParams.get('after') ?? undefined);

	const roles = $derived(await getRoles({ search, after }));

	const preflight = v.object({
		name: v.pipe(v.string(), v.nonEmpty('Required'))
	});
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Roles</h1>
			<p class="text-muted-foreground text-sm">Group permissions into reusable roles</p>
		</div>
		<Sheet.Root>
			<Sheet.Trigger>
				{#snippet child({ props })}
					<Button {...props}>
						<PlusIcon class="mr-2 size-4" />
						New Role
					</Button>
				{/snippet}
			</Sheet.Trigger>
			<Sheet.Content side="right" class="sm:max-w-sm">
				<Sheet.Header>
					<Sheet.Title>New Role</Sheet.Title>
				</Sheet.Header>
				<form {...createRole.preflight(preflight)} class="mt-6 space-y-4 px-1">
					{#each createRole.fields.allIssues() as issue (issue.message)}
						<p class="rounded border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
							{issue.message}
						</p>
					{/each}
					<div class="space-y-1.5">
						<Label for="r-name">Name</Label>
						{#each createRole.fields.name.issues() as issue (issue.message)}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
						<Input id="r-name" {...createRole.fields.name.as('text')} />
					</div>
					<div class="space-y-1.5">
						<Label for="r-desc">Description</Label>
						<textarea
							id="r-desc"
							name="description"
							rows="2"
							class="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring flex w-full rounded-md border px-3 py-2 text-sm shadow-sm focus-visible:ring-1 focus-visible:outline-none"
						></textarea>
					</div>
					<Button type="submit" class="w-full">Create Role</Button>
				</form>
			</Sheet.Content>
		</Sheet.Root>
	</div>

	<div class="rounded-lg border">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b">
					<th class="text-muted-foreground px-4 py-3 text-left font-medium">Name</th>
					<th class="text-muted-foreground hidden px-4 py-3 text-left font-medium md:table-cell">Description</th>
					<th class="text-muted-foreground px-4 py-3 text-left font-medium">Policies</th>
					<th class="text-muted-foreground px-4 py-3 text-left font-medium">Users</th>
				</tr>
			</thead>
			<tbody>
				{#each roles.nodes as role (role.id)}
					<tr class="hover:bg-muted/50 border-b last:border-0 transition-colors">
						<td class="px-4 py-3">
							<a href="/settings/roles/{role.id}" class="font-medium transition-colors hover:text-primary">
								{role.name}
							</a>
						</td>
						<td class="text-muted-foreground hidden px-4 py-3 md:table-cell">
							{role.description ?? '—'}
						</td>
						<td class="text-muted-foreground px-4 py-3">{role.policies.length}</td>
						<td class="text-muted-foreground px-4 py-3">{role.users.length}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	{#if roles.pageInfo.hasNextPage}
		<div class="flex justify-center">
			<a href="?after={roles.pageInfo.endCursor}">
				<Button variant="outline">Load more</Button>
			</a>
		</div>
	{/if}
</div>
