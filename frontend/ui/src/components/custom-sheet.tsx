import { cn } from "@utils"
import { AnimatePresence, motion } from "motion/react"
import type React from "react"

interface SheetProps {
  open: boolean
  handleClose: () => Promise<void>
  kanbanFilter?: boolean
  children?: React.ReactNode
}

const Sheet: React.FC<SheetProps> = ({
  open,
  handleClose,
  kanbanFilter,
  children,
}) => {
  return (
    <AnimatePresence>
      {open && (
        <dialog
          className={cn(
            kanbanFilter
              ? "relative z-50 h-full w-[30rem] flex-shrink-0 2xl:w-[40rem]"
              : "fixed top-0 left-0 z-50 h-screen w-screen"
          )}
          aria-modal="true"
        >
          {!kanbanFilter && (
            <motion.div
              className="overlay absolute h-full w-full cursor-pointer bg-black/40"
              role="button"
              aria-label="Close drawer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />
          )}

          <motion.div
            className={cn(
              "absolute top-[1%] right-[1.5%] bottom-[1%] h-[98%] cursor-default rounded-lg bg-gray-3 dark:bg-gray-4",
              kanbanFilter ? " h-full w-full" : " w-[52rem]"
            )}
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
          >
            {children}
          </motion.div>
        </dialog>
      )}
    </AnimatePresence>
  )
}

export default Sheet
