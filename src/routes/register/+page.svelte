<script lang="ts">
	import { enhance } from '$app/forms';
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
		<div class="form-control w-full max-w-md">
			<label for="name" class="label pb-1 font-medium">
				<span class="label-text">Name</span>
			</label>
			<input type="text" name="name" id="name" class="input input-bordered w-full max-w-md" />
		</div>
		<div class="form-control w-full max-w-md">
			<label for="email" class="label pb-1 font-medium">
				<span class="label-text">E-mail</span>
			</label>
			<input type="email" name="email" id="email" class="input input-bordered w-full max-w-md" />
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
		<div class="form-control w-full max-w-md">
			<label for="passwordConfirm" class="label pb-1 font-medium">
				<span class="label-text">Confirm Password</span>
			</label>
			<input
				type="password"
				name="passwordConfirm"
				id="passwordConfirm"
				class="input input-bordered w-full max-w-md"
			/>
		</div>
		<div class="w-full max-w-md pt-2">
			<button class="btn btn-primary w-full">Register</button>
		</div>
	</form>
</div>
