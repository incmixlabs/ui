"use client"

import React from "react"
import { DataTable } from "../components/DataTable"
import { MoreHorizontal } from "lucide-react"

// Define interfaces based on the provided data structure
interface User {
  id: string
  name: string
  image?: string
  email: string
}

interface Checklist {
  id: string
  text: string
  checked: boolean
  order: number
}

interface AcceptanceCriteria {
  id: string
  text: string
  checked: boolean
  order: number
}

interface SubTask {
  id: string
  name: string
  completed: boolean
  order: number
}

interface LabelTag {
  value: string
  label: string
  color: string
}

interface Task {
  id: string
  projectId: string
  name: string
  statusId: string
  taskOrder: number
  startDate: number
  endDate: number
  description: string
  completed: boolean
  priorityId: string
  refUrls: string[]
  labelsTags: LabelTag[]
  attachments: any[]
  assignedTo: User[]
  subTasks: SubTask[]
  comments: any[]
  checklist: Checklist[]
  acceptanceCriteria: AcceptanceCriteria[]
  createdAt: number
  updatedAt: number
  createdBy: User
  updatedBy: User
  statusLabel: string
  statusColor: string
  priorityLabel: string
  priorityColor: string
  assignedToNames: string
  totalSubTasks: number
  completedSubTasks: number
  isOverdue: boolean
}

interface Label {
  id: string
  projectId: string
  type: string
  name: string
  color: string
  order: number
  description: string
  createdAt: number
  updatedAt: number
  createdBy: User
  updatedBy: User
  tasks: Task[]
  completedTasksCount: number
  totalTasksCount: number
  progressPercentage: number
  isExpanded: boolean
}

// Helper for converting timestamp to date string
const formatDate = (timestamp: number | undefined): string => {
  if (!timestamp) return '-';
  return new Date(timestamp).toLocaleDateString();
};

// Avatar component for showing a user
interface AvatarProps {
  user: User;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({ user, size = 24 }) => {
  // Get initials from name
  const getInitials = (name: string): string => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <div 
      className="rounded-full flex items-center justify-center text-xs font-medium text-white bg-blue-500"
      style={{ width: size, height: size }}
    >
      {user.image ? (
        <img 
          src={user.image} 
          alt={user.name} 
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        getInitials(user.name)
      )}
    </div>
  );
};

// Avatar group component for showing multiple users with overlap
interface AvatarGroupProps {
  users: User[];
  maxDisplay?: number;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ users, maxDisplay = 3 }) => {
  if (!users || users.length === 0) {
    return <span className="text-muted-foreground">None</span>;
  }
  
  const displayUsers = users.slice(0, maxDisplay);
  const remaining = users.length - maxDisplay;
  
  return (
    <div className="flex -space-x-2">
      {displayUsers.map((user, index) => (
        <div 
          key={user.id} 
          className="ring-2 ring-white" 
          style={{ zIndex: 10 - index }}
        >
          <Avatar user={user} />
        </div>
      ))}
      {remaining > 0 && (
        <div 
          className="ring-2 ring-white flex items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600" 
          style={{ width: 24, height: 24, zIndex: 10 - maxDisplay }}
        >
          +{remaining}
        </div>
      )}
    </div>
  );
};

const EmptyAvatar = () => (
  <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
  </div>
);

// People cell renderer for assignedTo
const PeopleCell = ({ value }: { value: User[] }) => {
  if (!value || value.length === 0) {
    return <EmptyAvatar />;
  }
  
  return (
    <div className="flex -space-x-2">
      {value.slice(0, 3).map((user, index) => (
        <div key={user.id} className="ring-1 ring-white" style={{ zIndex: 10 - index }}>
          <Avatar user={user} />
        </div>
      ))}
      {value.length > 3 && (
        <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center ring-1 ring-white text-xs">
          +{value.length - 3}
        </div>
      )}
    </div>
  );
};

