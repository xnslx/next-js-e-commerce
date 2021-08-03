const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Jura", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "accent-1": "#333",
                lime: colors.lime,
                "light-blue": colors.lightBlue,
                cyan: colors.cyan,
                primary: "#F2ECE1",
            },
            boxShadow: {
                "offset-lime": "4px 4px lime",
                "offset-black": "4px 4px black",
            },
        },
    },
    variants: {},
    plugins: [],
};