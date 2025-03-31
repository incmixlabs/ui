/* eslint-disable react-refresh/only-export-components */
import { Card as RadixCard } from "@radix-ui/themes"
export { cardPropDefs} from "@radix-ui/themes/components/card.props"
import { CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "../shadcn/card"

interface CardContainerProps {
  children: React.ReactNode
  className?: string
}

const CardContainer: React.FC<CardContainerProps> = ({
  children,
  className = "",
}) => {
  return <RadixCard className={`bg-gray-2 p-6 ${className}`}>{children}</RadixCard>
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
