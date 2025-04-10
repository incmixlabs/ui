import {
  ActiveTask,
  Avatar,
  Box,
  Button,
  Card,
  CardContainer,
  Checkbox,
  Flex,
  Grid,
  Heading,
  IconButton,
  PostingTask,
  ProjectWidgets,
  RadialBarChart,
  RecentActivity,
  ScrollArea,
  StatisticWidgets,
  StatisticsBarChartView,
  StatsCard,
  SwapyExclude,
  SwapyLayout,
  SwapySlot,
  Text,
  dashboardColorValues,
} from "@incmix/ui"

import {
  Ellipsis,
  EllipsisVertical,
  GripHorizontal,
  Settings,
} from "lucide-react"
import type React from "react"
import { JSX, useEffect, useMemo, useRef, useState } from "react"
import { createSwapy } from "swapy"
import { Calendar } from "../calendar"
import { SmartDatetimeInput } from "../datetime-picker"
import { KanbanImages } from "../kanban-board/images"
const _cardItems = [
  {
    key: "a",
    slot: "1",
    type: "task-stats",
    colSpan: "xl:col-span-5 col-span-12 2xl:col-span-4",
    component: StatisticWidgets,
    className: "p-0 border-0",
  },
  {
    key: "b",
    slot: "2",
    type: "statistic-widgets",
    colSpan: "xl:col-span-7 col-span-12 2xl:col-span-8",
    component: StatisticWidgets,
    className: "bg-gray-2 p-6",
  },
  {
    key: "c",
    slot: "3",
    type: "project-widgets",
    colSpan: "xl:col-span-5 col-span-12 2xl:col-span-4",
    component: ProjectWidgets,
    className: "bg-gray-2 p-6",
  },
  {
    key: "d",
    slot: "4",
    type: "active-task",
    colSpan: "xl:col-span-7 col-span-12 2xl:col-span-8",
    component: ActiveTask,
    className: "bg-gray-2 p-6",
  },
  {
    key: "e",
    slot: "5",
    type: "posting-task",
    colSpan: "col-span-12",
    component: PostingTask,
    className: "bg-gray-2 p-6",
  },
]
const CARD_ITEMS = [
  {
    key: "a",
    slot: "1",
    type: "task-stats",
    colSpan: "xl:col-span-5 col-span-12 2xl:col-span-4",
    className: "p-0 border-0",
  },
  {
    key: "b",
    slot: "2",
    type: "statistic-widgets",
    colSpan: "xl:col-span-7 col-span-12 2xl:col-span-8",
    className: "bg-gray-2 p-6",
  },
  {
    key: "c",
    slot: "3",
    type: "project-widgets",
    colSpan: "xl:col-span-5 col-span-12 2xl:col-span-4",
    className: "bg-gray-2 p-6",
  },
  {
    key: "d",
    slot: "4",
    type: "active-task",
    colSpan: "xl:col-span-7 col-span-12 2xl:col-span-8",
    className: "bg-gray-2 p-6",
  },
  {
    key: "e",
    slot: "5",
    type: "posting-task",
    colSpan: "col-span-12",
    className: "bg-gray-2 p-6",
  },
]

const widgetMap = {
  "task-stats": StatisticWidgets,
  "statistic-widgets": StatisticWidgets,
  "project-widgets": ProjectWidgets,
  "active-task": ActiveTask,
  "posting-task": PostingTask,
}

export function Project1({ isEditing }: { isEditing: boolean }) {
  // useEffect(() => {
  //   const container = document.querySelector(".container")!;
  //   const swapy = createSwapy(container, {
  //     animation: "dynamic",
  //     autoScrollOnDrag: true,
  //     swapMode: "hover",
  //   });
  //   swapy.enable(isEditing);

  //   return () => {
  //     swapy?.destroy();
  //   };
  // }, [isEditing]);
  // UseMemo to stabilize the component list
  const slottedWidgets = useMemo(() => {
    return CARD_ITEMS.map(({ key, slot, type, colSpan, className }) => {
      const WidgetComponent = widgetMap[type as keyof typeof widgetMap]
      return {
        key,
        slot,
        colSpan,
        className,
        component: WidgetComponent ? <WidgetComponent /> : null,
      }
    })
  }, [])
  return (
    <>
      <Flex gap="6">
        <>
          {/* <Grid gap="5" columns="12" className="container">
            {cardItems.map(
              ({ key, slot, colSpan, component: Component, className }) => (
                <Box key={key} className={colSpan} data-swapy-slot={slot}>
                  <Card
                    className={`relative w-full ${className}`}
                    data-swapy-item={key}
                  >
                    {isEditing && (
                      <div
                        className="absolute top-2 right-2 z-10 cursor-grab rounded-lg border border-gray-6 bg-gray-5 p-2 py-1 active:cursor-grabbing"
                        data-swapy-handle
                      >
                        <GripHorizontal className="text-gray-10" />
                      </div>
                    )}
                    <Component />
                  </Card>
                </Box>
              )
            )} 

            {cardItems.map(
              ({ key, slot, colSpan, component: Component, className }) => (
                <Box key={key} className={colSpan} data-swapy-slot={slot}>
                  <Card
                    className={`relative w-full h-52 ${className}`}
                    data-swapy-item={key}
                  >
                    {isEditing && (
                      <div
                        className="absolute top-2 right-2 z-10 cursor-grab rounded-lg border border-gray-6 bg-gray-5 p-2 py-1 active:cursor-grabbing"
                        data-swapy-handle
                      >
                        <GripHorizontal className="text-gray-10" />
                      </div>
                    )}
                  </Card>
                </Box>
              )
            )} 
          </Grid>*/}
          <SwapyLayout
            id="container"
            enable={isEditing}
            config={{ swapMode: "hover" }}
            className="w-full"
          >
            <Grid gap="5" columns="12" className="container">
              {slottedWidgets.map(({ key, colSpan, className, component }) => (
                <SwapySlot
                  key={key}
                  id={key}
                  className={`${colSpan} h-fit rounded-xl bg-gray-4 dark:bg-gray-2`}
                  showHandle={isEditing}
                >
                  <Card className={`relative w-full ${className}`}>
                    {component}
                  </Card>
                </SwapySlot>
              ))}
            </Grid>
          </SwapyLayout>

          {/* <Grid gap="5" columns="12" className="container">
              {cardItems.map(
                ({ key, slot,type, colSpan, component: Component, className }) => (
                  <Box
                    key={key}
                    id={key}
                         className={`${colSpan} dark:bg-gray-2 bg-gray-4 h-fit rounded-xl`}
                  >
                    <Card className={`w-full relative ${className}`}>
                    {renderWidget(type)}
                    </Card>
                  </Box>
                ),
              )}
            </Grid> */}
        </>

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
    </>
  )
}
