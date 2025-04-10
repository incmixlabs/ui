import { icons } from "lucide-react";
export type IconType = {
    name: keyof typeof icons;
    color: string;
    size: number;
};
export declare const Icon: ({ name, color, size }: IconType) => import("react/jsx-runtime").JSX.Element;
export default Icon;
export declare const iconSize = "w-4 h-4";
//# sourceMappingURL=icon.d.ts.map