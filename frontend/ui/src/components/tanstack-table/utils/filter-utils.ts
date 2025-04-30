// Improved faceted filter function
export const facetedFilterFn = (row: any, columnId: string, filterValue: any[]) => {
  if (!filterValue || filterValue.length === 0) return true;

  const value = row.getValue(columnId);

  // Handle array values (like tags)
  if (Array.isArray(value)) {
    // Check if any value in the filter matches any tag in the array
    return filterValue.some(fv => value.includes(fv));
  }
  // Handle boolean values explicitly
  else if (typeof value === 'boolean') {
    // Convert both to same type for comparison
    return filterValue.some(fv => {
      if (typeof fv === 'boolean') return value === fv;
      if (typeof fv === 'string') return String(value) === fv.toLowerCase();
      return false;
    });
  }
  // Handle other value types (strings, numbers, etc.)
  else {
    return filterValue.includes(value);
  }
};

// Date range filter function
export const dateRangeFilterFn = (row: any, columnId: string, filterValue: { start?: string; end?: string }) => {
  if (!filterValue || (!filterValue.start && !filterValue.end)) return true;

  const value = row.getValue(columnId);
  if (!value) return false;

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return false;

  if (filterValue.start && filterValue.end) {
    const startDate = new Date(filterValue.start);
    const endDate = new Date(filterValue.end);

    // Check for invalid dates
    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) return false;

    // Set end date to end of day
    endDate.setHours(23, 59, 59, 999);
    return date >= startDate && date <= endDate;
  } else if (filterValue.start) {
    const startDate = new Date(filterValue.start);

    // Check for invalid date
    if (Number.isNaN(startDate.getTime())) return false;

    return date >= startDate;
  } else if (filterValue.end) {
    const endDate = new Date(filterValue.end);

    // Check for invalid date
    if (Number.isNaN(endDate.getTime())) return false;

    // Set end date to end of day
    endDate.setHours(23, 59, 59, 999);
    return date <= endDate;
  }

  return true;
};

// Text filter function
export const textFilterFn = (row: any, columnId: string, filterValue: string) => {
  if (!filterValue) return true;
  const value = row.getValue(columnId);
  if (value === null || value === undefined) return false;

  return String(value).toLowerCase().includes(filterValue.toLowerCase());
};

// Function to determine if pagination should be visible
export function shouldPaginationBeVisible(
  showPagination: boolean | undefined,
  enablePagination: boolean,
  totalItems: number,
  pageSize: number
): boolean {
  // If explicit showPagination flag is provided, use it
  if (typeof showPagination !== 'undefined') {
    return showPagination;
  }
  
  // If pagination is disabled, don't show it
  if (!enablePagination) {
    return false;
  }
  
  // Calculate total pages with safety guard against division by zero
  const safePageSize = Math.max(pageSize, 1);
  const totalPages = Math.ceil(totalItems / safePageSize);
  
  // Always show pagination if there are multiple pages
  if (totalPages > 1) {
    return true;
  }
  
  // If we're on the only page and it has fewer items than page size,
  // hide pagination as it's not needed
  return false;
}
