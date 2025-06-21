"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

const data = [
  { day: "Mon", present: 95, absent: 5 },
  { day: "Tue", present: 92, absent: 8 },
  { day: "Wed", present: 96, absent: 4 },
  { day: "Thu", present: 94, absent: 6 },
  { day: "Fri", present: 91, absent: 9 },
]

export function AttendanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="day" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="present" fill="#3b82f6" name="Present" />
        <Bar dataKey="absent" fill="#ef4444" name="Absent" />
      </BarChart>
    </ResponsiveContainer>
  )
}
