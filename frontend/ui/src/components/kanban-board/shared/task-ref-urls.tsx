import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  Icon,
  Popover,
  Badge,
  Button,
} from "@incmix/ui";

export interface RefUrl {
  id: string;
  url: string;
  title: string;
  type: "figma" | "task" | "external";
}

interface TaskRefUrlsProps {
  refUrls: RefUrl[];
  onRemoveUrl?: (urlId: string) => void;
  size?: "sm" | "md" | "lg";
}

export const TaskRefUrls: React.FC<TaskRefUrlsProps> = ({
  refUrls,
  onRemoveUrl,
  size = "md"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Don't render if no URLs
  if (!refUrls || refUrls.length === 0) {
    return null;
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case "figma":
        return "Sparkles"; // Using Sparkles as substitute for Figma
      case "task":
        return "SquareCheck"; // Using SquareCheck instead of CheckSquare
      case "external":
      default:
        return "Link"; // Using Link instead of ExternalLink
    }
  };

  const getColorForType = (type: string) => {
    switch (type) {
      case "figma":
        return "purple";
      case "task":
        return "blue";
      case "external":
      default:
        return "gray";
    }
  };

  const handleOpenUrl = (url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleRemoveUrl = (urlId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onRemoveUrl?.(urlId);
  };

  const iconSize = size === "sm" ? 16 : size === "lg" ? 20 : 18;
  const badgeSize = size === "sm" ? "1" : "2";

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <Button
          variant="ghost"
          size="1"
          className="h-auto p-1 hover:bg-gray-3 dark:hover:bg-gray-3 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Flex align="center" gap="1">
            <Icon name="ExternalLink" size={iconSize} className="text-gray-9 dark:text-gray-9" />
            <Text size="1" className="text-gray-10 dark:text-gray-10">
              ({refUrls.length})
            </Text>
          </Flex>
        </Button>
      </Popover.Trigger>

      <Popover.Content
        side="bottom"
        align="start"
        className="w-80 p-0 bg-white dark:bg-[#1a1a1a] border border-gray-6 dark:border-gray-7 shadow-lg rounded-md z-50"
        sideOffset={4}
      >
        <Box className="p-3 bg-white dark:bg-[#1a1a1a] rounded-md">
          <Flex align="center" justify="between" className="mb-2">
            <Text size="2" weight="medium" className="text-gray-12 dark:text-gray-12">
              Reference URLs ({refUrls.length})
            </Text>
          </Flex>
          
          <Flex direction="column" gap="2">
            {refUrls.map((refUrl) => (
              <Flex
                key={refUrl.id}
                align="center"
                justify="between"
                className="group p-2 rounded-md hover:bg-gray-2 dark:hover:bg-[#2a2a2a] transition-colors"
              >
                <Flex align="center" gap="2" className="flex-1 min-w-0">
                  <Icon
                    name={getIconForType(refUrl.type)}
                    size={16}
                    className={`text-${getColorForType(refUrl.type)}-9 flex-shrink-0`}
                  />
                  <Text
                    size="2"
                    className="text-gray-11 dark:text-gray-11 truncate cursor-pointer hover:text-blue-11 dark:hover:text-blue-11 transition-colors"
                    onClick={(e) => handleOpenUrl(refUrl.url, e)}
                    title={refUrl.title}
                  >
                    {refUrl.title}
                  </Text>
                  <Badge
                    variant="soft"
                    color={getColorForType(refUrl.type) as any}
                    size={badgeSize as any}
                    className="flex-shrink-0 ml-1"
                  >
                    {refUrl.type}
                  </Badge>
                </Flex>
                
                {onRemoveUrl && (
                  <Button
                    variant="ghost"
                    size="1"
                    className="opacity-0 group-hover:opacity-100 transition-all p-1 h-auto text-gray-9 dark:text-gray-9 hover:text-red-9 dark:hover:text-red-9 hover:bg-red-2 dark:hover:bg-red-3"
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
  );
};
