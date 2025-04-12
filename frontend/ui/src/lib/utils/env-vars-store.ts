import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { TreeDataItem } from "@/types"

// Zustand store
type EnvVarsState = {
  treeData: TreeDataItem[] // Changed from TreeDataItem[] | TreeDataItem to just TreeDataItem[]
  setTreeData: (data: TreeDataItem[] | TreeDataItem) => void
}

export const useEnvVarsStore = create<EnvVarsState>()(
  persist(
    (set) => ({
      treeData: [
        {
          children: [
            {
              children: [
                {
                  data: {
                    name: "ami_nay",
                    notes: "",
                    value: "amilkjsadh1F98uwekhjkd1hfajsfd",
                  },
                  id: "27dc2ec3-b7dc-4a08-b414-8d1cf65b3df8",
                  name: "ami_nay",
                  type: "file",
                },
              ],
              data: { name: "ami", notes: "" },
              expanded: true,
              id: "548bcccc-9738-4d45-adc2-60be589a33a6",
              name: "ami",
              type: "folder",
            },
            {
              data: {
                name: "secreat_key",
                notes: "",
                value: "sk.d1safjkkds;f08932doiwuyeroiuhdfasdfaadf1sdfo",
              },
              id: "60958687-7e3f-42f6-9675-491f0bc10e10",
              name: "secreat_key",
              type: "file",
            },
          ],
          expanded: true,
          id: "root-folder",
          name: "Environment Variables",
          type: "folder",
        },
      ],
      setTreeData: (data) =>
        set({
          treeData: Array.isArray(data) ? data : [data],
        }),
    }),
    {
      name: "env-vars-storage",
    }
  )
)

// Helper functions for tree manipulation
export const findItemById = (
  items: TreeDataItem[] | TreeDataItem,
  id: string
): TreeDataItem | null => {
  const itemsArray = Array.isArray(items) ? items : [items]

  for (const item of itemsArray) {
    if (item.id === id) {
      return item
    }

    if (item.children && item.children.length > 0) {
      const found = findItemById(item.children, id)
      if (found) return found
    }
  }

  return null
}

export const findParentArrayAndIndex = (
  items: TreeDataItem[] | TreeDataItem,
  id: string,
  parent: TreeDataItem[] | null = null
): { parentArray: TreeDataItem[]; index: number } | null => {
  const itemsArray = Array.isArray(items) ? items : [items]

  for (let i = 0; i < itemsArray.length; i++) {
    if (itemsArray[i].id === id) {
      return { parentArray: parent || itemsArray, index: i }
    }

    // Check if children exists and has items before recursing
    const children = itemsArray[i].children
    if (children && children.length > 0) {
      const found = findParentArrayAndIndex(children, id, children)
      if (found) return found
    }
  }

  return null
}

export const removeItemById = (
  items: TreeDataItem[] | TreeDataItem,
  id: string
): TreeDataItem[] => {
  const itemsArray = Array.isArray(items) ? items : [items]

  return itemsArray
    .filter((item) => item.id !== id)
    .map((item) => {
      if (item.children) {
        return {
          ...item,
          children: removeItemById(item.children, id) as TreeDataItem[],
        }
      }
      return item
    })
}
