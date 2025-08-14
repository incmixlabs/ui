import type React from "react"

import { cn } from "@/shadcn/lib/utils"
import type { Transition } from "motion/react"
import { motion, useAnimation } from "motion/react"
import type { HTMLAttributes } from "react"
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react"

export interface PenIconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

interface PenIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
}

const defaultTransition: Transition = {
  duration: 1,
  ease: "easeInOut",
}

const EditIcon = forwardRef<PenIconHandle, PenIconProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation()
    const isControlledRef = useRef(false)

    useImperativeHandle(ref, () => {
      isControlledRef.current = true

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      }
    })

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("animate")
        }
        onMouseEnter?.(e)
      },
      [controls, onMouseEnter]
    )

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isControlledRef.current) {
          controls.start("normal")
        }
        onMouseLeave?.(e)
      },
      [controls, onMouseLeave]
    )

    return (
      <div
        className={cn("cursor-pointer", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{
            normal: { scale: 1, y: 0 },
            animate: { scale: 1.05, y: -2 },
          }}
          animate={controls}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          <title>Edit icon</title>
          {/* Square/document path */}
          <motion.path
            d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
            variants={{
              normal: { pathLength: 1 },
              animate: { pathLength: [1, 0, 1] },
            }}
            animate={controls}
            transition={defaultTransition}
          />

          {/* Pen path */}
          <motion.path
            d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"
            variants={{
              normal: { pathLength: 1 },
              animate: { pathLength: [1, 0, 1] },
            }}
            animate={controls}
            transition={defaultTransition}
          />
        </motion.svg>
      </div>
    )
  }
)

EditIcon.displayName = "EditIcon"

export { EditIcon }
