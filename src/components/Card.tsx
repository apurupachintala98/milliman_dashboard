import { ExternalLink } from "lucide-react"
import { DonutChart } from "./DonutChart"

interface CardProps {
  title: string
  data: Array<{
    name: string
    value: number
    color: string
  }>
  centerText: string
  latestRun?: string
  latestDataMed?: string
  latestDataRx?: string
  recordCount?: string
}

export function Card({ title, data, centerText, latestRun, latestDataMed, latestDataRx, recordCount }: CardProps) {
  return (
    <div className="bg-[#2a2e33] rounded-md overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="font-medium">{title}</h2>
        {/* <button className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
          <ExternalLink className="h-4 w-4" />
        </button> */}
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="h-48 mb-6">
          <DonutChart data={data} centerText={centerText.replace("\\n", "\n")} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-800 p-3 rounded-md">
            <div className="text-xs text-gray-400 mb-1">Latest Run</div>
            <div className="text-sm font-medium">{latestRun}</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-md">
            <div className="text-xs text-gray-400 mb-1">Record Count</div>
            <div className="text-sm font-medium">{recordCount}</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-md">
            <div className="text-xs text-gray-400 mb-1">Med Data</div>
            <div className="text-sm font-medium">{latestDataMed}</div>
          </div>
          <div className="bg-gray-800 p-3 rounded-md">
            <div className="text-xs text-gray-400 mb-1">Rx Data</div>
            <div className="text-sm font-medium">{latestDataRx}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
