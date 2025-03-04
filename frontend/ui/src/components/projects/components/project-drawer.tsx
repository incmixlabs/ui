import { MotionSheet } from "@components/custom-sheet"
import { useProjectDrawer } from "@hooks/use-project-drawer"
import { Button, Progress, Separator } from "@radix-ui/themes"
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Calendar, Clock, DollarSign, Users } from "lucide-react"
import Image from "next/image"

export function ProjectDrawer() {
  const { isOpen, project, onClose } = useProjectDrawer()

  if (!project) return null

  return (
    <MotionSheet
      open={isOpen}
      onOpenChange={onClose}
      side="right"
      title="Project Details"
    >
      <div className="space-y-6 py-6">
        <div className="flex items-center gap-4">
          <div className="relative h-12 w-12">
            <img
              src={project.logo}
              alt={project.title}
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="font-semibold text-xl">{project.title}</h3>
            <p className="text-gray-500">{project.company}</p>
          </div>
        </div>

        <div>
          <h4 className="mb-2 font-medium text-gray-500 text-sm">
            Description
          </h4>
          <p className="text-gray-700">{project.description}</p>
        </div>

        <div>
          <h4 className="mb-2 font-medium text-gray-500 text-sm">Progress</h4>
          <div className="mb-1 flex items-center justify-between">
            <span className="text-gray-700 text-sm">Completion</span>
            <span className="font-medium text-sm">{project.progress}%</span>
          </div>
          <Progress size={"2"} value={project.progress} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Time Left</p>
              <p className="font-medium">
                {project.timeLeft} {project.timeType}
              </p>
            </div>
          </div>
          {project.startDate && project.endDate && (
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                <Calendar className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Timeline</p>
                <p className="font-medium">
                  {new Date(project.startDate).toLocaleDateString()} -{" "}
                  {new Date(project.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {project.budget && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
              <DollarSign className="h-4 w-4 text-yellow-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Budget</p>
              <p className="font-medium">${project.budget.toLocaleString()}</p>
            </div>
          </div>
        )}

        <div>
          <div className="mb-3 flex items-center gap-2">
            <Users className="h-4 w-4 text-gray-500" />
            <h4 className="font-medium text-gray-500 text-sm">Team Members</h4>
          </div>
          <div className="space-y-3">
            {project.members.map((member) => (
              <div key={member.id} className="flex items-center gap-3">
                <div className="h-8 w-8 overflow-hidden rounded-full">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <span className="font-medium text-sm">{member.name}</span>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className="flex justify-between gap-3">
          <Button variant="outline" className="flex-1">
            Edit Project
          </Button>
          <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
            View Details
          </Button>
        </div>
      </div>
    </MotionSheet>
  )
}
