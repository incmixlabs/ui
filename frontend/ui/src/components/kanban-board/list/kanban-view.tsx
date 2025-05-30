import { Clock } from "lucide-react"
import type { FC } from "react"

import { Image } from "@components/card/flow-card"
import { Box, Flex, Text } from "@incmix/ui"
import type { KanbanBoardTask } from "../types"

export type ListKanbanViewProps = {
  task: KanbanBoardTask
}
export const ListKanbanView: FC<ListKanbanViewProps> = ({ task }) => {
  const daysLeft = `\u00A0 ${task.daysLeft} days left`
  return (
    <Box
      key={task.id}
      className="mb-4 w-[28rem] cursor-grab rounded-lg bg-white p-5 shadow dark:bg-gray-800"
    >
      <Flex align={"center"} justify={"between"} className="pb-4">
        <div className="font-semibold text-base text-gray-900 dark:text-white">
          {task.name}
        </div>
      </Flex>
      <Flex direction={"column"}>
        {!!task.attachment && (
          <Box className="relative mb-3 aspect-video w-full">
            <Image
              imgAlt=""
              // fill
              imgSrc={task.attachment}
              className="rounded-lg"
            />
          </Box>
        )}
        <Text
          as="p"
          className="pb-4 font-normal text-gray-700 text-sm dark:text-gray-400"
        >
          {task.description}
        </Text>
        <Flex justify={"between"}>
          <Flex align={"center"} justify={"start"}>
            {/* <AvatarGroup
              size="2"
              layout="stack"
              // users={task.members}
              maxVisible={3}
            /> */}
          </Flex>
          <Flex
            justify={"center"}
            align={"center"}
            className="rounded-lg bg-purple-100 px-3 font-medium text-purple-800 text-sm dark:bg-purple-200"
          >
            <Clock width="12px" height="12px" /> {daysLeft}
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
