"use client"

import { useEffect, useRef } from "react"

interface DonutChartProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
  centerText?: string
}

export function DonutChart({ data, centerText }: DonutChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Calculate total value
    const total = data.reduce((sum, item) => sum + item.value, 0)

    // Draw donut chart
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const radius = Math.min(centerX, centerY) * 0.8
    const innerRadius = radius * 0.75 // 75% of radius for donut hole

    let startAngle = 0

    // Draw segments
    data.forEach((item) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true)
      ctx.closePath()

      ctx.fillStyle = item.color
      ctx.fill()

      startAngle += sliceAngle
    })

    // Draw center text if provided
    if (centerText) {
      const lines = centerText.split("\n")

      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      if (lines.length === 1) {
        ctx.font = "bold 16px Arial"
        ctx.fillStyle = "white"
        ctx.fillText(lines[0], centerX, centerY)
      } else {
        ctx.font = "bold 20px Arial"
        ctx.fillStyle = "white"
        ctx.fillText(lines[0], centerX, centerY - 10)

        ctx.font = "14px Arial"
        ctx.fillStyle = "#aaa"
        ctx.fillText(lines[1], centerX, centerY + 15)
      }
    }
  }, [data, centerText])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
