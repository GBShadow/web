import { resetPasswordSchema } from '$lib/schemas';
import { error, type Actions } from '@sveltejs/kit';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(resetPasswordSchema));

	return { form };
};

export const actions: Actions = {
	resetPassword: async ({ request, locals }) => {
		const form = await superValidate(request, zod(resetPasswordSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			await locals.pb.collection('users').requestPasswordReset(form.data.email);
			return {
				form
			};
		} catch (err) {
			console.log('Error: ', err);
			throw error(500, 'Something went wrong');
		}
	}
};
