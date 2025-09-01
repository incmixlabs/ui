import type { Option } from "@/src/2elements/multi-select"
import { ProjectsImages } from "./images"

import type { Project } from "./types"

export const members: Option[] = [
  {
    id: "1",
    value: "shane-black",
    name: "Shane Black",
    label: "Shane Black",
    avatar: ProjectsImages?.user,
    position: "UI/UX Designer",
    color: "gray",
  },
  {
    id: "2",
    value: "john-doe",
    name: "John Doe",
    label: "John Doe",
    avatar: ProjectsImages?.user1,
    position: "Project Manager",
    color: "crimson",
  },
  {
    id: "3",
    value: "jane-smith",
    name: "Jane Smith",
    label: "Jane Smith",
    avatar: ProjectsImages?.user2,
    position: "Business Analyst",
    color: "indigo",
  },
  {
    id: "4",
    value: "emily-johnson",
    name: "Emily Johnson",
    label: "Emily Johnson",
    avatar: ProjectsImages?.user3,
    color: "cyan",
    position: "Web Developer",
  },
  {
    id: "5",
    value: "micheal-brown",
    label: "micheal-brown",
    name: "Michael Brown",
    avatar: ProjectsImages?.user4,
    position: "Product Designer",
    color: "orange",
  },
]

