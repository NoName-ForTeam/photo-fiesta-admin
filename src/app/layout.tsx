'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import './styles/globals.css'
import '@photo-fiesta/ui-lib/style.css'
import { Header } from '@/widgets'
import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/lib/graphQL/apollo-client'
import { Sidebar } from '@/components'
import { usePathname } from 'next/navigation'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const pathname = usePathname()
  const showSidebar = !pathname.startsWith('/auth/login')

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ApolloProvider client={client}>
          <Header />
          <div className="flex">
            {showSidebar && <Sidebar />}
            <main className="flex-1 min-h-screen p-6">{children}</main>
          </div>
        </ApolloProvider>
      </body>
    </html>
  )
}
