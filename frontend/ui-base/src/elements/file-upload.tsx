import {
  type Dispatch,
  type SetStateAction,
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"

import { cn } from "@/shadcn/lib/utils"
import { Trash2 as RemoveIcon } from "lucide-react"

import {
  type DropzoneOptions,
  type DropzoneState,
  type FileRejection,
  useDropzone,
} from "react-dropzone"
import { toast } from "@/base"
import { type Direction, type Orientation, direction as directionOptions, orientation as orientationOptions } from "../types"

type FileUploaderContextType = {
  dropzoneState: DropzoneState
  isLOF: boolean
  isFileTooBig: boolean
  removeFileFromSet: (index: number) => void
  activeIndex: number
  setActiveIndex: Dispatch<SetStateAction<number>>
  orientation?: Orientation
  direction?: Direction
}

const FileUploaderContext = createContext<FileUploaderContextType | null>(null)

export const useFileUpload = () => {
  const context = useContext(FileUploaderContext)
  if (!context) {
    throw new Error("useFileUpload must be used within a FileUploaderProvider")
  }
  return context
}

type FileUploaderProps = {
  value: File[] | null
  reSelect?: boolean
  onValueChange: (value: File[] | null) => void
  dropzoneOptions: DropzoneOptions
  orientation?: Orientation
  direction?: Direction
}

/**
 * File upload Docs: {@link: https://localhost:3000/docs/file-upload}
 */

export const FileUploader = forwardRef<
  HTMLDivElement,
  FileUploaderProps & React.HTMLAttributes<HTMLDivElement>
>(
  (
    {
      className,
      dropzoneOptions,
      value,
      onValueChange,
      reSelect,
      orientation = orientationOptions.vertical,
      children,
      direction = directionOptions.ltr,
      ...props
    },
    ref
  ) => {
    const [isFileTooBig, setIsFileTooBig] = useState(false)
    const [isLOF, setIsLOF] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const {
      accept = {
        "image/*": [".jpg", ".jpeg", ".png", ".gif"],
        "video/*": [".mp4", ".MOV", ".AVI"],
      },
      maxFiles = 1,
      maxSize = 4 * 1024 * 1024,
      multiple = true,
    } = dropzoneOptions

    const reSelectAll = maxFiles === 1 ? true : reSelect

    const removeFileFromSet = useCallback(
      (i: number) => {
        if (!value) return
        const newFiles = value.filter((_, index) => index !== i)
        onValueChange(newFiles)
      },
      [value, onValueChange]
    )

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        e.preventDefault()
        e.stopPropagation()

        if (!value) return

        const moveNext = () => {
          const nextIndex = activeIndex + 1
          setActiveIndex(nextIndex > value.length - 1 ? 0 : nextIndex)
        }

        const movePrev = () => {
          const nextIndex = activeIndex - 1
          setActiveIndex(nextIndex < 0 ? value.length - 1 : nextIndex)
        }

        const prevKey =
          orientation === orientationOptions.horizontal
            ? direction === directionOptions.ltr
              ? "ArrowLeft"
              : "ArrowRight"
            : "ArrowUp"

        const nextKey =
          orientation === orientationOptions.horizontal
            ? direction === directionOptions.ltr
              ? "ArrowRight"
              : "ArrowLeft"
            : "ArrowDown"

        if (e.key === nextKey) {
          moveNext()
        } else if (e.key === prevKey) {
          movePrev()
        } else if (e.key === "Enter" || e.key === "Space") {
          if (activeIndex === -1) {
            dropzoneState.inputRef.current?.click()
          }
        } else if (e.key === "Delete" || e.key === "Backspace") {
          if (activeIndex !== -1) {
            removeFileFromSet(activeIndex)
            if (value.length - 1 === 0) {
              setActiveIndex(-1)
              return
            }
            movePrev()
          }
        } else if (e.key === "Escape") {
          setActiveIndex(-1)
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [value, activeIndex, removeFileFromSet]
    )

    const onDrop = useCallback(
      (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const files = acceptedFiles

        if (!files) {
          toast.error("file error , probably too big")
          return
        }

        const newValues: File[] = value ? [...value] : []

        if (reSelectAll) {
          newValues.splice(0, newValues.length)
        }

        files.forEach((file) => {
          if (newValues.length < maxFiles) {
            newValues.push(file)
          }
        })

        onValueChange(newValues)

        if (rejectedFiles.length > 0) {
          for (let i = 0; i < rejectedFiles.length; i++) {
            if (rejectedFiles[i].errors[0]?.code === "file-too-large") {
              toast.error(
                `File is too large. Max size is ${maxSize / 1024 / 1024}MB`
              )
              break
            }
            if (rejectedFiles[i].errors[0]?.message) {
              toast.error(rejectedFiles[i].errors[0].message)
              break
            }
          }
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [reSelectAll, value]
    )

    useEffect(() => {
      if (!value) return
      if (value.length === maxFiles) {
        setIsLOF(true)
        return
      }
      setIsLOF(false)
    }, [value, maxFiles])

    const opts = dropzoneOptions
      ? dropzoneOptions
      : { accept, maxFiles, maxSize, multiple }

    const dropzoneState = useDropzone({
      ...opts,
      onDrop,
      onDropRejected: () => setIsFileTooBig(true),
      onDropAccepted: () => setIsFileTooBig(false),
    })

    return (
      <FileUploaderContext.Provider
        value={{
          dropzoneState,
          isLOF,
          isFileTooBig,
          removeFileFromSet,
          activeIndex,
          setActiveIndex,
          orientation: orientation as Orientation,
          direction: direction as Direction
        }}
      >
        <div
          ref={ref}
          onKeyDownCapture={handleKeyDown}
          className={cn(
            "grid w-full overflow-hidden focus:outline-none ",
            className,
            {
              "gap-2": value && value.length > 0,
            }
          )}
          dir={direction}
          {...props}
        >
          {children}
        </div>
      </FileUploaderContext.Provider>
    )
  }
)

FileUploader.displayName = "FileUploader"

export const FileUploaderContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className, ...props }, ref) => {
  const { orientation } = useFileUpload()
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className={cn("w-full px-1")} ref={containerRef}>
      <div
        {...props}
        ref={ref}
        className={cn(
          " gap-1 rounded-xl",
          orientation === orientationOptions.horizontal ? "grid grid-cols-2" : "flex flex-col",
          className
        )}
      >
        {children}
      </div>
    </div>
  )
})

