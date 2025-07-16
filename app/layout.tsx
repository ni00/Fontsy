import type { Metadata } from 'next'
import { Analytics } from "@vercel/analytics/next"
import './globals.css'

export const metadata: Metadata = {
  title: 'Fontsy',
  description: 'Google Fonts Logo Generator',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
