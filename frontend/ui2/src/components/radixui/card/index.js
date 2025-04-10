import { jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable react-refresh/only-export-components */
import { Card as RadixCard } from "@radix-ui/themes";
export { cardPropDefs } from "@radix-ui/themes/components/card.props";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/shadcn/card";
const CardContainer = ({ children, className = "", }) => {
    return (_jsx(RadixCard, { className: `bg-gray-2 p-6 ${className}`, children: children }));
};
export { CardContainer };
export const Card = {
    Root: RadixCard,
    Header: CardHeader,
    Title: CardTitle,
    Description: CardDescription,
    Content: CardContent,
    Footer: CardFooter,
};
//# sourceMappingURL=index.js.map