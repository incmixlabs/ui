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
import {
  useBaseThemeStore,
  RADIX_ACCENT_COLORS,
  RADIX_GRAY_COLORS,
  RADIX_RADIUS,
  // PANEL_BACKGROUND_OPTIONS,
  SCALING_OPTIONS,
} from "@hooks/useBaseThemeStore";
import { useTranslation } from "react-i18next";
const getColorBoxStyle = (color: string) => ({
  backgroundColor: `var(--${color}-9)`,
  width: '1rem',
  height: '1rem',
  borderRadius: '0.25rem',
  marginRight: '0.5rem',
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
        <Text >
          {t(props.label)}
        </Text>
        <Select.Root value={props.value} onValueChange={props.onChange}>
          <Select.Trigger/>
          <Select.Content>
            {props.options.map((opt) => (
              <Select.Item key={opt} value={opt} className="flex items-center ">
                {/* <Box style={getColorBoxStyle(opt)} /> */}
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
        <SelectRow
          label="Accent Color"
          value={theme.accentColor}
          options={[...RADIX_ACCENT_COLORS]}
          onChange={(v) => setTheme({ accentColor: v })}
        />

        <SelectRow
          label="Gray Color"
          value={theme.grayColor}
          options={[...RADIX_GRAY_COLORS]}
          onChange={(v) => setTheme({ grayColor: v })}
        />

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
        <SelectRow
          label="Sidebar Background"
          value={theme.sidebarBg}
          options={RADIX_ACCENT_COLORS.map((g) => `var(--${g}-9)`)}
          onChange={(v) => setTheme({ sidebarBg: v })}
        />

        <SelectRow
          label="Secondary Sidebar Background"
          value={theme.secondarySidebarBg}
          options={RADIX_GRAY_COLORS.map((g) => `var(--${g}-2)`)}
          onChange={(v) => setTheme({ secondarySidebarBg: v })}
        />

        <SelectRow
          label="Dashboard Mono #1"
          value={theme.dashboardMono1}
          options={RADIX_ACCENT_COLORS.map((c) => `var(--${c}-9)`)}
          onChange={(v) => setTheme({ dashboardMono1: v })}
        />

        <SelectRow
          label="Dashboard Mono #2"
          value={theme.dashboardMono2}
          options={RADIX_ACCENT_COLORS.map((c) => `var(--${c}-9)`)}
          onChange={(v) => setTheme({ dashboardMono2: v })}
        />

        <Flex align={"center"} justify={"between"}>
          {/* Gradient builder – Cartesian product of accents */}
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
        </Flex>

        {/* <ThemePanel accents={false} /> */}
      </Grid>
    </CardContainer>
  );
}
