"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bell, CheckCircle, Clock, FileText, MessageSquare, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

// Mock notifications data
const notifications = [
  {
    id: 1,
    type: "status",
    title: "Complaint Status Updated",
    description: "Your complaint #CES-2023-12345 status has been updated to 'In Progress'",
    date: "2 hours ago",
    read: false,
    icon: Clock,
    iconColor: "text-yellow-600 bg-yellow-100",
    link: "/track?id=CES-2023-12345",
  },
  {
    id: 2,
    type: "message",
    title: "New Message",
    description: "Public Works Department has sent you a message regarding your complaint",
    date: "5 hours ago",
    read: false,
    icon: MessageSquare,
    iconColor: "text-blue-600 bg-blue-100",
    link: "/track?id=CES-2023-12345&tab=messages",
  },
  {
    id: 3,
    type: "resolution",
    title: "Complaint Resolved",
    description: "Your complaint #CES-2023-12330 has been marked as resolved",
    date: "1 day ago",
    read: true,
    icon: CheckCircle,
    iconColor: "text-green-600 bg-green-100",
    link: "/track?id=CES-2023-12330",
  },
  {
    id: 4,
    type: "submission",
    title: "Complaint Submitted",
    description: "Your complaint #CES-2023-12346 has been successfully submitted",
    date: "2 days ago",
    read: true,
    icon: FileText,
    iconColor: "text-purple-600 bg-purple-100",
    link: "/track?id=CES-2023-12346",
  },
  {
    id: 5,
    type: "status",
    title: "Complaint Assigned",
    description: "Your complaint #CES-2023-12345 has been assigned to Water Department",
    date: "3 days ago",
    read: true,
    icon: Clock,
    iconColor: "text-yellow-600 bg-yellow-100",
    link: "/track?id=CES-2023-12345",
  },
]

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [notificationState, setNotificationState] = useState(notifications)

  const unreadCount = notificationState.filter((n) => !n.read).length

  const filteredNotifications =
    activeTab === "all"
      ? notificationState
      : activeTab === "unread"
        ? notificationState.filter((n) => !n.read)
        : notificationState.filter((n) => n.type === activeTab)

  const markAllAsRead = () => {
    setNotificationState(notificationState.map((n) => ({ ...n, read: true })))
  }

  const toggleRead = (id: number) => {
    setNotificationState(notificationState.map((n) => (n.id === id ? { ...n, read: !n.read } : n)))
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground mt-2">Stay updated on your complaints and feedback.</p>
          </div>
          <Button variant="outline" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark all as read
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Notifications</CardTitle>
          <CardDescription>
            You have {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
              <TabsTrigger value="status">Status</TabsTrigger>
              <TabsTrigger value="message">Messages</TabsTrigger>
              <TabsTrigger value="resolution">Resolved</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="pt-4">
              {filteredNotifications.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No notifications</h3>
                  <p className="text-muted-foreground">
                    {activeTab === "all"
                      ? "You don't have any notifications yet."
                      : activeTab === "unread"
                        ? "You don't have any unread notifications."
                        : `You don't have any ${activeTab} notifications.`}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`flex gap-4 p-4 rounded-lg border ${!notification.read ? "bg-primary/5" : ""}`}
                    >
                      <div className="flex-shrink-0">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${notification.iconColor}`}
                        >
                          <notification.icon className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className={`font-medium ${!notification.read ? "text-primary" : ""}`}>
                              {notification.title}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">{notification.description}</p>
                          </div>
                          <p className="text-xs text-muted-foreground whitespace-nowrap ml-4">{notification.date}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <Button asChild variant="link" className="p-0 h-auto text-sm">
                            <Link href={notification.link}>View Details</Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRead(notification.id)}
                            className="h-8 px-2 text-xs"
                          >
                            {notification.read ? "Mark as unread" : "Mark as read"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>Manage how and when you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="status-email" className="font-medium">
                      Status Updates
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive emails when your complaint status changes</p>
                  </div>
                  <Switch id="status-email" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="message-email" className="font-medium">
                      New Messages
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive emails when you get a new message</p>
                  </div>
                  <Switch id="message-email" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="resolution-email" className="font-medium">
                      Resolution Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive emails when your complaint is resolved</p>
                  </div>
                  <Switch id="resolution-email" defaultChecked />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-4">In-App Notifications</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="status-app" className="font-medium">
                      Status Updates
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive in-app notifications for status changes</p>
                  </div>
                  <Switch id="status-app" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="message-app" className="font-medium">
                      New Messages
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive in-app notifications for new messages</p>
                  </div>
                  <Switch id="message-app" defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="resolution-app" className="font-medium">
                      Resolution Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">Receive in-app notifications for resolutions</p>
                  </div>
                  <Switch id="resolution-app" defaultChecked />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
