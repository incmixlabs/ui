import { cn } from "@/shadcn/lib/utils"
import { Box, iconSize } from "@/src/1base"
import { Check } from "lucide-react"

export interface ColorSelectType {
  hex: string
  name?: string
}

interface CompactColorPickerProps {
  onColorSelect: (color: { hex: string; name?: string }) => void
  colorType?: "base" | "all" | "monochromatic" | "monochromatic-shades-only"
  activeColor?: string
  selectedBaseColor?: string
}

const baseColors = [
  "blue",
  "green",
  "red",
  "orange",
  "purple",
  "indigo",
  "pink",
  "violet",
  "sky",
  "lime",
  "brown",
  "gray",
]

const generateColorArray = (color: string, reverse = false) => {
  const range = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  if (reverse) range.reverse()
  return range.map((num) => `var(--${color}-${num})`)
}

function cssVarToHex(varName: string) {
  const tempElem = document.createElement("Box")
  tempElem.style.color = `var(${varName})`
  document.body.appendChild(tempElem)

  const computedColor = getComputedStyle(tempElem).color
  document.body.removeChild(tempElem)

  const components = computedColor.match(/[\d\.]+/g) || []
  if (components.length < 3) return null

  // Convert RGB values to hex
  const [r, g, b] = components
    .slice(0, 3)
    .map((n) => Number.parseInt(n).toString(16).padStart(2, "0"))
  let hex = `#${r}${g}${b}`

  // Add alpha channel if present
  if (components.length === 4) {
    const a = Math.round(Number.parseFloat(components[3]) * 255)
      .toString(16)
      .padStart(2, "0")
    hex += a
  }

  return hex.toUpperCase()
}

