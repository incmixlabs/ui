import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Theme, ThemesColorScale,ThemesAccentSwatches, allColors, grayColors, type AccentColor, type GrayColor } from "../../src/1base";

const meta: Meta<typeof Theme> = {
  title: "1 Base/Theme",
  component: Theme,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div style={{ width: "100%", maxWidth: "800px", padding: "20px" }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    accentColor: {
      control: "select",
      options: allColors,
      description: "Accent color",
    },
    accentColor2: {
      control: "select",
      options: allColors,
      description: "Accent color2",
    },
    grayColor: {
      control: "select",
      options: grayColors,
      description: "Theme gray color",
    },
    appearance: {
      control: "select",
      options: ["light", "dark", "inherit"],
      description: "Theme appearance",
    },
    panelBackground: {
      control: "select",
      options: ["solid", "translucent"],
      description: "Panel background style",
    },
    radius: {
      control: "select",
      options: ["none", "small", "medium", "large", "full"],
      description: "Border radius scale",
    },
    scaling: {
      control: "select",
      options: ["90%", "95%", "100%", "105%", "110%"],
      description: "UI scaling",
    },
  },
  args: {
    accentColor: "blue",
    grayColor: "gray",
    appearance: "light",
    panelBackground: "translucent",
    radius: "medium",
    scaling: "100%",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default theme showcase
export const Default: Story = {
  render: (args) => (
    <Theme
      accentColor={args.accentColor}
      grayColor={args.grayColor}
      appearance={args.appearance}
      panelBackground={args.panelBackground}
      radius={args.radius}
      scaling={args.scaling}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
         <div>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}>
              Accent Colors
            </h3>

          <ThemesAccentSwatches />
        </div>
        <div>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}>
            Accent Colors Scale ({args.accentColor})
          </h3>
          <ThemesColorScale color={args.accentColor} />
        </div>
        <div>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}>
            Accent Colors Scale ({args.accentColor2??"yellow"})
          </h3>
          <ThemesColorScale color={args.accentColor2??"yellow"} />
        </div>
        <div>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}>
            Gray Colors Scale ({args.grayColor})
          </h3>
          <ThemesColorScale color={args.grayColor} />
        </div>
      </div>
    </Theme>
  ),
};

// Accent color variations
export const AccentColorShowcase: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {allColors.slice(0, 6).map((color) => (
          <div>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600", textTransform: "capitalize" }}>
              {color} Accent Color
            </h3>
            <ThemesColorScale color={color} />
          </div>
      ))}
    </div>
  ),
};

// Gray color variations
export const GrayColorShowcase: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {grayColors.map((color) => (
        <>
            <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600", textTransform: "capitalize" }}>
              {color} Gray Color
            </h3>
            <ThemesColorScale color="gray" />
        </>
      ))}
    </div>
  ),
};

// Interactive color picker
export const InteractiveColorPicker: Story = {
  render: () => {
    const [selectedAccentColor, setSelectedAccentColor] = React.useState<AccentColor>("blue");
    const [selectedGrayColor, setSelectedGrayColor] = React.useState<GrayColor>("gray");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
              Accent Color:
            </label>
            <select
              value={selectedAccentColor}
              onChange={(e) => setSelectedAccentColor(e.target.value as AccentColor)}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            >
              {allColors.map((color) => (
                <option key={color} value={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
              Gray Color:
            </label>
            <select
              value={selectedGrayColor}
              onChange={(e) => setSelectedGrayColor(e.target.value as GrayColor)}
              style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
            >
              {grayColors.map((color) => (
                <option key={color} value={color}>
                  {color.charAt(0).toUpperCase() + color.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}>
                Accent Colors ({selectedAccentColor})
              </h3>
              <ThemesColorScale color={selectedAccentColor} />
            </div>

            <div>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}>
                Gray Colors ({selectedGrayColor})
              </h3>
              <ThemesColorScale color={selectedGrayColor} />
            </div>
          </div>
      </div>
    );
  },
};

// Popular color combinations
export const PopularColorCombinations: Story = {
  render: () => {
    const combinations = [
      { accent: "blue" as AccentColor, gray: "slate" as GrayColor, name: "Modern Blue" },
      { accent: "green" as AccentColor, gray: "sage" as GrayColor, name: "Natural Green" },
      { accent: "purple" as AccentColor, gray: "mauve" as GrayColor, name: "Royal Purple" },
      { accent: "orange" as AccentColor, gray: "sand" as GrayColor, name: "Warm Orange" },
      { accent: "red" as AccentColor, gray: "gray" as GrayColor, name: "Classic Red" },
      { accent: "teal" as AccentColor, gray: "slate" as GrayColor, name: "Ocean Teal" },
    ];

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
        {combinations.map((combo) => (
          <Theme key={combo.name} accentColor={combo.accent} grayColor={combo.gray}>
            <div>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "18px", fontWeight: "600" }}>
                {combo.name} ({combo.accent} + {combo.gray})
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500", color: "#666" }}>
                    Accent Scale
                  </h4>
                  <ThemesColorScale color={combo.accent} />
                </div>
                <div>
                  <h4 style={{ margin: "0 0 8px 0", fontSize: "14px", fontWeight: "500", color: "#666" }}>
                    Gray Scale
                  </h4>
                  <ThemesColorScale color={combo.gray} />
                </div>
              </div>
            </div>
          </Theme>
        ))}
      </div>
    );
  },
};

// Light vs Dark appearance comparison
export const AppearanceComparison: Story = {
  render: () => {
    const [selectedColor, setSelectedColor] = React.useState<AccentColor>("blue");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
        <div>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "500" }}>
            Select Accent Color:
          </label>
          <select
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value as AccentColor)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          >
            {allColors.slice(0, 12).map((color) => (
              <option key={color} value={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", border: "1px solid #ddd", borderRadius: "8px", overflow: "hidden" }}>
          <Theme appearance="light" accentColor={selectedColor}>
            <div style={{ padding: "20px", backgroundColor: "var(--color-background)" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600", color: "var(--gray-12)" }}>
                Light Appearance
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <ThemesColorScale color={selectedColor} />
                <ThemesColorScale color="gray" />
              </div>
            </div>
          </Theme>

          <Theme appearance="dark" accentColor={selectedColor}>
            <div style={{ padding: "20px", backgroundColor: "var(--color-background)" }}>
              <h3 style={{ margin: "0 0 16px 0", fontSize: "16px", fontWeight: "600", color: "var(--gray-12)" }}>
                Dark Appearance
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <ThemesColorScale color={selectedColor} />
                <ThemesColorScale color="gray" />
              </div>
            </div>
          </Theme>
        </div>
      </div>
    );
  },
};

// All accent colors grid
export const AllAccentColorsGrid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "16px" }}>
      {allColors.map((color) => (
        <Theme key={color} accentColor={color}>
          <div style={{ padding: "16px", border: "1px solid #e0e0e0", borderRadius: "8px" }}>
            <h4 style={{ margin: "0 0 12px 0", fontSize: "14px", fontWeight: "600", textTransform: "capitalize" }}>
              {color}
            </h4>
            <ThemesColorScale color={color} />
          </div>
        </Theme>
      ))}
    </div>
  ),
};
