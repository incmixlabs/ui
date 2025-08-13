import { r as l, P as A, n as q, j as S, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { R as Ie, P as Ce, O as Se, C as Re, __tla as __tla_1 } from "./index-BpKby9Va.js";
import { u as F, __tla as __tla_2 } from "./index-CEOg2jVB.js";
import { c as V } from "./utils-CBfrqCZ4.js";
import { S as Ae, __tla as __tla_3 } from "./x-C94K9CrB.js";
let Ze, R, K, et, tt, rt, nt, lt;
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
  var fe = 1, Me = 0.9, je = 0.8, Ne = 0.17, ee = 0.1, te = 0.999, $e = 0.9999, _e = 0.99, De = /[\\\/_+.#"@\[\(\{&]/, Fe = /[\\\/_+.#"@\[\(\{&]/g, Ke = /[\s-]/, ge = /[\s-]/g;
  function ne(e, n, r, m, o, d, c) {
    if (d === n.length) return o === e.length ? fe : _e;
    var f = `${o},${d}`;
    if (c[f] !== void 0) return c[f];
    for (var b = m.charAt(d), u = r.indexOf(b, o), v = 0, g, I, w, C; u >= 0; ) g = ne(e, n, r, m, u + 1, d + 1, c), g > v && (u === o ? g *= fe : De.test(e.charAt(u - 1)) ? (g *= je, w = e.slice(o, u - 1).match(Fe), w && o > 0 && (g *= Math.pow(te, w.length))) : Ke.test(e.charAt(u - 1)) ? (g *= Me, C = e.slice(o, u - 1).match(ge), C && o > 0 && (g *= Math.pow(te, C.length))) : (g *= Ne, o > 0 && (g *= Math.pow(te, u - o))), e.charAt(u) !== n.charAt(d) && (g *= $e)), (g < ee && r.charAt(u - 1) === m.charAt(d + 1) || m.charAt(d + 1) === m.charAt(d) && r.charAt(u - 1) !== m.charAt(d)) && (I = ne(e, n, r, m, u + 1, d + 2, c), I * ee > g && (g = I * ee)), g > v && (v = g), u = r.indexOf(b, u + 1);
    return c[f] = v, v;
  }
  function pe(e) {
    return e.toLowerCase().replace(ge, " ");
  }
  function Le(e, n, r) {
    return e = r && r.length > 0 ? `${e + " " + r.join(" ")}` : e, ne(e, n, pe(e), pe(n), 0, 0, {});
  }
  let P, re, Pe, he, ve, le, _, qe, be, z, xe, ae, ye, we, Ve, ze, Oe, Be, Ge, Ue, He, Te;
  P = '[cmdk-group=""]';
  re = '[cmdk-group-items=""]';
  Pe = '[cmdk-group-heading=""]';
  he = '[cmdk-item=""]';
  ve = `${he}:not([aria-disabled="true"])`;
  le = "cmdk-item-select";
  _ = "data-value";
  qe = (e, n, r) => Le(e, n, r);
  be = l.createContext(void 0);
  z = () => l.useContext(be);
  xe = l.createContext(void 0);
  ae = () => l.useContext(xe);
  ye = l.createContext(void 0);
  we = l.forwardRef((e, n) => {
    let r = D(() => {
      var t, i;
      return {
        search: "",
        value: (i = (t = e.value) != null ? t : e.defaultValue) != null ? i : "",
        selectedItemId: void 0,
        filtered: {
          count: 0,
          items: /* @__PURE__ */ new Map(),
          groups: /* @__PURE__ */ new Set()
        }
      };
    }), m = D(() => /* @__PURE__ */ new Set()), o = D(() => /* @__PURE__ */ new Map()), d = D(() => /* @__PURE__ */ new Map()), c = D(() => /* @__PURE__ */ new Set()), f = ke(e), { label: b, children: u, value: v, onValueChange: g, filter: I, shouldFilter: w, loop: C, disablePointerSelection: U = false, vimBindings: M = true, ...O } = e, H = F(), oe = F(), T = F(), j = l.useRef(null), x = Xe();
    N(() => {
      if (v !== void 0) {
        let t = v.trim();
        r.current.value = t, k.emit();
      }
    }, [
      v
    ]), N(() => {
      x(6, ie);
    }, []);
    let k = l.useMemo(() => ({
      subscribe: (t) => (c.current.add(t), () => c.current.delete(t)),
      snapshot: () => r.current,
      setState: (t, i, s) => {
        var a, p, h, E;
        if (!Object.is(r.current[t], i)) {
          if (r.current[t] = i, t === "search") Y(), J(), x(1, X);
          else if (t === "value") {
            if (document.activeElement.hasAttribute("cmdk-input") || document.activeElement.hasAttribute("cmdk-root")) {
              let y = document.getElementById(T);
              y ? y.focus() : (a = document.getElementById(H)) == null || a.focus();
            }
            if (x(7, () => {
              var y;
              r.current.selectedItemId = (y = $()) == null ? void 0 : y.id, k.emit();
            }), s || x(5, ie), ((p = f.current) == null ? void 0 : p.value) !== void 0) {
              let y = i ?? "";
              (E = (h = f.current).onValueChange) == null || E.call(h, y);
              return;
            }
          }
          k.emit();
        }
      },
      emit: () => {
        c.current.forEach((t) => t());
      }
    }), []), W = l.useMemo(() => ({
      value: (t, i, s) => {
        var a;
        i !== ((a = d.current.get(t)) == null ? void 0 : a.value) && (d.current.set(t, {
          value: i,
          keywords: s
        }), r.current.filtered.items.set(t, ue(i, s)), x(2, () => {
          J(), k.emit();
        }));
      },
      item: (t, i) => (m.current.add(t), i && (o.current.has(i) ? o.current.get(i).add(t) : o.current.set(i, /* @__PURE__ */ new Set([
        t
      ]))), x(3, () => {
        Y(), J(), r.current.value || X(), k.emit();
      }), () => {
        d.current.delete(t), m.current.delete(t), r.current.filtered.items.delete(t);
        let s = $();
        x(4, () => {
          Y(), (s == null ? void 0 : s.getAttribute("id")) === t && X(), k.emit();
        });
      }),
      group: (t) => (o.current.has(t) || o.current.set(t, /* @__PURE__ */ new Set()), () => {
        d.current.delete(t), o.current.delete(t);
      }),
      filter: () => f.current.shouldFilter,
      label: b || e["aria-label"],
      getDisablePointerSelection: () => f.current.disablePointerSelection,
      listId: H,
      inputId: T,
      labelId: oe,
      listInnerRef: j
    }), []);
    function ue(t, i) {
      var s, a;
      let p = (a = (s = f.current) == null ? void 0 : s.filter) != null ? a : qe;
      return t ? p(t, r.current.search, i) : 0;
    }
    function J() {
      if (!r.current.search || f.current.shouldFilter === false) return;
      let t = r.current.filtered.items, i = [];
      r.current.filtered.groups.forEach((a) => {
        let p = o.current.get(a), h = 0;
        p.forEach((E) => {
          let y = t.get(E);
          h = Math.max(y, h);
        }), i.push([
          a,
          h
        ]);
      });
      let s = j.current;
      L().sort((a, p) => {
        var h, E;
        let y = a.getAttribute("id"), B = p.getAttribute("id");
        return ((h = t.get(B)) != null ? h : 0) - ((E = t.get(y)) != null ? E : 0);
      }).forEach((a) => {
        let p = a.closest(re);
        p ? p.appendChild(a.parentElement === p ? a : a.closest(`${re} > *`)) : s.appendChild(a.parentElement === s ? a : a.closest(`${re} > *`));
      }), i.sort((a, p) => p[1] - a[1]).forEach((a) => {
        var p;
        let h = (p = j.current) == null ? void 0 : p.querySelector(`${P}[${_}="${encodeURIComponent(a[0])}"]`);
        h == null ? void 0 : h.parentElement.appendChild(h);
      });
    }
    function X() {
      let t = L().find((s) => s.getAttribute("aria-disabled") !== "true"), i = t == null ? void 0 : t.getAttribute(_);
      k.setState("value", i || void 0);
    }
    function Y() {
      var t, i, s, a;
      if (!r.current.search || f.current.shouldFilter === false) {
        r.current.filtered.count = m.current.size;
        return;
      }
      r.current.filtered.groups = /* @__PURE__ */ new Set();
      let p = 0;
      for (let h of m.current) {
        let E = (i = (t = d.current.get(h)) == null ? void 0 : t.value) != null ? i : "", y = (a = (s = d.current.get(h)) == null ? void 0 : s.keywords) != null ? a : [], B = ue(E, y);
        r.current.filtered.items.set(h, B), B > 0 && p++;
      }
      for (let [h, E] of o.current) for (let y of E) if (r.current.filtered.items.get(y) > 0) {
        r.current.filtered.groups.add(h);
        break;
      }
      r.current.filtered.count = p;
    }
    function ie() {
      var t, i, s;
      let a = $();
      a && (((t = a.parentElement) == null ? void 0 : t.firstChild) === a && ((s = (i = a.closest(P)) == null ? void 0 : i.querySelector(Pe)) == null || s.scrollIntoView({
        block: "nearest"
      })), a.scrollIntoView({
        block: "nearest"
      }));
    }
    function $() {
      var t;
      return (t = j.current) == null ? void 0 : t.querySelector(`${he}[aria-selected="true"]`);
    }
    function L() {
      var t;
      return Array.from(((t = j.current) == null ? void 0 : t.querySelectorAll(ve)) || []);
    }
    function Q(t) {
      let i = L()[t];
      i && k.setState("value", i.getAttribute(_));
    }
    function Z(t) {
      var i;
      let s = $(), a = L(), p = a.findIndex((E) => E === s), h = a[p + t];
      (i = f.current) != null && i.loop && (h = p + t < 0 ? a[a.length - 1] : p + t === a.length ? a[0] : a[p + t]), h && k.setState("value", h.getAttribute(_));
    }
    function de(t) {
      let i = $(), s = i == null ? void 0 : i.closest(P), a;
      for (; s && !a; ) s = t > 0 ? We(s, P) : Je(s, P), a = s == null ? void 0 : s.querySelector(ve);
      a ? k.setState("value", a.getAttribute(_)) : Z(t);
    }
    let ce = () => Q(L().length - 1), se = (t) => {
      t.preventDefault(), t.metaKey ? ce() : t.altKey ? de(1) : Z(1);
    }, me = (t) => {
      t.preventDefault(), t.metaKey ? Q(0) : t.altKey ? de(-1) : Z(-1);
    };
    return l.createElement(A.div, {
      ref: n,
      tabIndex: -1,
      ...O,
      "cmdk-root": "",
      onKeyDown: (t) => {
        var i;
        (i = O.onKeyDown) == null || i.call(O, t);
        let s = t.nativeEvent.isComposing || t.keyCode === 229;
        if (!(t.defaultPrevented || s)) switch (t.key) {
          case "n":
          case "j": {
            M && t.ctrlKey && se(t);
            break;
          }
          case "ArrowDown": {
            se(t);
            break;
          }
          case "p":
          case "k": {
            M && t.ctrlKey && me(t);
            break;
          }
          case "ArrowUp": {
            me(t);
            break;
          }
          case "Home": {
            t.preventDefault(), Q(0);
            break;
          }
          case "End": {
            t.preventDefault(), ce();
            break;
          }
          case "Enter": {
            t.preventDefault();
            let a = $();
            if (a) {
              let p = new Event(le);
              a.dispatchEvent(p);
            }
          }
        }
      }
    }, l.createElement("label", {
      "cmdk-label": "",
      htmlFor: W.inputId,
      id: W.labelId,
      style: Qe
    }, b), G(e, (t) => l.createElement(xe.Provider, {
      value: k
    }, l.createElement(be.Provider, {
      value: W
    }, t))));
  });
  Ve = l.forwardRef((e, n) => {
    var r, m;
    let o = F(), d = l.useRef(null), c = l.useContext(ye), f = z(), b = ke(e), u = (m = (r = b.current) == null ? void 0 : r.forceMount) != null ? m : c == null ? void 0 : c.forceMount;
    N(() => {
      if (!u) return f.item(o, c == null ? void 0 : c.id);
    }, [
      u
    ]);
    let v = Ee(o, d, [
      e.value,
      e.children,
      d
    ], e.keywords), g = ae(), I = R((x) => x.value && x.value === v.current), w = R((x) => u || f.filter() === false ? true : x.search ? x.filtered.items.get(o) > 0 : true);
    l.useEffect(() => {
      let x = d.current;
      if (!(!x || e.disabled)) return x.addEventListener(le, C), () => x.removeEventListener(le, C);
    }, [
      w,
      e.onSelect,
      e.disabled
    ]);
    function C() {
      var x, k;
      U(), (k = (x = b.current).onSelect) == null || k.call(x, v.current);
    }
    function U() {
      g.setState("value", v.current, true);
    }
    if (!w) return null;
    let { disabled: M, value: O, onSelect: H, forceMount: oe, keywords: T, ...j } = e;
    return l.createElement(A.div, {
      ref: q(d, n),
      ...j,
      id: o,
      "cmdk-item": "",
      role: "option",
      "aria-disabled": !!M,
      "aria-selected": !!I,
      "data-disabled": !!M,
      "data-selected": !!I,
      onPointerMove: M || f.getDisablePointerSelection() ? void 0 : U,
      onClick: M ? void 0 : C
    }, e.children);
  });
  ze = l.forwardRef((e, n) => {
    let { heading: r, children: m, forceMount: o, ...d } = e, c = F(), f = l.useRef(null), b = l.useRef(null), u = F(), v = z(), g = R((w) => o || v.filter() === false ? true : w.search ? w.filtered.groups.has(c) : true);
    N(() => v.group(c), []), Ee(c, f, [
      e.value,
      e.heading,
      b
    ]);
    let I = l.useMemo(() => ({
      id: c,
      forceMount: o
    }), [
      o
    ]);
    return l.createElement(A.div, {
      ref: q(f, n),
      ...d,
      "cmdk-group": "",
      role: "presentation",
      hidden: g ? void 0 : true
    }, r && l.createElement("div", {
      ref: b,
      "cmdk-group-heading": "",
      "aria-hidden": true,
      id: u
    }, r), G(e, (w) => l.createElement("div", {
      "cmdk-group-items": "",
      role: "group",
      "aria-labelledby": r ? u : void 0
    }, l.createElement(ye.Provider, {
      value: I
    }, w))));
  });
  Oe = l.forwardRef((e, n) => {
    let { alwaysRender: r, ...m } = e, o = l.useRef(null), d = R((c) => !c.search);
    return !r && !d ? null : l.createElement(A.div, {
      ref: q(o, n),
      ...m,
      "cmdk-separator": "",
      role: "separator"
    });
  });
  Be = l.forwardRef((e, n) => {
    let { onValueChange: r, ...m } = e, o = e.value != null, d = ae(), c = R((u) => u.search), f = R((u) => u.selectedItemId), b = z();
    return l.useEffect(() => {
      e.value != null && d.setState("search", e.value);
    }, [
      e.value
    ]), l.createElement(A.input, {
      ref: n,
      ...m,
      "cmdk-input": "",
      autoComplete: "off",
      autoCorrect: "off",
      spellCheck: false,
      "aria-autocomplete": "list",
      role: "combobox",
      "aria-expanded": true,
      "aria-controls": b.listId,
      "aria-labelledby": b.labelId,
      "aria-activedescendant": f,
      id: b.inputId,
      type: "text",
      value: o ? e.value : c,
      onChange: (u) => {
        o || d.setState("search", u.target.value), r == null ? void 0 : r(u.target.value);
      }
    });
  });
  Ge = l.forwardRef((e, n) => {
    let { children: r, label: m = "Suggestions", ...o } = e, d = l.useRef(null), c = l.useRef(null), f = R((u) => u.selectedItemId), b = z();
    return l.useEffect(() => {
      if (c.current && d.current) {
        let u = c.current, v = d.current, g, I = new ResizeObserver(() => {
          g = requestAnimationFrame(() => {
            let w = u.offsetHeight;
            v.style.setProperty("--cmdk-list-height", w.toFixed(1) + "px");
          });
        });
        return I.observe(u), () => {
          cancelAnimationFrame(g), I.unobserve(u);
        };
      }
    }, []), l.createElement(A.div, {
      ref: q(d, n),
      ...o,
      "cmdk-list": "",
      role: "listbox",
      tabIndex: -1,
      "aria-activedescendant": f,
      "aria-label": m,
      id: b.listId
    }, G(e, (u) => l.createElement("div", {
      ref: q(c, b.listInnerRef),
      "cmdk-list-sizer": ""
    }, u)));
  });
  Ue = l.forwardRef((e, n) => {
    let { open: r, onOpenChange: m, overlayClassName: o, contentClassName: d, container: c, ...f } = e;
    return l.createElement(Ie, {
      open: r,
      onOpenChange: m
    }, l.createElement(Ce, {
      container: c
    }, l.createElement(Se, {
      "cmdk-overlay": "",
      className: o
    }), l.createElement(Re, {
      "aria-label": e.label,
      "cmdk-dialog": "",
      className: d
    }, l.createElement(we, {
      ref: n,
      ...f
    }))));
  });
  He = l.forwardRef((e, n) => R((r) => r.filtered.count === 0) ? l.createElement(A.div, {
    ref: n,
    ...e,
    "cmdk-empty": "",
    role: "presentation"
  }) : null);
  Te = l.forwardRef((e, n) => {
    let { progress: r, children: m, label: o = "Loading...", ...d } = e;
    return l.createElement(A.div, {
      ref: n,
      ...d,
      "cmdk-loading": "",
      role: "progressbar",
      "aria-valuenow": r,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": o
    }, G(e, (c) => l.createElement("div", {
      "aria-hidden": true
    }, c)));
  });
  K = Object.assign(we, {
    List: Ge,
    Item: Ve,
    Input: Be,
    Group: ze,
    Separator: Oe,
    Dialog: Ue,
    Empty: He,
    Loading: Te
  });
  function We(e, n) {
    let r = e.nextElementSibling;
    for (; r; ) {
      if (r.matches(n)) return r;
      r = r.nextElementSibling;
    }
  }
  function Je(e, n) {
    let r = e.previousElementSibling;
    for (; r; ) {
      if (r.matches(n)) return r;
      r = r.previousElementSibling;
    }
  }
  function ke(e) {
    let n = l.useRef(e);
    return N(() => {
      n.current = e;
    }), n;
  }
  var N = typeof window > "u" ? l.useEffect : l.useLayoutEffect;
  function D(e) {
    let n = l.useRef();
    return n.current === void 0 && (n.current = e()), n;
  }
  R = function(e) {
    let n = ae(), r = () => e(n.snapshot());
    return l.useSyncExternalStore(n.subscribe, r, r);
  };
  function Ee(e, n, r, m = []) {
    let o = l.useRef(), d = z();
    return N(() => {
      var c;
      let f = (() => {
        var u;
        for (let v of r) {
          if (typeof v == "string") return v.trim();
          if (typeof v == "object" && "current" in v) return v.current ? (u = v.current.textContent) == null ? void 0 : u.trim() : o.current;
        }
      })(), b = m.map((u) => u.trim());
      d.value(e, f, b), (c = n.current) == null || c.setAttribute(_, f), o.current = f;
    }), o;
  }
  var Xe = () => {
    let [e, n] = l.useState(), r = D(() => /* @__PURE__ */ new Map());
    return N(() => {
      r.current.forEach((m) => m()), r.current = /* @__PURE__ */ new Map();
    }, [
      e
    ]), (m, o) => {
      r.current.set(m, o), n({});
    };
  };
  function Ye(e) {
    let n = e.type;
    return typeof n == "function" ? n(e.props) : "render" in n ? n.render(e.props) : e;
  }
  function G({ asChild: e, children: n }, r) {
    return e && l.isValidElement(n) ? l.cloneElement(Ye(n), {
      ref: n.ref
    }, r(n.props.children)) : r(n);
  }
  var Qe = {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    borderWidth: "0"
  };
  Ze = function({ className: e, ...n }) {
    return S.jsx(K, {
      "data-slot": "command",
      className: V("flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground", e),
      ...n
    });
  };
  et = function({ className: e, ...n }) {
    return S.jsxs("div", {
      "data-slot": "command-input-wrapper",
      className: "flex h-9 items-center gap-2 border-b px-3",
      children: [
        S.jsx(Ae, {
          className: "size-4 shrink-0 opacity-50"
        }),
        S.jsx(K.Input, {
          "data-slot": "command-input",
          className: V("flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-hidden placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50", e),
          ...n
        })
      ]
    });
  };
  tt = function({ className: e, ...n }) {
    return S.jsx(K.List, {
      "data-slot": "command-list",
      className: V("max-h-[300px] scroll-py-1 overflow-y-auto overflow-x-hidden", e),
      ...n
    });
  };
  rt = function({ ...e }) {
    return S.jsx(K.Empty, {
      "data-slot": "command-empty",
      className: "py-6 text-center text-sm",
      ...e
    });
  };
  nt = function({ className: e, ...n }) {
    return S.jsx(K.Group, {
      "data-slot": "command-group",
      className: V("overflow-hidden p-1 text-foreground [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:text-xs", e),
      ...n
    });
  };
  lt = function({ className: e, ...n }) {
    return S.jsx(K.Item, {
      "data-slot": "command-item",
      className: V("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50 [&_svg:not([class*='size-'])]:size-4 [&_svg:not([class*='text-'])]:text-muted-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0", e),
      ...n
    });
  };
  Ze.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Command"
  };
  et.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CommandInput"
  };
  tt.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CommandList"
  };
  rt.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CommandEmpty"
  };
  nt.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CommandGroup"
  };
  lt.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CommandItem"
  };
});
export {
  Ze as C,
  R as P,
  K as _,
  __tla,
  et as a,
  tt as b,
  rt as c,
  nt as d,
  lt as e
};
