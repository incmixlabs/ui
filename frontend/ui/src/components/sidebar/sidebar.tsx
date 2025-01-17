import {
  ChevronDownIcon,
  PinLeftIcon,
  PinRightIcon,
} from "@radix-ui/react-icons"
import { Box, DropdownMenu, Flex, Text } from "@radix-ui/themes"
import { Link as RouterLink } from "@tanstack/react-router"
import React, {
  type MouseEventHandler,
  useRef,
  createContext,
  useContext,
} from "react"
import { ReactiveButton } from "../button/reactive-button"
import { useSidebarStore } from "./store"

export type SidebarState = "extended" | "minified" | "closed"

type SidebarContextType = {
  minified: boolean
  state: SidebarState
  currentlyExpanded: () => boolean
}

const SidebarContext = createContext<SidebarContextType | null>(null)

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error("Sidebar components must be used within a Sidebar")
  }
  return context
}

export type SidebarProps = {
  minified?: boolean
  state?: SidebarState
  children?: React.ReactNode
  className?: string
  name?: string
  onMinifyChange?: (minified: boolean) => void
}

const MINIFIED_WIDTH = "w-14"

export function Sidebar({
  minified = false,
  state = "extended",
  children,
  className = "",
  name,
  onMinifyChange,
}: SidebarProps) {
  const sidebarWidth = minified
    ? MINIFIED_WIDTH
    : state === "extended"
      ? "w-sidebar"
      : "w-0"

  const currentlyExpanded = () => state === "extended" && !minified

  const contextValue = {
    minified,
    state,
    currentlyExpanded,
  }

  return (
    <SidebarContext.Provider value={contextValue}>
      <Box
        asChild
        className={`h-full select-none overflow-hidden bg-gray-3 transition-[width] duration-300 ease-in-out ${sidebarWidth} ${className}`}
      >
        <aside className="border-gray-6 border-r bg-gray-3">
          <Box className="h-full w-sidebar bg-gray-3">
            {name && (
              <Flex
                align="center"
                justify="center"
                px="4"
                py="3"
                className={`border-gray-6 border-b transition-opacity duration-300 ${
                  minified ? "opacity-0" : "opacity-100"
                }`}
              >
                <Text size="3" weight="medium">
                  {name}
                </Text>
              </Flex>
            )}
            {children}
            {onMinifyChange && (
              <Box
                className={`fixed bottom-4 transition-all duration-300 ease-in-out ${
                  minified ? "translate-x-5" : "translate-x-[13.5rem]"
                }`}
              >
                {
                  <ReactiveButton
                    variant="ghost"
                    onClick={() => onMinifyChange(!minified)}
                    className="p-2"
                  >
                    {minified ? <PinRightIcon /> : <PinLeftIcon />}
                  </ReactiveButton>
                }
              </Box>
            )}
          </Box>
        </aside>
      </Box>
    </SidebarContext.Provider>
  )
}

type SidebarItemBaseProps = {
  icon: React.ReactNode
  label: string
  badge?: number
}

type SidebarItemWithChildrenProps = SidebarItemBaseProps & {
  children: React.ReactNode
  to?: never
  onClick?: never
}

type SidebarItemWithToProps = SidebarItemBaseProps & {
  to: string
  children?: never
  onClick?: never
}

type SidebarItemWithOnClickProps = SidebarItemBaseProps & {
  onClick: () => void
  to?: never
  children?: never
}

export type SidebarItemProps =
  | SidebarItemWithChildrenProps
  | SidebarItemWithToProps
  | SidebarItemWithOnClickProps

