import { Box,cn,Flex, Grid, Heading, presetLayouts, useLayoutStore } from '@incmix/ui'


export function LayoutPresetsSection() {
  const { activePresetId, applyPreset } = useLayoutStore()
  
  return (
    <Box className="mb-6">
      <Heading size={"4"} className="py-2  pt-5 ">Layout Presets</Heading>
      <Grid columns={"2"} className="pb-2" gap={"2"}>
        {presetLayouts.map((preset) => (
          <Box
            key={preset.id}
            className={`border border-gray-4 cursor-pointer  rounded-lg p-2 transition-all duration-200 ${
              activePresetId === preset.id
                ? "border-2 border-indigo-5 bg-indigo-5 dark:bg-indigo-8"
                : "border-2 border-transparent hover:bg-gray-5 dark:hover:bg-gray-4"
            }`}
            onClick={() => applyPreset(preset.id)}
          >
            <div className="relative mb-2  w-full overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
              <img src={preset.image || "/placeholder.svg"} alt={preset.name} className="h-full w-full object-cover" />
            </div>
            <span className="text-sm font-medium">{preset.name}</span>
          </Box>
        ))}
      </Grid>
    </Box>
  )
}