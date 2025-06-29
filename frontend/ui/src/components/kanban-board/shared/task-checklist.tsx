import React, { useState, useRef, useEffect } from "react";
import { Checkbox, TextField } from "@incmix/ui";
import { Pencil, Trash, Check, X, GripVertical } from "lucide-react";
import { ConfirmationModal } from "./confirmation-modal";
import { useDragAndDropList } from "./task-card-components/hooks/use-drag-and-drop-list";

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
  order?: number;
}

interface TaskChecklistProps {
  checklist: ChecklistItem[];
  onChecklistItemToggle: (id: string, checked: boolean) => void;
  onChecklistItemEdit: (id: string, text: string) => void;
  onChecklistItemDelete: (id: string) => void;
  onChecklistItemAdd?: (text: string) => void;
  onChecklistItemsReorder?: (itemIds: string[]) => void;
}

export function TaskChecklist({
  checklist,
  onChecklistItemToggle,
  onChecklistItemEdit,
  onChecklistItemDelete,
  onChecklistItemAdd,
  onChecklistItemsReorder,
}: TaskChecklistProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<ChecklistItem | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const newItemInputRef = useRef<HTMLInputElement>(null);
  
  // Use the custom drag-and-drop hook
  const { draggedItemId, dropIndicator, optimisticItems: optimisticChecklist, setOptimisticItems: setOptimisticChecklist } = useDragAndDropList({
    items: checklist,
    onItemsReorder: onChecklistItemsReorder,
    itemSelector: 'data-checklist-item',
    dragType: 'checklist-item',
    dropTargetType: 'checklist-item-drop-target'
  });
  
  // Optimistic checklist is now handled by the useDragAndDropList hook
  
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
  


  if (!checklist || checklist.length === 0) {
    return null;
  }

  // Hook is now declared at the top of the component
  
  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Checklist
          </h3>
          {!isAddingNew && onChecklistItemAdd && (
            <button
              onClick={handleAddNew}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Add checklist item"
            >
              <span className="text-sm">+</span>
            </button>
          )}
        </div>
        <div className="space-y-2">
          {isAddingNew && (
            <div className="flex items-start gap-2">
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
                  style={{ textAlign: 'left' }}
                />
                <button
                  onClick={handleSaveNew}
                  className="text-green-500 hover:text-green-600"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={handleCancelNew}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}
          {optimisticChecklist.map((item) => (
          <div 
            key={item.id} 
            className={`flex items-start gap-2 group py-1.5 px-2 rounded-md relative transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${draggedItemId === item.id ? 'opacity-50 border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}`}
            data-checklist-item 
            data-item-id={item.id}
          >
            {/* Top drop indicator */}
            {dropIndicator?.itemId === item.id && dropIndicator?.position === 'top' && (
              <div className="absolute -top-1 left-0 right-0 h-1 bg-blue-500 rounded-full z-10 animate-pulse" style={{ marginTop: '-2px' }}>
                <div className="absolute -top-1.5 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-sm shadow-blue-400/50" />
              </div>
            )}
            {/* Bottom drop indicator */}
            {dropIndicator?.itemId === item.id && dropIndicator?.position === 'bottom' && (
              <div className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500 rounded-full z-10 animate-pulse" style={{ marginBottom: '-2px' }}>
                <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-sm shadow-blue-400/50" />
              </div>
            )}
            <div 
              className="cursor-grab text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 mt-0.5 opacity-40 group-hover:opacity-100 transition-opacity duration-200"
              data-drag-handle
            >
              <GripVertical size={16} />
            </div>
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
                  onBlur={handleSaveEdit}
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
