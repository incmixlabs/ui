import { useEffect, useState } from "react";
export function useRunOnce(callback, deps = []) {
    const [hasRun, setHasRun] = useState(false);
    useEffect(() => {
        if (!hasRun) {
            callback();
            setHasRun(true);
        }
    }, [hasRun, callback, ...deps]);
}
//# sourceMappingURL=use-run-once.js.map