import { Card, Badge, Flex, Box, Text, Heading, DropdownMenu, IconButton, Link } from "@base";
import { MoreHorizontal, Smartphone, Sparkles, Palette } from "lucide-react";

interface ITimelineData {
  name: string;
  project: string;
  color: string;
  startMonth: string;
  endMonth: string;
}

interface IProjectList {
  name: string;
  tasks: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgColor: string;
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

    const projectList:IProjectList[] = [
        {
            name: "IOS Application",
            tasks: "840/2.5k",
            icon: Smartphone,
            iconColor: "text-blue-500",
            bgColor: "bg-blue-50",
        },
        {
            name: "Web Application",
            tasks: "99/1.42k",
            icon: Sparkles,
            iconColor: "text-green-500",
            bgColor: "bg-green-50",
        },
        {
            name: "UI Kit Design",
            tasks: "120/350",
            icon: Palette,
            iconColor: "text-cyan-500",
            bgColor: "bg-cyan-50",
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
            <Card.Root className="shadow-sm h-full px-0">
                <Flex>
                    {/* Project Timeline Section */}
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

                    {/* Project List Section */}
                    <Box className="w-80">
                        <Card.Header className="pb-4">
                            <Flex align="center" justify="between">
                                <Box>
                                    <Card.Title className="text-xl font-semibold text-gray-12">Project List</Card.Title>
                                    <Text className="text-sm text-gray-11">4 Ongoing Projects</Text>
                                </Box>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger>
                                        <IconButton variant="ghost" className="rounded-full transition-colors duration-200 hover:bg-blue-7">
                                            <MoreHorizontal className="w-5 h-5 text-gray-11" />
                                        </IconButton>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content>
                                        <DropdownMenu.Item>
                                            <Flex align="center" gap="2">
                                                <Text>Add Project</Text>
                                            </Flex>
                                        </DropdownMenu.Item>
                                        <DropdownMenu.Item>
                                            <Flex align="center" gap="2">
                                                <Text>Settings</Text>
                                            </Flex>
                                        </DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Flex>
                        </Card.Header>
                        <Card.Content className="space-y-4">
                            {projectList.map((project, index) => (
                                <Flex align="center" key={index} className="gap-3 p-3 rounded-lg  hover:bg-gray-3 cursor-pointer  transition-colors">
                                    <Box className={`p-2 rounded-lg ${project.bgColor}`}>
                                        <project.icon className={`w-5 h-5 ${project.iconColor}`} />
                                    </Box>
                                    <Box className="flex-1">
                                        <Heading size={"2"} className="font-medium text-gray-12 ">
                                            {project.name}
                                        </Heading>
                                        <Text size={"1"} className="text-gray-11">
                                            Task {project.tasks}
                                        </Text>
                                    </Box>
                                </Flex>
                            ))}
                        </Card.Content>
                    </Box>
                </Flex>
            </Card.Root>
        </>
    );
}
