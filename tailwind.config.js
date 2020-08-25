module.exports = {
  prefix: "bb-",
  plugins: [require("@tailwindcss/ui")],
  purge: {
    enabled: true,
    content: ["./src/**/*.css", "./src/**/*.js", "./src/**/*.jsx"],
  },
};
