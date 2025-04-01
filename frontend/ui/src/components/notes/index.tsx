import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
  Heading,
  Pushpin,
} from "@incmix/ui"
import { cn } from "@utils"
import {
  CalendarClock,
  Edit2,
  Ellipsis,
  Plus,
  SlidersHorizontal,
  Trash,
  X,
} from "lucide-react"
import { Suspense, lazy, useRef, useState } from "react"
import { Label } from "../label"
import { type INote, notesData } from "./data"

const TiptapEditor = lazy(() =>
  import("./components/tiptap-editor").then((mod) => ({
    default: mod.TiptapEditor,
  }))
)

export function NoteComponent() {
  const [notes, _setNotes] = useState<INote[]>(notesData)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [modalData, setModalData] = useState<INote | null>(null)
  const titleInputRef = useRef<HTMLInputElement>(null)
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null)

  const onClick = (id: string) => {
    const findData = notes.find((note) => note.id === id)
    if (findData) {
      setModalData(findData)
      setIsOpen(!isOpen)
    }
  }

  return (
    <>
      <Box className="p-4">
        <Flex align={"center"} justify={"between"}>
          <Heading size={"7"}>Notes</Heading>
          <Flex gap={"2"}>
            <Button variant="soft" color="gray">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
            <Dialog>
              <DialogTrigger>
                <Button variant="solid">
                  <Plus className="h-5 w-5" /> Add Note
                </Button>
              </DialogTrigger>
              <DialogContent className="border border-gray-4">
                <DialogHeader className="relative">
                  <DialogTitle>Add Note</DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-4">
                  <Box className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      type="text"
                      placeholder="The title of a note"
                      className="w-[80%] "
                      ref={titleInputRef}
                    />
                  </Box>
                  <Box className="space-y-2">
                    <Label>Description</Label>
                    <TextArea
                      placeholder="The description of a note"
                      className="min-h-36"
                      ref={descriptionInputRef}
                    />
                  </Box>
                </DialogDescription>
                <DialogFooter>
                  <DialogClose>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button variant="solid">Add Note</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Flex>
        </Flex>
        <Grid
          className="overflow-hidden py-8"
          columns={{ initial: "1", md: "2", lg: "3", xl: "4" }}
          gap={"5"}
        >
          {notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="p-0">
                <Flex
                  align={"center"}
                  justify={"between"}
                  className="relative px-4 py-4"
                >
                  <Flex align={"center"} className="text-sm">
                    <CalendarClock className="mr-1.5 h-4 w-4" />
                    {note.date}
                  </Flex>
                  <IconButton
                    variant="ghost"
                    color="gray"
                    onClick={() => onClick(note.id)}
                  >
                    <Pushpin
                      className={"h-6 w-6 cursor-pointer stroke-gray-12"}
                    />
                  </IconButton>
                  <svg
                    width="350"
                    height="2"
                    viewBox="0 0 350 2"
                    className="absolute bottom-0 left-0 w-full stroke-gray-7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path d="M0 1H350" stroke-dasharray="5" />
                  </svg>
                </Flex>
                <Box className="px-4 pt-3">
                  <h3 className="mb-2 font-medium text-lg">{note.title}</h3>
                  <p className="text-gray-11 text-sm">{note.content}</p>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Box>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="border border-gray-4">
          <DialogHeader className="relative">
            <DialogTitle>Add New Note</DialogTitle>
            <Flex
              align={"center"}
              className={cn(
                "absolute right-8 space-x-2",
                isEditing ? "-top-5" : "-top-3"
              )}
            >
              {isEditing ? (
                <>
                  <Button
                    variant="soft"
                    color="red"
                    onClick={() => setIsEditing(false)}
                  >
                    Close
                  </Button>
                  <Button>Save</Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    color="gray"
                    className="h-6"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    color="red"
                    className="h-6"
                    onClick={() => setIsEditing(true)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    color="blue"
                    className="h-6"
                    onClick={() => setIsEditing(true)}
                  >
                    <Ellipsis className="h-4 w-4" />
                  </Button>
                </>
              )}
            </Flex>
          </DialogHeader>
          <DialogDescription>
            {isEditing ? (
              <div className="space-y-4 pt-4">
                <Suspense fallback={<div>Loading editor...</div>}>
                  <TiptapEditor modalData={modalData} />
                </Suspense>
              </div>
            ) : (
              <Box className="">
                <h3 className="mb-2 font-medium text-gray-12 text-lg">
                  {modalData?.title}
                </h3>
                <p className="text-gray-11 text-sm">{modalData?.content}</p>
              </Box>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
}
