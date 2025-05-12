
import type React from "react"
import { useMemo, useState } from "react"
import { useTemplateStore } from "@incmix/store"
import { Button, Input, Badge, ScrollArea, Flex, Heading, Box } from "@incmix/ui/base"
import { Trash2, Search, Clock, Tag, Layout } from "lucide-react"
import { toast, useLayoutStore } from "@incmix/ui"
import { cn } from "@incmix/ui"
import { formatDistanceToNow } from "date-fns"

interface TemplatesSidebarProps {
  projectId: string
}

export function TemplatesSidebar({ projectId }: TemplatesSidebarProps) {
      const {  applyTemplates } = useLayoutStore()
    
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const { templates, deleteTemplate,getTemplateById } = useTemplateStore()


  // Get all unique tags from templates
  const allTags = Array.from(new Set(templates.flatMap((t) => t.tags)))

  // Filter templates based on search term and selected tag
//   const filteredTemplates = templates.filter((template) => {
//     const matchesSearch = searchTerm ? template.name.toLowerCase().includes(searchTerm.toLowerCase()) : true
//     const matchesTag = selectedTag ? template.tags.includes(selectedTag) : true
//     return matchesSearch && matchesTag
//   })

   // Filter templates based on search query
   const filteredTemplates = useMemo(() => {
    const query = searchTerm.toLowerCase().trim()
  
    return templates.filter((template) => {
      const matchesSearch =
        !query ||
        template.name.toLowerCase().includes(query) ||
        template.tags.some((tag) => tag.toLowerCase().includes(query))
  
      const matchesTag = !selectedTag || template.tags.includes(selectedTag)
  
      return matchesSearch && matchesTag
    })
  }, [templates, searchTerm, selectedTag])
  


  const handleDeleteTemplate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    deleteTemplate(id)
    toast.success("Template deleted successfully")
  }

  const handleSelectTag = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag)
  }
  // Add the loadTemplate function here
  const loadTemplate = (templateId: string) => {
    const template = getTemplateById(templateId)
    if (!template) {
      toast.error("Template not found")
      return
    }

    // Update layouts in the parent component
    applyTemplates(template.layouts, template.nestedLayouts,template.id)

    toast.success(`Template "${template.name}" loaded successfully`)
  }
  return (
    <Flex direction="column">
        <Heading size="3" className="mb-2">Saved Templates</Heading>
        <Box className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8 bg-gray-3"
          />
        </Box>

      {allTags.length > 0 && (
        <Box className="py-2">
          <Flex gap={"2"}>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTag === tag ? "solid" : "outline"}
                className={cn(
                  "cursor-pointer hover:bg-muted",
                  selectedTag === tag && "bg-primary text-primary-foreground",
                )}
                onClick={() => handleSelectTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </Flex>
        </Box>
      )}

      <ScrollArea className="flex-1">
        {filteredTemplates.length > 0 ? (
          <Flex direction="column" gap={"2"}>
            {filteredTemplates.map((template) => (
              <Box
                key={template.id}
                className="border rounded-md p-3 hover:bg-accent cursor-pointer transition-colors"
                onClick={() => loadTemplate(template.id)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium">{template.name}</h4>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 text-destructive"
                    onClick={(e) => handleDeleteTemplate(template.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete template</span>
                  </Button>
                </div>

                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{formatDistanceToNow(template.updatedAt, { addSuffix: true })}</span>
                </div>

                {template.tags.length > 0 && (
                  <div className="flex items-center mt-2 flex-wrap gap-1">
                    <Tag className="h-3 w-3 mr-1 text-muted-foreground" />
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="solid" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center mt-2 text-xs text-muted-foreground">
                  <Layout className="h-3 w-3 mr-1" />
                  <span>
                    {Object.values(template.layouts.lg).length} widgets, {Object.keys(template.nestedLayouts).length}{" "}
                    nested grids
                  </span>
                </div>
              </Box>
            ))}
          </Flex>
        ) : (
          <Box className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <Layout className="h-8 w-8 mb-2 opacity-50" />
            <p className="text-sm">No templates found</p>
            {searchTerm || selectedTag ? (
              <Button
                variant="ghost"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedTag(null)
                }}
              >
                Clear filters
              </Button>
            ) : (
              <p className="text-xs mt-1">Save your first template to see it here</p>
            )}
          </Box>
        )}
      </ScrollArea>
    </Flex>
  )
}
