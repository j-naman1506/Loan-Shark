module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        0: "#FFF9EC",
        // "shade-1": "#FFDCCC",
        // "shade-2": "#FCB1A6",
        // "shade-3": "#FB6376",
        // "shade-4": "#5D2A42",
        shade: {
          100: "#D8F3DC",
          200: "#B7E4C7",
          300: "#95D5B2",
          400: "#74C69D",
          500: "#52B788",
          600: "#40916C",
          700: "#2D6A4F",
          800: "#1B4332",
          900: "#081C15",
        },
      },
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
        roboto: ["Roboto Flex", "sans-serif"],
      },
    },
  },
  plugins: [],
};
