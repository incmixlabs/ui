import { Box, Flex, Heading, Icon, IconButton, Text } from "@/base"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/utils/cn"
import { useRouter } from "@tanstack/react-router"
import { SidebarTrigger } from "./sidebar"
interface PageHeaderProps {
  title?: string | React.ReactNode
  email?: string | React.ReactNode
  description?: string | React.ReactNode
  actions?: React.ReactNode
  className?: string
  align?: "center" | "start" | "end" | "baseline" | "stretch"
  justify?: "center" | "start" | "end" | "between"
}

export function PageHeader({
  title,
  email,
  align = "center",
  justify = "between",
  description,
  actions,
  className,
}: PageHeaderProps) {
  const isMobile = useIsMobile()
  const router = useRouter()
  return (
    <Flex
      align={align}
      justify={justify}
      className={cn("my-4 gap-2", className)}
    >
      <Flex align="center" gap="2">
        <IconButton onClick={() => router.history.back()}>
          <Icon name="ArrowLeft" className="h-5 w-5" />
        </IconButton>
        {isMobile && <SidebarTrigger mobileSidebarTrigger />}
        <Box>
          {title && (
            <Heading variant="pageTitle" className="capitalize">
              {title}
            </Heading>
          )}
          {email && (
            <Text as="p" className="text-muted-foreground text-sm">
              {email}
            </Text>
          )}
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
