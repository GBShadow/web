import { updateProjectSchema } from '$lib/schemas';
import { serializedNonPOJOs } from '$lib/utils';
import { error, fail, redirect } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';

type ProjectProps = {
	id: string;
	collectionId: string;
	thumbnail: string;
	name: string;
	tagline: string;
	description: string;
	user: string;
	url: string;
};

export const load: PageServerLoad = async ({ locals, params }) => {
	if (!locals.user) return;
	if (!locals.pb.authStore.isValid) {
		throw error(401, 'Unauthorized');
	}

	try {
		const projectData = serializedNonPOJOs(
			await locals.pb.collection<ProjectProps>('projects').getOne(params.projectId)
		);

		const project = {
			id: projectData.id,
			collectionId: projectData.collectionId,
			name: projectData.name,
			tagline: projectData.tagline,
			description: projectData.description,
			user: projectData.user,
			url: projectData.url
		};

		const form = await superValidate(project, zod(updateProjectSchema));

		if (locals.user.id === project.user) {
			return { project: projectData, form };
		} else {
			throw error(403, 'Forbidden');
		}
	} catch (_err) {
		const err = _err as ClientResponseError;
		console.log('Error: ', err);

		throw error(err.status, err.message);
	}
};

export const actions: Actions = {
	updateProject: async ({ locals, request, params }) => {
		const form = await superValidate(request, zod(updateProjectSchema));

		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		try {
			await locals.pb.collection('projects').update(params.projectId, form.data);
		} catch (_err) {
			const err = _err as ClientResponseError;
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}

		throw redirect(303, `/my/projects/`);
	},
	deleteThumbnail: async ({ locals, params }) => {
		try {
			await locals.pb.collection('projects').update(params.projectId, {
				thumbnail: null
			});
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
