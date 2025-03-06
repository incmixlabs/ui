"use client"
import { Progress } from "@radix-ui/themes"
import { FolderClosed, type LucideIcon } from "lucide-react"
import { type JSX, useState } from "react"
import { secondaryFooterData, secondarySidebarData } from "./data"
import { FolderClose } from "./icons/folder-close"
import { FolderOpen } from "./icons/folder-open"
import { Tree } from "./tree-view"

interface footerTypes {
  icon?: LucideIcon
  title: string
  storageAvailable?: number
}

const footerData: footerTypes[] = secondaryFooterData

export function FileFolder(): JSX.Element {
  const [_selectedItem, setSelectedItem] = useState<string>("Admin Page")
  return (
    <>
      <div className="flex gap-2 border-b-[1px] border-b-gray-6 bg-gray-1 px-8 py-2 text-gray-12 ">
        <FolderClosed />
        <span className=" font-medium text-[16px]">File Manager</span>
      </div>

      <div className="flex gap-2 px-8 py-1 pb-0">
        <span className="text-[16px] text-gray-12 uppercase">Folders</span>
      </div>
      <div className="flex ">
        <Tree
          data={secondarySidebarData}
          className="w-full flex-shrink-0"
          initialSelectedItemId="f12"
          onSelectChange={(item) => setSelectedItem(item?.name ?? "")}
          folderIcon={FolderClose}
          folderIconOpen={FolderOpen}
          itemIcon={FolderClose}
        />
      </div>

      <div className="mt-auto bg-gray-1">
        {footerData.map((item) => {
          if (item.storageAvailable) {
            return (
              <div
                key={item.title}
                className=" cursor-pointer px-8 py-2 hover:bg-gray-6"
              >
                <div className="flex items-center justify-between gap-2 ">
                  <span className=" font-medium text-[16px] text-gray-12">
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
              className="flex cursor-pointer items-center gap-2 px-8 py-2 text-gray-12 hover:bg-gray-6"
            >
              {item.icon && (
                <item.icon
                  className="h-4 w-4 shrink-0 text-[hsl(var(--sidebar-secondary-muted))]"
                  aria-hidden="true"
                />
              )}
              <span className=" font-medium text-[16px]">{item.title}</span>
            </div>
          )
        })}
      </div>
    </>
  )
}
