/* eslint-disable react-refresh/only-export-components */
import { Dialog as RadixDialog, Flex } from "@radix-ui/themes"

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <Flex gap="3" mt="4" justify="end">
      {children}
    </Flex>
  )
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <Flex className="flex-col gap-2 text-center sm:text-left">
      {children}
    </Flex>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const Dialog = {
  Root: RadixDialog.Root,
  Trigger: RadixDialog.Trigger,
  Content: RadixDialog.Content,
  Title: RadixDialog.Title,
  Description: RadixDialog.Description,
  Close: RadixDialog.Close,
  Footer,
  Header
}

// Import from the public API instead of internal paths to avoid breaking changes
export { dialogContentPropDefs } from "@radix-ui/themes/src/components/dialog.props.js"
