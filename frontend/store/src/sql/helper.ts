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
