<script lang="ts">
	import { Input, TextArea } from '$lib/components';
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';

	const { data }: { data: PageData } = $props();

	const { form, enhance, errors } = superForm(data.form);
</script>

<div class="flex h-full w-full flex-col p-2">
	<div class="w-full">
		<form
			action="?/create"
			method="POST"
			class="flex w-full flex-col items-center space-y-2"
			enctype="multipart/form-data"
			use:enhance
		>
			<h3 class="text-3xl font-bold">Tell us more about this project</h3>
			<p class="mt-2 text-lg">We'll need the name, tagline link and description</p>
			<Input id="name" label="Project Name" bind:value={$form.name} errors={$errors?.name} />
			<Input
				id="tagline"
				label="Project Tagline"
				bind:value={$form.tagline}
				errors={$errors?.tagline}
			/>
			<Input id="url" label="Project Url" bind:value={$form.url} errors={$errors?.url} />

			<TextArea
				id="description"
				label="Project description"
				bind:value={$form.description}
				errors={$errors?.description}
			/>
			<Input id="thumbnail" label="Thumbnail" type="file" errors={$errors?.thumbnail} />
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Create Project</button>
			</div>
		</form>
	</div>
</div>
