import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { SmartDatetimeInput } from "@/components/datetime-picker";
import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem, } from "@/components/file-upload";
import MultipleSelector from "@/components/multiple-selector/multiple-selector";
import { Box, Button, Dialog, Flex, Grid, Text, TextArea, } from "@/components/base";
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { members } from "../data";
import { ProjectsImages } from "../images";
export function AddProjectModal({ isOpen, onClose, onAddProject, }) {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);
    const [budget, setBudget] = useState("");
    const [files, setFiles] = useState(null);
    const [objectUrls, setObjectUrls] = useState([]);
    const dropZoneConfig = {
        maxFiles: 5,
        maxSize: 1024 * 1024 * 4,
        multiple: true,
    };
    useEffect(() => {
        if (!files || files.length === 0)
            return;
        const urls = files.map((file) => URL.createObjectURL(file));
        setObjectUrls(urls);
        // Cleanup URLs when files change or component unmounts
        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [files]);
    const handleStartDate = (date) => {
        setStartDate(date);
    };
    const handleEndDate = (date) => {
        setEndDate(date);
    };
    const handleSubmit = () => {
        const requiredFields = [];
        if (!title)
            requiredFields.push("Project Name");
        if (!company)
            requiredFields.push("Client Name");
        if (!description)
            requiredFields.push("Description");
        if (requiredFields.length > 0) {
            // Consider adding a toast or other notification here
            console.error(`Please fill in required fields: ${requiredFields.join(", ")}`);
            return;
        }
        const newProject = {
            title,
            company,
            logo: ProjectsImages.user,
            description,
            progress: 0,
            timeLeft: "1",
            timeType: "week",
            members: selectedMembers,
            status: "started",
            startDate: startDate ? startDate.getTime() : undefined,
            endDate: endDate ? new Date(endDate).getTime() : undefined,
            budget: budget ? Number.parseFloat(budget) : undefined,
            files: objectUrls[0],
        };
        onAddProject(newProject);
        resetForm();
        onClose();
    };
    const resetForm = () => {
        setTitle("");
        setCompany("");
        setDescription("");
        setSelectedMembers([]);
        setStartDate(undefined);
        setEndDate(undefined);
        setBudget("");
        setFiles(null);
        setObjectUrls([]);
    };
    return (_jsx(Dialog.Root, { open: isOpen, onOpenChange: onClose, children: _jsxs(Dialog.Content, { maxWidth: "500px", children: [_jsx(Dialog.Title, { className: "font-medium", children: "Add Project" }), _jsxs(Grid, { className: "py-4", gap: "4", children: [_jsx(Flex, { justify: "center", className: "mb-4", children: _jsxs(FileUploader, { value: files, onValueChange: setFiles, dropzoneOptions: dropZoneConfig, className: "relative mx-auto h-28 w-36 rounded-lg border-none p-2", children: [_jsx(FileInput, { className: "l mx-auto grid h-full w-full place-content-center outline-dashed outline-2 outline-gray-4 ", children: _jsx(Flex, { justify: "center", align: "center", direction: "column", className: "w-full pt-3 pb-4 ", children: _jsx(Plus, { size: 32, className: "text-gray-8" }) }) }), files && files.length > 0 && (_jsx(FileUploaderContent, { className: "absolute top-0 left-0 h-full w-full ", children: files.map((file, i) => (_jsx(FileUploaderItem, { index: i, className: "h-full w-full overflow-hidden rounded-md border-none bg-gray-4 hover:bg-gray-3", "aria-roledescription": `file ${i + 1} containing ${file.name}`, children: _jsx("img", { src: objectUrls[i], alt: file.name, className: "h-full w-full rounded-md object-cover" }) }, `${file.name}-${file.size}-${i}`))) }))] }) }), _jsxs(Grid, { gap: "2", children: [_jsx(Label, { htmlFor: "project-name", children: "Project Name" }), _jsx(Input, { id: "project-name", placeholder: "App Development", value: title, onChange: (e) => setTitle(e.target.value) })] }), _jsxs(Grid, { gap: "2", children: [_jsx(Label, { htmlFor: "client-name", children: "Client Name" }), _jsx(Input, { id: "client-name", placeholder: "Dropbox, Inc.", value: company, onChange: (e) => setCompany(e.target.value) })] }), _jsxs(Grid, { gap: "2", children: [_jsx(Label, { htmlFor: "description", children: "Description" }), _jsx(TextArea, { id: "description", placeholder: "Create a mobile application on iOS and Android devices.", value: description, onChange: (e) => setDescription(e.target.value), rows: 3 })] }), _jsxs(Grid, { gap: "4", columns: "2", children: [_jsxs(Grid, { gap: "2", children: [_jsx(Label, { children: "Start Date" }), _jsx("div", { className: "relative", children: _jsx(SmartDatetimeInput, { value: startDate, showCalendar: true, onValueChange: handleStartDate, placeholder: "Mar 5, 2025, 2:45 AM", className: "w-fit bg-gray-2 dark:bg-gray-1 " }) })] }), _jsxs(Grid, { gap: "2", children: [_jsx(Label, { children: "End Date" }), _jsx("div", { className: "relative", children: _jsx(SmartDatetimeInput, { value: endDate, showCalendar: true, onValueChange: handleEndDate, placeholder: "Mar 6, 2025, 2:45 AM", className: "w-fit bg-gray-2 dark:bg-gray-1" }) })] })] }), _jsxs(Grid, { gap: "2", children: [_jsx(Label, { children: "Members" }), _jsx(Flex, { gap: "2", wrap: "wrap", children: _jsx(MultipleSelector, { value: selectedMembers, onChange: setSelectedMembers, defaultColor: "gray", defaultOptions: members, placeholder: "Select members", className: "border-1 dark:bg-gray-1", emptyIndicator: _jsx("p", { className: "text-center text-gray-6 text-lg dark:text-gray-400", children: "No results found." }) }) })] }), _jsxs(Grid, { gap: "2", children: [_jsx(Label, { htmlFor: "budget", children: "Budget" }), _jsxs(Box, { className: "relative", children: [_jsx(Text, { className: "absolute top-2.5 left-3 text-gray-500", children: "$" }), _jsx(Input, { id: "budget", type: "number", placeholder: "25,000.00", value: budget, onChange: (e) => setBudget(e.target.value), className: "pl-8" })] })] })] }), _jsx(Flex, { justify: "end", children: _jsx(Button, { onClick: handleSubmit, className: "bg-blue-600 hover:bg-blue-700", children: "Create" }) })] }) }));
}
//# sourceMappingURL=add-project-modal.js.map