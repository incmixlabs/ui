/* Returns `true` if a `Safari` browser.
 * Returns `true` if the browser is running on iOS (they are all Safari).
 * */

function once<T extends (...args: any[]) => any>(
  func: T
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  let executed = false
  let result: ReturnType<T> | undefined

  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    if (!executed) {
      executed = true
      result = func(...args)
      return result
    }
    return undefined
  }
}
export const isSafari = once(function isSafari(): boolean {
  // @ts-ignore
  if (process?.env?.NODE_ENV === "test") {
    return false
  }

  const { userAgent } = navigator
  return userAgent.includes("AppleWebKit") && !userAgent.includes("Chrome")
})
