<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import ShieldXIcon from '@lucide/svelte/icons/shield-x';
	import ClockIcon from '@lucide/svelte/icons/clock';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { resolve } from '$app/paths';
	import { getAudit } from '$lib/remotes/audit.remote';
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
	const id = $derived(params.id);

	const resp = $derived(await getAudit({ id }));
	const audit = $derived(resp.audit)

	function formatTimeAgo(timestamp: string): string {
		const date = new Date(timestamp);
		const now = new Date();
		const diffMs = now.getTime() - date.getTime();
		const diffSec = Math.floor(diffMs / 1000);
		if (diffSec < 60) return 'just now';
		const diffMin = Math.floor(diffSec / 60);
		if (diffMin < 60) return `${diffMin}m ago`;
		const diffHr = Math.floor(diffMin / 60);
		if (diffHr < 24) return `${diffHr}h ago`;
		const diffDay = Math.floor(diffHr / 24);
		if (diffDay < 7) return `${diffDay}d ago`;
		return date.toLocaleDateString();
	}
</script>

{#if !audit}
	<div class="space-y-6">
		<div class="flex items-center gap-3">
			<a
				href={resolve('/settings/audit')}
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeftIcon class="size-4" />
			</a>
			<div>
				<h1 class="text-2xl font-bold">Audit Entry</h1>
				<p class="text-sm text-muted-foreground">Not found</p>
			</div>
		</div>
		<p class="text-muted-foreground">This audit entry could not be found.</p>
		<a href={resolve('/settings/audit')}>
			<Button variant="outline">Back to Activity Log</Button>
		</a>
	</div>
{:else}
	<div class="space-y-6">
		<div class="flex items-center gap-3">
			<a
				href={resolve('/settings/audit')}
				class="text-muted-foreground transition-colors hover:text-foreground"
			>
				<ArrowLeftIcon class="size-4" />
			</a>
			<div>
				<h1 class="text-2xl font-bold">Audit Entry</h1>
				<p class="text-sm text-muted-foreground">
					{new Date(audit.timestamp).toLocaleString()} · {formatTimeAgo(audit.timestamp)}
				</p>
			</div>
		</div>

		<!-- Summary -->
		<div class="rounded-lg border p-6">
			<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
				<div class="space-y-2">
					<div class="flex items-center gap-2">
						{#if audit.decision === 'ALLOW'}
							<ShieldCheckIcon class="size-6 text-copper" />
						{:else}
							<ShieldXIcon class="size-6 text-destructive" />
						{/if}
						<Badge variant={audit.decision === 'ALLOW' ? 'default' : 'destructive'} class="text-sm">
							{audit.decision === 'ALLOW' ? 'Allowed' : 'Denied'}
						</Badge>
					</div>
					<p class="text-sm">
						<a
							href={resolve(`/settings/users/${audit.user!.id}`)}
							class="font-medium transition-colors hover:text-primary"
						>
							{audit.user?.name}
						</a>
						attempted
						<span class="font-medium">{audit.requestedAction}</span>
						on
						<span class="font-medium">{audit.resourceType}</span>
						and was
						<span class={audit.decision === 'ALLOW' ? 'text-copper' : 'text-destructive'}>
							{audit.decision === 'ALLOW' ? 'allowed' : 'denied'}
						</span>.
					</p>
				</div>
				<div class="flex items-center gap-2 text-sm text-muted-foreground">
					<ClockIcon class="size-4" />
					Evaluated in {audit.evaluationTimeMs}ms
				</div>
			</div>
		</div>

		<!-- Decision Reason -->
		<div class="rounded-lg border p-6">
			<h2 class="mb-3 font-semibold">Decision Reason</h2>
			<p class="text-sm whitespace-pre-wrap text-muted-foreground">{audit.decisionReason}</p>
		</div>

		<!-- Request Context -->
		{#if audit.ipAddress || audit.userAgent || audit.sessionId}
			<div class="rounded-lg border p-6">
				<h2 class="mb-3 font-semibold">Request Context</h2>
				<div class="space-y-3">
					{#if audit.ipAddress}
						<div>
							<p class="text-xs text-muted-foreground uppercase">IP Address</p>
							<p class="font-mono text-sm">{audit.ipAddress}</p>
						</div>
					{/if}
					{#if audit.userAgent}
						<div>
							<p class="text-xs text-muted-foreground uppercase">User Agent</p>
							<p class="text-sm break-all text-muted-foreground">{audit.userAgent}</p>
						</div>
					{/if}
					{#if audit.sessionId}
						<div>
							<p class="text-xs text-muted-foreground uppercase">Session ID</p>
							<p class="font-mono text-sm">{audit.sessionId}</p>
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<!-- Policies -->
		{#if audit.evaluatedPolicyIds?.length}
			<div class="rounded-lg border p-6">
				<h2 class="mb-3 font-semibold">Policies Evaluated</h2>
				<div class="flex flex-wrap gap-2">
					{#each audit.evaluatedPolicyIds as policyId (policyId)}
						<a href={resolve(`/settings/policies/${policyId}`)}>
							<Badge variant="outline" class="font-mono">{policyId}</Badge>
						</a>
					{/each}
				</div>
			</div>
		{/if}

		{#if audit.matchingPolicyIds?.length}
			<div class="rounded-lg border p-6">
				<h2 class="mb-3 font-semibold">Policies Matched</h2>
				<div class="flex flex-wrap gap-2">
					{#each audit.matchingPolicyIds as policyId (policyId)}
						<a href={resolve(`/settings/policies/${policyId}`)}>
							<Badge variant="outline" class="font-mono">{policyId}</Badge>
						</a>
					{/each}
				</div>
			</div>
		{/if}
	</div>
{/if}
