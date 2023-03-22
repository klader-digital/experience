const defaultTheme = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "1rem",
        },
        extend: {
            fontFamily: {
                sans: ['var(--font-gotham)', ...defaultTheme.fontFamily.sans],
                display: ['var(--font-gotham-condensed)', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                transparent: "transparent",
                current: "currentColor",
                black: "#000",
                white: "#fff",
                dark: "#232323",
                light: "#f9f9f9",
                primary: "#00EE2A",
            },
        },
    },
    plugins: [],
}
