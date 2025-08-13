import { c as B, r as i, j as s, i as H, k as R, u as _, P as p, b as g, g as V, D as q, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { u as C, __tla as __tla_1 } from "./index-CEOg2jVB.js";
import { u as K, __tla as __tla_2 } from "./index-DfrOcl7X.js";
import { P as U, R as Y, h as Z, u as z, F as J, __tla as __tla_3 } from "./index-ChItmDsK.js";
let me, Ce, ve, De, ge, pe, fe, xe, Re, de;
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
  })()
]).then(async () => {
  let v, y, Q, u, N;
  v = "Dialog";
  [y, de] = B(v);
  [Q, u] = y(v);
  N = (e) => {
    const { __scopeDialog: o, children: r, open: a, defaultOpen: n, onOpenChange: t, modal: l = true } = e, c = i.useRef(null), f = i.useRef(null), [m, x] = K({
      prop: a,
      defaultProp: n ?? false,
      onChange: t,
      caller: v
    });
    return s.jsx(Q, {
      scope: o,
      triggerRef: c,
      contentRef: f,
      contentId: C(),
      titleId: C(),
      descriptionId: C(),
      open: m,
      onOpenChange: x,
      onOpenToggle: i.useCallback(() => x(($) => !$), [
        x
      ]),
      modal: l,
      children: r
    });
  };
  N.displayName = v;
  var O = "DialogTrigger", I = i.forwardRef((e, o) => {
    const { __scopeDialog: r, ...a } = e, n = u(O, r), t = _(o, n.triggerRef);
    return s.jsx(p.button, {
      type: "button",
      "aria-haspopup": "dialog",
      "aria-expanded": n.open,
      "aria-controls": n.contentId,
      "data-state": P(n.open),
      ...a,
      ref: t,
      onClick: g(e.onClick, n.onOpenToggle)
    });
  });
  I.displayName = O;
  var h = "DialogPortal", [X, A] = y(h, {
    forceMount: void 0
  }), T = (e) => {
    const { __scopeDialog: o, forceMount: r, children: a, container: n } = e, t = u(h, o);
    return s.jsx(X, {
      scope: o,
      forceMount: r,
      children: i.Children.map(a, (l) => s.jsx(R, {
        present: r || t.open,
        children: s.jsx(U, {
          asChild: true,
          container: n,
          children: l
        })
      }))
    });
  };
  T.displayName = h;
  var D = "DialogOverlay", b = i.forwardRef((e, o) => {
    const r = A(D, e.__scopeDialog), { forceMount: a = r.forceMount, ...n } = e, t = u(D, e.__scopeDialog);
    return t.modal ? s.jsx(R, {
      present: a || t.open,
      children: s.jsx(te, {
        ...n,
        ref: o
      })
    }) : null;
  });
  b.displayName = D;
  var ee = V("DialogOverlay.RemoveScroll"), te = i.forwardRef((e, o) => {
    const { __scopeDialog: r, ...a } = e, n = u(D, r);
    return s.jsx(Y, {
      as: ee,
      allowPinchZoom: true,
      shards: [
        n.contentRef
      ],
      children: s.jsx(p.div, {
        "data-state": P(n.open),
        ...a,
        ref: o,
        style: {
          pointerEvents: "auto",
          ...a.style
        }
      })
    });
  }), d = "DialogContent", j = i.forwardRef((e, o) => {
    const r = A(d, e.__scopeDialog), { forceMount: a = r.forceMount, ...n } = e, t = u(d, e.__scopeDialog);
    return s.jsx(R, {
      present: a || t.open,
      children: t.modal ? s.jsx(oe, {
        ...n,
        ref: o
      }) : s.jsx(ne, {
        ...n,
        ref: o
      })
    });
  });
  j.displayName = d;
  var oe = i.forwardRef((e, o) => {
    const r = u(d, e.__scopeDialog), a = i.useRef(null), n = _(o, r.contentRef, a);
    return i.useEffect(() => {
      const t = a.current;
      if (t) return Z(t);
    }, []), s.jsx(M, {
      ...e,
      ref: n,
      trapFocus: r.open,
      disableOutsidePointerEvents: true,
      onCloseAutoFocus: g(e.onCloseAutoFocus, (t) => {
        var _a;
        t.preventDefault(), (_a = r.triggerRef.current) == null ? void 0 : _a.focus();
      }),
      onPointerDownOutside: g(e.onPointerDownOutside, (t) => {
        const l = t.detail.originalEvent, c = l.button === 0 && l.ctrlKey === true;
        (l.button === 2 || c) && t.preventDefault();
      }),
      onFocusOutside: g(e.onFocusOutside, (t) => t.preventDefault())
    });
  }), ne = i.forwardRef((e, o) => {
    const r = u(d, e.__scopeDialog), a = i.useRef(false), n = i.useRef(false);
    return s.jsx(M, {
      ...e,
      ref: o,
      trapFocus: false,
      disableOutsidePointerEvents: false,
      onCloseAutoFocus: (t) => {
        var _a, _b;
        (_a = e.onCloseAutoFocus) == null ? void 0 : _a.call(e, t), t.defaultPrevented || (a.current || ((_b = r.triggerRef.current) == null ? void 0 : _b.focus()), t.preventDefault()), a.current = false, n.current = false;
      },
      onInteractOutside: (t) => {
        var _a, _b;
        (_a = e.onInteractOutside) == null ? void 0 : _a.call(e, t), t.defaultPrevented || (a.current = true, t.detail.originalEvent.type === "pointerdown" && (n.current = true));
        const l = t.target;
        ((_b = r.triggerRef.current) == null ? void 0 : _b.contains(l)) && t.preventDefault(), t.detail.originalEvent.type === "focusin" && n.current && t.preventDefault();
      }
    });
  }), M = i.forwardRef((e, o) => {
    const { __scopeDialog: r, trapFocus: a, onOpenAutoFocus: n, onCloseAutoFocus: t, ...l } = e, c = u(d, r), f = i.useRef(null), m = _(o, f);
    return z(), s.jsxs(s.Fragment, {
      children: [
        s.jsx(J, {
          asChild: true,
          loop: true,
          trapped: a,
          onMountAutoFocus: n,
          onUnmountAutoFocus: t,
          children: s.jsx(q, {
            role: "dialog",
            id: c.contentId,
            "aria-describedby": c.descriptionId,
            "aria-labelledby": c.titleId,
            "data-state": P(c.open),
            ...l,
            ref: m,
            onDismiss: () => c.onOpenChange(false)
          })
        }),
        s.jsxs(s.Fragment, {
          children: [
            s.jsx(re, {
              titleId: c.titleId
            }),
            s.jsx(se, {
              contentRef: f,
              descriptionId: c.descriptionId
            })
          ]
        })
      ]
    });
  }), E = "DialogTitle", F = i.forwardRef((e, o) => {
    const { __scopeDialog: r, ...a } = e, n = u(E, r);
    return s.jsx(p.h2, {
      id: n.titleId,
      ...a,
      ref: o
    });
  });
  F.displayName = E;
  var w = "DialogDescription", S = i.forwardRef((e, o) => {
    const { __scopeDialog: r, ...a } = e, n = u(w, r);
    return s.jsx(p.p, {
      id: n.descriptionId,
      ...a,
      ref: o
    });
  });
  S.displayName = w;
  var W = "DialogClose", k = i.forwardRef((e, o) => {
    const { __scopeDialog: r, ...a } = e, n = u(W, r);
    return s.jsx(p.button, {
      type: "button",
      ...a,
      ref: o,
      onClick: g(e.onClick, () => n.onOpenChange(false))
    });
  });
  k.displayName = W;
  function P(e) {
    return e ? "open" : "closed";
  }
  let G, L, re, ae, se;
  G = "DialogTitleWarning";
  [fe, L] = H(G, {
    contentName: d,
    titleName: E,
    docsSlug: "dialog"
  });
  re = ({ titleId: e }) => {
    const o = L(G), r = `\`${o.contentName}\` requires a \`${o.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${o.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${o.docsSlug}`;
    return i.useEffect(() => {
      e && (document.getElementById(e) || console.error(r));
    }, [
      r,
      e
    ]), null;
  };
  ae = "DialogDescriptionWarning";
  se = ({ contentRef: e, descriptionId: o }) => {
    const a = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${L(ae).contentName}}.`;
    return i.useEffect(() => {
      var _a;
      const n = (_a = e.current) == null ? void 0 : _a.getAttribute("aria-describedby");
      o && n && (document.getElementById(o) || console.warn(a));
    }, [
      a,
      e,
      o
    ]), null;
  };
  ge = N;
  pe = I;
  De = T;
  ve = b;
  me = j;
  xe = F;
  Ce = S;
  Re = k;
});
export {
  me as C,
  Ce as D,
  ve as O,
  De as P,
  ge as R,
  pe as T,
  fe as W,
  __tla,
  xe as a,
  Re as b,
  de as c
};
