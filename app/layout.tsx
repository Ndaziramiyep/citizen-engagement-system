import type React from "react"
import { Inter } from "next/font/google"
import Link from "next/link"
import { Bell, Menu, User } from "lucide-react"

import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { AuthProvider } from "@/lib/auth-context"

import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Citizen Engagement System",
  description: "Submit and track complaints about public services",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} forcedTheme="light">
          <AuthProvider>
            <div className="flex flex-col min-h-screen">
              <nav className="border-b bg-[#0056b3] text-white">
                <div className="container mx-auto max-w-6xl px-4 md:px-6 lg:px-8">
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                          <nav className="flex flex-col gap-4 mt-8">
                            <Link
                              href="/"
                              className="text-foreground hover:text-[#0056b3] transition-colors px-2 py-1 rounded-md"
                            >
                              Home
                            </Link>
                            <Link
                              href="/submit"
                              className="text-foreground hover:text-[#0056b3] transition-colors px-2 py-1 rounded-md"
                            >
                              Submit
                            </Link>
                            <Link
                              href="/track"
                              className="text-foreground hover:text-[#0056b3] transition-colors px-2 py-1 rounded-md"
                            >
                              Track
                            </Link>
                            <Link
                              href="/faq"
                              className="text-foreground hover:text-[#0056b3] transition-colors px-2 py-1 rounded-md"
                            >
                              FAQ
                            </Link>
                            <Link
                              href="/notifications"
                              className="text-foreground hover:text-[#0056b3] transition-colors px-2 py-1 rounded-md"
                            >
                              Notifications
                            </Link>
                            <Link
                              href="/login"
                              className="text-foreground hover:text-[#0056b3] transition-colors px-2 py-1 rounded-md"
                            >
                              Login
                            </Link>
                          </nav>
                        </SheetContent>
                      </Sheet>
                      <Link href="/" className="text-xl font-bold text-white">
                        CES
                      </Link>
                      <nav className="hidden md:flex ml-8 gap-6">
                        <Link href="/" className="text-white hover:text-[#ffa500] transition-colors">
                          Home
                        </Link>
                        <Link href="/submit" className="text-white hover:text-[#ffa500] transition-colors">
                          Submit
                        </Link>
                        <Link href="/track" className="text-white hover:text-[#ffa500] transition-colors">
                          Track
                        </Link>
                        <Link href="/faq" className="text-white hover:text-[#ffa500] transition-colors">
                          FAQ
                        </Link>
                        <Link href="/notifications" className="text-white hover:text-[#ffa500] transition-colors">
                          Notifications
                        </Link>
                      </nav>
                    </div>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="icon" className="relative" asChild>
                        <Link href="/notifications">
                          <Bell className="h-5 w-5" />
                          <span className="sr-only">Notifications</span>
                          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="secondary"
                        size="sm"
                        className="bg-[#ffa500] hover:bg-[#ff8c00] text-white"
                      >
                        <Link href="/login">
                          <User className="h-4 w-4 mr-2" />
                          Login
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </nav>
              <main className="flex-1">{children}</main>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
