export interface ColorSelectType {
    hex: string;
    name?: string;
}
interface CompactColorPickerProps {
    onColorSelect: (color: {
        hex: string;
        name?: string;
    }) => void;
    colorType?: "base" | "all";
    activeColor?: string;
}
export declare const ColorPicker: ({ onColorSelect, colorType, activeColor, }: CompactColorPickerProps) => import("react/jsx-runtime").JSX.Element;
export default ColorPicker;
//# sourceMappingURL=color-picker.d.ts.map