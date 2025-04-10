/**
 * @see https://github.com/radix-ui/primitives/blob/main/packages/react/use-callback-ref/src/useCallbackRef.tsx
 */
/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */
declare function useCallbackRef<T extends (...args: never[]) => unknown>(callback: T | undefined): T;
export { useCallbackRef };
//# sourceMappingURL=use-callback-ref.d.ts.map