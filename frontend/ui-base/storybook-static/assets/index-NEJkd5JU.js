import { c as H, r as s, j as d, P as G, b as p, u as V, d as z, e as q, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { c as J, __tla as __tla_1 } from "./index-D3rDgx3q.js";
import { u as Q, __tla as __tla_2 } from "./index-CEOg2jVB.js";
import { u as W, __tla as __tla_3 } from "./index-DfrOcl7X.js";
let pe, me, de;
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
  let _, X, I, y, N, Z, $, ee, te, O;
  _ = "rovingFocusGroup.onEntryFocus";
  X = {
    bubbles: false,
    cancelable: true
  };
  I = "RovingFocusGroup";
  [y, N, Z] = J(I);
  [$, de] = H(I, [
    Z
  ]);
  [ee, te] = $(I);
  O = s.forwardRef((e, r) => d.jsx(y.Provider, {
    scope: e.__scopeRovingFocusGroup,
    children: d.jsx(y.Slot, {
      scope: e.__scopeRovingFocusGroup,
      children: d.jsx(oe, {
        ...e,
        ref: r
      })
    })
  }));
  O.displayName = I;
  var oe = s.forwardRef((e, r) => {
    const { __scopeRovingFocusGroup: c, orientation: t, loop: T = false, dir: w, currentTabStopId: v, defaultCurrentTabStopId: C, onCurrentTabStopIdChange: S, onEntryFocus: m, preventScrollOnEntryFocus: a = false, ...b } = e, F = s.useRef(null), g = V(r, F), R = z(w), [E, o] = W({
      prop: v,
      defaultProp: C ?? null,
      onChange: S,
      caller: I
    }), [i, x] = s.useState(false), u = q(m), l = N(c), h = s.useRef(false), [k, P] = s.useState(0);
    return s.useEffect(() => {
      const n = F.current;
      if (n) return n.addEventListener(_, u), () => n.removeEventListener(_, u);
    }, [
      u
    ]), d.jsx(ee, {
      scope: c,
      orientation: t,
      dir: R,
      loop: T,
      currentTabStopId: E,
      onItemFocus: s.useCallback((n) => o(n), [
        o
      ]),
      onItemShiftTab: s.useCallback(() => x(true), []),
      onFocusableItemAdd: s.useCallback(() => P((n) => n + 1), []),
      onFocusableItemRemove: s.useCallback(() => P((n) => n - 1), []),
      children: d.jsx(G.div, {
        tabIndex: i || k === 0 ? -1 : 0,
        "data-orientation": t,
        ...b,
        ref: g,
        style: {
          outline: "none",
          ...e.style
        },
        onMouseDown: p(e.onMouseDown, () => {
          h.current = true;
        }),
        onFocus: p(e.onFocus, (n) => {
          const L = !h.current;
          if (n.target === n.currentTarget && L && !i) {
            const D = new CustomEvent(_, X);
            if (n.currentTarget.dispatchEvent(D), !D.defaultPrevented) {
              const A = l().filter((f) => f.focusable), U = A.find((f) => f.active), B = A.find((f) => f.id === E), Y = [
                U,
                B,
                ...A
              ].filter(Boolean).map((f) => f.ref.current);
              M(Y, a);
            }
          }
          h.current = false;
        }),
        onBlur: p(e.onBlur, () => x(false))
      })
    });
  }), K = "RovingFocusGroupItem", j = s.forwardRef((e, r) => {
    const { __scopeRovingFocusGroup: c, focusable: t = true, active: T = false, tabStopId: w, children: v, ...C } = e, S = Q(), m = w || S, a = te(K, c), b = a.currentTabStopId === m, F = N(c), { onFocusableItemAdd: g, onFocusableItemRemove: R, currentTabStopId: E } = a;
    return s.useEffect(() => {
      if (t) return g(), () => R();
    }, [
      t,
      g,
      R
    ]), d.jsx(y.ItemSlot, {
      scope: c,
      id: m,
      focusable: t,
      active: T,
      children: d.jsx(G.span, {
        tabIndex: b ? 0 : -1,
        "data-orientation": a.orientation,
        ...C,
        ref: r,
        onMouseDown: p(e.onMouseDown, (o) => {
          t ? a.onItemFocus(m) : o.preventDefault();
        }),
        onFocus: p(e.onFocus, () => a.onItemFocus(m)),
        onKeyDown: p(e.onKeyDown, (o) => {
          if (o.key === "Tab" && o.shiftKey) {
            a.onItemShiftTab();
            return;
          }
          if (o.target !== o.currentTarget) return;
          const i = se(o, a.orientation, a.dir);
          if (i !== void 0) {
            if (o.metaKey || o.ctrlKey || o.altKey || o.shiftKey) return;
            o.preventDefault();
            let u = F().filter((l) => l.focusable).map((l) => l.ref.current);
            if (i === "last") u.reverse();
            else if (i === "prev" || i === "next") {
              i === "prev" && u.reverse();
              const l = u.indexOf(o.currentTarget);
              u = a.loop ? ce(u, l + 1) : u.slice(l + 1);
            }
            setTimeout(() => M(u));
          }
        }),
        children: typeof v == "function" ? v({
          isCurrentTabStop: b,
          hasTabStop: E != null
        }) : v
      })
    });
  });
  j.displayName = K;
  var re = {
    ArrowLeft: "prev",
    ArrowUp: "prev",
    ArrowRight: "next",
    ArrowDown: "next",
    PageUp: "first",
    Home: "first",
    PageDown: "last",
    End: "last"
  };
  function ne(e, r) {
    return r !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
  }
  function se(e, r, c) {
    const t = ne(e.key, c);
    if (!(r === "vertical" && [
      "ArrowLeft",
      "ArrowRight"
    ].includes(t)) && !(r === "horizontal" && [
      "ArrowUp",
      "ArrowDown"
    ].includes(t))) return re[t];
  }
  function M(e, r = false) {
    const c = document.activeElement;
    for (const t of e) if (t === c || (t.focus({
      preventScroll: r
    }), document.activeElement !== c)) return;
  }
  function ce(e, r) {
    return e.map((c, t) => e[(r + t) % e.length]);
  }
  me = O;
  pe = j;
});
export {
  pe as I,
  me as R,
  __tla,
  de as c
};
