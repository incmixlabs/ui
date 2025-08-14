import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Avatar, Box, Button, Flex, Grid, Text, Theme } from "../../src/base" // Adjust the import path as necessary

const meta: Meta<typeof Grid> = {
  title:"1 Base/Grid",
  component: Grid,
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
    as: {
      control: "select",
      options: ["div", "span"],
      description: "HTML element to render",
    },
    display: {
      control: "select",
      options: ["none", "inline-grid", "grid"],
      description: "CSS display property",
    },
    columns: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "Number of columns or custom grid-template-columns",
    },
    rows: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "Number of rows or custom grid-template-rows",
    },
    flow: {
      control: "select",
      options: ["row", "column", "dense", "row-dense", "column-dense"],
      description: "Grid auto flow direction",
    },
    align: {
      control: "select",
      options: ["start", "center", "end", "baseline", "stretch"],
      description: "Align items (vertical)",
    },
    justify: {
      control: "select",
      options: ["start", "center", "end", "between"],
      description: "Justify content (horizontal)",
    },
    gap: {
      control: "select",
      options: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      description: "Gap between grid items",
    },
    areas: {
      control: "text",
      description: "Grid template areas",
    },
  },
  args: {
    as: "div",
    display: "grid",
    columns: "3",
    gap: "2",
  },
}

export default meta
type Story = StoryObj<typeof meta>

// Helper component for grid items
const GridItem = ({ children, style, ...props }: any) => (
  <Box
    style={{
      padding: "12px",
      backgroundColor: "var(--blue-3)",
      borderRadius: "6px",
      textAlign: "center",
      minHeight: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      ...style,
    }}
    {...props}
  >
    <Text size="2">{children}</Text>
  </Box>
)

// Default story
export const Default: Story = {
  render: (args) => (
    <Grid {...args}>
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
      <GridItem>6</GridItem>
    </Grid>
  ),
}

// Column variations
export const Columns1: Story = {
  render: () => (
    <Grid columns="1" gap="2">
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
    </Grid>
  ),
}

export const Columns2: Story = {
  render: () => (
    <Grid columns="2" gap="2">
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
    </Grid>
  ),
}

export const Columns3: Story = {
  render: () => (
    <Grid columns="3" gap="2">
      <GridItem>Item 1</GridItem>
      <GridItem>Item 2</GridItem>
      <GridItem>Item 3</GridItem>
      <GridItem>Item 4</GridItem>
      <GridItem>Item 5</GridItem>
      <GridItem>Item 6</GridItem>
    </Grid>
  ),
}

export const Columns4: Story = {
  render: () => (
    <Grid columns="4" gap="2">
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
      <GridItem>6</GridItem>
      <GridItem>7</GridItem>
      <GridItem>8</GridItem>
    </Grid>
  ),
}

// Rows variations
export const Rows2: Story = {
  render: () => (
    <Grid columns="3" rows="2" gap="2">
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
      <GridItem>6</GridItem>
    </Grid>
  ),
}

// Gap variations
export const GapSizes: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <div>
        <Text size="2" weight="medium" color="gray">
          Gap 1:
        </Text>
        <Grid columns="3" gap="1" style={{ marginTop: "8px" }}>
          <GridItem>A</GridItem>
          <GridItem>B</GridItem>
          <GridItem>C</GridItem>
        </Grid>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Gap 3:
        </Text>
        <Grid columns="3" gap="3" style={{ marginTop: "8px" }}>
          <GridItem>A</GridItem>
          <GridItem>B</GridItem>
          <GridItem>C</GridItem>
        </Grid>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Gap 6:
        </Text>
        <Grid columns="3" gap="6" style={{ marginTop: "8px" }}>
          <GridItem>A</GridItem>
          <GridItem>B</GridItem>
          <GridItem>C</GridItem>
        </Grid>
      </div>
    </Flex>
  ),
}

// Flow variations
export const FlowRow: Story = {
  render: () => (
    <Grid columns="2" rows="2" flow="row" gap="2">
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
    </Grid>
  ),
}

