import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Pencil, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { Avatar, Box, Button, Flex } from "./base";
export const AvatarEditable = ({ size = "3", src, name, deletable = true, onImageChange, onImageDelete, isDeletingImage = false, }) => {
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef(null);
    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (file && onImageChange) {
            await onImageChange(file);
        }
    };
    return (_jsxs(Box, { position: "relative", className: "rounded-full", children: [_jsx(Avatar, { size: size, src: src, name: name }), _jsxs(Flex, { position: "absolute", inset: "0", align: "center", justify: "center", className: "rounded-full", onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsx(Flex, { align: "center", justify: "center", className: `h-full w-full cursor-pointer rounded-full bg-black/50 transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`, onClick: () => fileInputRef.current?.click(), children: _jsx(Pencil, { color: "white", width: "33%", height: "33%" }) }), _jsx("input", { ref: fileInputRef, type: "file", accept: "image/*", style: { display: "none" }, onChange: handleFileUpload })] }), deletable && src && (_jsx(Button, { onClick: onImageDelete, variant: "ghost", color: "red", disabled: isDeletingImage, className: "absolute top-0 right-0 rounded-full bg-red-3 p-1", children: _jsx(Trash2, { width: "16", height: "16" }) }))] }));
};
//# sourceMappingURL=avatar-editable.js.map