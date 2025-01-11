/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Dark Theme Colors
        dark: {
          900: "#15171E", // bg, bgDark
          800: "#1C1E27", // bgLight, navbar, card
          700: "#191924", // card_light
          600: "#AFAFB5", // arrow
          500: "#b1b2b3", // disabled, menu_secondary_text, text_secondary
          400: "#F2F3F4", // text_primary, menu_primary_text
          300: "#00000060", // shadow
          green: "#12ff75",
          yellow: "#ffcc00",
          red: "#ef5350",
          orange: "#F7AD63",
          primary: "#007AFF", // primary
          secondary: "#9747FF", // secondary
          white: "#FFFFFF",
          black: "#000000",
        },

        // Light Theme Colors
        light: {
          900: "#f9f9f9", // bg
          800: "#FFFFFF", // bgLight, card
          700: "#242B3F", // navbar
          600: "#AFAFB5", // arrow
          500: "#b1b2b3", // disabled, menu_secondary_text
          400: "#F2F3F4", // menu_primary_text
          300: "#00000020", // shadow
          200: "#404040", // text_primary
          100: "#4d4c4c", // text_secondary
          green: "#00ff6a",
          yellow: "#e8ba00",
          red: "#ef5350",
          orange: "#F7AD63",
          primary: "#007AFF", // primary
          secondary: "#9747FF", // secondary
          white: "#FFFFFF",
          black: "#000000",
        },
      },
    },
  },
  plugins: [],
};
