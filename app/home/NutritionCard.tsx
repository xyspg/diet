"use client"

import { Bar, BarChart, Label, Rectangle, ReferenceLine, XAxis } from "recharts"
import { useMemo } from "react"
import { useMealRecordsStore } from "@/store/MealRecordsStore"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export default function Component() {
  const { records } = useMealRecordsStore()

  const last7DaysData = useMemo(() => {
    const today = new Date()
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateString = date.toISOString().split('T')[0]
      const record = records.find(r => r.date === dateString)
      return {
        date: dateString,
        calories: record?.nutrition.calories || 0
      }
    }).reverse()
  }, [records])

  const todayCalories = last7DaysData[6]?.calories || 0
  const averageCalories = Math.round(last7DaysData.reduce((sum, day) => sum + day.calories, 0) / 7)

  return (
    <Card className="lg:max-w-md">
      <CardHeader className="space-y-0 pb-2">
        <CardDescription>今天</CardDescription>
        <CardTitle className="text-4xl tabular-nums">
          {Math.round(todayCalories)}{" "}
          <span className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
            Kcal
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            calories: {
              label: "Kcal",
              color: "hsl(var(--chart-1))",
            },
          }}
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: -4,
              right: -4,
            }}
            data={last7DaysData}
          >
            <Bar
              dataKey="calories"
              fill="var(--color-calories)"
              radius={5}
              fillOpacity={0.6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              tickFormatter={(value) => {
                return new Date(value).toLocaleDateString("en-US", {
                  weekday: "short",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideIndicator
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  }}
                />
              }
              cursor={false}
            />
            <ReferenceLine
              y={averageCalories}
              stroke="hsl(var(--muted-foreground))"
              strokeDasharray="3 3"
              strokeWidth={1}
            >
              <Label
                position="insideBottomLeft"
                value="平均 Kcal"
                offset={10}
                fill="hsl(var(--foreground))"
              />
              <Label
                position="insideTopLeft"
                value={averageCalories}
                className="text-lg"
                fill="hsl(var(--foreground))"
                offset={10}
                startOffset={100}
              />
            </ReferenceLine>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1">
        <CardDescription>
          在过去 7 天，您日均摄入{" "}
          <span className="font-medium text-foreground">{averageCalories}</span> Kcal.
        </CardDescription>
        <CardDescription>
          您需要达到 <span className="font-medium text-foreground">{Math.round(todayCalories)} Kcal</span>{" "}
          来满足您的目标。
        </CardDescription>
      </CardFooter>
    </Card>
  )
}
