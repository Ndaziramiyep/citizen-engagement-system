import Link from "next/link"
import { ArrowRight, CheckCircle, Clock, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary text-primary-foreground py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Citizen Engagement System</h1>
          <p className="text-lg md:text-xl max-w-3xl mb-8">
            A direct line to your government. Submit complaints, track progress, and help improve public services in
            your community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="font-semibold bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              <Link href="/submit">
                Submit a Complaint
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-primary-foreground text-primary font-semibold">
              <Link href="/track">Track Your Complaint</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="pb-2">
                  <FileText className="h-10 w-10 text-secondary mb-2" />
                  <CardTitle>Submit</CardTitle>
                  <CardDescription>
                    Fill out a simple form with details about your complaint or feedback
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Provide information about the issue, location, and relevant details. Upload photos if needed.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <Clock className="h-10 w-10 text-secondary mb-2" />
                  <CardTitle>Track</CardTitle>
                  <CardDescription>Monitor the status of your submission in real-time</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Use your unique tracking ID to check updates and progress on your complaint.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CheckCircle className="h-10 w-10 text-secondary mb-2" />
                  <CardTitle>Resolve</CardTitle>
                  <CardDescription>
                    Receive updates and resolution from the appropriate government agency
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>Get notified when your issue is addressed and provide feedback on the resolution.</p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="mb-16">
            <div className="bg-muted rounded-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Use Our Platform?</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-secondary mr-2 flex-shrink-0" />
                      <span>Direct routing to the appropriate government agency</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-secondary mr-2 flex-shrink-0" />
                      <span>Transparent tracking of your complaint status</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-secondary mr-2 flex-shrink-0" />
                      <span>Faster resolution through streamlined processes</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-6 w-6 text-secondary mr-2 flex-shrink-0" />
                      <span>Contribute to improving public services in your community</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-background rounded-lg p-6 shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Recent Success Stories</h3>
                  <div className="space-y-4">
                    <div className="pb-4 border-b">
                      <p className="font-medium">Road Repair in Downtown</p>
                      <p className="text-sm text-muted-foreground">Resolved in 5 days</p>
                    </div>
                    <div className="pb-4 border-b">
                      <p className="font-medium">Street Light Maintenance</p>
                      <p className="text-sm text-muted-foreground">Resolved in 3 days</p>
                    </div>
                    <div>
                      <p className="font-medium">Park Cleanup Initiative</p>
                      <p className="text-sm text-muted-foreground">Resolved in 7 days</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Supported Service Categories</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: "Roads & Infrastructure", slug: "roads-infrastructure" },
                { name: "Water Supply", slug: "water-supply" },
                { name: "Electricity", slug: "electricity" },
                { name: "Waste Management", slug: "waste-management" },
                { name: "Public Transport", slug: "public-transport" },
                { name: "Healthcare Services", slug: "healthcare" },
                { name: "Education", slug: "education" },
                { name: "Public Safety", slug: "public-safety" },
              ].map((category) => (
                <Link
                  key={category.slug}
                  href={`/submit?category=${category.slug}`}
                  className="bg-muted rounded-lg p-4 text-center hover:bg-muted/80 transition-colors hover:shadow-md"
                >
                  <p className="font-medium">{category.name}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <footer className="bg-muted py-8 px-4 md:px-6 lg:px-8 mt-12">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Citizen Engagement System</h3>
              <p className="text-muted-foreground">
                Connecting citizens with government services for a better community.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/submit" className="text-muted-foreground hover:text-foreground transition-colors">
                    Submit a Complaint
                  </Link>
                </li>
                <li>
                  <Link href="/track" className="text-muted-foreground hover:text-foreground transition-colors">
                    Track Your Complaint
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-muted-foreground hover:text-foreground transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Contact</h3>
              <address className="not-italic text-muted-foreground">
                <p>City Hall</p>
                <p>123 Government Street</p>
                <p>Anytown, ST 12345</p>
                <p className="mt-2">support@citizenengagement.gov</p>
              </address>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
            <p>© {new Date().getFullYear()} Citizen Engagement System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
