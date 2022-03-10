module.exports = {
  mode: 'jit',
  content: ['./src/*.{html,js,ts,tsx,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
