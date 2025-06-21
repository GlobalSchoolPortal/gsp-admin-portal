"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

const data = [
  { name: "A+", value: 25, color: "#10b981" },
  { name: "A", value: 35, color: "#3b82f6" },
  { name: "B+", value: 20, color: "#8b5cf6" },
  { name: "B", value: 15, color: "#f59e0b" },
  { name: "C+", value: 3, color: "#ef4444" },
  { name: "C", value: 2, color: "#6b7280" },
]

export function SubjectPerformanceChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}
