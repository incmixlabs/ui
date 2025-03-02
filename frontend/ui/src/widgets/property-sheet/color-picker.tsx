interface CompactColorPickerProps {
  onColorSelect: (color: { hex: string }) => void
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

  // Other color groups - displayed vertically
  const redsColors = [
    "var(--red-9)",
    "var(--red-8)",
    "var(--red-7)",
    "var(--red-6)",
    "var(--red-5)",
    "var(--red-4)",
    "var(--red-3)",
    "var(--red-2)",
    "var(--red-1)",
  ]

  const orangesColors = [
    "var(--orange-9)",
    "var(--orange-8)",
    "var(--orange-7)",
    "var(--orange-6)",
    "var(--orange-5)",
    "var(--orange-4)",
    "var(--orange-3)",
    "var(--orange-2)",
    "var(--orange-1)",
  ]

  const yellowsColors = [
    "var(--yellow-9)",
    "var(--yellow-8)",
    "var(--yellow-7)",
    "var(--yellow-6)",
    "var(--yellow-5)",
    "var(--yellow-4)",
    "var(--yellow-3)",
    "var(--yellow-2)",
    "var(--yellow-1)",
  ]

  const leafColors = [
    "var(--grass-9)",
    "var(--grass-8)",
    "var(--grass-7)",
    "var(--grass-6)",
    "var(--grass-5)",
    "var(--grass-4)",
    "var(--grass-3)",
    "var(--grass-2)",
    "var(--grass-1)",
  ]

  const greensColors = [
    "var(--green-9)",
    "var(--green-8)",
    "var(--green-7)",
    "var(--green-6)",
    "var(--green-5)",
    "var(--green-4)",
    "var(--green-3)",
    "var(--green-2)",
    "var(--green-1)",
  ]

  const tealsColors = [
    "var(--teal-9)",
    "var(--teal-8)",
    "var(--teal-7)",
    "var(--teal-6)",
    "var(--teal-5)",
    "var(--teal-4)",
    "var(--teal-3)",
    "var(--teal-2)",
    "var(--teal-1)",
  ]

  const bluesColors = [
    "var(--blue-9)",
    "var(--blue-8)",
    "var(--blue-7)",
    "var(--blue-6)",
    "var(--blue-5)",
    "var(--blue-4)",
    "var(--blue-3)",
    "var(--blue-2)",
    "var(--blue-1)",
  ]

  const indigoColors = [
    "var(--indigo-9)",
    "var(--indigo-8)",
    "var(--indigo-7)",
    "var(--indigo-6)",
    "var(--indigo-5)",
    "var(--indigo-4)",
    "var(--indigo-3)",
    "var(--indigo-2)",
    "var(--indigo-1)",
  ]

  const violetColors = [
    "var(--violet-9)",
    "var(--violet-8)",
    "var(--violet-7)",
    "var(--violet-6)",
    "var(--violet-5)",
    "var(--violet-4)",
    "var(--violet-3)",
    "var(--violet-2)",
    "var(--violet-1)",
  ]

  const plumsColors = [
    "var(--plum-9)",
    "var(--plum-8)",
    "var(--plum-7)",
    "var(--plum-6)",
    "var(--plum-5)",
    "var(--plum-4)",
    "var(--plum-3)",
    "var(--plum-2)",
    "var(--plum-1)",
  ]

  const pinksColors = [
    "var(--pink-9)",
    "var(--pink-8)",
    "var(--pink-7)",
    "var(--pink-6)",
    "var(--pink-5)",
    "var(--pink-4)",
    "var(--pink-3)",
    "var(--pink-2)",
    "var(--pink-1)",
  ]

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
        {darkColors.map((color, index) => (
          <button
            key={`dark-${index}`}
            type="button"
            className="h-6 w-6 cursor-pointer rounded-sm transition-transform hover:scale-110"
            style={{ backgroundColor: `${color}` }}
            onClick={() => onColorSelect({ hex: color })}
            title={color}
          />
        ))}
      </div>

      <div className="flex justify-between">
        {colorGroups.map((group, groupIndex) => (
          <div key={`group-${groupIndex}`} className="flex flex-col gap-1">
            {group.map((color, colorIndex) => (
              <button
                key={`color-${groupIndex}-${colorIndex}`}
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
