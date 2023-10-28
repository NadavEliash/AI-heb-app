import './globals.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { heIL } from "@clerk/localizations";
import { Inter } from 'next/font/google'
import { Fredoka } from "next/font/google"
import ProModal from '@/components/pro-modal';

const inter = Inter({ subsets: ['latin'] })
const fredoka = Fredoka({ weight: "400", subsets: ["hebrew"] })


export const metadata: Metadata = {
  title: 'בינה עברית',
  description: 'AI platform in hebrew',
  icons: { icon: { url: 'https://www.svgrepo.com/show/313089/artificial-intelligence.svg' } },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider localization={heIL}>
      <html dir='rtl'>
        <body className={fredoka.className}>
          <ProModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}