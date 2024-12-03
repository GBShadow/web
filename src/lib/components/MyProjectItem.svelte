<script lang="ts">
	import { applyAction } from '$app/forms';
	import { deleteProjectSchema } from '$lib/schemas';
	import { getImageUrl } from '$lib/utils';
	import toast from 'svelte-french-toast';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import Modal from './Modal.svelte';

	type ProjectProps = {
		id: string;
		collectionId: string;
		thumbnail: string;
		name: string;
		tagline: string;
		description: string;
	};

	let {
		project,
		form: formData
	}: { project: ProjectProps; form: SuperValidated<Infer<typeof deleteProjectSchema>> } = $props();
	let deleteProjectModal = $state(false);

	const { enhance, delayed, submitting } = superForm(formData, {
		onSubmit: () => {
			deleteProjectModal = true;
		},
		onError: ({ result }) => {
			toast.error(result.error.message);
		},
		onUpdate({ result }) {
			switch (result.type) {
				case 'success':
					toast.success('Project deleted with success.');
					applyAction(result);
					deleteProjectModal = false;
					break;
				case 'failure':
					toast.error('Could not delete project. Try again later.');
					break;
				default:
					break;
			}
		}
	});
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
					<form method="dialog">
						<button class="btn btn-outline" disabled={$submitting}>Cancel</button>
					</form>
					<form action="?/deleteProject" method="POST" use:enhance>
						<input type="hidden" name="id" bind:value={project.id} />
						<button type="submit" class="btn btn-error" disabled={$submitting}>
							{#if $delayed}
								<span class="loading loading-dots"></span>
							{:else}
								<span>Delete</span>
							{/if}
						</button>
					</form>
				</div>
			{/snippet}
		</Modal>
	</div>
</div>