export function SidebarItem({
  icon,
  label,
  to,
  badge,
  children,
  onClick,
}: SidebarItemProps) {
  const { minified } = useSidebar()
  const { isItemExpanded, toggleItem } = useSidebarStore()
  const contentRef = useRef<HTMLDivElement>(null)

  const toggleExpand: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (children && !e.defaultPrevented) {
      e.preventDefault()
      if (!minified) {
        toggleItem(to || label)
      }
    }
  }

  const renderIcon = () => (
    <Box className="flex h-6 w-6 items-center justify-center">{icon}</Box>
  )

  const renderLabel = () => (
    <Text ml="3" className="flex-grow">
      {label}
    </Text>
  )

  const renderBadge = () =>
    badge && (
      <Box className="ml-auto rounded-full bg-blue-9 px-2 py-1 font-semibold text-white text-xs">
        {badge}
      </Box>
    )

  const renderExpandIcon = () =>
    children && (
      <ChevronDownIcon
        color="gray"
        className={`ml-2 h-4 w-4 transition-transform duration-200 ${
          isItemExpanded(to || label) ? "rotate-180" : ""
        }`}
      />
    )

  const renderChildren = () =>
    !minified &&
    children && (
      <Box
        ref={contentRef}
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isItemExpanded(to || label) ? "max-h-96" : "max-h-0"
        }`}
      >
        <Flex direction="column" gap="1" ml="6" mt="2" mb="2">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              const { label, to } = child.props
              return <SidebarSubItem key={to} label={label} to={to} />
            }
            return child
          })}
        </Flex>
      </Box>
    )

  const renderItem = () => (
    <Flex
      align="center"
      className={`h-10 cursor-pointer rounded transition-all duration-300 ease-in-out ${
        minified ? "w-10 px-2" : "mx-2 px-2"
      } hover:bg-gray-7`}
    >
      <Box className="flex items-center">{renderIcon()}</Box>
      <Box
        className={`flex flex-1 items-center overflow-hidden transition-[width,opacity] duration-300 ease-in-out ${
          minified ? "w-0 opacity-0" : "w-auto opacity-100"
        }`}
      >
        {renderLabel()}
        {renderBadge()}
        {renderExpandIcon()}
      </Box>
    </Flex>
  )

  const content = (
    <Box>
      {renderItem()}
      {renderChildren()}
    </Box>
  )

  return (
    <DropdownMenu.Root>
      {children ? (
        <DropdownMenu.Trigger
          disabled={!minified}
          onClick={minified ? undefined : toggleExpand}
        >
          {content}
        </DropdownMenu.Trigger>
      ) : to ? (
        <RouterLink to={to}>{content}</RouterLink>
      ) : (
        <Box onClick={onClick}>{content}</Box>
      )}
      <DropdownMenu.Content>
        <Flex align="center" justify={"center"} className="px-4 py-2">
          {renderIcon()}
          <Text mx="2">{label}</Text>
        </Flex>
        <DropdownMenu.Separator />
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const { label, to, onClick } = child.props
            return (
              <DropdownMenu.Item>
                {to ? (
                  <RouterLink to={to} className="w-full">
                    <Flex align="center" className="px-4 py-2">
                      <Text>{label}</Text>
                    </Flex>
                  </RouterLink>
                ) : (
                  <Box onClick={onClick} className="w-full">
                    <Flex align="center" className="px-4 py-2">
                      <Text>{label}</Text>
                    </Flex>
                  </Box>
                )}
              </DropdownMenu.Item>
            )
          }
          return child
        })}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

type SidebarSubItemBaseProps = {
  label: string
  onClick?: () => void
}

type SidebarSubItemWithToProps = SidebarSubItemBaseProps & {
  to: string
  onClick?: never
}

type SidebarSubItemWithOnClickProps = SidebarSubItemBaseProps & {
  to?: never
  onClick: () => void
}

export type SidebarSubItemProps =
  | SidebarSubItemWithToProps
  | SidebarSubItemWithOnClickProps

export function SidebarSubItem({ label, to, onClick }: SidebarSubItemProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (onClick) {
      onClick()
    }
  }

  const content = (
    <Flex align="center">
      <Text>{label}</Text>
    </Flex>
  )

  const className =
    "block rounded py-2 text-gray-12 transition-all duration-300 ease-in-out px-4 hover:bg-gray-7"

  return to ? (
    <RouterLink to={to} className={className}>
      {content}
    </RouterLink>
  ) : (
    <Box onClick={handleClick} className={className}>
      {content}
    </Box>
  )
}
