<script>
	import Input from '$lib/components/Input.svelte';
</script>

<div class="flex h-full w-full flex-col">
	<div class="w-full">
		<form action="?/updatePassword" method="POST" class="flex w-full flex-col space-y-2">
			<h3 class="text-2xl font-medium">Change Password</h3>
			<div class="divider"></div>
			<Input id="oldPassword" label="Old Password" type="password" name="oldPassword" />
			<Input id="password" label="New Password" type="password" name="password" />
			<Input id="passwordConfirm" label="Confirm Password" type="password" name="passwordConfirm" />

			<a href="/reset-password" class="text-primary hover:cursor-pointer hover:underline">
				I forgot my password</a
			>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg"> Update Password </button>
			</div>
		</form>
	</div>
</div>
