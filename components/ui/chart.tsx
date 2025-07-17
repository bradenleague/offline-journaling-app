"use client";

import * as React from "react";
import * as RechartsPrimitive from "recharts";

import { cn } from "./utils";

interface ChartProps extends React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer> {
  data: Record<string, any>[]
}

function Chart({ data, children, className, ...props }: ChartProps) {
  return (
    <div className={cn("h-[350px] w-full", className)}>
      <RechartsPrimitive.ResponsiveContainer {...props}>
        {children}
      </RechartsPrimitive.ResponsiveContainer>
    </div>
  )
}

interface CustomTooltipProps {
  active?: boolean
  payload?: Array<{
    value: number
    name: string
    color: string
  }>
  label?: string
  className?: string
}

function CustomTooltip({
  active,
  payload,
  label,
  className,
}: CustomTooltipProps) {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <div
      className={cn(
        "rounded-lg border bg-background p-2 shadow-sm",
        className
      )}
    >
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">
            {label}
          </span>
          <span className="font-bold text-muted-foreground">
            {payload[0].value}
          </span>
        </div>
      </div>
    </div>
  )
}

interface CustomLegendProps {
  payload?: Array<{
    value: string
    color: string
  }>
  className?: string
}

function CustomLegend({ payload, className }: CustomLegendProps) {
  if (!payload?.length) {
    return null
  }

  return (
    <div className={cn("flex items-center justify-end gap-4", className)}>
      {payload.map((item) => {
        return (
          <div key={item.value} className="flex items-center gap-1">
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-medium">{item.value}</span>
          </div>
        )
      })}
    </div>
  )
}

Chart.Line = RechartsPrimitive.Line
Chart.Bar = RechartsPrimitive.Bar
Chart.Area = RechartsPrimitive.Area
Chart.XAxis = RechartsPrimitive.XAxis
Chart.YAxis = RechartsPrimitive.YAxis
Chart.CartesianGrid = RechartsPrimitive.CartesianGrid
Chart.Tooltip = CustomTooltip
Chart.Legend = CustomLegend

export { Chart }
