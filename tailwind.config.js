/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.{ts,tsx}"],
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
        sm: "640px",
        md: "768px",
      },
      boxShadow: {
        custom:
          "0px 0px 0px 1px #FFF, 0px 0px 0px 4px rgba(116, 70, 178, 0.24)",
      },
    },
  },
  plugins: [require("daisyui"), require("tailwindcss-rtl")],

  prefix: "cls-",
};
