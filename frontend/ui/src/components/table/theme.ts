import { createTheme } from "@utils/create-theme"
import type { TableTheme } from "./Table"

export const tableTheme: TableTheme = createTheme({
  root: {
    base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
    shadow:
      "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
    wrapper: "relative",
  },
  body: {
    base: "group/body",
    cell: {
      base: "first:group-first/row:group-first/body:rounded-tl-lg last:group-first/row:group-first/body:rounded-tr-lg first:group-last/row:group-last/body:rounded-bl-lg last:group-last/row:group-last/body:rounded-br-lg",
      padding: {
        base: "px-6 py-4",
        compact: "px-2 py-1",
      },
    },
  },
  head: {
    base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
    cell: {
      base: "bg-gray-50 first:group-first/head:rounded-tl-lg last:group-first/head:rounded-tr-lg dark:bg-gray-700",
      padding: {
        base: "px-6 py-3",
        compact: "px-2 py-3",
      },
    },
  },
  row: {
    base: "group/row",
    hovered: "hover:bg-gray-50 dark:hover:bg-gray-600",
    striped:
      "odd:bg-white even:bg-gray-50 dark:odd:bg-gray-800 dark:even:bg-gray-700",
  },
})
