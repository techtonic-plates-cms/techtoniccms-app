<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import ModeToggle from '$lib/components/mode-toggle.svelte';

	const errors: Record<number, { title: string; description: string; emoji: string }> = {
		404: {
			title: "We lost this page",
			description: "The page you're looking for doesn't exist or has been moved. Double-check the URL or head back home.",
			emoji: "🔍"
		},
		403: {
			title: "Access denied",
			description: "You don't have permission to view this page. If you think this is a mistake, contact your administrator.",
			emoji: "🔒"
		},
		500: {
			title: "Something broke on our end",
			description: "An unexpected error occurred on the server. Our team has been notified. Please try again in a moment.",
			emoji: "⚙️"
		},
		401: {
			title: "Authentication required",
			description: "You need to be signed in to access this page.",
			emoji: "🔑"
		}
	};

	const current = errors[page.status] ?? {
		title: "Something went wrong",
		description: "An unexpected error occurred. Please try again or return home.",
		emoji: "💥"
	};
</script>

<div class="bg-background text-foreground flex min-h-screen flex-col">
	<header class="flex items-center justify-between p-4">
		<div class="flex items-center gap-2">
			<div class="bg-primary text-primary-foreground flex size-7 items-center justify-center rounded-md text-xs font-bold">
				T
			</div>
			<span class="text-sm font-semibold">Techtonic CMS</span>
		</div>
		<ModeToggle />
	</header>

	<main class="flex flex-1 flex-col items-center justify-center px-4 py-16">
		<div class="w-full max-w-lg space-y-8">
			<!-- Hero -->
			<div class="space-y-4 text-center">
				<div class="text-6xl">{current.emoji}</div>
				<Badge variant="secondary" class="text-xs font-mono">{page.status}</Badge>
				<h1 class="text-3xl font-bold tracking-tight">{current.title}</h1>
				<p class="text-muted-foreground leading-relaxed">
					{current.description}
				</p>
			</div>

			<!-- Detail card — only shown when there's an informative message -->
			{#if page.error?.message && page.error.message !== 'Not found' && page.error.message !== current.title}
				<Card.Root class="border-destructive/30 bg-destructive/5">
					<Card.Header class="pb-2">
						<Card.Title class="text-destructive text-sm font-medium">Error details</Card.Title>
					</Card.Header>
					<Card.Content>
						<p class="text-muted-foreground font-mono text-xs break-words">{page.error.message}</p>
					</Card.Content>
				</Card.Root>
			{/if}

			<!-- Actions -->
			<div class="flex justify-center gap-3">
				<Button href="/" class="gap-2">
					Go home
				</Button>
				<Button variant="outline" onclick={() => history.back()}>
					Go back
				</Button>
			</div>
		</div>
	</main>
</div>
