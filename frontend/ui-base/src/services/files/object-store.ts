interface FileMetadata {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: Date
  lastModified: Date
  checksum?: string
  tags?: Record<string, string>
}

interface StoredFile {
  metadata: FileMetadata
  data: ArrayBuffer
}

export class ObjectStore {
  private dbName: string
  private version: number
  private db: IDBDatabase | null = null

  constructor(dbName = "file-store", version = 1) {
    this.dbName = dbName
    this.version = version
  }

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version)

      request.onerror = () => {
        reject(new Error(`Failed to open database: ${request.error?.message}`))
      }

      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result

        if (!db.objectStoreNames.contains("files")) {
          const store = db.createObjectStore("files", {
            keyPath: "metadata.id",
          })
          store.createIndex("name", "metadata.name", { unique: false })
          store.createIndex("type", "metadata.type", { unique: false })
          store.createIndex("uploadedAt", "metadata.uploadedAt", {
            unique: false,
          })
        }
      }
    })
  }

  async storeFile(
    file: File,
    id?: string,
    tags?: Record<string, string>
  ): Promise<string> {
    if (!this.db) {
      throw new Error("Database not initialized. Call init() first.")
    }

    try {
      const fileId = id || this.generateId()
      const arrayBuffer = await file.arrayBuffer()
      const checksum = await this.calculateChecksum(arrayBuffer)

      const metadata: FileMetadata = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        lastModified: new Date(file.lastModified),
        checksum,
        tags,
      }

      const storedFile: StoredFile = {
        metadata,
        data: arrayBuffer,
      }

      return new Promise((resolve, reject) => {
        if (!this.db) {
          reject(new Error("Database not initialized. Call init() first."))
          return
        }
        const transaction = this.db.transaction(["files"], "readwrite")
        const store = transaction.objectStore("files")
        const request = store.put(storedFile)

        request.onsuccess = () => resolve(fileId)
        request.onerror = () =>
          reject(new Error(`Failed to store file: ${request.error?.message}`))

        transaction.onerror = () =>
          reject(new Error(`Transaction failed: ${transaction.error?.message}`))
      })
    } catch (error) {
      throw new Error(
        `Failed to process file: ${error instanceof Error ? error.message : "Unknown error"}`
      )
    }
  }

  async getFile(id: string): Promise<StoredFile | null> {
    if (!this.db) {
      throw new Error("Database not initialized. Call init() first.")
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error("Database not initialized. Call init() first."))
        return
      }
      const transaction = this.db.transaction(["files"], "readonly")
      const store = transaction.objectStore("files")
      const request = store.get(id)

      request.onsuccess = () => {
        resolve(request.result || null)
      }

      request.onerror = () => {
        reject(new Error(`Failed to retrieve file: ${request.error?.message}`))
      }

      transaction.onerror = () => {
        reject(new Error(`Transaction failed: ${transaction.error?.message}`))
      }
    })
  }

  async deleteFile(id: string): Promise<boolean> {
    if (!this.db) {
      throw new Error("Database not initialized. Call init() first.")
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error("Database not initialized. Call init() first."))
        return
      }
      const transaction = this.db.transaction(["files"], "readwrite")
      const store = transaction.objectStore("files")
      const request = store.delete(id)

      request.onsuccess = () => resolve(true)
      request.onerror = () =>
        reject(new Error(`Failed to delete file: ${request.error?.message}`))

      transaction.onerror = () =>
        reject(new Error(`Transaction failed: ${transaction.error?.message}`))
    })
  }

  async listFiles(): Promise<FileMetadata[]> {
    if (!this.db) {
      throw new Error("Database not initialized. Call init() first.")
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error("Database not initialized. Call init() first."))
        return
      }
      const transaction = this.db.transaction(["files"], "readonly")
      const store = transaction.objectStore("files")
      const request = store.getAll()

      request.onsuccess = () => {
        const files = request.result.map(
          (storedFile: StoredFile) => storedFile.metadata
        )
        resolve(files)
      }

      request.onerror = () => {
        reject(new Error(`Failed to list files: ${request.error?.message}`))
      }

      transaction.onerror = () => {
        reject(new Error(`Transaction failed: ${transaction.error?.message}`))
      }
    })
  }

  async updateMetadata(
    id: string,
    updates: Partial<FileMetadata>
  ): Promise<void> {
    if (!this.db) {
      throw new Error("Database not initialized. Call init() first.")
    }

    const existingFile = await this.getFile(id)
    if (!existingFile) {
      throw new Error(`File with id ${id} not found`)
    }

    const updatedMetadata = { ...existingFile.metadata, ...updates }
    const updatedFile: StoredFile = {
      ...existingFile,
      metadata: updatedMetadata,
    }

    return new Promise((resolve, reject) => {
      if (!this.db) {
        reject(new Error("Database not initialized. Call init() first."))
        return
      }
      const transaction = this.db.transaction(["files"], "readwrite")
      const store = transaction.objectStore("files")
      const request = store.put(updatedFile)

      request.onsuccess = () => resolve()
      request.onerror = () =>
        reject(
          new Error(`Failed to update metadata: ${request.error?.message}`)
        )

      transaction.onerror = () =>
        reject(new Error(`Transaction failed: ${transaction.error?.message}`))
    })
  }

  async searchByTag(
    tagKey: string,
    tagValue?: string
  ): Promise<FileMetadata[]> {
    const allFiles = await this.listFiles()

    return allFiles.filter((file) => {
      if (!file.tags) return false

      if (tagValue) {
        return file.tags[tagKey] === tagValue
      }

      return tagKey in file.tags
    })
  }

  close(): void {
    if (this.db) {
      this.db.close()
      this.db = null
    }
  }

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
  }

  private async calculateChecksum(buffer: ArrayBuffer): Promise<string> {
    try {
      const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    } catch (error) {
      throw new Error(
        `Failed to calculate checksum: ${error instanceof Error ? error.message : "Unknown error"}`
      )
    }
  }
}
