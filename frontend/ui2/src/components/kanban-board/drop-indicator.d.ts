import type { Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/types";
export type DropIndicatorProps = {
    /**
     * The `edge` to draw a drop indicator on.
     *
     * `edge` is required as for the best possible performance
     * outcome you should only render this component when it needs to do something
     *
     * @example {closestEdge && <DropIndicator edge={closestEdge} />}
     */
    edge: Edge;
    /**
     * `gap` allows you to position the drop indicator further away from the drop target.
     * `gap` should be the distance between your drop targets
     * a drop indicator will be rendered halfway between the drop targets
     * (the drop indicator will be offset by half of the `gap`)
     *
     * `gap` should be a valid CSS length.
     * @example "8px"
     * @example "var(--gap)"
     */
    gap?: string;
};
export declare function DropIndicator({ edge, gap }: DropIndicatorProps): import("react/jsx-runtime").JSX.Element;
export default DropIndicator;
//# sourceMappingURL=drop-indicator.d.ts.map