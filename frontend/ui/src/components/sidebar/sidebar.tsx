"use client";
import React, {
  ComponentProps,
  forwardRef,
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "@utils/cva";
import { ChevronsLeft, PanelLeft } from "lucide-react";
import { useLocation } from "@tanstack/react-router";

import { useIsMobile } from "@hooks/use-mobile";
import { cn } from "@utils/cn";
import {
  Box,
  Button,
  HoverCard,
  IconButton,
  Input,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  Skeleton,
  Text,
} from "@base";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import {
  useThemeStore,
  useAppearanceStore,
  useSidebarStore,
  SIDEBAR_COLOR_OPTIONS,
} from "@incmix/store/use-settings-store";
import { set } from "date-fns";
import { HoverMenu } from "./hovermenu";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "4rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  // Primary sidebar
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;

  // Secondary sidebar
  secondaryOpen: boolean;
  setSecondaryOpen: (open: boolean) => void;

  // Common
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  toggleSidebar: () => void;
  toggleSecondarySidebar: () => void;
};

const SidebarContext = createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
}

const SidebarProvider = forwardRef<
  HTMLDivElement,
  ComponentProps<"div"> & {
    // Primary sidebar
    defaultOpen?: boolean;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;

    // Secondary sidebar
    defaultSecondaryOpen?: boolean;
    secondaryOpen?: boolean;
    onSecondaryOpenChange?: (open: boolean) => void;
  }
>(
  (
    {
      defaultOpen = true,
      open: openProp,
      onOpenChange: setOpenProp,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const {
      defaultSecondaryOpen = true,
      secondaryOpen: secondaryOpenProp,
      onSecondaryOpenChange: setSecondaryOpenProp,
    } = props;
    const isMobile = useIsMobile();
    const { pathname } = useLocation();
    const [openMobile, setOpenMobile] = useState(false);
    const [_secondaryOpen, _setSecondaryOpen] = useState(defaultSecondaryOpen);
    const secondaryOpen = secondaryOpenProp ?? _secondaryOpen;

    // This is the internal state of the sidebar.
    // We use openProp and setOpenProp for control from outside the component.
    const [_open, _setOpen] = useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = useCallback(
      (value: boolean | ((value: boolean) => boolean)) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }

        // This sets the cookie to keep the sidebar state.
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open],
    );
    // Helper to toggle the sidebar.
    const toggleSidebar = useCallback(() => {
      setOpen((open) => !open);
    }, [setOpen]);

    const setSecondaryOpen = useCallback(
      (value: boolean | ((prev: boolean) => boolean)) => {
        const newValue =
          typeof value === "function" ? value(secondaryOpen) : value;
        setSecondaryOpenProp?.(newValue) || _setSecondaryOpen(newValue);
      },
      [setSecondaryOpenProp, secondaryOpen],
    );

    const toggleSecondarySidebar = useCallback(() => {
      setSecondaryOpen((prev) => !prev);
    }, [setSecondaryOpen]);

    // Adds a keyboard shortcut to toggle the sidebar.
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (
          event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
          (event.metaKey || event.ctrlKey)
        ) {
          event.preventDefault();
          toggleSidebar();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);

    // This makes it easier to style the sidebar with Tailwind classes.
    const state = open ? "expanded" : "collapsed";

    const contextValue = useMemo<SidebarContext>(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar,
        setSecondaryOpen,
        secondaryOpen,
        toggleSecondarySidebar,
      }),
      [
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        toggleSidebar,
        setSecondaryOpen,
        secondaryOpen,
        toggleSecondarySidebar,
      ],
    );

    return (
      <SidebarContext.Provider value={contextValue}>
        <>
          <Box
            style={
              {
                "--sidebar-width": SIDEBAR_WIDTH,
                "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
                ...style,
              } as React.CSSProperties
            }
            className={cn(
              "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
              className,
            )}
            ref={ref}
            {...props}
          >
            {children}
          </Box>
        </>
      </SidebarContext.Provider>
    );
  },
);
SidebarProvider.displayName = "SidebarProvider";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    side?: "left" | "right";
    variant?: "sidebar" | "floating" | "inset";
    collapsible?: "offcanvas" | "icon" | "none";
    isDefaultMobile?: boolean;
  }
