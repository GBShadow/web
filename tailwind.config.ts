import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	daisyui: {
		themes: ['forest', 'sunset', 'halloween']
	},

	plugins: [daisyui]
} satisfies Config;
