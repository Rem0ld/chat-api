const defaultConfig = require("tailwindcss/defaultConfig");
const formsPlugin = require("@tailwindcss/forms");
const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: ["index.html", "src/**/*.tsx", "src/**/*.ts"],
  theme: {
    fontFamily: {
      sans: ["Inter var", defaultConfig.theme.fontFamily.sans],
    },
    colors: {
      transparent: "transparent",
      white: colors.white,
      skyScanner: "#0770E3",
      lastMinutes: "#EC008C",
      kayak: "#FF690F",
      goVoyages: "#A5C73C",
      red: colors.red,
      green: colors.lime,
      gray: colors.warmGray,
      primary: {
        DEFAULT: "#84CC16",
      },
      secondary: "#064E3B",
      tertiary: "#BEF264",
    },
    boxShadow: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      DEFAULT:
        "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.3)",
      inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      none: "none",
      special: "2px 2px 2px 0px rgba(0, 0, 0, 0.25);",
      hover: "1px 1px 2px 1px rgb(0 0 0 / 25%)",
    },
    minHeight: {
      0: "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      8: "2rem",
      10: "2.5rem",
      full: "100%",
      screen: "100vh",
    },
    outline: {
      primary: "2px solid #84CC16",
      none: "2px solid transparent; outline-offset: 2px;",
    },
    maxWidth: {
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      "2/5": "40%",
      xs: "20rem",
      lg: "32rem",
      "7xl": "80rem",
    },
  },
  darkMode: "",
  plugins: [formsPlugin],
};
