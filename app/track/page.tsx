"use client"

import { Textarea } from "@/components/ui/textarea"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Clock, FileText, MessageSquare, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TrackComplaint() {
  const [trackingId, setTrackingId] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [complaintFound, setComplaintFound] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingId) return

    setIsSearching(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSearching(false)
    setComplaintFound(true)
  }

  return (
    <div className="container mx-auto max-w-3xl py-8 px-4 md:px-6 lg:px-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-2">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Track Your Submission</h1>
        <p className="text-muted-foreground mt-2">
          Enter your tracking ID to check the status of your complaint or feedback.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Track by ID</CardTitle>
          <CardDescription>Enter the tracking ID you received when you submitted your complaint.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-4">
            <Input
              placeholder="e.g. CES-2023-12345"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" disabled={isSearching || !trackingId}>
              {isSearching ? (
                "Searching..."
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Track
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {complaintFound && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Complaint #CES-2023-12345</CardTitle>
                <CardDescription>Submitted on May 10, 2023</CardDescription>
              </div>
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800 border-yellow-200">
                In Progress
              </div>
            </div>
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
                    <h3 className="font-medium">Subject</h3>
                    <p>Broken Street Light on Main Street</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Category</h3>
                    <p>Infrastructure</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p>123 Main Street, Downtown</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Description</h3>
                    <p>
                      The street light at the corner of Main Street and First Avenue has been out for over a week,
                      creating a safety hazard for pedestrians and drivers at night.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium">Assigned Department</h3>
                    <p>Public Works Department</p>
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
                      <p className="mt-1">Your complaint has been received and is being reviewed.</p>
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
                      <p className="mt-1">Your complaint has been assigned to the Public Works Department.</p>
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
                </div>
              </TabsContent>
              <TabsContent value="messages" className="pt-4">
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">Public Works Department</p>
                        <p className="text-sm text-muted-foreground">May 11, 2023 - 11:30 AM</p>
                      </div>
                      <p className="mt-1">
                        Thank you for reporting this issue. We have scheduled a maintenance team to inspect and repair
                        the street light. The work is expected to be completed within the next 3-5 business days.
                      </p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Textarea placeholder="Reply to this message..." className="w-full" />
                    <div className="flex justify-end mt-2">
                      <Button>Send Message</Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {!complaintFound && !isSearching && trackingId && (
        <Card className="bg-muted">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Search className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">No Results Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find a complaint with the tracking ID "{trackingId}". Please check the ID and try again.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
