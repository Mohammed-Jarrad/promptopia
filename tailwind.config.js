/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				satoshi: ['Satoshi', 'sans-serif'],
				inter: ['Inter', 'sans-serif'],
			},
			colors: {
				'primary-orange': '#FF5722',
			},
			boxShadow: {
				nav: '0 4px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.2)',
			},
			backgroundImage: {
				'green-gradient-img':
					'linear-gradient(90deg, rgba(47,198,89,1) 29%, rgba(34,161,71,1) 56%, rgba(32,152,67,1) 73%)',
				'red-gradient-img':
					'linear-gradient(90deg, rgba(198,47,47,1) 29%, rgba(161,34,34,1) 56%, rgba(152,32,32,1) 73%)',
			},
		},
	},
	plugins: [],
}
