import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Callout, Theme, accentColors, grayColors, ThemesColorScale } from "../../src/1base";

const meta: Meta<typeof Callout.Root> = {
  title: "1 Base/Callout",
  component: Callout.Root,
  parameters: {
    layout: "centered",
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
  argTypes: {
    variant: {
      control: "select",
      options: ["soft", "surface", "outline"],
      description: "Callout variant style",
    },
    size: {
      control: "select",
      options: ["1", "2", "3"],
      description: "Callout size",
    },
    color: {
      control: "select",
      options: accentColors,
      description: "Callout accent color",
    },
    highContrast: {
      control: "boolean",
      description: "High contrast mode",
    },
    children: {
      control: "text",
      description: "Callout content",
    },
  },
  args: {
    children: "This is a callout message with important information.",
    variant: "soft",
    size: "1",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Text>
        {args.children || "This is a default callout with important information."}
      </Callout.Text>
    </Callout.Root>
  ),
};

// Variant stories
export const Soft: Story = {
  args: {
    variant: "soft",
  },
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Text>
        {args.children || "This is a soft callout with important information."}
      </Callout.Text>
    </Callout.Root>
  ),
};

export const Surface: Story = {
  args: {
    variant: "surface",
  },
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Text>
        {args.children || "This is a surface callout with important information."}
      </Callout.Text>
    </Callout.Root>
  ),
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Text>
        {args.children || "This is an outline callout with important information."}
      </Callout.Text>
    </Callout.Root>
  ),
};

// Size stories
export const Size1: Story = {
  args: {
    size: "1",
  },
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Text>
        {args.children || "This is a size 1 callout with important information."}
      </Callout.Text>
    </Callout.Root>
  ),
};

export const Size2: Story = {
  args: {
    size: "2",
  },
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Text>
        {args.children || "This is a size 2 callout with important information."}
      </Callout.Text>
    </Callout.Root>
  ),
};

export const Size3: Story = {
  args: {
    size: "3",
  },
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Text>
        {args.children || "This is a size 3 callout with important information."}
      </Callout.Text>
    </Callout.Root>
  ),
};

// Color stories
export const ColorBlue: Story = {
  args: {
    color: "blue",
  },
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Text>
        {args.children || "This is a blue callout with important information."}
      </Callout.Text>
    </Callout.Root>
  ),
};

export const ColorRed: Story = {
  args: {
    color: "red",
  },
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Text>
        {args.children || "This is a red callout with important information."}
      </Callout.Text>
    </Callout.Root>
  ),
};

export const ColorGreen: Story = {
  args: {
    color: "green",
  },
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Text>
        {args.children || "This is a green callout with important information."}
      </Callout.Text>
    </Callout.Root>
  ),
};

export const ColorYellow: Story = {
  args: {
    color: "yellow",
  },
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Text>
        {args.children || "This is a yellow callout with important information."}
      </Callout.Text>
    </Callout.Root>
  ),
};

// State stories
export const HighContrast: Story = {
  args: {
    highContrast: true,
  },
  render: (args) => (
    <Callout.Root {...args}>
      <Callout.Text>
        {args.children || "This is a high contrast callout with important information."}
      </Callout.Text>
    </Callout.Root>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Callout.Root variant="soft">
        <Callout.Text>Soft callout variant</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="surface">
        <Callout.Text>Surface callout variant</Callout.Text>
      </Callout.Root>
      <Callout.Root variant="outline">
        <Callout.Text>Outline callout variant</Callout.Text>
      </Callout.Root>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Callout.Root size="1">
        <Callout.Text>Size 1 callout</Callout.Text>
      </Callout.Root>
      <Callout.Root size="2">
        <Callout.Text>Size 2 callout</Callout.Text>
      </Callout.Root>
      <Callout.Root size="3">
        <Callout.Text>Size 3 callout</Callout.Text>
      </Callout.Root>
    </div>
  ),
};

// All accent colors showcase
export const AllAccentColors: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "8px" }}>
      {accentColors.map((color) => (
        <Callout.Root key={color} color={color}>
          <Callout.Text>
            <strong>{color}</strong> - This is a {color} callout with important information.
          </Callout.Text>
        </Callout.Root>
      ))}
    </div>
  ),
};

