"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
import { GridLayoutCard, LayoutGrid, } from "@/components/layout-grid";
import { Box, Button, Card, Flex, Text } from "@/components/radixui";
import { toast } from "@/components/toaster";
import { useUploadFile } from "@/hooks/use-upload-file";
import { cn } from "@/lib/utils";
import { Trash, Upload } from "lucide-react";
const getDataUrl = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});
export function ImageGrid() {
    const { isDragging, isDropActive, openFilePicker, dropzoneProps } = useUploadFile({
        types: [
            {
                accept: {
                    "image/*": [
                        ".png",
                        ".jpg",
                        ".jpeg",
                        ".gif",
                        ".bmp",
                        ".webp",
                        ".svg",
                    ],
                },
            },
        ],
        opfs: { enabled: true, saveDirectory: "images" },
        multiple: true,
        onSuccess: () => getLocalImages().then(setFiles),
        onError: (error) => {
            toast.error(error.message);
        },
    });
    const [files, setFiles] = useState([]);
    const getLocalImages = useCallback(async () => {
        const root = await navigator.storage.getDirectory();
        const dir = await root.getDirectoryHandle("images");
        const items = dir.values();
        const localFiles = [];
        let id = 1;
        for await (const item of items) {
            if (item instanceof FileSystemFileHandle) {
                const file = await item.getFile();
                if (file.type.includes("image")) {
                    localFiles.push({
                        card: {
                            id,
                            content: _jsx(GridLayoutCard, {}),
                            className: "md:col-span-2",
                            thumbnail: await getDataUrl(file),
                        },
                        handle: item,
                    });
                    id++;
                }
            }
        }
        return localFiles;
    }, []);
    useEffect(() => {
        getLocalImages().then(setFiles);
    }, [getLocalImages]);
    const deleteAll = () => {
        const shouldDelete = confirm("Are you sure you want to delete all files?");
        if (shouldDelete) {
            for (const file of files) {
                // @ts-expect-error Experimental API
                file.handle.remove();
            }
            setFiles([]);
        }
    };
    return (_jsxs(Card.Root, { className: "min-w-[48rem] max-w-7xl space-y-10", children: [_jsxs(Flex, { gap: "4", align: "center", justify: "end", children: [_jsxs(Button, { color: "red", onClick: deleteAll, children: [_jsx(Trash, {}), "Delete All"] }), _jsxs(Button, { variant: "outline", onClick: openFilePicker, children: [_jsx(Upload, {}), "Upload"] })] }), _jsx(Box, { className: cn("mt-6 h-[600px] rounded p-4", isDropActive
                    ? "outline outline-primary"
                    : isDragging
                        ? "outline-dashed outline-muted"
                        : "outline-none"), ...dropzoneProps, children: files.length ? (_jsx(LayoutGrid, { cards: files.map(({ card }) => card) })) : (_jsx(Text, { weight: "medium", className: "block pt-40 text-muted-foreground text-xl", align: "center", children: "No Files Found. Drag and drop to upload" })) })] }));
}
//# sourceMappingURL=index.js.map