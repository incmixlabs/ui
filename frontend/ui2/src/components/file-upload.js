import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
import { cn } from "@/lib/utils";
import { Trash2 as RemoveIcon } from "lucide-react";
import { createContext, forwardRef, useCallback, useContext, useEffect, useRef, useState, } from "react";
import { useDropzone, } from "react-dropzone";
import { toast } from "sonner";
const FileUploaderContext = createContext(null);
export const useFileUpload = () => {
    const context = useContext(FileUploaderContext);
    if (!context) {
        throw new Error("useFileUpload must be used within a FileUploaderProvider");
    }
    return context;
};
/**
 * File upload Docs: {@link: https://localhost:3000/docs/file-upload}
 */
export const FileUploader = forwardRef(({ className, dropzoneOptions, value, onValueChange, reSelect, orientation = "vertical", children, dir, ...props }, ref) => {
    const [isFileTooBig, setIsFileTooBig] = useState(false);
    const [isLOF, setIsLOF] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const { accept = {
        "image/*": [".jpg", ".jpeg", ".png", ".gif"],
        "video/*": [".mp4", ".MOV", ".AVI"],
    }, maxFiles = 1, maxSize = 4 * 1024 * 1024, multiple = true, } = dropzoneOptions;
    const reSelectAll = maxFiles === 1 ? true : reSelect;
    const direction = dir === "rtl" ? "rtl" : "ltr";
    const removeFileFromSet = useCallback((i) => {
        if (!value)
            return;
        const newFiles = value.filter((_, index) => index !== i);
        onValueChange(newFiles);
    }, [value, onValueChange]);
    const handleKeyDown = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!value)
            return;
        const moveNext = () => {
            const nextIndex = activeIndex + 1;
            setActiveIndex(nextIndex > value.length - 1 ? 0 : nextIndex);
        };
        const movePrev = () => {
            const nextIndex = activeIndex - 1;
            setActiveIndex(nextIndex < 0 ? value.length - 1 : nextIndex);
        };
        const prevKey = orientation === "horizontal"
            ? direction === "ltr"
                ? "ArrowLeft"
                : "ArrowRight"
            : "ArrowUp";
        const nextKey = orientation === "horizontal"
            ? direction === "ltr"
                ? "ArrowRight"
                : "ArrowLeft"
            : "ArrowDown";
        if (e.key === nextKey) {
            moveNext();
        }
        else if (e.key === prevKey) {
            movePrev();
        }
        else if (e.key === "Enter" || e.key === "Space") {
            if (activeIndex === -1) {
                dropzoneState.inputRef.current?.click();
            }
        }
        else if (e.key === "Delete" || e.key === "Backspace") {
            if (activeIndex !== -1) {
                removeFileFromSet(activeIndex);
                if (value.length - 1 === 0) {
                    setActiveIndex(-1);
                    return;
                }
                movePrev();
            }
        }
        else if (e.key === "Escape") {
            setActiveIndex(-1);
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value, activeIndex, removeFileFromSet]);
    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
        const files = acceptedFiles;
        if (!files) {
            toast.error("file error , probably too big");
            return;
        }
        const newValues = value ? [...value] : [];
        if (reSelectAll) {
            newValues.splice(0, newValues.length);
        }
        files.forEach((file) => {
            if (newValues.length < maxFiles) {
                newValues.push(file);
            }
        });
        onValueChange(newValues);
        if (rejectedFiles.length > 0) {
            for (let i = 0; i < rejectedFiles.length; i++) {
                if (rejectedFiles[i].errors[0]?.code === "file-too-large") {
                    toast.error(`File is too large. Max size is ${maxSize / 1024 / 1024}MB`);
                    break;
                }
                if (rejectedFiles[i].errors[0]?.message) {
                    toast.error(rejectedFiles[i].errors[0].message);
                    break;
                }
            }
        }
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [reSelectAll, value]);
    useEffect(() => {
        if (!value)
            return;
        if (value.length === maxFiles) {
            setIsLOF(true);
            return;
        }
        setIsLOF(false);
    }, [value, maxFiles]);
    const opts = dropzoneOptions
        ? dropzoneOptions
        : { accept, maxFiles, maxSize, multiple };
    const dropzoneState = useDropzone({
        ...opts,
        onDrop,
        onDropRejected: () => setIsFileTooBig(true),
        onDropAccepted: () => setIsFileTooBig(false),
    });
    return (_jsx(FileUploaderContext.Provider, { value: {
            dropzoneState,
            isLOF,
            isFileTooBig,
            removeFileFromSet,
            activeIndex,
            setActiveIndex,
            orientation,
            direction,
        }, children: _jsx("div", { ref: ref, onKeyDownCapture: handleKeyDown, className: cn("grid w-full overflow-hidden focus:outline-none ", className, {
                "gap-2": value && value.length > 0,
            }), dir: dir, ...props, children: children }) }));
});
FileUploader.displayName = "FileUploader";
export const FileUploaderContent = forwardRef(({ children, className, ...props }, ref) => {
    const { orientation } = useFileUpload();
    const containerRef = useRef(null);
    return (_jsx("div", { className: cn("w-full px-1"), ref: containerRef, children: _jsx("div", { ...props, ref: ref, className: cn(" gap-1 rounded-xl", orientation === "horizontal" ? "grid grid-cols-2" : "flex flex-col", className), children: children }) }));
});
FileUploaderContent.displayName = "FileUploaderContent";
export const FileUploaderItem = forwardRef(({ className, index, children, ...props }, ref) => {
    const { removeFileFromSet, activeIndex, direction } = useFileUpload();
    const isSelected = index === activeIndex;
    return (_jsxs("div", { ref: ref, className: cn("relative h-7 w-full cursor-pointer justify-between overflow-hidden rounded-md border p-1 hover:bg-primary-foreground", className, isSelected ? "bg-muted" : ""), ...props, children: [_jsx("div", { className: "flex h-full w-full items-center gap-1.5 font-medium leading-none tracking-tight", children: children }), _jsxs("button", { type: "button", className: cn("absolute rounded bg-red-10 p-1 text-background", direction === "rtl" ? "top-1 left-1" : "right-1.5 bottom-1.5"), onClick: () => removeFileFromSet(index), children: [_jsxs("span", { className: "sr-only", children: ["remove item ", index] }), _jsx(RemoveIcon, { className: "h-3 w-3 duration-200 ease-in-out hover:stroke-white" })] })] }));
});
FileUploaderItem.displayName = "FileUploaderItem";
export const FileInput = forwardRef(({ className, parentclass, dropmsg, children, ...props }, ref) => {
    const { dropzoneState, isFileTooBig, isLOF } = useFileUpload();
    const rootProps = isLOF ? {} : dropzoneState.getRootProps();
    return (_jsxs("div", { ref: ref, ...props, className: cn("relative w-full", parentclass, isLOF ? "cursor-not-allowed opacity-50" : "cursor-pointer"), children: [_jsxs("div", { className: cn("w-full rounded-lg transition-colors duration-300 ease-in-out", dropzoneState.isDragAccept && "border-green-500 bg-green-50", dropzoneState.isDragReject && "border-red-500 bg-red-50", isFileTooBig && "border-red-500 bg-red-200", !dropzoneState.isDragActive &&
                    "border-gray-300 hover:border-gray-400", className), ...rootProps, children: [children, dropzoneState.isDragActive && (_jsx("div", { className: "absolute inset-0 flex items-center justify-center rounded-lg bg-primary-foreground/60 backdrop-blur-sm", children: _jsx("p", { className: "font-medium text-primary", children: dropmsg }) }))] }), _jsx("input", { ref: dropzoneState.inputRef, disabled: isLOF, ...dropzoneState.getInputProps(), className: cn(isLOF && "cursor-not-allowed") })] }));
});
//# sourceMappingURL=file-upload.js.map