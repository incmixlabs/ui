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
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function LayoutPresetsSection() {
  const { activePresetId, applyPreset } = useLayoutStore();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box
      className={`bg-gray-1 p-2 mt-4 rounded-xl relative border border-gray-5 transition-all duration-300 ${isExpanded ? "h-fit " : "h-52 overflow-hidden"}`}
    >
      {!isExpanded &&
      <Box className="-bottom-2 absolute left-0 h-28 w-full bg-gradient-to-t from-gray-1"></Box>
      }
      <Flex justify="between" align="center">
        <Heading size="2" className="mb-2 font-medium">
          Layout Presets
        </Heading>
        <Button
          variant="ghost"
          color="gray"
          onClick={() => setIsExpanded(!isExpanded)} // Toggle expanded state
          className="hover:bg-transparent"
        >
          <ChevronDown
            className={cn(
              "transition-transform duration-300",
              isExpanded && "transform rotate-180", // Rotate icon when expanded
            )}
          />
          <Box as="span" className="sr-only">
            {isExpanded ? "Collapse templates" : "Expand templates"}
          </Box>
        </Button>
      </Flex>
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
    </Box>
  );
}
