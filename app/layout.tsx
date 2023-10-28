import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { heIL } from "@clerk/localizations"
import { Fredoka } from "next/font/google"
import ProModal from '@/components/pro-modal'

const fredoka = Fredoka({ weight: "400", subsets: ['hebrew'] })


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
          <link rel='icon' href='https://www.svgrepo.com/show/352965/ai.svg' sizes='any' />
        </head>
        <body className={fredoka.className}>
          <ProModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}