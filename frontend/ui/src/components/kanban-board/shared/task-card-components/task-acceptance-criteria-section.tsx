import React, { useState, useRef, useEffect } from "react";
import { Checkbox } from "@incmix/ui";
import { Pencil, Trash, Check, X, GripVertical } from "lucide-react";
import { ConfirmationModal } from "../confirmation-modal";
import { cn } from "@utils";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";

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
  const [optimisticCriteria, setOptimisticCriteria] = useState<AcceptanceCriteriaItem[]>([]);
  const editInputRef = useRef<HTMLInputElement>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const newItemInputRef = useRef<HTMLInputElement>(null);
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{itemId: string, position: 'top' | 'bottom'} | null>(null);
  
  // Keep optimistic criteria in sync with actual criteria
  useEffect(() => {
    setOptimisticCriteria(acceptanceCriteria);
  }, [acceptanceCriteria]);
  
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

  // Setup drag and drop for acceptance criteria items
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    
    // Process each acceptance criteria item for drag and drop
    const itemElements = document.querySelectorAll('[data-acceptance-criteria-item]');
    itemElements.forEach((element, index) => {
      const itemId = element.getAttribute('data-item-id');
      if (!itemId) return;
      
      // Find the item in our state
      const item = optimisticCriteria.find(item => item.id === itemId);
      if (!item) return;
      
      // Handle draggable
      const handleRef = element.querySelector('[data-drag-handle]');
      if (handleRef) {
        const draggableCleanup = draggable({
          element: handleRef as HTMLElement,
          dragHandle: handleRef as HTMLElement,
          getInitialData: () => ({
            type: 'acceptance-criteria-item',
            itemId,
            index
          }),
          onDragStart: () => {
            setDraggedItemId(itemId);
            element.classList.add('opacity-50');
          },
          onDrop: () => {
            setDraggedItemId(null);
            setDropIndicator(null);
            element.classList.remove('opacity-50');
          },
          onGenerateDragPreview({ nativeSetDragImage, source, location }) {
            // Create a custom drag preview that looks like the original item but styled as dragging
            setCustomNativeDragPreview({
              nativeSetDragImage,
              getOffset: preserveOffsetOnSource({
                element: handleRef as HTMLElement,
                input: location.current.input,
              }),
              render({ container }: { container: HTMLElement }) {
                // Detect dark mode
                const isDarkMode = document.documentElement.classList.contains('dark') || 
                                  window.matchMedia('(prefers-color-scheme: dark)').matches;

                // Create a clone of the entire checklist item for the drag preview
                const preview = document.createElement('div');
                if (isDarkMode) {
                  preview.className = 'flex items-start gap-2 bg-gray-800 p-2 rounded-md shadow-lg border border-blue-400';
                  preview.style.color = '#e2e8f0'; // text-gray-200 equivalent for dark mode
                } else {
                  preview.className = 'flex items-start gap-2 bg-white p-2 rounded-md shadow-lg border border-blue-400';
                }
                preview.style.width = `${(element as HTMLElement).offsetWidth - 10}px`;
                
                // Add the grip icon
                const gripIcon = document.createElement('div');
                gripIcon.className = 'text-blue-500';
                gripIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>';
                preview.appendChild(gripIcon);
                
                // Add a fake checkbox with proper colors for dark mode
                const checkbox = document.createElement('div');
                if (isDarkMode) {
                  checkbox.className = 'w-4 h-4 border border-gray-600 rounded';
                } else {
                  checkbox.className = 'w-4 h-4 border border-gray-400 rounded';
                }
                
                if (item.checked) {
                  checkbox.className += ' bg-blue-500';
                  checkbox.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
                }
                preview.appendChild(checkbox);
                
                // Add the text with proper colors for dark mode
                const text = document.createElement('div');
                text.className = 'text-sm font-medium';
                if (item.checked) {
                  if (isDarkMode) {
                    text.className += ' line-through text-gray-500';
                    text.style.color = '#71717a'; // text-gray-500 for dark mode
                  } else {
                    text.className += ' line-through text-gray-400';
                  }
                } else {
                  if (isDarkMode) {
                    text.className += ' text-gray-300';
                    text.style.color = '#d1d5db'; // text-gray-300 for dark mode
                  } else {
                    text.className += ' text-gray-700';
                  }
                }
                text.textContent = item.text;
                preview.appendChild(text);
                
                container.appendChild(preview);
              }
            });
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
            type: 'acceptance-criteria-drop-target',
            itemId,
            index,
            closestEdge
          };
        },
        onDragEnter: ({ source, location }) => {
          if (!source.data || source.data.type !== 'acceptance-criteria-item') return;
          
          // Use a more forgiving detection for better UX
          const rect = element.getBoundingClientRect();
          const mouseY = location.current.input.clientY;
          const elementHeight = rect.height;
          
          // Define a buffer zone for smoother edge detection
          // Top 40% of element is "top", bottom 40% is "bottom", middle 20% depends on direction
          const topThreshold = rect.top + elementHeight * 0.4;
          const bottomThreshold = rect.bottom - elementHeight * 0.4;
          
          let closestEdge: 'top' | 'bottom';
          
          if (mouseY < topThreshold) {
            closestEdge = 'top';
          } else if (mouseY > bottomThreshold) {
            closestEdge = 'bottom';
          } else {
            // In the middle zone, use the direction of movement to determine edge
            // Default to bottom if direction can't be determined
            closestEdge = 'bottom';
          }
          
          // Add visual indicator for the drop position
          setDropIndicator({
            itemId,
            position: closestEdge
          });
          
          element.classList.add('bg-blue-50', 'dark:bg-blue-900/20');
        },
        onDragLeave: () => {
          setDropIndicator(null);
          element.classList.remove('bg-blue-50', 'dark:bg-blue-900/20');
        },
        
        onDrop: ({ source, location }) => {
          setDropIndicator(null);
          element.classList.remove('bg-blue-50', 'dark:bg-blue-900/20');
          
          // Make sure we have what we need
          if (!onAcceptanceCriteriaItemsReorder || !source.data) return;
          
          const sourceData = source.data as { type: string; itemId: string; index: number } | undefined;
          if (!sourceData) return;
          const dropTargetData = location.current.dropTargets[0]?.data as { 
            type: string; 
            itemId: string; 
            index: number; 
            closestEdge: 'top' | 'bottom' 
          };
          
          if (sourceData.type !== 'acceptance-criteria-item' || 
              !dropTargetData || 
              dropTargetData.type !== 'acceptance-criteria-drop-target') {
            return;
          }
          
          // Get the reordered indices
          const reordered = reorderWithEdge({
            axis: 'vertical',
            list: optimisticCriteria,
            startIndex: sourceData.index,
            indexOfTarget: dropTargetData.index,
            closestEdgeOfTarget: dropTargetData.closestEdge,
          });
          
          // Update local state optimistically
          setOptimisticCriteria(reordered);
          
          // Call the reorder handler with the new item IDs array
          onAcceptanceCriteriaItemsReorder(reordered.map(item => item.id));
        }
      });
      
      cleanups.push(dropTargetCleanup);
    });
    
    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  }, [optimisticCriteria, onAcceptanceCriteriaItemsReorder]);
  
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
                  onBlur={handleSaveNew}
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