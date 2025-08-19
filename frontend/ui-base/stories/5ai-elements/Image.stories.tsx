import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Image } from "../../src/3b-ai-elements/image"
import { Theme } from "../../src/1base"

const meta: Meta<typeof Image> = {
  title: "5 AI Elements/Image",
  component: Image,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ minWidth: "400px", maxWidth: "600px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    alt: {
      control: "text",
      description: "Alternative text for the image",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample base64 image data (1x1 pixel images for demonstration)
const sampleImagePNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChAI9jU77yQAAAABJRU5ErkJggg=="
const sampleImageJPEG = "/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwA/8A"

export const PNGImage: Story = {
  args: {
    base64: sampleImagePNG,
    mediaType: "image/png",
    alt: "Sample PNG image",
  },
}

export const JPEGImage: Story = {
  args: {
    base64: sampleImageJPEG,
    mediaType: "image/jpeg",
    alt: "Sample JPEG image",
  },
}

export const GeneratedChart: Story = {
  render: () => {
    // SVG chart as base64 for demonstration
    const chartSVG = `<svg width="400" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#f8f9fa"/>
      <text x="200" y="30" text-anchor="middle" font-family="Arial" font-size="16" font-weight="bold">Sales Performance</text>
      <rect x="50" y="50" width="40" height="100" fill="#3b82f6"/>
      <rect x="110" y="70" width="40" height="80" fill="#10b981"/>
      <rect x="170" y="40" width="40" height="110" fill="#f59e0b"/>
      <rect x="230" y="60" width="40" height="90" fill="#ef4444"/>
      <rect x="290" y="35" width="40" height="115" fill="#8b5cf6"/>
      <text x="70" y="170" text-anchor="middle" font-size="12">Q1</text>
      <text x="130" y="170" text-anchor="middle" font-size="12">Q2</text>
      <text x="190" y="170" text-anchor="middle" font-size="12">Q3</text>
      <text x="250" y="170" text-anchor="middle" font-size="12">Q4</text>
      <text x="310" y="170" text-anchor="middle" font-size="12">Q5</text>
    </svg>`

    const chartBase64 = btoa(chartSVG)

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Generated Chart</h3>
        <Image
          base64={chartBase64}
          mediaType="image/svg+xml"
          alt="Sales performance chart showing quarterly data"
          className="border"
        />
        <p className="text-sm text-muted-foreground">
          This chart was generated based on your sales data from the last 5 quarters.
        </p>
      </div>
    )
  },
}

export const MultipleImages: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <h4 className="font-semibold">Profile Picture</h4>
        <Image
          base64={sampleImagePNG}
          mediaType="image/png"
          alt="Generated profile picture"
          className="w-24 h-24 rounded-full border-2 border-border"
        />
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">Thumbnail</h4>
        <Image
          base64={sampleImageJPEG}
          mediaType="image/jpeg"
          alt="Generated thumbnail"
          className="w-32 h-20 object-cover rounded-md"
        />
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold">Banner Image</h4>
        <Image
          base64={sampleImagePNG}
          mediaType="image/png"
          alt="Generated banner"
          className="w-full h-24 object-cover rounded-lg"
        />
      </div>
    </div>
  ),
}

export const InResponseContext: Story = {
  render: () => (
    <div className="space-y-4 p-4 bg-secondary rounded-lg">
      <p className="text-sm">
        I've generated a visualization of your data analysis results:
      </p>

      <Image
        base64={sampleImagePNG}
        mediaType="image/png"
        alt="Data analysis visualization showing trends over time"
        className="border"
      />

      <p className="text-sm text-muted-foreground">
        The chart shows a clear upward trend in user engagement over the past quarter.
        The peak in week 8 corresponds to the product launch event.
      </p>
    </div>
  ),
}
