import { s as p, r as c, v as i, j as l, l as m, w as u, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
let e;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  let d, f, v;
  d = [
    "horizontal",
    "vertical"
  ];
  f = [
    "1",
    "2",
    "3",
    "4"
  ];
  v = {
    orientation: {
      type: "enum",
      className: "rt-r-orientation",
      values: d,
      default: "horizontal",
      responsive: true
    },
    size: {
      type: "enum",
      className: "rt-r-size",
      values: f,
      default: "1",
      responsive: true
    },
    color: {
      ...p.color,
      default: "gray"
    },
    decorative: {
      type: "boolean",
      default: true
    }
  };
  e = c.forwardRef((o, a) => {
    const { className: r, color: s, decorative: t, ...n } = i(o, v, u);
    return l.jsx("span", {
      "data-accent-color": s,
      role: t ? void 0 : "separator",
      ...n,
      ref: a,
      className: m("rt-Separator", r)
    });
  });
  e.displayName = "Separator";
  e.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Separator",
    composes: [
      "ComponentPropsWithout"
    ]
  };
});
export {
  e as S,
  __tla
};
