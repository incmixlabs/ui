import React, { useState, useRef, useEffect } from "react";
import { Checkbox, TextField } from "@incmix/ui";
import { Pencil, Trash, Check, X, GripVertical } from "lucide-react";
import { ConfirmationModal } from "./confirmation-modal";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";

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

  // Setup drag and drop for checklist items
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    
    // Process each checklist item for drag and drop
    const itemElements = document.querySelectorAll('[data-checklist-item]');
    itemElements.forEach((element, index) => {
      const itemId = element.getAttribute('data-item-id');
      if (!itemId) return;
      
      // Handle draggable
      const handleRef = element.querySelector('[data-drag-handle]');
      if (handleRef) {
        const draggableCleanup = draggable({
          element: handleRef as HTMLElement,
          dragHandle: handleRef as HTMLElement,
          getInitialData: () => ({
            type: 'checklist-item',
            itemId,
            index
          }),
          onDragStart: () => {
            element.classList.add('opacity-50');
          },
          onDrop: () => {
            element.classList.remove('opacity-50');
          },
          onDropTargetChange: () => {}
        });
        cleanups.push(draggableCleanup);
      }
      
      // Handle drop target
      const dropTargetCleanup = dropTargetForElements({
        element: element as HTMLElement,
        getData: ({ input }) => {
          const closestEdge = extractClosestEdge({
            input,
            target: element as HTMLElement,
            allowedEdges: ['top', 'bottom']
          });
          
          return {
            type: 'checklist-item-drop-target',
            itemId,
            index,
            closestEdge
          };
        },
        onDragEnter: () => {
          element.classList.add('bg-gray-50', 'dark:bg-gray-800');
        },
        onDragLeave: () => {
          element.classList.remove('bg-gray-50', 'dark:bg-gray-800');
        },
        onDrop: ({ source, location }) => {
          element.classList.remove('bg-gray-50', 'dark:bg-gray-800');
          
          // Make sure we have what we need
          if (!onChecklistItemsReorder || !source.data) return;
          
          const sourceData = source.data as { type: string; itemId: string; index: number } | undefined;
          if (!sourceData) return;
          const dropTargetData = location.current.dropTargets[0]?.data as { 
            type: string; 
            itemId: string; 
            index: number; 
            closestEdge: 'top' | 'bottom' 
          };
          
          if (sourceData.type !== 'checklist-item' || 
              !dropTargetData || 
              dropTargetData.type !== 'checklist-item-drop-target') {
            return;
          }
          
          // Get the reordered indices
          const reordered = reorderWithEdge({
            axis: 'vertical',
            list: optimisticChecklist,
            startIndex: sourceData.index,
            indexOfTarget: dropTargetData.index,
            closestEdgeOfTarget: dropTargetData.closestEdge,
          });
          
          // Update local state optimistically
          setOptimisticChecklist(reordered);
          
          // Call the reorder handler with the new item IDs array
          onChecklistItemsReorder(reordered.map(item => item.id));
        }
      });
      
      cleanups.push(dropTargetCleanup);
    });
    
    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  }, [optimisticChecklist, onChecklistItemsReorder]);
  
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
            className="flex items-start gap-2 group pr-2" 
            data-checklist-item 
            data-item-id={item.id}
          >
            <div 
              className="cursor-grab text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 mt-0.5 opacity-0 group-hover:opacity-100"
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
