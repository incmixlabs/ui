import { createContext, useContext } from "react"

import invariant from "tiny-invariant"

import type { Column } from "@incmix/utils/types"

export type BoardContextValue = {
  getColumns: () => Column[]

  reorderCard: (args: {
    columnId: string
    startIndex: number
    finishIndex: number
  }) => void

  moveCard: (args: {
    startColumnId: string
    finishColumnId: string
    itemIndexInStartColumn: number
    itemIndexInFinishColumn?: number
  }) => void

  instanceId: symbol
}

export const BoardContext = createContext<BoardContextValue | null>(null)

export function useBoardContext(): BoardContextValue {
  const value = useContext(BoardContext)
  invariant(value, "cannot find BoardContext provider")
  return value
}
