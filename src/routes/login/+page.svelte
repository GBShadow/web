<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';
	import type { SubmitFunction } from '@sveltejs/kit';
	import toast from 'svelte-french-toast';
	import type { ActionData } from './$types';
	let { form }: { form: ActionData } = $props();

	let loading = false;
	const submitLogin: SubmitFunction = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await update();
					toast.success('Login successful');
					break;
				case 'failure':
					toast.error('Invalid credentials');
					await update();
					break;
				case 'error':
					toast.error(result.error.message);
					break;
				default:
					await update();
			}
			loading = false;
		};
	};
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
		use:enhance={submitLogin}
	>
		<div class="form-control w-full max-w-md">
			<label for="email" class="label pb-1 font-medium">
				<span class="label-text">E-mail</span>
			</label>
			<Input
				type="email"
				id="email"
				label="Email"
				value={form?.data?.email ?? ''}
				errors={form?.errors?.email}
			/>
		</div>
		<div class="form-control w-full max-w-md">
			<label for="password" class="label pb-1 font-medium">
				<span class="label-text">Password</span>
			</label>
			<input
				type="password"
				name="password"
				id="password"
				class="input input-bordered w-full max-w-md"
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
			<button class="btn btn-primary w-full">Login</button>
		</div>

		{#if form?.notVerified}
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
