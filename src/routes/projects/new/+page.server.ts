import { createProjectSchema } from '$lib/schemas';
import { error, fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import { zod } from 'sveltekit-superforms/adapters';
import { superValidate } from 'sveltekit-superforms/server';
import type { Actions } from './$types';

export const load = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const form = await superValidate(zod(createProjectSchema));

	return { form };
};

export const actions: Actions = {
	create: async ({ locals, request }) => {
		if (!locals?.user) return;
		const body = await request.formData();
		const thumb = body.get('thumbnail') as File;

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		body.append('user', locals.user.id);

		try {
			const form = await superValidate(body, zod(createProjectSchema));

			if (!form.valid) {
				return fail(400, {
					form
				});
			}

			await locals.pb.collection('projects').create(form.data);
		} catch (_err) {
			const err = _err as ClientResponseError;
			console.log('Error: ', JSON.stringify(err, null, 2));
			throw error(err.status, err.message);
		}

		throw redirect(303, '/my/projects');
	}
};
