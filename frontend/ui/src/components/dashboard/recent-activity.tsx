import React from "react"
import { Box, Flex, Heading, IconButton, Text } from "@base"
import { Ellipsis } from "lucide-react"
import { activityGroups } from "./data"

export default function RecentActivity() {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <Heading size={"4"}>Recent Activity</Heading>
        <IconButton variant="ghost">
          <Ellipsis className="h-5 w-5" />
        </IconButton>
      </div>

      <div className="space-y-6">
        {activityGroups.map((group) => (
          <div key={group.date} className="">
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
          </div>
        ))}
      </div>
    </>
  )
}
