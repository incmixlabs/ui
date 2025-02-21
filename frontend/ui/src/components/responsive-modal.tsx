'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Drawer as VaulDrawer } from 'vaul';
import { cn } from "@utils";

// Direction variants similar to the other implementation
type DrawerDirection = 'top' | 'bottom' | 'left' | 'right';

interface DrawerContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  direction: DrawerDirection;
}

const DrawerContext = createContext<DrawerContextProps | undefined>(undefined);

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawer must be used within a ResponsiveDrawer');
  }
  return context;
};

interface ResponsiveDrawerProps {
  children: ReactNode;
  triggerContent?: ReactNode;
  open?: boolean;
  setOpen?: (open: boolean) => void;
  className?: string;
  direction?: DrawerDirection;
  forceDrawerMode?: boolean;
  forceModalMode?: boolean;
  breakpoint?: string;
}

export function ResponsiveDrawer({
  children,
  triggerContent,
  open: controlledOpen,
  setOpen: controlledSetOpen,
  className,
  direction = 'bottom',
  forceDrawerMode = false,
  forceModalMode = false,
  breakpoint = '(min-width: 768px)',
}: ResponsiveDrawerProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const setOpen = useCallback(
    (value: boolean) => {
      if (controlledSetOpen) {
        controlledSetOpen(value);
      } else {
        setInternalOpen(value);
      }
    },
    [controlledSetOpen]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(breakpoint);
    const handleMediaChange = (event: MediaQueryListEvent) => {
      setIsDesktop(event.matches);
    };

    setIsDesktop(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleMediaChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
    };
  }, [breakpoint]);

  // Determine if we should show modal or drawer based on settings
  const showModal = forceModalMode || (isDesktop && !forceDrawerMode);

  return (
    <DrawerContext.Provider value={{ open, setOpen, direction }}>
      {triggerContent && <DrawerTrigger>{triggerContent}</DrawerTrigger>}
      {showModal ? (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='fixed inset-0 z-[110] flex items-center justify-center bg-background/40 backdrop-blur-sm cursor-zoom-out'
              onClick={() => setOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  'relative w-full max-w-md p-6 border bg-background rounded-lg cursor-default',
                  className
                )}
              >
                <DrawerClose className='absolute top-2 right-2 bg-primary text-background p-2 border z-[1] rounded-md'>
                  <X aria-hidden="true" />
                  <span className="sr-only">Close</span>
                </DrawerClose>
                <div className="h-full w-full">
                  {children}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent 
            direction={direction}
            className={className}
          >
            {children}
          </DrawerContent>
        </Drawer>
      )}
    </DrawerContext.Provider>
  );
}

// Extracted components similar to the other implementation
export const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof VaulDrawer.Root>) => (
  <VaulDrawer.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
Drawer.displayName = "Drawer";

export const DrawerTrigger = ({ children }: { children: ReactNode }) => {
  const { setOpen } = useDrawer();
  return (
    <div onClick={() => setOpen(true)} role="button" tabIndex={0}>
      {children}
    </div>
  );
};
DrawerTrigger.displayName = "DrawerTrigger";

export const DrawerClose = React.forwardRef<
  HTMLButtonElement, 
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { setOpen } = useDrawer();
  return (
    <button
      ref={ref}
      className={cn(className)}
      onClick={() => setOpen(false)}
      aria-label="Close drawer"
      {...props}
    >
      {children}
    </button>
  );
});
DrawerClose.displayName = "DrawerClose";

const getDirectionStyles = (direction: DrawerDirection): string => {
  switch (direction) {
    case 'top':
      return 'inset-x-0 top-0 rounded-b-2.5';
    case 'bottom':
      return 'inset-x-0 bottom-0 rounded-t-2.5';
    case 'left':
      return 'inset-y-0 left-0 rounded-r-2.5 h-full w-[95vw] max-w-md';
    case 'right':
      return 'inset-y-0 right-0 rounded-l-2.5 h-full w-[95vw] max-w-md';
    default:
      return 'inset-x-0 bottom-0 rounded-t-2.5';
  }
};

const getSliderStyles = (direction: DrawerDirection): string => {
  switch (direction) {
    case 'top':
      return 'bottom-1 mx-auto h-1 w-16 rounded-full';
    case 'bottom':
      return 'top-1 mx-auto h-1 w-16 rounded-full';
    case 'left':
      return 'right-1 my-auto h-16 w-1 rounded-full';
    case 'right':
      return 'left-1 my-auto h-16 w-1 rounded-full';
    default:
      return 'top-1 mx-auto h-1 w-16 rounded-full';
  }
};

interface DrawerContentProps {
  children: ReactNode;
  className?: string;
  direction?: DrawerDirection;
}

export const DrawerContent = React.forwardRef<
  React.ElementRef<typeof VaulDrawer.Content>,
  DrawerContentProps
>(({ children, className, direction = 'bottom' }, ref) => {
  const ctx = useContext(DrawerContext);
  const finalDirection = ctx?.direction || direction;
  
  return (
    <VaulDrawer.Portal>
      <VaulDrawer.Overlay className="fixed inset-0 z-[110] bg-background/40 backdrop-blur-sm" />
      <VaulDrawer.Content
        ref={ref}
        className={cn(
          'fixed z-[115] bg-background p-4 shadow-lg',
          getDirectionStyles(finalDirection),
          className
        )}
      >
        <div className={cn(
          'bg-muted',
          getSliderStyles(finalDirection)
        )} />
        <div className="h-full w-full max-h-[96vh] overflow-auto">
          {children}
        </div>
      </VaulDrawer.Content>
    </VaulDrawer.Portal>
  );
});
DrawerContent.displayName = "DrawerContent";

export const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 pb-3 text-center sm:text-left", className)}
    {...props}
  />
);
DrawerHeader.displayName = "DrawerHeader";

export const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-auto flex flex-col gap-2", className)} {...props} />
);
DrawerFooter.displayName = "DrawerFooter";

export const DrawerTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      "text-left font-semibold text-lg leading-none tracking-tight",
      className
    )}
    {...props}
  />
));
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-left font-light text-muted-foreground", className)}
    {...props}
  />
));
DrawerDescription.displayName = "DrawerDescription";