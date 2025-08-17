import { Box, Button, Flex, Select, Text } from "@/src/1base"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/src/1base"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import React, { useMemo } from "react"
import type { PaginationInfo } from "../types"
import { PAGE_SIZE_OPTIONS } from "../utils/pagination-utils"

interface TablePaginationProps {
  paginationInfo: PaginationInfo
  handlePageChange: (page: number) => void
  handlePageSizeChange: (size: number) => void
  showRowCount: boolean
  selectedRowCount: number
  filteredRowCount: number
  isPaginationLoading: boolean
  serverPagination: boolean
}

// Internal component that will be memoized
const TablePaginationComponent: React.FC<TablePaginationProps> = ({
  paginationInfo,
  handlePageChange,
  handlePageSizeChange,
  showRowCount,
  selectedRowCount,
  filteredRowCount,
  isPaginationLoading,
  serverPagination,
}) => {
  // Hoist the memoized text above the JSX to comply with Rules of Hooks
  const selectedRowText = useMemo(() => {
    const totalCount = serverPagination
      ? paginationInfo.totalItems
      : filteredRowCount
    return `${selectedRowCount} of ${totalCount} row(s) selected.`
  }, [
    selectedRowCount,
    serverPagination,
    paginationInfo.totalItems,
    filteredRowCount,
  ])

  const pageText = useMemo(
    () =>
      `Page ${paginationInfo.currentPage + 1} of ${
        paginationInfo.totalPages || 1
      }`,
    [paginationInfo.currentPage, paginationInfo.totalPages]
  )

  return (
    <Flex align="center" justify="between" gap="2" py="4">
      {showRowCount && (
        <Text size="2" color="gray">
          {selectedRowText}
        </Text>
      )}

      <Flex align="center" gap="2" ml="auto">
        <Flex align="center" gap="1">
          <Text size="2" color="gray">
            Rows per page
          </Text>
          <Select.Root
            value={paginationInfo.pageSize.toString()}
            onValueChange={(value) => handlePageSizeChange(Number(value))}
          >
            <Select.Trigger />
            <Select.Content>
              {PAGE_SIZE_OPTIONS.map((pageSize) => (
                <Select.Item key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>
        <Text size="2" color="gray">{pageText}</Text>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button
                variant="outline"
                size="1"
                onClick={() => handlePageChange(0)}
                disabled={
                  !paginationInfo.canPreviousPage || isPaginationLoading
                }
                aria-label="Go to first page"
              >
                <ChevronsLeft size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                size="1"
                onClick={() => handlePageChange(paginationInfo.currentPage - 1)}
                disabled={
                  !paginationInfo.canPreviousPage || isPaginationLoading
                }
                aria-label="Go to previous page"
              >
                <ChevronLeft size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                size="1"
                onClick={() => handlePageChange(paginationInfo.currentPage + 1)}
                disabled={!paginationInfo.canNextPage || isPaginationLoading}
                aria-label="Go to next page"
              >
                <ChevronRight size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                size="1"
                onClick={() => handlePageChange(paginationInfo.totalPages - 1)}
                disabled={!paginationInfo.canNextPage || isPaginationLoading}
                aria-label="Go to last page"
              >
                <ChevronsRight size={16} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Flex>
    </Flex>
  )
}

// Export memoized version to prevent unnecessary re-renders
export const TablePagination = React.memo(TablePaginationComponent)
