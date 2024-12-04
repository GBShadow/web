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

	const toggle = () => {
		const dialog = document.getElementById(label) as HTMLDialogElement;
		dialog.showModal();
	};
</script>

<button onclick={toggle}>
	{@render trigger()}
</button>

<dialog id={label} open={checked} class="modal modal-bottom sm:modal-middle">
	<div class="modal-box">
		<div class="text-center text-xl font-bold">
			{@render heading()}
		</div>
		<div class="my-2">
			{@render children?.()}
		</div>
		<div class="modal-action justify-center">
			{@render actions?.()}
		</div>
	</div>
</dialog>
