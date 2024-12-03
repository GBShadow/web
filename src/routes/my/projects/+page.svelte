<script lang="ts">
	import { MyProjectItem } from '$lib/components/';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<h2 class="text-3xl font-bold">My Projects</h2>
<div class="mt-4 flex w-full flex-col items-center">
	{#await data.projects}
		<p>Loading</p>
	{:then projects}
		{#if projects}
			{#if projects?.length === 0}
				<p class="text-center text-3xl">☹️</p>
				<p class="text-center text-3xl">Looks like you don't have any projects.</p>
				<a href="/projects/new" class="btn btn-primary mt-4 max-w-md">Add One</a>
			{/if}

			{#each projects as project}
				<MyProjectItem {project} form={data.form} />
				<div class="divider mb-2 mt-0"></div>
			{/each}
		{/if}
	{/await}
</div>
