import {
  dashboardSchemaLiteral,
  dashboardTemplateSchemaLiteral,
  labelSchemaLiteral,
  projectSchemaLiteral,
  taskSchemaLiteral,
} from "@incmix/utils/schema"
import { addRxPlugin, createRxDatabase } from "rxdb"
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode"
// main.ts

import { getRxStorageIndexedDB } from "rxdb-premium/plugins/storage-indexeddb"
import { RxDBAttachmentsPlugin } from "rxdb/plugins/attachments"
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema"
import { RxDBUpdatePlugin } from "rxdb/plugins/update"
import { wrappedValidateZSchemaStorage } from "rxdb/plugins/validate-z-schema"
import { startLabelsReplication } from "./replication/labels"
import { startProjectsReplication } from "./replication/projects"
import { startTaskReplication } from "./replication/tasks"
import type { RxIncmixDatabase } from "./types"

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
      },
      // Replace taskStatus and columns with the new labels collection
      labels: {
        schema: labelSchemaLiteral,
        autoMigrate: true,
      },
      projects: { schema: projectSchemaLiteral, autoMigrate: true },
      dashboardTemplates: {
        schema: dashboardTemplateSchemaLiteral,
        autoMigrate: true,
      },
      dashboards: {
        schema: dashboardSchemaLiteral,
        autoMigrate: true,
      },
    })

    // Default data initialization is now handled in project-utils.ts
    // when a new project is created, so we don't initialize data here anymore
    console.log(
      "Database initialized successfully - default data will be created when projects are created"
    )
  }
  static async create() {
    const db = new LocalDatabase()
    await db.init()
    return db
  }
}

export const db = await LocalDatabase.create()
export const database = db.database as RxIncmixDatabase

if (database.tasks) {
  startTaskReplication(database)
}
if (database.labels) {
  startLabelsReplication(database)
}
if (database.projects) {
  startProjectsReplication(database)
}
