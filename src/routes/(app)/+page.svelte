<script lang="ts">
	import LayersIcon from '@lucide/svelte/icons/layers';
	import ImageIcon from '@lucide/svelte/icons/image';
	import UsersIcon from '@lucide/svelte/icons/users';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import * as Card from '$lib/components/ui/card/index.js';
	import { requireAuth } from '$lib/remotes/auth.remote';
	import { getCollections } from '$lib/remotes/collections.remote';
	import { getUsers } from '$lib/remotes/users.remote';

	const { user } = await requireAuth();
	const collections = await getCollections();
	const usersPage = await getUsers({});

	const totalEntries = collections.reduce((sum, c) => sum + c.entryCount, 0);
</script>

<div class="space-y-6">
	<div>
		<h1 class="text-2xl font-bold">Welcome, {user.name}</h1>
		<p class="text-muted-foreground text-sm">Techtonic CMS Dashboard</p>
	</div>

	<div class="grid gap-4 sm:grid-cols-3">
		<Card.Root>
			<Card.Content class="flex items-center gap-4 p-6">
				<div class="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
					<LayersIcon class="size-5" />
				</div>
				<div>
					<p class="text-2xl font-bold">{collections.length}</p>
					<p class="text-muted-foreground text-sm">Collections</p>
					<p class="text-muted-foreground text-xs">{totalEntries} total entries</p>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Content class="flex items-center gap-4 p-6">
				<div class="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
					<UsersIcon class="size-5" />
				</div>
				<div>
					<p class="text-2xl font-bold">{usersPage.nodes.length}</p>
					<p class="text-muted-foreground text-sm">Users</p>
					<p class="text-muted-foreground text-xs">
						{usersPage.nodes.filter((u) => u.status === 'ACTIVE').length} active
					</p>
				</div>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Content class="flex items-center gap-4 p-6">
				<div class="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
					<ImageIcon class="size-5" />
				</div>
				<div>
					<p class="text-2xl font-bold">—</p>
					<p class="text-muted-foreground text-sm">Assets</p>
					<a href="/assets" class="text-primary text-xs hover:underline">View library</a>
				</div>
			</Card.Content>
		</Card.Root>
	</div>

	{#if collections.length > 0}
		<div>
			<div class="mb-3 flex items-center justify-between">
				<h2 class="font-semibold">Collections</h2>
				<a href="/collections" class="text-primary flex items-center gap-1 text-sm hover:underline">
					View all <ArrowRightIcon class="size-3" />
				</a>
			</div>
			<div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
				{#each collections.slice(0, 6) as collection (collection.id)}
					<a
						href="/collections/{collection.slug}"
						class="hover:bg-muted/50 flex items-center gap-3 rounded-lg border p-4 transition-colors"
					>
						{#if collection.icon}
							<span class="text-xl">{collection.icon}</span>
						{:else}
							<div
								class="flex size-8 shrink-0 items-center justify-center rounded-md text-xs font-bold text-white"
								style={collection.color
									? `background-color: ${collection.color}`
									: 'background-color: hsl(var(--primary))'}
							>
								{collection.name.charAt(0).toUpperCase()}
							</div>
						{/if}
						<div class="min-w-0">
							<p class="truncate font-medium">{collection.name}</p>
							<p class="text-muted-foreground text-xs">
								{collection.entryCount} {collection.entryCount === 1 ? 'entry' : 'entries'}
							</p>
						</div>
					</a>
				{/each}
			</div>
		</div>
	{:else}
		<div class="rounded-lg border border-dashed p-8 text-center">
			<LayersIcon class="text-muted-foreground mx-auto mb-3 size-10" />
			<p class="font-medium">No collections yet</p>
			<p class="text-muted-foreground mt-1 text-sm">
				<a href="/collections" class="text-primary hover:underline">Create your first collection</a>
				to start managing content.
			</p>
		</div>
	{/if}
</div>
