import { j as t, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { c as n } from "./utils-CBfrqCZ4.js";
let o;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  o = function({ className: e, type: i, ...r }) {
    return t.jsx("input", {
      type: i,
      "data-slot": "input",
      className: n("flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:font-medium file:text-foreground file:text-sm placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:bg-input/30", "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50", "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40", e),
      ...r
    });
  };
  o.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Input"
  };
});
export {
  o as I,
  __tla
};
