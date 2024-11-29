import { serializedNonPOJOs } from '$lib/utils.js';
import { error } from '@sveltejs/kit';
import type { ClientResponseError } from 'pocketbase';

export const load = ({ locals }) => {
	const getProjects = async () => {
		try {
			const projects = serializedNonPOJOs(await locals.pb.collection('projects').getFullList());
			console.log(projects);
			return projects;
		} catch (_err) {
			const err = _err as ClientResponseError;
			console.log('Error:', err);
			throw error(err.status, err.message);
		}
	};

	return {
		projects: getProjects()
	};
};
