export { cardPropDefs } from "@radix-ui/themes/components/card.props";
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/shadcn/card";
interface CardContainerProps {
    children: React.ReactNode;
    className?: string;
}
declare const CardContainer: React.FC<CardContainerProps>;
export { CardContainer };
export declare const Card: {
    Root: import("react").ForwardRefExoticComponent<import("@radix-ui/themes").CardProps & import("react").RefAttributes<HTMLDivElement>>;
    Header: typeof CardHeader;
    Title: typeof CardTitle;
    Description: typeof CardDescription;
    Content: typeof CardContent;
    Footer: typeof CardFooter;
};
//# sourceMappingURL=index.d.ts.map