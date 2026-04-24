<script lang="ts">
	import { page } from '$app/state';
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import CopyIcon from '@lucide/svelte/icons/copy';
	import CheckIcon from '@lucide/svelte/icons/check';
	import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { getApiKey, updateApiKey, revokeApiKey, deleteApiKey } from '$lib/remotes/api-keys.remote';
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
	const id = $derived(params.id);
	const newKey = $derived(page.url.searchParams.get('key'));

	const apiKey = $derived(await getApiKey({ id }));

	let copied = $state(false);
	let keyAcknowledged = $state(false);

	function copyKey() {
		if (!newKey) return;
		navigator.clipboard.writeText(newKey).then(() => {
			copied = true;
			setTimeout(() => (copied = false), 2000);
		});
	}
</script>

{#if newKey && !keyAcknowledged}
	<div class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
		<div class="mx-4 w-full max-w-lg rounded-xl border bg-card shadow-xl space-y-6 p-8">
			<div class="flex items-start gap-4">
				<div class="flex size-10 shrink-0 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/40">
					<TriangleAlertIcon class="size-5 text-amber-600 dark:text-amber-400" />
				</div>
				<div class="space-y-1">
					<h2 class="text-lg font-semibold">Copy your API key now</h2>
					<p class="text-muted-foreground text-sm">
						This is the only time your key will be displayed. It is not stored and cannot be recovered.
					</p>
				</div>
			</div>

			<div class="space-y-2">
				<p class="text-xs font-medium text-muted-foreground uppercase tracking-wide">Your new API key</p>
				<div class="flex items-center gap-2">
					<code class="flex-1 rounded-md border bg-muted px-3 py-2.5 font-mono text-sm break-all select-all">
						{newKey}
					</code>
					<Button variant="outline" size="sm" onclick={copyKey} class="shrink-0">
						{#if copied}
							<CheckIcon class="size-4 text-green-600" />
							Copied
						{:else}
							<CopyIcon class="size-4" />
							Copy
						{/if}
					</Button>
				</div>
			</div>

			<Button class="w-full" onclick={() => (keyAcknowledged = true)}>
				I've saved my key — continue
			</Button>
		</div>
	</div>
{/if}

{#if !apiKey}
	<p class="text-muted-foreground">API key not found.</p>
{:else}
	<div class="space-y-8">
		<div class="flex items-center gap-3">
			<a href="/settings/api-keys" class="text-muted-foreground hover:text-foreground transition-colors">
				<ArrowLeftIcon class="size-4" />
			</a>
			<div>
				<div class="flex items-center gap-2">
					<h1 class="text-2xl font-bold">{apiKey.name}</h1>
					<Badge variant={apiKey.isActive ? 'default' : 'secondary'}>
						{apiKey.isActive ? 'Active' : 'Revoked'}
					</Badge>
				</div>
				<p class="text-muted-foreground text-xs">
					Created: {new Date(apiKey.createdAt).toLocaleDateString()}
					{#if apiKey.lastUsedAt}
						· Last used: {new Date(apiKey.lastUsedAt).toLocaleDateString()}
					{/if}
				</p>
			</div>
		</div>

		<div class="rounded-lg border p-6 space-y-4">
			<h2 class="text-lg font-semibold">Details</h2>
			<dl class="grid grid-cols-2 gap-3 text-sm">
				<dt class="text-muted-foreground">Prefix</dt>
				<dd class="font-mono">{apiKey.keyPrefix}</dd>
				<dt class="text-muted-foreground">Expires</dt>
				<dd>{apiKey.expiresAt ? new Date(apiKey.expiresAt).toLocaleString() : 'Never'}</dd>
				<dt class="text-muted-foreground">Updated</dt>
				<dd>{new Date(apiKey.updatedAt).toLocaleDateString()}</dd>
			</dl>
		</div>

		<div class="rounded-lg border p-6 space-y-5">
			<h2 class="text-lg font-semibold">Update</h2>
			<form {...updateApiKey} class="space-y-4">
				<input type="hidden" name="id" value={apiKey.id} />

				{#each updateApiKey.fields.allIssues() as issue (issue.message)}
					<div class="rounded border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
						{issue.message}
					</div>
				{/each}

				<div class="space-y-2">
					<Label for="update-name">Name</Label>
					<Input id="update-name" name="name" type="text" value={apiKey.name} />
				</div>
				<div class="space-y-2">
					<Label for="update-expires">Expires At <span class="text-muted-foreground font-normal">(optional)</span></Label>
					<Input
						id="update-expires"
						name="expiresAt"
						type="datetime-local"
						value={apiKey.expiresAt ? apiKey.expiresAt.slice(0, 16) : ''}
					/>
				</div>
				<div class="flex justify-end">
					<Button type="submit">Save changes</Button>
				</div>
			</form>
		</div>

		<div class="rounded-lg border border-destructive/30 p-6 space-y-4">
			<h2 class="text-lg font-semibold text-destructive">Danger Zone</h2>

			{#if apiKey.isActive}
				<div class="flex items-center justify-between gap-4">
					<div>
						<p class="font-medium text-sm">Revoke API key</p>
						<p class="text-muted-foreground text-sm">Permanently deactivate this key. It cannot be re-activated.</p>
					</div>
					<form
						{...revokeApiKey}
						onsubmit={(e) => {
							if (!confirm('Revoke this API key? This cannot be undone.')) e.preventDefault();
						}}
					>
						<input type="hidden" name="id" value={apiKey.id} />
						<Button type="submit" variant="outline" size="sm">Revoke</Button>
					</form>
				</div>
				<hr class="border-destructive/20" />
			{/if}

			<div class="flex items-center justify-between gap-4">
				<div>
					<p class="font-medium text-sm">Delete API key</p>
					<p class="text-muted-foreground text-sm">Permanently remove this key and all its data.</p>
				</div>
				<form
					{...deleteApiKey}
					onsubmit={(e) => {
						if (!confirm('Delete this API key? This action cannot be undone.')) e.preventDefault();
					}}
				>
					<input type="hidden" name="id" value={apiKey.id} />
					<Button type="submit" variant="destructive" size="sm">Delete</Button>
				</form>
			</div>
		</div>
	</div>
{/if}
