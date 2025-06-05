import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  Select,
  RadioGroup,
  Grid,
  Switch,
  CardContainer,
} from "@incmix/ui";
// import {ThemePanel} from "@radix-ui/themes"
import {
  useBaseThemeStore,
  RADIX_ACCENT_COLORS,
  RADIX_GRAY_COLORS,
  RADIX_RADIUS,
  // PANEL_BACKGROUND_OPTIONS,
  SCALING_OPTIONS,
  SIDEBAR_COLOR_OPTIONS,
} from "@hooks/useBaseThemeStore";
import { useTranslation } from "react-i18next";
const getColorBoxStyle = (color: string) => ({
  backgroundColor: `var(--${color}-9)`,
  width: "2rem",
  height: "2rem",
  borderRadius: "0.25rem",
  marginRight: "0.5rem",
});
export function ThemePlayground() {
  const { t } = useTranslation(["settings", "common"]);
  const appearance = useBaseThemeStore((state) => state.appearance);
  const toggleTheme = useBaseThemeStore((state) => state.toggleTheme);
  const theme = useBaseThemeStore();
  const setTheme = useBaseThemeStore((s) => s.setTheme);

  const SelectRow = (props: {
    label: string;
    value: string;
    options: string[];
    onChange: (v: string) => void;
  }) => (
    <>
      <Flex gap="4" align={"center"} justify={"between"}>
        <Text>{t(props.label)}</Text>
        <Select.Root value={props.value} onValueChange={props.onChange}>
          <Select.Trigger />
          <Select.Content>
            {props.options.map((opt) => (
              <Select.Item key={opt} value={opt} className="flex items-center ">
                {/* <Box style={getColorBoxStyle(opt)} size="2" /> */}
                <Text>{t(opt)}</Text>
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </Flex>
    </>
  );

  return (
    <CardContainer>
      <Heading size="4" mb="2" color="gray">
        {t("themeSettings")}
      </Heading>
      <Grid p="4" columns={"1"} gap={"2"}>
        <Flex align="center" justify="between">
          <Text>{t("darkMode")}</Text>
          <Switch
            checked={appearance === "dark"}
            onCheckedChange={toggleTheme}
          />
        </Flex>


        <Flex gap="4" align="center" justify="between">
          <Text>{t("Accent Color")}</Text>
          <Select.Root
            value={theme.accentColor}
            onValueChange={(v) => setTheme({ accentColor: v })}
          >
            <Select.Trigger />
            <Select.Content>
              {RADIX_ACCENT_COLORS.map((color) => (
                <Select.Item key={color} value={color}>
                  <Flex align="center" gap="2">
                    <Box
                      style={{
                        backgroundColor: `var(--${color}-9)`,
                        width: "1rem",
                        height: "1rem",
                        borderRadius: "0.25rem",
                      }}
                    />
                    <Text>{color}</Text>
                  </Flex>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>

        {/* <SelectRow
          label="Gray Color"
          value={theme.grayColor}
          options={[...RADIX_GRAY_COLORS]}
          onChange={(v) => setTheme({ grayColor: v })}
        /> */}
        <Flex gap="4" align="center" justify="between">
          <Text>{t("Gray Color")}</Text>
          <Select.Root
            value={theme.grayColor}
            onValueChange={(v) => setTheme({ grayColor: v })}
          >
            <Select.Trigger />
            <Select.Content>
              {RADIX_GRAY_COLORS.map((color) => (
                <Select.Item key={color} value={color}>
                  <Flex align="center" gap="2">
                    <Box
                      style={{
                        backgroundColor: `var(--${color}-9)`,
                        width: "1rem",
                        height: "1rem",
                        borderRadius: "0.25rem",
                      }}
                    />
                    <Text>{color}</Text>
                  </Flex>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>



        <SelectRow
          label="Border Radius"
          value={theme.radius}
          options={[...RADIX_RADIUS]}
          onChange={(v) => setTheme({ radius: v })}
        />

        <SelectRow
          label="Scaling"
          value={theme.scaling}
          options={[...SCALING_OPTIONS]}
          onChange={(v) => setTheme({ scaling: v })}
        />

        {/* <SelectRow
        label="Panel Background"
        value={theme.panelBackground}
        options={[...PANEL_BACKGROUND_OPTIONS]}
        onChange={(v) => setTheme({ panelBackground: v })}
      /> */}

        {/* Brand extensions */}
        {/* <SelectRow
          label="Sidebar Background"
          value={theme.sidebarBg}
          options={RADIX_ACCENT_COLORS.map((g) => `var(--${g}-9)`)}
          onChange={(v) => setTheme({ sidebarBg: v })}
        /> */}
        <Flex gap="4" align={"center"} justify={"between"}>
          <Text>{t("Sidebar")}</Text>
          <Select.Root
            value={theme.sidebarBg}
            onValueChange={(selectedBg) => {
              const matched = SIDEBAR_COLOR_OPTIONS.find(
                (opt) => opt.bg === selectedBg,
              );
              if (matched) {
                setTheme({
                  sidebarBg: matched.bg,
                  sidebarForground: matched.fg,
                  sidebarHover: matched.hover,
                });
              }
            }}
          >
            <Select.Trigger />
            <Select.Content>
              {SIDEBAR_COLOR_OPTIONS.map((opt) => (
                <Select.Item key={opt.bg} value={opt.bg}>
                  <div className="flex items-center gap-2">
                    <Box
                      style={{
                        backgroundColor: opt.bg,
                        width: "1rem",
                        height: "1rem",
                        borderRadius: "0.25rem",
                      }}
                    />
                    {/* <Text>{opt.bg.match(/--([a-z]+)-\d+/)?.[1] ?? "Unknown"}</Text> */}
                    <Text>{opt.bg.replace("var(--", "").replace(",", "")}</Text>
                  </div>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>

        <Flex gap="4" align="center" justify="between">
          <Text>{t("Dashboard Mono #1")}</Text>
          <Select.Root
            value={theme.dashboardMono1}
            onValueChange={(v) => setTheme({ dashboardMono1: v })}
          >
            <Select.Trigger />
            <Select.Content>
              {RADIX_ACCENT_COLORS.map((color) => (
                <Select.Item key={color} value={color}>
                  <Flex align="center" gap="2">
                    <Box
                      style={{
                        backgroundColor: `var(--${color}-9)`,
                        width: "1rem",
                        height: "1rem",
                        borderRadius: "0.25rem",
                      }}
                    />
                    <Text>{color}</Text>
                  </Flex>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
        </Flex>

        <SelectRow
          label="Dashboard Mono #2"
          value={theme.dashboardMono2}
          options={RADIX_ACCENT_COLORS.map((c) => `var(--${c}-9)`)}
          onChange={(v) => setTheme({ dashboardMono2: v })}
        />

        <SelectRow
          label="Dashboard Mono #3"
          value={theme.dashboardMono3}
          options={RADIX_GRAY_COLORS.map((g) => `var(--${g}-2)`)}
          onChange={(v) => setTheme({ dashboardMono3: v })}
        />

        {/* <Flex align={"center"} justify={"between"}>
          <Text mt="4" mb="1" size="2">
            Dashboard Multi 
          </Text>
          <Select.Root
            value={theme.dashboardMulti}
            onValueChange={(v) => setTheme({ dashboardMulti: v })}
          >
            <Select.Trigger />
            <Select.Content>
              {RADIX_ACCENT_COLORS.flatMap((from) =>
                RADIX_ACCENT_COLORS.map((to) => (
                  <Select.Item
                    key={`${from}-${to}`}
                    value={`linear-gradient(to right, var(--${from}-9), var(--${to}-9))`}
                  >
                    {`${from} → ${to}`}
                  </Select.Item>
                )),
              )}
            </Select.Content>
          </Select.Root>
        </Flex> */}

        {/* <ThemePanel accents={false} /> */}
      </Grid>
    </CardContainer>
  );
}
