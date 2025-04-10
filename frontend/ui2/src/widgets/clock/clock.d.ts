import "react-clock/dist/Clock.css";
export { Clock as Icon } from "lucide-react";
import "./clock.css";
export type ClockSize = "1" | "2" | "3";
export type Clock = {
    city: string;
    timeZone: string;
};
export type ClockProps = {
    clocks?: Clock[];
    size?: ClockSize;
    flip?: boolean;
};
export type ClockOutput = Clock & {
    time: Date;
    date: string;
};
export declare function ClockWidget({ clocks, size, flip }: ClockProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=clock.d.ts.map