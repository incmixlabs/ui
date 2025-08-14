import { cn } from "@/shadcn/lib/utils"
import { Box, Button, Tooltip } from "@/src/1base"
import type React from "react"

import { useEffect, useRef, useState } from "react"

export type BtnItem = {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
}

type ActiveBtnProps = {
  isDesktop: boolean
  items: BtnItem[]
  defaultActiveId?: string
  onChange?: (id: string) => void
  className?: string
  indicatorClassName?: string
}

export function ActiveBtn({
  isDesktop,
  items,
  defaultActiveId,
  onChange,
  className = "",
  indicatorClassName = "bg-indigo-10 text-gray-12",
}: ActiveBtnProps) {
  const [activeId, setActiveId] = useState(
    defaultActiveId || (items.length > 0 ? items[0].id : "")
  )
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (defaultActiveId) setActiveId(defaultActiveId)
  }, [defaultActiveId])

  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  })

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>

    const updateIndicator = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const containerElement = containerRef.current
        if (!containerElement) return

        const activeElement = containerElement.querySelector(
          `[data-item-id="${activeId}"]`
        ) as HTMLElement
        if (activeElement) {
          setIndicatorStyle({
            left: activeElement.offsetLeft,
            width: activeElement.offsetWidth,
          })
        }
      }, 100)
    }

    updateIndicator()
    window.addEventListener("resize", updateIndicator)
    return () => {
      window.removeEventListener("resize", updateIndicator)
      clearTimeout(timeoutId)
    }
  }, [activeId])

  const handleItemClick = (id: string) => {
    setActiveId(id)
    onChange?.(id)
  }

  return (
    <Box
      className={cn("relative border-gray-5", className)}
      ref={containerRef}
      role="tablist"
    >
      <ul className="flex justify-center gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <Button
              role="tab"
              aria-selected={activeId === item.id}
              variant={"soft"}
              tabIndex={activeId === item.id ? 0 : -1}
              data-item-id={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                "relative z-[2] flex items-center gap-1 px-2 py-2 font-medium text-sm xl:gap-2",
                activeId === item.id ? "text-gray-1" : "text-gray-12"
              )}
              onKeyDown={(e) => {
                if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return

                const currentIndex = items.findIndex(
                  (item) => item.id === activeId
                )
                let nextIndex = currentIndex

                if (e.key === "ArrowLeft") {
                  nextIndex =
                    currentIndex > 0 ? currentIndex - 1 : items.length - 1
                } else if (e.key === "ArrowRight") {
                  nextIndex =
                    currentIndex < items.length - 1 ? currentIndex + 1 : 0
                }

                const nextId = items[nextIndex].id
                handleItemClick(nextId)
              }}
            >
              {isDesktop ? (
                <>
                  {item.icon}
                  {item.label}
                </>
              ) : (
                <Tooltip
                  content={item.label}
                  aria-label={
                    typeof item.label === "string" ? item.label : undefined
                  }
                >
                  {item.icon}
                </Tooltip>
              )}
            </Button>
          </li>
        ))}
      </ul>

      <Box
        className={cn(
          "absolute top-0 h-full rounded-app transition-all duration-300 ease-in-out",
          indicatorClassName
        )}
        style={{
          transform: `translateX(${indicatorStyle.left}px)`,
          width: `${indicatorStyle.width}px`,
        }}
      />
    </Box>
  )
}
