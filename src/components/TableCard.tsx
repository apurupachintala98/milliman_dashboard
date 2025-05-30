import { ExternalLink } from "lucide-react"

interface TableCardProps {
  title: string
  data: Array<{
    endpoint: string
    requests: number
    avgResponseTime: number
    errorRate: number
  }>
  summary: string
}

export function TableCard({ title, data, summary }: TableCardProps) {
  return (
    <div className="bg-[#2a2e33] rounded-md overflow-hidden">
      {/* Card Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="font-medium">{title}</h2>
        <button className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-700">
          <ExternalLink className="h-4 w-4" />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col">
        <div className="w-full mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="pb-2 font-medium">Endpoint</th>
                <th className="pb-2 font-medium text-right">Requests</th>
                <th className="pb-2 font-medium text-right">Avg. Response</th>
                <th className="pb-2 font-medium text-right">Error Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index} className="border-b border-gray-700/50">
                  <td className="py-3 text-blue-400">{item.endpoint}</td>
                  <td className="py-3 text-right">{item.requests.toLocaleString()}</td>
                  <td className="py-3 text-right">{item.avgResponseTime}ms</td>
                  <td className="py-3 text-right">
                    <span
                      className={
                        item.errorRate > 2 ? "text-red-400" : item.errorRate > 1 ? "text-yellow-400" : "text-green-400"
                      }
                    >
                      {item.errorRate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="text-center text-gray-300 mb-6">{summary}</p>

        <button className="text-blue-400 hover:text-blue-300 flex items-center self-center">
          View All Endpoints <ExternalLink className="h-3 w-3 ml-1" />
        </button>
      </div>
    </div>
  )
}
