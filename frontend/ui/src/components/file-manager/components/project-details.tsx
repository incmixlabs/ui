import { Label } from "@components/label"
import { Flex, Tabs } from "@radix-ui/themes"
import { Button, IconButton, Switch } from "@radix-ui/themes"
import { X } from "lucide-react"
import { projectFolders } from "../data"
import { ProjectActionsMenu } from "./project-actions-menu"
import { useState } from "react"

interface ProjectDetailsProps {
  projectId: string
  onClose: () => void
}

export function ProjectDetails({ projectId, onClose }: ProjectDetailsProps) {
  const [settings, setSettings] = useState({
    fileSharing: true,
    backup: false,
    sync: false
  })
  const fileData = projectFolders.find((file) => file.id === projectId)
  if (!fileData) {
    return (
      <Flex className="h-full items-center justify-center" direction="column">
        <p className="text-muted-foreground">Project not found</p>
        <Button onClick={onClose} className="mt-4">
          Close
        </Button>
      </Flex>
    )
  }

  return (
    <Flex className="h-full" direction="column">
      <Flex
        className="border-gray-4 border-b p-4"
        align={"center"}
        justify={"between"}
      >
        <Flex align={"center"} gap={"2"}>
          <h2 className="truncate font-semibold text-lg">{fileData?.name}</h2>
        </Flex>
        <Flex align={"center"} gap={"2"}>
          <ProjectActionsMenu
            projectId={fileData?.id}
            className="h-6 w-6 cursor-pointer"
          />
          <IconButton
            variant="ghost"
            className="h-6 w-6 cursor-pointer"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </IconButton>
        </Flex>
      </Flex>
      {/* File Preview Section */}
      <Flex
        direction="column"
        align={"center"}
        justify={"center"}
        className=" rounded-lg p-4 "
      >
        {fileData?.type === "folder" ? (
          <div className="flex flex-col items-center justify-center py-4">
            {fileData?.openIcon && (
              <fileData.openIcon className="mb-2 h-16 w-16 text-blue-500" />
            )}
            <p className="text-muted-foreground text-xs">
              Folder with multiple items
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-4">
            <p className="text-muted-foreground text-xs">
              Preview not available
            </p>
          </div>
        )}
      </Flex>
      <Tabs.Root defaultValue="preview" className="flex-1">
        <Tabs.List className="mt-4 flex w-full justify-between ">
          <Tabs.Trigger
            value="preview"
            className="w-full flex-1 cursor-pointer"
          >
            Preview
          </Tabs.Trigger>
          <Tabs.Trigger
            value="comments"
            className="w-full flex-1 cursor-pointer"
          >
            Comments
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="preview" className="flex-1 px-8 py-4 ">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="font-medium text-sm">INFO</h3>
              <>
                <div className="flex justify-between gap-2 text-sm">
                  <div className="text-muted-foreground">Type</div>
                  <div className="font-medium capitalize">
                    {fileData?.type === "folder" ? "Folder" : fileData?.type}
                  </div>
                </div>
                <div className="flex justify-between gap-2 text-sm">
                  <div className="text-muted-foreground">Size</div>
                  <div className="font-medium">
                    {fileData?.size
                      ? `${fileData.size.value} ${fileData.size.unit}`
                      : "N/A"}
                  </div>
                </div>
                <div className="flex justify-between gap-2 text-sm">
                  <div className="text-muted-foreground">Owner</div>
                  <div className="font-medium">{fileData?.owner}</div>
                </div>
                <div className="flex justify-between gap-2 text-sm">
                  <div className="text-muted-foreground">Location</div>
                  <div className="font-medium">{fileData?.location}</div>
                </div>
                <div className="flex justify-between gap-2 text-sm">
                  <div className="text-muted-foreground">Modified</div>
                  <div className="font-medium">{fileData?.modified}</div>
                </div>
                <div className="flex justify-between gap-2 text-sm">
                  <div className="text-muted-foreground">Created</div>
                  <div className="font-medium">{fileData?.created}</div>
                </div>
              </>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium text-sm">SETTINGS</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="file-sharing" className="text-sm">
                    File Sharing
                  </Label>
                  <Switch id="file-sharing" 
                  checked={settings.fileSharing}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, fileSharing: checked }))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="backup" className="text-sm">
                    Backup
                  </Label>
                  <Switch id="backup"  checked={settings.backup}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, backup: checked }))}/>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sync" className="text-sm">
                    Sync
                  </Label>
                  <Switch id="sync"  checked={settings.sync}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, sync: checked }))}/>
                </div>
              </div>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="comments" className="flex-1 pt-4">
          <div className="flex h-40 flex-col items-center justify-center text-muted-foreground">
            <p className="text-sm">No comments yet</p>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  )
}
