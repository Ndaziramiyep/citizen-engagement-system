import Link from "next/link"
import { ArrowRight, BarChart3, CheckCircle, Clock, FileText, MessageSquare, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the government administration portal. Manage citizen complaints and feedback.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+23 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">-8 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">189</div>
            <p className="text-xs text-muted-foreground">+31 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.8 days</div>
            <p className="text-xs text-muted-foreground">-0.6 days from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Complaints by Category</CardTitle>
            <CardDescription>Distribution of complaints across different service categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Roads & Infrastructure</span>
                  <span className="font-medium">78</span>
                </div>
                <Progress value={32} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Water Supply</span>
                  <span className="font-medium">54</span>
                </div>
                <Progress value={22} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Electricity</span>
                  <span className="font-medium">42</span>
                </div>
                <Progress value={17} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Waste Management</span>
                  <span className="font-medium">36</span>
                </div>
                <Progress value={15} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Public Transport</span>
                  <span className="font-medium">21</span>
                </div>
                <Progress value={9} className="h-2" />
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Other</span>
                  <span className="font-medium">16</span>
                </div>
                <Progress value={5} className="h-2" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link href="/admin/dashboard/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Detailed Analytics
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates and actions taken on complaints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-9 w-9 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">Complaint #CES-2023-12335 Resolved</p>
                  <p className="text-sm text-muted-foreground">Waste Management Department • 2 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-9 w-9 rounded-full bg-yellow-100 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">Complaint #CES-2023-12345 Updated</p>
                  <p className="text-sm text-muted-foreground">Public Works Department • 3 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">New Complaint #CES-2023-12346 Received</p>
                  <p className="text-sm text-muted-foreground">Roads Department • 5 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-purple-600" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">New Message on Complaint #CES-2023-12340</p>
                  <p className="text-sm text-muted-foreground">Water Department • 6 hours ago</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="h-9 w-9 rounded-full bg-indigo-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                </div>
                <div>
                  <p className="font-medium">New User Registered</p>
                  <p className="text-sm text-muted-foreground">System • 8 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link href="/admin/dashboard/activity">
                View All Activity
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pending Complaints</CardTitle>
          <CardDescription>Complaints that require attention and response</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="new">
            <TabsList className="mb-4">
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="assigned">Assigned</TabsTrigger>
              <TabsTrigger value="urgent">Urgent</TabsTrigger>
            </TabsList>
            <TabsContent value="new">
              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm font-medium">
                  <div>ID</div>
                  <div>Subject</div>
                  <div>Category</div>
                  <div>Submitted</div>
                  <div>Action</div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      id: "CES-2023-12346",
                      subject: "Pothole on Oak Street",
                      category: "Roads & Infrastructure",
                      date: "May 15, 2023",
                    },
                    {
                      id: "CES-2023-12347",
                      subject: "Street Light Out on Elm Street",
                      category: "Electricity",
                      date: "May 15, 2023",
                    },
                    {
                      id: "CES-2023-12348",
                      subject: "Missed Garbage Collection",
                      category: "Waste Management",
                      date: "May 14, 2023",
                    },
                    {
                      id: "CES-2023-12349",
                      subject: "Water Leak on Main Street",
                      category: "Water Supply",
                      date: "May 14, 2023",
                    },
                    {
                      id: "CES-2023-12350",
                      subject: "Bus Stop Damaged",
                      category: "Public Transport",
                      date: "May 13, 2023",
                    },
                  ].map((complaint) => (
                    <div key={complaint.id} className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm items-center">
                      <div className="font-medium">{complaint.id}</div>
                      <div>{complaint.subject}</div>
                      <div>{complaint.category}</div>
                      <div>{complaint.date}</div>
                      <div>
                        <Button size="sm" asChild>
                          <Link href={`/admin/dashboard/complaints/${complaint.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="assigned">
              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm font-medium">
                  <div>ID</div>
                  <div>Subject</div>
                  <div>Assigned To</div>
                  <div>Status</div>
                  <div>Action</div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      id: "CES-2023-12345",
                      subject: "Broken Street Light",
                      assignedTo: "Public Works",
                      status: "In Progress",
                    },
                    {
                      id: "CES-2023-12340",
                      subject: "Water Supply Issue",
                      assignedTo: "Water Department",
                      status: "In Progress",
                    },
                    {
                      id: "CES-2023-12338",
                      subject: "Playground Equipment Broken",
                      assignedTo: "Parks Department",
                      status: "Scheduled",
                    },
                  ].map((complaint) => (
                    <div key={complaint.id} className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm items-center">
                      <div className="font-medium">{complaint.id}</div>
                      <div>{complaint.subject}</div>
                      <div>{complaint.assignedTo}</div>
                      <div>{complaint.status}</div>
                      <div>
                        <Button size="sm" asChild>
                          <Link href={`/admin/dashboard/complaints/${complaint.id}`}>View</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="urgent">
              <div className="rounded-md border">
                <div className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm font-medium">
                  <div>ID</div>
                  <div>Subject</div>
                  <div>Category</div>
                  <div>Submitted</div>
                  <div>Action</div>
                </div>
                <div className="divide-y">
                  {[
                    {
                      id: "CES-2023-12349",
                      subject: "Water Leak on Main Street",
                      category: "Water Supply",
                      date: "May 14, 2023",
                    },
                    {
                      id: "CES-2023-12342",
                      subject: "Downed Power Line",
                      category: "Electricity",
                      date: "May 12, 2023",
                    },
                  ].map((complaint) => (
                    <div key={complaint.id} className="grid grid-cols-1 md:grid-cols-5 p-4 text-sm items-center">
                      <div className="font-medium">{complaint.id}</div>
                      <div>{complaint.subject}</div>
                      <div>{complaint.category}</div>
                      <div>{complaint.date}</div>
                      <div>
                        <Button size="sm" variant="destructive" asChild>
                          <Link href={`/admin/dashboard/complaints/${complaint.id}`}>Urgent</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/admin/dashboard/complaints">
              View All Complaints
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
