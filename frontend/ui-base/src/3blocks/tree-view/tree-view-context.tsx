"use client"

import { createContext, useContext } from "react"
import type { TreeViewContextType } from "./types"

const TreeViewContext = createContext<TreeViewContextType | null>(null)

export function useTreeViewContext() {
  const context = useContext(TreeViewContext)
  if (!context) {
    throw new Error("useTreeViewContext must be used within TreeViewProvider")
  }
  return context
}

type TreeViewProviderProps = TreeViewContextType & {
  children: React.ReactNode
}

export function TreeViewProvider({
  children,
  fileFields,
  folderFields,
  descriptions,
}: TreeViewProviderProps) {
  return (
    <TreeViewContext.Provider
      value={{ fileFields, folderFields, descriptions }}
    >
      {children}
    </TreeViewContext.Provider>
  )
}
