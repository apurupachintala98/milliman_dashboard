import {
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

interface AreaChartProps {
  data: Array<{
    name: string
    data: number[]
    categories: string[]
  }>
  color: string
}

export function AreaChart({ data, color }: AreaChartProps) {
  const chartData = data[0].categories.map((category, categoryIndex) => {
    const dataPoint: any = { name: category }

    // Add data from each series
    data.forEach((series, seriesIndex) => {
      dataPoint[series.name] = series.data[categoryIndex]
    })

    return dataPoint
  })

  // Generate unique colors for each series
  const colors = [
    "#3498db", // blue
    "#2ecc71", // green
    "#e74c3c", // red
    "#f39c12", // orange
    "#9b59b6", // purple
  ]

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsAreaChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
        <defs>
          {data.map((series, index) => (
            <linearGradient key={`gradient-${index}`} id={`colorGradient-${index}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors[index % colors.length]} stopOpacity={0.8} />
              <stop offset="95%" stopColor={colors[index % colors.length]} stopOpacity={0.1} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#444" vertical={false} />
        <XAxis dataKey="name" tick={{ fill: "#aaa", fontSize: 12 }} axisLine={{ stroke: "#555" }} />
        <YAxis tick={{ fill: "#aaa", fontSize: 12 }} axisLine={{ stroke: "#555" }} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#2a2e33",
            border: "1px solid #555",
            borderRadius: "4px",
            color: "#fff",
          }}
        />
        <Legend
          wrapperStyle={{ color: "#aaa", fontSize: 12 }}
          formatter={(value) => <span style={{ color: "#aaa" }}>{value}</span>}
        />

        {data.map((series, index) => (
          <Area
            key={`area-${index}`}
            type="monotone"
            dataKey={series.name}
            stroke={colors[index % colors.length]}
            fillOpacity={0.3}
            fill={`url(#colorGradient-${index})`}
            stackId="1"
          />
        ))}
      </RechartsAreaChart>
    </ResponsiveContainer>
  )
}

