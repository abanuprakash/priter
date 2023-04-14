/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      bodyBg: "#f1f5f9",
      lightBg: "#fcfcfc",
      white: "#ffffff",
      black: "#464646",
      subBlack: "#8b8b8b",
      green: "#70e000",
      lightGreen: "#b9f67ca1",
      darkGreen: "#004B23",
      midGreen: "#38B000",
      lightBlack: "#4646468c",
      red: "#ff4d5f",
      lightGrey: "#ece7e7",
      blue: "#3d5af1",
    },
    extend: {},
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/line-clamp"),
  ],
};
