import { useState, useEffect, useRef } from "react";
import { draggable, dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { reorderWithEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/util/reorder-with-edge";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { preserveOffsetOnSource } from "@atlaskit/pragmatic-drag-and-drop/element/preserve-offset-on-source";

interface DraggableItem {
  id: string;
  text: string;
  checked?: boolean;
  order?: number;
}

interface UseDragAndDropListOptions<T extends DraggableItem> {
  items: T[];
  onItemsReorder?: (itemIds: string[]) => void;
  itemSelector: string;
  dragType: string;
  dropTargetType: string;
}

export function useDragAndDropList<T extends DraggableItem>({
  items,
  onItemsReorder,
  itemSelector,
  dragType,
  dropTargetType,
}: UseDragAndDropListOptions<T>) {
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const [dropIndicator, setDropIndicator] = useState<{
    itemId: string;
    position: 'top' | 'bottom';
  } | null>(null);
  const [optimisticItems, setOptimisticItems] = useState<T[]>([]);

  // Keep optimistic items in sync with actual items
  useEffect(() => {
    setOptimisticItems(items);
  }, [items]);

  // Use a ref to keep track of the latest optimisticItems without triggering effect re-runs
  const optimisticItemsRef = useRef<T[]>(optimisticItems);
  
  // Update ref whenever optimisticItems changes
  useEffect(() => {
    optimisticItemsRef.current = optimisticItems;
  }, [optimisticItems]);

  // Setup drag and drop for list items
  useEffect(() => {
    if (!onItemsReorder) return;

    const cleanups: Array<() => void> = [];
    
    // Process each list item for drag and drop
    if (!itemSelector.startsWith('data-')) {
      console.warn('itemSelector should start with "data-" for proper HTML5 data attributes');
    }
    const itemElements = document.querySelectorAll(`[${itemSelector}]`);
    itemElements.forEach((element, index) => {
      const itemId = element.getAttribute('data-item-id');
      if (!itemId) return;
      
      // Find the item in our state (using ref to access latest items)
      const item = optimisticItemsRef.current.find(item => item.id === itemId);
      if (!item) return;
      
      // Handle draggable
      const handleRef = element.querySelector('[data-drag-handle]');
      if (!handleRef) return;
      
      const draggableCleanup = draggable({
        element: handleRef as HTMLElement,
        dragHandle: handleRef as HTMLElement,
        getInitialData: () => ({
          type: dragType,
          itemId,
          index,
          text: item.text
        }),
        onDragStart() {
          setDraggedItemId(itemId);
          element.classList.add('opacity-50', 'border-2', 'border-blue-400', 'bg-blue-50', 'dark:bg-blue-900/20');
        },
        onDrop() {
          setDraggedItemId(null);
          setDropIndicator(null);
          element.classList.remove('opacity-50', 'border-2', 'border-blue-400', 'bg-blue-50', 'dark:bg-blue-900/20');
        },
        onGenerateDragPreview({ nativeSetDragImage, source, location }) {
          // Create a custom drag preview that looks like the original item but styled as dragging
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: preserveOffsetOnSource({
              element: handleRef as HTMLElement,
              input: location.current.input,
            }),
            render({ container }) {
              // Detect dark mode
              const isDarkMode = document.documentElement.classList.contains('dark') || 
                                window.matchMedia('(prefers-color-scheme: dark)').matches;

              // Create a clone of the entire list item for the drag preview
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
            },
          });
        },
        onDropTargetChange: () => {}
      });
      
      cleanups.push(draggableCleanup);
      
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
            type: dropTargetType,
            itemId,
            index,
            closestEdge
          };
        },
        onDragEnter: ({ source, location }) => {
          if (!source.data || source.data.type !== dragType) return;
          
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
          setDropIndicator(prev => prev?.itemId === itemId ? null : prev);
          element.classList.remove('bg-blue-50', 'dark:bg-blue-900/20');
        },
        onDrop: ({ source, location }) => {
          setDropIndicator(null);
          element.classList.remove('bg-blue-50', 'dark:bg-blue-900/20');
          
          // Make sure we have what we need
          if (!source.data) return;
          
          const sourceData = source.data as { type: string; itemId: string; index: number } | undefined;
          if (!sourceData) return;
          const dropTargetData = location.current.dropTargets[0]?.data as { 
            type: string; 
            itemId: string; 
            index: number; 
            closestEdge: 'top' | 'bottom' 
          };
          
          if (sourceData.type !== dragType || 
              !dropTargetData || 
              dropTargetData.type !== dropTargetType) {
            return;
          }
          
          // Get the reordered indices
          const reordered = reorderWithEdge({
            axis: 'vertical',
            list: optimisticItemsRef.current,
            startIndex: sourceData.index,
            indexOfTarget: dropTargetData.index,
            closestEdgeOfTarget: dropTargetData.closestEdge,
          });
          
          // Update local state optimistically
          setOptimisticItems(reordered);
          
          // Call the reorder handler with the new item IDs array
          onItemsReorder(reordered.map(item => item.id));
        }
      });
      
      cleanups.push(dropTargetCleanup);
    });
    
    return () => {
      cleanups.forEach(cleanup => cleanup());
    };
  }, [onItemsReorder, dragType, dropTargetType, itemSelector]);

  return {
    draggedItemId,
    dropIndicator,
    optimisticItems,
    setOptimisticItems
  };
}
