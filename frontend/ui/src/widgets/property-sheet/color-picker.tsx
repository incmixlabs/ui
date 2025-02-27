interface CompactColorPickerProps {
  onColorSelect: (color: { hex: string }) => void
}

const CompactColorPicker = ({ onColorSelect }: CompactColorPickerProps) => {
  // Dark colors - displayed horizontally
  const darkColors = [
    "#000000",
    "#303030",
    "#474747",
    "#5E5E5E",
    "#757575",
    "#8C8C8C",
    "#A3A3A3",
    "#BABABA",
    "#D1D1D1",
    "#E8E8E8",
    "#FFFFFF",
  ]

  // Other color groups - displayed vertically
  const redsColors = [
    "#ff3b30",
    "#f4574c",
    "#f56c62",
    "#f78179",
    "#f8968f",
    "#f9aba5",
    "#fbc0bc",
    "#fcd5d2",
    "#fdeae8",
  ]

  const orangesColors = [
    "#ff9700",
    "#ffa21c",
    "#ffae38",
    "#ffb955",
    "#ffc571",
    "#ffd08d",
    "#ffdcaa",
    "#ffe7c6",
    "#fff3e2",
  ]

  const yeallowsColors = [
    "#ffea3b",
    "#ffec50",
    "#ffee66",
    "#fff17c",
    "#fff392",
    "#fff5a7",
    "#fff8bd",
    "#fffad3",
    "#fffce9",
  ]

  const leafColors = [
    "#4cb050",
    "#5fb863",
    "#73c176",
    "#87ca8a",
    "#9bd39d",
    "#afdbb1",
    "#c3e4c4",
    "#d7edd8",
    "#ebf6eb",
  ]

  const greensColors = [
    "#009788",
    "#1ca295",
    "#38aea2",
    "#55b9af",
    "#71c5bc",
    "#8dd0ca",
    "#aadcd7",
    "#c6e7e4",
    "#e2f3f1",
  ]

  const tealsColors = [
    "#00bcd4",
    "#1cc3d8",
    "#38cadd",
    "#55d2e2",
    "#71d9e7",
    "#8de1eb",
    "#aae8f0",
    "#c6f0f5",
    "#e2f7fa",
  ]

  const bluesColors = [
    "#2196f3",
    "#39a1f4",
    "#52adf5",
    "#6bb9f7",
    "#83c4f8",
    "#9cd0f9",
    "#b5dcfb",
    "#cde7fc",
    "#e6f3fd",
  ]

  const purple2Colors = [
    "#3f51b5",
    "#5464bd",
    "#6977c5",
    "#7f8bcd",
    "#949ed5",
    "#a9b1de",
    "#bfc5e6",
    "#d4d8ee",
    "#e9ebf6",
  ]

  const purpleColors = [
    "#673bb7",
    "#7750bf",
    "#8866c7",
    "#997ccf",
    "#aa92d7",
    "#bba7df",
    "#ccbde7",
    "#ddd3ef",
    "#eee9f7",
  ]

  const purplesColors = [
    "#9c28b1",
    "#a73fb9",
    "#b257c2",
    "#bd6fcb",
    "#c887d3",
    "#d39fdc",
    "#deb7e5",
    "#e9cfed",
    "#f4e7f6",
  ]

  const pinksColors = [
    "#ea1e63",
    "#ec3774",
    "#ee5085",
    "#f16997",
    "#f382a8",
    "#f59bb9",
    "#f8b4cb",
    "#facddc",
    "#fce6ed",
  ]

  // All vertical color groups
  const colorGroups = [
    redsColors,
    orangesColors,
    yeallowsColors,
    leafColors,
    greensColors,
    tealsColors,
    bluesColors,
    purple2Colors,
    purpleColors,
    purplesColors,
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
            style={{ backgroundColor: color }}
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
                style={{ backgroundColor: color }}
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
