// main.ts

import { addRxPlugin, createRxDatabase } from "rxdb"
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode"
import {
  type TaskCollections,
  type TaskDocType,
  columnSchemaLiteral,
  dashboardSchemaLiteral,
  dashboardTemplateSchemaLiteral,
  formProjectSchemaLiteral,
  projectSchemaLiteral,
  taskSchemaLiteral,
  taskStatusSchemaLiteral,
} from "./types"

import { getRxStorageIndexedDB } from "rxdb-premium/plugins/storage-indexeddb"
import { RxDBAttachmentsPlugin } from "rxdb/plugins/attachments"
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema"
import { RxDBUpdatePlugin } from "rxdb/plugins/update"
import { wrappedValidateZSchemaStorage } from "rxdb/plugins/validate-z-schema"
import { initializeDefaultData } from "../hooks/use-initialize-default-data"
import { resetDatabase } from "./db-reset"

addRxPlugin(RxDBUpdatePlugin)
addRxPlugin(RxDBMigrationSchemaPlugin)
addRxPlugin(RxDBAttachmentsPlugin)

if (import.meta.env.MODE === "development") {
  addRxPlugin(RxDBDevModePlugin)
}

const DB_NAME = "incmix-db"
// Database version is tracked in each schema literal

// This flag can be set to true when you need to reset the database
// due to incompatible schema changes
const FORCE_DB_RESET = false

// Reset the database if needed
if (FORCE_DB_RESET) {
  try {
    await resetDatabase(DB_NAME)
    console.log("Database was reset due to schema changes")
    // After resetting in development, we can turn off the force reset
    // to avoid repeatedly clearing data during development
    if (import.meta.env.MODE === "development") {
      console.info(
        "Set FORCE_DB_RESET to false after validating schema changes"
      )
    }
  } catch (error) {
    console.error("Failed to reset database:", error)
  }
}

const storage = wrappedValidateZSchemaStorage({
  storage: getRxStorageIndexedDB(),
})

// Create and export the database instance
export const database = await createRxDatabase<TaskCollections>({
  storage,
  name: DB_NAME,
  options: {
    allowSlowCount: true, // Helps with development
  },
})

// Add all collections with migration strategies where needed
await database.addCollections({
  tasks: {
    schema: taskSchemaLiteral,
    autoMigrate: true,
    migrationStrategies: {
      // Handle migration from version 0 to 1
      1: (oldDoc: any) => {
        return {
          ...oldDoc,
          // Renamed: taskOrder -> order
          order: oldDoc.taskOrder !== undefined ? oldDoc.taskOrder : 0,
          // Ensure labelsTags has correct structure
          labelsTags: Array.isArray(oldDoc.labelsTags)
            ? oldDoc.labelsTags.map((tag: any) => ({
                value: tag.value || "",
                label: tag.label || "",
                color: tag.color || "#6366f1",
              }))
            : [],
          // Ensure attachments has correct structure
          attachments: Array.isArray(oldDoc.attachments || oldDoc.attachment)
            ? (oldDoc.attachments || oldDoc.attachment).map((att: any) => ({
                id: att.id || crypto.randomUUID(),
                name: att.name || "",
                url: att.url || "",
                size: att.size || "0",
                type: att.type || "",
              }))
            : [],
          // Add/ensure other fields with defaults
          priority: oldDoc.priority || "medium",
          completed: oldDoc.completed === undefined ? false : oldDoc.completed,
          comments: oldDoc.comments || 0,
        }
      },
    },
  },
  taskStatus: { schema: taskStatusSchemaLiteral, autoMigrate: true },
  columns: { schema: columnSchemaLiteral, autoMigrate: true },
  projects: { schema: projectSchemaLiteral, autoMigrate: true },
  formProjects: { schema: formProjectSchemaLiteral, autoMigrate: true },
  dashboardTemplates: {
    schema: dashboardTemplateSchemaLiteral,
    autoMigrate: true,
  },
  dashboards: {
    schema: dashboardSchemaLiteral,
    autoMigrate: true,
  },
})

// Initialize default data (only if collections are empty)
// This creates default task statuses and sample tasks
try {
  await initializeDefaultData({
    projectId: "default-project", // Change to your desired default project ID
    statusesOnly: false, // Set to true if you only want task statuses without sample tasks
  })
  console.log("Default data initialized successfully")
} catch (error) {
  console.error("Error initializing default data:", error)
  // Don't throw - we should continue even if data initialization fails
}
