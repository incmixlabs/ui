import type { ExtendSize } from "@/src/types"

export const gaps: Record<ExtendSize, string> = {
  "1": "1",
  "2": "1",
  "3": "2",
  "4": "2",
  "5": "3",
  "6": "3",
  "7": "4",
  "8": "4",
  "9": "5",
}

export const stackOffsets: Record<ExtendSize, string> = {
  "1": "-4px",
  "2": "-6px",
  "3": "-8px",
  "4": "-10px",
  "5": "-12px",
  "6": "-14px",
  "7": "-16px",
  "8": "-18px",
  "9": "-20px",
}

export const stackBorderWidths: Record<ExtendSize, string> = {
  "1": "1px",
  "2": "2px",
  "3": "2px",
  "4": "3px",
  "5": "3px",
  "6": "4px",
  "7": "4px",
  "8": "4px",
  "9": "6px",
}
