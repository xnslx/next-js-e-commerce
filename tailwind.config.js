// const colors = require("tailwindcss/colors");

module.exports = {
    future: {
        removeDeprecatedGapUtilities: true,
        purgeLayersByDefault: true,
    },
    purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "accent-1": "#333",
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