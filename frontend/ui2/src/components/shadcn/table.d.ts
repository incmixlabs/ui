import type * as React from "react";
declare function Root({ className, ...props }: React.ComponentProps<"table">): import("react/jsx-runtime").JSX.Element;
declare function Header({ className, ...props }: React.ComponentProps<"thead">): import("react/jsx-runtime").JSX.Element;
declare function Body({ className, ...props }: React.ComponentProps<"tbody">): import("react/jsx-runtime").JSX.Element;
declare function Footer({ className, ...props }: React.ComponentProps<"tfoot">): import("react/jsx-runtime").JSX.Element;
declare function Row({ className, ...props }: React.ComponentProps<"tr">): import("react/jsx-runtime").JSX.Element;
declare function Head({ className, ...props }: React.ComponentProps<"th">): import("react/jsx-runtime").JSX.Element;
declare function Cell({ className, ...props }: React.ComponentProps<"td">): import("react/jsx-runtime").JSX.Element;
declare function Caption({ className, ...props }: React.ComponentProps<"caption">): import("react/jsx-runtime").JSX.Element;
export declare const Table: {
    Root: typeof Root;
    Header: typeof Header;
    Body: typeof Body;
    Footer: typeof Footer;
    RowHeaderCell: typeof Head;
    ColumnHeaderCell: typeof Head;
    Row: typeof Row;
    Cell: typeof Cell;
    Caption: typeof Caption;
};
export {};
//# sourceMappingURL=table.d.ts.map