<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	let {
		value = $bindable(),
		placeholder,
		id,
		label,
		errors,
		...props
	}: { label: string; errors?: string[] } & HTMLTextareaAttributes = $props();
</script>

<div class="form-control w-full max-w-lg">
	<label for={id} class="label pb-1 font-medium">
		<span class="label-text">{label}</span>
	</label>
	<textarea
		{id}
		name={id}
		{placeholder}
		bind:value
		class="textarea textarea-bordered h-24 resize-none"
		{...props}
	></textarea>
	{#if errors}
		{#each errors as error}
			<label for={id} class="label py-0 pt-1">
				<span class="label-text-alt text-error">
					{error}
				</span>
			</label>
		{/each}
	{/if}
</div>
