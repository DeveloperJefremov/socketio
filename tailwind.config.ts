import { Button } from 'antd';
import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/providers/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#31304D',
				borderRadius: '2px',
			},
			components: {
				Button: {
					controlHeight: '45px',
					boxShadow: 'none',
					colorPrimaryBgHover: '#31304D',
					colorPrimaryHover: '#31304D',
					controlOutline: 'none',
					colorBorder: '#31304D',
				},
			},
		},
	},
	plugins: [],
	corePlugins: {
		preflight: false,
	},
};
export default config;
