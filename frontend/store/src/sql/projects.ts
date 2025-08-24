// import { ensureFileObject, validateProjectData } from "@incmix/utils/validate"
import { initializeDefaultData } from "../hooks/use-initialize-default-data"
// Import organization store to get current organization ID
// sql/project-utils.ts
import { database } from "./main" // Added import for TaskDataSchema
import type { ProjectDocType } from "./types"

/**
 * Wait for replication to be ready by checking if replication state exists
 */
const waitForReplicationReady = async (timeoutMs = 5000): Promise<void> => {
  const startTime = Date.now()
  
  while (Date.now() - startTime < timeoutMs) {
    // Check if collections have replication state indicating they're ready
    const tasksReady = database.tasks && (database.tasks as any).replicationStates?.size > 0
    const labelsReady = database.labels && (database.labels as any).replicationStates?.size > 0
    
    if (tasksReady && labelsReady) {
      console.log("Replication is ready for tasks and labels")
      return
    }
    
    // Wait 100ms before checking again
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  console.warn("Replication readiness timeout - proceeding anyway")
}

/**
 * Saves a project form submission to the RxDB formProjects collection
 * @param projectData The project data from the form
 * @returns The saved RxDB document
 */
export const saveFormProject = async (projectData: ProjectDocType) => {
  try {
    // Prepare the project document
    const projectDoc = {
      id: projectData.id,
      name: projectData.name,
      logo: typeof projectData.logo === "string" ? projectData.logo : "",
      description: projectData.description,
      createdBy: projectData.createdBy,
      updatedBy: projectData.updatedBy,
      orgId: projectData.orgId,
      createdAt: projectData.createdAt,
      updatedAt: projectData.updatedAt,
      company: projectData.company,
      startDate: projectData.startDate,
      endDate: projectData.endDate,
      status: projectData.status,
      budget: projectData.budget,
    } satisfies ProjectDocType

    console.log(`Step 1: Creating project: ${projectDoc.id}`)
    
    // Step 1: Insert the project first
    const insertedDoc = await database.projects.insert(projectDoc)
    
    console.log(`Step 2: Project created successfully: ${insertedDoc.id}`)

    // Handle file attachment if present
    // if (projectData.fileData) {
    //   try {
    //     // Convert to proper File object
    //     const file = await ensureFileObject(projectData.fileData)

    //     if (file) {
    //       // Get file information
    //       const fileInfo = {
    //         name: file.name,
    //         type: file.type || "application/octet-stream",
    //         size: file.size,
    //       }

    //       const attachmentId = `file_${now}`

    //       // Put the file as an attachment
    //       await insertedDoc.putAttachment({
    //         id: attachmentId,
    //         data: file,
    //         type: fileInfo.type,
    //       })

    //       // Get a fresh reference to the document with the latest revision
    //       const refreshedDoc = await database.formProjects
    //         .findOne({
    //           selector: { id: insertedDoc.id },
    //         })
    //         .exec()

    //       if (refreshedDoc) {
    //         // Update the document with file information using the fresh reference
    //         await refreshedDoc.update({
    //           $set: {
    //             fileInfo: {
    //               name: fileInfo.name,
    //               type: fileInfo.type,
    //               size: fileInfo.size,
    //               attachmentId: attachmentId,
    //             },
    //           },
    //         })
    //       }
    //     } else {
    //       console.warn("Failed to process file data")
    //     }
    //   } catch (fileError) {
    //     console.error("Error adding file attachment:", fileError)
    //     // Continue with the document saved, just without the attachment
    //   }
    // }

    // Step 2: Wait for replication to be ready before creating default data
    console.log("Step 3: Waiting for replication to be ready...")
    await waitForReplicationReady()
    
    // Step 3: Create default labels and tasks for this project
    try {
      console.log(`Step 4: Creating default labels for project: ${insertedDoc.id}`)
      
      // First create labels only
      await initializeDefaultData(database, {
        projectId: insertedDoc.id,
        forceLabelCreation: true,
        labelsOnly: true, // Create labels first
      })
      
      console.log(`Step 5: Labels created, now creating tasks for project: ${insertedDoc.id}`)
      
      // Small delay to ensure labels are fully replicated
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Then create tasks
      await initializeDefaultData(database, {
        projectId: insertedDoc.id,
        labelsOnly: false, // Now create tasks
      })
      
      console.log(`Step 6: Default data creation completed for project: ${insertedDoc.id}`)
      
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
