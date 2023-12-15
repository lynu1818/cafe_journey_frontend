'use client'
import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'
import {AuthContext} from "@/components/contexts";

import '@/styles/tailwind.css'
import {useState} from "react";

export const metadata = {
  title: {
    template: '%s - Cafe Journey',
    default: 'Cafe Journey',
  },
  description:
    'Cafe Journey',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className="flex h-full flex-col">
      <AuthContext.Provider value={{user, setUser}}>
        {children}
      </AuthContext.Provider>
      </body>
    </html>
  )
}
