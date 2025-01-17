import { type PGliteWithLive, live } from "@electric-sql/pglite/live"
import { PGliteWorker } from "@electric-sql/pglite/worker"
import { syncSchemaWithBackend } from "./tasks"
// https://electric-sql.com/product/pglite
// https://github.com/dnlsandiego/kysely-pglite

const _data = {
  project: {
    id: "test-project",
    org_id: "test-org",
    name: "Project 1",

    columns: [
      {
        id: "todo-column",
        label: "Todo",
        order: 1,
        parent_column_id: null,
        tasks: [
          {
            id: "task-1",
            content: "Task 1",
            status: "TODO",
          },
          {
            id: "task-2",
            content: "Task 2",
            status: "TODO",
          },
        ],
      },
      {
        id: "inprogress-column",
        label: "In Progress",
        order: 2,
        parent_column_id: null,
        tasks: [
          {
            id: "task-3",
            content: "Task 3",
            status: "IN_PROGRESS",
          },
        ],
      },
      {
        id: "done-column",
        label: "Done",
        order: 3,
        parent_column_id: null,
        tasks: [],
      },
    ],
  },
}

export const pgWorkerMain = (dataDir = "idb://incmix-db"): PGliteWithLive => {
  const worker = new PGliteWorker(
    new Worker(new URL("./worker.ts", import.meta.url), {
      type: "module",
    }),
    {
      dataDir,
      extensions: {
        live,
      },
    }
  ) as unknown as PGliteWithLive //Type issue

  worker.onLeaderChange(() => console.log("leader changed"))

  worker.exec(`
    CREATE TABLE IF NOT EXISTS schema_meta (
      id SERIAL PRIMARY KEY,
      version INTEGER,
      updated_at TIMESTAMP DEFAULT NOW()
    );`)

  worker.exec(`
    CREATE TABLE IF NOT EXISTS tasks_change_log (
      id SERIAL PRIMARY KEY,
      table_name TEXT NOT NULL,
      record_id TEXT NOT NULL,
      sync_status TEXT check(sync_status in ('pending','synced')) NOT NULL,
      operation TEXT check(operation in ('update', 'delete')) NOT NULL,
      updated_at TEXT NOT NULL
    );`)

  syncSchemaWithBackend(worker)

  return worker
}
