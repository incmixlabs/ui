import { c as qe, m as me, r as o, e as J, d as Ze, j as c, R as he, A as $e, k as Y, u as O, b as C, P as k, n as Je, o as Qe, g as et, D as tt, C as nt, p as ot, q as rt, s as X, t as st, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { c as at, __tla as __tla_1 } from "./index-D3rDgx3q.js";
import { P as ct, h as ut, u as it, R as lt, F as dt, __tla as __tla_2 } from "./index-ChItmDsK.js";
import { u as fe, __tla as __tla_3 } from "./index-CEOg2jVB.js";
import { c as ve, I as ft, R as pt, __tla as __tla_4 } from "./index-NEJkd5JU.js";
let Zt, Jt, Qt, tn, en, $t, qt, an, un, ln, Wt, dn, nn, on, rn, sn, cn, fn, pn, hn, mn;
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
  let $, mt, Ce, ht, vt, Ct, N, A, Mt, gt, P, F, Me, ge, _, xt, L, xe;
  $ = [
    "Enter",
    " "
  ];
  mt = [
    "ArrowDown",
    "PageUp",
    "Home"
  ];
  Ce = [
    "ArrowUp",
    "PageDown",
    "End"
  ];
  ht = [
    ...mt,
    ...Ce
  ];
  vt = {
    ltr: [
      ...$,
      "ArrowRight"
    ],
    rtl: [
      ...$,
      "ArrowLeft"
    ]
  };
  Ct = {
    ltr: [
      "ArrowLeft"
    ],
    rtl: [
      "ArrowRight"
    ]
  };
  N = "Menu";
  [A, Mt, gt] = at(N);
  [P, Wt] = qe(N, [
    gt,
    me,
    ve
  ]);
  F = me();
  Me = ve();
  [ge, _] = P(N);
  [xt, L] = P(N);
  xe = (e) => {
    const { __scopeMenu: n, open: t = false, children: r, dir: u, onOpenChange: s, modal: d = true } = e, m = F(n), [h, p] = o.useState(null), l = o.useRef(false), a = J(s), f = Ze(u);
    return o.useEffect(() => {
      const g = () => {
        l.current = true, document.addEventListener("pointerdown", v, {
          capture: true,
          once: true
        }), document.addEventListener("pointermove", v, {
          capture: true,
          once: true
        });
      }, v = () => l.current = false;
      return document.addEventListener("keydown", g, {
        capture: true
      }), () => {
        document.removeEventListener("keydown", g, {
          capture: true
        }), document.removeEventListener("pointerdown", v, {
          capture: true
        }), document.removeEventListener("pointermove", v, {
          capture: true
        });
      };
    }, []), c.jsx(he, {
      ...m,
      children: c.jsx(ge, {
        scope: n,
        open: t,
        onOpenChange: a,
        content: h,
        onContentChange: p,
        children: c.jsx(xt, {
          scope: n,
          onClose: o.useCallback(() => a(false), [
            a
          ]),
          isUsingKeyboardRef: l,
          dir: f,
          modal: d,
          children: r
        })
      })
    });
  };
  xe.displayName = N;
  var _t = "MenuAnchor", Q = o.forwardRef((e, n) => {
    const { __scopeMenu: t, ...r } = e, u = F(t);
    return c.jsx($e, {
      ...u,
      ...r,
      ref: n
    });
  });
  Q.displayName = _t;
  var ee = "MenuPortal", [Rt, _e] = P(ee, {
    forceMount: void 0
  }), Re = (e) => {
    const { __scopeMenu: n, forceMount: t, children: r, container: u } = e, s = _(ee, n);
    return c.jsx(Rt, {
      scope: n,
      forceMount: t,
      children: c.jsx(Y, {
        present: t || s.open,
        children: c.jsx(ct, {
          asChild: true,
          container: u,
          children: r
        })
      })
    });
  };
  Re.displayName = ee;
  var x = "MenuContent", [Pt, te] = P(x), Pe = o.forwardRef((e, n) => {
    const t = _e(x, e.__scopeMenu), { forceMount: r = t.forceMount, ...u } = e, s = _(x, e.__scopeMenu), d = L(x, e.__scopeMenu);
    return c.jsx(A.Provider, {
      scope: e.__scopeMenu,
      children: c.jsx(Y, {
        present: r || s.open,
        children: c.jsx(A.Slot, {
          scope: e.__scopeMenu,
          children: d.modal ? c.jsx(St, {
            ...u,
            ref: n
          }) : c.jsx(Et, {
            ...u,
            ref: n
          })
        })
      })
    });
  }), St = o.forwardRef((e, n) => {
    const t = _(x, e.__scopeMenu), r = o.useRef(null), u = O(n, r);
    return o.useEffect(() => {
      const s = r.current;
      if (s) return ut(s);
    }, []), c.jsx(ne, {
      ...e,
      ref: u,
      trapFocus: t.open,
      disableOutsidePointerEvents: t.open,
      disableOutsideScroll: true,
      onFocusOutside: C(e.onFocusOutside, (s) => s.preventDefault(), {
        checkForDefaultPrevented: false
      }),
      onDismiss: () => t.onOpenChange(false)
    });
  }), Et = o.forwardRef((e, n) => {
    const t = _(x, e.__scopeMenu);
    return c.jsx(ne, {
      ...e,
      ref: n,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      disableOutsideScroll: false,
      onDismiss: () => t.onOpenChange(false)
    });
  }), It = et("MenuContent.ScrollLock"), ne = o.forwardRef((e, n) => {
    const { __scopeMenu: t, loop: r = false, trapFocus: u, onOpenAutoFocus: s, onCloseAutoFocus: d, disableOutsidePointerEvents: m, onEntryFocus: h, onEscapeKeyDown: p, onPointerDownOutside: l, onFocusOutside: a, onInteractOutside: f, onDismiss: g, disableOutsideScroll: v, ...S } = e, y = _(x, t), E = L(x, t), Ue = F(t), Ve = Me(t), ce = Mt(t), [Be, ue] = o.useState(null), K = o.useRef(null), Ye = O(n, K, y.onContentChange), G = o.useRef(0), U = o.useRef(""), Xe = o.useRef(0), H = o.useRef(null), ie = o.useRef("right"), W = o.useRef(0), ze = v ? lt : o.Fragment, He = v ? {
      as: It,
      allowPinchZoom: true
    } : void 0, We = (i) => {
      var _a, _b;
      const w = U.current + i, R = ce().filter((M) => !M.disabled), b = document.activeElement, q = (_a = R.find((M) => M.ref.current === b)) == null ? void 0 : _a.textValue, Z = R.map((M) => M.textValue), le = Lt(Z, w, q), T = (_b = R.find((M) => M.textValue === le)) == null ? void 0 : _b.ref.current;
      (function M(de) {
        U.current = de, window.clearTimeout(G.current), de !== "" && (G.current = window.setTimeout(() => M(""), 1e3));
      })(w), T && setTimeout(() => T.focus());
    };
    o.useEffect(() => () => window.clearTimeout(G.current), []), it();
    const I = o.useCallback((i) => {
      var _a, _b;
      return ie.current === ((_a = H.current) == null ? void 0 : _a.side) && Gt(i, (_b = H.current) == null ? void 0 : _b.area);
    }, []);
    return c.jsx(Pt, {
      scope: t,
      searchRef: U,
      onItemEnter: o.useCallback((i) => {
        I(i) && i.preventDefault();
      }, [
        I
      ]),
      onItemLeave: o.useCallback((i) => {
        var _a;
        I(i) || ((_a = K.current) == null ? void 0 : _a.focus(), ue(null));
      }, [
        I
      ]),
      onTriggerLeave: o.useCallback((i) => {
        I(i) && i.preventDefault();
      }, [
        I
      ]),
      pointerGraceTimerRef: Xe,
      onPointerGraceIntentChange: o.useCallback((i) => {
        H.current = i;
      }, []),
      children: c.jsx(ze, {
        ...He,
        children: c.jsx(dt, {
          asChild: true,
          trapped: u,
          onMountAutoFocus: C(s, (i) => {
            var _a;
            i.preventDefault(), (_a = K.current) == null ? void 0 : _a.focus({
              preventScroll: true
            });
          }),
          onUnmountAutoFocus: d,
          children: c.jsx(tt, {
            asChild: true,
            disableOutsidePointerEvents: m,
            onEscapeKeyDown: p,
            onPointerDownOutside: l,
            onFocusOutside: a,
            onInteractOutside: f,
            onDismiss: g,
            children: c.jsx(pt, {
              asChild: true,
              ...Ve,
              dir: E.dir,
              orientation: "vertical",
              loop: r,
              currentTabStopId: Be,
              onCurrentTabStopIdChange: ue,
              onEntryFocus: C(h, (i) => {
                E.isUsingKeyboardRef.current || i.preventDefault();
              }),
              preventScrollOnEntryFocus: true,
              children: c.jsx(nt, {
                role: "menu",
                "aria-orientation": "vertical",
                "data-state": Ge(y.open),
                "data-radix-menu-content": "",
                dir: E.dir,
                ...Ue,
                ...S,
                ref: Ye,
                style: {
                  outline: "none",
                  ...S.style
                },
                onKeyDown: C(S.onKeyDown, (i) => {
                  const R = i.target.closest("[data-radix-menu-content]") === i.currentTarget, b = i.ctrlKey || i.altKey || i.metaKey, q = i.key.length === 1;
                  R && (i.key === "Tab" && i.preventDefault(), !b && q && We(i.key));
                  const Z = K.current;
                  if (i.target !== Z || !ht.includes(i.key)) return;
                  i.preventDefault();
                  const T = ce().filter((M) => !M.disabled).map((M) => M.ref.current);
                  Ce.includes(i.key) && T.reverse(), Nt(T);
                }),
                onBlur: C(e.onBlur, (i) => {
                  i.currentTarget.contains(i.target) || (window.clearTimeout(G.current), U.current = "");
                }),
                onPointerMove: C(e.onPointerMove, j((i) => {
                  const w = i.target, R = W.current !== i.clientX;
                  if (i.currentTarget.contains(w) && R) {
                    const b = i.clientX > W.current ? "right" : "left";
                    ie.current = b, W.current = i.clientX;
                  }
                }))
              })
            })
          })
        })
      })
    });
  });
  Pe.displayName = x;
  var wt = "MenuGroup", oe = o.forwardRef((e, n) => {
    const { __scopeMenu: t, ...r } = e;
    return c.jsx(k.div, {
      role: "group",
      ...r,
      ref: n
    });
  });
  oe.displayName = wt;
  var yt = "MenuLabel", Se = o.forwardRef((e, n) => {
    const { __scopeMenu: t, ...r } = e;
    return c.jsx(k.div, {
      ...r,
      ref: n
    });
  });
  Se.displayName = yt;
  var V = "MenuItem", pe = "menu.itemSelect", z = o.forwardRef((e, n) => {
    const { disabled: t = false, onSelect: r, ...u } = e, s = o.useRef(null), d = L(V, e.__scopeMenu), m = te(V, e.__scopeMenu), h = O(n, s), p = o.useRef(false), l = () => {
      const a = s.current;
      if (!t && a) {
        const f = new CustomEvent(pe, {
          bubbles: true,
          cancelable: true
        });
        a.addEventListener(pe, (g) => r == null ? void 0 : r(g), {
          once: true
        }), Qe(a, f), f.defaultPrevented ? p.current = false : d.onClose();
      }
    };
    return c.jsx(Ee, {
      ...u,
      ref: h,
      disabled: t,
      onClick: C(e.onClick, l),
      onPointerDown: (a) => {
        var _a;
        (_a = e.onPointerDown) == null ? void 0 : _a.call(e, a), p.current = true;
      },
      onPointerUp: C(e.onPointerUp, (a) => {
        var _a;
        p.current || ((_a = a.currentTarget) == null ? void 0 : _a.click());
      }),
      onKeyDown: C(e.onKeyDown, (a) => {
        const f = m.searchRef.current !== "";
        t || f && a.key === " " || $.includes(a.key) && (a.currentTarget.click(), a.preventDefault());
      })
    });
  });
  z.displayName = V;
  var Ee = o.forwardRef((e, n) => {
    const { __scopeMenu: t, disabled: r = false, textValue: u, ...s } = e, d = te(V, t), m = Me(t), h = o.useRef(null), p = O(n, h), [l, a] = o.useState(false), [f, g] = o.useState("");
    return o.useEffect(() => {
      const v = h.current;
      v && g((v.textContent ?? "").trim());
    }, [
      s.children
    ]), c.jsx(A.ItemSlot, {
      scope: t,
      disabled: r,
      textValue: u ?? f,
      children: c.jsx(ft, {
        asChild: true,
        ...m,
        focusable: !r,
        children: c.jsx(k.div, {
          role: "menuitem",
          "data-highlighted": l ? "" : void 0,
          "aria-disabled": r || void 0,
          "data-disabled": r ? "" : void 0,
          ...s,
          ref: p,
          onPointerMove: C(e.onPointerMove, j((v) => {
            r ? d.onItemLeave(v) : (d.onItemEnter(v), v.defaultPrevented || v.currentTarget.focus({
              preventScroll: true
            }));
          })),
          onPointerLeave: C(e.onPointerLeave, j((v) => d.onItemLeave(v))),
          onFocus: C(e.onFocus, () => a(true)),
          onBlur: C(e.onBlur, () => a(false))
        })
      })
    });
  }), bt = "MenuCheckboxItem", Ie = o.forwardRef((e, n) => {
    const { checked: t = false, onCheckedChange: r, ...u } = e;
    return c.jsx(De, {
      scope: e.__scopeMenu,
      checked: t,
      children: c.jsx(z, {
        role: "menuitemcheckbox",
        "aria-checked": B(t) ? "mixed" : t,
        ...u,
        ref: n,
        "data-state": ae(t),
        onSelect: C(u.onSelect, () => r == null ? void 0 : r(B(t) ? true : !t), {
          checkForDefaultPrevented: false
        })
      })
    });
  });
  Ie.displayName = bt;
  var we = "MenuRadioGroup", [Tt, Dt] = P(we, {
    value: void 0,
    onValueChange: () => {
    }
  }), ye = o.forwardRef((e, n) => {
    const { value: t, onValueChange: r, ...u } = e, s = J(r);
    return c.jsx(Tt, {
      scope: e.__scopeMenu,
      value: t,
      onValueChange: s,
      children: c.jsx(oe, {
        ...u,
        ref: n
      })
    });
  });
  ye.displayName = we;
  var be = "MenuRadioItem", Te = o.forwardRef((e, n) => {
    const { value: t, ...r } = e, u = Dt(be, e.__scopeMenu), s = t === u.value;
    return c.jsx(De, {
      scope: e.__scopeMenu,
      checked: s,
      children: c.jsx(z, {
        role: "menuitemradio",
        "aria-checked": s,
        ...r,
        ref: n,
        "data-state": ae(s),
        onSelect: C(r.onSelect, () => {
          var _a;
          return (_a = u.onValueChange) == null ? void 0 : _a.call(u, t);
        }, {
          checkForDefaultPrevented: false
        })
      })
    });
  });
  Te.displayName = be;
  var re = "MenuItemIndicator", [De, At] = P(re, {
    checked: false
  }), Ae = o.forwardRef((e, n) => {
    const { __scopeMenu: t, forceMount: r, ...u } = e, s = At(re, t);
    return c.jsx(Y, {
      present: r || B(s.checked) || s.checked === true,
      children: c.jsx(k.span, {
        ...u,
        ref: n,
        "data-state": ae(s.checked)
      })
    });
  });
  Ae.displayName = re;
  var jt = "MenuSeparator", je = o.forwardRef((e, n) => {
    const { __scopeMenu: t, ...r } = e;
    return c.jsx(k.div, {
      role: "separator",
      "aria-orientation": "horizontal",
      ...r,
      ref: n
    });
  });
  je.displayName = jt;
  var Ot = "MenuArrow", Oe = o.forwardRef((e, n) => {
    const { __scopeMenu: t, ...r } = e, u = F(t);
    return c.jsx(ot, {
      ...u,
      ...r,
      ref: n
    });
  });
  Oe.displayName = Ot;
  var se = "MenuSub", [kt, ke] = P(se), Ne = (e) => {
    const { __scopeMenu: n, children: t, open: r = false, onOpenChange: u } = e, s = _(se, n), d = F(n), [m, h] = o.useState(null), [p, l] = o.useState(null), a = J(u);
    return o.useEffect(() => (s.open === false && a(false), () => a(false)), [
      s.open,
      a
    ]), c.jsx(he, {
      ...d,
      children: c.jsx(ge, {
        scope: n,
        open: r,
        onOpenChange: a,
        content: p,
        onContentChange: l,
        children: c.jsx(kt, {
          scope: n,
          contentId: fe(),
          triggerId: fe(),
          trigger: m,
          onTriggerChange: h,
          children: t
        })
      })
    });
  };
  Ne.displayName = se;
  var D = "MenuSubTrigger", Fe = o.forwardRef((e, n) => {
    const t = _(D, e.__scopeMenu), r = L(D, e.__scopeMenu), u = ke(D, e.__scopeMenu), s = te(D, e.__scopeMenu), d = o.useRef(null), { pointerGraceTimerRef: m, onPointerGraceIntentChange: h } = s, p = {
      __scopeMenu: e.__scopeMenu
    }, l = o.useCallback(() => {
      d.current && window.clearTimeout(d.current), d.current = null;
    }, []);
    return o.useEffect(() => l, [
      l
    ]), o.useEffect(() => {
      const a = m.current;
      return () => {
        window.clearTimeout(a), h(null);
      };
    }, [
      m,
      h
    ]), c.jsx(Q, {
      asChild: true,
      ...p,
      children: c.jsx(Ee, {
        id: u.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": t.open,
        "aria-controls": u.contentId,
        "data-state": Ge(t.open),
        ...e,
        ref: Je(n, u.onTriggerChange),
        onClick: (a) => {
          var _a;
          (_a = e.onClick) == null ? void 0 : _a.call(e, a), !(e.disabled || a.defaultPrevented) && (a.currentTarget.focus(), t.open || t.onOpenChange(true));
        },
        onPointerMove: C(e.onPointerMove, j((a) => {
          s.onItemEnter(a), !a.defaultPrevented && !e.disabled && !t.open && !d.current && (s.onPointerGraceIntentChange(null), d.current = window.setTimeout(() => {
            t.onOpenChange(true), l();
          }, 100));
        })),
        onPointerLeave: C(e.onPointerLeave, j((a) => {
          var _a, _b;
          l();
          const f = (_a = t.content) == null ? void 0 : _a.getBoundingClientRect();
          if (f) {
            const g = (_b = t.content) == null ? void 0 : _b.dataset.side, v = g === "right", S = v ? -5 : 5, y = f[v ? "left" : "right"], E = f[v ? "right" : "left"];
            s.onPointerGraceIntentChange({
              area: [
                {
                  x: a.clientX + S,
                  y: a.clientY
                },
                {
                  x: y,
                  y: f.top
                },
                {
                  x: E,
                  y: f.top
                },
                {
                  x: E,
                  y: f.bottom
                },
                {
                  x: y,
                  y: f.bottom
                }
              ],
              side: g
            }), window.clearTimeout(m.current), m.current = window.setTimeout(() => s.onPointerGraceIntentChange(null), 300);
          } else {
            if (s.onTriggerLeave(a), a.defaultPrevented) return;
            s.onPointerGraceIntentChange(null);
          }
        })),
        onKeyDown: C(e.onKeyDown, (a) => {
          var _a;
          const f = s.searchRef.current !== "";
          e.disabled || f && a.key === " " || vt[r.dir].includes(a.key) && (t.onOpenChange(true), (_a = t.content) == null ? void 0 : _a.focus(), a.preventDefault());
        })
      })
    });
  });
  Fe.displayName = D;
  var Le = "MenuSubContent", Ke = o.forwardRef((e, n) => {
    const t = _e(x, e.__scopeMenu), { forceMount: r = t.forceMount, ...u } = e, s = _(x, e.__scopeMenu), d = L(x, e.__scopeMenu), m = ke(Le, e.__scopeMenu), h = o.useRef(null), p = O(n, h);
    return c.jsx(A.Provider, {
      scope: e.__scopeMenu,
      children: c.jsx(Y, {
        present: r || s.open,
        children: c.jsx(A.Slot, {
          scope: e.__scopeMenu,
          children: c.jsx(ne, {
            id: m.contentId,
            "aria-labelledby": m.triggerId,
            ...u,
            ref: p,
            align: "start",
            side: d.dir === "rtl" ? "left" : "right",
            disableOutsidePointerEvents: false,
            disableOutsideScroll: false,
            trapFocus: false,
            onOpenAutoFocus: (l) => {
              var _a;
              d.isUsingKeyboardRef.current && ((_a = h.current) == null ? void 0 : _a.focus()), l.preventDefault();
            },
            onCloseAutoFocus: (l) => l.preventDefault(),
            onFocusOutside: C(e.onFocusOutside, (l) => {
              l.target !== m.trigger && s.onOpenChange(false);
            }),
            onEscapeKeyDown: C(e.onEscapeKeyDown, (l) => {
              d.onClose(), l.preventDefault();
            }),
            onKeyDown: C(e.onKeyDown, (l) => {
              var _a;
              const a = l.currentTarget.contains(l.target), f = Ct[d.dir].includes(l.key);
              a && f && (s.onOpenChange(false), (_a = m.trigger) == null ? void 0 : _a.focus(), l.preventDefault());
            })
          })
        })
      })
    });
  });
  Ke.displayName = Le;
  function Ge(e) {
    return e ? "open" : "closed";
  }
  function B(e) {
    return e === "indeterminate";
  }
  function ae(e) {
    return B(e) ? "indeterminate" : e ? "checked" : "unchecked";
  }
  function Nt(e) {
    const n = document.activeElement;
    for (const t of e) if (t === n || (t.focus(), document.activeElement !== n)) return;
  }
  function Ft(e, n) {
    return e.map((t, r) => e[(n + r) % e.length]);
  }
  function Lt(e, n, t) {
    const u = n.length > 1 && Array.from(n).every((p) => p === n[0]) ? n[0] : n, s = t ? e.indexOf(t) : -1;
    let d = Ft(e, Math.max(s, 0));
    u.length === 1 && (d = d.filter((p) => p !== t));
    const h = d.find((p) => p.toLowerCase().startsWith(u.toLowerCase()));
    return h !== t ? h : void 0;
  }
  function Kt(e, n) {
    const { x: t, y: r } = e;
    let u = false;
    for (let s = 0, d = n.length - 1; s < n.length; d = s++) {
      const m = n[s], h = n[d], p = m.x, l = m.y, a = h.x, f = h.y;
      l > r != f > r && t < (a - p) * (r - l) / (f - l) + p && (u = !u);
    }
    return u;
  }
  function Gt(e, n) {
    if (!n) return false;
    const t = {
      x: e.clientX,
      y: e.clientY
    };
    return Kt(t, n);
  }
  function j(e) {
    return (n) => n.pointerType === "mouse" ? e(n) : void 0;
  }
  qt = xe;
  Zt = Q;
  $t = Re;
  Jt = Pe;
  Qt = oe;
  en = Se;
  tn = z;
  nn = Ie;
  on = ye;
  rn = Te;
  sn = Ae;
  an = je;
  cn = Oe;
  un = Ne;
  ln = Fe;
  dn = Ke;
  let Ut, Vt;
  Ut = [
    "1",
    "2"
  ];
  Vt = [
    "solid",
    "soft"
  ];
  fn = {
    size: {
      type: "enum",
      className: "rt-r-size",
      values: Ut,
      default: "2",
      responsive: true
    },
    variant: {
      type: "enum",
      className: "rt-variant",
      values: Vt,
      default: "solid"
    },
    ...X,
    ...rt
  };
  pn = {
    ...st,
    ...X
  };
  mn = {
    ...X
  };
  hn = {
    ...X
  };
});
export {
  Zt as A,
  Jt as C,
  Qt as G,
  tn as I,
  en as L,
  $t as P,
  qt as R,
  an as S,
  __tla,
  un as a,
  ln as b,
  Wt as c,
  dn as d,
  nn as e,
  on as f,
  rn as g,
  sn as h,
  cn as i,
  fn as j,
  pn as k,
  hn as l,
  mn as m
};
