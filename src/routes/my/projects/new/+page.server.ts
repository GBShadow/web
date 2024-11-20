import { error, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}
};

export const actions: Actions = {
	create: async ({ locals, request }) => {
		if (!locals?.user) return;
		const formData = await request.formData();
		const thumbnail = formData.get('thumbnail') as File;

		if (thumbnail.size === 0) {
			formData.delete('thumbnail');
		}
		formData.append('user', locals.user.id);
		try {
			await locals.pb.collection('projects').create(formData);
		} catch (_err) {
			const err = _err as ClientResponseError;
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, '/my/projects');
	}
};