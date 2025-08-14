export * as Context from '@radix-ui/react-context';
import { Primitive as BasePrimitive, dispatchDiscreteCustomEvent } from '@radix-ui/react-primitive';
export { composeRefs, useComposedRefs } from '@radix-ui/react-compose-refs';
export * as RovingFocus from '@radix-ui/react-roving-focus';
export {
  useControllableState,
  useControllableStateReducer,
} from '@radix-ui/react-use-controllable-state';
const Primitive = BasePrimitive as typeof BasePrimitive & {
  Root: typeof BasePrimitive;
  dispatchDiscreteCustomEvent: typeof dispatchDiscreteCustomEvent;
};
Primitive.dispatchDiscreteCustomEvent = dispatchDiscreteCustomEvent;
Primitive.Root = BasePrimitive;
export { Primitive };
function composeEventHandlers<E extends {
    defaultPrevented: boolean;
}>(originalEventHandler?: (event: E) => void, ourEventHandler?: (event: E) => void, options: {
    checkForDefaultPrevented?: boolean | undefined;
} = { checkForDefaultPrevented: true }): (event: E) => void {
  return function handleEvent(event: E) {
    originalEventHandler?.(event);
    if (!options.checkForDefaultPrevented || !event.defaultPrevented) {
      ourEventHandler?.(event);
    }
  };
}

export { composeEventHandlers };

/*
 Context,
  Primitive,
  useComposedRefs,
  RovingFocus,
  useControllableState */