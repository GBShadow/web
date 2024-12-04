<script lang="ts">
	import { Eye, EyeSlash, Icon } from 'svelte-hero-icons';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		placeholder,
		id,
		type = 'text',
		label,
		errors,
		value = $bindable(),
		password = false,
		...props
	}: { label: string; errors?: string[]; password?: boolean } & HTMLInputAttributes = $props();
	let toggleType: 'password' | 'text' = $state('password');
</script>

<div class="form-control mb-2 w-full max-w-lg">
	<label for={id} class="label pb-1 font-medium">
		<span class="label-text">{label}</span>
	</label>

	<label
		class={`flex w-full max-w-lg items-center gap-2 ${type !== 'file' && 'input input-bordered'}`}
	>
		<input
			{id}
			{placeholder}
			type={password ? toggleType : type}
			bind:value
			name={id}
			class={`grow ${type === 'file' && 'file-input file-input-bordered'}`}
			{...props}
		/>
		{#if password}
			<button
				type="button"
				onclick={() => (toggleType = toggleType === 'password' ? 'text' : 'password')}
			>
				<Icon src={toggleType === 'password' ? EyeSlash : Eye} class="size-5" />
			</button>
		{/if}
	</label>

	{#if errors}
		{#each errors as error}
			<label for={id} class="label py-0 pt-2">
				<span class="label-text-alt text-error">
					{error}
				</span>
			</label>
		{/each}
	{/if}
</div>
