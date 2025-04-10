import * as React from "react";
import { Command, Popover } from "@/components/base";
declare const FacetedFilter: typeof Popover;
declare const FacetedFilterTrigger: React.ForwardRefExoticComponent<Omit<Popover.TriggerProps & React.RefAttributes<HTMLButtonElement>, "ref"> & React.RefAttributes<HTMLButtonElement>>;
declare const FacetedFilterContent: React.ForwardRefExoticComponent<Omit<Omit<Popover.ContentProps, "ref"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const FacetedFilterInput: ({ className, ...props }: React.ComponentProps<React.ForwardRefExoticComponent<Omit<Pick<Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof React.InputHTMLAttributes<HTMLInputElement>> & {
    ref?: React.Ref<HTMLInputElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React.InputHTMLAttributes<HTMLInputElement>>, "onChange" | "type" | "value"> & {
    value?: string;
    onValueChange?: (search: string) => void;
} & React.RefAttributes<HTMLInputElement>>>) => import("react/jsx-runtime").JSX.Element;
declare const FacetedFilterList: ({ className, ...props }: React.ComponentProps<React.ForwardRefExoticComponent<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    label?: string;
} & React.RefAttributes<HTMLDivElement>>>) => import("react/jsx-runtime").JSX.Element;
declare const FacetedFilterEmpty: ({ ...props }: React.ComponentProps<React.ForwardRefExoticComponent<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React.HTMLAttributes<HTMLDivElement>> & React.RefAttributes<HTMLDivElement>>>) => import("react/jsx-runtime").JSX.Element;
declare const FacetedFilterGroup: ({ className, ...props }: React.ComponentProps<React.ForwardRefExoticComponent<{
    children?: React.ReactNode;
} & Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React.HTMLAttributes<HTMLDivElement>>, "heading" | "value"> & {
    heading?: React.ReactNode;
    value?: string;
    forceMount?: boolean;
} & React.RefAttributes<HTMLDivElement>>>) => import("react/jsx-runtime").JSX.Element;
interface FacetedFilterItemProps extends React.ComponentPropsWithoutRef<typeof Command.Item> {
    selected: boolean;
}
declare const FacetedFilterItem: React.ForwardRefExoticComponent<FacetedFilterItemProps & React.RefAttributes<HTMLDivElement>>;
declare const FacetedFilterSeparator: ({ className, ...props }: React.ComponentProps<React.ForwardRefExoticComponent<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "asChild" | "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    alwaysRender?: boolean;
} & React.RefAttributes<HTMLDivElement>>>) => import("react/jsx-runtime").JSX.Element;
declare const FacetedFilterShortcut: ({ className, ...props }: React.ComponentProps<"span">) => import("react/jsx-runtime").JSX.Element;
export { FacetedFilter, FacetedFilterTrigger, FacetedFilterContent, FacetedFilterInput, FacetedFilterList, FacetedFilterEmpty, FacetedFilterGroup, FacetedFilterItem, FacetedFilterSeparator, FacetedFilterShortcut, };
//# sourceMappingURL=faceted-filter.d.ts.map