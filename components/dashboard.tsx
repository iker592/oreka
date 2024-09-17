'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DayPicker } from 'react-day-picker'
import { addDays, startOfWeek, endOfWeek, format } from 'date-fns'
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react'

const generateMockWeeklyMood = (baseDate: Date) => {
  const weekStart = startOfWeek(baseDate)
  return Array.from({ length: 7 }, (_, i) => {
    const day = addDays(weekStart, i)
    return {
      name: format(day, 'EEE'),
      value: Math.floor(Math.random() * 5) + 1,
      date: format(day, 'yyyy-MM-dd'),
    }
  })
}

const generateMockMonthlyData = (startDate: Date) => {
  const monthData: Record<string, any[]> = {}
  let currentDate = new Date(startDate)
  const endDate = new Date(currentDate)
  endDate.setFullYear(endDate.getFullYear() + 1)

  while (currentDate < endDate) {
    const weekKey = format(startOfWeek(currentDate), 'yyyy-MM-dd')
    monthData[weekKey] = Math.random() > 0.2 ? generateMockWeeklyMood(currentDate) : []
    currentDate = addDays(currentDate, 7)
  }

  return monthData
}

const mockData = [
  { 
    id: 1, 
    name: "Alice Johnson", 
    lastCheckIn: "2024-05-15", 
    moodScore: 4,
    weeklyMoodData: generateMockMonthlyData(new Date(2024, 0, 1)),
    onboardingCheckup: {
      mentalHealth: "Good",
      stressLevel: "Moderate",
      sleepQuality: "Fair",
      workLifeBalance: "Needs improvement",
      mentalHealthConcerns: "Occasional anxiety",
    },
    monthlyCheckup: {
      overallMood: "Positive",
      significantStressors: "Work deadlines",
      progressTowardsGoals: "On track",
      sleepAppetiteChanges: "No significant changes",
      improvementFocus: "Work-life balance",
    },
    dailyCheckups: [
      { mood: 4, comment: "Productive day at work", date: "2024-05-15" },
      { mood: 3, comment: "Feeling a bit tired", date: "2024-05-14" },
      { mood: 5, comment: "Great day out with friends", date: "2024-05-13" },
    ]
  },
  { 
    id: 2, 
    name: "Bob Smith", 
    lastCheckIn: "2024-05-16", 
    moodScore: 3,
    weeklyMoodData: generateMockMonthlyData(new Date(2024, 0, 1)),
    onboardingCheckup: {
      mentalHealth: "Fair",
      stressLevel: "High",
      sleepQuality: "Poor",
      workLifeBalance: "Struggling",
      mentalHealthConcerns: "Stress and insomnia",
    },
    monthlyCheckup: {
      overallMood: "Fluctuating",
      significantStressors: "Financial concerns",
      progressTowardsGoals: "Slower than expected",
      sleepAppetiteChanges: "Decreased appetite",
      improvementFocus: "Stress management",
    },
    dailyCheckups: [
      { mood: 3, comment: "Tough day at work", date: "2024-05-16" },
      { mood: 4, comment: "Relaxing evening", date: "2024-05-15" },
      { mood: 2, comment: "Worried about upcoming project", date: "2024-05-14" },
    ]
  }
]

