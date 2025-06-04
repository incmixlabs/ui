import { database } from "../sql"
import { generateUniqueId, getCurrentTimestamp } from "../sql/helper"
import type {
  TaskCollections,
  TaskDocType,
  TaskStatusDocType,
} from "../sql/types"

/**
 * Creates a default user for audit fields when no real user data is available
 * Should be replaced with actual user authentication data in production
 */
const getDefaultUser = () => ({
  id: "system-default",
  name: "System",
  image: "/placeholder-avatar.png",
})

export interface DefaultDataOptions {
  projectId?: string
  statusesOnly?: boolean
  forceStatusCreation?: boolean
}

/**
 * Initializes default task statuses and optional sample tasks
 * Only creates data if the respective collections are empty
 * @param options Configuration options
 * @returns Promise that resolves when initialization is complete
 */
export async function initializeDefaultData(
  options: DefaultDataOptions = {}
): Promise<void> {
  const projectId = options.projectId || "default-project"
  const now = getCurrentTimestamp()
  const defaultUser = getDefaultUser()

  try {
    // Initialize task statuses if needed
    const statuses = await initializeTaskStatuses(
      database,
      projectId,
      now,
      defaultUser,
      options.forceStatusCreation
    )

    // Only initialize tasks if not in statusesOnly mode and we have statuses
    if (!options.statusesOnly && statuses.length > 0) {
      await initializeTasks(database, projectId, statuses, now, defaultUser)
    }
  } catch (error) {
    console.error("Error initializing default data:", error)
    throw new Error(
      `Failed to initialize default data: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

/**
 * Creates default task statuses if none exist for the project
 */
async function initializeTaskStatuses(
  db: TaskCollections,
  projectId: string,
  timestamp: number,
  user: { id: string; name: string; image: string },
  forceCreation = false
): Promise<TaskStatusDocType[]> {
  const taskStatusCollection = db.taskStatus

  // Check if task statuses already exist for this project
  const existingStatuses = await taskStatusCollection
    .find({
      selector: { projectId },
    })
    .exec()

  if (existingStatuses.length === 0 || forceCreation) {
    console.log("Creating default task statuses...")

    const defaultTaskStatuses = [
      {
        id: generateUniqueId("ts"),
        projectId,
        name: "To Do",
        color: "#6366f1", // Indigo
        order: 0,
        description: "Tasks to be started",
        isDefault: true,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: user,
        updatedBy: user,
      },
      {
        id: generateUniqueId("ts"),
        projectId,
        name: "In Progress",
        color: "#f97316", // Orange
        order: 1,
        description: "Tasks currently being worked on",
        isDefault: false,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: user,
        updatedBy: user,
      },
      {
        id: generateUniqueId("ts"),
        projectId,
        name: "Done",
        color: "#10b981", // Emerald
        order: 2,
        description: "Completed tasks",
        isDefault: false,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: user,
        updatedBy: user,
      },
    ]

    const insertedStatuses = await Promise.all(
      defaultTaskStatuses.map((status) => taskStatusCollection.insert(status))
    )

    console.log(
      `Created ${insertedStatuses.length} default task statuses successfully.`
    )
    return insertedStatuses
  }

  console.log(
    `${existingStatuses.length} task statuses already exist for project. Skipping creation.`
  )
  return existingStatuses
}

/**
 * Creates sample tasks if none exist for the project
 */
async function initializeTasks(
  db: TaskCollections,
  projectId: string,
  statuses: TaskStatusDocType[],
  timestamp: number,
  user: { id: string; name: string; image: string }
): Promise<void> {
  const tasksCollection = db.tasks

  // Check if tasks already exist for this project
  const existingTasks = await tasksCollection
    .find({
      selector: { projectId },
    })
    .exec()

  if (existingTasks.length === 0) {
    console.log("Creating sample tasks...")

    // Find the "To Do" status, or use the first status if not found
    const todoStatus = statuses.find((s) => s.name === "To Do") || statuses[0]

    // Create properly typed sample tasks
    const sampleTasks = [
      {
        id: generateUniqueId("task"),
        taskId: generateUniqueId("tsk"),
        projectId,
        name: "Project setup",
        columnId: todoStatus.id,
        order: 0,
        startDate: new Date().toISOString(),
        endDate: "",
        description: "Set up the initial project repository and documentation",
        completed: false,
        priority: "high",
        labelsTags: [{ value: "setup", label: "Setup", color: "#818cf8" }],
        attachments: [],
        assignedTo: [],
        subTasks: [
          {
            id: generateUniqueId("sub"),
            name: "Create README",
            completed: false,
          },
          {
            id: generateUniqueId("sub"),
            name: "Set up folder structure",
            completed: false,
          },
        ],
        comments: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: user,
        updatedBy: user,
      },
      {
        id: generateUniqueId("task"),
        taskId: generateUniqueId("tsk"),
        projectId,
        name: "Design user interface",
        columnId: todoStatus.id,
        order: 1,
        startDate: new Date().toISOString(),
        endDate: "",
        description:
          "Create wireframes and mockups for the main application screens",
        completed: false,
        priority: "medium",
        labelsTags: [{ value: "design", label: "Design", color: "#f472b6" }],
        attachments: [],
        assignedTo: [],
        subTasks: [],
        comments: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: user,
        updatedBy: user,
      },
      {
        id: generateUniqueId("task"),
        taskId: generateUniqueId("tsk"),
        projectId,
        name: "Kickoff meeting",
        columnId: todoStatus.id,
        order: 2,
        startDate: new Date().toISOString(),
        endDate: "",
        description:
          "Schedule and conduct project kickoff meeting with stakeholders",
        completed: false,
        priority: "urgent",
        labelsTags: [{ value: "meeting", label: "Meeting", color: "#fbbf24" }],
        attachments: [],
        assignedTo: [],
        subTasks: [],
        comments: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: user,
        updatedBy: user,
      },
    ]

    // Specific type assertion for each task to ensure TypeScript is happy
    for (const task of sampleTasks) {
      await tasksCollection.insert(task as unknown as TaskDocType)
    }

    console.log(`Created ${sampleTasks.length} sample tasks successfully.`)
    return
  }

  console.log(
    `${existingTasks.length} tasks already exist for project. Skipping creation.`
  )
}
