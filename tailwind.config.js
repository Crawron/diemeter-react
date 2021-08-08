const colors = require("tailwindcss/colors")

module.exports = {
	mode: "jit",
	purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			fontFamily: { sans: "Inter" },
			colors: { blueGray: colors.blueGray },
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