export function DashboardComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState(mockData[0])
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const filteredData = mockData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleUserSelect = (user: typeof mockData[0]) => {
    setSelectedUser(user)
    setSelectedDate(new Date())
  }

  const getWeeklyMoodData = () => {
    if (!selectedDate) return []
    const weekStart = startOfWeek(selectedDate)
    const weekKey = format(weekStart, 'yyyy-MM-dd')
    return selectedUser.weeklyMoodData[weekKey] || []
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
  }

  const weeklyMoodData = getWeeklyMoodData()
  const hasData = weeklyMoodData.length > 0

  return (
    <div className="space-y-6 p-6 bg-gray-900 min-h-screen text-gray-100">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-gray-100">Dashboard</h2>
        <Input
          type="search"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm bg-gray-800 text-gray-100 border-gray-700 placeholder-gray-400"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-100">User List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-300">Name</TableHead>
                  <TableHead className="text-gray-300">Last Check-in</TableHead>
                  <TableHead className="text-gray-300">Mood Score</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((user) => (
                  <TableRow 
                    key={user.id} 
                    className={`cursor-pointer transition-colors ${user.id === selectedUser.id ? "bg-blue-800" : "hover:bg-gray-700"}`}
                    onClick={() => handleUserSelect(user)}
                  >
                    <TableCell className="font-medium text-gray-100">{user.name}</TableCell>
                    <TableCell className="text-gray-300">{user.lastCheckIn}</TableCell>
                    <TableCell className="text-gray-300">{user.moodScore}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" className="bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-[90vw] w-full sm:max-w-[80vw] md:max-w-[70vw] lg:max-w-[60vw] xl:max-w-[50vw] max-h-[90vh] overflow-y-auto bg-gray-800 text-gray-100 border-gray-700">
                          <DialogHeader>
                            <DialogTitle className="text-gray-100">{user.name}&apos;s Details</DialogTitle>
                          </DialogHeader>
                          <UserDetails user={user} />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-100">Weekly Mood Trend for {selectedUser.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-start space-y-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[240px] justify-start text-left font-normal bg-gray-700 text-gray-100 border-gray-600 hover:bg-gray-600">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    className="border-none bg-gray-800 text-gray-100"
                    classNames={{
                      months: "space-y-4",
                      month: "space-y-4",
                      caption: "flex justify-center pt-1 relative items-center",
                      caption_label: "text-sm font-medium",
                      nav: "space-x-1 flex items-center",
                      nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                      nav_button_previous: "absolute left-1",
                      nav_button_next: "absolute right-1",
                      table: "w-full border-collapse space-y-1",
                      head_row: "flex",
                      head_cell: "text-gray-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-gray-400",
                      row: "flex w-full mt-2",
                      cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-gray-700 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 dark:[&:has([aria-selected])]:bg-gray-800",
                      day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                      day_selected: "bg-blue-600 text-gray-100 hover:bg-blue-600 hover:text-gray-100 focus:bg-blue-600 focus:text-gray-100",
                      day_today: "bg-gray-700 text-gray-100 font-bold",
                      day_outside: "text-gray-500 opacity-50 dark:text-gray-400",
                      day_disabled: "text-gray-500 opacity-50 dark:text-gray-400",
                      day_range_middle: "aria-selected:bg-gray-700 aria-selected:text-gray-100 dark:aria-selected:bg-gray-800 dark:aria-selected:text-gray-100",
                      day_hidden: "invisible",
                    }}
                  />
                </PopoverContent>
              </Popover>
              {selectedDate && (
                <>
                  <p className="text-gray-300">Week of {format(startOfWeek(selectedDate), 'PP')} to {format(endOfWeek(selectedDate), 'PP')}</p>
                  {hasData ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={weeklyMoodData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                        <XAxis dataKey="name" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.375rem' }}
                          itemStyle={{ color: '#E5E7EB' }}
                          labelStyle={{ color: '#E5E7EB' }}
                        />
                        <Bar dataKey="value" fill="#60A5FA" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="w-full h-[300px] flex items-center justify-center bg-gray-700 rounded-md">
                      <p className="text-gray-400">No data for this week</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function UserDetails({ user }: { user: typeof mockData[0] }) {
  return (
    <Tabs defaultValue="onboarding" className="w-full">
      <TabsList className="bg-gray-700 flex flex-wrap justify-start">
        <TabsTrigger value="onboarding" className="data-[state=active]:bg-gray-600 text-gray-100 flex-grow sm:flex-grow-0">Onboarding</TabsTrigger>
        <TabsTrigger value="monthly" className="data-[state=active]:bg-gray-600 text-gray-100 flex-grow sm:flex-grow-0">Monthly</TabsTrigger>
        <TabsTrigger value="daily" className="data-[state=active]:bg-gray-600 text-gray-100 flex-grow sm:flex-grow-0">Daily</TabsTrigger>
      </TabsList>
      <div className="max-h-[70vh] overflow-y-auto">
        <TabsContent value="onboarding">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Onboarding Checkup</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.entries(user.onboardingCheckup).map(([key, value]) => (
                  <div key={key} className="break-words">
                    <dt className="font-medium text-gray-400 mb-1">{key}</dt>
                    <dd className="text-gray-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monthly">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Monthly Checkup</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.entries(user.monthlyCheckup).map(([key, value]) => (
                  <div key={key} className="break-words">
                    <dt className="font-medium text-gray-400 mb-1">{key}</dt>
                    <dd className="text-gray-100">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="daily">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-gray-100">Daily Checkups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user.dailyCheckups.map((checkup, index) => (
                  <div key={index} className="p-4 border rounded bg-gray-700 border-gray-600">
                    <p className="mb-2"><strong className="text-gray-300">Date:</strong> <span className="text-gray-100">{checkup.date}</span></p>
                    <p className="mb-2"><strong className="text-gray-300">Mood:</strong> <span className="text-gray-100">{checkup.mood}</span></p>
                    <p><strong className="text-gray-300">Comment:</strong> <span className="text-gray-100">{checkup.comment}</span></p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  )
}