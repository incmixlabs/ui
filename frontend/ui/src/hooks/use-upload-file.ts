"use client"

import { useCallback, useEffect, useState } from "react"

type UseUploadFileProps = {
  types?: FilePickerAcceptType[]
  opfs?: {
    enabled: boolean
    saveDirectory: string
  }
  autoUpload?: boolean
  multiple?: boolean
  onSuccess?: (files: FileSystemFileHandle[]) => void
  onError?: (error: Error) => void
}

export const useUploadFile = ({
  types,
  autoUpload = true,
  multiple = true,
  opfs = { enabled: true, saveDirectory: "uploadedFiles" },
  onError,
  onSuccess,
}: UseUploadFileProps) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<FileSystemFileHandle[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isDropActive, setIsDropActive] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const validateFiles = useCallback((): boolean => {
    if (!types || types.length === 0) return true

    return selectedFiles.every((file) => {
      return types.some((type) => {
        if (typeof type === "string") {
          return file.type === type
        }
        if (type.accept) {
          return Object.values(type.accept).some((acceptTypes) => {
            const parts = file.name.split(".")
            const extension = parts[parts.length - 1]
            return acceptTypes.includes(`.${extension}`)
          })
        }
        return false
      })
    })
  }, [selectedFiles, types])

  const uploadToOpfs = useCallback(async () => {
    const opfsRoot = await navigator.storage.getDirectory()
    const dir = await opfsRoot.getDirectoryHandle(opfs.saveDirectory, {
      create: true,
    })

    const fileHandles = await Promise.all(
      selectedFiles.map(async (f) => {
        const fileHandle = await dir.getFileHandle(f.name, {
          create: true,
        })

        const writable = await fileHandle.createWritable()
        await writable.write(f)
        await writable.close()

        return fileHandle
      })
    )

    setUploadedFiles(fileHandles)
    if (onSuccess) onSuccess(fileHandles)
  }, [opfs.saveDirectory, selectedFiles, onSuccess])

  useEffect(() => {
    const onDragOver = (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(true)
    }
    const onDragLeave = (e: DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
    }

    document.addEventListener("dragover", onDragOver)
    document.addEventListener("dragleave", onDragLeave)

    return () => {
      document.removeEventListener("dragover", onDragOver)
      document.removeEventListener("dragover", onDragLeave)
    }
  }, [])

  const startUpload = useCallback(() => {
    setError(null)
    if (!validateFiles()) {
      const error = new Error("Invalid file type")
      setError(error)
      if (onError) onError(error)
      setSelectedFiles([])
      return
    }

    if (opfs.enabled) uploadToOpfs()

    setSelectedFiles([])
  }, [validateFiles, opfs.enabled, uploadToOpfs, onError])

  useEffect(() => {
    if (!autoUpload) return
    if (!selectedFiles.length) return
    startUpload()
  }, [
    autoUpload,
    startUpload,
    selectedFiles.length,
    // onError,
  ])

  const onDrop = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault()
    setError(null)
    setIsDragging(false)
    setIsDropActive(false)

    const files: File[] = []
    if (ev.dataTransfer.items) {
      const itemArray = Array.from(ev.dataTransfer.items)
      itemArray.forEach((item) => {
        if (item.kind === "file") {
          const file = item.getAsFile()
          if (file) files.push(file)
        }
      })
    } else {
      files.push(...Array.from(ev.dataTransfer.files))
    }

    if (!multiple && files.length > 1) {
      const error = new Error("Multiple files not allowed")
      setError(error)
      if (onError) onError(error)
    }

    setSelectedFiles(files)
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDropActive(false)
  }
  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDropActive(true)
  }

  const openFilePicker = async () => {
    const fileHandles = await window.showOpenFilePicker({
      excludeAcceptAllOption: types && types.length > 0,
      types,
      multiple,
    })
    const files = await Promise.all(fileHandles.map((f) => f.getFile()))
    setSelectedFiles(files)

    return files
  }

  return {
    uploadedFiles,
    startUpload,
    error,
    openFilePicker,
    isDragging,
    isDropActive,
    dropzoneProps: { onDrop, onDragLeave, onDragOver },
  }
}
