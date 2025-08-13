const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./index-DE4JkeOq.js","./iframe-CGAl3eeL.js","./preload-helper-D9Z9MdNV.js","./iframe-BIvAlCJm.css"])))=>i.map(i=>d[i]);
import { _ as i } from "./preload-helper-D9Z9MdNV.js";
import { f as t, r as l, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { renderElement as p, unmountElement as u, __tla as __tla_1 } from "./react-18-DFjGqqTj.js";
import { H as d, A as h, C as E, D as x, __tla as __tla_2 } from "./blocks-BmAugzZA.js";
let w, D;
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
  })(),
  (() => {
    try {
      return __tla_2;
    } catch {
    }
  })()
]).then(async () => {
  let _;
  D = {
    code: E,
    a: h,
    ...d
  };
  _ = class extends l.Component {
    constructor() {
      super(...arguments), this.state = {
        hasError: false
      };
    }
    static getDerivedStateFromError() {
      return {
        hasError: true
      };
    }
    componentDidCatch(e) {
      let { showException: r } = this.props;
      r(e);
    }
    render() {
      let { hasError: e } = this.state, { children: r } = this.props;
      return e ? null : t.createElement(t.Fragment, null, r);
    }
  };
  w = class {
    constructor() {
      this.render = async (e, r, n) => {
        let s = {
          ...D,
          ...r == null ? void 0 : r.components
        }, a = x;
        return new Promise((m, c) => {
          i(async () => {
            const { MDXProvider: o } = await import("./index-DE4JkeOq.js").then(async (m2) => {
              await m2.__tla;
              return m2;
            });
            return {
              MDXProvider: o
            };
          }, __vite__mapDeps([0,1,2,3]), import.meta.url).then(({ MDXProvider: o }) => p(t.createElement(_, {
            showException: c,
            key: Math.random()
          }, t.createElement(o, {
            components: s
          }, t.createElement(a, {
            context: e,
            docsParameter: r
          }))), n)).then(() => m());
        });
      }, this.unmount = (e) => {
        u(e);
      };
    }
  };
});
export {
  w as DocsRenderer,
  __tla,
  D as defaultComponents
};
