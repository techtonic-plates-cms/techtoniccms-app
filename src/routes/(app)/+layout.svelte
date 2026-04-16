<script lang="ts">
	import LayoutDashboardIcon from '@lucide/svelte/icons/layout-dashboard';
	import LayersIcon from '@lucide/svelte/icons/layers';
	import ImageIcon from '@lucide/svelte/icons/image';
	import UsersIcon from '@lucide/svelte/icons/users';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import KeyIcon from '@lucide/svelte/icons/key';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { requireAuth, refreshAuth, logout } from '$lib/remotes/auth.remote';
	import ModeToggle from '$lib/components/mode-toggle.svelte';
	import { page } from '$app/state';
	import type { Component } from 'svelte';

	let { children } = $props();

	const authData = await requireAuth();
	const user = authData.user;

	let accessTokenExpiresAt = $state(authData.accessToken?.expiresAt ?? null);

	const REFRESH_BUFFER_MS = 60_000; // refresh 1 minute before known expiry
	const FALLBACK_TOKEN_LIFETIME_MS = 14 * 60_000; // assumed lifetime when expiry is unknown

	$effect(() => {
		const expiresAt = accessTokenExpiresAt;

		// expiresAt is null only when the API omits it; refresh immediately as a fallback.
		const delay = expiresAt ? Math.max(0, expiresAt - Date.now() - REFRESH_BUFFER_MS) : 0;

		const timer = setTimeout(async () => {
			const result = await refreshAuth();
			// Use the real expiry if returned, otherwise assume a full token lifetime so the
			// effect re-runs and schedules the next refresh.
			accessTokenExpiresAt =
				result?.accessToken?.expiresAt ?? Date.now() + FALLBACK_TOKEN_LIFETIME_MS;
		}, delay);

		return () => clearTimeout(timer);
	});

	type NavItem = { title: string; href: string; icon: Component };
	type NavGroup = { label: string; items: NavItem[] };

	const navGroups: NavGroup[] = [
		{
			label: 'Overview',
			items: [{ title: 'Dashboard', href: '/', icon: LayoutDashboardIcon }]
		},
		{
			label: 'Content',
			items: [
				{ title: 'Collections', href: '/collections', icon: LayersIcon },
				{ title: 'Assets', href: '/assets', icon: ImageIcon }
			]
		},
		{
			label: 'Settings',
			items: [
				{ title: 'Users', href: '/settings/users', icon: UsersIcon },
				{ title: 'Roles', href: '/settings/roles', icon: ShieldIcon },
				{ title: 'Policies', href: '/settings/policies', icon: KeyIcon }
			]
		}
	];

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<Sidebar.Provider>
	<Sidebar.Root collapsible="icon">
		<Sidebar.Header>
			<div class="flex items-center gap-2 px-2 py-1">
				<div
					class="bg-sidebar-primary text-sidebar-primary-foreground flex size-8 shrink-0 items-center justify-center rounded-md text-xs font-bold"
				>
					T
				</div>
				<span class="truncate font-semibold group-data-[collapsible=icon]:hidden">
					Techtonic CMS
				</span>
			</div>
		</Sidebar.Header>

		<Sidebar.Content>
			{#each navGroups as group (group.label)}
				<Sidebar.Group>
					<Sidebar.GroupLabel class="group-data-[collapsible=icon]:hidden">
						{group.label}
					</Sidebar.GroupLabel>
					<Sidebar.GroupContent>
						<Sidebar.Menu>
							{#each group.items as item (item.href)}
								<Sidebar.MenuItem>
									<Sidebar.MenuButton isActive={isActive(item.href)}>
										{#snippet child({ props })}
											<a href={item.href} {...props}>
												<item.icon />
												<span>{item.title}</span>
											</a>
										{/snippet}
									</Sidebar.MenuButton>
								</Sidebar.MenuItem>
							{/each}
						</Sidebar.Menu>
					</Sidebar.GroupContent>
				</Sidebar.Group>
			{/each}
		</Sidebar.Content>

		<Sidebar.Footer>
			<div class="flex items-center gap-2 px-2 py-1 group-data-[collapsible=icon]:justify-center">
				<div
					class="bg-muted text-muted-foreground flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold uppercase"
				>
					{user.name.slice(0, 2)}
				</div>
				<div class="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
					<p class="truncate text-sm font-medium">{user.name}</p>
					<p class="text-muted-foreground truncate text-xs capitalize">
						{user.status.toLowerCase()}
					</p>
				</div>
				<div class="flex shrink-0 items-center gap-1 group-data-[collapsible=icon]:hidden">
					<ModeToggle />
					<form {...logout}>
						<button
							type="submit"
							class="hover:bg-accent text-muted-foreground rounded-md p-1.5 transition-colors"
							title="Sign out"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="size-4"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							>
								<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
								<polyline points="16 17 21 12 16 7" />
								<line x1="21" y1="12" x2="9" y2="12" />
							</svg>
							<span class="sr-only">Sign out</span>
						</button>
					</form>
				</div>
			</div>
		</Sidebar.Footer>

		<Sidebar.Rail />
	</Sidebar.Root>

	<Sidebar.Inset>
		<header class="border-border/50 flex h-12 shrink-0 items-center gap-2 border-b px-4">
			<Sidebar.Trigger class="-ml-1" />
		</header>

		<div class="flex-1 overflow-y-auto p-6">
			{@render children()}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
