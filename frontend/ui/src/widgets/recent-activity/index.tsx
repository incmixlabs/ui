import {
  Box,
  CardContainer,
  cn,
  Flex,
  Heading,
  Icon,
  IconButton,
  ScrollArea,
  Text,
} from "@incmix/ui";
interface ActivityItem {
  id: string;
  time: string;
  user: string;
  action: string;
  projectNumber: string;
  color: string;
}

interface ActivityGroup {
  date: string;
  activities: ActivityItem[];
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
        color: "var(--indicator-info)",
      },
      {
        id: "2",
        time: "15:00",
        user: "Kristin Edwards",
        action: "Updated project",
        projectNumber: "488",
        color: "var(--indicator-warning)",
      },
      {
        id: "3",
        time: "17:20",
        user: "Regina Cooper",
        action: "Closed project",
        projectNumber: "129",
        color: "var(--indicator-default)",
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
        color: "var(--indicator-success)",
      },
      {
        id: "5",
        time: "15:20",
        user: "Regina Cooper",
        action: "Closed project",
        projectNumber: "401",
        color: "var(--indicator-default)",
      },
      {
        id: "6",
        time: "14:00",
        user: "Stella Pena",
        action: "Added new project",
        projectNumber: "442",
        color: "var(--indicator-info)",
      },
      {
        id: "7",
        time: "15:20",
        user: "Priscilla Russell",
        action: "Updated project",
        projectNumber: "324",
        color: "var(--indicator-danger)",
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
        color: "var(--indicator-info)",
      },
      {
        id: "9",
        time: "15:20",
        user: "Regina Cooper",
        action: "Completed project",
        projectNumber: "440",
        color: "var(--indicator-success)",
      },
      {
        id: "10",
        time: "14:00",
        user: "Regina Warren",
        action: "Updated project",
        projectNumber: "274",
        color: "var(--indicator-danger)",
      },
    ],
  },
];

export function RecentActivity({ className }: { className?: string }) {
  return (
    <CardContainer
      className={cn("min-h-96 h-full flex flex-col overflow-hidden", className)}
    >
      {/* Header */}
      <Box className="flex-shrink-0 mb-4">
        <Flex align="center" justify="between">
          <Heading size="4">Recent Activity</Heading>
          <IconButton variant="ghost">
            <Icon name="Ellipsis"/>
          </IconButton>
        </Flex>
      </Box>

      {/* Scrollable Activity Groups */}
      <ScrollArea className="flex-1 overflow-hidden">
        <Box className="space-y-6 pr-2">
          {activityGroups.map((group) => (
            <Box key={group.date}>
              {/* Group Date */}
              <Heading size="2" className="pl-5 font-medium">
                {group.date}
              </Heading>

              {/* Activities */}
              {group.activities.map((activity) => (
                <Flex key={activity.id}>
                  {/* Timeline Indicator */}
                  <Box className="relative mr-4 grid flex-shrink-0 place-content-center border-gray-5 border-r py-5 pr-3 text-right">
                    <Text className="text-sm">{activity.time}</Text>
                    <Box
                      className="absolute top-[20%] bottom-[20%] right-[-2.5px] h-[60%] w-1 flex-shrink-0 rounded-full"
                      style={{ backgroundColor: activity.color }} // Dynamic color
                    />
                  </Box>

                  {/* Activity Details */}
                  <Box className="flex flex-1 flex-col justify-center">
                    <Text className="text-gray-500 text-sm">
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
      </ScrollArea>
    </CardContainer>
  );
}
