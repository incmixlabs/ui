import { ChevronLeft } from "lucide-react"

import { IconButton } from "@incmix/ui/icon-button"
import { cn } from "@incmix/ui/utils"

interface SidebarToggleProps {
  isOpen: boolean | undefined
  setIsOpen?: () => void
}

export function SidebarToggle({ isOpen, setIsOpen }: SidebarToggleProps) {
  return (
    <div className="-right-[16px] invisible absolute top-[12px] z-20 lg:visible">
      <IconButton
        onClick={() => setIsOpen?.()}
        className="h-8 w-8 rounded-md"
        variant="outline"
      >
        <ChevronLeft
          className={cn(
            "h-4 w-4 transition-transform duration-700 ease-in-out",
            isOpen === false ? "rotate-180" : "rotate-0"
          )}
        />
      </IconButton>
    </div>
  )
}
