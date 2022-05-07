module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				'shade-0': '#FFF9EC',
				'shade-1': '#FFDCCC',
				'shade-2': '#FCB1A6',
				'shade-3': '#FB6376',
				'shade-4': '#5D2A42',
			},
			fontFamily: {
				ubuntu: ['Ubuntu', 'sans-serif']
			}
		},
	},
	plugins: [],
};
