<script lang="ts">
	import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
	import { Button } from '$lib/components/ui/button/index.js';
	import { requireAuth } from '$lib/remotes/auth.remote';

	await requireAuth();
</script>

<div class="space-y-6">
	<div class="flex items-center gap-3">
		<a href="/settings/users" class="text-muted-foreground transition-colors hover:text-foreground">
			<ArrowLeftIcon class="size-4" />
		</a>
		<div>
			<h1 class="text-2xl font-bold">Activity Log</h1>
			<p class="text-sm text-muted-foreground">
				See who tried to do what and why they were allowed or denied
			</p>
		</div>
	</div>

	<div class="space-y-4 rounded-lg border p-8 text-center">
		<p class="text-muted-foreground">
			Activity logging is coming soon. This page will show a plain-English timeline of every
			permission check, including who made the request, what they tried to do, and exactly why it
			was allowed or denied.
		</p>
		<p class="text-sm text-muted-foreground">
			For now, you can debug permission issues by checking the policy assignments and using the
			permission simulator.
		</p>
		<a href="/settings/policies">
			<Button variant="outline">Go to Policies</Button>
		</a>
	</div>
</div>
