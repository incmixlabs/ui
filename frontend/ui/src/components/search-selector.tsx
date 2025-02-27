import { useEffect, useRef, useState } from "react"
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./command"
import { cn } from "@utils"

// Define the theme data interface
interface ThemeData {
  value: string
  label: string
  avatarSrc: string
}

interface SearchSelectorProps {
  themeData: ThemeData[]
  defaultValue?: string
  onChange?: (value: string) => void
  placeholder?: string
}

const SearchSelector: React.FC<SearchSelectorProps> = ({
  themeData,
  defaultValue,
  onChange,
  placeholder = "Search theme...",
}) => {
  const [open, setOpen] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>("")
  const [selectedTheme, setSelectedTheme] = useState<ThemeData | null>(
    defaultValue
      ? themeData.find((theme) => theme.value === defaultValue) || null
      : themeData.length > 0
        ? themeData[0]
        : null
  )

  const containerRef = useRef<HTMLDivElement>(null)

  // Filter themes based on input value
  const filteredThemes = themeData.filter((theme) =>
    theme.label.toLowerCase().includes(inputValue.toLowerCase())
  )

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle input focus and change
  const handleInputFocus = (): void => {
    setOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
    setOpen(true)
  }

  // Handle theme selection
  const handleThemeSelect = (theme: ThemeData): void => {
    setSelectedTheme(theme)
    setInputValue(theme.label)
    if (onChange) {
      onChange(theme.value)
    }
    setOpen(false)
  }

  return (
    <div className="w-64" ref={containerRef}>
      <Command className="rounded-lg border shadow-md relative">
        <CommandInput
          placeholder={placeholder}
          value={inputValue}
          onFocus={handleInputFocus}
          onChange={handleInputChange}
          className="h-9"
        />

        {open && (
          <CommandGroup className="max-h-52 absolute bottom-0 overflow-auto">
            {filteredThemes.length === 0 ? (
              <CommandEmpty>No themes found.</CommandEmpty>
            ) : (
              filteredThemes.map((theme) => (
                <CommandItem
                  key={theme.value}
                  onSelect={() => handleThemeSelect(theme)}
                  className={cn(
                    "flex items-center gap-2 px-2 py-1.5",
                    selectedTheme?.value === theme.value &&
                      "border-2 border-blue-500 bg-blue-50"
                  )}
                >
                  <span>{theme.label}</span>
                </CommandItem>
              ))
            )}
          </CommandGroup>
        )}
      </Command>
    </div>
  )
}

export default SearchSelector
