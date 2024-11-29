<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input, TextArea } from '$lib/components';

	let { form }: { form: FormData } = $props();
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
			<Input id="name" label="Project Name" errors={form?.errors?.name} />
			<Input id="tagline" label="Project Tagline" errors={form?.errors?.tagline} />
			<Input id="url" label="Project Url" errors={form?.errors?.url} />

			<TextArea
				id="description"
				label="Project description"
				value={form?.data?.description}
				errors={form?.errors?.description}
			/>
			<Input id="thumbnail" label="Thumbnail" type="file" errors={form?.errors?.thumbnail} />
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Create Project</button>
			</div>
		</form>
	</div>
</div>
