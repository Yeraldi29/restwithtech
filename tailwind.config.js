/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],theme: {
    extend: {},
    backgroundColor:{
      'quick-silver': '#A2A7A5',
      'gainsboro': '#E2DADB'
    },
    colors:{
      'gray-light': '#5e5e5efa',
      'white-silver': '#E3E3E3',
      'dim-gray': '#6D696A'
    }
  },
  plugins: [
    require("@tailwindcss/forms")
  ],
}
