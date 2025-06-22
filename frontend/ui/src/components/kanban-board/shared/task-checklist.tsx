import React, { useState, useRef, useEffect } from "react";
import { Checkbox, TextField } from "@incmix/ui";
import { Pencil, Trash, Check, X } from "lucide-react";
import { ConfirmationModal } from "./confirmation-modal";

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
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<ChecklistItem | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);
  
  // Focus input when editing begins
  useEffect(() => {
    if (editingItemId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingItemId]);
  
  const handleStartEdit = (item: ChecklistItem) => {
    setEditingItemId(item.id);
    setEditText(item.text);
  };
  
  const handleSaveEdit = () => {
    if (editingItemId && editText.trim()) {
      onChecklistItemEdit(editingItemId, editText.trim());
      setEditingItemId(null);
      setEditText("");
    }
  };
  
  const handleCancelEdit = () => {
    setEditingItemId(null);
    setEditText("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  if (!checklist || checklist.length === 0) {
    return null;
  }

  return (
    <>
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
            {editingItemId === item.id ? (
              <div className="flex-1 flex items-center gap-2">
                <input
                  ref={editInputRef}
                  value={editText}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 text-sm text-gray-700 dark:text-gray-300 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0 w-full"
                  autoFocus
                  style={{ textAlign: 'left' }}
                />
                <button
                  onClick={handleSaveEdit}
                  className="text-green-500 hover:text-green-600"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
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
                    onClick={() => handleStartEdit(item)}
                    className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setActiveItem(item);
                      setDeleteModalOpen(true);
                    }}
                    className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                  >
                    <Trash size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        </div>
      </div>
        
      {/* We no longer need the EditChecklistItemModal as we're using inline editing */}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Remove Checklist Item"
        description={`Are you sure you want to remove this checklist item? ${activeItem?.text ? `"${activeItem.text}"` : ""}`}
        type="delete"
        primary={{
          label: "Remove",
          action: () => {
            if (activeItem) {
              onChecklistItemDelete(activeItem.id);
            }
          },
          color: "bg-red-500 hover:bg-red-600"
        }}
        secondary={{
          label: "Cancel",
          action: () => {}
        }}
      />
    </>
  );
}
