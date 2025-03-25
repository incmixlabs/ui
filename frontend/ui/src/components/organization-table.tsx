"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table"
import { Checkbox } from "@radix-ui/themes"

// Define the data structure types
interface DataItem {
  name?: string
  notes?: string
  value?: string
}

interface Item {
  children?: Item[]
  data?: DataItem
  expanded?: boolean
  id: string
  name: string
  type: "folder" | "file"
  value?: string
  createdOn?: string
  createdBy?: string
}

export default function ExpandableTable() {
  const [data, setData] = useState<Item[]>([
    {
      children: [],
      data: { name: "firebase", notes: "" },
      expanded: true,
      id: "ff15854b-e7fb-4e99-8e74-98f54dd6b152",
      name: "firebase",
      type: "folder",
    },
    {
      children: [],
      data: { name: "Supabase", notes: "" },
      expanded: false,
      id: "54e2b1f8-2551-428e-9549-28d804463d57",
      name: "Supabase",
      type: "folder",
    },
    {
      children: [
        {
          children: [
            {
              data: {
                name: "lemonsqueezy",
                value: "sk.jhoshadfohsoaghfiosujodfulosdahfihsgdfhiosdhfiuasgdhifuasden",
                notes: "",
              },
              id: "a6f68b76-c661-4678-a0ae-9675db07269e",
              name: "lemonsqueezy",
              type: "file",
            },
            {
              type: "file",
              id: "331d099b-f26b-47f8-bf02-1d5c479aca4a",
              name: "secret key",
              data: {},
            },
            {
              type: "file",
              id: "e75a2855-14b0-47b0-8328-773019f58880",
              name: "private key",
              data: {},
            },
          ],
          data: { name: "ami", notes: "" },
          expanded: true,
          id: "597439ef-f509-42aa-a055-5a95463b8a24",
          name: "ami",
          type: "folder",
        },
        {
          children: [],
          data: { name: "Stripe", notes: "" },
          expanded: false,
          id: "852ed527-711c-4805-b983-d9aba4e88df8",
          name: "Stripe",
          type: "folder",
        },
      ],
      expanded: true,
      id: "item-2",
      name: "Integrations",
      type: "folder",
    },
  ])

  const toggleExpand = (itemId: string) => {
    setData((prevData) => {
      const updateItem = (items: Item[]): Item[] => {
        return items.map((item) => {
          if (item.id === itemId) {
            return { ...item, expanded: !item.expanded }
          }
          if (item.children && item.children.length > 0) {
            return { ...item, children: updateItem(item.children) }
          }
          return item
        })
      }
      return updateItem(prevData)
    })
  }

  const renderRows = (items: Item[], level = 0) => {
    return items.flatMap((item, index) => {
      const rows = [
        <TableRow key={item.id}>
          <TableCell className="w-12 border border-gray-200">
            <Checkbox />
          </TableCell>
          <TableCell className="border border-gray-200">
            <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
              {item.type === "folder" && (
                <button onClick={() => toggleExpand(item.id)} className="mr-2 focus:outline-none">
                  {item.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              )}
              {item.type === "file" && <div className="w-6" />}
              <span className={item.type === "folder" ? "font-medium" : ""}>{item.name}</span>
            </div>
          </TableCell>
          <TableCell className="max-w-xs border border-gray-200">
            {item.type === "file" && item.data?.value ? (
              <div className="truncate" title={item.data.value}>
                {item.data.value}
              </div>
            ) : (
              ""
            )}
          </TableCell>
          <TableCell className="border border-gray-200">{item.createdOn || null}</TableCell>
          <TableCell className="border border-gray-200">{item.createdBy || null}</TableCell>
        </TableRow>,
      ]

      // If the item is a folder and is expanded, render its children
      if (item.type === "folder" && item.expanded && item.children && item.children.length > 0) {
        rows.push(...renderRows(item.children, level + 1))
      }

      return rows
    })
  }

  return (
    <div className="container mx-auto py-10">
      <Table className="border-collapse border border-gray-200">
        <TableHeader>
          <TableRow>
            <TableHead className="w-12 border border-gray-200">
              <Checkbox />
            </TableHead>
            <TableHead className="border border-gray-200">Description</TableHead>
            <TableHead className="w-64 border border-gray-200">Value</TableHead>
            <TableHead className="border border-gray-200">Created on</TableHead>
            <TableHead className="border border-gray-200">Created by</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderRows(data)}</TableBody>
      </Table>
    </div>
  )
}

