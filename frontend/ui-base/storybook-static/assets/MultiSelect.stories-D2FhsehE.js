import { r as a, j as e, T as ve, F as m, a as r, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { e as q, C as Ce, _ as Te, b as we, d as je, P as ke, __tla as __tla_1 } from "./command-Dq5lJyfT.js";
import { c as T } from "./utils-CBfrqCZ4.js";
import { X as se, L as Oe, __tla as __tla_2 } from "./x-C94K9CrB.js";
import { B as ze, __tla as __tla_3 } from "./badge-GocNDIsR.js";
import { B as S, __tla as __tla_4 } from "./box-Dr3vL6g-.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_5 } from "./index-BpKby9Va.js";
import { __tla as __tla_6 } from "./index-CEOg2jVB.js";
import { __tla as __tla_7 } from "./index-DfrOcl7X.js";
import { __tla as __tla_8 } from "./index-ChItmDsK.js";
import { __tla as __tla_9 } from "./createLucideIcon-BUkpxZyj.js";
let $, U, G, Q, Y, X, _, H, J, K, Ke, Ue;
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
  })(),
  (() => {
    try {
      return __tla_4;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_5;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_6;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_7;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_8;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_9;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D;
  function Me(n, l) {
    const [s, d] = a.useState(n);
    return a.useEffect(() => {
      const u = setTimeout(() => d(n), l);
      return () => {
        clearTimeout(u);
      };
    }, [
      n,
      l
    ]), s;
  }
  function V(n, l) {
    if (n.length === 0) return {};
    if (!l) return {
      "": n
    };
    const s = {};
    return n.forEach((d) => {
      const u = d[l] || "";
      s[u] || (s[u] = []), s[u].push(d);
    }), s;
  }
  function Fe(n, l) {
    const s = JSON.parse(JSON.stringify(n));
    for (const [d, u] of Object.entries(s)) s[d] = u.filter((f) => !l.find((y) => y.value === f.value));
    return s;
  }
  function Re(n, l) {
    for (const [, s] of Object.entries(n)) if (s.some((d) => l.find((u) => u.value === d.value))) return true;
    return false;
  }
  const oe = a.forwardRef(({ className: n, ...l }, s) => ke((u) => u.filtered.count === 0) ? e.jsx("div", {
    ref: s,
    className: T("p-2 text-center text-sm", n),
    "cmdk-empty": "",
    role: "presentation",
    ...l
  }) : null);
  oe.displayName = "CommandEmpty";
  const x = a.forwardRef(({ value: n, onChange: l, placeholder: s, defaultOptions: d = [], options: u, defaultColor: f = "crimson", delay: y, onSearch: h, onSearchSync: w, loadingIndicator: A, emptyIndicator: j, maxSelected: E = Number.MAX_SAFE_INTEGER, onMaxSelected: I, hidePlaceholderWhenSelected: B, disabled: c, groupBy: k, className: ie, badgeClassName: ce, selectFirstItem: de = true, creatable: N = false, triggerSearchOnFocus: L = false, commandProps: v, inputProps: D, hideClearAllButton: ue = false }, pe) => {
    const b = a.useRef(null), [O, Z] = a.useState(false), [me, ae] = a.useState(false), [le, re] = a.useState(false), ee = a.useRef(null), [o, F] = a.useState(n || []), [z, ne] = a.useState(V(d, k)), [C, te] = a.useState(""), M = Me(C, y || 500);
    a.useImperativeHandle(pe, () => ({
      selectedValue: [
        ...o
      ],
      input: b.current,
      focus: () => {
        var _a2;
        return (_a2 = b == null ? void 0 : b.current) == null ? void 0 : _a2.focus();
      },
      reset: () => F([])
    }), [
      o
    ]);
    const R = (t) => {
      ee.current && !ee.current.contains(t.target) && b.current && !b.current.contains(t.target) && (Z(false), b.current.blur());
    }, P = a.useCallback((t) => {
      const i = o.filter((g) => g.value !== t.value);
      F(i), l == null ? void 0 : l(i);
    }, [
      l,
      o
    ]), ge = a.useCallback((t) => {
      const i = b.current;
      i && ((t.key === "Delete" || t.key === "Backspace") && i.value === "" && o.length > 0 && (o[o.length - 1].fixed || P(o[o.length - 1])), t.key === "Escape" && i.blur());
    }, [
      P,
      o
    ]);
    a.useEffect(() => (O ? (document.addEventListener("mousedown", R), document.addEventListener("touchend", R)) : (document.removeEventListener("mousedown", R), document.removeEventListener("touchend", R)), () => {
      document.removeEventListener("mousedown", R), document.removeEventListener("touchend", R);
    }), [
      O
    ]), a.useEffect(() => {
      n && F(n);
    }, [
      n
    ]), a.useEffect(() => {
      if (!u || h) return;
      const t = V(u || [], k);
      JSON.stringify(t) !== JSON.stringify(z) && ne(t);
    }, [
      d,
      u,
      k,
      h,
      z
    ]), a.useEffect(() => {
      const t = () => {
        const g = w == null ? void 0 : w(M);
        ne(V(g || [], k));
      };
      (() => {
        !w || !O || (L && t(), M && t());
      })();
    }, [
      M,
      k,
      O,
      L
    ]), a.useEffect(() => {
      const t = async () => {
        re(true);
        const g = await (h == null ? void 0 : h(M));
        ne(V(g || [], k)), re(false);
      };
      (async () => {
        !h || !O || (L && await t(), M && await t());
      })();
    }, [
      M,
      k,
      O,
      L
    ]);
    const he = () => {
      if (!N || Re(z, [
        {
          value: C,
          label: C,
          avatar: ""
        }
      ]) || o.find((i) => i.value === C)) return;
      const t = e.jsx(q, {
        value: C,
        className: "cursor-pointer",
        onMouseDown: (i) => {
          i.preventDefault(), i.stopPropagation();
        },
        onSelect: (i) => {
          if (o.length >= E) {
            I == null ? void 0 : I(o.length);
            return;
          }
          te("");
          const g = [
            ...o,
            {
              value: i,
              label: i
            }
          ];
          F(g), l == null ? void 0 : l(g);
        },
        children: `Create "${C}"`
      });
      if (!h && C.length > 0 || h && M.length > 0 && !le) return t;
    }, xe = a.useCallback(() => {
      if (j) return h && !N && Object.keys(z).length === 0 ? e.jsx(q, {
        value: "-",
        disabled: true,
        children: j
      }) : e.jsx(oe, {
        children: j
      });
    }, [
      N,
      j,
      h,
      z
    ]), fe = a.useMemo(() => Fe(z, o), [
      z,
      o
    ]), ye = a.useCallback(() => {
      if (v == null ? void 0 : v.filter) return v.filter;
      if (N) return (t, i) => t.toLowerCase().includes(i.toLowerCase()) ? 1 : -1;
    }, [
      N,
      v == null ? void 0 : v.filter
    ]), be = () => {
      switch (f) {
        case "indigo":
          return "bg-indigo-9 text-indigo-1 hover:bg-indigo-10";
        case "cyan":
          return "bg-cyan-9 text-cyan-1 hover:bg-cyan-10";
        case "orange":
          return "bg-orange-9 text-orange-1 hover:bg-orange-10";
        case "crimson":
          return "bg-crimson-9 text-crimson-1 hover:bg-crimson-10";
        default:
          return "bg-gray-4 text-gray-12 hover:bg-gray-6 ";
      }
    }, Se = () => {
      switch (f) {
        case "indigo":
          return "bg-indigo-11 text-indigo-1";
        case "cyan":
          return "bg-cyan-11 text-cyan-1";
        case "orange":
          return "bg-orange-11 text-orange-1";
        case "crimson":
          return "bg-crimson-11 text-crimson-1";
        default:
          return "bg-gray-11 text-gray-1";
      }
    };
    return e.jsxs(Ce, {
      ref: ee,
      ...v,
      onKeyDown: (t) => {
        var _a2;
        ge(t), (_a2 = v == null ? void 0 : v.onKeyDown) == null ? void 0 : _a2.call(v, t);
      },
      className: T("h-auto overflow-visible bg-transparent", v == null ? void 0 : v.className),
      shouldFilter: (v == null ? void 0 : v.shouldFilter) !== void 0 ? v.shouldFilter : !h,
      filter: ye(),
      children: [
        e.jsx("div", {
          className: T("min-h-10 rounded-md border border-gray-6 text-base ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 md:text-sm", {
            "px-3 py-2": o.length !== 0,
            "cursor-text": !c && o.length !== 0
          }, ie),
          onClick: () => {
            var _a2;
            c || ((_a2 = b == null ? void 0 : b.current) == null ? void 0 : _a2.focus());
          },
          onKeyDown: (t) => {
            var _a2;
            t.key === "Enter" && !c && ((_a2 = b == null ? void 0 : b.current) == null ? void 0 : _a2.focus());
          },
          children: e.jsxs("div", {
            className: "relative flex flex-wrap gap-1",
            children: [
              o.map((t) => e.jsxs(ze, {
                className: T("group data-[disabled]:bg-muted-foreground data-[disabled]:text-muted data-[disabled]:hover:bg-muted-foreground", "data-[fixed]:bg-muted-foreground data-[fixed]:text-muted data-[fixed]:hover:bg-muted-foreground", ce, be()),
                "data-fixed": t.fixed,
                "data-disabled": c || void 0,
                children: [
                  t.avatar && e.jsx("img", {
                    src: t.avatar,
                    alt: t.label,
                    className: "h-7 w-7 rounded-full p-1"
                  }),
                  t.label,
                  e.jsx("button", {
                    type: "button",
                    className: T("ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2", (c || t.fixed) && "hidden"),
                    onKeyDown: (i) => {
                      i.key === "Enter" && P(t);
                    },
                    onMouseDown: (i) => {
                      i.preventDefault(), i.stopPropagation();
                    },
                    onClick: () => P(t),
                    children: e.jsx(se, {
                      className: "h-3 w-3 group-hover:text-foreground"
                    })
                  })
                ]
              }, t.value)),
              e.jsx(Te.Input, {
                ...D,
                ref: b,
                value: C,
                disabled: c,
                onValueChange: (t) => {
                  var _a2;
                  te(t), (_a2 = D == null ? void 0 : D.onValueChange) == null ? void 0 : _a2.call(D, t);
                },
                onBlur: (t) => {
                  var _a2;
                  me || Z(false), (_a2 = D == null ? void 0 : D.onBlur) == null ? void 0 : _a2.call(D, t);
                },
                onFocus: (t) => {
                  var _a2;
                  Z(true), (_a2 = D == null ? void 0 : D.onFocus) == null ? void 0 : _a2.call(D, t);
                },
                placeholder: B && o.length !== 0 ? "" : s,
                className: T("block w-full rounded-md border-gray-5 bg-transparent outline-none placeholder:text-muted-foreground", {
                  "w-full": B,
                  "px-3 py-2": o.length === 0,
                  "mt-1.5 ": o.length !== 0
                }, D == null ? void 0 : D.className)
              }),
              e.jsx("button", {
                type: "button",
                onClick: () => {
                  F(o.filter((t) => t.fixed)), l == null ? void 0 : l(o.filter((t) => t.fixed));
                },
                className: T("absolute right-0 grid h-6 w-6 place-content-center rounded-md bg-gray-12 text-gray-2", Se(), (ue || c || o.length < 1 || o.filter((t) => t.fixed).length === o.length) && "hidden"),
                "aria-label": "Clear all selected items",
                children: e.jsx(se, {
                  size: 20
                })
              })
            ]
          })
        }),
        e.jsx("div", {
          className: "relative",
          children: O && e.jsx(we, {
            className: "absolute top-1 z-10 w-full animate-in rounded-md border border-gray-6 bg-popover text-popover-foreground shadow-md outline-none",
            onMouseLeave: () => {
              ae(false);
            },
            onMouseEnter: () => {
              ae(true);
            },
            onMouseUp: () => {
              var _a2;
              (_a2 = b == null ? void 0 : b.current) == null ? void 0 : _a2.focus();
            },
            children: le ? e.jsx(e.Fragment, {
              children: A
            }) : e.jsxs(e.Fragment, {
              children: [
                xe(),
                he(),
                !de && e.jsx(q, {
                  value: "-",
                  className: "hidden"
                }),
                Object.entries(fe).map(([t, i]) => e.jsx(je, {
                  heading: t,
                  className: "h-full overflow-auto",
                  children: i.map((g) => e.jsxs(q, {
                    value: g.label,
                    disabled: g.disable,
                    onMouseDown: (W) => {
                      W.preventDefault(), W.stopPropagation();
                    },
                    onSelect: () => {
                      if (o.length >= E) {
                        I == null ? void 0 : I(o.length);
                        return;
                      }
                      te("");
                      const W = [
                        ...o,
                        g
                      ];
                      F(W), l == null ? void 0 : l(W);
                    },
                    className: T("m-1 cursor-pointer p-2", g.disable && "cursor-default "),
                    children: [
                      g.avatar && e.jsx("img", {
                        src: g.avatar,
                        alt: g.label,
                        className: "h-7 w-7 rounded-full p-1"
                      }),
                      g.label
                    ]
                  }, g.value))
                }, t))
              ]
            })
          })
        })
      ]
    });
  });
  x.displayName = "MultiSelect";
  x.__docgenInfo = {
    description: "",
    methods: [
      {
        name: "focus",
        docblock: null,
        modifiers: [],
        params: [],
        returns: null
      },
      {
        name: "reset",
        docblock: null,
        modifiers: [],
        params: [],
        returns: null
      }
    ],
    displayName: "MultiSelect",
    props: {
      value: {
        required: false,
        tsType: {
          name: "Array",
          elements: [
            {
              name: "Option"
            }
          ],
          raw: "Option[]"
        },
        description: ""
      },
      defaultOptions: {
        required: false,
        tsType: {
          name: "Array",
          elements: [
            {
              name: "Option"
            }
          ],
          raw: "Option[]"
        },
        description: "",
        defaultValue: {
          value: "[]",
          computed: false
        }
      },
      options: {
        required: false,
        tsType: {
          name: "Array",
          elements: [
            {
              name: "Option"
            }
          ],
          raw: "Option[]"
        },
        description: "manually controlled options"
      },
      placeholder: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      loadingIndicator: {
        required: false,
        tsType: {
          name: "ReactReactNode",
          raw: "React.ReactNode"
        },
        description: "Loading component."
      },
      emptyIndicator: {
        required: false,
        tsType: {
          name: "ReactReactNode",
          raw: "React.ReactNode"
        },
        description: "Empty component."
      },
      delay: {
        required: false,
        tsType: {
          name: "number"
        },
        description: "Debounce time for async search. Only work with `onSearch`."
      },
      triggerSearchOnFocus: {
        required: false,
        tsType: {
          name: "boolean"
        },
        description: "Only work with `onSearch` prop. Trigger search when `onFocus`.\nFor example, when user click on the input, it will trigger the search to get initial options.",
        defaultValue: {
          value: "false",
          computed: false
        }
      },
      onSearch: {
        required: false,
        tsType: {
          name: "signature",
          type: "function",
          raw: "(value: string) => Promise<Option[]>",
          signature: {
            arguments: [
              {
                type: {
                  name: "string"
                },
                name: "value"
              }
            ],
            return: {
              name: "Promise",
              elements: [
                {
                  name: "Array",
                  elements: [
                    {
                      name: "Option"
                    }
                  ],
                  raw: "Option[]"
                }
              ],
              raw: "Promise<Option[]>"
            }
          }
        },
        description: "async search"
      },
      onSearchSync: {
        required: false,
        tsType: {
          name: "signature",
          type: "function",
          raw: "(value: string) => Option[]",
          signature: {
            arguments: [
              {
                type: {
                  name: "string"
                },
                name: "value"
              }
            ],
            return: {
              name: "Array",
              elements: [
                {
                  name: "Option"
                }
              ],
              raw: "Option[]"
            }
          }
        },
        description: `sync search. This search will not showing loadingIndicator.
The rest props are the same as async search.
i.e.: creatable, groupBy, delay.`
      },
      onChange: {
        required: false,
        tsType: {
          name: "signature",
          type: "function",
          raw: "(options: Option[]) => void",
          signature: {
            arguments: [
              {
                type: {
                  name: "Array",
                  elements: [
                    {
                      name: "Option"
                    }
                  ],
                  raw: "Option[]"
                },
                name: "options"
              }
            ],
            return: {
              name: "void"
            }
          }
        },
        description: ""
      },
      maxSelected: {
        required: false,
        tsType: {
          name: "number"
        },
        description: "Limit the maximum number of selected options.",
        defaultValue: {
          value: "Number.MAX_SAFE_INTEGER",
          computed: true
        }
      },
      onMaxSelected: {
        required: false,
        tsType: {
          name: "signature",
          type: "function",
          raw: "(maxLimit: number) => void",
          signature: {
            arguments: [
              {
                type: {
                  name: "number"
                },
                name: "maxLimit"
              }
            ],
            return: {
              name: "void"
            }
          }
        },
        description: "When the number of selected options exceeds the limit, the onMaxSelected will be called."
      },
      hidePlaceholderWhenSelected: {
        required: false,
        tsType: {
          name: "boolean"
        },
        description: "Hide the placeholder when there are options selected."
      },
      disabled: {
        required: false,
        tsType: {
          name: "boolean"
        },
        description: ""
      },
      groupBy: {
        required: false,
        tsType: {
          name: "string"
        },
        description: "Group the options base on provided key."
      },
      className: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      badgeClassName: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      selectFirstItem: {
        required: false,
        tsType: {
          name: "boolean"
        },
        description: `First item selected is a default behavior by cmdk. That is why the default is true.
This is a workaround solution by add a dummy item.

@reference: https://github.com/pacocoursey/cmdk/issues/171`,
        defaultValue: {
          value: "true",
          computed: false
        }
      },
      creatable: {
        required: false,
        tsType: {
          name: "boolean"
        },
        description: "Allow user to create option when there is no option matched.",
        defaultValue: {
          value: "false",
          computed: false
        }
      },
      commandProps: {
        required: false,
        tsType: {
          name: "ReactComponentPropsWithoutRef",
          raw: "React.ComponentPropsWithoutRef<typeof Command>",
          elements: [
            {
              name: "Command"
            }
          ]
        },
        description: "Props of `Command`"
      },
      inputProps: {
        required: false,
        tsType: {
          name: "Omit",
          elements: [
            {
              name: "ReactComponentPropsWithoutRef",
              raw: "React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>",
              elements: [
                {
                  name: "CommandPrimitive.Input"
                }
              ]
            },
            {
              name: "union",
              raw: '"value" | "placeholder" | "disabled"',
              elements: [
                {
                  name: "literal",
                  value: '"value"'
                },
                {
                  name: "literal",
                  value: '"placeholder"'
                },
                {
                  name: "literal",
                  value: '"disabled"'
                }
              ]
            }
          ],
          raw: `Omit<
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>,
  "value" | "placeholder" | "disabled"
>`
        },
        description: "Props of `CommandInput`"
      },
      hideClearAllButton: {
        required: false,
        tsType: {
          name: "boolean"
        },
        description: "hide the clear all button.",
        defaultValue: {
          value: "false",
          computed: false
        }
      },
      defaultColor: {
        required: false,
        tsType: {
          name: "union",
          raw: '"gray" | "indigo" | "cyan" | "orange" | "crimson"',
          elements: [
            {
              name: "literal",
              value: '"gray"'
            },
            {
              name: "literal",
              value: '"indigo"'
            },
            {
              name: "literal",
              value: '"cyan"'
            },
            {
              name: "literal",
              value: '"orange"'
            },
            {
              name: "literal",
              value: '"crimson"'
            }
          ]
        },
        description: "",
        defaultValue: {
          value: '"crimson"',
          computed: false
        }
      }
    }
  };
  let p, Ae, Ie;
  Ue = {
    title: "Elements/MultiSelect",
    component: x,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (n) => e.jsx(ve, {
        children: e.jsx("div", {
          style: {
            padding: "20px",
            minWidth: "400px"
          },
          children: e.jsx(n, {})
        })
      })
    ],
    argTypes: {
      placeholder: {
        control: "text",
        description: "Placeholder text when no options are selected"
      },
      disabled: {
        control: "boolean",
        description: "Disable the component"
      },
      creatable: {
        control: "boolean",
        description: "Allow creating new options"
      },
      maxSelected: {
        control: "number",
        description: "Maximum number of options that can be selected"
      },
      hidePlaceholderWhenSelected: {
        control: "boolean",
        description: "Hide placeholder when options are selected"
      },
      hideClearAllButton: {
        control: "boolean",
        description: "Hide the clear all button"
      },
      defaultColor: {
        control: "select",
        options: [
          "gray",
          "indigo",
          "cyan",
          "orange",
          "crimson"
        ],
        description: "Default color theme for selected badges"
      }
    },
    args: {
      placeholder: "Select options...",
      disabled: false,
      creatable: false,
      maxSelected: void 0,
      hidePlaceholderWhenSelected: false,
      hideClearAllButton: false,
      defaultColor: "crimson"
    }
  };
  p = [
    {
      value: "frontend",
      label: "Frontend Development"
    },
    {
      value: "backend",
      label: "Backend Development"
    },
    {
      value: "design",
      label: "UI/UX Design"
    },
    {
      value: "marketing",
      label: "Digital Marketing"
    },
    {
      value: "devops",
      label: "DevOps Engineering"
    },
    {
      value: "mobile",
      label: "Mobile Development"
    }
  ];
  Ae = [
    {
      value: "john-doe",
      label: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
    },
    {
      value: "jane-smith",
      label: "Jane Smith",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
    },
    {
      value: "mike-johnson",
      label: "Mike Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face"
    },
    {
      value: "sarah-wilson",
      label: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face"
    }
  ];
  Ie = [
    {
      value: "frontend-react",
      label: "React Developer",
      department: "Engineering"
    },
    {
      value: "frontend-vue",
      label: "Vue Developer",
      department: "Engineering"
    },
    {
      value: "backend-node",
      label: "Node.js Developer",
      department: "Engineering"
    },
    {
      value: "designer-ui",
      label: "UI Designer",
      department: "Design"
    },
    {
      value: "designer-ux",
      label: "UX Designer",
      department: "Design"
    },
    {
      value: "marketing-digital",
      label: "Digital Marketer",
      department: "Marketing"
    },
    {
      value: "marketing-content",
      label: "Content Marketer",
      department: "Marketing"
    }
  ];
  G = {
    render: () => {
      const [n, l] = a.useState([]);
      return e.jsxs(m, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(x, {
            options: p,
            onChange: l,
            placeholder: "Select skills..."
          }),
          n.length > 0 && e.jsxs(S, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px"
            },
            children: [
              e.jsxs(r, {
                size: "2",
                weight: "medium",
                children: [
                  "Selected Skills (",
                  n.length,
                  "):"
                ]
              }),
              e.jsx(r, {
                size: "2",
                color: "gray",
                children: n.map((s) => s.label).join(", ")
              })
            ]
          })
        ]
      });
    }
  };
  H = {
    render: () => {
      const [n, l] = a.useState([
        p[0],
        p[2]
      ]);
      return e.jsxs(m, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(x, {
            options: p,
            value: n,
            onChange: l,
            placeholder: "Modify your selection..."
          }),
          e.jsxs(S, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px"
            },
            children: [
              e.jsx(r, {
                size: "2",
                weight: "medium",
                children: "Current Selection:"
              }),
              e.jsx(r, {
                size: "2",
                color: "gray",
                children: n.map((s) => s.label).join(", ")
              })
            ]
          })
        ]
      });
    }
  };
  _ = {
    render: () => {
      const [n, l] = a.useState([]);
      return e.jsxs(m, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(x, {
            options: Ae,
            onChange: l,
            placeholder: "Select team members..."
          }),
          n.length > 0 && e.jsxs(S, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px"
            },
            children: [
              e.jsxs(r, {
                size: "2",
                weight: "medium",
                children: [
                  "Team Members (",
                  n.length,
                  "):"
                ]
              }),
              e.jsx(r, {
                size: "2",
                color: "gray",
                children: n.map((s) => s.label).join(", ")
              })
            ]
          })
        ]
      });
    }
  };
  J = {
    render: () => {
      const [n, l] = a.useState([]);
      return e.jsxs(m, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(x, {
            options: Ie,
            onChange: l,
            groupBy: "department",
            placeholder: "Select roles by department..."
          }),
          n.length > 0 && e.jsxs(S, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px"
            },
            children: [
              e.jsx(r, {
                size: "2",
                weight: "medium",
                children: "Selected Roles:"
              }),
              e.jsx(r, {
                size: "2",
                color: "gray",
                children: n.map((s) => s.label).join(", ")
              })
            ]
          })
        ]
      });
    }
  };
  U = {
    render: () => {
      const [n, l] = a.useState([]);
      return e.jsxs(m, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(r, {
            size: "3",
            weight: "medium",
            children: "Type to create new options"
          }),
          e.jsx(x, {
            options: p,
            onChange: l,
            creatable: true,
            placeholder: "Select or create new skills..."
          }),
          n.length > 0 && e.jsxs(S, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px"
            },
            children: [
              e.jsxs(r, {
                size: "2",
                weight: "medium",
                children: [
                  "Skills (",
                  n.length,
                  "):"
                ]
              }),
              e.jsx(r, {
                size: "2",
                color: "gray",
                children: n.map((s) => s.label).join(", ")
              })
            ]
          })
        ]
      });
    }
  };
  K = {
    render: () => {
      const [n, l] = a.useState([]), s = 3;
      return e.jsxs(m, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsxs(r, {
            size: "3",
            weight: "medium",
            children: [
              "Maximum ",
              s,
              " selections allowed"
            ]
          }),
          e.jsx(x, {
            options: p,
            onChange: l,
            maxSelected: s,
            onMaxSelected: (d) => alert(`Maximum ${d} selections reached!`),
            placeholder: "Select up to 3 skills..."
          }),
          e.jsxs(S, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px"
            },
            children: [
              e.jsxs(r, {
                size: "2",
                weight: "medium",
                children: [
                  "Selected: ",
                  n.length,
                  " / ",
                  s
                ]
              }),
              e.jsx(r, {
                size: "2",
                color: "gray",
                children: n.map((d) => d.label).join(", ") || "None selected"
              })
            ]
          })
        ]
      });
    }
  };
  X = {
    render: () => {
      const [n, l] = a.useState([]), [s, d] = a.useState(false), u = async (f) => {
        d(true), await new Promise((h) => setTimeout(h, 1e3));
        const y = p.filter((h) => h.label.toLowerCase().includes(f.toLowerCase()));
        return d(false), y;
      };
      return e.jsxs(m, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(r, {
            size: "3",
            weight: "medium",
            children: "Search with 1 second delay"
          }),
          e.jsx(x, {
            onChange: l,
            onSearch: u,
            placeholder: "Type to search skills...",
            loadingIndicator: e.jsxs("div", {
              style: {
                padding: "20px",
                textAlign: "center"
              },
              children: [
                e.jsx(Oe, {
                  className: "animate-spin",
                  size: 20
                }),
                e.jsx(r, {
                  size: "2",
                  color: "gray",
                  style: {
                    marginTop: "8px"
                  },
                  children: "Searching..."
                })
              ]
            }),
            emptyIndicator: e.jsx(r, {
              size: "2",
              color: "gray",
              children: "No skills found"
            })
          }),
          n.length > 0 && e.jsxs(S, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px"
            },
            children: [
              e.jsxs(r, {
                size: "2",
                weight: "medium",
                children: [
                  "Search Results (",
                  n.length,
                  "):"
                ]
              }),
              e.jsx(r, {
                size: "2",
                color: "gray",
                children: n.map((f) => f.label).join(", ")
              })
            ]
          })
        ]
      });
    }
  };
  $ = {
    render: () => {
      const [n, l] = a.useState([
        p[0]
      ]), [s, d] = a.useState([
        p[1]
      ]), [u, f] = a.useState([
        p[2]
      ]), [y, h] = a.useState([
        p[3]
      ]), [w, A] = a.useState([
        p[4]
      ]);
      return e.jsxs(m, {
        direction: "column",
        gap: "6",
        align: "center",
        children: [
          e.jsx(r, {
            size: "4",
            weight: "bold",
            children: "Color Theme Variations"
          }),
          e.jsxs(m, {
            direction: "column",
            gap: "4",
            style: {
              width: "100%"
            },
            children: [
              e.jsxs(m, {
                direction: "column",
                gap: "2",
                children: [
                  e.jsx(r, {
                    size: "2",
                    weight: "medium",
                    children: "Gray Theme:"
                  }),
                  e.jsx(x, {
                    options: p,
                    value: n,
                    onChange: l,
                    defaultColor: "gray",
                    placeholder: "Gray theme..."
                  })
                ]
              }),
              e.jsxs(m, {
                direction: "column",
                gap: "2",
                children: [
                  e.jsx(r, {
                    size: "2",
                    weight: "medium",
                    children: "Indigo Theme:"
                  }),
                  e.jsx(x, {
                    options: p,
                    value: s,
                    onChange: d,
                    defaultColor: "indigo",
                    placeholder: "Indigo theme..."
                  })
                ]
              }),
              e.jsxs(m, {
                direction: "column",
                gap: "2",
                children: [
                  e.jsx(r, {
                    size: "2",
                    weight: "medium",
                    children: "Cyan Theme:"
                  }),
                  e.jsx(x, {
                    options: p,
                    value: u,
                    onChange: f,
                    defaultColor: "cyan",
                    placeholder: "Cyan theme..."
                  })
                ]
              }),
              e.jsxs(m, {
                direction: "column",
                gap: "2",
                children: [
                  e.jsx(r, {
                    size: "2",
                    weight: "medium",
                    children: "Orange Theme:"
                  }),
                  e.jsx(x, {
                    options: p,
                    value: y,
                    onChange: h,
                    defaultColor: "orange",
                    placeholder: "Orange theme..."
                  })
                ]
              }),
              e.jsxs(m, {
                direction: "column",
                gap: "2",
                children: [
                  e.jsx(r, {
                    size: "2",
                    weight: "medium",
                    children: "Crimson Theme:"
                  }),
                  e.jsx(x, {
                    options: p,
                    value: w,
                    onChange: A,
                    defaultColor: "crimson",
                    placeholder: "Crimson theme..."
                  })
                ]
              })
            ]
          })
        ]
      });
    }
  };
  Q = {
    render: () => {
      const [n, l] = a.useState([
        p[0],
        p[1]
      ]);
      return e.jsxs(m, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(r, {
            size: "3",
            weight: "medium",
            children: "Disabled MultiSelect"
          }),
          e.jsx(x, {
            options: p,
            value: n,
            onChange: l,
            disabled: true,
            placeholder: "This is disabled..."
          }),
          e.jsx(r, {
            size: "2",
            color: "gray",
            style: {
              textAlign: "center"
            },
            children: "The component is disabled but shows the selected values"
          })
        ]
      });
    }
  };
  Y = {
    render: () => {
      const [n, l] = a.useState([]), [s, d] = a.useState(false), [u, f] = a.useState(false), [y, h] = a.useState(false), [w, A] = a.useState(false), [j, E] = a.useState(void 0), [I, B] = a.useState("crimson");
      return e.jsxs(m, {
        direction: "column",
        gap: "6",
        align: "center",
        style: {
          maxWidth: "500px"
        },
        children: [
          e.jsx(r, {
            size: "4",
            weight: "bold",
            children: "Interactive MultiSelect"
          }),
          e.jsxs(S, {
            style: {
              padding: "16px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "8px",
              width: "100%"
            },
            children: [
              e.jsx(r, {
                size: "3",
                weight: "medium",
                style: {
                  marginBottom: "12px",
                  display: "block"
                },
                children: "Configuration"
              }),
              e.jsxs(m, {
                direction: "column",
                gap: "3",
                children: [
                  e.jsxs(m, {
                    gap: "4",
                    wrap: "wrap",
                    children: [
                      e.jsxs("label", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        },
                        children: [
                          e.jsx("input", {
                            type: "checkbox",
                            checked: s,
                            onChange: (c) => d(c.target.checked)
                          }),
                          e.jsx(r, {
                            size: "2",
                            children: "Disabled"
                          })
                        ]
                      }),
                      e.jsxs("label", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        },
                        children: [
                          e.jsx("input", {
                            type: "checkbox",
                            checked: u,
                            onChange: (c) => f(c.target.checked)
                          }),
                          e.jsx(r, {
                            size: "2",
                            children: "Creatable"
                          })
                        ]
                      }),
                      e.jsxs("label", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        },
                        children: [
                          e.jsx("input", {
                            type: "checkbox",
                            checked: y,
                            onChange: (c) => h(c.target.checked)
                          }),
                          e.jsx(r, {
                            size: "2",
                            children: "Hide Placeholder"
                          })
                        ]
                      }),
                      e.jsxs("label", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        },
                        children: [
                          e.jsx("input", {
                            type: "checkbox",
                            checked: w,
                            onChange: (c) => A(c.target.checked)
                          }),
                          e.jsx(r, {
                            size: "2",
                            children: "Hide Clear All"
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsxs(m, {
                    gap: "4",
                    align: "center",
                    children: [
                      e.jsx(r, {
                        size: "2",
                        children: "Max Selected:"
                      }),
                      e.jsx("input", {
                        type: "number",
                        value: j || "",
                        onChange: (c) => E(c.target.value ? parseInt(c.target.value) : void 0),
                        style: {
                          padding: "4px 8px",
                          borderRadius: "4px",
                          border: "1px solid var(--gray-6)"
                        },
                        placeholder: "No limit"
                      })
                    ]
                  }),
                  e.jsxs(m, {
                    gap: "2",
                    align: "center",
                    children: [
                      e.jsx(r, {
                        size: "2",
                        children: "Color Theme:"
                      }),
                      e.jsxs("select", {
                        value: I,
                        onChange: (c) => B(c.target.value),
                        style: {
                          padding: "4px 8px",
                          borderRadius: "4px",
                          border: "1px solid var(--gray-6)"
                        },
                        children: [
                          e.jsx("option", {
                            value: "gray",
                            children: "Gray"
                          }),
                          e.jsx("option", {
                            value: "indigo",
                            children: "Indigo"
                          }),
                          e.jsx("option", {
                            value: "cyan",
                            children: "Cyan"
                          }),
                          e.jsx("option", {
                            value: "orange",
                            children: "Orange"
                          }),
                          e.jsx("option", {
                            value: "crimson",
                            children: "Crimson"
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          e.jsx(x, {
            options: p,
            value: n,
            onChange: l,
            disabled: s,
            creatable: u,
            hidePlaceholderWhenSelected: y,
            hideClearAllButton: w,
            maxSelected: j,
            defaultColor: I,
            onMaxSelected: (c) => alert(`Maximum ${c} selections reached!`),
            placeholder: "Configure and test the component..."
          }),
          e.jsxs(S, {
            style: {
              width: "100%",
              padding: "16px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "8px",
              textAlign: "center"
            },
            children: [
              e.jsxs(r, {
                size: "2",
                weight: "medium",
                children: [
                  "Selected Options (",
                  n.length,
                  "):"
                ]
              }),
              e.jsx(r, {
                size: "2",
                color: "gray",
                style: {
                  marginTop: "4px",
                  display: "block"
                },
                children: n.length > 0 ? n.map((c) => c.label).join(", ") : "None selected"
              })
            ]
          })
        ]
      });
    }
  };
  G.parameters = {
    ...G.parameters,
    docs: {
      ...(_a = G.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = useState<Option[]>([]);
    return <Flex direction="column" gap="4" align="center">
        <MultiSelect options={sampleOptions} onChange={setSelected} placeholder="Select skills..." />

        {selected.length > 0 && <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "300px"
      }}>
            <Text size="2" weight="medium">
              Selected Skills ({selected.length}):
            </Text>
            <Text size="2" color="gray">
              {selected.map(s => s.label).join(", ")}
            </Text>
          </Box>}
      </Flex>;
  }
}`,
        ...(_c = (_b = G.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  H.parameters = {
    ...H.parameters,
    docs: {
      ...(_d = H.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = useState<Option[]>([sampleOptions[0], sampleOptions[2]]);
    return <Flex direction="column" gap="4" align="center">
        <MultiSelect options={sampleOptions} value={selected} onChange={setSelected} placeholder="Modify your selection..." />

        <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "300px"
      }}>
          <Text size="2" weight="medium">
            Current Selection:
          </Text>
          <Text size="2" color="gray">
            {selected.map(s => s.label).join(", ")}
          </Text>
        </Box>
      </Flex>;
  }
}`,
        ...(_f = (_e = H.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  _.parameters = {
    ..._.parameters,
    docs: {
      ...(_g = _.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = useState<Option[]>([]);
    return <Flex direction="column" gap="4" align="center">
        <MultiSelect options={teamOptions} onChange={setSelected} placeholder="Select team members..." />

        {selected.length > 0 && <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "300px"
      }}>
            <Text size="2" weight="medium">
              Team Members ({selected.length}):
            </Text>
            <Text size="2" color="gray">
              {selected.map(s => s.label).join(", ")}
            </Text>
          </Box>}
      </Flex>;
  }
}`,
        ...(_i = (_h = _.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  J.parameters = {
    ...J.parameters,
    docs: {
      ...(_j = J.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = useState<Option[]>([]);
    return <Flex direction="column" gap="4" align="center">
        <MultiSelect options={groupedOptions} onChange={setSelected} groupBy="department" placeholder="Select roles by department..." />

        {selected.length > 0 && <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "300px"
      }}>
            <Text size="2" weight="medium">
              Selected Roles:
            </Text>
            <Text size="2" color="gray">
              {selected.map(s => s.label).join(", ")}
            </Text>
          </Box>}
      </Flex>;
  }
}`,
        ...(_l = (_k = J.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  U.parameters = {
    ...U.parameters,
    docs: {
      ...(_m = U.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = useState<Option[]>([]);
    return <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Type to create new options
        </Text>

        <MultiSelect options={sampleOptions} onChange={setSelected} creatable={true} placeholder="Select or create new skills..." />

        {selected.length > 0 && <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "300px"
      }}>
            <Text size="2" weight="medium">
              Skills ({selected.length}):
            </Text>
            <Text size="2" color="gray">
              {selected.map(s => s.label).join(", ")}
            </Text>
          </Box>}
      </Flex>;
  }
}`,
        ...(_o = (_n = U.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  K.parameters = {
    ...K.parameters,
    docs: {
      ...(_p = K.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = useState<Option[]>([]);
    const maxSelected = 3;
    return <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Maximum {maxSelected} selections allowed
        </Text>

        <MultiSelect options={sampleOptions} onChange={setSelected} maxSelected={maxSelected} onMaxSelected={max => alert(\`Maximum \${max} selections reached!\`)} placeholder="Select up to 3 skills..." />

        <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "300px"
      }}>
          <Text size="2" weight="medium">
            Selected: {selected.length} / {maxSelected}
          </Text>
          <Text size="2" color="gray">
            {selected.map(s => s.label).join(", ") || "None selected"}
          </Text>
        </Box>
      </Flex>;
  }
}`,
        ...(_r = (_q = K.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  X.parameters = {
    ...X.parameters,
    docs: {
      ...(_s = X.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = useState<Option[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const handleAsyncSearch = async (searchTerm: string): Promise<Option[]> => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      const filteredOptions = sampleOptions.filter(option => option.label.toLowerCase().includes(searchTerm.toLowerCase()));
      setIsLoading(false);
      return filteredOptions;
    };
    return <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Search with 1 second delay
        </Text>

        <MultiSelect onChange={setSelected} onSearch={handleAsyncSearch} placeholder="Type to search skills..." loadingIndicator={<div style={{
        padding: "20px",
        textAlign: "center"
      }}>
              <Loader2 className="animate-spin" size={20} />
              <Text size="2" color="gray" style={{
          marginTop: "8px"
        }}>
                Searching...
              </Text>
            </div>} emptyIndicator={<Text size="2" color="gray">
              No skills found
            </Text>} />

        {selected.length > 0 && <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "300px"
      }}>
            <Text size="2" weight="medium">
              Search Results ({selected.length}):
            </Text>
            <Text size="2" color="gray">
              {selected.map(s => s.label).join(", ")}
            </Text>
          </Box>}
      </Flex>;
  }
}`,
        ...(_u = (_t = X.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  $.parameters = {
    ...$.parameters,
    docs: {
      ...(_v = $.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: () => {
    const [graySelected, setGraySelected] = useState<Option[]>([sampleOptions[0]]);
    const [indigoSelected, setIndigoSelected] = useState<Option[]>([sampleOptions[1]]);
    const [cyanSelected, setCyanSelected] = useState<Option[]>([sampleOptions[2]]);
    const [orangeSelected, setOrangeSelected] = useState<Option[]>([sampleOptions[3]]);
    const [crimsonSelected, setCrimsonSelected] = useState<Option[]>([sampleOptions[4]]);
    return <Flex direction="column" gap="6" align="center">
        <Text size="4" weight="bold">
          Color Theme Variations
        </Text>

        <Flex direction="column" gap="4" style={{
        width: "100%"
      }}>
          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">Gray Theme:</Text>
            <MultiSelect options={sampleOptions} value={graySelected} onChange={setGraySelected} defaultColor="gray" placeholder="Gray theme..." />
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">Indigo Theme:</Text>
            <MultiSelect options={sampleOptions} value={indigoSelected} onChange={setIndigoSelected} defaultColor="indigo" placeholder="Indigo theme..." />
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">Cyan Theme:</Text>
            <MultiSelect options={sampleOptions} value={cyanSelected} onChange={setCyanSelected} defaultColor="cyan" placeholder="Cyan theme..." />
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">Orange Theme:</Text>
            <MultiSelect options={sampleOptions} value={orangeSelected} onChange={setOrangeSelected} defaultColor="orange" placeholder="Orange theme..." />
          </Flex>

          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">Crimson Theme:</Text>
            <MultiSelect options={sampleOptions} value={crimsonSelected} onChange={setCrimsonSelected} defaultColor="crimson" placeholder="Crimson theme..." />
          </Flex>
        </Flex>
      </Flex>;
  }
}`,
        ...(_x = (_w = $.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  Q.parameters = {
    ...Q.parameters,
    docs: {
      ...(_y = Q.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = useState<Option[]>([sampleOptions[0], sampleOptions[1]]);
    return <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Disabled MultiSelect
        </Text>

        <MultiSelect options={sampleOptions} value={selected} onChange={setSelected} disabled={true} placeholder="This is disabled..." />

        <Text size="2" color="gray" style={{
        textAlign: "center"
      }}>
          The component is disabled but shows the selected values
        </Text>
      </Flex>;
  }
}`,
        ...(_A = (_z = Q.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  Y.parameters = {
    ...Y.parameters,
    docs: {
      ...(_B = Y.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = useState<Option[]>([]);
    const [disabled, setDisabled] = useState(false);
    const [creatable, setCreatable] = useState(false);
    const [hidePlaceholder, setHidePlaceholder] = useState(false);
    const [hideClearAll, setHideClearAll] = useState(false);
    const [maxSelected, setMaxSelected] = useState<number | undefined>(undefined);
    const [colorTheme, setColorTheme] = useState<"gray" | "indigo" | "cyan" | "orange" | "crimson">("crimson");
    return <Flex direction="column" gap="6" align="center" style={{
      maxWidth: "500px"
    }}>
        <Text size="4" weight="bold">
          Interactive MultiSelect
        </Text>

        {/* Controls */}
        <Box style={{
        padding: "16px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px",
        width: "100%"
      }}>
          <Text size="3" weight="medium" style={{
          marginBottom: "12px",
          display: "block"
        }}>
            Configuration
          </Text>

          <Flex direction="column" gap="3">
            <Flex gap="4" wrap="wrap">
              <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
                <input type="checkbox" checked={disabled} onChange={e => setDisabled(e.target.checked)} />
                <Text size="2">Disabled</Text>
              </label>

              <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
                <input type="checkbox" checked={creatable} onChange={e => setCreatable(e.target.checked)} />
                <Text size="2">Creatable</Text>
              </label>

              <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
                <input type="checkbox" checked={hidePlaceholder} onChange={e => setHidePlaceholder(e.target.checked)} />
                <Text size="2">Hide Placeholder</Text>
              </label>

              <label style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
                <input type="checkbox" checked={hideClearAll} onChange={e => setHideClearAll(e.target.checked)} />
                <Text size="2">Hide Clear All</Text>
              </label>
            </Flex>

            <Flex gap="4" align="center">
              <Text size="2">Max Selected:</Text>
              <input type="number" value={maxSelected || ""} onChange={e => setMaxSelected(e.target.value ? parseInt(e.target.value) : undefined)} style={{
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid var(--gray-6)"
            }} placeholder="No limit" />
            </Flex>

            <Flex gap="2" align="center">
              <Text size="2">Color Theme:</Text>
              <select value={colorTheme} onChange={e => setColorTheme(e.target.value as any)} style={{
              padding: "4px 8px",
              borderRadius: "4px",
              border: "1px solid var(--gray-6)"
            }}>
                <option value="gray">Gray</option>
                <option value="indigo">Indigo</option>
                <option value="cyan">Cyan</option>
                <option value="orange">Orange</option>
                <option value="crimson">Crimson</option>
              </select>
            </Flex>
          </Flex>
        </Box>

        {/* MultiSelect */}
        <MultiSelect options={sampleOptions} value={selected} onChange={setSelected} disabled={disabled} creatable={creatable} hidePlaceholderWhenSelected={hidePlaceholder} hideClearAllButton={hideClearAll} maxSelected={maxSelected} defaultColor={colorTheme} onMaxSelected={max => alert(\`Maximum \${max} selections reached!\`)} placeholder="Configure and test the component..." />

        {/* Results */}
        <Box style={{
        width: "100%",
        padding: "16px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px",
        textAlign: "center"
      }}>
          <Text size="2" weight="medium">
            Selected Options ({selected.length}):
          </Text>
          <Text size="2" color="gray" style={{
          marginTop: "4px",
          display: "block"
        }}>
            {selected.length > 0 ? selected.map(s => s.label).join(", ") : "None selected"}
          </Text>
        </Box>
      </Flex>;
  }
}`,
        ...(_D = (_C = Y.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  Ke = [
    "Default",
    "WithDefaultSelection",
    "WithAvatars",
    "WithGrouping",
    "CreatableOptions",
    "WithMaxSelection",
    "WithAsyncSearch",
    "ColorThemes",
    "DisabledState",
    "InteractivePlayground"
  ];
});
export {
  $ as ColorThemes,
  U as CreatableOptions,
  G as Default,
  Q as DisabledState,
  Y as InteractivePlayground,
  X as WithAsyncSearch,
  _ as WithAvatars,
  H as WithDefaultSelection,
  J as WithGrouping,
  K as WithMaxSelection,
  Ke as __namedExportsOrder,
  __tla,
  Ue as default
};
