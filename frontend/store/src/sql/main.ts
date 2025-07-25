import {
  dashboardSchemaLiteral,
  dashboardTemplateSchemaLiteral,
  formProjectSchemaLiteral,
  labelSchemaLiteral,
  projectSchemaLiteral,
  taskSchemaLiteral,
} from "@incmix/utils/schema"
import { nanoid } from "nanoid"
import { addRxPlugin, createRxDatabase } from "rxdb"
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode"
// main.ts
import { replicateRxCollection } from "rxdb/plugins/replication"
import { organizationStore } from "../services/organizations"

import { API } from "@incmix/utils/env"
import { getRxStorageIndexedDB } from "rxdb-premium/plugins/storage-indexeddb"
import { RxDBAttachmentsPlugin } from "rxdb/plugins/attachments"
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema"
import { RxDBUpdatePlugin } from "rxdb/plugins/update"
import { wrappedValidateZSchemaStorage } from "rxdb/plugins/validate-z-schema"
import { initializeDefaultData } from "../hooks/use-initialize-default-data"
import type { TaskCollections, TaskDocType } from "./types"

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
      formProjects: {
        schema: formProjectSchemaLiteral,
        autoMigrate: true,
        migrationStrategies: {
          1: (oldDoc: Record<string, any>) => {
            // Get the current organization ID from localStorage
            let orgId = ""
            try {
              const orgStore = localStorage.getItem("organization-store")
              if (orgStore) {
                const orgData = JSON.parse(orgStore)
                orgId = orgData?.state?.selectedOrganisation?.id
                if (orgId) {
                  console.log("Migration: Found organization ID:", orgId)
                }
              }
            } catch (error) {
              console.error(
                "Migration: Error getting organization ID from store:",
                error
              )
            }

            // If we still don't have an orgId, try to get from Zustand store directly
            // This is critical since orgId is required by the schema
            if (!orgId) {
              // Try to get from Zustand store directly
              const selectedOrg = organizationStore.getState().selectedOrganisation
              orgId = selectedOrg?.id || ""
              
              // If still no orgId, use a more descriptive fallback with a unique ID
              if (!orgId) {
                orgId = oldDoc.id?.slice(0, 15) || `migration-${nanoid(10)}`
                console.warn(
                  `Migration: No orgId found for project ${oldDoc.id}, using generated fallback: ${orgId}`
                )
              }
            }

            // Add organization ID to the document
            console.log(
              `Migration: Migrating project ${oldDoc.id} to version 1 with orgId: ${orgId}`
            )
            return {
              ...oldDoc,
              orgId: orgId,
            }
          },
        },
      },
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
export const database = db.database as TaskCollections

// const BFF_API_URL: string = import.meta.env["VITE_BFF_API_URL"] || ""
// const RXDB_API_URL = `${BFF_API_URL}${API.RXDB_SYNC}`
// if (database.tasks) {
//   replicateRxCollection<TaskDocType, { updatedAt: number; id: string }>({
//     collection: database.tasks,
//     replicationIdentifier: "tasks",
//     live: false,
//     push: {
//       async handler(changeRows) {
//         console.log("replicating tasks")
//         try {
//           const rawResponse = await fetch(`${RXDB_API_URL}/tasks/push`, {
//             method: "POST",
//             credentials: "include",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ changeRows }),
//           })

//           if (!rawResponse.ok) {
//             console.error(
//               `Push replication failed: ${rawResponse.status} ${rawResponse.statusText}`
//             )
//             throw new Error(`Push replication failed: ${rawResponse.status}`)
//           }

//           const conflictsArray = await rawResponse.json()
//           return conflictsArray
//         } catch (error) {
//           console.error("Error during push replication:", error)
//           throw error // Re-throw to let RxDB handle the error
//         }
//       },
//     },
//     pull: {
//       async handler(checkpointOrNull, _batchSize) {
//         console.log(checkpointOrNull)
//         try {
//           const checkPoint = checkpointOrNull ? checkpointOrNull.updatedAt : 0

//           const response = await fetch(
//             `${RXDB_API_URL}/tasks/pull?lastPulledAt=${checkPoint}`,
//             {
//               method: "POST",
//               credentials: "include",
//             }
//           )

//           if (!response.ok) {
//             console.error(
//               `Pull replication failed: ${response.status} ${response.statusText}`
//             )
//             throw new Error(`Pull replication failed: ${response.status}`)
//           }

//           const data = await response.json()
//           if (!data || !data.documents) {
//             console.error(
//               "Invalid data format received during pull replication"
//             )
//             throw new Error("Invalid data format received")
//           }

//           return {
//             documents: data.documents,
//             checkpoint: data.checkpoint,
//           }
//         } catch (error) {
//           console.error("Error during pull replication:", error)
//           throw error // Re-throw to let RxDB handle the error
//         }
//       },
//     },
//   })
// }
