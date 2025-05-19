"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Download, Search, Shield, UserPlus } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for users
const users = [
  {
    id: "GOV-001",
    name: "Public Works Official",
    email: "works@gov.example.com",
    role: "Government",
    status: "Active",
    department: "Public Works Department",
    categories: ["Roads & Infrastructure", "Public Transport"],
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
    categories: ["Water Supply"],
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
    categories: ["Electricity"],
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
    categories: ["Waste Management"],
    lastActive: "May 16, 2023",
    registeredDate: "Jan 5, 2023",
  },
  {
    id: "GOV-005",
    name: "Parks & Recreation Official",
    email: "parks@gov.example.com",
    role: "Government",
    status: "Inactive",
    department: "Parks & Recreation Department",
    categories: ["Parks & Recreation"],
    lastActive: "Apr 20, 2023",
    registeredDate: "Jan 10, 2023",
  },
  {
    id: "GOV-006",
    name: "Healthcare Services Official",
    email: "healthcare@gov.example.com",
    role: "Government",
    status: "Active",
    department: "Healthcare Department",
    categories: ["Healthcare Services"],
    lastActive: "May 12, 2023",
    registeredDate: "Feb 15, 2023",
  },
  {
    id: "GOV-007",
    name: "Education Department Official",
    email: "education@gov.example.com",
    role: "Government",
    status: "Active",
    department: "Education Department",
    categories: ["Education"],
    lastActive: "May 10, 2023",
    registeredDate: "Mar 1, 2023",
  },
  {
    id: "GOV-008",
    name: "Public Safety Official",
    email: "safety@gov.example.com",
    role: "Government",
    status: "Active",
    department: "Public Safety Department",
    categories: ["Public Safety"],
    lastActive: "May 15, 2023",
    registeredDate: "Mar 10, 2023",
  },
]

// Available categories
const categories = [
  "Roads & Infrastructure",
  "Water Supply",
  "Electricity",
  "Waste Management",
  "Public Transport",
  "Healthcare Services",
  "Education",
  "Public Safety",
  "Parks & Recreation",
]

export default function ManageUsers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isEditUserOpen, setIsEditUserOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.department.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDepartment =
      departmentFilter === "all" || user.department.toLowerCase().includes(departmentFilter.toLowerCase())

    const matchesCategory =
      categoryFilter === "all" ||
      user.categories.some((cat) => cat.toLowerCase().includes(categoryFilter.toLowerCase()))

    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()

    return matchesSearch && matchesDepartment && matchesCategory && matchesStatus
  })

  // Get unique departments for filter dropdown
  const departments = Array.from(new Set(users.map((user) => user.department)))

  const handleEditUser = (user: (typeof users)[0]) => {
    setSelectedUser(user)
    setIsEditUserOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/admin/dashboard/users">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Users
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Government Officials</h1>
          <p className="text-muted-foreground">
            Assign officials to departments and categories, and manage their permissions.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
            <DialogTrigger asChild>
              <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                <UserPlus className="h-4 w-4 mr-2" />
                Add Official
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Add New Government Official</DialogTitle>
                <DialogDescription>
                  Create a new account for a government official and assign them to departments and categories.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept.toLowerCase().replace(/\s+/g, "-")}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Categories</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox id={`category-${category.toLowerCase().replace(/\s+/g, "-")}`} />
                        <Label
                          htmlFor={`category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-sm font-normal"
                        >
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="view-complaints" className="text-sm font-normal">
                        View Complaints
                      </Label>
                      <Switch id="view-complaints" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="update-status" className="text-sm font-normal">
                        Update Status
                      </Label>
                      <Switch id="update-status" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="assign-complaints" className="text-sm font-normal">
                        Assign Complaints
                      </Label>
                      <Switch id="assign-complaints" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="message-citizens" className="text-sm font-normal">
                        Message Citizens
                      </Label>
                      <Switch id="message-citizens" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="view-analytics" className="text-sm font-normal">
                        View Analytics
                      </Label>
                      <Switch id="view-analytics" />
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">Add Official</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Government Officials</CardTitle>
          <CardDescription>Manage officials who handle citizen complaints and feedback.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search officials..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map((dept) => (
                  <SelectItem key={dept} value={dept.toLowerCase()}>
                    {dept}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
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

          <div className="space-y-4">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <Shield className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No officials found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  No government officials match your current filters. Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              filteredUsers.map((user) => (
                <div key={user.id} className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{user.name}</h3>
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
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <p>{user.email}</p>
                          <p>ID: {user.id}</p>
                          <p>Last Active: {user.lastActive}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col md:items-end gap-2">
                      <div className="text-sm">
                        <p className="font-medium">{user.department}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.categories.map((category) => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleEditUser(user)}>
                          Edit
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>User Actions</DropdownMenuLabel>
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>View Assigned Complaints</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            {user.status === "Active" ? (
                              <DropdownMenuItem className="text-red-600">Deactivate Account</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-green-600">Activate Account</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredUsers.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> officials
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
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditUserOpen} onOpenChange={setIsEditUserOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Government Official</DialogTitle>
            <DialogDescription>Update information and permissions for {selectedUser?.name}.</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-first-name">First Name</Label>
                  <Input id="edit-first-name" defaultValue={selectedUser.name.split(" ")[0]} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-last-name">Last Name</Label>
                  <Input id="edit-last-name" defaultValue={selectedUser.name.split(" ")[1]} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">Email Address</Label>
                <Input id="edit-email" type="email" defaultValue={selectedUser.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-department">Department</Label>
                <Select defaultValue={selectedUser.department.toLowerCase().replace(/\s+/g, "-")}>
                  <SelectTrigger id="edit-department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept.toLowerCase().replace(/\s+/g, "-")}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Categories</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                        defaultChecked={selectedUser.categories.includes(category)}
                      />
                      <Label
                        htmlFor={`edit-category-${category.toLowerCase().replace(/\s+/g, "-")}`}
                        className="text-sm font-normal"
                      >
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Account Status</Label>
                <div className="flex items-center justify-between mt-2">
                  <Label htmlFor="account-status" className="text-sm font-normal">
                    Active Account
                  </Label>
                  <Switch id="account-status" defaultChecked={selectedUser.status === "Active"} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Permissions</Label>
                <div className="space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="edit-view-complaints" className="text-sm font-normal">
                      View Complaints
                    </Label>
                    <Switch id="edit-view-complaints" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="edit-update-status" className="text-sm font-normal">
                      Update Status
                    </Label>
                    <Switch id="edit-update-status" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="edit-assign-complaints" className="text-sm font-normal">
                      Assign Complaints
                    </Label>
                    <Switch id="edit-assign-complaints" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="edit-message-citizens" className="text-sm font-normal">
                      Message Citizens
                    </Label>
                    <Switch id="edit-message-citizens" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="edit-view-analytics" className="text-sm font-normal">
                      View Analytics
                    </Label>
                    <Switch id="edit-view-analytics" defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUserOpen(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
