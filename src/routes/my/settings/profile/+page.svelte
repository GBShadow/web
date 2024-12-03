<script lang="ts">
	import { applyAction } from '$app/forms';
	import Input from '$lib/components/Input.svelte';
	import { updateProfileSchema } from '$lib/schemas';
	import { getToastState } from '$lib/toast-state.svelte';
	import { getImageUrl } from '$lib/utils';
	import { Icon, Pencil } from 'svelte-hero-icons';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	const toastState = getToastState();

	const { form, enhance, errors, delayed, submitting } = superForm(data.form, {
		validators: zodClient(updateProfileSchema),
		onError: ({ result }) => {
			toastState.add('Error', result.error.message, 'error');
		},
		onUpdate({ result }) {
			switch (result.type) {
				case 'success':
					toastState.add('Success', 'Updating profile', 'success');
					applyAction(result);
					break;
				case 'failure':
					toastState.add('Error', 'Updating profile', 'error');
					break;
				default:
					break;
			}
		}
	});

	const showPreview = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		if (files?.length) {
			const src = URL.createObjectURL(files[0]);
			const preview = document.getElementById('avatar-preview') as HTMLImageElement;
			preview.src = src;
		}
	};
</script>

<div class="flex h-full w-full flex-col">
	<form
		action="?/updateProfile"
		method="POST"
		enctype="multipart/form-data"
		class="flex w-full flex-col space-y-2"
		use:enhance
	>
		<h3 class="text-2xl font-medium">Update Profile</h3>
		<div class="form-control w-full max-w-lg">
			<label for="avatar" class="label pb-1 font-medium">
				<span class="label-text">Profile Picture</span>
			</label>
			<label for="avatar" class="avatar w-32 rounded-full hover:cursor-pointer">
				<label for="avatar" class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer">
					<span class="btn btn-circle btn-secondary btn-sm">
						<Icon src={Pencil} class="size-4" />
					</span>
				</label>
				<div class="w-32 rounded-full">
					<img
						src={data?.user?.avatar
							? getImageUrl(data.user.collectionId, data.user.id, data.user.avatar)
							: `https://ui-avatars.com/api/?name=${data?.user?.name}`}
						alt="User Avatar"
						id="avatar-preview"
					/>
				</div>
			</label>
			<input
				type="file"
				name="avatar"
				id="avatar"
				value=""
				accept="image/*"
				hidden
				onchange={showPreview}
				disabled={$submitting}
			/>
			{#if $errors?.avatar}
				{#each $errors?.avatar as error}
					<label for="avatar" class="label py-0 pt-1">
						<span class="label-text-alt text-error">
							{error}
						</span>
					</label>
				{/each}
			{/if}
		</div>
		<Input
			label="Name"
			name="name"
			bind:value={$form.name}
			disabled={$submitting}
			errors={$errors.name}
		/>
		<div class="w-full max-w-lg pt-3">
			<button class="btn btn-primary w-full max-w-lg" type="submit" disabled={$submitting}>
				{#if $delayed}
					<span class="loading loading-dots"></span>
				{:else}
					<span>Update Profile</span>
				{/if}
			</button>
		</div>
	</form>
</div>
