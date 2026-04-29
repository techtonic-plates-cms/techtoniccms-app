<script lang="ts">
	import { page } from '$app/state';
	import SearchIcon from '@lucide/svelte/icons/search';
	import ClipboardListIcon from '@lucide/svelte/icons/clipboard-list';
	import ShieldCheckIcon from '@lucide/svelte/icons/shield-check';
	import ShieldXIcon from '@lucide/svelte/icons/shield-x';
	import ClockIcon from '@lucide/svelte/icons/clock';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { resolve } from '$app/paths';
	import { getAudits } from '$lib/remotes/audit.remote';

	const search = $derived(page.url.searchParams.get('search') ?? undefined);
	const decision = $derived(page.url.searchParams.get('decision') ?? undefined);
	const resourceType = $derived(page.url.searchParams.get('resourceType') ?? undefined);
	const requestedAction = $derived(page.url.searchParams.get('requestedAction') ?? undefined);
	const after = $derived(page.url.searchParams.get('after') ?? undefined);

	const auditsData = $derived(
		await getAudits({ search, decision, resourceType, requestedAction, after })
	);
	const audits = $derived(auditsData.nodes);

	const DECISION_VARIANT: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
		ALLOW: 'default',
		DENY: 'destructive'
	};

	const metrics = $derived({
		total: audits.length,
		allowed: audits.filter((a) => a.decision === 'ALLOW').length,
		denied: audits.filter((a) => a.decision === 'DENY').length,
		avgEvalTime:
			audits.length > 0
				? Math.round(audits.reduce((sum, a) => sum + a.evaluationTimeMs, 0) / audits.length)
				: 0
	});

	const RESOURCE_TYPES = [
		'API_KEYS',
		'ASSETS',
		'COLLECTIONS',
		'ENTRIES',
		'POLICIES',
		'ROLES',
		'USERS'
	];

	const ACTION_TYPES = [
		'ACTIVATE',
		'ARCHIVE',
		'CREATE',
		'DEACTIVATE',
		'DELETE',
		'DOWNLOAD',
		'MANAGE_SCHEMA',
		'PUBLISH',
		'READ',
		'RESTORE',
		'SCHEDULE',
		'UNPUBLISH',
		'UPDATE',
		'UPLOAD'
	];

	let searchInput = $state(page.url.searchParams.get('search') ?? '');

	function updateSearch() {
		const url = new URL(page.url);
		if (searchInput) {
			url.searchParams.set('search', searchInput);
		} else {
			url.searchParams.delete('search');
		}
		url.searchParams.delete('after');
		window.location.href = url.toString();
	}

	function updateFilter(key: string, value: string | undefined) {
		const url = new URL(page.url);
		if (value) {
			url.searchParams.set(key, value);
		} else {
			url.searchParams.delete(key);
		}
		url.searchParams.delete('after');
		window.location.href = url.toString();
	}

	function clearFilters() {
		window.location.href = '/settings/audit';
	}

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

	function formatAction(action: string, resource: string): string {
		return `${action} on ${resource}`;
	}

	function truncate(str: string, len: number): string {
		return str.length > len ? str.slice(0, len) + '…' : str;
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<div>
			<h1 class="text-2xl font-bold">Activity Log</h1>
			<p class="text-sm text-muted-foreground">
				Permission check history — who tried to do what and why
			</p>
		</div>
	</div>

	<!-- Metrics -->
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
		<div class="rounded-lg border p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Total Checks</p>
			<p class="mt-1 text-3xl font-bold">{metrics.total}</p>
		</div>
		<div class="rounded-lg border border-l-4 border-l-copper p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Allowed</p>
			<div class="mt-1 flex items-center gap-2">
				<ShieldCheckIcon class="size-5 text-copper" />
				<p class="text-3xl font-bold">{metrics.allowed}</p>
			</div>
		</div>
		<div class="rounded-lg border border-l-4 border-l-destructive p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Denied</p>
			<div class="mt-1 flex items-center gap-2">
				<ShieldXIcon class="size-5 text-destructive" />
				<p class="text-3xl font-bold">{metrics.denied}</p>
			</div>
		</div>
		<div class="rounded-lg border p-4">
			<p class="text-xs tracking-wide text-muted-foreground uppercase">Avg Eval Time</p>
			<div class="mt-1 flex items-center gap-2">
				<ClockIcon class="size-5 text-muted-foreground" />
				<p class="text-3xl font-bold">{metrics.avgEvalTime}ms</p>
			</div>
		</div>
	</div>

	<!-- Filters -->
	<div class="flex flex-wrap items-end gap-3">
		<div class="relative max-w-sm min-w-50 flex-1">
			<SearchIcon class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				placeholder="Search by user..."
				class="pl-9"
				bind:value={searchInput}
				onkeydown={(e) => e.key === 'Enter' && updateSearch()}
			/>
		</div>
		<Select.Root type="single" value={decision} onValueChange={(v) => updateFilter('decision', v)}>
			<Select.Trigger class="w-32.5">
				<span>
					{#if decision === 'ALLOW'}
						Allow
					{:else if decision === 'DENY'}
						Deny
					{:else}
						All Decisions
					{/if}
				</span>
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="">All Decisions</Select.Item>
				<Select.Item value="ALLOW">Allow</Select.Item>
				<Select.Item value="DENY">Deny</Select.Item>
			</Select.Content>
		</Select.Root>
		<Select.Root
			type="single"
			value={resourceType}
			onValueChange={(v) => updateFilter('resourceType', v)}
		>
			<Select.Trigger class="w-37.5">
				<span>
					{#if resourceType}
						{resourceType}
					{:else}
						All Resources
					{/if}
				</span>
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="">All Resources</Select.Item>
				{#each RESOURCE_TYPES as rt (rt)}
					<Select.Item value={rt}>{rt}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		<Select.Root
			type="single"
			value={requestedAction}
			onValueChange={(v) => updateFilter('requestedAction', v)}
		>
			<Select.Trigger class="w-37.5">
				<span>
					{#if requestedAction}
						{requestedAction}
					{:else}
						All Actions
					{/if}
				</span>
			</Select.Trigger>
			<Select.Content>
				<Select.Item value="">All Actions</Select.Item>
				{#each ACTION_TYPES as at (at)}
					<Select.Item value={at}>{at}</Select.Item>
				{/each}
			</Select.Content>
		</Select.Root>
		{#if search || decision || resourceType || requestedAction}
			<Button variant="ghost" size="sm" onclick={clearFilters}>Clear filters</Button>
		{/if}
	</div>

	{#if audits.length === 0}
		<div class="rounded-lg border border-dashed p-12 text-center">
			<div class="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
				<ClipboardListIcon class="size-6 text-muted-foreground" />
			</div>
			<p class="font-medium">No activity found</p>
			{#if search || decision || resourceType || requestedAction}
				<p class="mt-1 text-sm text-muted-foreground">Try adjusting your filters</p>
			{:else}
				<p class="mt-1 text-sm text-muted-foreground">
					Activity will appear here when permission checks are performed
				</p>
			{/if}
		</div>
	{:else}
		<div class="rounded-lg border">
			<table class="w-full text-sm">
				<thead>
					<tr class="border-b bg-muted/50">
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Time</th>
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">User</th>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground md:table-cell">
							Action
						</th>
						<th class="px-4 py-3 text-left font-medium text-muted-foreground">Decision</th>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">
							Reason
						</th>
						<th class="hidden px-4 py-3 text-left font-medium text-muted-foreground lg:table-cell">
							Eval Time
						</th>
					</tr>
				</thead>
				<tbody>
					{#each audits as audit (audit.id)}
						<tr class="border-b transition-colors last:border-0 hover:bg-muted/50">
							<td class="px-4 py-3">
								<a
									href={resolve(('/settings/audit/' + audit.id) as Parameters<typeof resolve>[0])}
									class="font-mono text-xs transition-colors hover:text-primary"
								>
									{new Date(audit.timestamp).toLocaleString()}
								</a>
								<p class="text-[10px] text-muted-foreground">{formatTimeAgo(audit.timestamp)}</p>
							</td>
							<td class="px-4 py-3">
								<a
									href={resolve(
										('/settings/users/' + audit.user.id) as Parameters<typeof resolve>[0]
									)}
									class="font-medium transition-colors hover:text-primary"
								>
									{audit.user.name}
								</a>
							</td>
							<td class="hidden px-4 py-3 text-muted-foreground md:table-cell">
								{formatAction(audit.requestedAction, audit.resourceType)}
							</td>
							<td class="px-4 py-3">
								<Badge variant={DECISION_VARIANT[audit.decision] ?? 'outline'}>
									{audit.decision === 'ALLOW' ? 'Allow' : 'Deny'}
								</Badge>
							</td>
							<td
								class="hidden max-w-xs px-4 py-3 text-muted-foreground lg:table-cell"
								title={audit.decisionReason}
							>
								{truncate(audit.decisionReason, 60)}
							</td>
							<td class="hidden px-4 py-3 font-mono text-xs text-muted-foreground lg:table-cell">
								{audit.evaluationTimeMs}ms
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		{#if auditsData.pageInfo.hasNextPage}
			<div class="flex justify-center">
				<a
					href={resolve(
						('/settings/audit?after=' +
							auditsData.pageInfo.endCursor +
							(search ? '&search=' + encodeURIComponent(search) : '') +
							(decision ? '&decision=' + decision : '') +
							(resourceType ? '&resourceType=' + resourceType : '') +
							(requestedAction ? '&requestedAction=' + requestedAction : '')) as Parameters<
							typeof resolve
						>[0]
					)}
				>
					<Button variant="outline">Load more</Button>
				</a>
			</div>
		{/if}
	{/if}
</div>
