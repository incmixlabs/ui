import {
  Box,
  Button,
  CardContainer,
  Checkbox,
  Flex,
  Grid,
  Heading,
  Icon,
  IconButton,
  ScrollArea,
  Text,
} from "@incmix/ui";
import { motion } from "motion/react";
import React, { useState } from "react";

export const revisionData = [
  {
    id: "1",
    type: "month",
    projectNumber: "783",
    recipient: "Leslie Miles",
    checked: false,
    color: "var(--dashboard-color-1)",
  },
  {
    id: "2",
    type: "month",
    projectNumber: "675",
    recipient: "Kristin Edwards",
    checked: true,
    color: "var(--dashboard-color-2)",
  },
  {
    id: "3",
    type: "month",

    projectNumber: "788",
    recipient: "Regina Warren",
    checked: false,
    color: "var(--dashboard-color-3)",
  },
  {
    id: "4",
    type: "month",

    projectNumber: "543",
    recipient: "Stella Penas",
    checked: false,
    color: "var(--dashboard-color-4)",
  },
];

interface ProjectRevision {
  id: string;
  projectNumber: string;
  recipient: string;
  checked: boolean;
  color: string;
  type: string;
}

type TabType = "month" | "week" | "day";

export function ActiveTask() {
  const [activeTab, setActiveTab] = useState<TabType>("month");
  const [revisions, setRevisions] = useState<ProjectRevision[]>(revisionData);
  const handleFilterRevision = (tab: TabType) => {
    setActiveTab(tab);
    setRevisions(revisionData.filter((revision) => revision.type === tab));
  };
  return (
    <CardContainer className="min-h-64 h-full flex flex-col overflow-hidden">
      {/* Header Section */}
      <Flex justify="between" align="center" className="pb-4 flex-shrink-0">
        <Heading weight={"medium"}>Active Tasks</Heading>
        <Flex
          align="center"
          gap="2"
          className="rounded-xl border border-gray-5 p-2 px-3"
        >
          {(["month", "week", "day"] as const).map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              onClick={() => {
                handleFilterRevision(tab);
              }}
              className={`relative inline-block flex-1 cursor-pointer rounded-xl px-4 py-1.5 font-medium text-sm transition-colors ${
                activeTab === tab ? "text-white" : ""
              }`}
            >
              {activeTab === tab && (
                <motion.span
                  layoutId="tab-indicator"
                  className="absolute inset-0 inline-block h-full w-full rounded-xl bg-indigo-9"
                />
              )}
              <span className="relative z-10 capitalize">{tab}</span>
            </Button>
          ))}
        </Flex>
      </Flex>

      {/* Scrollable Task List */}
      <ScrollArea className="flex-1 overflow-hidden">
        <Box className="space-y-3 pr-2">
          {revisions.length === 0 ? (
            <Text className="text-gray-8 text-sm">No revisions found</Text>
          ) : (
            <>
              {revisions.map((revision) => (
                <Flex
                  key={revision.id}
                  align="center"
                  className="relative rounded-lg border border-gray-5 p-3"
                  style={{
                    borderLeftWidth: "4px",
                    borderLeftColor: revision.color,
                  }}
                >
                  {/* Checkbox */}
                  <Box className="mr-3 flex-shrink-0">
                    <Checkbox
                      size="3"
                      className="h-5 w-5 rounded-md bg-gray-6 text-secondary group-hover:bg-gray-11"
                    />
                  </Box>

                  {/* Task Details */}
                  <Box className="min-w-0 flex-1">
                    <Text as="p" className="font-medium text-sm">
                      {revision.recipient || "Regina Cooper"}
                    </Text>
                    <Text className="truncate text-gray-11 text-sm">
                      Sending project{" "}
                      <span className="text-blue-9">
                        #{revision.projectNumber}
                      </span>{" "}
                      for revision to {revision.recipient}
                    </Text>
                  </Box>

                  {/* Menu */}
                  <IconButton
                    variant="ghost"
                    className="ml-2 flex-shrink-0 cursor-pointer"
                  >
                    <Icon name="EllipsisVertical" className="h-5 w-5" />
                  </IconButton>
                </Flex>
              ))}
            </>
          )}
        </Box>
      </ScrollArea>
    </CardContainer>
  );
}
