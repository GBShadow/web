<script lang="ts">
	import type { Toast } from '$lib/types';

	type Props = {
		toast: Toast;
	};

	let { toast }: Props = $props();
</script>

<div class={`alert alert-${toast.type}`}>
	<span class="text-sm font-medium">{toast.title}</span>
	<span class="text-xs">{toast.message}</span>
</div>
