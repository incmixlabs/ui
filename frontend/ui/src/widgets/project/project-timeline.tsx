import { Card, Badge, Flex, Box, Text, Heading, DropdownMenu, IconButton, Link, CardContainer } from "@base";
import { MoreHorizontal, Smartphone, Sparkles, Palette } from "lucide-react";

interface ITimelineData {
  name: string;
  project: string;
  color: string;
  startMonth: string;
  endMonth: string;
}


export function ProjectTimelineWidgets() {
    const months = ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];

    const timelineData:ITimelineData[] = [
        {
            name: "Jaqueline",
            project: "Development Apps",
            color: "bg-[var(--iris-10)]",
            startMonth: "Feb",
            endMonth: "Apr",
        },
        {
            name: "Janelle",
            project: "UI Design",
            color: "bg-[var(--green-10)]",
            startMonth: "Mar",
            endMonth: "Apr",
        },
        {
            name: "Wellington",
            project: "IOS Application",
            color: "bg-[var(--gray-10)]",
            startMonth: "Apr",
            endMonth: "Jun",
        },
        {
            name: "Blake",
            project: "Web App Wireframing",
            color: "bg-[var(--blue-10)]",
            startMonth: "Mar",
            endMonth: "Jul",
        },
        {
            name: "Quinn",
            project: "Prototyping",
            color: "bg-[var(--amber-10)]",
            startMonth: "May",
            endMonth: "Jul",
        },
    ];

    const getMonthIndex = (month: string) => {
      const index = months.indexOf(month);
      if (index === -1) {
        console.warn(`Month "${month}" not found in months array`);
        return 0; // fallback to first month
      }
      return index;
    }

    // Helper function to calculate timeline bar position and width
    const getTimelineStyle = (startMonth: string, endMonth: string) => {
        const startIndex = getMonthIndex(startMonth);
        const endIndex = getMonthIndex(endMonth);

        if (endIndex < startIndex) {
          console.warn(`End month "${endMonth}" is before start month "${startMonth}"`);
        }

        const leftOffset = (startIndex / months.length) * 100;
        const width = Math.max(((endIndex - startIndex + 1) / months.length) * 100, 0)

        return {
            left: `${leftOffset}%`,
            width: `${width}%`,
        };
    };

    return (
        <>
            <Card.Root className="shadow-sm bg-gray-2 h-full px-0">
                <Flex>
                    <Box className="flex-1 border-r border-gray-4">
                        <Card.Header className="pb-4">
                            <Card.Title className="text-xl font-semibold text-gray-12">Project Timeline</Card.Title>
                            <Text as="p" className="text-sm text-gray-11">
                                Total 840 Task Completed
                            </Text>
                        </Card.Header>
                        <Card.Content className="space-y-6 relative">
                            {/* Timeline Rows */}
                            <Box className="space-y-4 relative z-10" >
                                {timelineData.map((item, index) => {
                                    const timelineStyle = getTimelineStyle(item.startMonth, item.endMonth);

                                    return (
                                        <Flex align="center" key={index} role="row" aria-label={`${item.name}'s project timeline`}>
                                            <Text className="w-24 text-sm text-gray-12 font-medium pr-4">{item.name}</Text>
                                            <Box className="flex-1 relative h-8">
                                                <Box className="absolute top-1/2 transform -translate-y-1/2 h-6 rounded-full flex items-center justify-center" style={timelineStyle}
                                                  role="img"
                                                  aria-label={`${item.project} from ${item.startMonth} to ${item.endMonth}`}
                                                >
                                                    <Badge className={`${item.color} text-white border-none px-3 py-2 rounded-full text-xs font-medium w-full text-center`}>{item.project}</Badge>
                                                </Box>
                                            </Box>
                                        </Flex>
                                    );
                                })}
                            </Box>
                            {/* Timeline Header with Months */}
                            <Box className="flex-1 flex ml-24">
                                {months.map((month, index) => (
                                    <>
                                        <Box key={index} className="flex-1 text-center">
                                            <Text className="text-xs text-gray-10 font-medium">{month}</Text>
                                            <Box className="w-1 h-full border-l border-dashed border-gray-4 absolute top-0 translate-x-2 "></Box>
                                        </Box>
                                    </>
                                ))}
                            </Box>
                        </Card.Content>
                    </Box>
                </Flex>
            </Card.Root>
        </>
    );
}
