import {
  Box,
  Button,
  CardContainer,
  Checkbox,
  Flex,
  Grid,
  Heading,
  IconButton,
  Text,
  Tooltip,
} from "@incmix/ui"
import { EllipsisVertical } from "lucide-react"
import { motion } from "motion/react"
import React, { useState } from "react"

export const revisionData = [
  {
    id: "1",
    type: "month",
    projectNumber: "783",
    recipient: "Leslie Miles",
    checked: false,
    color: "var(--blue-9)", // blue
  },
  {
    id: "2",
    type: "month",
    projectNumber: "675",
    recipient: "Kristin Edwards",
    checked: true,
    color: "var(--purple-9)", // purple
  },
  {
    id: "3",
    type: "month",

    projectNumber: "788",
    recipient: "Regina Warren",
    checked: false,
    color: "var(--green-9)", // green
  },
  {
    id: "4",
    type: "month",

    projectNumber: "543",
    recipient: "Stella Penas",
    checked: false,
    color: "var(--yellow-9)", // yellow
  },
]

interface ProjectRevision {
  id: string
  projectNumber: string
  recipient: string
  checked: boolean
  color: string
  type: string
}

type TabType = "month" | "week" | "day"

export function ActiveTask() {
  const [activeTab, setActiveTab] = useState<TabType>("month")
  const [revisions, setRevisions] = useState<ProjectRevision[]>(revisionData)
  const handleFilterRevision = (tab: TabType) => {
    setActiveTab(tab)
    setRevisions(revisionData.filter((revision) => revision.type === tab))
  }
  return (
    <CardContainer className="h-full">
      <Flex justify={"between"} align={"center"} className="pb-4">
        <Heading size="5">Active Tasks</Heading>
        <Flex
          align={"center"}
          gap={"2"}
          className="rounded-xl border border-gray-5 p-2 px-3"
        >
          {(["month", "week", "day"] as const).map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              onClick={() => {
                handleFilterRevision(tab)
              }}
              className={`relative inline-block flex-1 cursor-pointer rounded-xl px-4 py-1.5 font-medium text-sm transition-colors ${
                activeTab === tab ? "text-white" : ""
              }`}
            >
              {activeTab === tab && (
                <motion.span
                  layoutId={"tab-indicator"}
                  className="absolute inset-0 inline-block h-full w-full rounded-xl bg-indigo-9"
                />
              )}
              <span className="relative z-10 capitalize">{tab}</span>
            </Button>
          ))}
        </Flex>
      </Flex>
      <Box className="space-y-3">
        {revisions.length === 0 ? (
          <Text className="text-gray-8 text-sm">No revisions found</Text>
        ) : (
          <>
            {" "}
            {revisions.map((revision) => (
              <Flex
                key={revision.id}
                align={"center"}
                className="relative rounded-lg border border-gray-5 p-3"
                style={{
                  borderLeftWidth: "4px",
                  borderLeftColor: revision.color,
                }}
              >
                <Box className="mr-3 flex-shrink-0">
                  <Checkbox
                    size={"3"}
                    className="h-5 w-5 rounded-md border border-black bg-gray-12 text-secondary group-hover:bg-white "
                  />
                </Box>

                <Box className="min-w-0 flex-1">
                  <Text as="p" className="font-medium text-sm">
                    {revision.recipient || "Regina Cooper"}
                  </Text>
                  <Text className="truncate text-gray-8 text-sm">
                    Sending project{" "}
                    <span className="text-blue-600">
                      #{revision.projectNumber}
                    </span>{" "}
                    for revision to {revision.recipient}
                  </Text>
                </Box>

                <IconButton
                  variant="ghost"
                  className="ml-2 flex-shrink-0 cursor-pointer"
                >
                  <EllipsisVertical className="h-5 w-5" />
                </IconButton>
              </Flex>
            ))}
          </>
        )}
      </Box>
    </CardContainer>
  )
}
