"use client"

import React, { useState, useEffect, useCallback } from "react"
import { z } from 'zod'
import { registerCellRenderer, cellRendererRegistry } from "./cell-renderers"
import { RowAction } from "./types"
import { DataTable } from "./components/DataTable"
import { EyeIcon, PencilIcon } from "lucide-react"

// Custom rating cell renderer (example of extending the table with a new column type)
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
    profileImage: "https://i.pravatar.cc/150?u=olivia"
  },
]


// Define the form schema in the correct format for AutoForm
const userEditSchema = {
  formSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        minLength: 2,
        title: "Name",
      },
      email: {
        type: "string",
        format: "email",
        title: "Email Address",
      },
      isActive: {
        type: "boolean",
        title: "Account Status",
      },
      plan: {
        type: "string",
        enum: ["success", "pending", "failed"],
        title: "Plan Status",
      },
      balance: {
        type: "number",
        minimum: 0,
        title: "Account Balance",
      },
      rating: {
        type: "string",
        enum: ["1", "2", "3", "4", "5"],
        title: "User Rating",
      },
    },
    required: ["name", "email", "plan", "rating"],
  },
  fieldConfig: {
    name: {
      description: "User's full name",
      inputProps: {
        placeholder: "Enter user's full name",
      },
    },
    email: {
      description: "User's email address",
      inputProps: {
        placeholder: "user@example.com",
      },
    },
    isActive: {
      description: "Whether the user account is active or inactive",
    },
    plan: {
      description: "Current subscription plan status",
      fieldType: "select",
      inputProps: {
        options: [
          { label: "Success", value: "success" },
          { label: "Pending", value: "pending" },
          { label: "Failed", value: "failed" },
        ],
      },
    },
    balance: {
      description: "User's account balance in USD",
      fieldType: "number",
      inputProps: {
        placeholder: "0.00",
        prefix: "$",
      },
    },
    rating: {
      description: "User satisfaction rating from 1-5 stars",
      fieldType: "select",
      inputProps: {
        options: [
          { label: "★", value: "1" },
          { label: "★★", value: "2" },
          { label: "★★★", value: "3" },
          { label: "★★★★", value: "4" },
          { label: "★★★★★", value: "5" },
        ],
      },
    },
  },
}

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
    )
  },
  {
    headingName: "Email",
    type: "String" as const,
    accessorKey: "email" as const,
    id: "email",
    enableSorting: true
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
  },
  {
    column: "tags",
    title: "Role",
    options: [
      { label: "Admin", value: "admin" },
      { label: "Developer", value: "developer" },
      { label: "Customer", value: "customer" }
    ]
  },
  {
    column: "rating",
    title: "Rating",
    options: [
      { label: "★", value: 1 },
      { label: "★★", value: 2 },
      { label: "★★★", value: 3 },
      { label: "★★★★", value: 4 },
      { label: "★★★★★", value: 5 }
    ]
  }
]

/**
 * Enhanced UsersTableDemo with Edit Capabilities
 * This demo extends the previous example by adding row editing functionality
 */
const EditableUsersTableDemo = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  // Store all users data (not just the current page)
  const [allUsers, setAllUsers] = useState<User[]>([...SAMPLE_USERS])

  // Data and loading state for current page
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
      await new Promise(resolve => setTimeout(resolve, 800))

      // Set the total number of items (for pagination calculations)
      setTotalItems(allUsers.length)

      // Get the slice of data for the current page
      const start = page * size
      const end = start + size
      const paginatedUsers = allUsers.slice(start, end)

      setUsers(paginatedUsers)
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setLoading(false)
    }
  }, [allUsers])

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
   * Define row actions
   */
  const getRowActions = useCallback((row: User): RowAction[] => {
    return [
      {
        label: "View Profile",
        icon: <EyeIcon className="h-4 w-4" />,
        onClick: () => {
          console.log("Viewing user profile:", row.name)
        }
      }
    ]
  }, [])

  // User detail component for expandable rows
  const renderUserDetails = useCallback((user: User) => (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
      <div className="flex items-start">
        <img
          src={user.profileImage}
          alt={user.name}
          className="h-20 w-20 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{user.name}</h3>
          <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          <div className="mt-2 grid grid-cols-2 gap-2">
            <div>
              <span className="text-sm text-gray-500">Account Status:</span>
              <p>{user.isActive ? "Active" : "Inactive"}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Current Plan:</span>
              <p className="capitalize">{user.plan}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Join Date:</span>
              <p>{new Date(user.joinDate).toLocaleDateString()}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Balance:</span>
              <p>${user.balance.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ), [])

  // Handle selection change
  const handleSelectionChange = useCallback((selectedRows: User[]) => {
    console.log("Selected rows:", selectedRows)
  }, [])

  /**
   * Handle row edit - this is the key new functionality
   */
  const handleRowEdit = useCallback((oldData: User, newData: any) => {
    // Log the edit
    console.log("Editing user:", oldData)
    console.log("New data:", newData)

    // Convert string values back to their original types if needed
    const processedData = {
      ...newData,
      // Convert rating from string to number
      rating: typeof newData.rating === 'string' ? parseInt(newData.rating, 10) : newData.rating
    };

    // Create updated user (preserving fields not in the form)
    const updatedUser = {
      ...oldData,
      ...processedData,
      // Ensure we preserve fields not in the form schema
      id: oldData.id,
      tags: oldData.tags,
      profileImage: oldData.profileImage,
      joinDate: oldData.joinDate
    }

    // Update the user in the full dataset
    setAllUsers(prevUsers =>
      prevUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    )

    // Also update the current page if the edited user is in the current view
    setUsers(prevPageUsers =>
      prevPageUsers.map(user =>
        user.id === updatedUser.id ? updatedUser : user
      )
    )

    // Show success message
    alert(`User ${newData.name} updated successfully!`)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Editable Users Table</h1>
      <p className="text-gray-600 mb-6">This demo showcases the edit functionality with form validation</p>

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
          filename: "users-data"
        }}

        // Expandable rows
        // expandableRows={{
        //   render: renderUserDetails,
        //   expandOnClick: false, // Disable automatic expansion on row click
        //   singleExpand: true
        // }}

        // Edit functionality - new additions
        enableRowEdit={true}
        editFormSchema={userEditSchema.formSchema}
        editFieldConfig={userEditSchema.fieldConfig}
        onRowEdit={handleRowEdit}
        editDialogTitle="Edit User Profile"

        // Events
        onSelectionChange={handleSelectionChange}
      />


    </div>
  )
}

export default EditableUsersTableDemo
