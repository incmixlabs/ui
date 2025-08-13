import { c as y, f as l, u as S, j as d, g as M, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
let P;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  P = function(s) {
    const a = s + "CollectionProvider", [A, E] = y(a), [N, f] = A(a, {
      collectionRef: {
        current: null
      },
      itemMap: /* @__PURE__ */ new Map()
    }), p = (c) => {
      const { scope: e, children: r } = c, t = l.useRef(null), o = l.useRef(/* @__PURE__ */ new Map()).current;
      return d.jsx(N, {
        scope: e,
        itemMap: o,
        collectionRef: t,
        children: r
      });
    };
    p.displayName = a;
    const u = s + "CollectionSlot", T = M(u), C = l.forwardRef((c, e) => {
      const { scope: r, children: t } = c, o = f(u, r), n = S(e, o.collectionRef);
      return d.jsx(T, {
        ref: n,
        children: t
      });
    });
    C.displayName = u;
    const m = s + "CollectionItemSlot", R = "data-radix-collection-item", O = M(m), x = l.forwardRef((c, e) => {
      const { scope: r, children: t, ...o } = c, n = l.useRef(null), I = S(e, n), i = f(m, r);
      return l.useEffect(() => (i.itemMap.set(n, {
        ref: n,
        ...o
      }), () => void i.itemMap.delete(n))), d.jsx(O, {
        [R]: "",
        ref: I,
        children: t
      });
    });
    x.displayName = m;
    function _(c) {
      const e = f(s + "CollectionConsumer", c);
      return l.useCallback(() => {
        const t = e.collectionRef.current;
        if (!t) return [];
        const o = Array.from(t.querySelectorAll(`[${R}]`));
        return Array.from(e.itemMap.values()).sort((i, v) => o.indexOf(i.ref.current) - o.indexOf(v.ref.current));
      }, [
        e.collectionRef,
        e.itemMap
      ]);
    }
    return [
      {
        Provider: p,
        Slot: C,
        ItemSlot: x
      },
      _,
      E
    ];
  };
});
export {
  __tla,
  P as c
};
