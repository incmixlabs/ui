import type { Option } from "../../2elements/multi-select"
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
    color: "crimson" as const,
  },
  {
    id: "2",
    value: "john-doe",
    name: "John Doe",
    label: "John Doe",
    avatar: ProjectsImages?.user1,
    position: "Project Manager",
    color: "orange" as const,
  },
  {
    id: "3",
    value: "jane-smith",
    name: "Jane Smith",
    label: "Jane Smith",
    avatar: ProjectsImages?.user2,
    position: "Business Analyst",
    color: "indigo" as const,
  },
  {
    id: "4",
    value: "emily-johnson",
    name: "Emily Johnson",
    label: "Emily Johnson",
    avatar: ProjectsImages?.user3,
    position: "Web Developer",
    color: "cyan" as const,
  },
  {
    id: "5",
    value: "micheal-brown",
    name: "Michael Brown",
    label: "Michael Brown",
    avatar: ProjectsImages?.user4,
    position: "Product Designer",
    color: "orange" as const,
  },
]

export const projects: Project[] = [
  {
    id: "1",
    name: "App Development",
    company: "Dropbox, Inc.",
    logo: ProjectsImages?.dropbox,
    description: "Create a mobile application on iOS and Android devices.",
    progress: 50,
    timeLeft: "1",
    timeType: "week",
    members: [members[0], members[1], members[2]],
    status: "started",
    startDate: Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 week ago
    endDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // 1 week from now
    budget: 50000,
    orgId: "default-org",
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    createdBy: {
      id: "user1",
      name: "John Doe",
    },
    updatedBy: {
      id: "user1",
      name: "John Doe",
    },
  },
  {
    id: "2",
    name: "Website Redesign",
    company: "GitLab Inc.",
    logo: ProjectsImages?.gitlab,
    description:
      "It is necessary to develop a website redesign in a corporate style.",
    progress: 75,
    timeLeft: "1",
    timeType: "week",
    members: [members[1], members[3], members[4]],
    status: "started",
    startDate: Date.now() - 14 * 24 * 60 * 60 * 1000, // 2 weeks ago
    endDate: Date.now() + 14 * 24 * 60 * 60 * 1000, // 2 weeks from now
    budget: 75000,
    orgId: "default-org",
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    createdBy: {
      id: "user1",
      name: "John Doe",
    },
    updatedBy: {
      id: "user1",
      name: "John Doe",
    },
  },
  {
    id: "3",
    name: "Landing Page",
    company: "Bitbucket, Inc.",
    logo: ProjectsImages?.bitbucket,
    description:
      "It is necessary to create a landing together with the development of design.",
    progress: 100,
    timeLeft: "1",
    timeType: "week",
    members: [members[0], members[4]],
    status: "completed",
    startDate: Date.now() - 21 * 24 * 60 * 60 * 1000, // 3 weeks ago
    endDate: Date.now() - 7 * 24 * 60 * 60 * 1000, // 1 week ago
    budget: 25000,
    orgId: "default-org",
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    createdBy: {
      id: "user1",
      name: "John Doe",
    },
    updatedBy: {
      id: "user1",
      name: "John Doe",
    },
  },
  {
    id: "4",
    name: "Parser Development",
    company: "Driveway, Inc.",
    logo: ProjectsImages?.python,
    description: "It is necessary to develop a ticket site parser in python.",
    progress: 50,
    timeLeft: "5",
    timeType: "days",
    members: [members[2], members[3], members[4]],
    status: "started",
    startDate: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10 days ago
    endDate: Date.now() + 5 * 24 * 60 * 60 * 1000, // 5 days from now
    budget: 30000,
    orgId: "default-org",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    createdBy: {
      id: "user1",
      name: "John Doe",
    },
    updatedBy: {
      id: "user1",
      name: "John Doe",
    },
  },
  {
    id: "5",
    name: "App Development",
    company: "Slack Technologies, Inc.",
    logo: ProjectsImages?.slack,
    description: "Create a mobile application on iOS and Android devices.",
    progress: 50,
    timeLeft: "5",
    timeType: "days",
    members: [members[1], members[4]],
    status: "on-hold",
    startDate: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5 days ago
    endDate: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 days from now
    budget: 45000,
    orgId: "default-org",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    createdBy: {
      id: "user1",
      name: "John Doe",
    },
    updatedBy: {
      id: "user1",
      name: "John Doe",
    },
  },
  {
    id: "6",
    name: "App Development",
    company: "Google, Inc.",
    logo: ProjectsImages?.firebase,
    description: "Create a mobile application on iOS and Android devices.",
    progress: 25,
    timeLeft: "1",
    timeType: "week",
    members: [members[1], members[3]],
    status: "on-hold",
    startDate: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3 days ago
    endDate: Date.now() + 18 * 24 * 60 * 60 * 1000, // 18 days from now
    budget: 60000,
    orgId: "default-org",
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    createdBy: {
      id: "user1",
      name: "John Doe",
    },
    updatedBy: {
      id: "user1",
      name: "John Doe",
    },
  },
  {
    id: "7",
    name: "Admin Dashboard",
    company: "ArtTemplate, Inc.",
    logo: ProjectsImages?.angular,
    description: "Necessary to create Admin Dashboard on Angular 8.",
    progress: 30,
    timeLeft: "2",
    timeType: "week",
    members: [members[0], members[2]],
    status: "started",
    startDate: Date.now() - 4 * 24 * 60 * 60 * 1000, // 4 days ago
    endDate: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 days from now
    budget: 40000,
    orgId: "default-org",
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    createdBy: {
      id: "user1",
      name: "John Doe",
    },
    updatedBy: {
      id: "user1",
      name: "John Doe",
    },
  },
  {
    id: "8",
    name: "Web App on Vue.js",
    company: "ArtTemplate, Inc.",
    logo: ProjectsImages?.vue,
    description: "It is necessary to develop a web app on the framework Vue.js",
    progress: 100,
    timeLeft: "1",
    timeType: "week",
    members: [members[1], members[3], members[4]],
    status: "completed",
    startDate: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30 days ago
    endDate: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
    budget: 55000,
    orgId: "default-org",
    createdAt: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    createdBy: {
      id: "user1",
      name: "John Doe",
    },
    updatedBy: {
      id: "user1",
      name: "John Doe",
    },
  },
  {
    id: "9",
    name: "App Development",
    company: "Facebook, Inc.",
    logo: ProjectsImages?.facebook,
    description: "Create a mobile application on iOS and Android devices.",
    progress: 50,
    timeLeft: "1",
    timeType: "week",
    members: [members[0], members[2]],
    status: "on-hold",
    startDate: Date.now() - 12 * 24 * 60 * 60 * 1000, // 12 days ago
    endDate: Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 days from now
    budget: 70000,
    orgId: "default-org",
    createdAt: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(),
    createdBy: {
      id: "user1",
      name: "John Doe",
    },
    updatedBy: {
      id: "user1",
      name: "John Doe",
    },
  },
]
