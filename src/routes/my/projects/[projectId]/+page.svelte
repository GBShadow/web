<script lang="ts">
	import { getImageUrl } from '$lib/utils';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#await data.project}
	<p>Loading</p>
{:then project}
	<div class="mt-4 flex w-full flex-col">
		<div class="avatar">
			<div class="w-20 rounded">
				<img
					src={project?.thumbnail
						? getImageUrl(project.collectionId, project.id, project.thumbnail, '80x80')
						: `https://placehold.co/80x80/4506CB/FFFFFF/?text=${project.name}`}
					alt="preview thumbnail"
				/>
			</div>
		</div>
		<h1 class="mt-4 text-2xl font-bold">{project.name}</h1>
		<p class="mt-2 text-2xl font-light">{project.tagline}</p>
		<p>{project.description}</p>
	</div>
{/await}
