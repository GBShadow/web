<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Input, TextArea } from '$lib/components';
	import { getImageUrl } from '$lib/utils';
	import { Icon, Trash } from 'svelte-hero-icons';
	import type { PageData } from './$types';

	let { data, form }: { data: PageData; form: FormData } = $props();
	let loading = false;

	const submitUpdateProject = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await update();
			}

			loading = false;
		};
	};
</script>

{#if data.project}
	<div class="flex h-full w-full flex-col p-2">
		<div class="w-full">
			<form
				action="?/updateProject"
				method="POST"
				class="flex w-full flex-col items-center space-y-2"
				enctype="multipart/form-data"
				use:enhance={submitUpdateProject}
			>
				<h3 class="text-3xl font-bold">Edit {data.project.name}</h3>
				<Input
					id="name"
					label="Project Name"
					value={data.project.name ?? ''}
					errors={form?.errors?.name}
				/>
				<Input
					id="tagline"
					label="Project Tagline"
					value={data.project.tagline ?? ''}
					errors={form?.errors?.tagline}
				/>
				<Input
					id="url"
					label="Project Url"
					value={data.project.url ?? ''}
					errors={form?.errors?.url}
				/>

				<div class="form-control w-full max-w-lg">
					<label for="description" class="label pb-1 font-medium">
						<span class="label-text">Project Description</span>
					</label>
					<TextArea
						id="description"
						label="Project description"
						value={form?.data?.description ?? data.project.description}
						errors={form?.errors?.description}
					/>
				</div>
				<div class="form-control w-full max-w-lg">
					<label for="thumbnail" class="label pb-1 font-medium">
						<span class="label-text">Thumbnail</span>
					</label>
					{#if data.project.thumbnail}
						<label for="thumbnail" class="avatar w-20 hover:cursor-pointer">
							<label for="thumbnail" class="absolute -right-1.5 -top-1.5 hover:cursor-pointer">
								<button formaction="?/deleteThumbnail" class="btn btn-circle btn-error btn-sm">
									<Icon src={Trash} class="size-5 text-white" />
								</button>
							</label>
						</label>
						<div class="w-20 rounded">
							<img
								src={data.project?.thumbnail
									? getImageUrl(
											data.project.collectionId,
											data.project.id,
											data.project.thumbnail,
											'80x80'
										)
									: `https://placehold.co/80x80/4506CB/FFFFFF/?text=${data.project.name}`}
								alt="preview thumbnail"
							/>
						</div>
					{/if}
					<input
						type="file"
						name="thumbnail"
						id="thumbnail"
						class="file-input file-input-bordered mt-2 w-full max-w-lg"
					/>
					{#if form?.errors?.thumbnail}
						{#each form?.errors?.thumbnail as error}
							<label for="thumbnail" class="label py-0 pt-1">
								<span class="label-text-alt text-error">
									{error}
								</span>
							</label>
						{/each}
					{/if}
				</div>
				<div class="w-full max-w-lg pt-3">
					<button type="submit" class="btn btn-primary w-full max-w-lg"> Save Changes </button>
				</div>
			</form>
		</div>
	</div>
{/if}
