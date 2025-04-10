import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { composeRefs } from "./use-compose-refs";
/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                       SLOTTABLE                            */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
const Slottable = ({ children }) => {
    return _jsx(_Fragment, { children: children });
};
function isSlottable(child) {
    return React.isValidElement(child) && child.type === Slottable;
}
//
/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                         SLOT                               */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
const Slot = React.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    const childrenArray = React.Children.toArray(children);
    const slottable = childrenArray.find(isSlottable);
    if (slottable) {
        // the new element to render is the one passed as a child of `Slottable`
        // @ts-ignore
        const newElement = slottable.props.children;
        const newChildren = childrenArray.map((child) => {
            if (child === slottable) {
                // because the new element will be the one rendered, we are only interested
                // in grabbing its children (`newElement.props.children`)
                if (React.Children.count(newElement) > 1) {
                    return React.Children.only(null);
                }
                return React.isValidElement(newElement)
                    ? // @ts-ignore
                        newElement.props.children
                    : null;
            }
            return child;
        });
        return (_jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: React.isValidElement(newElement)
                ? React.cloneElement(newElement, undefined, newChildren)
                : null }));
    }
    return (_jsx(SlotClone, { ...slotProps, ref: forwardedRef, children: children }));
});
Slot.displayName = "Slot";
/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                       SLOT CLONE                           */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
const SlotClone = React.forwardRef((props, forwardedRef) => {
    const { children, ...slotProps } = props;
    if (React.isValidElement(children)) {
        return React.cloneElement(children, {
            // @ts-ignore
            ...mergeProps(slotProps, children.props),
            // @ts-expect-error: No overload matches this call.
            ref: forwardedRef
                ? composeRefs(forwardedRef, children.ref)
                : children.ref,
        });
    }
    return React.Children.count(children) > 1 ? React.Children.only(null) : null;
});
SlotClone.displayName = "SlotClone";
//
//
/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                      MERGE PROPS                           */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/
function mergeProps(slotProps, childProps) {
    // all child props should override
    const overrideProps = { ...childProps };
    for (const propName in childProps) {
        const slotPropValue = slotProps[propName];
        const childPropValue = childProps[propName];
        const isHandler = /^on[A-Z]/.test(propName);
        if (isHandler) {
            // if the handler exists on both, we compose them
            if (slotPropValue && childPropValue) {
                overrideProps[propName] = (...args) => {
                    childPropValue(...args);
                    slotPropValue(...args);
                };
            }
            // but if it exists only on the slot, we use only this one
            else if (slotPropValue) {
                overrideProps[propName] = slotPropValue;
            }
        }
        // if it's `style`, we merge them
        else if (propName === "style") {
            overrideProps[propName] = { ...slotPropValue, ...childPropValue };
        }
        else if (propName === "className") {
            overrideProps[propName] = [slotPropValue, childPropValue]
                .filter(Boolean)
                .join(" ");
        }
    }
    return { ...slotProps, ...overrideProps };
}
const Root = Slot;
export { Slot, Slottable, Root };
//# sourceMappingURL=core-slot.js.map