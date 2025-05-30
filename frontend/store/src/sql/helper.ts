import { nanoid } from "nanoid"

export const baseFieldType = {
  TEXT: "TEXT",
  INTEGER: "INTEGER",
  REAL: "REAL",
  BLOB: "BLOB",
}
export const fieldType = {
  ...baseFieldType,
  BOOLEAN: baseFieldType.INTEGER,
  DATE: baseFieldType.INTEGER,
  TIME: baseFieldType.INTEGER,
  DATETIME: baseFieldType.INTEGER,
  FUTUREDATE: baseFieldType.INTEGER,
  FUTURETIME: baseFieldType.INTEGER,
  FUTUREDATETIME: baseFieldType.INTEGER,
  PASTDATE: baseFieldType.INTEGER,
  PASTDATETIME: baseFieldType.INTEGER,
  ADULTAGE: baseFieldType.INTEGER,
  CHILDAGE: baseFieldType.INTEGER,
  JSON: baseFieldType.TEXT,
  JSONB: baseFieldType.BLOB,
  UUID: baseFieldType.TEXT,
  ARRAY: baseFieldType.TEXT,
  ENUM: baseFieldType.TEXT,
  SERIAL: baseFieldType.INTEGER,
}
export type FieldType = (typeof fieldType)[keyof typeof fieldType]
export type FieldDef = {
  key: string
  type: FieldType
  unique?: boolean
  notNull?: boolean
  check?: string
}
export type Index = {
  fields: string[]
  unique: boolean
  indexName: string
}

export const requiredColumns: Record<string, FieldType> = {
  id: fieldType.TEXT,
  // client generated - to be synced with server
  _id: fieldType.TEXT,
  _needs_sync: fieldType.BOOLEAN,
  _createdAt: fieldType.INTEGER,
  _updatedAt: fieldType.INTEGER,
  _deletedAt: fieldType.INTEGER,
  _syncedAt: fieldType.INTEGER,
}

export const requiredColumnArray: FieldDef[] = Object.keys(requiredColumns).map(
  (key) => {
    const field = {
      key,
      type: requiredColumns[key],
      unique: true,
      notNull: false,
      check: undefined,
    }
    if (key === "id" || key === "_id") {
      field.unique = true
      field.notNull = true
    }
    return { ...field }
  }
)

export type TableSchema = {
  name: string
  lov?: boolean
  large?: boolean
  gridView?: boolean
  formView?: boolean
  readonly?: boolean
  columns: FieldDef[]
  indexes: Index[]
}

// export class SQLStore {
//   db = 0
//   db_name = ""
//   // @ts-ignore
//   sqlite3: SQLiteAPI = null
//   opened = false
//   tables: string[] = []
//   schema: TableSchema[] = []
//   lastSynced = 0 //datetime
//   sync = false

//   constructor(db_name: string) {
//     this.init(db_name)
//   }

//   async init(db_name: string) {}

//   async create(tables: TableSchema[]) {
//     for (const table of tables) {
//       if (this.tables.includes(table.name)) {
//         continue
//       }
//       const columns = [...requiredColumnArray, ...table.columns].map(
//         (column) => {
//           const field = Object.keys(column).map((key) => {
//             const value = column[key as keyof FieldDef]
//             let def = `${key} ${value}`
//             if (key === "_id") {
//               def += " PRIMARY KEY"
//             } else if (column.unique) {
//               def += " UNIQUE"
//             }
//             if (column.notNull) {
//               def += " NOT NULL"
//             }
//             if (column.check) {
//               def += ` CHECK (${column.check})`
//             }
//             return def
//           })
//           return field.join(", ")
//         }
//       )
//       const indexes = table.indexes.map((index) => {
//         return `CREATE ${index.unique ? "UNIQUE" : ""} INDEX ${index.indexName} ON ${table.name} (${index.fields.join(", ")})`
//       })
//       await this.sqlite3.exec(
//         this.db,
//         `CREATE TABLE ${table.name} (${columns.join(", ")})`
//       )
//       this.tables.push(table.name)
//       this.schema.push(table)
//       for (const index of indexes) {
//         await this.sqlite3.exec(this.db, index)
//       }
//     }
//   }

//   // async introspect(table: string) {
//   //   const _columns: FieldDef[] = []
//   //   const _indexes: Index[] = []
//   //   await this.sqlite3.exec(
//   //     this.db,
//   //     `PRAGMA table_info(${table})`,
//   //     (row, _columns) => {
//   //       console.log(row)
//   //     }
//   //   )
//   //   await this.sqlite3.exec(
//   //     this.db,
//   //     `PRAGMA index_list(${table})`,
//   //     (_row, _columns) => {
//   //       console.log(_row)
//   //     }
//   //   )
//   // }
//   // async insert(
//   //   table: string,
//   //   data: Record<string, SQLiteCompatibleType | null>
//   // ) {
//   //   const keys = Object.keys(data)
//   //   const values = Object.values(data)
//   //   // const placeholders = keys.map(() => "?").join(", ")
//   //   const statement = `INSERT INTO ${table} (${keys.join(", ")}) VALUES (${values.join(", ")})`

//   //   await this.sqlite3.exec(this.db, statement)
//   // }
// }

/**
 * Generates a unique ID with optional prefix and customizable length
 * @param prefix Optional prefix for the ID
 * @param length Length of the random part (default: 10)
 * @returns A unique ID string
 */
export function generateUniqueId(prefix?: string, length = 10): string {
  const randomId = nanoid(length)
  return prefix ? `${prefix}-${randomId}` : randomId
}

/**
 * Generates a URL-friendly slug from a string
 * @param text The text to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special chars except spaces and hyphens
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single hyphen
}

/**
 * Generates a unique ID based on a name with fallback to random ID
 * @param name The name to base the ID on
 * @param checkExists Function to check if ID already exists
 * @param maxAttempts Maximum number of attempts to add counter
 * @returns A unique ID string
 */
export async function generateNameBasedId(
  name: string,
  checkExists: (id: string) => Promise<boolean>,
  maxAttempts = 10
): Promise<string> {
  // Generate base slug from name
  const baseSlug = generateSlug(name)

  // If name is empty or generates empty slug, use random ID
  if (!baseSlug) {
    return generateUniqueId()
  }

  // Try with base slug first
  let newId = baseSlug

  // Check if exists and try with counters
  let counter = 1
  while ((await checkExists(newId)) && counter <= maxAttempts) {
    newId = `${baseSlug}-${counter}`
    counter++
  }

  // If we exceeded max attempts, fall back to a random ID with name prefix
  if (counter > maxAttempts) {
    return generateUniqueId(baseSlug.substring(0, 20))
  }

  return newId
}

// **
//  * Gets current timestamp as number
//  */
export function getCurrentTimestamp(): number {
  return Date.now()
}
