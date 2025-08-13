import { r as s, V as o, h as u, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
let i;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var n = o[" useId ".trim().toString()] || (() => {
  }), c = 0;
  i = function(t) {
    const [r, a] = s.useState(n());
    return u(() => {
      a((e) => e ?? String(c++));
    }, [
      t
    ]), t || (r ? `radix-${r}` : "");
  };
});
export {
  __tla,
  i as u
};