// Color palette with ThemesColorScale visualization
export const ColorPaletteWithScale: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}>
          Accent Colors with Color Scale
        </h3>
        <ThemesColorScale type="accent" />
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "8px" }}>
        {accentColors.slice(0, 8).map((color) => (
          <Callout.Root key={color} color={color}>
            <Callout.Text>
              <strong>{color.charAt(0).toUpperCase() + color.slice(1)}</strong> callout
            </Callout.Text>
          </Callout.Root>
        ))}
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "8px" }}>
        {accentColors.slice(8, 16).map((color) => (
          <Callout.Root key={color} color={color}>
            <Callout.Text>
              <strong>{color.charAt(0).toUpperCase() + color.slice(1)}</strong> callout
            </Callout.Text>
          </Callout.Root>
        ))}
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "8px" }}>
        {accentColors.slice(16).map((color) => (
          <Callout.Root key={color} color={color}>
            <Callout.Text>
              <strong>{color.charAt(0).toUpperCase() + color.slice(1)}</strong> callout
            </Callout.Text>
          </Callout.Root>
        ))}
      </div>
    </div>
  ),
};

// Gray colors showcase  
export const GrayColorScale: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      <div>
        <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}>
          Gray Colors with Color Scale
        </h3>
        <ThemesColorScale type="gray" />
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "8px" }}>
        {grayColors.map((color) => (
          <Callout.Root key={color} color={color as any}>
            <Callout.Text>
              <strong>{color.charAt(0).toUpperCase() + color.slice(1)}</strong> - This is a {color} callout example.
            </Callout.Text>
          </Callout.Root>
        ))}
      </div>
    </div>
  ),
};

// Comprehensive variants and colors showcase
export const VariantsWithColors: Story = {
  render: () => {
    const featuredColors = ['blue', 'green', 'yellow', 'red', 'purple', 'orange'] as const;
    const variants = ['soft', 'surface', 'outline'] as const;
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {variants.map((variant) => (
          <div key={variant}>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600", textTransform: "capitalize" }}>
              {variant} Variant
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "12px" }}>
              {featuredColors.map((color) => (
                <Callout.Root key={`${variant}-${color}`} variant={variant} color={color}>
                  <Callout.Text>
                    <strong>{color.charAt(0).toUpperCase() + color.slice(1)} {variant}</strong><br />
                    This showcases the {variant} variant with {color} color accent.
                  </Callout.Text>
                </Callout.Root>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

// Status callouts example
export const StatusCallouts: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Callout.Root variant="soft" color="blue">
        <Callout.Text>
          <strong>Info:</strong> This is an informational callout with helpful
          details.
        </Callout.Text>
      </Callout.Root>
      <Callout.Root variant="soft" color="green">
        <Callout.Text>
          <strong>Success:</strong> Operation completed successfully!
        </Callout.Text>
      </Callout.Root>
      <Callout.Root variant="soft" color="yellow">
        <Callout.Text>
          <strong>Warning:</strong> Please review this information carefully.
        </Callout.Text>
      </Callout.Root>
      <Callout.Root variant="soft" color="red">
        <Callout.Text>
          <strong>Error:</strong> Something went wrong. Please try again.
        </Callout.Text>
      </Callout.Root>
    </div>
  ),
};

// Rich content example
export const RichContent: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Callout.Root variant="soft" color="blue">
        <Callout.Text>
          <strong>Documentation Update</strong>
          <br />
          The API documentation has been updated with new endpoints and
          examples. Please review the changes and update your integrations
          accordingly.
        </Callout.Text>
      </Callout.Root>
      <Callout.Root variant="outline" color="purple">
        <Callout.Text>
          <strong>Pro Tip</strong>
          <br />
          You can use keyboard shortcuts to navigate faster: Ctrl + K for
          search, Ctrl + / to toggle sidebar, and Esc to close modals.
        </Callout.Text>
      </Callout.Root>
    </div>
  ),
};

// Real-world usage examples
export const RealWorldExamples: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Callout.Root variant="surface" color="blue">
        <Callout.Text>
          <strong>New Feature Available:</strong> You can now export your data
          in multiple formats. Check out the new export options in your
          dashboard settings.
        </Callout.Text>
      </Callout.Root>

      <Callout.Root variant="soft" color="yellow">
        <Callout.Text>
          <strong>Maintenance Notice:</strong> Scheduled maintenance will occur
          on Sunday, 2:00 AM - 4:00 AM UTC. Some features may be temporarily
          unavailable.
        </Callout.Text>
      </Callout.Root>

      <Callout.Root variant="outline" color="green">
        <Callout.Text>
          <strong>Security Update:</strong> Your account security has been
          enhanced with two-factor authentication. Enable it now in your account
          settings for better protection.
        </Callout.Text>
      </Callout.Root>
    </div>
  ),
};
