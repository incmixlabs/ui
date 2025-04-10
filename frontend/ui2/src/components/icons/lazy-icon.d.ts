import type { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
declare const fallbackIconComp: import("react/jsx-runtime").JSX.Element;
interface IconProps extends Omit<LucideProps, "ref"> {
    name: keyof typeof dynamicIconImports;
    fallback?: typeof fallbackIconComp;
}
export declare const LazyIcon: ({ name, fallback, ...props }: IconProps) => import("react/jsx-runtime").JSX.Element;
export default LazyIcon;
//# sourceMappingURL=lazy-icon.d.ts.map