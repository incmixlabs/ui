import { API } from "@incmix/utils/env"
import { replicateRxCollection } from "rxdb/plugins/replication"
import type { RxIncmixDatabase, TaskDocType } from "../types"

const BFF_API_URL: string = import.meta.env["VITE_BFF_API_URL"] || ""
const RXDB_API_URL = `${BFF_API_URL}${API.RXDB_SYNC}`
export const startTaskReplication = (database: RxIncmixDatabase) =>
  replicateRxCollection<TaskDocType, { updatedAt: number; id: string }>({
    collection: database.tasks,
    replicationIdentifier: "tasks",
    live: true,
    push: {
      async handler(changeRows) {
        console.log("replicating tasks")
        try {
          const rawResponse = await fetch(`${RXDB_API_URL}/tasks/push`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ changeRows }),
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
        try {
          const checkPoint = checkpointOrNull ? checkpointOrNull.updatedAt : 0

          const response = await fetch(
            `${RXDB_API_URL}/tasks/pull?lastPulledAt=${checkPoint}`,
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
