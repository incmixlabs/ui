import type { Meta, StoryObj } from "@storybook/react-vite"
import "../../src/styles/index.css"
import React, { useState } from "react"
import { Theme, Box, Text, Flex, Button } from "../../src/1base"
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "../../src/2elements/file-upload"

const meta: Meta<typeof FileUploader> = {
  title: "2 Elements/FileUpload",
  component: FileUploader,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ padding: "20px", maxWidth: "600px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Layout orientation",
    },
    direction: {
      control: "select",
      options: ["ltr", "rtl"],
      description: "Text direction",
    },
    reSelect: {
      control: "boolean",
      description: "Whether to allow reselecting files",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Basic file upload example
export const Default: Story = {
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null)

    return (
      <FileUploader
        value={files}
        onValueChange={setFiles}
        dropzoneOptions={{
          accept: {
            "image/*": [".jpg", ".jpeg", ".png", ".gif"],
          },
          maxFiles: 5,
          maxSize: 4 * 1024 * 1024, // 4MB
        }}
        className="w-full"
      >
        <FileInput className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <div className="space-y-2">
            <div className="text-2xl">📁</div>
            <div>
              <Text size="3" weight="medium">
                Drop files here or click to browse
              </Text>
              <Text size="2" color="gray">
                Supports: JPG, PNG, GIF up to 4MB
              </Text>
            </div>
          </div>
        </FileInput>

        {files && files.length > 0 && (
          <FileUploaderContent className="mt-4">
            {files.map((file, index) => (
              <FileUploaderItem key={index} index={index} className="bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="text-lg">📄</div>
                  <div className="flex-1 min-w-0">
                    <Text size="2" weight="medium" className="truncate">
                      {file.name}
                    </Text>
                    <Text size="1" color="gray">
                      {(file.size / 1024).toFixed(1)} KB
                    </Text>
                  </div>
                </div>
              </FileUploaderItem>
            ))}
          </FileUploaderContent>
        )}
      </FileUploader>
    )
  },
}

// Single file upload
export const SingleFile: Story = {
  render: () => {
    const [file, setFile] = useState<File[] | null>(null)

    return (
      <FileUploader
        value={file}
        onValueChange={setFile}
        dropzoneOptions={{
          accept: {
            "application/pdf": [".pdf"],
            "application/msword": [".doc"],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
          },
          maxFiles: 1,
          maxSize: 10 * 1024 * 1024, // 10MB
        }}
        className="w-full"
      >
        <FileInput className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center bg-blue-50 hover:bg-blue-100 transition-colors">
          <div className="space-y-2">
            <div className="text-3xl">📎</div>
            <div>
              <Text size="3" weight="medium">
                Upload Document
              </Text>
              <Text size="2" color="gray">
                PDF, DOC, DOCX up to 10MB
              </Text>
            </div>
          </div>
        </FileInput>

        {file && file.length > 0 && (
          <FileUploaderContent className="mt-4">
            <FileUploaderItem index={0} className="bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center gap-2">
                <div className="text-lg">📄</div>
                <div className="flex-1">
                  <Text size="2" weight="medium">
                    {file[0].name}
                  </Text>
                  <Text size="1" color="gray">
                    {(file[0].size / 1024 / 1024).toFixed(2)} MB
                  </Text>
                </div>
              </div>
            </FileUploaderItem>
          </FileUploaderContent>
        )}
      </FileUploader>
    )
  },
}

// Image upload with preview
export const ImageUpload: Story = {
  render: () => {
    const [images, setImages] = useState<File[] | null>(null)

    return (
      <FileUploader
        value={images}
        onValueChange={setImages}
        dropzoneOptions={{
          accept: {
            "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"],
          },
          maxFiles: 3,
          maxSize: 5 * 1024 * 1024, // 5MB
        }}
        className="w-full"
      >
        <FileInput className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center bg-green-50 hover:bg-green-100 transition-colors">
          <div className="space-y-2">
            <div className="text-4xl">🖼️</div>
            <div>
              <Text size="3" weight="medium">
                Upload Images
              </Text>
              <Text size="2" color="gray">
                Up to 3 images, 5MB each
              </Text>
            </div>
          </div>
        </FileInput>

        {images && images.length > 0 && (
          <FileUploaderContent className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image, index) => (
                <FileUploaderItem key={index} index={index} className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <Text size="1" className="text-white truncate">
                      {image.name}
                    </Text>
                  </div>
                </FileUploaderItem>
              ))}
            </div>
          </FileUploaderContent>
        )}
      </FileUploader>
    )
  },
}

