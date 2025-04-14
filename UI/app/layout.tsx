import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Krutrim Spardha</title>
        <meta name="description" content="Compare different LLM models" />
      </head>
      <body className="bg-[#141414]">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="min-h-screen">
            <header className="w-full h-16 bg-[#6d28d9] flex items-center px-6">
              <h1 className="text-white font-bold text-xl">Krutrim Spardha</h1>
            </header>
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'

export const metadata = {
      generator: 'v0.dev'
    };
