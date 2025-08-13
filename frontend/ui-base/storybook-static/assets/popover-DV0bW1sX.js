import { r as c, m as O, j as s, R as Q, c as V, u as N, P as w, b as h, A as y, k as j, g as Z, D as B, C as J, p as X, Q as Y, U as A, t as ee, v as oe, T as re, l as te, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { P as ne, h as se, R as ae, u as ce, F as pe, __tla as __tla_1 } from "./index-ChItmDsK.js";
import { u as ie, __tla as __tla_2 } from "./index-CEOg2jVB.js";
import { u as le, __tla as __tla_3 } from "./index-DfrOcl7X.js";
import { r as E, __tla as __tla_4 } from "./require-react-element-D0otgQnF.js";
let G, H, q;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_1;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_3;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_4;
    } catch {
    }
  })()
]).then(async () => {
  var x = "Popover", [b, Fe] = V(x, [
    O
  ]), m = O(), [de, l] = b(x), D = (e) => {
    const { __scopePopover: r, children: o, open: a, defaultOpen: t, onOpenChange: n, modal: p = false } = e, i = m(r), v = c.useRef(null), [P, g] = c.useState(false), [C, d] = le({
      prop: a,
      defaultProp: t ?? false,
      onChange: n,
      caller: x
    });
    return s.jsx(Q, {
      ...i,
      children: s.jsx(de, {
        scope: r,
        contentId: ie(),
        triggerRef: v,
        open: C,
        onOpenChange: d,
        onOpenToggle: c.useCallback(() => d((R) => !R), [
          d
        ]),
        hasCustomAnchor: P,
        onCustomAnchorAdd: c.useCallback(() => g(true), []),
        onCustomAnchorRemove: c.useCallback(() => g(false), []),
        modal: p,
        children: o
      })
    });
  };
  D.displayName = x;
  var F = "PopoverAnchor", S = c.forwardRef((e, r) => {
    const { __scopePopover: o, ...a } = e, t = l(F, o), n = m(o), { onCustomAnchorAdd: p, onCustomAnchorRemove: i } = t;
    return c.useEffect(() => (p(), () => i()), [
      p,
      i
    ]), s.jsx(y, {
      ...n,
      ...a,
      ref: r
    });
  });
  S.displayName = F;
  var T = "PopoverTrigger", I = c.forwardRef((e, r) => {
    const { __scopePopover: o, ...a } = e, t = l(T, o), n = m(o), p = N(r, t.triggerRef), i = s.jsx(w.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": t.open,
      "aria-controls": t.contentId,
      "data-state": z(t.open),
      ...a,
      ref: p,
      onClick: h(e.onClick, t.onOpenToggle)
    });
    return t.hasCustomAnchor ? i : s.jsx(y, {
      asChild: true,
      ...n,
      children: i
    });
  });
  I.displayName = T;
  var _ = "PopoverPortal", [ue, fe] = b(_, {
    forceMount: void 0
  }), M = (e) => {
    const { __scopePopover: r, forceMount: o, children: a, container: t } = e, n = l(_, r);
    return s.jsx(ue, {
      scope: r,
      forceMount: o,
      children: s.jsx(j, {
        present: o || n.open,
        children: s.jsx(ne, {
          asChild: true,
          container: t,
          children: a
        })
      })
    });
  };
  M.displayName = _;
  var u = "PopoverContent", k = c.forwardRef((e, r) => {
    const o = fe(u, e.__scopePopover), { forceMount: a = o.forceMount, ...t } = e, n = l(u, e.__scopePopover);
    return s.jsx(j, {
      present: a || n.open,
      children: n.modal ? s.jsx(Pe, {
        ...t,
        ref: r
      }) : s.jsx(he, {
        ...t,
        ref: r
      })
    });
  });
  k.displayName = u;
  var ve = Z("PopoverContent.RemoveScroll"), Pe = c.forwardRef((e, r) => {
    const o = l(u, e.__scopePopover), a = c.useRef(null), t = N(r, a), n = c.useRef(false);
    return c.useEffect(() => {
      const p = a.current;
      if (p) return se(p);
    }, []), s.jsx(ae, {
      as: ve,
      allowPinchZoom: true,
      children: s.jsx(W, {
        ...e,
        ref: t,
        trapFocus: o.open,
        disableOutsidePointerEvents: true,
        onCloseAutoFocus: h(e.onCloseAutoFocus, (p) => {
          var _a;
          p.preventDefault(), n.current || ((_a = o.triggerRef.current) == null ? void 0 : _a.focus());
        }),
        onPointerDownOutside: h(e.onPointerDownOutside, (p) => {
          const i = p.detail.originalEvent, v = i.button === 0 && i.ctrlKey === true, P = i.button === 2 || v;
          n.current = P;
        }, {
          checkForDefaultPrevented: false
        }),
        onFocusOutside: h(e.onFocusOutside, (p) => p.preventDefault(), {
          checkForDefaultPrevented: false
        })
      })
    });
  }), he = c.forwardRef((e, r) => {
    const o = l(u, e.__scopePopover), a = c.useRef(false), t = c.useRef(false);
    return s.jsx(W, {
      ...e,
      ref: r,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      onCloseAutoFocus: (n) => {
        var _a, _b;
        (_a = e.onCloseAutoFocus) == null ? void 0 : _a.call(e, n), n.defaultPrevented || (a.current || ((_b = o.triggerRef.current) == null ? void 0 : _b.focus()), n.preventDefault()), a.current = false, t.current = false;
      },
      onInteractOutside: (n) => {
        var _a, _b;
        (_a = e.onInteractOutside) == null ? void 0 : _a.call(e, n), n.defaultPrevented || (a.current = true, n.detail.originalEvent.type === "pointerdown" && (t.current = true));
        const p = n.target;
        ((_b = o.triggerRef.current) == null ? void 0 : _b.contains(p)) && n.preventDefault(), n.detail.originalEvent.type === "focusin" && t.current && n.preventDefault();
      }
    });
  }), W = c.forwardRef((e, r) => {
    const { __scopePopover: o, trapFocus: a, onOpenAutoFocus: t, onCloseAutoFocus: n, disableOutsidePointerEvents: p, onEscapeKeyDown: i, onPointerDownOutside: v, onFocusOutside: P, onInteractOutside: g, ...C } = e, d = l(u, o), R = m(o);
    return ce(), s.jsx(pe, {
      asChild: true,
      loop: true,
      trapped: a,
      onMountAutoFocus: t,
      onUnmountAutoFocus: n,
      children: s.jsx(B, {
        asChild: true,
        disableOutsidePointerEvents: p,
        onInteractOutside: g,
        onEscapeKeyDown: i,
        onPointerDownOutside: v,
        onFocusOutside: P,
        onDismiss: () => d.onOpenChange(false),
        children: s.jsx(J, {
          "data-state": z(d.open),
          role: "dialog",
          id: d.contentId,
          ...R,
          ...C,
          ref: r,
          style: {
            ...C.style,
            "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
            "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
            "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
            "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
            "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
          }
        })
      })
    });
  }), $ = "PopoverClose", L = c.forwardRef((e, r) => {
    const { __scopePopover: o, ...a } = e, t = l($, o);
    return s.jsx(w.button, {
      type: "button",
      ...a,
      ref: r,
      onClick: h(e.onClick, () => t.onOpenChange(false))
    });
  });
  L.displayName = $;
  var me = "PopoverArrow", ge = c.forwardRef((e, r) => {
    const { __scopePopover: o, ...a } = e, t = m(o);
    return s.jsx(X, {
      ...t,
      ...a,
      ref: r
    });
  });
  ge.displayName = me;
  function z(e) {
    return e ? "open" : "closed";
  }
  var Ce = D, xe = S, Re = I, Ae = M, _e = k, Oe = L;
  let Ne, we, f;
  Ne = [
    "1",
    "2",
    "3",
    "4"
  ];
  we = {
    ...ee,
    size: {
      type: "enum",
      className: "rt-r-size",
      values: Ne,
      default: "2",
      responsive: true
    },
    width: A.width,
    minWidth: A.minWidth,
    maxWidth: {
      ...A.maxWidth,
      default: "480px"
    },
    ...Y
  };
  f = {
    Anchor: xe,
    Close: Oe,
    Root: Ce,
    Trigger: Re,
    Content: _e,
    Portal: Ae
  };
  G = (e) => s.jsx(f.Root, {
    ...e
  });
  G.displayName = "Popover.Root";
  H = c.forwardRef(({ children: e, ...r }, o) => s.jsx(f.Trigger, {
    ...r,
    ref: o,
    asChild: true,
    children: E(e)
  }));
  H.displayName = "Popover.Trigger";
  q = c.forwardRef((e, r) => {
    const { className: o, forceMount: a, container: t, ...n } = oe(e, we);
    return s.jsx(f.Portal, {
      container: t,
      forceMount: a,
      children: s.jsx(re, {
        asChild: true,
        children: s.jsx(f.Content, {
          align: "start",
          sideOffset: 8,
          collisionPadding: 10,
          ...n,
          ref: r,
          className: te("rt-PopperContent", "rt-PopoverContent", o)
        })
      })
    });
  });
  q.displayName = "Popover.Content";
  const K = c.forwardRef(({ children: e, ...r }, o) => s.jsx(f.Close, {
    ...r,
    ref: o,
    asChild: true,
    children: E(e)
  }));
  K.displayName = "Popover.Close";
  const U = c.forwardRef(({ children: e, ...r }, o) => s.jsx(f.Anchor, {
    ...r,
    ref: o
  }));
  U.displayName = "Popover.Anchor";
  G.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Popover.Root"
  };
  q.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Popover.Content",
    props: {
      container: {
        required: false,
        tsType: {
          name: 'ReactComponentPropsWithoutRef["container"]',
          raw: `React.ComponentPropsWithoutRef<
  typeof PopoverPrimitive.Portal
>["container"]`
        },
        description: ""
      }
    },
    composes: [
      "ComponentPropsWithout",
      "PopoverContentOwnProps"
    ]
  };
  H.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Popover.Trigger",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  K.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Popover.Close",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  U.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Popover.Anchor"
  };
});
export {
  G as P,
  __tla,
  H as a,
  q as b
};
