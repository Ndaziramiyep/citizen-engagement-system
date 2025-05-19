"use client";

import type React from "react"
import Link from "next/link"
import { LayoutDashboard, LogOut, MessageSquare, Settings, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from '@/lib/auth-context'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="md:hidden flex items-center p-4 border-b">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex items-center gap-3 mb-6 mt-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{user ? `${user.firstName} ${user.lastName}` : "User"}</h3>
                  <p className="text-xs text-muted-foreground">Citizen</p>
                </div>
              </div>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-2 py-1 rounded-md"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/complaints"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-2 py-1 rounded-md"
                >
                  <MessageSquare className="h-5 w-5" />
                  My Complaints
                </Link>
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-2 py-1 rounded-md"
                >
                  <User className="h-5 w-5" />
                  Profile
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-2 py-1 rounded-md"
                >
                  <Settings className="h-5 w-5" />
                  Settings
                </Link>
                <div className="border-t my-2 pt-2">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-2 py-1 rounded-md"
                  >
                    <LogOut className="h-5 w-5" />
                    Logout
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-4 text-xl font-bold">Dashboard</div>
        </div>
        <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{user ? `${user.firstName} ${user.lastName}` : "User"}</h3>
                <p className="text-xs text-muted-foreground">Citizen</p>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard/profile">
                  <User className="h-3 w-3 mr-1" />
                  Profile
                </Link>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link href="/">
                  <LogOut className="h-3 w-3 mr-1" />
                  Logout
                </Link>
              </Button>
            </div>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/complaints"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <MessageSquare className="h-5 w-5" />
              My Complaints
            </Link>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <User className="h-5 w-5" />
              Profile
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
            >
              <Settings className="h-5 w-5" />
              Settings
            </Link>
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}

function Menu(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}
