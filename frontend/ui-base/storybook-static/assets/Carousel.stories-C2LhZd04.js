import { r as A, j as l, T as En, a as ne, f as kn, F as He, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { A as Bn, i as dn, b as Nn, __tla as __tla_1 } from "./icon-ClnzJwXp.js";
import { B as fn, __tla as __tla_2 } from "./button-Coy0SoMQ.js";
import { c as je } from "./utils-CBfrqCZ4.js";
import { B as O, __tla as __tla_3 } from "./box-Dr3vL6g-.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_4 } from "./createLucideIcon-BUkpxZyj.js";
import { __tla as __tla_5 } from "./chevron-down-2X_Paxnn.js";
import { __tla as __tla_6 } from "./chevron-right-tttQlfk_.js";
import { __tla as __tla_7 } from "./x-C94K9CrB.js";
import { __tla as __tla_8 } from "./trash-BVyHiUQV.js";
import { __tla as __tla_9 } from "./trash-2-B7j0iALt.js";
import { __tla as __tla_10 } from "./user-DF4nMnH4.js";
let Ae, Te, ke, ze, Be, Le, Ne, Ee, Bt, kt;
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
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n2, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
  function An(e) {
    return Object.prototype.toString.call(e) === "[object Object]";
  }
  function an(e) {
    return An(e) || Array.isArray(e);
  }
  function Ln() {
    return !!(typeof window < "u" && window.document && window.document.createElement);
  }
  function _e(e, n) {
    const t = Object.keys(e), r = Object.keys(n);
    if (t.length !== r.length) return false;
    const i = JSON.stringify(Object.keys(e.breakpoints || {})), s = JSON.stringify(Object.keys(n.breakpoints || {}));
    return i !== s ? false : t.every((o) => {
      const u = e[o], a = n[o];
      return typeof u == "function" ? `${u}` == `${a}` : !an(u) || !an(a) ? u === a : _e(u, a);
    });
  }
  function cn(e) {
    return e.concat().sort((n, t) => n.name > t.name ? 1 : -1).map((n) => n.options);
  }
  function zn(e, n) {
    if (e.length !== n.length) return false;
    const t = cn(e), r = cn(n);
    return t.every((i, s) => {
      const o = r[s];
      return _e(i, o);
    });
  }
  function Ge(e) {
    return typeof e == "number";
  }
  function qe(e) {
    return typeof e == "string";
  }
  function Oe(e) {
    return typeof e == "boolean";
  }
  function ln(e) {
    return Object.prototype.toString.call(e) === "[object Object]";
  }
  function z(e) {
    return Math.abs(e);
  }
  function Ke(e) {
    return Math.sign(e);
  }
  function be(e, n) {
    return z(e - n);
  }
  function Dn(e, n) {
    if (e === 0 || n === 0 || z(e) <= z(n)) return 0;
    const t = be(z(e), z(n));
    return z(t / e);
  }
  function On(e) {
    return Math.round(e * 100) / 100;
  }
  function Ce(e) {
    return ve(e).map(Number);
  }
  function J(e) {
    return e[we(e)];
  }
  function we(e) {
    return Math.max(0, e.length - 1);
  }
  function $e(e, n) {
    return n === we(e);
  }
  function un(e, n = 0) {
    return Array.from(Array(e), (t, r) => n + r);
  }
  function ve(e) {
    return Object.keys(e);
  }
  function pn(e, n) {
    return [
      e,
      n
    ].reduce((t, r) => (ve(r).forEach((i) => {
      const s = t[i], o = r[i], u = ln(s) && ln(o);
      t[i] = u ? pn(s, o) : o;
    }), t), {});
  }
  function Ue(e, n) {
    return typeof n.MouseEvent < "u" && e instanceof n.MouseEvent;
  }
  function Fn(e, n) {
    const t = {
      start: r,
      center: i,
      end: s
    };
    function r() {
      return 0;
    }
    function i(a) {
      return s(a) / 2;
    }
    function s(a) {
      return n - a;
    }
    function o(a, c) {
      return qe(e) ? t[e](a) : e(n, a, c);
    }
    return {
      measure: o
    };
  }
  function Se() {
    let e = [];
    function n(i, s, o, u = {
      passive: true
    }) {
      let a;
      if ("addEventListener" in i) i.addEventListener(s, o, u), a = () => i.removeEventListener(s, o, u);
      else {
        const c = i;
        c.addListener(o), a = () => c.removeListener(o);
      }
      return e.push(a), r;
    }
    function t() {
      e = e.filter((i) => i());
    }
    const r = {
      add: n,
      clear: t
    };
    return r;
  }
  function Pn(e, n, t, r) {
    const i = Se(), s = 1e3 / 60;
    let o = null, u = 0, a = 0;
    function c() {
      i.add(e, "visibilitychange", () => {
        e.hidden && d();
      });
    }
    function y() {
      b(), i.clear();
    }
    function m(g) {
      if (!a) return;
      o || (o = g, t(), t());
      const f = g - o;
      for (o = g, u += f; u >= s; ) t(), u -= s;
      const h = u / s;
      r(h), a && (a = n.requestAnimationFrame(m));
    }
    function x() {
      a || (a = n.requestAnimationFrame(m));
    }
    function b() {
      n.cancelAnimationFrame(a), o = null, u = 0, a = 0;
    }
    function d() {
      o = null, u = 0;
    }
    return {
      init: c,
      destroy: y,
      start: x,
      stop: b,
      update: t,
      render: r
    };
  }
  function Rn(e, n) {
    const t = n === "rtl", r = e === "y", i = r ? "y" : "x", s = r ? "x" : "y", o = !r && t ? -1 : 1, u = y(), a = m();
    function c(d) {
      const { height: p, width: g } = d;
      return r ? p : g;
    }
    function y() {
      return r ? "top" : t ? "right" : "left";
    }
    function m() {
      return r ? "bottom" : t ? "left" : "right";
    }
    function x(d) {
      return d * o;
    }
    return {
      scroll: i,
      cross: s,
      startEdge: u,
      endEdge: a,
      measureSize: c,
      direction: x
    };
  }
  function pe(e = 0, n = 0) {
    const t = z(e - n);
    function r(c) {
      return c < e;
    }
    function i(c) {
      return c > n;
    }
    function s(c) {
      return r(c) || i(c);
    }
    function o(c) {
      return s(c) ? r(c) ? e : n : c;
    }
    function u(c) {
      return t ? c - t * Math.ceil((c - n) / t) : c;
    }
    return {
      length: t,
      max: n,
      min: e,
      constrain: o,
      reachedAny: s,
      reachedMax: i,
      reachedMin: r,
      removeOffset: u
    };
  }
  function mn(e, n, t) {
    const { constrain: r } = pe(0, e), i = e + 1;
    let s = o(n);
    function o(x) {
      return t ? z((i + x) % i) : r(x);
    }
    function u() {
      return s;
    }
    function a(x) {
      return s = o(x), m;
    }
    function c(x) {
      return y().set(u() + x);
    }
    function y() {
      return mn(e, u(), t);
    }
    const m = {
      get: u,
      set: a,
      add: c,
      clone: y
    };
    return m;
  }
  function Mn(e, n, t, r, i, s, o, u, a, c, y, m, x, b, d, p, g, f, h) {
    const { cross: C, direction: w } = e, E = [
      "INPUT",
      "SELECT",
      "TEXTAREA"
    ], I = {
      passive: false
    }, S = Se(), j = Se(), T = pe(50, 225).constrain(b.measure(20)), D = {
      mouse: 300,
      touch: 400
    }, k = {
      mouse: 500,
      touch: 600
    }, P = d ? 43 : 25;
    let K = false, B = 0, R = 0, H = false, q = false, $ = false, Q = false;
    function Z(v) {
      if (!h) return;
      function N(V) {
        (Oe(h) || h(v, V)) && ge(V);
      }
      const F = n;
      S.add(F, "dragstart", (V) => V.preventDefault(), I).add(F, "touchmove", () => {
      }, I).add(F, "touchend", () => {
      }).add(F, "touchstart", N).add(F, "mousedown", N).add(F, "touchcancel", M).add(F, "contextmenu", M).add(F, "click", ae, true);
    }
    function U() {
      S.clear(), j.clear();
    }
    function re() {
      const v = Q ? t : n;
      j.add(v, "touchmove", W, I).add(v, "touchend", M).add(v, "mousemove", W, I).add(v, "mouseup", M);
    }
    function se(v) {
      const N = v.nodeName || "";
      return E.includes(N);
    }
    function ie() {
      return (d ? k : D)[Q ? "mouse" : "touch"];
    }
    function xe(v, N) {
      const F = m.add(Ke(v) * -1), V = y.byDistance(v, !d).distance;
      return d || z(v) < T ? V : g && N ? V * 0.5 : y.byIndex(F.get(), 0).distance;
    }
    function ge(v) {
      const N = Ue(v, r);
      Q = N, $ = d && N && !v.buttons && K, K = be(i.get(), o.get()) >= 2, !(N && v.button !== 0) && (se(v.target) || (H = true, s.pointerDown(v), c.useFriction(0).useDuration(0), i.set(o), re(), B = s.readPoint(v), R = s.readPoint(v, C), x.emit("pointerDown")));
    }
    function W(v) {
      if (!Ue(v, r) && v.touches.length >= 2) return M(v);
      const F = s.readPoint(v), V = s.readPoint(v, C), ee = be(F, B), ce = be(V, R);
      if (!q && !Q && (!v.cancelable || (q = ee > ce, !q))) return M(v);
      const de = s.pointerMove(v);
      ee > p && ($ = true), c.useFriction(0.3).useDuration(0.75), u.start(), i.add(w(de)), v.preventDefault();
    }
    function M(v) {
      const F = y.byDistance(0, false).index !== m.get(), V = s.pointerUp(v) * ie(), ee = xe(w(V), F), ce = Dn(V, ee), de = P - 10 * ce, le = f + ce / 50;
      q = false, H = false, j.clear(), c.useDuration(de).useFriction(le), a.distance(ee, !d), Q = false, x.emit("pointerUp");
    }
    function ae(v) {
      $ && (v.stopPropagation(), v.preventDefault(), $ = false);
    }
    function _() {
      return H;
    }
    return {
      init: Z,
      destroy: U,
      pointerDown: _
    };
  }
  function Vn(e, n) {
    let r, i;
    function s(m) {
      return m.timeStamp;
    }
    function o(m, x) {
      const d = `client${(x || e.scroll) === "x" ? "X" : "Y"}`;
      return (Ue(m, n) ? m : m.touches[0])[d];
    }
    function u(m) {
      return r = m, i = m, o(m);
    }
    function a(m) {
      const x = o(m) - o(i), b = s(m) - s(r) > 170;
      return i = m, b && (r = m), x;
    }
    function c(m) {
      if (!r || !i) return 0;
      const x = o(i) - o(r), b = s(m) - s(r), d = s(m) - s(i) > 170, p = x / b;
      return b && !d && z(p) > 0.1 ? p : 0;
    }
    return {
      pointerDown: u,
      pointerMove: a,
      pointerUp: c,
      readPoint: o
    };
  }
  function Wn() {
    function e(t) {
      const { offsetTop: r, offsetLeft: i, offsetWidth: s, offsetHeight: o } = t;
      return {
        top: r,
        right: i + s,
        bottom: r + o,
        left: i,
        width: s,
        height: o
      };
    }
    return {
      measure: e
    };
  }
  function Hn(e) {
    function n(r) {
      return e * (r / 100);
    }
    return {
      measure: n
    };
  }
  function qn(e, n, t, r, i, s, o) {
    const u = [
      e
    ].concat(r);
    let a, c, y = [], m = false;
    function x(g) {
      return i.measureSize(o.measure(g));
    }
    function b(g) {
      if (!s) return;
      c = x(e), y = r.map(x);
      function f(h) {
        for (const C of h) {
          if (m) return;
          const w = C.target === e, E = r.indexOf(C.target), I = w ? c : y[E], S = x(w ? e : r[E]);
          if (z(S - I) >= 0.5) {
            g.reInit(), n.emit("resize");
            break;
          }
        }
      }
      a = new ResizeObserver((h) => {
        (Oe(s) || s(g, h)) && f(h);
      }), t.requestAnimationFrame(() => {
        u.forEach((h) => a.observe(h));
      });
    }
    function d() {
      m = true, a && a.disconnect();
    }
    return {
      init: b,
      destroy: d
    };
  }
  function Un(e, n, t, r, i, s) {
    let o = 0, u = 0, a = i, c = s, y = e.get(), m = 0;
    function x() {
      const I = r.get() - e.get(), S = !a;
      let j = 0;
      return S ? (o = 0, t.set(r), e.set(r), j = I) : (t.set(e), o += I / a, o *= c, y += o, e.add(o), j = y - m), u = Ke(j), m = y, E;
    }
    function b() {
      const I = r.get() - n.get();
      return z(I) < 1e-3;
    }
    function d() {
      return a;
    }
    function p() {
      return u;
    }
    function g() {
      return o;
    }
    function f() {
      return C(i);
    }
    function h() {
      return w(s);
    }
    function C(I) {
      return a = I, E;
    }
    function w(I) {
      return c = I, E;
    }
    const E = {
      direction: p,
      duration: d,
      velocity: g,
      seek: x,
      settled: b,
      useBaseFriction: h,
      useBaseDuration: f,
      useFriction: w,
      useDuration: C
    };
    return E;
  }
  function _n(e, n, t, r, i) {
    const s = i.measure(10), o = i.measure(50), u = pe(0.1, 0.99);
    let a = false;
    function c() {
      return !(a || !e.reachedAny(t.get()) || !e.reachedAny(n.get()));
    }
    function y(b) {
      if (!c()) return;
      const d = e.reachedMin(n.get()) ? "min" : "max", p = z(e[d] - n.get()), g = t.get() - n.get(), f = u.constrain(p / o);
      t.subtract(g * f), !b && z(g) < s && (t.set(e.constrain(t.get())), r.useDuration(25).useBaseFriction());
    }
    function m(b) {
      a = !b;
    }
    return {
      shouldConstrain: c,
      constrain: y,
      toggleActive: m
    };
  }
  function Gn(e, n, t, r, i) {
    const s = pe(-n + e, 0), o = m(), u = y(), a = x();
    function c(d, p) {
      return be(d, p) <= 1;
    }
    function y() {
      const d = o[0], p = J(o), g = o.lastIndexOf(d), f = o.indexOf(p) + 1;
      return pe(g, f);
    }
    function m() {
      return t.map((d, p) => {
        const { min: g, max: f } = s, h = s.constrain(d), C = !p, w = $e(t, p);
        return C ? f : w || c(g, h) ? g : c(f, h) ? f : h;
      }).map((d) => parseFloat(d.toFixed(3)));
    }
    function x() {
      if (n <= e + i) return [
        s.max
      ];
      if (r === "keepSnaps") return o;
      const { min: d, max: p } = u;
      return o.slice(d, p);
    }
    return {
      snapsContained: a,
      scrollContainLimit: u
    };
  }
  function Kn(e, n, t) {
    const r = n[0], i = t ? r - e : J(n);
    return {
      limit: pe(i, r)
    };
  }
  function $n(e, n, t, r) {
    const s = n.min + 0.1, o = n.max + 0.1, { reachedMin: u, reachedMax: a } = pe(s, o);
    function c(x) {
      return x === 1 ? a(t.get()) : x === -1 ? u(t.get()) : false;
    }
    function y(x) {
      if (!c(x)) return;
      const b = e * (x * -1);
      r.forEach((d) => d.add(b));
    }
    return {
      loop: y
    };
  }
  function Qn(e) {
    const { max: n, length: t } = e;
    function r(s) {
      const o = s - n;
      return t ? o / -t : 0;
    }
    return {
      get: r
    };
  }
  function Jn(e, n, t, r, i) {
    const { startEdge: s, endEdge: o } = e, { groupSlides: u } = i, a = m().map(n.measure), c = x(), y = b();
    function m() {
      return u(r).map((p) => J(p)[o] - p[0][s]).map(z);
    }
    function x() {
      return r.map((p) => t[s] - p[s]).map((p) => -z(p));
    }
    function b() {
      return u(c).map((p) => p[0]).map((p, g) => p + a[g]);
    }
    return {
      snaps: c,
      snapsAligned: y
    };
  }
  function Xn(e, n, t, r, i, s) {
    const { groupSlides: o } = i, { min: u, max: a } = r, c = y();
    function y() {
      const x = o(s), b = !e || n === "keepSnaps";
      return t.length === 1 ? [
        s
      ] : b ? x : x.slice(u, a).map((d, p, g) => {
        const f = !p, h = $e(g, p);
        if (f) {
          const C = J(g[0]) + 1;
          return un(C);
        }
        if (h) {
          const C = we(s) - J(g)[0] + 1;
          return un(C, J(g)[0]);
        }
        return d;
      });
    }
    return {
      slideRegistry: c
    };
  }
  function Yn(e, n, t, r, i) {
    const { reachedAny: s, removeOffset: o, constrain: u } = r;
    function a(d) {
      return d.concat().sort((p, g) => z(p) - z(g))[0];
    }
    function c(d) {
      const p = e ? o(d) : u(d), g = n.map((h, C) => ({
        diff: y(h - p, 0),
        index: C
      })).sort((h, C) => z(h.diff) - z(C.diff)), { index: f } = g[0];
      return {
        index: f,
        distance: p
      };
    }
    function y(d, p) {
      const g = [
        d,
        d + t,
        d - t
      ];
      if (!e) return d;
      if (!p) return a(g);
      const f = g.filter((h) => Ke(h) === p);
      return f.length ? a(f) : J(g) - t;
    }
    function m(d, p) {
      const g = n[d] - i.get(), f = y(g, p);
      return {
        index: d,
        distance: f
      };
    }
    function x(d, p) {
      const g = i.get() + d, { index: f, distance: h } = c(g), C = !e && s(g);
      if (!p || C) return {
        index: f,
        distance: d
      };
      const w = n[f] - h, E = d + y(w, 0);
      return {
        index: f,
        distance: E
      };
    }
    return {
      byDistance: x,
      byIndex: m,
      shortcut: y
    };
  }
  function Zn(e, n, t, r, i, s, o) {
    function u(m) {
      const x = m.distance, b = m.index !== n.get();
      s.add(x), x && (r.duration() ? e.start() : (e.update(), e.render(1), e.update())), b && (t.set(n.get()), n.set(m.index), o.emit("select"));
    }
    function a(m, x) {
      const b = i.byDistance(m, x);
      u(b);
    }
    function c(m, x) {
      const b = n.clone().set(m), d = i.byIndex(b.get(), x);
      u(d);
    }
    return {
      distance: a,
      index: c
    };
  }
  function et(e, n, t, r, i, s, o, u) {
    const a = {
      passive: true,
      capture: true
    };
    let c = 0;
    function y(b) {
      if (!u) return;
      function d(p) {
        if ((/* @__PURE__ */ new Date()).getTime() - c > 10) return;
        o.emit("slideFocusStart"), e.scrollLeft = 0;
        const h = t.findIndex((C) => C.includes(p));
        Ge(h) && (i.useDuration(0), r.index(h, 0), o.emit("slideFocus"));
      }
      s.add(document, "keydown", m, false), n.forEach((p, g) => {
        s.add(p, "focus", (f) => {
          (Oe(u) || u(b, f)) && d(g);
        }, a);
      });
    }
    function m(b) {
      b.code === "Tab" && (c = (/* @__PURE__ */ new Date()).getTime());
    }
    return {
      init: y
    };
  }
  function ye(e) {
    let n = e;
    function t() {
      return n;
    }
    function r(a) {
      n = o(a);
    }
    function i(a) {
      n += o(a);
    }
    function s(a) {
      n -= o(a);
    }
    function o(a) {
      return Ge(a) ? a : a.get();
    }
    return {
      get: t,
      set: r,
      add: i,
      subtract: s
    };
  }
  function xn(e, n) {
    const t = e.scroll === "x" ? o : u, r = n.style;
    let i = null, s = false;
    function o(x) {
      return `translate3d(${x}px,0px,0px)`;
    }
    function u(x) {
      return `translate3d(0px,${x}px,0px)`;
    }
    function a(x) {
      if (s) return;
      const b = On(e.direction(x));
      b !== i && (r.transform = t(b), i = b);
    }
    function c(x) {
      s = !x;
    }
    function y() {
      s || (r.transform = "", n.getAttribute("style") || n.removeAttribute("style"));
    }
    return {
      clear: y,
      to: a,
      toggleActive: c
    };
  }
  function nt(e, n, t, r, i, s, o, u, a) {
    const y = Ce(i), m = Ce(i).reverse(), x = f().concat(h());
    function b(S, j) {
      return S.reduce((T, D) => T - i[D], j);
    }
    function d(S, j) {
      return S.reduce((T, D) => b(T, j) > 0 ? T.concat([
        D
      ]) : T, []);
    }
    function p(S) {
      return s.map((j, T) => ({
        start: j - r[T] + 0.5 + S,
        end: j + n - 0.5 + S
      }));
    }
    function g(S, j, T) {
      const D = p(j);
      return S.map((k) => {
        const P = T ? 0 : -t, K = T ? t : 0, B = T ? "end" : "start", R = D[k][B];
        return {
          index: k,
          loopPoint: R,
          slideLocation: ye(-1),
          translate: xn(e, a[k]),
          target: () => u.get() > R ? P : K
        };
      });
    }
    function f() {
      const S = o[0], j = d(m, S);
      return g(j, t, false);
    }
    function h() {
      const S = n - o[0] - 1, j = d(y, S);
      return g(j, -t, true);
    }
    function C() {
      return x.every(({ index: S }) => {
        const j = y.filter((T) => T !== S);
        return b(j, n) <= 0.1;
      });
    }
    function w() {
      x.forEach((S) => {
        const { target: j, translate: T, slideLocation: D } = S, k = j();
        k !== D.get() && (T.to(k), D.set(k));
      });
    }
    function E() {
      x.forEach((S) => S.translate.clear());
    }
    return {
      canLoop: C,
      clear: E,
      loop: w,
      loopPoints: x
    };
  }
  function tt(e, n, t) {
    let r, i = false;
    function s(a) {
      if (!t) return;
      function c(y) {
        for (const m of y) if (m.type === "childList") {
          a.reInit(), n.emit("slidesChanged");
          break;
        }
      }
      r = new MutationObserver((y) => {
        i || (Oe(t) || t(a, y)) && c(y);
      }), r.observe(e, {
        childList: true
      });
    }
    function o() {
      r && r.disconnect(), i = true;
    }
    return {
      init: s,
      destroy: o
    };
  }
  function ot(e, n, t, r) {
    const i = {};
    let s = null, o = null, u, a = false;
    function c() {
      u = new IntersectionObserver((d) => {
        a || (d.forEach((p) => {
          const g = n.indexOf(p.target);
          i[g] = p;
        }), s = null, o = null, t.emit("slidesInView"));
      }, {
        root: e.parentElement,
        threshold: r
      }), n.forEach((d) => u.observe(d));
    }
    function y() {
      u && u.disconnect(), a = true;
    }
    function m(d) {
      return ve(i).reduce((p, g) => {
        const f = parseInt(g), { isIntersecting: h } = i[f];
        return (d && h || !d && !h) && p.push(f), p;
      }, []);
    }
    function x(d = true) {
      if (d && s) return s;
      if (!d && o) return o;
      const p = m(d);
      return d && (s = p), d || (o = p), p;
    }
    return {
      init: c,
      destroy: y,
      get: x
    };
  }
  function rt(e, n, t, r, i, s) {
    const { measureSize: o, startEdge: u, endEdge: a } = e, c = t[0] && i, y = d(), m = p(), x = t.map(o), b = g();
    function d() {
      if (!c) return 0;
      const h = t[0];
      return z(n[u] - h[u]);
    }
    function p() {
      if (!c) return 0;
      const h = s.getComputedStyle(J(r));
      return parseFloat(h.getPropertyValue(`margin-${a}`));
    }
    function g() {
      return t.map((h, C, w) => {
        const E = !C, I = $e(w, C);
        return E ? x[C] + y : I ? x[C] + m : w[C + 1][u] - h[u];
      }).map(z);
    }
    return {
      slideSizes: x,
      slideSizesWithGaps: b,
      startGap: y,
      endGap: m
    };
  }
  function st(e, n, t, r, i, s, o, u, a) {
    const { startEdge: c, endEdge: y, direction: m } = e, x = Ge(t);
    function b(f, h) {
      return Ce(f).filter((C) => C % h === 0).map((C) => f.slice(C, C + h));
    }
    function d(f) {
      return f.length ? Ce(f).reduce((h, C, w) => {
        const E = J(h) || 0, I = E === 0, S = C === we(f), j = i[c] - s[E][c], T = i[c] - s[C][y], D = !r && I ? m(o) : 0, k = !r && S ? m(u) : 0, P = z(T - k - (j + D));
        return w && P > n + a && h.push(C), S && h.push(f.length), h;
      }, []).map((h, C, w) => {
        const E = Math.max(w[C - 1] || 0);
        return f.slice(E, h);
      }) : [];
    }
    function p(f) {
      return x ? b(f, t) : d(f);
    }
    return {
      groupSlides: p
    };
  }
  function it(e, n, t, r, i, s, o) {
    const { align: u, axis: a, direction: c, startIndex: y, loop: m, duration: x, dragFree: b, dragThreshold: d, inViewThreshold: p, slidesToScroll: g, skipSnaps: f, containScroll: h, watchResize: C, watchSlides: w, watchDrag: E, watchFocus: I } = s, S = 2, j = Wn(), T = j.measure(n), D = t.map(j.measure), k = Rn(a, c), P = k.measureSize(T), K = Hn(P), B = Fn(u, P), R = !m && !!h, H = m || !!h, { slideSizes: q, slideSizesWithGaps: $, startGap: Q, endGap: Z } = rt(k, T, D, t, H, i), U = st(k, P, g, m, T, D, Q, Z, S), { snaps: re, snapsAligned: se } = Jn(k, B, T, D, U), ie = -J(re) + J($), { snapsContained: xe, scrollContainLimit: ge } = Gn(P, ie, se, h, S), W = R ? xe : se, { limit: M } = Kn(ie, W, m), ae = mn(we(W), y, m), _ = ae.clone(), L = Ce(t), v = ({ dragHandler: me, scrollBody: Ve, scrollBounds: We, options: { loop: Ie } }) => {
      Ie || We.constrain(me.pointerDown()), Ve.seek();
    }, N = ({ scrollBody: me, translate: Ve, location: We, offsetLocation: Ie, previousLocation: bn, scrollLooper: Cn, slideLooper: vn, dragHandler: Sn, animation: jn, eventHandler: en, scrollBounds: wn, options: { loop: nn } }, tn) => {
      const on = me.settled(), In = !wn.shouldConstrain(), rn = nn ? on : on && In, sn = rn && !Sn.pointerDown();
      sn && jn.stop();
      const Tn = We.get() * tn + bn.get() * (1 - tn);
      Ie.set(Tn), nn && (Cn.loop(me.direction()), vn.loop()), Ve.to(Ie.get()), sn && en.emit("settle"), rn || en.emit("scroll");
    }, F = Pn(r, i, () => v(Me), (me) => N(Me, me)), V = 0.68, ee = W[ae.get()], ce = ye(ee), de = ye(ee), le = ye(ee), fe = ye(ee), he = Un(ce, le, de, fe, x, V), Pe = Yn(m, W, ie, M, fe), Re = Zn(F, ae, _, he, Pe, fe, o), Xe = Qn(M), Ye = Se(), hn = ot(n, t, o, p), { slideRegistry: Ze } = Xn(R, h, W, ge, U, L), yn = et(e, t, Ze, Re, he, Ye, o, I), Me = {
      ownerDocument: r,
      ownerWindow: i,
      eventHandler: o,
      containerRect: T,
      slideRects: D,
      animation: F,
      axis: k,
      dragHandler: Mn(k, e, r, i, fe, Vn(k, i), ce, F, Re, he, Pe, ae, o, K, b, d, f, V, E),
      eventStore: Ye,
      percentOfView: K,
      index: ae,
      indexPrevious: _,
      limit: M,
      location: ce,
      offsetLocation: le,
      previousLocation: de,
      options: s,
      resizeHandler: qn(n, o, i, t, k, C, j),
      scrollBody: he,
      scrollBounds: _n(M, le, fe, he, K),
      scrollLooper: $n(ie, M, le, [
        ce,
        le,
        de,
        fe
      ]),
      scrollProgress: Xe,
      scrollSnapList: W.map(Xe.get),
      scrollSnaps: W,
      scrollTarget: Pe,
      scrollTo: Re,
      slideLooper: nt(k, P, ie, q, $, re, W, le, t),
      slideFocus: yn,
      slidesHandler: tt(n, o, w),
      slidesInView: hn,
      slideIndexes: L,
      slideRegistry: Ze,
      slidesToScroll: U,
      target: fe,
      translate: xn(k, n)
    };
    return Me;
  }
  function at() {
    let e = {}, n;
    function t(c) {
      n = c;
    }
    function r(c) {
      return e[c] || [];
    }
    function i(c) {
      return r(c).forEach((y) => y(n, c)), a;
    }
    function s(c, y) {
      return e[c] = r(c).concat([
        y
      ]), a;
    }
    function o(c, y) {
      return e[c] = r(c).filter((m) => m !== y), a;
    }
    function u() {
      e = {};
    }
    const a = {
      init: t,
      emit: i,
      off: o,
      on: s,
      clear: u
    };
    return a;
  }
  const ct = {
    align: "center",
    axis: "x",
    container: null,
    slides: null,
    containScroll: "trimSnaps",
    direction: "ltr",
    slidesToScroll: 1,
    inViewThreshold: 0,
    breakpoints: {},
    dragFree: false,
    dragThreshold: 10,
    loop: false,
    skipSnaps: false,
    duration: 25,
    startIndex: 0,
    active: true,
    watchDrag: true,
    watchResize: true,
    watchSlides: true,
    watchFocus: true
  };
  function lt(e) {
    function n(s, o) {
      return pn(s, o || {});
    }
    function t(s) {
      const o = s.breakpoints || {}, u = ve(o).filter((a) => e.matchMedia(a).matches).map((a) => o[a]).reduce((a, c) => n(a, c), {});
      return n(s, u);
    }
    function r(s) {
      return s.map((o) => ve(o.breakpoints || {})).reduce((o, u) => o.concat(u), []).map(e.matchMedia);
    }
    return {
      mergeOptions: n,
      optionsAtMedia: t,
      optionsMediaQueries: r
    };
  }
  function ut(e) {
    let n = [];
    function t(s, o) {
      return n = o.filter(({ options: u }) => e.optionsAtMedia(u).active !== false), n.forEach((u) => u.init(s, e)), o.reduce((u, a) => Object.assign(u, {
        [a.name]: a
      }), {});
    }
    function r() {
      n = n.filter((s) => s.destroy());
    }
    return {
      init: t,
      destroy: r
    };
  }
  function De(e, n, t) {
    const r = e.ownerDocument, i = r.defaultView, s = lt(i), o = ut(s), u = Se(), a = at(), { mergeOptions: c, optionsAtMedia: y, optionsMediaQueries: m } = s, { on: x, off: b, emit: d } = a, p = k;
    let g = false, f, h = c(ct, De.globalOptions), C = c(h), w = [], E, I, S;
    function j() {
      const { container: L, slides: v } = C;
      I = (qe(L) ? e.querySelector(L) : L) || e.children[0];
      const F = qe(v) ? I.querySelectorAll(v) : v;
      S = [].slice.call(F || I.children);
    }
    function T(L) {
      const v = it(e, I, S, r, i, L, a);
      if (L.loop && !v.slideLooper.canLoop()) {
        const N = Object.assign({}, L, {
          loop: false
        });
        return T(N);
      }
      return v;
    }
    function D(L, v) {
      g || (h = c(h, L), C = y(h), w = v || w, j(), f = T(C), m([
        h,
        ...w.map(({ options: N }) => N)
      ]).forEach((N) => u.add(N, "change", k)), C.active && (f.translate.to(f.location.get()), f.animation.init(), f.slidesInView.init(), f.slideFocus.init(_), f.eventHandler.init(_), f.resizeHandler.init(_), f.slidesHandler.init(_), f.options.loop && f.slideLooper.loop(), I.offsetParent && S.length && f.dragHandler.init(_), E = o.init(_, w)));
    }
    function k(L, v) {
      const N = U();
      P(), D(c({
        startIndex: N
      }, L), v), a.emit("reInit");
    }
    function P() {
      f.dragHandler.destroy(), f.eventStore.clear(), f.translate.clear(), f.slideLooper.clear(), f.resizeHandler.destroy(), f.slidesHandler.destroy(), f.slidesInView.destroy(), f.animation.destroy(), o.destroy(), u.clear();
    }
    function K() {
      g || (g = true, u.clear(), P(), a.emit("destroy"), a.clear());
    }
    function B(L, v, N) {
      !C.active || g || (f.scrollBody.useBaseFriction().useDuration(v === true ? 0 : C.duration), f.scrollTo.index(L, N || 0));
    }
    function R(L) {
      const v = f.index.add(1).get();
      B(v, L, -1);
    }
    function H(L) {
      const v = f.index.add(-1).get();
      B(v, L, 1);
    }
    function q() {
      return f.index.add(1).get() !== U();
    }
    function $() {
      return f.index.add(-1).get() !== U();
    }
    function Q() {
      return f.scrollSnapList;
    }
    function Z() {
      return f.scrollProgress.get(f.offsetLocation.get());
    }
    function U() {
      return f.index.get();
    }
    function re() {
      return f.indexPrevious.get();
    }
    function se() {
      return f.slidesInView.get();
    }
    function ie() {
      return f.slidesInView.get(false);
    }
    function xe() {
      return E;
    }
    function ge() {
      return f;
    }
    function W() {
      return e;
    }
    function M() {
      return I;
    }
    function ae() {
      return S;
    }
    const _ = {
      canScrollNext: q,
      canScrollPrev: $,
      containerNode: M,
      internalEngine: ge,
      destroy: K,
      off: b,
      on: x,
      emit: d,
      plugins: xe,
      previousScrollSnap: re,
      reInit: p,
      rootNode: W,
      scrollNext: R,
      scrollPrev: H,
      scrollProgress: Z,
      scrollSnapList: Q,
      scrollTo: B,
      selectedScrollSnap: U,
      slideNodes: ae,
      slidesInView: se,
      slidesNotInView: ie
    };
    return D(n, t), setTimeout(() => a.emit("init"), 0), _;
  }
  De.globalOptions = void 0;
  function Qe(e = {}, n = []) {
    const t = A.useRef(e), r = A.useRef(n), [i, s] = A.useState(), [o, u] = A.useState(), a = A.useCallback(() => {
      i && i.reInit(t.current, r.current);
    }, [
      i
    ]);
    return A.useEffect(() => {
      _e(t.current, e) || (t.current = e, a());
    }, [
      e,
      a
    ]), A.useEffect(() => {
      zn(r.current, n) || (r.current = n, a());
    }, [
      n,
      a
    ]), A.useEffect(() => {
      if (Ln() && o) {
        De.globalOptions = Qe.globalOptions;
        const c = De(o, t.current, r.current);
        return s(c), () => c.destroy();
      } else s(void 0);
    }, [
      o,
      s
    ]), [
      u,
      i
    ];
  }
  Qe.globalOptions = void 0;
  const dt = {
    active: true,
    breakpoints: {},
    delay: 4e3,
    jump: false,
    playOnInit: true,
    stopOnFocusIn: true,
    stopOnInteraction: true,
    stopOnMouseEnter: false,
    stopOnLastSnap: false,
    rootNode: null
  };
  function ft(e, n) {
    const t = e.scrollSnapList();
    return typeof n == "number" ? t.map(() => n) : n(t, e);
  }
  function pt(e, n) {
    const t = e.rootNode();
    return n && n(t) || t;
  }
  function Je(e = {}) {
    let n, t, r, i, s = null, o = 0, u = false, a = false, c = false, y = false;
    function m(B, R) {
      t = B;
      const { mergeOptions: H, optionsAtMedia: q } = R, $ = H(dt, Je.globalOptions), Q = H($, e);
      if (n = q(Q), t.scrollSnapList().length <= 1) return;
      y = n.jump, r = false, i = ft(t, n.delay);
      const { eventStore: Z, ownerDocument: U } = t.internalEngine(), re = !!t.internalEngine().options.watchDrag, se = pt(t, n.rootNode);
      Z.add(U, "visibilitychange", f), re && t.on("pointerDown", C), re && !n.stopOnInteraction && t.on("pointerUp", w), n.stopOnMouseEnter && Z.add(se, "mouseenter", E), n.stopOnMouseEnter && !n.stopOnInteraction && Z.add(se, "mouseleave", I), n.stopOnFocusIn && t.on("slideFocusStart", g), n.stopOnFocusIn && !n.stopOnInteraction && Z.add(t.containerNode(), "focusout", p), n.playOnInit && p();
    }
    function x() {
      t.off("pointerDown", C).off("pointerUp", w).off("slideFocusStart", g), g(), r = true, u = false;
    }
    function b() {
      const { ownerWindow: B } = t.internalEngine();
      B.clearTimeout(o), o = B.setTimeout(k, i[t.selectedScrollSnap()]), s = (/* @__PURE__ */ new Date()).getTime(), t.emit("autoplay:timerset");
    }
    function d() {
      const { ownerWindow: B } = t.internalEngine();
      B.clearTimeout(o), o = 0, s = null, t.emit("autoplay:timerstopped");
    }
    function p() {
      if (!r) {
        if (h()) {
          c = true;
          return;
        }
        u || t.emit("autoplay:play"), b(), u = true;
      }
    }
    function g() {
      r || (u && t.emit("autoplay:stop"), d(), u = false);
    }
    function f() {
      if (h()) return c = u, g();
      c && p();
    }
    function h() {
      const { ownerDocument: B } = t.internalEngine();
      return B.visibilityState === "hidden";
    }
    function C() {
      a || g();
    }
    function w() {
      a || p();
    }
    function E() {
      a = true, g();
    }
    function I() {
      a = false, p();
    }
    function S(B) {
      typeof B < "u" && (y = B), p();
    }
    function j() {
      u && g();
    }
    function T() {
      u && p();
    }
    function D() {
      return u;
    }
    function k() {
      const { index: B } = t.internalEngine(), R = B.clone().add(1).get(), H = t.scrollSnapList().length - 1, q = n.stopOnLastSnap && R === H;
      if (t.canScrollNext() ? t.scrollNext(y) : t.scrollTo(0, y), t.emit("autoplay:select"), q) return g();
      p();
    }
    function P() {
      if (!s) return null;
      const B = i[t.selectedScrollSnap()], R = (/* @__PURE__ */ new Date()).getTime() - s;
      return B - R;
    }
    return {
      name: "autoplay",
      options: e,
      init: m,
      destroy: x,
      play: S,
      stop: j,
      reset: T,
      isPlaying: D,
      timeUntilNext: P
    };
  }
  Je.globalOptions = void 0;
  const gn = A.createContext(null);
  function Fe() {
    const e = A.useContext(gn);
    if (!e) throw new Error("useCarousel must be used within a <Carousel />");
    return e;
  }
  const G = A.forwardRef(({ orientation: e = "horizontal", opts: n, setApi: t, plugins: r, className: i, children: s, ...o }, u) => {
    const [a, c] = Qe({
      ...n,
      axis: e === "horizontal" ? "x" : "y"
    }, r), [y, m] = A.useState(false), [x, b] = A.useState(false), d = A.useCallback((h) => {
      h && (m(h.canScrollPrev()), b(h.canScrollNext()));
    }, []), p = A.useCallback(() => {
      c == null ? void 0 : c.scrollPrev();
    }, [
      c
    ]), g = A.useCallback(() => {
      c == null ? void 0 : c.scrollNext();
    }, [
      c
    ]), f = A.useCallback((h) => {
      const C = e === "horizontal", w = C ? "ArrowLeft" : "ArrowUp", E = C ? "ArrowRight" : "ArrowDown";
      h.key === w ? (h.preventDefault(), p()) : h.key === E && (h.preventDefault(), g());
    }, [
      p,
      g,
      e
    ]);
    return A.useEffect(() => {
      !c || !t || t(c);
    }, [
      c,
      t
    ]), A.useEffect(() => {
      if (c) return d(c), c.on("reInit", d), c.on("select", d), () => {
        c == null ? void 0 : c.off("select", d);
      };
    }, [
      c,
      d
    ]), l.jsx(O, {
      className: "px-6",
      children: l.jsx(gn.Provider, {
        value: {
          carouselRef: a,
          api: c,
          opts: n,
          orientation: e || ((n == null ? void 0 : n.axis) === "y" ? "vertical" : "horizontal"),
          scrollPrev: p,
          scrollNext: g,
          canScrollPrev: y,
          canScrollNext: x
        },
        children: l.jsx("div", {
          ref: u,
          onKeyDownCapture: f,
          className: je("relative", i),
          "aria-roledescription": "carousel",
          ...o,
          children: s
        })
      })
    });
  });
  G.displayName = "Carousel";
  const X = A.forwardRef(({ className: e, ...n }, t) => {
    const { carouselRef: r, orientation: i } = Fe();
    return l.jsx("div", {
      ref: r,
      className: "overflow-hidden",
      children: l.jsx("div", {
        ref: t,
        className: je("flex", i === "horizontal" ? "-ml-4" : "-mt-4 flex-col", e),
        ...n
      })
    });
  });
  X.displayName = "CarouselContent";
  const Y = A.forwardRef(({ className: e, ...n }, t) => {
    const { orientation: r } = Fe();
    return l.jsx("div", {
      ref: t,
      role: "group",
      "aria-roledescription": "slide",
      className: je("min-w-0 shrink-0 grow-0 basis-full", r === "horizontal" ? "pl-4" : "pt-4", e),
      ...n
    });
  });
  Y.displayName = "CarouselItem";
  const te = A.forwardRef(({ className: e, variant: n = "outline", size: t = "icon", ...r }, i) => {
    const { orientation: s, scrollPrev: o, canScrollPrev: u } = Fe();
    return l.jsxs(fn, {
      ref: i,
      variant: n,
      size: t,
      className: je("absolute h-8 w-8 rounded-full", s === "horizontal" ? "-left-12 -translate-y-1/2 top-1/2" : "-top-12 -translate-x-1/2 left-1/2 rotate-90", e),
      disabled: !u,
      onClick: o,
      ...r,
      children: [
        l.jsx(Bn, {
          className: dn
        }),
        l.jsx("span", {
          className: "sr-only",
          children: "Previous slide"
        })
      ]
    });
  });
  te.displayName = "CarouselPrevious";
  const oe = A.forwardRef(({ className: e, variant: n = "outline", size: t = "icon", ...r }, i) => {
    const { orientation: s, scrollNext: o, canScrollNext: u } = Fe();
    return l.jsxs(fn, {
      ref: i,
      variant: n,
      size: t,
      className: je("absolute h-8 w-8 rounded-full", s === "horizontal" ? "-right-12 -translate-y-1/2 top-1/2" : "-bottom-12 -translate-x-1/2 left-1/2 rotate-90", e),
      disabled: !u,
      onClick: o,
      ...r,
      children: [
        l.jsx(Nn, {
          className: dn
        }),
        l.jsx("span", {
          className: "sr-only",
          children: "Next slide"
        })
      ]
    });
  });
  oe.displayName = "CarouselNext";
  G.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Carousel",
    props: {
      opts: {
        required: false,
        tsType: {
          name: "Parameters[0]",
          raw: "UseCarouselParameters[0]"
        },
        description: ""
      },
      plugins: {
        required: false,
        tsType: {
          name: "Parameters[1]",
          raw: "UseCarouselParameters[1]"
        },
        description: ""
      },
      orientation: {
        required: false,
        tsType: {
          name: "union",
          raw: '"horizontal" | "vertical"',
          elements: [
            {
              name: "literal",
              value: '"horizontal"'
            },
            {
              name: "literal",
              value: '"vertical"'
            }
          ]
        },
        description: "",
        defaultValue: {
          value: '"horizontal"',
          computed: false
        }
      },
      setApi: {
        required: false,
        tsType: {
          name: "signature",
          type: "function",
          raw: "(api: CarouselApi) => void",
          signature: {
            arguments: [
              {
                type: {
                  name: "UseEmblaCarouselType[1]",
                  raw: "UseEmblaCarouselType[1]"
                },
                name: "api"
              }
            ],
            return: {
              name: "void"
            }
          }
        },
        description: ""
      }
    }
  };
  X.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CarouselContent"
  };
  Y.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CarouselItem"
  };
  te.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CarouselPrevious",
    props: {
      variant: {
        defaultValue: {
          value: '"outline"',
          computed: false
        },
        required: false
      },
      size: {
        defaultValue: {
          value: '"icon"',
          computed: false
        },
        required: false
      }
    }
  };
  oe.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CarouselNext",
    props: {
      variant: {
        defaultValue: {
          value: '"outline"',
          computed: false
        },
        required: false
      },
      size: {
        defaultValue: {
          value: '"icon"',
          computed: false
        },
        required: false
      }
    }
  };
  let ue;
  kt = {
    title: "Elements/Carousel",
    component: G,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (e) => l.jsx(En, {
        children: l.jsx("div", {
          style: {
            padding: "40px"
          },
          children: l.jsx(e, {})
        })
      })
    ],
    argTypes: {
      orientation: {
        control: "select",
        options: [
          "horizontal",
          "vertical"
        ],
        description: "Carousel orientation"
      },
      opts: {
        control: "object",
        description: "Embla carousel options"
      }
    },
    args: {
      orientation: "horizontal"
    }
  };
  ue = [
    {
      id: 1,
      title: "Mountain Landscape",
      src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&crop=center",
      description: "Beautiful mountain scenery with clear skies"
    },
    {
      id: 2,
      title: "Ocean Sunset",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop&crop=center",
      description: "Stunning sunset over the ocean waves"
    },
    {
      id: 3,
      title: "Forest Path",
      src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&crop=center",
      description: "Peaceful forest path with dappled sunlight"
    },
    {
      id: 4,
      title: "Desert Dunes",
      src: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=800&h=600&fit=crop&crop=center",
      description: "Vast desert with rolling sand dunes"
    },
    {
      id: 5,
      title: "City Skyline",
      src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop&crop=center",
      description: "Modern city skyline at twilight"
    }
  ];
  Te = {
    render: () => l.jsx("div", {
      style: {
        maxWidth: "600px"
      },
      children: l.jsxs(G, {
        children: [
          l.jsx(X, {
            children: ue.map((e, n) => l.jsx(Y, {
              children: l.jsxs(O, {
                style: {
                  padding: "8px"
                },
                children: [
                  l.jsx(O, {
                    style: {
                      aspectRatio: "4/3",
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundColor: "var(--gray-3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    },
                    children: l.jsx("img", {
                      src: e.src,
                      alt: e.title,
                      style: {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }
                    })
                  }),
                  l.jsxs(O, {
                    style: {
                      padding: "12px 4px"
                    },
                    children: [
                      l.jsx(ne, {
                        size: "3",
                        weight: "medium",
                        children: e.title
                      }),
                      l.jsx(ne, {
                        size: "2",
                        color: "gray",
                        children: e.description
                      })
                    ]
                  })
                ]
              })
            }, e.id))
          }),
          l.jsx(te, {}),
          l.jsx(oe, {})
        ]
      })
    })
  };
  Ee = {
    render: () => l.jsx("div", {
      style: {
        maxWidth: "600px"
      },
      children: l.jsx(G, {
        children: l.jsx(X, {
          children: ue.slice(0, 3).map((e) => l.jsx(Y, {
            children: l.jsx(O, {
              style: {
                padding: "8px"
              },
              children: l.jsx(O, {
                style: {
                  aspectRatio: "16/9",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "var(--gray-3)"
                },
                children: l.jsx("img", {
                  src: e.src,
                  alt: e.title,
                  style: {
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }
                })
              })
            })
          }, e.id))
        })
      })
    })
  };
  ke = {
    render: () => l.jsx("div", {
      style: {
        maxWidth: "800px"
      },
      children: l.jsxs(G, {
        opts: {
          align: "start",
          loop: false
        },
        children: [
          l.jsx(X, {
            className: "-ml-2 md:-ml-4",
            children: ue.map((e) => l.jsx(Y, {
              className: "pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3",
              children: l.jsxs(O, {
                style: {
                  padding: "8px"
                },
                children: [
                  l.jsx(O, {
                    style: {
                      aspectRatio: "1",
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundColor: "var(--gray-3)"
                    },
                    children: l.jsx("img", {
                      src: e.src,
                      alt: e.title,
                      style: {
                        width: "100%",
                        height: "100%",
                        objectFit: "cover"
                      }
                    })
                  }),
                  l.jsx(O, {
                    style: {
                      padding: "8px 0"
                    },
                    children: l.jsx(ne, {
                      size: "2",
                      weight: "medium",
                      children: e.title
                    })
                  })
                ]
              })
            }, e.id))
          }),
          l.jsx(te, {}),
          l.jsx(oe, {})
        ]
      })
    })
  };
  Be = {
    render: () => l.jsx("div", {
      style: {
        height: "400px",
        width: "300px"
      },
      children: l.jsxs(G, {
        orientation: "vertical",
        opts: {
          align: "start"
        },
        children: [
          l.jsx(X, {
            style: {
              height: "400px"
            },
            children: ue.slice(0, 4).map((e) => l.jsx(Y, {
              style: {
                paddingTop: "8px",
                paddingBottom: "8px"
              },
              children: l.jsx(O, {
                style: {
                  padding: "8px"
                },
                children: l.jsx(O, {
                  style: {
                    height: "120px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    backgroundColor: "var(--gray-3)"
                  },
                  children: l.jsx("img", {
                    src: e.src,
                    alt: e.title,
                    style: {
                      width: "100%",
                      height: "100%",
                      objectFit: "cover"
                    }
                  })
                })
              })
            }, e.id))
          }),
          l.jsx(te, {}),
          l.jsx(oe, {})
        ]
      })
    })
  };
  Ne = {
    render: () => l.jsxs("div", {
      style: {
        maxWidth: "600px"
      },
      children: [
        l.jsxs(G, {
          plugins: [
            Je({
              delay: 2e3
            })
          ],
          children: [
            l.jsx(X, {
              children: ue.slice(0, 3).map((e) => l.jsx(Y, {
                children: l.jsx(O, {
                  style: {
                    padding: "8px"
                  },
                  children: l.jsxs(O, {
                    style: {
                      aspectRatio: "16/9",
                      borderRadius: "8px",
                      overflow: "hidden",
                      backgroundColor: "var(--gray-3)",
                      position: "relative"
                    },
                    children: [
                      l.jsx("img", {
                        src: e.src,
                        alt: e.title,
                        style: {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }
                      }),
                      l.jsx(O, {
                        style: {
                          position: "absolute",
                          bottom: "0",
                          left: "0",
                          right: "0",
                          background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                          padding: "20px 16px 16px"
                        },
                        children: l.jsx(ne, {
                          size: "3",
                          weight: "medium",
                          style: {
                            color: "white"
                          },
                          children: e.title
                        })
                      })
                    ]
                  })
                })
              }, e.id))
            }),
            l.jsx(te, {}),
            l.jsx(oe, {})
          ]
        }),
        l.jsx(ne, {
          size: "2",
          color: "gray",
          style: {
            textAlign: "center",
            marginTop: "12px",
            display: "block"
          },
          children: "Auto-advances every 2 seconds"
        })
      ]
    })
  };
  Ae = {
    render: () => l.jsx("div", {
      style: {
        maxWidth: "600px"
      },
      children: l.jsxs(G, {
        children: [
          l.jsx(X, {
            children: [
              1,
              2,
              3,
              4,
              5
            ].map((e) => l.jsx(Y, {
              children: l.jsx(O, {
                style: {
                  padding: "8px"
                },
                children: l.jsxs(O, {
                  style: {
                    padding: "24px",
                    borderRadius: "12px",
                    backgroundColor: "var(--gray-2)",
                    border: "1px solid var(--gray-6)",
                    textAlign: "center",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  },
                  children: [
                    l.jsxs(ne, {
                      size: "6",
                      weight: "bold",
                      style: {
                        marginBottom: "8px"
                      },
                      children: [
                        "Card ",
                        e
                      ]
                    }),
                    l.jsxs(ne, {
                      size: "3",
                      color: "gray",
                      style: {
                        marginBottom: "16px"
                      },
                      children: [
                        "This is the content of card number ",
                        e
                      ]
                    }),
                    l.jsxs("button", {
                      style: {
                        padding: "8px 16px",
                        borderRadius: "6px",
                        border: "1px solid var(--blue-7)",
                        backgroundColor: "var(--blue-3)",
                        color: "var(--blue-11)",
                        fontSize: "14px",
                        cursor: "pointer"
                      },
                      children: [
                        "Action ",
                        e
                      ]
                    })
                  ]
                })
              })
            }, e))
          }),
          l.jsx(te, {}),
          l.jsx(oe, {})
        ]
      })
    })
  };
  Le = {
    render: () => {
      const [e, n] = A.useState(), [t, r] = A.useState(0), [i, s] = A.useState(0);
      return kn.useEffect(() => {
        e && (s(e.scrollSnapList().length), r(e.selectedScrollSnap() + 1), e.on("select", () => {
          r(e.selectedScrollSnap() + 1);
        }));
      }, [
        e
      ]), l.jsxs("div", {
        style: {
          maxWidth: "600px"
        },
        children: [
          l.jsxs(G, {
            setApi: n,
            children: [
              l.jsx(X, {
                children: ue.slice(0, 4).map((o, u) => l.jsx(Y, {
                  children: l.jsx(O, {
                    style: {
                      padding: "8px"
                    },
                    children: l.jsx(O, {
                      style: {
                        aspectRatio: "16/9",
                        borderRadius: "8px",
                        overflow: "hidden",
                        backgroundColor: "var(--gray-3)"
                      },
                      children: l.jsx("img", {
                        src: o.src,
                        alt: o.title,
                        style: {
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }
                      })
                    })
                  })
                }, o.id))
              }),
              l.jsx(te, {}),
              l.jsx(oe, {})
            ]
          }),
          l.jsxs(He, {
            justify: "center",
            align: "center",
            gap: "4",
            style: {
              marginTop: "16px"
            },
            children: [
              l.jsxs(ne, {
                size: "2",
                color: "gray",
                children: [
                  "Slide ",
                  t,
                  " of ",
                  i
                ]
              }),
              l.jsxs(He, {
                gap: "2",
                children: [
                  l.jsx("button", {
                    onClick: () => e == null ? void 0 : e.scrollTo(0),
                    style: {
                      padding: "4px 8px",
                      fontSize: "12px",
                      borderRadius: "4px",
                      border: "1px solid var(--gray-6)",
                      backgroundColor: t === 1 ? "var(--blue-3)" : "transparent",
                      cursor: "pointer"
                    },
                    children: "First"
                  }),
                  l.jsx("button", {
                    onClick: () => e == null ? void 0 : e.scrollTo(i - 1),
                    style: {
                      padding: "4px 8px",
                      fontSize: "12px",
                      borderRadius: "4px",
                      border: "1px solid var(--gray-6)",
                      backgroundColor: t === i ? "var(--blue-3)" : "transparent",
                      cursor: "pointer"
                    },
                    children: "Last"
                  })
                ]
              })
            ]
          })
        ]
      });
    }
  };
  ze = {
    render: () => l.jsxs(He, {
      direction: "column",
      gap: "6",
      align: "center",
      children: [
        l.jsxs("div", {
          children: [
            l.jsx(ne, {
              size: "4",
              weight: "bold",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Small (400px)"
            }),
            l.jsx("div", {
              style: {
                maxWidth: "400px"
              },
              children: l.jsxs(G, {
                children: [
                  l.jsx(X, {
                    children: ue.slice(0, 3).map((e) => l.jsx(Y, {
                      children: l.jsx(O, {
                        style: {
                          padding: "4px"
                        },
                        children: l.jsx(O, {
                          style: {
                            aspectRatio: "16/9",
                            borderRadius: "6px",
                            overflow: "hidden",
                            backgroundColor: "var(--gray-3)"
                          },
                          children: l.jsx("img", {
                            src: e.src,
                            alt: e.title,
                            style: {
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }
                          })
                        })
                      })
                    }, e.id))
                  }),
                  l.jsx(te, {}),
                  l.jsx(oe, {})
                ]
              })
            })
          ]
        }),
        l.jsxs("div", {
          children: [
            l.jsx(ne, {
              size: "4",
              weight: "bold",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Large (800px)"
            }),
            l.jsx("div", {
              style: {
                maxWidth: "800px"
              },
              children: l.jsxs(G, {
                children: [
                  l.jsx(X, {
                    children: ue.slice(0, 3).map((e) => l.jsx(Y, {
                      children: l.jsx(O, {
                        style: {
                          padding: "8px"
                        },
                        children: l.jsx(O, {
                          style: {
                            aspectRatio: "16/9",
                            borderRadius: "8px",
                            overflow: "hidden",
                            backgroundColor: "var(--gray-3)"
                          },
                          children: l.jsx("img", {
                            src: e.src,
                            alt: e.title,
                            style: {
                              width: "100%",
                              height: "100%",
                              objectFit: "cover"
                            }
                          })
                        })
                      })
                    }, e.id))
                  }),
                  l.jsx(te, {}),
                  l.jsx(oe, {})
                ]
              })
            })
          ]
        })
      ]
    })
  };
  Te.parameters = {
    ...Te.parameters,
    docs: {
      ...(_a = Te.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "600px"
  }}>
      <Carousel>
        <CarouselContent>
          {sampleImages.map((image, index) => <CarouselItem key={image.id}>
              <Box style={{
            padding: "8px"
          }}>
                <Box style={{
              aspectRatio: "4/3",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "var(--gray-3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
                  <img src={image.src} alt={image.title} style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }} />
                </Box>
                <Box style={{
              padding: "12px 4px"
            }}>
                  <Text size="3" weight="medium">
                    {image.title}
                  </Text>
                  <Text size="2" color="gray">
                    {image.description}
                  </Text>
                </Box>
              </Box>
            </CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
}`,
        ...(_c = (_b = Te.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  Ee.parameters = {
    ...Ee.parameters,
    docs: {
      ...(_d = Ee.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "600px"
  }}>
      <Carousel>
        <CarouselContent>
          {sampleImages.slice(0, 3).map(image => <CarouselItem key={image.id}>
              <Box style={{
            padding: "8px"
          }}>
                <Box style={{
              aspectRatio: "16/9",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "var(--gray-3)"
            }}>
                  <img src={image.src} alt={image.title} style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }} />
                </Box>
              </Box>
            </CarouselItem>)}
        </CarouselContent>
      </Carousel>
    </div>
}`,
        ...(_f = (_e2 = Ee.parameters) == null ? void 0 : _e2.docs) == null ? void 0 : _f.source
      }
    }
  };
  ke.parameters = {
    ...ke.parameters,
    docs: {
      ...(_g = ke.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "800px"
  }}>
      <Carousel opts={{
      align: "start",
      loop: false
    }}>
        <CarouselContent className="-ml-2 md:-ml-4">
          {sampleImages.map(image => <CarouselItem key={image.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Box style={{
            padding: "8px"
          }}>
                <Box style={{
              aspectRatio: "1",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "var(--gray-3)"
            }}>
                  <img src={image.src} alt={image.title} style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }} />
                </Box>
                <Box style={{
              padding: "8px 0"
            }}>
                  <Text size="2" weight="medium">
                    {image.title}
                  </Text>
                </Box>
              </Box>
            </CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
}`,
        ...(_i = (_h = ke.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  Be.parameters = {
    ...Be.parameters,
    docs: {
      ...(_j = Be.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    height: "400px",
    width: "300px"
  }}>
      <Carousel orientation="vertical" opts={{
      align: "start"
    }}>
        <CarouselContent style={{
        height: "400px"
      }}>
          {sampleImages.slice(0, 4).map(image => <CarouselItem key={image.id} style={{
          paddingTop: "8px",
          paddingBottom: "8px"
        }}>
              <Box style={{
            padding: "8px"
          }}>
                <Box style={{
              height: "120px",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "var(--gray-3)"
            }}>
                  <img src={image.src} alt={image.title} style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }} />
                </Box>
              </Box>
            </CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
}`,
        ...(_l = (_k = Be.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  Ne.parameters = {
    ...Ne.parameters,
    docs: {
      ...(_m = Ne.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "600px"
  }}>
      <Carousel plugins={[Autoplay({
      delay: 2000
    })]}>
        <CarouselContent>
          {sampleImages.slice(0, 3).map(image => <CarouselItem key={image.id}>
              <Box style={{
            padding: "8px"
          }}>
                <Box style={{
              aspectRatio: "16/9",
              borderRadius: "8px",
              overflow: "hidden",
              backgroundColor: "var(--gray-3)",
              position: "relative"
            }}>
                  <img src={image.src} alt={image.title} style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }} />
                  <Box style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                right: "0",
                background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                padding: "20px 16px 16px"
              }}>
                    <Text size="3" weight="medium" style={{
                  color: "white"
                }}>
                      {image.title}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <Text size="2" color="gray" style={{
      textAlign: "center",
      marginTop: "12px",
      display: "block"
    }}>
        Auto-advances every 2 seconds
      </Text>
    </div>
}`,
        ...(_o = (_n2 = Ne.parameters) == null ? void 0 : _n2.docs) == null ? void 0 : _o.source
      }
    }
  };
  Ae.parameters = {
    ...Ae.parameters,
    docs: {
      ...(_p = Ae.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "600px"
  }}>
      <Carousel>
        <CarouselContent>
          {[1, 2, 3, 4, 5].map(index => <CarouselItem key={index}>
              <Box style={{
            padding: "8px"
          }}>
                <Box style={{
              padding: "24px",
              borderRadius: "12px",
              backgroundColor: "var(--gray-2)",
              border: "1px solid var(--gray-6)",
              textAlign: "center",
              minHeight: "200px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}>
                  <Text size="6" weight="bold" style={{
                marginBottom: "8px"
              }}>
                    Card {index}
                  </Text>
                  <Text size="3" color="gray" style={{
                marginBottom: "16px"
              }}>
                    This is the content of card number {index}
                  </Text>
                  <button style={{
                padding: "8px 16px",
                borderRadius: "6px",
                border: "1px solid var(--blue-7)",
                backgroundColor: "var(--blue-3)",
                color: "var(--blue-11)",
                fontSize: "14px",
                cursor: "pointer"
              }}>
                    Action {index}
                  </button>
                </Box>
              </Box>
            </CarouselItem>)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
}`,
        ...(_r = (_q = Ae.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  Le.parameters = {
    ...Le.parameters,
    docs: {
      ...(_s = Le.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: () => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);
    React.useEffect(() => {
      if (!api) {
        return;
      }
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
      api.on("select", () => {
        setCurrent(api.selectedScrollSnap() + 1);
      });
    }, [api]);
    return <div style={{
      maxWidth: "600px"
    }}>
        <Carousel setApi={setApi}>
          <CarouselContent>
            {sampleImages.slice(0, 4).map((image, index) => <CarouselItem key={image.id}>
                <Box style={{
              padding: "8px"
            }}>
                  <Box style={{
                aspectRatio: "16/9",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "var(--gray-3)"
              }}>
                    <img src={image.src} alt={image.title} style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }} />
                  </Box>
                </Box>
              </CarouselItem>)}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        
        <Flex justify="center" align="center" gap="4" style={{
        marginTop: "16px"
      }}>
          <Text size="2" color="gray">
            Slide {current} of {count}
          </Text>
          <Flex gap="2">
            <button onClick={() => api?.scrollTo(0)} style={{
            padding: "4px 8px",
            fontSize: "12px",
            borderRadius: "4px",
            border: "1px solid var(--gray-6)",
            backgroundColor: current === 1 ? "var(--blue-3)" : "transparent",
            cursor: "pointer"
          }}>
              First
            </button>
            <button onClick={() => api?.scrollTo(count - 1)} style={{
            padding: "4px 8px",
            fontSize: "12px",
            borderRadius: "4px",
            border: "1px solid var(--gray-6)",
            backgroundColor: current === count ? "var(--blue-3)" : "transparent",
            cursor: "pointer"
          }}>
              Last
            </button>
          </Flex>
        </Flex>
      </div>;
  }
}`,
        ...(_u = (_t = Le.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  ze.parameters = {
    ...ze.parameters,
    docs: {
      ...(_v = ze.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="6" align="center">
      <div>
        <Text size="4" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Small (400px)
        </Text>
        <div style={{
        maxWidth: "400px"
      }}>
          <Carousel>
            <CarouselContent>
              {sampleImages.slice(0, 3).map(image => <CarouselItem key={image.id}>
                  <Box style={{
                padding: "4px"
              }}>
                    <Box style={{
                  aspectRatio: "16/9",
                  borderRadius: "6px",
                  overflow: "hidden",
                  backgroundColor: "var(--gray-3)"
                }}>
                      <img src={image.src} alt={image.title} style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }} />
                    </Box>
                  </Box>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      <div>
        <Text size="4" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Large (800px)
        </Text>
        <div style={{
        maxWidth: "800px"
      }}>
          <Carousel>
            <CarouselContent>
              {sampleImages.slice(0, 3).map(image => <CarouselItem key={image.id}>
                  <Box style={{
                padding: "8px"
              }}>
                    <Box style={{
                  aspectRatio: "16/9",
                  borderRadius: "8px",
                  overflow: "hidden",
                  backgroundColor: "var(--gray-3)"
                }}>
                      <img src={image.src} alt={image.title} style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }} />
                    </Box>
                  </Box>
                </CarouselItem>)}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </Flex>
}`,
        ...(_x = (_w = ze.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  Bt = [
    "Default",
    "WithoutNavigation",
    "MultipleItems",
    "Vertical",
    "WithAutoplay",
    "CardContent",
    "WithApiControl",
    "SizeVariations"
  ];
});
export {
  Ae as CardContent,
  Te as Default,
  ke as MultipleItems,
  ze as SizeVariations,
  Be as Vertical,
  Le as WithApiControl,
  Ne as WithAutoplay,
  Ee as WithoutNavigation,
  Bt as __namedExportsOrder,
  __tla,
  kt as default
};
