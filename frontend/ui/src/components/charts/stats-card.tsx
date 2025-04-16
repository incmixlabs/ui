import { Card } from "@components/radixui/card"
import { cn } from "@utils/cn"
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
    <Card.Root className="w-full p-0">
      <Card.Header
        className={cn(" flex flex-col items-center justify-center", className)}
      >
        <div className={cn("mb-2 rounded-xl p-4", iconClassName)}>{icon}</div>
        <Card.Title className="text-center font-medium font-poppins text-3xl">
          {count}
        </Card.Title>
        <Card.Description>{label}</Card.Description>
      </Card.Header>
    </Card.Root>
  )
}
