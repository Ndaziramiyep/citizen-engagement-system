import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FAQPage() {
  return (
    <div className="container mx-auto max-w-4xl py-8 px-4 md:px-6 lg:px-8">
      <div className="mb-6">
        <Button asChild variant="ghost" className="mb-2">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mt-2">
          Find answers to common questions about the Citizen Engagement System.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>FAQ</CardTitle>
          <CardDescription>Browse through our most frequently asked questions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="submission">Submission</TabsTrigger>
              <TabsTrigger value="tracking">Tracking</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What is the Citizen Engagement System?</AccordionTrigger>
                  <AccordionContent>
                    The Citizen Engagement System (CES) is a platform that allows citizens to submit complaints,
                    feedback, and suggestions about public services directly to the government. It streamlines the
                    process of reporting issues and tracking their resolution.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Who can use this system?</AccordionTrigger>
                  <AccordionContent>
                    Any citizen can use the system to submit complaints or feedback. Government officials use a separate
                    portal to manage and respond to submissions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Is the service free to use?</AccordionTrigger>
                  <AccordionContent>
                    Yes, the Citizen Engagement System is completely free for all citizens to use. It's a public service
                    provided by the government to improve communication and service delivery.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>What types of issues can I report?</AccordionTrigger>
                  <AccordionContent>
                    You can report issues related to various public services including roads and infrastructure, water
                    supply, electricity, waste management, public transport, healthcare services, education, and public
                    safety.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How quickly will my complaint be addressed?</AccordionTrigger>
                  <AccordionContent>
                    Response times vary depending on the nature and urgency of the complaint. Urgent matters like safety
                    hazards are prioritized. The average resolution time is currently 4.8 days, but you can track the
                    status of your complaint in real-time through the system.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="submission" className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I submit a complaint?</AccordionTrigger>
                  <AccordionContent>
                    Click on the "Submit" button on the homepage or navigation menu. Fill out the form with details
                    about your complaint, including the category, location, and description. You can also attach photos
                    or documents to provide more information.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Do I need to create an account to submit a complaint?</AccordionTrigger>
                  <AccordionContent>
                    No, you can submit a complaint without creating an account. However, creating an account allows you
                    to track all your submissions in one place and receive notifications about updates.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What information should I include in my complaint?</AccordionTrigger>
                  <AccordionContent>
                    Include as much detail as possible: the exact location, when you noticed the issue, how it affects
                    you or others, and any relevant background information. Clear, specific information helps officials
                    address your complaint more effectively.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I attach photos or documents to my complaint?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you can attach photos, videos, or documents to provide visual evidence of the issue. This can
                    help officials better understand and address your complaint.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>Can I submit anonymous complaints?</AccordionTrigger>
                  <AccordionContent>
                    While you can submit a complaint without creating an account, we do require basic contact
                    information to follow up on your complaint. Your personal information is kept confidential and is
                    only used for communication regarding your complaint.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="tracking" className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I track my complaint?</AccordionTrigger>
                  <AccordionContent>
                    After submitting a complaint, you'll receive a unique tracking ID. You can use this ID on the
                    "Track" page to check the status of your complaint. If you have an account, all your complaints will
                    be visible in your dashboard.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What are the different status types for complaints?</AccordionTrigger>
                  <AccordionContent>
                    Complaints can have the following statuses: New (just submitted), Under Review (being assessed),
                    Assigned (sent to a department), In Progress (being worked on), Scheduled (action planned), Resolved
                    (issue fixed), and Closed (process completed).
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>Will I be notified about updates to my complaint?</AccordionTrigger>
                  <AccordionContent>
                    Yes, you'll receive email notifications when there are updates to your complaint, such as status
                    changes or messages from officials. If you have an account, you'll also receive in-app
                    notifications.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I communicate with officials about my complaint?</AccordionTrigger>
                  <AccordionContent>
                    Yes, the tracking system includes a messaging feature that allows you to communicate directly with
                    the officials handling your complaint. You can ask questions, provide additional information, or
                    request updates.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>What should I do if I lost my tracking ID?</AccordionTrigger>
                  <AccordionContent>
                    If you provided an email address when submitting your complaint, you can request to have your
                    tracking ID sent to that email. If you have an account, all your submissions are automatically
                    tracked in your dashboard.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="account" className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I create an account?</AccordionTrigger>
                  <AccordionContent>
                    Click on the "Login" button in the top right corner, then select the "Register" tab. Fill out the
                    registration form with your name, email, and password. You'll receive a verification email to
                    activate your account.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>What are the benefits of creating an account?</AccordionTrigger>
                  <AccordionContent>
                    With an account, you can track all your submissions in one place, receive notifications about
                    updates, communicate with officials, and save your contact information for future submissions.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How do I reset my password?</AccordionTrigger>
                  <AccordionContent>
                    On the login page, click on "Forgot password?" and enter your email address. You'll receive an email
                    with instructions to reset your password.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I update my profile information?</AccordionTrigger>
                  <AccordionContent>
                    Yes, after logging in, you can access your profile settings to update your personal information,
                    contact details, and notification preferences.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>How is my personal information protected?</AccordionTrigger>
                  <AccordionContent>
                    We take data protection seriously. Your personal information is encrypted and stored securely. It is
                    only used for communication regarding your complaints and is not shared with third parties. For more
                    details, please refer to our Privacy Policy.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>

            <TabsContent value="technical" className="pt-6">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>What browsers are supported?</AccordionTrigger>
                  <AccordionContent>
                    The Citizen Engagement System supports all modern browsers including Chrome, Firefox, Safari, and
                    Edge. For the best experience, we recommend using the latest version of your preferred browser.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>Can I use the system on my mobile device?</AccordionTrigger>
                  <AccordionContent>
                    Yes, the system is fully responsive and works on smartphones and tablets. You can submit and track
                    complaints from any device with an internet connection.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>What file types can I upload as attachments?</AccordionTrigger>
                  <AccordionContent>
                    You can upload images (JPG, PNG, GIF), documents (PDF, DOC, DOCX), and videos (MP4) as attachments.
                    The maximum file size is 10MB per file, and you can upload up to 5 files per complaint.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Is there a mobile app available?</AccordionTrigger>
                  <AccordionContent>
                    Currently, we offer a mobile-responsive web application. A dedicated mobile app for iOS and Android
                    is under development and will be released in the near future.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>What should I do if I encounter a technical issue?</AccordionTrigger>
                  <AccordionContent>
                    If you encounter any technical issues while using the system, please contact our support team at
                    support@citizenengagement.gov or use the "Report an Issue" link at the bottom of the page. Please
                    include details about the issue and screenshots if possible.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold mb-4">Still have questions?</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/submit?category=technical">Report a Technical Issue</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
