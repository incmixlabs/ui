import type React from "react";

import { useEffect, useState } from "react";
import { Button, Flex } from "@incmix/ui/base";
import { Input } from "@incmix/ui/base";
import { Label } from "@incmix/ui/base";
import { Dialog } from "@incmix/ui/base";
import { Save, X, Tag } from "lucide-react";
import { database, useTemplateStore } from "@incmix/store";
import { Badge } from "@incmix/ui/base";
import { toast } from "@incmix/ui";
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
  console.log(isTemplate, tags);
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
    });
    setIsTemplate(null);
    toast.success("Template saved successfully");
    setTemplateName("");
    setTags([]);
    onOpenChange(false);
  };
  const handleUpdateTemplate = async (id: string) => {
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
              <div className="flex items-center gap-2">
                <Input
                  id="template-tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add tags..."
                />
                <Button type="button" onClick={handleAddTag}>
                  <Tag className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="solid"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 rounded-full hover:bg-muted p-0.5"
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {tag} tag</span>
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
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
