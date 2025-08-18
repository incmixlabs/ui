// Storybook dummy data that matches RxDB schema structure exactly
// This ensures components work with real data types in Storybook

import type { KanbanColumn } from "./types"

export interface LabelData {
  id: string
  projectId: string
  type: "status" | "priority"
  name: string
  color: string
  order: number
  description: string
  createdAt: number
  updatedAt: number
  createdBy: {
    id: string
    name: string
    image?: string
  }
  updatedBy: {
    id: string
    name: string
    image?: string
  }
}

export interface TaskData {
  id: string
  projectId: string
  name: string
  statusId: string
  priorityId: string
  parentTaskId: string | null
  isSubtask: boolean
  taskOrder: number
  startDate?: number
  endDate?: number
  description: string
  acceptanceCriteria: Array<{
    id: string
    text: string
    checked: boolean
    order: number
  }>
  checklist: Array<{
    id: string
    text: string
    checked: boolean
    order: number
  }>
  completed: boolean
  refUrls: Array<{
    id: string
    url: string
    title?: string
    type: "figma" | "task" | "external"
    taskId?: string
  }>
  labelsTags: Array<{
    value: string
    label: string
    color: string
  }>
  attachments: Array<{
    id: string
    name: string
    url: string
    size: string
    type?: string
  }>
  assignedTo: Array<{
    id: string
    name: string
    image?: string
  }>
  subTasks: Array<{
    id: string
    name: string
    completed: boolean
    order: number
  }>
  comments: Array<{
    id: string
    content: string
    createdAt: number
    createdBy: {
      id: string
      name: string
      image?: string
    }
  }>
  createdAt: number
  updatedAt: number
  createdBy: {
    id: string
    name: string
    image?: string
  }
  updatedBy: {
    id: string
    name: string
    image?: string
  }
}

// Base timestamp for consistent relative dates
const baseTime = Date.now()
const dayMs = 86400000 // 1 day in milliseconds
const hourMs = 3600000 // 1 hour in milliseconds

// Common user data
const users = {
  john: {
    id: "user-john",
    name: "John Doe",
    image: "/api/placeholder/32/32",
  },
  jane: {
    id: "user-jane",
    name: "Jane Smith",
    image: "/api/placeholder/32/32",
  },
  mike: {
    id: "user-mike",
    name: "Mike Johnson",
    image: "/api/placeholder/32/32",
  },
}

// Status Labels (columns)
export const mockStatusLabels: LabelData[] = [
  {
    id: "status-todo",
    projectId: "storybook-project",
    type: "status",
    name: "To Do",
    color: "#6b7280",
    order: 0,
    description: "Tasks that are ready to be started",
    createdAt: baseTime - 3 * dayMs,
    updatedAt: baseTime - 2 * hourMs,
    createdBy: users.john,
    updatedBy: users.john,
  },
  {
    id: "status-inprogress",
    projectId: "storybook-project",
    type: "status",
    name: "In Progress",
    color: "#3b82f6",
    order: 1,
    description: "Tasks currently being worked on",
    createdAt: baseTime - 3 * dayMs,
    updatedAt: baseTime - 2 * hourMs,
    createdBy: users.john,
    updatedBy: users.john,
  },
  {
    id: "status-review",
    projectId: "storybook-project",
    type: "status",
    name: "Review",
    color: "#f59e0b",
    order: 2,
    description: "Tasks ready for review",
    createdAt: baseTime - 3 * dayMs,
    updatedAt: baseTime - 2 * hourMs,
    createdBy: users.john,
    updatedBy: users.john,
  },
  {
    id: "status-done",
    projectId: "storybook-project",
    type: "status",
    name: "Done",
    color: "#10b981",
    order: 3,
    description: "Completed tasks",
    createdAt: baseTime - 3 * dayMs,
    updatedAt: baseTime - 2 * hourMs,
    createdBy: users.john,
    updatedBy: users.john,
  },
]

