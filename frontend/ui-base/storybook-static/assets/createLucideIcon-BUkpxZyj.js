import { r as s, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
let b;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const C = (t) => t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), w = (t) => t.replace(/^([A-Z])|[\s-_]+(\w)/g, (e, r, o) => o ? o.toUpperCase() : r.toLowerCase()), i = (t) => {
    const e = w(t);
    return e.charAt(0).toUpperCase() + e.slice(1);
  }, l = (...t) => t.filter((e, r, o) => !!e && e.trim() !== "" && o.indexOf(e) === r).join(" ").trim(), f = (t) => {
    for (const e in t) if (e.startsWith("aria-") || e === "role" || e === "title") return true;
  };
  var h = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };
  const g = s.forwardRef(({ color: t = "currentColor", size: e = 24, strokeWidth: r = 2, absoluteStrokeWidth: o, className: n = "", children: a, iconNode: u, ...c }, p) => s.createElement("svg", {
    ref: p,
    ...h,
    width: e,
    height: e,
    stroke: t,
    strokeWidth: o ? Number(r) * 24 / Number(e) : r,
    className: l("lucide", n),
    ...!a && !f(c) && {
      "aria-hidden": "true"
    },
    ...c
  }, [
    ...u.map(([m, d]) => s.createElement(m, d)),
    ...Array.isArray(a) ? a : [
      a
    ]
  ]));
  b = (t, e) => {
    const r = s.forwardRef(({ className: o, ...n }, a) => s.createElement(g, {
      ref: a,
      iconNode: e,
      className: l(`lucide-${C(i(t))}`, `lucide-${t}`, o),
      ...n
    }));
    return r.displayName = i(t), r;
  };
});
export {
  __tla,
  b as c
};
