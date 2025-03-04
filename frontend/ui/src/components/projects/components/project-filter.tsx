import { X } from "lucide-react"
import { useState } from "react"
import { members } from "../data"
import { Member } from "../types"

import { Input } from "@components/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/select"
import { Button } from "@radix-ui/themes"
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
  const [selectedMembers, setSelectedMembers] = useState<string[]>([])
  const [dueDate, setDueDate] = useState("")
  const [status, setStatus] = useState("")

  const handleAddMember = (memberId: string) => {
    if (!selectedMembers.includes(memberId)) {
      setSelectedMembers([...selectedMembers, memberId])
    }
  }

  const handleRemoveMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter((id) => id !== memberId))
  }

  const handleApplyFilters = () => {
    onApplyFilters({
      search,
      members: selectedMembers,
      dueDate,
      status,
    })
  }

  const handleResetFilters = () => {
    setSearch("")
    setSelectedMembers([])
    setDueDate("")
    setStatus("")
    onResetFilters()
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h2 className="mb-6 font-semibold text-xl">Filter</h2>
        <div className="space-y-6">
          <div>
            <Input
              placeholder="Search Projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700 text-sm">
              Members
            </label>
            <div className="mb-2 flex flex-wrap gap-2">
              {selectedMembers.map((memberId) => {
                const member = members.find((m) => m.id === memberId)
                if (!member) return null
                return (
                  <div
                    key={member.id}
                    className="flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-blue-700 text-sm"
                  >
                    <div className="h-5 w-5 overflow-hidden rounded-full">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        width={20}
                        height={20}
                      />
                    </div>
                    <span>{member.name}</span>
                    <button
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )
              })}
            </div>
            <div className="relative">
              <Select onValueChange={handleAddMember}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select member" />
                </SelectTrigger>
                <SelectContent>
                  {members
                    .filter((m) => !selectedMembers.includes(m.id))
                    .map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 overflow-hidden rounded-full">
                            <img
                              src={member.avatar}
                              alt={member.name}
                              width={24}
                              height={24}
                            />
                          </div>
                          <span>{member.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700 text-sm">
              Due Date
            </label>
            <Select value={dueDate} onValueChange={setDueDate}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Due anytime" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="this-week">This week</SelectItem>
                <SelectItem value="this-month">This month</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block font-medium text-gray-700 text-sm">
              Status
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="started">Started</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="mt-auto flex gap-3">
        <Button
          onClick={handleApplyFilters}
          className="flex-1 bg-blue-600 hover:bg-blue-700"
        >
          Apply Filters
        </Button>
        <Button
          onClick={handleResetFilters}
          variant="outline"
          className="flex-1"
        >
          Reset all filters
        </Button>
      </div>
    </div>
  )
}
