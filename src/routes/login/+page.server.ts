import { loginUserSchema } from '$lib/schemas';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}

	const form = await superValidate(zod(loginUserSchema));

	return { form };
};

export const actions: Actions = {
	login: async ({ locals, request }) => {
		try {
			const form = await superValidate(request, zod(loginUserSchema));

			if (!form.valid) {
				return fail(400, {
					form
				});
			}

			await locals.pb.collection('users').authWithPassword(form.data.email, form.data.password);

			if (!locals.pb?.authStore?.model?.verified) {
				locals.pb.authStore.clear();
				return {
					form,
					notVerified: true
				};
			}
		} catch (_err) {
			console.log(_err);
			throw error(500, 'Something went wrong logging in');
		}

		throw redirect(303, '/');
	}
};