>(
  (
    {
      side = "left",
      variant = "sidebar",
      collapsible = "offcanvas",
      className,
      children,
      isDefaultMobile = true,
      ...props
    },
    ref,
  ) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    const SideBarTrigger = (
      <SidebarTrigger
        icon={<ChevronsLeft className="stroke-[var(--sidebar-background)]" />}
        className="-right-5 fixed top-10 left-[calc(var(--sidebar-width)_-_20px)] z-50 h-10 w-10 rounded-full border border-[var(--sidebar-active)] border-solid bg-[var(--sidebar-foreground)] transition-all duration-200 ease-linear group-data-[collapsible=icon]:left-[calc(var(--sidebar-width-icon)_-_20px)] group-data-[collapsible=icon]:rotate-180"
      />
    );

    if (collapsible === "none") {
      return (
        <Box
          className={cn(
            "flex h-full md:w-[--sidebar-width] w-fit flex-col  text-sidebar-foreground",
          )}
          ref={ref}
          {...props}
        >
          {SideBarTrigger}
          {children}
        </Box>
      );
    }
    if (isMobile && isDefaultMobile) {
      return (
        <Box {...props}>
          {openMobile && (
            <Box
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setOpenMobile(false)}
            />
          )}

          <Box
            data-sidebar="sidebar"
            data-mobile="true"
            className={cn(
              "fixed inset-y-0 left-0 z-50  transform text-sidebar-foreground transition-transform duration-300 ease-in-out",
              openMobile ? "translate-x-0" : "-translate-x-full",
              className,
            )}
          >
            {SideBarTrigger}

            <Text className="sr-only">Sidebar</Text>

            {/* Content */}
            <Box className="flex h-full w-full flex-col">{children}</Box>
          </Box>
        </Box>
      )
    }

    return (
      <>
        {isMobile && openMobile && (
          <div
            className="fixed inset-0 z-30 cursor-pointer bg-black bg-opacity-50 transition-opacity"
            onClick={() => setOpenMobile(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                // toggleSidebar()
              }
            }}
          />
        )}

        <Box
          ref={ref}
          className={cn(
            "group peer relative text-[var(--sidebar-foreground)] bg-[var(--sidebar-background)]",
            isMobile && openMobile
              ? "fixed inset-y-0 left-0 z-40 md:w-[--sidebar-width] w-fit"
              : "hidden",
            !isMobile && "flex",
          )}
          data-state={state}
          data-collapsible={state === "collapsed" ? collapsible : ""}
          data-variant={variant}
          data-side={side}
          data-sidebar="sidebar"
          data-mobile="true"
        >
          {SideBarTrigger}
          {/* This is what handles the sidebar gap on desktop */}
          <Box
            className={cn(
              "relative h-svh w-[--sidebar-width] bg-transparent transition-[width] duration-200 ease-linear",
              "group-data-[collapsible=offcanvas]:w-0",
              "group-data-[side=right]:rotate-180",
              variant === "floating" || variant === "inset"
                ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]"
                : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]",
            )}
          />
          <Box
            className={cn(
              "fixed inset-y-0 z-10 flex h-svh w-[--sidebar-width] transition-[left,right,width] duration-200 ease-linear",
              isMobile && openMobile ? "z-40 bg-sidebar shadow-lg" : "",
              side === "left"
                ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
                : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              variant === "floating" || variant === "inset"
                ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]"
                : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] ",
              className,
            )}
            {...props}
          >
            <Box
              data-sidebar="sidebar"
              className={cn(
                `flex h-full w-full flex-col px-1 group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow`,
                // sidebarBgClass,
                className,
              )}
            >
              {children}
            </Box>
          </Box>
        </Box>
      </>
    );
  },
);
Sidebar.displayName = "Sidebar";

const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(
  (
    {
      className,
      onClick,
      icon,
      isSecondary,
      mobileSidebarTrigger,
      srLabel,
      ...props
    },
    ref,
  ) => {
    const {
      toggleSidebar,
      toggleSecondarySidebar,
      isMobile,
      openMobile,
      setOpenMobile,
    } = useSidebar();

    return (
      <IconButton
        ref={ref}
        data-sidebar="trigger"
        variant="soft"
        className={cn("h-7 w-7", className)}
        onClick={(event) => {
          onClick?.(event);
          if (isMobile) {
            if (mobileSidebarTrigger) {
              setOpenMobile(!openMobile);
            }
            if (isSecondary) {
              toggleSecondarySidebar();
            } else {
              toggleSidebar();
            }
          } else {
            if (isSecondary) {
              toggleSecondarySidebar();
            } else {
              toggleSidebar();
            }
          }
        }}
        {...props}
      >
        {icon ? icon : <PanelLeft />}
        <span className="sr-only">{srLabel ? srLabel : "Toggle Sidebar"}</span>
      </IconButton>
    );
  },
);
SidebarTrigger.displayName = "SidebarTrigger";

