// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

import { tailwindConfig } from '@storefront-ui/react/tailwind-config';
import sfTypography from '@storefront-ui/typography';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [tailwindConfig],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@storefront-ui/react/**/*.{js,mjs}',
  ],
  theme: {
    colors: {
      footer: '#C10016',
      white: '#fff',
      black: '#000',
    },
    fontFamily: {
      // extend: {
      //   sfTypography: ({ theme }) => ({
      //     heading: {
      //       fontSize: theme('fontSize.4xl'),
      //       lineHeight: '1.1',
      //     },
      //     label: {
      //       fontSize: theme('fontSize.xs'),
      //       lineHeight: theme('lineHeight.4'),
      //       fontWeight: theme('fontWeight.light'),
      //     },
      //     'headline-2': {
      //       fontSize: theme('fontSize.4xl'),
      //       lineHeight: '1.1',
      //     },
      //     'headline-8': {
      //       fontSize: theme('fontSize.xs'),
      //       lineHeight: theme('lineHeight.4'),
      //       fontWeight: theme('fontWeight.light'),
      //     },
      //   }),
      // },
    },
    extend: {},
  },
  plugins: [sfTypography],
};
