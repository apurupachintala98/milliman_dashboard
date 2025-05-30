"use client"

import { useState } from "react"

export function useApiMetricsData() {
  // API Response Time Data (Line Chart)
  const [responseTimeData] = useState([
    { name: "00:00", value: 220 },
    { name: "04:00", value: 240 },
    { name: "08:00", value: 290 },
    { name: "12:00", value: 310 },
    { name: "16:00", value: 265 },
    { name: "20:00", value: 205 },
    { name: "24:00", value: 245 },
  ])

  // API Error Rates Data (Bar Chart)
  const [errorRateData] = useState([
    { name: "Mon", error: 2.5, warning: 1.5, success: 96 },
    { name: "Tue", error: 1.8, warning: 2.2, success: 96 },
    { name: "Wed", error: 3.2, warning: 1.3, success: 95.5 },
    { name: "Thu", error: 2.1, warning: 1.9, success: 96 },
    { name: "Fri", error: 2.9, warning: 2.1, success: 95 },
    { name: "Sat", error: 1.2, warning: 0.8, success: 98 },
    { name: "Sun", error: 0.9, warning: 0.6, success: 98.5 },
  ])

  // API Traffic Volume Data (Area Chart)
  const [trafficVolumeData] = useState([
    { name: "Week 1", value: 120 },
    { name: "Week 2", value: 145 },
    { name: "Week 3", value: 135 },
    { name: "Week 4", value: 160 },
    { name: "Week 5", value: 180 },
    { name: "Week 6", value: 165 },
    { name: "Week 7", value: 190 },
  ])

  // Top API Endpoints Data (Table)
  const [topEndpointsData] = useState([
    { endpoint: "/api/users", requests: 125000, avgResponseTime: 210, errorRate: 0.8 },
    { endpoint: "/api/products", requests: 98500, avgResponseTime: 245, errorRate: 1.2 },
    { endpoint: "/api/orders", requests: 76200, avgResponseTime: 320, errorRate: 2.5 },
    { endpoint: "/api/auth/login", requests: 65800, avgResponseTime: 180, errorRate: 1.7 },
    { endpoint: "/api/payments", requests: 42300, avgResponseTime: 290, errorRate: 3.1 },
  ])

  return {
    responseTimeData,
    errorRateData,
    trafficVolumeData,
    topEndpointsData,
  }
}
