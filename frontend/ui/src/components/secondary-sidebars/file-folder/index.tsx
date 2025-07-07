"use client";
import { Box, Flex, Progress, ScrollArea, Text, iconSize } from "@incmix/ui";
import { FolderClosed, type LucideIcon } from "lucide-react";
import { type JSX, useState } from "react";
import { secondaryFooterData, secondarySidebarData } from "./data";
import { FolderClose } from "./icons/folder-close";
import { FolderOpen } from "./icons/folder-open";
import { Tree } from "./tree-view";

interface footerTypes {
  icon?: LucideIcon;
  title: string;
  storageAvailable?: number;
}

const footerData: footerTypes[] = secondaryFooterData;

export function FileFolder(): JSX.Element {
  const [_selectedItem, setSelectedItem] = useState<string>("Admin Page");
  return (
    <>
      <Flex
        gap={"2"}
        align={"center"}
        className="shrink-0 border-b-[1px] border-b-gray-6 px-8 py-2 "
      >
        <FolderClosed className="stroke-gray-12" size={20} />
        <Text className="font-medium text-[16px] text-gray-12">
          File Manager
        </Text>
      </Flex>
      <ScrollArea className="flex-1">
        <Text className="inline-block px-8 pt-2 font-medium text-[16px] text-gray-9">
          FOLDERS
        </Text>
        <Tree
          data={secondarySidebarData}
          initialSelectedItemId="f12"
          onSelectChange={(item) => setSelectedItem(item?.name ?? "")}
          folderIcon={FolderClose}
          folderIconOpen={FolderOpen}
          itemIcon={FolderClose}
        />
      </ScrollArea>
      <Box className="mt-auto shrink-0 border-gray-6 border-t bg-gray-1">
        {footerData.map((item) => {
          if (item.storageAvailable) {
            return (
              <Box
                key={item.title}
                className=" cursor-pointer px-8 py-2 hover:bg-sidebar-secondary-active/10"
              >
                <Flex justify={"between"} align={"center"} className="gap-2 ">
                  <Text className=" font-medium text-[16px] text-gray-12">
                    {item.title}
                  </Text>
                  <Text className=" family-[Poppins] font-medium text-[16px] text-sidebar-secondary-muted ">
                    {item.storageAvailable}%
                  </Text>
                </Flex>
                <Progress
                  value={item.storageAvailable}
                  color="grass"
                  className="mt-4"
                />
              </Box>
            );
          }
          return (
            <Box
              key={item.title}
              className="flex cursor-pointer items-center gap-2 px-8 py-2 text-gray-12 hover:bg-sidebar-secondary-active/10"
            >
              {item.icon && (
                <item.icon
                  className={`${iconSize} shrink-0 text-sidebar-secondary-muted`}
                  aria-hidden="true"
                />
              )}
              <Text className=" font-medium text-[16px]">{item.title}</Text>
            </Box>
          );
        })}
      </Box>
    </>
  );
}
