import { SECRET_SIGNATURE } from '$env/static/private';
const crypto = await import('node:crypto');

export const hashPassword = (password: string) => {
	const hash = crypto.createHash('sha256');
	hash.update(password);
	hash.update(SECRET_SIGNATURE);
	return hash.digest('hex');
};
