<script lang="ts">
	import HelpCircleIcon from '@lucide/svelte/icons/help-circle';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	let {
		text,
		side = 'top'
	}: {
		text: string;
		side?: 'top' | 'bottom' | 'left' | 'right';
	} = $props();
</script>

<Tooltip.Provider delayDuration={100}>
	<Tooltip.Root>
		<Tooltip.Trigger
			type="button"
			class="inline-flex size-4 items-center justify-center rounded-full text-muted-foreground/60 transition-colors hover:text-muted-foreground focus-visible:outline-none"
		>
			<HelpCircleIcon class="size-3.5" />
		</Tooltip.Trigger>
		<Tooltip.Content {side} class="max-w-[280px] leading-relaxed text-balance">
			{text}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
