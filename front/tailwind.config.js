/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: ['Raleway'],
      },
      spacing: {
        '88': '22rem', // 352px
        '84': '21rem', // 336px
        '90': '23rem', // 368px
        '112': '28rem',   // 448px
        '128': '32rem',   // 512px
        '144': '36rem',   // 576px
        '160': '40rem',   // 640px
        '192': '48rem',   // 768px
        '208': '52rem',   // 832px
        '224': '56rem',   // 896px
        '228': '57rem',     // 912px
        '232': '58rem',     // 928px
        '236': '59rem',     // 944px
        '240': '60rem',     // 960px
        '244': '61rem',     // 976px
        '248': '62rem',     // 992px
        '256': '64rem',   // 1024px
        '7.5xl': '88rem',
        '7.8xl': '90rem',
        '8XL': '94rem' // 1536px
      }
    },
  },
  plugins: [],
}