export const projects: Project[] = [
  {
    id: "1",
    name: "App Development",
    company: "Dropbox, Inc.",
    logo: ProjectsImages?.dropbox,
    orgId: "org-1",
    description: "Create a mobile application on iOS and Android devices.",
    progress: 50,
    timeLeft: "1",
    timeType: "week",
    members: [members[0], members[1], members[2]],
    status: "started",
    startDate: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
    endDate: Date.now() + 14 * 24 * 60 * 60 * 1000, // 14 days from now
    budget: 25000,
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-20"),
    createdBy: {
      id: "user-1",
      name: "John Doe",
      image: ProjectsImages?.user,
    },
    updatedBy: {
      id: "user-1",
      name: "John Doe",
      image: ProjectsImages?.user,
    },
  },
  {
    id: "2",
    name: "Website Redesign",
    company: "GitLab Inc.",
    logo: ProjectsImages?.gitlab,
    orgId: "org-1",
    description:
      "It is necessary to develop a website redesign in a corporate style.",
    progress: 75,
    timeLeft: "1",
    timeType: "week",
    members: [members[1], members[3], members[4]],
    status: "started",
    startDate: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
    endDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
    budget: 35000,
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-25"),
    createdBy: {
      id: "user-2",
      name: "Jane Smith",
      image: ProjectsImages?.user1,
    },
    updatedBy: {
      id: "user-2",
      name: "Jane Smith",
      image: ProjectsImages?.user1,
    },
  },
  {
    id: "3",
    name: "Landing Page",
    company: "Bitbucket, Inc.",
    logo: ProjectsImages?.bitbucket,
    orgId: "org-1",
    description:
      "It is necessary to create a landing together with the development of design.",
    progress: 100,
    timeLeft: "1",
    timeType: "week",
    members: [members[0], members[4]],
    status: "completed",
    startDate: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
    endDate: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago (completed)
    budget: 15000,
    createdAt: new Date("2024-01-05"),
    updatedAt: new Date("2024-01-30"),
    createdBy: {
      id: "user-3",
      name: "Mike Wilson",
      image: ProjectsImages?.user2,
    },
    updatedBy: {
      id: "user-3",
      name: "Mike Wilson",
      image: ProjectsImages?.user2,
    },
  },
  {
    id: "4",
    name: "Parser Development",
    company: "Driveway, Inc.",
    logo: ProjectsImages?.python,
    orgId: "org-1",
    description: "It is necessary to develop a ticket site parser in python.",
    progress: 50,
    timeLeft: "5",
    timeType: "days",
    members: [members[2], members[3], members[4]],
    status: "started",
    startDate: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    endDate: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 days from now
    budget: 40000,
    createdAt: new Date("2024-01-12"),
    updatedAt: new Date("2024-01-28"),
    createdBy: {
      id: "user-4",
      name: "Emily Johnson",
      image: ProjectsImages?.user3,
    },
    updatedBy: {
      id: "user-4",
      name: "Emily Johnson",
      image: ProjectsImages?.user3,
    },
  },
  {
    id: "5",
    name: "App Development",
    company: "Slack Technologies, Inc.",
    logo: ProjectsImages?.slack,
    orgId: "org-1",
    description: "Create a mobile application on iOS and Android devices.",
    progress: 50,
    timeLeft: "5",
    timeType: "days",
    members: [members[1], members[4]],
    status: "on-hold",
    startDate: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14 days ago
    endDate: Date.now() + 21 * 24 * 60 * 60 * 1000, // 21 days from now
    budget: 50000,
    createdAt: new Date("2024-01-08"),
    updatedAt: new Date("2024-01-22"),
    createdBy: {
      id: "user-5",
      name: "Michael Brown",
      image: ProjectsImages?.user4,
    },
    updatedBy: {
      id: "user-5",
      name: "Michael Brown",
      image: ProjectsImages?.user4,
    },
  },
  {
    id: "6",
    name: "App Development",
    company: "Google, Inc.",
    logo: ProjectsImages?.firebase,
    orgId: "org-1",
    description: "Create a mobile application on iOS and Android devices.",
    progress: 25,
    timeLeft: "1",
    timeType: "week",
    members: [members[1], members[3]],
    status: "on-hold",
    startDate: Date.now() - 21 * 24 * 60 * 60 * 1000, // 21 days ago
    endDate: Date.now() + 28 * 24 * 60 * 60 * 1000, // 28 days from now
    budget: 75000,
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-18"),
    createdBy: {
      id: "user-1",
      name: "John Doe",
      image: ProjectsImages?.user,
    },
    updatedBy: {
      id: "user-2",
      name: "Jane Smith",
      image: ProjectsImages?.user1,
    },
  },
  {
    id: "7",
    name: "Admin Dashboard",
    company: "ArtTemplate, Inc.",
    logo: ProjectsImages?.angular,
    orgId: "org-1",
    description: "Necessary to create Admin Dashboard on Angular 8.",
    progress: 30,
    timeLeft: "2",
    timeType: "week",
    members: [members[0], members[2]],
    status: "started",
    startDate: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    endDate: Date.now() + 17 * 24 * 60 * 60 * 1000, // 17 days from now
    budget: 30000,
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-26"),
    createdBy: {
      id: "user-3",
      name: "Mike Wilson",
      image: ProjectsImages?.user2,
    },
    updatedBy: {
      id: "user-3",
      name: "Mike Wilson",
      image: ProjectsImages?.user2,
    },
  },
  {
    id: "8",
    name: "Web App on Vue.js",
    company: "ArtTemplate, Inc.",
    logo: ProjectsImages?.vue,
    orgId: "org-1",
    description: "It is necessary to develop a web app on the framework Vue.js",
    progress: 100,
    timeLeft: "1",
    timeType: "week",
    members: [members[1], members[3], members[4]],
    status: "completed",
    startDate: Date.now() - 45 * 24 * 60 * 60 * 1000, // 45 days ago
    endDate: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14 days ago (completed)
    budget: 45000,
    createdAt: new Date("2023-12-20"),
    updatedAt: new Date("2024-01-15"),
    createdBy: {
      id: "user-4",
      name: "Emily Johnson",
      image: ProjectsImages?.user3,
    },
    updatedBy: {
      id: "user-4",
      name: "Emily Johnson",
      image: ProjectsImages?.user3,
    },
  },
  {
    id: "9",
    name: "App Development",
    company: "Facebook, Inc.",
    logo: ProjectsImages?.facebook,
    orgId: "org-1",
    description: "Create a mobile application on iOS and Android devices.",
    progress: 50,
    timeLeft: "1",
    timeType: "week",
    members: [members[0], members[2]],
    status: "on-hold",
    startDate: Date.now() - 28 * 24 * 60 * 60 * 1000, // 28 days ago
    endDate: Date.now() + 35 * 24 * 60 * 60 * 1000, // 35 days from now
    budget: 60000,
    createdAt: new Date("2023-12-28"),
    updatedAt: new Date("2024-01-12"),
    createdBy: {
      id: "user-5",
      name: "Michael Brown",
      image: ProjectsImages?.user4,
    },
    updatedBy: {
      id: "user-1",
      name: "John Doe",
      image: ProjectsImages?.user,
    },
  },
]
