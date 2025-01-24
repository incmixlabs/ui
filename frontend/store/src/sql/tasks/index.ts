import type { PGliteWithLive } from "@electric-sql/pglite/live"
import { API } from "@incmix/utils/env"

import type {
  DdlSchema,
  DdlVersion,
  Task,
  TaskStatus,
} from "@incmix/utils/types"

import sql, { join } from "sql-template-tag"

export const BFF_API_URL: string = import.meta.env["VITE_BFF_API_URL"] || ""
const TASKS_API_URL = `${BFF_API_URL}${API.TASKS}`
export async function syncSchemaWithBackend(pglite: PGliteWithLive) {
  // Fetch backend schema version and structure
  const response = await fetch(`${TASKS_API_URL}/sync/schema`)
  if (response.status !== 200) return

  const backendSchema = (await response.json()) as {
    version: number
    schema: DdlSchema[]
  }

  // Get local schema version
  const { rows: localSchema } = await pglite.query<DdlVersion>(
    "SELECT version FROM schema_meta ORDER BY updated_at DESC LIMIT 1"
  )

  const localVersion = localSchema.length ? localSchema[0].version : 0

  if (backendSchema.version > localVersion) {
    console.log(
      `Migrating schema from version ${localVersion} to ${backendSchema.version}`
    )
    await migrateSchema(backendSchema.schema, pglite)
    // Update local schema version
    const query = sql`INSERT INTO schema_meta (version) VALUES (${backendSchema.version})`
    await pglite.query(query.text, query.values)
  }
}

async function migrateSchema(schemaDDL: DdlSchema[], pglite: PGliteWithLive) {
  for (const table of schemaDDL) {
    try {
      // Drop and recreate the table if it exists
      await pglite.query(`DROP TABLE IF EXISTS ${table.name}`)
      await pglite.query(convertSqliteToPostgres(table.sql))
      console.log(`Table ${table.name} updated successfully`)
    } catch (err) {
      console.log(convertSqliteToPostgres(table.sql))
      console.error(`Failed to update table ${table.name}:`, err)
    }
  }
}

function convertSqliteToPostgres(sqliteCreateTable: string): string {
  // Replace SQLite-specific data types with PostgreSQL equivalents
  const postgresCreateTable = sqliteCreateTable
    .replace(/\bINTEGER PRIMARY KEY\b/g, "SERIAL PRIMARY KEY") // SQLite's INTEGER PRIMARY KEY is equivalent to SERIAL in PostgreSQL
    .replace(/\bAUTOINCREMENT\b/g, "") // PostgreSQL uses SERIAL instead of AUTOINCREMENT
    .replace(/\bTEXT\b/g, "TEXT") // TEXT in SQLite is often replaced with VARCHAR in PostgreSQL
    .replace(/\bDATETIME\b/g, "TIMESTAMP") // DATETIME in SQLite is equivalent to TIMESTAMP in PostgreSQL
    .replace(/\bBOOLEAN\b/g, "BOOLEAN") // BOOLEAN is supported in both, but ensure it's consistent
    .replace(/\bCURRENT_TIMESTAMP\b/g, "NOW()")

  // Handle any other SQLite-specific syntax or features
  // For example, remove unsupported constraints or features
  // postgresCreateTable = postgresCreateTable.replace(/UNSUPPORTED_FEATURE/g, '')

  return postgresCreateTable
}

type SyncStatus = "pending" | "synced"

type TaskChangeLog = {
  id?: number
  table_name: string
  record_id: string
  sync_status: SyncStatus
  updated_at: string
  operation: "update" | "delete"
}

export async function pushChangesToBackend(pglite: PGliteWithLive) {
  const { rows: pendingChanges } = await pglite.query<TaskChangeLog>(
    "SELECT * FROM tasks_change_log WHERE sync_status = 'pending'"
  )
  if (pendingChanges.length > 0) {
    // const updatedColumnIds = pendingChanges
    //   .filter(
    //     (change) =>
    //       change.table_name === "columns" && change.operation === "update"
    //   )
    //   .map((change) => change.record_id)

    const updatedTaskIds = pendingChanges
      .filter(
        (change) =>
          change.table_name === "tasks" && change.operation === "update"
      )
      .map((change) => change.record_id)

    // const colQuery = sql`select * from columns where id in (${join(updatedColumnIds)})`

    // const { rows: updatedColumns } = await pglite.query<Column>(
    //   colQuery.text,
    //   colQuery.values
    // )

    const tasksQuery = sql`select * from tasks where id in (${join(updatedTaskIds)})`

    const { rows: updatedTasks } = await pglite.query<Record<string, string>>(
      tasksQuery.text,
      tasksQuery.values
    )

    const deletedColumns = pendingChanges
      .filter(
        (change) =>
          change.table_name === "columns" && change.operation === "delete"
      )
      .map((change) => change.record_id)
    const deletedTasks = pendingChanges
      .filter(
        (change) =>
          change.table_name === "columns" && change.operation === "delete"
      )
      .map((change) => change.record_id)

    const changesToPush = {
      columns: {
        updates: [],
        deletes: deletedColumns,
      },
      tasks: {
        updates: updatedTasks.map<Task>((t) => ({
          id: t.id,
          content: t.content,
          projectId: t.project_id,
          assignedTo: t.assigned_to,
          status: t.status as TaskStatus,
          columnId: t.column_id,
          createdBy: t.created_by,
          updatedBy: t.updated_by,
          taskOrder: Number(t.task_order),
          createdAt: new Date(t.created_at),
          updatedAt: new Date(t.updated_at),
        })),
        deletes: deletedTasks,
      },
    }

    const res = await fetch(`${TASKS_API_URL}/sync`, {
      method: "POST",
      body: JSON.stringify(changesToPush),
      headers: {
        "content-type": "application/json",
        "accept-language": "en",
      },
      credentials: "include",
    })
    if (res.status === 200)
      // Mark as synced
      for (const change of pendingChanges) {
        const q = sql`UPDATE tasks_change_log SET sync_status = 'synced', updated_at = ${new Date().toISOString()} WHERE id = ${change.id}`
        await pglite.query(q.text, q.values)
      }
  }
}

export function recordChangelog(db: PGliteWithLive, changeLog: TaskChangeLog) {
  const query = sql`
  INSERT INTO tasks_change_log
  (table_name, record_id, sync_status, operation, updated_at)
  VALUES (
    ${changeLog.table_name},
    ${changeLog.record_id},
    ${changeLog.sync_status},
    ${changeLog.operation},
    ${changeLog.updated_at})`

  return db.query(query.text, query.values)
}
