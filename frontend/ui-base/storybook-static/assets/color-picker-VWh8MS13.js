import { j as t, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { C as $, i as w, __tla as __tla_1 } from "./icon-ClnzJwXp.js";
import { c as g } from "./utils-CBfrqCZ4.js";
let T;
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
  const q = [
    "blue",
    "green",
    "red",
    "amber",
    "purple",
    "teal",
    "pink",
    "indigo",
    "lime",
    "orange",
    "violet",
    "cyan"
  ], r = (o, s = false) => {
    const a = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9
    ];
    return s && a.reverse(), a.map((n) => `var(--${o}-${n})`);
  };
  function S(o) {
    const s = document.createElement("div");
    s.style.color = `var(${o})`, document.body.appendChild(s);
    const a = getComputedStyle(s).color;
    document.body.removeChild(s);
    const n = a.match(/[\d\.]+/g) || [];
    if (n.length < 3) return null;
    const [c, m, d] = n.slice(0, 3).map((i) => Number.parseInt(i).toString(16).padStart(2, "0"));
    let u = `#${c}${m}${d}`;
    if (n.length === 4) {
      const i = Math.round(Number.parseFloat(n[3]) * 255).toString(16).padStart(2, "0");
      u += i;
    }
    return u.toUpperCase();
  }
  T = ({ onColorSelect: o, colorType: s = "all", activeColor: a }) => {
    const n = [
      "var(--gray-1)",
      "var(--gray-2)",
      "var(--gray-3)",
      "var(--gray-4)",
      "var(--gray-5)",
      "var(--gray-6)",
      "var(--gray-7)",
      "var(--gray-8)",
      "var(--gray-9)",
      "var(--gray-10)",
      "var(--gray-11)",
      "var(--gray-12)"
    ], c = r("red", true), m = r("orange", true), d = r("yellow", true), u = r("grass", true), i = r("green", true), v = r("teal", true), f = r("blue", true), h = r("indigo", true), x = r("violet", true), b = r("plum", true), C = r("pink", true), k = [
      c,
      m,
      d,
      u,
      i,
      v,
      f,
      h,
      x,
      b,
      C
    ];
    return s === "base" ? t.jsx("div", {
      className: "rounded-lg bg-gray-5 p-2",
      children: t.jsx("div", {
        className: "grid grid-cols-6 gap-2",
        children: q.map((e) => t.jsx("button", {
          type: "button",
          className: g("h-6 w-6 cursor-pointer rounded-full transition-transform hover:scale-110", "flex items-center justify-center", a === e && "ring-2 ring-offset-2"),
          style: {
            backgroundColor: `var(--${e}-9)`
          },
          onClick: () => o({
            hex: `var(--${e}-9)`,
            name: e
          }),
          title: e,
          children: a === e && t.jsx($, {
            className: `${w} flex-shrink-0 text-white`
          })
        }, e))
      })
    }) : t.jsxs("div", {
      className: "rounded-lg bg-gray-5 p-2",
      children: [
        t.jsx("div", {
          className: "mb-1 flex justify-between",
          children: n.map((e) => t.jsx("button", {
            type: "button",
            className: g("h-6 w-6 cursor-pointer rounded-sm transition-transform hover:scale-110", a === e && "ring-2 ring-offset-2"),
            style: {
              backgroundColor: `${e}`
            },
            onClick: () => o({
              hex: e
            }),
            title: e
          }, `dark-${e}`))
        }),
        t.jsx("div", {
          className: "flex justify-between",
          children: k.map((e, j) => t.jsx("div", {
            className: "flex flex-col gap-1",
            children: e.map((l) => {
              const p = l.match(/^var\((--.+)\)$/), y = p ? p[1] : l;
              return t.jsx("button", {
                type: "button",
                className: g("h-6 w-6 cursor-pointer rounded-sm transition-transform hover:scale-110", a === l && "ring-2 ring-offset-2"),
                style: {
                  backgroundColor: `${l}`
                },
                onClick: () => {
                  const N = S(y) || l;
                  o({
                    hex: N,
                    name: y.replace(/^--/, "")
                  });
                },
                title: l
              }, `color-${l}`);
            })
          }, `group-${j}`))
        })
      ]
    });
  };
  T.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ColorPicker",
    props: {
      onColorSelect: {
        required: true,
        tsType: {
          name: "signature",
          type: "function",
          raw: "(color: { hex: string; name?: string }) => void",
          signature: {
            arguments: [
              {
                type: {
                  name: "signature",
                  type: "object",
                  raw: "{ hex: string; name?: string }",
                  signature: {
                    properties: [
                      {
                        key: "hex",
                        value: {
                          name: "string",
                          required: true
                        }
                      },
                      {
                        key: "name",
                        value: {
                          name: "string",
                          required: false
                        }
                      }
                    ]
                  }
                },
                name: "color"
              }
            ],
            return: {
              name: "void"
            }
          }
        },
        description: ""
      },
      colorType: {
        required: false,
        tsType: {
          name: "union",
          raw: '"base" | "all"',
          elements: [
            {
              name: "literal",
              value: '"base"'
            },
            {
              name: "literal",
              value: '"all"'
            }
          ]
        },
        description: "",
        defaultValue: {
          value: '"all"',
          computed: false
        }
      },
      activeColor: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      }
    }
  };
});
export {
  T as C,
  __tla
};