export const FlowColumn: Story = {
  render: () => (
    <Grid columns="2" rows="2" flow="column" gap="2">
      <GridItem>1</GridItem>
      <GridItem>2</GridItem>
      <GridItem>3</GridItem>
      <GridItem>4</GridItem>
      <GridItem>5</GridItem>
    </Grid>
  ),
}

// Alignment examples
export const AlignCenter: Story = {
  render: () => (
    <Grid
      columns="3"
      gap="2"
      align="center"
      style={{
        height: "200px",
        backgroundColor: "var(--gray-2)",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      <GridItem style={{ height: "40px" }}>Small</GridItem>
      <GridItem style={{ height: "80px" }}>Large</GridItem>
      <GridItem style={{ height: "60px" }}>Medium</GridItem>
    </Grid>
  ),
}

export const JustifyCenter: Story = {
  render: () => (
    <Grid
      columns="3"
      gap="2"
      justify="center"
      style={{
        width: "400px",
        backgroundColor: "var(--gray-2)",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      <GridItem style={{ width: "60px" }}>1</GridItem>
      <GridItem style={{ width: "60px" }}>2</GridItem>
      <GridItem style={{ width: "60px" }}>3</GridItem>
    </Grid>
  ),
}

// Grid areas example
export const GridAreas: Story = {
  render: () => (
    <Grid
      areas='"header header header" "sidebar content content" "footer footer footer"'
      columns="200px 1fr 1fr"
      rows="60px 1fr 60px"
      gap="2"
      style={{ height: "300px", width: "400px" }}
    >
      <Box
        style={{
          gridArea: "header",
          backgroundColor: "var(--blue-3)",
          padding: "12px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text size="2" weight="medium">
          Header
        </Text>
      </Box>
      <Box
        style={{
          gridArea: "sidebar",
          backgroundColor: "var(--green-3)",
          padding: "12px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text size="2" weight="medium">
          Sidebar
        </Text>
      </Box>
      <Box
        style={{
          gridArea: "content",
          backgroundColor: "var(--purple-3)",
          padding: "12px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text size="2" weight="medium">
          Content
        </Text>
      </Box>
      <Box
        style={{
          gridArea: "footer",
          backgroundColor: "var(--orange-3)",
          padding: "12px",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text size="2" weight="medium">
          Footer
        </Text>
      </Box>
    </Grid>
  ),
}

// Responsive grid (conceptual)
export const ResponsiveGrid: Story = {
  render: () => (
    <Flex direction="column" gap="4">
      <Text size="4" weight="bold">
        Responsive Grid Layouts
      </Text>
      <Text size="2" color="gray">
        These demonstrate different grid layouts for different screen sizes
      </Text>

      <div>
        <Text size="3" weight="medium" style={{ marginBottom: "12px" }}>
          Mobile (1 column):
        </Text>
        <Grid columns="1" gap="2" style={{ width: "200px" }}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </div>

      <div>
        <Text size="3" weight="medium" style={{ marginBottom: "12px" }}>
          Tablet (2 columns):
        </Text>
        <Grid columns="2" gap="2" style={{ width: "300px" }}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </div>

      <div>
        <Text size="3" weight="medium" style={{ marginBottom: "12px" }}>
          Desktop (4 columns):
        </Text>
        <Grid columns="4" gap="2" style={{ width: "500px" }}>
          <GridItem>Item 1</GridItem>
          <GridItem>Item 2</GridItem>
          <GridItem>Item 3</GridItem>
          <GridItem>Item 4</GridItem>
        </Grid>
      </div>
    </Flex>
  ),
}

// Real-world examples
export const ImageGallery: Story = {
  render: () => (
    <Grid columns="3" gap="3" style={{ width: "400px" }}>
      {Array.from({ length: 9 }, (_, i) => (
        <Box
          key={i}
          style={{
            aspectRatio: "1",
            backgroundColor: "var(--gray-4)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text size="2" color="gray">
            Image {i + 1}
          </Text>
        </Box>
      ))}
    </Grid>
  ),
}

export const ProductGrid: Story = {
  render: () => (
    <Grid columns="2" gap="4" style={{ width: "500px" }}>
      {[
        { name: "Product A", price: "$99" },
        { name: "Product B", price: "$149" },
        { name: "Product C", price: "$199" },
        { name: "Product D", price: "$249" },
      ].map((product, index) => (
        <Card key={index} size="3">
          <Flex direction="column" gap="3">
            <Box
              style={{
                height: "120px",
                backgroundColor: "var(--gray-3)",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text size="2" color="gray">
                Image
              </Text>
            </Box>
            <div>
              <Text size="3" weight="medium">
                {product.name}
              </Text>
              <Text
                size="4"
                weight="bold"
                color="blue"
                style={{ marginTop: "4px" }}
              >
                {product.price}
              </Text>
            </div>
            <Button size="2">Add to Cart</Button>
          </Flex>
        </Card>
      ))}
    </Grid>
  ),
}

export const DashboardGrid: Story = {
  render: () => (
    <Grid columns="4" gap="3" style={{ width: "600px" }}>
      {/* Stats cards */}
      <Card size="2">
        <Flex direction="column" gap="1">
          <Text size="1" color="gray">
            Users
          </Text>
          <Text size="4" weight="bold">
            1,234
          </Text>
        </Flex>
      </Card>

      <Card size="2">
        <Flex direction="column" gap="1">
          <Text size="1" color="gray">
            Revenue
          </Text>
          <Text size="4" weight="bold">
            $45,678
          </Text>
        </Flex>
      </Card>

      <Card size="2">
        <Flex direction="column" gap="1">
          <Text size="1" color="gray">
            Orders
          </Text>
          <Text size="4" weight="bold">
            567
          </Text>
        </Flex>
      </Card>

      <Card size="2">
        <Flex direction="column" gap="1">
          <Text size="1" color="gray">
            Conversion
          </Text>
          <Text size="4" weight="bold">
            3.2%
          </Text>
        </Flex>
      </Card>

      {/* Large chart card */}
      <Card size="3" style={{ gridColumn: "span 3" }}>
        <Flex direction="column" gap="2">
          <Text size="3" weight="medium">
            Analytics Chart
          </Text>
          <Box
            style={{
              height: "200px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text size="2" color="gray">
              Chart Area
            </Text>
          </Box>
        </Flex>
      </Card>

      {/* Activity list */}
      <Card size="3">
        <Flex direction="column" gap="2">
          <Text size="3" weight="medium">
            Recent Activity
          </Text>
          <Flex direction="column" gap="2">
            {["User signed up", "Order completed", "Payment received"].map(
              (activity, index) => (
                <Flex key={index} gap="2" align="center">
                  <div
                    style={{
                      width: "6px",
                      height: "6px",
                      backgroundColor: "var(--green-9)",
                      borderRadius: "50%",
                    }}
                  />
                  <Text size="2">{activity}</Text>
                </Flex>
              )
            )}
          </Flex>
        </Flex>
      </Card>
    </Grid>
  ),
}

export const TeamGrid: Story = {
  render: () => (
    <Grid columns="3" gap="4" style={{ width: "600px" }}>
      {[
        { name: "Alice Johnson", role: "Designer", avatar: "AJ" },
        { name: "Bob Smith", role: "Developer", avatar: "BS" },
        { name: "Carol Davis", role: "Manager", avatar: "CD" },
        { name: "David Wilson", role: "Developer", avatar: "DW" },
        { name: "Eve Brown", role: "Designer", avatar: "EB" },
        { name: "Frank Miller", role: "QA Engineer", avatar: "FM" },
      ].map((member, index) => (
        <Card key={index} size="3">
          <Flex direction="column" gap="3" align="center">
            <Avatar fallback={member.avatar} size="5" color="blue" />
            <div style={{ textAlign: "center" }}>
              <Text size="3" weight="medium">
                {member.name}
              </Text>
              <Text size="2" color="gray" style={{ marginTop: "2px" }}>
                {member.role}
              </Text>
            </div>
            <Button size="1" variant="outline" style={{ width: "100%" }}>
              Contact
            </Button>
          </Flex>
        </Card>
      ))}
    </Grid>
  ),
}
