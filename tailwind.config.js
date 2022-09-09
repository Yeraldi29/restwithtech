/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      backgroundColor:{
        "Lavender-Blue":"#D1D2F9",
        "BabyBlueEyes":"#A3BCF9",
        "DarkBlueGray":"#576490",
        "Blue-Gray":"#7796CB"
      },
      colors:{ 
        "Blue-Gray":"#7796CB",
        "BabyBlueEyes":"#A3BCF9",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(48deg)"},
          "50%": {transform: "rotate(-48deg)"}
        }
       },
       animation: {
          wiggle:"wiggle 700ms ease-in-out"
       }
    },
  },
  plugins: [
     require("@tailwindcss/forms")
  ],
}
