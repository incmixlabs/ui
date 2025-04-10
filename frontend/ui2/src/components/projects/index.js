import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { LayoutGrid, List, Plus, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { nanoid } from "nanoid";
import { useQueryState } from "nuqs";
import { Suspense, lazy, useState } from "react";
import { toast } from "sonner";
import { Box, Button, Flex, Heading, IconButton, ScrollArea, Text, } from "@/components/base";
import { iconSize } from "@/components/icons/icon";
import { cn } from "@/lib/utils";
import { saveFormProject } from "@incmix/store";
import { MotionSheet } from "../custom-sheet";
// Dynamically import heavy components
const AddProjectAutoForm = lazy(() => import("./components/add-project-auto-form").then((module) => ({
    default: module.AddProjectAutoForm,
})));
const ProjectCard = lazy(() => import("./components/project-card").then((module) => ({
    default: module.ProjectCard,
})));
const ProjectDrawer = lazy(() => import("./components/project-drawer").then((module) => ({
    default: module.default,
})));
const ProjectFilter = lazy(() => import("./components/project-filter").then((module) => ({
    default: module.ProjectFilter,
})));
import { projects as initialProjects } from "./data";
/**
 * Renders the project management page with filtering, view mode switching, and project creation functionality.
 *
 * This component displays a list of projects and provides interactive features to filter projects by status, search,
 * and switch between grid and list views. It supports adding new projects via an integrated auto form and allows
 * for project deletion as well as placeholder functions for adding members and due dates. The UI dynamically adjusts
 * based on the active view mode and current filter selections.
 *
 * @returns The React element representing the project management page.
 */
export function ProjectPageComponents() {
    const [projectId, setProjectId] = useQueryState("projectId", {
        defaultValue: "",
    });
    const [projects, setProjects] = useState(initialProjects);
    const [filteredProjects, setFilteredProjects] = useState(initialProjects);
    const [activeTab, setActiveTab] = useState("all");
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [viewMode, setViewMode] = useState("grid");
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (tab === "all") {
            setFilteredProjects(projects);
        }
        else {
            setFilteredProjects(projects.filter((project) => project.status === tab));
        }
    };
    const handleAddProject = async (newProject) => {
        // Create the project with ID
        const uniqueId = nanoid();
        // Create the project with a unique ID
        const projectWithId = {
            ...newProject,
            id: uniqueId, // Use our simple unique ID instead of array length
        };
        try {
            // Save to RxDB
            await saveFormProject(projectWithId);
            // Update local state
            const updatedProjects = [...projects, projectWithId];
            setProjects(updatedProjects);
            if (activeTab === "all" || activeTab === newProject.status) {
                setFilteredProjects([...filteredProjects, projectWithId]);
            }
            toast.success("Project created successfully", {
                description: `"${newProject.title}" has been added to your projects.`,
            });
        }
        catch (error) {
            console.error("Failed to save project to RxDB:", error);
            toast.error("Failed to save project", {
                description: "Your project couldn't be saved Please try again.",
            });
            // Still update the UI state even if DB save fails
            const updatedProjects = [...projects, projectWithId];
            setProjects(updatedProjects);
            if (activeTab === "all" || activeTab === newProject.status) {
                setFilteredProjects([...filteredProjects, projectWithId]);
            }
        }
    };
    const handleAddMember = (project) => {
        console.log("TODO: Implement member selection for project", project.id);
    };
    const handleAddDueDate = (project) => {
        console.log("TODO: Implement due date picker for project", project.id);
    };
    const handleDeleteProject = (projectId) => {
        const updatedProjects = projects.filter((p) => p.id !== projectId);
        setProjects(updatedProjects);
        setFilteredProjects(filteredProjects.filter((p) => p.id !== projectId));
    };
    const handleApplyFilters = (filters) => {
        let filtered = [...projects];
        // Filter by search term
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter((project) => project.title.toLowerCase().includes(searchLower) ||
                project.company.toLowerCase().includes(searchLower) ||
                project.description.toLowerCase().includes(searchLower));
        }
        // Filter by members
        if (filters.members.length > 0) {
            filtered = filtered.filter((project) => project.members.some(
            // @ts-ignore
            (member) => member.id && filters.members.includes(member.id)));
        }
        // Filter by status if not "all"
        if (filters.status && filters.status !== "all") {
            filtered = filtered.filter((project) => project.status === filters.status);
        }
        // Apply active tab filter
        if (activeTab !== "all") {
            filtered = filtered.filter((project) => project.status === activeTab);
        }
        setFilteredProjects(filtered);
        setIsFilterOpen(false);
    };
    const handleResetFilters = () => {
        if (activeTab === "all") {
            setFilteredProjects(projects);
        }
        else {
            setFilteredProjects(projects.filter((project) => project.status === activeTab));
        }
        setIsFilterOpen(false);
    };
    const handleOpenListView = () => {
        setFilteredProjects(projects);
        setActiveTab("all");
        setViewMode("list");
        if (!projectId) {
            setProjectId(filteredProjects[0]?.id);
        }
    };
    return (_jsxs(Box, { className: "min-h-screen bg-gray-1", children: [_jsx(Box, { className: "mx-auto max-w-7xl px-4 py-8", children: _jsxs(Box, { className: "relative mb-6", children: [viewMode === "grid" && (_jsxs(Box, { className: "flex w-full items-center justify-start rounded-none border-gray-5 border-b bg-transparent ", children: [_jsxs(Button, { className: "relative h-11 cursor-pointer bg-transparent text-gray-11", onClick: () => handleTabChange("all"), children: [activeTab === "all" && (_jsx(motion.span, { layoutId: "tab-indicator", className: "-bottom-0.5 absolute left-0 inline-block h-0.5 w-full bg-blue-600" })), "All", " ", _jsx(Text, { as: "span", className: "bg-gray-3 px-2 text-gray-10", children: projects.length })] }), _jsxs(Button, { className: "relative h-11 cursor-pointer bg-transparent text-gray-11", onClick: () => handleTabChange("started"), children: [activeTab === "started" && (_jsx(motion.span, { layoutId: "tab-indicator", className: "-bottom-0.5 absolute left-0 inline-block h-0.5 w-full bg-blue-600" })), "Started", " ", _jsx(Text, { as: "span", className: "bg-gray-3 px-2 text-gray-10", children: projects.filter((p) => p.status === "started").length })] }), _jsxs(Button, { className: "relative h-11 cursor-pointer bg-transparent text-gray-11", onClick: () => handleTabChange("on-hold"), children: [activeTab === "on-hold" && (_jsx(motion.span, { layoutId: "tab-indicator", className: "-bottom-0.5 absolute left-0 inline-block h-0.5 w-full bg-blue-600" })), "On Hold", " ", _jsx(Text, { as: "span", className: "bg-gray-3 px-2 text-gray-10", children: projects.filter((p) => p.status === "on-hold").length })] }), _jsxs(Button, { className: "relative h-11 cursor-pointer bg-transparent text-gray-11", onClick: () => handleTabChange("completed"), children: [activeTab === "completed" && (_jsx(motion.span, { layoutId: "tab-indicator", className: "-bottom-0.5 absolute left-0 inline-block h-0.5 w-full bg-blue-600" })), "Completed", " ", _jsx(Text, { as: "span", className: "bg-gray-3 px-2 text-gray-10", children: projects.filter((p) => p.status === "completed").length })] })] })), _jsxs(Box, { className: "absolute top-0 right-0 z-10 flex rounded-md ", children: [_jsx(IconButton, { variant: viewMode === "list" ? "soft" : "solid", className: "h-10 w-10 cursor-pointer rounded-r-none border-0", onClick: () => setViewMode("grid"), children: _jsx(LayoutGrid, { size: 16 }) }), _jsx(IconButton, { variant: viewMode === "grid" ? "soft" : "solid", className: "h-10 w-10 cursor-pointer rounded-l-none border-0", onClick: handleOpenListView, children: _jsx(List, { size: 20 }) }), _jsxs(Flex, { align: "center", gap: "2", className: " pl-2", children: [_jsx(IconButton, { color: "gray", variant: "soft", onClick: () => setIsFilterOpen(true), className: "h-10 w-10 cursor-pointer", children: _jsx(SlidersHorizontal, { size: 20 }) }), _jsxs(Button, { onClick: () => setIsAddModalOpen(true), variant: "solid", className: "h-10 cursor-pointer", children: [_jsx(Plus, { size: 16 }), "Add Project"] })] })] }), _jsxs(Box, { className: cn("relative mb-6", viewMode === "list" ? "flex gap-5 pt-10" : "pt-4"), children: [_jsx(ScrollArea, { className: `${viewMode === "grid" ? "h-full" : "h-[85vh] w-80 "}`, children: _jsx(Box, { className: `${viewMode === "grid" ? "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" : "h-full w-full gap-4 space-y-2 overflow-x-auto"}`, children: filteredProjects.map((project) => (_jsx(Suspense, { fallback: _jsx(Box, { className: "rounded-md border p-4", children: "Loading project..." }), children: _jsx(ProjectCard, { project: project, isListFilter: viewMode === "list", onAddMember: handleAddMember, onAddDueDate: handleAddDueDate, onDelete: handleDeleteProject }, project.id) }, project.id))) }) }), filteredProjects.length === 0 && (_jsxs(Box, { className: "py-12 text-center", children: [_jsx(Heading, { as: "h1", className: "mb-2 font-medium text-gray-900 text-lg", children: "No projects found" }), _jsx(Text, { as: "p", className: "mb-6 text-gray-500", children: "You don't have any completed projects yet." }), _jsxs(Button, { onClick: () => setIsAddModalOpen(true), className: "bg-blue-600 hover:bg-blue-700", children: [_jsx(Plus, { className: `mr-2 ${iconSize}` }), " Add New Project"] })] })), _jsx(Suspense, { fallback: _jsx(Box, { className: "p-4", children: "Loading drawer..." }), children: _jsx(ProjectDrawer, { listFilter: viewMode === "list" }) })] })] }) }), _jsx(Suspense, { fallback: _jsx(Box, { className: "p-4", children: "Loading form..." }), children: _jsx(AddProjectAutoForm, { isOpen: isAddModalOpen, onClose: () => setIsAddModalOpen(false), onAddProject: handleAddProject }) }), _jsx(MotionSheet, { title: "Filter", side: "right", open: isFilterOpen, onOpenChange: setIsFilterOpen, children: _jsx(Suspense, { fallback: _jsx(Box, { className: "p-4", children: "Loading filters..." }), children: _jsx(ProjectFilter, { onApplyFilters: handleApplyFilters, onResetFilters: handleResetFilters }) }) })] }));
}
//# sourceMappingURL=index.js.map