'use client'

import { Geist, Geist_Mono } from 'next/font/google'
import './styles/globals.css'
import '@photo-fiesta/ui-lib/style.css'
import { Header } from '@/widgets'
import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/lib/graphQL/apollo-client'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ApolloProvider client={client}>
          <Header />
          <main>{children}</main>
        </ApolloProvider>
      </body>
    </html>
  )
}
