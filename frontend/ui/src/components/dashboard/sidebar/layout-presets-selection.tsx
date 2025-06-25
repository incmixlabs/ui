import {
  Box,
  Button,
  cn,
  Flex,
  Grid,
  Heading,
  presetLayouts,
  useLayoutStore,
} from "@incmix/ui";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { useState } from "react";

  /**
   * Renders a section that displays a list of layout presets.
   *
   * The section can be expanded or collapsed by clicking on the button
   * that appears next to the section title. When the section is expanded,
   * it displays a grid of cards, each representing a layout preset. The
   * cards display the name of the preset and a preview image. When a card
   * is clicked, the corresponding preset is applied to the layout.
   *
   * The section also displays a button with a down arrow when it is
   * collapsed, and a button with an up arrow when it is expanded. The
   * button is used to toggle the expansion state of the section.
   */
export function LayoutPresetsSection() {
  const { activePresetId, applyPreset } = useLayoutStore();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      className={`bg-gray-1 p-2 mt-2 rounded-xl relative border border-gray-5
        ${
          isExpanded ? 'max-h-full' : 'max-h-20'
        }
        transition-all duration-300`}
    >
        <Flex justify="between" align="center">
        <Heading size="2" className="font-medium">
        Layout Presets
        </Heading>
        <Button
          variant="ghost"
          color="gray"
          onClick={() => setIsExpanded(!isExpanded)}
          className="hover:bg-transparent"
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}

          <span className="sr-only">
            {isExpanded ? "Collapse layout presets" : "Expand layout presets"}
          </span>
        </Button>
      </Flex>

      {isExpanded && (
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
            <Box className="relative mb-2  w-full overflow-hidden rounded-md border border-gray-8">
              <img
                src={preset.image || "/placeholder.svg"}
                alt={preset.name}
                className="h-full w-full object-cover"
              />
            </Box>
            <Box as="span" className="text-sm font-medium">{preset.name}</Box>
          </Box>
        ))}
      </Grid>
      )}
    </Box>
  );
}