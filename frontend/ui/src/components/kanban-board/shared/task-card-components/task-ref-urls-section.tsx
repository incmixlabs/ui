import { useState } from "react"
import { PlusIcon, Trash2Icon, ExternalLinkIcon, CheckCircleIcon } from "lucide-react"
import { Button, Input, Label } from "@incmix/ui"
import { nanoid } from "nanoid"

// Helper to detect URL types
const detectUrlType = (url: string): "figma" | "task" | "external" => {
  if (url.includes("figma.com")) return "figma"
  // Task URLs would typically include taskId or task in path
  if (url.includes("/task/") || url.includes("taskId=")) return "task"
  return "external"
}

// Helper to extract and format URL info
const formatUrl = (url: string, type: string, title?: string) => {
  // For Figma URLs, extract the file name if no title is provided
  if (type === "figma" && !title) {
    try {
      const urlObject = new URL(url)
      // Extract file name from Figma URL path segments
      const pathSegments = urlObject.pathname.split('/')
      const fileSegment = pathSegments.find(segment => segment.includes('file'))
      if (fileSegment) {
        return `Figma: ${fileSegment.replace('file/', '')}`
      }
      return "Figma Link"
    } catch (e) {
      return "Figma Link"
    }
  }
  
  // For task URLs, extract the task ID
  if (type === "task" && !title) {
    try {
      const urlObject = new URL(url)
      const taskId = urlObject.searchParams.get("taskId") || 
                     urlObject.pathname.split('/').find(segment => segment.startsWith("tsk"))
      if (taskId) {
        return `Task: ${taskId}`
      }
      return "Task Link"
    } catch (e) {
      return "Task Link"
    }
  }
  
  // Return the title or a shortened URL for external links
  if (title) return title
  
  try {
    const urlObject = new URL(url)
    return `${urlObject.hostname}${urlObject.pathname.slice(0, 15)}${urlObject.pathname.length > 15 ? '...' : ''}`
  } catch (e) {
    // If URL parsing fails, return a portion of the original URL
    return url.length > 30 ? `${url.slice(0, 30)}...` : url
  }
}

interface TaskRefUrl {
  id: string
  url: string
  title?: string
  type: "figma" | "task" | "external"
  taskId?: string
}

interface TaskRefUrlsSectionProps {
  refUrls: TaskRefUrl[]
  onUpdate: (refUrls: TaskRefUrl[]) => void
  readonly?: boolean
}

export function TaskRefUrlsSection({ 
  refUrls = [], 
  onUpdate,
  readonly = false 
}: TaskRefUrlsSectionProps) {
  const [newUrl, setNewUrl] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newType, setNewType] = useState<"figma" | "task" | "external">("external")
  const [isAdding, setIsAdding] = useState(false)
  
  // Handle adding a new reference URL
  const handleAddRefUrl = () => {
    if (!newUrl) return

    // Auto-detect URL type if not explicitly set
    const urlType = newType === "external" ? detectUrlType(newUrl) : newType
    
    // Create new URL entry with explicitly set type and optional title
    const newRefUrl: TaskRefUrl = {
      id: nanoid(),
      url: newUrl,
      title: newTitle || undefined,
      type: urlType
    }
    
    // Update the refUrls array
    onUpdate([...refUrls, newRefUrl])
    
    // Reset form fields
    setNewUrl("")
    setNewTitle("")
    setNewType("external")
    setIsAdding(false)
  }
  
  // Handle removing a reference URL
  const handleRemoveRefUrl = (id: string) => {
    onUpdate(refUrls.filter(refUrl => refUrl.id !== id))
  }
  
  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Reference URLs</h3>
        {!readonly && (
          <Button 
            variant="ghost" 
            onClick={() => setIsAdding(!isAdding)}
            className="h-8 px-2"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="sr-only">Add Reference URL</span>
          </Button>
        )}
      </div>
      
      {/* Display existing reference URLs */}
      {refUrls.length > 0 ? (
        <div className="space-y-2">
          {refUrls.map((refUrl) => (
            <div 
              key={refUrl.id} 
              className="flex items-center justify-between rounded-md border px-3 py-2"
            >
              <a 
                href={refUrl.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 text-sm hover:underline truncate"
              >
                <div className="flex items-center gap-1.5">
                  {refUrl.type === "figma" && (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 24c2.21 0 4-1.79 4-4v-4H8c-2.21 0-4 1.79-4 4s1.79 4 4 4Z" />
                      <path d="M8 16h4v-4H8v4Z" />
                      <path d="M8 8h4V4H8c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4Z" />
                      <path d="M16 8c2.21 0 4-1.79 4-4s-1.79-4-4-4h-4v8h4Z" />
                      <path d="M16 16c2.21 0 4-1.79 4-4s-1.79-4-4-4h-4v8h4Z" />
                    </svg>
                  )}
                  {refUrl.type === "task" && (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {refUrl.type === "external" && (
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                  <span>{formatUrl(refUrl.url, refUrl.type, refUrl.title)}</span>
                </div>
              </a>
              {!readonly && (
                <Button
                  variant="ghost"
                  onClick={() => handleRemoveRefUrl(refUrl.id)}
                  className="ml-2 h-8 w-8 p-0"
                >
                  <Trash2Icon className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No reference URLs added yet.</p>
      )}
      
      {/* Add new reference URL form */}
      {isAdding && !readonly && (
        <div className="space-y-4 rounded-md border p-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="new-ref-url">URL</Label>
            <Input
              id="new-ref-url"
              value={newUrl}
              onChange={(e) => {
                setNewUrl(e.target.value)
                // Auto-detect URL type as user types
                if (e.target.value) {
                  setNewType(detectUrlType(e.target.value))
                }
              }}
              placeholder="Enter URL"
              className="h-9"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-ref-title">Title (Optional)</Label>
            <Input
              id="new-ref-title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Enter a title for this URL"
              className="h-9"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-ref-type">Type</Label>
            <select
              id="new-ref-type"
              value={newType}
              onChange={(e) => setNewType(e.target.value as "figma" | "task" | "external")}
              className="w-full h-9 px-3 rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              <option value="external">External Link</option>
              <option value="figma">Figma Link</option>
              <option value="task">Task Link</option>
            </select>
          </div>
          
          <div className="flex justify-end gap-2 mt-3">
            <Button 
              variant="outline" 
              onClick={() => setIsAdding(false)}
              className="h-9"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddRefUrl}
              disabled={!newUrl}
              className="h-9"
            >
              Add URL
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
