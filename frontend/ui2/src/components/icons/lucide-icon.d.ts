import { icons } from "lucide-react";
export type LucideIconName = keyof typeof icons;
export type LucideIconType = {
    name: LucideIconName;
    color?: string;
    size?: number;
};
export declare const LucideIcon: ({ name, color, size }: LucideIconType) => import("react/jsx-runtime").JSX.Element;
export type LucideIconCompType = typeof LucideIcon;
export default LucideIcon;
//# sourceMappingURL=lucide-icon.d.ts.map