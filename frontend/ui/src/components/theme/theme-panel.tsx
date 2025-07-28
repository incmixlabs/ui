import { useContext } from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Select,
  Grid,
  Switch,
  CardContainer,
} from "@radixui";
// import {ThemePanel} from "@radix-ui/themes"
import {
  RADIX_ACCENT_COLORS,
  RADIX_GRAY_COLORS,
  RADIX_RADIUS,
  // PANEL_BACKGROUND_OPTIONS,
  SCALING_OPTIONS,
  type RadixGrayColor,
  type RadixColor,
  type RadixRadius,
  type RadixScaling,
  breakFontColor,
} from "@incmix/utils/types";
import { ThemeContext } from "@radix-ui/themes";
import {
  useThemeStore,
  useAppearanceStore,
  SIDEBAR_COLOR_OPTIONS as BASE_SIDEBAR_COLOR_OPTIONS,
  extractColorName,
} from "@incmix/store/use-settings-store";

import { useTranslation } from "react-i18next";

const SelectRow = (props: {
  label: string;
  value: string;
  isNotColor?: boolean;
  isSolidColor?: boolean;
  options: string[];
  onChange: (v: string) => void;
}) => {
  const { t } = useTranslation(["settings", "common"]);

  return (
    <>
      <Flex gap="4" align={"center"} justify={"between"}>
        <Text>{t(props.label)}</Text>
        <Select.Root value={props.value} onValueChange={props.onChange}>
          <Select.Trigger />
          <Select.Content>
            {props.options.map((opt) => (
              <Select.Item key={opt} value={opt}>
                <Flex align="center" gap="2">
                  {props.isNotColor ? (
                    <Text>{opt}</Text>
                  ) : props.isSolidColor ? (
                    <>
                      <Box
                        style={{
                          backgroundColor: `var(--${opt}-9)`,
                          width: "1rem",
                          height: "1rem",
                          borderRadius: "0.25rem",
                        }}
                      />

                      <Text>{opt}</Text>
                    </>
                  ) : (
                    <>
                      <Box
                        style={{
                          backgroundColor: `${opt}`,
                          width: "1rem",
                          height: "1rem",
                          borderRadius: "0.25rem",
                        }}
                      />
                      <Text>
                        {/* {opt.match(/--([a-z]+)-\d+/)?.[1] ?? "Unknown"} */}
                        {extractColorName(opt)}
                      </Text>
                    </>
                  )}
                </Flex>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
    </>
  );
};

export function ThemePlayground() {
  const { t } = useTranslation(["settings", "common"]);
  const { appearance, toggleAppearance } = useAppearanceStore();
  const {
    accentColor,
    onAccentColorChange,
    grayColor,
    onGrayColorChange,
    radius,
    onRadiusChange,
    scaling,
    onScalingChange,
    sidebarBg,
    setTheme,
    dashboard,
    pastel,
    togglePastel,
  } = useThemeStore();
  const themeContext = useContext(ThemeContext);
  const SIDEBAR_COLOR_OPTIONS = [
    { bg: { color: "background", break: 0 } },
    ...BASE_SIDEBAR_COLOR_OPTIONS,
  ];
  
  return (
    <>
      <CardContainer>
        <Heading size="5" mb="2" color="gray" weight="regular">
          {t("themeSettings")}
        </Heading>
        <Grid p="2" columns={"1"} gap={"2"}>
          <Flex align="center" justify="between">
            <Text>{t("darkMode")}</Text>
            <Switch
              checked={appearance === "dark"}
              onCheckedChange={toggleAppearance}
            />
          </Flex>
          <SelectRow
            label="Accent Color"
            value={accentColor}
            isSolidColor={true}
            options={[...RADIX_ACCENT_COLORS]}
            onChange={(v) => {
              onAccentColorChange(v as RadixColor);
              themeContext?.onAccentColorChange(v as RadixColor);
            }}
          />
          <SelectRow
            label="Gray Color"
            value={grayColor}
            isSolidColor={true}
            options={[...RADIX_GRAY_COLORS]}
            onChange={(v) => {
              onGrayColorChange(v as RadixGrayColor);
              themeContext?.onGrayColorChange(v as RadixGrayColor);
            }}
          />
          <SelectRow
            label="Border Radius"
            value={radius}
            isNotColor={true}
            options={[...RADIX_RADIUS]}
            onChange={(v) => {
              onRadiusChange(v as RadixRadius);
              themeContext?.onRadiusChange(v as RadixRadius);
            }}
          />
          <SelectRow
            label="Scaling"
            value={scaling}
            isNotColor={true}
            options={[...SCALING_OPTIONS]}
            onChange={(v) => {
              onScalingChange(v as RadixScaling);
              themeContext?.onScalingChange(v as RadixScaling);
            }}
          />
          <Flex gap="4" align="center" justify="between">
            <Text>{t("Sidebar")}</Text>
            <Select.Root
              value={extractColorName(sidebarBg)}
              onValueChange={(selectedBg) => {
                // Directly set sidebarBg string (e.g. "var(--blue-10)")
                const getColor = SIDEBAR_COLOR_OPTIONS.find(
                  (opt) => opt.bg.color === selectedBg,
                );

                const bgColor = getColor?.bg.color as string;

                setTheme({
                  sidebarBg: `var(--${bgColor}-${getColor?.bg.break})`,
                });
              }}
            >
              <Select.Trigger />
              <Select.Content>
                {SIDEBAR_COLOR_OPTIONS.map((opt) => (
                  <Select.Item key={opt.bg.color} value={opt.bg.color}>
                    <div className="flex items-center gap-2">
                      <Box
                        style={{
                          backgroundColor: `var(--${opt.bg.color}-${opt.bg.break})`,
                          width: "1rem",
                          height: "1rem",
                          borderRadius: "0.25rem",
                        }}
                      />
                      <Text>{extractColorName(opt.bg.color)}</Text>
                    </div>
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>
        </Grid>
      </CardContainer>
      <CardContainer className="mt-3 p-4">
        <Heading size="5" mb="2" weight="regular">
          {t("Dashboard Colors")}
        </Heading>
        <Box className="p-1 space-y-2">
          <Flex align="center" justify="between">
            <Text>{t("Pastel Colors")}</Text>
            <Switch checked={pastel} onCheckedChange={togglePastel} />
          </Flex>
          <SelectRow
            label={t("Dashboard Color #1")}
            value={dashboard.color1.startsWith('var(') ? dashboard.color1 : `var(--${dashboard.color1}-9)`}
            options={RADIX_ACCENT_COLORS.map((c) => `var(--${c}-9)`)}
            onChange={(v) =>
              setTheme({ dashboard: { ...dashboard, color1: v as RadixColor } })
            }
          />

          <SelectRow
            label={t("Dashboard Color #2")}
            value={dashboard.color2.startsWith('var(') ? dashboard.color2 : `var(--${dashboard.color2}-9)`}
            options={RADIX_ACCENT_COLORS.map((c) => `var(--${c}-9)`)}
            onChange={(v) =>
              setTheme({ dashboard: { ...dashboard, color2: v as RadixColor } })
            }
          />

          <SelectRow
            label={t("Dashboard Color #3")}
            value={dashboard.color3.startsWith('var(') ? dashboard.color3 : `var(--${dashboard.color3}-9)`}
            options={RADIX_ACCENT_COLORS.map((c) => `var(--${c}-9)`)}
            onChange={(v) =>
              setTheme({ dashboard: { ...dashboard, color3: v as RadixColor } })
            }
          />
          <SelectRow
            label={t("Dashboard Color #4")}
            value={dashboard.color4.startsWith('var(') ? dashboard.color4 : `var(--${dashboard.color4}-9)`}
            options={RADIX_ACCENT_COLORS.map((c) => `var(--${c}-9)`)}
            onChange={(v) =>
              setTheme({ dashboard: { ...dashboard, color4: v as RadixColor } })
            }
          />
        </Box>
      </CardContainer>
    </>
  );
}
