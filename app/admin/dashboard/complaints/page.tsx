"use client"

import { useState } from "react"
import Link from "next/link"
import { Download, Filter, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

// Mock data for complaints
const complaints = [
  {
    id: "CES-2023-12345",
    subject: "Broken Street Light on Main Street",
    category: "Infrastructure",
    status: "In Progress",
    priority: "Medium",
    submittedBy: "John Doe",
    submittedDate: "May 10, 2023",
    assignedTo: "Public Works Department",
  },
  {
    id: "CES-2023-12346",
    subject: "Pothole on Oak Street",
    category: "Roads & Infrastructure",
    status: "New",
    priority: "High",
    submittedBy: "Jane Smith",
    submittedDate: "May 15, 2023",
    assignedTo: "Unassigned",
  },
  {
    id: "CES-2023-12347",
    subject: "Street Light Out on Elm Street",
    category: "Electricity",
    status: "New",
    priority: "Medium",
    submittedBy: "Robert Johnson",
    submittedDate: "May 15, 2023",
    assignedTo: "Unassigned",
  },
  {
    id: "CES-2023-12348",
    subject: "Missed Garbage Collection",
    category: "Waste Management",
    status: "Under Review",
    priority: "Low",
    submittedBy: "Sarah Williams",
    submittedDate: "May 14, 2023",
    assignedTo: "Waste Management Department",
  },
  {
    id: "CES-2023-12349",
    subject: "Water Leak on Main Street",
    category: "Water Supply",
    status: "Urgent",
    priority: "Urgent",
    submittedBy: "Michael Brown",
    submittedDate: "May 14, 2023",
    assignedTo: "Water Department",
  },
  {
    id: "CES-2023-12350",
    subject: "Bus Stop Damaged",
    category: "Public Transport",
    status: "New",
    priority: "Medium",
    submittedBy: "Emily Davis",
    submittedDate: "May 13, 2023",
    assignedTo: "Unassigned",
  },
  {
    id: "CES-2023-12335",
    subject: "Garbage Collection Missed",
    category: "Waste Management",
    status: "Resolved",
    priority: "Medium",
    submittedBy: "David Wilson",
    submittedDate: "April 28, 2023",
    assignedTo: "Waste Management Department",
  },
  {
    id: "CES-2023-12330",
    subject: "Park Maintenance Request",
    category: "Parks & Recreation",
    status: "Resolved",
    priority: "Low",
    submittedBy: "Lisa Martinez",
    submittedDate: "April 20, 2023",
    assignedTo: "Parks Department",
  },
  {
    id: "CES-2023-12340",
    subject: "Water Supply Issue",
    category: "Water Supply",
    status: "In Progress",
    priority: "High",
    submittedBy: "Thomas Anderson",
    submittedDate: "May 8, 2023",
    assignedTo: "Water Department",
  },
  {
    id: "CES-2023-12338",
    subject: "Playground Equipment Broken",
    category: "Parks & Recreation",
    status: "Scheduled",
    priority: "Medium",
    submittedBy: "Jennifer Taylor",
    submittedDate: "May 5, 2023",
    assignedTo: "Parks Department",
  },
]

export default function ComplaintsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedComplaints, setSelectedComplaints] = useState<string[]>([])

  // Filter complaints based on search query and filters
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      searchQuery === "" ||
      complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.submittedBy.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || complaint.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesCategory =
      categoryFilter === "all" || complaint.category.toLowerCase() === categoryFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesCategory
  })

  const toggleComplaintSelection = (id: string) => {
    setSelectedComplaints((prev) =>
      prev.includes(id) ? prev.filter((complaintId) => complaintId !== id) : [...prev, id],
    )
  }

  const toggleAllComplaints = () => {
    if (selectedComplaints.length === filteredComplaints.length) {
      setSelectedComplaints([])
    } else {
      setSelectedComplaints(filteredComplaints.map((complaint) => complaint.id))
    }
  }

  // Get unique categories for filter dropdown
  const categories = Array.from(new Set(complaints.map((complaint) => complaint.category)))

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "new":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
            New
          </Badge>
        )
      case "in progress":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
            In Progress
          </Badge>
        )
      case "under review":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
            Under Review
          </Badge>
        )
      case "scheduled":
        return (
          <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
            Scheduled
          </Badge>
        )
      case "resolved":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
            Resolved
          </Badge>
        )
      case "closed":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-200">
            Closed
          </Badge>
        )
      case "urgent":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
            Urgent
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Complaints Management</h1>
        <p className="text-muted-foreground">View, filter, and manage all citizen complaints and feedback.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Complaints</CardTitle>
          <CardDescription>A comprehensive list of all complaints submitted by citizens.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search complaints..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="under review">Under Review</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Filter className="mr-2 h-4 w-4" />
                    More Filters
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Priority</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem checked>Low</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>Medium</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>High</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>Urgent</DropdownMenuCheckboxItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Date Range</DropdownMenuLabel>
                  <DropdownMenuCheckboxItem checked>Last 7 days</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>Last 30 days</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem checked>Last 90 days</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={
                          filteredComplaints.length > 0 && selectedComplaints.length === filteredComplaints.length
                        }
                        onCheckedChange={toggleAllComplaints}
                        aria-label="Select all complaints"
                      />
                    </TableHead>
                    <TableHead className="w-[120px]">ID</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead className="hidden md:table-cell">Category</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>
                    <TableHead className="hidden lg:table-cell">Submitted By</TableHead>
                    <TableHead className="hidden lg:table-cell">Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredComplaints.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="h-24 text-center">
                        No complaints found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredComplaints.map((complaint) => (
                      <TableRow key={complaint.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedComplaints.includes(complaint.id)}
                            onCheckedChange={() => toggleComplaintSelection(complaint.id)}
                            aria-label={`Select complaint ${complaint.id}`}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{complaint.id}</TableCell>
                        <TableCell>{complaint.subject}</TableCell>
                        <TableCell className="hidden md:table-cell">{complaint.category}</TableCell>
                        <TableCell className="hidden md:table-cell">{getStatusBadge(complaint.status)}</TableCell>
                        <TableCell className="hidden lg:table-cell">{complaint.submittedBy}</TableCell>
                        <TableCell className="hidden lg:table-cell">{complaint.submittedDate}</TableCell>
                        <TableCell className="text-right">
                          <Button asChild size="sm">
                            <Link href={`/admin/dashboard/complaints/${complaint.id}`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredComplaints.length}</strong> of <strong>{complaints.length}</strong> complaints
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
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
