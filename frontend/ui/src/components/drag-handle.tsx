import { Box } from "@incmix/ui"

import { GripHorizontal } from "lucide-react"


export const DragHandle = () => {
  return (
    <Box
      as="span"
      data-swapy-handle
      className="absolute top-2 right-2 z-10 cursor-grab rounded-lg border border-gray-6 bg-gray-3 p-2 py-1 active:cursor-grabbing dark:bg-gray-5"
    >
      <GripHorizontal className="text-gray-10" />
    </Box>
  )
}
