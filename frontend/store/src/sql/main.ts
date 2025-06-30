// main.ts

import {
  columnSchemaLiteral,
  dashboardSchemaLiteral,
  dashboardTemplateSchemaLiteral,
  formProjectSchemaLiteral,
  projectSchemaLiteral,
  taskSchemaLiteral,
  taskStatusSchemaLiteral,
} from "@incmix/utils/schema"
import { addRxPlugin, createRxDatabase } from "rxdb"
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode"

import { getRxStorageIndexedDB } from "rxdb-premium/plugins/storage-indexeddb"
import { RxDBAttachmentsPlugin } from "rxdb/plugins/attachments"
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema"
import { RxDBUpdatePlugin } from "rxdb/plugins/update"
import { wrappedValidateZSchemaStorage } from "rxdb/plugins/validate-z-schema"
import { initializeDefaultData } from "../hooks/use-initialize-default-data"
import type { TaskCollections } from "./types"

addRxPlugin(RxDBUpdatePlugin)
addRxPlugin(RxDBMigrationSchemaPlugin)
addRxPlugin(RxDBAttachmentsPlugin)

if (import.meta.env.MODE === "development") {
  addRxPlugin(RxDBDevModePlugin)
}
export async function resetDatabase(
  databaseName = "incmix-db"
): Promise<boolean> {
  try {
    // Request to delete the entire database
    const deleteRequest = indexedDB.deleteDatabase(databaseName)

    return new Promise((resolve, reject) => {
      deleteRequest.onsuccess = () => {
        console.log(`Database ${databaseName} successfully deleted`)
        resolve(true)
      }

      deleteRequest.onerror = () => {
        console.error(`Error deleting database ${databaseName}`)
        reject(new Error("Failed to delete database"))
      }

      // Handle edge case where db is being blocked
      deleteRequest.onblocked = () => {
        console.warn(`Database ${databaseName} deletion was blocked`)
        // We still resolve with false to indicate it wasn't fully successful
        resolve(false)
      }
    })
  } catch (error) {
    console.error("Error in resetDatabase:", error)
    return false
  }
}
type LocalDatabaseOptions = {
  forceReset?: boolean
  dbName?: string
  options?: any
}
const defaultDatabaseOptions: LocalDatabaseOptions = {
  forceReset: false,
  dbName: "incmix-db",
  options: {
    allowSlowCount: true, // Helps with development
  },
}
// https://adamcoster.com/blog/async-constructors
export class LocalDatabase {
  /** @protected */
  private force_reset: boolean
  private db_name: string
  public database: any
  private options: any
  public reset: () => Promise<void>
  constructor(options: LocalDatabaseOptions = {}) {
    const newOptions = { ...defaultDatabaseOptions, ...options }
    this.force_reset = !!newOptions.forceReset
    this.db_name =
      newOptions.dbName ?? defaultDatabaseOptions.dbName ?? "incmix-db"
    this.options = newOptions.options ?? defaultDatabaseOptions.options
    this.reset = async () => {
      try {
        await resetDatabase(this.db_name)
        console.log("Database reset successfully")
        if (import.meta.env.MODE === "development") {
          console.info(
            "Set FORCE_DB_RESET to false after validating schema changes"
          )
        }
      } catch (error) {
        console.error("Error resetting database:", error)
      }
    }
  }
  public get forceReset() {
    return this.force_reset
  }
  /** @protected */
  async init() {
    // You could do this with a private property name, since that *does*
    // work in JavaScript. (e.g. `async #init(){}`). However that makes
    // class extension trickier, so personally I just use JSDoc to flag it
    // as protected and rely on the Typescript language server to keep me
    // out of trouble.
    if (this.force_reset) {
      // Reset the database if forceReset is true
      await this.reset()
    }
    const storage = wrappedValidateZSchemaStorage({
      storage: getRxStorageIndexedDB(),
    })
    this.database = await createRxDatabase({
      storage: storage,
      name: this.db_name,
      closeDuplicates: true,
      options: this.options,
    })
    await this.database.addCollections({
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
              attachments: Array.isArray(
                oldDoc.attachments || oldDoc.attachment
              )
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
              completed:
                oldDoc.completed === undefined ? false : oldDoc.completed,
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
      await initializeDefaultData(this.database, {
        projectId: "default-project", // Change to your desired default project ID
        statusesOnly: false, // Set to true if you only want task statuses without sample tasks
      })
      console.log("Default data initialized successfully")
    } catch (error) {
      console.error("Error initializing default data:", error)
      // Don't throw - we should continue even if data initialization fails
    }
  }
  static async create() {
    const db = new LocalDatabase()
    await db.init()
    return db
  }
}

export const db = await LocalDatabase.create()
export const database = db.database as TaskCollections
