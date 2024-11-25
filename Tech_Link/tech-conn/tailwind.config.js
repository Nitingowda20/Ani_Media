// const flowbite = require("flowbite-react/tailwind");

// /** @type {import('tailwindcss').Config} */

// module.exports = {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
//   plugins: [
//     // ...
//     flowbite.plugin(),
//     require("tailwind-scrollbar"),
//   ],
// };

const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  darkMode: "class", // Enable dark mode using the "class" strategy
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.8s ease-out forwards",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
    require("tailwind-scrollbar"),
    // Add additional plugins if needed
  ],
};
