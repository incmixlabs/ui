"use client"

import { Button } from "@incmix/ui"
import ListItem from "@tiptap/extension-list-item"
import TextStyle from "@tiptap/extension-text-style"
import { EditorProvider, useCurrentEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Undo,
} from "lucide-react"
import type { INote } from "../data"

interface TiptapEditorProps {
  modalData: INote | null
  onChange?: (content: INote) => void
}

const TitleMenuBar = () => {
  const { editor } = useCurrentEditor()

  if (!editor) {
    return null
  }

  return (
    <div className="mb-2 flex flex-wrap gap-1">
      <Button
        variant="soft"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-muted text-primary" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="soft"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-muted text-primary" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="soft"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "bg-muted text-primary"
            : ""
        }
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant="soft"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "bg-muted text-primary"
            : ""
        }
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="soft"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "bg-muted text-primary" : ""}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="soft"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList") ? "bg-muted text-primary" : ""
        }
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="soft"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive("codeBlock") ? "bg-muted text-primary" : ""}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        variant="soft"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "bg-muted text-primary" : ""}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant="soft"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant="soft"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function TiptapEditor({ modalData, onChange }: TiptapEditorProps) {
  const content = `
    <h2>
 ${modalData?.title || ""}
</h2>
<p>
  ${modalData?.content || ""}
</p>`
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
  ]

  return (
    <div className="mb-4">
      <EditorProvider
        slotBefore={<TitleMenuBar />}
        extensions={extensions}
        content={content}
        // onUpdate={({ editor }) => {
        //   onChange(editor.getHTML())
        // }}
        editorProps={{
          attributes: {
            class: "pb-2 focus:outline-none w-full prose max-w-none",
          },
        }}
      >
        <div />
      </EditorProvider>
    </div>
  )
}
