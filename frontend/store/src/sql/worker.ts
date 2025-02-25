// worker.ts

import {
  getRxStorageSQLite,
  getSQLiteBasicsWasm,
} from "rxdb-premium/plugins/storage-sqlite"
import { exposeWorkerRxStorage } from "rxdb-premium/plugins/storage-worker"

import * as SQLite from "wa-sqlite"
import SQLiteESMFactory from "wa-sqlite/dist/wa-sqlite.mjs"

const sqliteModule = await SQLiteESMFactory()
const sqlite3 = SQLite.Factory(sqliteModule)

export const storage = getRxStorageSQLite({
  sqliteBasics: getSQLiteBasicsWasm(sqlite3),
})

// exposeWorkerRxStorage({ storage })
//   /**
//    * You can wrap any implementation of the RxStorage interface
//    * into a worker.
//    * Here we use the SQLite RxStorage.
//    */

// import { getRxStorageIndexedDB } from "rxdb-premium/plugins/storage-indexeddb"

// import { exposeWorkerRxStorage } from "rxdb-premium/plugins/storage-worker"

// exposeWorkerRxStorage({
//   /**
//    * You can wrap any implementation of the RxStorage interface
//    * into a worker.
//    * Here we use the IndexedDB RxStorage.
//    */
//   storage: getRxStorageIndexedDB(),
// })
