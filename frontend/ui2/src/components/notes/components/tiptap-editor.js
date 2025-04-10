import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, Flex } from "@/components/base";
import { encodeHTML } from "@/lib/strings";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Code, Heading1, Heading2, Italic, List, ListOrdered, Quote, Redo, Undo, } from "lucide-react";
const TitleMenuBar = () => {
    const { editor } = useCurrentEditor();
    if (!editor) {
        return null;
    }
    return (_jsxs(Flex, { wrap: "wrap", gap: "1", className: "mb-2", children: [_jsx(Button, { variant: editor.isActive("bold") ? "solid" : "soft", onClick: () => editor.chain().focus().toggleBold().run(), disabled: !editor.can().chain().focus().toggleBold().run(), children: _jsx(Bold, { className: "h-4 w-4" }) }), _jsx(Button, { variant: editor.isActive("italic") ? "solid" : "soft", onClick: () => editor.chain().focus().toggleItalic().run(), disabled: !editor.can().chain().focus().toggleItalic().run(), children: _jsx(Italic, { className: "h-4 w-4" }) }), _jsx(Button, { variant: editor.isActive("heading", { level: 1 }) ? "solid" : "soft", onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(), children: _jsx(Heading1, { className: "h-4 w-4" }) }), _jsx(Button, { variant: editor.isActive("heading", { level: 2 }) ? "solid" : "soft", onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(), children: _jsx(Heading2, { className: "h-4 w-4" }) }), _jsx(Button, { variant: editor.isActive("bulletList") ? "solid" : "soft", onClick: () => editor.chain().focus().toggleBulletList().run(), children: _jsx(List, { className: "h-4 w-4" }) }), _jsx(Button, { variant: editor.isActive("orderedList") ? "solid" : "soft", onClick: () => editor.chain().focus().toggleOrderedList().run(), children: _jsx(ListOrdered, { className: "h-4 w-4" }) }), _jsx(Button, { variant: editor.isActive("codeBlock") ? "solid" : "soft", onClick: () => editor.chain().focus().toggleCodeBlock().run(), children: _jsx(Code, { className: "h-4 w-4" }) }), _jsx(Button, { variant: editor.isActive("blockquote") ? "solid" : "soft", onClick: () => editor.chain().focus().toggleBlockquote().run(), children: _jsx(Quote, { className: "h-4 w-4" }) }), _jsx(Button, { variant: editor.isActive("undo") ? "solid" : "soft", onClick: () => editor.chain().focus().undo().run(), disabled: !editor.can().chain().focus().undo().run(), children: _jsx(Undo, { className: "h-4 w-4" }) }), _jsx(Button, { variant: editor.isActive("redo") ? "solid" : "soft", onClick: () => editor.chain().focus().redo().run(), disabled: !editor.can().chain().focus().redo().run(), children: _jsx(Redo, { className: "h-4 w-4" }) })] }));
};
export function TiptapEditor({ modalData }) {
    const content = `
    <h2>
  ${modalData?.title ? encodeHTML(modalData.title) : ""}
</h2>
<p>
  ${modalData?.content ? encodeHTML(modalData.content) : ""}
  +</p>`;
    const extensions = [
        StarterKit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false,
            },
            orderedList: {
                keepMarks: true,
                keepAttributes: false,
            },
        }),
    ];
    return (_jsx(Box, { className: "mb-4", children: _jsx(EditorProvider, { slotBefore: _jsx(TitleMenuBar, {}), extensions: extensions, content: content, editorProps: {
                attributes: {
                    class: "pb-2 focus:outline-none w-full prose max-w-none text-gray-12",
                },
            }, children: _jsx("div", {}) }) }));
}
//# sourceMappingURL=tiptap-editor.js.map