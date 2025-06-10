import { AlertCircle, Clock, Flag } from "lucide-react";

export const PRIORITY_CONFIG = {
  urgent: { color: "red" as const, icon: AlertCircle, label: "Urgent" },
  high: { color: "orange" as const, icon: Flag, label: "High" },
  medium: { color: "blue" as const, icon: Clock, label: "Medium" },
  low: { color: "gray" as const, icon: Clock, label: "Low" }
} as const;

export type PriorityKey = keyof typeof PRIORITY_CONFIG;

export const getPriorityInfo = (priority?: string) => {
  if (!priority || !(priority in PRIORITY_CONFIG)) {
    return PRIORITY_CONFIG.medium;
  }
  return PRIORITY_CONFIG[priority as PriorityKey];
};
