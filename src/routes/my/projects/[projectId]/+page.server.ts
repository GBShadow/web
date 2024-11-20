import { serializedNonPOJOs } from '$lib/utils';
import { error } from '@sveltejs/kit';
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

export const load: PageServerLoad = async ({ locals, params }) => {
	const getProject = async (projectId: string): Promise<ProjectProps> => {
		try {
			const project = serializedNonPOJOs(
				await locals.pb.collection<ProjectProps>('projects').getOne(projectId)
			);

			return project;
		} catch (_err) {
			const err = _err as ClientResponseError;
			console.log('Error: ', err);

			throw error(err.status, err.message);
		}
	};
	return {
		project: getProject(params.projectId)
	};
};
