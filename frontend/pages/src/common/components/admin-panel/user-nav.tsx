"use client";

import  { type ReactNode } from "react"
import Link from "next/link";
import { LayoutGrid, LogOut, User } from "lucide-react";
import { Avatar } from "@incmix/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@incmix/ui/tooltip";
import {
  DropdownMenu
} from "@incmix/ui/dropdown-menu";
const menuItems = [{
  label: "Profile",
  href: "/profile",
  // @ts-ignore
  icon: User as ReactNode,
  separator: true
}, {
  label: "Logout",
  href: "/logout",
  icon: LogOut
}]
export function UserNav() {
  const trigger =  <Avatar fullName="John Doe" />

  return (
    <DropdownMenu trigger={trigger} items={menuItems}>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
          </TooltipTrigger>
          <TooltipContent side="bottom">Profile</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </DropdownMenu>
  );
}
