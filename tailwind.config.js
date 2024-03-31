const withMT = require('@material-tailwind/react/utils/withMT');
 
module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: '#2F6FEB',
        },
        'link-fb': "#5E76FF",
        'link-tw': "#1DBBFF",
        'link-in': "#F8079A",
        'link-yt': "#C31010",
        'nav-link': "#1BBC9B",
        'primary-link': "#00aeef",
        'primary-background': "#000000",
        'news-letter': '#6C6C6C',
        'primary-font': "#ffffff",
        'second-font': ""
      },
      borderColor: {
        'white/10': 'hsla(0, 0%, 100%, .1)',
      },
      backgroundColor: {
        'white/5': 'hsla(0, 0%, 100%, .05)',
        'white/15': 'hsla(0, 0%, 100%, .15)',
      },
      transitionDuration: {
        '200': '.2s',
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        'custom-hover': '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -4px rgba(0, 0, 0, .1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      },
    },
    variants: {
      extend: {
        boxShadow: ['hover'],
      },
   },
    keyframes: {
      shimmer: {
        '100%': {
          transform: 'translateX(100%)',
        },
      },
    },
  },
  plugins: [],
});