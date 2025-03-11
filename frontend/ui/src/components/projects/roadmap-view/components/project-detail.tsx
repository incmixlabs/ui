"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs"
import { Box, Button, Flex, IconButton } from "@radix-ui/themes"
import type { Project } from "@types"
import { ArrowLeft, Calendar, Clock } from "lucide-react"
import { useState } from "react"
import { ProjectProgressBar } from "./project-progress-bar"
import { ProjectTimeline } from "./project-timeline"
import {
  calculateAverageProgress,
  calculateDaysRemaining,
  calculateTotalDuration,
  formatDate,
} from "./project-utils"

interface ProjectDetailProps {
  project: Project
  onBack: () => void
  onSelectSubProject: (project: Project) => void
}

export function ProjectDetail({
  project,
  onBack,
  onSelectSubProject,
}: ProjectDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const daysRemaining = calculateDaysRemaining(project.endDate)
  const totalDuration = calculateTotalDuration(
    project.startDate,
    project.endDate
  )

  const hasSubProjects = project.subProjects && project.subProjects.length > 0
  const subProjectsProgress = hasSubProjects
    ? calculateAverageProgress(project.subProjects ?? [])
    : 0

  return (
    <>
      <Flex align={"center"} gap={"2"} className="mb-6">
        <IconButton variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </IconButton>
        <h1 className="font-bold text-2xl">{project.name}</h1>
      </Flex>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          {hasSubProjects && (
            <TabsTrigger value="subprojects">Sub-Projects</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="font-medium text-muted-foreground text-sm">
                  Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {formatDate(project.startDate)} -{" "}
                    {formatDate(project.endDate)}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="font-medium text-muted-foreground text-sm">
                  Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {totalDuration} days total ({daysRemaining} days remaining)
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="font-medium text-muted-foreground text-sm">
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-bold text-2xl">{project.progress}%</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Project Progress</CardTitle>
              <CardDescription>
                Overall completion status of the project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ProjectProgressBar project={project} showDetails />

              <div className="mt-8">
                <ProjectTimeline project={project} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline">
          <Card>
            <CardHeader>
              <CardTitle>Project Timeline</CardTitle>
              <CardDescription>
                Detailed view of the project timeline
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <ProjectTimeline project={project} detailed />
            </CardContent>
          </Card>
        </TabsContent>

        {hasSubProjects && (
          <TabsContent value="subprojects">
            <Card>
              <CardHeader>
                <CardTitle>Sub-Projects</CardTitle>
                <CardDescription>
                  {project.subProjects?.length} sub-projects with an average
                  progress of {subProjectsProgress}%
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Box className="space-y-6">
                  {project.subProjects?.map((subProject) => (
                    <Box
                      key={subProject.id}
                      className="cursor-pointer rounded-md border p-4 transition-colors hover:bg-gray-50"
                      onClick={() => onSelectSubProject(subProject)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          onSelectSubProject(subProject)
                        }
                      }}
                    >
                      <Flex
                        justify={"between"}
                        align={"center"}
                        className="mb-2"
                      >
                        <h3 className="font-medium">{subProject.name}</h3>
                        <span className="text-gray-500 text-sm">
                          {formatDate(subProject.startDate)} -{" "}
                          {formatDate(subProject.endDate)}
                        </span>
                      </Flex>
                      <ProjectProgressBar project={subProject} />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </>
  )
}
