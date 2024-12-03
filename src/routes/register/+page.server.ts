import { registerUserSchema } from '$lib/schemas';
import { generateUsername } from '$lib/utils';
import { error, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export const load = async () => {
	const form = await superValidate(zod(registerUserSchema));
	return { form };
};

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const form = await superValidate(request, zod(registerUserSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const username = generateUsername(form.data.name.split(' ').join('')).toLocaleLowerCase();

			await locals.pb.collection('users').create({ username, ...form.data });
			await locals.pb.collection('users').requestVerification(form.data.email);
			throw redirect(303, '/login');
		} catch (_err) {
			console.log(_err);
			throw error(500, 'Something went wrong');
		}
	}
};
