import type { BadgeProps } from "@radix-ui/themes";
export type ExtendedColorType = BadgeProps["color"] | "blue";
/**
 * Props for MultiSelect component
 */
interface MultiSelectProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * An array of option objects to be displayed in the multi-select component.
     * Each option object has a label, value, and an optional icon.
     */
    options: {
        /** The text to display for the option. */
        label: string;
        /** The unique value associated with the option. */
        value: string;
        /** Optional icon component to display alongside the option. */
        icon?: React.ComponentType<{
            className?: string;
        }>;
        avatar?: string;
        color?: ExtendedColorType | string;
        disable?: boolean;
    }[];
    /**
     * Callback function triggered when the selected values change.
     * Receives an array of the new selected values.
     */
    onValueChange: (value: string[]) => void;
    /** The default selected values when the component mounts. */
    defaultValue?: string[];
    /**
     * Placeholder text to be displayed when no values are selected.
     * Optional, defaults to "Select options".
     */
    placeholder?: string;
    popoverClass?: string;
    addNewLabel?: boolean;
    title?: string;
    formRef?: React.RefObject<HTMLFormElement>;
    isLabelFormOpen?: boolean;
    setIsLabelFormOpen?: (isLabelFormOpen: boolean) => void;
    labelColor?: string;
    setLabelColor?: (labelColor: ExtendedColorType) => void;
    handleAddNewLabel?: (e: React.FormEvent) => void;
}
export declare const ComboBox: import("react").ForwardRefExoticComponent<MultiSelectProps & import("react").RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=combo-box.d.ts.map