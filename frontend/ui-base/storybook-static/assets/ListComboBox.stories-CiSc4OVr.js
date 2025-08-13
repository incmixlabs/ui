import { r as a, j as e, a as l, F as r, T as Z, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { A as ee, __tla as __tla_1 } from "./avatar-DxZO6dds.js";
import { P as ne, C as te, i as le, __tla as __tla_2 } from "./icon-ClnzJwXp.js";
import { c as j } from "./utils-CBfrqCZ4.js";
import { C as ae, __tla as __tla_3 } from "./color-picker-VWh8MS13.js";
import { P as W, a as D, b as H, __tla as __tla_4 } from "./popover-DV0bW1sX.js";
import { I as re, __tla as __tla_5 } from "./icon-button-DBeYp-S7.js";
import { C as se, a as oe, b as ie, c as ce, d as U, e as R, __tla as __tla_6 } from "./command-Dq5lJyfT.js";
import { B as de, __tla as __tla_7 } from "./badge-GocNDIsR.js";
import { I as ue, __tla as __tla_8 } from "./input-BGZ7lJci.js";
import { B as T, __tla as __tla_9 } from "./button-BF2Wetgg.js";
import { B as d, __tla as __tla_10 } from "./box-Dr3vL6g-.js";
import { C as E, __tla as __tla_11 } from "./checkbox-B4on_Ni2.js";
import "./preload-helper-D9Z9MdNV.js";
import "./types-sXqsNS8j.js";
import { __tla as __tla_12 } from "./user-DF4nMnH4.js";
import { __tla as __tla_13 } from "./createLucideIcon-BUkpxZyj.js";
import { __tla as __tla_14 } from "./chevron-down-2X_Paxnn.js";
import { __tla as __tla_15 } from "./chevron-right-tttQlfk_.js";
import { __tla as __tla_16 } from "./x-C94K9CrB.js";
import { __tla as __tla_17 } from "./trash-BVyHiUQV.js";
import { __tla as __tla_18 } from "./trash-2-B7j0iALt.js";
import { __tla as __tla_19 } from "./index-ChItmDsK.js";
import { __tla as __tla_20 } from "./index-CEOg2jVB.js";
import { __tla as __tla_21 } from "./index-DfrOcl7X.js";
import { __tla as __tla_22 } from "./require-react-element-D0otgQnF.js";
import { __tla as __tla_23 } from "./base-button-BHQkXpSv.js";
import { __tla as __tla_24 } from "./index-BpKby9Va.js";
import { __tla as __tla_25 } from "./index-KgX6eUjc.js";
import { __tla as __tla_26 } from "./icons-DMb5RjWB.js";
let A, S, V, O, I, N, B, F, z, Ue, He;
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
  })(),
  (() => {
    try {
      return __tla_10;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_11;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_12;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_13;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_14;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_15;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_16;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_17;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_18;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_19;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_20;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_21;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_22;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_23;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_24;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_25;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_26;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A;
  const b = ({ onValueChange: n, defaultValue: s, placeholder: t = "Select options", title: i, popoverClass: y, addNewLabel: f = false, labelColor: u, setLabelColor: v, isLabelFormOpen: p, setIsLabelFormOpen: h, btnClassName: q }) => {
    const [g, c] = a.useState(s ?? []), k = a.useRef(null), [$, w] = a.useState(false), [M, P] = a.useState(""), J = (o) => {
      if (o.key === "Enter") w(true);
      else if (o.key === "Backspace" && !o.currentTarget.value) {
        const m = [
          ...g
        ];
        m.pop(), c(m), n == null ? void 0 : n(m);
      }
    }, K = (o) => {
      const m = g.map((x) => x.value === o ? {
        ...x,
        checked: !x.checked
      } : x);
      c(m), n == null ? void 0 : n(m);
    }, Y = () => {
      c([]), n == null ? void 0 : n([]);
    }, G = (o) => {
      v && v(o.name);
    }, Q = (o) => {
      var _a2;
      o.preventDefault();
      const m = (_a2 = k.current) == null ? void 0 : _a2.value.trim();
      if (!m) {
        P("Please enter a label name");
        return;
      }
      if (g.some((X) => {
        var _a3;
        return ((_a3 = X.label) == null ? void 0 : _a3.toLowerCase()) === m.toLowerCase();
      })) {
        P("A label with this name already exists");
        return;
      }
      const L = {
        value: m.toLowerCase().replace(/\s+/g, "-"),
        label: m,
        color: u || "blue",
        checked: true
      };
      c([
        ...g,
        L
      ]), n == null ? void 0 : n([
        ...g,
        L
      ]), k.current && (k.current.value = ""), P(""), h == null ? void 0 : h(false);
    };
    return e.jsxs(W, {
      open: $,
      onOpenChange: w,
      children: [
        e.jsx(D, {
          children: e.jsxs(re, {
            color: "gray",
            "aria-label": "Open options menu",
            className: j("flex h-8 w-8 items-center justify-center rounded-full", q),
            children: [
              e.jsx(ne, {
                "aria-hidden": "true"
              }),
              e.jsx(l, {
                className: "sr-only",
                children: "Add new item"
              })
            ]
          })
        }),
        e.jsxs(H, {
          className: j("z-[88] space-y-2", y),
          align: "start",
          onEscapeKeyDown: () => w(false),
          width: "280px",
          children: [
            i && e.jsx("h1", {
              className: "font-medium",
              children: i
            }),
            e.jsxs(se, {
              className: "bg-transparent",
              children: [
                e.jsx(oe, {
                  placeholder: t,
                  onKeyDown: J,
                  className: "border-0 focus:border-0 focus:outline-none"
                }),
                e.jsxs(ie, {
                  children: [
                    e.jsx(ce, {
                      children: "No results found."
                    }),
                    e.jsx(U, {
                      children: g.map((o) => {
                        var _a2;
                        const m = (_a2 = g.find((L) => L.checked === o.checked)) == null ? void 0 : _a2.checked, x = o.disable;
                        return e.jsxs(R, {
                          onSelect: () => !x && K(o.value),
                          className: j("cursor-pointer justify-between rounded-md", x && "cursor-not-allowed opacity-50 "),
                          children: [
                            e.jsxs(r, {
                              align: "center",
                              gap: "2",
                              children: [
                                o.avatar && e.jsx(ee, {
                                  src: o.avatar,
                                  className: "h-8 w-8"
                                }),
                                e.jsx(de, {
                                  color: typeof o.color == "string" ? o.color : "blue",
                                  variant: "solid",
                                  className: "px-3 py-1.5",
                                  children: o.label
                                })
                              ]
                            }),
                            e.jsx(r, {
                              justify: "center",
                              align: "center",
                              className: j("ml-2 h-5 w-5 rounded-sm border border-secondary", m ? "bg-secondary text-primary-foreground" : "opacity-50 [&_svg]:invisible"),
                              children: !x && e.jsx(te, {
                                className: `${le} text-white`
                              })
                            })
                          ]
                        }, o.value);
                      })
                    }),
                    e.jsx(U, {
                      children: f ? e.jsx(e.Fragment, {
                        children: p ? e.jsxs("div", {
                          className: "p-2",
                          children: [
                            " ",
                            e.jsx(ue, {
                              name: "labelName",
                              type: "text",
                              ref: k,
                              placeholder: "Enter label name",
                              className: "mb-2 w-full rounded-md border border-gray-5 bg-gray-1 px-3 py-2"
                            }),
                            M && e.jsx("p", {
                              className: "mb-2 text-red-600 text-sm",
                              children: M
                            }),
                            e.jsxs(r, {
                              justify: "between",
                              children: [
                                e.jsxs(W, {
                                  children: [
                                    e.jsx(D, {
                                      children: e.jsx(T, {
                                        variant: "solid",
                                        className: "color-swatch h-7 w-8 cursor-pointer rounded-sm border border-gray-12",
                                        color: u || "blue"
                                      })
                                    }),
                                    e.jsx(H, {
                                      alignOffset: -75,
                                      width: "190px",
                                      className: "z-[888] overflow-hidden bg-white p-3",
                                      children: e.jsx(ae, {
                                        colorType: "base",
                                        onColorSelect: G
                                      })
                                    })
                                  ]
                                }),
                                e.jsxs(r, {
                                  gap: "2",
                                  children: [
                                    e.jsx(T, {
                                      type: "button",
                                      color: "blue",
                                      variant: "solid",
                                      onClick: Q,
                                      className: "h-8 rounded-md px-3",
                                      children: "Save"
                                    }),
                                    e.jsx(T, {
                                      type: "button",
                                      color: "red",
                                      variant: "solid",
                                      onClick: () => h == null ? void 0 : h(false),
                                      children: "\u2715"
                                    })
                                  ]
                                })
                              ]
                            })
                          ]
                        }) : e.jsx(T, {
                          onClick: () => h == null ? void 0 : h(true),
                          className: "h-10 w-full rounded-md bg-blue-500 px-4 text-white",
                          children: "Add new label"
                        })
                      }) : e.jsx(e.Fragment, {
                        children: e.jsxs(r, {
                          justify: "between",
                          align: "center",
                          className: "font-medium",
                          children: [
                            g.length > 0 && e.jsx(R, {
                              onSelect: Y,
                              className: "h-10 flex-1 cursor-pointer justify-center ",
                              children: "Clear"
                            }),
                            e.jsx(R, {
                              onSelect: () => w(false),
                              className: "h-10 max-w-full flex-1 cursor-pointer justify-center ",
                              children: "Close"
                            })
                          ]
                        })
                      })
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  };
  b.displayName = "ListComboBox";
  b.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "ListComboBox",
    props: {
      options: {
        required: true,
        tsType: {
          name: "Array",
          elements: [
            {
              name: "signature",
              type: "object",
              raw: `{
  /** The text to display for the option. */
  label: string
  /** The unique value associated with the option. */
  value: string
  /** Optional icon component to display alongside the option. */
  icon?: React.ComponentType<{ className?: string }>
  avatar?: string
  color?: ExtendedColorType | string
  disable?: boolean
  checked?: boolean
}`,
              signature: {
                properties: [
                  {
                    key: "label",
                    value: {
                      name: "string",
                      required: true
                    },
                    description: "The text to display for the option."
                  },
                  {
                    key: "value",
                    value: {
                      name: "string",
                      required: true
                    },
                    description: "The unique value associated with the option."
                  },
                  {
                    key: "icon",
                    value: {
                      name: "ReactComponentType",
                      raw: "React.ComponentType<{ className?: string }>",
                      elements: [
                        {
                          name: "signature",
                          type: "object",
                          raw: "{ className?: string }",
                          signature: {
                            properties: [
                              {
                                key: "className",
                                value: {
                                  name: "string",
                                  required: false
                                }
                              }
                            ]
                          }
                        }
                      ],
                      required: false
                    },
                    description: "Optional icon component to display alongside the option."
                  },
                  {
                    key: "avatar",
                    value: {
                      name: "string",
                      required: false
                    }
                  },
                  {
                    key: "color",
                    value: {
                      name: "union",
                      raw: "ExtendedColorType | string",
                      elements: [
                        {
                          name: "badgePropDefs.color.default"
                        },
                        {
                          name: "string"
                        }
                      ],
                      required: false
                    }
                  },
                  {
                    key: "disable",
                    value: {
                      name: "boolean",
                      required: false
                    }
                  },
                  {
                    key: "checked",
                    value: {
                      name: "boolean",
                      required: false
                    }
                  }
                ]
              }
            }
          ],
          raw: `{
  /** The text to display for the option. */
  label: string
  /** The unique value associated with the option. */
  value: string
  /** Optional icon component to display alongside the option. */
  icon?: React.ComponentType<{ className?: string }>
  avatar?: string
  color?: ExtendedColorType | string
  disable?: boolean
  checked?: boolean
}[]`
        },
        description: `An array of option objects to be displayed in the multi-select component.
Each option object has a label, value, and an optional icon.`
      },
      onValueChange: {
        required: false,
        tsType: {
          name: "signature",
          type: "function",
          raw: `(
  value: {
    label: string | undefined
    value: string
    avatar?: string
    color?: ExtendedColorType | string
    disable?: boolean
    checked?: boolean
  }[]
) => void`,
          signature: {
            arguments: [
              {
                type: {
                  name: "Array",
                  elements: [
                    {
                      name: "signature",
                      type: "object",
                      raw: `{
  label: string | undefined
  value: string
  avatar?: string
  color?: ExtendedColorType | string
  disable?: boolean
  checked?: boolean
}`,
                      signature: {
                        properties: [
                          {
                            key: "label",
                            value: {
                              name: "union",
                              raw: "string | undefined",
                              elements: [
                                {
                                  name: "string"
                                },
                                {
                                  name: "undefined"
                                }
                              ],
                              required: true
                            }
                          },
                          {
                            key: "value",
                            value: {
                              name: "string",
                              required: true
                            }
                          },
                          {
                            key: "avatar",
                            value: {
                              name: "string",
                              required: false
                            }
                          },
                          {
                            key: "color",
                            value: {
                              name: "union",
                              raw: "ExtendedColorType | string",
                              elements: [
                                {
                                  name: "badgePropDefs.color.default"
                                },
                                {
                                  name: "string"
                                }
                              ],
                              required: false
                            }
                          },
                          {
                            key: "disable",
                            value: {
                              name: "boolean",
                              required: false
                            }
                          },
                          {
                            key: "checked",
                            value: {
                              name: "boolean",
                              required: false
                            }
                          }
                        ]
                      }
                    }
                  ],
                  raw: `{
  label: string | undefined
  value: string
  avatar?: string
  color?: ExtendedColorType | string
  disable?: boolean
  checked?: boolean
}[]`
                },
                name: "value"
              }
            ],
            return: {
              name: "void"
            }
          }
        },
        description: `Callback function triggered when the selected values change.
Receives an array of the new selected values.`
      },
      defaultValue: {
        required: false,
        tsType: {
          name: "Array",
          elements: [
            {
              name: "signature",
              type: "object",
              raw: `{
  /** The text to display for the option. */
  label: string | undefined
  /** The unique value associated with the option. */
  value: string
  avatar?: string
  color?: ExtendedColorType | string
  disable?: boolean
  checked?: boolean
}`,
              signature: {
                properties: [
                  {
                    key: "label",
                    value: {
                      name: "union",
                      raw: "string | undefined",
                      elements: [
                        {
                          name: "string"
                        },
                        {
                          name: "undefined"
                        }
                      ],
                      required: true
                    },
                    description: "The text to display for the option."
                  },
                  {
                    key: "value",
                    value: {
                      name: "string",
                      required: true
                    },
                    description: "The unique value associated with the option."
                  },
                  {
                    key: "avatar",
                    value: {
                      name: "string",
                      required: false
                    }
                  },
                  {
                    key: "color",
                    value: {
                      name: "union",
                      raw: "ExtendedColorType | string",
                      elements: [
                        {
                          name: "badgePropDefs.color.default"
                        },
                        {
                          name: "string"
                        }
                      ],
                      required: false
                    }
                  },
                  {
                    key: "disable",
                    value: {
                      name: "boolean",
                      required: false
                    }
                  },
                  {
                    key: "checked",
                    value: {
                      name: "boolean",
                      required: false
                    }
                  }
                ]
              }
            }
          ],
          raw: `{
  /** The text to display for the option. */
  label: string | undefined
  /** The unique value associated with the option. */
  value: string
  avatar?: string
  color?: ExtendedColorType | string
  disable?: boolean
  checked?: boolean
}[]`
        },
        description: ""
      },
      placeholder: {
        required: false,
        tsType: {
          name: "string"
        },
        description: `Placeholder text to be displayed when no values are selected.
Optional, defaults to "Select options".`,
        defaultValue: {
          value: '"Select options"',
          computed: false
        }
      },
      popoverClass: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      addNewLabel: {
        required: false,
        tsType: {
          name: "boolean"
        },
        description: "",
        defaultValue: {
          value: "false",
          computed: false
        }
      },
      title: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      isLabelFormOpen: {
        required: false,
        tsType: {
          name: "boolean"
        },
        description: ""
      },
      setIsLabelFormOpen: {
        required: false,
        tsType: {
          name: "signature",
          type: "function",
          raw: "(isLabelFormOpen: boolean) => void",
          signature: {
            arguments: [
              {
                type: {
                  name: "boolean"
                },
                name: "isLabelFormOpen"
              }
            ],
            return: {
              name: "void"
            }
          }
        },
        description: ""
      },
      labelColor: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      setLabelColor: {
        required: false,
        tsType: {
          name: "signature",
          type: "function",
          raw: "(labelColor: ExtendedColorType) => void",
          signature: {
            arguments: [
              {
                type: {
                  name: "badgePropDefs.color.default"
                },
                name: "labelColor"
              }
            ],
            return: {
              name: "void"
            }
          }
        },
        description: ""
      },
      btnClassName: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      }
    },
    composes: [
      "Omit"
    ]
  };
  let C, _;
  He = {
    title: "Elements/ListComboBox",
    component: b,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (n) => e.jsx(Z, {
        children: e.jsx("div", {
          style: {
            padding: "20px"
          },
          children: e.jsx(n, {})
        })
      })
    ],
    argTypes: {
      placeholder: {
        control: "text",
        description: "Placeholder text when no values are selected"
      },
      title: {
        control: "text",
        description: "Title shown at the top of the popover"
      },
      addNewLabel: {
        control: "boolean",
        description: "Enable adding new labels functionality"
      },
      btnClassName: {
        control: "text",
        description: "Custom CSS classes for the trigger button"
      },
      onValueChange: {
        action: "value-changed",
        description: "Callback when selected values change"
      }
    },
    args: {
      placeholder: "Select options",
      addNewLabel: false
    }
  };
  C = [
    {
      label: "High Priority",
      value: "high-priority",
      color: "red",
      checked: false
    },
    {
      label: "Medium Priority",
      value: "medium-priority",
      color: "orange",
      checked: false
    },
    {
      label: "Low Priority",
      value: "low-priority",
      color: "green",
      checked: false
    },
    {
      label: "Bug Fix",
      value: "bug-fix",
      color: "crimson",
      checked: false
    },
    {
      label: "Feature",
      value: "feature",
      color: "blue",
      checked: false
    },
    {
      label: "Documentation",
      value: "documentation",
      color: "gray",
      checked: false
    }
  ];
  _ = [
    {
      label: "John Doe",
      value: "john-doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      color: "blue",
      checked: false
    },
    {
      label: "Jane Smith",
      value: "jane-smith",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      color: "green",
      checked: false
    },
    {
      label: "Mike Johnson",
      value: "mike-johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      color: "purple",
      checked: false
    },
    {
      label: "Sarah Wilson",
      value: "sarah-wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      color: "orange",
      checked: false,
      disable: true
    }
  ];
  S = {
    render: () => {
      const [n, s] = a.useState(C);
      return e.jsxs(r, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(b, {
            defaultValue: n,
            onValueChange: s,
            placeholder: "Manage labels"
          }),
          n.filter((t) => t.checked).length > 0 && e.jsxs(d, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px"
            },
            children: [
              e.jsxs(l, {
                size: "2",
                weight: "medium",
                children: [
                  "Checked Labels (",
                  n.filter((t) => t.checked).length,
                  "):"
                ]
              }),
              e.jsx(l, {
                size: "2",
                color: "gray",
                children: n.filter((t) => t.checked).map((t) => t.label).join(", ") || "None"
              })
            ]
          })
        ]
      });
    }
  };
  z = {
    render: () => {
      const [n, s] = a.useState([
        ...C.map((t) => t.value === "high-priority" ? {
          ...t,
          checked: true
        } : t)
      ]);
      return e.jsxs(r, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(b, {
            defaultValue: n,
            onValueChange: s,
            title: "Project Labels",
            placeholder: "Select project labels"
          }),
          e.jsxs(d, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px"
            },
            children: [
              e.jsx(l, {
                size: "2",
                weight: "medium",
                children: "Active Labels:"
              }),
              e.jsx(l, {
                size: "2",
                color: "gray",
                children: n.filter((t) => t.checked).map((t) => t.label).join(", ") || "None selected"
              })
            ]
          })
        ]
      });
    }
  };
  B = {
    render: () => {
      const [n, s] = a.useState(_);
      return e.jsxs(r, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(b, {
            defaultValue: n,
            onValueChange: s,
            title: "Team Members",
            placeholder: "Select team members"
          }),
          n.filter((t) => t.checked).length > 0 && e.jsxs(d, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px"
            },
            children: [
              e.jsxs(l, {
                size: "2",
                weight: "medium",
                children: [
                  "Selected Members (",
                  n.filter((t) => t.checked).length,
                  "):"
                ]
              }),
              e.jsx(l, {
                size: "2",
                color: "gray",
                children: n.filter((t) => t.checked).map((t) => t.label).join(", ") || "None"
              })
            ]
          })
        ]
      });
    }
  };
  N = {
    render: () => {
      const [n, s] = a.useState([
        ...C
      ]), [t, i] = a.useState(false), [y, f] = a.useState("blue");
      return e.jsxs(r, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(l, {
            size: "3",
            weight: "medium",
            children: "You can add new labels"
          }),
          e.jsx(b, {
            defaultValue: n,
            onValueChange: s,
            title: "Custom Labels",
            placeholder: "Manage custom labels",
            addNewLabel: true,
            isLabelFormOpen: t,
            setIsLabelFormOpen: i,
            labelColor: y,
            setLabelColor: f
          }),
          e.jsxs(d, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px"
            },
            children: [
              e.jsxs(l, {
                size: "2",
                weight: "medium",
                children: [
                  "Total Labels: ",
                  n.length
                ]
              }),
              e.jsxs(l, {
                size: "2",
                color: "gray",
                children: [
                  "Active: ",
                  n.filter((u) => u.checked).length
                ]
              }),
              e.jsxs(l, {
                size: "2",
                color: "gray",
                children: [
                  "Inactive: ",
                  n.filter((u) => !u.checked).length
                ]
              })
            ]
          })
        ]
      });
    }
  };
  F = {
    render: () => {
      const [n, s] = a.useState(_);
      return e.jsxs(r, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(l, {
            size: "3",
            weight: "medium",
            children: "Some members are disabled"
          }),
          e.jsx(b, {
            defaultValue: n,
            onValueChange: s,
            title: "Team Assignment",
            placeholder: "Assign team members"
          }),
          e.jsxs(d, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "300px"
            },
            children: [
              e.jsxs(l, {
                size: "2",
                weight: "medium",
                children: [
                  "Available Members: ",
                  n.filter((t) => !t.disable).length
                ]
              }),
              e.jsxs(l, {
                size: "2",
                color: "gray",
                children: [
                  "Disabled Members: ",
                  n.filter((t) => t.disable).length
                ]
              }),
              e.jsxs(l, {
                size: "2",
                color: "gray",
                children: [
                  "Selected: ",
                  n.filter((t) => t.checked && !t.disable).length
                ]
              })
            ]
          })
        ]
      });
    }
  };
  A = {
    render: () => {
      const [n, s] = a.useState(C);
      return e.jsxs(r, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(l, {
            size: "3",
            weight: "medium",
            children: "Custom styled trigger button"
          }),
          e.jsx(b, {
            defaultValue: n,
            onValueChange: s,
            title: "Styled Labels",
            placeholder: "Open with styled button",
            btnClassName: "bg-blue-500 hover:bg-blue-600 text-white border-blue-500"
          }),
          e.jsx(l, {
            size: "2",
            color: "gray",
            style: {
              textAlign: "center"
            },
            children: "The trigger button has custom blue styling"
          })
        ]
      });
    }
  };
  I = {
    render: () => {
      const n = [
        {
          label: "Critical",
          value: "critical",
          color: "crimson",
          checked: false
        },
        {
          label: "High",
          value: "high",
          color: "red",
          checked: true
        },
        {
          label: "Medium",
          value: "medium",
          color: "orange",
          checked: false
        },
        {
          label: "Low",
          value: "low",
          color: "green",
          checked: false
        },
        {
          label: "Nice to Have",
          value: "nice-to-have",
          color: "gray",
          checked: false
        }
      ], [s, t] = a.useState(n);
      return e.jsxs(r, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(l, {
            size: "4",
            weight: "bold",
            children: "Task Priority Management"
          }),
          e.jsx(b, {
            defaultValue: s,
            onValueChange: t,
            title: "Set Priority Level",
            placeholder: "Select task priority"
          }),
          e.jsxs(d, {
            style: {
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-1)",
              border: "1px solid var(--gray-6)",
              minWidth: "320px"
            },
            children: [
              e.jsx(l, {
                size: "3",
                weight: "medium",
                style: {
                  marginBottom: "12px",
                  display: "block"
                },
                children: "Priority Status"
              }),
              s.map((i) => e.jsxs(r, {
                justify: "between",
                align: "center",
                style: {
                  padding: "8px 0",
                  borderBottom: "1px solid var(--gray-4)"
                },
                children: [
                  e.jsxs(r, {
                    align: "center",
                    gap: "2",
                    children: [
                      e.jsx(d, {
                        style: {
                          width: "12px",
                          height: "12px",
                          borderRadius: "50%",
                          backgroundColor: i.checked ? `var(--${i.color}-9)` : "var(--gray-6)"
                        }
                      }),
                      e.jsx(l, {
                        size: "2",
                        children: i.label
                      })
                    ]
                  }),
                  e.jsx(l, {
                    size: "1",
                    color: i.checked ? "green" : "gray",
                    children: i.checked ? "Active" : "Inactive"
                  })
                ]
              }, i.value))
            ]
          })
        ]
      });
    }
  };
  O = {
    render: () => {
      const [n, s] = a.useState([
        ...C
      ]), [t, i] = a.useState(false), [y, f] = a.useState("blue"), u = n.filter((p) => p.checked), v = n.filter((p) => !p.checked);
      return e.jsxs(r, {
        direction: "column",
        gap: "6",
        align: "center",
        style: {
          maxWidth: "500px"
        },
        children: [
          e.jsx(l, {
            size: "4",
            weight: "bold",
            children: "Project Label Management"
          }),
          e.jsxs(r, {
            gap: "4",
            wrap: "wrap",
            justify: "center",
            children: [
              e.jsxs(d, {
                style: {
                  padding: "12px 16px",
                  backgroundColor: "var(--blue-2)",
                  borderRadius: "8px",
                  textAlign: "center",
                  minWidth: "100px"
                },
                children: [
                  e.jsx(l, {
                    size: "3",
                    weight: "bold",
                    color: "blue",
                    children: n.length
                  }),
                  e.jsx(l, {
                    size: "1",
                    color: "blue",
                    children: "Total Labels"
                  })
                ]
              }),
              e.jsxs(d, {
                style: {
                  padding: "12px 16px",
                  backgroundColor: "var(--green-2)",
                  borderRadius: "8px",
                  textAlign: "center",
                  minWidth: "100px"
                },
                children: [
                  e.jsx(l, {
                    size: "3",
                    weight: "bold",
                    color: "green",
                    children: u.length
                  }),
                  e.jsx(l, {
                    size: "1",
                    color: "green",
                    children: "Active"
                  })
                ]
              }),
              e.jsxs(d, {
                style: {
                  padding: "12px 16px",
                  backgroundColor: "var(--gray-3)",
                  borderRadius: "8px",
                  textAlign: "center",
                  minWidth: "100px"
                },
                children: [
                  e.jsx(l, {
                    size: "3",
                    weight: "bold",
                    color: "gray",
                    children: v.length
                  }),
                  e.jsx(l, {
                    size: "1",
                    color: "gray",
                    children: "Inactive"
                  })
                ]
              })
            ]
          }),
          e.jsx(b, {
            options: n,
            defaultValue: n,
            onValueChange: (p) => s(p.map((h) => ({
              ...h,
              label: h.label ?? "",
              color: h.color ?? "blue",
              checked: h.checked ?? false
            }))),
            title: "Project Labels",
            placeholder: "Manage project labels",
            addNewLabel: true,
            isLabelFormOpen: t,
            setIsLabelFormOpen: i,
            labelColor: y,
            setLabelColor: f
          }),
          u.length > 0 && e.jsxs(d, {
            style: {
              width: "100%",
              padding: "16px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "8px"
            },
            children: [
              e.jsx(l, {
                size: "3",
                weight: "medium",
                style: {
                  marginBottom: "12px",
                  display: "block"
                },
                children: "Currently Active Labels:"
              }),
              e.jsx(r, {
                wrap: "wrap",
                gap: "2",
                children: u.map((p) => e.jsx(d, {
                  style: {
                    padding: "6px 12px",
                    backgroundColor: `var(--${p.color}-9)`,
                    color: "white",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: "500"
                  },
                  children: p.label
                }, p.value))
              })
            ]
          })
        ]
      });
    }
  };
  V = {
    render: () => {
      const [n, s] = a.useState([
        ...C
      ]), [t, i] = a.useState(true), [y, f] = a.useState(false), [u, v] = a.useState(false), [p, h] = a.useState(false), [q, g] = a.useState("blue");
      return e.jsxs(r, {
        direction: "column",
        gap: "6",
        align: "center",
        style: {
          maxWidth: "500px"
        },
        children: [
          e.jsx(l, {
            size: "4",
            weight: "bold",
            children: "Interactive ListComboBox"
          }),
          e.jsxs(d, {
            style: {
              padding: "16px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "8px",
              width: "100%"
            },
            children: [
              e.jsx(l, {
                size: "3",
                weight: "medium",
                style: {
                  marginBottom: "12px",
                  display: "block"
                },
                children: "Configuration"
              }),
              e.jsxs(r, {
                direction: "column",
                gap: "3",
                children: [
                  e.jsxs(r, {
                    align: "center",
                    gap: "2",
                    children: [
                      e.jsx(E, {
                        checked: t,
                        onCheckedChange: i
                      }),
                      e.jsx(l, {
                        size: "2",
                        children: "Show Title"
                      })
                    ]
                  }),
                  e.jsxs(r, {
                    align: "center",
                    gap: "2",
                    children: [
                      e.jsx(E, {
                        checked: y,
                        onCheckedChange: f
                      }),
                      e.jsx(l, {
                        size: "2",
                        children: "Enable Add New Labels"
                      })
                    ]
                  }),
                  e.jsx(E, {
                    checked: u,
                    onCheckedChange: v,
                    children: e.jsx(l, {
                      size: "2",
                      children: "Use Custom Button Style"
                    })
                  })
                ]
              })
            ]
          }),
          e.jsx(b, {
            defaultValue: n,
            onValueChange: s,
            title: t ? "Interactive Labels" : void 0,
            placeholder: "Configure and test the component...",
            addNewLabel: y,
            isLabelFormOpen: p,
            setIsLabelFormOpen: h,
            labelColor: q,
            setLabelColor: g,
            btnClassName: u ? "bg-purple-500 hover:bg-purple-600 text-white" : void 0
          }),
          e.jsxs(d, {
            style: {
              width: "100%",
              padding: "16px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "8px"
            },
            children: [
              e.jsx(l, {
                size: "2",
                weight: "medium",
                children: "Label Summary:"
              }),
              e.jsxs(l, {
                size: "2",
                color: "gray",
                style: {
                  marginTop: "4px",
                  display: "block"
                },
                children: [
                  "Total: ",
                  n.length,
                  " | Active: ",
                  n.filter((c) => c.checked).length,
                  " | Inactive: ",
                  n.filter((c) => !c.checked).length
                ]
              }),
              n.filter((c) => c.checked).length > 0 && e.jsxs(e.Fragment, {
                children: [
                  e.jsx(l, {
                    size: "2",
                    weight: "medium",
                    style: {
                      marginTop: "8px",
                      display: "block"
                    },
                    children: "Active Labels:"
                  }),
                  e.jsx(l, {
                    size: "2",
                    color: "gray",
                    children: n.filter((c) => c.checked).map((c) => c.label).join(", ")
                  })
                ]
              })
            ]
          })
        ]
      });
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_a = S.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedLabels, setSelectedLabels] = useState(sampleLabels);
    return <Flex direction="column" gap="4" align="center">
        <ListComboBox defaultValue={selectedLabels} onValueChange={setSelectedLabels} placeholder="Manage labels" />

        {selectedLabels.filter(label => label.checked).length > 0 && <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "300px"
      }}>
            <Text size="2" weight="medium">
              Checked Labels ({selectedLabels.filter(l => l.checked).length}):
            </Text>
            <Text size="2" color="gray">
              {selectedLabels.filter(l => l.checked).map(l => l.label).join(", ") || "None"}
            </Text>
          </Box>}
      </Flex>;
  }
}`,
        ...(_c = (_b = S.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_d = z.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedLabels, setSelectedLabels] = useState([...sampleLabels.map(label => label.value === "high-priority" ? {
      ...label,
      checked: true
    } : label)]);
    return <Flex direction="column" gap="4" align="center">
        <ListComboBox defaultValue={selectedLabels} onValueChange={setSelectedLabels} title="Project Labels" placeholder="Select project labels" />

        <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "300px"
      }}>
          <Text size="2" weight="medium">
            Active Labels:
          </Text>
          <Text size="2" color="gray">
            {selectedLabels.filter(l => l.checked).map(l => l.label).join(", ") || "None selected"}
          </Text>
        </Box>
      </Flex>;
  }
}`,
        ...(_f = (_e = z.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_g = B.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedMembers, setSelectedMembers] = useState(teamLabels);
    return <Flex direction="column" gap="4" align="center">
        <ListComboBox defaultValue={selectedMembers} onValueChange={setSelectedMembers} title="Team Members" placeholder="Select team members" />

        {selectedMembers.filter(member => member.checked).length > 0 && <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "300px"
      }}>
            <Text size="2" weight="medium">
              Selected Members ({selectedMembers.filter(m => m.checked).length}):
            </Text>
            <Text size="2" color="gray">
              {selectedMembers.filter(m => m.checked).map(m => m.label).join(", ") || "None"}
            </Text>
          </Box>}
      </Flex>;
  }
}`,
        ...(_i = (_h = B.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  N.parameters = {
    ...N.parameters,
    docs: {
      ...(_j = N.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedLabels, setSelectedLabels] = useState([...sampleLabels]);
    const [isLabelFormOpen, setIsLabelFormOpen] = useState(false);
    const [labelColor, setLabelColor] = useState<ExtendedColorType>("blue");
    return <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          You can add new labels
        </Text>

        <ListComboBox defaultValue={selectedLabels} onValueChange={setSelectedLabels} title="Custom Labels" placeholder="Manage custom labels" addNewLabel={true} isLabelFormOpen={isLabelFormOpen} setIsLabelFormOpen={setIsLabelFormOpen} labelColor={labelColor} setLabelColor={setLabelColor} />

        <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "300px"
      }}>
          <Text size="2" weight="medium">
            Total Labels: {selectedLabels.length}
          </Text>
          <Text size="2" color="gray">
            Active: {selectedLabels.filter(l => l.checked).length}
          </Text>
          <Text size="2" color="gray">
            Inactive: {selectedLabels.filter(l => !l.checked).length}
          </Text>
        </Box>
      </Flex>;
  }
}`,
        ...(_l = (_k = N.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  F.parameters = {
    ...F.parameters,
    docs: {
      ...(_m = F.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedItems, setSelectedItems] = useState(teamLabels);
    return <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Some members are disabled
        </Text>

        <ListComboBox defaultValue={selectedItems} onValueChange={setSelectedItems} title="Team Assignment" placeholder="Assign team members" />

        <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "300px"
      }}>
          <Text size="2" weight="medium">
            Available Members: {selectedItems.filter(m => !m.disable).length}
          </Text>
          <Text size="2" color="gray">
            Disabled Members: {selectedItems.filter(m => m.disable).length}
          </Text>
          <Text size="2" color="gray">
            Selected: {selectedItems.filter(m => m.checked && !m.disable).length}
          </Text>
        </Box>
      </Flex>;
  }
}`,
        ...(_o = (_n = F.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  A.parameters = {
    ...A.parameters,
    docs: {
      ...(_p = A.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedLabels, setSelectedLabels] = useState(sampleLabels);
    return <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Custom styled trigger button
        </Text>

        <ListComboBox defaultValue={selectedLabels} onValueChange={setSelectedLabels} title="Styled Labels" placeholder="Open with styled button" btnClassName="bg-blue-500 hover:bg-blue-600 text-white border-blue-500" />

        <Text size="2" color="gray" style={{
        textAlign: "center"
      }}>
          The trigger button has custom blue styling
        </Text>
      </Flex>;
  }
}`,
        ...(_r = (_q = A.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  I.parameters = {
    ...I.parameters,
    docs: {
      ...(_s = I.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: () => {
    const priorityLabels = [{
      label: "Critical",
      value: "critical",
      color: "crimson" as ExtendedColorType,
      checked: false
    }, {
      label: "High",
      value: "high",
      color: "red" as ExtendedColorType,
      checked: true
    }, {
      label: "Medium",
      value: "medium",
      color: "orange" as ExtendedColorType,
      checked: false
    }, {
      label: "Low",
      value: "low",
      color: "green" as ExtendedColorType,
      checked: false
    }, {
      label: "Nice to Have",
      value: "nice-to-have",
      color: "gray" as ExtendedColorType,
      checked: false
    }];
    const [priorities, setPriorities] = useState(priorityLabels);
    return <Flex direction="column" gap="4" align="center">
        <Text size="4" weight="bold">
          Task Priority Management
        </Text>

        <ListComboBox defaultValue={priorities} onValueChange={setPriorities} title="Set Priority Level" placeholder="Select task priority" />

        <Box style={{
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-1)",
        border: "1px solid var(--gray-6)",
        minWidth: "320px"
      }}>
          <Text size="3" weight="medium" style={{
          marginBottom: "12px",
          display: "block"
        }}>
            Priority Status
          </Text>

          {priorities.map(priority => <Flex key={priority.value} justify="between" align="center" style={{
          padding: "8px 0",
          borderBottom: "1px solid var(--gray-4)"
        }}>
              <Flex align="center" gap="2">
                <Box style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: priority.checked ? \`var(--\${priority.color}-9)\` : "var(--gray-6)"
            }} />
                <Text size="2">{priority.label}</Text>
              </Flex>
              <Text size="1" color={priority.checked ? "green" : "gray"}>
                {priority.checked ? "Active" : "Inactive"}
              </Text>
            </Flex>)}
        </Box>
      </Flex>;
  }
}`,
        ...(_u = (_t = I.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  O.parameters = {
    ...O.parameters,
    docs: {
      ...(_v = O.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: () => {
    const [labels, setLabels] = useState([...sampleLabels]);
    const [isLabelFormOpen, setIsLabelFormOpen] = useState(false);
    const [labelColor, setLabelColor] = useState<ExtendedColorType>("blue");
    const activeLabels = labels.filter(l => l.checked);
    const inactiveLabels = labels.filter(l => !l.checked);
    return <Flex direction="column" gap="6" align="center" style={{
      maxWidth: "500px"
    }}>
        <Text size="4" weight="bold">
          Project Label Management
        </Text>

        {/* Statistics */}
        <Flex gap="4" wrap="wrap" justify="center">
          <Box style={{
          padding: "12px 16px",
          backgroundColor: "var(--blue-2)",
          borderRadius: "8px",
          textAlign: "center",
          minWidth: "100px"
        }}>
            <Text size="3" weight="bold" color="blue">
              {labels.length}
            </Text>
            <Text size="1" color="blue">
              Total Labels
            </Text>
          </Box>

          <Box style={{
          padding: "12px 16px",
          backgroundColor: "var(--green-2)",
          borderRadius: "8px",
          textAlign: "center",
          minWidth: "100px"
        }}>
            <Text size="3" weight="bold" color="green">
              {activeLabels.length}
            </Text>
            <Text size="1" color="green">
              Active
            </Text>
          </Box>

          <Box style={{
          padding: "12px 16px",
          backgroundColor: "var(--gray-3)",
          borderRadius: "8px",
          textAlign: "center",
          minWidth: "100px"
        }}>
            <Text size="3" weight="bold" color="gray">
              {inactiveLabels.length}
            </Text>
            <Text size="1" color="gray">
              Inactive
            </Text>
          </Box>
        </Flex>

        {/* Label Manager */}
        <ListComboBox options={labels} defaultValue={labels} onValueChange={value => setLabels(value.map(l => ({
        ...l,
        label: l.label ?? "",
        color: l.color ?? "blue",
        checked: l.checked ?? false
      })))} title="Project Labels" placeholder="Manage project labels" addNewLabel={true} isLabelFormOpen={isLabelFormOpen} setIsLabelFormOpen={setIsLabelFormOpen} labelColor={labelColor} setLabelColor={setLabelColor} />

        {/* Active Labels Display */}
        {activeLabels.length > 0 && <Box style={{
        width: "100%",
        padding: "16px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px"
      }}>
            <Text size="3" weight="medium" style={{
          marginBottom: "12px",
          display: "block"
        }}>
              Currently Active Labels:
            </Text>

            <Flex wrap="wrap" gap="2">
              {activeLabels.map(label => <Box key={label.value} style={{
            padding: "6px 12px",
            backgroundColor: \`var(--\${label.color}-9)\`,
            color: "white",
            borderRadius: "16px",
            fontSize: "12px",
            fontWeight: "500"
          }}>
                  {label.label}
                </Box>)}
            </Flex>
          </Box>}
      </Flex>;
  }
}`,
        ...(_x = (_w = O.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  V.parameters = {
    ...V.parameters,
    docs: {
      ...(_y = V.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: () => {
    const [labels, setLabels] = useState([...sampleLabels]);
    const [showTitle, setShowTitle] = useState(true);
    const [enableAddNew, setEnableAddNew] = useState(false);
    const [useCustomButton, setUseCustomButton] = useState(false);
    const [isLabelFormOpen, setIsLabelFormOpen] = useState(false);
    const [labelColor, setLabelColor] = useState<ExtendedColorType>("blue");
    return <Flex direction="column" gap="6" align="center" style={{
      maxWidth: "500px"
    }}>
        <Text size="4" weight="bold">
          Interactive ListComboBox
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
            <Flex align="center" gap="2">
            <Checkbox checked={showTitle} onCheckedChange={setShowTitle} />
              <Text size="2">Show Title</Text>
            </Flex>
              <Flex align="center" gap="2">
            <Checkbox checked={enableAddNew} onCheckedChange={setEnableAddNew} />
              <Text size="2">Enable Add New Labels</Text>
            </Flex>
            <Checkbox checked={useCustomButton} onCheckedChange={setUseCustomButton}>
              <Text size="2">Use Custom Button Style</Text>
            </Checkbox>
          </Flex>
        </Box>

        {/* ListComboBox */}
        <ListComboBox defaultValue={labels} onValueChange={setLabels} title={showTitle ? "Interactive Labels" : undefined} placeholder="Configure and test the component..." addNewLabel={enableAddNew} isLabelFormOpen={isLabelFormOpen} setIsLabelFormOpen={setIsLabelFormOpen} labelColor={labelColor} setLabelColor={setLabelColor} btnClassName={useCustomButton ? "bg-purple-500 hover:bg-purple-600 text-white" : undefined} />

        {/* Results */}
        <Box style={{
        width: "100%",
        padding: "16px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px"
      }}>
          <Text size="2" weight="medium">
            Label Summary:
          </Text>
          <Text size="2" color="gray" style={{
          marginTop: "4px",
          display: "block"
        }}>
            Total: {labels.length} | Active: {labels.filter(l => l.checked).length} | Inactive: {labels.filter(l => !l.checked).length}
          </Text>

          {labels.filter(l => l.checked).length > 0 && <>
              <Text size="2" weight="medium" style={{
            marginTop: "8px",
            display: "block"
          }}>
                Active Labels:
              </Text>
              <Text size="2" color="gray">
                {labels.filter(l => l.checked).map(l => l.label).join(", ")}
              </Text>
            </>}
        </Box>
      </Flex>;
  }
}`,
        ...(_A = (_z = V.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  Ue = [
    "Default",
    "WithTitle",
    "WithAvatars",
    "WithAddNewLabel",
    "WithDisabledOptions",
    "CustomButtonStyling",
    "PriorityManagement",
    "LabelManagementWithStats",
    "InteractivePlayground"
  ];
});
export {
  A as CustomButtonStyling,
  S as Default,
  V as InteractivePlayground,
  O as LabelManagementWithStats,
  I as PriorityManagement,
  N as WithAddNewLabel,
  B as WithAvatars,
  F as WithDisabledOptions,
  z as WithTitle,
  Ue as __namedExportsOrder,
  __tla,
  He as default
};
