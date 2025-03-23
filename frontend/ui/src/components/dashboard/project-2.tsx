import {
  Avatar,
  Box,
  Button,
  CardContainer,
  Checkbox,
  Flex,
  Grid,
  Heading,
  IconButton,
  RadialBarChart,
  ScrollArea,
  StatisticsBarChartView,
  StatsCard,
  Text,
} from "@incmix/ui"

import { Ellipsis, EllipsisVertical, Settings } from "lucide-react"
import { motion } from "motion/react"
import type React from "react"
import { useState } from "react"
import { Calendar } from "../calendar"
import { SmartDatetimeInput } from "../datetime-picker"
import { KanbanImages } from "../kanban-board/images"
import { revisionData, taskStats } from "./data"
import PostingCalendar from "./posting-calendar"
import RecentActivity from "./recent-activity"
interface ProjectRevision {
  id: string
  projectNumber: string
  recipient: string
  checked: boolean
  color: string
  type: string
}

const stats = [
  { label: "Ongoing", value: 420, color: "var(--orange-9)" },
  { label: "Hold", value: 210, color: "var(--indigo-9)" },
  { label: "Done", value: 200, color: "var(--amber-9)" },
]
// Colors for the chart segments
const ongoingColor = "var(--orange-9)"
const onHoldColor = "var(--indigo-9)"
const completedColor = "var(--amber-9)"
type TabType = "month" | "week" | "day"

export function Project2() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)

  const [activeTab, setActiveTab] = useState<TabType>("month")
  const [revisions, setRevisions] = useState<ProjectRevision[]>(revisionData)
  const handleDateChange = (date: Date) => {
    setSelectedDate(date)
  }

  const handleFilterRevision = (tab: TabType) => {
    setActiveTab(tab)
    setRevisions(revisionData.filter((revision) => revision.type === tab))
  }

  return (
    <div>
      <Flex gap="6">
        <Box className="w-full">
          <Box className="grid grid-cols-12 gap-8 ">
            <Grid columns={"2"} gap="4" className="col-span-5 2xl:col-span-4">
              {taskStats.map((stat, _index) => (
                <StatsCard
                  key={stat.label}
                  count={stat.count}
                  label={stat.label}
                  iconClassName={stat.backgroundColorClass}
                  icon={stat.icon}
                />
              ))}
            </Grid>
            <CardContainer className="col-span-7 2xl:col-span-8">
              <Flex justify={"between"}>
                <Heading size="5" className="pb-4">
                  Statistics
                </Heading>
                <Box className="w-40">
                  <SmartDatetimeInput
                    className="bg-gray-2"
                    showTimePicker={false}
                    value={selectedDate}
                    onValueChange={handleDateChange}
                    placeholder="Enter a date"
                  />
                </Box>
              </Flex>
              <StatisticsBarChartView />
            </CardContainer>
            <CardContainer className="col-span-5 2xl:col-span-4">
              <Flex justify={"between"} align={"center"}>
                <Heading className="font-poppins text-[20px]">Projects</Heading>
                <IconButton
                  variant="ghost"
                  className="m-0 flex cursor-pointer flex-row items-center p-0"
                >
                  <Ellipsis />
                </IconButton>
              </Flex>
              <RadialBarChart
                colors={[ongoingColor, onHoldColor, completedColor]}
                labels={["Ongoing", "Hold", "Done"]}
                series={[420, 210, 200]}
              />
              <Grid columns={"3"} gap="4" className="mt-2">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className={`border-gray-5 border-l text-center ${stat.label === "Ongoing" && "border-none"}`}
                  >
                    <Box
                      className="mx-auto mb-1 h-2 w-2 rounded-lg"
                      style={{ backgroundColor: stat.color }}
                    />
                    <Text as="p" className="text-2xl">
                      {stat.value}
                    </Text>
                    <Text className="text-gray-10 text-sm">{stat.label}</Text>
                  </div>
                ))}
              </Grid>
            </CardContainer>
            <CardContainer className="col-span-7 2xl:col-span-8">
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
                  <Text className="text-gray-8 text-sm">
                    No revisions found
                  </Text>
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
            <CardContainer className="col-span-12">
              <PostingCalendar />
            </CardContainer>
          </Box>
        </Box>
        <Box className=" sticky top-0 h-screen w-80 shrink-0 rounded-xl border border-gray-5 bg-white dark:bg-gray-2 ">
          <ScrollArea className="h-full">
            <Flex
              justify={"between"}
              align={"center"}
              className="w-full border-gray-5 border-b p-4"
            >
              <Flex gap={"3"} align={"center"}>
                <Avatar src={KanbanImages?.user1} fallback="A" />
                <Box className="space-y-0">
                  <Text as="p" className="font-medium text-gray-12">
                    ArtTemplate
                  </Text>
                  <Text className="text-gray-9">example@mail.com</Text>
                </Box>
              </Flex>
              <IconButton variant="ghost" className="cursor-pointer">
                <Settings />
              </IconButton>
            </Flex>
            <Box className="w-full border-gray-5 border-b p-4">
              <Calendar
                id={"calendar"}
                mode="single"
                className="w-full"
                initialFocus
              />
            </Box>
            <Box className="p-8 ">
              <RecentActivity />
            </Box>
          </ScrollArea>
        </Box>
      </Flex>
    </div>
  )
}
