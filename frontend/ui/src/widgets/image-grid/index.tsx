"use client"
import {
  GridLayoutCard,
  LayoutGrid,
  type LayoutGridCard,
} from "@components/layout-grid"
import { toast } from "@components/toaster"
import { useUploadFile } from "@hooks/use-upload-file"
import { TrashIcon, UploadIcon } from "@radix-ui/react-icons"
import { Box, Button, Card, Flex, Text } from "@radix-ui/themes"
import { cn } from "@utils"
import { useCallback, useEffect, useState } from "react"

type FileItem = { card: LayoutGridCard; handle: FileSystemFileHandle }

const getDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })

export function ImageGrid() {
  const { isDragging, isDropActive, openFilePicker, dropzoneProps } =
    useUploadFile({
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
        toast.error(error.message)
      },
    })

  const [files, setFiles] = useState<FileItem[]>([])

  const getLocalImages = useCallback(async () => {
    const root = await navigator.storage.getDirectory()
    const dir = await root.getDirectoryHandle("images")
    const items = dir.values()
    const localFiles: FileItem[] = []
    let id = 1
    for await (const item of items) {
      if (item instanceof FileSystemFileHandle) {
        const file = await item.getFile()

        if (file.type.includes("image")) {
          localFiles.push({
            card: {
              id,
              content: <GridLayoutCard />,
              className: "md:col-span-2",
              thumbnail: await getDataUrl(file),
            },
            handle: item,
          })

          id++
        }
      }
    }
    return localFiles
  }, [])

  useEffect(() => {
    getLocalImages().then(setFiles)
  }, [getLocalImages])

  const deleteAll = () => {
    const shouldDelete = confirm("Are you sure you want to delete all files?")
    if (shouldDelete) {
      for (const file of files) {
        // @ts-expect-error Experimental API
        file.handle.remove()
      }
      setFiles([])
    }
  }

  return (
    <Card className="min-w-[48rem] max-w-7xl space-y-10">
      <Flex gap="4" align="center" justify="end">
        <Button color="red" onClick={deleteAll}>
          <TrashIcon />
          Delete All
        </Button>
        <Button variant="outline" onClick={openFilePicker}>
          <UploadIcon />
          Upload
        </Button>
      </Flex>
      <Box
        className={cn(
          "mt-6 h-[600px] rounded-sm p-4",
          isDropActive
            ? "outline outline-primary"
            : isDragging
              ? "outline-dashed outline-muted"
              : "outline-hidden"
        )}
        {...dropzoneProps}
      >
        {files.length ? (
          <LayoutGrid cards={files.map(({ card }) => card)} />
        ) : (
          <Text
            weight="medium"
            className="block pt-40 text-muted-foreground text-xl"
            align="center"
          >
            No Files Found. Drag and drop to upload
          </Text>
        )}
      </Box>
    </Card>
  )
}
