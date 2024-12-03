import type { AnyZodObject, ZodError } from 'zod';

const { randomBytes } = await import('node:crypto');
export const serializedNonPOJOs = <T>(obj: T) => {
	return structuredClone(obj) as T;
};

export const generateUsername = (name: string) => {
	const id = randomBytes(2).toString('hex');
	return `${name.slice(0, 5)}${id}`;
};

export const getImageUrl = (
	collectionId: string,
	recordId: string,
	fileName: string,
	size = '0x0'
) => {
	return `http://127.0.0.1:8090/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
};

export const validateData = async <T extends AnyZodObject>(formData: FormData, schema: T) => {
	const body = Object.fromEntries(formData);

	try {
		const data = schema.parse(body);
		return {
			formData: data,
			errors: null
		};
	} catch (_err) {
		const err = _err as ZodError;
		console.log('Error: ', err);
		const errors = err.flatten();
		return {
			formData: body,
			errors
		};
	}
};

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
