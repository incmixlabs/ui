import { Card, Badge, Flex, Box, Text, Heading, DropdownMenu, IconButton, Link } from "@base";
import { MoreHorizontal, Smartphone, Sparkles, Palette } from "lucide-react";

interface IProjectList {
  name: string;
  tasks: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgColor: string;
}

export function ProjectListWidgets() {
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

    return (
        <>
            <Card.Root className="shadow-sm h-full px-0">
                <Flex>
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
