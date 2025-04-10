import type { FileItem } from "../data";
interface ProjectCardProps {
    file: FileItem;
    onClick: () => void;
    viewMode: "grid" | "list" | "side";
    isSelected?: boolean;
}
export default function ProjectCard({ file, onClick, viewMode, isSelected, }: ProjectCardProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=project-card.d.ts.map