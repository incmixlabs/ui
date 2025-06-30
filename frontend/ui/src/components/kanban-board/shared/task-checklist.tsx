import React, { useState, useRef, useEffect } from "react";
import { Checkbox, TextField } from "@incmix/ui";
import { Pencil, Trash, Check, X, GripVertical, Plus } from "lucide-react";
import { Reorder, useDragControls } from "framer-motion";
import { ConfirmationModal } from "./confirmation-modal";
import { ProgressBar } from "./progress-bar";

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  order: number;
}

interface TaskChecklistProps {
  checklist: ChecklistItem[];
  hideTitle?: boolean;
  onChecklistItemToggle: (id: string, checked: boolean) => void;
  onChecklistItemEdit: (id: string, text: string) => void;
  onChecklistItemDelete: (id: string) => void;
  onChecklistItemAdd?: (text: string) => void;
  onReorderChecklist?: (newOrder: ChecklistItem[]) => void;
}

const ChecklistItem = ({ 
  item, 
  onEdit, 
  onDelete, 
  onToggle 
}: { 
  item: ChecklistItem; 
  onEdit: (id: string, text: string) => void; 
  onDelete: (id: string) => void; 
  onToggle: (id: string, checked: boolean) => void; 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);
  const editInputRef = useRef<HTMLInputElement>(null);
  const controls = useDragControls();
  
  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [isEditing]);
  
  const handleStartEdit = () => {
    setIsEditing(true);
    setEditText(item.text);
  };
  
  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(item.id, editText.trim());
      setIsEditing(false);
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <Reorder.Item
      value={item}
      id={item.id}
      dragControls={controls}
      dragListener={false}
      className="group flex items-center gap-2 bg-transparent px-2 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
    >
      <Checkbox
        id={`checklist-${item.id}`}
        checked={item.checked}
        onCheckedChange={(checked: boolean) => onToggle(item.id, checked)}
        className="mt-0.5"
      />
      
      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <input
            ref={editInputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 text-sm text-gray-700 dark:text-gray-300 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0 w-full"
            autoFocus
          />
          <button
            onClick={handleSaveEdit}
            className="text-green-500 hover:text-green-600"
          >
            <Check size={16} />
          </button>
          <button
            onClick={handleCancelEdit}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <>
          <label
            htmlFor={`checklist-${item.id}`}
            className={`flex-1 text-sm ${item.checked
              ? "line-through text-gray-400 dark:text-gray-500"
              : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {item.text}
          </label>
          
          <div className="flex items-center gap-2">
            <button 
              className="cursor-grab opacity-0 group-hover:opacity-100"
              onPointerDown={(e) => controls.start(e)}
            >
              <GripVertical size={16} className="text-gray-400 dark:text-gray-500" />
            </button>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100">
              <button
                onClick={handleStartEdit}
                className="text-gray-700 hover:text-black dark:text-gray-300 dark:hover:text-white"
              >
                <Pencil size={14} />
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="text-gray-700 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
              >
                <Trash size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </Reorder.Item>
  );
};

export function TaskChecklist({
  checklist,
  hideTitle = false,
  onChecklistItemToggle,
  onChecklistItemEdit,
  onChecklistItemDelete,
  onChecklistItemAdd,
  onReorderChecklist,
}: TaskChecklistProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<ChecklistItem | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [optimisticChecklist, setOptimisticChecklist] = useState<ChecklistItem[]>([]);
  const editInputRef = useRef<HTMLInputElement>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const newItemInputRef = useRef<HTMLInputElement>(null);
  
  // Keep optimistic checklist in sync with actual checklist
  useEffect(() => {
    setOptimisticChecklist(checklist);
  }, [checklist]);
  
  // Focus input when editing begins
  useEffect(() => {
    if (editingItemId && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editingItemId]);
  
  // Focus input when adding a new item
  useEffect(() => {
    if (isAddingNew && newItemInputRef.current) {
      newItemInputRef.current.focus();
    }
  }, [isAddingNew]);
  
  const handleStartEdit = (item: ChecklistItem) => {
    setEditingItemId(item.id);
    setEditText(item.text);
  };
  
  const handleSaveEdit = () => {
    if (editingItemId && editText.trim()) {
      // Capture the original item so we can revert on failure
      const originalItem = optimisticChecklist.find(item => item.id === editingItemId);
      // Optimistically update local state first
      setOptimisticChecklist(prev => 
        prev.map(item => 
          item.id === editingItemId 
            ? { ...item, text: editText.trim() } 
            : item
        )
      );
      
      // Then call the parent update function with error handling
      Promise.resolve(onChecklistItemEdit(editingItemId, editText.trim()))
        .catch(() => {
          // Revert optimistic update on failure
          if (originalItem) {
            setOptimisticChecklist(prev => 
              prev.map(item => 
                item.id === editingItemId ? originalItem : item
              )
            );
          }
        });
      
      // Clear editing state
      setEditingItemId(null);
      setEditText("");
    }
  };
  
  const handleCancelEdit = () => {
    // Reset to original state
    setOptimisticChecklist(checklist);
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
  
  const handleAddNew = () => {
    setIsAddingNew(true);
    setNewItemText("");
    
    // Focus will happen when the input is rendered and effect is triggered
  };
  
  const handleSaveNew = () => {
    if (newItemText.trim() && onChecklistItemAdd) {
      onChecklistItemAdd(newItemText.trim());
      setIsAddingNew(false);
      setNewItemText("");
    } else if (!newItemText.trim()) {
      setIsAddingNew(false);
      setNewItemText("");
    }
  };
  
  const handleCancelNew = () => {
    setIsAddingNew(false);
    setNewItemText("");
  };
  
  const handleNewItemKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSaveNew();
    } else if (e.key === "Escape") {
      handleCancelNew();
    }
  };
  


  if (!checklist) {
    return null;
  }

  // Sort checklist by order
  const sortedChecklist = [...(optimisticChecklist || [])].sort((a, b) => a.order - b.order);
  
  // Calculate progress for the checklist
  const completedItems = checklist.filter(item => item.checked).length;
  const totalItems = checklist.length;
  const progressPercentage = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;
  
  const handleReorderChecklist = (newOrder: ChecklistItem[]) => {
    // Update the order property for each item based on its new position
    const reorderedChecklist = newOrder.map((item, index) => ({
      ...item,
      order: index,
    }));
    
    setOptimisticChecklist(reorderedChecklist);
    
    if (onReorderChecklist) {
      onReorderChecklist(reorderedChecklist);
    }
  };
  
  return (
    <>
      <div className="space-y-4">
        {!hideTitle && (
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
              CHECKLIST ({completedItems}/{totalItems})
            </h3>
          </div>
        )}
        
        {totalItems > 0 && (
          <ProgressBar completedItems={completedItems} totalItems={totalItems} />
        )}

        
        <div className="space-y-2">
          {totalItems > 0 ? (
            <Reorder.Group
              as="div"
              className="space-y-1"
              values={sortedChecklist}
              onReorder={handleReorderChecklist}
              axis="y"
            >
              {sortedChecklist.map((item) => (
                <ChecklistItem
                  key={item.id}
                  item={item}
                  onEdit={onChecklistItemEdit}
                  onDelete={(id) => {
                    setActiveItem(item);
                    setDeleteModalOpen(true);
                  }}
                  onToggle={onChecklistItemToggle}
                />
              ))}
            </Reorder.Group>
          ) : null}
          
          {isAddingNew && (
            <div className="flex gap-2 px-2 py-1.5">
              <Checkbox
                id="new-checklist-item"
                checked={false}
                disabled
                className="mt-0.5"
              />
              <div className="flex-1 flex items-center gap-2">
                <input
                  ref={newItemInputRef}
                  value={newItemText}
                  onChange={(e) => setNewItemText(e.target.value)}
                  onKeyDown={handleNewItemKeyDown}
                  onBlur={handleSaveNew}
                  placeholder="New checklist item"
                  className="flex-1 text-sm text-gray-700 dark:text-gray-300 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0 w-full"
                  autoFocus
                />
                <button
                  onClick={handleSaveNew}
                  className="text-green-500 hover:text-green-600"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={handleCancelNew}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          )}
          
          {!isAddingNew && onChecklistItemAdd && (
            <div className="pl-2">
              <button
                onClick={handleAddNew}
                className="inline-flex items-center gap-2 text-sm text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300"
                aria-label="Add checklist item"
              >
                <Plus className="h-4 w-4" />
                Add Checklist Item
              </button>
            </div>
          )}
        </div>
      </div>
      
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
