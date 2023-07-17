/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content:  ['src/**/*.{ts,tsx}'],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "yekan-regular": ["IRANYekanRegular", "sans-serif"],
        "yekan-medium": ["IRANYekanMedium", "sans-serif"],
        "yekan-bold": ["IRANYekanBold", "sans-serif"],
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-rtl")],

  prefix: 'cls-'
}

