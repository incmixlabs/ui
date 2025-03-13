import { Input } from "@components/form"
import { Search, X } from "lucide-react"
import { useState } from "react"
import { members } from "../data"
import { Member } from "../types"

import { SmartDatetimeInput } from "@components/datetime-picker"
import MultipleSelector, {
  type Option,
} from "@components/multiple-selector/multiple-selector"
import { Box, Button, Flex, Grid, Select } from "@radix-ui/themes"
import Image from "next/image"

interface ProjectFilterProps {
  onApplyFilters: (filters: {
    search: string
    members: string[]
    dueDate: string
    status: string
  }) => void
  onResetFilters: () => void
}

export function ProjectFilter({
  onApplyFilters,
  onResetFilters,
}: ProjectFilterProps) {
  const [search, setSearch] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<Option[]>([])
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [status, setStatus] = useState("started")

  const handleApplyFilters = () => {
    onApplyFilters({
      search,
      members: selectedMembers
        .map((member) => member.id)
        .filter((id): id is string => id !== undefined),
      dueDate: dueDate ? dueDate.toISOString() : "",
      status,
    })
  }

  const handleResetFilters = () => {
    setSearch("")
    setSelectedMembers([])
    setDueDate(undefined)
    setStatus("started")
    onResetFilters()
  }

  return (
    <Flex className="flex-col py-4" gap={"4"}>
      <Box>
        <Box className="space-y-4">
          <Box className="relative ">
            <Search className="absolute top-3 left-2.5" size={20} />
            <Input
              placeholder="Search Projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-12 w-full pl-9 "
            />
          </Box>

          <Box>
            <label
              htmlFor="members"
              className="mb-2 block font-medium text-gray-11 text-sm"
            >
              Members
            </label>
            <MultipleSelector
              value={selectedMembers}
              onChange={setSelectedMembers}
              defaultColor={"gray"}
              defaultOptions={members}
              placeholder="Select members"
              className="border-1 bg-gray-1"
              emptyIndicator={
                <p className="text-center text-gray-600 text-lg leading-10 dark:text-gray-400">
                  No results found.
                </p>
              }
            />
          </Box>

          <div>
            <label
              htmlFor="due-date"
              className="mb-2 block font-medium text-gray-11 text-sm"
            >
              Due Date
            </label>
            <SmartDatetimeInput
              value={dueDate}
              onValueChange={setDueDate}
              className="w-full bg-gray-1"
            />
          </div>

          <div>
            <label
              htmlFor="status"
              className="mb-2 block font-medium text-gray-11 text-sm"
            >
              Status
            </label>
            <Select.Root
              defaultValue="started"
              value={status}
              onValueChange={setStatus}
            >
              <Select.Trigger className="h-11 w-full" />
              <Select.Content className="mx-auto w-[95%]">
                <Select.Item value="started">Started</Select.Item>
                <Select.Item value="on-hold">On Hold</Select.Item>
                <Select.Item value="completed">Completed</Select.Item>
              </Select.Content>
            </Select.Root>
          </div>
        </Box>
      </Box>

      <Flex align={"center"} gap={"4"} className="mt-auto">
        <Button
          onClick={handleApplyFilters}
          variant="classic"
          className="h-10 w-40 cursor-pointer"
        >
          Apply Filters
        </Button>
        <Button
          onClick={handleResetFilters}
          variant="soft"
          className="h-10 w-full flex-1 cursor-pointer underline"
        >
          Reset all filters
        </Button>
      </Flex>
    </Flex>
  )
}
