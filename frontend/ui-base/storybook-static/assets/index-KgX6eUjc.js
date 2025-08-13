import { r as u, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
let o;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  o = function(r) {
    const e = u.useRef({
      value: r,
      previous: r
    });
    return u.useMemo(() => (e.current.value !== r && (e.current.previous = e.current.value, e.current.value = r), e.current.previous), [
      r
    ]);
  };
});
export {
  __tla,
  o as u
};
