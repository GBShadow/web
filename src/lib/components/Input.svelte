<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		value,
		placeholder,
		id,
		type = 'text',
		label,
		errors,
		...props
	}: { label: string; errors?: string[] } & HTMLInputAttributes = $props();
</script>

<div class="form-control mb-2 w-full max-w-lg">
	<label for={id} class="label pb-1 font-medium">
		<span class="label-text">{label}</span>
	</label>

	<input
		{id}
		{placeholder}
		{type}
		name={id}
		bind:value
		class={type === 'file'
			? 'file-input file-input-bordered w-full max-w-lg'
			: 'input input-bordered w-full max-w-lg'}
		{...props}
	/>

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
