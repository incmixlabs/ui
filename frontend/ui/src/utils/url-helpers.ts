/**
 * Helper utilities for URL handling
 */

/**
 * Detects the type of URL based on its content
 * @param url The URL string to analyze
 * @returns "figma", "task", or "external" based on URL content
 */
export const detectUrlType = (url: string): "figma" | "task" | "external" => {
  try {
    if (url.includes("figma.com")) return "figma"
    // Task URLs would typically include taskId or task in path - internal links
    if (url.includes("/tasks") || url.includes("taskId=") || url.includes("/task/")) return "task"
    return "external"
  } catch {
    return "external"
  }
}

/**
 * Generate a default title for a URL based on its type and existing URLs
 * @param url The URL string to generate a title for
 * @param type The type of URL (figma, task, or external)
 * @param existingUrls Array of existing URLs with type property
 * @returns A generated title string for the URL
 */
export const generateDefaultTitle = (
  url: string, 
  type: string, 
  existingUrls: Array<{type: string, url: string}>
): string => {
  try {
    const urlObject = new URL(url)
    
    if (type === "figma") {
      // Count existing figma URLs to generate a numbered title if needed
      const figmaCount = existingUrls.filter(ru => ru.type === "figma").length
      return figmaCount > 0 ? `Figma ${figmaCount + 1}` : "Figma"
    }
    
    if (type === "task") {
      // Extract task ID if possible
      const taskId = urlObject.searchParams.get("taskId") || 
                    urlObject.pathname.split('/').find(segment => segment.startsWith("tsk"))
      if (taskId) {
        return `Task ${taskId}`
      }
      
      // Count existing task URLs for numbering
      const taskCount = existingUrls.filter(ru => ru.type === "task").length
      return taskCount > 0 ? `Task ${taskCount + 1}` : "Task"
    }
    
    // For external links, use the hostname
    const hostname = urlObject.hostname.replace(/^www\./i, "")
    const domainCount = existingUrls.filter(ru => {
      try {
        const ruUrl = new URL(ru.url)
        return ruUrl.hostname.replace(/^www\./i, "") === hostname
      } catch {
        return false
      }
    }).length
    
    return domainCount > 0 ? `${hostname} ${domainCount + 1}` : hostname
  } catch (e) {
    // If URL parsing fails, provide a generic title
    const externalCount = existingUrls.filter(ru => ru.type === "external").length
    return externalCount > 0 ? `Link ${externalCount + 1}` : "Link"
  }
}
