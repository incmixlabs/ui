"use client"

import { cn } from "@incmix/ui"
import { Progress } from "@radix-ui/themes"
import { Folder, FolderClosed, type LucideIcon, Workflow } from "lucide-react"
import * as React from "react"
import { secondaryFooterData, secondarySidebarData } from "./data"
import { useSidebar } from "./sidebar"
import { Tree } from "./tree-view"

interface footerTypes {
  icon?: LucideIcon
  title: string
  storageAvailable?: number
}

const footerData: footerTypes[] = secondaryFooterData

export default function SecondarySidebar() {
  const { isMobile, open, secondaryOpen } = useSidebar()
  const [_content, setContent] = React.useState("Admin Page")
  return (
    <div
      className={cn(
        "relative h-screen transition-all duration-200 ease-linear",
        secondaryOpen || (isMobile && open) ? "min-w-[270px]" : "w-0"
      )}
    >
      <div
        className={cn(
          " fixed top-0 z-10 flex h-screen min-w-[270px] flex-col border border-y-0 border-r-[hsl(var(--sidebar-border))] border-l-0 bg-[hsl(var(--sidebar-trigger-background))] transition-[left,opacity] duration-300 ease-in-out",
          open
            ? "left-[calc(var(--sidebar-width))] z-30"
            : "left-[calc(var(--sidebar-width-icon))]",
          secondaryOpen || (isMobile && open) ? "min-w-[270px]" : "hidden w-0"
        )}
      >
        <div className="">
          <div className="flex gap-2 border-b-[1px] border-b-[hsl(var(--sidebar-border))] px-8 py-[20px] text-[hsl(var(--sidebar-background))] ">
            <FolderClosed />
            <span className=" font-medium text-[16px]">File Manager</span>
          </div>
          <div className="flex gap-2 px-8 py-[1rem] pb-0">
            <span className="text-[16px] text-[hsl(var(--sidebar-secondary-muted))] uppercase">
              Folders
            </span>
          </div>
        </div>
        <div className="flex-1 overflow-scroll">
          <Tree
            data={secondarySidebarData}
            className="w-full flex-shrink-0"
            initialSelectedItemId="f12"
            onSelectChange={(item) => setContent(item?.name ?? "")}
            folderIcon={Folder}
            itemIcon={Workflow}
          />
        </div>
        <div className="">
          {footerData.map((item) => {
            if (item.storageAvailable) {
              return (
                <div
                  key={item.title}
                  className=" cursor-pointer px-8 py-[20px] hover:bg-[hsl(var(--sidebar-background)/0.1)]"
                >
                  <div className="flex items-center justify-between gap-2 ">
                    <span className=" font-medium text-[16px] text-[hsl(var(--sidebar-secondary-text))]">
                      {item.title}
                    </span>
                    <span className=" family-[Poppins] font-medium text-[16px] text-[hsl(var(--sidebar-secondary-muted))] ">
                      {item.storageAvailable}%
                    </span>
                  </div>
                  <Progress
                    value={item.storageAvailable}
                    color="grass"
                    className="mt-4"
                  />
                </div>
              )
            }
            return (
              <div
                key={item.title}
                className="flex cursor-pointer items-center gap-2 px-8 py-[20px] text-[hsl(var(--sidebar-secondary-text))] hover:bg-[hsl(var(--sidebar-background)/0.1)] "
              >
                {item.icon && (
                  <item.icon
                    className="h-5 w-5 shrink-0 text-[hsl(var(--sidebar-secondary-muted))]"
                    aria-hidden="true"
                  />
                )}
                <span className=" font-medium text-[16px]">{item.title}</span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
