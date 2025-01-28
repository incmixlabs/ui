import { type AvatarProps } from "@incmix-ui/avatar";
export interface KanbanBoard {
  id: number;
  title: string;
  tasks: KanbanBoardTask[];
}

export interface KanbanBoardTask {
  id: number;
  name: string;
  description: string;
  completed: boolean;
  daysLeft: number;
  attachment?: string;
  members: AvatarProps[];
}

