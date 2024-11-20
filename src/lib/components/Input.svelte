<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		value,
		placeholder,
		id,
		type = 'text',
		label,
		...props
	}: { label: string } & HTMLInputAttributes = $props();
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
		class="input input-bordered w-full max-w-lg"
		{...props}
	/>
</div>
