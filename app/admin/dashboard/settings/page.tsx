"use client"

import { useState } from "react"
import { Bell, Globe, Lock, Mail, Save, Server, Shield, User, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage system settings, notifications, and configurations.</p>
      </div>

      <Tabs defaultValue="general">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
              <TabsTrigger
                value="general"
                className="justify-start px-4 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Globe className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="justify-start px-4 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="email"
                className="justify-start px-4 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="justify-start px-4 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger
                value="departments"
                className="justify-start px-4 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <User className="h-4 w-4 mr-2" />
                Departments
              </TabsTrigger>
              <TabsTrigger
                value="system"
                className="justify-start px-4 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Server className="h-4 w-4 mr-2" />
                System
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex-1">
            <TabsContent value="general" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>Configure general system settings and preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="system-name">System Name</Label>
                    <Input id="system-name" defaultValue="Citizen Engagement System" />
                    <p className="text-sm text-muted-foreground">
                      This name will be displayed throughout the application.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="system-logo">System Logo</Label>
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-md border flex items-center justify-center bg-muted">
                        <Shield className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <Button variant="outline">Upload New Logo</Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Default Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger id="language">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Default Timezone</Label>
                    <Select defaultValue="utc-5">
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="utc-7">Mountain Time (UTC-7)</SelectItem>
                        <SelectItem value="utc-6">Central Time (UTC-6)</SelectItem>
                        <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="utc-0">UTC</SelectItem>
                        <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                      <Switch id="maintenance-mode" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      When enabled, the system will display a maintenance message to all users.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maintenance-message">Maintenance Message</Label>
                    <Textarea
                      id="maintenance-message"
                      placeholder="Enter maintenance message..."
                      defaultValue="The system is currently undergoing scheduled maintenance. Please check back later."
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how and when notifications are sent to users.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Citizen Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="new-complaint-confirmation">New Complaint Confirmation</Label>
                        <Switch id="new-complaint-confirmation" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Send confirmation email when a new complaint is submitted.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="status-updates">Status Updates</Label>
                        <Switch id="status-updates" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Notify citizens when their complaint status changes.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="resolution-notification">Resolution Notification</Label>
                        <Switch id="resolution-notification" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">Notify citizens when their complaint is resolved.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="feedback-request">Feedback Request</Label>
                        <Switch id="feedback-request" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Request feedback from citizens after complaint resolution.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Government Official Notifications</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="new-complaint-alert">New Complaint Alert</Label>
                        <Switch id="new-complaint-alert" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Alert officials when a new complaint is assigned to their department.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="overdue-complaints">Overdue Complaints</Label>
                        <Switch id="overdue-complaints" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Send daily digest of overdue complaints to department heads.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="citizen-messages">Citizen Messages</Label>
                        <Switch id="citizen-messages" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Notify officials when citizens send messages on their complaints.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notification-frequency">Notification Digest Frequency</Label>
                    <RadioGroup defaultValue="realtime" id="notification-frequency">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="realtime" id="realtime" />
                        <Label htmlFor="realtime">Real-time (Immediate)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="daily" id="daily" />
                        <Label htmlFor="daily">Daily Digest</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label htmlFor="weekly">Weekly Digest</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="email" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Email Settings</CardTitle>
                  <CardDescription>Configure email server settings and templates.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">SMTP Configuration</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="smtp-host">SMTP Host</Label>
                        <Input id="smtp-host" defaultValue="smtp.example.gov" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtp-port">SMTP Port</Label>
                        <Input id="smtp-port" defaultValue="587" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtp-username">SMTP Username</Label>
                        <Input id="smtp-username" defaultValue="notifications@example.gov" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="smtp-password">SMTP Password</Label>
                        <Input id="smtp-password" type="password" defaultValue="••••••••••••" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="smtp-encryption">Use Encryption (TLS/SSL)</Label>
                        <Switch id="smtp-encryption" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline">Test SMTP Connection</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Sender Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="from-email">From Email Address</Label>
                      <Input id="from-email" defaultValue="no-reply@citizenengagement.gov" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="from-name">From Name</Label>
                      <Input id="from-name" defaultValue="Citizen Engagement System" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reply-to">Reply-To Email Address</Label>
                      <Input id="reply-to" defaultValue="support@citizenengagement.gov" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Templates</h3>
                    <div className="space-y-2">
                      <Label>Available Templates</Label>
                      <Select defaultValue="welcome">
                        <SelectTrigger>
                          <SelectValue placeholder="Select template" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="welcome">Welcome Email</SelectItem>
                          <SelectItem value="complaint-confirmation">Complaint Confirmation</SelectItem>
                          <SelectItem value="status-update">Status Update</SelectItem>
                          <SelectItem value="resolution">Resolution Notification</SelectItem>
                          <SelectItem value="feedback-request">Feedback Request</SelectItem>
                          <SelectItem value="password-reset">Password Reset</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template-subject">Email Subject</Label>
                      <Input id="template-subject" defaultValue="Welcome to the Citizen Engagement System" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="template-content">Email Content</Label>
                      <Textarea
                        id="template-content"
                        rows={10}
                        defaultValue={`Dear {{name}},

Thank you for registering with the Citizen Engagement System. Your account has been successfully created.

Username: {{email}}
Account ID: {{account_id}}

You can now submit and track complaints about public services in your community.

Best regards,
The Citizen Engagement Team`}
                      />
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Available variables: name, email, account_id, complaint_id, complaint_subject, status,
                        department, date
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Configure security policies and authentication settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Password Policy</h3>
                    <div className="space-y-2">
                      <Label htmlFor="min-password-length">Minimum Password Length</Label>
                      <Select defaultValue="8">
                        <SelectTrigger id="min-password-length">
                          <SelectValue placeholder="Select minimum length" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="6">6 characters</SelectItem>
                          <SelectItem value="8">8 characters</SelectItem>
                          <SelectItem value="10">10 characters</SelectItem>
                          <SelectItem value="12">12 characters</SelectItem>
                          <SelectItem value="14">14 characters</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="require-uppercase">Require Uppercase Letters</Label>
                        <Switch id="require-uppercase" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="require-numbers">Require Numbers</Label>
                        <Switch id="require-numbers" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="require-special">Require Special Characters</Label>
                        <Switch id="require-special" defaultChecked />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password-expiry">Password Expiry</Label>
                      <Select defaultValue="90">
                        <SelectTrigger id="password-expiry">
                          <SelectValue placeholder="Select expiry period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                          <SelectItem value="180">180 days</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Security</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="two-factor-auth">Enable Two-Factor Authentication</Label>
                        <Switch id="two-factor-auth" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Require two-factor authentication for admin and government accounts.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="account-lockout">Account Lockout</Label>
                        <Switch id="account-lockout" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Lock accounts after multiple failed login attempts.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lockout-threshold">Lockout Threshold</Label>
                      <Select defaultValue="5">
                        <SelectTrigger id="lockout-threshold">
                          <SelectValue placeholder="Select threshold" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="3">3 attempts</SelectItem>
                          <SelectItem value="5">5 attempts</SelectItem>
                          <SelectItem value="10">10 attempts</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lockout-duration">Lockout Duration</Label>
                      <Select defaultValue="30">
                        <SelectTrigger id="lockout-duration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="1440">24 hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Session Settings</h3>
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Session Timeout</Label>
                      <Select defaultValue="30">
                        <SelectTrigger id="session-timeout">
                          <SelectValue placeholder="Select timeout" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="60">1 hour</SelectItem>
                          <SelectItem value="120">2 hours</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out inactive users after the specified period.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="departments" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Department Settings</CardTitle>
                  <CardDescription>Manage government departments and their configurations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Departments</h3>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Department
                    </Button>
                  </div>

                  <div className="rounded-md border">
                    <div className="grid grid-cols-1 md:grid-cols-4 p-4 text-sm font-medium">
                      <div>Department Name</div>
                      <div>Category</div>
                      <div>Officials</div>
                      <div className="text-right">Actions</div>
                    </div>
                    <div className="divide-y">
                      {[
                        {
                          name: "Public Works Department",
                          category: "Roads & Infrastructure",
                          officials: 5,
                        },
                        {
                          name: "Water Department",
                          category: "Water Supply",
                          officials: 3,
                        },
                        {
                          name: "Electricity Department",
                          category: "Electricity",
                          officials: 4,
                        },
                        {
                          name: "Waste Management Department",
                          category: "Waste Management",
                          officials: 3,
                        },
                        {
                          name: "Public Transport Department",
                          category: "Public Transport",
                          officials: 2,
                        },
                        {
                          name: "Healthcare Department",
                          category: "Healthcare Services",
                          officials: 4,
                        },
                        {
                          name: "Education Department",
                          category: "Education",
                          officials: 3,
                        },
                        {
                          name: "Public Safety Department",
                          category: "Public Safety",
                          officials: 5,
                        },
                      ].map((department, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-4 p-4 text-sm items-center">
                          <div className="font-medium">{department.name}</div>
                          <div>{department.category}</div>
                          <div>{department.officials} officials</div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Department Configuration</h3>
                    <div className="space-y-2">
                      <Label htmlFor="auto-assignment">Automatic Complaint Assignment</Label>
                      <Select defaultValue="category">
                        <SelectTrigger id="auto-assignment">
                          <SelectValue placeholder="Select assignment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="category">By Category</SelectItem>
                          <SelectItem value="location">By Location</SelectItem>
                          <SelectItem value="hybrid">Hybrid (Category + Location)</SelectItem>
                          <SelectItem value="manual">Manual Assignment Only</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        Determine how complaints are automatically assigned to departments.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dept-notifications">Department Notifications</Label>
                        <Switch id="dept-notifications" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Send notifications to department heads for new complaints.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="dept-performance">Track Department Performance</Label>
                        <Switch id="dept-performance" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Collect and analyze department performance metrics.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>Configure system-wide settings and advanced options.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Data Management</h3>
                    <div className="space-y-2">
                      <Label htmlFor="data-retention">Data Retention Period</Label>
                      <Select defaultValue="3-years">
                        <SelectTrigger id="data-retention">
                          <SelectValue placeholder="Select retention period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-year">1 Year</SelectItem>
                          <SelectItem value="2-years">2 Years</SelectItem>
                          <SelectItem value="3-years">3 Years</SelectItem>
                          <SelectItem value="5-years">5 Years</SelectItem>
                          <SelectItem value="7-years">7 Years</SelectItem>
                          <SelectItem value="indefinite">Indefinite</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-sm text-muted-foreground">
                        How long to retain complaint data before archiving.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-archive">Automatic Archiving</Label>
                        <Switch id="auto-archive" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Automatically archive resolved complaints after the retention period.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline">Export System Data</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Maintenance</h3>
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <Select defaultValue="daily">
                        <SelectTrigger id="backup-frequency">
                          <SelectValue placeholder="Select backup frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="backup-retention">Backup Retention</Label>
                      <Select defaultValue="30">
                        <SelectTrigger id="backup-retention">
                          <SelectValue placeholder="Select retention period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 Days</SelectItem>
                          <SelectItem value="14">14 Days</SelectItem>
                          <SelectItem value="30">30 Days</SelectItem>
                          <SelectItem value="90">90 Days</SelectItem>
                          <SelectItem value="365">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline">Run Manual Backup</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Logs</h3>
                    <div className="space-y-2">
                      <Label htmlFor="log-level">Log Level</Label>
                      <Select defaultValue="info">
                        <SelectTrigger id="log-level">
                          <SelectValue placeholder="Select log level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="error">Error</SelectItem>
                          <SelectItem value="warn">Warning</SelectItem>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="debug">Debug</SelectItem>
                          <SelectItem value="trace">Trace</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="audit-logging">Audit Logging</Label>
                        <Switch id="audit-logging" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Log all administrative actions for audit purposes.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline">View System Logs</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Advanced Settings</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="api-access">Enable API Access</Label>
                        <Switch id="api-access" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">Allow external systems to access the API.</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="analytics">Enable Analytics</Label>
                        <Switch id="analytics" defaultChecked />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Collect anonymous usage data for system improvement.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="debug-mode" className="text-red-500">
                          Debug Mode
                        </Label>
                        <Switch id="debug-mode" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Enable debug mode for troubleshooting (not recommended for production).
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>Saving...</>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