// Horizontal orientation
export const HorizontalOrientation: Story = {
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null)

    return (
      <FileUploader
        value={files}
        onValueChange={setFiles}
        orientation="horizontal"
        dropzoneOptions={{
          accept: {
            "image/*": [".jpg", ".jpeg", ".png"],
            "text/*": [".txt", ".md"],
          },
          maxFiles: 4,
          maxSize: 2 * 1024 * 1024, // 2MB
        }}
        className="w-full"
      >
        <FileInput className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center bg-purple-50">
          <div>
            <Text size="3" weight="medium">
              Drop files here
            </Text>
            <Text size="2" color="gray">
              Images and text files
            </Text>
          </div>
        </FileInput>

        {files && files.length > 0 && (
          <FileUploaderContent className="mt-4">
            {files.map((file, index) => (
              <FileUploaderItem key={index} index={index} className="bg-purple-50 border border-purple-200 rounded-md p-3">
                <div className="text-center">
                  <div className="text-lg mb-1">
                    {file.type.startsWith('image/') ? '🖼️' : '📝'}
                  </div>
                  <Text size="2" weight="medium" className="block truncate">
                    {file.name}
                  </Text>
                  <Text size="1" color="gray">
                    {(file.size / 1024).toFixed(1)} KB
                  </Text>
                </div>
              </FileUploaderItem>
            ))}
          </FileUploaderContent>
        )}
      </FileUploader>
    )
  },
}

// RTL Direction
export const RTLDirection: Story = {
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null)

    return (
      <FileUploader
        value={files}
        onValueChange={setFiles}
        direction="rtl"
        dropzoneOptions={{
          accept: {
            "*": [], // Accept any file type
          },
          maxFiles: 3,
          maxSize: 1 * 1024 * 1024, // 1MB
        }}
        className="w-full"
      >
        <FileInput className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center bg-orange-50">
          <div>
            <Text size="3" weight="medium">
              ارفع الملفات هنا
            </Text>
            <Text size="2" color="gray">
              RTL Layout Example
            </Text>
          </div>
        </FileInput>

        {files && files.length > 0 && (
          <FileUploaderContent className="mt-4">
            {files.map((file, index) => (
              <FileUploaderItem key={index} index={index} className="bg-orange-50 border border-orange-200 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="text-lg">📁</div>
                  <div>
                    <Text size="2" weight="medium">
                      {file.name}
                    </Text>
                    <Text size="1" color="gray">
                      {(file.size / 1024).toFixed(1)} KB
                    </Text>
                  </div>
                </div>
              </FileUploaderItem>
            ))}
          </FileUploaderContent>
        )}
      </FileUploader>
    )
  },
}

// Custom drop message
export const CustomDropMessage: Story = {
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null)

    return (
      <FileUploader
        value={files}
        onValueChange={setFiles}
        dropzoneOptions={{
          accept: {
            "video/*": [".mp4", ".avi", ".mov", ".mkv"],
          },
          maxFiles: 2,
          maxSize: 50 * 1024 * 1024, // 50MB
        }}
        className="w-full"
      >
        <FileInput
          dropmsg="🎬 Drop your videos here!"
          className="border-2 border-dashed border-red-300 rounded-lg p-8 text-center bg-red-50 hover:border-red-400 transition-colors"
        >
          <div className="space-y-2">
            <div className="text-4xl">🎥</div>
            <div>
              <Text size="3" weight="medium">
                Upload Video Files
              </Text>
              <Text size="2" color="gray">
                MP4, AVI, MOV, MKV up to 50MB
              </Text>
            </div>
          </div>
        </FileInput>

        {files && files.length > 0 && (
          <FileUploaderContent className="mt-4">
            {files.map((file, index) => (
              <FileUploaderItem key={index} index={index} className="bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="text-lg">🎬</div>
                  <div>
                    <Text size="2" weight="medium">
                      {file.name}
                    </Text>
                    <Text size="1" color="gray">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Text>
                  </div>
                </div>
              </FileUploaderItem>
            ))}
          </FileUploaderContent>
        )}
      </FileUploader>
    )
  },
}

