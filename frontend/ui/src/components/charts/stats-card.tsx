import { Card, CardDescription, CardHeader, CardTitle } from "@shadcn/card"
import { cn } from "@utils"
interface StatsCardProps {
  count: number
  label: string
  iconClassName: string
  className?: string
  icon: React.ReactNode
}

export function StatsCard({
  count,
  label,
  iconClassName,
  className,
  icon,
}: StatsCardProps) {
  return (
    <Card className="w-full p-0">
      <CardHeader
        className={cn(" flex flex-col items-center justify-center", className)}
      >
        <div className={cn("mb-2 rounded-xl p-4", iconClassName)}>{icon}</div>
        <CardTitle className="text-center font-medium font-poppins text-3xl">
          {count}
        </CardTitle>
        <CardDescription>{label}</CardDescription>
      </CardHeader>
    </Card>
  )
}
