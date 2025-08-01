import { Box, Button, Flex, Grid } from "@base";
import { useLayoutStore } from "../hooks/use-layout-store";
import { useState } from "react";
import { presetLayouts } from "../data";
import { Heading, Icon } from "@incmix/ui";

export function LayoutPresetsSection() {
  const { activePresetId, applyPreset } = useLayoutStore();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Box
      className={`bg-gray-1 p-2 mt-2 rounded-app relative border border-gray-5
        ${isExpanded ? "max-h-full" : "max-h-20"}
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
          {isExpanded ? <Icon name="ChevronUp" /> : <Icon name="ChevronDown" />}

          <span className="sr-only">
            {isExpanded ? "Collapse layout presets" : "Expand layout presets"}
          </span>
        </Button>
      </Flex>

      {isExpanded && (
        <Grid columns={"2"} className="pb-2" gap={"2"}>
          {presetLayouts().map((preset) => (
            <Box
              key={preset.id}
              className={`border border-gray-4 cursor-pointer  rounded-app p-2 transition-all duration-200 ${
                activePresetId === preset.id
                  ? "bg-indigo-5 dark:bg-indigo-8"
                  : "border-transparent "
              }`}
              onClick={() => applyPreset(preset.id)}
            >
              <Box className="relative mb-2 w-full overflow-hidden rounded-md">
                <img
                  src={preset.image || "/placeholder.svg"}
                  alt={preset.name}
                  className="h-full w-full object-cover"
                />
              </Box>
              <Box as="span" className="text-xs font-medium">
                {preset.name}
              </Box>
            </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
}
