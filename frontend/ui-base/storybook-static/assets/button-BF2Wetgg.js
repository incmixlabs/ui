import { r as d, j as s, l as p, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { B as c, __tla as __tla_1 } from "./base-button-BHQkXpSv.js";
let l;
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
  })()
]).then(async () => {
  const r = d.forwardRef(({ className: a, ...t }, e) => s.jsx(c, {
    ...t,
    ref: e,
    className: p("rt-Button", a)
  }));
  r.displayName = "Button";
  r.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Button"
  };
  l = ({ children: a, className: t, disabled: e, variant: o, ...n }) => {
    const i = `${e ? "cursor-not-allowed" : "cursor-pointer"} `;
    return s.jsx(r, {
      ...n,
      variant: o,
      className: `${i}${t}`,
      disabled: e,
      children: a
    });
  };
  l.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Button",
    props: {
      icon: {
        required: false,
        tsType: {
          name: "ReactReactNode",
          raw: "React.ReactNode"
        },
        description: ""
      },
      srLabel: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      isSecondary: {
        required: false,
        tsType: {
          name: "boolean"
        },
        description: ""
      },
      mobileSidebarTrigger: {
        required: false,
        tsType: {
          name: "boolean"
        },
        description: ""
      },
      variant: {
        required: false,
        tsType: {
          name: "union",
          raw: 'RadixButtonProps["variant"] | "naked"',
          elements: [
            {
              name: 'RadixButtonProps["variant"]',
              raw: 'RadixButtonProps["variant"]'
            },
            {
              name: "literal",
              value: '"naked"'
            }
          ]
        },
        description: ""
      }
    }
  };
});
export {
  l as B,
  __tla
};
