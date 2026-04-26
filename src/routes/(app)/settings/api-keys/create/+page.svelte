<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as v from 'valibot';
	import { requireAuth } from '$lib/remotes/auth.remote';
	import { createApiKey } from '$lib/remotes/api-keys.remote';

	await requireAuth();

	const nameField = createApiKey.fields.name.as('text');
	const expiresAtField = createApiKey.fields.expiresAt.as('text');

	const preflight = v.object({
		name: v.pipe(v.string(), v.nonEmpty('Name is required'))
	});
</script>

<div class="mx-auto max-w-3xl space-y-8 px-4 py-8">
	<div class="space-y-2">
		<a
			href="/settings/api-keys"
			class="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
		>
			<ArrowLeftIcon class="size-4" />
			Back to API Keys
		</a>
		<h1 class="text-3xl font-bold">New API Key</h1>
		<p class="text-muted-foreground">Create a new API key for programmatic access</p>
	</div>

	<form {...createApiKey.preflight(preflight)} class="space-y-6">
		{#each createApiKey.fields.allIssues() as issue (issue.message)}
			<div
				class="rounded border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
			>
				{issue.message}
			</div>
		{/each}

		<div class="space-y-5 rounded-lg border p-6">
			<h2 class="text-lg font-semibold">Details</h2>

			<div class="space-y-2">
				<Label for="create-name">Name</Label>
				<Input {...nameField} id="create-name" placeholder="e.g. Production integration" />
				{#each createApiKey.fields.name.issues() as issue (issue.message)}
					<p class="text-sm text-destructive">{issue.message}</p>
				{/each}
			</div>

			<div class="space-y-2">
				<Label for="create-expires"
					>Expires At <span class="font-normal text-muted-foreground">(optional)</span></Label
				>
				<Input {...expiresAtField} id="create-expires" type="datetime-local" />
				<p class="text-xs text-muted-foreground">Leave blank to create a non-expiring key.</p>
			</div>
		</div>

		<div class="flex justify-end">
			<Button type="submit">Create API Key</Button>
		</div>
	</form>
</div>
