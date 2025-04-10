import type { Project } from "../types";
interface AddProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProject: (project: Omit<Project, "id">) => void;
}
export declare function AddProjectModal({ isOpen, onClose, onAddProject, }: AddProjectModalProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=add-project-modal.d.ts.map