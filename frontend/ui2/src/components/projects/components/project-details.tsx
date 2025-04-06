import { Box, Flex, Heading, Text } from "@/components/base"
import { CalendarDays, DollarSign } from "lucide-react"
import React from "react"

import { ProjectsImages } from "../images"
const projectDetails = [
  {
    label: "Budget",
    value: "2.500.00",
    icon: <DollarSign />,
    bgColor: "bg-green-3",
    textColor: "text-green-8",
  },
  {
    label: "Start Date",
    value: "17 Jun, 2020",
    icon: <CalendarDays />,
    bgColor: "bg-blue-3",
    textColor: "text-blue-8",
  },
  {
    label: "End Date",
    value: "04 Jul, 2020",
    icon: <CalendarDays />,
    bgColor: "bg-orange-3",
    textColor: "text-orange-8",
  },
]

function ProjectDetails() {
  return (
    <>
      {/* template progress */}
      <Flex align={"center"} gap={"3"}>
        <Box className="relative grid h-14 w-14 place-content-center rounded-xl border-2 border-gray-4 p-2">
          <img
            src={ProjectsImages.dropbox}
            alt={"dropbox"}
            width={48}
            height={48}
            className="object-contain"
          />
        </Box>
        <Box>
          <Heading as="h3" className="font-medium text-gray-12" size={"4"}>
            App Development
          </Heading>
          <Text as="p" className="text-gray-11">
            Dropbox, Inc.
          </Text>
        </Box>
      </Flex>

      <Box className="space-y-2 py-6 pt-4">
        <Heading size={"4"} className="font-medium text-gray-11">
          DETAILS
        </Heading>
        <Flex justify="between" className="pt-1">
          {projectDetails.map((detail) => (
            <Flex key={detail.label} gap="3">
              <Box
                className={`grid h-10 w-10 place-content-center rounded-lg ${detail.bgColor} ${detail.textColor}`}
              >
                {detail.icon}
              </Box>
              <Box>
                <Text as="span" className="text-gray-11 text-sm">
                  {detail.label}
                </Text>
                <Text as="p" className="text-sm">
                  {detail.value}
                </Text>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>

      <Box className="space-y-2 py-6 pt-4">
        <Heading size={"4"} className="font-medium text-gray-11">
          DESCRIPTION
        </Heading>
        <Text as="p" className="text-gray-10 leading-[120%]">
          We need to develop several options (Inbox template, Chat template,
          tasks template, Projects template) of cool user interface design
          templates - to carefully work out the smallest details.
        </Text>
      </Box>
    </>
  )
}

export default ProjectDetails