const ColorPicker = ({
  onColorSelect,
  colorType = "all",
  activeColor,
  selectedBaseColor = "blue",
}: CompactColorPickerProps) => {
  // Dark colors - displayed horizontally
  const darkColors = [
    "var(--gray-1)",
    "var(--gray-2)",
    "var(--gray-3)",
    "var(--gray-4)",
    "var(--gray-5)",
    "var(--gray-6)",
    "var(--gray-7)",
    "var(--gray-8)",
    "var(--gray-9)",
    "var(--gray-10)",
    "var(--gray-11)",
    "var(--gray-12)",
  ]

  const redsColors = generateColorArray("red", true)
  const orangesColors = generateColorArray("orange", true)
  const yellowsColors = generateColorArray("yellow", true)
  const leafColors = generateColorArray("grass", true)
  const greensColors = generateColorArray("green", true)
  const tealsColors = generateColorArray("teal", true)
  const bluesColors = generateColorArray("blue", true)
  const indigoColors = generateColorArray("indigo", true)
  const violetColors = generateColorArray("violet", true)
  const plumsColors = generateColorArray("plum", true)
  const pinksColors = generateColorArray("pink", true)

  const colorGroups = [
    redsColors,
    orangesColors,
    yellowsColors,
    leafColors,
    greensColors,
    tealsColors,
    bluesColors,
    indigoColors,
    violetColors,
    plumsColors,
    pinksColors,
  ]

  if (colorType === "base") {
    return (
      <Box className="rounded-lg bg-gray-5 p-2">
        <Box className="grid grid-cols-6 gap-2">
          {baseColors.map((color) => (
            <button
              key={color}
              type="button"
              className={cn(
                "h-6 w-6 cursor-pointer rounded-full transition-transform hover:scale-110",
                "flex items-center justify-center",
                activeColor === color && "ring-2 ring-offset-2"
              )}
              style={{ backgroundColor: `var(--${color}-9)`, border: '1px solid var(--gray-6)' }}
              onClick={() =>
                onColorSelect({ hex: `var(--${color}-9)`, name: color })
              }
              title={color}
            >
              {activeColor === color && (
                <Check className={`${iconSize} flex-shrink-0 text-white`} />
              )}
            </button>
          ))}
        </Box>
      </Box>
    )
  }

  if (
    colorType === "monochromatic" ||
    colorType === "monochromatic-shades-only"
  ) {
    // Generate shades for the selected base color (reverse order for lighter to darker)
    const monochromaticShades = []
    for (let i = 9; i >= 1; i--) {
      monochromaticShades.push(`var(--${selectedBaseColor}-${i})`)
    }

    return (
      <Box className="rounded-lg bg-gray-5 p-2">
        {/* Base color selection - only show in full monochromatic mode */}
        {colorType === "monochromatic" && (
          <Box className="mb-3">
            <Box className="mb-2 font-medium text-gray-11 text-xs">
              Base colors
            </Box>
            <Box className="grid grid-cols-6 gap-2">
              {baseColors.map((color) => {
                const isSelected = color === selectedBaseColor
                return (
                  <button
                    key={color}
                    type="button"
                    className={cn(
                      "h-6 w-6 cursor-pointer rounded-full transition-all hover:scale-110",
                      "flex items-center justify-center",
                      isSelected && "ring-2 ring-blue-8 ring-offset-1"
                    )}
                    style={{ backgroundColor: `var(--${color}-6)`, border: '1px solid var(--gray-6)' }}
                    onClick={() =>
                      onColorSelect({ hex: `var(--${color}-6)`, name: color })
                    }
                    title={color}
                  >
                    {isSelected && (
                      <Check
                        className={`${iconSize} flex-shrink-0 text-white`}
                      />
                    )}
                  </button>
                )
              })}
            </Box>
          </Box>
        )}

        {/* Shades of selected color */}
        <Box>
          <Box className="mb-2 font-medium text-gray-11 text-xs">
            Shades of {selectedBaseColor}
          </Box>
          <Box className="grid grid-cols-9 gap-1">
            {monochromaticShades.map((shade, index) => {
              const shadeNumber = 9 - index
              const varName = `--${selectedBaseColor}-${shadeNumber}`
              const isActiveShade =
                activeColor &&
                (activeColor.includes(varName) || activeColor === shade)

              return (
                <button
                  key={shade}
                  type="button"
                  className={cn(
                    "h-6 w-6 cursor-pointer rounded-sm transition-transform hover:scale-110",
                    "flex items-center justify-center",
                    isActiveShade && "ring-2 ring-blue-8 ring-offset-1"
                  )}
                  style={{ backgroundColor: shade, border: '1px solid var(--gray-6)' }}
                  onClick={() => {
                    // Return the CSS variable directly instead of converting to hex
                    // This maintains consistency with how colors are stored
                    onColorSelect({
                      hex: shade, // Use the CSS variable directly
                      name: `${selectedBaseColor}-${shadeNumber}`,
                    })
                  }}
                  title={`${selectedBaseColor} ${shadeNumber}`}
                >
                  {isActiveShade && (
                    <Check
                      className={`flex-shrink-0 text-xs ${shadeNumber <= 5 ? "text-gray-12" : "text-white"}`}
                    />
                  )}
                </button>
              )
            })}
          </Box>
        </Box>
      </Box>
    )
  }

  return (
    <Box className="rounded-lg bg-gray-5 p-2">
      <Box className="mb-1 flex justify-between">
        {darkColors.map((color) => (
          <button
            key={`dark-${color}`}
            type="button"
            className={cn(
              "h-6 w-6 cursor-pointer rounded-sm transition-transform hover:scale-110",
              activeColor === color && "ring-2 ring-offset-2"
            )}
            style={{ backgroundColor: `${color}` }}
            onClick={() => onColorSelect({ hex: color })}
            title={color}
          />
        ))}
      </Box>

      <Box className="flex justify-between">
        {colorGroups.map((group, groupIndex) => (
          <Box key={`group-${groupIndex}`} className="flex flex-col gap-1">
            {group.map((color) => {
              const varNameMatch = color.match(/^var\((--.+)\)$/)
              const varName = varNameMatch ? varNameMatch[1] : color
              return (
                <button
                  key={`color-${color}`}
                  type="button"
                  className={cn(
                    "h-6 w-6 cursor-pointer rounded-sm transition-transform hover:scale-110",
                    activeColor === color && "ring-2 ring-offset-2"
                  )}
                  style={{ backgroundColor: `${color}` }}
                  onClick={() => {
                    const hexColor = cssVarToHex(varName) || color
                    onColorSelect({
                      hex: hexColor,
                      name: varName.replace(/^--/, ""),
                    })
                  }}
                  title={color}
                />
              )
            })}
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ColorPicker
