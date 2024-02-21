/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "#101010",
      },
      textColor: {
        primary: "#101010",
      },
      animation: {
        pulse: "pulse 1s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
