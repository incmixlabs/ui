import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { twMerge } from "tailwind-merge";
import { mergeDeep } from "@/lib/utils/objects";
import { omit } from "@/lib/utils/objects/omit";
import { cardTheme } from "./flow-card-theme";
export const Image = ({ theme = {}, ...props }) => {
    const mergedTheme = mergeDeep(theme, cardTheme);
    if (props.renderImage) {
        return props.renderImage(mergedTheme, props.horizontal ?? false);
    }
    if (props.imgSrc) {
        const horizontalClass = theme?.img?.horizontal
            ? theme.img.horizontal[props.horizontal ? "on" : "off"]
            : "";
        return (_jsx("img", { "data-testid": "flowbite-card-image", alt: props.imgAlt ?? "", src: props.imgSrc, className: twMerge(theme?.img?.base, horizontalClass) }));
    }
    return null;
};
export const FlowCard = (props) => {
    const { children, className, horizontal, href, theme = {} } = props;
    const Component = typeof href === "undefined" ? "div" : "a";
    const theirProps = removeCustomProps(props);
    const customTheme = mergeDeep(theme, cardTheme);
    return (_jsxs(Component, { "data-testid": "flowbite-card", href: href, className: twMerge(customTheme.root.base, customTheme.root.horizontal[horizontal ? "on" : "off"], href && customTheme.root.href, className), ...theirProps, children: [_jsx(Image, { ...props }), _jsx("div", { className: customTheme.root.children, children: children })] }));
};
const removeCustomProps = omit([
    "renderImage",
    "imgSrc",
    "imgAlt",
    "children",
    "className",
    "horizontal",
    "href",
    "theme",
]);
export default FlowCard;
//# sourceMappingURL=flow-card.js.map