<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';

	const errors: Record<number, { title: string; description: string; emoji: string }> = {
		404: {
			title: 'Page not found',
			description:
				"This section doesn't exist or may have been removed. Head back to the dashboard to continue.",
			emoji: '🔍'
		},
		403: {
			title: 'Access denied',
			description:
				"You don't have the permissions needed to view this page. Contact your administrator if you believe this is an error.",
			emoji: '🔒'
		},
		500: {
			title: 'Server error',
			description:
				'Something went wrong while loading this page. Try refreshing — if the problem persists, contact support.',
			emoji: '⚙️'
		},
		401: {
			title: 'Session expired',
			description: 'Your session has expired. Please sign in again to continue.',
			emoji: '🔑'
		}
	};

	const current = errors[page.status] ?? {
		title: 'Something went wrong',
		description:
			'An unexpected error occurred. Try refreshing the page or return to the dashboard.',
		emoji: '💥'
	};
</script>

<div class="flex h-full flex-col items-center justify-center px-4 py-24">
	<div class="w-full max-w-md space-y-8">
		<!-- Hero -->
		<div class="space-y-4 text-center">
			<div class="text-5xl">{current.emoji}</div>
			<div class="space-y-1">
				<Badge variant="secondary" class="font-mono text-xs">{page.status}</Badge>
				<h1 class="text-2xl font-bold tracking-tight">{current.title}</h1>
			</div>
			<p class="text-sm leading-relaxed text-muted-foreground">
				{current.description}
			</p>
		</div>

		<!-- Detail card -->
		{#if page.error?.message && page.error.message !== 'Not found' && page.error.message !== current.title}
			<Card.Root class="border-destructive/30 bg-destructive/5">
				<Card.Header class="pb-2">
					<Card.Title class="text-sm font-medium text-destructive">Error details</Card.Title>
				</Card.Header>
				<Card.Content>
					<p class="font-mono text-xs break-words text-muted-foreground">{page.error.message}</p>
				</Card.Content>
			</Card.Root>
		{/if}

		<!-- Actions -->
		<div class="flex justify-center gap-3">
			<Button href="/" class="gap-2">Back to dashboard</Button>
			<Button variant="outline" onclick={() => history.back()}>Go back</Button>
		</div>
	</div>
</div>
