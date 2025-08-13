import { r as a, j as e, c as ge, P as De, b as V, n as je, K as fe, v as K, T as J, l as g, L as Ie, a as l, F as ye, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { I as $, __tla as __tla_1 } from "./icon-button-DBeYp-S7.js";
import { u as Y, __tla as __tla_2 } from "./index-DfrOcl7X.js";
import { c as q, R as ve, A as be, P as Se, C as Ce, I as Re, S as Te, L as Ne, a as Pe, b as _e, d as ke, f as ze, g as Ae, h as Be, e as Ee, G as Le, i as Oe, j as R, k as Ge, l as We, m as Fe, __tla as __tla_3 } from "./base-menu.props-Dc4UxONe.js";
import { u as H, __tla as __tla_4 } from "./index-CEOg2jVB.js";
import { r as Ve, __tla as __tla_5 } from "./require-react-element-D0otgQnF.js";
import { T as $e, a as X, __tla as __tla_6 } from "./icons-DMb5RjWB.js";
import { S as Q, __tla as __tla_7 } from "./scroll-area-DQMQ_Dit.js";
import { B as v, __tla as __tla_8 } from "./button-BF2Wetgg.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_9 } from "./base-button-BHQkXpSv.js";
import { __tla as __tla_10 } from "./index-D3rDgx3q.js";
import { __tla as __tla_11 } from "./index-ChItmDsK.js";
import { __tla as __tla_12 } from "./index-NEJkd5JU.js";
import { __tla as __tla_13 } from "./index-D2OStwV5.js";
import "./index-BdQq_4o_.js";
let k, A, W, E, G, L, F, O, z, B, Wn, Gn;
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
  })(),
  (() => {
    try {
      return __tla_12;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_13;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D;
  var U = "DropdownMenu", [Ue, On] = ge(U, [
    q
  ]), h = q(), [Je, Z] = Ue(U), ee = (n) => {
    const { __scopeDropdownMenu: o, children: r, dir: d, open: s, defaultOpen: i, onOpenChange: u, modal: c = true } = n, D = h(o), y = a.useRef(null), [I, b] = Y({
      prop: s,
      defaultProp: i ?? false,
      onChange: u,
      caller: U
    });
    return e.jsx(Je, {
      scope: o,
      triggerId: H(),
      triggerRef: y,
      contentId: H(),
      open: I,
      onOpenChange: b,
      onOpenToggle: a.useCallback(() => b((C) => !C), [
        b
      ]),
      modal: c,
      children: e.jsx(ve, {
        ...D,
        open: I,
        onOpenChange: b,
        dir: d,
        modal: c,
        children: r
      })
    });
  };
  ee.displayName = U;
  var ne = "DropdownMenuTrigger", oe = a.forwardRef((n, o) => {
    const { __scopeDropdownMenu: r, disabled: d = false, ...s } = n, i = Z(ne, r), u = h(r);
    return e.jsx(be, {
      asChild: true,
      ...u,
      children: e.jsx(De.button, {
        type: "button",
        id: i.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": i.open,
        "aria-controls": i.open ? i.contentId : void 0,
        "data-state": i.open ? "open" : "closed",
        "data-disabled": d ? "" : void 0,
        disabled: d,
        ...s,
        ref: je(o, i.triggerRef),
        onPointerDown: V(n.onPointerDown, (c) => {
          !d && c.button === 0 && c.ctrlKey === false && (i.onOpenToggle(), i.open || c.preventDefault());
        }),
        onKeyDown: V(n.onKeyDown, (c) => {
          d || ([
            "Enter",
            " "
          ].includes(c.key) && i.onOpenToggle(), c.key === "ArrowDown" && i.onOpenChange(true), [
            "Enter",
            " ",
            "ArrowDown"
          ].includes(c.key) && c.preventDefault());
        })
      })
    });
  });
  oe.displayName = ne;
  var He = "DropdownMenuPortal", re = (n) => {
    const { __scopeDropdownMenu: o, ...r } = n, d = h(o);
    return e.jsx(Se, {
      ...d,
      ...r
    });
  };
  re.displayName = He;
  var te = "DropdownMenuContent", de = a.forwardRef((n, o) => {
    const { __scopeDropdownMenu: r, ...d } = n, s = Z(te, r), i = h(r), u = a.useRef(false);
    return e.jsx(Ce, {
      id: s.contentId,
      "aria-labelledby": s.triggerId,
      ...i,
      ...d,
      ref: o,
      onCloseAutoFocus: V(n.onCloseAutoFocus, (c) => {
        var _a2;
        u.current || ((_a2 = s.triggerRef.current) == null ? void 0 : _a2.focus()), u.current = false, c.preventDefault();
      }),
      onInteractOutside: V(n.onInteractOutside, (c) => {
        const D = c.detail.originalEvent, y = D.button === 0 && D.ctrlKey === true, I = D.button === 2 || y;
        (!s.modal || I) && (u.current = true);
      }),
      style: {
        ...n.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    });
  });
  de.displayName = te;
  var Ke = "DropdownMenuGroup", se = a.forwardRef((n, o) => {
    const { __scopeDropdownMenu: r, ...d } = n, s = h(r);
    return e.jsx(Le, {
      ...s,
      ...d,
      ref: o
    });
  });
  se.displayName = Ke;
  var Ye = "DropdownMenuLabel", ae = a.forwardRef((n, o) => {
    const { __scopeDropdownMenu: r, ...d } = n, s = h(r);
    return e.jsx(Ne, {
      ...s,
      ...d,
      ref: o
    });
  });
  ae.displayName = Ye;
  var qe = "DropdownMenuItem", ie = a.forwardRef((n, o) => {
    const { __scopeDropdownMenu: r, ...d } = n, s = h(r);
    return e.jsx(Re, {
      ...s,
      ...d,
      ref: o
    });
  });
  ie.displayName = qe;
  var Xe = "DropdownMenuCheckboxItem", pe = a.forwardRef((n, o) => {
    const { __scopeDropdownMenu: r, ...d } = n, s = h(r);
    return e.jsx(Ee, {
      ...s,
      ...d,
      ref: o
    });
  });
  pe.displayName = Xe;
  var Qe = "DropdownMenuRadioGroup", le = a.forwardRef((n, o) => {
    const { __scopeDropdownMenu: r, ...d } = n, s = h(r);
    return e.jsx(ze, {
      ...s,
      ...d,
      ref: o
    });
  });
  le.displayName = Qe;
  var Ze = "DropdownMenuRadioItem", ue = a.forwardRef((n, o) => {
    const { __scopeDropdownMenu: r, ...d } = n, s = h(r);
    return e.jsx(Ae, {
      ...s,
      ...d,
      ref: o
    });
  });
  ue.displayName = Ze;
  var en = "DropdownMenuItemIndicator", ce = a.forwardRef((n, o) => {
    const { __scopeDropdownMenu: r, ...d } = n, s = h(r);
    return e.jsx(Be, {
      ...s,
      ...d,
      ref: o
    });
  });
  ce.displayName = en;
  var nn = "DropdownMenuSeparator", me = a.forwardRef((n, o) => {
    const { __scopeDropdownMenu: r, ...d } = n, s = h(r);
    return e.jsx(Te, {
      ...s,
      ...d,
      ref: o
    });
  });
  me.displayName = nn;
  var on = "DropdownMenuArrow", rn = a.forwardRef((n, o) => {
    const { __scopeDropdownMenu: r, ...d } = n, s = h(r);
    return e.jsx(Oe, {
      ...s,
      ...d,
      ref: o
    });
  });
  rn.displayName = on;
  var tn = (n) => {
    const { __scopeDropdownMenu: o, children: r, open: d, onOpenChange: s, defaultOpen: i } = n, u = h(o), [c, D] = Y({
      prop: d,
      defaultProp: i ?? false,
      onChange: s,
      caller: "DropdownMenuSub"
    });
    return e.jsx(Pe, {
      ...u,
      open: c,
      onOpenChange: D,
      children: r
    });
  }, dn = "DropdownMenuSubTrigger", he = a.forwardRef((n, o) => {
    const { __scopeDropdownMenu: r, ...d } = n, s = h(r);
    return e.jsx(_e, {
      ...s,
      ...d,
      ref: o
    });
  });
  he.displayName = dn;
  var sn = "DropdownMenuSubContent", xe = a.forwardRef((n, o) => {
    const { __scopeDropdownMenu: r, ...d } = n, s = h(r);
    return e.jsx(ke, {
      ...s,
      ...d,
      ref: o,
      style: {
        ...n.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    });
  });
  xe.displayName = sn;
  var an = ee, pn = oe, ln = re, un = de, cn = se, mn = ae, hn = ie, xn = pe, wn = le, Mn = ue, gn = ce, Dn = me, jn = tn, fn = he, In = xe;
  const m = {
    CheckboxItem: xn,
    Content: un,
    ItemIndicator: gn,
    Group: cn,
    Item: hn,
    Label: mn,
    Portal: ln,
    RadioGroup: wn,
    RadioItem: Mn,
    Root: an,
    Sub: jn,
    SubContent: In,
    SubTrigger: fn,
    Separator: Dn,
    Trigger: pn
  }, x = (n) => e.jsx(m.Root, {
    ...n
  });
  x.displayName = "DropdownMenu.Root";
  const w = a.forwardRef(({ children: n, ...o }, r) => e.jsx(m.Trigger, {
    ...o,
    ref: r,
    asChild: true,
    children: Ve(n)
  }));
  w.displayName = "DropdownMenu.Trigger";
  const we = a.createContext({}), M = a.forwardRef((n, o) => {
    const r = fe(), { size: d = R.size.default, variant: s = R.variant.default, highContrast: i = R.highContrast.default } = n, { className: u, children: c, color: D, container: y, forceMount: I, ...b } = K(n, R), C = D || r.accentColor;
    return e.jsx(m.Portal, {
      container: y,
      forceMount: I,
      children: e.jsx(J, {
        asChild: true,
        children: e.jsx(m.Content, {
          "data-accent-color": C,
          align: "start",
          sideOffset: 4,
          collisionPadding: 10,
          ...b,
          asChild: false,
          ref: o,
          className: g("rt-PopperContent", "rt-BaseMenuContent", "rt-DropdownMenuContent", u),
          children: e.jsx(Q, {
            type: "auto",
            children: e.jsx("div", {
              className: g("rt-BaseMenuViewport", "rt-DropdownMenuViewport"),
              children: e.jsx(we.Provider, {
                value: a.useMemo(() => ({
                  size: d,
                  variant: s,
                  color: C,
                  highContrast: i
                }), [
                  d,
                  s,
                  C,
                  i
                ]),
                children: c
              })
            })
          })
        })
      })
    });
  });
  M.displayName = "DropdownMenu.Content";
  const f = a.forwardRef(({ className: n, ...o }, r) => e.jsx(m.Label, {
    ...o,
    asChild: false,
    ref: r,
    className: g("rt-BaseMenuLabel", "rt-DropdownMenuLabel", n)
  }));
  f.displayName = "DropdownMenu.Label";
  const t = a.forwardRef((n, o) => {
    const { className: r, children: d, color: s = Ge.color.default, shortcut: i, ...u } = n;
    return e.jsxs(m.Item, {
      "data-accent-color": s,
      ...u,
      ref: o,
      className: g("rt-reset", "rt-BaseMenuItem", "rt-DropdownMenuItem", r),
      children: [
        e.jsx(Ie, {
          children: d
        }),
        i && e.jsx("div", {
          className: "rt-BaseMenuShortcut rt-DropdownMenuShortcut",
          children: i
        })
      ]
    });
  });
  t.displayName = "DropdownMenu.Item";
  const Me = a.forwardRef(({ className: n, ...o }, r) => e.jsx(m.Group, {
    ...o,
    asChild: false,
    ref: r,
    className: g("rt-BaseMenuGroup", "rt-DropdownMenuGroup", n)
  }));
  Me.displayName = "DropdownMenu.Group";
  const _ = a.forwardRef(({ className: n, ...o }, r) => e.jsx(m.RadioGroup, {
    ...o,
    asChild: false,
    ref: r,
    className: g("rt-BaseMenuRadioGroup", "rt-DropdownMenuRadioGroup", n)
  }));
  _.displayName = "DropdownMenu.RadioGroup";
  const j = a.forwardRef((n, o) => {
    const { children: r, className: d, color: s = We.color.default, ...i } = n;
    return e.jsxs(m.RadioItem, {
      ...i,
      asChild: false,
      ref: o,
      "data-accent-color": s,
      className: g("rt-BaseMenuItem", "rt-BaseMenuRadioItem", "rt-DropdownMenuItem", "rt-DropdownMenuRadioItem", d),
      children: [
        r,
        e.jsx(m.ItemIndicator, {
          className: "rt-BaseMenuItemIndicator rt-DropdownMenuItemIndicator",
          children: e.jsx(X, {
            className: "rt-BaseMenuItemIndicatorIcon rt-DropdownMenuItemIndicatorIcon"
          })
        })
      ]
    });
  });
  j.displayName = "DropdownMenu.RadioItem";
  const S = a.forwardRef((n, o) => {
    const { children: r, className: d, shortcut: s, color: i = Fe.color.default, ...u } = n;
    return e.jsxs(m.CheckboxItem, {
      ...u,
      asChild: false,
      ref: o,
      "data-accent-color": i,
      className: g("rt-BaseMenuItem", "rt-BaseMenuCheckboxItem", "rt-DropdownMenuItem", "rt-DropdownMenuCheckboxItem", d),
      children: [
        r,
        e.jsx(m.ItemIndicator, {
          className: "rt-BaseMenuItemIndicator rt-DropdownMenuItemIndicator",
          children: e.jsx(X, {
            className: "rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon"
          })
        }),
        s && e.jsx("div", {
          className: "rt-BaseMenuShortcut rt-DropdownMenuShortcut",
          children: s
        })
      ]
    });
  });
  S.displayName = "DropdownMenu.CheckboxItem";
  const T = (n) => e.jsx(m.Sub, {
    ...n
  });
  T.displayName = "DropdownMenu.Sub";
  const N = a.forwardRef((n, o) => {
    const { className: r, children: d, ...s } = n;
    return e.jsxs(m.SubTrigger, {
      ...s,
      asChild: false,
      ref: o,
      className: g("rt-BaseMenuItem", "rt-BaseMenuSubTrigger", "rt-DropdownMenuItem", "rt-DropdownMenuSubTrigger", r),
      children: [
        d,
        e.jsx("div", {
          className: "rt-BaseMenuShortcut rt-DropdownMenuShortcut",
          children: e.jsx($e, {
            className: "rt-BaseMenuSubTriggerIcon rt-DropdownMenuSubtriggerIcon"
          })
        })
      ]
    });
  });
  N.displayName = "DropdownMenu.SubTrigger";
  const P = a.forwardRef((n, o) => {
    const { size: r, variant: d, color: s, highContrast: i } = a.useContext(we), { className: u, children: c, container: D, forceMount: y, ...I } = K({
      size: r,
      variant: d,
      color: s,
      highContrast: i,
      ...n
    }, R);
    return e.jsx(m.Portal, {
      container: D,
      forceMount: y,
      children: e.jsx(J, {
        asChild: true,
        children: e.jsx(m.SubContent, {
          "data-accent-color": s,
          alignOffset: -Number(r) * 4,
          sideOffset: 1,
          collisionPadding: 10,
          ...I,
          asChild: false,
          ref: o,
          className: g("rt-PopperContent", "rt-BaseMenuContent", "rt-BaseMenuSubContent", "rt-DropdownMenuContent", "rt-DropdownMenuSubContent", u),
          children: e.jsx(Q, {
            type: "auto",
            children: e.jsx("div", {
              className: g("rt-BaseMenuViewport", "rt-DropdownMenuViewport"),
              children: c
            })
          })
        })
      })
    });
  });
  P.displayName = "DropdownMenu.SubContent";
  const p = a.forwardRef(({ className: n, ...o }, r) => e.jsx(m.Separator, {
    ...o,
    asChild: false,
    ref: r,
    className: g("rt-BaseMenuSeparator", "rt-DropdownMenuSeparator", n)
  }));
  p.displayName = "DropdownMenu.Separator";
  x.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "DropdownMenu.Root"
  };
  w.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "DropdownMenu.Trigger",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  M.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "DropdownMenu.Content",
    props: {
      container: {
        required: false,
        tsType: {
          name: 'ReactComponentPropsWithoutRef["container"]',
          raw: `React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Portal
>["container"]`
        },
        description: ""
      }
    },
    composes: [
      "ComponentPropsWithout"
    ]
  };
  f.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "DropdownMenu.Label",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  t.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "DropdownMenu.Item",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  Me.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "DropdownMenu.Group",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  _.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "DropdownMenu.RadioGroup",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  j.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "DropdownMenu.RadioItem",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  S.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "DropdownMenu.CheckboxItem",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  T.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "DropdownMenu.Sub"
  };
  N.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "DropdownMenu.SubTrigger",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  P.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "DropdownMenu.SubContent",
    props: {
      container: {
        required: false,
        tsType: {
          name: 'ReactComponentPropsWithoutRef["container"]',
          raw: `React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Portal
>["container"]`
        },
        description: ""
      }
    },
    composes: [
      "ComponentPropsWithout"
    ]
  };
  p.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "DropdownMenu.Separator",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  Gn = {
    title: "Base/DropdownMenu",
    component: x,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (n) => e.jsx(J, {
        children: e.jsx("div", {
          style: {
            padding: "40px"
          },
          children: e.jsx(n, {})
        })
      })
    ]
  };
  k = {
    render: (n) => e.jsxs(x, {
      children: [
        e.jsx(w, {
          children: e.jsx(v, {
            variant: "outline",
            children: "Options \u25BC"
          })
        }),
        e.jsxs(M, {
          children: [
            e.jsx(t, {
              children: "Edit"
            }),
            e.jsx(t, {
              children: "Duplicate"
            }),
            e.jsx(p, {}),
            e.jsx(t, {
              children: "Archive"
            }),
            e.jsx(t, {
              color: "red",
              children: "Delete"
            })
          ]
        })
      ]
    })
  };
  z = {
    render: (n) => e.jsxs(x, {
      children: [
        e.jsx(w, {
          children: e.jsx(v, {
            variant: "ghost",
            style: {
              padding: "8px"
            },
            children: e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px"
              },
              children: [
                e.jsx("div", {
                  style: {
                    width: "32px",
                    height: "32px",
                    backgroundColor: "#3b82f6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "bold"
                  },
                  children: "JD"
                }),
                e.jsx(l, {
                  size: "2",
                  children: "John Doe"
                })
              ]
            })
          })
        }),
        e.jsxs(M, {
          style: {
            minWidth: "200px"
          },
          children: [
            e.jsx(f, {
              children: e.jsxs("div", {
                style: {
                  padding: "4px 0"
                },
                children: [
                  e.jsx(l, {
                    size: "2",
                    weight: "medium",
                    children: "John Doe"
                  }),
                  e.jsx(l, {
                    size: "1",
                    color: "gray",
                    style: {
                      display: "block"
                    },
                    children: "john@example.com"
                  })
                ]
              })
            }),
            e.jsx(p, {}),
            e.jsx(t, {
              children: "\u{1F464} Profile"
            }),
            e.jsx(t, {
              children: "\u2699\uFE0F Settings"
            }),
            e.jsx(t, {
              children: "\u{1F4B3} Billing"
            }),
            e.jsx(p, {}),
            e.jsx(t, {
              children: "\u{1F465} Team"
            }),
            e.jsx(t, {
              children: "\u{1F4CA} Analytics"
            }),
            e.jsx(p, {}),
            e.jsx(t, {
              children: "\u2753 Help & Support"
            }),
            e.jsx(t, {
              children: "\u{1F4CB} Changelog"
            }),
            e.jsx(p, {}),
            e.jsx(t, {
              color: "red",
              children: "\u{1F6AA} Sign out"
            })
          ]
        })
      ]
    })
  };
  A = {
    render: (n) => e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px"
      },
      children: [
        e.jsx("div", {
          style: {
            fontSize: "24px"
          },
          children: "\u{1F4C4}"
        }),
        e.jsxs("div", {
          style: {
            flex: 1
          },
          children: [
            e.jsx(l, {
              size: "2",
              weight: "medium",
              children: "project-proposal.pdf"
            }),
            e.jsx(l, {
              size: "1",
              color: "gray",
              style: {
                display: "block"
              },
              children: "2.4 MB \u2022 Modified 2 hours ago"
            })
          ]
        }),
        e.jsxs(x, {
          children: [
            e.jsx(w, {
              children: e.jsx($, {
                variant: "ghost",
                size: "1",
                children: "\u22EF"
              })
            }),
            e.jsxs(M, {
              children: [
                e.jsx(t, {
                  children: "\u{1F4C2} Open"
                }),
                e.jsx(t, {
                  children: "\u{1F4E5} Download"
                }),
                e.jsx(t, {
                  children: "\u{1F441}\uFE0F Preview"
                }),
                e.jsx(p, {}),
                e.jsx(t, {
                  children: "\u{1F4CB} Copy Link"
                }),
                e.jsx(t, {
                  children: "\u{1F517} Share"
                }),
                e.jsx(p, {}),
                e.jsx(t, {
                  children: "\u270F\uFE0F Rename"
                }),
                e.jsx(t, {
                  children: "\u{1F4C1} Move"
                }),
                e.jsx(t, {
                  children: "\u{1F4C4} Duplicate"
                }),
                e.jsx(p, {}),
                e.jsx(t, {
                  color: "red",
                  children: "\u{1F5D1}\uFE0F Delete"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  B = {
    render: (n) => e.jsxs(x, {
      children: [
        e.jsx(w, {
          children: e.jsx(v, {
            variant: "outline",
            children: "Create New \u25BC"
          })
        }),
        e.jsxs(M, {
          children: [
            e.jsx(t, {
              children: "\u{1F4C4} Document"
            }),
            e.jsx(t, {
              children: "\u{1F4CA} Spreadsheet"
            }),
            e.jsx(t, {
              children: "\u{1F3A8} Presentation"
            }),
            e.jsx(p, {}),
            e.jsxs(T, {
              children: [
                e.jsx(N, {
                  children: "\u{1F4C1} Folder"
                }),
                e.jsxs(P, {
                  children: [
                    e.jsx(t, {
                      children: "\u{1F4C2} Regular Folder"
                    }),
                    e.jsx(t, {
                      children: "\u{1F512} Private Folder"
                    }),
                    e.jsx(t, {
                      children: "\u{1F465} Shared Folder"
                    })
                  ]
                })
              ]
            }),
            e.jsxs(T, {
              children: [
                e.jsx(N, {
                  children: "\u{1F3AF} Project"
                }),
                e.jsxs(P, {
                  children: [
                    e.jsx(t, {
                      children: "\u{1F4BB} Web Project"
                    }),
                    e.jsx(t, {
                      children: "\u{1F4F1} Mobile Project"
                    }),
                    e.jsx(t, {
                      children: "\u{1F5A5}\uFE0F Desktop Project"
                    }),
                    e.jsx(p, {}),
                    e.jsx(t, {
                      children: "\u{1F4CB} From Template"
                    })
                  ]
                })
              ]
            }),
            e.jsx(p, {}),
            e.jsx(t, {
              children: "\u{1F4E4} Import"
            })
          ]
        })
      ]
    })
  };
  E = {
    render: (n) => e.jsxs(ye, {
      gap: "6",
      align: "center",
      children: [
        e.jsx(l, {
          size: "3",
          weight: "bold",
          children: "MyApp"
        }),
        e.jsxs(x, {
          children: [
            e.jsx(w, {
              children: e.jsx(v, {
                variant: "ghost",
                children: "Products \u25BC"
              })
            }),
            e.jsxs(M, {
              children: [
                e.jsx(t, {
                  children: "\u{1F4BB} Desktop App"
                }),
                e.jsx(t, {
                  children: "\u{1F4F1} Mobile App"
                }),
                e.jsx(t, {
                  children: "\u{1F310} Web Platform"
                }),
                e.jsx(p, {}),
                e.jsx(t, {
                  children: "\u{1F527} Developer Tools"
                }),
                e.jsx(t, {
                  children: "\u{1F4CA} Analytics"
                }),
                e.jsx(p, {}),
                e.jsx(t, {
                  children: "\u{1F3AF} Enterprise Solutions"
                })
              ]
            })
          ]
        }),
        e.jsxs(x, {
          children: [
            e.jsx(w, {
              children: e.jsx(v, {
                variant: "ghost",
                children: "Resources \u25BC"
              })
            }),
            e.jsxs(M, {
              children: [
                e.jsx(t, {
                  children: "\u{1F4DA} Documentation"
                }),
                e.jsx(t, {
                  children: "\u{1F393} Tutorials"
                }),
                e.jsx(t, {
                  children: "\u{1F4A1} Examples"
                }),
                e.jsx(p, {}),
                e.jsx(t, {
                  children: "\u{1F4DD} Blog"
                }),
                e.jsx(t, {
                  children: "\u{1F399}\uFE0F Podcast"
                }),
                e.jsx(p, {}),
                e.jsx(t, {
                  children: "\u{1F465} Community"
                }),
                e.jsx(t, {
                  children: "\u{1F4AC} Discord"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  L = {
    render: (n) => {
      const [o, r] = a.useState("light"), [d, s] = a.useState(true), [i, u] = a.useState(false);
      return e.jsxs(x, {
        children: [
          e.jsx(w, {
            children: e.jsx($, {
              variant: "ghost",
              children: "\u2699\uFE0F"
            })
          }),
          e.jsxs(M, {
            children: [
              e.jsx(f, {
                children: "Display Settings"
              }),
              e.jsxs(_, {
                value: o,
                onValueChange: r,
                children: [
                  e.jsx(j, {
                    value: "light",
                    children: "\u2600\uFE0F Light Mode"
                  }),
                  e.jsx(j, {
                    value: "dark",
                    children: "\u{1F319} Dark Mode"
                  }),
                  e.jsx(j, {
                    value: "auto",
                    children: "\u{1F504} Auto"
                  })
                ]
              }),
              e.jsx(p, {}),
              e.jsx(f, {
                children: "Preferences"
              }),
              e.jsx(S, {
                checked: d,
                onCheckedChange: s,
                children: "\u{1F514} Enable Notifications"
              }),
              e.jsx(S, {
                checked: i,
                onCheckedChange: u,
                children: "\u{1F4BE} Auto-save"
              }),
              e.jsx(p, {}),
              e.jsx(t, {
                children: "\u2699\uFE0F Advanced Settings"
              })
            ]
          })
        ]
      });
    }
  };
  O = {
    render: (n) => e.jsx("div", {
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
                  children: e.jsx(l, {
                    size: "2",
                    weight: "medium",
                    children: "User"
                  })
                }),
                e.jsx("th", {
                  style: {
                    padding: "12px",
                    border: "1px solid #e1e5e9",
                    textAlign: "left"
                  },
                  children: e.jsx(l, {
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
                  children: e.jsx(l, {
                    size: "2",
                    weight: "medium",
                    children: "Status"
                  })
                }),
                e.jsx("th", {
                  style: {
                    padding: "12px",
                    border: "1px solid #e1e5e9",
                    width: "60px"
                  }
                })
              ]
            })
          }),
          e.jsx("tbody", {
            children: e.jsxs("tr", {
              children: [
                e.jsx("td", {
                  style: {
                    padding: "12px",
                    border: "1px solid #e1e5e9"
                  },
                  children: e.jsxs("div", {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    },
                    children: [
                      e.jsx("div", {
                        style: {
                          width: "32px",
                          height: "32px",
                          backgroundColor: "#e1e5e9",
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center"
                        },
                        children: e.jsx(l, {
                          size: "1",
                          weight: "bold",
                          children: "JD"
                        })
                      }),
                      e.jsxs("div", {
                        children: [
                          e.jsx(l, {
                            size: "2",
                            weight: "medium",
                            children: "John Doe"
                          }),
                          e.jsx(l, {
                            size: "1",
                            color: "gray",
                            style: {
                              display: "block"
                            },
                            children: "john@example.com"
                          })
                        ]
                      })
                    ]
                  })
                }),
                e.jsx("td", {
                  style: {
                    padding: "12px",
                    border: "1px solid #e1e5e9"
                  },
                  children: e.jsx(l, {
                    size: "2",
                    children: "Admin"
                  })
                }),
                e.jsx("td", {
                  style: {
                    padding: "12px",
                    border: "1px solid #e1e5e9"
                  },
                  children: e.jsx(l, {
                    size: "2",
                    color: "green",
                    children: "Active"
                  })
                }),
                e.jsx("td", {
                  style: {
                    padding: "12px",
                    border: "1px solid #e1e5e9",
                    textAlign: "center"
                  },
                  children: e.jsxs(x, {
                    children: [
                      e.jsx(w, {
                        children: e.jsx($, {
                          variant: "ghost",
                          size: "1",
                          children: "\u22EF"
                        })
                      }),
                      e.jsxs(M, {
                        children: [
                          e.jsx(t, {
                            children: "\u{1F441}\uFE0F View Profile"
                          }),
                          e.jsx(t, {
                            children: "\u270F\uFE0F Edit User"
                          }),
                          e.jsx(p, {}),
                          e.jsx(t, {
                            children: "\u{1F504} Reset Password"
                          }),
                          e.jsx(t, {
                            children: "\u{1F4E7} Send Email"
                          }),
                          e.jsx(p, {}),
                          e.jsxs(T, {
                            children: [
                              e.jsx(N, {
                                children: "\u{1F464} Change Role"
                              }),
                              e.jsxs(P, {
                                children: [
                                  e.jsx(t, {
                                    children: "Admin"
                                  }),
                                  e.jsx(t, {
                                    children: "Editor"
                                  }),
                                  e.jsx(t, {
                                    children: "Viewer"
                                  })
                                ]
                              })
                            ]
                          }),
                          e.jsx(p, {}),
                          e.jsx(t, {
                            color: "red",
                            children: "\u{1F6AB} Deactivate"
                          })
                        ]
                      })
                    ]
                  })
                })
              ]
            })
          })
        ]
      })
    })
  };
  G = {
    render: (n) => e.jsxs(x, {
      children: [
        e.jsx(w, {
          children: e.jsxs($, {
            variant: "ghost",
            style: {
              position: "relative"
            },
            children: [
              "\u{1F514}",
              e.jsx("div", {
                style: {
                  position: "absolute",
                  top: "-2px",
                  right: "-2px",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#ef4444",
                  borderRadius: "50%"
                }
              })
            ]
          })
        }),
        e.jsxs(M, {
          style: {
            minWidth: "320px"
          },
          children: [
            e.jsx(f, {
              children: e.jsxs("div", {
                style: {
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center"
                },
                children: [
                  e.jsx(l, {
                    size: "2",
                    weight: "medium",
                    children: "Notifications"
                  }),
                  e.jsx(l, {
                    size: "1",
                    color: "blue",
                    style: {
                      cursor: "pointer"
                    },
                    children: "Mark all read"
                  })
                ]
              })
            }),
            e.jsx(p, {}),
            e.jsxs("div", {
              style: {
                maxHeight: "300px",
                overflowY: "auto"
              },
              children: [
                e.jsx(t, {
                  style: {
                    padding: "12px"
                  },
                  children: e.jsxs("div", {
                    style: {
                      display: "flex",
                      gap: "8px"
                    },
                    children: [
                      e.jsx("div", {
                        style: {
                          fontSize: "16px"
                        },
                        children: "\u{1F4AC}"
                      }),
                      e.jsxs("div", {
                        style: {
                          flex: 1
                        },
                        children: [
                          e.jsx(l, {
                            size: "2",
                            weight: "medium",
                            style: {
                              display: "block"
                            },
                            children: "New comment on your post"
                          }),
                          e.jsx(l, {
                            size: "1",
                            color: "gray",
                            children: 'Sarah commented: "Great work on this feature!"'
                          }),
                          e.jsx(l, {
                            size: "1",
                            color: "gray",
                            style: {
                              marginTop: "4px"
                            },
                            children: "2 minutes ago"
                          })
                        ]
                      })
                    ]
                  })
                }),
                e.jsx(t, {
                  style: {
                    padding: "12px"
                  },
                  children: e.jsxs("div", {
                    style: {
                      display: "flex",
                      gap: "8px"
                    },
                    children: [
                      e.jsx("div", {
                        style: {
                          fontSize: "16px"
                        },
                        children: "\u2705"
                      }),
                      e.jsxs("div", {
                        style: {
                          flex: 1
                        },
                        children: [
                          e.jsx(l, {
                            size: "2",
                            weight: "medium",
                            style: {
                              display: "block"
                            },
                            children: "Task completed"
                          }),
                          e.jsx(l, {
                            size: "1",
                            color: "gray",
                            children: '"Update user dashboard" has been marked as complete'
                          }),
                          e.jsx(l, {
                            size: "1",
                            color: "gray",
                            style: {
                              marginTop: "4px"
                            },
                            children: "1 hour ago"
                          })
                        ]
                      })
                    ]
                  })
                }),
                e.jsx(t, {
                  style: {
                    padding: "12px"
                  },
                  children: e.jsxs("div", {
                    style: {
                      display: "flex",
                      gap: "8px"
                    },
                    children: [
                      e.jsx("div", {
                        style: {
                          fontSize: "16px"
                        },
                        children: "\u{1F389}"
                      }),
                      e.jsxs("div", {
                        style: {
                          flex: 1
                        },
                        children: [
                          e.jsx(l, {
                            size: "2",
                            weight: "medium",
                            style: {
                              display: "block"
                            },
                            children: "Welcome to the team!"
                          }),
                          e.jsx(l, {
                            size: "1",
                            color: "gray",
                            children: `You've been added to the "Frontend Development" team`
                          }),
                          e.jsx(l, {
                            size: "1",
                            color: "gray",
                            style: {
                              marginTop: "4px"
                            },
                            children: "3 hours ago"
                          })
                        ]
                      })
                    ]
                  })
                })
              ]
            }),
            e.jsx(p, {}),
            e.jsx(t, {
              style: {
                textAlign: "center"
              },
              children: e.jsx(l, {
                size: "2",
                color: "blue",
                children: "View all notifications"
              })
            })
          ]
        })
      ]
    })
  };
  W = {
    render: (n) => {
      const [o, r] = a.useState("en"), d = {
        en: {
          flag: "\u{1F1FA}\u{1F1F8}",
          name: "English"
        },
        es: {
          flag: "\u{1F1EA}\u{1F1F8}",
          name: "Espa\xF1ol"
        },
        fr: {
          flag: "\u{1F1EB}\u{1F1F7}",
          name: "Fran\xE7ais"
        },
        de: {
          flag: "\u{1F1E9}\u{1F1EA}",
          name: "Deutsch"
        },
        zh: {
          flag: "\u{1F1E8}\u{1F1F3}",
          name: "\u4E2D\u6587"
        },
        ja: {
          flag: "\u{1F1EF}\u{1F1F5}",
          name: "\u65E5\u672C\u8A9E"
        }
      };
      return e.jsxs(x, {
        children: [
          e.jsx(w, {
            children: e.jsxs(v, {
              variant: "outline",
              size: "2",
              children: [
                d[o].flag,
                " ",
                d[o].name
              ]
            })
          }),
          e.jsxs(M, {
            style: {
              minWidth: "160px"
            },
            children: [
              e.jsx(f, {
                children: "Choose Language"
              }),
              e.jsx(p, {}),
              e.jsx(_, {
                value: o,
                onValueChange: r,
                children: Object.entries(d).map(([s, i]) => e.jsxs(j, {
                  value: s,
                  children: [
                    i.flag,
                    " ",
                    i.name
                  ]
                }, s))
              })
            ]
          })
        ]
      });
    }
  };
  F = {
    render: (n) => {
      const [o, r] = a.useState("date"), [d, s] = a.useState(true), [i, u] = a.useState(true);
      return e.jsxs(x, {
        children: [
          e.jsx(w, {
            children: e.jsx(v, {
              variant: "outline",
              children: "\u{1F527} Sort & Filter"
            })
          }),
          e.jsxs(M, {
            style: {
              minWidth: "200px"
            },
            children: [
              e.jsx(f, {
                children: "Sort by"
              }),
              e.jsxs(_, {
                value: o,
                onValueChange: r,
                children: [
                  e.jsx(j, {
                    value: "date",
                    children: "\u{1F4C5} Date Created"
                  }),
                  e.jsx(j, {
                    value: "name",
                    children: "\u{1F4DD} Name"
                  }),
                  e.jsx(j, {
                    value: "size",
                    children: "\u{1F4CF} Size"
                  }),
                  e.jsx(j, {
                    value: "modified",
                    children: "\u{1F504} Last Modified"
                  })
                ]
              }),
              e.jsx(p, {}),
              e.jsx(f, {
                children: "Show items"
              }),
              e.jsx(S, {
                checked: d,
                onCheckedChange: s,
                children: "\u2705 Completed"
              }),
              e.jsx(S, {
                checked: i,
                onCheckedChange: u,
                children: "\u23F3 Pending"
              }),
              e.jsx(p, {}),
              e.jsx(t, {
                children: "\u{1F504} Reset Filters"
              })
            ]
          })
        ]
      });
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_a = k.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: _args => <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">Options \u25BC</Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Archive</DropdownMenu.Item>
        <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
}`,
        ...(_c = (_b = k.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_d = z.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: _args => <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" style={{
        padding: "8px"
      }}>
          <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
            <div style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#3b82f6",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "14px",
            fontWeight: "bold"
          }}>
              JD
            </div>
            <Text size="2">John Doe</Text>
          </div>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content style={{
      minWidth: "200px"
    }}>
        <DropdownMenu.Label>
          <div style={{
          padding: "4px 0"
        }}>
            <Text size="2" weight="medium">
              John Doe
            </Text>
            <Text size="1" color="gray" style={{
            display: "block"
          }}>
              john@example.com
            </Text>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />

        <DropdownMenu.Item>\u{1F464} Profile</DropdownMenu.Item>
        <DropdownMenu.Item>\u2699\uFE0F Settings</DropdownMenu.Item>
        <DropdownMenu.Item>\u{1F4B3} Billing</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Item>\u{1F465} Team</DropdownMenu.Item>
        <DropdownMenu.Item>\u{1F4CA} Analytics</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Item>\u2753 Help & Support</DropdownMenu.Item>
        <DropdownMenu.Item>\u{1F4CB} Changelog</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Item color="red">\u{1F6AA} Sign out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
}`,
        ...(_f = (_e2 = z.parameters) == null ? void 0 : _e2.docs) == null ? void 0 : _f.source
      }
    }
  };
  A.parameters = {
    ...A.parameters,
    docs: {
      ...(_g = A.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    border: "1px solid #e1e5e9",
    borderRadius: "8px"
  }}>
      <div style={{
      fontSize: "24px"
    }}>\u{1F4C4}</div>
      <div style={{
      flex: 1
    }}>
        <Text size="2" weight="medium">
          project-proposal.pdf
        </Text>
        <Text size="1" color="gray" style={{
        display: "block"
      }}>
          2.4 MB \u2022 Modified 2 hours ago
        </Text>
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost" size="1">
            \u22EF
          </IconButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item>\u{1F4C2} Open</DropdownMenu.Item>
          <DropdownMenu.Item>\u{1F4E5} Download</DropdownMenu.Item>
          <DropdownMenu.Item>\u{1F441}\uFE0F Preview</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>\u{1F4CB} Copy Link</DropdownMenu.Item>
          <DropdownMenu.Item>\u{1F517} Share</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>\u270F\uFE0F Rename</DropdownMenu.Item>
          <DropdownMenu.Item>\u{1F4C1} Move</DropdownMenu.Item>
          <DropdownMenu.Item>\u{1F4C4} Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red">\u{1F5D1}\uFE0F Delete</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
}`,
        ...(_i = (_h = A.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_j = B.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: _args => <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">Create New \u25BC</Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item>\u{1F4C4} Document</DropdownMenu.Item>
        <DropdownMenu.Item>\u{1F4CA} Spreadsheet</DropdownMenu.Item>
        <DropdownMenu.Item>\u{1F3A8} Presentation</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>\u{1F4C1} Folder</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>\u{1F4C2} Regular Folder</DropdownMenu.Item>
            <DropdownMenu.Item>\u{1F512} Private Folder</DropdownMenu.Item>
            <DropdownMenu.Item>\u{1F465} Shared Folder</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>\u{1F3AF} Project</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>\u{1F4BB} Web Project</DropdownMenu.Item>
            <DropdownMenu.Item>\u{1F4F1} Mobile Project</DropdownMenu.Item>
            <DropdownMenu.Item>\u{1F5A5}\uFE0F Desktop Project</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>\u{1F4CB} From Template</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Item>\u{1F4E4} Import</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
}`,
        ...(_l = (_k = B.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  E.parameters = {
    ...E.parameters,
    docs: {
      ...(_m = E.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: _args => <Flex gap="6" align="center">
      <Text size="3" weight="bold">
        MyApp
      </Text>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost">Products \u25BC</Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item>\u{1F4BB} Desktop App</DropdownMenu.Item>
          <DropdownMenu.Item>\u{1F4F1} Mobile App</DropdownMenu.Item>
          <DropdownMenu.Item>\u{1F310} Web Platform</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>\u{1F527} Developer Tools</DropdownMenu.Item>
          <DropdownMenu.Item>\u{1F4CA} Analytics</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>\u{1F3AF} Enterprise Solutions</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost">Resources \u25BC</Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item>\u{1F4DA} Documentation</DropdownMenu.Item>
          <DropdownMenu.Item>\u{1F393} Tutorials</DropdownMenu.Item>
          <DropdownMenu.Item>\u{1F4A1} Examples</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>\u{1F4DD} Blog</DropdownMenu.Item>
          <DropdownMenu.Item>\u{1F399}\uFE0F Podcast</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>\u{1F465} Community</DropdownMenu.Item>
          <DropdownMenu.Item>\u{1F4AC} Discord</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
}`,
        ...(_o = (_n = E.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  L.parameters = {
    ...L.parameters,
    docs: {
      ...(_p = L.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: _args => {
    const [theme, setTheme] = React.useState("light");
    const [notifications, setNotifications] = React.useState(true);
    const [autoSave, setAutoSave] = React.useState(false);
    return <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost">\u2699\uFE0F</IconButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Label>Display Settings</DropdownMenu.Label>

          <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenu.RadioItem value="light">
              \u2600\uFE0F Light Mode
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="dark">
              \u{1F319} Dark Mode
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="auto">
              \u{1F504} Auto
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Separator />
          <DropdownMenu.Label>Preferences</DropdownMenu.Label>

          <DropdownMenu.CheckboxItem checked={notifications} onCheckedChange={setNotifications}>
            \u{1F514} Enable Notifications
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.CheckboxItem checked={autoSave} onCheckedChange={setAutoSave}>
            \u{1F4BE} Auto-save
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator />
          <DropdownMenu.Item>\u2699\uFE0F Advanced Settings</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>;
  }
}`,
        ...(_r = (_q = L.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  O.parameters = {
    ...O.parameters,
    docs: {
      ...(_s = O.parameters) == null ? void 0 : _s.docs,
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
                User
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
            <th style={{
            padding: "12px",
            border: "1px solid #e1e5e9",
            width: "60px"
          }} />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{
            padding: "12px",
            border: "1px solid #e1e5e9"
          }}>
              <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
                <div style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#e1e5e9",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                  <Text size="1" weight="bold">
                    JD
                  </Text>
                </div>
                <div>
                  <Text size="2" weight="medium">
                    John Doe
                  </Text>
                  <Text size="1" color="gray" style={{
                  display: "block"
                }}>
                    john@example.com
                  </Text>
                </div>
              </div>
            </td>
            <td style={{
            padding: "12px",
            border: "1px solid #e1e5e9"
          }}>
              <Text size="2">Admin</Text>
            </td>
            <td style={{
            padding: "12px",
            border: "1px solid #e1e5e9"
          }}>
              <Text size="2" color="green">
                Active
              </Text>
            </td>
            <td style={{
            padding: "12px",
            border: "1px solid #e1e5e9",
            textAlign: "center"
          }}>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton variant="ghost" size="1">
                    \u22EF
                  </IconButton>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                  <DropdownMenu.Item>\u{1F441}\uFE0F View Profile</DropdownMenu.Item>
                  <DropdownMenu.Item>\u270F\uFE0F Edit User</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>\u{1F504} Reset Password</DropdownMenu.Item>
                  <DropdownMenu.Item>\u{1F4E7} Send Email</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>
                      \u{1F464} Change Role
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent>
                      <DropdownMenu.Item>Admin</DropdownMenu.Item>
                      <DropdownMenu.Item>Editor</DropdownMenu.Item>
                      <DropdownMenu.Item>Viewer</DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Sub>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item color="red">
                    \u{1F6AB} Deactivate
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
}`,
        ...(_u = (_t = O.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  G.parameters = {
    ...G.parameters,
    docs: {
      ...(_v = G.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: _args => <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" style={{
        position: "relative"
      }}>
          \u{1F514}
          <div style={{
          position: "absolute",
          top: "-2px",
          right: "-2px",
          width: "8px",
          height: "8px",
          backgroundColor: "#ef4444",
          borderRadius: "50%"
        }} />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content style={{
      minWidth: "320px"
    }}>
        <DropdownMenu.Label>
          <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
            <Text size="2" weight="medium">
              Notifications
            </Text>
            <Text size="1" color="blue" style={{
            cursor: "pointer"
          }}>
              Mark all read
            </Text>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />

        <div style={{
        maxHeight: "300px",
        overflowY: "auto"
      }}>
          <DropdownMenu.Item style={{
          padding: "12px"
        }}>
            <div style={{
            display: "flex",
            gap: "8px"
          }}>
              <div style={{
              fontSize: "16px"
            }}>\u{1F4AC}</div>
              <div style={{
              flex: 1
            }}>
                <Text size="2" weight="medium" style={{
                display: "block"
              }}>
                  New comment on your post
                </Text>
                <Text size="1" color="gray">
                  Sarah commented: "Great work on this feature!"
                </Text>
                <Text size="1" color="gray" style={{
                marginTop: "4px"
              }}>
                  2 minutes ago
                </Text>
              </div>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item style={{
          padding: "12px"
        }}>
            <div style={{
            display: "flex",
            gap: "8px"
          }}>
              <div style={{
              fontSize: "16px"
            }}>\u2705</div>
              <div style={{
              flex: 1
            }}>
                <Text size="2" weight="medium" style={{
                display: "block"
              }}>
                  Task completed
                </Text>
                <Text size="1" color="gray">
                  "Update user dashboard" has been marked as complete
                </Text>
                <Text size="1" color="gray" style={{
                marginTop: "4px"
              }}>
                  1 hour ago
                </Text>
              </div>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item style={{
          padding: "12px"
        }}>
            <div style={{
            display: "flex",
            gap: "8px"
          }}>
              <div style={{
              fontSize: "16px"
            }}>\u{1F389}</div>
              <div style={{
              flex: 1
            }}>
                <Text size="2" weight="medium" style={{
                display: "block"
              }}>
                  Welcome to the team!
                </Text>
                <Text size="1" color="gray">
                  You've been added to the "Frontend Development" team
                </Text>
                <Text size="1" color="gray" style={{
                marginTop: "4px"
              }}>
                  3 hours ago
                </Text>
              </div>
            </div>
          </DropdownMenu.Item>
        </div>

        <DropdownMenu.Separator />
        <DropdownMenu.Item style={{
        textAlign: "center"
      }}>
          <Text size="2" color="blue">
            View all notifications
          </Text>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
}`,
        ...(_x = (_w = G.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  W.parameters = {
    ...W.parameters,
    docs: {
      ...(_y = W.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: _args => {
    const [language, setLanguage] = React.useState("en");
    const languages = {
      en: {
        flag: "\u{1F1FA}\u{1F1F8}",
        name: "English"
      },
      es: {
        flag: "\u{1F1EA}\u{1F1F8}",
        name: "Espa\xF1ol"
      },
      fr: {
        flag: "\u{1F1EB}\u{1F1F7}",
        name: "Fran\xE7ais"
      },
      de: {
        flag: "\u{1F1E9}\u{1F1EA}",
        name: "Deutsch"
      },
      zh: {
        flag: "\u{1F1E8}\u{1F1F3}",
        name: "\u4E2D\u6587"
      },
      ja: {
        flag: "\u{1F1EF}\u{1F1F5}",
        name: "\u65E5\u672C\u8A9E"
      }
    };
    return <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline" size="2">
            {languages[language].flag} {languages[language].name}
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content style={{
        minWidth: "160px"
      }}>
          <DropdownMenu.Label>Choose Language</DropdownMenu.Label>
          <DropdownMenu.Separator />

          <DropdownMenu.RadioGroup value={language} onValueChange={setLanguage}>
            {Object.entries(languages).map(([code, lang]) => <DropdownMenu.RadioItem key={code} value={code}>
                {lang.flag} {lang.name}
              </DropdownMenu.RadioItem>)}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>;
  }
}`,
        ...(_A = (_z = W.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  F.parameters = {
    ...F.parameters,
    docs: {
      ...(_B = F.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: _args => {
    const [sortBy, setSortBy] = React.useState("date");
    const [showCompleted, setShowCompleted] = React.useState(true);
    const [showPending, setShowPending] = React.useState(true);
    return <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline">\u{1F527} Sort & Filter</Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content style={{
        minWidth: "200px"
      }}>
          <DropdownMenu.Label>Sort by</DropdownMenu.Label>

          <DropdownMenu.RadioGroup value={sortBy} onValueChange={setSortBy}>
            <DropdownMenu.RadioItem value="date">
              \u{1F4C5} Date Created
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="name">
              \u{1F4DD} Name
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="size">
              \u{1F4CF} Size
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="modified">
              \u{1F504} Last Modified
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Separator />
          <DropdownMenu.Label>Show items</DropdownMenu.Label>

          <DropdownMenu.CheckboxItem checked={showCompleted} onCheckedChange={setShowCompleted}>
            \u2705 Completed
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.CheckboxItem checked={showPending} onCheckedChange={setShowPending}>
            \u23F3 Pending
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator />
          <DropdownMenu.Item>\u{1F504} Reset Filters</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>;
  }
}`,
        ...(_D = (_C = F.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  Wn = [
    "Default",
    "UserMenu",
    "FileActionsMenu",
    "WithSubmenus",
    "NavigationMenu",
    "SettingsMenu",
    "TableRowActions",
    "NotificationDropdown",
    "LanguageSelector",
    "SortAndFilterMenu"
  ];
});
export {
  k as Default,
  A as FileActionsMenu,
  W as LanguageSelector,
  E as NavigationMenu,
  G as NotificationDropdown,
  L as SettingsMenu,
  F as SortAndFilterMenu,
  O as TableRowActions,
  z as UserMenu,
  B as WithSubmenus,
  Wn as __namedExportsOrder,
  __tla,
  Gn as default
};
