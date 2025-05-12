import {
  Badge,
  Box,
  Grid,
  Heading,
  Input,
  LayoutPresetsSection,
  ScrollArea,
  dashboardImg,
  useSelectionStore,
} from "@incmix/ui";
import {
  ActiveTask,
  NewTasks,
  PostingTask,
  ProjectWidgets2,
  StatisticWidgets2,
  TotalProject,
  TotalTasks,
} from "@incmix/ui/widgets";
import { useEffect, useMemo, useState } from "react";
import { DraggableComponent } from "./draggable-component";
import { Search } from "lucide-react";
import { TemplatesSidebar } from "./templates";
import { useParams } from "@tanstack/react-router";

export const sidebarComponents = [
  {
    slotId: "i",
    component: <NewTasks />,
    compImage: dashboardImg?.newTaskImg,
    title: "New Tasks",
    tags: ["task", "new", "todo"],
    layouts: {
      lg: { w: 3, h: 14 },
      md: { w: 3, h: 14 },
      sm: { w: 3, h: 14 },
      xs: { w: 3, h: 14 },
      xxs: { w: 3, h: 14 },
    },
  },
  {
    slotId: "h",
    component: <TotalTasks />,
    compImage: dashboardImg?.totalTaskImg,
    title: "Total Tasks",
    tags: ["task", "total", "summary"],
    layouts: {
      lg: { w: 3, h: 14 },
      md: { w: 3, h: 14 },
      sm: { w: 3, h: 14 },
      xs: { w: 3, h: 14 },
      xxs: { w: 3, h: 14 },
    },
  },
  {
    slotId: "j",
    component: <ProjectWidgets2 />,
    compImage: dashboardImg?.ProjectImg,
    title: "Project Widgets",
    tags: ["project", "widget", "summary"],
    layouts: {
      lg: { w: 5, h: 24 },
      md: { w: 5, h: 24 },
      sm: { w: 5, h: 24 },
      xs: { w: 5, h: 24 },
      xxs: { w: 5, h: 24 },
    },
  },
  {
    slotId: "k",
    component: <StatisticWidgets2 />,
    compImage: dashboardImg?.statisticsImg,
    title: "Statistic Widgets",
    tags: ["statistics", "analytics", "data"],
    layouts: {
      lg: { w: 4, h: 22 },
      md: { w: 4, h: 22 },
      sm: { w: 4, h: 22 },
      xs: { w: 4, h: 22 },
      xxs: { w: 4, h: 22 },
    },
  },
  {
    slotId: "l",
    component: <ActiveTask />,
    compImage: dashboardImg?.activeTaskImg,
    title: "Active Task",
    tags: ["task", "active", "ongoing"],
    layouts: {
      lg: { w: 4, h: 22 },
      md: { w: 4, h: 22 },
      sm: { w: 4, h: 22 },
      xs: { w: 4, h: 22 },
      xxs: { w: 4, h: 22 },
    },
  },
  {
    slotId: "m",
    component: <TotalProject />,
    compImage: dashboardImg?.totalProjectImg,
    title: "Total Project",
    tags: ["project", "total", "summary"],
    layouts: {
      lg: { w: 4, h: 22 },
      md: { w: 4, h: 22 },
      sm: { w: 4, h: 22 },
      xs: { w: 4, h: 22 },
      xxs: { w: 4, h: 22 },
    },
  },
  {
    slotId: "n",
    component: <PostingTask />,
    compImage: dashboardImg?.postingTaskImg,
    title: "Posting Task",
    tags: ["task", "posting", "create"],
    layouts: {
      lg: { w: 12, h: 25 },
      md: { w: 12, h: 25 },
      sm: { w: 12, h: 25 },
      xs: { w: 12, h: 25 },
      xxs: { w: 12, h: 25 },
    },
  },
];

interface DashboardSidebarProps {
  isEditing?: boolean;
}

export function DashboardSidebar({ isEditing = true }: DashboardSidebarProps) {
  const { projectId } = useParams({ from: "/dashboard/project/$projectId" });

  const { selectedWidgets, setSelectedWidgets, clearSelection } =
    useSelectionStore();
  const [availableComponents] = useState(sidebarComponents);
  const [_draggingComponentId, setDraggingComponentId] = useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDragStart = (componentId: string) => {
    setDraggingComponentId(componentId);
  };

  const handleDragEnd = () => {
    setDraggingComponentId(null);
  };

  // Filter components based on search query
  const filteredComponents = useMemo(() => {
    if (!searchQuery.trim()) return availableComponents;

    const query = searchQuery.toLowerCase();
    return availableComponents.filter(
      (comp) =>
        comp.title.toLowerCase().includes(query) ||
        comp.tags.some((tag) => tag.toLowerCase().includes(query)),
    );
  }, [availableComponents, searchQuery]);

  return (
    <Box className="h-screen">
      <ScrollArea className="h-full p-2">
          <Heading size={"3"} className="py-2  pt-5 ">
            Components/Widgets{" "}
          </Heading>
          <Box className="mb-4 relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full bg-gray-3"
            />
          </Box>
          {filteredComponents.length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No components match your search
            </div>
          ) : (
            <Grid columns={"2"} gap="2" className="relative">
              {filteredComponents.map((comp) => (
                <div key={comp.slotId} className="relative">
                  <DraggableComponent
                    id={comp.slotId}
                    title={comp.title}
                    image={comp.compImage}
                    component={comp.component}
                    disabled={!isEditing || selectedWidgets.length > 0}
                    onDragStart={() => handleDragStart(comp.slotId)}
                    onDragEnd={handleDragEnd}
                  />
                  {/* <div className="absolute bottom-1 left-1 flex flex-wrap gap-1 max-w-[90%]">
                {comp.tags.map((tag, index) => (
                  <Badge key={index} variant="solid" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div> */}
                </div>
              ))}
            </Grid>
          )}
          <TemplatesSidebar
            projectId={projectId}
            onSelectTemplate={function (templateId: string): void {
              throw new Error("Function not implemented.");
            }}
          />
        <LayoutPresetsSection />
      </ScrollArea>
    </Box>
  );
}
