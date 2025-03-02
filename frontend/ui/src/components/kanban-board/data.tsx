import { KanbanImages } from "./images"

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
    avatarSrc: KanbanImages.user1,
    color: "orange",

  },
  {
    value: "jacob-hawkins",
    label: "Jacob Hawkins",
    avatarSrc: KanbanImages.user2,
    color: "blue",

  },
  {
    value: "jane-wilson",
    label: "Jane Wilson",
    avatarSrc: KanbanImages.user1,
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
