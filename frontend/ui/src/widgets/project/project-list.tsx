import {
  Card,
  Badge,
  Flex,
  Box,
  Text,
  Heading,
  DropdownMenu,
  IconButton,
  Link,
  CardContainer,
  ScrollArea,
} from "@base";
import { MoreHorizontal, Smartphone, Sparkles, Palette } from "lucide-react";

interface IProjectList {
  name: string;
  tasks: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  bgColor: string;
}

export function ProjectListWidgets() {
  const projectList: IProjectList[] = [
    {
      name: "IOS Application",
      tasks: "840/2.5k",
      icon: Smartphone,
      iconColor: "text-[var(--dashboard-text-1)]",
      bgColor: "bg-[var(--dashboard-color-1)]",
    },
    {
      name: "Web Application",
      tasks: "99/1.42k",
      icon: Sparkles,
      iconColor: "text-[var(--dashboard-text-2)]",
      bgColor: "bg-[var(--dashboard-color-2)]",
    },
    {
      name: "UI Kit Design",
      tasks: "120/350",
      icon: Palette,
      iconColor: "text-[var(--dashboard-text-3)]",
      bgColor: "bg-[var(--dashboard-color-3)]",
    },
  ];

  return (
    <>
      <CardContainer className="h-full px-0">
        <Flex className="h-full">
          {/* Sidebar column */}
          <Box className="w-96 h-full flex flex-col overflow-hidden">
            {/* Header */}
            <Card.Header className="pb-4 flex-shrink-0 ">
              <Flex align="center" justify="between">
                <Box>
                  <Card.Title className="text-xl font-semibold text-gray-12">
                    Project List
                  </Card.Title>
                  <Text className="text-sm text-gray-11">
                    4 Ongoing Projects
                  </Text>
                </Box>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <IconButton
                      variant="ghost"
                      className="rounded-full transition-colors duration-200 hover:bg-blue-7"
                    >
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

            {/* Scrollable list */}
            <ScrollArea className="flex-1 overflow-hidden">
              <Card.Content className="space-y-4 pr-2 px-2">
                {projectList.map((project, index) => (
                  <Flex
                    align="center"
                    key={index}
                    className="gap-3 p-3 rounded-lg hover:bg-gray-3 cursor-pointer transition-colors"
                  >
                    <Box className={`p-2 rounded-lg ${project.bgColor}`}>
                      <project.icon
                        className={`w-5 h-5 ${project.iconColor}`}
                      />
                    </Box>
                    <Box className="flex-1 min-w-0">
                      <Heading
                        size="2"
                        className="font-medium text-gray-12 truncate"
                      >
                        {project.name}
                      </Heading>
                      <Text size="1" className="text-gray-11">
                        Task {project.tasks}
                      </Text>
                    </Box>
                  </Flex>
                ))}
              </Card.Content>
            </ScrollArea>
          </Box>
        </Flex>
      </CardContainer>
    </>
  );
}
