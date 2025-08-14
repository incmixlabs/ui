"use client"

import { useCallback, useEffect, useState } from "react"
import { cellRendererRegistry, registerCellRenderer } from "../cell-renderers"
import { DataTable } from "../components/DataTable"
import type { RowAction } from "../types"

// Custom rating cell renderer (example of extending the table with a new column type)
const RatingCell: React.FC<{ value: number }> = ({ value }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`h-4 w-4 ${star <= value ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <title>
            {star <= value
              ? `Rated ${star} star${star > 1 ? "s" : ""}`
              : "Unrated star"}
          </title>
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
    profileImage: "https://i.pravatar.cc/150?u=alice",
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
    profileImage: "https://i.pravatar.cc/150?u=bob",
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
    profileImage: "https://i.pravatar.cc/150?u=carol",
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
    profileImage: "https://i.pravatar.cc/150?u=david",
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
    profileImage: "https://i.pravatar.cc/150?u=eva",
  },
  {
    id: "user15",
    name: "Olivia Green",
    email: "olivia@example.com",
    joinDate: "2024-03-20",
    isActive: false,
    tags: ["customer"],
    plan: "failed",
    balance: 1050,
    rating: 1,
    profileImage: "https://i.pravatar.cc/150?u=olivia",
  },
]

// Column definitions
const USER_TABLE_COLUMNS = [
  {
    headingName: "Name",
    type: "String" as const,
    accessorKey: "name" as const,
    id: "name",
    enableSorting: true,
    // Example of custom renderer for a standard column type
    renderer: (value: string, row: User) => (
      <div className="flex items-center space-x-2">
        <img
          src={row.profileImage}
          alt={value}
          className="h-8 w-8 rounded-full object-cover"
        />
        <span>{value}</span>
      </div>
    ),
  },
  {
    headingName: "Email",
    type: "String" as const,
    accessorKey: "email" as const,
    id: "email",
    enableSorting: true,
  },
  {
    headingName: "Joined",
    type: "Date" as const,
    accessorKey: "joinDate" as const,
    id: "joinDate",
    enableSorting: true,
    // Example of custom date formatting
    format: {
      dateFormat: "YYYY-MM-DD HH:mm",
    },
  },
  {
    headingName: "Status",
    type: "Boolean" as const,
    accessorKey: "isActive" as const,
    id: "isActive",
    enableSorting: true,
  },
  {
    headingName: "Tags",
    type: "Tag" as const,
    accessorKey: "tags" as const,
    id: "tags",
  },
  {
    headingName: "Plan",
    type: "Status" as const,
    accessorKey: "plan" as const,
    id: "plan",
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
        maximumFractionDigits: 0,
      },
    },
  },
  {
    headingName: "Rating",
    type: "Rating" as const,
    accessorKey: "rating" as const,
    id: "rating",
    enableSorting: true,
  },
]

// Filter definitions
const USER_TABLE_FACETS = [
  {
    column: "isActive",
    title: "Status",
    options: [
      { label: "Active", value: true },
      { label: "Inactive", value: false },
    ],
  },
  {
    column: "plan",
    title: "Plan",
    options: [
      { label: "Success", value: "success" },
      { label: "Pending", value: "pending" },
      { label: "Failed", value: "failed" },
    ],
  },
  {
    column: "tags",
    title: "Role",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Developer", value: "developer" },
      { label: "Customer", value: "customer" },
    ],
  },
  {
    column: "rating",
    title: "Rating",
    options: [
      { label: "★", value: 1 },
      { label: "★★", value: 2 },
      { label: "★★★", value: 3 },
      { label: "★★★★", value: 4 },
      { label: "★★★★★", value: 5 },
    ],
  },
]

/**
 * Enhanced UsersTableDemo - Example usage of the improved DataTable component
 */
const EnhancedUsersTableDemo = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  // Data and loading state
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  /**
   * Fetch users with pagination
   * In a real application, this would be an API call
   */
  const fetchUsers = useCallback(async (page: number, size: number) => {
    setLoading(true)

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Set the total number of items (for pagination calculations)
      setTotalItems(SAMPLE_USERS.length)

      // Get the slice of data for the current page
      const start = page * size
      const end = start + size
      const paginatedUsers = SAMPLE_USERS.slice(start, end)

      setUsers(paginatedUsers)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial data load
  useEffect(() => {
    fetchUsers(currentPage, pageSize)
  }, [currentPage, pageSize, fetchUsers])

  /**
   * Handle page change
   */
  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage)
  }, [])

  /**
   * Handle page size change
   */
  const handlePageSizeChange = useCallback((newPageSize: number) => {
    setPageSize(newPageSize)
    // Reset to first page when changing page size
    setCurrentPage(0)
  }, [])

  /**
   * Define row actions - memoized to prevent recreating on each render
   */
  const getRowActions = useCallback(
    (row: User): RowAction[] => [
      {
        label: "View Profile",
        onClick: () => alert(`View profile of ${row.name}`),
        icon: <span className="mr-2">👤</span>,
      },
      {
        label: "Edit User",
        onClick: () => alert(`Edit user ${row.name}`),
        icon: <span className="mr-2">✏️</span>,
      },
      {
        label: "Delete User",
        onClick: () => alert(`Delete user ${row.name}`),
        icon: <span className="mr-2">🗑️</span>,
        color: "text-red-500",
        disabled: row.isActive, // Disable delete for active users
      },
    ],
    []
  )

  // User detail component for expandable rows
  const renderUserDetails = useCallback(
    (user: User) => (
      <div className="rounded-md bg-gray-50 p-4 dark:bg-gray-800">
        <div className="flex items-start">
          <img
            src={user.profileImage}
            alt={user.name}
            className="mr-4 h-20 w-20 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-lg">{user.name}</h3>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <span className="text-gray-500 text-sm">Account Status:</span>
                <p>{user.isActive ? "Active" : "Inactive"}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Current Plan:</span>
                <p className="capitalize">{user.plan}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Join Date:</span>
                <p>{new Date(user.joinDate).toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-gray-500 text-sm">Balance:</span>
                <p>${user.balance.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    []
  )

  // Handle selection change
  const handleSelectionChange = useCallback((selectedRows: User[]) => {
    console.log("Selected rows:", selectedRows)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-4 font-bold text-2xl">Enhanced Users Management</h1>

      <DataTable
        columns={USER_TABLE_COLUMNS}
        data={users}
        enableRowSelection={true}
        enableSorting={true}
        enablePagination={true}
        enableColumnVisibility={true}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
        rowActions={getRowActions}
        facets={USER_TABLE_FACETS}
        // Server pagination props
        serverPagination={true}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isPaginationLoading={loading}
        // Enhanced features
        export={{
          enabled: true,
          formats: ["csv", "excel"],
          filename: "users-data",
        }}
        // Expandable rows
        expandableRows={{
          render: renderUserDetails,
          expandOnClick: true,
          singleExpand: true,
        }}
        // Events
        onSelectionChange={handleSelectionChange}
      />
    </div>
  )
}

export default EnhancedUsersTableDemo
