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
			<h1 class="text-2xl font-bold">Permission Check</h1>
			<p class="text-sm text-muted-foreground">
				Test whether a specific user can perform an action
			</p>
		</div>
	</div>

	<div class="space-y-4 rounded-lg border p-8 text-center">
		<p class="text-muted-foreground">
			The permission simulator is coming soon. This page will let you pick a user and an action,
			then show you exactly which policy would allow or deny it — in plain English.
		</p>
		<p class="text-sm text-muted-foreground">
			For now, you can review effective permissions by checking the user's roles and policies
			directly.
		</p>
		<a href="/settings/users">
			<Button variant="outline">Go to Users</Button>
		</a>
	</div>
</div>
