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
import { useState } from "react"
import { TiptapEditor } from "./components/tiptap-editor"
import { type INote, notesData } from "./data"

export function NoteComponent() {
  const [notes, _setNotes] = useState<INote[]>(notesData)
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, _setIsEditing] = useState(false)
  const [modalData, setModalData] = useState<INote | null>(null)

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
            <Button onClick={() => setIsOpen(true)} variant="soft" color="gray">
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
            <Button onClick={() => setIsOpen(true)}>
              <Plus className="h-5 w-5" /> Add Note
            </Button>
          </Flex>
        </Flex>
        <div className="grid grid-cols-1 gap-6 overflow-hidden py-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 2xl:gap-10">
          {notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="p-0">
                <Flex
                  align={"center"}
                  justify={"between"}
                  className="relative px-4 py-4"
                >
                  <div className="flex items-center text-sm">
                    <CalendarClock className="mr-1.5 h-4 w-4" />
                    {note.date}
                  </div>
                  <div onClick={() => onClick(note.id)}>
                    <Pushpin
                      className={"h-6 w-6 cursor-pointer stroke-gray-12"}
                    />
                  </div>
                  <svg
                    width="350"
                    height="2"
                    viewBox="0 0 350 2"
                    className="absolute bottom-0 left-0 w-full stroke-gray-7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
        </div>
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
                    onClick={() => _setIsEditing(false)}
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
                    onClick={() => _setIsEditing(true)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    color="red"
                    className="h-6"
                    onClick={() => _setIsEditing(true)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    color="blue"
                    className="h-6"
                    onClick={() => _setIsEditing(true)}
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
                <TiptapEditor modalData={modalData} />
              </div>
            ) : (
              <Box className="">
                <h3 className="mb-2 font-medium text-black text-lg">
                  {modalData?.title}
                </h3>
                <p className="text-gray-10 text-sm">{modalData?.content}</p>
              </Box>
            )}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
}
