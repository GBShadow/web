<script lang="ts">
	import { Input } from '$lib/components';
	import { resetPasswordSchema } from '$lib/schemas';
	import { getToastState } from '$lib/toast-state.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let success = $state(false);
	const toastState = getToastState();

	const { form, enhance, delayed, submitting, errors } = superForm(data.form, {
		validators: zodClient(resetPasswordSchema),
		onError: ({ result }) => {
			toastState.add('Error', result.error.message, 'error');
		},
		onUpdate({ result }) {
			switch (result.type) {
				case 'success':
					success = true;
					break;
				case 'failure':
					toastState.add('Error', 'Updating password', 'error');
					break;
				default:
					break;
			}
		}
	});
</script>

<div class="flex h-full w-full flex-col items-center">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Reset Your Password
	</h2>
	<p class="mt-1 text-center">We'll send you an email with a link to reset your password.</p>
	<form
		action="?/resetPassword"
		method="POST"
		class="flex w-full flex-col items-center space-y-2 pt-4"
		use:enhance
	>
		<div class="form-control w-full max-w-md">
			<Input
				type="email"
				name="email"
				label="Email"
				bind:value={$form.email}
				errors={$errors.email}
				disabled={$submitting}
			/>
		</div>
		<div class="w-full max-w-md pt-2">
			<button type="submit" class="btn btn-primary w-full" disabled={$submitting}>
				{#if $delayed}
					<span class="loading loading-dots"></span>
				{:else}
					Request Password Reset
				{/if}
			</button>
		</div>
		{#if success}
			<div class="alert alert-success w-full max-w-md shadow-lg">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 flex-shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>An email has been sent to reset your password!</span>
			</div>
		{/if}
	</form>
</div>
