import { r, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
let n;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  n = (e) => {
    if (!r.isValidElement(e)) throw Error(`Expected a single React Element child, but got: ${r.Children.toArray(e).map((t) => typeof t == "object" && "type" in t && typeof t.type == "string" ? t.type : typeof t).join(", ")}`);
    return e;
  };
});
export {
  __tla,
  n as r
};
