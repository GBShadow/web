import { error } from '@sveltejs/kit';

import type { Actions } from './$types';

export const actions: Actions = {
	updateProfile: async ({ locals, request }) => {
		if (!locals?.user) return;

		const data = await request.formData();
		const userAvatar = data.get('avatar') as File;

		if (userAvatar.size === 0) {
			data.delete('avatar');
		}

		try {
			const { name, avatar } = await locals.pb.collection('users').update(locals?.user?.id, data);
			locals.user.name = name;
			locals.user.avatar = avatar;
		} catch (err) {
			console.log(err);

			throw error(400, 'Something went wrong updating your profile');
		}

		return {
			success: true
		};
	}
};
