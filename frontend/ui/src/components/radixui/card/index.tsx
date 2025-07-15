import { Card as RadixCard } from "@radix-ui/themes"
export { cardPropDefs } from "@radix-ui/themes/components/card.props"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/shadcn/card"
import { cn } from "@utils"

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
    <RadixCard variant="surface" className={cn(`bg-gray-2 p-4 border-0`,className)} {...props}>
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
