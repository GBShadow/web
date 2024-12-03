<script lang="ts">
	import { applyAction } from '$app/forms';
	import { Input } from '$lib/components';
	import { loginUserSchema } from '$lib/schemas';
	import toast, { LoaderIcon } from 'svelte-french-toast';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { ActionData, PageData } from './$types';
	let { data, actionData }: { data: PageData; actionData: ActionData } = $props();

	const { form, enhance, errors, delayed, submitting } = superForm(data.form, {
		validators: zodClient(loginUserSchema),
		onError: ({ result }) => {
			toast.error(result.error.message);
		},
		onUpdate({ form, result }) {
			const errors = Object.entries(form.errors);

			if (result.type === 'failure') {
				errors.forEach(([key, errorMessages]) => {
					errorMessages.forEach((message) => {
						toast.error(message);
					});
				});
			}
			applyAction(result);
		}
	});
</script>

<div class="flex h-full w-full flex-col items-center">
	<h2 class="mt-2 text-center text-3xl font-bold tracking-tight text-base-content">
		Login to your account
	</h2>
	<p class="mt-1 text-center">
		Or <a href="/register" class="font-medium text-primary hover:cursor-pointer hover:underline"
			>register</a
		>
		if you don't already have an account.
	</p>
	<form
		action="?/login"
		method="POST"
		class="flex w-full flex-col items-center space-y-2 pt-4"
		use:enhance
	>
		<div class="form-control w-full max-w-md">
			<Input
				type="email"
				id="email"
				label="Email"
				errors={$errors?.email}
				bind:value={$form.email}
			/>
			<Input
				type="password"
				id="password"
				label="Password"
				errors={$errors?.password}
				bind:value={$form.password}
			/>
		</div>
		<div class="w-full max-w-md">
			<a
				href="/reset-password"
				class="font-medium text-primary hover:cursor-pointer hover:underline"
			>
				Forgot Password?
			</a>
		</div>

		<div class="w-full max-w-md pt-2">
			<button class="btn btn-primary w-full" disabled={$submitting}>
				{#if $delayed}
					<LoaderIcon />
				{:else}
					Login
				{/if}
			</button>
		</div>

		{#if actionData?.notVerified}
			<div role="alert" class="alert alert-error w-full max-w-md shadow-lg">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-6 w-6 shrink-0 stroke-current"
					fill="none"
					viewBox="0 0 24 24"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>You must verify your email before you can login</span>
			</div>
		{/if}
	</form>
</div>
