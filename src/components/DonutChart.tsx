import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts"
import { useState, useEffect } from "react"

interface DonutChartProps {
  data: Array<{
    name: string
    value: number
    color: string
  }>
  centerText: string
}

export function DonutChart({ data, centerText }: DonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)
  const [isAnimationActive, setIsAnimationActive] = useState(true)
  
  // Reset animation when data changes
  useEffect(() => {
    setIsAnimationActive(true)
    const timer = setTimeout(() => {
      setIsAnimationActive(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [data])

  // Split center text into lines
  const centerTextLines = centerText ? centerText.split("\n") : []
  
  // Handle mouse enter/leave for hover effects
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }
  
  const onPieLeave = () => {
    setActiveIndex(undefined)
  }

  // Custom active shape for hover effect
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props
    
    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 5}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    )
  }

  return (
    <div className="w-full h-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="75%"
            outerRadius="100%"
            paddingAngle={1}
            dataKey="value"
            stroke="none"
            isAnimationActive={isAnimationActive}
            animationDuration={800}
            animationBegin={0}
            animationEasing="ease-out"
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {centerTextLines.length > 0 && (
          <>
            <div className="text-xl font-bold text-white">{centerTextLines[0]}</div>
            {centerTextLines.length > 1 && (
              <div className="text-xs text-gray-400">{centerTextLines[1]}</div>
            )}
          </>
        )}
      </div>


        
    </div>
  )
}