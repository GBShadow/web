<script lang="ts">
	import { getToastState } from '$lib/toast-state.svelte';
	import Toast from './Toast.svelte';

	const toastState = getToastState();
</script>

<div class="toast toast-top mt-20">
	{#each toastState.toasts as toast}
		<Toast {toast} />
	{/each}
</div>
