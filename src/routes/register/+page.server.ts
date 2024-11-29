import { registerUserSchema } from '$lib/schemas';
import { generateUsername, validateData } from '$lib/utils';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const { formData, errors } = await validateData(await request.formData(), registerUserSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}
		const username = generateUsername(formData.name.split(' ').join('')).toLocaleLowerCase();
		try {
			await locals.pb.collection('users').create({ username, ...formData });
			await locals.pb.collection('users').requestVerification(formData.email);
		} catch (err) {
			console.log(err);

			throw error(500, 'Something went wrong');
		}

		throw redirect(303, '/login');
	}
};
