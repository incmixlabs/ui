export type TaskDataSchema = {
  id: string;
  taskId: string;
  projectId: string; // Made required
  name: string;
  columnId: string;
  order: number; // Renamed from taskOrder and made required
  startDate?: string;
  endDate?: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high" | "urgent"; // New field
  labelsTags: ReadonlyArray<{ // Made non-optional, removed 'checked'
    value: string;
    label: string;
    color: string;
  }>;
  attachments: ReadonlyArray<{ // Renamed from attachment, made non-optional, added id and type
    id: string;
    name: string;
    url: string;
    size: string;
    type?: string;
  }>;
  assignedTo: ReadonlyArray<{ // Made non-optional, value -> id, removed label, color, checked
    id: string;
    name: string;
    avatar: string;
  }>;
  subTasks: ReadonlyArray<{ // Made non-optional, added id, removed progress
    id: string;
    name: string;
    completed: boolean;
  }>;
  comments?: number; // New field
  createdAt: number;
  updatedAt: number;
  createdBy: {
    id: string;
    name: string;
    image: string;
  };
  updatedBy: {
    id: string;
    name: string;
    image: string;
  };
};

export type TaskStatusSchema = {
  id: string;
  projectId: string;
  name: string;
  color: string;
  order: number;
  description?: string;
  isDefault?: boolean;
  createdAt: number;
  updatedAt: number;
  createdBy: {
    id: string;
    name: string;
    image?: string;
  };
  updatedBy: {
    id: string;
    name: string;
    image?: string;
  };
};
