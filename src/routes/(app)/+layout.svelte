<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { requireAuth, refreshAuth } from '$lib/remotes/auth.remote';
	import { getCollections } from '$lib/remotes/collections.remote';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import ModeToggle from '$lib/components/mode-toggle.svelte';
	import RockTexture from '$lib/components/rock-texture.svelte';

	let { children } = $props();

	const authData = await requireAuth();
	const user = authData.user;
	const collections = await getCollections();

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
</script>

<Sidebar.Provider
	style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12);"
>
	<AppSidebar {user} {collections} />

	<Sidebar.Inset>
		<header
			class="relative flex h-(--header-height) shrink-0 items-center gap-2 overflow-hidden border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
		>
			<div class="relative flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<Sidebar.Trigger class="-ms-1" />
				<Separator orientation="vertical" class="mx-2 data-[orientation=vertical]:h-4" />
				<div class="ms-auto flex items-center gap-2">
					<ModeToggle />
				</div>
			</div>
		</header>

		<div class="flex flex-1 flex-col">
			<div class="@container/main flex flex-1 flex-col gap-2">
				<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
					<div class="px-4 lg:px-6">
						{@render children()}
					</div>
				</div>
			</div>
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
