import { useRef, useState } from "react"
import { Trash as TrashIcon, Pencil as PencilIcon } from "lucide-react"

import { Avatar, Box, Button, Flex, type AvatarProps } from "@/base"
import { cn } from "@/shadcn/lib/utils"

type AvatarEditableProps = AvatarProps & {
  deletable?: boolean
  onImageChange?: (file: File) => Promise<void>
  onImageDelete?: () => Promise<void>
  isDeletingImage?: boolean
}

export const AvatarEditable: React.FC<AvatarEditableProps> = ({
  size = "3",
  src,
  name,
  deletable = true,
  onImageChange,
  onImageDelete,
  isDeletingImage = false,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && onImageChange) {
      await onImageChange(file)
    }
  }

  return (
    <Box position="relative" className="rounded-app">
      <Avatar size={size} src={src} name={name} className={cn("",className)} />
      <Flex
        position="absolute"
        inset="0"
        align="center"
        justify="center"
        className="rounded-app"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Flex
          align="center"
          justify="center"
          className={`h-full w-full cursor-pointer rounded-app bg-black/50 transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <PencilIcon color="white" size={24} />
        </Flex>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </Flex>
      {deletable && src && (
        <Button
          onClick={onImageDelete}
          variant="ghost"
          color="red"
          disabled={isDeletingImage}
          className="absolute top-0 right-0 rounded-app bg-red-3 p-1"
        >
          <TrashIcon width="16" height="16" />
        </Button>
      )}
    </Box>
  )
}
