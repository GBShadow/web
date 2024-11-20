import { generateUsername } from '$lib/utils';
import { error, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	register: async ({ locals, request }) => {
		const body = Object.fromEntries(await request.formData());

		const username = generateUsername(body.name.split(' ').join('')).toLocaleLowerCase();
		try {
			await locals.pb.collection('users').create({ username, ...body });
			await locals.pb.collection('users').requestVerification(body.email);
			throw redirect(303, '/login');
		} catch (err) {
			console.log(err);

			throw error(500, 'Something went wrong');
		}
	}
};
