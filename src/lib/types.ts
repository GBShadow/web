export type Toast = {
	id: string;
	title: string;
	message: string;
	type: 'info' | 'success' | 'warning' | 'error';
};
