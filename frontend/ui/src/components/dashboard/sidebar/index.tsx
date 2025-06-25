import {
  Badge,
  Box,
  Button,
  DropdownMenu,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  LayoutPresetsSection,
  ScrollArea,
  cn,
  dashboardImg,
  useSelectionStore,
} from "@incmix/ui";
import {
  ActiveTask,
  NewTasks,
  PostingTask,
  ProjectTimelineWidgets,
  ProjectWidgets2,
  StatisticWidgets2,
  TotalProject,
  TotalTasks,
} from "@incmix/ui/widgets";
import { useEffect, useMemo, useState } from "react";
import { DraggableComponent } from "./draggable-component";
import { ChevronDown, ChevronUp, Filter, Minus, Plus, Search, X } from "lucide-react";
import { TemplatesSidebar } from "./templates";
import { useLocation, useParams } from "@tanstack/react-router";
import { useTemplateStore } from "@incmix/store";

export const sidebarComponents = [

  {
    slotId: "i",
    component: <NewTasks />,
    componentName: "new-tasks",
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
    componentName: "total-tasks",
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
    componentName: "project-widget",
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
    componentName: "statistic-widget",
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
    componentName: "active-task",
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
    componentName: "total-project",
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
    componentName: "posting-task",
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
  {
    slotId: "o",
    component: <ProjectTimelineWidgets />,
    componentName: "project-timeline",
    compImage: dashboardImg?.newTaskImg,
    title: "Project Timeline",
    tags: ["project", "timeline", "summary", "project-timeline"],
    layouts: {
      lg: { w: 8, h: 20 },
      md: { w: 8, h: 20 },
      sm: { w: 8, h: 20 },
      xs: { w: 8, h: 20 },
      xxs: { w: 8, h: 20 },
    },
  },
];

interface DashboardSidebarProps {
  isEditing?: boolean;
}

export function DashboardSidebar({ isEditing = true }: DashboardSidebarProps) {
  const { pathname } = useLocation();
  let projectId: string | null = null;
  try {
    if (pathname !== "/dashboard/home") {
      const params = useParams({ from: "/dashboard/$projectId" });
      projectId = params.projectId;
    }else{
      projectId = "home";
    }
  } catch (error) {
    projectId = null;
  }

  const { selectedWidgets, clearSelection } =
    useSelectionStore();
    
  const {
    templates,
    initialized,
    initialize,
    deleteTemplate,
    getTemplateById,
    templateActive,
  } = useTemplateStore();
  
  const [availableComponents] = useState(sidebarComponents);
  const [_draggingComponentId, setDraggingComponentId] = useState<
    string | null
  >(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<
    "widgets" | "templates" | "both"
  >("both");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const [isWidgetExpanded, setIsWidgetExpanded] = useState(false);
  const [isTemplateExpanded, setIsTemplateExpanded] = useState(false);

  useEffect(() => {
    if (!initialized && projectId) {
      initialize(projectId);
    }
  }, [initialized, initialize, projectId]);



// Filtered templates or empty if filterType excludes templates
const filteredTemplates = useMemo(() => {
  if (filterType === "widgets") return [];

  const query = searchQuery.toLowerCase().trim();

  return templates.filter((template) => {
    const matchesSearch =
      !query ||
      template.templateName.toLowerCase().includes(query) ||
      template.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesTag = !selectedTag || template.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });
}, [templates, searchQuery, selectedTag, filterType]);

const filteredWidgets = useMemo(() => {
  if (filterType === "templates") return [];

  const query = searchQuery.toLowerCase().trim();

  return availableComponents.filter((comp) => {
    const matchesSearch =
      !query ||
      comp.title.toLowerCase().includes(query) ||
      comp.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesTag = !selectedTag || comp.tags.includes(selectedTag);

    return matchesSearch && matchesTag;
  });
}, [availableComponents, searchQuery, selectedTag, filterType]);

useEffect(() => {
  const userSearchedOrFiltered = !!searchQuery.trim() || !!selectedTag;

  if (userSearchedOrFiltered) {
    if (filterType === "both") {
      setIsTemplateExpanded(filteredTemplates.length > 0);
      setIsWidgetExpanded(filteredWidgets.length > 0);
    } else if (filterType === "widgets") {
      setIsTemplateExpanded(false);
      setIsWidgetExpanded(filteredWidgets.length > 0);
    } else if (filterType === "templates") {
      setIsTemplateExpanded(filteredTemplates.length > 0);
      setIsWidgetExpanded(false);
    }
  } else {
    // no search/tag interaction
    if (filterType === "widgets") {
      setIsTemplateExpanded(false);
      setIsWidgetExpanded(true);
    } else if (filterType === "templates") {
      setIsTemplateExpanded(true);
      setIsWidgetExpanded(false);
    } else {
      setIsTemplateExpanded(false);
      setIsWidgetExpanded(false);
    }
  }
}, [searchQuery, selectedTag, filterType, filteredTemplates, filteredWidgets]);


  

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    templates.forEach((t) => t.tags.forEach(tagSet.add, tagSet));
    availableComponents.forEach((w) => w.tags.forEach(tagSet.add, tagSet));
    return Array.from(tagSet);
  }, [templates, availableComponents]);


  const handleDragStart = (componentId: string) => {
    setDraggingComponentId(componentId);
  };

  const handleDragEnd = () => {
    setDraggingComponentId(null);
  };

  return (
    <Box className="h-screen bg-gray-3">
      <ScrollArea className="h-full p-2">
        <Flex align={"center"} gap="2" className="mb-4">
          <Box className=" relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 w-full bg-gray-1"
            />
          </Box>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <IconButton
                variant="solid"
              >
                <Filter size={16} />
                <span className="sr-only">Filter</span>
              </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="w-48 rounded-lg">
              <DropdownMenu.Item onClick={() => setFilterType("both")} className={filterType === "both" ? "bg-indigo-600 text-white" : ""}>
                <span>All</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => setFilterType("widgets")} className={filterType === "widgets" ? "bg-indigo-600 text-white" : ""}>
                <span>Widgets</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={() => setFilterType("templates")} className={filterType === "templates" ? "bg-indigo-600 text-white" : ""}>
                <span>Templates</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Flex>
        <Flex className="w-60" align={"center"} justify={"between"}>
          {allTags.length > 0 && (
            <ScrollArea
              type="hover"
              scrollbars="horizontal"
              className=" shrink-0 w-52 pb-3 h-fit"
            >
              <Flex gap={"2"}>
                {allTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedTag === tag ? "solid" : "outline"}
                    className={cn(
                      "cursor-pointer",
                      selectedTag === tag &&
                        "bg-primary text-primary-foreground",
                    )}
                    onClick={() =>
                      setSelectedTag(selectedTag === tag ? null : tag)
                    }
                  >
                    {tag}
                  </Badge>
                ))}
              </Flex>
            </ScrollArea>
          )}
              <IconButton
                variant="soft"
                color="red"
                onClick={() => {
                  setSearchQuery("");
                  setFilterType("both");
                  setSelectedTag(null);
                }}
                className="-translate-y-1.5 translate-x-2"
              >
                <X size={16} />
                <span className="sr-only">Filter</span>
              </IconButton>
   
        </Flex>

        <Box
          className={`bg-gray-1 p-2 mt-2 rounded-xl overflow-hidden ${
            isWidgetExpanded ? 'max-h-full' : 'max-h-20'
          } relative border border-gray-6 transition-all duration-300 `}
        >
          <Flex justify="between" align="center">
            <Heading size="2" className=" font-medium">
              Components/Widgets
            </Heading>
            <Button
              variant="ghost"
              color="gray"
              onClick={() => setIsWidgetExpanded(!isWidgetExpanded)}
              className="hover:bg-transparent"
            >
              {isWidgetExpanded ? <ChevronUp /> : <ChevronDown />}
              <Box as="span" className="sr-only">
                {isWidgetExpanded ? "Collapse Widgets" : "Expand Widgets"}
              </Box>
            </Button>
          </Flex>
          {isWidgetExpanded && (
            <>
              {filteredWidgets.length === 0 ? (
                <Box className="text-center py-4 mt-2 text-muted-foreground">
                  No components match your search
                </Box>
              ) : (
                <Grid columns={"2"} gap="2" className="relative mt-2">
                  {filteredWidgets.map((comp) => (
                    <div key={comp.slotId} className="relative">
                      <DraggableComponent
                        id={comp.slotId}
                        title={comp.title}
                        image={comp.compImage}
                        component={comp.component}
                        componentName={comp.componentName}
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
            </>
          )}
        </Box>

        <TemplatesSidebar
        filteredTemplates={filteredTemplates}
          templates={templates}
          deleteTemplate={deleteTemplate}
          templateActive={templateActive}
          getTemplateById={getTemplateById}
          isTemplateExpanded={isTemplateExpanded}
          setIsTemplateExpanded={setIsTemplateExpanded}
        />
        <LayoutPresetsSection />
      </ScrollArea>
    </Box>
  );
}