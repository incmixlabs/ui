import { r as c, e as z, u as ge, j as oe, P as ce, h as pe, a2 as ye, aa as T, ab as ue, ac as be, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
let Se, Pe, ft, pt, gt;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  let U, _, Z, Ee;
  U = "focusScope.autoFocusOnMount";
  _ = "focusScope.autoFocusOnUnmount";
  Z = {
    bubbles: false,
    cancelable: true
  };
  Ee = "FocusScope";
  Se = c.forwardRef((e, t) => {
    const { loop: n = false, trapped: r = false, onMountAutoFocus: u, onUnmountAutoFocus: i, ...l } = e, [a, S] = c.useState(null), b = z(u), p = z(i), f = c.useRef(null), v = ge(t, (o) => S(o)), h = c.useRef({
      paused: false,
      pause() {
        this.paused = true;
      },
      resume() {
        this.paused = false;
      }
    }).current;
    c.useEffect(() => {
      if (r) {
        let o = function(g) {
          if (h.paused || !a) return;
          const y = g.target;
          a.contains(y) ? f.current = y : R(f.current, {
            select: true
          });
        }, s = function(g) {
          if (h.paused || !a) return;
          const y = g.relatedTarget;
          y !== null && (a.contains(y) || R(f.current, {
            select: true
          }));
        }, d = function(g) {
          if (document.activeElement === document.body) for (const E of g) E.removedNodes.length > 0 && R(a);
        };
        document.addEventListener("focusin", o), document.addEventListener("focusout", s);
        const m = new MutationObserver(d);
        return a && m.observe(a, {
          childList: true,
          subtree: true
        }), () => {
          document.removeEventListener("focusin", o), document.removeEventListener("focusout", s), m.disconnect();
        };
      }
    }, [
      r,
      a,
      h.paused
    ]), c.useEffect(() => {
      if (a) {
        Q.add(h);
        const o = document.activeElement;
        if (!a.contains(o)) {
          const d = new CustomEvent(U, Z);
          a.addEventListener(U, b), a.dispatchEvent(d), d.defaultPrevented || (we(Ae(ie(a)), {
            select: true
          }), document.activeElement === o && R(a));
        }
        return () => {
          a.removeEventListener(U, b), setTimeout(() => {
            const d = new CustomEvent(_, Z);
            a.addEventListener(_, p), a.dispatchEvent(d), d.defaultPrevented || R(o ?? document.body, {
              select: true
            }), a.removeEventListener(_, p), Q.remove(h);
          }, 0);
        };
      }
    }, [
      a,
      b,
      p,
      h
    ]);
    const w = c.useCallback((o) => {
      if (!n && !r || h.paused) return;
      const s = o.key === "Tab" && !o.altKey && !o.ctrlKey && !o.metaKey, d = document.activeElement;
      if (s && d) {
        const m = o.currentTarget, [g, y] = Ce(m);
        g && y ? !o.shiftKey && d === y ? (o.preventDefault(), n && R(g, {
          select: true
        })) : o.shiftKey && d === g && (o.preventDefault(), n && R(y, {
          select: true
        })) : d === m && o.preventDefault();
      }
    }, [
      n,
      r,
      h.paused
    ]);
    return oe.jsx(ce.div, {
      tabIndex: -1,
      ...l,
      ref: v,
      onKeyDown: w
    });
  });
  Se.displayName = Ee;
  function we(e, { select: t = false } = {}) {
    const n = document.activeElement;
    for (const r of e) if (R(r, {
      select: t
    }), document.activeElement !== n) return;
  }
  function Ce(e) {
    const t = ie(e), n = q(t, e), r = q(t.reverse(), e);
    return [
      n,
      r
    ];
  }
  function ie(e) {
    const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (r) => {
        const u = r.tagName === "INPUT" && r.type === "hidden";
        return r.disabled || r.hidden || u ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      }
    });
    for (; n.nextNode(); ) t.push(n.currentNode);
    return t;
  }
  function q(e, t) {
    for (const n of e) if (!Re(n, {
      upTo: t
    })) return n;
  }
  function Re(e, { upTo: t }) {
    if (getComputedStyle(e).visibility === "hidden") return true;
    for (; e; ) {
      if (t !== void 0 && e === t) return false;
      if (getComputedStyle(e).display === "none") return true;
      e = e.parentElement;
    }
    return false;
  }
  function Te(e) {
    return e instanceof HTMLInputElement && "select" in e;
  }
  function R(e, { select: t = false } = {}) {
    if (e && e.focus) {
      const n = document.activeElement;
      e.focus({
        preventScroll: true
      }), e !== n && Te(e) && t && e.select();
    }
  }
  var Q = ke();
  function ke() {
    let e = [];
    return {
      add(t) {
        const n = e[0];
        t !== n && (n == null ? void 0 : n.pause()), e = $(e, t), e.unshift(t);
      },
      remove(t) {
        var _a;
        e = $(e, t), (_a = e[0]) == null ? void 0 : _a.resume();
      }
    };
  }
  function $(e, t) {
    const n = [
      ...e
    ], r = n.indexOf(t);
    return r !== -1 && n.splice(r, 1), n;
  }
  function Ae(e) {
    return e.filter((t) => t.tagName !== "A");
  }
  let Ne;
  Ne = "Portal";
  Pe = c.forwardRef((e, t) => {
    var _a;
    const { container: n, ...r } = e, [u, i] = c.useState(false);
    pe(() => i(true), []);
    const l = n || u && ((_a = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : _a.body);
    return l ? ye.createPortal(oe.jsx(ce.div, {
      ...r,
      ref: t
    }), l) : null;
  });
  Pe.displayName = Ne;
  var K = 0;
  gt = function() {
    c.useEffect(() => {
      const e = document.querySelectorAll("[data-radix-focus-guard]");
      return document.body.insertAdjacentElement("afterbegin", e[0] ?? J()), document.body.insertAdjacentElement("beforeend", e[1] ?? J()), K++, () => {
        K === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), K--;
      };
    }, []);
  };
  function J() {
    const e = document.createElement("span");
    return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
  }
  var W = "right-scroll-bar-position", B = "width-before-scroll-bar", Me = "with-scroll-bars-hidden", Fe = "--removed-body-scroll-bar-size";
  function H(e, t) {
    return typeof e == "function" ? e(t) : e && (e.current = t), e;
  }
  function Le(e, t) {
    var n = c.useState(function() {
      return {
        value: e,
        callback: t,
        facade: {
          get current() {
            return n.value;
          },
          set current(r) {
            var u = n.value;
            u !== r && (n.value = r, n.callback(r, u));
          }
        }
      };
    })[0];
    return n.callback = t, n.facade;
  }
  var xe = typeof window < "u" ? c.useLayoutEffect : c.useEffect, ee = /* @__PURE__ */ new WeakMap();
  function Ie(e, t) {
    var n = Le(null, function(r) {
      return e.forEach(function(u) {
        return H(u, r);
      });
    });
    return xe(function() {
      var r = ee.get(n);
      if (r) {
        var u = new Set(r), i = new Set(e), l = n.current;
        u.forEach(function(a) {
          i.has(a) || H(a, null);
        }), i.forEach(function(a) {
          u.has(a) || H(a, l);
        });
      }
      ee.set(n, e);
    }, [
      e
    ]), n;
  }
  function Oe(e) {
    return e;
  }
  function We(e, t) {
    t === void 0 && (t = Oe);
    var n = [], r = false, u = {
      read: function() {
        if (r) throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
        return n.length ? n[n.length - 1] : e;
      },
      useMedium: function(i) {
        var l = t(i, r);
        return n.push(l), function() {
          n = n.filter(function(a) {
            return a !== l;
          });
        };
      },
      assignSyncMedium: function(i) {
        for (r = true; n.length; ) {
          var l = n;
          n = [], l.forEach(i);
        }
        n = {
          push: function(a) {
            return i(a);
          },
          filter: function() {
            return n;
          }
        };
      },
      assignMedium: function(i) {
        r = true;
        var l = [];
        if (n.length) {
          var a = n;
          n = [], a.forEach(i), l = n;
        }
        var S = function() {
          var p = l;
          l = [], p.forEach(i);
        }, b = function() {
          return Promise.resolve().then(S);
        };
        b(), n = {
          push: function(p) {
            l.push(p), b();
          },
          filter: function(p) {
            return l = l.filter(p), n;
          }
        };
      }
    };
    return u;
  }
  function Be(e) {
    e === void 0 && (e = {});
    var t = We(null);
    return t.options = T({
      async: true,
      ssr: false
    }, e), t;
  }
  var le = function(e) {
    var t = e.sideCar, n = ue(e, [
      "sideCar"
    ]);
    if (!t) throw new Error("Sidecar: please provide `sideCar` property to import the right car");
    var r = t.read();
    if (!r) throw new Error("Sidecar medium not found");
    return c.createElement(r, T({}, n));
  };
  le.isSideCarExport = true;
  function De(e, t) {
    return e.useMedium(t), le;
  }
  var se = Be(), V = function() {
  }, D = c.forwardRef(function(e, t) {
    var n = c.useRef(null), r = c.useState({
      onScrollCapture: V,
      onWheelCapture: V,
      onTouchMoveCapture: V
    }), u = r[0], i = r[1], l = e.forwardProps, a = e.children, S = e.className, b = e.removeScrollBar, p = e.enabled, f = e.shards, v = e.sideCar, h = e.noRelative, w = e.noIsolation, o = e.inert, s = e.allowPinchZoom, d = e.as, m = d === void 0 ? "div" : d, g = e.gapMode, y = ue(e, [
      "forwardProps",
      "children",
      "className",
      "removeScrollBar",
      "enabled",
      "shards",
      "sideCar",
      "noRelative",
      "noIsolation",
      "inert",
      "allowPinchZoom",
      "as",
      "gapMode"
    ]), E = v, k = Ie([
      n,
      t
    ]), C = T(T({}, y), u);
    return c.createElement(c.Fragment, null, p && c.createElement(E, {
      sideCar: se,
      removeScrollBar: b,
      shards: f,
      noRelative: h,
      noIsolation: w,
      inert: o,
      setCallbacks: i,
      allowPinchZoom: !!s,
      lockRef: n,
      gapMode: g
    }), l ? c.cloneElement(c.Children.only(a), T(T({}, C), {
      ref: k
    })) : c.createElement(m, T({}, C, {
      className: S,
      ref: k
    }), a));
  });
  D.defaultProps = {
    enabled: true,
    removeScrollBar: true,
    inert: false
  };
  D.classNames = {
    fullWidth: B,
    zeroRight: W
  };
  var Ue = function() {
    if (typeof __webpack_nonce__ < "u") return __webpack_nonce__;
  };
  function _e() {
    if (!document) return null;
    var e = document.createElement("style");
    e.type = "text/css";
    var t = Ue();
    return t && e.setAttribute("nonce", t), e;
  }
  function Ke(e, t) {
    e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
  }
  function He(e) {
    var t = document.head || document.getElementsByTagName("head")[0];
    t.appendChild(e);
  }
  var Ve = function() {
    var e = 0, t = null;
    return {
      add: function(n) {
        e == 0 && (t = _e()) && (Ke(t, n), He(t)), e++;
      },
      remove: function() {
        e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
      }
    };
  }, Xe = function() {
    var e = Ve();
    return function(t, n) {
      c.useEffect(function() {
        return e.add(t), function() {
          e.remove();
        };
      }, [
        t && n
      ]);
    };
  }, fe = function() {
    var e = Xe(), t = function(n) {
      var r = n.styles, u = n.dynamic;
      return e(r, u), null;
    };
    return t;
  }, Ye = {
    left: 0,
    top: 0,
    right: 0,
    gap: 0
  }, X = function(e) {
    return parseInt(e || "", 10) || 0;
  }, je = function(e) {
    var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], u = t[e === "padding" ? "paddingRight" : "marginRight"];
    return [
      X(n),
      X(r),
      X(u)
    ];
  }, Ge = function(e) {
    if (e === void 0 && (e = "margin"), typeof window > "u") return Ye;
    var t = je(e), n = document.documentElement.clientWidth, r = window.innerWidth;
    return {
      left: t[0],
      top: t[1],
      right: t[2],
      gap: Math.max(0, r - n + t[2] - t[0])
    };
  }, ze = fe(), M = "data-scroll-locked", Ze = function(e, t, n, r) {
    var u = e.left, i = e.top, l = e.right, a = e.gap;
    return n === void 0 && (n = "margin"), `
  .`.concat(Me, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(a, "px ").concat(r, `;
  }
  body[`).concat(M, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
      t && "position: relative ".concat(r, ";"),
      n === "margin" && `
    padding-left: `.concat(u, `px;
    padding-top: `).concat(i, `px;
    padding-right: `).concat(l, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(a, "px ").concat(r, `;
    `),
      n === "padding" && "padding-right: ".concat(a, "px ").concat(r, ";")
    ].filter(Boolean).join(""), `
  }
  
  .`).concat(W, ` {
    right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(B, ` {
    margin-right: `).concat(a, "px ").concat(r, `;
  }
  
  .`).concat(W, " .").concat(W, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(B, " .").concat(B, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(M, `] {
    `).concat(Fe, ": ").concat(a, `px;
  }
`);
  }, te = function() {
    var e = parseInt(document.body.getAttribute(M) || "0", 10);
    return isFinite(e) ? e : 0;
  }, qe = function() {
    c.useEffect(function() {
      return document.body.setAttribute(M, (te() + 1).toString()), function() {
        var e = te() - 1;
        e <= 0 ? document.body.removeAttribute(M) : document.body.setAttribute(M, e.toString());
      };
    }, []);
  }, Qe = function(e) {
    var t = e.noRelative, n = e.noImportant, r = e.gapMode, u = r === void 0 ? "margin" : r;
    qe();
    var i = c.useMemo(function() {
      return Ge(u);
    }, [
      u
    ]);
    return c.createElement(ze, {
      styles: Ze(i, !t, u, n ? "" : "!important")
    });
  }, j = false;
  if (typeof window < "u") try {
    var L = Object.defineProperty({}, "passive", {
      get: function() {
        return j = true, true;
      }
    });
    window.addEventListener("test", L, L), window.removeEventListener("test", L, L);
  } catch {
    j = false;
  }
  var A = j ? {
    passive: false
  } : false, $e = function(e) {
    return e.tagName === "TEXTAREA";
  }, de = function(e, t) {
    if (!(e instanceof Element)) return false;
    var n = window.getComputedStyle(e);
    return n[t] !== "hidden" && !(n.overflowY === n.overflowX && !$e(e) && n[t] === "visible");
  }, Je = function(e) {
    return de(e, "overflowY");
  }, et = function(e) {
    return de(e, "overflowX");
  }, ne = function(e, t) {
    var n = t.ownerDocument, r = t;
    do {
      typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
      var u = ve(e, r);
      if (u) {
        var i = he(e, r), l = i[1], a = i[2];
        if (l > a) return true;
      }
      r = r.parentNode;
    } while (r && r !== n.body);
    return false;
  }, tt = function(e) {
    var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
    return [
      t,
      n,
      r
    ];
  }, nt = function(e) {
    var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
    return [
      t,
      n,
      r
    ];
  }, ve = function(e, t) {
    return e === "v" ? Je(t) : et(t);
  }, he = function(e, t) {
    return e === "v" ? tt(t) : nt(t);
  }, rt = function(e, t) {
    return e === "h" && t === "rtl" ? -1 : 1;
  }, at = function(e, t, n, r, u) {
    var i = rt(e, window.getComputedStyle(t).direction), l = i * r, a = n.target, S = t.contains(a), b = false, p = l > 0, f = 0, v = 0;
    do {
      if (!a) break;
      var h = he(e, a), w = h[0], o = h[1], s = h[2], d = o - s - i * w;
      (w || d) && ve(e, a) && (f += d, v += w);
      var m = a.parentNode;
      a = m && m.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? m.host : m;
    } while (!S && a !== document.body || S && (t.contains(a) || t === a));
    return (p && Math.abs(f) < 1 || !p && Math.abs(v) < 1) && (b = true), b;
  }, x = function(e) {
    return "changedTouches" in e ? [
      e.changedTouches[0].clientX,
      e.changedTouches[0].clientY
    ] : [
      0,
      0
    ];
  }, re = function(e) {
    return [
      e.deltaX,
      e.deltaY
    ];
  }, ae = function(e) {
    return e && "current" in e ? e.current : e;
  }, ot = function(e, t) {
    return e[0] === t[0] && e[1] === t[1];
  }, ct = function(e) {
    return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
  }, ut = 0, N = [];
  function it(e) {
    var t = c.useRef([]), n = c.useRef([
      0,
      0
    ]), r = c.useRef(), u = c.useState(ut++)[0], i = c.useState(fe)[0], l = c.useRef(e);
    c.useEffect(function() {
      l.current = e;
    }, [
      e
    ]), c.useEffect(function() {
      if (e.inert) {
        document.body.classList.add("block-interactivity-".concat(u));
        var o = be([
          e.lockRef.current
        ], (e.shards || []).map(ae), true).filter(Boolean);
        return o.forEach(function(s) {
          return s.classList.add("allow-interactivity-".concat(u));
        }), function() {
          document.body.classList.remove("block-interactivity-".concat(u)), o.forEach(function(s) {
            return s.classList.remove("allow-interactivity-".concat(u));
          });
        };
      }
    }, [
      e.inert,
      e.lockRef.current,
      e.shards
    ]);
    var a = c.useCallback(function(o, s) {
      if ("touches" in o && o.touches.length === 2 || o.type === "wheel" && o.ctrlKey) return !l.current.allowPinchZoom;
      var d = x(o), m = n.current, g = "deltaX" in o ? o.deltaX : m[0] - d[0], y = "deltaY" in o ? o.deltaY : m[1] - d[1], E, k = o.target, C = Math.abs(g) > Math.abs(y) ? "h" : "v";
      if ("touches" in o && C === "h" && k.type === "range") return false;
      var F = ne(C, k);
      if (!F) return true;
      if (F ? E = C : (E = C === "v" ? "h" : "v", F = ne(C, k)), !F) return false;
      if (!r.current && "changedTouches" in o && (g || y) && (r.current = E), !E) return true;
      var G = r.current || E;
      return at(G, s, o, G === "h" ? g : y);
    }, []), S = c.useCallback(function(o) {
      var s = o;
      if (!(!N.length || N[N.length - 1] !== i)) {
        var d = "deltaY" in s ? re(s) : x(s), m = t.current.filter(function(E) {
          return E.name === s.type && (E.target === s.target || s.target === E.shadowParent) && ot(E.delta, d);
        })[0];
        if (m && m.should) {
          s.cancelable && s.preventDefault();
          return;
        }
        if (!m) {
          var g = (l.current.shards || []).map(ae).filter(Boolean).filter(function(E) {
            return E.contains(s.target);
          }), y = g.length > 0 ? a(s, g[0]) : !l.current.noIsolation;
          y && s.cancelable && s.preventDefault();
        }
      }
    }, []), b = c.useCallback(function(o, s, d, m) {
      var g = {
        name: o,
        delta: s,
        target: d,
        should: m,
        shadowParent: lt(d)
      };
      t.current.push(g), setTimeout(function() {
        t.current = t.current.filter(function(y) {
          return y !== g;
        });
      }, 1);
    }, []), p = c.useCallback(function(o) {
      n.current = x(o), r.current = void 0;
    }, []), f = c.useCallback(function(o) {
      b(o.type, re(o), o.target, a(o, e.lockRef.current));
    }, []), v = c.useCallback(function(o) {
      b(o.type, x(o), o.target, a(o, e.lockRef.current));
    }, []);
    c.useEffect(function() {
      return N.push(i), e.setCallbacks({
        onScrollCapture: f,
        onWheelCapture: f,
        onTouchMoveCapture: v
      }), document.addEventListener("wheel", S, A), document.addEventListener("touchmove", S, A), document.addEventListener("touchstart", p, A), function() {
        N = N.filter(function(o) {
          return o !== i;
        }), document.removeEventListener("wheel", S, A), document.removeEventListener("touchmove", S, A), document.removeEventListener("touchstart", p, A);
      };
    }, []);
    var h = e.removeScrollBar, w = e.inert;
    return c.createElement(c.Fragment, null, w ? c.createElement(i, {
      styles: ct(u)
    }) : null, h ? c.createElement(Qe, {
      noRelative: e.noRelative,
      gapMode: e.gapMode
    }) : null);
  }
  function lt(e) {
    for (var t = null; e !== null; ) e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
    return t;
  }
  const st = De(se, it);
  ft = c.forwardRef(function(e, t) {
    return c.createElement(D, T({}, e, {
      ref: t,
      sideCar: st
    }));
  });
  ft.classNames = D.classNames;
  let dt, P, I, O, Y, me, vt, ht;
  dt = function(e) {
    if (typeof document > "u") return null;
    var t = Array.isArray(e) ? e[0] : e;
    return t.ownerDocument.body;
  };
  P = /* @__PURE__ */ new WeakMap();
  I = /* @__PURE__ */ new WeakMap();
  O = {};
  Y = 0;
  me = function(e) {
    return e && (e.host || me(e.parentNode));
  };
  vt = function(e, t) {
    return t.map(function(n) {
      if (e.contains(n)) return n;
      var r = me(n);
      return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
    }).filter(function(n) {
      return !!n;
    });
  };
  ht = function(e, t, n, r) {
    var u = vt(t, Array.isArray(e) ? e : [
      e
    ]);
    O[n] || (O[n] = /* @__PURE__ */ new WeakMap());
    var i = O[n], l = [], a = /* @__PURE__ */ new Set(), S = new Set(u), b = function(f) {
      !f || a.has(f) || (a.add(f), b(f.parentNode));
    };
    u.forEach(b);
    var p = function(f) {
      !f || S.has(f) || Array.prototype.forEach.call(f.children, function(v) {
        if (a.has(v)) p(v);
        else try {
          var h = v.getAttribute(r), w = h !== null && h !== "false", o = (P.get(v) || 0) + 1, s = (i.get(v) || 0) + 1;
          P.set(v, o), i.set(v, s), l.push(v), o === 1 && w && I.set(v, true), s === 1 && v.setAttribute(n, "true"), w || v.setAttribute(r, "true");
        } catch (d) {
          console.error("aria-hidden: cannot operate on ", v, d);
        }
      });
    };
    return p(t), a.clear(), Y++, function() {
      l.forEach(function(f) {
        var v = P.get(f) - 1, h = i.get(f) - 1;
        P.set(f, v), i.set(f, h), v || (I.has(f) || f.removeAttribute(r), I.delete(f)), h || f.removeAttribute(n);
      }), Y--, Y || (P = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), O = {});
    };
  };
  pt = function(e, t, n) {
    n === void 0 && (n = "data-aria-hidden");
    var r = Array.from(Array.isArray(e) ? e : [
      e
    ]), u = dt(e);
    return u ? (r.push.apply(r, Array.from(u.querySelectorAll("[aria-live]"))), ht(r, u, n, "aria-hidden")) : function() {
      return null;
    };
  };
});
export {
  Se as F,
  Pe as P,
  ft as R,
  __tla,
  pt as h,
  gt as u
};
