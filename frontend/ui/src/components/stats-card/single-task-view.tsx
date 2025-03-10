import { Card, CardDescription, CardHeader, CardTitle } from "../card/card"

interface SingleTaskViewProps {
  count: number
  label: string
  backgroundColor: string
  icon: React.ReactNode
}

export function SingleTaskView({
  count,
  label,
  backgroundColor,
  icon,
}: SingleTaskViewProps) {
  return (
    <Card className="w-[160px] p-0">
      <CardHeader className=" flex flex-col items-center justify-center">
        <div className="mb-2 rounded-[14px] p-4" style={{ backgroundColor }}>
          {icon}
        </div>
        <CardTitle className="text-center font-medium font-poppins text-[32px]">
          {count}
        </CardTitle>
        <CardDescription>{label}</CardDescription>
      </CardHeader>
    </Card>
  )
}
