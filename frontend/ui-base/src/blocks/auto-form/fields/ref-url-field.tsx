// components/auto-form/fields/ref-url-field.tsx
import { useState, useEffect } from "react"
import {
  Button,
  Input,
  FormControl,
  FormItem,
  Dialog,
} from "@/base"
import { Plus, ExternalLink, Pencil, Trash2, Figma } from "lucide-react"
import { cn } from "@/utils/cn"
import AutoFormLabel from "../common/label"
import type { AutoFormInputComponentProps } from "../types"

// Reference URL types
type RefUrlType = "task" | "figma" | "external"

// Reference URL structure - for local state management only
interface RefUrl {
  id: string
  url: string
  title: string
  type: RefUrlType
}

/**
 * Custom reference URL field component for AutoForm.
 * Stores data as a JSON string but presents a rich interface for adding/editing/removing URLs.
 */
export default function RefUrlField({
  label,
  isRequired,
  field,
  fieldConfigItem,
}: AutoFormInputComponentProps) {
  // Local state for URLs - parse from the JSON string or initialize as empty
  const [urls, setUrls] = useState<RefUrl[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")
  const [currentTitle, setCurrentTitle] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)

  // Parse URLs from JSON string when field.value changes (including initial load)
  useEffect(() => {
    try {
      // If field value exists and is not empty, parse it
      if (field.value && typeof field.value === "string") {
        const parsed = JSON.parse(field.value)
        if (Array.isArray(parsed)) {
          setUrls(parsed)
        }
      }
    } catch (error) {
      // If parsing fails, initialize with empty array
      console.error("Failed to parse URLs:", error)
      setUrls([])
    }
  }, [field.value])

  // Update the form field value (as JSON string) when URLs change
  const updateFieldValue = (newUrls: RefUrl[]) => {
    setUrls(newUrls)
    field.onChange(JSON.stringify(newUrls))
  }

  // Generate unique ID
  const generateId = () => `url-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

  // Detect URL type based on URL string
  const detectUrlType = (url: string): RefUrlType => {
    if (url.includes("figma.com")) {
      return "figma"
    } else if (
      url.includes("localhost") &&
      (url.includes("taskId=") || url.includes("/tasks"))
    ) {
      return "task"
    }
    return "external"
  }

  // Generate default title based on URL type and count
  const generateDefaultTitle = (url: string, type: RefUrlType): string => {
    const typeCount = urls.filter(u => u.type === type).length + 1

    switch (type) {
      case "figma":
        return `Figma Design ${typeCount}`
      case "task":
        return `Related Task ${typeCount}`
      case "external":
        // Try to extract domain name for external links
        try {
          const domain = new URL(url).hostname.replace("www.", "")
          return `${domain.charAt(0).toUpperCase() + domain.slice(1)} Link ${typeCount}`
        } catch {
          return `External Link ${typeCount}`
        }
    }
  }

  // Add new URL
  const handleAddUrl = () => {
    if (!currentUrl.trim()) return

    const type = detectUrlType(currentUrl)
    const title = currentTitle.trim() || generateDefaultTitle(currentUrl, type)

    if (editingId) {
      // Edit existing URL
      const updatedUrls = urls.map(url =>
        url.id === editingId
          ? { ...url, url: currentUrl, title, type }
          : url
      )
      updateFieldValue(updatedUrls)
    } else {
      // Add new URL
      const newUrl: RefUrl = {
        id: generateId(),
        url: currentUrl,
        title,
        type,
      }
      updateFieldValue([...urls, newUrl])
    }

    // Reset and close dialog
    setCurrentUrl("")
    setCurrentTitle("")
    setEditingId(null)
    setIsDialogOpen(false)
  }

  // Remove URL
  const handleRemoveUrl = (id: string) => {
    updateFieldValue(urls.filter(url => url.id !== id))
  }

  // Start editing URL
  const handleEditUrl = (url: RefUrl) => {
    setEditingId(url.id)
    setCurrentUrl(url.url)
    setCurrentTitle(url.title)
    setIsDialogOpen(true)
  }

  // Get icon for URL type
  const getUrlIcon = (type: RefUrlType) => {
    switch (type) {
      case "figma":
        return <Figma className="h-4 w-4" />
      case "task":
        return <ExternalLink className="h-4 w-4" />
      case "external":
        return <ExternalLink className="h-4 w-4" />
    }
  }

  return (
    <FormItem className="flex w-full flex-col space-y-4">
      {/* Label */}
      <AutoFormLabel label={label} isRequired={isRequired} />

      {/* Add URL button */}
      <Button
        type="button"
        onClick={() => {
          setIsDialogOpen(true)
          setEditingId(null)
          setCurrentUrl("")
          setCurrentTitle("")
        }}
        variant="outline"
        className="w-full py-6 border-dashed justify-center"
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Reference URL
      </Button>

      {/* URLs list */}
      {urls.length > 0 && (
        <div className="space-y-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {urls.length} URL{urls.length !== 1 ? 's' : ''} added
          </div>

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 pt-1">
            {urls.map((url) => (
              <div
                key={url.id}
                className={cn(
                  "flex items-center justify-between gap-3 p-3 rounded-lg border",
                  "bg-white dark:bg-gray-800/90",
                  "dark:border-gray-700"
                )}
              >
                <div className="flex items-center gap-3 flex-grow min-w-0">
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                    {getUrlIcon(url.type)}
                  </span>
                  <div className="flex-grow min-w-0">
                    <p className="font-medium text-gray-900 dark:text-gray-200 truncate">
                      {url.title}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {url.url}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Button
                    type="button"
                    variant="ghost"
                    size="1"
                    className="h-8 w-8 p-0"
                    onClick={() => handleEditUrl(url)}
                  >
                    <span className="sr-only">Edit</span>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="1"
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    onClick={() => handleRemoveUrl(url.id)}
                  >
                    <span className="sr-only">Remove</span>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit URL Dialog */}
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Content className="max-w-md">
          <Dialog.Header>
            <Dialog.Title>
              {editingId ? "Edit Reference URL" : "Add Reference URL"}
            </Dialog.Title>
          </Dialog.Header>

          <div className="space-y-4 py-4">
            <FormItem>
              <AutoFormLabel label="URL" isRequired={true} />
              <FormControl>
                <Input
                  value={currentUrl}
                  onChange={(e) => setCurrentUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full"
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <div className="flex flex-col space-y-1">
                <AutoFormLabel label="Title" isRequired={false} />
                <p className="text-sm text-muted-foreground">
                  Optional. If not provided, a title will be generated based on the URL.
                </p>
              </div>
              <FormControl>
                <Input
                  value={currentTitle}
                  onChange={(e) => setCurrentTitle(e.target.value)}
                  placeholder="Enter title (optional)"
                  className="w-full"
                />
              </FormControl>
            </FormItem>
          </div>

          <Dialog.Footer>
            <div className="flex flex-row justify-end space-x-2">
              <Dialog.Close>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingId(null)
                    setCurrentUrl("")
                    setCurrentTitle("")
                  }}
                >
                  Cancel
                </Button>
              </Dialog.Close>
              <Button
                type="button"
                onClick={handleAddUrl}
                disabled={!currentUrl.trim()}
              >
                {editingId ? "Save Changes" : "Add URL"}
              </Button>
            </div>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>

      {/* Hidden field to keep the original value */}
      <input
        type="hidden"
        {...field}
        id={field.name}
        value={field.value || JSON.stringify([])}
      />
    </FormItem>
  )
}
