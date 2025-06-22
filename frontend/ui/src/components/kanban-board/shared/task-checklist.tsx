import React from "react";
import { Checkbox } from "@incmix/ui";
import { Pencil, Trash } from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface TaskChecklistProps {
  checklist: ChecklistItem[];
  onChecklistItemToggle: (id: string, checked: boolean) => void;
  onChecklistItemEdit: (id: string, text: string) => void;
  onChecklistItemDelete: (id: string) => void;
}

export function TaskChecklist({
  checklist,
  onChecklistItemToggle,
  onChecklistItemEdit,
  onChecklistItemDelete,
}: TaskChecklistProps) {
  if (!checklist || checklist.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
        Checklist
      </h3>
      <div className="space-y-2">
        {checklist.map((item) => (
          <div key={item.id} className="flex items-start gap-2 group">
            <Checkbox
              id={`checklist-${item.id}`}
              checked={item.checked}
              onCheckedChange={(checked: boolean) => {
                onChecklistItemToggle(item.id, checked);
              }}
              className="mt-0.5"
            />
            <label
              htmlFor={`checklist-${item.id}`}
              className={`flex-1 text-sm ${
                item.checked
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {item.text}
            </label>
            <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2">
              <button
                onClick={() => {
                  const newText = window.prompt("Edit checklist item", item.text);
                  if (newText !== null) {
                    onChecklistItemEdit(item.id, newText);
                  }
                }}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to remove this checklist item?"
                    )
                  ) {
                    onChecklistItemDelete(item.id);
                  }
                }}
                className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
              >
                <Trash size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
