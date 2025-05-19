"use client"

import { useState } from "react"
import { Bell, Globe, Lock, Mail, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Settings saved",
      description: "Your settings have been saved successfully.",
    })

    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="notifications">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <TabsList className="flex flex-col h-auto p-0 bg-transparent space-y-1">
              <TabsTrigger
                value="notifications"
                className="justify-start px-4 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="appearance"
                className="justify-start px-4 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Globe className="h-4 w-4 mr-2" />
                Appearance
              </TabsTrigger>
              <TabsTrigger
                value="privacy"
                className="justify-start px-4 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Lock className="h-4 w-4 mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger
                value="communications"
                className="justify-start px-4 py-2 h-9 font-normal data-[state=active]:font-medium"
              >
                <Mail className="h-4 w-4 mr-2" />
                Communications
              </TabsTrigger>
            </TabsList>
          </div>
          <div className="flex-1">
            <TabsContent value="notifications" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure how and when you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="status-email" className="font-medium">
                            Status Updates
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when your complaint status changes
                          </p>
                        </div>
                        <Switch id="status-email" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="message-email" className="font-medium">
                            New Messages
                          </Label>
                          <p className="text-sm text-muted-foreground">Receive emails when you get a new message</p>
                        </div>
                        <Switch id="message-email" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="resolution-email" className="font-medium">
                            Resolution Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails when your complaint is resolved
                          </p>
                        </div>
                        <Switch id="resolution-email" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">In-App Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="status-app" className="font-medium">
                            Status Updates
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive in-app notifications for status changes
                          </p>
                        </div>
                        <Switch id="status-app" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="message-app" className="font-medium">
                            New Messages
                          </Label>
                          <p className="text-sm text-muted-foreground">Receive in-app notifications for new messages</p>
                        </div>
                        <Switch id="message-app" defaultChecked />
                      </div>
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

            <TabsContent value="appearance" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize how the application looks and feels.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="theme">Theme</Label>
                    <Select defaultValue="light">
                      <SelectTrigger id="theme">
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">Choose between light, dark, or system theme.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
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
                    <Label htmlFor="text-size">Text Size</Label>
                    <Select defaultValue="medium">
                      <SelectTrigger id="text-size">
                        <SelectValue placeholder="Select text size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="reduce-motion" className="font-medium">
                          Reduce Motion
                        </Label>
                        <p className="text-sm text-muted-foreground">Minimize animations and transitions.</p>
                      </div>
                      <Switch id="reduce-motion" />
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

            <TabsContent value="privacy" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                  <CardDescription>Control your privacy and data sharing preferences.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="profile-visibility" className="font-medium">
                          Profile Visibility
                        </Label>
                        <p className="text-sm text-muted-foreground">Allow others to see your profile information.</p>
                      </div>
                      <Switch id="profile-visibility" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="anonymous-submissions" className="font-medium">
                          Anonymous Submissions
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Submit complaints without revealing your identity to officials.
                        </p>
                      </div>
                      <Switch id="anonymous-submissions" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="data-collection" className="font-medium">
                          Data Collection
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Allow us to collect anonymous usage data to improve the service.
                        </p>
                      </div>
                      <Switch id="data-collection" defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Data Retention</Label>
                    <Select defaultValue="1-year">
                      <SelectTrigger id="data-retention">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6-months">6 Months</SelectItem>
                        <SelectItem value="1-year">1 Year</SelectItem>
                        <SelectItem value="2-years">2 Years</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      How long we keep your data after your account is closed.
                    </p>
                  </div>

                  <div className="pt-4">
                    <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                      Download My Data
                    </Button>
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

            <TabsContent value="communications" className="m-0">
              <Card>
                <CardHeader>
                  <CardTitle>Communication Preferences</CardTitle>
                  <CardDescription>Manage how we communicate with you.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Communications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="service-updates" className="font-medium">
                            Service Updates
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive emails about system updates and new features.
                          </p>
                        </div>
                        <Switch id="service-updates" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="newsletters" className="font-medium">
                            Newsletters
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive monthly newsletters about government initiatives.
                          </p>
                        </div>
                        <Switch id="newsletters" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="surveys" className="font-medium">
                            Surveys and Feedback
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive occasional surveys to help improve our services.
                          </p>
                        </div>
                        <Switch id="surveys" defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="communication-format">Preferred Format</Label>
                    <RadioGroup defaultValue="html" id="communication-format">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="html" id="html" />
                        <Label htmlFor="html">HTML (Rich Text)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="plain" id="plain" />
                        <Label htmlFor="plain">Plain Text</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="communication-frequency">Communication Frequency</Label>
                    <Select defaultValue="normal">
                      <SelectTrigger id="communication-frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High (As it happens)</SelectItem>
                        <SelectItem value="normal">Normal (Daily digest)</SelectItem>
                        <SelectItem value="low">Low (Weekly digest)</SelectItem>
                        <SelectItem value="minimal">Minimal (Essential only)</SelectItem>
                      </SelectContent>
                    </Select>
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
