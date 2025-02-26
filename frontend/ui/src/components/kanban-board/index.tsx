import { useState } from "react"
import { Board } from "./board"
import { KanbanImages } from "./images"
import type { TCard } from "./types"

type TCustomColumn = {
  id: number
  title: string
  tasks: TCard[]
}

type TCustomBoard = TCustomColumn[]

const initialData: TCustomBoard = [
  {
    id: 1,
    title: "To Do",
    tasks: [
      {
        id: 32,
        name: "Brand Logo Design",
        date: "Jun 17",
        description: "Make a redesign of the logo in corporate colors",
        completed: false,
        daysLeft: 5,
        filesData: [
          { name: "logo.png", url: "", size: "1.2MB" },
          { name: "design.png", url: "", size: "1.2MB" },
        ],
        members: [
          {
            id: 1,
            name: "Bonnie Green",
            src: KanbanImages.user1,
          },
          {
            id: 2,
            name: "Roberta Casas",
            src: KanbanImages.user2,
          },
        ],
      },
      {
        id: 23,
        name: "New Header Image",
        completed: false,
        daysLeft: 22,
        date: "Jun 17",
        attachment: KanbanImages.bg2,
        filesData: [{ name: "preview.png", url: "", size: "1.2MB" }],
        members: [
          {
            id: 2,
            name: "Roberta Casas",
            src: KanbanImages.user2,
          },
        ],
      },
      {
        id: 20,
        name: "Updating Modules",
        completed: false,
        daysLeft: 22,
        date: "Jun 17",
        description: "Step-by-step update of modules.",

        subTasks: [{ name: "sub-tasks-1", progress: 40, completed: false }],
        filesData: [{ name: "preview.png", url: "", size: "1.2MB" }],
        members: [
          {
            id: 1,
            name: "Bonnie Green",
            src: KanbanImages.user2,
          },
          {
            id: 2,
            name: "Roberta Casas",
            src: KanbanImages.user2,
          },
        ],
      },
      {
        id: 24,
        name: "Wireframe for APP",
        description: "Make a wramework for an app for a pre-presentation.",
        completed: false,
        daysLeft: 22,
        date: "Jun 17",
        members: [
          {
            id: 1,
            name: "Bonnie Green",
            src: KanbanImages.user2,
          },
          {
            id: 2,
            name: "Roberta Casas",
            src: KanbanImages.user1,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    tasks: [
      {
        id: 76,
        name: "Updating Modules",
        description: "Step-by-step update of modules.",
        date: "Jun 17",
        filesData: [
          { name: "logo.png", url: "", size: "1.2MB" },
          { name: "design.png", url: "", size: "1.2MB" },
        ],
        completed: false,
        daysLeft: 9,
        subTasks: [{ name: "sub-tasks-1", progress: 40, completed: false }],
        members: [
          {
            id: 1,
            name: "Bonnie Green",
            src: KanbanImages.user1,
          },
          {
            id: 2,
            name: "Roberta Casas",
            src: KanbanImages.user2,
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Done",
    tasks: [
      {
        id: 34,
        name: "New Background",
        completed: true,
        daysLeft: 0,
        date: "Jun 17",
        attachment: KanbanImages.bg1,
        members: [
          {
            id: 1,
            name: "Bonnie Green",
            src: KanbanImages.user1,
          },
        ],
      },
    ],
  },
]

function convertCustomDataToBoardFormat(customData: TCustomBoard) {
  const columns = customData.map((column) => {
    // Convert tasks to cards
    const cards: TCard[] = column.tasks.map((task) => ({
      ...task,
      id: task.id,
    }))

    return {
      id: `column:${column.id}`,
      title: column.title,
      cards,
    }
  })

  return {
    columns,
  }
}
export const KanbanBoard = () => {
  const boardData = convertCustomDataToBoardFormat(initialData)

  return (
    <div className="h-full w-full ">
      <Board initial={boardData} />
    </div>
  )
}
