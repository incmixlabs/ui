import { createContext, useContext } from "react";
import invariant from "tiny-invariant";
export const BoardContext = createContext(null);
export function useBoardContext() {
    const value = useContext(BoardContext);
    invariant(value, "cannot find BoardContext provider");
    return value;
}
//# sourceMappingURL=board-context.js.map