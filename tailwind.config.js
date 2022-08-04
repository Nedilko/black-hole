function generateGridColumns(lastValue) {
  let obj = {};
  for (let i = 13; i < lastValue; i++) {
    obj[`${i}`] = `repeat(${i}, minmax(0, 1fr))`;
  }
  return obj;
}

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
        ...generateGridColumns(100), // This generates the columns from 12 until 100
      },
    },
  },
  plugins: [],
};
