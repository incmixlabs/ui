import {
  Box,
  cn,
  Flex,
  Heading,
  Icon,
  IconButton,
  Text,
  useIsMobile,
} from "@incmix/ui";
import { SidebarTrigger } from "@incmix/ui/sidebar";
import { useRouter } from "@tanstack/react-router";
interface PageHeaderProps {
  title?: string | React.ReactNode;
  email?: string | React.ReactNode;
  description?: string | React.ReactNode;
  actions?: React.ReactNode;
  isPreviousIcon?: boolean;
  className?: string;
  align?: "center" | "start" | "end" | "baseline" | "stretch";
  justify?: "center" | "start" | "end" | "between";
}

export function PageHeader({
  title,
  email,
  isPreviousIcon = false,
  align = "center",
  justify = "between",
  description,
  actions,
  className,
}: PageHeaderProps) {
  const isMobile = useIsMobile();
  const router = useRouter();
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
            <Heading size="6" weight="medium" className="capitalize">
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
  );
}
