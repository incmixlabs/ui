import { Card } from "@radix-ui/themes"
export { cardPropDefs} from "@radix-ui/themes/components/card.props"
interface CardContainerProps {
  children: React.ReactNode
  className?: string
}

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = "",
}) => {
  return <Card className={`bg-gray-2 p-6 ${className}`}>{children}</Card>
}
export { Card, CardContainer }
export { CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/shadcn/card"