const SidebarRail = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button">
>(({ className, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      ref={ref}
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        "-translate-x-1/2 group-data-[side=left]:-right-4 absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=right]:left-0 sm:flex",
        "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:hover:bg-sidebar group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className,
      )}
      {...props}
    />
  );
});
SidebarRail.displayName = "SidebarRail";

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"main">
>(({ className, ...props }, ref) => {
  return (
    <main
      ref={ref}
      className={cn(
        "relative flex min-h-svh flex-1 flex-col bg-background",
        "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
        className,
      )}
      {...props}
    />
  );
});
SidebarInset.displayName = "SidebarInset";

const SidebarInput = React.forwardRef<
  React.ElementRef<typeof Input>,
  React.ComponentProps<typeof Input>
>(({ className, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      data-sidebar="input"
      className={cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className,
      )}
      {...props}
    />
  );
});
SidebarInput.displayName = "SidebarInput";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
});
SidebarHeader.displayName = "SidebarHeader";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  );
});
SidebarFooter.displayName = "SidebarFooter";

const SidebarSeparator = React.forwardRef<
  React.ElementRef<typeof Separator>,
  React.ComponentProps<typeof Separator>
>(({ className, ...props }, ref) => {
  return (
    <Separator
      ref={ref}
      data-sidebar="separator"
      className={cn("mx-2 w-auto bg-sidebar-border", className)}
      {...props}
    />
  );
});
SidebarSeparator.displayName = "SidebarSeparator";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarContent.displayName = "SidebarContent";

const SidebarGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
});
SidebarGroup.displayName = "SidebarGroup";

const SidebarGroupLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "flex h-12 shrink-0 items-center gap-3 rounded-md px-2 font-medium text-lg text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";

const SidebarHeaderLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-label"
      className={cn(
        "mt-2 flex h-8 shrink-0 items-center gap-3 rounded-md px-2 font-medium text-lg text-[var(--sidebar-foreground)] outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>span:last-child]:text-2xl [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:p-0",
        className,
      )}
      {...props}
    />
  );
});
SidebarHeaderLabel.displayName = "SidebarHeaderLabel";

const SidebarGroupAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean }
>(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="group-action"
      className={cn(
        "absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:-inset-2 after:absolute after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className,
      )}
      {...props}
    />
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";

const SidebarGroupContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="group-content"
    className={cn("w-full text-sm", className)}
    {...props}
  />
));
SidebarGroupContent.displayName = "SidebarGroupContent";

const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu"
    className={cn("flex w-full min-w-0 flex-col gap-1", className)}
    {...props}
  />
));
SidebarMenu.displayName = "SidebarMenu";

const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    data-sidebar="menu-item"
    className={cn("group/menu-item relative", className)}
    {...props}
  />
));
SidebarMenuItem.displayName = "SidebarMenuItem";

