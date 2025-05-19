import type React from "react"
import Link from "next/link"
import { BarChart3, LayoutDashboard, LogOut, MessageSquare, Settings, User, Users } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <div className="md:hidden flex items-center p-4 border-b bg-[#0056b3] text-white">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="secondary" size="icon" className="bg-white/20 hover:bg-white/30 text-white border-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex items-center gap-3 mb-6 mt-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">Admin User</h3>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </div>
              <nav className="flex flex-col gap-4">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-2 py-1 rounded-md"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/admin/dashboard/complaints"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-2 py-1 rounded-md"
                >
                  <MessageSquare className="h-5 w-5" />
                  Complaints
                </Link>
                <Link
                  href="/admin/dashboard/analytics"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-2 py-1 rounded-md"
                >
                  <BarChart3 className="h-5 w-5" />
                  Analytics
                </Link>
                <Link
                  href="/admin/dashboard/users"
                  className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-2 py-1 rounded-md"
                >
                  <Users className="h-5 w-5" />
                  Users
                </Link>
                <Link
                  href="/admin/dashboard/settings"
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
          <div className="ml-4 text-xl font-bold">Admin Dashboard</div>
        </div>
        <aside className="hidden md:flex w-64 flex-col border-r bg-muted/40">
          <div className="p-4 border-b bg-[#0056b3] text-white">
            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10 border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">Admin User</h3>
                <p className="text-xs text-white/80">Administrator</p>
              </div>
            </div>
            <div className="flex justify-between">
              <Button
                variant="secondary"
                size="sm"
                asChild
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Link href="/admin/dashboard/profile">
                  <User className="h-3 w-3 mr-1" />
                  Profile
                </Link>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                asChild
                className="bg-white/20 hover:bg-white/30 text-white border-0"
              >
                <Link href="/">
                  <LogOut className="h-3 w-3 mr-1" />
                  Logout
                </Link>
              </Button>
            </div>
          </div>
          <nav className="flex-1 space-y-1 p-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-[#0056b3]/10 hover:text-[#0056b3] transition-all"
            >
              <LayoutDashboard className="h-5 w-5" />
              Dashboard
            </Link>
            <Link
              href="/admin/dashboard/complaints"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-[#0056b3]/10 hover:text-[#0056b3] transition-all"
            >
              <MessageSquare className="h-5 w-5" />
              Complaints
            </Link>
            <Link
              href="/admin/dashboard/analytics"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-[#0056b3]/10 hover:text-[#0056b3] transition-all"
            >
              <BarChart3 className="h-5 w-5" />
              Analytics
            </Link>
            <Link
              href="/admin/dashboard/users"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-[#0056b3]/10 hover:text-[#0056b3] transition-all"
            >
              <Users className="h-5 w-5" />
              Users
            </Link>
            <Link
              href="/admin/dashboard/settings"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-[#0056b3]/10 hover:text-[#0056b3] transition-all"
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
