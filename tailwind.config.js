module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media",
  theme: {
    extend: {
      backgroundImage: {
        "blue-gradient":
          "linear-gradient(134deg, #194671 -1.55%, #003262 56.64%, #001931 89.04%)",
        "gold-gradient": "linear-gradient(180deg, #FDB515 86.5%, #976C0D 100%)",
      },
      colors: {
        calBlue: {
          DEFAULT: "#001931",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("daisyui"),
    function ({ addUtilities }) {
      const newUtilities = {
        ".bg-clip-text": {
          "background-clip": "text",
          "-webkit-background-clip": "text",
        },
        ".text-fill-transparent": {
          "-webkit-text-fill-color": "transparent",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
