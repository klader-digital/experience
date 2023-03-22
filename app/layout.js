import './globals.css'
import { gotham, gothamCondensed } from '@/app/fonts'

export const metadata = {
  title: 'Global Electronics - Journey from micro to macro',
  description:
    'Making an impact in creating successful electronics since 1993.',
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${gotham.variable} ${gothamCondensed.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
