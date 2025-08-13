import { r as m, j as a, l as u, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { B as i, __tla as __tla_1 } from "./base-button-BHQkXpSv.js";
let p;
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
  const n = m.forwardRef(({ className: t, ...s }, o) => a.jsx(i, {
    ...s,
    ref: o,
    className: u("rt-IconButton", t)
  }));
  n.displayName = "IconButton";
  n.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "IconButton"
  };
  p = ({ children: t, className: s, disabled: o, variant: r, ...e }) => {
    const c = `${o ? "cursor-not-allowed" : "cursor-pointer"} `;
    return a.jsx(n, {
      ...e,
      variant: r || "soft",
      className: `${c}${s}`,
      disabled: o,
      children: t
    });
  };
  p.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "IconButton"
  };
});
export {
  p as I,
  __tla
};
