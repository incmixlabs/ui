import { Flex, Spinner, Text } from "@/src/1base"
import { Table } from "@/src/1base/shadcn/table"

interface LoadingRowProps {
  colSpan: number
}

export const LoadingRow: React.FC<LoadingRowProps> = ({ colSpan }) => (
  <Table.Row>
    <Table.Cell colSpan={colSpan} className="h-24">
      <Flex align="center" justify="center">
        <Spinner size="3" />
        <Text ml="2" color="gray">
          Loading data...
        </Text>
      </Flex>
    </Table.Cell>
  </Table.Row>
)

interface EmptyRowProps {
  colSpan: number
}

export const EmptyRow: React.FC<EmptyRowProps> = ({ colSpan }) => (
  <Table.Row>
    <Table.Cell colSpan={colSpan} className="h-24 p-4">
      <Text color="gray">No results.</Text>
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
  <Table.Row>
    <Table.Cell colSpan={colSpan} className="p-4">
      {renderContent(row)}
    </Table.Cell>
  </Table.Row>
)