// Priority Labels
export const mockPriorityLabels: LabelData[] = [
  {
    id: "priority-low",
    projectId: "storybook-project",
    type: "priority",
    name: "Low",
    color: "#10b981",
    order: 0,
    description: "Low priority tasks",
    createdAt: baseTime - 3 * dayMs,
    updatedAt: baseTime - 2 * hourMs,
    createdBy: users.john,
    updatedBy: users.john,
  },
  {
    id: "priority-medium",
    projectId: "storybook-project",
    type: "priority",
    name: "Medium",
    color: "#f59e0b",
    order: 1,
    description: "Medium priority tasks",
    createdAt: baseTime - 3 * dayMs,
    updatedAt: baseTime - 2 * hourMs,
    createdBy: users.john,
    updatedBy: users.john,
  },
  {
    id: "priority-high",
    projectId: "storybook-project",
    type: "priority",
    name: "High",
    color: "#ef4444",
    order: 2,
    description: "High priority tasks",
    createdAt: baseTime - 3 * dayMs,
    updatedAt: baseTime - 2 * hourMs,
    createdBy: users.john,
    updatedBy: users.john,
  },
  {
    id: "priority-urgent",
    projectId: "storybook-project",
    type: "priority",
    name: "Urgent",
    color: "#dc2626",
    order: 3,
    description: "Urgent priority tasks",
    createdAt: baseTime - 3 * dayMs,
    updatedAt: baseTime - 2 * hourMs,
    createdBy: users.john,
    updatedBy: users.john,
  },
]

