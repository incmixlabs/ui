import React from "react";
import { Avatar, Box, CardContainer, Flex, IconButton, Text } from "@incmix/ui";
import { Settings } from "lucide-react";


export function UserProfile(
  {
    user = {
      name: "ArtTemplate",
      email: "example@mail.com"
    }
  }
) {
  return (
    <CardContainer className="space-y-2 h-full">
      <Flex
        justify={"between"}
        align={"center"}
        className="w-full border-gray-5 "
      >
        <Flex gap={"3"} align={"center"}>
          <Avatar src={user.avatar} />
          <Box className="space-y-0">
            <Text as="p" className="font-medium text-gray-12">
              {user.name}
            </Text>
            <Text className="text-gray-9">{user.email}</Text>
          </Box>
        </Flex>
        <IconButton variant="ghost" className="cursor-pointer">
          <Settings />
        </IconButton>
      </Flex>
    </CardContainer>
  );
}
