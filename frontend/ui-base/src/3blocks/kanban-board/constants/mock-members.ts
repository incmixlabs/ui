// constants/mock-members.ts
// Centralized mock member data used across the kanban board components
// In a real application, this would be replaced with API calls

export interface MockMember {
  id: string
  value: string
  name: string
  label: string
  avatar: string
  position: string
  color: string
}

export const MOCK_MEMBERS: MockMember[] = [
  {
    id: "1",
    value: "shane-black",
    name: "Shane Black",
    label: "Shane Black",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
    position: "UI/UX Designer",
    color: "blue",
  },
  {
    id: "2",
    value: "john-doe",
    name: "John Doe",
    label: "John Doe",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
    position: "Project Manager",
    color: "amber",
  },
  {
    id: "3",
    value: "jane-smith",
    name: "Jane Smith",
    label: "Jane Smith",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b589?w=32&h=32&fit=crop&crop=face",
    position: "Business Analyst",
    color: "indigo",
  },
  {
    id: "4",
    value: "emily-johnson",
    name: "Emily Johnson",
    label: "Emily Johnson",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
    color: "cyan",
    position: "Web Developer",
  },
  {
    id: "5",
    value: "micheal-brown",
    label: "Michael Brown",
    name: "Michael Brown",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face",
    position: "Product Designer",
    color: "orange",
  },
]

// Helper function to transform members for different use cases
export const getMembersForSelect = () => MOCK_MEMBERS

export const getMembersForAssignment = () =>
  MOCK_MEMBERS.map((member) => ({
    id: member.id,
    name: member.name,
    image: member.avatar,
  }))

export const getMemberById = (id: string) =>
  MOCK_MEMBERS.find((member) => member.id === id)
