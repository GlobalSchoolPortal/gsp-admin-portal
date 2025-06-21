"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"
import apiClient from "@/lib/api"
import { Skeleton } from "@/components/ui/skeleton"

interface StatsCardProps {
  title: string
  icon: LucideIcon
  endpoint?: string
  defaultValue?: string
  defaultDescription?: string
}

interface StatsData {
  value: string
  description: string
}

export function StatsCard({ title, icon: Icon, endpoint, defaultValue, defaultDescription }: StatsCardProps) {
  const [stats, setStats] = useState<StatsData | null>(null)
  const [loading, setLoading] = useState(!!endpoint)

  useEffect(() => {
    if (endpoint) {
      loadStats()
    } else {
      setStats({
        value: defaultValue || "0",
        description: defaultDescription || "No data available",
      })
      setLoading(false)
    }
  }, [endpoint, defaultValue, defaultDescription])

  const loadStats = async () => {
    try {
      const response = await apiClient.getDashboardStats()
      if (response.success) {
        // Extract the specific stat based on title
        const statKey = title.toLowerCase().replace(/\s+/g, "_")
        const statData = response.content[statKey]

        if (statData) {
          setStats({
            value: statData.value.toString(),
            description: statData.description || "",
          })
        }
      }
    } catch (error) {
      console.error("Failed to load stats:", error)
      setStats({
        value: defaultValue || "0",
        description: defaultDescription || "Unable to load data",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-24" />
          </div>
        ) : (
          <>
            <div className="text-2xl font-bold">{stats?.value}</div>
            <p className="text-xs text-muted-foreground">{stats?.description}</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
