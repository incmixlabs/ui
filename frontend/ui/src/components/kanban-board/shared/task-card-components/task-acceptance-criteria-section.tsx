import React, { useState, useRef, useEffect } from "react";
import { Checkbox } from "@incmix/ui";
import { Pencil, Trash, Check, X, GripVertical } from "lucide-react";
import { ConfirmationModal } from "../confirmation-modal";
import { cn } from "@utils";
import { useDragAndDropList } from "./hooks/use-drag-and-drop-list";

interface AcceptanceCriteriaItem {
  id: string;
  text: string;
  checked?: boolean;
  order?: number;
}

interface TaskAcceptanceCriteriaSectionProps {
  acceptanceCriteria?: AcceptanceCriteriaItem[];
  className?: string;
  onAcceptanceCriteriaItemToggle?: (id: string, checked: boolean) => void;
  onAcceptanceCriteriaItemEdit?: (id: string, text: string) => void;
  onAcceptanceCriteriaItemDelete?: (id: string) => void;
  onAcceptanceCriteriaItemAdd?: (text: string) => void;
  onAcceptanceCriteriaItemsReorder?: (itemIds: string[]) => void;
}

export function TaskAcceptanceCriteriaSection({
  acceptanceCriteria = [],
  className,
  onAcceptanceCriteriaItemToggle,
  onAcceptanceCriteriaItemEdit,
  onAcceptanceCriteriaItemDelete,
  onAcceptanceCriteriaItemAdd,
  onAcceptanceCriteriaItemsReorder,
}: TaskAcceptanceCriteriaSectionProps) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<AcceptanceCriteriaItem | null>(null);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const newItemInputRef = useRef<HTMLInputElement>(null);
  
  // Use the custom drag-and-drop hook
  const { draggedItemId, dropIndicator, optimisticItems: optimisticCriteria, setOptimisticItems: setOptimisticCriteria } = useDragAndDropList({
    items: acceptanceCriteria,
    onItemsReorder: onAcceptanceCriteriaItemsReorder,
    itemSelector: 'data-acceptance-criteria-item',
    dragType: 'acceptance-criteria-item',
    dropTargetType: 'acceptance-criteria-drop-target'
  });
  
  // Optimistic criteria is now handled by the useDragAndDropList hook
  
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
  
  const handleStartEdit = (item: AcceptanceCriteriaItem) => {
    setEditingItemId(item.id);
    setEditText(item.text);
  };
  
  const handleSaveEdit = () => {
    if (editingItemId && editText.trim() && onAcceptanceCriteriaItemEdit) {
      // Capture the original item so we can revert on failure
      const originalItem = optimisticCriteria.find(item => item.id === editingItemId);
      // Optimistically update local state first
      setOptimisticCriteria(prev => 
        prev.map(item => 
          item.id === editingItemId 
            ? { ...item, text: editText.trim() } 
            : item
        )
      );
      
      // Then call the parent update function with error handling
      Promise.resolve(onAcceptanceCriteriaItemEdit(editingItemId, editText.trim()))
        .catch(() => {
          // Revert optimistic update on failure
          if (originalItem) {
            setOptimisticCriteria(prev => 
              prev.map(item => 
                item.id === editingItemId ? originalItem : item
              )
            );
          }
        });
      
      // Clear editing state
      setEditingItemId(null);
      setEditText("");
    } else {
      handleCancelEdit();
    }
  };
  
  const handleCancelEdit = () => {
    // Reset to original state
    setOptimisticCriteria(acceptanceCriteria);
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
    if (newItemText.trim() && onAcceptanceCriteriaItemAdd) {
      onAcceptanceCriteriaItemAdd(newItemText.trim());
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
  
  // If no add/edit/delete handlers are provided and criteria is empty, don't render anything
  if (
    !onAcceptanceCriteriaItemAdd && 
    !onAcceptanceCriteriaItemEdit && 
    !onAcceptanceCriteriaItemDelete && 
    (!acceptanceCriteria || acceptanceCriteria.length === 0)
  ) {
    return null;
  }

  // Drag and drop functionality is now handled by the useDragAndDropList hook
  
  return (
    <>
      <div className={cn("space-y-3", className)}>
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Acceptance Criteria
          </h3>
          {!isAddingNew && onAcceptanceCriteriaItemAdd && (
            <button
              onClick={handleAddNew}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Add acceptance criteria"
            >
              <span className="text-sm">+</span>
            </button>
          )}
        </div>
        <div className="space-y-2">
          {isAddingNew && (
            <div className="flex items-start gap-2">
              <Checkbox
                id="new-acceptance-criteria-item"
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
                  onBlur={(e) => {
                    // Don't save if blur is caused by clicking the cancel button
                    if (!e.relatedTarget?.getAttribute('aria-label')?.includes('Cancel')) {
                      handleSaveNew();
                    }
                  }}
                  placeholder="New acceptance criteria"
                  className="flex-1 text-sm text-gray-700 dark:text-gray-300 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0 w-full"
                  autoFocus
                  style={{ textAlign: 'left' }}
                />
                <button
                  onClick={handleSaveNew}
                  className="text-green-500 hover:text-green-600"
                  aria-label="Save new item"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={handleCancelNew}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Cancel adding"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )}
          {optimisticCriteria.map((item) => (
          <div 
            key={item.id} 
            className={`flex items-start gap-2 group py-1.5 px-2 rounded-md relative transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800/50 ${draggedItemId === item.id ? 'opacity-50 border-2 border-blue-400 bg-blue-50 dark:bg-blue-900/20' : ''}`} 
            data-acceptance-criteria-item 
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
              className="cursor-grab text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 mt-0.5 opacity-30 group-hover:opacity-100 transition-opacity duration-200"
              data-drag-handle
            >
              <GripVertical size={16} />
            </div>
            <Checkbox
              id={`ac-${item.id}`}
              checked={!!item.checked}
              onCheckedChange={(checked: boolean) => {
                if (onAcceptanceCriteriaItemToggle) {
                  // Optimistically update
                  setOptimisticCriteria(prev => 
                    prev.map(i => i.id === item.id ? { ...i, checked } : i)
                  );
                  onAcceptanceCriteriaItemToggle(item.id, checked);
                }
              }}
              className="mt-0.5"
            />
            {editingItemId === item.id ? (
              <div className="flex-1 flex items-center gap-2">
                <input
                  ref={editInputRef}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handleSaveEdit}
                  className="flex-1 text-sm text-gray-700 dark:text-gray-300 bg-transparent border-none focus:outline-none focus:ring-0 p-0 m-0 w-full"
                  autoFocus
                  style={{ textAlign: 'left' }}
                />
                <button
                  onClick={handleSaveEdit}
                  className="text-green-500 hover:text-green-600"
                  aria-label="Save edit"
                >
                  <Check size={14} />
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Cancel edit"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <>
                <label
                  htmlFor={`ac-${item.id}`}
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
                    aria-label="Edit acceptance criteria"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setActiveItem(item);
                      setDeleteModalOpen(true);
                    }}
                    className="text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
                    aria-label="Delete acceptance criteria"
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
        
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        title="Remove Acceptance Criteria"
        description={`Are you sure you want to remove this acceptance criteria? ${activeItem?.text ? `"${activeItem.text}"` : ""}`}
        type="delete"
        primary={{
          label: "Remove",
          action: () => {
            if (activeItem && onAcceptanceCriteriaItemDelete) {
              onAcceptanceCriteriaItemDelete(activeItem.id);
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