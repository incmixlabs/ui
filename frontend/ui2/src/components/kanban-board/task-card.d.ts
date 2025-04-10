import { type MutableRefObject } from "react";
import { type Edge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { type TCard } from "./types";
type TCardState = {
    type: "idle";
} | {
    type: "is-dragging";
} | {
    type: "is-dragging-and-left-self";
} | {
    type: "is-over";
    dragging: DOMRect;
    closestEdge: Edge;
} | {
    type: "preview";
    container: HTMLElement;
    dragging: DOMRect;
};
export declare function TaskCardShadow({ dragging }: {
    dragging: DOMRect;
}): import("react/jsx-runtime").JSX.Element;
export declare function TaskCardDisplay({ card, state, outerRef, innerRef, kanbanFilter, }: {
    card: TCard;
    state: TCardState;
    outerRef?: React.MutableRefObject<HTMLDivElement | null>;
    innerRef?: MutableRefObject<HTMLDivElement | null>;
    kanbanFilter?: boolean;
}): import("react/jsx-runtime").JSX.Element;
export declare function TaskCard({ card, columnId, kanbanFilter, }: {
    card: TCard;
    columnId: string;
    kanbanFilter: boolean;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=task-card.d.ts.map