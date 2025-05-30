// src/hooks/useChartData.ts
import { useState } from "react"

export function useChartData() {
  // Data for the vulnerability by severity donut chart
  const [severityData] = useState([
    { name: "High", value: 32, color: "#e74c3c" },
    { name: "Medium", value: 243, color: "#f39c12" },
    { name: "Low", value: 405, color: "#f1c40f" },
    { name: "Informational", value: 810, color: "#3498db" },
    { name: "Safe", value: 130, color: "#2ecc71" },
  ])

  // Data for the vulnerability by status donut chart
  const [statusData] = useState([
    { name: "Unreviewed", value: 1604, color: "#1abc9c" },
    { name: "Ignored", value: 5, color: "#3498db" },
    { name: "False Positive", value: 3, color: "#9b59b6" },
    { name: "Verified", value: 4, color: "#e67e22" },
    { name: "Remediated", value: 2, color: "#e74c3c" },
    { name: "Duplicated", value: 2, color: "#f1c40f" },
  ])

  // Data for API response time donut chart
  const [responseTimeData] = useState([
    { name: "< 100ms", value: 450, color: "#2ecc71" },
    { name: "100-200ms", value: 680, color: "#3498db" },
    { name: "200-300ms", value: 320, color: "#f1c40f" },
    { name: "300-500ms", value: 120, color: "#f39c12" },
    { name: "500ms+", value: 50, color: "#e74c3c" },
  ])

  // Data for API error rates donut chart
  const [errorRateData] = useState([
    { name: "Success", value: 1520, color: "#2ecc71" },
    { name: "Client Errors", value: 65, color: "#f39c12" },
    { name: "Server Errors", value: 35, color: "#e74c3c" },
  ])

  // Data for top API endpoints donut chart
  const [endpointData] = useState([
    { name: "/api/users", value: 520, color: "#3498db" },
    { name: "/api/products", value: 380, color: "#9b59b6" },
    { name: "/api/orders", value: 290, color: "#1abc9c" },
    { name: "/api/auth", value: 240, color: "#f1c40f" },
    { name: "/api/payments", value: 190, color: "#e74c3c" },
  ])

  // Function to refresh data (could be implemented to fetch from an API)
  const refreshData = () => {
    console.log("Refreshing data...")
    // In a real app, you would fetch fresh data here
  }

  const areaChartData = [
    {
      name: "Severity",
      data: severityData.map(d => d.value),
      categories: severityData.map(d => d.name),
    },
    {
      name: "Status",
      data: statusData.map(d => d.value),
      categories: statusData.map(d => d.name),
    },
    {
      name: "Response Time",
      data: responseTimeData.map(d => d.value),
      categories: responseTimeData.map(d => d.name),
    },
    {
      name: "Error Rate",
      data: errorRateData.map(d => d.value),
      categories: errorRateData.map(d => d.name),
    },
    {
      name: "Endpoint",
      data: endpointData.map(d => d.value),
      categories: endpointData.map(d => d.name),
    },
  ]


  return {
    severityData,
    statusData,
    responseTimeData,
    errorRateData,
    endpointData,
    areaChartData,
    refreshData
  }
}