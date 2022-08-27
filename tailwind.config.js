function generateGridColumns(lastValue) {
  let obj = {};
  for (let i = 13; i < lastValue; i++) {
    obj[`${i}`] = `repeat(${i}, minmax(auto, 1fr))`;
  }
  return obj;
}

const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  safelist: [
    {
      pattern: /grid-cols-./,
    },
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        ...generateGridColumns(50),
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      screens: {
        xs: '475px',
        xxs: '390px',
        ...defaultTheme.screens,
      },
    },
  },
  plugins: [],
};
