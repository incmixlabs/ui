import { r, V as m, h as v, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
let S;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var R = m[" useInsertionEffect ".trim().toString()] || v;
  S = function({ prop: e, defaultProp: s, onChange: t = () => {
  }, caller: f }) {
    const [u, c, i] = h({
      defaultProp: s,
      onChange: t
    }), o = e !== void 0, a = o ? e : u;
    {
      const n = r.useRef(e !== void 0);
      r.useEffect(() => {
        const l = n.current;
        l !== o && console.warn(`${f} is changing from ${l ? "controlled" : "uncontrolled"} to ${o ? "controlled" : "uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`), n.current = o;
      }, [
        o,
        f
      ]);
    }
    const d = r.useCallback((n) => {
      var _a;
      if (o) {
        const l = C(n) ? n(e) : n;
        l !== e && ((_a = i.current) == null ? void 0 : _a.call(i, l));
      } else c(n);
    }, [
      o,
      e,
      c,
      i
    ]);
    return [
      a,
      d
    ];
  };
  function h({ defaultProp: e, onChange: s }) {
    const [t, f] = r.useState(e), u = r.useRef(t), c = r.useRef(s);
    return R(() => {
      c.current = s;
    }, [
      s
    ]), r.useEffect(() => {
      var _a;
      u.current !== t && ((_a = c.current) == null ? void 0 : _a.call(c, t), u.current = t);
    }, [
      t,
      u
    ]), [
      t,
      f,
      c
    ];
  }
  function C(e) {
    return typeof e == "function";
  }
});
export {
  __tla,
  S as u
};
