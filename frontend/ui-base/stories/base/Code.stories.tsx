import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Code } from './code';
import { Theme } from './theme';
import { Flex } from './flex';
import { Text } from './text';

const meta: Meta<typeof Code> = {
  title: 'Components/Code',
  component: Code,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ padding: '20px' }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    size: {
      control: 'select',
      options: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      description: 'Code text size',
    },
    variant: {
      control: 'select',
      options: ['solid', 'soft', 'outline', 'ghost'],
      description: 'Code variant style',
    },
    color: {
      control: 'select',
      options: [
        'gray', 'gold', 'bronze', 'brown', 'yellow', 'amber', 'orange', 'tomato', 
        'red', 'ruby', 'crimson', 'pink', 'plum', 'purple', 'violet', 'iris', 
        'indigo', 'blue', 'cyan', 'teal', 'jade', 'green', 'grass', 'lime', 'mint', 'sky'
      ],
      description: 'Code color',
    },
    weight: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'bold'],
      description: 'Code text weight',
    },
    highContrast: {
      control: 'boolean',
      description: 'High contrast mode',
    },
  },
  args: {
    size: '2',
    variant: 'soft',
    children: 'console.log("hello world")',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  render: (args) => (
    <Code {...args}>
      console.log("Hello, World!")
    </Code>
  ),
};

// Size stories
export const Size1: Story = {
  render: (args) => (
    <Code size="1">
      npm install
    </Code>
  ),
};

export const Size2: Story = {
  render: (args) => (
    <Code size="2">
      npm install
    </Code>
  ),
};

export const Size3: Story = {
  render: (args) => (
    <Code size="3">
      npm install
    </Code>
  ),
};

export const Size4: Story = {
  render: (args) => (
    <Code size="4">
      npm install
    </Code>
  ),
};

// Variant stories
export const Solid: Story = {
  render: (args) => (
    <Code variant="solid">
      git commit -m "fix: resolve issue"
    </Code>
  ),
};

export const Soft: Story = {
  render: (args) => (
    <Code variant="soft">
      git commit -m "fix: resolve issue"
    </Code>
  ),
};

export const Outline: Story = {
  render: (args) => (
    <Code variant="outline">
      git commit -m "fix: resolve issue"
    </Code>
  ),
};

export const Ghost: Story = {
  render: (args) => (
    <Code variant="ghost">
      git commit -m "fix: resolve issue"
    </Code>
  ),
};

// Color stories
export const ColorBlue: Story = {
  render: (args) => (
    <Code color="blue">
      const isActive = true
    </Code>
  ),
};

export const ColorRed: Story = {
  render: (args) => (
    <Code color="red">
      throw new Error("Something went wrong")
    </Code>
  ),
};

export const ColorGreen: Story = {
  render: (args) => (
    <Code color="green">
      ✓ Tests passed
    </Code>
  ),
};

export const ColorPurple: Story = {
  render: (args) => (
    <Code color="purple">
      function myFunction() { }
    </Code>
  ),
};

// Weight stories
export const WeightLight: Story = {
  render: (args) => (
    <Code weight="light">
      // This is a comment
    </Code>
  ),
};

export const WeightRegular: Story = {
  render: (args) => (
    <Code weight="regular">
      const value = 42;
    </Code>
  ),
};

export const WeightMedium: Story = {
  render: (args) => (
    <Code weight="medium">
      import React from 'react'
    </Code>
  ),
};

export const WeightBold: Story = {
  render: (args) => (
    <Code weight="bold">
      ERROR: Build failed
    </Code>
  ),
};

// High contrast
export const HighContrast: Story = {
  render: (args) => (
    <Code highContrast>
      sudo rm -rf /
    </Code>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <Flex direction="column" gap="2">
      <Code size="1">size="1"</Code>
      <Code size="2">size="2"</Code>
      <Code size="3">size="3"</Code>
      <Code size="4">size="4"</Code>
      <Code size="5">size="5"</Code>
    </Flex>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <Flex direction="column" gap="2">
      <Code variant="solid">variant="solid"</Code>
      <Code variant="soft">variant="soft"</Code>
      <Code variant="outline">variant="outline"</Code>
      <Code variant="ghost">variant="ghost"</Code>
    </Flex>
  ),
};

// Inline code in text
export const InlineCode: Story = {
  render: () => (
    <Text size="3" style={{ maxWidth: '500px', lineHeight: '1.6' }}>
      To install the package, run <Code>npm install @my-org/ui</Code> in your terminal.
      Then you can import components like <Code>import {"{ Button }"} from '@my-org/ui'</Code> 
      and use them in your React application.
    </Text>
  ),
};

// Code snippets example
export const CodeSnippetsExample: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Text size="4" weight="bold" style={{ marginBottom: '20px', display: 'block' }}>
        Installation Guide
      </Text>
      
      <Flex direction="column" gap="4">
        <div>
          <Text size="2" weight="medium" style={{ marginBottom: '8px', display: 'block' }}>
            Using npm:
          </Text>
          <Code variant="outline" size="2">
            npm install @radix-ui/react-components
          </Code>
        </div>
        
        <div>
          <Text size="2" weight="medium" style={{ marginBottom: '8px', display: 'block' }}>
            Using yarn:
          </Text>
          <Code variant="outline" size="2" color="blue">
            yarn add @radix-ui/react-components
          </Code>
        </div>
        
        <div>
          <Text size="2" weight="medium" style={{ marginBottom: '8px', display: 'block' }}>
            Using pnpm:
          </Text>
          <Code variant="outline" size="2" color="green">
            pnpm add @radix-ui/react-components
          </Code>
        </div>
      </Flex>
    </div>
  ),
};

