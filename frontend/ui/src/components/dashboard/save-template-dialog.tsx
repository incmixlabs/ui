import type React from "react";

import { useState } from "react";
import { Button } from "@incmix/ui/base";
import { Input } from "@incmix/ui/base";
import { Label } from "@incmix/ui/base";
import { Dialog } from "@incmix/ui/base";
import { Save, X, Tag } from "lucide-react";
import { useTemplateStore } from "@incmix/store";
import { Badge } from "@incmix/ui/base";
import { toast } from "@incmix/ui";
import type { Layout } from "react-grid-layout";
import type { Breakpoint } from "@incmix/ui/dashboard";

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
  const [templateName, setTemplateName] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const addTemplate = useTemplateStore((state) => state.addTemplate);

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

  const handleSave = () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }

    addTemplate({
      name: templateName.trim(),
      projectId,
      tags,
      layouts,
      nestedLayouts,
    });

    toast.success("Template saved successfully");
    setTemplateName("");
    setTags([]);
    onOpenChange(false);
  };

  return (
    <>
    {/* <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        onOpenChange(open);
      }}
    >
      <Dialog.Trigger>
        <Button variant="solid" color="orange" aria-label="Edit">
          <Save size={20} /> Save
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="sm:max-w-[425px]">
        <Dialog.Header>
          <Dialog.Title>Save Template</Dialog.Title>
          <Dialog.Description className="sr-only">
            Save Dashboard
          </Dialog.Description>
          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Dialog.Close>
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Template
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root> */}
    <>
       <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        onOpenChange?.(open)
      }}
    >
        <Dialog.Trigger>
          <Button variant="solid" color="orange">
            <Save size={20} /> Save Template
          </Button>
        </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Save Template</Dialog.Title>
          <Dialog.Description className="sr-only">Save Template</Dialog.Description>
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
          <Button onClick={handleSave}>
            <Save className="h-4 w-4" />
            Save Template
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
    
    
    </>
    </>

  );
}
