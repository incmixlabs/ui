import type { FileItem } from "../data";
interface ProjectListViewProps {
    files: FileItem[];
    onFileClick: (file: FileItem) => void;
    selectedProjectId: string | null;
}
export declare function ProjectListView({ files, onFileClick, selectedProjectId, }: ProjectListViewProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=project-list.d.ts.map