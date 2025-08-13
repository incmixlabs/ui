import { Y as e, l as P, X as x, w as j, y as z, t as R, r as w, j as r, Z as T, _ as f, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { R as D, V as _, S as E, T as F, C as M, __tla as __tla_1 } from "./index-D2OStwV5.js";
let y;
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
  })()
]).then(async () => {
  function H(s) {
    const { m: o, mx: m, my: i, mt: c, mr: n, mb: l, ml: u, ...p } = s;
    return {
      m: o,
      mx: m,
      my: i,
      mt: c,
      mr: n,
      mb: l,
      ml: u,
      rest: p
    };
  }
  const a = j.m.values;
  function I(s) {
    const [o, m] = e({
      className: "rt-r-m",
      customProperties: [
        "--margin"
      ],
      propValues: a,
      value: s.m
    }), [i, c] = e({
      className: "rt-r-mx",
      customProperties: [
        "--margin-left",
        "--margin-right"
      ],
      propValues: a,
      value: s.mx
    }), [n, l] = e({
      className: "rt-r-my",
      customProperties: [
        "--margin-top",
        "--margin-bottom"
      ],
      propValues: a,
      value: s.my
    }), [u, p] = e({
      className: "rt-r-mt",
      customProperties: [
        "--margin-top"
      ],
      propValues: a,
      value: s.mt
    }), [b, N] = e({
      className: "rt-r-mr",
      customProperties: [
        "--margin-right"
      ],
      propValues: a,
      value: s.mr
    }), [S, v] = e({
      className: "rt-r-mb",
      customProperties: [
        "--margin-bottom"
      ],
      propValues: a,
      value: s.mb
    }), [g, C] = e({
      className: "rt-r-ml",
      customProperties: [
        "--margin-left"
      ],
      propValues: a,
      value: s.ml
    });
    return [
      P(o, i, n, u, b, S, g),
      x(m, c, l, p, N, v, C)
    ];
  }
  let W, d, t;
  W = [
    "1",
    "2",
    "3"
  ];
  d = {
    ...R,
    size: {
      values: W,
      default: "1"
    },
    ...z,
    scrollbars: {
      default: "both"
    }
  };
  t = {
    Corner: M,
    Root: D,
    Scrollbar: E,
    Thumb: F,
    Viewport: _
  };
  y = w.forwardRef((s, o) => {
    const { rest: m, ...i } = H(s), [c, n] = I(i), { asChild: l, children: u, className: p, style: b, type: N, scrollHideDelay: S = N !== "scroll" ? 0 : void 0, dir: v, size: g = d.size.default, radius: C = d.radius.default, scrollbars: h = d.scrollbars.default, ...V } = m;
    return r.jsx(t.Root, {
      type: N,
      scrollHideDelay: S,
      className: P("rt-ScrollAreaRoot", c, p),
      style: x(n, b),
      asChild: l,
      children: T({
        asChild: l,
        children: u
      }, (A) => r.jsxs(r.Fragment, {
        children: [
          r.jsx(t.Viewport, {
            ...V,
            ref: o,
            className: "rt-ScrollAreaViewport",
            children: A
          }),
          r.jsx("div", {
            className: "rt-ScrollAreaViewportFocusRing"
          }),
          h !== "vertical" ? r.jsx(t.Scrollbar, {
            "data-radius": C,
            orientation: "horizontal",
            className: P("rt-ScrollAreaScrollbar", f({
              className: "rt-r-size",
              value: g,
              propValues: d.size.values
            })),
            children: r.jsx(t.Thumb, {
              className: "rt-ScrollAreaThumb"
            })
          }) : null,
          h !== "horizontal" ? r.jsx(t.Scrollbar, {
            "data-radius": C,
            orientation: "vertical",
            className: P("rt-ScrollAreaScrollbar", f({
              className: "rt-r-size",
              value: g,
              propValues: d.size.values
            })),
            children: r.jsx(t.Thumb, {
              className: "rt-ScrollAreaThumb"
            })
          }) : null,
          h === "both" ? r.jsx(t.Corner, {
            className: "rt-ScrollAreaCorner"
          }) : null
        ]
      }))
    });
  });
  y.displayName = "ScrollArea";
  y.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ScrollArea",
    composes: [
      "ComponentPropsWithout"
    ]
  };
});
export {
  y as S,
  __tla
};
