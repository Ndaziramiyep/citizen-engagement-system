"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, FileText, Send, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function ComplaintDetail({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState("in-progress")
  const [isUpdating, setIsUpdating] = useState(false)
  const [isSending, setIsSending] = useState(false)

  const handleStatusUpdate = async () => {
    setIsUpdating(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsUpdating(false)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSending(false)
    // Reset form
    const form = e.target as HTMLFormElement
    form.reset()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <Button asChild variant="ghost" className="mb-2">
            <Link href="/admin/dashboard/complaints">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Complaints
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Complaint #{params.id}</h1>
          <p className="text-muted-foreground">Submitted on May 10, 2023 • Category: Infrastructure</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="under-review">Under Review</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleStatusUpdate} disabled={isUpdating}>
            {isUpdating ? "Updating..." : "Update Status"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Broken Street Light on Main Street</CardTitle>
              <CardDescription>Complaint details and information</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="updates">Updates</TabsTrigger>
                  <TabsTrigger value="messages">Messages</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Description</h3>
                      <p className="mt-1">
                        The street light at the corner of Main Street and First Avenue has been out for over a week,
                        creating a safety hazard for pedestrians and drivers at night. This is a busy intersection with
                        a lot of foot traffic, especially in the evenings. The light was working fine until last Monday
                        when it suddenly went out. I've noticed several near-accidents as cars can't see pedestrians
                        crossing at night.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className="mt-1">123 Main Street, Downtown</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Attachments</h3>
                      <div className="mt-2 grid grid-cols-2 gap-4">
                        <div className="rounded-md border p-2 flex items-center gap-2">
                          <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                            <FileText className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">street-light-1.jpg</p>
                            <p className="text-xs text-muted-foreground">2.4 MB</p>
                          </div>
                        </div>
                        <div className="rounded-md border p-2 flex items-center gap-2">
                          <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                            <FileText className="h-6 w-6 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">street-light-2.jpg</p>
                            <p className="text-xs text-muted-foreground">1.8 MB</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="updates" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Complaint Submitted</p>
                        <p className="text-sm text-muted-foreground">May 10, 2023 - 10:23 AM</p>
                        <p className="mt-1">Complaint has been received and is being reviewed.</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-purple-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">Assigned to Department</p>
                        <p className="text-sm text-muted-foreground">May 10, 2023 - 2:45 PM</p>
                        <p className="mt-1">Complaint has been assigned to the Public Works Department.</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-yellow-600" />
                        </div>
                      </div>
                      <div>
                        <p className="font-medium">In Progress</p>
                        <p className="text-sm text-muted-foreground">May 12, 2023 - 9:15 AM</p>
                        <p className="mt-1">
                          A maintenance team has been scheduled to inspect and repair the street light.
                        </p>
                      </div>
                    </div>
                    <div className="pt-4">
                      <Label htmlFor="update">Add Update</Label>
                      <Textarea id="update" className="mt-2" placeholder="Add a new update..." />
                      <div className="flex justify-end mt-2">
                        <Button>Add Update</Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="messages" className="pt-4">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">John Doe (Citizen)</p>
                          <p className="text-sm text-muted-foreground">May 10, 2023 - 10:23 AM</p>
                        </div>
                        <div className="rounded-lg bg-muted p-3">
                          <p>
                            Hello, I'm writing to report a broken street light at the corner of Main Street and First
                            Avenue. It's been out for over a week now and it's creating a safety hazard, especially at
                            night. Can someone please look into this? Thank you.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                        <AvatarFallback>PW</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Public Works Department</p>
                          <p className="text-sm text-muted-foreground">May 11, 2023 - 11:30 AM</p>
                        </div>
                        <div className="rounded-lg bg-primary/10 p-3">
                          <p>
                            Thank you for reporting this issue. We have scheduled a maintenance team to inspect and
                            repair the street light. The work is expected to be completed within the next 3-5 business
                            days.
                          </p>
                        </div>
                      </div>
                    </div>
                    <form onSubmit={handleSendMessage} className="pt-4">
                      <Label htmlFor="message">Reply</Label>
                      <Textarea id="message" className="mt-2" placeholder="Type your message..." required />
                      <div className="flex justify-end mt-2">
                        <Button type="submit" disabled={isSending}>
                          {isSending ? (
                            "Sending..."
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Citizen Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-lg">John Doe</h3>
                  <p className="text-sm text-muted-foreground">Registered: Jan 15, 2023</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm">john.doe@example.com</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm">(555) 123-4567</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Address</p>
                  <p className="text-sm">456 Elm Street, Downtown</p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" asChild className="w-full">
                <Link href="/admin/dashboard/users/john-doe">
                  <User className="mr-2 h-4 w-4" />
                  View Full Profile
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Assignment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Select defaultValue="public-works">
                  <SelectTrigger id="department" className="mt-1.5">
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public-works">Public Works Department</SelectItem>
                    <SelectItem value="water">Water Department</SelectItem>
                    <SelectItem value="electricity">Electricity Department</SelectItem>
                    <SelectItem value="waste">Waste Management</SelectItem>
                    <SelectItem value="transport">Public Transport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="medium">
                  <SelectTrigger id="priority" className="mt-1.5">
                    <SelectValue placeholder="Select Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="assignee">Assignee</Label>
                <Select defaultValue="team-a">
                  <SelectTrigger id="assignee" className="mt-1.5">
                    <SelectValue placeholder="Select Assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="team-a">Maintenance Team A</SelectItem>
                    <SelectItem value="team-b">Maintenance Team B</SelectItem>
                    <SelectItem value="team-c">Maintenance Team C</SelectItem>
                    <SelectItem value="supervisor">Supervisor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="due-date">Due Date</Label>
                <Input id="due-date" type="date" className="mt-1.5" defaultValue="2023-05-17" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Update Assignment</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Street Light Out on First Avenue</p>
                      <p className="text-sm text-muted-foreground">ID: CES-2023-12320</p>
                    </div>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-green-200">
                      Resolved
                    </div>
                  </div>
                </div>
                <div className="rounded-md border p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Flickering Street Light on Main Street</p>
                      <p className="text-sm text-muted-foreground">ID: CES-2023-12290</p>
                    </div>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-green-200">
                      Resolved
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
