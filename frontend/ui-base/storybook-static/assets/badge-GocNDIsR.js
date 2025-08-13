import { y as p, q as d, z as l, t as m, r as f, v as u, j as g, S as P, l as v, w as N, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
let s;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  let h, x, C;
  h = [
    "1",
    "2",
    "3"
  ];
  x = [
    "solid",
    "soft",
    "surface",
    "outline"
  ];
  C = {
    ...m,
    size: {
      type: "enum",
      className: "rt-r-size",
      values: h,
      default: "1",
      responsive: true
    },
    variant: {
      type: "enum",
      className: "rt-variant",
      values: x,
      default: "soft"
    },
    ...l,
    ...d,
    ...p
  };
  s = f.forwardRef((a, e) => {
    const { asChild: o, className: t, color: r, radius: n, ...c } = u(a, C, N), i = o ? P : "span";
    return g.jsx(i, {
      "data-accent-color": r,
      "data-radius": n,
      ...c,
      ref: e,
      className: v("rt-reset", "rt-Badge", t)
    });
  });
  s.displayName = "Badge";
  s.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Badge",
    composes: [
      "ComponentPropsWithout"
    ]
  };
});
export {
  s as B,
  __tla
};