FileUploaderContent.displayName = "FileUploaderContent"

export const FileUploaderItem = forwardRef<
  HTMLDivElement,
  { index: number } & React.HTMLAttributes<HTMLDivElement>
>(({ className, index, children, ...props }, ref) => {
  const { removeFileFromSet, activeIndex, direction } = useFileUpload()
  const isSelected = index === activeIndex
  return (
    <div
      ref={ref}
      className={cn(
        "relative h-7 w-full cursor-pointer justify-between overflow-hidden rounded-md border p-1 hover:bg-primary-foreground",
        className,
        isSelected ? "bg-muted" : ""
      )}
      {...props}
    >
      <div className="flex h-full w-full items-center gap-1.5 font-medium leading-none tracking-tight">
        {children}
      </div>
      <button
        type="button"
        className={cn(
          "absolute rounded bg-red-10 p-1 text-background",
          direction === directionOptions.rtl ? "top-1 left-1" : "right-1.5 bottom-1.5"
        )}
        onClick={() => removeFileFromSet(index)}
      >
        <span className="sr-only">remove item {index}</span>
        <RemoveIcon className="h-3 w-3 duration-200 ease-in-out hover:stroke-white" />
      </button>
    </div>
  )
})

FileUploaderItem.displayName = "FileUploaderItem"

interface FileInputProps extends React.HTMLAttributes<HTMLDivElement> {
  parentclass?: string
  dropmsg?: string
}
export const FileInput = forwardRef<HTMLDivElement, FileInputProps>(
  ({ className, parentclass, dropmsg, children, ...props }, ref) => {
    const { dropzoneState, isFileTooBig, isLOF } = useFileUpload()
    const rootProps = isLOF ? {} : dropzoneState.getRootProps()

    return (
      <div
        ref={ref}
        {...props}
        className={cn(
          "relative w-full",
          parentclass,
          isLOF ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        )}
      >
        <div
          className={cn(
            "w-full rounded-lg transition-colors duration-300 ease-in-out",
            dropzoneState.isDragAccept && "border-green-500 bg-green-50",
            dropzoneState.isDragReject && "border-red-500 bg-red-50",
            isFileTooBig && "border-red-500 bg-red-200",
            !dropzoneState.isDragActive &&
              "border-gray-300 hover:border-gray-400",
            className
          )}
          {...rootProps}
        >
          {children}
          {dropzoneState.isDragActive && (
            <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-primary-foreground/60 backdrop-blur-sm">
              <p className="font-medium text-primary">{dropmsg}</p>
            </div>
          )}
        </div>
        <input
          ref={dropzoneState.inputRef}
          disabled={isLOF}
          {...dropzoneState.getInputProps()}
          className={cn(isLOF && "cursor-not-allowed")}
        />
      </div>
    )
  }
)
