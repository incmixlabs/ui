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
  taskDataSchemaLiteral,
  taskSchemaLiteral,
} from "./types"

import { getRxStorageIndexedDB } from "rxdb-premium/plugins/storage-indexeddb"
import { RxDBAttachmentsPlugin } from "rxdb/plugins/attachments"
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema"
import { RxDBUpdatePlugin } from "rxdb/plugins/update"
import { wrappedValidateZSchemaStorage } from "rxdb/plugins/validate-z-schema"

addRxPlugin(RxDBUpdatePlugin)
addRxPlugin(RxDBMigrationSchemaPlugin)
addRxPlugin(RxDBAttachmentsPlugin)

if (import.meta.env.MODE === "development") {
  addRxPlugin(RxDBDevModePlugin)
}

const storage = wrappedValidateZSchemaStorage({
  storage: getRxStorageIndexedDB(),
})

export const database = await createRxDatabase<TaskCollections>({
  storage,
  name: "incmix-db",
})

await database.addCollections({
  tasks: { schema: taskSchemaLiteral, autoMigrate: true },
  taskData: { schema: taskDataSchemaLiteral, autoMigrate: true },
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
