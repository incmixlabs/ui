import * as React from "react";
export function useQueryString(searchParams) {
    const createQueryString = React.useCallback((params) => {
        const newSearchParams = new URLSearchParams(searchParams?.toString());
        for (const [key, value] of Object.entries(params)) {
            if (value === null) {
                newSearchParams.delete(key);
            }
            else {
                newSearchParams.set(key, String(value));
            }
        }
        return newSearchParams.toString();
    }, [searchParams]);
    return { createQueryString };
}
//# sourceMappingURL=use-query-string.js.map