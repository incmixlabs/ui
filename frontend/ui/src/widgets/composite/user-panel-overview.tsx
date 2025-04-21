import { KanbanImages } from "@components/kanban-board/images";
import { Avatar, Box, CardContainer, Flex, IconButton, Text } from "@incmix/ui";
import { Settings } from "lucide-react";
import React from "react";
import { RecentActivity } from "../recent-activity";
import { Calendar } from "../calendar";

export function UserPanelOverview() {
  return (
    <CardContainer className="space-y-2 h-full">
      <Flex
        justify={"between"}
        align={"center"}
        className="w-full border-gray-5 border-"
      >
        <Flex gap={"3"} align={"center"}>
          <Avatar src={KanbanImages?.user1} />
          <Box className="space-y-0">
            <Text as="p" className="font-medium text-gray-12">
              ArtTemplate
            </Text>
            <Text className="text-gray-9">example@mail.com</Text>
          </Box>
        </Flex>
        <IconButton variant="ghost" className="cursor-pointer">
          <Settings />
        </IconButton>
      </Flex>
        <Calendar className="w-full shadow-none" />
        <RecentActivity />
    </CardContainer>
  );
}
