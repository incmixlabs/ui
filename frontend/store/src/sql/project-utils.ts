import type { ProjectFormData } from "@incmix/utils/schema"
import { ensureFileObject, validateProjectData } from "@incmix/utils/validate"
// sql/project-utils.ts
import { database } from "./main" // Added import for TaskDataSchema
import type { FormProjectDocType } from "./types"
import { initializeDefaultData } from "../hooks/use-initialize-default-data"

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
    // After successfully saving the project, create default labels and tasks for it
    try {
      console.log(`Creating default labels and tasks for project: ${insertedDoc.id}`)
      // Create default labels and tasks for this project
      await initializeDefaultData(database, {
        projectId: insertedDoc.id, // Use the newly created project's ID
        forceLabelCreation: true // Force creation even if there are existing labels
      })
      console.log(`Default labels and tasks created successfully for project: ${insertedDoc.id}`)
    } catch (initError) {
      // Log but don't fail the project creation if default data creation fails
      console.error("Error creating default labels and tasks:", initError)
    }
    
    return insertedDoc
  } catch (error) {
    console.error("Failed to save project to RxDB:", error)
    throw error
  }
}
