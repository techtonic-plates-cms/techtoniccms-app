<script lang="ts">
	import EntryEditor from '$lib/components/EntryEditor.svelte';
	import { getCollection } from '$lib/remotes/collections.remote';
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
	const slug = $derived(params.slug);

	const collection = $derived(await getCollection({ slug }));
</script>

{#if collection}
	<EntryEditor {collection} />
{:else}
	<p class="text-muted-foreground">Collection not found.</p>
{/if}