// Mock Tasks
export const mockTasks: TaskData[] = [
  // To Do Tasks
  {
    id: "task-1",
    projectId: "storybook-project",
    name: "Design System Documentation",
    statusId: "status-todo",
    priorityId: "priority-high",
    parentTaskId: null,
    isSubtask: false,
    taskOrder: 0,
    startDate: baseTime + dayMs,
    endDate: baseTime + 5 * dayMs,
    description:
      "Create comprehensive documentation for the design system including components, patterns, and guidelines.",
    acceptanceCriteria: [
      {
        id: "ac-1",
        text: "All components documented with examples",
        checked: false,
        order: 0,
      },
      {
        id: "ac-2",
        text: "Usage guidelines written",
        checked: false,
        order: 1,
      },
    ],
    checklist: [
      {
        id: "cl-1",
        text: "Research existing documentation",
        checked: true,
        order: 0,
      },
      {
        id: "cl-2",
        text: "Create documentation structure",
        checked: false,
        order: 1,
      },
    ],
    completed: false,
    refUrls: [
      {
        id: "ref-1",
        url: "https://www.figma.com/design/example",
        title: "Design System Mockups",
        type: "figma",
      },
    ],
    labelsTags: [
      {
        value: "documentation",
        label: "Documentation",
        color: "#8b5cf6",
      },
      {
        value: "design",
        label: "Design",
        color: "#ec4899",
      },
    ],
    attachments: [],
    assignedTo: [users.jane, users.mike],
    subTasks: [
      {
        id: "subtask-1",
        name: "Component library audit",
        completed: true,
        order: 0,
      },
      {
        id: "subtask-2",
        name: "Write component specs",
        completed: false,
        order: 1,
      },
    ],
    comments: [
      {
        id: "comment-1",
        content:
          "Started working on the component audit. Found several components that need better documentation.",
        createdAt: baseTime - 2 * hourMs,
        createdBy: users.jane,
      },
    ],
    createdAt: baseTime - 2 * dayMs,
    updatedAt: baseTime - hourMs,
    createdBy: users.john,
    updatedBy: users.jane,
  },
  {
    id: "task-2",
    projectId: "storybook-project",
    name: "API Integration Tests",
    statusId: "status-todo",
    priorityId: "priority-medium",
    parentTaskId: null,
    isSubtask: false,
    taskOrder: 1,
    description: "Write comprehensive integration tests for all API endpoints.",
    acceptanceCriteria: [],
    checklist: [],
    completed: false,
    refUrls: [],
    labelsTags: [
      {
        value: "backend",
        label: "Backend",
        color: "#06b6d4",
      },
      {
        value: "testing",
        label: "Testing",
        color: "#84cc16",
      },
    ],
    attachments: [
      {
        id: "att-1",
        name: "api-spec.json",
        url: "/files/api-spec.json",
        size: "24KB",
        type: "application/json",
      },
    ],
    assignedTo: [users.mike],
    subTasks: [],
    comments: [],
    createdAt: baseTime - dayMs,
    updatedAt: baseTime - dayMs,
    createdBy: users.john,
    updatedBy: users.john,
  },

  // In Progress Tasks
  {
    id: "task-3",
    projectId: "storybook-project",
    name: "User Dashboard Redesign",
    statusId: "status-inprogress",
    priorityId: "priority-high",
    parentTaskId: null,
    isSubtask: false,
    taskOrder: 0,
    startDate: baseTime - dayMs,
    endDate: baseTime + 3 * dayMs,
    description:
      "Redesign the user dashboard with improved UX and modern design patterns.",
    acceptanceCriteria: [
      {
        id: "ac-3",
        text: "Responsive design works on all devices",
        checked: true,
        order: 0,
      },
      {
        id: "ac-4",
        text: "Accessibility standards met",
        checked: false,
        order: 1,
      },
    ],
    checklist: [
      {
        id: "cl-3",
        text: "Create wireframes",
        checked: true,
        order: 0,
      },
      {
        id: "cl-4",
        text: "Implement responsive layout",
        checked: true,
        order: 1,
      },
      {
        id: "cl-5",
        text: "Add accessibility features",
        checked: false,
        order: 2,
      },
    ],
    completed: false,
    refUrls: [
      {
        id: "ref-2",
        url: "https://www.figma.com/design/dashboard-redesign",
        title: "Dashboard Redesign Mockups",
        type: "figma",
      },
      {
        id: "ref-3",
        url: "https://example.com/inspiration",
        title: "Design Inspiration",
        type: "external",
      },
    ],
    labelsTags: [
      {
        value: "frontend",
        label: "Frontend",
        color: "#3b82f6",
      },
      {
        value: "ux",
        label: "UX",
        color: "#f59e0b",
      },
    ],
    attachments: [],
    assignedTo: [users.jane],
    subTasks: [
      {
        id: "subtask-3",
        name: "Mobile layout optimization",
        completed: false,
        order: 0,
      },
    ],
    comments: [
      {
        id: "comment-2",
        content:
          "The responsive layout is looking great! Just need to finish the accessibility improvements.",
        createdAt: baseTime - 4 * hourMs,
        createdBy: users.john,
      },
      {
        id: "comment-3",
        content:
          "Added focus states and improved keyboard navigation. Testing with screen readers next.",
        createdAt: baseTime - 2 * hourMs,
        createdBy: users.jane,
      },
    ],
    createdAt: baseTime - 3 * dayMs,
    updatedAt: baseTime - 2 * hourMs,
    createdBy: users.john,
    updatedBy: users.jane,
  },

  // Review Tasks
  {
    id: "task-4",
    projectId: "storybook-project",
    name: "Payment Integration",
    statusId: "status-review",
    priorityId: "priority-urgent",
    parentTaskId: null,
    isSubtask: false,
    taskOrder: 0,
    startDate: baseTime - 5 * dayMs,
    endDate: baseTime - dayMs,
    description:
      "Integrate Stripe payment system with proper error handling and security measures.",
    acceptanceCriteria: [
      {
        id: "ac-5",
        text: "All payment flows tested",
        checked: true,
        order: 0,
      },
      {
        id: "ac-6",
        text: "Error handling implemented",
        checked: true,
        order: 1,
      },
      {
        id: "ac-7",
        text: "Security review passed",
        checked: false,
        order: 2,
      },
    ],
    checklist: [],
    completed: false,
    refUrls: [],
    labelsTags: [
      {
        value: "backend",
        label: "Backend",
        color: "#06b6d4",
      },
      {
        value: "payment",
        label: "Payment",
        color: "#f59e0b",
      },
      {
        value: "security",
        label: "Security",
        color: "#ef4444",
      },
    ],
    attachments: [],
    assignedTo: [users.mike],
    subTasks: [],
    comments: [
      {
        id: "comment-4",
        content:
          "Payment integration is complete and tested. Ready for security review.",
        createdAt: baseTime - 6 * hourMs,
        createdBy: users.mike,
      },
    ],
    createdAt: baseTime - 7 * dayMs,
    updatedAt: baseTime - 6 * hourMs,
    createdBy: users.john,
    updatedBy: users.mike,
  },

  // Done Tasks
  {
    id: "task-5",
    projectId: "storybook-project",
    name: "Login System Upgrade",
    statusId: "status-done",
    priorityId: "priority-medium",
    parentTaskId: null,
    isSubtask: false,
    taskOrder: 0,
    startDate: baseTime - 10 * dayMs,
    endDate: baseTime - 3 * dayMs,
    description:
      "Upgrade authentication system with 2FA and improved security features.",
    acceptanceCriteria: [
      {
        id: "ac-8",
        text: "2FA implementation working",
        checked: true,
        order: 0,
      },
      {
        id: "ac-9",
        text: "Password reset flow updated",
        checked: true,
        order: 1,
      },
    ],
    checklist: [
      {
        id: "cl-6",
        text: "Implement 2FA with TOTP",
        checked: true,
        order: 0,
      },
      {
        id: "cl-7",
        text: "Update password reset emails",
        checked: true,
        order: 1,
      },
      {
        id: "cl-8",
        text: "Add session management",
        checked: true,
        order: 2,
      },
    ],
    completed: true,
    refUrls: [],
    labelsTags: [
      {
        value: "security",
        label: "Security",
        color: "#ef4444",
      },
      {
        value: "auth",
        label: "Authentication",
        color: "#8b5cf6",
      },
    ],
    attachments: [],
    assignedTo: [users.mike],
    subTasks: [],
    comments: [
      {
        id: "comment-5",
        content:
          "All security features implemented and tested successfully. Great work!",
        createdAt: baseTime - 3 * dayMs,
        createdBy: users.john,
      },
    ],
    createdAt: baseTime - 12 * dayMs,
    updatedAt: baseTime - 3 * dayMs,
    createdBy: users.john,
    updatedBy: users.mike,
  },
]

