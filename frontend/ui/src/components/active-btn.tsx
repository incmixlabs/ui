import { Box, Button } from "@incmix/ui/base"
import { cn } from "@utils"
import type React from "react"

import { useEffect, useRef, useState } from "react"

export type btnItem = {
  id: string
  label: React.ReactNode
  icon?: React.ReactNode
}

type ActiveBtnProps = {
  items: btnItem[]
  defaultActiveId?: string
  onChange?: (id: string) => void
  className?: string
  indicatorClassName?: string
}

export  function ActiveBtn({
  items,
  defaultActiveId,
  onChange,
  className = "",
  indicatorClassName = "bg-indigo-10 text-gray-12",
}: ActiveBtnProps) {
  const [activeId, setActiveId] = useState(defaultActiveId || (items.length > 0 ? items[0].id : ""))
  const containerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (defaultActiveId) setActiveId(defaultActiveId)
  }, [defaultActiveId])
  const [indicatorStyle, setIndicatorStyle] = useState({
    left: 0,
    width: 0,
  })

  useEffect(() => {
    const updateIndicator = () => {
      const containerElement = containerRef.current
      if (!containerElement) return

      const activeElement = containerElement.querySelector(`[data-item-id="${activeId}"]`) as HTMLElement
      if (activeElement) {
        setIndicatorStyle({
          left: activeElement.offsetLeft,
          width: activeElement.offsetWidth,
        })
      }
    }

    updateIndicator()
    window.addEventListener("resize", updateIndicator)
    return () => window.removeEventListener("resize", updateIndicator)
  }, [activeId])

  const handleItemClick = (id: string) => {
    setActiveId(id)
    onChange?.(id)
  }

  return (
    <Box className={cn("relative  rounded-full border-gray-5", className)} ref={containerRef}
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
                "flex items-center gap-2 px-4 py-2 relative z-[2] rounded-full text-sm font-medium",
                activeId === item.id ? "text-gray-1" : "text-gray-12",
              )}
              onKeyDown={(e) => {  
                if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return  
        
                const currentIndex = items.findIndex(item => item.id === activeId)  
                let nextIndex = currentIndex  
        
                if (e.key === 'ArrowLeft') {  
                  nextIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1  
                } else if (e.key === 'ArrowRight') {  
                  nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0  
                }  
        
                const nextId = items[nextIndex].id  
                handleItemClick(nextId)  
              }}
            >
              {item.icon}
              {item.label}
            </Button>
          </li>
        ))}
      </ul>

      <div
        className={cn(
          "absolute top-0 h-full rounded-full transition-all  duration-300 ease-in-out ",
          indicatorClassName,
        )}
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
      />
    </Box>
  )
}
