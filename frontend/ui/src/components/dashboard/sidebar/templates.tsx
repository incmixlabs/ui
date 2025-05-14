import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useEditingStore, useTemplateStore } from "@incmix/store";
import {
  Button,
  Input,
  Badge,
  ScrollArea,
  Flex,
  Heading,
  Box,
  Grid,
  Text,
} from "@incmix/ui/base";
import {
  Trash2,
  Search,
  Clock,
  Tag,
  Layout,
  ChevronDown,
  CheckCheck,
} from "lucide-react";
import { shortFormatDistanceToNow, toast, useLayoutStore } from "@incmix/ui";
import { cn } from "@incmix/ui";
import { formatDistanceToNow } from "date-fns";
import { useQueryState } from "nuqs";

interface TemplatesSidebarProps {
  projectId: string;
}

export function TemplatesSidebar({ projectId }: TemplatesSidebarProps) {
  const { applyTemplates } = useLayoutStore();
  const [isTemplate, setIsTemplate] = useQueryState("template");
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const {
    templates,
    initialized,
    initialize,
    deleteTemplate,
    getTemplateById,
    templateActive,
  } = useTemplateStore();

  // Initialize RxDB on component mount
  useEffect(() => {
    if (!initialized && projectId) {
      initialize(projectId);
    }
  }, [initialized, initialize, projectId]);

  const allTags = Array.from(new Set(templates.flatMap((t) => t.tags)));



  const filteredTemplates = useMemo(() => {
    const query = searchTerm.toLowerCase().trim();

    return templates.filter((template) => {
      const matchesSearch =
        !query ||
        template.name.toLowerCase().includes(query) ||
        template.tags.some((tag) => tag.toLowerCase().includes(query));

      const matchesTag = !selectedTag || template.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [templates, searchTerm, selectedTag]);

  const handleDeleteTemplate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this template?")) {
      deleteTemplate(id);
      if (isTemplate === id) {
        setIsTemplate(null);
      }
      toast.success("Template deleted successfully");
    }
  };
  const handleActiveTemplate = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to active this template?")) {
      const template = await templateActive(id);
      if (template) {
        setIsTemplate(null);
        applyTemplates(template.layouts, template.nestedLayouts, template.id);
        toast.success(`Template "${template?.name}" activated successfully`);
      } else {
        toast.error("Failed to activate template");
      }
    }
  };

  const handleSelectTag = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };

  const loadTemplateLayout = async (templateId: string) => {
    const template = await getTemplateById(templateId);
    if (!template) {
      toast.error("Template not found");
      return;
    }
    setIsTemplate(templateId);
    applyTemplates(template.layouts, template.nestedLayouts, template.id);
    toast.success(`Template "${template?.name}" loaded successfully`);
  };

  console.log("checking", templates);

  return (
    <Flex
      direction="column"
      className={`bg-gray-1 p-2 mt-4 rounded-xl relative border border-gray-5 transition-all duration-300 ${isExpanded ? "h-fit " : "h-48 overflow-hidden"}`}
    >
      {!isExpanded && (
        <Box className="-bottom-2 absolute left-0 h-28 w-full bg-gradient-to-t from-gray-1 z-[2]"></Box>
      )}
      <Flex justify="between" align="center">
        <Heading size="2" className="mb-2 font-medium">
          Saved Templates
        </Heading>
        <Button
          variant="ghost"
          color="gray"
          onClick={() => setIsExpanded(!isExpanded)} // Toggle expanded state
          className="hover:bg-transparent"
        >
          <ChevronDown
            className={cn(
              "transition-transform duration-300",
              isExpanded && "transform rotate-180", // Rotate icon when expanded
            )}
          />
          <span className="sr-only">
            {isExpanded ? "Collapse templates" : "Expand templates"}
          </span>
        </Button>
      </Flex>
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
          <ScrollArea
            type="hover"
            scrollbars="horizontal"
            className="w-56 mx-auto pb-3"
          >
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
          </ScrollArea>
        </Box>
      )}

      {filteredTemplates.length > 0 ? (
        <Grid columns={"2"} gap={"2"}>
          {filteredTemplates.map((template) => (
            <Box
              key={template.id}
              className={cn(`border  relative border-gray-5 rounded-md pt-1 bg-gray-1  hover:bg-gray-2 cursor-pointer transition-colors`, template?.isActive && "border-4 border-green-8 bg-green-4 hover:bg-green-3", template?.id === isTemplate && "border-4 border-indigo-8 bg-indigo-4 hover:bg-indigo-3")}
              onClick={() => loadTemplateLayout(template.id)}
            >
          
            <Box className="px-2 ">

                <Heading size="1" className="font-medium">
                  {template.name}
                </Heading>
                <Flex align={"center"} className="text-xs text-muted-foreground mt-1">
                  <Box as="span">
                    {shortFormatDistanceToNow(new Date(template.updatedAt))} ago
                  </Box>
                </Flex>

                {template.tags.length > 0 && (
                  <div className="flex items-center mt-2 flex-wrap gap-1">
                    {template.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="solid" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                <Flex align={"center"} className=" mt-2 text-xs text-muted-foreground">
                  <Box as="span">
                    {template.layouts.lg
                      ? Object.values(template.layouts.lg).length
                      : 0}{" "}
                    w, {Object.keys(template.nestedLayouts).length} ng
                  </Box>
                </Flex>
            </Box>

                <Flex align={"center"} justify={"between"} className={cn(template?.isActive && "bg-green-8 px-1 py-0.5 rounded")}>
                  {!template?.isActive ? (
                    <Button
                      variant="ghost"
                      className="h-8 w-8 "
                      onClick={(e) => handleActiveTemplate(template.id, e)}
                    >
                      <CheckCheck className="h-5 w-5" />
                      <span className="sr-only">active</span>
                    </Button>
                  ):<Text size={"1"} className="bg-green-8 px-1 py-0.5 rounded">Active</Text>}
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 text-destructive"
                    onClick={(e) => handleDeleteTemplate(template.id, e)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete template</span>
                  </Button>
                </Flex>
            </Box>
          ))}
        </Grid>
      ) : (
        <Box className="flex flex-col items-center justify-center h-40 text-muted-foreground">
          <Layout className="h-8 w-8 mb-2 opacity-50" />
          <p className="text-sm">No templates found</p>
          {searchTerm || selectedTag ? (
            <Button
              variant="ghost"
              onClick={() => {
                setSearchTerm("");
                setSelectedTag(null);
              }}
            >
              Clear filters
            </Button>
          ) : (
            <p className="text-xs mt-1">
              Save your first template to see it here
            </p>
          )}
        </Box>
      )}
    </Flex>
  );
}
