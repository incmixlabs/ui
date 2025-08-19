import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import { Sources, SourcesTrigger, SourcesContent, Source } from "../../src/3b-ai-elements/source"
import { Theme } from "../../src/1base"
import { BookIcon, FileTextIcon, GlobeIcon, DatabaseIcon } from "lucide-react"

const meta: Meta<typeof Sources> = {
  title: "5 AI Elements/Source",
  component: Sources,
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

export const Basic: Story = {
  render: () => (
    <Sources>
      <SourcesTrigger count={3} />
      <SourcesContent>
        <Source
          href="https://react.dev/learn/state-a-components-memory"
          title="React Documentation - State: A Component's Memory"
        />
        <Source
          href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const"
          title="MDN - const statement"
        />
        <Source
          href="https://typescript-eslint.io/rules/prefer-const/"
          title="TypeScript ESLint - prefer-const rule"
        />
      </SourcesContent>
    </Sources>
  ),
}

export const ManySources: Story = {
  render: () => (
    <Sources>
      <SourcesTrigger count={8} />
      <SourcesContent>
        <Source
          href="https://react.dev/learn/hooks"
          title="React Hooks Documentation"
        />
        <Source
          href="https://reactjs.org/docs/hooks-state.html"
          title="Using the State Hook"
        />
        <Source
          href="https://reactjs.org/docs/hooks-effect.html"
          title="Using the Effect Hook"
        />
        <Source
          href="https://react.dev/learn/you-might-not-need-an-effect"
          title="You Might Not Need an Effect"
        />
        <Source
          href="https://react.dev/learn/lifecycle-of-reactive-effects"
          title="Lifecycle of Reactive Effects"
        />
        <Source
          href="https://github.com/facebook/react/blob/main/packages/react/src/ReactHooks.js"
          title="React Hooks Implementation (GitHub)"
        />
        <Source
          href="https://overreacted.io/a-complete-guide-to-useeffect/"
          title="A Complete Guide to useEffect - Dan Abramov"
        />
        <Source
          href="https://kentcdodds.com/blog/useeffect-vs-uselayouteffect"
          title="useEffect vs useLayoutEffect - Kent C. Dodds"
        />
      </SourcesContent>
    </Sources>
  ),
}

export const CustomSources: Story = {
  render: () => (
    <Sources>
      <SourcesTrigger count={4}>
        <div className="flex items-center gap-2">
          <BookIcon className="h-4 w-4" />
          <p className="font-medium">Referenced 4 documentation sources</p>
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </SourcesTrigger>
      <SourcesContent>
        <Source href="https://nextjs.org/docs" title="Next.js Documentation">
          <GlobeIcon className="h-4 w-4" />
          <span className="block font-medium">Next.js Official Docs</span>
        </Source>
        <Source href="https://tailwindcss.com/docs" title="Tailwind CSS Documentation">
          <FileTextIcon className="h-4 w-4" />
          <span className="block font-medium">Tailwind CSS Guide</span>
        </Source>
        <Source href="https://www.prisma.io/docs" title="Prisma Documentation">
          <DatabaseIcon className="h-4 w-4" />
          <span className="block font-medium">Prisma ORM Docs</span>
        </Source>
        <Source href="https://zod.dev" title="Zod Schema Validation">
          <BookIcon className="h-4 w-4" />
          <span className="block font-medium">Zod Validation Library</span>
        </Source>
      </SourcesContent>
    </Sources>
  ),
}

export const SingleSource: Story = {
  render: () => (
    <Sources>
      <SourcesTrigger count={1} />
      <SourcesContent>
        <Source
          href="https://react.dev/learn/thinking-in-react"
          title="Thinking in React - Official React Guide"
        />
      </SourcesContent>
    </Sources>
  ),
}

export const InteractiveSourcesToggle: Story = {
  render: () => {
    const [sourcesOpen, setSourcesOpen] = React.useState(false)

    return (
      <div className="space-y-4">
        <div className="p-4 bg-secondary rounded-lg">
          <p className="text-sm mb-4">
            Based on the official React documentation and community best practices,
            here's how you should structure your components for optimal performance and maintainability...
          </p>

          <Sources open={sourcesOpen} onOpenChange={setSourcesOpen}>
            <SourcesTrigger count={5} />
            <SourcesContent>
              <Source
                href="https://react.dev/learn/keeping-components-pure"
                title="Keeping Components Pure"
              />
              <Source
                href="https://react.dev/learn/your-first-component"
                title="Your First Component"
              />
              <Source
                href="https://react.dev/learn/passing-props-to-a-component"
                title="Passing Props to a Component"
              />
              <Source
                href="https://react.dev/learn/conditional-rendering"
                title="Conditional Rendering"
              />
              <Source
                href="https://react.dev/learn/rendering-lists"
                title="Rendering Lists"
              />
            </SourcesContent>
          </Sources>
        </div>

        <div className="text-sm text-muted-foreground">
          Sources are {sourcesOpen ? "expanded" : "collapsed"}. Click the trigger to toggle.
        </div>
      </div>
    )
  },
}

export const EmptySources: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="p-4 bg-secondary rounded-lg">
        <p className="text-sm">
          This response was generated from my training data without referencing external sources.
        </p>
      </div>

      <Sources>
        <SourcesTrigger count={0} />
        <SourcesContent>
          <div className="text-muted-foreground text-sm italic">
            No external sources were used for this response.
          </div>
        </SourcesContent>
      </Sources>
    </div>
  ),
}
