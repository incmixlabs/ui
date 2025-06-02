import { Input } from "@components/shadcn";
import {
  Badge,
  Box,
  Button,
  ExtendedColorType,
  Flex,
  Popover,
} from "@components/radixui";
import React, { useRef, useEffect, useCallback } from "react";
import ColorPicker from "@components/color-picker";

type Tag = { label: string; color: string };

interface TagEditorProps {
  tags: Tag[];
  onChange: (tags: Tag[]) => void;
  onExit: () => void;
}

export const TagEditor: React.FC<TagEditorProps> = ({
  tags,
  onChange,
  onExit,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [localTags, setLocalTags] = React.useState<Tag[]>(tags);
  const [input, setInput] = React.useState("");
  const [editingIndex, setEditingIndex] = React.useState<number | null>(null);
  const [editInput, setEditInput] = React.useState("");
  const [tagColor, setTagColor] = React.useState("blue");

  const handleColorSelect = (newColor: ExtendedColorType) => {
    if (setTagColor) {
      setTagColor(newColor);
    }
  };
  const saveEditedTag = useCallback(() => {
    if (editingIndex === null) return;
    
    const updated = localTags.map((tag) => ({ ...tag }));
    updated[editingIndex].label =
      editInput.trim() || localTags[editingIndex].label;
    
    setLocalTags(updated);
    onChange(updated);
    setEditingIndex(null);
    setEditInput("");
  }, [editingIndex, editInput, localTags, onChange]);
 
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(target) &&
        (!popoverRef.current || !popoverRef.current.contains(target))
      ) {
        if (editingIndex !== null) {
          saveEditedTag();
        }
        onExit();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onExit, editingIndex, saveEditedTag]);


  const addTag = () => {
    if (input.trim()) {
      const newTag = { label: input.trim(), color: tagColor };
      const updated = [...localTags, newTag];
      setLocalTags(updated);
      onChange(updated);
      setInput("");
    }
  };

  const deleteTag = (index: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent triggering edit mode
    const updated = localTags.filter((_, i) => i !== index);
    setLocalTags(updated);
    onChange(updated);
  };

  const startEditTag = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();

    if (editingIndex === index) {
      // console.log("already editing");
      return;
    }

    if (editingIndex !== null) {
      saveEditedTag();
    }

    setEditingIndex(index);
    setEditInput(localTags[index].label);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditInput("");
  };

  return (
    <Flex
      ref={wrapperRef}
      align="center"
      justify="center"
      wrap="wrap"
      gap={"2"}
      className=" px-1 py-0.5 border rounded bg-gray-3 border-gray-5"
    >
      {localTags.map((tag, index) => (
        <Badge
          key={index}
          color={tag.color as ExtendedColorType}
          variant="solid"
        >
          {editingIndex === index ? (
            <input
              className="bg-white px-1 text-black h-6 rounded text-sm w-20"
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  saveEditedTag();
                } else if (e.key === "Escape") {
                  cancelEdit();
                }
              }}
              onBlur={saveEditedTag}
              autoFocus
            />
          ) : (
            <Box
            as="span"
              onClick={(e) => startEditTag(index, e)}
              className="cursor-pointer text-sm"
            >
              {tag.label}
            </Box>
          )}
          <Button
            variant="ghost"
            onClick={(e) => deleteTag(index, e)}
            className="text-white hover:text-gray-300 text-xs ml-1"
            title="Delete"
          >
            ✕
          </Button>
        </Badge>
      ))}
      <Box className="relative">
        <Popover.Root>
          <Popover.Trigger>
            <Button
              variant="solid"
              className="color-swatch h-7 w-8 absolute top-1 right-1 cursor-pointer rounded-sm border border-gray-12"
              color={tagColor}
            />
          </Popover.Trigger>
          <Popover.Content
            ref={popoverRef}
            alignOffset={-75}
            width="190px"
            className="z-[888] overflow-hidden bg-white p-3"
          >
            <ColorPicker
              colorType="base"
              onColorSelect={(color) =>
                handleColorSelect(color.name as ExtendedColorType)
              }
            />
          </Popover.Content>
        </Popover.Root>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTag()}
          placeholder="Add tag..."
          className="border px-2 py-1 rounded text-sm bg-gray-1"
        />
      </Box>
    </Flex>
  );
};
