/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js}'],
	theme: {
		extend: {
			fontFamily: {
				'roboto-mono': ['"Roboto Mono"', 'monospace'],
			},
			colors: {
				'portfolio-green': '#00755F',
				'cream': '#faf9f6',
				'portfolio-black': '#333333',
			},
		},
	},
	plugins: [],
};
