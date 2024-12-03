<script lang="ts">
	import { Input } from '$lib/components';
	import { registerUserSchema } from '$lib/schemas';
	import { getToastState } from '$lib/toast-state.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const toastState = getToastState();

	const { form, enhance, delayed, submitting, errors } = superForm(data.form, {
		validators: zodClient(registerUserSchema),
		onError: ({ result }) => {
			toastState.add('Error', result.error.message, 'error');
		},
		onUpdate({ result }) {
			switch (result.type) {
				case 'success':
					toastState.add('Success', 'User register', 'success');
					break;
				case 'failure':
					toastState.add('Error', 'User register', 'error');
					break;
				default:
					break;
			}
		}
	});
</script>

<div class="flex h-full w-full flex-col items-center">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Register for an account
	</h2>
	<p class="mt-1 text-center">
		Or <a href="/login" class="font-medium text-primary hover:cursor-pointer hover:underline"
			>sing in</a
		>
		if you already have an account.
	</p>
	<form
		action="?/register"
		method="POST"
		class="flex w-full flex-col items-center space-y-2 pt-4"
		use:enhance
	>
		<Input
			id="name"
			label="Name"
			bind:value={$form.name}
			errors={$errors?.name}
			disabled={$submitting}
		/>
		<Input
			type="email"
			id="email"
			label="Email"
			bind:value={$form.email}
			errors={$errors.email}
			disabled={$submitting}
		/>
		<Input
			type="password"
			id="password"
			label="Password"
			password
			bind:value={$form.password}
			errors={$errors.password}
			disabled={$submitting}
		/>
		<Input
			type="password"
			id="passwordConfirm"
			label="Confirm Password"
			password
			bind:value={$form.passwordConfirm}
			errors={$errors?.passwordConfirm}
			disabled={$submitting}
		/>
		<div class="w-full max-w-md pt-2">
			<button class="btn btn-primary w-full" disabled={$submitting}>
				{#if $delayed}
					<span class="loading loading-dots"></span>
				{:else}
					Register
				{/if}
			</button>
		</div>
	</form>
</div>
