import { SmartDatetimeInput } from "@components/datetime-picker"
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "@components/file-upload"
import { Input } from "@components/form"
import { Label } from "@components/label"
import MultipleSelector, {
  type Option,
} from "@components/multiple-selector/multiple-selector"
import { Textarea } from "@components/textarea"
import { Button, Dialog, Grid } from "@radix-ui/themes"
import { Calendar, Paperclip, Plus, X } from "lucide-react"
import Image from "next/image"
import { useEffect, useState } from "react"
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
  const [selectedMembers, setSelectedMembers] = useState<Option[]>([])
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)
  const [budget, setBudget] = useState("")
  const [files, setFiles] = useState<File[] | null>(null)
  const [objectUrls, setObjectUrls] = useState<string[]>([])

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  }

  useEffect(() => {
    if (!files || files.length === 0) return

    const urls = files.map((file) => URL.createObjectURL(file))
    setObjectUrls(urls)

    // Cleanup URLs when files change or component unmounts
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [files])

  const handleStartDate = (date: Date) => {
    setStartDate(date)
  }
  const handleEndDate = (date: Date) => {
    setEndDate(date)
  }

  const handleSubmit = () => {
    const requiredFields = []
    if (!title) requiredFields.push("Project Name")
    if (!company) requiredFields.push("Client Name")
    if (!description) requiredFields.push("Description")

    if (requiredFields.length > 0) {
      // Consider adding a toast or other notification here
      console.error(`Please fill in required fields: ${requiredFields.join(", ")}`)
      return
    }
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
      startDate: startDate ? startDate.getTime() : undefined,
      endDate: endDate ? new Date(endDate).getTime() : undefined,
      budget: budget ? Number.parseFloat(budget) : undefined,
      files: objectUrls[0]
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
    setStartDate(undefined)
    setEndDate(undefined)
    setBudget("")
    setFiles(null)
    setObjectUrls([])
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Content maxWidth="500px">
        <Dialog.Title className="font-medium">Add Project</Dialog.Title>
        <Grid className="py-4" gap={"4"}>
          <div className="mb-4 flex justify-center">
            <FileUploader
              value={files}
              onValueChange={setFiles}
              dropzoneOptions={dropZoneConfig}
              className="relative mx-auto h-28 w-36 rounded-lg border-none p-2"
            >
              <FileInput className="l mx-auto grid h-full w-full place-content-center outline-dashed outline-2 outline-gray-4 ">
                <div className="flex w-full flex-col items-center justify-center pt-3 pb-4 ">
                  <Plus size={32} className="text-gray-8" />
                </div>
              </FileInput>
              {files && files.length > 0 && (
                <FileUploaderContent className="absolute top-0 left-0 h-full w-full ">
                  {files.map((file, i) => (
                    <FileUploaderItem
                      key={`${file.name}-${file.size}-${i}`}
                      index={i}
                      className="h-full w-full overflow-hidden rounded-md border-none bg-gray-4 hover:bg-gray-3"
                      aria-roledescription={`file ${i + 1} containing ${file.name}`}
                    >
                      <img
                        src={objectUrls[i]} // Use the pre-generated URLs
                        alt={file.name}
                        className="h-full w-full rounded-md object-cover"
                      />
                    </FileUploaderItem>
                  ))}
                </FileUploaderContent>
              )}
            </FileUploader>
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
                <SmartDatetimeInput
                  value={startDate}
                  showCalendar={true}
                  onValueChange={handleStartDate}
                  placeholder="Mar 5, 2025, 2:45 AM"
                  className="w-fit bg-gray-2 dark:bg-gray-1 "
                />
                {/* <Calendar className="absolute top-2.5 left-3 h-5 w-5 text-gray-400" /> */}
              </div>
            </div>
            <div className="grid gap-2">
              <Label>End Date</Label>
              <div className="relative">
                <SmartDatetimeInput
                  value={endDate}
                  showCalendar={true}
                  onValueChange={handleEndDate}
                  placeholder="Mar 6, 2025, 2:45 AM"
                  className="w-fit bg-gray-2 dark:bg-gray-1"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>Members</Label>

            <div className="flex flex-wrap gap-2">
              <MultipleSelector
                value={selectedMembers}
                onChange={setSelectedMembers}
                defaultColor={"gray"}
                defaultOptions={members}
                placeholder="Select members"
                className="border-1 dark:bg-gray-1"
                emptyIndicator={
                  <p className="text-center text-gray-6 text-lg dark:text-gray-400">
                    No results found.
                  </p>
                }
              />
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
        </Grid>
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
