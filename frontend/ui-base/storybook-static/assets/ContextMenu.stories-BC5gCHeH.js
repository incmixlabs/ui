import { r as i, e as ge, j as e, c as Ie, P as fe, b as P, K as be, v as L, T as F, l as I, L as W, a as u, F as je, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { c as $, R as Re, A as ye, P as Se, C as Te, I as ve, S as Pe, a as we, b as Ne, d as _e, G as ke, L as Be, e as Ae, f as Ee, g as ze, h as De, i as Ge, j as w, k as Oe, l as Fe, m as We, __tla as __tla_1 } from "./base-menu.props-Dc4UxONe.js";
import { u as Ve, __tla as __tla_2 } from "./index-DfrOcl7X.js";
import { r as Le, __tla as __tla_3 } from "./require-react-element-D0otgQnF.js";
import { T as $e, a as H, __tla as __tla_4 } from "./icons-DMb5RjWB.js";
import { S as U, __tla as __tla_5 } from "./scroll-area-DQMQ_Dit.js";
import { B as b, __tla as __tla_6 } from "./box-Dr3vL6g-.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_7 } from "./index-D3rDgx3q.js";
import { __tla as __tla_8 } from "./index-ChItmDsK.js";
import { __tla as __tla_9 } from "./index-CEOg2jVB.js";
import { __tla as __tla_10 } from "./index-NEJkd5JU.js";
import { __tla as __tla_11 } from "./index-D2OStwV5.js";
import "./index-BdQq_4o_.js";
let D, _, O, k, E, G, z, B, A, Dt, zt;
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
  })(),
  (() => {
    try {
      return __tla_5;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_6;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_7;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_8;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_9;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_10;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_11;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A;
  var V = "ContextMenu", [He, Et] = Ie(V, [
    $
  ]), m = $(), [Ue, X] = He(V), J = (t) => {
    const { __scopeContextMenu: o, children: r, onOpenChange: s, dir: a, modal: c = true } = t, [d, l] = i.useState(false), j = m(o), R = ge(s), C = i.useCallback((y) => {
      l(y), R(y);
    }, [
      R
    ]);
    return e.jsx(Ue, {
      scope: o,
      open: d,
      onOpenChange: C,
      modal: c,
      children: e.jsx(Re, {
        ...j,
        dir: a,
        open: d,
        onOpenChange: C,
        modal: c,
        children: r
      })
    });
  };
  J.displayName = V;
  var q = "ContextMenuTrigger", Y = i.forwardRef((t, o) => {
    const { __scopeContextMenu: r, disabled: s = false, ...a } = t, c = X(q, r), d = m(r), l = i.useRef({
      x: 0,
      y: 0
    }), j = i.useRef({
      getBoundingClientRect: () => DOMRect.fromRect({
        width: 0,
        height: 0,
        ...l.current
      })
    }), R = i.useRef(0), C = i.useCallback(() => window.clearTimeout(R.current), []), y = (f) => {
      l.current = {
        x: f.clientX,
        y: f.clientY
      }, c.onOpenChange(true);
    };
    return i.useEffect(() => C, [
      C
    ]), i.useEffect(() => void (s && C()), [
      s,
      C
    ]), e.jsxs(e.Fragment, {
      children: [
        e.jsx(ye, {
          ...d,
          virtualRef: j
        }),
        e.jsx(fe.span, {
          "data-state": c.open ? "open" : "closed",
          "data-disabled": s ? "" : void 0,
          ...a,
          ref: o,
          style: {
            WebkitTouchCallout: "none",
            ...t.style
          },
          onContextMenu: s ? t.onContextMenu : P(t.onContextMenu, (f) => {
            C(), y(f), f.preventDefault();
          }),
          onPointerDown: s ? t.onPointerDown : P(t.onPointerDown, N((f) => {
            C(), R.current = window.setTimeout(() => y(f), 700);
          })),
          onPointerMove: s ? t.onPointerMove : P(t.onPointerMove, N(C)),
          onPointerCancel: s ? t.onPointerCancel : P(t.onPointerCancel, N(C)),
          onPointerUp: s ? t.onPointerUp : P(t.onPointerUp, N(C))
        })
      ]
    });
  });
  Y.displayName = q;
  var Xe = "ContextMenuPortal", K = (t) => {
    const { __scopeContextMenu: o, ...r } = t, s = m(o);
    return e.jsx(Se, {
      ...s,
      ...r
    });
  };
  K.displayName = Xe;
  var Q = "ContextMenuContent", Z = i.forwardRef((t, o) => {
    const { __scopeContextMenu: r, ...s } = t, a = X(Q, r), c = m(r), d = i.useRef(false);
    return e.jsx(Te, {
      ...c,
      ...s,
      ref: o,
      side: "right",
      sideOffset: 2,
      align: "start",
      onCloseAutoFocus: (l) => {
        var _a2;
        (_a2 = t.onCloseAutoFocus) == null ? void 0 : _a2.call(t, l), !l.defaultPrevented && d.current && l.preventDefault(), d.current = false;
      },
      onInteractOutside: (l) => {
        var _a2;
        (_a2 = t.onInteractOutside) == null ? void 0 : _a2.call(t, l), !l.defaultPrevented && !a.modal && (d.current = true);
      },
      style: {
        ...t.style,
        "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    });
  });
  Z.displayName = Q;
  var Je = "ContextMenuGroup", ee = i.forwardRef((t, o) => {
    const { __scopeContextMenu: r, ...s } = t, a = m(r);
    return e.jsx(ke, {
      ...a,
      ...s,
      ref: o
    });
  });
  ee.displayName = Je;
  var qe = "ContextMenuLabel", te = i.forwardRef((t, o) => {
    const { __scopeContextMenu: r, ...s } = t, a = m(r);
    return e.jsx(Be, {
      ...a,
      ...s,
      ref: o
    });
  });
  te.displayName = qe;
  var Ye = "ContextMenuItem", ne = i.forwardRef((t, o) => {
    const { __scopeContextMenu: r, ...s } = t, a = m(r);
    return e.jsx(ve, {
      ...a,
      ...s,
      ref: o
    });
  });
  ne.displayName = Ye;
  var Ke = "ContextMenuCheckboxItem", oe = i.forwardRef((t, o) => {
    const { __scopeContextMenu: r, ...s } = t, a = m(r);
    return e.jsx(Ae, {
      ...a,
      ...s,
      ref: o
    });
  });
  oe.displayName = Ke;
  var Qe = "ContextMenuRadioGroup", re = i.forwardRef((t, o) => {
    const { __scopeContextMenu: r, ...s } = t, a = m(r);
    return e.jsx(Ee, {
      ...a,
      ...s,
      ref: o
    });
  });
  re.displayName = Qe;
  var Ze = "ContextMenuRadioItem", se = i.forwardRef((t, o) => {
    const { __scopeContextMenu: r, ...s } = t, a = m(r);
    return e.jsx(ze, {
      ...a,
      ...s,
      ref: o
    });
  });
  se.displayName = Ze;
  var et = "ContextMenuItemIndicator", ae = i.forwardRef((t, o) => {
    const { __scopeContextMenu: r, ...s } = t, a = m(r);
    return e.jsx(De, {
      ...a,
      ...s,
      ref: o
    });
  });
  ae.displayName = et;
  var tt = "ContextMenuSeparator", ie = i.forwardRef((t, o) => {
    const { __scopeContextMenu: r, ...s } = t, a = m(r);
    return e.jsx(Pe, {
      ...a,
      ...s,
      ref: o
    });
  });
  ie.displayName = tt;
  var nt = "ContextMenuArrow", ot = i.forwardRef((t, o) => {
    const { __scopeContextMenu: r, ...s } = t, a = m(r);
    return e.jsx(Ge, {
      ...a,
      ...s,
      ref: o
    });
  });
  ot.displayName = nt;
  var xe = "ContextMenuSub", ue = (t) => {
    const { __scopeContextMenu: o, children: r, onOpenChange: s, open: a, defaultOpen: c } = t, d = m(o), [l, j] = Ve({
      prop: a,
      defaultProp: c ?? false,
      onChange: s,
      caller: xe
    });
    return e.jsx(we, {
      ...d,
      open: l,
      onOpenChange: j,
      children: r
    });
  };
  ue.displayName = xe;
  var rt = "ContextMenuSubTrigger", ce = i.forwardRef((t, o) => {
    const { __scopeContextMenu: r, ...s } = t, a = m(r);
    return e.jsx(Ne, {
      ...a,
      ...s,
      ref: o
    });
  });
  ce.displayName = rt;
  var st = "ContextMenuSubContent", de = i.forwardRef((t, o) => {
    const { __scopeContextMenu: r, ...s } = t, a = m(r);
    return e.jsx(_e, {
      ...a,
      ...s,
      ref: o,
      style: {
        ...t.style,
        "--radix-context-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-context-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-context-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-context-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-context-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    });
  });
  de.displayName = st;
  function N(t) {
    return (o) => o.pointerType !== "mouse" ? t(o) : void 0;
  }
  var at = J, it = Y, xt = K, ut = Z, ct = ee, dt = te, lt = ne, Ct = oe, pt = re, mt = se, Mt = ae, ht = ie, gt = ue, It = ce, ft = de;
  const p = {
    ItemIndicator: Mt,
    Label: dt,
    CheckboxItem: Ct,
    Content: ut,
    Group: ct,
    RadioItem: mt,
    RadioGroup: pt,
    Item: lt,
    Portal: xt,
    Root: at,
    Sub: gt,
    SubTrigger: It,
    SubContent: ft,
    Separator: ht
  }, M = (t) => e.jsx(p.Root, {
    ...t
  });
  M.displayName = "ContextMenu.Root";
  const h = i.forwardRef(({ children: t, ...o }, r) => e.jsx(it, {
    ...o,
    ref: r,
    asChild: true,
    children: Le(t)
  }));
  h.displayName = "ContextMenu.Trigger";
  const le = i.createContext({}), g = i.forwardRef((t, o) => {
    const r = be(), { size: s = w.size.default, variant: a = w.variant.default, highContrast: c = w.highContrast.default } = t, { className: d, children: l, color: j, container: R, forceMount: C, ...y } = L(t, w), f = j || r.accentColor;
    return e.jsx(p.Portal, {
      container: R,
      forceMount: C,
      children: e.jsx(F, {
        asChild: true,
        children: e.jsx(p.Content, {
          "data-accent-color": f,
          alignOffset: -Number(s) * 4,
          collisionPadding: 10,
          ...y,
          asChild: false,
          ref: o,
          className: I("rt-PopperContent", "rt-BaseMenuContent", "rt-ContextMenuContent", d),
          children: e.jsx(U, {
            type: "auto",
            children: e.jsx("div", {
              className: I("rt-BaseMenuViewport", "rt-ContextMenuViewport"),
              children: e.jsx(le.Provider, {
                value: i.useMemo(() => ({
                  size: s,
                  variant: a,
                  color: f,
                  highContrast: c
                }), [
                  s,
                  a,
                  f,
                  c
                ]),
                children: l
              })
            })
          })
        })
      })
    });
  });
  g.displayName = "ContextMenu.Content";
  const Ce = i.forwardRef(({ className: t, ...o }, r) => e.jsx(p.Label, {
    ...o,
    asChild: false,
    ref: r,
    className: I("rt-BaseMenuLabel", "rt-ContextMenuLabel", t)
  }));
  Ce.displayName = "ContextMenu.Label";
  const n = i.forwardRef((t, o) => {
    const { className: r, children: s, color: a = Oe.color.default, shortcut: c, ...d } = t;
    return e.jsxs(p.Item, {
      "data-accent-color": a,
      ...d,
      ref: o,
      className: I("rt-reset", "rt-BaseMenuItem", "rt-ContextMenuItem", r),
      children: [
        e.jsx(W, {
          children: s
        }),
        c && e.jsx("div", {
          className: "rt-BaseMenuShortcut rt-ContextMenuShortcut",
          children: c
        })
      ]
    });
  });
  n.displayName = "ContextMenu.Item";
  const pe = i.forwardRef(({ className: t, ...o }, r) => e.jsx(p.Group, {
    ...o,
    asChild: false,
    ref: r,
    className: I("rt-BaseMenuGroup", "rt-ContextMenuGroup", t)
  }));
  pe.displayName = "ContextMenu.Group";
  const me = i.forwardRef(({ className: t, ...o }, r) => e.jsx(p.RadioGroup, {
    ...o,
    asChild: false,
    ref: r,
    className: I("rt-BaseMenuRadioGroup", "rt-ContextMenuRadioGroup", t)
  }));
  me.displayName = "ContextMenu.RadioGroup";
  const Me = i.forwardRef((t, o) => {
    const { children: r, className: s, color: a = Fe.color.default, ...c } = t;
    return e.jsxs(p.RadioItem, {
      ...c,
      asChild: false,
      ref: o,
      "data-accent-color": a,
      className: I("rt-BaseMenuItem", "rt-BaseMenuRadioItem", "rt-ContextMenuItem", "rt-ContextMenuRadioItem", s),
      children: [
        e.jsx(W, {
          children: r
        }),
        e.jsx(p.ItemIndicator, {
          className: "rt-BaseMenuItemIndicator rt-ContextMenuItemIndicator",
          children: e.jsx(H, {
            className: "rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon"
          })
        })
      ]
    });
  });
  Me.displayName = "ContextMenu.RadioItem";
  const he = i.forwardRef((t, o) => {
    const { children: r, className: s, shortcut: a, color: c = We.color.default, ...d } = t;
    return e.jsxs(p.CheckboxItem, {
      ...d,
      asChild: false,
      ref: o,
      "data-accent-color": c,
      className: I("rt-BaseMenuItem", "rt-BaseMenuCheckboxItem", "rt-ContextMenuItem", "rt-ContextMenuCheckboxItem", s),
      children: [
        e.jsx(W, {
          children: r
        }),
        e.jsx(p.ItemIndicator, {
          className: "rt-BaseMenuItemIndicator rt-ContextMenuItemIndicator",
          children: e.jsx(H, {
            className: "rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon"
          })
        }),
        a && e.jsx("div", {
          className: "rt-BaseMenuShortcut rt-ContextMenuShortcut",
          children: a
        })
      ]
    });
  });
  he.displayName = "ContextMenu.CheckboxItem";
  const S = (t) => e.jsx(p.Sub, {
    ...t
  });
  S.displayName = "ContextMenu.Sub";
  const T = i.forwardRef((t, o) => {
    const { className: r, children: s, ...a } = t;
    return e.jsxs(p.SubTrigger, {
      ...a,
      asChild: false,
      ref: o,
      className: I("rt-BaseMenuItem", "rt-BaseMenuSubTrigger", "rt-ContextMenuItem", "rt-ContextMenuSubTrigger", r),
      children: [
        s,
        e.jsx("div", {
          className: "rt-BaseMenuShortcut rt-ContextMenuShortcut",
          children: e.jsx($e, {
            className: "rt-BaseMenuSubTriggerIcon rt-ContextMenuSubTriggerIcon"
          })
        })
      ]
    });
  });
  T.displayName = "ContextMenu.SubTrigger";
  const v = i.forwardRef((t, o) => {
    const { size: r, variant: s, color: a, highContrast: c } = i.useContext(le), { className: d, children: l, container: j, forceMount: R, ...C } = L({
      size: r,
      variant: s,
      color: a,
      highContrast: c,
      ...t
    }, w);
    return e.jsx(p.Portal, {
      container: j,
      forceMount: R,
      children: e.jsx(F, {
        asChild: true,
        children: e.jsx(p.SubContent, {
          "data-accent-color": a,
          alignOffset: -Number(r) * 4,
          sideOffset: 1,
          collisionPadding: 10,
          ...C,
          asChild: false,
          ref: o,
          className: I("rt-PopperContent", "rt-BaseMenuContent", "rt-BaseMenuSubContent", "rt-ContextMenuContent", "rt-ContextMenuSubContent", d),
          children: e.jsx(U, {
            type: "auto",
            children: e.jsx("div", {
              className: I("rt-BaseMenuViewport", "rt-ContextMenuViewport"),
              children: l
            })
          })
        })
      })
    });
  });
  v.displayName = "ContextMenu.SubContent";
  const x = i.forwardRef(({ className: t, ...o }, r) => e.jsx(p.Separator, {
    ...o,
    asChild: false,
    ref: r,
    className: I("rt-BaseMenuSeparator", "rt-ContextMenuSeparator", t)
  }));
  x.displayName = "ContextMenu.Separator";
  M.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ContextMenu.Root"
  };
  h.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ContextMenu.Trigger",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  g.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ContextMenu.Content",
    props: {
      container: {
        required: false,
        tsType: {
          name: 'ReactComponentPropsWithoutRef["container"]',
          raw: `React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Portal
>["container"]`
        },
        description: ""
      }
    },
    composes: [
      "ComponentPropsWithout"
    ]
  };
  Ce.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ContextMenu.Label",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  n.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ContextMenu.Item",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  pe.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ContextMenu.Group",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  me.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ContextMenu.RadioGroup",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  Me.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ContextMenu.RadioItem",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  he.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ContextMenu.CheckboxItem",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  S.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ContextMenu.Sub",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  T.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ContextMenu.SubTrigger",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  v.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ContextMenu.SubContent",
    props: {
      container: {
        required: false,
        tsType: {
          name: 'ReactComponentPropsWithoutRef["container"]',
          raw: `React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Portal
>["container"]`
        },
        description: ""
      }
    },
    composes: [
      "ComponentPropsWithout"
    ]
  };
  x.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ContextMenu.Separator",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  zt = {
    title: "Base/ContextMenu",
    component: M,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (t) => e.jsx(F, {
        children: e.jsx("div", {
          style: {
            padding: "40px"
          },
          children: e.jsx(t, {})
        })
      })
    ]
  };
  _ = {
    render: (t) => e.jsxs(M, {
      children: [
        e.jsx(h, {
          children: e.jsxs(b, {
            style: {
              padding: "40px",
              border: "2px dashed #e1e5e9",
              borderRadius: "8px",
              textAlign: "center",
              cursor: "context-menu"
            },
            children: [
              e.jsx(u, {
                size: "3",
                children: "Right-click me"
              }),
              e.jsx(u, {
                size: "2",
                color: "gray",
                style: {
                  marginTop: "4px",
                  display: "block"
                },
                children: "Try right-clicking on this area"
              })
            ]
          })
        }),
        e.jsxs(g, {
          children: [
            e.jsx(n, {
              children: "Copy"
            }),
            e.jsx(n, {
              children: "Paste"
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              children: "Edit"
            }),
            e.jsx(n, {
              children: "Delete"
            })
          ]
        })
      ]
    })
  };
  k = {
    render: (t) => e.jsxs(M, {
      children: [
        e.jsx(h, {
          children: e.jsxs(b, {
            style: {
              padding: "20px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px",
              backgroundColor: "#fafbfc",
              cursor: "context-menu",
              minWidth: "200px"
            },
            children: [
              e.jsx(u, {
                size: "2",
                weight: "medium",
                children: "\u{1F4C4} Document.pdf"
              }),
              e.jsx(u, {
                size: "1",
                color: "gray",
                style: {
                  marginTop: "4px",
                  display: "block"
                },
                children: "2.4 MB \u2022 Modified 2 hours ago"
              })
            ]
          })
        }),
        e.jsxs(g, {
          children: [
            e.jsx(n, {
              children: "\u{1F4C2} Open"
            }),
            e.jsx(n, {
              children: "\u{1F441}\uFE0F Preview"
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              children: "\u{1F4CB} Copy"
            }),
            e.jsx(n, {
              children: "\u2702\uFE0F Cut"
            }),
            e.jsx(n, {
              children: "\u{1F4C4} Duplicate"
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              children: "\u270F\uFE0F Rename"
            }),
            e.jsx(n, {
              children: "\u{1F5D1}\uFE0F Delete"
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              children: "\u2139\uFE0F Properties"
            })
          ]
        })
      ]
    })
  };
  B = {
    render: (t) => e.jsxs(M, {
      children: [
        e.jsx(h, {
          children: e.jsx(b, {
            style: {
              padding: "20px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              cursor: "text",
              minHeight: "120px",
              lineHeight: "1.6"
            },
            children: e.jsx(u, {
              size: "2",
              children: "This is a sample text area. Right-click anywhere in this text to see the context menu with text editing options. You can select text and use the context menu for various operations."
            })
          })
        }),
        e.jsxs(g, {
          children: [
            e.jsx(n, {
              shortcut: "Ctrl+C",
              children: "Copy"
            }),
            e.jsx(n, {
              shortcut: "Ctrl+X",
              children: "Cut"
            }),
            e.jsx(n, {
              shortcut: "Ctrl+V",
              children: "Paste"
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              shortcut: "Ctrl+A",
              children: "Select All"
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              children: "Bold"
            }),
            e.jsx(n, {
              children: "Italic"
            }),
            e.jsx(n, {
              children: "Underline"
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              children: "Find & Replace"
            })
          ]
        })
      ]
    })
  };
  A = {
    render: (t) => e.jsxs(M, {
      children: [
        e.jsx(h, {
          children: e.jsxs(b, {
            style: {
              padding: "30px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px",
              backgroundColor: "#f8f9fa",
              cursor: "context-menu",
              textAlign: "center"
            },
            children: [
              e.jsx(u, {
                size: "3",
                children: "\u{1F3A8} Design Element"
              }),
              e.jsx(u, {
                size: "2",
                color: "gray",
                style: {
                  marginTop: "4px",
                  display: "block"
                },
                children: "Right-click for design options"
              })
            ]
          })
        }),
        e.jsxs(g, {
          children: [
            e.jsx(n, {
              children: "Edit"
            }),
            e.jsx(n, {
              children: "Duplicate"
            }),
            e.jsx(x, {}),
            e.jsxs(S, {
              children: [
                e.jsx(T, {
                  children: "Arrange"
                }),
                e.jsxs(v, {
                  children: [
                    e.jsx(n, {
                      children: "Bring to Front"
                    }),
                    e.jsx(n, {
                      children: "Send to Back"
                    }),
                    e.jsx(x, {}),
                    e.jsx(n, {
                      children: "Bring Forward"
                    }),
                    e.jsx(n, {
                      children: "Send Backward"
                    })
                  ]
                })
              ]
            }),
            e.jsxs(S, {
              children: [
                e.jsx(T, {
                  children: "Transform"
                }),
                e.jsxs(v, {
                  children: [
                    e.jsx(n, {
                      children: "Rotate 90\xB0 CW"
                    }),
                    e.jsx(n, {
                      children: "Rotate 90\xB0 CCW"
                    }),
                    e.jsx(x, {}),
                    e.jsx(n, {
                      children: "Flip Horizontal"
                    }),
                    e.jsx(n, {
                      children: "Flip Vertical"
                    })
                  ]
                })
              ]
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              children: "Delete"
            })
          ]
        })
      ]
    })
  };
  E = {
    render: (t) => e.jsxs(M, {
      children: [
        e.jsx(h, {
          children: e.jsx(b, {
            style: {
              width: "200px",
              height: "150px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "context-menu",
              position: "relative"
            },
            children: e.jsxs("div", {
              style: {
                textAlign: "center"
              },
              children: [
                e.jsx(u, {
                  size: "6",
                  children: "\u{1F5BC}\uFE0F"
                }),
                e.jsx(u, {
                  size: "2",
                  color: "gray",
                  style: {
                    marginTop: "8px",
                    display: "block"
                  },
                  children: "image.jpg"
                })
              ]
            })
          })
        }),
        e.jsxs(g, {
          children: [
            e.jsx(n, {
              children: "\u{1F441}\uFE0F View Full Size"
            }),
            e.jsx(n, {
              children: "\u{1F4CB} Copy Image"
            }),
            e.jsx(n, {
              children: "\u{1F4E5} Save Image As..."
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              children: "\u270F\uFE0F Edit Image"
            }),
            e.jsx(n, {
              children: "\u{1F504} Replace Image"
            }),
            e.jsx(x, {}),
            e.jsxs(S, {
              children: [
                e.jsx(T, {
                  children: "\u{1F4E4} Export As"
                }),
                e.jsxs(v, {
                  children: [
                    e.jsx(n, {
                      children: "PNG"
                    }),
                    e.jsx(n, {
                      children: "JPEG"
                    }),
                    e.jsx(n, {
                      children: "WebP"
                    }),
                    e.jsx(n, {
                      children: "SVG"
                    })
                  ]
                })
              ]
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              children: "\u{1F5D1}\uFE0F Delete"
            })
          ]
        })
      ]
    })
  };
  z = {
    render: (t) => e.jsx("div", {
      style: {
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        overflow: "hidden"
      },
      children: e.jsxs("table", {
        style: {
          width: "100%",
          borderCollapse: "collapse"
        },
        children: [
          e.jsx("thead", {
            children: e.jsxs("tr", {
              style: {
                backgroundColor: "#f8f9fa"
              },
              children: [
                e.jsx("th", {
                  style: {
                    padding: "12px",
                    border: "1px solid #e1e5e9",
                    textAlign: "left"
                  },
                  children: e.jsx(u, {
                    size: "2",
                    weight: "medium",
                    children: "Name"
                  })
                }),
                e.jsx("th", {
                  style: {
                    padding: "12px",
                    border: "1px solid #e1e5e9",
                    textAlign: "left"
                  },
                  children: e.jsx(u, {
                    size: "2",
                    weight: "medium",
                    children: "Role"
                  })
                }),
                e.jsx("th", {
                  style: {
                    padding: "12px",
                    border: "1px solid #e1e5e9",
                    textAlign: "left"
                  },
                  children: e.jsx(u, {
                    size: "2",
                    weight: "medium",
                    children: "Status"
                  })
                })
              ]
            })
          }),
          e.jsx("tbody", {
            children: e.jsxs("tr", {
              children: [
                e.jsxs(M, {
                  children: [
                    e.jsx(h, {
                      children: e.jsx("td", {
                        style: {
                          padding: "12px",
                          border: "1px solid #e1e5e9",
                          cursor: "context-menu"
                        },
                        children: e.jsx(u, {
                          size: "2",
                          children: "John Doe"
                        })
                      })
                    }),
                    e.jsxs(g, {
                      children: [
                        e.jsx(n, {
                          children: "\u{1F4CB} Copy Cell"
                        }),
                        e.jsx(n, {
                          children: "\u{1F4C4} Copy Row"
                        }),
                        e.jsx(x, {}),
                        e.jsx(n, {
                          children: "\u2795 Insert Row Above"
                        }),
                        e.jsx(n, {
                          children: "\u2795 Insert Row Below"
                        }),
                        e.jsx(x, {}),
                        e.jsx(n, {
                          children: "\u270F\uFE0F Edit Cell"
                        }),
                        e.jsx(n, {
                          children: "\u{1F5D1}\uFE0F Delete Row"
                        })
                      ]
                    })
                  ]
                }),
                e.jsx("td", {
                  style: {
                    padding: "12px",
                    border: "1px solid #e1e5e9"
                  },
                  children: e.jsx(u, {
                    size: "2",
                    children: "Developer"
                  })
                }),
                e.jsx("td", {
                  style: {
                    padding: "12px",
                    border: "1px solid #e1e5e9"
                  },
                  children: e.jsx(u, {
                    size: "2",
                    color: "green",
                    children: "Active"
                  })
                })
              ]
            })
          })
        ]
      })
    })
  };
  D = {
    render: (t) => e.jsxs(M, {
      children: [
        e.jsx(h, {
          children: e.jsxs(b, {
            style: {
              padding: "20px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px",
              backgroundColor: "#ffffff",
              cursor: "context-menu",
              minHeight: "100px"
            },
            children: [
              e.jsx(u, {
                size: "3",
                weight: "medium",
                style: {
                  marginBottom: "8px",
                  display: "block"
                },
                children: "Web Page Content"
              }),
              e.jsx(u, {
                size: "2",
                color: "blue",
                style: {
                  textDecoration: "underline",
                  cursor: "pointer",
                  marginBottom: "8px",
                  display: "block"
                },
                children: "https://example.com/link"
              }),
              e.jsx(u, {
                size: "2",
                children: "This simulates a web page with various elements. Right-click to see browser-like context menu options."
              })
            ]
          })
        }),
        e.jsxs(g, {
          children: [
            e.jsx(n, {
              children: "\u2B05\uFE0F Back"
            }),
            e.jsx(n, {
              children: "\u27A1\uFE0F Forward"
            }),
            e.jsx(n, {
              shortcut: "Ctrl+R",
              children: "\u{1F504} Reload"
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              shortcut: "Ctrl+S",
              children: "\u{1F4BE} Save As..."
            }),
            e.jsx(n, {
              children: "\u{1F5A8}\uFE0F Print..."
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              children: "\u{1F50D} View Source"
            }),
            e.jsx(n, {
              shortcut: "F12",
              children: "\u{1F6E0}\uFE0F Inspect Element"
            })
          ]
        })
      ]
    })
  };
  G = {
    render: (t) => e.jsxs(je, {
      gap: "4",
      children: [
        e.jsxs(M, {
          children: [
            e.jsx(h, {
              children: e.jsx(b, {
                style: {
                  padding: "20px",
                  border: "1px solid #3b82f6",
                  borderRadius: "8px",
                  backgroundColor: "#eff6ff",
                  cursor: "context-menu",
                  textAlign: "center"
                },
                children: e.jsx(u, {
                  size: "2",
                  color: "blue",
                  children: "\u{1F4C1} Folder"
                })
              })
            }),
            e.jsxs(g, {
              children: [
                e.jsx(n, {
                  children: "Open"
                }),
                e.jsx(n, {
                  children: "New File"
                }),
                e.jsx(n, {
                  children: "New Folder"
                }),
                e.jsx(x, {}),
                e.jsx(n, {
                  children: "Rename"
                }),
                e.jsx(n, {
                  children: "Delete"
                })
              ]
            })
          ]
        }),
        e.jsxs(M, {
          children: [
            e.jsx(h, {
              children: e.jsx(b, {
                style: {
                  padding: "20px",
                  border: "1px solid #10b981",
                  borderRadius: "8px",
                  backgroundColor: "#ecfdf5",
                  cursor: "context-menu",
                  textAlign: "center"
                },
                children: e.jsx(u, {
                  size: "2",
                  color: "green",
                  children: "\u{1F4C4} File"
                })
              })
            }),
            e.jsxs(g, {
              children: [
                e.jsx(n, {
                  children: "Open"
                }),
                e.jsx(n, {
                  children: "Edit"
                }),
                e.jsx(x, {}),
                e.jsx(n, {
                  children: "Copy"
                }),
                e.jsx(n, {
                  children: "Move"
                }),
                e.jsx(x, {}),
                e.jsx(n, {
                  children: "Rename"
                }),
                e.jsx(n, {
                  children: "Delete"
                })
              ]
            })
          ]
        }),
        e.jsxs(M, {
          children: [
            e.jsx(h, {
              children: e.jsx(b, {
                style: {
                  padding: "20px",
                  border: "1px solid #f59e0b",
                  borderRadius: "8px",
                  backgroundColor: "#fffbeb",
                  cursor: "context-menu",
                  textAlign: "center"
                },
                children: e.jsx(u, {
                  size: "2",
                  color: "orange",
                  children: "\u{1F5BC}\uFE0F Image"
                })
              })
            }),
            e.jsxs(g, {
              children: [
                e.jsx(n, {
                  children: "View"
                }),
                e.jsx(n, {
                  children: "Edit"
                }),
                e.jsx(x, {}),
                e.jsx(n, {
                  children: "Copy Image"
                }),
                e.jsx(n, {
                  children: "Save As..."
                }),
                e.jsx(x, {}),
                e.jsxs(S, {
                  children: [
                    e.jsx(T, {
                      children: "Export"
                    }),
                    e.jsxs(v, {
                      children: [
                        e.jsx(n, {
                          children: "PNG"
                        }),
                        e.jsx(n, {
                          children: "JPEG"
                        }),
                        e.jsx(n, {
                          children: "WebP"
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    })
  };
  O = {
    render: (t) => e.jsxs(M, {
      children: [
        e.jsx(h, {
          children: e.jsxs(b, {
            style: {
              padding: "20px",
              border: "1px solid #6b7280",
              borderRadius: "8px",
              backgroundColor: "#1f2937",
              color: "#f9fafb",
              cursor: "context-menu",
              fontFamily: "monospace"
            },
            children: [
              e.jsx(u, {
                size: "2",
                style: {
                  color: "#10b981"
                },
                children: "const"
              }),
              " ",
              e.jsx(u, {
                size: "2",
                style: {
                  color: "#3b82f6"
                },
                children: "component"
              }),
              " ",
              e.jsx(u, {
                size: "2",
                style: {
                  color: "#f9fafb"
                },
                children: "="
              }),
              " ",
              e.jsx(u, {
                size: "2",
                style: {
                  color: "#fbbf24"
                },
                children: "'HelloWorld'"
              }),
              e.jsx("br", {}),
              e.jsx(u, {
                size: "1",
                color: "gray",
                style: {
                  marginTop: "8px",
                  display: "block"
                },
                children: "Right-click on this code block"
              })
            ]
          })
        }),
        e.jsxs(g, {
          children: [
            e.jsx(n, {
              shortcut: "Ctrl+C",
              children: "\u{1F4CB} Copy"
            }),
            e.jsx(n, {
              shortcut: "Ctrl+X",
              children: "\u2702\uFE0F Cut"
            }),
            e.jsx(n, {
              shortcut: "Ctrl+V",
              children: "\u{1F4C4} Paste"
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              children: "\u{1F50D} Find References"
            }),
            e.jsx(n, {
              children: "\u{1F4DD} Rename Symbol"
            }),
            e.jsx(x, {}),
            e.jsxs(S, {
              children: [
                e.jsx(T, {
                  children: "\u{1F6E0}\uFE0F Refactor"
                }),
                e.jsxs(v, {
                  children: [
                    e.jsx(n, {
                      children: "Extract Method"
                    }),
                    e.jsx(n, {
                      children: "Extract Variable"
                    }),
                    e.jsx(n, {
                      children: "Inline Variable"
                    })
                  ]
                })
              ]
            }),
            e.jsx(x, {}),
            e.jsx(n, {
              shortcut: "F12",
              children: "\u{1F4CD} Go to Definition"
            }),
            e.jsx(n, {
              children: "\u{1F441}\uFE0F Peek Definition"
            })
          ]
        })
      ]
    })
  };
  _.parameters = {
    ..._.parameters,
    docs: {
      ...(_a = _.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        padding: "40px",
        border: "2px dashed #e1e5e9",
        borderRadius: "8px",
        textAlign: "center",
        cursor: "context-menu"
      }}>
          <Text size="3">Right-click me</Text>
          <Text size="2" color="gray" style={{
          marginTop: "4px",
          display: "block"
        }}>
            Try right-clicking on this area
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>Copy</ContextMenu.Item>
        <ContextMenu.Item>Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Edit</ContextMenu.Item>
        <ContextMenu.Item>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,
        ...(_c = (_b = _.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_d = k.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        padding: "20px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#fafbfc",
        cursor: "context-menu",
        minWidth: "200px"
      }}>
          <Text size="2" weight="medium">
            \u{1F4C4} Document.pdf
          </Text>
          <Text size="1" color="gray" style={{
          marginTop: "4px",
          display: "block"
        }}>
            2.4 MB \u2022 Modified 2 hours ago
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>\u{1F4C2} Open</ContextMenu.Item>
        <ContextMenu.Item>\u{1F441}\uFE0F Preview</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>\u{1F4CB} Copy</ContextMenu.Item>
        <ContextMenu.Item>\u2702\uFE0F Cut</ContextMenu.Item>
        <ContextMenu.Item>\u{1F4C4} Duplicate</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>\u270F\uFE0F Rename</ContextMenu.Item>
        <ContextMenu.Item>\u{1F5D1}\uFE0F Delete</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>\u2139\uFE0F Properties</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,
        ...(_f = (_e2 = k.parameters) == null ? void 0 : _e2.docs) == null ? void 0 : _f.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_g = B.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        padding: "20px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        cursor: "text",
        minHeight: "120px",
        lineHeight: "1.6"
      }}>
          <Text size="2">
            This is a sample text area. Right-click anywhere in this text to see
            the context menu with text editing options. You can select text and
            use the context menu for various operations.
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item shortcut="Ctrl+C">Copy</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+X">Cut</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+V">Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="Ctrl+A">Select All</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Bold</ContextMenu.Item>
        <ContextMenu.Item>Italic</ContextMenu.Item>
        <ContextMenu.Item>Underline</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Find & Replace</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,
        ...(_i = (_h = B.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  A.parameters = {
    ...A.parameters,
    docs: {
      ...(_j = A.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        padding: "30px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#f8f9fa",
        cursor: "context-menu",
        textAlign: "center"
      }}>
          <Text size="3">\u{1F3A8} Design Element</Text>
          <Text size="2" color="gray" style={{
          marginTop: "4px",
          display: "block"
        }}>
            Right-click for design options
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>Edit</ContextMenu.Item>
        <ContextMenu.Item>Duplicate</ContextMenu.Item>
        <ContextMenu.Separator />

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>Arrange</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Bring to Front</ContextMenu.Item>
            <ContextMenu.Item>Send to Back</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Bring Forward</ContextMenu.Item>
            <ContextMenu.Item>Send Backward</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>Transform</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Rotate 90\xB0 CW</ContextMenu.Item>
            <ContextMenu.Item>Rotate 90\xB0 CCW</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Flip Horizontal</ContextMenu.Item>
            <ContextMenu.Item>Flip Vertical</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Separator />
        <ContextMenu.Item>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,
        ...(_l = (_k = A.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  E.parameters = {
    ...E.parameters,
    docs: {
      ...(_m = E.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        width: "200px",
        height: "150px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "context-menu",
        position: "relative"
      }}>
          <div style={{
          textAlign: "center"
        }}>
            <Text size="6">\u{1F5BC}\uFE0F</Text>
            <Text size="2" color="gray" style={{
            marginTop: "8px",
            display: "block"
          }}>
              image.jpg
            </Text>
          </div>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>\u{1F441}\uFE0F View Full Size</ContextMenu.Item>
        <ContextMenu.Item>\u{1F4CB} Copy Image</ContextMenu.Item>
        <ContextMenu.Item>\u{1F4E5} Save Image As...</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>\u270F\uFE0F Edit Image</ContextMenu.Item>
        <ContextMenu.Item>\u{1F504} Replace Image</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>\u{1F4E4} Export As</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>PNG</ContextMenu.Item>
            <ContextMenu.Item>JPEG</ContextMenu.Item>
            <ContextMenu.Item>WebP</ContextMenu.Item>
            <ContextMenu.Item>SVG</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>
        <ContextMenu.Separator />
        <ContextMenu.Item>\u{1F5D1}\uFE0F Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,
        ...(_o = (_n = E.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_p = z.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: _args => <div style={{
    border: "1px solid #e1e5e9",
    borderRadius: "8px",
    overflow: "hidden"
  }}>
      <table style={{
      width: "100%",
      borderCollapse: "collapse"
    }}>
        <thead>
          <tr style={{
          backgroundColor: "#f8f9fa"
        }}>
            <th style={{
            padding: "12px",
            border: "1px solid #e1e5e9",
            textAlign: "left"
          }}>
              <Text size="2" weight="medium">
                Name
              </Text>
            </th>
            <th style={{
            padding: "12px",
            border: "1px solid #e1e5e9",
            textAlign: "left"
          }}>
              <Text size="2" weight="medium">
                Role
              </Text>
            </th>
            <th style={{
            padding: "12px",
            border: "1px solid #e1e5e9",
            textAlign: "left"
          }}>
              <Text size="2" weight="medium">
                Status
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <ContextMenu.Root>
              <ContextMenu.Trigger>
                <td style={{
                padding: "12px",
                border: "1px solid #e1e5e9",
                cursor: "context-menu"
              }}>
                  <Text size="2">John Doe</Text>
                </td>
              </ContextMenu.Trigger>
              <ContextMenu.Content>
                <ContextMenu.Item>\u{1F4CB} Copy Cell</ContextMenu.Item>
                <ContextMenu.Item>\u{1F4C4} Copy Row</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item>\u2795 Insert Row Above</ContextMenu.Item>
                <ContextMenu.Item>\u2795 Insert Row Below</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item>\u270F\uFE0F Edit Cell</ContextMenu.Item>
                <ContextMenu.Item>\u{1F5D1}\uFE0F Delete Row</ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
            <td style={{
            padding: "12px",
            border: "1px solid #e1e5e9"
          }}>
              <Text size="2">Developer</Text>
            </td>
            <td style={{
            padding: "12px",
            border: "1px solid #e1e5e9"
          }}>
              <Text size="2" color="green">
                Active
              </Text>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
}`,
        ...(_r = (_q = z.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  D.parameters = {
    ...D.parameters,
    docs: {
      ...(_s = D.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        padding: "20px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        cursor: "context-menu",
        minHeight: "100px"
      }}>
          <Text size="3" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Web Page Content
          </Text>
          <Text size="2" color="blue" style={{
          textDecoration: "underline",
          cursor: "pointer",
          marginBottom: "8px",
          display: "block"
        }}>
            https://example.com/link
          </Text>
          <Text size="2">
            This simulates a web page with various elements. Right-click to see
            browser-like context menu options.
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>\u2B05\uFE0F Back</ContextMenu.Item>
        <ContextMenu.Item>\u27A1\uFE0F Forward</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+R">\u{1F504} Reload</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="Ctrl+S">\u{1F4BE} Save As...</ContextMenu.Item>
        <ContextMenu.Item>\u{1F5A8}\uFE0F Print...</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>\u{1F50D} View Source</ContextMenu.Item>
        <ContextMenu.Item shortcut="F12">\u{1F6E0}\uFE0F Inspect Element</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,
        ...(_u = (_t = D.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  G.parameters = {
    ...G.parameters,
    docs: {
      ...(_v = G.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: _args => <Flex gap="4">
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Box style={{
          padding: "20px",
          border: "1px solid #3b82f6",
          borderRadius: "8px",
          backgroundColor: "#eff6ff",
          cursor: "context-menu",
          textAlign: "center"
        }}>
            <Text size="2" color="blue">
              \u{1F4C1} Folder
            </Text>
          </Box>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Open</ContextMenu.Item>
          <ContextMenu.Item>New File</ContextMenu.Item>
          <ContextMenu.Item>New Folder</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Rename</ContextMenu.Item>
          <ContextMenu.Item>Delete</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>

      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Box style={{
          padding: "20px",
          border: "1px solid #10b981",
          borderRadius: "8px",
          backgroundColor: "#ecfdf5",
          cursor: "context-menu",
          textAlign: "center"
        }}>
            <Text size="2" color="green">
              \u{1F4C4} File
            </Text>
          </Box>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Open</ContextMenu.Item>
          <ContextMenu.Item>Edit</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Copy</ContextMenu.Item>
          <ContextMenu.Item>Move</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Rename</ContextMenu.Item>
          <ContextMenu.Item>Delete</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>

      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Box style={{
          padding: "20px",
          border: "1px solid #f59e0b",
          borderRadius: "8px",
          backgroundColor: "#fffbeb",
          cursor: "context-menu",
          textAlign: "center"
        }}>
            <Text size="2" color="orange">
              \u{1F5BC}\uFE0F Image
            </Text>
          </Box>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>View</ContextMenu.Item>
          <ContextMenu.Item>Edit</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Copy Image</ContextMenu.Item>
          <ContextMenu.Item>Save As...</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Export</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item>PNG</ContextMenu.Item>
              <ContextMenu.Item>JPEG</ContextMenu.Item>
              <ContextMenu.Item>WebP</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu.Root>
    </Flex>
}`,
        ...(_x = (_w = G.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  O.parameters = {
    ...O.parameters,
    docs: {
      ...(_y = O.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        padding: "20px",
        border: "1px solid #6b7280",
        borderRadius: "8px",
        backgroundColor: "#1f2937",
        color: "#f9fafb",
        cursor: "context-menu",
        fontFamily: "monospace"
      }}>
          <Text size="2" style={{
          color: "#10b981"
        }}>
            const
          </Text>{" "}
          <Text size="2" style={{
          color: "#3b82f6"
        }}>
            component
          </Text>{" "}
          <Text size="2" style={{
          color: "#f9fafb"
        }}>
            =
          </Text>{" "}
          <Text size="2" style={{
          color: "#fbbf24"
        }}>
            'HelloWorld'
          </Text>
          <br />
          <Text size="1" color="gray" style={{
          marginTop: "8px",
          display: "block"
        }}>
            Right-click on this code block
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item shortcut="Ctrl+C">\u{1F4CB} Copy</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+X">\u2702\uFE0F Cut</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+V">\u{1F4C4} Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>\u{1F50D} Find References</ContextMenu.Item>
        <ContextMenu.Item>\u{1F4DD} Rename Symbol</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>\u{1F6E0}\uFE0F Refactor</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Extract Method</ContextMenu.Item>
            <ContextMenu.Item>Extract Variable</ContextMenu.Item>
            <ContextMenu.Item>Inline Variable</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="F12">\u{1F4CD} Go to Definition</ContextMenu.Item>
        <ContextMenu.Item>\u{1F441}\uFE0F Peek Definition</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,
        ...(_A = (_z = O.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  Dt = [
    "Default",
    "FileOperations",
    "TextEditing",
    "WithSubmenus",
    "ImageContextMenu",
    "TableCellMenu",
    "BrowserLikeMenu",
    "MultipleTriggerAreas",
    "DeveloperMenu"
  ];
});
export {
  D as BrowserLikeMenu,
  _ as Default,
  O as DeveloperMenu,
  k as FileOperations,
  E as ImageContextMenu,
  G as MultipleTriggerAreas,
  z as TableCellMenu,
  B as TextEditing,
  A as WithSubmenus,
  Dt as __namedExportsOrder,
  __tla,
  zt as default
};
