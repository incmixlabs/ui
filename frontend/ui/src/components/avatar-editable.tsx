"use client";
import { Pencil1Icon, TrashIcon } from "@radix-ui/react-icons"
import { Box, Flex } from "@radix-ui/themes"
import { useRef, useState } from "react"
import { Avatar } from "./avatar"
import { Button } from "./button"

type AvatarEditableProps = {
  size?: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  imageUrl?: string | null
  fullName?: string
  deletable?: boolean
  onImageChange?: (file: File) => Promise<void>
  onImageDelete?: () => Promise<void>
  isDeletingImage?: boolean
}

export const AvatarEditable: React.FC<AvatarEditableProps> = ({
  size = "3",
  imageUrl,
  fullName,
  deletable = true,
  onImageChange,
  onImageDelete,
  isDeletingImage = false,
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
    <Box position="relative" className="rounded-full">
      <Avatar size={size} imageUrl={imageUrl} fullName={fullName} />
      <Flex
        position="absolute"
        inset="0"
        align="center"
        justify="center"
        className="rounded-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Flex
          align="center"
          justify="center"
          className={`h-full w-full cursor-pointer rounded-full bg-black/50 transition-opacity ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => fileInputRef.current?.click()}
        >
          <Pencil1Icon color="white" width="33%" height="33%" />
        </Flex>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </Flex>
      {deletable && imageUrl && (
        <Button
          onClick={onImageDelete}
          variant="ghost"
          color="red"
          disabled={isDeletingImage}
          className="absolute top-0 right-0 rounded-full bg-red-3 p-1"
        >
          <TrashIcon width="16" height="16" />
        </Button>
      )}
    </Box>
  )
}
