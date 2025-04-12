import { LoadingPage } from "@common";

import { DashboardLayout } from "@layouts/admin-panel/layout";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../auth";
import { EditWidgetsControl } from "./home";
import type { ReactNode } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
} from "@dnd-kit/sortable";

import {
  Grid,
  ActiveTask,
  DoneTasks,
  DashboardGrid,
  Heading,
  InProgressTask,
  NewTasks,
  PostingTask,
  ProjectWidgets,
  StatisticWidgets,
  TotalTasks,
  Box,
  RecentActivity,
  ProfileSettings,
  CalendarWidget,
  isRectDifferent,
  SortableItem,
} from "@incmix/ui";
interface GridSlot {
  slotId: string;
  colSpan: string;
  className?: string;
}

interface ComponentItem {
  id: string;
  component: ReactNode;
  name: string;
}
const TaskStats = () => {
  return (
    <>
      <Grid columns={"2"} gap="4" className="relative">
        <TotalTasks />
        <NewTasks />
        <InProgressTask />
        <DoneTasks />
      </Grid>
    </>
  );
};
const ProfileCalender = () => {
  return (
    <>
      <ProfileSettings />
      <CalendarWidget storageKey={"calendar_events_dashboard"} />
    </>
  );
};
const COMPONENT_ITEMS: ComponentItem[] = [
  {
    id: "task-stats",
    component: <TaskStats />,
    name: "Task Statistics",
  },
  {
    id: "statistic-widgets",
    component: <StatisticWidgets />,
    name: "Statistics",
  },
  {
    id: "profile-calender",
    component: <ProfileCalender />,
    name: "Profile Calender",
  },
  {
    id: "project-widgets",
    component: <ProjectWidgets />,
    name: "Projects",
  },
  {
    id: "active-task",
    component: <ActiveTask />,
    name: "Active Tasks",
  },
  {
    id: "recent-activity",
    component: <RecentActivity />,
    name: "Recent Activity",
  },
  {
    id: "posting-task",
    component: <PostingTask />,
    name: "Post New Task",
  },
];

const INITIAL_GRID_SLOTS: GridSlot[] = [
  {
    slotId: "slot1",
    colSpan: "xl:col-span-3 col-span-12 2xl:col-span-3",
  },
  {
    slotId: "slot2",
    colSpan: "xl:col-span-6 col-span-12 2xl:col-span-6",
    className: "bg-gray-2",
  },
  {
    slotId: "slot3",
    colSpan: "xl:col-span-3 col-span-12 2xl:col-span-3",
    className: "bg-gray-2",
  },
  {
    slotId: "slot4",
    colSpan: "xl:col-span-3 col-span-12 2xl:col-span-3",
    className: "bg-gray-2",
  },
  {
    slotId: "slot5",
    colSpan: "xl:col-span-6 col-span-12 2xl:col-span-6",
    className: "bg-gray-2",
  },
  {
    slotId: "slot6",
    colSpan: "xl:col-span-3 col-span-12 2xl:col-span-3",
    className: "bg-gray-2",
  },
  {
    slotId: "slot7",
    colSpan: "col-span-12",
    className: "bg-gray-2",
  },
];

const INITIAL_SLOT_MAPPING = {
  slot1: "task-stats",
  slot2: "statistic-widgets",
  slot3: "profile-calender",
  slot4: "project-widgets",
  slot5: "active-task",
  slot6: "recent-activity",
  slot7: "posting-task",
};

