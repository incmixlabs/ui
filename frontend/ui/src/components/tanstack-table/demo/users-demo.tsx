"use client"

import React from "react"
import { DataTable } from "../components/DataTable"

const UsersTableDemo = () => {
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

  // Sample data
  const data = [
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
  ]

  // Row actions definition
  const rowActions = (row: any) => [
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
        data={data}
        enableRowSelection={true}
        enableSorting={true}
        enablePagination={true}
        enableColumnVisibility={true}
        filterColumn="name"
        filterPlaceholder="Filter by name..."
        rowActions={rowActions}
      />
    </div>
  )
}

export default UsersTableDemo
