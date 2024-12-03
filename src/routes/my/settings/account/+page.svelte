<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { updateEmailSchema, updateUsernameSchema } from '$lib/schemas';
	import { getToastState } from '$lib/toast-state.svelte';
	import toast from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const toastState = getToastState();
	let emailModalOpen = $state(false);
	let usernameModalOpen = $state(false);

	const {
		form: formUpdateEmail,
		errors: errorsUpdateEmail,
		delayed: delayedUpdateEmail,
		enhance: enhanceUpdateEmail,
		submitting: submittingUpdateEmail
	} = superForm(data.formUpdateEmail, {
		validators: zodClient(updateEmailSchema),
		taintedMessage: 'Please enter your new e-mail',
		onSubmit: () => {
			emailModalOpen = true;
		},
		onError: ({ result }) => {
			toastState.add('Error', result.error.message, 'error');
		},
		onUpdate({ result }) {
			switch (result.type) {
				case 'success':
					toastState.add('Success', 'Updating e-mail', 'success');
					usernameModalOpen = false;
					break;
				case 'failure':
					toastState.add('Error', 'Updating e-mail', 'error');
					break;
				default:
					break;
			}
		}
	});

	const {
		form: formUpdateUsername,
		errors: errorsUpdateUsername,
		delayed: delayedUpdateUsername,
		enhance: enhanceUpdateUsername,
		submitting: submittingUpdateUsername
	} = superForm(data.formUpdateUsername, {
		taintedMessage: 'Please enter your new username',
		validators: zodClient(updateUsernameSchema),
		onSubmit: () => {
			usernameModalOpen = true;
		},
		onError: ({ result }) => {
			console.log('Error', result);
		},
		onUpdate({ result }) {
			switch (result.type) {
				case 'success':
					toastState.add('Success', 'Updating username', 'success');
					usernameModalOpen = false;
					break;
				case 'failure':
					toastState.add('Error', 'Updating username', 'error');
					toast.error('Error updating email');
					break;
				default:
					break;
			}
		}
	});
</script>

<div class="flex h-full w-full flex-col space-y-12">
	<div class="w-full">
		<h3 class="text-2xl font-medium">Change E-mail</h3>
		<div class="divider"></div>
		<Modal label="change-email" checked={emailModalOpen}>
			{#snippet trigger()}
				<span class="btn btn-primary">Change Email</span>
			{/snippet}
			{#snippet heading()}
				<h3>Change Your Email</h3>
			{/snippet}
			<form action="?/updateEmail" method="POST" class="space-y-2" use:enhanceUpdateEmail>
				<Input
					id="email"
					type="email"
					label="Enter your new email address"
					required
					bind:value={$formUpdateEmail.email}
					errors={$errorsUpdateEmail.email}
					disabled={$submittingUpdateEmail}
				/>
				<button type="submit" disabled={$submittingUpdateEmail} class="btn btn-primary w-full">
					{#if $delayedUpdateEmail}
						<span class="loading loading-dots"></span>
					{:else}
						Change my email
					{/if}
				</button>
			</form>
		</Modal>

		<div class="w-full">
			<div class="divider"></div>
			<Input
				id="username"
				type="text"
				label="Enter your new username"
				value={data.user?.username}
				disabled
			/>
			<Modal label="change-username" checked={usernameModalOpen}>
				{#snippet trigger()}
					<span class="btn btn-primary">Change Username</span>
				{/snippet}
				{#snippet heading()}
					<h3>Change Your Username</h3>
				{/snippet}
				<form action="?/updateUsername" method="POST" class="space-y-2" use:enhanceUpdateUsername>
					<Input
						id="username"
						type="username"
						label="Enter your new username"
						required
						bind:value={$formUpdateUsername.username}
						disabled={$submittingUpdateUsername}
						errors={$errorsUpdateUsername.username}
					/>
					<button type="submit" disabled={$submittingUpdateUsername} class="btn btn-primary w-full">
						{#if $delayedUpdateUsername}
							<span class="loading loading-dots"></span>
						{:else}
							Change my username
						{/if}
					</button>
				</form>
			</Modal>
		</div>
	</div>
</div>
