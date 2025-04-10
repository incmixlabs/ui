import { Command as CommandPrimitive } from "cmdk";
import * as React from "react";
import { Command } from "@/components/shadcn/command";
export interface Option {
    value: string;
    label: string;
    disable?: boolean;
    /** fixed option that can't be removed. */
    fixed?: boolean;
    /** Group the options by providing key. */
    [key: string]: string | boolean | undefined;
}
interface MultipleSelectorProps {
    value?: Option[];
    defaultOptions?: Option[];
    /** manually controlled options */
    options?: Option[];
    placeholder?: string;
    /** Loading component. */
    loadingIndicator?: React.ReactNode;
    /** Empty component. */
    emptyIndicator?: React.ReactNode;
    /** Debounce time for async search. Only work with `onSearch`. */
    delay?: number;
    /**
     * Only work with `onSearch` prop. Trigger search when `onFocus`.
     * For example, when user click on the input, it will trigger the search to get initial options.
     **/
    triggerSearchOnFocus?: boolean;
    /** async search */
    onSearch?: (value: string) => Promise<Option[]>;
    /**
     * sync search. This search will not showing loadingIndicator.
     * The rest props are the same as async search.
     * i.e.: creatable, groupBy, delay.
     **/
    onSearchSync?: (value: string) => Option[];
    onChange?: (options: Option[]) => void;
    /** Limit the maximum number of selected options. */
    maxSelected?: number;
    /** When the number of selected options exceeds the limit, the onMaxSelected will be called. */
    onMaxSelected?: (maxLimit: number) => void;
    /** Hide the placeholder when there are options selected. */
    hidePlaceholderWhenSelected?: boolean;
    disabled?: boolean;
    /** Group the options base on provided key. */
    groupBy?: string;
    className?: string;
    badgeClassName?: string;
    /**
     * First item selected is a default behavior by cmdk. That is why the default is true.
     * This is a workaround solution by add a dummy item.
     *
     * @reference: https://github.com/pacocoursey/cmdk/issues/171
     */
    selectFirstItem?: boolean;
    /** Allow user to create option when there is no option matched. */
    creatable?: boolean;
    /** Props of `Command` */
    commandProps?: React.ComponentPropsWithoutRef<typeof Command.Root>;
    /** Props of `CommandInput` */
    inputProps?: Omit<React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>, "value" | "placeholder" | "disabled">;
    /** hide the clear all button. */
    hideClearAllButton?: boolean;
}
export interface MultipleSelectorRef {
    selectedValue: Option[];
    input: HTMLInputElement;
    focus: () => void;
    reset: () => void;
}
declare function MultipleSelector({ value, onChange, placeholder, defaultOptions: arrayDefaultOptions, options: arrayOptions, delay, onSearch, onSearchSync, loadingIndicator, emptyIndicator, maxSelected, onMaxSelected, hidePlaceholderWhenSelected, disabled, groupBy, className, badgeClassName, selectFirstItem, creatable, triggerSearchOnFocus, commandProps, inputProps, hideClearAllButton, }: MultipleSelectorProps): import("react/jsx-runtime").JSX.Element;
declare namespace MultipleSelector {
    var displayName: string;
}
declare const MultipleSelectorWithMethods: typeof MultipleSelector & {
    getSelectedValue: (selected: Option[]) => Option[];
    focus: (inputRef: React.RefObject<HTMLInputElement>) => void;
    reset: (setSelected: React.Dispatch<React.SetStateAction<Option[]>>) => void;
};
export default MultipleSelectorWithMethods;
//# sourceMappingURL=multiple-selector.d.ts.map