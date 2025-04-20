"use client"

import React, { useState, useEffect } from "react"
import { DataTable } from "./tanstak-table"

// Define User interface
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

const UsersTableDemo = () => {
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalItems, setTotalItems] = useState(0)

  // Data and loading state
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  // Define your columns with the updated property name "headingName"
  const columns = [
    {
      headingName: "Name",
      type: "String" as const,
      accessorKey: "name",
      enableSorting: true,
    },
    {
      headingName: "Email",
      type: "String" as const,
      accessorKey: "email",
      enableSorting: true,
    },
    {
      headingName: "Joined",
      type: "Date" as const,
      accessorKey: "joinDate",
      enableSorting: true,
    },
    {
      headingName: "Status",
      type: "Boolean" as const,
      accessorKey: "isActive",
    },
    {
      headingName: "Tags",
      type: "Tag" as const,
      accessorKey: "tags",
    },
    {
      headingName: "Plan",
      type: "Status" as const,
      accessorKey: "plan",
    },
    {
      headingName: "Balance",
      type: "Currency" as const,
      accessorKey: "balance",
      enableSorting: true,
    },
  ]

  // Sample user data - this would normally come from an API
  const allUsers: User[] = [
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
      joinDate: "2023-03-05",
      isActive: true,
      tags: ["customer", "premium"],
      plan: "processing",
      balance: 3750,
    },
    {
      id: "user4",
      name: "David Miller",
      email: "david@example.com",
      joinDate: "2023-04-12",
      isActive: true,
      tags: ["developer", "contractor"],
      plan: "success",
      balance: 4200,
    },
    {
      id: "user5",
      name: "Emma Wilson",
      email: "emma@example.com",
      joinDate: "2023-05-22",
      isActive: false,
      tags: ["customer"],
      plan: "failed",
      balance: 950,
    },
    {
      id: "user6",
      name: "Frank Davis",
      email: "frank@example.com",
      joinDate: "2023-06-10",
      isActive: true,
      tags: ["admin", "support"],
      plan: "success",
      balance: 3150,
    },
    {
      id: "user7",
      name: "Grace Taylor",
      email: "grace@example.com",
      joinDate: "2023-07-08",
      isActive: true,
      tags: ["developer", "premium"],
      plan: "processing",
      balance: 2900,
    },
    {
      id: "user8",
      name: "Henry Brown",
      email: "henry@example.com",
      joinDate: "2023-08-15",
      isActive: false,
      tags: ["customer"],
      plan: "pending",
      balance: 1100,
    },
    {
      id: "user9",
      name: "Isabelle Clark",
      email: "isabelle@example.com",
      joinDate: "2023-09-22",
      isActive: true,
      tags: ["customer", "premium"],
      plan: "success",
      balance: 4500,
    },
    {
      id: "user10",
      name: "Jack Wilson",
      email: "jack@example.com",
      joinDate: "2023-10-05",
      isActive: true,
      tags: ["developer"],
      plan: "processing",
      balance: 2750,
    },
    {
      id: "user11",
      name: "Karen Lee",
      email: "karen@example.com",
      joinDate: "2023-11-11",
      isActive: false,
      tags: ["customer"],
      plan: "failed",
      balance: 800,
    },
    {
      id: "user12",
      name: "Leo Martin",
      email: "leo@example.com",
      joinDate: "2023-12-19",
      isActive: true,
      tags: ["admin", "developer"],
      plan: "success",
      balance: 3800,
    },
    {
      id: "user13",
      name: "Mia Thompson",
      email: "mia@example.com",
      joinDate: "2024-01-02",
      isActive: true,
      tags: ["support", "contractor"],
      plan: "pending",
      balance: 2100,
    },
    {
      id: "user14",
      name: "Noah White",
      email: "noah@example.com",
      joinDate: "2024-02-14",
      isActive: true,
      tags: ["customer", "premium"],
      plan: "processing",
      balance: 5200,
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

  // Function to simulate fetching paginated data from an API
  const fetchUsers = async (page: number, size: number) => {
    setLoading(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 800))

    // In a real application, this would be a fetch call to your backend API
    // with pagination parameters

    // Set the total number of items (for pagination calculations)
    setTotalItems(allUsers.length)

    // Get the slice of data for the current page
    const start = page * size
    const end = start + size
    const paginatedUsers = allUsers.slice(start, end)

    setUsers(paginatedUsers)
    setLoading(false)
  }

  // Initial data load
  useEffect(() => {
    fetchUsers(currentPage, pageSize)
  }, [])

  // Handle page change
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    fetchUsers(newPage, pageSize)
  }

  // Handle page size change
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize)
    // Reset to first page when changing page size
    setCurrentPage(0)
    fetchUsers(0, newPageSize)
  }

  // Row actions definition
  const rowActions = (row: User) => [
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
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Users Management</h1>

      <DataTable
        columns={columns}
        data={users}
        enableRowSelection={true}
        enableSorting={true}
        enablePagination={true}
        enableColumnVisibility={true}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
        rowActions={rowActions}
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