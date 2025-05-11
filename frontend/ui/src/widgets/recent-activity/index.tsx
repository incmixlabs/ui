import { Box, CardContainer, cn, Flex, Heading, IconButton, Text } from "@incmix/ui"
import { Ellipsis } from "lucide-react"
interface ActivityItem {
  id: string
  time: string
  user: string
  action: string
  projectNumber: string
  color: string
}

interface ActivityGroup {
  date: string
  activities: ActivityItem[]
}

const activityGroups: ActivityGroup[] = [
  {
    date: "12 September",
    activities: [
      {
        id: "1",
        time: "08:30",
        user: "Regina Cooper",
        action: "Added new project",
        projectNumber: "443",
        color: "var(--color-blue)", // blue
      },
      {
        id: "2",
        time: "15:00",
        user: "Kristin Edwards",
        action: "Updated project",
        projectNumber: "488",
        color: "var(--color-yellow)", // yellow
      },
      {
        id: "3",
        time: "17:20",
        user: "Regina Cooper",
        action: "Closed project",
        projectNumber: "129",
        color: "var(--color-ongoing)", // orange
      },
    ],
  },
  {
    date: "11 September",
    activities: [
      {
        id: "4",
        time: "14:00",
        user: "Jorge Robertson",
        action: "Completed project",
        projectNumber: "389",
        color: "var(--color-light-green)", // green
      },
      {
        id: "5",
        time: "15:20",
        user: "Regina Cooper",
        action: "Closed project",
        projectNumber: "401",
        color: "var(--color-hold)", // orange
      },
      {
        id: "6",
        time: "14:00",
        user: "Stella Pena",
        action: "Added new project",
        projectNumber: "442",
        color:"var(--color-secondary)", // blue
      },
      {
        id: "7",
        time: "15:20",
        user: "Priscilla Russell",
        action: "Updated project",
        projectNumber: "324",
        color: "var(--color-done)", // yellow
      },
    ],
  },
  {
    date: "10 September",
    activities: [
      {
        id: "8",
        time: "14:00",
        user: "Leslie Miles",
        action: "Added new project",
        projectNumber: "441",
        color: "var(--color-light-green)", // blue
      },
      {
        id: "9",
        time: "15:20",
        user: "Regina Cooper",
        action: "Added new project",
        projectNumber: "440",
        color: "var(--color-secondary)", // blue
      },
      {
        id: "10",
        time: "14:00",
        user: "Regina Warren",
        action: "Updated project",
        projectNumber: "274",
        color: "var(--color-done)", // yellow
      },
    ],
  },
]

export function RecentActivity({className}: {className?: string}) {
  return (
    <Box className={cn("", className)}>
      <Flex align={"center"} justify={"between"} className="mb-4">
        <Heading size={"4"}>Recent Activity</Heading>
        <IconButton variant="ghost">
          <Ellipsis className="h-5 w-5" />
        </IconButton>
      </Flex>

      <Box className="space-y-6">
        {activityGroups.map((group) => (
          <Box key={group.date} className="">
            <Heading size={"2"} className="pl-5 font-medium">
              {group.date}
            </Heading>

            {group.activities.map((activity) => (
              <Flex key={activity.id} className="">
                <Box className="relative mr-4 grid flex-shrink-0 place-content-center border-gray-5 border-r py-5 pr-3 text-right">
                  <Text className="text-sm">{activity.time}</Text>
                  <Box
                    className="-right-[2.5px] absolute top-[20%] bottom-[20%] h-[60%] w-1 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: activity.color }}
                  />
                </Box>

                <Box className="flex flex-1 flex-col justify-center ">
                  <Text className="text-gray-500 text-sm ">
                    {activity.user}
                  </Text>
                  <Text className="text-gray-900 text-sm dark:text-white">
                    {activity.action}{" "}
                    <span className="text-blue-600">
                      #{activity.projectNumber}
                    </span>
                  </Text>
                </Box>
              </Flex>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
