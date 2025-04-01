import { Box, Button, Flex } from "@incmix/ui"
import { EditorProvider, useCurrentEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { encodeHTML } from "@utils/strings"
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
    <Flex wrap={"wrap"} gap={"1"} className="mb-2">
      <Button
        variant={editor.isActive("bold") ? "solid" : "soft"}
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("italic") ? "solid" : "soft"}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("heading", { level: 1 }) ? "solid" : "soft"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("heading", { level: 2 }) ? "solid" : "soft"}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("bulletList") ? "solid" : "soft"}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("orderedList") ? "solid" : "soft"}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("codeBlock") ? "solid" : "soft"}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("blockquote") ? "solid" : "soft"}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("undo") ? "solid" : "soft"}
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        variant={editor.isActive("redo") ? "solid" : "soft"}
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </Flex>
  )
}

export function TiptapEditor({ modalData }: TiptapEditorProps) {
  const content = `
    <h2>
  ${modalData?.title ? encodeHTML(modalData.title) : ""}
</h2>
<p>
  ${modalData?.content ? encodeHTML(modalData.content) : ""}
  +</p>`

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
    <Box className="mb-4">
      <EditorProvider
        slotBefore={<TitleMenuBar />}
        extensions={extensions}
        content={content}
        editorProps={{
          attributes: {
            class:
              "pb-2 focus:outline-none w-full prose max-w-none text-gray-12",
          },
        }}
      >
        <div />
      </EditorProvider>
    </Box>
  )
}
