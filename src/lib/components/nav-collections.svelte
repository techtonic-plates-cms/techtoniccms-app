<script lang="ts">
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import ChevronRightIcon from '@lucide/svelte/icons/chevron-right';
	import LayersIcon from '@lucide/svelte/icons/layers';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';

	let {
		collections
	}: {
		collections: Array<{ id: string; name: string; slug: string }>;
	} = $props();

	function isActive(href: string): boolean {
		if (href === '/') return page.url.pathname === '/';
		return page.url.pathname.startsWith(href);
	}
</script>

{#if collections.length === 0}
	<Sidebar.MenuItem>
		<Sidebar.MenuButton
			isActive={isActive('/collections')}
			tooltipContent="Collections"
			class={isActive('/collections')
				? 'border-l-[3px] border-l-[var(--accent-copper)] !bg-[var(--accent-copper)]/[0.06] !text-[var(--accent-copper)]'
				: ''}
		>
			{#snippet child({ props })}
				<a href={resolve('/collections')} {...props}>
					<LayersIcon />
					<span>Collections</span>
				</a>
			{/snippet}
		</Sidebar.MenuButton>
	</Sidebar.MenuItem>
{:else}
	<Collapsible.Root open={isActive('/collections')} class="group/collapsible">
		{#snippet child({ props })}
			<Sidebar.MenuItem {...props}>
				<Sidebar.MenuButton
					isActive={isActive('/collections')}
					tooltipContent="Collections"
					class={isActive('/collections')
						? 'border-l-[3px] border-l-[var(--accent-copper)] !bg-[var(--accent-copper)]/[0.06] !text-[var(--accent-copper)]'
						: ''}
				>
					{#snippet child({ props })}
						<a href={resolve('/collections')} {...props}>
							<LayersIcon />
							<span>Collections</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
				<Collapsible.Trigger>
					{#snippet child({ props })}
						<Sidebar.MenuAction
							{...props}
							class="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
						>
							<ChevronRightIcon />
							<span class="sr-only">Toggle collections</span>
						</Sidebar.MenuAction>
					{/snippet}
				</Collapsible.Trigger>
				<Collapsible.Content>
					<Sidebar.MenuSub>
						{#each collections as collection (collection.id)}
							<Sidebar.MenuSubItem>
								<Sidebar.MenuSubButton
									isActive={isActive(`/collections/${collection.slug}`)}
									class={isActive(`/collections/${collection.slug}`)
										? '!text-[var(--accent-copper)]'
										: ''}
								>
									{#snippet child({ props })}
										<a
											href={resolve(
												('/collections/' + collection.slug) as Parameters<typeof resolve>[0]
											)}
											{...props}
										>
											<span>{collection.name}</span>
										</a>
									{/snippet}
								</Sidebar.MenuSubButton>
							</Sidebar.MenuSubItem>
						{/each}
					</Sidebar.MenuSub>
				</Collapsible.Content>
			</Sidebar.MenuItem>
		{/snippet}
	</Collapsible.Root>
{/if}
