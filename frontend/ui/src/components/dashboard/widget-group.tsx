"use client";

import { Box, Flex, Heading, IconButton } from "@incmix/ui/base";
import {
  LayoutGridIcon as LayoutHorizontal,
  LayoutGridIcon as LayoutVertical,
  Ungroup,
  Trash,
} from "lucide-react";
import type { ReactNode } from "react";

interface WidgetGroupProps {
  id: string;
  title: string;
  children: ReactNode;
  isEditing: boolean;
  onUngroup: () => void;
  onRemove: () => void;
  arrangement: "vertical" | "horizontal";
}

export function WidgetGroup({
  id,
  title,
  children,
  isEditing,
  onUngroup,
  onRemove,
  arrangement,
}: WidgetGroupProps) {
  return (
    <Box className="group-container h-full w-full rounded-lg border-2 border-dashed border-blue-400 bg-blue-50/10 p-3">
      <Flex justify={"between"} align={"center"} className="mb-2">
        <Flex align={"center"} gap={"2"}>
          {arrangement === "vertical" ? (
            <LayoutVertical size={16} className="text-blue-500" />
          ) : (
            <LayoutHorizontal size={16} className="text-blue-500" />
          )}
          <Heading>{title}</Heading>
        </Flex>
        {isEditing && (
          <Flex align={"center"} gap={"1"}>
            <IconButton
              color="blue"
              onClick={(e) => {
                e.stopPropagation();
                onUngroup();
              }}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Ungroup size={14} />
            </IconButton>
            <IconButton
              color="red"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              onTouchStart={(e) => e.stopPropagation()}
            >
              <Trash size={14} />
            </IconButton>
          </Flex>
        )}
      </Flex>
      <Box
        className={`grid h-[calc(100%-2rem)] gap-2 ${
          arrangement === "vertical"
            ? "grid-cols-1"
            : "grid-flow-col grid-rows-1"
        }`}
      >
        {children}
      </Box>
    </Box>
  );
}