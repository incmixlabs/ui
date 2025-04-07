import { createContext, useContext } from "react"

import invariant from "tiny-invariant"

export type ColumnContextProps = {
  columnId: string
  getTaskIndex: (taskId: string) => number
  getNumTasks: () => number
}

export const ColumnContext = createContext<ColumnContextProps | null>(null)

export function useColumnContext(): ColumnContextProps {
  const value = useContext(ColumnContext)
  invariant(value, "cannot find ColumnContext provider")
  return value
}
