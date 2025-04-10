/* Returns `true` if a `Safari` browser.
 * Returns `true` if the browser is running on iOS (they are all Safari).
 * */
function once(func) {
    let executed = false;
    let result;
    return (...args) => {
        if (!executed) {
            executed = true;
            result = func(...args);
            return result;
        }
        return undefined;
    };
}
export const isSafari = once(function isSafari() {
    // @ts-ignore
    if (process?.env?.NODE_ENV === "test") {
        return false;
    }
    const { userAgent } = navigator;
    return userAgent.includes("AppleWebKit") && !userAgent.includes("Chrome");
});
//# sourceMappingURL=browser.js.map