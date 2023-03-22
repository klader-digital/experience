import localFont from '@next/font/local';

// include local fonts 'gotham' & 'gotham-condensed'
export const gotham = localFont({
  src: './gotham-book.woff2',
  // default, can also use "swap" to ensure custom font always shows
  display: 'swap',
  variable: '--font-gotham',
});

// include local fonts 'gotham' & 'gotham-condensed'
export const gothamCondensed = localFont({
  src: [
    {
      path: './gotham-condensed-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './gotham-condensed-black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-gotham-condensed',
});
