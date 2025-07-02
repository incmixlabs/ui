import {
  type DefaultDataOptions,
  DEFAULT_LABELS
} from "@incmix/utils/schema"
import type { TaskCollections, LabelDocType, TaskDocType } from "../sql/types"
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

// DefaultDataOptions is imported from @incmix/utils/schema

/**
 * Initializes default labels (status and priority) and optional sample tasks
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
    // Initialize status and priority labels if needed
    const labels = await initializeLabels(
      db,
      projectId,
      now,
      defaultUser,
      options.forceLabelCreation
    )

    // Only initialize tasks if not in labelsOnly mode and we have labels
    if (!options.labelsOnly && labels.length > 0) {
      await initializeTasks(db, projectId, labels, now, defaultUser)
    }
  } catch (error) {
    console.error("Error initializing default data:", error)
    throw new Error(
      `Failed to initialize default data: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}

/**
 * Creates default labels for statuses and priorities if none exist for the project
 */
async function initializeLabels(
  db: TaskCollections,
  projectId: string,
  timestamp: number,
  user: { id: string; name: string; image: string },
  forceCreation = false
): Promise<LabelDocType[]> {
  // Use the labels collection instead of taskStatus
  const labelCollection = db.labels

  // Check if labels already exist for this project
  const existingLabels = await labelCollection
    .find({
      selector: { projectId },
    })
    .exec()

  if (existingLabels.length === 0 || forceCreation) {
    console.log("Creating default status and priority labels...")

    // Create both status and priority labels based on DEFAULT_LABELS
    const defaultLabels = DEFAULT_LABELS.map(label => ({
      id: generateBrowserUniqueId(label.type === "status" ? "st" : "pr"),
      projectId,
      type: label.type as "status" | "priority", // Ensure proper typing
      name: label.name,
      color: label.color,
      order: label.order,
      description: label.description,
      createdAt: timestamp,
      updatedAt: timestamp,
      createdBy: user,
      updatedBy: user,
    }));

    const insertedLabels = await Promise.all(
      defaultLabels.map((label) => labelCollection.insert(label))
    )

    console.log(
      `Created ${insertedLabels.length} default labels successfully.`
    )
    return insertedLabels
  }

  console.log(
    `${existingLabels.length} labels already exist for project. Skipping creation.`
  )
  return existingLabels
}

/**
 * Creates sample tasks if none exist for the project
 */
async function initializeTasks(
  db: TaskCollections,
  projectId: string,
  labels: LabelDocType[],
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

    // Find the "To Do" status and "Medium" priority labels
    const todoStatus = labels.find((l) => l.type === "status" && l.name === "To Do") || 
      labels.find((l) => l.type === "status") || labels[0]
    
    const mediumPriority = labels.find((l) => l.type === "priority" && l.name === "Medium") ||
      labels.find((l) => l.type === "priority") || 
      // If no priority labels exist, use a status label as fallback
      labels[0]

    /**
     * Helper function to create a fully typed TaskDocType from partial data
     * This ensures all required fields are present and properly typed
     * @throws Error if required fields are missing
     */
    function createTaskDoc(input: Partial<TaskDocType>): TaskDocType {
      // Validate required fields are present
      if (
        !input.id ||
        !input.projectId ||
        !input.name ||
        !input.statusId ||
        !input.priorityId ||
        !input.taskOrder
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
        projectId: input.projectId,
        name: input.name,
        statusId: input.statusId,
        priorityId: input.priorityId,
        taskOrder: input.taskOrder,

        // Fields with defaults
        startDate: input.startDate ?? timestamp,
        endDate: input.endDate ?? timestamp + 604800000, // One week later
        description: input.description ?? "",
        completed: input.completed ?? false,
        acceptanceCriteria: input.acceptanceCriteria ?? [],
        checklist: input.checklist ?? [],
        refUrls: input.refUrls ?? [],
        labelsTags: input.labelsTags ?? [],
        attachments: input.attachments ?? [],
        assignedTo: input.assignedTo ?? [],
        subTasks: input.subTasks ?? [],
        comments: input.comments ?? [],

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
        projectId,
        name: "Project setup",
        statusId: todoStatus.id,
        priorityId: mediumPriority.id, // Use the medium priority we found
        taskOrder: 0,
        startDate: timestamp,
        endDate: timestamp + 604800000, // One week later
        description: "Set up the initial project repository and documentation",
        completed: false,
        labelsTags: [{ value: "setup", label: "Setup", color: "#818cf8" }],
        attachments: [],
        assignedTo: [],
        subTasks: [
          {
            id: generateBrowserUniqueId("sub"),
            name: "Create README",
            completed: false,
            order: 0,
          },
          {
            id: generateBrowserUniqueId("sub"),
            name: "Set up folder structure",
            completed: false,
            order: 1,
          },
        ],
        comments: [],
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: user,
        updatedBy: user,
      },
      {
        id: generateBrowserUniqueId("task"),
        projectId,
        name: "Design user interface",
        statusId: todoStatus.id,
        priorityId: mediumPriority.id,
        taskOrder: 1,
        startDate: timestamp,
        endDate: timestamp + 1209600000, // Two weeks later
        description:
          "Create wireframes and mockups for the main application screens",
        completed: false,
        labelsTags: [{ value: "design", label: "Design", color: "#f472b6" }],
        attachments: [],
        assignedTo: [],
        subTasks: [],
        comments: [],
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: user,
        updatedBy: user,
      },
      {
        id: generateBrowserUniqueId("task"),
        projectId,
        name: "Kickoff meeting",
        statusId: todoStatus.id,
        priorityId: mediumPriority.id,
        taskOrder: 2,
        startDate: timestamp,
        endDate: timestamp + 172800000, // Two days later
        description:
          "Schedule and conduct project kickoff meeting with stakeholders",
        completed: false,
        labelsTags: [],
        attachments: [],
        assignedTo: [],
        subTasks: [],
        comments: [],
        createdAt: timestamp,
        updatedAt: timestamp,
        createdBy: user,
        updatedBy: user,
      },
    ]

    try {
      await Promise.all(
        sampleTasks.map(async (taskData) => {
          // Convert the partial to a fully typed document
          const fullTaskDoc = createTaskDoc(taskData)
          // Insert the task
          return await tasksCollection.insert(fullTaskDoc)
        })
      )
      console.log(`Created ${sampleTasks.length} sample tasks successfully.`)
    } catch (error) {
      console.error("Error creating sample tasks:", error)
      throw new Error(
        `Failed to create sample tasks: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  } else {
    console.log(
      `${existingTasks.length} tasks already exist for project. Skipping creation.`
    )
  }
}
