import { createElement as _createElement } from "react";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { mergeDeep } from "@/lib/utils/objects";
/* eslint-disable react-refresh/only-export-components */
import { DropdownMenu as RadixDropdownMenu } from "@radix-ui/themes";
export { dropdownMenuContentPropDefs, dropdownMenuItemPropDefs, dropdownMenuCheckboxItemPropDefs, dropdownMenuRadioItemPropDefs, } from "@radix-ui/themes/src/components/dropdown-menu.props.js";
import { Button, buttonPropDefs } from "./button/button";
export const dropdownButtonPropDefs = mergeDeep(buttonPropDefs, {});
const size = {
    ...dropdownButtonPropDefs.size,
    values: ["1", "2"],
};
const variants = dropdownButtonPropDefs.variant;
variants.values = ["solid", "soft"];
const colors = dropdownButtonPropDefs.color;
const highContrast = dropdownButtonPropDefs.highContrast;
export const dropdownContentPropDefs = {
    size: size,
    variant: variants,
    color: colors,
    highContrast: highContrast,
};
export const dropdownItemPropDefs = {
    asChild: { type: "boolean", default: false },
    color: colors,
};
export const DropdownMenuItem = ({ label, separator, children, ...props }) => {
    return (_jsxs(_Fragment, { children: [children ? (_jsxs(RadixDropdownMenu.Sub, { children: [_jsx(RadixDropdownMenu.SubTrigger, { children: label }), _jsx(RadixDropdownMenu.SubContent, { children: children.map((item, index) => (_createElement(DropdownMenuItem, { ...item, key: index }))) })] })) : (_jsx(RadixDropdownMenu.Item, { ...props, children: label })), separator && _jsx(RadixDropdownMenu.Separator, {})] }));
};
export const DropdownMenuWrapper = ({ button = {}, trigger, content = {}, items, }) => {
    const { size, variant, color, highContrast } = content;
    const { label, icon = _jsx(RadixDropdownMenu.TriggerIcon, {}), ...buttonProps } = button;
    return (_jsxs(RadixDropdownMenu.Root, { children: [_jsx(RadixDropdownMenu.Trigger, { children: trigger ? (trigger) : (_jsxs(Button, { ...buttonProps, children: [label, icon] })) }), _jsx(RadixDropdownMenu.Content, { size: size, variant: variant, color: color, highContrast: highContrast, children: items.map((item, index) => (_createElement(DropdownMenuItem, { ...item, key: index }))) })] }));
};
export const DropdownMenu = RadixDropdownMenu;
//# sourceMappingURL=dropdown-menu.js.map