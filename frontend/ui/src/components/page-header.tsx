import { Box, cn, Flex, Heading, Text, useIsMobile } from "@incmix/ui"
import { SidebarTrigger } from "@incmix/ui/sidebar"

interface PageHeaderProps {
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  actions?: React.ReactNode
  className?: string
  align?: "center" | "start" | "end" | "baseline" | "stretch"
  justify?: "center" | "start" | "end" | "between"
}

export function PageHeader({
  title,
  align = "center",
  justify = "between",
  description,
  actions,
  className,
}: PageHeaderProps) {
  const isMobile = useIsMobile()

  return (
    <Flex
      align={align}
      justify={justify}
      className={cn("my-4 gap-2", className)}
    >
      <Flex align="center" gap="2">
        {isMobile && <SidebarTrigger mobileSidebarTrigger />}
        <Box>
          {title &&
          <Heading size="6">{title}</Heading>
          }
          {description && (
            <Text as="p" className="text-muted-foreground text-sm">
              {description}
            </Text>
          )}
        </Box>
      </Flex>
      {actions && <Box>{actions}</Box>}
    </Flex>
  )
}
