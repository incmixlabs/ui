import { j as i, x as m, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { e as t } from "./types-sXqsNS8j.js";
import { U as c, __tla as __tla_1 } from "./user-DF4nMnH4.js";
let v;
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
  var f = (r) => {
    var e, a;
    return r && ((a = (e = r.match(/(\b\S)?/g)) == null ? void 0 : e.join("").match(/(^\S|\S$)?/g)) == null ? void 0 : a.join("").toUpperCase()) || "";
  };
  v = ({ id: r, size: e = "3", name: a, radius: s = "full", variant: l = "solid", className: n, src: d, style: o, ...u }) => {
    const p = a ? f(a) : i.jsx(c, {
      height: t[e],
      width: t[e]
    });
    return i.jsx(m, {
      "data-user-id": r,
      src: d,
      style: o,
      className: `overflow-hidden ${n}`,
      size: e,
      fallback: p,
      alt: a,
      radius: s,
      variant: l,
      ...u
    });
  };
  v.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Avatar",
    props: {
      email: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      id: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      size: {
        required: false,
        tsType: {
          name: "union",
          raw: 'Size | "5" | "6" | "7" | "8" | "9"',
          elements: [
            {
              name: "union",
              raw: '"1" | "2" | "3" | "4"',
              elements: [
                {
                  name: "literal",
                  value: '"1"'
                },
                {
                  name: "literal",
                  value: '"2"'
                },
                {
                  name: "literal",
                  value: '"3"'
                },
                {
                  name: "literal",
                  value: '"4"'
                }
              ]
            },
            {
              name: "literal",
              value: '"5"'
            },
            {
              name: "literal",
              value: '"6"'
            },
            {
              name: "literal",
              value: '"7"'
            },
            {
              name: "literal",
              value: '"8"'
            },
            {
              name: "literal",
              value: '"9"'
            }
          ]
        },
        description: "",
        defaultValue: {
          value: '"3"',
          computed: false
        }
      },
      src: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      name: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      radius: {
        required: false,
        tsType: {
          name: 'RadixProps["radius"]',
          raw: 'RadixProps["radius"]'
        },
        description: "",
        defaultValue: {
          value: '"full"',
          computed: false
        }
      },
      variant: {
        required: false,
        tsType: {
          name: 'RadixProps["variant"]',
          raw: 'RadixProps["variant"]'
        },
        description: "",
        defaultValue: {
          value: '"solid"',
          computed: false
        }
      },
      className: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      style: {
        required: false,
        tsType: {
          name: "ReactCSSProperties",
          raw: "React.CSSProperties"
        },
        description: ""
      }
    }
  };
});
export {
  v as A,
  __tla
};
