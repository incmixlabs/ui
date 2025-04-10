import type { Project } from "../types";
interface AddProjectAutoFormProps {
    isOpen: boolean;
    onClose: () => void;
    onAddProject: (project: Omit<Project, "id">) => void;
}
/**
 * Renders a dialog with an auto-generated form for creating a new project.
 * Fixed to properly handle file uploads.
 */
export declare function AddProjectAutoForm({ isOpen, onClose, onAddProject, }: AddProjectAutoFormProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=add-project-auto-form.d.ts.map