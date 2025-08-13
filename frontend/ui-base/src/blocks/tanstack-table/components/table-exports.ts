/**
 * This file provides fixed exports for table components with proper memoization
 */
import React from "react"

// Import the component from its source file using named imports
import { TableFiltersComponent } from "./TableFilters"

// Re-export memoized versions with proper generic type preservation
export const MemoizedTableFilters = React.memo(
  TableFiltersComponent
) as typeof TableFiltersComponent

// You can add other memoized components here as needed
