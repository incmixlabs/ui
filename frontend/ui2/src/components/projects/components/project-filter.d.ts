interface ProjectFilterProps {
    onApplyFilters: (filters: {
        search: string;
        members: string[];
        dueDate: string;
        status: string;
    }) => void;
    onResetFilters: () => void;
}
export declare function ProjectFilter({ onApplyFilters, onResetFilters, }: ProjectFilterProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=project-filter.d.ts.map