import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Command as CommandPrimitive, useCommandState } from "cmdk";
import { X } from "lucide-react";
import * as React from "react";
import { useEffect } from "react";
import { Badge } from "@/components/radixui/badge";
import { Command } from "@/components/shadcn/command";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
function transToGroupOption(options, groupBy) {
    if (options.length === 0) {
        return {};
    }
    if (!groupBy) {
        return {
            "": options,
        };
    }
    const groupOption = {};
    options.forEach((option) => {
        const key = option[groupBy] || "";
        if (!groupOption[key]) {
            groupOption[key] = [];
        }
        groupOption[key].push(option);
    });
    return groupOption;
}
function removePickedOption(groupOption, picked) {
    const cloneOption = JSON.parse(JSON.stringify(groupOption));
    for (const [key, value] of Object.entries(cloneOption)) {
        cloneOption[key] = value.filter((val) => !picked.find((p) => p.value === val.value));
    }
    return cloneOption;
}
function isOptionsExist(groupOption, targetOption) {
    for (const [, value] of Object.entries(groupOption)) {
        if (value.some((option) => targetOption.find((p) => p.value === option.value))) {
            return true;
        }
    }
    return false;
}
/**
 * The `CommandEmpty` of shadcn/ui will cause the cmdk empty not rendering correctly.
 * So we create one and copy the `Empty` implementation from `cmdk`.
 *
 * @reference: https://github.com/hsuanyi-chou/shadcn-ui-expansions/issues/34#issuecomment-1949561607
 **/