// Label component for rendering status or priority with color
const StatusLabel: React.FC<{ text: string, color: string, bgColor: string }> = ({ text, color, bgColor }) => (
  <div 
    className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold" 
    style={{ borderColor: 'transparent', backgroundColor: bgColor, color: color }}
  >
    {text}
  </div>
);

// Actions menu button component
const ActionsMenu: React.FC = () => (
  <div className="flex justify-end">
    <button 
      className="p-1 rounded-md hover:bg-gray-100"
      onClick={(e) => {
        e.stopPropagation();
        // This would open a menu in a real implementation
      }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-gray-500"
      >
        <circle cx="12" cy="12" r="1" />
        <circle cx="12" cy="5" r="1" />
        <circle cx="12" cy="19" r="1" />
      </svg>
    </button>
  </div>
);

// Label cell renderer (for status and priority)
const LabelCell = ({ value, color }: { value: string, color: string }) => {
  if (!value) return <span className="text-muted-foreground">-</span>;
  
  // Convert hex color to rgba for transparent background
  const hexToRgba = (hex: string, alpha: number = 0.2) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  const bgColor = hexToRgba(color, 0.15);
  const textColor = color;
  
  return (
    <StatusLabel text={value} color={textColor} bgColor={bgColor} />
  );
};

// Sample users for task assignment
const SAMPLE_USERS: User[] = [
  {
    id: "user1",
    name: "John Smith",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    email: "john.smith@example.com"
  },
  {
    id: "user2",
    name: "Jane Cooper",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    email: "jane.cooper@example.com"
  },
  {
    id: "user3",
    name: "Alicia Keys",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    email: "alicia.keys@example.com"
  },
  {
    id: "user4",
    name: "Michael Jordan",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    email: "michael.jordan@example.com"
  }
];

// Sample status labels
const STATUS_LABELS: Label[] = [
  {
    id: "status1",
    projectId: "project1",
    type: "status",
    name: "To Do",
    color: "#3366FF",
    order: 1,
    description: "Task that needs to be done",
    createdAt: Date.now() - 1000000,
    updatedAt: Date.now() - 1000000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    tasks: [],
    completedTasksCount: 0,
    totalTasksCount: 2,
    progressPercentage: 0,
    isExpanded: true
  },
  {
    id: "status2",
    projectId: "project1",
    type: "status",
    name: "In Progress",
    color: "#FFAB00",
    order: 2,
    description: "Task that is being worked on",
    createdAt: Date.now() - 900000,
    updatedAt: Date.now() - 900000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    tasks: [],
    completedTasksCount: 0,
    totalTasksCount: 2,
    progressPercentage: 0,
    isExpanded: true
  },
  {
    id: "status3",
    projectId: "project1",
    type: "status",
    name: "Done",
    color: "#00B8D9",
    order: 3,
    description: "Task that has been completed",
    createdAt: Date.now() - 800000,
    updatedAt: Date.now() - 800000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    tasks: [],
    completedTasksCount: 2,
    totalTasksCount: 2,
    progressPercentage: 100,
    isExpanded: true
  }
];

// Sample priority labels
const PRIORITY_LABELS: Label[] = [
  {
    id: "priority1",
    projectId: "project1",
    type: "priority",
    name: "Low",
    color: "#00875A",
    order: 1,
    description: "Low priority task",
    createdAt: Date.now() - 700000,
    updatedAt: Date.now() - 700000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    tasks: [],
    completedTasksCount: 0,
    totalTasksCount: 2,
    progressPercentage: 0,
    isExpanded: true
  },
  {
    id: "priority2",
    projectId: "project1",
    type: "priority",
    name: "Medium",
    color: "#FF8B00",
    order: 2,
    description: "Medium priority task",
    createdAt: Date.now() - 600000,
    updatedAt: Date.now() - 600000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    tasks: [],
    completedTasksCount: 0,
    totalTasksCount: 2,
    progressPercentage: 0,
    isExpanded: true
  },
  {
    id: "priority3",
    projectId: "project1",
    type: "priority",
    name: "High",
    color: "#FF5630",
    order: 3,
    description: "High priority task",
    createdAt: Date.now() - 500000,
    updatedAt: Date.now() - 500000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    tasks: [],
    completedTasksCount: 0,
    totalTasksCount: 2,
    progressPercentage: 0,
    isExpanded: true
  }
];

// Sample task data using the new data structure
const SAMPLE_TASKS: Task[] = [
  {
    id: "task1",
    projectId: "project1",
    name: "Create more options for Navbar",
    statusId: "status1",
    taskOrder: 1,
    startDate: Date.now(),
    endDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
    description: "Design and implement additional options for the navigation bar",
    completed: false,
    priorityId: "priority2",
    refUrls: [],
    labelsTags: [],
    attachments: [],
    assignedTo: [SAMPLE_USERS[0], SAMPLE_USERS[1]],
    subTasks: [],
    comments: [],
    checklist: [],
    acceptanceCriteria: [],
    createdAt: Date.now() - 400000,
    updatedAt: Date.now() - 300000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    statusLabel: "To Do",
    statusColor: "#3366FF",
    priorityLabel: "Medium",
    priorityColor: "#FF8B00",
    assignedToNames: "John Smith, Jane Cooper",
    totalSubTasks: 0,
    completedSubTasks: 0,
    isOverdue: false
  },
  {
    id: "task2",
    projectId: "project1",
    name: "Update Sidebar Component",
    statusId: "status1",
    taskOrder: 2,
    startDate: Date.now(),
    endDate: Date.now() + 5 * 24 * 60 * 60 * 1000,
    description: "Make sidebar responsive and add collapsible sections",
    completed: false,
    priorityId: "priority1",
    refUrls: [],
    labelsTags: [],
    attachments: [],
    assignedTo: [],
    subTasks: [],
    comments: [],
    checklist: [],
    acceptanceCriteria: [],
    createdAt: Date.now() - 350000,
    updatedAt: Date.now() - 300000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    statusLabel: "To Do",
    statusColor: "#3366FF",
    priorityLabel: "Low",
    priorityColor: "#00875A",
    assignedToNames: "",
    totalSubTasks: 0,
    completedSubTasks: 0,
    isOverdue: false
  },
  {
    id: "task3",
    projectId: "project1",
    name: "Customize Settings Page",
    statusId: "status2",
    taskOrder: 3,
    startDate: Date.now() - 2 * 24 * 60 * 60 * 1000,
    endDate: Date.now() + 3 * 24 * 60 * 60 * 1000,
    description: "Implement user preferences and settings UI",
    completed: false,
    priorityId: "priority2",
    refUrls: [],
    labelsTags: [],
    attachments: [],
    assignedTo: [SAMPLE_USERS[0], SAMPLE_USERS[2]],
    subTasks: [],
    comments: [],
    checklist: [],
    acceptanceCriteria: [],
    createdAt: Date.now() - 300000,
    updatedAt: Date.now() - 200000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    statusLabel: "In Progress",
    statusColor: "#FFAB00",
    priorityLabel: "Medium",
    priorityColor: "#FF8B00",
    assignedToNames: "John Smith, Alicia Keys",
    totalSubTasks: 3,
    completedSubTasks: 1,
    isOverdue: false
  },
  {
    id: "task4",
    projectId: "project1",
    name: "Design Pricing Cards",
    statusId: "status2",
    taskOrder: 4,
    startDate: Date.now() - 3 * 24 * 60 * 60 * 1000,
    endDate: Date.now() + 1 * 24 * 60 * 60 * 1000,
    description: "Create responsive pricing cards with hover effects",
    completed: false,
    priorityId: "priority3",
    refUrls: [],
    labelsTags: [],
    attachments: [],
    assignedTo: [SAMPLE_USERS[3]],
    subTasks: [],
    comments: [],
    checklist: [],
    acceptanceCriteria: [],
    createdAt: Date.now() - 250000,
    updatedAt: Date.now() - 150000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    statusLabel: "In Progress",
    statusColor: "#FFAB00",
    priorityLabel: "High",
    priorityColor: "#FF5630",
    assignedToNames: "Michael Jordan",
    totalSubTasks: 2,
    completedSubTasks: 1,
    isOverdue: true
  },
  {
    id: "task5",
    projectId: "project1",
    name: "Connect Github to Gitlab",
    statusId: "status3",
    taskOrder: 5,
    startDate: Date.now() - 10 * 24 * 60 * 60 * 1000,
    endDate: Date.now() - 5 * 24 * 60 * 60 * 1000,
    description: "Set up CI/CD pipeline between Github and Gitlab",
    completed: true,
    priorityId: "priority3",
    refUrls: [],
    labelsTags: [],
    attachments: [],
    assignedTo: [SAMPLE_USERS[0], SAMPLE_USERS[1]],
    subTasks: [],
    comments: [],
    checklist: [],
    acceptanceCriteria: [],
    createdAt: Date.now() - 200000,
    updatedAt: Date.now() - 100000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    statusLabel: "Done",
    statusColor: "#00B8D9",
    priorityLabel: "High",
    priorityColor: "#FF5630",
    assignedToNames: "John Smith, Jane Cooper",
    totalSubTasks: 4,
    completedSubTasks: 4,
    isOverdue: false
  },
  {
    id: "task6",
    projectId: "project1",
    name: "Create Navbar Component",
    statusId: "status3",
    taskOrder: 6,
    startDate: Date.now() - 15 * 24 * 60 * 60 * 1000,
    endDate: Date.now() - 10 * 24 * 60 * 60 * 1000,
    description: "Design and implement the main navigation component",
    completed: true,
    priorityId: "priority2",
    refUrls: [],
    labelsTags: [],
    attachments: [],
    assignedTo: [SAMPLE_USERS[2]],
    subTasks: [],
    comments: [],
    checklist: [],
    acceptanceCriteria: [],
    createdAt: Date.now() - 500000,
    updatedAt: Date.now() - 400000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    statusLabel: "Done",
    statusColor: "#00B8D9",
    priorityLabel: "Medium",
    priorityColor: "#FF8B00",
    assignedToNames: "Alicia Keys",
    totalSubTasks: 2,
    completedSubTasks: 2,
    isOverdue: false
  },
  {
    id: "task7",
    projectId: "project1",
    name: "Redesign Homepage + Details Product",
    statusId: "status2",
    taskOrder: 7,
    startDate: Date.now() - 5 * 24 * 60 * 60 * 1000,
    endDate: Date.now() + 2 * 24 * 60 * 60 * 1000,
    description: "Create a new design for homepage and product detail pages",
    completed: false,
    priorityId: "priority2",
    refUrls: [],
    labelsTags: [],
    attachments: [],
    assignedTo: [SAMPLE_USERS[3]],
    subTasks: [],
    comments: [],
    checklist: [],
    acceptanceCriteria: [],
    createdAt: Date.now() - 450000,
    updatedAt: Date.now() - 350000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    statusLabel: "In Progress",
    statusColor: "#FFAB00",
    priorityLabel: "Medium",
    priorityColor: "#FF8B00",
    assignedToNames: "Michael Jordan",
    totalSubTasks: 1,
    completedSubTasks: 0,
    isOverdue: false
  },
  {
    id: "task8",
    projectId: "project1",
    name: "Fix Dropdown Menu Bugs",
    statusId: "status2",
    taskOrder: 8,
    startDate: Date.now() - 4 * 24 * 60 * 60 * 1000,
    endDate: Date.now() + 3 * 24 * 60 * 60 * 1000,
    description: "Fix click detection and positioning issues with dropdown menus",
    completed: false,
    priorityId: "priority3",
    refUrls: [],
    labelsTags: [],
    attachments: [],
    assignedTo: [SAMPLE_USERS[0], SAMPLE_USERS[1], SAMPLE_USERS[3]],
    subTasks: [],
    comments: [],
    checklist: [],
    acceptanceCriteria: [],
    createdAt: Date.now() - 350000,
    updatedAt: Date.now() - 250000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    statusLabel: "In Progress",
    statusColor: "#FFAB00",
    priorityLabel: "High",
    priorityColor: "#FF5630",
    assignedToNames: "John Smith, Jane Cooper, Michael Jordan",
    totalSubTasks: 3,
    completedSubTasks: 1,
    isOverdue: false
  },
  {
    id: "task9",
    projectId: "project1",
    name: "Implement Auth System",
    statusId: "status3",
    taskOrder: 9,
    startDate: Date.now() - 10 * 24 * 60 * 60 * 1000,
    endDate: Date.now() - 8 * 24 * 60 * 60 * 1000,
    description: "Create user authentication system with social login options",
    completed: true,
    priorityId: "priority3",
    refUrls: [],
    labelsTags: [],
    attachments: [],
    assignedTo: [SAMPLE_USERS[2], SAMPLE_USERS[0], SAMPLE_USERS[3]],
    subTasks: [],
    comments: [],
    checklist: [],
    acceptanceCriteria: [],
    createdAt: Date.now() - 500000,
    updatedAt: Date.now() - 450000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    statusLabel: "Done",
    statusColor: "#00B8D9",
    priorityLabel: "High",
    priorityColor: "#FF5630",
    assignedToNames: "Alicia Keys, John Smith, Michael Jordan",
    totalSubTasks: 5,
    completedSubTasks: 5,
    isOverdue: false
  },
  {
    id: "task10",
    projectId: "project1",
    name: "Create Base Components",
    statusId: "status3",
    taskOrder: 10,
    startDate: Date.now() - 15 * 24 * 60 * 60 * 1000,
    endDate: Date.now() - 12 * 24 * 60 * 60 * 1000,
    description: "Create reusable component library for the project",
    completed: true,
    priorityId: "priority2",
    refUrls: [],
    labelsTags: [],
    attachments: [],
    assignedTo: [SAMPLE_USERS[2]],
    subTasks: [],
    comments: [],
    checklist: [],
    acceptanceCriteria: [],
    createdAt: Date.now() - 600000,
    updatedAt: Date.now() - 550000,
    createdBy: SAMPLE_USERS[0],
    updatedBy: SAMPLE_USERS[0],
    statusLabel: "Done",
    statusColor: "#00B8D9",
    priorityLabel: "Medium",
    priorityColor: "#FF8B00",
    assignedToNames: "Alicia Keys",
    totalSubTasks: 3,
    completedSubTasks: 3,
    isOverdue: false
  }
]

// Define columns for the DataTable
const TASK_TABLE_COLUMNS = [
  {
    headingName: "Title",
    type: "String" as const,
    accessorKey: "name" as const,
    id: "name",
    enableSorting: true,
    size: 250,
  },
  {
    headingName: "Status",
    type: "String" as const,
    accessorKey: "statusLabel" as const,
    id: "statusLabel",
    enableSorting: true,
    size: 120,
    cell: ({ row }: { row: any }) => {
      const status = row.original.statusLabel;
      const color = row.original.statusColor || '#6B7280';
      const bgColor = `${color}20`; // 20% opacity version of the color
      
      return (
        <StatusLabel 
          text={status} 
          color={color} 
          bgColor={bgColor} 
        />
      );
    }
  },
  {
    headingName: "Priority",
    type: "String" as const,
    accessorKey: "priorityLabel" as const,
    id: "priorityLabel",
    enableSorting: true,
    size: 120,
    cell: ({ row }: { row: any }) => {
      const priority = row.original.priorityLabel;
      const color = row.original.priorityColor || '#6B7280';
      const bgColor = `${color}20`; // 20% opacity version of the color
      
      return (
        <StatusLabel 
          text={priority} 
          color={color} 
          bgColor={bgColor} 
        />
      );
    }
  },
  {
    headingName: "Start date",
    type: "Date" as const,
    accessorKey: "startDate" as const,
    id: "startDate",
    enableSorting: true,
    size: 120,
    cell: ({ row }: { row: any }) => {
      return formatDate(row.original.startDate);
    }
  },
  {
    headingName: "Due date",
    type: "Date" as const,
    accessorKey: "endDate" as const,
    id: "endDate",
    enableSorting: true,
    size: 120,
    cell: ({ row }: { row: any }) => {
      return formatDate(row.original.endDate);
    }
  },
  {
    headingName: "Assigned to",
    type: "String" as const,
    accessorKey: "assignedTo" as const,
    id: "assignedTo",
    enableSorting: false,
    size: 150,
    cell: ({ row }: { row: any }) => {
      const assignedUsers = row.original.assignedTo;
      return <AvatarGroup users={assignedUsers} maxDisplay={3} />;
    }
  },
  {
    headingName: "",
    type: "String" as const,
    accessorKey: "id", // Using id as the accessorKey for actions column
    id: "actions",
    enableSorting: false,
    size: 50,
    cell: () => <ActionsMenu />
  }
];

// Main demo component
export default function UpdatedGroupedTasksDemo() {
  // Column visibility state
  const [columnVisibility, setColumnVisibility] = React.useState<Record<string, boolean>>({
    status: true,
    priority: true,
    startDate: true,
    endDate: true,
    assignedTo: true
  });

  // Label type grouping state
  const [groupByLabelType, setGroupByLabelType] = React.useState<'status' | 'priority'>('status');

  // Get label data based on selected grouping
  const getLabels = () => {
    return groupByLabelType === 'status' ? STATUS_LABELS : PRIORITY_LABELS;
  };

  // Create a mapping for group colors based on the currently selected grouping type
  const labelColorMapping = React.useMemo(() => {
    const mapping: Record<string, string> = {};
    
    // Add the colors for each label of the selected type
    const labels = getLabels();
    labels.forEach(label => {
      mapping[label.name] = label.color;
    });
    
    return mapping;
  }, [groupByLabelType]);

  // Toggle between grouping by status or priority
  const toggleGrouping = () => {
    setGroupByLabelType(prev => prev === 'status' ? 'priority' : 'status');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-medium">Tasks</h1>
        
        <div className="flex items-center gap-4">
          {/* Column visibility controls */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setColumnVisibility({
                status: true,
                priority: true,
                startDate: true,
                endDate: true,
                assignedTo: true
              })}
              className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
            >
              Show All
            </button>
            <button 
              onClick={() => setColumnVisibility({
                status: false,
                priority: false,
                startDate: false,
                endDate: false,
                assignedTo: false
              })}
              className="px-2 py-1 text-xs border rounded hover:bg-gray-50"
            >
              Hide All
            </button>
          </div>
          
          {/* Toggle grouping button */}
          <button 
            onClick={toggleGrouping}
            className="px-3 py-1 text-sm border rounded hover:bg-gray-50"
          >
            Group by: {groupByLabelType === 'status' ? 'Status' : 'Priority'}
          </button>
        </div>
      </div>

      <div className="border rounded-lg">
        <DataTable
          data={SAMPLE_TASKS}
          columns={TASK_TABLE_COLUMNS}
          // External column visibility control - fixes the bug where only headers were hidden
          columnVisibility={columnVisibility}
          onColumnVisibilityChange={(visibility) => setColumnVisibility(visibility)}
          // Basic table features
          enablePagination={true}
          enableRowSelection={true}
          enableColumnVisibility={true}
          enableColumnResizing={true}
          showRowCount={true}
          // Hide the main header to show column headers only within groups
          hideMainHeader={true}
          // Grouping configuration - uses the custom label colors via CSS
          enableRowGrouping={true}
          rowGrouping={{
            groupByColumn: groupByLabelType === 'status' ? 'statusLabel' : 'priorityLabel',
            initiallyCollapsed: false,
            toggleOnClick: true,
            categoryMapping: labelColorMapping
          }}
        />
      </div>
    </div>
  );
}
