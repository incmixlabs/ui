import type { Meta, StoryObj } from "@storybook/react-vite"
import { Image, Flex, Text, Theme } from "../../src/1base"

const meta: Meta<typeof Image> = {
  title: "1 Base/Image",
  component: Image,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <Story />
      </Theme>
    ),
  ],
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL",
    },
    alt: {
      control: "text",
      description: "Alternative text for the image",
    },
    ratio: {
      control: "number",
      description: "Aspect ratio (width/height)",
    },
    fit: {
      control: "select",
      options: ["contain", "cover", "fill", "none", "scale-down"],
      description: "How the image should fit within its container",
    },
    position: {
      control: "text",
      description: "Object position (e.g., 'center', 'top left', '50% 25%')",
    },
    loading: {
      control: "select",
      options: ["eager", "lazy"],
      description: "Loading behavior",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    alt: "Beautiful landscape",
    fit: "cover",
    position: "center",
    loading: "lazy",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    alt: "Beautiful landscape",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px", height: "300px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

// With aspect ratio
export const WithAspectRatio: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    alt: "Landscape with aspect ratio",
    ratio: 16/9,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

// Square aspect ratio
export const SquareRatio: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    alt: "Square image",
    ratio: 1,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "300px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

// Portrait aspect ratio
export const PortraitRatio: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    alt: "Portrait image",
    ratio: 3/4,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "300px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

// Object fit variations
export const FitCover: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Image with cover fit",
    fit: "cover",
    ratio: 16/9,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export const FitContain: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Image with contain fit",
    fit: "contain",
    ratio: 16/9,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px", backgroundColor: "var(--gray-3)" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export const FitFill: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Image with fill fit",
    fit: "fill",
    ratio: 16/9,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export const FitNone: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
    alt: "Image with none fit",
    fit: "none",
    ratio: 16/9,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px", backgroundColor: "var(--gray-3)" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export const FitScaleDown: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop",
    alt: "Image with scale-down fit",
    fit: "scale-down",
    ratio: 16/9,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px", backgroundColor: "var(--gray-3)" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

// Object position variations
export const PositionCenter: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Centered image",
    fit: "cover",
    position: "center",
    ratio: 16/9,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export const PositionTop: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Top positioned image",
    fit: "cover",
    position: "top",
    ratio: 16/9,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export const PositionBottom: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    alt: "Bottom positioned image",
    fit: "cover",
    position: "bottom",
    ratio: 16/9,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

// Different image types
export const Portrait: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=face",
    alt: "Portrait photo",
    ratio: 3/4,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "300px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export const Landscape: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    alt: "Landscape photo",
    ratio: 3/2,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export const Architecture: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=800&fit=crop",
    alt: "Architecture photo",
    ratio: 4/5,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "320px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

// Loading states
export const EagerLoading: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    alt: "Eagerly loaded image",
    loading: "eager",
    ratio: 4/3,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

export const LazyLoading: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    alt: "Lazily loaded image",
    loading: "lazy",
    ratio: 4/3,
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ width: "400px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
}

