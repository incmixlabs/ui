import type { ReactElement } from "react"
import {
  Accordion as RadixAccordion,
  AccordionContent as RadixAccordionContent,
  AccordionItem as RadixAccordionItem,
  AccordionTrigger as RadixAccordionTrigger,
} from "./shadcn-accordion"

export type AccordionItems = {
  open?: boolean
  value?: string
  label: string
  content?: string
}
export type AccordionProps = {
  type?: "single" | "multiple"
  items: AccordionItems[]
  icon?: ReactElement
  className?: string
  triggerClassName?: string
}

export const Accordion = ({ type = "single", items }: AccordionProps) => {
  return (
    <RadixAccordion type={type}>
      {items.map((item, index) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
        <RadixAccordionItem value={item.value ?? index.toString()} key={index}>
          <RadixAccordionTrigger>{item.label}</RadixAccordionTrigger>
          <RadixAccordionContent>{item.content}</RadixAccordionContent>
        </RadixAccordionItem>
      ))}
    </RadixAccordion>
  )
}

export { RadixAccordionContent as AccordionContent }
export { RadixAccordionItem as AccordionItem }
export { RadixAccordionTrigger as AccordionTrigger }
