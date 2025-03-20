// main.ts

import { addRxPlugin, createRxDatabase } from "rxdb"
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode"
import {
  type TaskCollections,
  type TaskDocType,
  columnSchemaLiteral,
  projectSchemaLiteral,
  taskSchemaLiteral,
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
        const rawResponse = await fetch(`${TASKS_API_URL}/sync/push`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(changeRows),
        })
        const conflictsArray = await rawResponse.json()
        return conflictsArray
      },
    },
    pull: {
      async handler(checkpointOrNull, _batchSize) {
        console.log(checkpointOrNull)
        const checkPoint = checkpointOrNull ? checkpointOrNull.updatedAt : 0

        const response = await fetch(
          `${TASKS_API_URL}/sync/pull?lastPulledAt=${checkPoint}`,
          {
            method: "POST",
            credentials: "include",
          }
        )
        const data = await response.json()
        return {
          documents: data.documents,
          checkpoint: data.checkpoint,
        }
      },
    },
  })
}
