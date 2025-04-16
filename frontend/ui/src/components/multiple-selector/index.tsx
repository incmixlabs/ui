import React from "react"
import MSelector from "./multiple-selector"
import type { Option } from "./multiple-selector"

const OPTIONS: Option[] = [
  { label: "Next.js", value: "nextjs" },
  { label: "React", value: "react" },
  { label: "Remix", value: "remix" },
  { label: "Vite", value: "vite" },
  { label: "Nuxt", value: "nuxt" },
  { label: "Vue", value: "vue" },
  { label: "Svelte", value: "svelte" },
  { label: "Angular", value: "angular", disable: true },
  { label: "Ember", value: "ember", disable: true },
  { label: "Gatsby", value: "gatsby" },
  { label: "Astro", value: "astro" },
]

type ThemeColor = "gray" | "indigo" | "cyan" | "orange" | "crimson"

interface MultipleSelectorControlledProps {
  themeColor: ThemeColor
}

export const MultipleSelectorControlled: React.FC<
  MultipleSelectorControlledProps
> = () => {
  const [value, setValue] = React.useState<Option[]>([])

  return (
    <div className="flex w-[30rem] flex-col gap-5 px-10 ">
      {/* <p className="text-primary">Your selection: {value.map((val) => val.label).join(', ')}</p> */}
      <MSelector
        value={value}
        onChange={setValue}
        // Removed defaultColor={themeColor} as it's not defined in the component props
        defaultOptions={OPTIONS}
        placeholder="Select frameworks you like..."
        creatable
        emptyIndicator={
          <p className="text-center text-gray-600 text-lg leading-10 dark:text-gray-400">
            No results found.
          </p>
        }
      />
    </div>
  )
}

export { MSelector as MultipleSelector }
