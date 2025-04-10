import { accentColors as radixAccentColors } from "@radix-ui/themes/src/props/color.prop.js";
export declare const dashboardColors: readonly ["color1", "color2", "color3", "color4", "color5"];
export declare const dashboardColorValues: {
    color1: string;
    color2: string;
    color3: string;
    color4: string;
    color5: string;
};
export declare const accentColors: readonly ["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"];
export declare const grayColors: readonly ["auto", "gray", "mauve", "slate", "sage", "olive", "sand"];
export declare const allColors: ("gray" | "gold" | "bronze" | "brown" | "yellow" | "amber" | "orange" | "tomato" | "red" | "ruby" | "crimson" | "pink" | "plum" | "purple" | "violet" | "iris" | "indigo" | "blue" | "cyan" | "teal" | "jade" | "green" | "grass" | "lime" | "mint" | "sky" | "auto" | "mauve" | "slate" | "sage" | "olive" | "sand" | "color1" | "color2" | "color3" | "color4" | "color5")[];
export declare const accentColorPropDef: {
    color: {
        type: "enum";
        values: readonly ["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"];
        default: (typeof radixAccentColors)[number];
    };
};
export declare const colorPropDef: {
    color: {
        type: "enum";
        values: readonly ["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"];
        default: (typeof radixAccentColors)[number] | undefined;
    };
};
export declare const accentColorEnums: { [K in AccentColor]: K; };
export declare const grayColorEnums: { [K in GrayColor]: K; };
export declare const dashboardColorEnums: { [K in DashboardColor]: K; };
export declare const allColorEnums: { [K in AccentColor]: K; };
export type AccentColor = (typeof accentColors)[number];
export type DashboardColor = (typeof dashboardColors)[number];
export type GrayColor = (typeof grayColors)[number];
export type Color = AccentColor | GrayColor;
//# sourceMappingURL=index.d.ts.map