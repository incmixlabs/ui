// task-card-components/task-drawer-sheet.tsx
import { motion } from "framer-motion"

interface TaskDrawerSheetProps { 
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode 
}

export function TaskDrawerSheet({ open, onOpenChange, children }: TaskDrawerSheetProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Improved backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Improved sheet with slide animation */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="ml-auto w-full max-w-2xl bg-white dark:bg-gray-950 shadow-2xl border-l border-gray-200 dark:border-gray-800"
      >
        {children}
      </motion.div>
    </div>
  )
}