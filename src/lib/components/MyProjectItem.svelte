<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { getImageUrl } from '$lib/utils';
	import type { SubmitFunction } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';
	import Modal from './Modal.svelte';

	type ProjectProps = {
		id: string;
		collectionId: string;
		thumbnail: string;
		name: string;
		tagline: string;
		description: string;
	};

	let { project }: { project: ProjectProps } = $props();
	let deleteProjectModal = $state(false);
	let loading = $state(false);

	const submitDeleteProject: SubmitFunction = () => {
		return async ({ result }) => {
			loading = true;
			deleteProjectModal = true;
			switch (result.type) {
				case 'success':
					await invalidateAll();
					toast.success('Project deleted with success.');

					break;
				case 'error':
					toast.error('Could not delete project. Try again later.');
					break;
				default:
					await applyAction(result);
					break;
			}

			loading = false;
			deleteProjectModal = false;
		};
	};
</script>

<div class="flex h-28 w-full items-center justify-between">
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

	<div class="ml-4 flex h-full w-full flex-col justify-center">
		<a href="/projects/{project.id}" class="text-lg font-semibold">{project.name}</a>
		<p>{project.tagline}</p>
	</div>
	<div class="flex w-full items-center justify-end">
		<a href="/projects/{project.id}/edit" class="btn btn-outline">Edit project</a>
		<Modal label={project.id} checked={deleteProjectModal}>
			{#snippet trigger()}
				<span class="btn btn-error ml-2">Delete</span>
			{/snippet}
			{#snippet heading()}
				<div>
					<h3 class="text-2xl">Delete {project.name}</h3>
					<p class="text-base font-normal">
						Are you sure want to delete this project? Once deleted, the project cannot be restored.
					</p>
				</div>
			{/snippet}
			{#snippet actions()}
				<div class="flex w-full items-center justify-center space-x-2">
					<label for={project.id} class="btn btn-outline">Cancel</label>
					<form action="?/deleteProject" method="POST" use:enhance={submitDeleteProject}>
						<input type="hidden" name="id" value={project.id} />
						<button type="submit" class="btn btn-error">Delete</button>
					</form>
				</div>
			{/snippet}
		</Modal>
	</div>
</div>