// API documentation example
export const APIDocumentationExample: Story = {
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <Text size="4" weight="bold" style={{ marginBottom: '16px', display: 'block' }}>
        Button Component API
      </Text>
      
      <Flex direction="column" gap="3">
        <div>
          <Text size="2" weight="medium">Import:</Text>
          <div style={{ marginTop: '4px' }}>
            <Code>import {"{ Button }"} from './components'</Code>
          </div>
        </div>
        
        <div>
          <Text size="2" weight="medium">Basic Usage:</Text>
          <div style={{ marginTop: '4px' }}>
            <Code>&lt;Button variant="solid"&gt;Click me&lt;/Button&gt;</Code>
          </div>
        </div>
        
        <div>
          <Text size="2" weight="medium">Props:</Text>
          <div style={{ marginTop: '8px' }}>
            <Flex direction="column" gap="2">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code size="1" variant="ghost">variant</Code>
                <Text size="1" color="gray">: "solid" | "outline" | "ghost"</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code size="1" variant="ghost">size</Code>
                <Text size="1" color="gray">: "1" | "2" | "3" | "4"</Text>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Code size="1" variant="ghost">disabled</Code>
                <Text size="1" color="gray">?: boolean</Text>
              </div>
            </Flex>
          </div>
        </div>
      </Flex>
    </div>
  ),
};

// Terminal commands example
export const TerminalCommandsExample: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <Text size="3" weight="bold" style={{ marginBottom: '16px', display: 'block' }}>
        Common Git Commands
      </Text>
      
      <Flex direction="column" gap="3">
        <div>
          <Text size="2" style={{ marginBottom: '4px', display: 'block' }}>
            Clone a repository:
          </Text>
          <Code variant="solid" size="1">
            git clone https://github.com/user/repo.git
          </Code>
        </div>
        
        <div>
          <Text size="2" style={{ marginBottom: '4px', display: 'block' }}>
            Add all changes:
          </Text>
          <Code variant="solid" size="1">
            git add .
          </Code>
        </div>
        
        <div>
          <Text size="2" style={{ marginBottom: '4px', display: 'block' }}>
            Commit with message:
          </Text>
          <Code variant="solid" size="1">
            git commit -m "Add new feature"
          </Code>
        </div>
        
        <div>
          <Text size="2" style={{ marginBottom: '4px', display: 'block' }}>
            Push to origin:
          </Text>
          <Code variant="solid" size="1">
            git push origin main
          </Code>
        </div>
      </Flex>
    </div>
  ),
};

// Status indicators example
export const StatusIndicatorsExample: Story = {
  render: () => (
    <div style={{ maxWidth: '400px' }}>
      <Text size="3" weight="bold" style={{ marginBottom: '16px', display: 'block' }}>
        Build Status
      </Text>
      
      <Flex direction="column" gap="3">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Text size="2">Tests:</Text>
          <Code color="green" variant="soft" size="1">PASSED</Code>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Text size="2">Build:</Text>
          <Code color="green" variant="soft" size="1">SUCCESS</Code>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Text size="2">Deploy:</Text>
          <Code color="yellow" variant="soft" size="1">PENDING</Code>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Text size="2">Coverage:</Text>
          <Code color="blue" variant="soft" size="1">87%</Code>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Text size="2">Bundle size:</Text>
          <Code color="orange" variant="soft" size="1">2.4MB</Code>
        </div>
      </Flex>
    </div>
  ),
};

// File paths example
export const FilePathsExample: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <Text size="3" weight="bold" style={{ marginBottom: '16px', display: 'block' }}>
        Project Structure
      </Text>
      
      <Flex direction="column" gap="1">
        <Code variant="ghost" size="1">src/</Code>
        <Code variant="ghost" size="1" style={{ marginLeft: '16px' }}>components/</Code>
        <Code variant="ghost" size="1" style={{ marginLeft: '32px' }}>Button.tsx</Code>
        <Code variant="ghost" size="1" style={{ marginLeft: '32px' }}>Input.tsx</Code>
        <Code variant="ghost" size="1" style={{ marginLeft: '32px' }}>Modal.tsx</Code>
        <Code variant="ghost" size="1" style={{ marginLeft: '16px' }}>utils/</Code>
        <Code variant="ghost" size="1" style={{ marginLeft: '32px' }}>helpers.ts</Code>
        <Code variant="ghost" size="1" style={{ marginLeft: '32px' }}>constants.ts</Code>
        <Code variant="ghost" size="1" style={{ marginLeft: '16px' }}>App.tsx</Code>
        <Code variant="ghost" size="1" style={{ marginLeft: '16px' }}>main.tsx</Code>
        <Code variant="ghost" size="1">package.json</Code>
        <Code variant="ghost" size="1">tsconfig.json</Code>
      </Flex>
    </div>
  ),
};