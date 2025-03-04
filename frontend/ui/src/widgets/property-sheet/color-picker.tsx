interface CompactColorPickerProps {
  onColorSelect: (color: { hex: string }) => void
}
const generateColorArray = (color: string, reverse = false) => {
  const range = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  if (reverse) range.reverse()
  return range.map((num) => `var(--${color}-${num})`)
}

function cssVarToHex(varName: string) {
  // Create a temporary element to apply the CSS variable
  const tempElem = document.createElement("div")
  tempElem.style.color = `var(${varName})`
  document.body.appendChild(tempElem)

  // Get the computed color value (in RGB/RGBA format)
  const computedColor = getComputedStyle(tempElem).color
  document.body.removeChild(tempElem)

  // Extract RGB/A components from the computed color
  const components = computedColor.match(/[\d\.]+/g) || []
  if (components.length < 3) return null // Invalid color

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

const CompactColorPicker = ({ onColorSelect }: CompactColorPickerProps) => {
  // Dark colors - displayed horizontally
  const darkColors = [
    "var(--gray-1)",
    "var(--gray-2)",
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

  // All vertical color groups
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

  return (
    <div className="bg-white p-2">
      <div className="mb-1 flex justify-between">
        {darkColors.map((color) => (
          <button
            key={`dark-${color}`}
            type="button"
            className="h-6 w-6 cursor-pointer rounded-sm transition-transform hover:scale-110"
            style={{ backgroundColor: `${color}` }}
            onClick={() => onColorSelect({ hex: color })}
            title={color}
          />
        ))}
      </div>

      <div className="flex justify-between">
        {colorGroups.map((group) => (
          <div
            key={`group-${colorGroups.indexOf(group)}`}
            className="flex flex-col gap-1"
          >
            {group.map((color) => (
              <button
                key={`color-${color}`}
                type="button"
                className="h-6 w-6 cursor-pointer rounded-sm transition-transform hover:scale-110"
                style={{ backgroundColor: `${color}` }}
                onClick={() => {
                  // Extract variable name from the CSS variable notation
                  const varNameMatch = color.match(/^var\((--.+)\)$/)
                  const varName = varNameMatch ? varNameMatch[1] : color
                  // Convert the CSS variable to a hex color value using the helper function
                  const hexColor = cssVarToHex(varName) || color
                  onColorSelect({ hex: hexColor })
                }}
                title={color}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CompactColorPicker
