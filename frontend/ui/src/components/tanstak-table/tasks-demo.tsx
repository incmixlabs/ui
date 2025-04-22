"use client"

import React, { useState, useEffect, useCallback } from "react"
import { DataTable, DataTableFacet } from "./tanstak-table"


interface User {
  id: string
  name: string
  email: string
  joinDate: string
  isActive: boolean
  tags: string[]
  plan: string
  balance: number
}

const SAMPLE_USERS: User[] = [
  {
    id: "user1",
    name: "Alice Smith",
    email: "alice@example.com",
    joinDate: "2023-01-15",
    isActive: true,
    tags: ["admin", "developer"],
    plan: "success",
    balance: 2480,
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
  },
  {
    id: "user3",
    name: "Carol Williams",
    email: "carol@example.com",
    joinDate: "2023-03-10",
    isActive: true,
    tags: ["admin"],
    plan: "success",
    balance: 3200,
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
  },
]

const USER_TABLE_COLUMNS = [
  {
    headingName: "Name",
    type: "String" as const,
    accessorKey: "name",
    id: "name",
    enableSorting: true,
  },
  {
    headingName: "Email",
    type: "String" as const,
    accessorKey: "email",
    id: "email",
    enableSorting: true,
  },
  {
    headingName: "Joined",
    type: "Date" as const,
    accessorKey: "joinDate",
    id: "joinDate",
    enableSorting: true,
  },
  {
    headingName: "Status",
    type: "Boolean" as const,
    accessorKey: "isActive",
    id: "isActive",
    enableSorting: true,
  },
  {
    headingName: "Tags",
    type: "Tag" as const,
    accessorKey: "tags",
    id: "tags",
  },
  {
    headingName: "Plan",
    type: "Status" as const,
    accessorKey: "plan",
    id: "plan",
  },
  {
    headingName: "Balance",
    type: "Currency" as const,
    accessorKey: "balance",
    id: "balance",
    enableSorting: true,
  },
]

const USER_TABLE_FACETS: DataTableFacet<User>[] = [
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
  }
]

/**
 * UsersTableDemo - Example usage of the DataTable component for user management
 */
const UsersTableDemo = () => {
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
      await new Promise(resolve => setTimeout(resolve, 800))

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
  const getRowActions = useCallback((row: User) => [
    {
      label: "View Profile",
      onClick: () => alert(`View profile of ${row.name}`),
    },
    {
      label: "Edit User",
      onClick: () => alert(`Edit user ${row.name}`),
    },
    {
      label: "Delete User",
      onClick: () => alert(`Delete user ${row.name}`),
    },
  ], [])

  // For debugging - log to console to see which columns are available
  useEffect(() => {
    console.log("Table data loaded:", users);
  }, [users]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>

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
        // Add faceted filters
        facets={USER_TABLE_FACETS}
        // Server pagination props
        serverPagination={true}
        currentPage={currentPage}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isPaginationLoading={loading}
      />
    </div>
  )
}

export default UsersTableDemo