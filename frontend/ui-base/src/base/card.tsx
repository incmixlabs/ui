import { Card as RadixCard } from "@/radix-ui/card"
export { cardPropDefs } from "@/radix-ui/card.props"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn-ui/card"
import { cn } from "@/shadcn/lib/utils"

interface CardContainerProps {
  children: React.ReactNode
  className?: string
}

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <RadixCard
      variant="surface"
      className={cn("border-0 bg-gray-2 p-4", className)}
      {...props}
    >
      {children}
    </RadixCard>
  )
}
export { CardContainer }
export const Card = {
  Root: RadixCard,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
}
