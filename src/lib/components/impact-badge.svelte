<script lang="ts">
	import UsersIcon from '@lucide/svelte/icons/users';
	import ShieldIcon from '@lucide/svelte/icons/shield';

	let {
		roleCount = 0,
		userCount = 0
	}: {
		roleCount?: number;
		userCount?: number;
	} = $props();

	const total = $derived(roleCount + userCount);
</script>

{#if total > 0}
	<span class="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
		{#if roleCount > 0}
			<span class="inline-flex items-center gap-0.5">
				<ShieldIcon class="size-3" />
				{roleCount}
			</span>
		{/if}
		{#if roleCount > 0 && userCount > 0}
			<span class="text-border">·</span>
		{/if}
		{#if userCount > 0}
			<span class="inline-flex items-center gap-0.5">
				<UsersIcon class="size-3" />
				{userCount}
			</span>
		{/if}
	</span>
{:else}
	<span class="text-xs italic text-muted-foreground">Unassigned</span>
{/if}
