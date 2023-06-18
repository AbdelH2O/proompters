import { type Config } from "tailwindcss";

export default {
	content: ["./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					100: "#F8F9FA",
					200: "#E9ECEF",
					300: "#DEE2E6",
					400: "#CED4DA",
					500: "#ADB5BD",
					600: "#6C757D",
					700: "#495057",
					800: "#343A40",
					900: "#212529",
					950: "#121212",
				}
			},
			fontFamily: {
				ibm: ["IBM Plex Mono", "monospace"],
				jetbrains: ["JetBrains Mono", "monospace"],
			},
		},
	},
	plugins: [
		require("@tailwindcss/forms"),
	],
} satisfies Config;
