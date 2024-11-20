import { redirect } from '@sveltejs/kit';
import { error } from 'console';
import type { ClientResponseError } from 'pocketbase';
import type { PageServerLoad } from './$types';

type ProjectProps = {
	id: string;
	collectionId: string;
	thumbnail: string;
	name: string;
	tagline: string;
	description: string;
};

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) return;
	if (!locals.pb.authStore.isValid) {
		throw redirect(303, '/login');
	}

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
		projects: getUsersProjects(locals.user.id)
	};
};

import type { Actions } from './$types';

export const actions: Actions = {
	deleteProject: async ({ locals, request }) => {
		const { id } = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('projects').delete(id);
		} catch (_err) {
			const err = _err as ClientResponseError;
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		return {
			success: true
		};
	}
};
