import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { heIL } from "@clerk/localizations"
import { Fredoka } from "next/font/google"
import { NextFont } from 'next/dist/compiled/@next/font'

const fredoka = Fredoka({ weight: "400", subsets: ['hebrew'] }) as NextFont


export const metadata: Metadata = {
  title: 'בינה עברית',
  description: 'AI platform in hebrew',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={heIL}>
      <html dir='rtl'>
        <head>
          <link rel='icon' href='icon.svg' sizes='any' />
        </head>
        <body className={`${fredoka.className}`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}