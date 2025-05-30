import { useState } from "react"

export interface RefreshInterval {
  label: string
  value: number // in milliseconds
}

export function useRefreshIntervals() {
  const [intervals] = useState<RefreshInterval[]>([
    { label: "Every minute", value: 60 * 1000 },
    { label: "Every 5 minutes", value: 5 * 60 * 1000 },
    { label: "Every 15 minutes", value: 15 * 60 * 1000 },
    { label: "Every 30 minutes", value: 30 * 60 * 1000 },
    { label: "Every hour", value: 60 * 60 * 1000 },
  ])

  const [selectedInterval, setSelectedInterval] = useState<RefreshInterval>(intervals[1]) // Default to "Every 5 minutes"

  return {
    intervals,
    selectedInterval,
    setSelectedInterval,
  }
}