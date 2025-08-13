import { r as c, u as T, d as le, j as f, c as ce, P as L, k as O, b as C, e as x, h as se, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { c as ae } from "./index-BdQq_4o_.js";
let ye, Re, Te, Ae, Ee;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function ie(e, t) {
    return c.useReducer((r, l) => t[r][l] ?? r, e);
  }
  var U = "ScrollArea", [F, Ce] = ce(U), [de, m] = F(U), q = c.forwardRef((e, t) => {
    const { __scopeScrollArea: r, type: l = "hover", dir: o, scrollHideDelay: n = 600, ...s } = e, [a, i] = c.useState(null), [h, d] = c.useState(null), [b, u] = c.useState(null), [S, w] = c.useState(null), [A, Y] = c.useState(null), [P, _] = c.useState(0), [M, D] = c.useState(0), [j, y] = c.useState(false), [W, H] = c.useState(false), v = T(t, (R) => i(R)), p = le(o);
    return f.jsx(de, {
      scope: r,
      type: l,
      dir: p,
      scrollHideDelay: n,
      scrollArea: a,
      viewport: h,
      onViewportChange: d,
      content: b,
      onContentChange: u,
      scrollbarX: S,
      onScrollbarXChange: w,
      scrollbarXEnabled: j,
      onScrollbarXEnabledChange: y,
      scrollbarY: A,
      onScrollbarYChange: Y,
      scrollbarYEnabled: W,
      onScrollbarYEnabledChange: H,
      onCornerWidthChange: _,
      onCornerHeightChange: D,
      children: f.jsx(L.div, {
        dir: p,
        ...s,
        ref: v,
        style: {
          position: "relative",
          "--radix-scroll-area-corner-width": P + "px",
          "--radix-scroll-area-corner-height": M + "px",
          ...e.style
        }
      })
    });
  });
  q.displayName = U;
  var $ = "ScrollAreaViewport", G = c.forwardRef((e, t) => {
    const { __scopeScrollArea: r, children: l, nonce: o, ...n } = e, s = m($, r), a = c.useRef(null), i = T(t, a, s.onViewportChange);
    return f.jsxs(f.Fragment, {
      children: [
        f.jsx("style", {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: o
        }),
        f.jsx(L.div, {
          "data-radix-scroll-area-viewport": "",
          ...n,
          ref: i,
          style: {
            overflowX: s.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: s.scrollbarYEnabled ? "scroll" : "hidden",
            ...e.style
          },
          children: f.jsx("div", {
            ref: s.onContentChange,
            style: {
              minWidth: "100%",
              display: "table"
            },
            children: l
          })
        })
      ]
    });
  });
  G.displayName = $;
  var g = "ScrollAreaScrollbar", J = c.forwardRef((e, t) => {
    const { forceMount: r, ...l } = e, o = m(g, e.__scopeScrollArea), { onScrollbarXEnabledChange: n, onScrollbarYEnabledChange: s } = o, a = e.orientation === "horizontal";
    return c.useEffect(() => (a ? n(true) : s(true), () => {
      a ? n(false) : s(false);
    }), [
      a,
      n,
      s
    ]), o.type === "hover" ? f.jsx(ue, {
      ...l,
      ref: t,
      forceMount: r
    }) : o.type === "scroll" ? f.jsx(he, {
      ...l,
      ref: t,
      forceMount: r
    }) : o.type === "auto" ? f.jsx(K, {
      ...l,
      ref: t,
      forceMount: r
    }) : o.type === "always" ? f.jsx(V, {
      ...l,
      ref: t
    }) : null;
  });
  J.displayName = g;
  var ue = c.forwardRef((e, t) => {
    const { forceMount: r, ...l } = e, o = m(g, e.__scopeScrollArea), [n, s] = c.useState(false);
    return c.useEffect(() => {
      const a = o.scrollArea;
      let i = 0;
      if (a) {
        const h = () => {
          window.clearTimeout(i), s(true);
        }, d = () => {
          i = window.setTimeout(() => s(false), o.scrollHideDelay);
        };
        return a.addEventListener("pointerenter", h), a.addEventListener("pointerleave", d), () => {
          window.clearTimeout(i), a.removeEventListener("pointerenter", h), a.removeEventListener("pointerleave", d);
        };
      }
    }, [
      o.scrollArea,
      o.scrollHideDelay
    ]), f.jsx(O, {
      present: r || n,
      children: f.jsx(K, {
        "data-state": n ? "visible" : "hidden",
        ...l,
        ref: t
      })
    });
  }), he = c.forwardRef((e, t) => {
    const { forceMount: r, ...l } = e, o = m(g, e.__scopeScrollArea), n = e.orientation === "horizontal", s = X(() => i("SCROLL_END"), 100), [a, i] = ie("hidden", {
      hidden: {
        SCROLL: "scrolling"
      },
      scrolling: {
        SCROLL_END: "idle",
        POINTER_ENTER: "interacting"
      },
      interacting: {
        SCROLL: "interacting",
        POINTER_LEAVE: "idle"
      },
      idle: {
        HIDE: "hidden",
        SCROLL: "scrolling",
        POINTER_ENTER: "interacting"
      }
    });
    return c.useEffect(() => {
      if (a === "idle") {
        const h = window.setTimeout(() => i("HIDE"), o.scrollHideDelay);
        return () => window.clearTimeout(h);
      }
    }, [
      a,
      o.scrollHideDelay,
      i
    ]), c.useEffect(() => {
      const h = o.viewport, d = n ? "scrollLeft" : "scrollTop";
      if (h) {
        let b = h[d];
        const u = () => {
          const S = h[d];
          b !== S && (i("SCROLL"), s()), b = S;
        };
        return h.addEventListener("scroll", u), () => h.removeEventListener("scroll", u);
      }
    }, [
      o.viewport,
      n,
      i,
      s
    ]), f.jsx(O, {
      present: r || a !== "hidden",
      children: f.jsx(V, {
        "data-state": a === "hidden" ? "hidden" : "visible",
        ...l,
        ref: t,
        onPointerEnter: C(e.onPointerEnter, () => i("POINTER_ENTER")),
        onPointerLeave: C(e.onPointerLeave, () => i("POINTER_LEAVE"))
      })
    });
  }), K = c.forwardRef((e, t) => {
    const r = m(g, e.__scopeScrollArea), { forceMount: l, ...o } = e, [n, s] = c.useState(false), a = e.orientation === "horizontal", i = X(() => {
      if (r.viewport) {
        const h = r.viewport.offsetWidth < r.viewport.scrollWidth, d = r.viewport.offsetHeight < r.viewport.scrollHeight;
        s(a ? h : d);
      }
    }, 10);
    return E(r.viewport, i), E(r.content, i), f.jsx(O, {
      present: l || n,
      children: f.jsx(V, {
        "data-state": n ? "visible" : "hidden",
        ...o,
        ref: t
      })
    });
  }), V = c.forwardRef((e, t) => {
    const { orientation: r = "vertical", ...l } = e, o = m(g, e.__scopeScrollArea), n = c.useRef(null), s = c.useRef(0), [a, i] = c.useState({
      content: 0,
      viewport: 0,
      scrollbar: {
        size: 0,
        paddingStart: 0,
        paddingEnd: 0
      }
    }), h = oe(a.viewport, a.content), d = {
      ...l,
      sizes: a,
      onSizesChange: i,
      hasThumb: h > 0 && h < 1,
      onThumbChange: (u) => n.current = u,
      onThumbPointerUp: () => s.current = 0,
      onThumbPointerDown: (u) => s.current = u
    };
    function b(u, S) {
      return pe(u, s.current, a, S);
    }
    return r === "horizontal" ? f.jsx(fe, {
      ...d,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && n.current) {
          const u = o.viewport.scrollLeft, S = B(u, a, o.dir);
          n.current.style.transform = `translate3d(${S}px, 0, 0)`;
        }
      },
      onWheelScroll: (u) => {
        o.viewport && (o.viewport.scrollLeft = u);
      },
      onDragScroll: (u) => {
        o.viewport && (o.viewport.scrollLeft = b(u, o.dir));
      }
    }) : r === "vertical" ? f.jsx(be, {
      ...d,
      ref: t,
      onThumbPositionChange: () => {
        if (o.viewport && n.current) {
          const u = o.viewport.scrollTop, S = B(u, a);
          n.current.style.transform = `translate3d(0, ${S}px, 0)`;
        }
      },
      onWheelScroll: (u) => {
        o.viewport && (o.viewport.scrollTop = u);
      },
      onDragScroll: (u) => {
        o.viewport && (o.viewport.scrollTop = b(u));
      }
    }) : null;
  }), fe = c.forwardRef((e, t) => {
    const { sizes: r, onSizesChange: l, ...o } = e, n = m(g, e.__scopeScrollArea), [s, a] = c.useState(), i = c.useRef(null), h = T(t, i, n.onScrollbarXChange);
    return c.useEffect(() => {
      i.current && a(getComputedStyle(i.current));
    }, [
      i
    ]), f.jsx(Z, {
      "data-orientation": "horizontal",
      ...o,
      ref: h,
      sizes: r,
      style: {
        bottom: 0,
        left: n.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: n.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": I(r) + "px",
        ...e.style
      },
      onThumbPointerDown: (d) => e.onThumbPointerDown(d.x),
      onDragScroll: (d) => e.onDragScroll(d.x),
      onWheelScroll: (d, b) => {
        if (n.viewport) {
          const u = n.viewport.scrollLeft + d.deltaX;
          e.onWheelScroll(u), ne(u, b) && d.preventDefault();
        }
      },
      onResize: () => {
        i.current && n.viewport && s && l({
          content: n.viewport.scrollWidth,
          viewport: n.viewport.offsetWidth,
          scrollbar: {
            size: i.current.clientWidth,
            paddingStart: N(s.paddingLeft),
            paddingEnd: N(s.paddingRight)
          }
        });
      }
    });
  }), be = c.forwardRef((e, t) => {
    const { sizes: r, onSizesChange: l, ...o } = e, n = m(g, e.__scopeScrollArea), [s, a] = c.useState(), i = c.useRef(null), h = T(t, i, n.onScrollbarYChange);
    return c.useEffect(() => {
      i.current && a(getComputedStyle(i.current));
    }, [
      i
    ]), f.jsx(Z, {
      "data-orientation": "vertical",
      ...o,
      ref: h,
      sizes: r,
      style: {
        top: 0,
        right: n.dir === "ltr" ? 0 : void 0,
        left: n.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": I(r) + "px",
        ...e.style
      },
      onThumbPointerDown: (d) => e.onThumbPointerDown(d.y),
      onDragScroll: (d) => e.onDragScroll(d.y),
      onWheelScroll: (d, b) => {
        if (n.viewport) {
          const u = n.viewport.scrollTop + d.deltaY;
          e.onWheelScroll(u), ne(u, b) && d.preventDefault();
        }
      },
      onResize: () => {
        i.current && n.viewport && s && l({
          content: n.viewport.scrollHeight,
          viewport: n.viewport.offsetHeight,
          scrollbar: {
            size: i.current.clientHeight,
            paddingStart: N(s.paddingTop),
            paddingEnd: N(s.paddingBottom)
          }
        });
      }
    });
  }), [Se, Q] = F(g), Z = c.forwardRef((e, t) => {
    const { __scopeScrollArea: r, sizes: l, hasThumb: o, onThumbChange: n, onThumbPointerUp: s, onThumbPointerDown: a, onThumbPositionChange: i, onDragScroll: h, onWheelScroll: d, onResize: b, ...u } = e, S = m(g, r), [w, A] = c.useState(null), Y = T(t, (v) => A(v)), P = c.useRef(null), _ = c.useRef(""), M = S.viewport, D = l.content - l.viewport, j = x(d), y = x(i), W = X(b, 10);
    function H(v) {
      if (P.current) {
        const p = v.clientX - P.current.left, R = v.clientY - P.current.top;
        h({
          x: p,
          y: R
        });
      }
    }
    return c.useEffect(() => {
      const v = (p) => {
        const R = p.target;
        (w == null ? void 0 : w.contains(R)) && j(p, D);
      };
      return document.addEventListener("wheel", v, {
        passive: false
      }), () => document.removeEventListener("wheel", v, {
        passive: false
      });
    }, [
      M,
      w,
      D,
      j
    ]), c.useEffect(y, [
      l,
      y
    ]), E(w, W), E(S.content, W), f.jsx(Se, {
      scope: r,
      scrollbar: w,
      hasThumb: o,
      onThumbChange: x(n),
      onThumbPointerUp: x(s),
      onThumbPositionChange: y,
      onThumbPointerDown: x(a),
      children: f.jsx(L.div, {
        ...u,
        ref: Y,
        style: {
          position: "absolute",
          ...u.style
        },
        onPointerDown: C(e.onPointerDown, (v) => {
          v.button === 0 && (v.target.setPointerCapture(v.pointerId), P.current = w.getBoundingClientRect(), _.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", S.viewport && (S.viewport.style.scrollBehavior = "auto"), H(v));
        }),
        onPointerMove: C(e.onPointerMove, H),
        onPointerUp: C(e.onPointerUp, (v) => {
          const p = v.target;
          p.hasPointerCapture(v.pointerId) && p.releasePointerCapture(v.pointerId), document.body.style.webkitUserSelect = _.current, S.viewport && (S.viewport.style.scrollBehavior = ""), P.current = null;
        })
      })
    });
  }), z = "ScrollAreaThumb", ee = c.forwardRef((e, t) => {
    const { forceMount: r, ...l } = e, o = Q(z, e.__scopeScrollArea);
    return f.jsx(O, {
      present: r || o.hasThumb,
      children: f.jsx(ve, {
        ref: t,
        ...l
      })
    });
  }), ve = c.forwardRef((e, t) => {
    const { __scopeScrollArea: r, style: l, ...o } = e, n = m(z, r), s = Q(z, r), { onThumbPositionChange: a } = s, i = T(t, (b) => s.onThumbChange(b)), h = c.useRef(void 0), d = X(() => {
      h.current && (h.current(), h.current = void 0);
    }, 100);
    return c.useEffect(() => {
      const b = n.viewport;
      if (b) {
        const u = () => {
          if (d(), !h.current) {
            const S = we(b, a);
            h.current = S, a();
          }
        };
        return a(), b.addEventListener("scroll", u), () => b.removeEventListener("scroll", u);
      }
    }, [
      n.viewport,
      d,
      a
    ]), f.jsx(L.div, {
      "data-state": s.hasThumb ? "visible" : "hidden",
      ...o,
      ref: i,
      style: {
        width: "var(--radix-scroll-area-thumb-width)",
        height: "var(--radix-scroll-area-thumb-height)",
        ...l
      },
      onPointerDownCapture: C(e.onPointerDownCapture, (b) => {
        const S = b.target.getBoundingClientRect(), w = b.clientX - S.left, A = b.clientY - S.top;
        s.onThumbPointerDown({
          x: w,
          y: A
        });
      }),
      onPointerUp: C(e.onPointerUp, s.onThumbPointerUp)
    });
  });
  ee.displayName = z;
  var k = "ScrollAreaCorner", re = c.forwardRef((e, t) => {
    const r = m(k, e.__scopeScrollArea), l = !!(r.scrollbarX && r.scrollbarY);
    return r.type !== "scroll" && l ? f.jsx(me, {
      ...e,
      ref: t
    }) : null;
  });
  re.displayName = k;
  var me = c.forwardRef((e, t) => {
    const { __scopeScrollArea: r, ...l } = e, o = m(k, r), [n, s] = c.useState(0), [a, i] = c.useState(0), h = !!(n && a);
    return E(o.scrollbarX, () => {
      var _a;
      const d = ((_a = o.scrollbarX) == null ? void 0 : _a.offsetHeight) || 0;
      o.onCornerHeightChange(d), i(d);
    }), E(o.scrollbarY, () => {
      var _a;
      const d = ((_a = o.scrollbarY) == null ? void 0 : _a.offsetWidth) || 0;
      o.onCornerWidthChange(d), s(d);
    }), h ? f.jsx(L.div, {
      ...l,
      ref: t,
      style: {
        width: n,
        height: a,
        position: "absolute",
        right: o.dir === "ltr" ? 0 : void 0,
        left: o.dir === "rtl" ? 0 : void 0,
        bottom: 0,
        ...e.style
      }
    }) : null;
  });
  function N(e) {
    return e ? parseInt(e, 10) : 0;
  }
  function oe(e, t) {
    const r = e / t;
    return isNaN(r) ? 0 : r;
  }
  function I(e) {
    const t = oe(e.viewport, e.content), r = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, l = (e.scrollbar.size - r) * t;
    return Math.max(l, 18);
  }
  function pe(e, t, r, l = "ltr") {
    const o = I(r), n = o / 2, s = t || n, a = o - s, i = r.scrollbar.paddingStart + s, h = r.scrollbar.size - r.scrollbar.paddingEnd - a, d = r.content - r.viewport, b = l === "ltr" ? [
      0,
      d
    ] : [
      d * -1,
      0
    ];
    return te([
      i,
      h
    ], b)(e);
  }
  function B(e, t, r = "ltr") {
    const l = I(t), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, n = t.scrollbar.size - o, s = t.content - t.viewport, a = n - l, i = r === "ltr" ? [
      0,
      s
    ] : [
      s * -1,
      0
    ], h = ae(e, i);
    return te([
      0,
      s
    ], [
      0,
      a
    ])(h);
  }
  function te(e, t) {
    return (r) => {
      if (e[0] === e[1] || t[0] === t[1]) return t[0];
      const l = (t[1] - t[0]) / (e[1] - e[0]);
      return t[0] + l * (r - e[0]);
    };
  }
  function ne(e, t) {
    return e > 0 && e < t;
  }
  var we = (e, t = () => {
  }) => {
    let r = {
      left: e.scrollLeft,
      top: e.scrollTop
    }, l = 0;
    return function o() {
      const n = {
        left: e.scrollLeft,
        top: e.scrollTop
      }, s = r.left !== n.left, a = r.top !== n.top;
      (s || a) && t(), r = n, l = window.requestAnimationFrame(o);
    }(), () => window.cancelAnimationFrame(l);
  };
  function X(e, t) {
    const r = x(e), l = c.useRef(0);
    return c.useEffect(() => () => window.clearTimeout(l.current), []), c.useCallback(() => {
      window.clearTimeout(l.current), l.current = window.setTimeout(r, t);
    }, [
      r,
      t
    ]);
  }
  function E(e, t) {
    const r = x(t);
    se(() => {
      let l = 0;
      if (e) {
        const o = new ResizeObserver(() => {
          cancelAnimationFrame(l), l = window.requestAnimationFrame(r);
        });
        return o.observe(e), () => {
          window.cancelAnimationFrame(l), o.unobserve(e);
        };
      }
    }, [
      e,
      r
    ]);
  }
  Re = q;
  Ee = G;
  Te = J;
  Ae = ee;
  ye = re;
});
export {
  ye as C,
  Re as R,
  Te as S,
  Ae as T,
  Ee as V,
  __tla
};
