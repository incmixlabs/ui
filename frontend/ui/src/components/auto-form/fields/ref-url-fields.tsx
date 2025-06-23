// components/auto-form/fields/ref-url-fields.tsx
import { useState, useCallback } from "react"
import { Button, Input, FormControl, FormItem, FormMessage, Dialog } from "@base"
import { Plus, Trash2, Edit2, Link, X } from "lucide-react"
import { cn } from "@utils/cn"
import { nanoid } from "nanoid"
import { detectUrlType, generateDefaultTitle } from "@utils/url-helpers"
import AutoFormLabel from "../common/label"
import type { AutoFormInputComponentProps } from "../types"

interface RefUrl {
  id: string
  url: string
  title?: string
  type: "figma" | "task" | "external"
}

// Using shared utility functions for URL type detection and default title generation from url-helpers.ts

/**
 * Custom reference URL field component for AutoForm
 * Provides a modal interface for adding URLs and a list view for display
 */
export default function RefUrlField({
  label,
  isRequired,
  field,
  fieldConfigItem,
}: AutoFormInputComponentProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")
  const [currentTitle, setCurrentTitle] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Get current URLs from field value or initialize empty array
  const refUrls: RefUrl[] = field.value || []
  
  // Handle adding a new URL
  const handleAddUrl = useCallback(() => {
    if (!currentUrl.trim()) return
    
    // Auto-detect URL type
    const urlType = detectUrlType(currentUrl)
    
    const newRefUrl: RefUrl = {
      id: nanoid(),
      url: currentUrl.trim(),
      title: currentTitle.trim() ? currentTitle.trim() : generateDefaultTitle(currentUrl, urlType, refUrls),
      type: urlType
    }
    
    field.onChange([...refUrls, newRefUrl])
    
    // Reset fields and close dialog
    setCurrentUrl("")
    setCurrentTitle("")
    setIsDialogOpen(false)
  }, [currentUrl, currentTitle, refUrls, field])
  
  // Handle updating an existing URL
  const handleUpdateUrl = useCallback(() => {
    if (!currentUrl.trim() || !editingId) return
    
    // Auto-detect URL type
    const urlType = detectUrlType(currentUrl)
    
    field.onChange(
      refUrls.map(refUrl => 
        refUrl.id === editingId
          ? {
              ...refUrl,
              url: currentUrl.trim(),
              title: currentTitle.trim() ? currentTitle.trim() : generateDefaultTitle(currentUrl, urlType, refUrls),
              type: urlType
            }
          : refUrl
      )
    )
    
    // Reset fields and close dialog
    setCurrentUrl("")
    setCurrentTitle("")
    setEditingId(null)
    setIsDialogOpen(false)
  }, [currentUrl, currentTitle, editingId, refUrls, field])
  
  // Handle removing a URL
  const handleRemoveUrl = (id: string) => {
    field.onChange(refUrls.filter(refUrl => refUrl.id !== id))
  }
  
  // Start editing a URL
  const handleStartEdit = (refUrl: RefUrl) => {
    setCurrentUrl(refUrl.url)
    setCurrentTitle(refUrl.title || "")
    setEditingId(refUrl.id)
    setIsDialogOpen(true)
  }
  
  // Cancel the current action
  const handleCancel = () => {
    setCurrentUrl("")
    setCurrentTitle("")
    setEditingId(null)
    setIsDialogOpen(false)
  }
  
  // Get URL icon based on type
  const getUrlIcon = (type: string) => {
    if (type === "figma") {
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 24c2.21 0 4-1.79 4-4v-4H8c-2.21 0-4 1.79-4 4s1.79 4 4 4Z" />
          <path d="M8 16h4v-4H8v4Z" />
          <path d="M8 8h4V4H8c-2.21 0-4 1.79-4 4 0 2.21 1.79 4 4 4Z" />
          <path d="M16 8c2.21 0 4-1.79 4-4s-1.79-4-4-4h-4v8h4Z" />
          <path d="M16 16c2.21 0 4-1.79 4-4s-1.79-4-4-4h-4v8h4Z" />
        </svg>
      )
    } else if (type === "task") {
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    } else {
      return (
        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      )
    }
  }

  return (
    <FormItem className="flex w-full flex-col space-y-4">
      {/* Label */}
      <div className="flex items-center justify-between">
        <AutoFormLabel label={label} isRequired={isRequired} />
        <Button 
          type="button"
          onClick={() => setIsDialogOpen(true)}
          size="1"
          className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus size={14} />
          <span className="ml-1">Add URL</span>
        </Button>
      </div>
      
      {/* URL List */}
      {refUrls.length > 0 ? (
        <div className="space-y-3">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {refUrls.length} reference URL{refUrls.length !== 1 ? 's' : ''} added
          </div>
          
          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1 pt-1">
            {refUrls.map((refUrl) => (
              <div
                key={refUrl.id}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border",
                  "bg-white dark:bg-gray-800/90",
                  "border-gray-200 dark:border-gray-700",
                  "shadow-sm hover:shadow-md transition-colors duration-150"
                )}
              >
                {/* URL icon by type */}
                <div className="flex-shrink-0">
                  {getUrlIcon(refUrl.type)}
                </div>
                
                {/* URL information */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{refUrl.title}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{refUrl.url}</div>
                </div>
                
                {/* Action buttons */}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={() => handleStartEdit(refUrl)}
                    size="1"
                    variant="ghost"
                    className="p-1 h-auto"
                  >
                    <Edit2 size={14} />
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleRemoveUrl(refUrl.id)}
                    size="1"
                    variant="ghost"
                    className="p-1 h-auto text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-500 dark:text-gray-400">
          No reference URLs added yet. Click "Add URL" to add one.
        </div>
      )}
      
      {/* Add/Edit URL Dialog */}
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Content className="sm:max-w-lg">
          <Dialog.Header>
            <Dialog.Title>
              {editingId ? "Edit Reference URL" : "Add Reference URL"}
            </Dialog.Title>
            <Dialog.Description>
              {editingId 
                ? "Update the URL and optional title for this reference"
                : "Add a URL and optional title to reference external content"
              }
            </Dialog.Description>
          </Dialog.Header>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <FormControl>
                <div>
                  <label className="text-sm font-medium" htmlFor="url-input">
                    URL <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="url-input"
                    value={currentUrl}
                    onChange={(e) => setCurrentUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="mt-1.5"
                    autoFocus
                  />
                </div>
              </FormControl>
            </div>
            
            <div className="space-y-2">
              <FormControl>
                <div>
                  <label className="text-sm font-medium" htmlFor="title-input">
                    Title <span className="text-gray-500">(optional)</span>
                  </label>
                  <Input
                    id="title-input"
                    value={currentTitle}
                    onChange={(e) => setCurrentTitle(e.target.value)}
                    placeholder="Enter a descriptive title"
                    className="mt-1.5"
                  />
                  <p className="text-xs text-gray-500 mt-1.5">
                    If left blank, a title will be automatically generated based on the URL
                  </p>
                </div>
              </FormControl>
            </div>
          </div>
          
          <Dialog.Footer>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={editingId ? handleUpdateUrl : handleAddUrl}
              disabled={!currentUrl.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {editingId ? "Update" : "Add"}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>

      {/* Help text */}
      {fieldConfigItem?.description && (
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {fieldConfigItem.description}
        </div>
      )}

      <FormMessage />
    </FormItem>
  )
}
