<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';
	import type { PageData } from './$types';
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
			<Input id="name" label="Project Name" />
			<Input id="tagline" label="Project Tagline" />
			<Input id="url" label="Project Url" />

			<div class="form-control w-full max-w-lg">
				<label for="description" class="label pb-1 font-medium">
					<span class="label-text">Project Description</span>
				</label>
				<textarea
					name="description"
					id="description"
					class="textarea textarea-bordered h-24 resize-none"
				></textarea>
			</div>
			<div class="form-control w-full max-w-lg">
				<label for="thumbnail" class="label pb-1 font-medium">
					<span>Thumbnail</span>
				</label>
				<input
					type="file"
					name="thumbnail"
					id="thumbnail"
					class="file-input file-input-bordered w-full max-w-lg"
				/>
			</div>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Create Project</button>
			</div>
		</form>
	</div>
</div>
