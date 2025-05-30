import { KanbanImages } from "./images"
import type { TCustomBoard } from "./types"

export const attachments = [
  {
    id: "1",
    name: "Wireframe UI Kit.zip",
    type: "file",
    uploadDate: "15.01.2020 at 11:45",
    size: "5.8 MB",
  },
  {
    id: "2",
    name: "Picture 01.png",
    type: "image",
    uploadDate: "15.01.2020 at 11:50",
    size: "1.2 MB",
    thumbnailUrl: KanbanImages?.attachment4,
  },
  {
    id: "3",
    name: "Picture 02.png",
    type: "image",
    uploadDate: "15.01.2020 at 11:50",
    size: "1.4 MB",
    thumbnailUrl: KanbanImages?.attachment5,
  },
]

export const assignData = [
  {
    value: "regina-cooper",
    label: "Regina Cooper",
    avatar: KanbanImages.user1,
    color: "orange",
  },
  {
    value: "jacob-hawkins",
    label: "Jacob Hawkins",
    avatar: KanbanImages.user2,
    color: "blue",
  },
  {
    value: "jane-wilson",
    label: "Jane Wilson",
    avatar: KanbanImages.user1,
    color: "green",
  },
]
export const labelsData = [
  {
    value: "design",
    label: "Design",
    color: "purple",
  },
  {
    value: "frontend",
    label: "Frontend",
    color: "blue",
  },
  {
    value: "backend",
    label: "Backend",
    color: "indigo",
  },
]

export const commentsData = [
  {
    id: 1,
    user: {
      name: "Jane Wilson",
      avatar: KanbanImages?.user1,
    },
    text: "Hi Cody, any progress on the project? 😊",
    timestamp: "5 min ago",
  },
  {
    id: 2,
    user: {
      name: "Jacob Hawkins",
      avatar: KanbanImages?.user2,
    },
    text: 'Hi Jane!\nYes. I just finished developing the "Chat" template.',
    timestamp: "1 day ago",
    images: [
      KanbanImages?.attachment1,
      KanbanImages?.attachment2,
      KanbanImages?.attachment3,
      KanbanImages?.attachment4,
    ],
  },
  {
    id: 3,
    user: {
      name: "Regina Cooper",
      avatar: KanbanImages?.user1,
    },
    text: "Hi Jacob. Will you be able to finish the last item of the task by tomorrow?",
    timestamp: "5 min ago",
  },
]

export const initialData: TCustomBoard = [
  {
    id: "1",
    title: "To Do",
    tasks: [
      {
        id: "32",
        taskId:"task-idf434",
        name: "Brand Logo Design",
        date: "Jun 17",
        description: "Make a redesign of the logo in corporate colors",
        completed: false,
        daysLeft: 5,
        attachment: [
          { name: "logo.png", url: "", size: "1.2MB" },
          { name: "design.png", url: "", size: "1.2MB" },
        ],
        assignedTo: [
          {
            id: "1",
            name: "Bonnie Green",
            src: KanbanImages.user1,
          },
          {
            id: "2",
            name: "Roberta Casas",
            src: KanbanImages.user2,
          },
        ],
      },
      {
        id: "23",
        taskId:"task-idf435",
        name: "New Header Image",
        completed: false,
        daysLeft: 22,
        date: "Jun 17",
        assignedTo: [
          {
            id: "2",
            name: "Roberta Casas",
            src: KanbanImages.user2,
          },
        ],
      },
      {
        id: "20",
        taskId:"task-idf436",
        name: "Updating Modules",
        completed: false,
        daysLeft: 22,
        date: "Jun 17",
        description: "Step-by-step update of modules.",

        subTasks: [{ name: "sub-tasks-1", progress: 40, completed: false }],
        attachment: [{ name: "preview.png", url: "", size: "1.2MB" }],
        assignedTo: [
          {
            id: "1",
            name: "Bonnie Green",
            src: KanbanImages.user2,
          },
          {
            id: "2",
            name: "Roberta Casas",
            src: KanbanImages.user2,
          },
        ],
      },
      {
        id: "24",
        taskId:"task-idf437",
        name: "Wireframe for APP",
        description: "Make a wramework for an app for a pre-presentation.",
        completed: false,
        daysLeft: 22,
        date: "Jun 17",
        assignedTo: [
          {
            id: "1",
            name: "Bonnie Green",
            src: KanbanImages.user2,
          },
          {
            id: "2",
            name: "Roberta Casas",
            src: KanbanImages.user1,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "In Progress",
    tasks: [
      {
        id: "76",
        taskId:"task-idf438",
        name: "Updating Modules",
        description: "Step-by-step update of modules.",
        date: "Jun 17",
        attachment: [
          { name: "logo.png", url: "", size: "1.2MB" },
          { name: "design.png", url: "", size: "1.2MB" },
        ],
        completed: false,
        daysLeft: 9,
        subTasks: [{ name: "sub-tasks-1", progress: 40, completed: false }],
        assignedTo: [
          {
            id: "1",
            name: "Bonnie Green",
            src: KanbanImages.user1,
          },
          {
            id: "2",
            name: "Roberta Casas",
            src: KanbanImages.user2,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    title: "Done",
    tasks: [
      {
        id: "34",
        taskId:"task-idf434",
        name: "New Background",
        completed: true,
        daysLeft: 0,
        date: "Jun 17",
        attachment: [{ name: "bg1.png", url: KanbanImages.bg1, size: "1.2MB" }],
        assignedTo: [
          {
            id: "1",
            name: "Bonnie Green",
            src: KanbanImages.user1,
          },
        ],
      },
    ],
  },
]
