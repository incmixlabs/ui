//@ts-nocheck

import { Dialog } from "@radix-ui/themes"
import { type VariantProps, cva } from "@utils/cva"
import { X } from "lucide-react"
import * as React from "react"

import { cn } from "@utils"

// Sheet variants for positioning and animations
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top inset-x-0 top-0 border-b",
        bottom:
          "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom inset-x-0 bottom-0 border-t",
        left: "data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-lg",
        right:
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-lg",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

// Create context to manage sheet state
const SheetContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => { },
});

interface SheetProps extends Omit<React.ComponentPropsWithoutRef<typeof Dialog.Root>, "open" | "onOpenChange"> {
  defaultOpen?: boolean;
}

// Sheet component (using Dialog.Root from Themes)
const Sheet = ({ defaultOpen = false, children, ...props }: SheetProps) => {
  const [open, setOpen] = React.useState(defaultOpen);

  return (
    <SheetContext.Provider value={{ open, setOpen }}>
      <Dialog.Root open={open} onOpenChange={setOpen} {...props}>
        {children}
      </Dialog.Root>
    </SheetContext.Provider>
  );
};

interface SheetTriggerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  asChild?: boolean;
  children: React.ReactNode;
}

// Sheet Trigger with asChild support
const SheetTrigger = ({ asChild, children, ...props }: SheetTriggerProps) => {
  const { setOpen } = React.useContext(SheetContext);

  if (asChild && React.isValidElement(children)) {
    const childProps = {
      ...props,
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setOpen(true);

        // Call original onClick if it exists
        if (children.props.onClick) {
          children.props.onClick(e);
        }
      },
    };

    return React.cloneElement(children, childProps);
  }

  return (
    <Dialog.Trigger {...props}>
      {children}
    </Dialog.Trigger>
  );
};

interface SheetCloseProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  asChild?: boolean;
  children: React.ReactNode;
}

// Sheet Close with asChild support
const SheetClose = ({ asChild, children, ...props }: SheetCloseProps) => {
  const { setOpen } = React.useContext(SheetContext);

  if (asChild && React.isValidElement(children)) {
    const childProps = {
      ...props,
      onClick: (e: React.MouseEvent) => {
        setOpen(false);

        // Call original onClick if it exists
        if (children.props.onClick) {
          children.props.onClick(e);
        }
      },
    };

    return React.cloneElement(children, childProps);
  }

  return (
    <Dialog.Close {...props}>
      {children}
    </Dialog.Close>
  );
};

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof Dialog.Content>,
  VariantProps<typeof sheetVariants> {
  notOverlay?: boolean;
  hideCloseIcon?: boolean;
}

// Sheet Content
const SheetContent = React.forwardRef<
  React.ElementRef<typeof Dialog.Content>,
  SheetContentProps
>(
  (
    {
      side = "right",
      notOverlay,
      className,
      hideCloseIcon,
      children,
      ...props
    },
    ref
  ) => {
    const { setOpen } = React.useContext(SheetContext);

    return (
      <Dialog.Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        overlayClassName={notOverlay ? "hidden" : undefined}
        {...props}
      >
        {children}
        {!hideCloseIcon && (
          <button
            className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        )}
      </Dialog.Content>
    );
  }
);
SheetContent.displayName = "SheetContent";

// Sheet Header
const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
);
SheetHeader.displayName = "SheetHeader";

// Sheet Footer
const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
);
SheetFooter.displayName = "SheetFooter";

// Sheet Title
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof Dialog.Title>,
  React.ComponentPropsWithoutRef<typeof Dialog.Title>
>(({ className, ...props }, ref) => (
  <Dialog.Title
    ref={ref}
    className={cn("font-semibold text-foreground text-lg", className)}
    {...props}
  />
));
SheetTitle.displayName = "SheetTitle";

// Sheet Description
const SheetDescription = React.forwardRef<
  React.ElementRef<typeof Dialog.Description>,
  React.ComponentPropsWithoutRef<typeof Dialog.Description>
>(({ className, ...props }, ref) => (
  <Dialog.Description
    ref={ref}
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
));
SheetDescription.displayName = "SheetDescription";

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};