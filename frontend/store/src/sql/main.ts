// // main.ts

// import { addRxPlugin, createRxDatabase } from "rxdb"
// import { RxDBDevModePlugin } from "rxdb/plugins/dev-mode"
// import {
//   type TaskCollections,
//   columnSchemaLiteral,
//   projectSchemaLiteral,
//   taskSchemaLiteral,
// } from "./types"

// import { getRxStorageIndexedDB } from "rxdb-premium/plugins/storage-indexeddb"
// import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema"
// import { RxDBUpdatePlugin } from "rxdb/plugins/update"
// import { wrappedValidateAjvStorage } from "rxdb/plugins/validate-ajv"

// addRxPlugin(RxDBUpdatePlugin)
// addRxPlugin(RxDBMigrationSchemaPlugin)

// if (import.meta.env.MODE === "development") {
//   addRxPlugin(RxDBDevModePlugin)
// }
// // import * as SQLite from "wa-sqlite"
// // import SQLiteESMFactory from "wa-sqlite/dist/wa-sqlite.mjs"

// // const sqliteModule = await SQLiteESMFactory()
// // const sqlite3 = SQLite.Factory(sqliteModule)

// const storage = wrappedValidateAjvStorage({ storage: getRxStorageIndexedDB() })

// export const database = await createRxDatabase<TaskCollections>({
//   storage,
//   name: "incmix-db",

//   // getRxStorageSharedWorker({
//   //   //   /**
//   //   //    * Contains any value that can be used as parameter
//   //   //    * to the SharedWorker constructor of thread.js
//   //   //    * Most likely you want to put the path to the shared-worker.js file in here.
//   //   //    *
//   //   //    * @link https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker?retiredLocale=de
//   //   //    */

//   //   workerInput: () =>
//   //     new SharedWorker(new URL("./worker.ts", import.meta.url), {
//   //       type: "module",
//   //       // credentials: "include",
//   //     }),
//   // }),
// })

// database.addCollections({
//   tasks: { schema: taskSchemaLiteral, autoMigrate: true },
//   columns: { schema: columnSchemaLiteral, autoMigrate: true },
//   projects: { schema: projectSchemaLiteral, autoMigrate: true },
// })