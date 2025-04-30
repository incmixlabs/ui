"use client"

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
  activeClassName?: string
  inactiveClassName?: string
  indicatorClassName?: string
}

export  function ActiveBtn({
  items,
  defaultActiveId,
  onChange,
  className = "",
  activeClassName = "text-white",
  inactiveClassName = "text-gray-11 hover:bg-gray-4",
  indicatorClassName = "bg-indigo-10",
}: ActiveBtnProps) {
  const [activeId, setActiveId] = useState(defaultActiveId || (items.length > 0 ? items[0].id : ""))
  const containerRef = useRef<HTMLDivElement>(null)
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
    <div className={cn("relative", className)} ref={containerRef}>
      <ul className="flex justify-center gap-2">
        {items.map((item) => (
          <li key={item.id}>
            <button
              data-item-id={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 relative z-[2] rounded-full text-sm font-medium transition-colors",
                activeId === item.id ? activeClassName : inactiveClassName,
              )}
            >
              {item.icon}
              {item.label}
            </button>
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
    </div>
  )
}
