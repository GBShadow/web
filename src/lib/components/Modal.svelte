<script lang="ts">
	import type { Snippet } from 'svelte';

	type ModalProps = {
		label: string;
		checked: boolean;
		trigger: Snippet;
		heading: Snippet;
		children?: Snippet;
		actions?: Snippet;
	};
	let { checked, label, trigger, heading, children, actions }: ModalProps = $props();
</script>

<label for={label}>
	{@render trigger()}
</label>

<input type="checkbox" id={label} class="modal-toggle" {checked} />
<label for={label} class="modal modal-bottom sm:modal-middle">
	<label for="" class="modal-box">
		<div class="text-center text-xl font-bold">
			{@render heading()}
		</div>
		<div class="my-2">
			{@render children?.()}
		</div>
		<div class="modal-action justify-center">
			{@render actions?.()}
		</div>
	</label>
</label>
