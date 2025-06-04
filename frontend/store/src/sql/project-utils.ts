// sql/project-utils.ts
import { database } from "./main"
import type { FormProjectDocType } from "./types"
import type { TaskDataSchema } from "./task-schemas" // Added import for TaskDataSchema

// Use the correct status type that matches the schema
type ProjectStatus = "all" | "started" | "on-hold" | "completed"
type TimeType = "day" | "days" | "week" | "month" | "year"

// Update the type to match the actual form data structure with optional fields
type ProjectFormData = {
  id: string
  title: string
  company: string
  logo: string
  description: string
  progress: number
  timeLeft: string
  timeType: string
  members: Array<{ label: string; value: string }>
  status: string
  startDate?: number
  endDate?: number
  budget?: number
  fileData?: File | Blob | any // Accept various possible file input formats
}

/**
 * Validates and sanitizes project data to match the RxDB schema
 */
const validateProjectData = (
  data: ProjectFormData
): Omit<FormProjectDocType, "createdAt" | "updatedAt"> => {
  // Validate status
  let validStatus: ProjectStatus
  if (
    data.status === "all" ||
    data.status === "started" ||
    data.status === "on-hold" ||
    data.status === "completed"
  ) {
    validStatus = data.status as ProjectStatus
  } else {
    console.warn(
      `Invalid status "${data.status}" provided, defaulting to "started"`
    )
    validStatus = "started"
  }

  // Validate timeType
  let validTimeType: TimeType
  if (
    data.timeType === "day" ||
    data.timeType === "days" ||
    data.timeType === "week" ||
    data.timeType === "month" ||
    data.timeType === "year"
  ) {
    // Map "days" to "day" if needed
    validTimeType =
      data.timeType === "days"
        ? ("day" as TimeType)
        : (data.timeType as TimeType)
  } else {
    console.warn(
      `Invalid timeType "${data.timeType}" provided, defaulting to "week"`
    )
    validTimeType = "week"
  }

  // Handle required fields that might be missing
  const startDate = data.startDate ?? Date.now()
  const endDate = data.endDate ?? Date.now() + 7 * 24 * 60 * 60 * 1000 // Default to 1 week from now
  const budget = data.budget ?? 0

  // Return a sanitized object with all fields properly typed
  return {
    id: data.id,
    title: data.title,
    company: data.company,
    logo: data.logo,
    description: data.description,
    progress: data.progress,
    timeLeft: data.timeLeft,
    timeType: validTimeType,
    members: data.members,
    status: validStatus,
    startDate: startDate,
    endDate: endDate,
    budget: budget,
    // We'll handle fileInfo separately
  }
}

/**
 * Creates a proper File object from various possible input formats
 * @param fileData The file data from the form submission
 * @returns A proper File object or null if invalid
 */
const ensureFileObject = async (fileData: any): Promise<File | null> => {
  // Case 1: Already a File object
  if (fileData instanceof File) {
    return fileData
  }

  // Case 2: It's a Blob
  if (fileData instanceof Blob) {
    // Blobs don't have a name property, so we need to provide a default name
    return new File([fileData], "blob_file", { type: fileData.type })
  }

  // Case 3: It's a serialized file-like object with necessary properties
  if (
    fileData &&
    typeof fileData === "object" &&
    "name" in fileData &&
    "type" in fileData &&
    "size" in fileData
  ) {
    try {
      // If we have base64 data
      if ("data" in fileData && typeof fileData.data === "string") {
        // Explicitly validate the data URL format
        if (
          fileData.data.startsWith("data:") &&
          /^data:[a-z]+\/[a-z0-9-+.]+;base64,/i.test(fileData.data)
        ) {
          try {
            const res = await fetch(fileData.data)
            const blob = await res.blob()
            return new File([blob], fileData.name, { type: fileData.type })
          } catch (error) {
            console.error("Error processing data URL:", error)
            return null
          }
        } else {
          console.warn("Invalid or unsupported data URL format")
          return null
        }
      }

      // If we have ArrayBuffer or similar
      if ("arrayBuffer" in fileData || "buffer" in fileData) {
        const buffer = fileData.arrayBuffer || fileData.buffer
        return new File([buffer], fileData.name, { type: fileData.type })
      }

      console.warn("File-like object provided but missing data content")
      return null
    } catch (error) {
      console.error("Error converting to File object:", error)
      return null
    }
  }

  console.warn("Unable to process file data:", fileData)
  return null
}

/**
 * Saves a project form submission to the RxDB formProjects collection
 * @param projectData The project data from the form
 * @returns The saved RxDB document
 */

export const saveFormProject = async (projectData: ProjectFormData) => {
  try {
    const now = Date.now()

    // Validate and sanitize the project data
    const validatedData = validateProjectData(projectData)

    // Prepare the document with required tracking fields
    const projectDoc = {
      ...validatedData,
      createdAt: now,
      updatedAt: now,
    } as FormProjectDocType

    // Insert the document first (without the file)
    const insertedDoc = await database.formProjects.insert(projectDoc)

    // Handle file attachment if present
    if (projectData.fileData) {
      try {
        // Convert to proper File object
        const file = await ensureFileObject(projectData.fileData)

        if (file) {
          // Get file information
          const fileInfo = {
            name: file.name,
            type: file.type || "application/octet-stream",
            size: file.size,
          }

          const attachmentId = `file_${now}`

          // Put the file as an attachment
          await insertedDoc.putAttachment({
            id: attachmentId,
            data: file,
            type: fileInfo.type,
          })

          // Get a fresh reference to the document with the latest revision
          const refreshedDoc = await database.formProjects
            .findOne({
              selector: { id: insertedDoc.id },
            })
            .exec()

          if (refreshedDoc) {
            // Update the document with file information using the fresh reference
            await refreshedDoc.update({
              $set: {
                fileInfo: {
                  name: fileInfo.name,
                  type: fileInfo.type,
                  size: fileInfo.size,
                  attachmentId: attachmentId,
                },
              },
            })
          }
        } else {
          console.warn("Failed to process file data")
        }
      } catch (fileError) {
        console.error("Error adding file attachment:", fileError)
        // Continue with the document saved, just without the attachment
      }
    }

    return insertedDoc
  } catch (error) {
    console.error("Failed to save project to RxDB:", error)
    throw error
  }
}
