// sql/project-utils.ts
import { database } from './main';
import type { FormProjectDocType } from './types';

// Use the correct status type that matches the schema
type ProjectStatus = "all" | "started" | "on-hold" | "completed";
type TimeType = "day" | "days" | "week" | "month" | "year"; // Added "days" to match form data

// Update the type to match the actual form data structure with optional fields
type ProjectFormData = {
  id: string;
  title: string;
  company: string;
  logo: string;
  description: string;
  progress: number;
  timeLeft: string;
  timeType: string;
  members: Array<{ label: string; value: string }>;
  status: string;
  startDate?: number; // Made optional
  endDate?: number;   // Made optional
  budget?: number;    // Made optional
  files?: string;     // Added optional files field
};

/**
 * Validates and sanitizes project data to match the RxDB schema
 */
const validateProjectData = (data: ProjectFormData): Omit<FormProjectDocType, 'createdAt' | 'updatedAt'> => {
  // Validate status
  let validStatus: ProjectStatus;
  if (data.status === "all" || data.status === "started" ||
      data.status === "on-hold" || data.status === "completed") {
    validStatus = data.status as ProjectStatus;
  } else {
    console.warn(`Invalid status "${data.status}" provided, defaulting to "started"`);
    validStatus = "started";
  }

  // Validate timeType
  let validTimeType: TimeType;
  if (data.timeType === "day" || data.timeType === "days" || data.timeType === "week" ||
      data.timeType === "month" || data.timeType === "year") {
    // Map "days" to "day" if needed
    validTimeType = data.timeType === "days" ? "day" as TimeType : data.timeType as TimeType;
  } else {
    console.warn(`Invalid timeType "${data.timeType}" provided, defaulting to "week"`);
    validTimeType = "week";
  }

  // Handle required fields that might be missing
  const startDate = data.startDate ?? Date.now();
  const endDate = data.endDate ?? (Date.now() + 7 * 24 * 60 * 60 * 1000); // Default to 1 week from now
  const budget = data.budget ?? 0;

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
    ...(data.files && { files: data.files }) // Only add files if it exists
  };
};

/**
 * Saves a project form submission to the RxDB formProjects collection
 * @param projectData The project data from the form
 * @returns The saved RxDB document
 */
export const saveFormProject = async (projectData: ProjectFormData) => {
  try {
    const now = Date.now();

    // Validate and sanitize the project data
    const validatedData = validateProjectData(projectData);

    // Prepare the document with required tracking fields
    const projectDoc: FormProjectDocType = {
      ...validatedData,
      createdAt: now,
      updatedAt: now,
    };

    // Insert into the database
    const result = await database.formProjects.insert(projectDoc);

    console.log('Project saved successfully to RxDB:', result);
    return result;
  } catch (error) {
    console.error('Failed to save project to RxDB:', error);
    throw error;
  }
};