import { cn } from "@utils";
import { motion, AnimatePresence } from "motion/react";
import React from "react";

interface SheetProps {
  open: boolean;
  handleClose: () => Promise<void>;
  kanbanFilter?: boolean;
  children?: React.ReactNode;
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
        <div
          className={cn(
            kanbanFilter
              ? "relative z-50  2xl:w-[40rem] w-[30rem]  h-full flex-shrink-0"
              : "fixed top-0 left-0 h-screen w-screen z-50",
          )}
        >
          {!kanbanFilter && (
            <motion.div
              className="overlay absolute h-full w-full bg-black/40 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
            />
          )}

          {/* Content */}
          <motion.div
            className={cn(
              "content rounded-lg dark:bg-gray-4 bg-gray-3 cursor-default h-[98%] absolute top-[1%] bottom-[1%]   right-[1.5%]",
              kanbanFilter ? " h-full  w-full" : "  w-[52rem]",
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
        </div>
      )}
    </AnimatePresence>
  );
};

export default Sheet;