const DashboardProject1: React.FC = () => {
  const { t } = useTranslation(["dashboard", "common"]);
  const { authUser, isLoading } = useAuth();
  const [isEditing, setIsEditing] = useState(false);



  const [slotMapping, setSlotMapping] = useState(INITIAL_SLOT_MAPPING);
  const [gridSlots, setGridSlots] = useState<GridSlot[]>(INITIAL_GRID_SLOTS);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [overSlotId, setOverSlotId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [slotDimensions, setSlotDimensions] = useState<Record<string, DOMRect>>(
    {},
  );
  const [previewDimensions, setPreviewDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleMeasure = useCallback((id: string, rect: DOMRect) => {
    setSlotDimensions((prev) => {
      const prevRect = prev[id];
      if (!prevRect || isRectDifferent(prevRect, rect)) {
        return {
          ...prev,
          [id]: rect,
        };
      }
      return prev;
    });
  }, []);

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
    setIsDragging(true);

    if (slotDimensions[event.active.id]) {
      setPreviewDimensions({
        width: slotDimensions[event.active.id].width,
        height: slotDimensions[event.active.id].height,
      });
    }
  };

  const handleDragOver = (event: any) => {
    if (event.over) {
      setOverSlotId(event.over.id);

      if (slotDimensions[event.over.id]) {
        setPreviewDimensions({
          width: slotDimensions[event.over.id].width,
          height: slotDimensions[event.over.id].height,
        });
      }
    } else {
      setOverSlotId(null);

      if (activeId && slotDimensions[activeId]) {
        setPreviewDimensions({
          width: slotDimensions[activeId].width,
          height: slotDimensions[activeId].height,
        });
      }
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      // Get the component IDs for the source and target slots
      const sourceComponentId =
        slotMapping[active.id as keyof typeof slotMapping];
      const targetComponentId =
        slotMapping[over.id as keyof typeof slotMapping];

      // Create a new mapping with the components swapped
      const newMapping = { ...slotMapping };
      newMapping[active.id as keyof typeof slotMapping] = targetComponentId;
      newMapping[over.id as keyof typeof slotMapping] = sourceComponentId;

      // Update the component mapping
      setSlotMapping(newMapping);

      // Swap grid slots configuration
      const newGridSlots = [...gridSlots];
      const sourceIndex = newGridSlots.findIndex(
        (slot) => slot.slotId === active.id,
      );
      const targetIndex = newGridSlots.findIndex(
        (slot) => slot.slotId === over.id,
      );

      if (sourceIndex !== -1 && targetIndex !== -1) {
        // Create copies of the source and target grid slots
        const sourceGridSlot = { ...newGridSlots[sourceIndex] };
        const targetGridSlot = { ...newGridSlots[targetIndex] };

        // Swap the colSpan and className properties
        const tempColSpan = sourceGridSlot.colSpan;
        const tempClassName = sourceGridSlot.className;

        sourceGridSlot.colSpan = targetGridSlot.colSpan;
        sourceGridSlot.className = targetGridSlot.className;

        targetGridSlot.colSpan = tempColSpan;
        targetGridSlot.className = tempClassName;

        // Update the grid slots array
        newGridSlots[sourceIndex] = sourceGridSlot;
        newGridSlots[targetIndex] = targetGridSlot;

        setGridSlots(newGridSlots);
      }
    }

    setActiveId(null);
    setOverSlotId(null);
    setIsDragging(false);
    setPreviewDimensions(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
    setOverSlotId(null);
    setIsDragging(false);
    setPreviewDimensions(null);
  };

  const activeComponentId = activeId
    ? slotMapping[activeId as keyof typeof slotMapping]
    : null;
  const activeComponent = activeComponentId
    ? COMPONENT_ITEMS.find((item) => item.id === activeComponentId)
    : null;
  const activeGridSlot = activeId
    ? gridSlots.find((slot) => slot.slotId === activeId)
    : null;

  const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };
  if (isLoading) return <LoadingPage />;
  if (!authUser) return null;
  return (
    <DashboardLayout
      breadcrumbItems={[]}
      navExtras={<EditWidgetsControl onEditChange={setIsEditing} />}
    >
      <Box as="div" className="container mx-auto overflow-x-hidden">
        <Heading size="6" className="pb-4">
          {t("dashboard:title")}
        </Heading>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <SortableContext items={gridSlots.map((slot) => slot.slotId)}>
            <Grid columns={"12"} gap="4" className="p-4">
              {gridSlots.map((slot) => (
                <Box
                  key={slot.slotId}
                  className={`h-fit ${slot.colSpan} ${slot.className || ""}`}
                >
                  <SortableItem
                    slotId={slot.slotId}
                    componentId={
                      slotMapping[slot.slotId as keyof typeof slotMapping]
                    }
                    components={COMPONENT_ITEMS}
                    gridSlot={slot}
                    isDropTarget={
                      overSlotId === slot.slotId && activeId !== slot.slotId
                    }
                    isDraggingAny={isDragging}
                    onMeasure={handleMeasure}
                    isEditing={isEditing}
                  />
                </Box>
              ))}
            </Grid>
          </SortableContext>
          <DragOverlay dropAnimation={dropAnimation}>
            {activeId && activeComponent && activeGridSlot && isDragging ? (
              <Box
                className="h-full"
                style={{
                  width: previewDimensions?.width || "auto",
                  transition: "width 0.2s ease-in-out",
                }}
              >
                <div className="relative rounded-lg  shadow-lg opacity-80 h-full">
                  {activeComponent.component}
                </div>
              </Box>
            ) : null}
          </DragOverlay>
        </DndContext>
        {/* <DashboardGrid isEditing={isEditing}/> */}
      </Box>
    </DashboardLayout>
  );
};

export default DashboardProject1;
