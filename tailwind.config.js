module.exports = {
  prefix: "bb-",
  plugins: [require("@tailwindcss/ui")],
  purge: ["./src/**/*.css", "./src/**/*.js", "./src/**/*.jsx"],
  future: {
    removeDeprecatedGapUtilities: true,
  },
};
