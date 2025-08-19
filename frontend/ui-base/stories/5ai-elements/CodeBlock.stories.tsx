import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { CodeBlock, CodeBlockCopyButton } from "../../src/3b-ai-elements/code-block"
import { Theme } from "../../src/1base"

const meta: Meta<typeof CodeBlock> = {
  title: "5 AI Elements/CodeBlock",
  component: CodeBlock,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <Theme>
        <div style={{ minWidth: "600px", maxWidth: "800px" }}>
          <Story />
        </div>
      </Theme>
    ),
  ],
  argTypes: {
    language: {
      control: "select",
      options: ["javascript", "typescript", "python", "bash", "json", "css", "html"],
      description: "Programming language for syntax highlighting",
    },
    showLineNumbers: {
      control: "boolean",
      description: "Show line numbers",
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const javascriptCode = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example usage
console.log(fibonacci(10)); // 55`

const typescriptCode = `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function createUser(userData: Omit<User, 'id'>): User {
  return {
    id: Math.random(),
    ...userData,
  };
}

const newUser = createUser({
  name: "John Doe",
  email: "john@example.com",
  isActive: true,
});`

const pythonCode = `def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)

# Example usage
numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers = quick_sort(numbers)
print(sorted_numbers)  # [1, 1, 2, 3, 6, 8, 10]`

const bashCode = `#!/bin/bash

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Deploy to production
if [ "$NODE_ENV" = "production" ]; then
    echo "Deploying to production..."
    npm run deploy
else
    echo "Not in production environment"
fi`

export const JavaScript: Story = {
  args: {
    code: javascriptCode,
    language: "javascript",
  },
}

export const TypeScript: Story = {
  args: {
    code: typescriptCode,
    language: "typescript",
  },
}

export const Python: Story = {
  args: {
    code: pythonCode,
    language: "python",
  },
}

export const WithLineNumbers: Story = {
  args: {
    code: typescriptCode,
    language: "typescript",
    showLineNumbers: true,
  },
}

export const WithCopyButton: Story = {
  render: () => (
    <CodeBlock code={javascriptCode} language="javascript">
      <CodeBlockCopyButton
        onCopy={() => console.log("Code copied!")}
        onError={(error) => console.error("Copy failed:", error)}
      />
    </CodeBlock>
  ),
}

export const BashScript: Story = {
  render: () => (
    <CodeBlock
      code={bashCode}
      language="bash"
      showLineNumbers={true}
    >
      <CodeBlockCopyButton />
    </CodeBlock>
  ),
}

export const JSONExample: Story = {
  render: () => {
    const jsonCode = `{
  "name": "my-awesome-app",
  "version": "1.0.0",
  "description": "An awesome React application",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "typescript": "^4.9.5"
  },
  "devDependencies": {
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11"
  }
}`

    return (
      <CodeBlock code={jsonCode} language="json" showLineNumbers={true}>
        <CodeBlockCopyButton />
      </CodeBlock>
    )
  },
}

export const InteractiveCopy: Story = {
  render: () => {
    const [lastCopied, setLastCopied] = React.useState("")

    return (
      <div className="space-y-4">
        {lastCopied && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
            ✅ Copied to clipboard: {lastCopied.slice(0, 50)}...
          </div>
        )}
        <CodeBlock code={javascriptCode} language="javascript">
          <CodeBlockCopyButton
            onCopy={() => setLastCopied(javascriptCode)}
            onError={(error) => console.error("Copy failed:", error)}
          />
        </CodeBlock>
      </div>
    )
  },
}
