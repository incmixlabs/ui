// components/kanban-board/shared/ref-url-summary.tsx
import { Flex, Text } from "@/base"
import { ExternalLink, Figma, Link } from "lucide-react"

interface RefUrlSummaryProps {
  refUrls?: Array<{ type: string }>
  className?: string
}

export function RefUrlSummary({ refUrls, className }: RefUrlSummaryProps) {
  if (!refUrls || refUrls.length === 0) return null

  const urlCounts = {
    figma: refUrls.filter((url) => url.type === "figma").length,
    task: refUrls.filter((url) => url.type === "task").length,
    external: refUrls.filter((url) => url.type === "external").length,
  }

  return (
    <Flex align="center" gap="2" className={className}>
      {urlCounts.figma > 0 && (
        <Flex
          align="center"
          gap="1"
          title={`${urlCounts.figma} Figma link${urlCounts.figma > 1 ? "s" : ""}`}
        >
          <Figma size={20} className="text-purple-500" />
          {urlCounts.figma > 0 && (
            <Text size="4" className="font-medium">
              {urlCounts.figma}
            </Text>
          )}
        </Flex>
      )}
      {urlCounts.task > 0 && (
        <Flex
          align="center"
          gap="1"
          title={`${urlCounts.task} Task link${urlCounts.task > 1 ? "s" : ""}`}
        >
          <Link size={20} className="text-blue-500" />
          {urlCounts.task > 0 && (
            <Text size="4" className="font-medium">
              {urlCounts.task}
            </Text>
          )}
        </Flex>
      )}
      {urlCounts.external > 0 && (
        <Flex
          align="center"
          gap="1"
          title={`${urlCounts.external} External link${urlCounts.external > 1 ? "s" : ""}`}
        >
          <ExternalLink size={20} className="text-green-500" />
          {urlCounts.external > 0 && (
            <Text size="4" className="font-medium">
              {urlCounts.external}
            </Text>
          )}
        </Flex>
      )}
    </Flex>
  )
}
