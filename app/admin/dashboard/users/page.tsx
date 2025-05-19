"use client"

import { useState } from "react"
import { Download, MoreHorizontal, Plus, Search, UserPlus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

// Mock data for users
const users = [
  {
    id: "USR-001",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Citizen",
    status: "Active",
    complaints: 5,
    lastActive: "May 15, 2023",
    registeredDate: "Jan 15, 2023",
  },
  {
    id: "USR-002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Citizen",
    status: "Active",
    complaints: 3,
    lastActive: "May 14, 2023",
    registeredDate: "Feb 20, 2023",
  },
  {
    id: "USR-003",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "Citizen",
    status: "Active",
    complaints: 2,
    lastActive: "May 12, 2023",
    registeredDate: "Mar 5, 2023",
  },
  {
    id: "USR-004",
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    role: "Citizen",
    status: "Inactive",
    complaints: 1,
    lastActive: "Apr 30, 2023",
    registeredDate: "Mar 15, 2023",
  },
  {
    id: "USR-005",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    role: "Citizen",
    status: "Active",
    complaints: 4,
    lastActive: "May 16, 2023",
    registeredDate: "Jan 10, 2023",
  },
  {
    id: "ADM-001",
    name: "Admin User",
    email: "admin@gov.example.com",
    role: "Admin",
    status: "Active",
    department: "System Administration",
    lastActive: "May 16, 2023",
    registeredDate: "Jan 1, 2023",
  },
  {
    id: "GOV-001",
    name: "Public Works Official",
    email: "works@gov.example.com",
    role: "Government",
    status: "Active",
    department: "Public Works Department",
    lastActive: "May 16, 2023",
    registeredDate: "Jan 5, 2023",
  },
  {
    id: "GOV-002",
    name: "Water Department Official",
    email: "water@gov.example.com",
    role: "Government",
    status: "Active",
    department: "Water Department",
    lastActive: "May 15, 2023",
    registeredDate: "Jan 5, 2023",
  },
  {
    id: "GOV-003",
    name: "Electricity Department Official",
    email: "electricity@gov.example.com",
    role: "Government",
    status: "Active",
    department: "Electricity Department",
    lastActive: "May 14, 2023",
    registeredDate: "Jan 5, 2023",
  },
  {
    id: "GOV-004",
    name: "Waste Management Official",
    email: "waste@gov.example.com",
    role: "Government",
    status: "Active",
    department: "Waste Management Department",
    lastActive: "May 16, 2023",
    registeredDate: "Jan 5, 2023",
  },
]

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()

    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesRole && matchesStatus
  })

  const citizenUsers = users.filter((user) => user.role === "Citizen")
  const governmentUsers = users.filter((user) => user.role === "Government")
  const adminUsers = users.filter((user) => user.role === "Admin")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">Manage citizens, government officials, and administrators.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>View and manage all users in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all-users">
            <TabsList className="mb-4">
              <TabsTrigger value="all-users">All Users ({users.length})</TabsTrigger>
              <TabsTrigger value="citizens">Citizens ({citizenUsers.length})</TabsTrigger>
              <TabsTrigger value="government">Government ({governmentUsers.length})</TabsTrigger>
              <TabsTrigger value="admins">Admins ({adminUsers.length})</TabsTrigger>
            </TabsList>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="citizen">Citizen</SelectItem>
                  <SelectItem value="government">Government</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <TabsContent value="all-users">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead className="hidden md:table-cell">ID</TableHead>
                      <TableHead className="hidden md:table-cell">Role</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No users found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{user.id}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge
                              variant="outline"
                              className={
                                user.role === "Admin"
                                  ? "bg-purple-100 text-purple-800 border-purple-200"
                                  : user.role === "Government"
                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                    : "bg-green-100 text-green-800 border-green-200"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge
                              variant="outline"
                              className={
                                user.status === "Active"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{user.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                {user.status === "Active" ? (
                                  <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="citizens">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead className="hidden md:table-cell">ID</TableHead>
                      <TableHead className="hidden md:table-cell">Complaints</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Registered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {citizenUsers
                      .filter((user) => {
                        const matchesSearch =
                          searchQuery === "" ||
                          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())

                        const matchesStatus =
                          statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()

                        return matchesSearch && matchesStatus
                      })
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{user.id}</TableCell>
                          <TableCell className="hidden md:table-cell">{user.complaints}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge
                              variant="outline"
                              className={
                                user.status === "Active"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{user.registeredDate}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>View Complaints</DropdownMenuItem>
                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                {user.status === "Active" ? (
                                  <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="government">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead className="hidden md:table-cell">ID</TableHead>
                      <TableHead className="hidden md:table-cell">Department</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {governmentUsers
                      .filter((user) => {
                        const matchesSearch =
                          searchQuery === "" ||
                          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (user.department && user.department.toLowerCase().includes(searchQuery.toLowerCase()))

                        const matchesStatus =
                          statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()

                        return matchesSearch && matchesStatus
                      })
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{user.id}</TableCell>
                          <TableCell className="hidden md:table-cell">{user.department}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge
                              variant="outline"
                              className={
                                user.status === "Active"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{user.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                {user.status === "Active" ? (
                                  <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="admins">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead className="hidden md:table-cell">ID</TableHead>
                      <TableHead className="hidden md:table-cell">Department</TableHead>
                      <TableHead className="hidden md:table-cell">Status</TableHead>
                      <TableHead className="hidden lg:table-cell">Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {adminUsers
                      .filter((user) => {
                        const matchesSearch =
                          searchQuery === "" ||
                          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())

                        const matchesStatus =
                          statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()

                        return matchesSearch && matchesStatus
                      })
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
                                <AvatarFallback>
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">{user.id}</TableCell>
                          <TableCell className="hidden md:table-cell">{user.department}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge
                              variant="outline"
                              className={
                                user.status === "Active"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-red-100 text-red-800 border-red-200"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{user.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem>View Profile</DropdownMenuItem>
                                <DropdownMenuItem>Edit User</DropdownMenuItem>
                                <DropdownMenuItem>Manage Permissions</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                {user.status === "Active" ? (
                                  <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm">
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent User Activity</CardTitle>
            <CardDescription>Latest user registrations and logins</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New Registration", user: "Emily Davis", time: "2 hours ago" },
                { action: "Login", user: "John Doe", time: "3 hours ago" },
                { action: "Login", user: "Admin User", time: "5 hours ago" },
                { action: "Password Reset", user: "Sarah Williams", time: "1 day ago" },
                { action: "New Registration", user: "Thomas Anderson", time: "2 days ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Plus className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.user} • {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Statistics</CardTitle>
            <CardDescription>Overview of user growth and activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Total Users</div>
                  <div className="text-2xl font-bold">256</div>
                  <div className="text-xs text-green-600">+12% from last month</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Active Users</div>
                  <div className="text-2xl font-bold">230</div>
                  <div className="text-xs text-green-600">+8% from last month</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">New Users (30d)</div>
                  <div className="text-2xl font-bold">24</div>
                  <div className="text-xs text-green-600">+15% from last month</div>
                </div>
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium text-muted-foreground">Avg. Complaints</div>
                  <div className="text-2xl font-bold">3.2</div>
                  <div className="text-xs text-muted-foreground">per active user</div>
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium mb-2">User Role Distribution</div>
                <div className="flex items-center gap-2">
                  <div
                    className="bg-blue-500 h-4 rounded-sm"
                    style={{ width: `${(citizenUsers.length / users.length) * 100}%` }}
                  ></div>
                  <div
                    className="bg-green-500 h-4 rounded-sm"
                    style={{ width: `${(governmentUsers.length / users.length) * 100}%` }}
                  ></div>
                  <div
                    className="bg-purple-500 h-4 rounded-sm"
                    style={{ width: `${(adminUsers.length / users.length) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-2">
                  <div>Citizens: {citizenUsers.length}</div>
                  <div>Government: {governmentUsers.length}</div>
                  <div>Admins: {adminUsers.length}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
