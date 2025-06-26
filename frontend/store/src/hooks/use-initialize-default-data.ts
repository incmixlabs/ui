import type {
  TaskCollections,
  TaskDocType,
  TaskStatusDocType,
} from "../sql/types"
// Import browser-compatible helpers instead of Node.js Buffer-using ones
import {
  generateBrowserUniqueId,
  getCurrentTimestamp,
} from "../utils/browser-helpers"

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
  db: TaskCollections,
  options: DefaultDataOptions = {}
): Promise<void> {
  const projectId = options.projectId || "default-project"
  const now = getCurrentTimestamp()
  const defaultUser = getDefaultUser()

  try {
    // Initialize task statuses if needed
    const statuses = await initializeTaskStatuses(
      db,
      projectId,
      now,
      defaultUser,
      options.forceStatusCreation
    )

    // Only initialize tasks if not in statusesOnly mode and we have statuses
    if (!options.statusesOnly && statuses.length > 0) {
      await initializeTasks(db, projectId, statuses, now, defaultUser)
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
): Promise<any[]> {
  // Change return type to any[] to accommodate RxDocument objects
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
        id: generateBrowserUniqueId("ts"),
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
        id: generateBrowserUniqueId("ts"),
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
        id: generateBrowserUniqueId("ts"),
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
    // Find status by name, handling both RxDocument and plain objects safely
    const todoStatus =
      statuses.find((s) => {
        // Check if it's a string property directly or via an rx method
        return (s.name as string) === "To Do"
      }) || statuses[0]

    /**
     * Helper function to create a fully typed TaskDocType from partial data
     * This ensures all required fields are present and properly typed
     * @throws Error if required fields are missing
     */
    function createTaskDoc(input: Partial<TaskDocType>): TaskDocType {
      // Validate required fields are present
      if (
        !input.id ||
        !input.taskId ||
        !input.projectId ||
        !input.name ||
        !input.columnId
      ) {
        throw new Error(
          `Missing required fields for task: ${JSON.stringify(input)}`
        )
      }

      if (
        !input.createdAt ||
        !input.updatedAt ||
        !input.createdBy ||
        !input.updatedBy
      ) {
        throw new Error(
          `Missing required audit fields for task: ${JSON.stringify(input)}`
        )
      }

      // Create the fully typed task document with all required fields and defaults
      return {
        // Required fields (now validated above)
        id: input.id,
        taskId: input.taskId,
        projectId: input.projectId,
        name: input.name,
        columnId: input.columnId,

        // Fields with defaults
        order: input.order ?? 0,
        startDate: input.startDate ?? new Date().toISOString(),
        endDate: input.endDate ?? "",
        description: input.description ?? "",
        completed: input.completed ?? false,
        priority: input.priority ?? ("medium" as const),
        labelsTags: input.labelsTags ?? [],
        attachments: input.attachments ?? [],
        assignedTo: input.assignedTo ?? [],
        subTasks: input.subTasks ?? [],
        comments: input.comments ?? [],
        commentsCount: input.commentsCount ?? 0,

        // Audit fields (now validated above)
        createdAt: input.createdAt,
        updatedAt: input.updatedAt,
        createdBy: input.createdBy,
        updatedBy: input.updatedBy,
      }
    }

    // Define sample tasks with proper typing
    const sampleTasks: Partial<TaskDocType>[] = [
      {
        id: generateBrowserUniqueId("task"),
        taskId: generateBrowserUniqueId("tsk"),
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
            id: generateBrowserUniqueId("sub"),
            name: "Create README",
            completed: false,
          },
          {
            id: generateBrowserUniqueId("sub"),
            name: "Set up folder structure",
            completed: false,
          },
        ],
        comments: [],
        commentsCount: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: user,
        updatedBy: user,
      },
      {
        id: generateBrowserUniqueId("task"),
        taskId: generateBrowserUniqueId("tsk"),
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
        comments: [],
        commentsCount: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: user,
        updatedBy: user,
      },
      {
        id: generateBrowserUniqueId("task"),
        taskId: generateBrowserUniqueId("tsk"),
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
        comments: [],
        commentsCount: 0,
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: user,
        updatedBy: user,
      },
    ]

    // Insert tasks using the helper function to ensure type safety
    for (const taskData of sampleTasks) {
      await tasksCollection.insert(createTaskDoc(taskData))
    }

    console.log(`Created ${sampleTasks.length} sample tasks successfully.`)
    return
  }

  console.log(
    `${existingTasks.length} tasks already exist for project. Skipping creation.`
  )
}
