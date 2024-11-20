import { error } from '@sveltejs/kit';
import { ClientResponseError } from 'pocketbase';
import type { Actions } from './$types';

export const actions: Actions = {
	updateEmail: async ({ locals, request }) => {
		try {
			const data = Object.fromEntries(await request.formData());

			await locals.pb.collection('users').requestEmailChange(data.email);
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

		const data = Object.fromEntries(await request.formData());
		const usernameSanitized = (data.username as string).toLowerCase().replace(/\s/g, '');
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

			throw error(err.status, err.message);
		}
	}
};
