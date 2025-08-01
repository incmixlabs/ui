import type React from "react";
import { useEffect, useState } from "react";
import { Button, Flex, Tooltip } from "@incmix/ui/base";
import { Input } from "@incmix/ui/base";
import { Label } from "@incmix/ui/base";
import { Dialog } from "@incmix/ui/base";
import { database, useTemplateStore } from "@incmix/store";
import {
  Icon,
  MultipleSelector,
  toast,
} from "@incmix/ui";
import { useQueryState } from "nuqs";
import type { CustomLayouts } from "@incmix/store";

interface SaveTemplateDialogProps {
  isDesktop: boolean;
  projectId: string;
  layouts: CustomLayouts;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SaveTemplateDialog({
  isDesktop,
  projectId,
  layouts,
  open,
  onOpenChange,
}: SaveTemplateDialogProps) {
  const [isTemplate, setIsTemplate] = useQueryState("template");

  const [templateName, setTemplateName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const { addTemplate, updateTemplate } = useTemplateStore();

  useEffect(() => {
    const updateTemplateData = async (templateId: string) => {
      try {
        const templatesCollection = database.dashboardTemplates;
        const existingTemplate = await templatesCollection
          .findOne(templateId)
          .exec();

        const templates = await database.dashboardTemplates.find().exec();
        setAllTags([...new Set(templates.flatMap((t) => t.tags || []))]);

        if (!existingTemplate) {
          toast.error("Template not found");
          return;
        }
        setTemplateName(existingTemplate?.templateName || "");
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

  const handleSave = async () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }
    console.log("layouts", layouts);

    await addTemplate({
      templateName: templateName.trim(),
      dashboardLink: projectId,
      tags,
      mainLayouts: layouts,
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
        dashboardLink: projectId,
        templateName: templateName.trim(),
        tags,
        mainLayouts: layouts,
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

  const handleCancelUpdate = () => {
    setIsTemplate(null);
    setTemplateName("");
    setTags([]);
    onOpenChange(false);
  };

  console.log(allTags);

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
            {isDesktop ? (
              <>
                <Icon name="Save"/>
                {isTemplate ? "Update Template" : "Save Template"}
              </>
            ) : (
              <>
                <Tooltip
                  content={isTemplate ? "Update Template" : "Save Template"}
                >
                  <Icon name="Save"/>
                </Tooltip>
              </>
            )}
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
                defaultOptions={allTags.map((tag) => ({
                  value: tag,
                  label: tag,
                }))}
                defaultColor="indigo"
                onChange={(options) =>
                  setTags(options.map((option) => option.value))
                }
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
              <Icon name="Save"/>
              {isTemplate ? "Update Template" : "Save Template"}
            </Button>
          </Dialog.Footer>
        </Dialog.Content>
      </Dialog.Root>
      {isTemplate && (
        <Button variant="solid" color={"red"} onClick={handleCancelUpdate}>
          <Icon name="X"/> Cancel
        </Button>
      )}
    </Flex>
  );
}
