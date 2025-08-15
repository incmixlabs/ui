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
    checked: false,
  },
  {
    value: "jacob-hawkins",
    label: "Jacob Hawkins",
    avatar: KanbanImages.user2,
    color: "blue",
    checked: false,
  },
  {
    value: "jane-wilson",
    label: "Jane Wilson",
    avatar: KanbanImages.user1,
    color: "green",
    checked: false,
  },
]
export const labelsData = [
  {
    value: "design",
    label: "Design",
    color: "purple",
    checked: true,
  },
  {
    value: "frontend",
    label: "Frontend",
    color: "blue",
    checked: true,
  },
  {
    value: "backend",
    label: "Backend",
    color: "indigo",
    checked: true,
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
    name: "To Do",
    tasks: [
      {
        id: "32",
        name: "Brand Logo Design",
        startDate: new Date("2024-06-17").getTime(),
        description: "Make a redesign of the logo in corporate colors",
        completed: false,
        attachment: [
          { name: "logo.png", url: "", size: "1.2MB" },
          { name: "design.png", url: "", size: "1.2MB" },
        ],
        assignedTo: [
          {
            id: "1",
            name: "Bonnie Green",
            label: "bonnie-green",
            color: "yellow",
            value: "Bonnie Green",
            avatar: KanbanImages.user1,
            checked: false,
          },
          {
            id: "2",
            name: "Roberta Casas",
            label: "roberta-casas",
            color: "green",
            value: "Roberta Casas",
            avatar: KanbanImages.user2,
            checked: false,
          },
        ],
      },
      {
        id: "23",
        name: "New Header Image",
        completed: false,
        startDate: new Date("2024-06-17").getTime(),
        assignedTo: [
          {
            id: "2",
            name: "Roberta Casas",
            label: "roberta-casas",
            color: "green",
            value: "Roberta Casas",
            avatar: KanbanImages.user2,
            checked: false,
          },
        ],
      },
      {
        id: "20",
        name: "Updating Modules",
        completed: false,
        startDate: new Date("2024-06-17").getTime(),
        description: "Step-by-step update of modules.",

        subTasks: [{ name: "sub-tasks-1", progress: 40, completed: false }],
        attachment: [{ name: "preview.png", url: "", size: "1.2MB" }],
        assignedTo: [
          {
            id: "1",
            name: "Bonnie Green",
            label: "bonnie-green",
            color: "yellow",
            value: "Bonnie Green",
            avatar: KanbanImages.user2,
            checked: false,
          },
          {
            id: "2",
            name: "Roberta Casas",
            label: "roberta-casas",
            color: "green",
            value: "Roberta Casas",
            avatar: KanbanImages.user2,
            checked: false,
          },
        ],
      },
      {
        id: "24",
        name: "Wireframe for APP",
        description: "Make a wramework for an app for a pre-presentation.",
        completed: false,
        startDate: new Date("2024-06-17").getTime(),
        assignedTo: [
          {
            id: "1",
            name: "Bonnie Green",
            label: "bonnie-green",
            color: "yellow",
            value: "Bonnie Green",
            avatar: KanbanImages.user2,
            checked: false,
          },
          {
            id: "2",
            name: "Roberta Casas",
            label: "roberta-casas",
            color: "green",
            value: "Roberta Casas",
            avatar: KanbanImages.user1,
            checked: false,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "In Progress",
    tasks: [
      {
        id: "76",
        name: "Updating Modules",
        description: "Step-by-step update of modules.",
        startDate: new Date("2024-06-17").getTime(),
        attachment: [
          { name: "logo.png", url: "", size: "1.2MB" },
          { name: "design.png", url: "", size: "1.2MB" },
        ],
        completed: false,
        subTasks: [{ name: "sub-tasks-1", progress: 40, completed: false }],
        assignedTo: [
          {
            id: "1",
            name: "Bonnie Green",
            label: "bonnie-green",
            color: "yellow",
            value: "Bonnie Green",
            avatar: KanbanImages.user1,
            checked: false,
          },
          {
            id: "2",
            name: "Roberta Casas",
            label: "roberta-casas",
            color: "green",
            value: "Roberta Casas",
            avatar: KanbanImages.user2,
            checked: false,
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Done",
    tasks: [
      {
        id: "34",
        name: "New Background",
        completed: true,
        startDate: new Date("2024-06-17").getTime(),
        attachment: [{ name: "bg1.png", url: KanbanImages.bg1, size: "1.2MB" }],
        assignedTo: [
          {
            id: "1",
            name: "Bonnie Green",
            label: "bonnie-green",
            color: "yellow",
            value: "Bonnie Green",
            avatar: KanbanImages.user1,
            checked: false,
          },
        ],
      },
    ],
  },
]
