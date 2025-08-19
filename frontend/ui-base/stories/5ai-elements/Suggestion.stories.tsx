import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Suggestions, Suggestion } from "../../src/3b-ai-elements/suggestion"
import { Theme } from "../../src/1base"

const meta: Meta<typeof Suggestions> = {
  title: "5 AI Elements/Suggestion",
  component: Suggestions,
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
}

export default meta
type Story = StoryObj<typeof meta>

const basicSuggestions = [
  "What is React?",
  "How do hooks work?",
  "Explain useState",
  "Show me useEffect example",
]

const codingSuggestions = [
  "Write a todo app",
  "Create a login form",
  "Build a search component",
  "Implement dark mode",
  "Add form validation",
]

const advancedSuggestions = [
  "Explain React performance optimization",
  "How to implement server-side rendering?",
  "What are React design patterns?",
  "Micro-frontends with React",
  "React testing best practices",
  "State management comparison",
]

export const Basic: Story = {
  render: () => {
    const [selectedSuggestion, setSelectedSuggestion] = React.useState("")

    return (
      <div className="space-y-4">
        {selectedSuggestion && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-sm">
            Selected: "{selectedSuggestion}"
          </div>
        )}
        <Suggestions>
          {basicSuggestions.map((suggestion, index) => (
            <Suggestion
              key={index}
              suggestion={suggestion}
              onClick={setSelectedSuggestion}
            />
          ))}
        </Suggestions>
      </div>
    )
  },
}

export const CodingHelp: Story = {
  render: () => {
    const [selectedSuggestion, setSelectedSuggestion] = React.useState("")

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">What would you like to build?</h3>
        {selectedSuggestion && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
            Let's work on: "{selectedSuggestion}"
          </div>
        )}
        <Suggestions>
          {codingSuggestions.map((suggestion, index) => (
            <Suggestion
              key={index}
              suggestion={suggestion}
              onClick={setSelectedSuggestion}
              variant="secondary"
            />
          ))}
        </Suggestions>
      </div>
    )
  },
}

export const AdvancedTopics: Story = {
  render: () => {
    const [selectedSuggestion, setSelectedSuggestion] = React.useState("")

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Advanced React Topics</h3>
        {selectedSuggestion && (
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-md text-purple-800 text-sm">
            Deep dive into: "{selectedSuggestion}"
          </div>
        )}
        <Suggestions>
          {advancedSuggestions.map((suggestion, index) => (
            <Suggestion
              key={index}
              suggestion={suggestion}
              onClick={setSelectedSuggestion}
              variant="ghost"
            />
          ))}
        </Suggestions>
      </div>
    )
  },
}

export const CustomStyling: Story = {
  render: () => {
    const [selectedSuggestion, setSelectedSuggestion] = React.useState("")

    return (
      <div className="space-y-4">
        <Suggestions>
          <Suggestion
            suggestion="Primary suggestion"
            onClick={setSelectedSuggestion}
            variant="default"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-none hover:from-blue-600 hover:to-purple-700"
          />
          <Suggestion
            suggestion="Secondary suggestion"
            onClick={setSelectedSuggestion}
            variant="outline"
            className="border-2 border-dashed border-orange-300 text-orange-600 hover:bg-orange-50"
          />
          <Suggestion
            suggestion="Danger suggestion"
            onClick={setSelectedSuggestion}
            variant="destructive"
          />
          <Suggestion
            suggestion="Large suggestion"
            onClick={setSelectedSuggestion}
            size="lg"
            variant="secondary"
          />
        </Suggestions>
        {selectedSuggestion && (
          <div className="p-3 bg-gray-50 border rounded-md text-sm">
            You clicked: "{selectedSuggestion}"
          </div>
        )}
      </div>
    )
  },
}

export const EmptyState: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">No suggestions available</h3>
      <Suggestions>
        {/* Empty suggestions container */}
      </Suggestions>
      <p className="text-sm text-muted-foreground">
        Suggestions will appear here when available.
      </p>
    </div>
  ),
}

export const ScrollableMany: Story = {
  render: () => {
    const manySuggestions = [
      "React basics", "Component lifecycle", "State management", "Props and children",
      "Event handling", "Conditional rendering", "Lists and keys", "Form handling",
      "API integration", "Error boundaries", "Context API", "Custom hooks",
      "Performance optimization", "Testing components", "TypeScript with React"
    ]

    const [selectedSuggestion, setSelectedSuggestion] = React.useState("")

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Browse React Topics</h3>
        {selectedSuggestion && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md text-blue-800 text-sm">
            Learning about: "{selectedSuggestion}"
          </div>
        )}
        <Suggestions>
          {manySuggestions.map((suggestion, index) => (
            <Suggestion
              key={index}
              suggestion={suggestion}
              onClick={setSelectedSuggestion}
            />
          ))}
        </Suggestions>
      </div>
    )
  },
}
