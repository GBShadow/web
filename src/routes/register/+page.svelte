<script lang="ts">
	import { enhance } from '$app/forms';
	import { Input } from '$lib/components';

	let { form }: { form: FormData } = $props();
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
		<Input id="name" label="Name" value={form?.data?.name} errors={form?.errors?.name} />
		<Input
			type="email"
			id="email"
			label="Email"
			value={form?.data?.email}
			errors={form?.errors?.email}
		/>
		<Input type="password" id="password" label="Password" errors={form?.errors?.password} />
		<Input
			type="password"
			id="passwordConfirm"
			label="Confirm Password"
			errors={form?.errors?.passwordConfirm}
		/>
		<div class="w-full max-w-md pt-2">
			<button class="btn btn-primary w-full">Register</button>
		</div>
	</form>
</div>
