import { j as m, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import "./preload-helper-D9Z9MdNV.js";
let a, e, r, t, y, b;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  const o = ({ primary: s = false, size: n = "medium", backgroundColor: l, label: u, ...i }) => {
    const c = s ? "storybook-button--primary" : "storybook-button--secondary";
    return m.jsx("button", {
      type: "button",
      className: [
        "storybook-button",
        `storybook-button--${n}`,
        c
      ].join(" "),
      style: {
        backgroundColor: l
      },
      ...i,
      children: u
    });
  };
  o.__docgenInfo = {
    description: "Primary UI component for user interaction",
    methods: [],
    displayName: "Button",
    props: {
      primary: {
        required: false,
        tsType: {
          name: "boolean"
        },
        description: "Is this the principal call to action on the page?",
        defaultValue: {
          value: "false",
          computed: false
        }
      },
      backgroundColor: {
        required: false,
        tsType: {
          name: "string"
        },
        description: "What background color to use"
      },
      size: {
        required: false,
        tsType: {
          name: "union",
          raw: '"small" | "medium" | "large"',
          elements: [
            {
              name: "literal",
              value: '"small"'
            },
            {
              name: "literal",
              value: '"medium"'
            },
            {
              name: "literal",
              value: '"large"'
            }
          ]
        },
        description: "How large should the button be?",
        defaultValue: {
          value: '"medium"',
          computed: false
        }
      },
      label: {
        required: true,
        tsType: {
          name: "string"
        },
        description: "Button contents"
      },
      onClick: {
        required: false,
        tsType: {
          name: "signature",
          type: "function",
          raw: "() => void",
          signature: {
            arguments: [],
            return: {
              name: "void"
            }
          }
        },
        description: "Optional click handler"
      }
    }
  };
  let p;
  ({ fn: p } = __STORYBOOK_MODULE_TEST__);
  b = {
    title: "Example/Button",
    component: o,
    parameters: {
      layout: "centered"
    },
    tags: [
      "autodocs"
    ],
    argTypes: {
      backgroundColor: {
        control: "color"
      }
    },
    args: {
      onClick: p()
    }
  };
  e = {
    args: {
      primary: true,
      label: "Button"
    }
  };
  r = {
    args: {
      label: "Button"
    }
  };
  a = {
    args: {
      size: "large",
      label: "Button"
    }
  };
  t = {
    args: {
      size: "small",
      label: "Button"
    }
  };
  e.parameters = {
    ...e.parameters,
    docs: {
      ...(_a = e.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  args: {
    primary: true,
    label: "Button"
  }
}`,
        ...(_c = (_b = e.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  r.parameters = {
    ...r.parameters,
    docs: {
      ...(_d = r.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  args: {
    label: "Button"
  }
}`,
        ...(_f = (_e = r.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  a.parameters = {
    ...a.parameters,
    docs: {
      ...(_g = a.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  args: {
    size: "large",
    label: "Button"
  }
}`,
        ...(_i = (_h = a.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  t.parameters = {
    ...t.parameters,
    docs: {
      ...(_j = t.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  args: {
    size: "small",
    label: "Button"
  }
}`,
        ...(_l = (_k = t.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  y = [
    "Primary",
    "Secondary",
    "Large",
    "Small"
  ];
});
export {
  a as Large,
  e as Primary,
  r as Secondary,
  t as Small,
  y as __namedExportsOrder,
  __tla,
  b as default
};
