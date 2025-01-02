/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-gray": "rgba(27, 27, 27, 0.26)",
      },

      backgroundImage: {
        passiveColor:
          "radial-gradient(circle at 50% 50%, rgb(164,124,243), rgb(104,63,234))",
      },
      boxShadow: {
        customShadow:
          // 'rgba(255,255,255,0.25) 0px 2px 1px 0px inset, rgba(0,0,0,0.25) 0px -4px 4px 0px inset, rgba(255,255,255,0.1) 0px 0px 1px 4px, rgba(104,63,234,0.4) 0px 2px 60px 0px',
          // ' rgba(255,255,255,0.1) 0px 0px 1px 4px, rgba(104,63,234,0.4) 0px 4px 120px 0px',
          "rgba(255,255,255,0.1) 0px 0px 1px 4px, rgba(104,63,234,0.4) 0px 8px 250px 70px",
      },
      animation: {
        navbar: "navbar 500ms ease-in-out forwards",
        wordScale: "wordScale 0.5s ease-in-out forwards",
        wordScaleDelay200: "wordScale 0.5s ease-in-out 0.1s forwards",
        wordScaleDelay400: "wordScale 0.5s ease-in-out 0.2s forwards",
        wordScaleDelay600: "wordScale 0.5s ease-in-out 0.3s forwards",
      },
      keyframes: {
        wordScale: {
          "0%": { transform: "scale(0)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        navbar: {
          "0%": { height: "0px" },
          "100%": { height: "11%" },
        },
      },
    },
  },
  plugins: [
    plugin(({ theme, addUtilities }) => {
      const neonUtilities = {};
      const colors = theme("colors");
      for (const color in colors) {
        if (typeof colors[color] === "object") {
          const color1 = colors[color]["500"];
          const color2 = colors[color]["700"];
          neonUtilities[`.neon-${color}`] = {
            transition: "transform 0.25s ease, box-shadow 0.25s ease",
            transform: "scale(1)",
            boxShadow: `0 0 5px ${color1}, 0 0 20px ${color2}`,
            "&:hover": {
              transform: "scale(1.01)",
              boxShadow: `0 0 5px ${color1}, 0 0 40px ${color2}`,
            },
          };
          neonUtilities[`.neon-${color}-shadow`] = {
            boxShadow: `0 0 5px ${color1}, 0 0 30px ${color2}`,
          };
          neonUtilities[`.neon-${color}-text`] = {
            textShadow: `0 0 5px ${color1}, 0 0 30px ${color2}`,
          };
        }
      }
      addUtilities(neonUtilities);
    }),
  ],
};

