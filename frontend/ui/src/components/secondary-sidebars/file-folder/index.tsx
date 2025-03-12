"use client"
import { Box, Flex, Progress, Text } from "@radix-ui/themes"
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
      <Flex
        gap={"2"}
        align={"center"}
        className="border-b-[1px] border-b-gray-6 bg-gray-1 px-8 py-2 text-gray-12 "
      >
        <FolderClosed className="fill-gray-12" size={20} />
        <Text className=" font-medium text-[16px]">File Manager</Text>
      </Flex>
      {/* 
      <div className="flex gap-2 px-8 py-1 pb-0">
        <span className="text-[16px] text-gray-12 uppercase">Folders</span>
      </div> */}
      <Tree
        data={secondarySidebarData}
        className="w-full flex-shrink-0"
        initialSelectedItemId="f12"
        onSelectChange={(item) => setSelectedItem(item?.name ?? "")}
        folderIcon={FolderClose}
        folderIconOpen={FolderOpen}
        itemIcon={FolderClose}
      />

      <Box className="mt-auto bg-gray-1">
        {footerData.map((item) => {
          if (item.storageAvailable) {
            return (
              <Box
                key={item.title}
                className=" cursor-pointer px-8 py-2 hover:bg-gray-6"
              >
                <Flex justify={"between"} align={"center"} className="gap-2 ">
                  <Text className=" font-medium text-[16px] text-gray-12">
                    {item.title}
                  </Text>
                  <Text className=" family-[Poppins] font-medium text-[16px] text-[hsl(var(--sidebar-secondary-muted))] ">
                    {item.storageAvailable}%
                  </Text>
                </Flex>
                <Progress
                  value={item.storageAvailable}
                  color="grass"
                  className="mt-4"
                />
              </Box>
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
      </Box>
    </>
  )
}
