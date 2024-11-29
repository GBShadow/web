<script lang="ts">
	import { ProjectCard } from '$lib/components';
	import type { PageData } from './$types';
	let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col gap-3">
	<h1 class="text-xl font-bold">Recent Projects</h1>
	<div class="grid grid-cols-3 gap-2">
		{#await data.projects}
			<p>Loading...</p>
		{:then projects}
			{#each projects as project}
				<ProjectCard {project} />
			{/each}
		{/await}
	</div>
</div>
