import { deleteProjectSchema } from '$lib/schemas';
import { delay } from '$lib/utils';
import { redirect } from '@sveltejs/kit';
import { error } from 'console';
import type { ClientResponseError } from 'pocketbase';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

type ProjectProps = {
	id: string;
	collectionId: string;
	thumbnail: string;
	name: string;
	tagline: string;
	description: string;
};

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

	const form = await superValidate(zod(deleteProjectSchema));

	const getUsersProjects = async (userId: string) => {
		try {
			const projects = await locals.pb
				.collection<ProjectProps>('projects')
				.getFullList({ filter: `user = "${userId}"`, sort: '-created' });
			return projects;
		} catch (_err) {
			const err = _err as ClientResponseError;
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	};

	return {
		projects: getUsersProjects(locals.user?.id),
		form
	};
};

export const actions: Actions = {
	deleteProject: async ({ locals, request }) => {
		const form = await superValidate(request, zod(deleteProjectSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await delay(5000);

		try {
			await locals.pb.collection('projects').delete(form.data.id);
			return {
				form
			};
		} catch (_err) {
			const err = _err as ClientResponseError;
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	}
};
