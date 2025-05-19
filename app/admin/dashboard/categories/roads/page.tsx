"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, BarChart3, Download, MapPin, MoreHorizontal } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function RoadsDashboard() {
  const [timeRange, setTimeRange] = useState("last-30-days")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Roads & Infrastructure</h1>
          <p className="text-muted-foreground">Manage and analyze complaints related to roads and infrastructure.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-7-days">Last 7 Days</SelectItem>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button asChild className="bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Link href="/admin/dashboard/analytics?category=roads">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Analytics
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">78</div>
            <div className="flex items-center text-xs text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-1">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              <span>+12% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">23</div>
            <div className="flex items-center text-xs text-red-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-1">
                <path
                  fillRule="evenodd"
                  d="M12 13a1 1 0 100-2H7.414l1.293-1.293a1 1 0 10-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L7.414 13H12z"
                  clipRule="evenodd"
                />
              </svg>
              <span>+5% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">55</div>
            <div className="flex items-center text-xs text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-1">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              <span>+18% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.2 days</div>
            <div className="flex items-center text-xs text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-1">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              <span>-0.8 days from last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Complaints by Subcategory</CardTitle>
            <CardDescription>Distribution of complaints across different infrastructure types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Potholes</span>
                  <span className="font-medium">32</span>
                </div>
                <Progress value={41} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Street Lights</span>
                  <span className="font-medium">18</span>
                </div>
                <Progress value={23} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Sidewalks</span>
                  <span className="font-medium">12</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Road Signs</span>
                  <span className="font-medium">8</span>
                </div>
                <Progress value={10} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Bridges</span>
                  <span className="font-medium">5</span>
                </div>
                <Progress value={6} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Other</span>
                  <span className="font-medium">3</span>
                </div>
                <Progress value={4} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complaints by Location</CardTitle>
            <CardDescription>Areas with the highest number of infrastructure complaints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Downtown District", complaints: 24, increase: "+15%" },
                { name: "Westside Neighborhood", complaints: 18, increase: "+8%" },
                { name: "North County", complaints: 14, increase: "+10%" },
                { name: "East End", complaints: 12, increase: "-5%" },
                { name: "South District", complaints: 10, increase: "+12%" },
              ].map((area, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{area.name}</p>
                      <p className="text-sm text-muted-foreground">{area.complaints} complaints</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm ${area.increase.startsWith("+") ? "text-red-600" : "text-green-600"}`}>
                      {area.increase}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/dashboard/analytics?category=roads&view=map">
                View Map
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Complaints</CardTitle>
          <CardDescription>Latest infrastructure complaints that require attention</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="urgent">
            <TabsList className="mb-4">
              <TabsTrigger value="urgent">Urgent</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            </TabsList>
            <TabsContent value="urgent">
              <div className="space-y-4">
                {[
                  {
                    id: "CES-2023-12349",
                    subject: "Large Pothole on Main Street",
                    location: "Main Street & 5th Avenue",
                    date: "May 14, 2023",
                    status: "Urgent",
                    assignee: {
                      name: "Road Maintenance Team A",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                  },
                  {
                    id: "CES-2023-12352",
                    subject: "Collapsed Sidewalk Near School",
                    location: "123 Oak Street, Near Elementary School",
                    date: "May 15, 2023",
                    status: "Urgent",
                    assignee: {
                      name: "Infrastructure Team B",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                  },
                ].map((complaint) => (
                  <div key={complaint.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{complaint.subject}</h3>
                          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                            {complaint.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <p>ID: {complaint.id}</p>
                          <p>Location: {complaint.location}</p>
                          <p>Submitted: {complaint.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={complaint.assignee.avatar || "/placeholder.svg"}
                              alt={complaint.assignee.name}
                            />
                            <AvatarFallback>RT</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{complaint.assignee.name}</span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/dashboard/complaints/${complaint.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Reassign</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Change Priority</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="new">
              <div className="space-y-4">
                {[
                  {
                    id: "CES-2023-12355",
                    subject: "Missing Street Sign",
                    location: "Corner of Elm Street & Pine Avenue",
                    date: "May 16, 2023",
                    status: "New",
                    assignee: {
                      name: "Unassigned",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                  },
                  {
                    id: "CES-2023-12356",
                    subject: "Damaged Guardrail",
                    location: "Highway 101, Mile Marker 45",
                    date: "May 16, 2023",
                    status: "New",
                    assignee: {
                      name: "Unassigned",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                  },
                ].map((complaint) => (
                  <div key={complaint.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{complaint.subject}</h3>
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                            {complaint.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <p>ID: {complaint.id}</p>
                          <p>Location: {complaint.location}</p>
                          <p>Submitted: {complaint.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm">Assign</Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/dashboard/complaints/${complaint.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Mark as Duplicate</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Change Priority</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="in-progress">
              <div className="space-y-4">
                {[
                  {
                    id: "CES-2023-12345",
                    subject: "Broken Street Light on Main Street",
                    location: "123 Main Street, Downtown",
                    date: "May 10, 2023",
                    status: "In Progress",
                    assignee: {
                      name: "Electrical Team C",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                  },
                  {
                    id: "CES-2023-12348",
                    subject: "Cracked Sidewalk",
                    location: "456 Oak Avenue, Westside",
                    date: "May 12, 2023",
                    status: "In Progress",
                    assignee: {
                      name: "Maintenance Team A",
                      avatar: "/placeholder.svg?height=32&width=32",
                    },
                  },
                ].map((complaint) => (
                  <div key={complaint.id} className="border rounded-lg p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{complaint.subject}</h3>
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                            {complaint.status}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <p>ID: {complaint.id}</p>
                          <p>Location: {complaint.location}</p>
                          <p>Submitted: {complaint.date}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={complaint.assignee.avatar || "/placeholder.svg"}
                              alt={complaint.assignee.name}
                            />
                            <AvatarFallback>ET</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{complaint.assignee.name}</span>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/dashboard/complaints/${complaint.id}`}>View Details</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Update Status</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Reassign</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/admin/dashboard/complaints?category=roads">
              View All Road & Infrastructure Complaints
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Resolution metrics for roads & infrastructure teams</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Road Maintenance Team A", complaints: 28, resolved: 22, avgTime: 3.8 },
                { name: "Infrastructure Team B", complaints: 24, resolved: 18, avgTime: 4.2 },
                { name: "Electrical Team C", complaints: 16, resolved: 10, avgTime: 4.5 },
                { name: "Bridge & Tunnel Team", complaints: 10, resolved: 5, avgTime: 5.1 },
              ].map((team, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="font-medium">{team.name}</h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <p>Assigned: {team.complaints}</p>
                        <p>Resolved: {team.resolved}</p>
                        <p>Avg. Time: {team.avgTime} days</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-sm">
                        <span>Resolution Rate:</span>
                        <span className="font-medium">{Math.round((team.resolved / team.complaints) * 100)}%</span>
                      </div>
                      <Progress value={(team.resolved / team.complaints) * 100} className="h-2 mt-1" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheduled Maintenance</CardTitle>
            <CardDescription>Upcoming scheduled infrastructure maintenance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  id: "SM-2023-001",
                  title: "Pothole Repairs - Downtown",
                  date: "May 20, 2023",
                  team: "Road Maintenance Team A",
                  status: "Scheduled",
                },
                {
                  id: "SM-2023-002",
                  title: "Street Light Replacement - Westside",
                  date: "May 22, 2023",
                  team: "Electrical Team C",
                  status: "Scheduled",
                },
                {
                  id: "SM-2023-003",
                  title: "Sidewalk Repairs - North County",
                  date: "May 25, 2023",
                  team: "Infrastructure Team B",
                  status: "Scheduled",
                },
                {
                  id: "SM-2023-004",
                  title: "Bridge Inspection - East River",
                  date: "May 28, 2023",
                  team: "Bridge & Tunnel Team",
                  status: "Scheduled",
                },
              ].map((maintenance, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{maintenance.title}</h3>
                        <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-200">
                          {maintenance.status}
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                        <p>ID: {maintenance.id}</p>
                        <p>Date: {maintenance.date}</p>
                        <p>Team: {maintenance.team}</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
