/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Custom CSS variable
        foreground: "var(--foreground)", 
        todoBlue: '#4EA8DE', 
        appPurple: '#5E60CE', 
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Custom font
      },
    },
  },
  plugins: [],
};
