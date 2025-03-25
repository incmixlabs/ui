// main.ts

import { addRxPlugin, createRxDatabase } from "rxdb"
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode"
import {
  type TaskCollections,
  type TaskDocType,
  columnSchemaLiteral,
  projectSchemaLiteral,
  taskSchemaLiteral,
  formProjectSchemaLiteral,
} from "./types"

import { API } from "@incmix/utils/env"
import { getRxStorageIndexedDB } from "rxdb-premium/plugins/storage-indexeddb"
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema"
import { replicateRxCollection } from "rxdb/plugins/replication"
import { RxDBUpdatePlugin } from "rxdb/plugins/update"
import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv"
addRxPlugin(RxDBUpdatePlugin)
addRxPlugin(RxDBMigrationSchemaPlugin)

if (import.meta.env.MODE === "development") {
  addRxPlugin(RxDBDevModePlugin)
}

const storage = wrappedValidateAjvStorage({ storage: getRxStorageIndexedDB() })

export const database = await createRxDatabase<TaskCollections>({
  storage,
  name: "incmix-db",
})

await database.addCollections({
  tasks: { schema: taskSchemaLiteral, autoMigrate: true },
  columns: { schema: columnSchemaLiteral, autoMigrate: true },
  projects: { schema: projectSchemaLiteral, autoMigrate: true },
  formProjects: { schema: formProjectSchemaLiteral, autoMigrate: true },
})

const BFF_API_URL: string = import.meta.env["VITE_BFF_API_URL"] || ""
const TASKS_API_URL = `${BFF_API_URL}${API.TASKS}`

if (database.tasks) {
  replicateRxCollection<TaskDocType, { updatedAt: number; id: string }>({
    collection: database.tasks,
    replicationIdentifier: "tasks",
    live: false,
    push: {
      async handler(changeRows) {
        console.log("replicating tasks")
        try {
          const rawResponse = await fetch(`${TASKS_API_URL}/sync/push`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(changeRows),
          })

          if (!rawResponse.ok) {
            console.error(
              `Push replication failed: ${rawResponse.status} ${rawResponse.statusText}`
            )
            throw new Error(`Push replication failed: ${rawResponse.status}`)
          }

          const conflictsArray = await rawResponse.json()
          return conflictsArray
        } catch (error) {
          console.error("Error during push replication:", error)
          throw error // Re-throw to let RxDB handle the error
        }
      },
    },
    pull: {
      async handler(checkpointOrNull, _batchSize) {
        console.log(checkpointOrNull)
        try {
          const checkPoint = checkpointOrNull ? checkpointOrNull.updatedAt : 0

          const response = await fetch(
            `${TASKS_API_URL}/sync/pull?lastPulledAt=${checkPoint}`,
            {
              method: "POST",
              credentials: "include",
            }
          )

          if (!response.ok) {
            console.error(
              `Pull replication failed: ${response.status} ${response.statusText}`
            )
            throw new Error(`Pull replication failed: ${response.status}`)
          }

          const data = await response.json()
          if (!data || !data.documents) {
            console.error(
              "Invalid data format received during pull replication"
            )
            throw new Error("Invalid data format received")
          }

          return {
            documents: data.documents,
            checkpoint: data.checkpoint,
          }
        } catch (error) {
          console.error("Error during pull replication:", error)
          throw error // Re-throw to let RxDB handle the error
        }
      },
    },
  })
}
