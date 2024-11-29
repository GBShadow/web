import { updateProjectSchema } from '$lib/schemas';
import { serializedNonPOJOs, validateData } from '$lib/utils';
import { error, fail, redirect } from '@sveltejs/kit';
import { serialize } from 'object-to-formdata';
import type { ClientResponseError } from 'pocketbase';
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
		const project = serializedNonPOJOs(
			await locals.pb.collection<ProjectProps>('projects').getOne(params.projectId)
		);

		if (locals.user.id === project.user) {
			return { project };
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
		const body = await request.formData();

		const thumb = body.get('thumbnail') as File;

		if (thumb.size === 0) {
			body.delete('thumbnail');
		}

		const { formData, errors } = await validateData(body, updateProjectSchema);
		const { thumbnail, ...rest } = formData;

		if (errors) {
			return fail(400, {
				data: rest,
				errors: errors.fieldErrors
			});
		}

		try {
			await locals.pb.collection('projects').update(params.projectId, serialize(formData));
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
