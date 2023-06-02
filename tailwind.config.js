module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        component: 'var(--component-background)'
      },
      boxShadow: {
        card: '0 0 30px 0 rgb(82 63 105 / 5%);'
      }
    }
  },
  plugins: []
}
