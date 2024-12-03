import { error, fail } from '@sveltejs/kit';

import { updateProfileSchema } from '$lib/schemas';
import { message, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export const load = async ({ locals }) => {
	const name = locals.user?.name;
	const form = await superValidate({ name }, zod(updateProfileSchema));

	return {
		form
	};
};

export const actions: Actions = {
	updateProfile: async ({ locals, request }) => {
		if (!locals?.user) return;

		const form = await superValidate(request, zod(updateProfileSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		try {
			const { name, avatar } = await locals.pb
				.collection('users')
				.update(locals?.user?.id, form.data);
			locals.user.name = name;
			locals.user.avatar = avatar;

			return message(form, 'You have uploaded a valid file!');
		} catch (_err) {
			console.log(_err);
			throw error(400, 'Something went wrong updating your profile');
		}
	}
};
