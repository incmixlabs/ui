import { Box, Button, Flex, Icon, Input, Select } from "@/base"
import { useState } from "react"

import { SmartDatetimeInput } from "@/src/2elements/dates/datetime-picker"
import { type Option, TagSelect } from "@/src/2elements/multi-select"
// TODO: Replace with actual member data from organization/project management
const mockMembers: Option[] = [
  { id: "1", value: "user1", name: "Team Member 1", label: "Team Member 1" },
  { id: "2", value: "user2", name: "Team Member 2", label: "Team Member 2" },
]

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
            <Icon name="Search" className="absolute top-3 left-2.5" size={20} />
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
            <TagSelect
              value={selectedMembers}
              onChange={setSelectedMembers}
              defaultColor={"gray"}
              defaultOptions={mockMembers}
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
