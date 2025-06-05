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
  const processedData = data.map((item) => ({
    ...item,
    color: item.value === 200 ? "green" : "red",
  }));

  return (
    <div className="bg-[#2a2e33] rounded-md overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="font-medium">{title}</h2>
      </div>

      {/* Card Content */}
      <div className="p-6">
        <div className="h-48 mb-6">
          <DonutChart data={processedData} centerText={centerText.replace("\\n", "\n")} />
        </div>
      </div>
    </div>
  );
}