// Combined labels for convenience
export const mockLabels: LabelData[] = [
  ...mockStatusLabels,
  ...mockPriorityLabels,
]

// Transform schema data to KanbanColumn format for stories
export function transformToKanbanColumns(
  statusLabels: LabelData[],
  tasks: TaskData[]
): KanbanColumn[] {
  return statusLabels
    .sort((a, b) => a.order - b.order)
    .map((status) => {
      const columnTasks = tasks
        .filter((task) => task.statusId === status.id)
        .sort((a, b) => a.taskOrder - b.taskOrder)
        .map((task) => ({
          ...task,
          // Ensure compatibility with KanbanTask interface
          completed: task.completed ?? false,
          priorityId: task.priorityId,
        }))

      const completedTasksCount = columnTasks.filter(
        (task) => task.completed
      ).length
      const totalTasksCount = columnTasks.length
      const progressPercentage =
        totalTasksCount > 0
          ? Math.round((completedTasksCount / totalTasksCount) * 100)
          : 0

      return {
        id: status.id,
        projectId: status.projectId,
        name: status.name,
        color: status.color,
        order: status.order,
        description: status.description,
        isDefault: status.order === 0,
        createdAt: status.createdAt,
        updatedAt: status.updatedAt,
        createdBy: status.createdBy,
        updatedBy: status.updatedBy,
        tasks: columnTasks,
        completedTasksCount,
        totalTasksCount,
        progressPercentage,
      }
    })
}

// Export for use in Storybook
export const storybookData = {
  labels: mockLabels,
  statusLabels: mockStatusLabels,
  priorityLabels: mockPriorityLabels,
  tasks: mockTasks,
  projectId: "storybook-project",
  // Pre-transformed data for convenience
  kanbanColumns: transformToKanbanColumns(mockStatusLabels, mockTasks),
}
