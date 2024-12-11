/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./main.js", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["dracula"],
  },
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
};
