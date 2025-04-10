import { Button } from "./button";
declare function Root({ className, ...props }: React.ComponentProps<"nav">): import("react/jsx-runtime").JSX.Element;
declare function Content({ className, ...props }: React.ComponentProps<"ul">): import("react/jsx-runtime").JSX.Element;
declare function Item({ ...props }: React.ComponentProps<"li">): import("react/jsx-runtime").JSX.Element;
type PaginationLinkProps = {
    isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> & React.ComponentProps<"a">;
declare function Link({ className, isActive, size, ...props }: PaginationLinkProps): import("react/jsx-runtime").JSX.Element;
declare function Previous({ className, ...props }: React.ComponentProps<typeof Link>): import("react/jsx-runtime").JSX.Element;
declare function Next({ className, ...props }: React.ComponentProps<typeof Link>): import("react/jsx-runtime").JSX.Element;
declare function Ellipsis({ className, ...props }: React.ComponentProps<"span">): import("react/jsx-runtime").JSX.Element;
export declare const Pagination: {
    Root: typeof Root;
    Content: typeof Content;
    Link: typeof Link;
    Item: typeof Item;
    Previous: typeof Previous;
    Next: typeof Next;
    Ellipsis: typeof Ellipsis;
};
export {};
//# sourceMappingURL=pagination.d.ts.map