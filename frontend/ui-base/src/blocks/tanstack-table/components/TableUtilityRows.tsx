import { Table } from "@/base/shadcn/table"

interface LoadingRowProps {
  colSpan: number
}

export const LoadingRow: React.FC<LoadingRowProps> = ({ colSpan }) => (
  <Table.Row className="dark:border-gray-800">
    <Table.Cell
      colSpan={colSpan}
      className="h-24 text-center dark:text-gray-400"
    >
      <div className="flex items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-primary border-b-2" />
        <span className="ml-2">Loading data...</span>
      </div>
    </Table.Cell>
  </Table.Row>
)

interface EmptyRowProps {
  colSpan: number
}

export const EmptyRow: React.FC<EmptyRowProps> = ({ colSpan }) => (
  <Table.Row className="dark:border-gray-800">
    <Table.Cell
      colSpan={colSpan}
      className="h-24 px-4 text-left dark:text-gray-400"
    >
      No results.
    </Table.Cell>
  </Table.Row>
)

// Expanded row component
interface ExpandedRowProps<TData> {
  row: TData
  colSpan: number
  renderContent: (row: TData) => React.ReactNode
}

export const ExpandedRow = <TData extends object>({
  row,
  colSpan,
  renderContent,
}: ExpandedRowProps<TData>) => (
  <Table.Row className="bg-muted/20 dark:border-gray-800">
    <Table.Cell colSpan={colSpan} className="p-4">
      {renderContent(row)}
    </Table.Cell>
  </Table.Row>
)
