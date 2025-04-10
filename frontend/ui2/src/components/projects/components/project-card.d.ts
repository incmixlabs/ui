import type { Project } from "../types";
interface ProjectCardProps {
    project: Project;
    onAddMember: (project: Project) => void;
    onAddDueDate: (project: Project) => void;
    onDelete: (projectId: string) => void;
    isListFilter: boolean;
}
export declare function ProjectCard({ project, onAddMember, onAddDueDate, onDelete, isListFilter, }: ProjectCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=project-card.d.ts.map