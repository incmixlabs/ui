import { Menu } from "lucide-react"
import { Box } from "./base"

export const DragHandle = () => {
  return (
    <Box
      as="span"
      data-swapy-handle
      className="absolute z-10 cursor-grab p-2 text-gray-11 transition-opacity hover:opacity-100"
    >
      <Menu width={16} height={16} />
    </Box>
  )
}
