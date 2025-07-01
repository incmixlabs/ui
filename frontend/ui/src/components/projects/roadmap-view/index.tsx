import { Box, Heading } from "@incmix/ui";
import { DateTime } from "luxon";
import { GanttChart, type Task } from "./components/gantt-chart";
import { useTableView } from "@/components/kanban-board/table";
const tasks: Task[] = [
  {
    id: "1",
    name: "Planning",
    startDate: DateTime.now().minus({ days: 5 }),
    endDate: DateTime.now().minus({ days: 1 }),
    progress: 100,
    color: "green",
    subtasks: [
      {
        id: "1.1",
        name: "Requirements Gathering",
        startDate: DateTime.now().minus({ days: 5 }),
        endDate: DateTime.now().minus({ days: 3 }),
        progress: 100,
        color: "green",
      },
      {
        id: "1.2",
        name: "Stakeholder Approval",
        startDate: DateTime.now().minus({ days: 3 }),
        endDate: DateTime.now().minus({ days: 1 }),
        progress: 100,
        color: "green",
      },
    ],
  },
  {
    id: "2",
    name: "Wireframing",
    startDate: DateTime.now().minus({ days: 4 }),
    endDate: DateTime.now().plus({ days: 1 }),
    progress: 100,
    color: "blue",
    subtasks: [
      {
        id: "2.1",
        name: "Low-fidelity Wireframes",
        startDate: DateTime.now().minus({ days: 4 }),
        endDate: DateTime.now().minus({ days: 2 }),
        progress: 100,
        color: "blue",
      },
      {
        id: "2.2",
        name: "High-fidelity Wireframes",
        startDate: DateTime.now().minus({ days: 2 }),
        endDate: DateTime.now().plus({ days: 1 }),
        progress: 100,
        color: "blue",
      },
    ],
  },
  {
    id: "3",
    name: "Design",
    startDate: DateTime.now().minus({ days: 2 }),
    endDate: DateTime.now().plus({ days: 5 }),
    progress: 60,
    color: "red",
    subtasks: [
      {
        id: "3.1",
        name: "Typography Finalization",
        startDate: DateTime.now().minus({ days: 1 }),
        endDate: DateTime.now().plus({ days: 2 }),
        progress: 100,
        color: "red",
      },
      {
        id: "3.2",
        name: "Color Palette",
        startDate: DateTime.now().minus({ days: 1 }),
        endDate: DateTime.now().plus({ days: 3 }),
        progress: 80,
        color: "red",
      },
      {
        id: "3.3",
        name: "Mockup",
        startDate: DateTime.now().plus({ days: 1 }),
        endDate: DateTime.now().plus({ days: 4 }),
        progress: 25,
        color: "red",
      },
      {
        id: "3.4",
        name: "User Interface",
        startDate: DateTime.now().plus({ days: 2 }),
        endDate: DateTime.now().plus({ days: 5 }),
        progress: 50,
        color: "red",
      },
      {
        id: "3.5",
        name: "Font Research",
        startDate: DateTime.now().plus({ days: 3 }),
        endDate: DateTime.now().plus({ days: 5 }),
        progress: 100,
        color: "red",
      },
    ],
  },
  {
    id: "4",
    name: "Development",
    startDate: DateTime.now().plus({ days: 3 }),
    endDate: DateTime.now().plus({ days: 10 }),
    progress: 0,
    color: "orange",
    subtasks: [
      {
        id: "4.1",
        name: "Frontend Implementation",
        startDate: DateTime.now().plus({ days: 3 }),
        endDate: DateTime.now().plus({ days: 8 }),
        progress: 0,
        color: "orange",
      },
      {
        id: "4.2",
        name: "Backend Integration",
        startDate: DateTime.now().plus({ days: 5 }),
        endDate: DateTime.now().plus({ days: 10 }),
        progress: 0,
        color: "orange",
      },
    ],
  },
  {
    id: "5",
    name: "Testing",
    startDate: DateTime.now().plus({ days: 8 }),
    endDate: DateTime.now().plus({ days: 12 }),
    progress: 0,
    color: "purple",
    subtasks: [
      {
        id: "5.1",
        name: "Unit Testing",
        startDate: DateTime.now().plus({ days: 8 }),
        endDate: DateTime.now().plus({ days: 10 }),
        progress: 0,
        color: "purple",
      },
      {
        id: "5.2",
        name: "Integration Testing",
        startDate: DateTime.now().plus({ days: 10 }),
        endDate: DateTime.now().plus({ days: 12 }),
        progress: 0,
        color: "purple",
      },
    ],
  },
  {
    id: "6",
    name: "Apps",
    startDate: DateTime.now().minus({ days: 5 }),
    endDate: DateTime.now().plus({ days: 5 }),
    progress: 60,
    color: "blue",
  },
];

export function RoadmapView({
  projectId = "default-project",
}: {
  projectId: string;
}) {
  return (
    <Box className="py-5">
      <GanttChart projectTasks={tasks} />
    </Box>
  );
}
