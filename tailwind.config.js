module.exports = {
  prefix: '',
  purge: {
    content: [
      './src/**/*.{html,ts}',
    ],
    options: {
      safelist: [
        'h-10', 'w-10', 'mx-auto', 'object-cover', 'rounded-full', 'flex flex-col', 'justify-center', 'items-center', 'mr-3', 'mt-16',
        'bg-gray-400', 'bg-red-400', 'bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-indigo-400', 'bg-purple-400', 'bg-pink-400'
      ],
    }
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        black: {
          100: "#dfe0e4",
          200: "#c0c2c9",
          300: "#a0a3ae",
          400: "#818593",
          500: "#616678",
          600: "#4e5260",
          700: "#3a3d48",
          800: "#272930",
          900: "#131418"
        },
        transparent: 'transparent',
      },
      ringWidth: ['checked'],
      ringColor: ['checked'],
      fontFamily: {
        display: ['Fira Sans', 'Helvetica', 'sans-serif'],
        body: ['Open Sans', 'Helvetica', 'sans-serif']
      },
      boxShadow: {
        sidebar: '4px 0 6px -1px rgba(0, 0, 0, 0.1), 2px 0 4px -1px rgba(0, 0, 0, 0.06)'
      },
      scale: {
        '175': '1.75',
        '200': '2',
      },
      zIndex: {
        '100': 100
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled', 'checked'],
      cursor: ['disabled'],
      opacity: ['disabled'],
      ringWidth: ['hover'],
      borderColor: ['checked'],
      inset: ['checked'],
      zIndex: ['hover', 'active'],
      lineClamp: ['responsive']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/jit'),
    require('@tailwindcss/line-clamp'),
    require('autoprefixer'),
  ],
};
