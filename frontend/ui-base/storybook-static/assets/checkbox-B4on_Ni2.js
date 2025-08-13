import { q as L, s as G, r as i, j as r, c as K, k as U, P as _, u as j, b as N, O as X, v as W, l as $, w as J, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { u as S, __tla as __tla_1 } from "./index-DfrOcl7X.js";
import { u as Q, __tla as __tla_2 } from "./index-KgX6eUjc.js";
import { b as V, a as Y, __tla as __tla_3 } from "./icons-DMb5RjWB.js";
let O;
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
  const Z = [
    "1",
    "2",
    "3"
  ], ee = [
    "classic",
    "surface",
    "soft"
  ], te = {
    size: {
      type: "enum",
      className: "rt-r-size",
      values: Z,
      default: "2",
      responsive: true
    },
    variant: {
      type: "enum",
      className: "rt-variant",
      values: ee,
      default: "surface"
    },
    ...G,
    ...L
  };
  var g = "Checkbox", [oe, ue] = K(g), [re, y] = oe(g);
  function se(t) {
    const { __scopeCheckbox: a, checked: s, children: u, defaultChecked: o, disabled: e, form: l, name: h, onCheckedChange: n, required: f, value: b = "on", internal_do_not_use_render: p } = t, [C, v] = S({
      prop: s,
      defaultProp: o ?? false,
      onChange: n,
      caller: g
    }), [m, x] = i.useState(null), [P, c] = i.useState(null), d = i.useRef(false), I = m ? !!l || !!m.closest("form") : true, R = {
      checked: C,
      disabled: e,
      setChecked: v,
      control: m,
      setControl: x,
      name: h,
      form: l,
      value: b,
      hasConsumerStoppedPropagationRef: d,
      required: f,
      defaultChecked: k(o) ? false : o,
      isFormControl: I,
      bubbleInput: P,
      setBubbleInput: c
    };
    return r.jsx(re, {
      scope: a,
      ...R,
      children: ne(p) ? p(R) : u
    });
  }
  var w = "CheckboxTrigger", B = i.forwardRef(({ __scopeCheckbox: t, onKeyDown: a, onClick: s, ...u }, o) => {
    const { control: e, value: l, disabled: h, checked: n, required: f, setControl: b, setChecked: p, hasConsumerStoppedPropagationRef: C, isFormControl: v, bubbleInput: m } = y(w, t), x = j(o, b), P = i.useRef(n);
    return i.useEffect(() => {
      const c = e == null ? void 0 : e.form;
      if (c) {
        const d = () => p(P.current);
        return c.addEventListener("reset", d), () => c.removeEventListener("reset", d);
      }
    }, [
      e,
      p
    ]), r.jsx(_.button, {
      type: "button",
      role: "checkbox",
      "aria-checked": k(n) ? "mixed" : n,
      "aria-required": f,
      "data-state": A(n),
      "data-disabled": h ? "" : void 0,
      disabled: h,
      value: l,
      ...u,
      ref: x,
      onKeyDown: N(a, (c) => {
        c.key === "Enter" && c.preventDefault();
      }),
      onClick: N(s, (c) => {
        p((d) => k(d) ? true : !d), m && v && (C.current = c.isPropagationStopped(), C.current || c.stopPropagation());
      })
    });
  });
  B.displayName = w;
  var D = i.forwardRef((t, a) => {
    const { __scopeCheckbox: s, name: u, checked: o, defaultChecked: e, required: l, disabled: h, value: n, onCheckedChange: f, form: b, ...p } = t;
    return r.jsx(se, {
      __scopeCheckbox: s,
      checked: o,
      defaultChecked: e,
      disabled: h,
      required: l,
      onCheckedChange: f,
      name: u,
      form: b,
      value: n,
      internal_do_not_use_render: ({ isFormControl: C }) => r.jsxs(r.Fragment, {
        children: [
          r.jsx(B, {
            ...p,
            ref: a,
            __scopeCheckbox: s
          }),
          C && r.jsx(M, {
            __scopeCheckbox: s
          })
        ]
      })
    });
  });
  D.displayName = g;
  var T = "CheckboxIndicator", q = i.forwardRef((t, a) => {
    const { __scopeCheckbox: s, forceMount: u, ...o } = t, e = y(T, s);
    return r.jsx(U, {
      present: u || k(e.checked) || e.checked === true,
      children: r.jsx(_.span, {
        "data-state": A(e.checked),
        "data-disabled": e.disabled ? "" : void 0,
        ...o,
        ref: a,
        style: {
          pointerEvents: "none",
          ...t.style
        }
      })
    });
  });
  q.displayName = T;
  var z = "CheckboxBubbleInput", M = i.forwardRef(({ __scopeCheckbox: t, ...a }, s) => {
    const { control: u, hasConsumerStoppedPropagationRef: o, checked: e, defaultChecked: l, required: h, disabled: n, name: f, value: b, form: p, bubbleInput: C, setBubbleInput: v } = y(z, t), m = j(s, v), x = Q(e), P = X(u);
    i.useEffect(() => {
      const d = C;
      if (!d) return;
      const I = window.HTMLInputElement.prototype, E = Object.getOwnPropertyDescriptor(I, "checked").set, F = !o.current;
      if (x !== e && E) {
        const H = new Event("click", {
          bubbles: F
        });
        d.indeterminate = k(e), E.call(d, k(e) ? false : e), d.dispatchEvent(H);
      }
    }, [
      C,
      x,
      e,
      o
    ]);
    const c = i.useRef(k(e) ? false : e);
    return r.jsx(_.input, {
      type: "checkbox",
      "aria-hidden": true,
      defaultChecked: l ?? c.current,
      required: h,
      disabled: n,
      name: f,
      value: b,
      form: p,
      ...a,
      tabIndex: -1,
      ref: m,
      style: {
        ...a.style,
        ...P,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0,
        transform: "translateX(-100%)"
      }
    });
  });
  M.displayName = z;
  function ne(t) {
    return typeof t == "function";
  }
  function k(t) {
    return t === "indeterminate";
  }
  function A(t) {
    return k(t) ? "indeterminate" : t ? "checked" : "unchecked";
  }
  O = i.forwardRef((t, a) => {
    const { className: s, color: u, checked: o, defaultChecked: e, onCheckedChange: l, ...h } = W(t, te, J), [n, f] = S({
      prop: o,
      defaultProp: e ?? false,
      onChange: l
    });
    return r.jsx(D, {
      "data-accent-color": u,
      ...h,
      defaultChecked: e,
      checked: n,
      onCheckedChange: f,
      asChild: false,
      ref: a,
      className: $("rt-reset", "rt-BaseCheckboxRoot", "rt-CheckboxRoot", s),
      children: r.jsx(q, {
        asChild: true,
        className: "rt-BaseCheckboxIndicator rt-CheckboxIndicator",
        children: n === "indeterminate" ? r.jsx(V, {}) : r.jsx(Y, {})
      })
    });
  });
  O.displayName = "Checkbox";
  O.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Checkbox",
    composes: [
      "ComponentPropsWithout"
    ]
  };
});
export {
  O as C,
  __tla
};
