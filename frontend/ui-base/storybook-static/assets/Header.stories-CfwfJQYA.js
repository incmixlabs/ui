import { H as a, __tla as __tla_0 } from "./Header-CVihEgGE.js";
import { __tla as __tla_1 } from "./iframe-CGAl3eeL.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_2 } from "./button-BF2Wetgg.js";
import { __tla as __tla_3 } from "./base-button-BHQkXpSv.js";
let e, o, d, p;
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
  })(),
  (() => {
    try {
      return __tla_3;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f;
  let r;
  ({ fn: r } = __STORYBOOK_MODULE_TEST__);
  p = {
    title: "Example/Header",
    component: a,
    tags: [
      "autodocs"
    ],
    parameters: {
      layout: "fullscreen"
    },
    args: {
      onLogin: r(),
      onLogout: r(),
      onCreateAccount: r()
    }
  };
  e = {
    args: {
      user: {
        name: "Jane Doe"
      }
    }
  };
  o = {};
  e.parameters = {
    ...e.parameters,
    docs: {
      ...(_a = e.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  args: {
    user: {
      name: "Jane Doe"
    }
  }
}`,
        ...(_c = (_b = e.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  o.parameters = {
    ...o.parameters,
    docs: {
      ...(_d = o.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: "{}",
        ...(_f = (_e = o.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  d = [
    "LoggedIn",
    "LoggedOut"
  ];
});
export {
  e as LoggedIn,
  o as LoggedOut,
  d as __namedExportsOrder,
  __tla,
  p as default
};
