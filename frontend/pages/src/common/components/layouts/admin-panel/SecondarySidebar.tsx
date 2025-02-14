"use client"

import { Progress } from "@radix-ui/themes"
import {
  Book,
  FileText,
  Folder,
  FolderClosed,
  Layout,
  type LucideIcon,
  Trash2,
  Workflow,
} from "lucide-react"
import * as React from "react"
import { Tree } from "./tree-view"

const data = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages 1",
    children: [
      {
        id: "d1",
        name: "Alice",
        children: [
          { id: "d11", name: "Alice2" },
          { id: "d12", name: "Bob2" },
          { id: "d13", name: "Charlie2" },
        ],
      },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
  {
    id: "5",
    name: "Direct Messages 2",
    children: [
      {
        id: "e1",
        name: "Alice",
        children: [
          { id: "e11", name: "Alice2" },
          { id: "e12", name: "Bob2" },
          { id: "e13", name: "Charlie2" },
        ],
      },
      { id: "e2", name: "Bob" },
      { id: "e3", name: "Charlie" },
    ],
  },
  {
    id: "6",
    name: "Direct Messages 3",
    children: [
      {
        id: "f1",
        name: "Alice",
        children: [
          { id: "f11", name: "Alice2" },
          { id: "f12", name: "Bob2" },
          { id: "f13", name: "Charlie2" },
        ],
      },
      { id: "f2", name: "Bob" },
      { id: "f3", name: "Charlie" },
    ],
  },
]

interface footerTypes {
  icon?: LucideIcon
  title: string
  storageAvailable?: number
}

const footerData: footerTypes[] = [
  {
    icon: Trash2,
    title: "Trash",
  },
  {
    storageAvailable: 80,
    title: "Storage",
  },
  {
    icon: FileText,
    title: "Notes",
  },
  {
    icon: Book,
    title: "Contacts",
  },
]

export default function SecondarySidebar() {
  const [_content, setContent] = React.useState("Admin Page")
  return (
    <div className="flex max-h-screen min-w-[270px] flex-col border border-y-0 border-r-[hsl(var(--sidebar-border))] ">
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
          data={data}
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
  )
}
