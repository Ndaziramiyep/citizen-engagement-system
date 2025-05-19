"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Camera, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function SubmitComplaint() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [complaintType, setComplaintType] = useState("complaint")
  const [category, setCategory] = useState("")
  const [attachments, setAttachments] = useState<File[]>([])

  // Set the category from URL parameter if available
  useEffect(() => {
    const categoryParam = searchParams.get("category")
    if (categoryParam) {
      setCategory(categoryParam)
    }
  }, [searchParams])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    toast({
      title: "Submission successful!",
      description: "Your complaint has been submitted. Tracking ID: CES-2023-12345",
    })

    setIsSubmitting(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files))
    }
  }

  // Map from URL slug to display name
  const categoryMap: Record<string, string> = {
    "roads-infrastructure": "roads",
    "water-supply": "water",
    electricity: "electricity",
    "waste-management": "waste",
    "public-transport": "transport",
    healthcare: "healthcare",
    education: "education",
    "public-safety": "safety",
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
        <h1 className="text-3xl font-bold">Submit Your Feedback</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below to submit your complaint or feedback about public services.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submission Form</CardTitle>
          <CardDescription>
            All fields marked with * are required. Your information will be kept confidential.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="submission-type">Submission Type *</Label>
                <RadioGroup
                  id="submission-type"
                  value={complaintType}
                  onValueChange={setComplaintType}
                  className="flex flex-col space-y-1 mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="complaint" id="complaint" />
                    <Label htmlFor="complaint" className="font-normal">
                      Complaint
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="feedback" id="feedback" />
                    <Label htmlFor="feedback" className="font-normal">
                      Feedback
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="suggestion" id="suggestion" />
                    <Label htmlFor="suggestion" className="font-normal">
                      Suggestion
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name *</Label>
                  <Input id="full-name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" type="email" required />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Service Category *</Label>
                <Select value={category} onValueChange={setCategory} required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="roads">Roads & Infrastructure</SelectItem>
                    <SelectItem value="water">Water Supply</SelectItem>
                    <SelectItem value="electricity">Electricity</SelectItem>
                    <SelectItem value="waste">Waste Management</SelectItem>
                    <SelectItem value="transport">Public Transport</SelectItem>
                    <SelectItem value="healthcare">Healthcare Services</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="safety">Public Safety</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location of Issue *</Label>
                <Input id="location" placeholder="Street address or landmark" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input id="subject" placeholder="Brief description of the issue" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide as much detail as possible about the issue"
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments</Label>
                <div className="mt-1 flex items-center gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    className="flex items-center gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Upload Files
                  </Button>
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <Camera className="h-4 w-4" />
                    Take Photo
                  </Button>
                  <input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
                </div>
                {attachments.length > 0 && (
                  <div className="mt-2">
                    <p className="text-sm font-medium">Attached Files:</p>
                    <ul className="text-sm text-muted-foreground">
                      {attachments.map((file, index) => (
                        <li key={index}>{file.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                  required
                />
                <Label htmlFor="terms" className="text-sm font-normal">
                  I confirm that the information provided is accurate and I consent to the processing of my personal
                  data for the purpose of handling this submission. *
                </Label>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-secondary hover:bg-secondary/90">
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
