"use client"

import { EyeIcon } from "lucide-react"
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
            {star <= value ? `Filled star ${star}` : `Empty star ${star}`}
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
  dueDate?: string // New field for date picker demo
  assignedTo?: User[] // New field for people picker demo
}

// Sample users for assignment (simplified for demo)
const SAMPLE_ASSIGNABLE_USERS: User[] = [
  {
    id: "assign1",
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2023-01-01",
    isActive: true,
    tags: ["admin"],
    plan: "success",
    balance: 1000,
    rating: 5,
    profileImage: "https://i.pravatar.cc/150?u=john",
  },
  {
    id: "assign2",
    name: "Jane Smith",
    email: "jane@example.com",
    joinDate: "2023-01-01",
    isActive: true,
    tags: ["developer"],
    plan: "success",
    balance: 1000,
    rating: 4,
    profileImage: "https://i.pravatar.cc/150?u=jane",
  },
  {
    id: "assign3",
    name: "Mike Johnson",
    email: "mike@example.com",
    joinDate: "2023-01-01",
    isActive: true,
    tags: ["customer"],
    plan: "success",
    balance: 1000,
    rating: 3,
    profileImage: "https://i.pravatar.cc/150?u=mike",
  },
]

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
    dueDate: "2025-02-15T00:00:00.000Z",
    assignedTo: [],
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
    dueDate: "2025-03-01T00:00:00.000Z",
    assignedTo: [],
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
    dueDate: "2025-01-30T00:00:00.000Z",
    assignedTo: [],
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
    dueDate: "2025-04-10T00:00:00.000Z",
    assignedTo: [],
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
    dueDate: "2025-02-28T00:00:00.000Z",
    assignedTo: [],
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
    dueDate: "2025-05-15T00:00:00.000Z",
    assignedTo: [],
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
      dueDate: {
        type: "string",
        format: "date",
        title: "Due Date",
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
    dueDate: {
      description: "Due date for user tasks",
      fieldType: "date",
      inputProps: {
        placeholder: "Select due date",
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
  {
    headingName: "Due Date",
    type: "Date" as const,
    accessorKey: "dueDate" as const,
    id: "dueDate",
    enableSorting: true,
    enableInlineEdit: true,
    cellAttributes: {
      className:
        "cursor-pointer transition-colors duration-150 hover:bg-gray-50",
      title: "Double-click to edit due date",
    },
  },
  {
    headingName: "Assigned To",
    type: "People" as const,
    accessorKey: "assignedTo" as const,
    id: "assignedTo",
    enableSorting: false,
    enableInlineEdit: true,
    size: 150,
    meta: {
      availableUsers: SAMPLE_ASSIGNABLE_USERS,
      maxVisible: 3,
      maxSelections: 10,
    },
    cellAttributes: {
      className:
        "cursor-pointer transition-colors duration-150 hover:bg-gray-50",
      title: "Double-click to edit assignments",
    },
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
 * Enhanced UsersTableDemo with Edit Capabilities
 * This demo extends the previous example by adding row editing functionality
 */
const EditableUsersTableDemo = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  // Store all users data (not just the current page)
  const [allUsers, setAllUsers] = useState<User[]>([])

  // Initialize users with assigned users after component mounts
  useEffect(() => {
    const initialUsers = SAMPLE_USERS.map((user, index) => ({
      ...user,
      assignedTo:
        index % 3 === 0
          ? [SAMPLE_ASSIGNABLE_USERS[0]]
          : index % 3 === 1
            ? [SAMPLE_ASSIGNABLE_USERS[1], SAMPLE_ASSIGNABLE_USERS[2]]
            : [SAMPLE_ASSIGNABLE_USERS[0], SAMPLE_ASSIGNABLE_USERS[2]],
    }))
    setAllUsers(initialUsers)
  }, [])

  // Data and loading state for current page
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  /**
   * Fetch users with pagination
   * In a real application, this would be an API call
   */
  const fetchUsers = useCallback(
    async (page: number, size: number) => {
      setLoading(true)

      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800))

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
    },
    [allUsers]
  )

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
        },
      },
    ]
  }, [])

  // User detail component for expandable rows
  const _renderUserDetails = useCallback(
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
      rating:
        typeof newData.rating === "string"
          ? Number.parseInt(newData.rating, 10)
          : newData.rating,
    }

    // Create updated user (preserving fields not in the form)
    const updatedUser = {
      ...oldData,
      ...processedData,
      // Ensure we preserve fields not in the form schema
      id: oldData.id,
      tags: oldData.tags,
      profileImage: oldData.profileImage,
      joinDate: oldData.joinDate,
    }

    // Update the user in the full dataset
    setAllUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    )

    // Also update the current page if the edited user is in the current view
    setUsers((prevPageUsers) =>
      prevPageUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    )

    // Show success message
    alert(`User ${newData.name} updated successfully!`)
  }, [])

  /**
   * Handle inline cell edit - for date picker and people picker
   */
  const handleCellEdit = useCallback(
    (rowData: User, columnId: string, newValue: any) => {
      console.log("Inline cell edit:", {
        rowData: rowData.id,
        columnId,
        newValue,
      })

      // Create updated user
      const updatedUser = {
        ...rowData,
        [columnId]: newValue,
      }

      // Update the user in the full dataset
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      )

      // Also update the current page if the edited user is in the current view
      setUsers((prevPageUsers) =>
        prevPageUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      )

      console.log(`Updated ${columnId} for user ${rowData.name}`)
    },
    []
  )

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-4 font-bold text-2xl">Editable Users Table</h1>
      <p className="mb-6 text-gray-600">
        This demo showcases the edit functionality with form validation
      </p>

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
        // Inline editing functionality
        enableInlineCellEdit={true}
        inlineEditableColumns={["dueDate", "assignedTo"]}
        onCellEdit={handleCellEdit}
        // Events
        onSelectionChange={handleSelectionChange}
      />
    </div>
  )
}

export default EditableUsersTableDemo
