import { Box, Card} from "@base"
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
    <Card.Root className="w-full h-full p-0 bg-gray-2 border-0 shadow-none">
      <Card.Header
        className={cn(" flex flex-col items-center justify-center", className)}
      >
        <Box className={cn("mb-2 rounded-xl p-4", iconClassName)}>{icon}</Box>
        <Card.Title className="text-center font-medium font-poppins text-3xl">
          {count}
        </Card.Title>
        <Card.Description>{label}</Card.Description>
      </Card.Header>
    </Card.Root>
  )
}
