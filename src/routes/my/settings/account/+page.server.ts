import { updateEmailSchema, updateUsernameSchema } from '$lib/schemas';
import { error, fail } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions } from './$types';

export const load = async () => {
	const formUpdateEmail = await superValidate(zod(updateEmailSchema));
	const formUpdateUsername = await superValidate(zod(updateUsernameSchema));

	return {
		formUpdateEmail,
		formUpdateUsername
	};
};

export const actions: Actions = {
	updateEmail: async ({ locals, request }) => {
		if (!locals?.user) return;

		try {
			const form = await superValidate(request, zod(updateEmailSchema));

			if (!form.valid) {
				return fail(400, {
					form
				});
			}

			await locals.pb.collection('users').requestEmailChange(form.data.email);
		} catch (_err) {
			const err = _err as ClientResponseError;
			console.log(err);
			throw error(err.status, err.message);
		}

		return {
			success: true
		};
	},
	updateUsername: async ({ locals, request }) => {
		if (!locals?.user) return;

		const form = await superValidate(request, zod(updateUsernameSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const usernameSanitized = form.data.username.toLowerCase().replace(/\s/g, '');

		try {
			await locals.pb.collection('users').getFirstListItem(`username = "${usernameSanitized}"`);
		} catch (_err) {
			const err = _err as ClientResponseError;
			if (err.status === 404) {
				try {
					const { username } = await locals.pb
						.collection('users')
						.update(locals?.user?.id, { username: usernameSanitized });
					locals.user.username = username;
					return {
						form,
						success: true
					};
				} catch (_e) {
					const e = _e as ClientResponseError;
					console.log('Error: ', e);

					throw error(400, 'Something went wrong changing your username');
				}
			}
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}
};
