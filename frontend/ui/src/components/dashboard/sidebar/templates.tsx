import type React from "react";
import { useEffect, useMemo, useState } from "react";
import { useEditingStore, useTemplateStore } from "@incmix/store";
import {
  Button,
  Badge,
  Flex,
  Heading,
  Box,
  Grid,
  Text,
} from "@incmix/ui/base";
import {
  Trash2,
  CheckCheck,
  Minus,
  Plus,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { shortFormatDistanceToNow, toast, useLayoutStore } from "@incmix/ui";
import { cn } from "@incmix/ui";
import { formatDistanceToNow } from "date-fns";
import { useQueryState } from "nuqs";
import { DashboardTemplate } from "@incmix/store";

interface TemplatesSidebarProps {
  filteredTemplates:DashboardTemplate[]
  templates: DashboardTemplate[];
  deleteTemplate: (id: string) => Promise<void>;
  templateActive: (id: string) => Promise<DashboardTemplate | null>;
  getTemplateById: (id: string) => Promise<DashboardTemplate | null>;
  isTemplateExpanded:boolean
  setIsTemplateExpanded: (expanded: boolean) => void
}

export function TemplatesSidebar({
  filteredTemplates,
  templates,
  deleteTemplate,
  templateActive,
  getTemplateById,
  isTemplateExpanded,
  setIsTemplateExpanded,
}: TemplatesSidebarProps) {
  const { applyTemplates } = useLayoutStore();
  const [isTemplate, setIsTemplate] = useQueryState("template");

  const handleDeleteTemplate = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this template?")) {
      try {
        await deleteTemplate(id);
        toast.success("Template deleted successfully");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete template");
        return;
      }
      if (isTemplate === id) {
        setIsTemplate(null);
      }
    }
  };

  const handleActiveTemplate = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to active this template?")) {
      const template = await templateActive(id);
      if (template) {
        setIsTemplate(null);
        applyTemplates(template.mainLayouts, template.id);
        toast.success(`Template "${template?.id}" activated successfully`);
      } else {
        toast.error("Failed to activate template");
      }
    }
  };

  const loadTemplateLayout = async (templateId: string) => {
    const template = await getTemplateById(templateId);
    if (!template) {
      toast.error("Template not found");
      return;
    }
    setIsTemplate(templateId);
    applyTemplates(template.mainLayouts, template.id);
    toast.success(`Template "${template?.id}" loaded successfully`);
  };

  return (
    <Flex
      direction="column"
      className={`bg-gray-1 p-2 mt-2 rounded-xl overflow-hidden ${
        isTemplateExpanded ? 'max-h-full' : 'max-h-20'
      } relative border border-gray-5 transition-all duration-300`}
    >
      <Flex justify="between" align="center">
        <Heading size="2" className="font-medium">
          Saved Templates
        </Heading>
        <Button
          variant="ghost"
          color="gray"
          onClick={() => setIsTemplateExpanded(!isTemplateExpanded)}
          className="hover:bg-transparent"
        >
          {isTemplateExpanded ? <ChevronUp /> : <ChevronDown />}
          <span className="sr-only">
            {isTemplateExpanded ? "Collapse templates" : "Expand templates"}
          </span>
        </Button>
      </Flex>
      {isTemplateExpanded && (
        <>
          {filteredTemplates.length > 0 ? 
          (
            <Grid columns={"2"} gap={"2"} className="mt-2">
              {filteredTemplates.map((template) => (
                <Box
                  key={template.id}
                  className={cn(
                    `border  relative border-gray-5 rounded-md pt-1 bg-gray-1  hover:bg-gray-2 cursor-pointer transition-colors`,
                    template?.isActive &&
                      "border-4 border-green-8 bg-green-4 hover:bg-green-3",
                    template?.id === isTemplate &&
                      "border-4 border-indigo-8 bg-indigo-4 hover:bg-indigo-3",
                  )}
                  onClick={() => loadTemplateLayout(template.id)}
                >
                  <Box className="px-2 ">
                    <Heading size="1" className="font-medium">
                      {template?.templateName}
                    </Heading>
                    {/* <Flex
                      align={"center"}
                      className="text-xs text-muted-foreground mt-1"
                    >
                      <Box as="span">
                        {shortFormatDistanceToNow(new Date(template.updatedAt))}
                        ago
                      </Box>
                    </Flex> */}

                    {template.tags.length > 0 && (
                      <Flex  align={"center"} className="mt-2 flex-wrap gap-1">
                        {template.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="solid" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </Flex>
                    )}

                    <Flex
                      align={"center"}
                      className=" mt-2 text-xs text-muted-foreground"
                    >
                      <Box as="span">
                        {template.mainLayouts.lg
                          ? Object.values(template.mainLayouts.lg).length
                          : 0}{" "}
                        w, {Object.keys(template.mainLayouts).length} ng
                      </Box>
                    </Flex>
                  </Box>

                  <Flex
                    align={"center"}
                    justify={"between"}
                    className={cn(
                      template?.isActive && "bg-green-8 px-1 py-0.5 rounded",
                    )}
                  >
                    {!template?.isActive ? (
                      <Button
                        variant="ghost"
                        className="h-8 w-8 "
                        onClick={(e) => handleActiveTemplate(template.id, e)}
                      >
                        <CheckCheck className="h-5 w-5" />
                        <span className="sr-only">active</span>
                      </Button>
                    ) : (
                      <Text
                        size={"1"}
                        className="bg-green-8 px-1 py-0.5 rounded"
                      >
                        Active
                      </Text>
                    )}
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
          ):(
            <Box className="text-center py-4 mt-2 text-muted-foreground">
            No templates match your search
          </Box>
          )}
        </>
      )}
    </Flex>
  );
}