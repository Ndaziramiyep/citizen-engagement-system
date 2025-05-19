"use client"

import { useState } from "react"
import { Calendar, Download } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for analytics
const categoryData = [
  { name: "Roads & Infrastructure", value: 78 },
  { name: "Water Supply", value: 54 },
  { name: "Electricity", value: 42 },
  { name: "Waste Management", value: 36 },
  { name: "Public Transport", value: 21 },
  { name: "Healthcare", value: 18 },
  { name: "Education", value: 12 },
  { name: "Public Safety", value: 9 },
  { name: "Other", value: 16 },
]

const statusData = [
  { name: "New", value: 42 },
  { name: "Under Review", value: 28 },
  { name: "In Progress", value: 35 },
  { name: "Scheduled", value: 19 },
  { name: "Resolved", value: 89 },
  { name: "Closed", value: 24 },
]

const monthlyData = [
  { name: "Jan", complaints: 65, resolved: 40, resolutionTime: 6.2 },
  { name: "Feb", complaints: 59, resolved: 45, resolutionTime: 5.8 },
  { name: "Mar", complaints: 80, resolved: 63, resolutionTime: 5.5 },
  { name: "Apr", complaints: 81, resolved: 71, resolutionTime: 5.1 },
  { name: "May", complaints: 86, resolved: 79, resolutionTime: 4.8 },
  { name: "Jun", complaints: 0, resolved: 0, resolutionTime: 0 },
  { name: "Jul", complaints: 0, resolved: 0, resolutionTime: 0 },
  { name: "Aug", complaints: 0, resolved: 0, resolutionTime: 0 },
  { name: "Sep", complaints: 0, resolved: 0, resolutionTime: 0 },
  { name: "Oct", complaints: 0, resolved: 0, resolutionTime: 0 },
  { name: "Nov", complaints: 0, resolved: 0, resolutionTime: 0 },
  { name: "Dec", complaints: 0, resolved: 0, resolutionTime: 0 },
]

const satisfactionData = [
  { name: "Very Satisfied", value: 42 },
  { name: "Satisfied", value: 58 },
  { name: "Neutral", value: 27 },
  { name: "Dissatisfied", value: 18 },
  { name: "Very Dissatisfied", value: 9 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FF6B6B", "#6B66FF"]

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("last-6-months")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Visualize and analyze complaint data to identify trends and improve services.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="all-time">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Custom Range
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">247</div>
            <div className="flex items-center text-xs text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-1">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              <span>+10.2% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">76.5%</div>
            <div className="flex items-center text-xs text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-1">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              <span>+5.3% from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Resolution Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">4.8 days</div>
            <div className="flex items-center text-xs text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-1">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              <span>-0.6 days from last period</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Citizen Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <div className="flex items-center text-xs text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 mr-1">
                <path
                  fillRule="evenodd"
                  d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                  clipRule="evenodd"
                />
              </svg>
              <span>+3.2% from last period</span>
            </div>
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
            <div className="h-[300px]">
              <ChartContainer
                config={{
                  category: {
                    label: "Category",
                    color: "hsl(var(--chart-1))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical" margin={{ left: 120 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={120} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" name="Complaints" fill="var(--color-category)">
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Complaints by Status</CardTitle>
            <CardDescription>Current status distribution of all complaints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ChartContainer
                config={{
                  status: {
                    label: "Status",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Trends</CardTitle>
          <CardDescription>Complaint submission and resolution trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="volume">
            <TabsList className="mb-4">
              <TabsTrigger value="volume">Complaint Volume</TabsTrigger>
              <TabsTrigger value="resolution">Resolution Time</TabsTrigger>
              <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
            </TabsList>
            <TabsContent value="volume" className="h-[400px]">
              <ChartContainer
                config={{
                  complaints: {
                    label: "Complaints",
                    color: "hsl(var(--chart-1))",
                  },
                  resolved: {
                    label: "Resolved",
                    color: "hsl(var(--chart-2))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="complaints"
                      stroke="var(--color-complaints)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="resolved" stroke="var(--color-resolved)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="resolution" className="h-[400px]">
              <ChartContainer
                config={{
                  resolutionTime: {
                    label: "Avg. Resolution Time (days)",
                    color: "hsl(var(--chart-3))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="resolutionTime"
                      stroke="var(--color-resolutionTime)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
            <TabsContent value="satisfaction" className="h-[400px]">
              <ChartContainer
                config={{
                  satisfaction: {
                    label: "Satisfaction",
                    color: "hsl(var(--chart-4))",
                  },
                }}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {satisfactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </CardFooter>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Departments</CardTitle>
            <CardDescription>Departments with the fastest resolution times</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Parks Department", resolutionTime: 3.2, complaints: 30, satisfaction: 92 },
                { name: "Waste Management", resolutionTime: 3.8, complaints: 36, satisfaction: 89 },
                { name: "Public Works", resolutionTime: 4.5, complaints: 78, satisfaction: 85 },
                { name: "Water Department", resolutionTime: 5.1, complaints: 54, satisfaction: 82 },
                { name: "Electricity Department", resolutionTime: 5.6, complaints: 42, satisfaction: 79 },
              ].map((dept, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{dept.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {dept.complaints} complaints, {dept.satisfaction}% satisfaction
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{dept.resolutionTime} days</p>
                    <p className="text-sm text-muted-foreground">Avg. resolution time</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Areas Needing Improvement</CardTitle>
            <CardDescription>Areas with high complaint volumes or slow resolution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Downtown District", complaints: 45, category: "Roads & Infrastructure", increase: "+15%" },
                { name: "Westside Neighborhood", complaints: 32, category: "Water Supply", increase: "+23%" },
                { name: "North County", complaints: 28, category: "Electricity", increase: "+10%" },
                { name: "East End", complaints: 25, category: "Waste Management", increase: "+8%" },
                { name: "South District", complaints: 22, category: "Public Transport", increase: "+12%" },
              ].map((area, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{area.name}</p>
                    <p className="text-sm text-muted-foreground">{area.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{area.complaints} complaints</p>
                    <p className="text-sm text-red-500">{area.increase} from last period</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
