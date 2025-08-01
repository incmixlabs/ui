import {
  Button,
  CardContainer,
  Flex,
  Box,
  Text,
  Heading,
  ScrollArea,
  Icon,
} from "@incmix/ui";
interface Activity {
  id: number;
  title: string;
  description: string;
  date: string;
  color: string;
  link?: string;
  attachment?: string;
  icon?: React.ComponentType;
}
interface ActivityTimelineProps {
  activities?: Activity[];
}
const defaultActivities: Activity[] = [
  {
    id: 1,
    title: "Create youtube video for next product 🤩",
    description: "Product introduction and details video",
    link: "www.youtube.com/channel/UCuryo5s0CW4aP8ltLjIdZg",
    date: "Tomorrow",
    color: "bg-[var(--dashboard-color-1)]",
  },
  {
    id: 2,
    title: "Received payment from usa client 🤑",
    description: "Received payment $1,490 for banking ios app",
    date: "January, 18",
    color: "bg-[var(--dashboard-color-2)]",
  },
  {
    id: 3,
    title: "Meeting with joseph morgan for next project",
    description: "Meeting Video call on zoom at 9pm",
    attachment: "presentation.pdf",
    date: "April, 23",
    color: "bg-[var(--dashboard-color-3)]",
  },
];
const getTimelineConnectorClass = (index: number, totalItems: number) => {
  const baseClass = "gap-3 relative";
  const connectorClass =
    index < totalItems - 1
      ? "before:absolute before:w-[1px] before:h-[calc(100%+1rem)] before:bg-gray-6 before:left-1.5 before:top-6"
      : "";
  return `${baseClass} ${connectorClass}`;
};
export function ActivityTimeline({
  activities = defaultActivities,
}: ActivityTimelineProps) {
  return (
    <CardContainer className="min-h-64 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <Box className="pb-4 flex-shrink-0">
        <Flex align="center" justify="between">
          <Heading weight={"medium"}>
            Activity Timeline
          </Heading>
          <Button variant="ghost" size="2">
            <Icon name="Ellipsis" />
          </Button>
        </Flex>
      </Box>

      {/* Scrollable Activity List */}
      <ScrollArea className="flex-1 overflow-hidden">
        <Box className="space-y-4 p-1">
          {activities.map((activity, index) => (
            <Flex
              key={activity.id}
              className={getTimelineConnectorClass(index, activities.length)}
            >
              {/* Timeline Dot */}
              <Box
                className={`w-3.5 h-3.5 rounded-full ${activity.color} mt-1 flex-shrink-0`}
              />
              {/* Activity Details */}
              <Box className="flex-1 space-y-2">
                <Flex align="start" justify="between">
                  <Text size="4" className="text-gray-12">
                    {activity.title}
                  </Text>
                  <Text
                    size="2"
                    className="text-xs text-gray-11 whitespace-nowrap ml-2"
                  >
                    {activity.date}
                  </Text>
                </Flex>
                <Text size="2" className="text-sm text-gray-11">
                  {activity.description}
                </Text>

                {/* Optional Video Link */}
                {activity.link && (
                  <Flex align="center" gap="1" className="text-xs">
                    <Icon name="Play" className="w-5 h-5 stroke-white bg-red-9 rounded-full p-1 fill-white" />
                    <Text className="text-gray-11 font-medium">
                      {activity.link}
                    </Text>
                  </Flex>
                )}

                {/* Optional Attachment */}
                {activity.attachment && (
                  <Flex align="center" gap="1" className="text-sm">
                    <Icon name="FileText" className="w-5 h-5 text-red-11 bg-red-2 rounded-sm p-1" />
                    <Text className="text-gray-11 font-medium">
                      {activity.attachment}
                    </Text>
                  </Flex>
                )}
              </Box>
            </Flex>
          ))}
        </Box>
      </ScrollArea>
    </CardContainer>
  );
}
