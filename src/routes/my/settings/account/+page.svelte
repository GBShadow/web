<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';
	import type { PageData } from '../$types';
	import type { ActionData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	let emailModalOpen = $state(false);
	let usernameModalOpen = $state(false);
	let loading = $state(false);

	const submitUpdateEmail: SubmitFunction = () => {
		loading = true;
		emailModalOpen = true;

		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					toast.success('Success updating email');
					break;
				case 'error':
					toast.error('Error updating email');
					break;
				default:
					await applyAction(result);
					break;
			}
			loading = false;
			emailModalOpen = false;
		};
	};

	const submitUpdateUsername: SubmitFunction = () => {
		loading = true;
		usernameModalOpen = true;

		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					toast.success('Success updating username');
					break;
				case 'error':
					toast.error('Error updating username');
					break;
				default:
					await applyAction(result);
					break;
			}
			loading = false;
			usernameModalOpen = false;
		};
	};
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
			<form action="?/updateEmail" method="POST" class="space-y-2" use:enhance={submitUpdateEmail}>
				<Input
					id="email"
					type="email"
					label="Enter your new email address"
					required
					value={form?.data?.email}
					disabled={loading}
					errors={form?.errors?.email}
				/>
				<button type="submit" disabled={loading} class="btn btn-primary w-full">
					Change my email
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
				<form
					action="?/updateUsername"
					method="POST"
					class="space-y-2"
					use:enhance={submitUpdateUsername}
				>
					<Input
						id="username"
						type="username"
						label="Enter your new username"
						required
						value={form?.data?.username}
						disabled={loading}
						errors={form?.errors?.username}
					/>
					<button type="submit" disabled={loading} class="btn btn-primary w-full"
						>Change my username</button
					>
				</form>
			</Modal>
		</div>
	</div>
</div>
