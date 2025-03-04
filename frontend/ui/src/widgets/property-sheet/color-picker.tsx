interface CompactColorPickerProps {
  onColorSelect: (color: { hex: string }) => void
}
const generateColorArray = (color: string, reverse = false) => {
  const range = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  if (reverse) range.reverse()
  return range.map((num) => `var(--${color}-${num})`)
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
  const orangesColors = generateColorArray("green", true)
  const yellowsColors = generateColorArray("green", true)
  const leafColors = generateColorArray("green", true)
  const greensColors = generateColorArray("green", true)
  const tealsColors = generateColorArray("green", true)
  const bluesColors = generateColorArray("green", true)
  const indigoColors = generateColorArray("green", true)
  const violetColors = generateColorArray("green", true)
  const plumsColors = generateColorArray("green", true)
  const pinksColors = generateColorArray("green", true)

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
                onClick={() => onColorSelect({ hex: color })}
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
