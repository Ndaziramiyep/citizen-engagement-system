"use client";
import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, CheckCircle, Clock, FileText, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from '@/lib/auth-context'

type Complaint = {
  id: number;
  subject: string;
  description: string;
  status: string;
  created_at: string;
  progress?: number;
  // Add any other fields your backend returns
};

function getStatus(complaint: Complaint) {
  // You may want to adjust this logic based on your complaint schema
  if (complaint.status === "Resolved") return "Resolved";
  if (complaint.status === "In Progress") return "In Progress";
  if (complaint.status === "Under Review") return "Under Review";
  return complaint.status || "Unknown";
}

export default function Dashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("/api/v1/complaints", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch complaints");
        const data = await res.json();
        setComplaints(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Error loading complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  // Compute stats
  const total = complaints.length;
  const inProgress = complaints.filter(c => getStatus(c) === "In Progress").length;
  const resolved = complaints.filter(c => getStatus(c) === "Resolved").length;
  // You can add more stats as needed

  // Categorize complaints for tabs
  const recentComplaints = complaints.slice(0, 2); // Show 2 most recent
  const inProgressComplaints = complaints.filter(c => getStatus(c) === "In Progress");
  const resolvedComplaints = complaints.filter(c => getStatus(c) === "Resolved");

  if (loading) return <div className="p-8">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back{user ? `, ${user.firstName}` : ""}! Here's an overview of your complaints and feedback.
          </p>
        </div>
        <Button asChild>
          <Link href="/submit">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Complaint
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{inProgress}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{resolved}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">-</div>
            <p className="text-xs text-muted-foreground">(Coming soon)</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="recent">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="recent">Recent Submissions</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="resolved">Resolved</TabsTrigger>
          </TabsList>
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/complaints">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <TabsContent value="recent" className="pt-4">
          <div className="grid gap-4">
            {recentComplaints.length === 0 && <div>No recent complaints.</div>}
            {recentComplaints.map((c) => (
              <Card key={c.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{c.subject}</CardTitle>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800 border-yellow-200">
                      {getStatus(c)}
                    </div>
                  </div>
                  <CardDescription>Submitted on {new Date(c.created_at).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{c.description}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>-</span>
                        </div>
                        <Progress value={c.progress || 0} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={`/track?id=${c.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="progress" className="pt-4">
          <div className="grid gap-4">
            {inProgressComplaints.length === 0 && <div>No complaints in progress.</div>}
            {inProgressComplaints.map((c) => (
              <Card key={c.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{c.subject}</CardTitle>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-yellow-100 text-yellow-800 border-yellow-200">
                      {getStatus(c)}
                    </div>
                  </div>
                  <CardDescription>Submitted on {new Date(c.created_at).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-yellow-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{c.description}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>-</span>
                        </div>
                        <Progress value={c.progress || 0} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={`/track?id=${c.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="resolved" className="pt-4">
          <div className="grid gap-4">
            {resolvedComplaints.length === 0 && <div>No resolved complaints.</div>}
            {resolvedComplaints.map((c) => (
              <Card key={c.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle>{c.subject}</CardTitle>
                    <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-green-100 text-green-800 border-green-200">
                      {getStatus(c)}
                    </div>
                  </div>
                  <CardDescription>Submitted on {new Date(c.created_at).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm">{c.description}</p>
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span>Resolved in</span>
                          <span>-</span>
                        </div>
                        <Progress value={100} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={`/track?id=${c.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
