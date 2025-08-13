import { j as y, S as k, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { a as p, c as V } from "./utils-CBfrqCZ4.js";
let w, j;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  let g, m, N;
  g = (n) => typeof n == "boolean" ? `${n}` : n === 0 ? "0" : n;
  m = p;
  N = (n, a) => (e) => {
    var o;
    if ((a == null ? void 0 : a.variants) == null) return m(n, e == null ? void 0 : e.class, e == null ? void 0 : e.className);
    const { variants: l, defaultVariants: i } = a, b = Object.keys(l).map((t) => {
      const r = e == null ? void 0 : e[t], d = i == null ? void 0 : i[t];
      if (r === null) return null;
      const s = g(r) || g(d);
      return l[t][s];
    }), c = e && Object.entries(e).reduce((t, r) => {
      let [d, s] = r;
      return s === void 0 || (t[d] = s), t;
    }, {}), f = a == null || (o = a.compoundVariants) === null || o === void 0 ? void 0 : o.reduce((t, r) => {
      let { class: d, className: s, ...h } = r;
      return Object.entries(h).every((x) => {
        let [v, u] = x;
        return Array.isArray(u) ? u.includes({
          ...i,
          ...c
        }[v]) : {
          ...i,
          ...c
        }[v] === u;
      }) ? [
        ...t,
        d,
        s
      ] : t;
    }, []);
    return m(n, b, f, e == null ? void 0 : e.class, e == null ? void 0 : e.className);
  };
  j = N("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  });
  w = function({ className: n, variant: a, size: e, asChild: o = false, ...l }) {
    const i = o ? k : "button";
    return y.jsx(i, {
      "data-slot": "button",
      className: V(j({
        variant: a,
        size: e,
        className: n
      })),
      ...l
    });
  };
  w.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Button",
    props: {
      asChild: {
        required: false,
        tsType: {
          name: "boolean"
        },
        description: "",
        defaultValue: {
          value: "false",
          computed: false
        }
      }
    }
  };
});
export {
  w as B,
  __tla,
  j as b
};
