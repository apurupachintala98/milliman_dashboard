interface DataTableProps {
  data: Array<{
    endpoint: string
    requests: number
    avgResponseTime: number
    errorRate: number
  }>
}

export function DataTable({ data }: DataTableProps) {
  return (
    <div className="w-full overflow-x-auto">
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
  )
}
