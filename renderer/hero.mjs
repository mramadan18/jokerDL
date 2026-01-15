import { heroui } from "@heroui/theme";

export default heroui({
  themes: {
    dark: {
      colors: {
        primary: {
          DEFAULT: "#00f2ff",
          foreground: "#000000",
        },
        secondary: {
          DEFAULT: "#bc13fe",
          foreground: "#ffffff",
        },
        focus: "#00f2ff",
      },
    },
    light: {
      colors: {
        primary: {
          DEFAULT: "#0891b2", // Deeper Cyan 600
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#9333ea", // Deeper Purple 600
          foreground: "#ffffff",
        },
        focus: "#0891b2",
      },
    },
  },
});
