"use client"

import React, { useState, useEffect, useCallback } from "react"
import { registerCellRenderer, cellRendererRegistry } from "./cell-renderers"
import { DataTable } from "./components/DataTable"
import { EyeIcon } from "lucide-react"
import { RowAction } from "./types"

// Custom rating cell renderer
const RatingCell: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map(star => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= value ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

// Register the custom cell renderer (with idempotency check)
if (!cellRendererRegistry["Rating"]) {
  registerCellRenderer("Rating", (value) => <RatingCell value={value} />)
}

// Define user interface
interface User {
  id: string
  name: string
  email: string
  joinDate: string
  isActive: boolean
  tags: string[]
  plan: string
  balance: number
  rating: number
  profileImage: string
}

// Sample data
const SAMPLE_USERS: User[] = [
  {
    id: "user1",
    name: "Alice Smith",
    email: "alice@example.com",
    joinDate: "2023-01-15T10:30:00",
    isActive: true,
    tags: ["admin", "developer"],
    plan: "success",
    balance: 2480,
    rating: 5,
    profileImage: "https://i.pravatar.cc/150?u=alice"
  },
  {
    id: "user2",
    name: "Bob Johnson",
    email: "bob@example.com",
    joinDate: "2023-02-20",
    isActive: false,
    tags: ["customer"],
    plan: "pending",
    balance: 1250,
    rating: 3,
    profileImage: "https://i.pravatar.cc/150?u=bob"
  },
  {
    id: "user3",
    name: "Carol Williams",
    email: "carol@example.com",
    joinDate: "2023-03-10T14:15:00",
    isActive: true,
    tags: ["admin"],
    plan: "success",
    balance: 3200,
    rating: 4,
    profileImage: "https://i.pravatar.cc/150?u=carol"
  },
  {
    id: "user4",
    name: "David Brown",
    email: "david@example.com",
    joinDate: "2023-04-05",
    isActive: true,
    tags: ["developer"],
    plan: "pending",
    balance: 1890,
    rating: 4,
    profileImage: "https://i.pravatar.cc/150?u=david"
  },
  {
    id: "user5",
    name: "Eva Garcia",
    email: "eva@example.com",
    joinDate: "2023-05-12",
    isActive: false,
    tags: ["customer"],
    plan: "failed",
    balance: 750,
    rating: 2,
    profileImage: "https://i.pravatar.cc/150?u=eva"
  }
]

// Column definitions
const USER_TABLE_COLUMNS = [
  {
    headingName: "Name",
    type: "String" as const,
    accessorKey: "name" as const,
    id: "name",
    enableSorting: true,
    enableInlineEdit: true, // Enable inline editing for this column
    // Custom renderer for display (doesn't affect inline editing)
    renderer: (value: string, row: User) => (
      <div className="flex items-center space-x-2">
        <img
          src={row.profileImage}
          alt={value}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span>{value}</span>
      </div>
    )
  },
  {
    headingName: "Email",
    type: "String" as const,
    accessorKey: "email" as const,
    id: "email",
    enableSorting: true,
    enableInlineEdit: true // Enable inline editing for this column
  },
  {
    headingName: "Joined",
    type: "Date" as const,
    accessorKey: "joinDate" as const,
    id: "joinDate",
    enableSorting: true,
    // Example of custom date formatting
    format: {
      dateFormat: "YYYY-MM-DD HH:mm"
    }
  },
  {
    headingName: "Status",
    type: "Boolean" as const,
    accessorKey: "isActive" as const,
    id: "isActive",
    enableSorting: true
  },
  {
    headingName: "Tags",
    type: "Tag" as const,
    accessorKey: "tags" as const,
    id: "tags"
  },
  {
    headingName: "Plan",
    type: "Status" as const,
    accessorKey: "plan" as const,
    id: "plan"
  },
  {
    headingName: "Balance",
    type: "Currency" as const,
    accessorKey: "balance" as const,
    id: "balance",
    enableSorting: true,
    // Example of custom currency formatting
    format: {
      numberFormat: {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }
    }
  },
  {
    headingName: "Rating",
    type: "Rating" as const,
    accessorKey: "rating" as const,
    id: "rating",
    enableSorting: true
  }
]

// Filter definitions
const USER_TABLE_FACETS = [
  {
    column: "isActive",
    title: "Status",
    options: [
      { label: "Active", value: true },
      { label: "Inactive", value: false }
    ]
  },
  {
    column: "plan",
    title: "Plan",
    options: [
      { label: "Success", value: "success" },
      { label: "Pending", value: "pending" },
      { label: "Failed", value: "failed" }
    ]
  }
]

/**
 * Users Table Demo with Inline Cell Editing
 * This demo shows how to use inline cell editing with improved interaction pattern
 */
const InlineEditDemo = () => {
  // Store all users data
  const [allUsers, setAllUsers] = useState<User[]>([...SAMPLE_USERS])

  // Data and loading state for current page
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  // Track last edited cell for visual feedback
  const [lastEditedCell, setLastEditedCell] = useState<{id: string, column: string} | null>(null);

  /**
   * Fetch users (simulated API call)
   */
  const fetchUsers = useCallback(async () => {
    setLoading(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800))
      setUsers([...allUsers])
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }, [allUsers])

  // Initial data load
  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  /**
   * Define row actions
   */
  const getRowActions = useCallback((row: User): RowAction[] => {
    return [
      {
        label: "View Profile",
        icon: <EyeIcon className="h-4 w-4" />,
        onClick: () => {
          console.log("Viewing user profile:", row.name)
          alert(`Viewing profile for ${row.name}`)
        }
      }
    ]
  }, [])

  /**
   * Handle cell edit - key functionality for inline editing
   * This implementation prevents full table reloads by immutably updating only the changed data
   */
  const handleCellEdit = useCallback((rowData: User, columnId: string, newValue: string) => {
    console.log(`Editing cell ${columnId} for user ${rowData.id}:`, newValue)

    // Track which cell was just edited (for visual feedback)
    setLastEditedCell({id: rowData.id, column: columnId});

    // Create updated user
    const updatedUser = {
      ...rowData,
      [columnId]: newValue
    }

    // Update the user in the full dataset (immutably)
    setAllUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    )

    // Only update the changed user in the current view
    setUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    )

    // Clear the visual feedback after a delay
    setTimeout(() => {
      setLastEditedCell(null);
    }, 1000);
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Inline Cell Editing Demo</h1>
      <p className="text-gray-600 mb-6">
        Click once on a name or email to select it, then click again to edit.
      </p>

      <DataTable
        columns={USER_TABLE_COLUMNS}
        data={users}
        enableRowSelection={true}
        enableSorting={true}
        enablePagination={false}
        enableColumnVisibility={true}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
        rowActions={getRowActions}
        facets={USER_TABLE_FACETS}
        isPaginationLoading={loading}

        // Inline editing functionality
        enableInlineCellEdit={true}
        inlineEditableColumns={["name", "email"]} // Alternative to individual column settings
        onCellEdit={handleCellEdit}
      />


    </div>
  )
}

export default InlineEditDemo
