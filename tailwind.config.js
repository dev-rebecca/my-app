module.exports = {
  purge: {
    enabled: false,
    content: [
      "./public/**/*.html",
      "./public/**/*.js",
      "./src/**/*.html",
      "./src/**/*.js",
    ],
  },
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
};