// With re-select disabled
export const NoReSelect: Story = {
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null)

    return (
      <Flex direction="column" gap="4">
        <div>
          <Text size="3" weight="medium">
            File Upload (No Re-select)
          </Text>
          <Text size="2" color="gray">
            Once files are selected, you cannot add more without removing existing ones
          </Text>
        </div>

        <FileUploader
          value={files}
          onValueChange={setFiles}
          reSelect={false}
          dropzoneOptions={{
            accept: {
              "*": [],
            },
            maxFiles: 2,
            maxSize: 5 * 1024 * 1024, // 5MB
          }}
          className="w-full"
        >
          <FileInput className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div>
              <Text size="3" weight="medium">
                Select Files
              </Text>
              <Text size="2" color="gray">
                Maximum 2 files
              </Text>
            </div>
          </FileInput>

          {files && files.length > 0 && (
            <FileUploaderContent className="mt-4">
              {files.map((file, index) => (
                <FileUploaderItem key={index} index={index} className="bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="text-lg">📄</div>
                    <div>
                      <Text size="2" weight="medium">
                        {file.name}
                      </Text>
                      <Text size="1" color="gray">
                        {(file.size / 1024).toFixed(1)} KB
                      </Text>
                    </div>
                  </div>
                </FileUploaderItem>
              ))}
            </FileUploaderContent>
          )}
        </FileUploader>

        {files && files.length > 0 && (
          <Button onClick={() => setFiles(null)} variant="outline">
            Clear All Files
          </Button>
        )}
      </Flex>
    )
  },
}

// Complex example with validation
export const ComplexExample: Story = {
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null)
    const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({})

    const handleUpload = async () => {
      if (!files?.length) return

      const newStatus: Record<string, string> = {}

      try {
        for (const file of files) {
          newStatus[file.name] = 'uploading'
          setUploadStatus({ ...newStatus })

          // Simulate upload
          await new Promise(resolve => setTimeout(resolve, 2000))
          newStatus[file.name] = 'completed'
        }
      } catch (error) {
        // Mark failed uploads
        for (const file of files) {
          if (newStatus[file.name] === 'uploading') {
            newStatus[file.name] = 'failed'
          }
        }
      }

      setUploadStatus(newStatus)
    }

    return (
      <Flex direction="column" gap="4">
        <div>
          <Text size="4" weight="bold">
            Document Upload Portal
          </Text>
          <Text size="2" color="gray">
            Upload your documents for processing
          </Text>
        </div>

        <FileUploader
          value={files}
          onValueChange={setFiles}
          dropzoneOptions={{
            accept: {
              "application/pdf": [".pdf"],
              "image/*": [".jpg", ".jpeg", ".png"],
              "application/msword": [".doc", ".docx"],
            },
            maxFiles: 5,
            maxSize: 10 * 1024 * 1024, // 10MB
          }}
          className="w-full"
        >
          <FileInput className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all">
            <div className="space-y-3">
              <div className="text-5xl">📋</div>
              <div>
                <Text size="4" weight="medium">
                  Drop documents here
                </Text>
                <Text size="2" color="gray">
                  PDF, Images, Word docs • Up to 5 files • 10MB max each
                </Text>
              </div>
            </div>
          </FileInput>

          {files && files.length > 0 && (
            <FileUploaderContent className="mt-6">
              {files.map((file, index) => (
                <FileUploaderItem key={index} index={index} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl">
                        {file.type.includes('pdf') ? '📕' :
                         file.type.includes('image') ? '🖼️' :
                         file.type.includes('word') ? '📘' : '📄'}
                      </div>
                      <div>
                        <Text size="2" weight="medium">
                          {file.name}
                        </Text>
                        <Text size="1" color="gray">
                          {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                        </Text>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {uploadStatus[file.name] === 'uploading' && (
                        <div className="text-yellow-600">⏳</div>
                      )}
                      {uploadStatus[file.name] === 'completed' && (
                        <div className="text-green-600">✅</div>
                      )}
                    </div>
                  </div>
                </FileUploaderItem>
              ))}
            </FileUploaderContent>
          )}
        </FileUploader>

        {files && files.length > 0 && (
          <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <Text size="2" color="gray">
              {files.length} file{files.length !== 1 ? 's' : ''} ready to upload
            </Text>
            <div className="gap-2">
              <Button onClick={() => setFiles(null)} variant="outline">
                Clear All
              </Button>
              <Button onClick={handleUpload} disabled={Object.values(uploadStatus).some(status => status === 'uploading')}>
                {Object.values(uploadStatus).some(status => status === 'uploading') ? 'Uploading...' : 'Upload Files'}
              </Button>
            </div>
          </div>
        )}
      </Flex>
    )
  },
}