// All aspect ratios showcase
export const AspectRatios: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <Text size="4" weight="bold">Common Aspect Ratios</Text>
      <Flex gap="4" wrap="wrap">
        {[
          { ratio: 16/9, name: "16:9 (Widescreen)" },
          { ratio: 4/3, name: "4:3 (Traditional)" },
          { ratio: 3/2, name: "3:2 (Photography)" },
          { ratio: 1, name: "1:1 (Square)" },
          { ratio: 3/4, name: "3:4 (Portrait)" },
          { ratio: 9/16, name: "9:16 (Mobile)" },
        ].map(({ ratio, name }) => (
          <Flex key={name} direction="column" gap="2" style={{ width: "200px" }}>
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
              alt={`${name} example`}
              ratio={ratio}
              fit="cover"
            />
            <Text size="1" align="center" color="gray">
              {name}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
}

// Object fit showcase
export const ObjectFitComparison: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <Text size="4" weight="bold">Object Fit Comparison</Text>
      <Text size="2" color="gray">Same image with different fit values in a 16:9 container</Text>
      <Flex gap="4" wrap="wrap">
        {["cover", "contain", "fill", "none", "scale-down"].map((fit) => (
          <Flex key={fit} direction="column" gap="2" style={{ width: "200px" }}>
            <div style={{ backgroundColor: "var(--gray-3)", borderRadius: "4px" }}>
              <Image
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
                alt={`${fit} example`}
                ratio={16/9}
                fit={fit as any}
              />
            </div>
            <Text size="2" align="center" weight="medium">
              {fit}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  ),
}

// Real-world examples
export const RealWorldExamples: Story = {
  render: () => (
    <Flex direction="column" gap="6" style={{ maxWidth: "600px" }}>
      <div>
        <Text size="4" weight="bold">Product Card</Text>
        <div style={{
          marginTop: "12px",
          border: "1px solid var(--gray-6)",
          borderRadius: "8px",
          overflow: "hidden",
          backgroundColor: "var(--gray-1)"
        }}>
          <Image
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
            alt="Wireless headphones"
            ratio={4/3}
            fit="cover"
          />
          <div style={{ padding: "16px" }}>
            <Text size="3" weight="medium">Premium Wireless Headphones</Text>
            <Text size="2" color="gray" style={{ display: "block", marginTop: "4px" }}>
              High-quality sound with noise cancellation
            </Text>
            <Text size="4" weight="bold" style={{ display: "block", marginTop: "8px" }}>
              $299.99
            </Text>
          </div>
        </div>
      </div>

      <div>
        <Text size="4" weight="bold">Blog Post Header</Text>
        <div style={{
          marginTop: "12px",
          borderRadius: "8px",
          overflow: "hidden",
        }}>
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=300&fit=crop"
            alt="Modern architecture"
            ratio={2/1}
            fit="cover"
          />
          <div style={{ 
            position: "relative",
            padding: "24px",
            marginTop: "-80px",
            background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
            color: "white"
          }}>
            <Text size="5" weight="bold" style={{ color: "white" }}>
              The Future of Architecture
            </Text>
            <Text size="3" style={{ display: "block", marginTop: "8px", color: "white" }}>
              Exploring innovative designs that shape our cities
            </Text>
          </div>
        </div>
      </div>

      <div>
        <Text size="4" weight="bold">Profile Gallery</Text>
        <div style={{
          marginTop: "12px",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "8px",
        }}>
          {[
            "photo-1507003211169-0a1dd7228f2d", // Portrait
            "photo-1506905925346-21bda4d32df4", // Landscape
            "photo-1486406146926-c627a92ad1ab", // Architecture
            "photo-1505740420928-5e560c06d30e", // Product
            "photo-1506905925346-21bda4d32df4", // Nature
            "photo-1507003211169-0a1dd7228f2d", // Portrait
          ].map((photoId, index) => (
            <div
              key={index}
              style={{
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "pointer",
                transition: "transform 0.2s",
              }}
            >
              <Image
                src={`https://images.unsplash.com/${photoId}?w=200&h=200&fit=crop`}
                alt={`Gallery image ${index + 1}`}
                ratio={1}
                fit="cover"
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <Text size="4" weight="bold">Hero Banner</Text>
        <div style={{
          marginTop: "12px",
          borderRadius: "8px",
          overflow: "hidden",
          position: "relative"
        }}>
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop"
            alt="Hero banner background"
            ratio={2/1}
            fit="cover"
          />
          <div style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
            color: "white",
            textAlign: "center"
          }}>
            <div>
              <Text size="6" weight="bold" style={{ color: "white" }}>
                Welcome to Our Platform
              </Text>
              <Text size="3" style={{ display: "block", marginTop: "8px", color: "white" }}>
                Discover amazing experiences with us
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Flex>
  ),
}

// Responsive behavior
export const ResponsiveImages: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <Text size="4" weight="bold">Responsive Image Behavior</Text>
      <Text size="2" color="gray">
        These images adapt to different container sizes while maintaining aspect ratios
      </Text>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
        <div>
          <Text size="2" weight="medium">Small Container (1:1)</Text>
          <div style={{ marginTop: "8px" }}>
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop"
              alt="Small responsive image"
              ratio={1}
              fit="cover"
            />
          </div>
        </div>
        
        <div>
          <Text size="2" weight="medium">Large Container (16:9)</Text>
          <div style={{ marginTop: "8px" }}>
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
              alt="Large responsive image"
              ratio={16/9}
              fit="cover"
            />
          </div>
        </div>
      </div>
    </Flex>
  ),
}