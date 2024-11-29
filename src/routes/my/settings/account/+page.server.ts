import { updateEmailSchema, updateUsernameSchema } from '$lib/schemas';
import { validateData } from '$lib/utils';
import { error, fail } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { Actions } from './$types';

export const actions: Actions = {
	updateEmail: async ({ locals, request }) => {
		try {
			const { formData, errors } = await validateData(await request.formData(), updateEmailSchema);

			if (errors) {
				return fail(400, {
					data: formData,
					errors: errors.fieldErrors
				});
			}

			await locals.pb.collection('users').requestEmailChange(formData.email);
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

		const { formData, errors } = await validateData(await request.formData(), updateUsernameSchema);

		if (errors) {
			return fail(400, {
				data: formData,
				errors: errors.fieldErrors
			});
		}

		const usernameSanitized = (formData.username as string).toLowerCase().replace(/\s/g, '');
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
					return { success: true };
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
