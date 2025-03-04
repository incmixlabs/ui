import { Input } from "@components/form"
import { Label } from "@components/label"
import { Textarea } from "@components/textarea"
import { Button, Dialog } from "@radix-ui/themes"
import { Calendar, Plus, X } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { members } from "../data"
import { ProjectsImages } from "../images"
import type { Member, Project } from "../types"

interface AddProjectModalProps {
  isOpen: boolean
  onClose: () => void
  onAddProject: (project: Omit<Project, "id">) => void
}

export function AddProjectModal({
  isOpen,
  onClose,
  onAddProject,
}: AddProjectModalProps) {
  const [title, setTitle] = useState("")
  const [company, setCompany] = useState("")
  const [description, setDescription] = useState("")
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([])
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [budget, setBudget] = useState("")

  const handleAddMember = (member: Member) => {
    if (!selectedMembers.some((m) => m.id === member.id)) {
      setSelectedMembers([...selectedMembers, member])
    }
  }

  const handleRemoveMember = (memberId: string) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== memberId))
  }

  const handleSubmit = () => {
    if (!title || !company || !description) return

    const newProject: Omit<Project, "id"> = {
      title,
      company,
      logo: ProjectsImages.user,
      description,
      progress: 0,
      timeLeft: "1",
      timeType: "week",
      members: selectedMembers,
      status: "started",
      startDate,
      endDate,
      budget: budget ? Number.parseFloat(budget) : undefined,
    }

    onAddProject(newProject)
    resetForm()
    onClose()
  }

  const resetForm = () => {
    setTitle("")
    setCompany("")
    setDescription("")
    setSelectedMembers([])
    setStartDate("")
    setEndDate("")
    setBudget("")
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Add Project</Dialog.Title>
        <div className="grid gap-4 py-4">
          <div className="mb-4 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-md border-2 border-gray-300 border-dashed">
              <Plus className="h-8 w-8 text-gray-400" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input
              id="project-name"
              placeholder="App Development"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="client-name">Client Name</Label>
            <Input
              id="client-name"
              placeholder="Dropbox, Inc."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Create a mobile application on iOS and Android devices."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Start Date</Label>
              <div className="relative">
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="pl-10"
                />
                <Calendar className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>End Date</Label>
              <div className="relative">
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="pl-10"
                />
                <Calendar className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Members</Label>
            <div className="mb-2 flex flex-wrap gap-2">
              {selectedMembers.map((member) => (
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
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {members
                .filter(
                  (member) => !selectedMembers.some((m) => m.id === member.id)
                )
                .map((member) => (
                  <button
                    key={member.id}
                    onClick={() => handleAddMember(member)}
                    className="flex items-center gap-1 rounded-full border border-gray-200 px-2 py-1 text-sm hover:bg-gray-50"
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
                  </button>
                ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="budget">Budget</Label>
            <div className="relative">
              <span className="absolute top-2.5 left-3 text-gray-500">$</span>
              <Input
                id="budget"
                type="number"
                placeholder="25,000.00"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Create
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  )
}
