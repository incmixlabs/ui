// main.ts

import { addRxPlugin, createRxDatabase } from "rxdb"
import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode"
import {
  type TaskCollections,
  type TaskDocType,
  columnSchemaLiteral,
  dashboardTemplateSchemaLiteral,
  formProjectSchemaLiteral,
  projectSchemaLiteral,
  taskSchemaLiteral,
} from "./types"

import { API } from "@incmix/utils/env"
import { getRxStorageIndexedDB } from "rxdb-premium/plugins/storage-indexeddb"
import { RxDBAttachmentsPlugin } from "rxdb/plugins/attachments"
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema"
import { replicateRxCollection } from "rxdb/plugins/replication"
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
  columns: { schema: columnSchemaLiteral, autoMigrate: true },
  projects: { schema: projectSchemaLiteral, autoMigrate: true },
  formProjects: { schema: formProjectSchemaLiteral, autoMigrate: true },
  dashboardTemplates: {
    schema: dashboardTemplateSchemaLiteral,
    autoMigrate: true,
  },
})
