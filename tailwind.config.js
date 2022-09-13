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
        "Lavender-Blue":"#D1D2F9",
        "Blue-Gray":"#7796CB",
        "DarkBlueGray":"#576490",
        "BabyBlueEyes":"#A3BCF9",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(10deg)"},
          "50%": {transform: "rotate(-10deg)"}
        },
        expand: {
          "0%,50%": {
              transform: "scale(0)"
         },
         "100%":{transform: "scale(1)"}
         }
       },
      animation: {
         wiggle:"wiggle 700ms ease-in-out",
         expand:" expand 1s ease-in"
      },
      rotate:{
        "0/1":"0.5deg"
      }
    },
  },
  plugins: [
     require("@tailwindcss/forms"),
     require('tailwind-scrollbar'),
  ],
}
