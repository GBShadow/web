import { updatePasswordSchema } from '$lib/schemas';
import { error, fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export const load = async () => {
	const form = await superValidate(zod(updatePasswordSchema));

	return { form };
};

export const actions: Actions = {
	updatePassword: async ({ locals, request }) => {
		try {
			const form = await superValidate(request, zod(updatePasswordSchema));

			if (!form.valid) {
				return fail(400, {
					form
				});
			}

			await locals.pb.collection('users').update(locals?.user?.id, form.data);

			locals.pb.authStore.clear();

			throw redirect(303, '/login');
		} catch (_err) {
			const err = _err as ClientResponseError;
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}
};
