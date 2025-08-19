import type { Meta, StoryObj } from "@storybook/react-vite"
import React, { useState } from "react"
import { Theme, Box, Text, Flex } from "../../src/1base"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  Autoplay,
  type CarouselApi,
} from "../../src/2elements/carousel"

const meta: Meta<typeof Carousel> = {
  title: "2 Elements/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ padding: "40px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
      description: "Carousel orientation",
    },
    opts: {
      control: "object",
      description: "Embla carousel options",
    },
  },
  args: {
    orientation: "horizontal",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Sample content for carousel items
const sampleImages = [
  {
    id: 1,
    title: "Mountain Landscape",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
    description: "Beautiful mountain scenery with clear skies",
  },
  {
    id: 2,
    title: "Ocean Sunset",
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&crop=center",
    description: "Stunning sunset over the ocean waves",
  },
  {
    id: 3,
    title: "Forest Path",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
    description: "Peaceful forest path with dappled sunlight",
  },
  {
    id: 4,
    title: "Desert Dunes",
    src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop&crop=center",
    description: "Vast desert with rolling sand dunes",
  },
  {
    id: 5,
    title: "City Skyline",
    src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop&crop=center",
    description: "Modern city skyline at twilight",
  },
]

// Default story
export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <Carousel>
        <CarouselContent>
          {sampleImages.map((image, index) => (
            <CarouselItem key={image.id}>
              <Box style={{ padding: "8px" }}>
                <Box
                  style={{
                    aspectRatio: "4/3",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "var(--gray-3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box style={{ padding: "12px 4px" }}>
                  <Text size="3" weight="medium">
                    {image.title}
                  </Text>
                  <Text size="2" color="gray">
                    {image.description}
                  </Text>
                </Box>
              </Box>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

// Without navigation buttons
export const WithoutNavigation: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <Carousel>
        <CarouselContent>
          {sampleImages.slice(0, 3).map((image) => (
            <CarouselItem key={image.id}>
              <Box style={{ padding: "8px" }}>
                <Box
                  style={{
                    aspectRatio: "16/9",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "var(--gray-3)",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  ),
}

// Multiple items per view
export const MultipleItems: Story = {
  render: () => (
    <div style={{ maxWidth: "800px" }}>
      <Carousel
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {sampleImages.map((image) => (
            <CarouselItem key={image.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Box style={{ padding: "8px" }}>
                <Box
                  style={{
                    aspectRatio: "1",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "var(--gray-3)",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Box style={{ padding: "8px 0" }}>
                  <Text size="2" weight="medium">
                    {image.title}
                  </Text>
                </Box>
              </Box>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

// Vertical orientation
export const Vertical: Story = {
  render: () => (
    <div style={{ height: "400px", width: "300px" }}>
      <Carousel
        orientation="vertical"
        opts={{
          align: "start",
        }}
      >
        <CarouselContent style={{ height: "400px" }}>
          {sampleImages.slice(0, 4).map((image) => (
            <CarouselItem key={image.id} style={{ paddingTop: "8px", paddingBottom: "8px" }}>
              <Box style={{ padding: "8px" }}>
                <Box
                  style={{
                    height: "120px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "var(--gray-3)",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              </Box>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

// With autoplay
export const WithAutoplay: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          {sampleImages.slice(0, 3).map((image) => (
            <CarouselItem key={image.id}>
              <Box style={{ padding: "8px" }}>
                <Box
                  style={{
                    aspectRatio: "16/9",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "var(--gray-3)",
                    position: "relative",
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Box
                    style={{
                      position: "absolute",
                      bottom: "0",
                      left: "0",
                      right: "0",
                      background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                      padding: "20px 16px 16px",
                    }}
                  >
                    <Text size="3" weight="medium" style={{ color: "white" }}>
                      {image.title}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Text size="2" color="gray" style={{ textAlign: "center", marginTop: "12px", display: "block" }}>
        Auto-advances every 2 seconds
      </Text>
    </div>
  ),
}

// Card-based content
export const CardContent: Story = {
  render: () => (
    <div style={{ maxWidth: "600px" }}>
      <Carousel>
        <CarouselContent>
          {[1, 2, 3, 4, 5].map((index) => (
            <CarouselItem key={index}>
              <Box style={{ padding: "8px" }}>
                <Box
                  style={{
                    padding: "24px",
                    borderRadius: "12px",
                    backgroundColor: "var(--gray-2)",
                    border: "1px solid var(--gray-6)",
                    textAlign: "center",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Text size="6" weight="bold" style={{ marginBottom: "8px" }}>
                    Card {index}
                  </Text>
                  <Text size="3" color="gray" style={{ marginBottom: "16px" }}>
                    This is the content of card number {index}
                  </Text>
                  <button
                    style={{
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "1px solid var(--blue-7)",
                      backgroundColor: "var(--blue-3)",
                      color: "var(--blue-11)",
                      fontSize: "14px",
                      cursor: "pointer",
                    }}
                  >
                    Action {index}
                  </button>
                </Box>
              </Box>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
}

// With API control
export const WithApiControl: Story = {
  render: () => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    React.useEffect(() => {
      if (!api) {
        return
      }

      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])

    return (
      <div style={{ maxWidth: "600px" }}>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {sampleImages.slice(0, 4).map((image, index) => (
              <CarouselItem key={image.id}>
                <Box style={{ padding: "8px" }}>
                  <Box
                    style={{
                      aspectRatio: "16/9",
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundColor: "var(--gray-3)",
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Box>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <Flex justify="center" align="center" gap="4" style={{ marginTop: "16px" }}>
          <Text size="2" color="gray">
            Slide {current} of {count}
          </Text>
          <Flex gap="2">
            <button
              onClick={() => api?.scrollTo(0)}
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                borderRadius: "4px",
                border: "1px solid var(--gray-6)",
                backgroundColor: current === 1 ? "var(--blue-3)" : "transparent",
                cursor: "pointer",
              }}
            >
              First
            </button>
            <button
              onClick={() => api?.scrollTo(count - 1)}
              style={{
                padding: "4px 8px",
                fontSize: "12px",
                borderRadius: "4px",
                border: "1px solid var(--gray-6)",
                backgroundColor: current === count ? "var(--blue-3)" : "transparent",
                cursor: "pointer",
              }}
            >
              Last
            </button>
          </Flex>
        </Flex>
      </div>
    )
  },
}

// Size variations
export const SizeVariations: Story = {
  render: () => (
    <Flex direction="column" gap="6" align="center">
      <div>
        <Text size="4" weight="bold" style={{ marginBottom: "12px", display: "block" }}>
          Small (400px)
        </Text>
        <div style={{ maxWidth: "400px" }}>
          <Carousel>
            <CarouselContent>
              {sampleImages.slice(0, 3).map((image) => (
                <CarouselItem key={image.id}>
                  <Box style={{ padding: "4px" }}>
                    <Box
                      style={{
                        aspectRatio: "16/9",
                        borderRadius: "6px",
                        overflow: "hidden",
                        backgroundColor: "var(--gray-3)",
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Box>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <div>
        <Text size="4" weight="bold" style={{ marginBottom: "12px", display: "block" }}>
          Large (800px)
        </Text>
        <div style={{ maxWidth: "800px" }}>
          <Carousel>
            <CarouselContent>
              {sampleImages.slice(0, 3).map((image) => (
                <CarouselItem key={image.id}>
                  <Box style={{ padding: "8px" }}>
                    <Box
                      style={{
                        aspectRatio: "16/9",
                        borderRadius: "8px",
                        overflow: "hidden",
                        backgroundColor: "var(--gray-3)",
                      }}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </Box>
                  </Box>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </Flex>
  ),
}
