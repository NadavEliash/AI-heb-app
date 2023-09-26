import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { heIL } from "@clerk/localizations";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI hebrew app',
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
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}