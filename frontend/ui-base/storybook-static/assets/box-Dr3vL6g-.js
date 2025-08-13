import { t as l, r as i, v as c, j as d, S as m, l as x, w as f, B as u, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
let s;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  let y, v, B;
  y = [
    "div",
    "span"
  ];
  v = [
    "none",
    "inline",
    "inline-block",
    "block",
    "contents"
  ];
  B = {
    as: {
      type: "enum",
      values: y,
      default: "div"
    },
    ...l,
    display: {
      type: "enum",
      className: "rt-r-display",
      values: v,
      responsive: true
    }
  };
  s = i.forwardRef((a, o) => {
    const { className: e, asChild: t, as: r = "div", ...n } = c(a, B, u, f), p = t ? m : r;
    return d.jsx(p, {
      ...n,
      ref: o,
      className: x("rt-Box", e)
    });
  });
  s.displayName = "Box";
  s.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Box",
    composes: [
      "BoxOwnProps"
    ]
  };
});
export {
  s as B,
  __tla
};
