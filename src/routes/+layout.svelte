<script lang="ts">
	import { getImageUrl } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import { CodeBracket, Icon } from 'svelte-hero-icons';
	import '../app.css';
	import type { LayoutData } from './$types';

	type Props = {
		children: Snippet;
		data: LayoutData;
	};

	let { children, data }: Props = $props();
</script>

<nav class="min-h-full">
	<div class="navbar border-b bg-base-100">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost text-xl normal-case"
				><Icon class="size-8" src={CodeBracket} /></a
			>
		</div>
		<div class="flex-none">
			{#if !data.user}
				<div class="dropdown dropdown-end">
					<a href="/login" class="btn btn-primary">Login</a>
					<a href="/register" class="btn btn-secondary">Register</a>
				</div>
			{:else}
				<div class="dropdown dropdown-end mr-4">
					<a href="/my/projects/new" class="btn btn-primary">Add project</a>
				</div>
				<div class="dropdown dropdown-end">
					<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
					<!-- svelte-ignore a11y_label_has_associated_control -->
					<label tabindex="0" class="avater btn btn-circle btn-ghost">
						<div class="avatar">
							<div class="w-10 rounded-full">
								<img
									src={data?.user?.avatar
										? getImageUrl(data.user.collectionId, data.user.id, data.user.avatar)
										: `https://ui-avatars.com/api/?name=${data?.user?.name}`}
									alt="User Avatar"
								/>
							</div>
						</div>
					</label>

					<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
					<ul
						tabindex="0"
						class="menu-compact menu dropdown-content mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
					>
						<li>
							<a href="/my/projects" class="justify-between"> My Projects</a>
						</li>
						<li>
							<a href="/my/settings">My Settings</a>
						</li>
						<li>
							<form action="/logout" method="POST" class="flex w-full">
								<button type="submit" class="flex-1 text-start">Logout</button>
							</form>
						</li>
					</ul>
				</div>
			{/if}
		</div>
	</div>
</nav>
<div class="py-10">
	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
		{@render children()}
	</div>
</div>
