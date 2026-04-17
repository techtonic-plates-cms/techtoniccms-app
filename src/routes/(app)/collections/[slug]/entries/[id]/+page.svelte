<script lang="ts">
	import EntryEditor from '@/components/entry-editor.svelte';
	import { getCollection } from '$lib/remotes/collections.remote';
	import { getEntry } from '$lib/remotes/entries.remote';
	import type { PageProps } from './$types';

	const { params }: PageProps = $props();
	const slug = $derived(params.slug);
	const id = $derived(params.id);

	const collection = $derived(await getCollection({ slug }));
	const entry = $derived(await getEntry({ slug, id }));
</script>

{#if collection && entry}
	<EntryEditor {collection} {entry} />
{:else if collection && !entry}
	<p class="text-muted-foreground">Entry not found.</p>
{:else}
	<p class="text-muted-foreground">Collection not found.</p>
{/if}
