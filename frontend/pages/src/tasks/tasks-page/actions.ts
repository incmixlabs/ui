import type { PGliteWithLive } from "@electric-sql/pglite/live"
import { I18n } from "@incmix-fe/pages/i18n"
import { recordChangelog } from "@incmix-fe/store/src/sql/tasks"
import { TASKS_API_URL } from "@incmix-fe/ui/constants"
import type {
  Board,
  Column,
  NestedColumns,
  Project,
  Task,
  TaskStatus,
} from "@jsprtmnn/utils/types"
import sql from "sql-template-tag"

export async function getProjects(orgId: string) {
  const res = await fetch(`${TASKS_API_URL}/projects/id/${orgId}`, {
    headers: {
      "content-type": "application/json",
      "accept-language": I18n.language ?? "en",
    },
    credentials: "include",
  })
  const data = (await res.json()) as Project[]

  return data
}
export async function getColumns(projectId: string, parentId?: string) {
  const searchQuery = new URLSearchParams()
  if (parentId) searchQuery.append("columnId", parentId)
  const res = await fetch(
    `${TASKS_API_URL}/projects/columns/${projectId}?${searchQuery.toString()}`,
    {
      headers: {
        "content-type": "application/json",
        "accept-language": I18n.language ?? "en",
      },
      credentials: "include",
    }
  )
  const data = (await res.json()) as Column[]

  return data
}

export async function getKanbanBoard(db: PGliteWithLive, projectId: string) {
  const tasksQuery = sql`select * from tasks where project_id = ${projectId}`
  const tasks = (
    await db.query<Record<string, string>>(tasksQuery.text, tasksQuery.values)
  ).rows.map<Task>((row) => ({
    id: row.id,
    content: row.content,
    projectId: row.project_id,
    taskOrder: Number(row.taskOrder),
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    createdBy: row.created_by,
    updatedBy: row.updated_by,
    status: row.status as TaskStatus,
    assignedTo: row.assigned_to,
    columnId: row.column_id,
  }))

  if (!tasks.length) {
    const res = await fetch(`${TASKS_API_URL}/projects/board/${projectId}`, {
      headers: {
        "content-type": "application/json",
        "accept-language": I18n.language ?? "en",
      },
      credentials: "include",
    })

    const board = (await res.json()) as Board

    insertColumns(db, board.columns, projectId)
    insertTasks(db, board.tasks, projectId, true)

    return { columns: board.columns, tasks: board.tasks }
  }

  const columns = await getColumns(projectId)
  const columnMap: Record<string, NestedColumns> = {}

  columns.forEach((column) => {
    columnMap[column.id] = {
      ...column,
      children: [],
      tasks: tasks.filter((task) => task.columnId === column.id),
    }
  })

  const nestedColumns: NestedColumns[] = []

  columns.forEach((column) => {
    if (column.parentId) {
      const child = columnMap[column.id]
      // If the category has a parent, add it to the parent's children
      if (child) columnMap[column.parentId]?.children?.push(child)
    } else {
      // If the category has no parent, it's a root category
      const child = columnMap[column.id]
      if (child) nestedColumns.push(child)
    }
  })

  return { columns: nestedColumns, tasks }
}

const flattenColumns = (cols: NestedColumns[]): Column[] => {
  return cols.flatMap((col) =>
    col.children ? [col, ...flattenColumns(col.children)] : [col]
  )
}

async function insertColumns(
  db: PGliteWithLive,
  columns: NestedColumns[],
  projectId: string
) {
  await db.query(`delete from columns where project_id = '${projectId}'`)
  const flatColumns = flattenColumns(columns)
  const columnsQuery = `insert into columns
  (id, label, project_id, column_order, created_at, updated_at, created_by, updated_by, parent_id)
  values ${flatColumns.map((column) => `('${column.id}', '${column.label}', '${column.projectId}', ${column.columnOrder}, '${column.createdAt}', '${column.updatedAt}', '${column.createdBy}', '${column.updatedBy}', ${column.parentId ? `'${column.parentId}'` : null})`).join(",")}`

  return db.query(columnsQuery)
}

async function insertTasks(
  db: PGliteWithLive,
  tasks: Task[],
  projectId: string,
  resetTable = false
) {
  if (resetTable)
    await db.query(`delete from tasks where project_id = '${projectId}'`)
  const tasksQuery = `insert into tasks
  (id, content, project_id, task_order, created_at, updated_at, created_by, updated_by, status, assigned_to, column_id)
  values ${tasks.map((task) => `('${task.id}', '${task.content}', '${task.projectId}', ${task.taskOrder}, '${task.createdAt}', '${task.updatedAt}', '${task.createdBy}', '${task.updatedBy}', '${task.status}', '${task.assignedTo}', '${task.columnId}')`).join(", ")}`

  return db.query(tasksQuery)
}

export async function updatedTasks(db: PGliteWithLive, tasks: Task[]) {
  for (const task of tasks) {
    const query = sql`update tasks set column_id = ${task.columnId}, task_order = ${task.taskOrder} where id = ${task.id}`
    await db.query(query.text, query.values)

    await recordChangelog(db, {
      table_name: "tasks",
      record_id: task.id,
      sync_status: "pending",
      operation: "update",
      updated_at: new Date().toISOString(),
    })
  }
}

export async function createProject(data: { name: string; orgId: string }) {
  const res = await fetch(`${TASKS_API_URL}/projects`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept-language": I18n.language ?? "en",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
  return (await res.json()) as Project
}
export async function createColumn(data: {
  label: string
  projectId: string
  parentId?: string
  columnOrder: number
}) {
  const res = await fetch(`${TASKS_API_URL}/projects/columns`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept-language": I18n.language ?? "en",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
  return (await res.json()) as Column
}

export async function createTask(
  data: {
    content: string
    projectId: string
    columnId: string
    taskOrder: number
    assignedTo: string
    status: TaskStatus
  },
  db: PGliteWithLive
): Promise<Task> {
  const res = await fetch(`${TASKS_API_URL}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "accept-language": I18n.language ?? "en",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
  const newtask = (await res.json()) as Task
  await insertTasks(db, [newtask], data.projectId)
  return newtask
}
