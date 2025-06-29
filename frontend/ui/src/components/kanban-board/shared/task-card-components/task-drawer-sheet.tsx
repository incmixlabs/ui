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
    <div className="fixed inset-0 ">
      {/* Improved backdrop with blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/10 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Improved sheet with slide animation */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: -10 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="ml-auto relative z-50 w-full max-w-2xl h-[98%] mt-[0.5%] bg-gray-2 border border-gray-2 rounded-xl"
      >
        {children}
      </motion.div>
    </div>
  )
}