function CommandEmpty({ className, ...props }) {
    const render = useCommandState((state) => state.filtered.count === 0);
    if (!render)
        return null;
    return (_jsx("div", { className: cn("py-6 text-center text-sm", className), "cmdk-empty": "", role: "presentation", ...props }));
}
CommandEmpty.displayName = "CommandEmpty";
function MultipleSelector({ value, onChange, placeholder, defaultOptions: arrayDefaultOptions = [], options: arrayOptions, delay, onSearch, onSearchSync, loadingIndicator, emptyIndicator, maxSelected = Number.MAX_SAFE_INTEGER, onMaxSelected, hidePlaceholderWhenSelected, disabled, groupBy, className, badgeClassName, selectFirstItem = true, creatable = false, triggerSearchOnFocus = false, commandProps, inputProps, hideClearAllButton = false, }) {
    const inputRef = React.useRef(null);
    const [open, setOpen] = React.useState(false);
    const [onScrollbar, setOnScrollbar] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const dropdownRef = React.useRef(null); // Added this
    const [selected, setSelected] = React.useState(value || []);
    const [options, setOptions] = React.useState(transToGroupOption(arrayDefaultOptions, groupBy));
    const [inputValue, setInputValue] = React.useState("");
    const debouncedSearchTerm = useDebounce(inputValue, delay || 500);
    // No useImperativeHandle needed, we'll expose methods directly on the component
    const handleClickOutside = (event) => {
        if (dropdownRef.current &&
            !dropdownRef.current.contains(event.target) &&
            inputRef.current &&
            !inputRef.current.contains(event.target)) {
            setOpen(false);
            inputRef.current.blur();
        }
    };
    const handleUnselect = React.useCallback((option) => {
        const newOptions = selected.filter((s) => s.value !== option.value);
        setSelected(newOptions);
        onChange?.(newOptions);
    }, [onChange, selected]);
    const handleKeyDown = React.useCallback((e) => {
        const input = inputRef.current;
        if (input) {
            if (e.key === "Delete" || e.key === "Backspace") {
                if (input.value === "" && selected.length > 0) {
                    const lastSelectOption = selected[selected.length - 1];
                    // If last item is fixed, we should not remove it.
                    if (!lastSelectOption.fixed) {
                        handleUnselect(selected[selected.length - 1]);
                    }
                }
            }
            // This is not a default behavior of the <input /> field
            if (e.key === "Escape") {
                input.blur();
            }
        }
    }, [handleUnselect, selected]);
    useEffect(() => {
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("touchend", handleClickOutside);
        }
        else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchend", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchend", handleClickOutside);
        };
    }, [open]);
    useEffect(() => {
        if (value) {
            setSelected(value);
        }
    }, [value]);
    useEffect(() => {
        /** If `onSearch` is provided, do not trigger options updated. */
        if (!arrayOptions || onSearch) {
            return;
        }
        const newOption = transToGroupOption(arrayOptions || [], groupBy);
        if (JSON.stringify(newOption) !== JSON.stringify(options)) {
            setOptions(newOption);
        }
    }, [arrayDefaultOptions, arrayOptions, groupBy, onSearch, options]);
    useEffect(() => {
        /** sync search */
        const doSearchSync = () => {
            const res = onSearchSync?.(debouncedSearchTerm);
            setOptions(transToGroupOption(res || [], groupBy));
        };
        const exec = () => {
            if (!onSearchSync || !open)
                return;
            if (triggerSearchOnFocus) {
                doSearchSync();
            }
            if (debouncedSearchTerm) {
                doSearchSync();
            }
        };
        void exec();
    }, [debouncedSearchTerm, groupBy, onSearchSync, open, triggerSearchOnFocus]);
    useEffect(() => {
        /** async search */
        const doSearch = async () => {
            setIsLoading(true);
            const res = await onSearch?.(debouncedSearchTerm);
            setOptions(transToGroupOption(res || [], groupBy));
            setIsLoading(false);
        };
        const exec = async () => {
            if (!onSearch || !open)
                return;
            if (triggerSearchOnFocus) {
                await doSearch();
            }
            if (debouncedSearchTerm) {
                await doSearch();
            }
        };
        void exec();
    }, [debouncedSearchTerm, groupBy, onSearch, open, triggerSearchOnFocus]);
    const CreatableItem = () => {
        if (!creatable)
            return undefined;
        if (isOptionsExist(options, [{ value: inputValue, label: inputValue }]) ||
            selected.find((s) => s.value === inputValue)) {
            return undefined;
        }
        const Item = (_jsx(Command.Item, { value: inputValue, className: "cursor-pointer", onMouseDown: (e) => {
                e.preventDefault();
                e.stopPropagation();
            }, onSelect: (value) => {
                if (selected.length >= maxSelected) {
                    onMaxSelected?.(selected.length);
                    return;
                }
                setInputValue("");
                const newOptions = [...selected, { value, label: value }];
                setSelected(newOptions);
                onChange?.(newOptions);
            }, children: `Create "${inputValue}"` }));
        // For normal creatable
        if (!onSearch && inputValue.length > 0) {
            return Item;
        }
        // For async search creatable. avoid showing creatable item before loading at first.
        if (onSearch && debouncedSearchTerm.length > 0 && !isLoading) {
            return Item;
        }
        return undefined;
    };
    const EmptyItem = React.useCallback(() => {
        if (!emptyIndicator)
            return undefined;
        // For async search that showing emptyIndicator
        if (onSearch && !creatable && Object.keys(options).length === 0) {
            return (_jsx(Command.Item, { value: "-", disabled: true, children: emptyIndicator }));
        }
        return _jsx(CommandEmpty, { children: emptyIndicator });
    }, [creatable, emptyIndicator, onSearch, options]);
    const selectables = React.useMemo(() => removePickedOption(options, selected), [options, selected]);
    /** Avoid Creatable Selector freezing or lagging when paste a long string. */
    const commandFilter = React.useCallback(() => {
        if (commandProps?.filter) {
            return commandProps.filter;
        }
        if (creatable) {
            return (value, search) => {
                return value.toLowerCase().includes(search.toLowerCase()) ? 1 : -1;
            };
        }
        // Using default filter in `cmdk`. We don't have to provide it.
        return undefined;
    }, [creatable, commandProps?.filter]);
    return (_jsxs(Command.Root, { ref: dropdownRef, ...commandProps, onKeyDown: (e) => {
            handleKeyDown(e);
            commandProps?.onKeyDown?.(e);
        }, className: cn("h-auto overflow-visible bg-transparent", commandProps?.className), shouldFilter: commandProps?.shouldFilter !== undefined
            ? commandProps.shouldFilter
            : !onSearch, filter: commandFilter(), children: [_jsx("div", { className: cn("min-h-10 rounded-md border border-input text-base ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 md:text-sm", {
                    "px-3 py-2": selected.length !== 0,
                    "cursor-text": !disabled && selected.length !== 0,
                }, className), onClick: () => {
                    if (disabled)
                        return;
                    inputRef?.current?.focus();
                }, children: _jsxs("div", { className: "relative flex flex-wrap gap-1", children: [selected.map((option) => {
                            return (_jsxs(Badge, { className: cn("data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground", "data-[fixed]:bg-muted-foreground data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground", badgeClassName), "data-fixed": option.fixed, "data-disabled": disabled || undefined, children: [option.label, _jsx("button", { type: "button", className: cn("ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2", (disabled || option.fixed) && "hidden"), onKeyDown: (e) => {
                                            if (e.key === "Enter") {
                                                handleUnselect(option);
                                            }
                                        }, onMouseDown: (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }, onClick: () => handleUnselect(option), children: _jsx(X, { className: "h-3 w-3 text-muted-foreground hover:text-foreground" }) })] }, option.value));
                        }), _jsx(CommandPrimitive.Input, { ...inputProps, ref: inputRef, value: inputValue, disabled: disabled, onValueChange: (value) => {
                                setInputValue(value);
                                inputProps?.onValueChange?.(value);
                            }, onBlur: (event) => {
                                if (!onScrollbar) {
                                    setOpen(false);
                                }
                                inputProps?.onBlur?.(event);
                            }, onFocus: (event) => {
                                setOpen(true);
                                inputProps?.onFocus?.(event);
                            }, placeholder: hidePlaceholderWhenSelected && selected.length !== 0
                                ? ""
                                : placeholder, className: cn("flex-1 bg-transparent outline-none placeholder:text-muted-foreground", {
                                "w-full": hidePlaceholderWhenSelected,
                                "px-3 py-2": selected.length === 0,
                                "ml-1": selected.length !== 0,
                            }, inputProps?.className) }), _jsx("button", { type: "button", onClick: () => {
                                setSelected(selected.filter((s) => s.fixed));
                                onChange?.(selected.filter((s) => s.fixed));
                            }, className: cn("absolute right-0 h-6 w-6 p-0", (hideClearAllButton ||
                                disabled ||
                                selected.length < 1 ||
                                selected.filter((s) => s.fixed).length === selected.length) &&
                                "hidden"), children: _jsx(X, {}) })] }) }), _jsx("div", { className: "relative", children: open && (_jsx(Command.List, { className: "absolute top-1 z-10 w-full animate-in rounded-md border bg-popover text-popover-foreground shadow-md outline-none", onMouseLeave: () => {
                        setOnScrollbar(false);
                    }, onMouseEnter: () => {
                        setOnScrollbar(true);
                    }, onMouseUp: () => {
                        inputRef?.current?.focus();
                    }, children: isLoading ? (_jsx(_Fragment, { children: loadingIndicator })) : (_jsxs(_Fragment, { children: [EmptyItem(), CreatableItem(), !selectFirstItem && (_jsx(Command.Item, { value: "-", className: "hidden" })), Object.entries(selectables).map(([key, dropdowns]) => (_jsx(Command.Group, { heading: key, className: "h-full overflow-auto", children: dropdowns.map((option) => {
                                    return (_jsx(Command.Item, { value: option.label, disabled: option.disable, onMouseDown: (e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }, onSelect: () => {
                                            if (selected.length >= maxSelected) {
                                                onMaxSelected?.(selected.length);
                                                return;
                                            }
                                            setInputValue("");
                                            const newOptions = [...selected, option];
                                            setSelected(newOptions);
                                            onChange?.(newOptions);
                                        }, className: cn("cursor-pointer", option.disable &&
                                            "cursor-default text-muted-foreground"), children: option.label }, option.value));
                                }) }, key)))] })) })) })] }));
}
// Add methods to the component
MultipleSelector.displayName = "MultipleSelector";
// Create a wrapper to expose methods
const MultipleSelectorWithMethods = Object.assign(MultipleSelector, {
    getSelectedValue: (selected) => [...selected],
    focus: (inputRef) => inputRef?.current?.focus(),
    reset: (setSelected) => setSelected([]),
});
export default MultipleSelectorWithMethods;
//# sourceMappingURL=multiple-selector.js.map