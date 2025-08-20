import { Flex, Dialog as RadixDialog } from "@/radix-ui"

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <Flex gap="3" mt="4" justify="end" className="gap-2 sm:space-x-0">
      {children}
    </Flex>
  )
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <Flex className="flex-col gap-2 text-center sm:text-left">{children}</Flex>
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
  Header,
  Footer,
}
// Import from the public API instead of internal paths to avoid breaking changes
export { dialogContentPropDefs as dialogPropDefs } from "@/radix-ui/dialog.props"
