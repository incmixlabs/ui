import { f as e, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import "./preload-helper-D9Z9MdNV.js";
let r, u;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  const o = {}, c = e.createContext(o);
  u = function(n) {
    const t = e.useContext(c);
    return e.useMemo(function() {
      return typeof n == "function" ? n(t) : {
        ...t,
        ...n
      };
    }, [
      t,
      n
    ]);
  };
  r = function(n) {
    let t;
    return n.disableParentContext ? t = typeof n.components == "function" ? n.components(o) : n.components || o : t = u(n.components), e.createElement(c.Provider, {
      value: t
    }, n.children);
  };
});
export {
  r as MDXProvider,
  __tla,
  u as useMDXComponents
};
