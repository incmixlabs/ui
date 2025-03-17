
import type { FileItem } from "../data"
import { FileActionsMenu } from "./file-actions-menu"

interface FileCardProps {
  file: FileItem
  onClick: () => void
  viewMode: "grid" | "list"
}

export function FileCard({ file, onClick, viewMode }: FileCardProps) {
  return (
    <div
      className={`
        group relative border rounded-lg overflow-hidden transition-all hover:shadow-md cursor-pointer
        ${viewMode === "grid" ? "flex flex-col items-center p-4" : "flex items-center p-3"}
      `}
      onClick={onClick}
    >
      <div
        className={`
          ${viewMode === "grid" ? "flex flex-col items-center" : "flex items-center gap-3"}
          ${viewMode === "grid" ? "w-full" : "flex-1"}
        `}
      >
        <div className={`${viewMode === "grid" ? "mb-3" : ""}`}>
          {file.type === "image" ? (
            <div className={`overflow-hidden rounded-md ${viewMode === "grid" ? "w-16 h-16" : "w-10 h-10"}`}>
              <img
                src={`/placeholder.svg?height=64&width=64&text=${file.name}`}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <file.icon
              className={`${file.type === "folder" ? "text-blue-500" : "text-gray-500"} ${viewMode === "grid" ? "h-16 w-16" : "h-10 w-10"}`}
            />
          )}
        </div>

        <div className={`${viewMode === "grid" ? "text-center" : "flex-1"}`}>
          <h3 className="font-medium truncate">{file.name}</h3>
          {viewMode === "list" && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>{file.modified}</span>
              <span>
                {file.size.value} {file.size.unit}
              </span>
            </div>
          )}
          {viewMode === "grid" && (
            <p className="text-sm text-muted-foreground mt-1">
              {file.size.value} {file.size.unit}
            </p>
          )}
        </div>
      </div>

      <div
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={(e) => e.stopPropagation()}
      >
        <FileActionsMenu fileId={file.id} />
      </div>
    </div>
  )
}

