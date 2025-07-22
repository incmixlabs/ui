import type React from "react";

import { useState, useCallback, useRef, useEffect } from "react";
import { useSelectionStore } from "./use-widgets-selection";

interface UseMarqueeSelectionProps {
  containerRef: React.RefObject<HTMLElement>;
  onSelectionChange?: (selectedIds: string[]) => void;
  isActive: boolean;
}

interface WidgetRect {
  id: string;
  rect: DOMRect;
}

export function useMarqueeSelection({
  containerRef,
  onSelectionChange,
  isActive,
}: UseMarqueeSelectionProps) {
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [endPoint, setEndPoint] = useState<{ x: number; y: number } | null>(
    null,
  );
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const widgetRects = useRef<WidgetRect[]>([]);
  const isShiftPressed = useRef(false);
  const {
    selectedWidgets,
    addSelectedWidget,
    setSelectedWidgets,
    clearSelection,
  } = useSelectionStore();
  const isDraggingWidget = useRef(false);

  const collectWidgetPositions = useCallback(() => {
    if (!containerRef.current) return;

    const widgets = containerRef.current.querySelectorAll("[data-widget-id]");
    const rects: WidgetRect[] = [];

    widgets.forEach((widget) => {
      const id = widget.getAttribute("data-widget-id");
      if (id) {
        rects.push({
          id,
          rect: widget.getBoundingClientRect(),
        });
      }
    });

    widgetRects.current = rects;
  }, [containerRef]);

  const checkIntersection = useCallback(
    (selStart: { x: number; y: number }, selEnd: { x: number; y: number }) => {
      if (!selStart || !selEnd) return [];

      const selLeft = Math.min(selStart.x, selEnd.x);
      const selTop = Math.min(selStart.y, selEnd.y);
      const selRight = Math.max(selStart.x, selEnd.x);
      const selBottom = Math.max(selStart.y, selEnd.y);

      const intersecting = widgetRects.current
        .filter((widget) => {
          const { rect } = widget;
          return (
            rect.left < selRight &&
            rect.right > selLeft &&
            rect.top < selBottom &&
            rect.bottom > selTop
          );
        })
        .map((widget) => widget.id);

      return intersecting;
    },
    [],
  );

  const isPointOverWidgetOrControl = useCallback(
    (x: number, y: number): boolean => {
      if (!containerRef.current) return false;
      const element = document.elementFromPoint(x, y);
      if (!element) return false;

      const widgetElement = element.closest("[data-widget-id]");

      const isControlElement = element.closest(
        'button, [role="button"], input, [role="checkbox"], .react-resizable-handle, .react-draggable-handle',
      );

      // Check if the element is part of the react-grid-item
      const isGridItem = element.closest(".react-grid-item");

      return !!widgetElement || !!isControlElement || !!isGridItem;
    },
    [containerRef],
  );

  const isPointInEmptyArea = useCallback(
    (x: number, y: number): boolean => {
      if (!containerRef.current) return false;
      const containerRect = containerRef.current.getBoundingClientRect();
      const isInContainer =
        x >= containerRect.left &&
        x <= containerRect.right &&
        y >= containerRect.top &&
        y <= containerRect.bottom;

      // If in container, check if it's over a widget or control
      if (isInContainer) {
        return !isPointOverWidgetOrControl(x, y);
      }

      return false;
    },
    [containerRef, isPointOverWidgetOrControl],
  );

  // Monitor for widget dragging
  useEffect(() => {
    const handleDragStart = () => {
      isDraggingWidget.current = true;
    };

    const handleDragEnd = () => {
      setTimeout(() => {
        isDraggingWidget.current = false;
      }, 50);
    };

    const handleDelegatedMousedown = (e: Event) => {
      if ((e.target as HTMLElement).closest(".react-grid-item"))
        handleDragStart();
    };
    document.addEventListener("mousedown", handleDelegatedMousedown);

    const gridItems = document.querySelectorAll(".react-grid-item");

    gridItems.forEach((item) => {
      item.addEventListener("mousedown", handleDragStart);
    });

    document.addEventListener("mouseup", handleDragEnd);

    return () => {
      gridItems.forEach((item) => {
        item.removeEventListener("mousedown", handleDragStart);
      });
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, []);

  // Handle mouse down
  const handleMouseDown = useCallback(
    (e: MouseEvent) => {
      if (!isActive || !containerRef.current) return;

      const target = e.target as HTMLElement;
      const isInteractiveElement = target.closest(
        'button, [role="button"], input, [role="checkbox"], .react-resizable-handle',
      );
      if (isInteractiveElement) return;

      const isEmptyArea = isPointInEmptyArea(e.clientX, e.clientY);

      if ((!isEmptyArea && !isShiftPressed.current) || isDraggingWidget.current)
        return;

      collectWidgetPositions();

      setStartPoint({ x: e.clientX, y: e.clientY });
      setEndPoint({ x: e.clientX, y: e.clientY });
      setIsSelecting(true);

      // If shift is not pressed, clear previous selection
      if (!isShiftPressed.current) {
        setSelectedIds([]);
        clearSelection();
      }

      e.preventDefault();
    },
    [
      isActive,
      containerRef,
      collectWidgetPositions,
      isPointInEmptyArea,
      clearSelection,
    ],
  );

  // Handle mouse move
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isSelecting || !startPoint) return;

      setEndPoint({ x: e.clientX, y: e.clientY });

      const intersectingIds = checkIntersection(startPoint, {
        x: e.clientX,
        y: e.clientY,
      });

      if (isShiftPressed.current) {
        setSelectedIds((prev) => {
          const newSelection = [...prev];

          intersectingIds.forEach((id) => {
            if (!newSelection.includes(id)) {
              newSelection.push(id);
            }
          });

          return newSelection;
        });
      } else {
        setSelectedIds(intersectingIds);
      }
    },
    [isSelecting, startPoint, checkIntersection],
  );

  // Handle mouse up
  const handleMouseUp = useCallback(() => {
    if (!isSelecting) return;

    setIsSelecting(false);

    setStartPoint(null);
    setEndPoint(null);

    if (onSelectionChange) {
      onSelectionChange(selectedIds);
    }
  }, [isSelecting, selectedIds, onSelectionChange]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Shift") {
      isShiftPressed.current = true;

      document.body.classList.add("shift-pressed");
    }
  }, []);

  const handleKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === "Shift") {
      isShiftPressed.current = false;

      document.body.classList.remove("shift-pressed");
    }
  }, []);

  const handleWidgetClick = useCallback(
    (e: MouseEvent) => {
      if (!isActive || !isShiftPressed.current) return;

      const target = e.target as HTMLElement;
      const widgetElement = target.closest("[data-widget-id]");

      if (widgetElement) {
        const widgetId = widgetElement.getAttribute("data-widget-id");
        if (widgetId) {
          addSelectedWidget(widgetId);
          e.stopPropagation();
          e.preventDefault();
        }
      }
    },
    [isActive, addSelectedWidget],
  );

  useEffect(() => {
    if (!isActive) return;

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    document.addEventListener("click", handleWidgetClick, true);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      document.removeEventListener("click", handleWidgetClick, true);
    };
  }, [
    isActive,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleKeyDown,
    handleKeyUp,
    handleWidgetClick,
  ]);

  return {
    startPoint,
    endPoint,
    isSelecting,
    selectedIds,
    setSelectedIds,
    isShiftPressed: isShiftPressed.current,
  };
}
