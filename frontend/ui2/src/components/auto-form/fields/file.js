import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input } from "@/components/shadcn";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import AutoFormLabel from "../common/label";
/**
 * Renders a file upload component with preview and removal capabilities.
 *
 * This component ensures that the raw File object is passed directly to the form field
 * and not serialized, which is essential for RxDB attachment handling.
 */
export default function AutoFormFile({ label, isRequired, fieldProps, field, // This comes from react-hook-form via AutoForm
 }) {
    const { showLabel: _showLabel, ...fieldPropsWithoutShowLabel } = fieldProps;
    const showLabel = _showLabel === undefined ? true : _showLabel;
    const [localFile, setLocalFile] = useState(null);
    const [fileName, setFileName] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);
    // Effect to handle removal/reset from outside the component
    useEffect(() => {
        if (field.value === null || field.value === undefined) {
            cleanupResources();
        }
        else if (field.value instanceof File && field.value !== localFile) {
            updateWithFile(field.value);
        }
    }, [field.value]);
    // Cleanup function to prevent memory leaks
    const cleanupResources = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setLocalFile(null);
        setFileName(null);
        setPreviewUrl(null);
        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };
    // Update component state with a file
    const updateWithFile = (file) => {
        // Clean up previous preview URL if it exists
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        // Create new preview URL
        const objectUrl = URL.createObjectURL(file);
        setLocalFile(file);
        setFileName(file.name);
        setPreviewUrl(objectUrl);
    };
    // Clean up when component unmounts
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, []);
    const handleFileChange = (e) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            updateWithFile(selectedFile);
            // IMPORTANT: Pass the actual File object directly to the form
            // This is the key to ensuring we're working with a real File object
            field.onChange(selectedFile);
        }
        else {
            handleRemoveClick();
        }
    };
    const handleRemoveClick = () => {
        cleanupResources();
        field.onChange(null); // Clear the form value
    };
    // Determine if the file is an image for preview purposes
    const isImage = localFile?.type.startsWith("image/");
    const canPreview = isImage && previewUrl;
    return (_jsxs("div", { className: "flex flex-col items-center space-y-2", children: [showLabel && (_jsx("div", { className: "mb-2 w-full text-center", children: _jsx(AutoFormLabel, { label: label, isRequired: isRequired, className: "w-auto font-medium text-base" }) })), _jsx("div", { className: "relative h-28 w-36 rounded-lg", children: !localFile ? (_jsxs("div", { className: "relative h-full w-full", children: [_jsx(Form.Control, { children: _jsx(Input, { type: "file", ref: fileInputRef, ...fieldPropsWithoutShowLabel, onChange: handleFileChange, value: undefined, className: "absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" }) }), _jsx("div", { className: "absolute inset-0 flex h-full w-full flex-col items-center justify-center rounded-lg outline-dashed outline-2 outline-gray-4", children: _jsx(Plus, { size: 32, className: "text-gray-8" }) })] })) : (_jsx("div", { className: "relative h-full w-full", children: _jsxs("div", { className: "absolute inset-0 h-full w-full overflow-hidden rounded-md bg-gray-4", children: [canPreview ? (_jsx("img", { src: previewUrl, alt: fileName ?? "File preview", className: "h-full w-full rounded-md object-cover", onError: () => {
                                    console.error("Failed to load image preview");
                                    setPreviewUrl(null);
                                } })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center bg-gray-3 p-2", children: _jsx("p", { className: "truncate text-center text-sm", children: fileName ?? "File selected" }) })), _jsx("button", { type: "button", onClick: handleRemoveClick, "aria-label": "Remove file", className: "absolute top-1 right-1 rounded-full bg-white/80 p-1 shadow-sm hover:bg-white", children: _jsx(Trash2, { className: "size-4 text-red-500" }) })] }) })) }), _jsx("div", { className: "w-full text-center", children: _jsx(Form.Message, {}) })] }));
}
//# sourceMappingURL=file.js.map