const sidebarMenuButtonVariants = cva(
  "peer/menu-button group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-[var(--sidebar-active)] hover:text-[var(--sidebar-foreground)] focus-visible:ring-2 active:bg-[var(--sidebar-active)] active:text-[var(--sidebar-foreground)] disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-[var(--sidebar-active)] data-[active=true]:font-medium data-[active=true]:text-[var(--sidebar-foreground)] data-[state=open]:hover:bg-[var(--sidebar-active)] data-[state=open]:hover:text-[var(--sidebar-foreground)] [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "hover:bg-[var(--sidebar-active)] hover:text-[var(--sidebar-foreground)]",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-12 text-sm",
        sm: "h-7 text-xs",
        lg: "group-data-[collapsible=icon]:!p-0 h-12 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    isActive?: boolean;
    isSelected?: boolean;
    isSubMenuSelected?: boolean;
    hoverContent?: React.ReactNode;
    tooltip?: string | React.ComponentProps<typeof TooltipContent>;
  } & VariantProps<typeof sidebarMenuButtonVariants>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      hoverContent,
      className,
      isSelected,
      isSubMenuSelected,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state, open, setOpen } = useSidebar();

    console.log(state);

    const button = (
      <Comp
        ref={ref}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(
          sidebarMenuButtonVariants({ variant, size }),
          "hover:bg-[var(--sidebar-active)]",
          `${isSelected && open && "relative rounded-tl-[0px] rounded-bl-[0px] border-l-0 bg-[var(--sidebar-active)] font-[600] before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[4px] before:rounded-tr-[4px] before:rounded-br-[4px] before:bg-[var(--sidebar-foreground)] before:content-['']"}`,
          `${(isSelected || isSubMenuSelected) && !open && " bg-[var(--sidebar-active)] text-[var(--sidebar-foreground)]"}`,
          className,
        )}
        {...props}
      />
    );
    if (state === "collapsed" && (hoverContent || tooltip)) {
      return (
        <HoverMenu
          content={
            hoverContent || (
              <Box className="px-3 py-2 w-fit">
                <Text
                  as="span"
                  size="2"
                  className="font-medium whitespace-nowrap"
                >
                  {tooltip}
                </Text>
              </Box>
            )
          }
          side="right"
          align="center"
          sideOffset={8}
          openDelay={50}
          closeDelay={150}
        >
          {button}
        </HoverMenu>
      );
    }

    return button;
  },
);
SidebarMenuButton.displayName = "SidebarMenuButton";

const SidebarMenuAction = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & {
    asChild?: boolean;
    showOnHover?: boolean;
  }
>(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-sidebar="menu-action"
      className={cn(
        "absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:-inset-2 after:absolute after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
          "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className,
      )}
      {...props}
    />
  );
});

SidebarMenuAction.displayName = "SidebarMenuAction";

const SidebarMenuBadge = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-sidebar="menu-badge"
    className={cn(
      "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 font-medium text-sidebar-foreground text-xs tabular-nums",
      "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
      "peer-data-[size=sm]/menu-button:top-1",
      "peer-data-[size=default]/menu-button:top-1.5",
      "peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
));
SidebarMenuBadge.displayName = "SidebarMenuBadge";

const SidebarMenuSkeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    showIcon?: boolean;
  }
>(({ className, showIcon = false, ...props }, ref) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <Box
      ref={ref}
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-[--skeleton-width] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </Box>
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";

const SidebarMenuSub = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    data-sidebar="menu-sub"
    className={cn(
      "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-[var(--sidebar-foreground)] border-l px-2.5 py-0.5",
      "group-data-[collapsible=icon]:hidden",
      className,
    )}
    {...props}
  />
));
SidebarMenuSub.displayName = "SidebarMenuSub";

const SidebarMenuSubItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ ...props }, ref) => <li ref={ref} {...props} />);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";

const SidebarMenuSubButton = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentProps<"a"> & {
    asChild?: boolean;
    size?: "sm" | "md";
    isActive?: boolean;
    isSelected?: boolean;
  }
>(
  (
    { asChild = false, size = "md", isActive, isSelected, className, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "a";
    const { open } = useSidebar();
    return (
      <Comp
        ref={ref}
        data-sidebar="menu-sub-button"
        data-size={size}
        data-active={isActive}
        className={cn(
          "-translate-x-px flex h-7 min-w-0 items-center gap-2 overflow-hidden rounded-md px-2 text-[var(--sidebar-foreground)] outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-[var(--sidebar-foreground)] focus-visible:ring-2 active:bg-sidebar-accent active:text-[var(--sidebar-foreground)] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-[var(--sidebar-foreground)]",
          "data-[active=true]:bg-sidebar-accent data-[active=true]:text-[var(--sidebar-foreground)]",
          "hover:bg-[var(--sidebar-active)]",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          isSelected &&
            open &&
            "relative rounded-tl-[0px] rounded-bl-[0px] border-l-0 bg-[var(--sidebar-active)] font-[600] before:absolute before:top-0 before:bottom-0 before:left-0 before:w-[3px] before:rounded-tr-[4px] before:rounded-br-[4px] before:bg-[var(--sidebar-foreground)] before:content-['']",
          "group-data-[collapsible=icon]:hidden",
          className,
        )}
        {...props}
      />
    );
  },
);
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarHeaderLabel,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
