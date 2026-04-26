<script lang="ts">
	import LayoutDashboardIcon from '@lucide/svelte/icons/layout-dashboard';
	import ImageIcon from '@lucide/svelte/icons/image';
	import UsersIcon from '@lucide/svelte/icons/users';
	import ShieldIcon from '@lucide/svelte/icons/shield';
	import KeyIcon from '@lucide/svelte/icons/key';
	import KeyRoundIcon from '@lucide/svelte/icons/key-round';
	import ClipboardListIcon from '@lucide/svelte/icons/clipboard-list';
	import FlaskConicalIcon from '@lucide/svelte/icons/flask-conical';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppNavUser from '$lib/components/app-nav-user.svelte';
	import NavCollections from '$lib/components/nav-collections.svelte';
	import { page } from '$app/state';

	let {
		user,
		collections
	}: {
		user: { id: string; name: string; status: string };
		collections: Array<{ id: string; name: string; slug: string }>;
	} = $props();

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

<Sidebar.Root variant="inset" collapsible="offcanvas">
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<div
								class="flex size-8 shrink-0 items-center justify-center rounded-md bg-sidebar-primary text-xs font-bold text-sidebar-primary-foreground"
							>
								T
							</div>
							<span class="text-base font-semibold">Techtonic CMS</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>

	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel class="group-data-[collapsible=icon]:hidden">Overview</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton
							isActive={isActive('/')}
							tooltipContent="Dashboard"
							class={isActive('/')
								? 'border-l-[3px] border-l-[var(--accent-copper)] !bg-[var(--accent-copper)]/[0.06] !text-[var(--accent-copper)]'
								: ''}
						>
							{#snippet child({ props })}
								<a href="/" {...props}>
									<LayoutDashboardIcon />
									<span>Dashboard</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>

		<Sidebar.Group>
			<Sidebar.GroupLabel class="group-data-[collapsible=icon]:hidden">Content</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<NavCollections {collections} />
					<Sidebar.MenuItem>
						<Sidebar.MenuButton
							isActive={isActive('/assets')}
							tooltipContent="Assets"
							class={isActive('/assets')
								? 'border-l-[3px] border-l-[var(--accent-copper)] !bg-[var(--accent-copper)]/[0.06] !text-[var(--accent-copper)]'
								: ''}
						>
							{#snippet child({ props })}
								<a href="/assets" {...props}>
									<ImageIcon />
									<span>Assets</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>

		<Sidebar.Group>
			<Sidebar.GroupLabel class="group-data-[collapsible=icon]:hidden">Settings</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton
							isActive={isActive('/settings/users')}
							tooltipContent="Users"
							class={isActive('/settings/users')
								? 'border-l-[3px] border-l-[var(--accent-copper)] !bg-[var(--accent-copper)]/[0.06] !text-[var(--accent-copper)]'
								: ''}
						>
							{#snippet child({ props })}
								<a href="/settings/users" {...props}>
									<UsersIcon />
									<span>Users</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton
							isActive={isActive('/settings/roles')}
							tooltipContent="Roles"
							class={isActive('/settings/roles')
								? 'border-l-[3px] border-l-[var(--accent-copper)] !bg-[var(--accent-copper)]/[0.06] !text-[var(--accent-copper)]'
								: ''}
						>
							{#snippet child({ props })}
								<a href="/settings/roles" {...props}>
									<ShieldIcon />
									<span>Roles</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton
							isActive={isActive('/settings/policies')}
							tooltipContent="Policies"
							class={isActive('/settings/policies')
								? 'border-l-[3px] border-l-[var(--accent-copper)] !bg-[var(--accent-copper)]/[0.06] !text-[var(--accent-copper)]'
								: ''}
						>
							{#snippet child({ props })}
								<a href="/settings/policies" {...props}>
									<KeyIcon />
									<span>Policies</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton
							isActive={isActive('/settings/api-keys')}
							tooltipContent="API Keys"
							class={isActive('/settings/api-keys')
								? 'border-l-[3px] border-l-[var(--accent-copper)] !bg-[var(--accent-copper)]/[0.06] !text-[var(--accent-copper)]'
								: ''}
						>
							{#snippet child({ props })}
								<a href="/settings/api-keys" {...props}>
									<KeyRoundIcon />
									<span>API Keys</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton
							isActive={isActive('/settings/audit')}
							tooltipContent="Activity Log"
							class={isActive('/settings/audit')
								? 'border-l-[3px] border-l-[var(--accent-copper)] !bg-[var(--accent-copper)]/[0.06] !text-[var(--accent-copper)]'
								: ''}
						>
							{#snippet child({ props })}
								<a href="/settings/audit" {...props}>
									<ClipboardListIcon />
									<span>Activity Log</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
					<Sidebar.MenuItem>
						<Sidebar.MenuButton
							isActive={isActive('/settings/permissions')}
							tooltipContent="Permission Check"
							class={isActive('/settings/permissions')
								? 'border-l-[3px] border-l-[var(--accent-copper)] !bg-[var(--accent-copper)]/[0.06] !text-[var(--accent-copper)]'
								: ''}
						>
							{#snippet child({ props })}
								<a href="/settings/permissions/check" {...props}>
									<FlaskConicalIcon />
									<span>Permission Check</span>
								</a>
							{/snippet}
						</Sidebar.MenuButton>
					</Sidebar.MenuItem>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>

	<Sidebar.Footer>
		<AppNavUser {user} />
	</Sidebar.Footer>

	<Sidebar.Rail />
</Sidebar.Root>
