export interface FlowCardImageTheme {
    base: string;
    horizontal?: {
        off: string;
        on: string;
    };
}
export interface FlowCardRootTheme extends FlowCardImageTheme {
    children: string;
    href: string;
}
export interface FlowCardTheme {
    root: FlowCardRootTheme;
    img: FlowCardImageTheme;
}
export declare const cardTheme: FlowCardTheme;
//# sourceMappingURL=flow-card-theme.d.ts.map