const shades = [3, 4, 5, 6, 7, 8, 9, 10, 11] as const
export type Shade = (typeof shades)[number]
const accentColors = [
  "gold",
  "brown",
  "yellow",
  "orange",
  "red",
  "pink",
  "purple",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "green",
  "lime",
  "mint",
  "sky",
] as const

const grayColors = ["slate"] as const
import { Box, Flex, Grid, Text } from "./radix-ui"
export type GrayColor = (typeof grayColors)[number]
export type AccentColor = (typeof accentColors)[number]
export const paleColors = ["yellow", "amber", "mint", "sky", "lime"] as const
export const allColors = [...accentColors, "gray"] as const
export type AllColor = (typeof allColors)[number]
export { accentColors, grayColors, shades }
const shadeLength = shades.length.toString()

export function SwatchRow({ name }: { name: string }) {
  return (
    <Grid columns={shadeLength} gap="1">
      {[...shades].map((shade, i) => (
        <Box
          height="32px"
          style={{
            backgroundColor: `var(--${name}-${shade})`,
            borderRadius: "var(--radius-2)",
          }}
          key={i}
        />
      ))}
    </Grid>
  )
}

export function ThemesColorScale({ color }: { color: AllColor }) {
  const shadeRanges =
    color === "gray" ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : [...shades]
  return (
    <>
      <Flex direction={{ sm: "column" }} gap="2">
        <Flex
          direction={{ initial: "column", sm: "row" }}
          align={{ sm: "center" }}
          gap="1"
          flexGrow="1"
        >
          {[...shadeRanges].map((shade, i) => {
            let textColor =
              shade < 9 ? "var(--color-black)" : "var(--color-white"
            if (["yellow", "amber", "mint", "sky", "lime"].includes(color)) {
              if (shade < 11) {
                textColor = "var(--color-black)"
              }
            }
            return (
              <Flex flexGrow="1" direction={{ sm: "column" }} gap="1" key={i}>
                <Box
                  flexGrow="1"
                  height="100px"
                  style={{
                    backgroundColor: `var(--${color}-${shade})`,
                    borderRadius: "var(--radius-1)",
                  }}
                >
                  <Text
                    size="3"
                    className="rt-vertical-text m-5 inline-flex justify-center"
                    style={{ color: textColor }}
                  >
                    {`${color}-${shade}`}
                  </Text>
                </Box>
              </Flex>
            )
          })}
        </Flex>

        <Flex
          minWidth="24px"
          direction={{ initial: "column", sm: "row" }}
          align={{ sm: "center" }}
          gap="1"
        >
          {[...shades].map((_, i) => (
            <Flex
              align="center"
              justify="center"
              height="100%"
              width="100%"
              key={i}
            >
              <Text size="1" color="gray">
                {i + 1}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </>
  )
}

export function ThemesAccentSwatches() {
  return (
    <Flex direction="column" gap="5">
      <Grid columns={{ initial: "4", xs: "6", sm: "9" }} gapX="1" gapY="3">
        {accentColors.map((color, i) => (
          <Box flexGrow="1" key={i}>
            <Box
              mb="1"
              height="36px"
              style={{
                backgroundColor: `var(--${color}-9)`,
                borderRadius: "var(--radius-1)",
              }}
            />
            <Text as="div" size="1" color="gray">
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Text>
          </Box>
        ))}
      </Grid>
    </Flex>
  )
}

export function ThemeGraySwatches() {
  return (
    <Flex direction="column" gap="5">
      <Grid columns={{ initial: "4", xs: "6", sm: "9" }} gapX="1" gapY="3">
        {(["gray", "mauve", "slate", "sage", "olive", "sand"] as const).map(
          (color, i) => (
            <Box flexGrow="1" key={i}>
              <Box
                mb="1"
                height="48px"
                style={{
                  backgroundColor: `var(--${color}-9)`,
                  borderRadius: "var(--radius-1)",
                  filter: color === "gray" ? "saturate(0)" : undefined,
                }}
              />
              <Text as="div" size="1" color="gray">
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </Text>
            </Box>
          )
        )}
      </Grid>
    </Flex>
  )
}
