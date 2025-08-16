import { Badge, Box, Button, Flex, Icon, Popover, Text } from "@/base"
import type React from "react"
import { useEffect, useRef, useState } from "react"

export interface RefUrl {
  id: string
  url: string
  title: string
  type: "figma" | "task" | "external"
}

interface TaskRefUrlsProps {
  refUrls: RefUrl[]
  onRemoveUrl?: (urlId: string) => void
  size?: "sm" | "md" | "lg"
}

export const TaskRefUrls: React.FC<TaskRefUrlsProps> = ({
  refUrls,
  onRemoveUrl,
  size = "md",
}) => {
  const [isOpen, setIsOpen] = useState(false)

  // Don't render if no URLs
  if (!refUrls || refUrls.length === 0) {
    return null
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "figma":
        return "Sparkles" // TODO: Replace with actual Figma icon when available
      case "task":
        return "SquareCheck"
      default:
        return "Link"
    }
  }

  const getColorForType = (type: string) => {
    switch (type) {
      case "figma":
        return "purple"
      case "task":
        return "blue"
      default:
        return "gray"
    }
  }

  // Static class mapping for Tailwind compatibility
  const getIconColorClass = (type: string) => {
    switch (type) {
      case "figma":
        return "text-purple-9"
      case "task":
        return "text-blue-9"
      default:
        return "text-gray-9"
    }
  }

  const handleOpenUrl = (url: string, e: React.MouseEvent) => {
    e.stopPropagation()
    window.open(url, "_blank", "noopener,noreferrer")
  }

  const handleRemoveUrl = (urlId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onRemoveUrl?.(urlId)
  }

  const iconSize = size === "sm" ? 16 : size === "lg" ? 20 : 18
  const badgeSize = size === "sm" ? "1" : "2"

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <Button
          variant="ghost"
          size="1"
          className="h-auto p-1 transition-colors hover:bg-gray-3 dark:hover:bg-gray-3"
          onClick={(e) => e.stopPropagation()}
        >
          <Flex align="center" gap="1">
            <Icon
              name="ExternalLink"
              size={iconSize}
              className="text-gray-9 dark:text-gray-9"
            />
            <Text size="1" className="text-gray-10 dark:text-gray-10">
              ({refUrls.length})
            </Text>
          </Flex>
        </Button>
      </Popover.Trigger>

      <Popover.Content
        side="bottom"
        align="start"
        className="z-50 w-80 rounded-md border border-gray-6 bg-white p-0 shadow-lg dark:border-gray-7 dark:bg-[#1a1a1a]"
        sideOffset={4}
      >
        <Box className="rounded-md bg-white p-3 dark:bg-[#1a1a1a]">
          <Flex align="center" justify="between" className="mb-2">
            <Text
              size="2"
              weight="medium"
              className="text-gray-12 dark:text-gray-12"
            >
              Reference URLs ({refUrls.length})
            </Text>
          </Flex>

          <Flex direction="column" gap="2">
            {refUrls.map((refUrl) => (
              <Flex
                key={refUrl.id}
                align="center"
                justify="between"
                className="group rounded-md p-2 transition-colors hover:bg-gray-2 dark:hover:bg-[#2a2a2a]"
              >
                <Flex align="center" gap="2" className="min-w-0 flex-1">
                  <Icon
                    name={getIconForType(refUrl.type)}
                    size={16}
                    className={`${getIconColorClass(refUrl.type)} flex-shrink-0`}
                  />
                  <Text
                    size="2"
                    className="cursor-pointer truncate text-gray-11 transition-colors hover:text-blue-11 dark:text-gray-11 dark:hover:text-blue-11"
                    onClick={(e) => handleOpenUrl(refUrl.url, e)}
                    title={refUrl.title}
                  >
                    {refUrl.title}
                  </Text>
                  <Badge
                    variant="soft"
                    color={getColorForType(refUrl.type) as any}
                    size={badgeSize as any}
                    className="ml-1 flex-shrink-0"
                  >
                    {refUrl.type}
                  </Badge>
                </Flex>

                {onRemoveUrl && (
                  <Button
                    variant="ghost"
                    size="1"
                    className="h-auto p-1 text-gray-9 opacity-0 transition-all hover:bg-red-2 hover:text-red-9 group-hover:opacity-100 dark:text-gray-9 dark:hover:bg-red-3 dark:hover:text-red-9"
                    onClick={(e) => handleRemoveUrl(refUrl.id, e)}
                    title="Remove URL"
                  >
                    <Icon name="X" size={14} />
                  </Button>
                )}
              </Flex>
            ))}
          </Flex>
        </Box>
      </Popover.Content>
    </Popover.Root>
  )
}
