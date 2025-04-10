import { createContext, useContext } from "react";
import invariant from "tiny-invariant";
export const ColumnContext = createContext(null);
export function useColumnContext() {
    const value = useContext(ColumnContext);
    invariant(value, "cannot find ColumnContext provider");
    return value;
}
//# sourceMappingURL=column-context.js.map