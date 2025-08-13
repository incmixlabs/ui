import { r as u, v as f, j as s, l as m, F as l, w as h, a1 as v, y as S, q as g, z as b, t as P, S as z, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
let j, c;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function B(e, a) {
    if (e !== void 0) return typeof e == "string" ? a(e) : Object.fromEntries(Object.entries(e).map(([t, n]) => [
      t,
      a(n)
    ]));
  }
  function C(e) {
    switch (e) {
      case "1":
        return "1";
      case "2":
      case "3":
        return "2";
      case "4":
        return "3";
    }
  }
  let L, D;
  L = [
    "1",
    "2",
    "3"
  ];
  D = {
    size: {
      type: "enum",
      className: "rt-r-size",
      values: L,
      default: "2",
      responsive: true
    },
    loading: {
      type: "boolean",
      default: true
    }
  };
  c = u.forwardRef((e, a) => {
    const { className: t, children: n, loading: i, ...o } = f(e, D, h);
    if (!i) return n;
    const r = s.jsxs("span", {
      ...o,
      ref: a,
      className: m("rt-Spinner", t),
      children: [
        s.jsx("span", {
          className: "rt-SpinnerLeaf"
        }),
        s.jsx("span", {
          className: "rt-SpinnerLeaf"
        }),
        s.jsx("span", {
          className: "rt-SpinnerLeaf"
        }),
        s.jsx("span", {
          className: "rt-SpinnerLeaf"
        }),
        s.jsx("span", {
          className: "rt-SpinnerLeaf"
        }),
        s.jsx("span", {
          className: "rt-SpinnerLeaf"
        }),
        s.jsx("span", {
          className: "rt-SpinnerLeaf"
        }),
        s.jsx("span", {
          className: "rt-SpinnerLeaf"
        })
      ]
    });
    return n === void 0 ? r : s.jsx(l, {
      asChild: true,
      position: "relative",
      align: "center",
      justify: "center",
      children: s.jsxs("span", {
        children: [
          s.jsx("span", {
            "aria-hidden": true,
            style: {
              display: "contents",
              visibility: "hidden"
            },
            inert: void 0,
            children: n
          }),
          s.jsx(l, {
            asChild: true,
            align: "center",
            justify: "center",
            position: "absolute",
            inset: "0",
            children: s.jsx("span", {
              children: r
            })
          })
        ]
      })
    });
  });
  c.displayName = "Spinner";
  c.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Spinner",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  let R, w, _, p;
  R = v;
  w = [
    "1",
    "2",
    "3",
    "4"
  ];
  _ = [
    "classic",
    "solid",
    "soft",
    "surface",
    "outline",
    "ghost"
  ];
  p = {
    ...P,
    size: {
      type: "enum",
      className: "rt-r-size",
      values: w,
      default: "2",
      responsive: true
    },
    variant: {
      type: "enum",
      className: "rt-variant",
      values: _,
      default: "solid"
    },
    ...b,
    ...g,
    ...S,
    loading: {
      type: "boolean",
      className: "rt-loading",
      default: false
    }
  };
  j = u.forwardRef((e, a) => {
    const { size: t = p.size.default } = e, { className: n, children: i, asChild: o, color: r, radius: x, disabled: d = e.loading, ...y } = f(e, p, h), N = o ? z : "button";
    return s.jsx(N, {
      "data-disabled": d || void 0,
      "data-accent-color": r,
      "data-radius": x,
      ...y,
      ref: a,
      className: m("rt-reset", "rt-BaseButton", n),
      disabled: d,
      children: e.loading ? s.jsxs(s.Fragment, {
        children: [
          s.jsx("span", {
            style: {
              display: "contents",
              visibility: "hidden"
            },
            "aria-hidden": true,
            children: i
          }),
          s.jsx(R, {
            children: i
          }),
          s.jsx(l, {
            asChild: true,
            align: "center",
            justify: "center",
            position: "absolute",
            inset: "0",
            children: s.jsx("span", {
              children: s.jsx(c, {
                size: B(t, C)
              })
            })
          })
        ]
      }) : i
    });
  });
  j.displayName = "BaseButton";
  j.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "BaseButton",
    composes: [
      "ComponentPropsWithout"
    ]
  };
});
export {
  j as B,
  c as S,
  __tla
};
