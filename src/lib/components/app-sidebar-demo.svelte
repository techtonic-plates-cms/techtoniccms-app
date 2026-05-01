<script lang="ts" module>
	import AudioWaveformIcon from '@lucide/svelte/icons/audio-waveform';
	import BookOpenIcon from '@lucide/svelte/icons/book-open';
	import BotIcon from '@lucide/svelte/icons/bot';
	import ChartPieIcon from '@lucide/svelte/icons/chart-pie';
	import CommandIcon from '@lucide/svelte/icons/command';
	import FrameIcon from '@lucide/svelte/icons/frame';
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import MapIcon from '@lucide/svelte/icons/map';
	import Settings2Icon from '@lucide/svelte/icons/settings-2';
	import SquareTerminalIcon from '@lucide/svelte/icons/square-terminal';

	import type { ResolvedPathname } from '$app/types';

	// This is sample data.
	const data = {
		user: {
			name: 'shadcn',
			email: 'm@example.com',
			avatar: '/avatars/shadcn.jpg'
		},
		teams: [
			{
				name: 'Acme Inc',
				logo: GalleryVerticalEndIcon,
				plan: 'Enterprise'
			},
			{
				name: 'Acme Corp.',
				logo: AudioWaveformIcon,
				plan: 'Startup'
			},
			{
				name: 'Evil Corp.',
				logo: CommandIcon,
				plan: 'Free'
			}
		],
		navMain: [
			{
				title: 'Playground',
				url: '#' as ResolvedPathname,
				icon: SquareTerminalIcon,
				isActive: true,
				items: [
					{
						title: 'History',
						url: '#' as ResolvedPathname
					},
					{
						title: 'Starred',
						url: '#' as ResolvedPathname
					},
					{
						title: 'Settings',
						url: '#' as ResolvedPathname
					}
				]
			},
			{
				title: 'Models',
				url: '#' as ResolvedPathname,
				icon: BotIcon,
				items: [
					{
						title: 'Genesis',
						url: '#' as ResolvedPathname
					},
					{
						title: 'Explorer',
						url: '#' as ResolvedPathname
					},
					{
						title: 'Quantum',
						url: '#' as ResolvedPathname
					}
				]
			},
			{
				title: 'Documentation',
				url: '#' as ResolvedPathname,
				icon: BookOpenIcon,
				items: [
					{
						title: 'Introduction',
						url: '#' as ResolvedPathname
					},
					{
						title: 'Get Started',
						url: '#' as ResolvedPathname
					},
					{
						title: 'Tutorials',
						url: '#' as ResolvedPathname
					},
					{
						title: 'Changelog',
						url: '#' as ResolvedPathname
					}
				]
			},
			{
				title: 'Settings',
				url: '#' as ResolvedPathname,
				icon: Settings2Icon,
				items: [
					{
						title: 'General',
						url: '#' as ResolvedPathname
					},
					{
						title: 'Team',
						url: '#' as ResolvedPathname
					},
					{
						title: 'Billing',
						url: '#' as ResolvedPathname
					},
					{
						title: 'Limits',
						url: '#' as ResolvedPathname
					}
				]
			}
		],
		projects: [
			{
				name: 'Design Engineering',
				url: '#' as ResolvedPathname,
				icon: FrameIcon
			},
			{
				name: 'Sales & Marketing',
				url: '#' as ResolvedPathname,
				icon: ChartPieIcon
			},
			{
				name: 'Travel',
				url: '#' as ResolvedPathname,
				icon: MapIcon
			}
		]
	};
</script>

<script lang="ts">
	import NavMain from './nav-main.svelte';
	import NavProjects from './nav-projects.svelte';
	import NavUser from './nav-user.svelte';
	import TeamSwitcher from './team-switcher.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		collapsible = 'icon',
		...restProps
	}: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref {collapsible} {...restProps}>
	<Sidebar.Header>
		<TeamSwitcher teams={data.teams} />
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavProjects projects={data.projects} />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser user={data.user} />
	</Sidebar.Footer>
	<Sidebar.Rail />
</Sidebar.Root>
