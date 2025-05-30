import { ExternalLink } from "lucide-react"
import { AreaChart } from "./charts/AreaChart"

interface AreaChartCardProps {
  title: string
  data: Array<{
    name: string
    data: number[]
    categories: string[]
  }>
  color: string
  latestRun: string
  latestDataMed: string
  latestDataRx: string
  recordCount: string
}

export function AreaChartCard({
  title,
  data,
  color,
  latestRun,
  latestDataMed,
  latestDataRx,
  recordCount,
}: AreaChartCardProps) {
  return (
    <div className="bg-[#2a2e33] rounded-md overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="font-medium">{title}</h2>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="h-50 mb-6">
          <AreaChart data={data} color={color} />
        </div>
      </div>
    </div>
  )
}
