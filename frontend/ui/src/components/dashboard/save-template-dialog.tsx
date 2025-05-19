import type React from "react";

import { useEffect, useState } from "react";
import { Button, Flex } from "@incmix/ui/base";
import { Input } from "@incmix/ui/base";
import { Label } from "@incmix/ui/base";
import { Dialog } from "@incmix/ui/base";
import { Save, X, Tag } from "lucide-react";
import { database, useTemplateStore } from "@incmix/store";
import { Badge } from "@incmix/ui/base";
import { MultipleSelector, MultipleSelectorControlled, toast } from "@incmix/ui";
import type { Layout } from "react-grid-layout";
import type { Breakpoint } from "@incmix/ui/dashboard";
import { useQueryState } from "nuqs";

interface SaveTemplateDialogProps {
  projectId: string;
  layouts: Record<Breakpoint, Layout[]>;
  nestedLayouts: Record<string, Layout[]>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveTemplateDialog({
  projectId,
  layouts,
  nestedLayouts,
  open,
  onOpenChange,
}: SaveTemplateDialogProps) {
  const [isTemplate, setIsTemplate] = useQueryState("template");

  const [templateName, setTemplateName] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const { addTemplate, updateTemplate } = useTemplateStore();

  useEffect(() => {
    const updateTemplateData = async (templateId: string) => {
      try {
        const templatesCollection = database.dashboardTemplates;
        const existingTemplate = await templatesCollection
          .findOne(templateId)
          .exec();

        if (!existingTemplate) {
          toast.error("Template not found");
          return;
        }
        setTemplateName(existingTemplate?.name);
        setTags(existingTemplate?.tags || []);
      } catch (error) {
        console.error("Failed to update template:", error);
        toast.error(
          "Failed to update template: " +
            (error instanceof Error ? error.message : "Unknown error"),
        );
      }
    };

    if (isTemplate) {
      updateTemplateData(isTemplate);
    }
  }, [isTemplate, setTemplateName, setTags]);

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };
  const handleSave = async () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }

   await addTemplate({
      name: templateName.trim(),
      projectId,
      tags,
      layouts,
      nestedLayouts,
      isActive: false,
    });
    setIsTemplate(null);
    toast.success("Template saved successfully");
    setTemplateName("");
    setTags([]);
    onOpenChange(false);
  };

const handleUpdateTemplate = async (id: string) => {
  try {
     const templatesCollection = database.dashboardTemplates;
     const existingTemplate = await templatesCollection.findOne(id).exec();
     if (!existingTemplate) {
       throw new Error("Template not found");
     }
     await updateTemplate(id, {
       name: templateName.trim(),
       projectId,
       tags,
       layouts,
       nestedLayouts,
     });
     toast.success("Template updated successfully");
     setIsTemplate(null);
     setTemplateName("");
     setTags([]);
     onOpenChange(false);
  } catch (error) {
     console.error(error);
     toast.error(
       "Failed to update template: " +
         (error instanceof Error ? error.message : "Unknown error"),
     );
  }
 };

const handleCancelUpdate= ()=>{
  setIsTemplate(null);
  setTemplateName("");
  setTags([]);
  onOpenChange(false);
}
  return (
    <Flex justify="center" align={"center"} gap="2">
      <Dialog.Root
        open={open}
        onOpenChange={(open) => {
          onOpenChange?.(open);
        }}
      >
        <Dialog.Trigger>
          <Button variant="solid" color={isTemplate ? "indigo" : "orange"}>
            <Save size={20} />{" "}
            {isTemplate ? "Update Template" : "Save Template"}
          </Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>
              {isTemplate ? "Update Template" : "Save Template"}
            </Dialog.Title>
            <Dialog.Description className="sr-only">
              {isTemplate ? "Update Template" : "Save Template"}
            </Dialog.Description>
          </Dialog.Header>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="template-name">Template Name</Label>
              <Input
                id="template-name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="My Dashboard Template"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="template-tags">Tags</Label>
              <MultipleSelector
              value={tags.map((tag) => ({ value: tag, label: tag }))}
        defaultOptions={tags.map((tag) => ({ value: tag, label: tag }))}
        defaultColor="indigo"
        onChange={(options) => setTags(options.map((option) => option.value))}
        placeholder="Add Tags"
        creatable
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
           
            </div>
          </div>

          <Dialog.Footer>
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              onClick={() =>
                isTemplate ? handleUpdateTemplate(isTemplate) : handleSave()
              }
            >
              <Save className="h-4 w-4" />
              {isTemplate ? "Update Template" : "Save Template"}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
      {isTemplate &&
      <Button variant="solid" color={"red"} onClick={handleCancelUpdate}>
        <X size={20} /> Cancel
      </Button>
      }
    </Flex>
  );
}