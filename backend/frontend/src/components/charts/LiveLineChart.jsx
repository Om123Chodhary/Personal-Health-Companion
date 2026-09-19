import React from 'react'
import {
  LineChart, Line, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, ReferenceLine,
} from 'recharts'

function LiveLineChart({
  data,
  dataKey,
  color = '#3b82f6',
  label = 'Value',
  unit = '',
  domain = ['auto', 'auto'],
  baseline = null,
}) {
  // ⭐ Data format: array of reading objects with timestamp
  const chartData = data.map((point, i) => {
    const ts = point.timestamp ? new Date(point.timestamp) : null
    return {
      index: i,
      value: point[dataKey],
      timestamp: ts,
      // For tooltip (full time with seconds)
      displayTime: ts
        ? ts.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        : `#${i + 1}`,
      // For X-axis (only HH:MM:SS)
      axisLabel: ts
        ? ts.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          })
        : `#${i + 1}`,
    }
  })

  // Tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload || !payload.length) return null
    const p = payload[0].payload
    return (
      <div className="bg-phc-card border border-phc-border rounded-lg p-2.5 shadow-xl">
        <div className="text-xs text-phc-muted mb-1 font-mono">{p.displayTime}</div>
        <div className="text-sm font-semibold text-phc-text">
          {label}: <span style={{ color }}>{Number(p.value).toFixed(1)}</span>{unit}
        </div>
        {baseline !== null && (
          <div className="text-xs text-phc-muted mt-1">
            Baseline: {baseline}{unit}
          </div>
        )}
      </div>
    )
  }

  // X-axis tick formatter — sirf kuch ticks pe time dikhao (clutter avoid)
  const formatXAxis = (value, index) => {
    // Har 10th tick pe time dikhao
    if (index % 10 === 0) {
      return chartData[index]?.axisLabel || ''
    }
    return ''
  }

  return (
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#334155"
            vertical={false}
          />

          <XAxis
            dataKey="index"
            stroke="#64748b"
            tick={{ fontSize: 9, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={{ stroke: '#334155' }}
            tickFormatter={formatXAxis}
            interval={0}
            height={25}
          />

          <YAxis
            stroke="#64748b"
            tick={{ fontSize: 10, fill: '#94a3b8' }}
            tickLine={false}
            axisLine={{ stroke: '#334155' }}
            domain={domain}
            width={40}
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#475569', strokeWidth: 1, strokeDasharray: '4 4' }}
          />

          {/* Baseline reference line */}
          {baseline !== null && (
            <ReferenceLine
              y={baseline}
              stroke="#475569"
              strokeDasharray="4 4"
              strokeWidth={1}
              label={{
                value: 'baseline',
                position: 'insideTopRight',
                fill: '#64748b',
                fontSize: 9,
              }}
            />
          )}

          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
            activeDot={{ r: 4, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default LiveLineChart