<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import { updatePasswordSchema } from '$lib/schemas';
	import { getToastState } from '$lib/toast-state.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const toastState = getToastState();

	const { form, enhance, delayed, submitting, errors } = superForm(data.form, {
		validators: zodClient(updatePasswordSchema),
		onError: ({ result }) => {
			toastState.add('Error', result.error.message, 'error');
		},
		onUpdate({ result }) {
			switch (result.type) {
				case 'success':
					toastState.add('Success', 'Updating password', 'success');
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

<div class="flex h-full w-full flex-col">
	<div class="w-full">
		<form
			action="?/updatePassword"
			method="POST"
			class="flex w-full flex-col space-y-2"
			use:enhance
		>
			<h3 class="text-2xl font-medium">Change Password</h3>
			<div class="divider"></div>
			<Input
				id="oldPassword"
				label="Old Password"
				type="password"
				name="oldPassword"
				password
				bind:value={$form.oldPassword}
				errors={$errors?.oldPassword}
				disabled={$submitting}
			/>
			<Input
				id="password"
				label="New Password"
				type="password"
				name="password"
				password
				bind:value={$form.password}
				errors={$errors?.password}
				disabled={$submitting}
			/>
			<Input
				id="passwordConfirm"
				label="Confirm Password"
				type="password"
				name="passwordConfirm"
				password
				bind:value={$form.passwordConfirm}
				errors={$errors?.passwordConfirm}
				disabled={$submitting}
			/>

			<a href="/reset-password" class="text-primary hover:cursor-pointer hover:underline">
				I forgot my password</a
			>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg" disabled={$submitting}>
					{#if $delayed}
						<span class="loading loading-dots"></span>
					{:else}
						Update Password
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>
