"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, SlidersHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for complaints
const complaints = [
  {
    id: "CES-2023-12345",
    subject: "Broken Street Light on Main Street",
    category: "Infrastructure",
    status: "In Progress",
    submittedDate: "May 10, 2023",
    lastUpdated: "May 12, 2023",
  },
  {
    id: "CES-2023-12346",
    subject: "Pothole on Oak Street",
    category: "Roads & Infrastructure",
    status: "New",
    submittedDate: "May 15, 2023",
    lastUpdated: "May 15, 2023",
  },
  {
    id: "CES-2023-12348",
    subject: "Missed Garbage Collection",
    category: "Waste Management",
    status: "Under Review",
    submittedDate: "May 14, 2023",
    lastUpdated: "May 14, 2023",
  },
  {
    id: "CES-2023-12349",
    subject: "Water Leak on Main Street",
    category: "Water Supply",
    status: "Urgent",
    submittedDate: "May 14, 2023",
    lastUpdated: "May 15, 2023",
  },
  {
    id: "CES-2023-12335",
    subject: "Garbage Collection Missed",
    category: "Waste Management",
    status: "Resolved",
    submittedDate: "April 28, 2023",
    lastUpdated: "May 1, 2023",
  },
  {
    id: "CES-2023-12330",
    subject: "Park Maintenance Request",
    category: "Parks & Recreation",
    status: "Resolved",
    submittedDate: "April 20, 2023",
    lastUpdated: "April 25, 2023",
  },
]

export default function MyComplaints() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  // Filter complaints based on search query, filters, and active tab
  const filteredComplaints = complaints.filter((complaint) => {
    const matchesSearch =
      searchQuery === "" ||
      complaint.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || complaint.status.toLowerCase() === statusFilter.toLowerCase()

    const matchesCategory =
      categoryFilter === "all" || complaint.category.toLowerCase() === categoryFilter.toLowerCase()

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && complaint.status !== "Resolved" && complaint.status !== "Closed") ||
      (activeTab === "resolved" && (complaint.status === "Resolved" || complaint.status === "Closed"))

    return matchesSearch && matchesStatus && matchesCategory && matchesTab
  })

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Complaints</h1>
          <p className="text-muted-foreground">View and track all your submitted complaints and feedback.</p>
        </div>
        <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          <Link href="/submit">Submit New Complaint</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Submissions</CardTitle>
          <CardDescription>Track the status of your complaints and feedback.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList>
              <TabsTrigger value="all">All Submissions</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="resolved">Resolved</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  More Filters
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuLabel>Date Range</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>Last 7 days</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Last 30 days</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Last 90 days</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>All time</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="space-y-4">
            {filteredComplaints.length === 0 ? (
              <div className="text-center py-12 border rounded-lg">
                <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No complaints found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  {activeTab === "all"
                    ? "You haven't submitted any complaints yet."
                    : activeTab === "active"
                      ? "You don't have any active complaints."
                      : "You don't have any resolved complaints."}
                </p>
                {activeTab !== "all" && (
                  <Button variant="link" onClick={() => setActiveTab("all")}>
                    View all submissions
                  </Button>
                )}
              </div>
            ) : (
              filteredComplaints.map((complaint) => (
                <div key={complaint.id} className="border rounded-lg p-4 hover:border-primary transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{complaint.subject}</h3>
                        {getStatusBadge(complaint.status)}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <p>ID: {complaint.id}</p>
                        <p>Category: {complaint.category}</p>
                        <p>Submitted: {complaint.submittedDate}</p>
                        <p>Last Updated: {complaint.lastUpdated}</p>
                      </div>
                    </div>
                    <Button asChild className="md:self-end">
                      <Link href={`/track?id=${complaint.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {filteredComplaints.length > 0 && (
            <div className="flex items-center justify-between mt-6">
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}
