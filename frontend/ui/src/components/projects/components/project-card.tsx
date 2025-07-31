import { useProjectDrawer } from "../hooks/use-project-drawer"
import {
  Avatar,
  Box,
  Card,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  Progress,
  Text,
} from "@base"

import {Icon } from "../../common/icon"
import type { Project } from "../types"

interface ProjectCardProps {
  project: Project
  onAddMember: (project: Project) => void
  onAddDueDate: (project: Project) => void
  onDelete: (projectId: string) => void
  isListFilter: boolean
}

export function ProjectCard({
  project,
  onAddMember,
  onAddDueDate,
  onDelete,
  isListFilter,
}: ProjectCardProps) {
  const { handleDrawerOpen } = useProjectDrawer()
  return (
    <Card.Root
      onClick={() => {
        if (isListFilter) {
          handleDrawerOpen(project.id.toString())
        }
      }}
      className={`flex flex-col gap-4 rounded-app p-5 ${isListFilter && "cursor-pointer"}`}
    >
      <Flex align={"center"} justify={"between"}>
        <Flex align={"center"} gap={"3"}>
          <Box className="relative grid h-14 w-14 place-content-center rounded-app border-2 border-gray-4 p-2">
            <img
              src={project.logo}
              alt={project.name}
              width={40}
              height={40}
              className="object-contain"
            />
          </Box>
          <Box>
            <Heading as="h3" className="font-medium text-gray-12" size={"3"}>
              {project.name}
            </Heading>
            <Text as="p" className="text-gray-11 text-sm">
              {project.company}
            </Text>
          </Box>
        </Flex>
        {!isListFilter && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className=" cursor-pointer">
              <IconButton className="bg-transparent text-gray-10">
                <Icon name="Ellipsis"/>
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end" className="w-[180px] p-0">
              <DropdownMenu.Item
                onClick={() =>
                  project?.id && handleDrawerOpen(project.id.toString())
                }
                className="flex items-center gap-2"
              >
                <Icon name="Pencil"/>
                Edit
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => onAddMember(project)}
                className="flex items-center gap-2"
              >
                <Icon name="UserPlus"/>
                Add Member
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onClick={() => onAddDueDate(project)}
                className="flex items-center gap-2"
              >
                <Icon name="Clock"/>
                Add Due Date
              </DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item
                color="red"
                onClick={() => onDelete(project.id)}
              >
                <Icon name="Trash2"/>
                Delete Project
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        )}
      </Flex>
      {!isListFilter && (
        <Text as="p" className="text-gray-11 text-sm">
          {project.description}
        </Text>
      )}
      {!isListFilter && (
        <Box>
          <Flex align={"center"} justify={"between"} className="mb-1">
            <Text as="span" className="text-gray-11 text-sm">
              Progress
            </Text>
            <Text as="span" className="text-gray-11 text-sm">
              {project.progress}%
            </Text>
          </Flex>
          <Progress value={project.progress} color="green" size={"2"} />
        </Box>
      )}

      <Flex align={"center"} justify={"between"} className="mt-auto pt-2">
        <Flex
          align={"center"}
          gap={"1"}
          className="rounded-app bg-gray-3 p-2 font-medium text-gray-11"
        >
          <Icon name="Clock"/>
          <Text as="span" className="text-sm ">
            {project.timeLeft} {project.timeType} left
          </Text>
        </Flex>
        <Flex gap={"1"}>
          {project.members.slice(0, 3).map((member) => (
            <Box
              key={member.id}
              className="h-8 w-8 overflow-hidden rounded-app"
            >
              <Avatar
                src={member.avatar}
                name={member.name}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Card.Root>
  )
}
