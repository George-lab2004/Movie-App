// eslint-disable-next-line no-undef
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(), // Ensure Flowbite content is included
  ],

  theme: {
    extend: {},
  },
  plugins: [
    // Include Flowbite plugin
    flowbite.plugin(),
  ],
};