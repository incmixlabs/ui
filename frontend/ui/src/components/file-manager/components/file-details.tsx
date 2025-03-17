
import type { FileItem } from "../data"
import { X } from "lucide-react"
import { Tabs } from "@radix-ui/themes"
import { FileActionsMenu } from "../components/file-actions-menu"
import { Download, Play } from "lucide-react"
import { AudioWaveform } from "../components/audio-waveform"
import { Label } from "@components/label"
import { Button, IconButton, Switch } from "@radix-ui/themes"

interface FileDetailsProps {
  file: FileItem
  onClose: () => void
}

export function FileDetails({ file, onClose }: FileDetailsProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-2">
          <file.icon className={`${file.type === "folder" ? "text-blue-500" : "text-gray-500"} h-8 w-8`} />
          <h2 className="text-lg font-semibold truncate">{file.name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <FileActionsMenu fileId={file.id} />
          <IconButton variant="ghost"  onClick={onClose}>
            <X className="h-4 w-4" />
          </IconButton>
        </div>
      </div>

      <Tabs.Root defaultValue="preview" className="flex-1">
        <Tabs.List className="grid w-full grid-cols-2 mt-4">
          <Tabs.Trigger value="preview">Preview</Tabs.Trigger>
          <Tabs.Trigger value="comments">Comments</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="preview" className="flex-1 pt-4">
          <div className="space-y-6">
            {/* File Preview Section */}
            <div className="flex flex-col items-center justify-center border rounded-lg p-4 bg-muted/30">
              {file.type === "folder" ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <file.icon className="text-blue-500 h-16 w-16 mb-2" />
                  <p className="text-xs text-muted-foreground">Folder with multiple items</p>
                </div>
              ) : file.type === "image" ? (
                <div className="w-full">
                  <img
                    src={`/placeholder.svg?height=150&width=240&text=${file.name}`}
                    alt={file.name}
                    className="w-full h-auto rounded-md object-cover"
                  />
                </div>
              ) : file.type === "document" ? (
                <div className="flex flex-col items-center justify-center py-4">
                  <file.icon className="text-blue-500 h-16 w-16 mb-2" />
                  <p className="text-xs text-muted-foreground">Document preview</p>
                  <Button variant="outline" className="mt-2">
                    <Download className="mr-2 h-3 w-3" />
                    Download
                  </Button>
                </div>
              ) : file.type === "video" ? (
                <div className="w-full aspect-video bg-black rounded-md flex items-center justify-center">
                  <Play className="h-8 w-8 text-white opacity-70" />
                </div>
              ) : file.type === "audio" ? (
                <div className="w-full p-2 flex flex-col items-center">
                  <AudioWaveform className="h-16 w-16 text-blue-500 mb-2" />
                  <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                    <div className="bg-primary h-1.5 rounded-full w-1/3"></div>
                  </div>
                  <div className="flex items-center justify-between w-full mt-1">
                    <span className="text-xs text-muted-foreground">0:00</span>
                    <span className="text-xs text-muted-foreground">3:45</span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <file.icon className="text-gray-500 h-16 w-16 mb-2" />
                  <p className="text-xs text-muted-foreground">Preview not available</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">INFO</h3>
              <div className="grid grid-cols-2 gap-y-2 text-sm">
                <div className="text-muted-foreground">Type</div>
                <div className="font-medium capitalize">{file.type === "folder" ? "Folder" : file.type}</div>

                <div className="text-muted-foreground">Size</div>
                <div className="font-medium">
                  {file.size.value} {file.size.unit}
                </div>

                <div className="text-muted-foreground">Owner</div>
                <div className="font-medium">{file.owner}</div>

                <div className="text-muted-foreground">Location</div>
                <div className="font-medium">{file.location}</div>

                <div className="text-muted-foreground">Modified</div>
                <div className="font-medium">{file.modified}</div>

                <div className="text-muted-foreground">Created</div>
                <div className="font-medium">{file.created}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-sm font-medium">SETTINGS</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="file-sharing" className="text-sm">
                    File Sharing
                  </Label>
                  <Switch id="file-sharing" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="backup" className="text-sm">
                    Backup
                  </Label>
                  <Switch id="backup" />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="sync" className="text-sm">
                    Sync
                  </Label>
                  <Switch id="sync" />
                </div>
              </div>
            </div>
          </div>
        </Tabs.Content>

        <Tabs.Content value="comments" className="flex-1 pt-4">
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <p className="text-sm">No comments yet</p>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

