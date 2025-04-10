import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import AutoForm from "@/components/auto-form";
import { Button, Dialog } from "@radix-ui/themes";
import jsonSchemaToZod from "json-schema-to-zod";
import { useState } from "react";
import { z } from "zod";
import { ProjectsImages } from "../images";
import { projectFormSchema } from "./project-form-schema";
/**
 * Renders a dialog with an auto-generated form for creating a new project.
 * Fixed to properly handle file uploads.
 */
export function AddProjectAutoForm({ isOpen, onClose, onAddProject, }) {
    const [formData, setFormData] = useState({});
    // Convert JSON schema to Zod schema
    const convertToZod = (schema) => {
        try {
            // Generate Zod code from JSON Schema
            const zodString = jsonSchemaToZod(schema);
            // Create a function that returns the Zod schema
            const zodSchemaFunction = new Function("z", `return ${zodString}`);
            // Return the Zod schema
            return zodSchemaFunction(z);
        }
        catch (error) {
            console.error("Error converting to Zod:", error, {
                schemaId: schema.id || "unknown",
            });
            return null;
        }
    };
    // Handle form values change
    const handleValuesChange = (values) => {
        setFormData(values);
    };
    // Handle form submission
    const handleSubmit = (data) => {
        // Pass the raw File object directly, not as a serialized object
        const fileData = data.files; // This should be a File object from AutoFormFile
        // Transform form data to match the Project type
        const newProject = {
            title: data.title,
            company: data.company,
            logo: ProjectsImages.user, // Default logo
            description: data.description,
            progress: 0, // Default progress
            timeLeft: data.timeLeft || "1", // Default timeLeft
            timeType: data.timeType || "week", // Default timeType
            members: data.members || [],
            status: data.status || "started", // Default status
            startDate: data.startDate
                ? new Date(data.startDate).getTime()
                : Date.now(),
            endDate: data.endDate
                ? new Date(data.endDate).getTime()
                : Date.now() + 7 * 24 * 60 * 60 * 1000,
            budget: data.budget ? Number.parseFloat(data.budget) : 0,
            // Just pass the file data as is - our improved saveFormProject will handle it
            fileData: fileData,
        };
        onAddProject(newProject);
        setFormData({}); // Reset form
        onClose();
    };
    // Convert the JSON schema to Zod schema
    const zodSchema = convertToZod(projectFormSchema.formSchema);
    return (_jsx(Dialog.Root, { open: isOpen, onOpenChange: onClose, children: _jsxs(Dialog.Content, { maxWidth: "500px", children: [_jsx(Dialog.Title, { className: "font-medium", children: "Add Project" }), _jsx("div", { className: "py-4", children: zodSchema && (_jsx(AutoForm, { formSchema: zodSchema, onSubmit: handleSubmit, onValuesChange: handleValuesChange, values: formData, fieldConfig: projectFormSchema.fieldConfig, children: _jsx("div", { className: "mt-4 flex justify-end", children: _jsx(Button, { type: "submit", className: "bg-blue-600 hover:bg-blue-700", children: "Create" }) }) })) })] }) }));
}
//# sourceMappingURL=add-project-auto-form.js.map