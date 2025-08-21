export const DEFAULT_LABELS = [
  // Status labels
  {
    name: "To Do",
    color: "#FBBF24", // Yellow
    type: "status",
    order: 0,
    description: "Tasks that need to be started",
  },
  {
    name: "In Progress",
    color: "#3B82F6", // Blue
    type: "status",
    order: 1,
    description: "Tasks currently being worked on",
  },
  {
    name: "Done",
    color: "#10B981", // Green
    type: "status",
    order: 2,
    description: "Completed tasks",
  },
  // Priority labels
  {
    name: "Low",
    color: "#6B7280", // Gray
    type: "priority",
    order: 0,
    description: "Low priority tasks",
  },
  {
    name: "Medium",
    color: "#F97316", // Orange
    type: "priority",
    order: 1,
    description: "Medium priority tasks",
  },
  {
    name: "High",
    color: "#EF4444", // Red
    type: "priority",
    order: 2,
    description: "High priority tasks",
  },
]
