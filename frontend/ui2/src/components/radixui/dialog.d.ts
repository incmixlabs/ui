import { Dialog as RadixDialog } from "@radix-ui/themes";
declare function Footer({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
declare function Header({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare const Dialog: {
    Root: import("react").FC<RadixDialog.RootProps>;
    Trigger: import("react").ForwardRefExoticComponent<RadixDialog.TriggerProps & import("react").RefAttributes<HTMLButtonElement>>;
    Content: import("react").ForwardRefExoticComponent<Omit<RadixDialog.ContentProps, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
    Title: import("react").ForwardRefExoticComponent<RadixDialog.TitleProps & import("react").RefAttributes<HTMLHeadingElement>>;
    Description: import("react").ForwardRefExoticComponent<RadixDialog.DescriptionProps & import("react").RefAttributes<HTMLParagraphElement>>;
    Close: import("react").ForwardRefExoticComponent<RadixDialog.CloseProps & import("react").RefAttributes<HTMLButtonElement>>;
    Footer: typeof Footer;
    Header: typeof Header;
};
export { dialogContentPropDefs } from "@radix-ui/themes/src/components/dialog.props.js";
//# sourceMappingURL=dialog.d.ts.map