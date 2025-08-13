import { r as l, j as e, a as s, F as o, T as $, f as M, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { A as G, __tla as __tla_1 } from "./avatar-DxZO6dds.js";
import { P as Q, C as X, i as E, S as H, a as Y, T as Z, U as ee, __tla as __tla_2 } from "./icon-ClnzJwXp.js";
import { c as V } from "./utils-CBfrqCZ4.js";
import { C as ne, __tla as __tla_3 } from "./color-picker-VWh8MS13.js";
import { C as te, a as ae, b as se, c as le, d as I, e as D, __tla as __tla_4 } from "./command-Dq5lJyfT.js";
import { I as oe, __tla as __tla_5 } from "./input-BGZ7lJci.js";
import { P as q, a as W, b as P, __tla as __tla_6 } from "./popover-DV0bW1sX.js";
import { I as re, __tla as __tla_7 } from "./icon-button-DBeYp-S7.js";
import { B as ie, __tla as __tla_8 } from "./badge-GocNDIsR.js";
import { B as N, __tla as __tla_9 } from "./button-BF2Wetgg.js";
import { U as ce, __tla as __tla_10 } from "./user-DF4nMnH4.js";
import { B as h, __tla as __tla_11 } from "./box-Dr3vL6g-.js";
import "./preload-helper-D9Z9MdNV.js";
import "./types-sXqsNS8j.js";
import { __tla as __tla_12 } from "./createLucideIcon-BUkpxZyj.js";
import { __tla as __tla_13 } from "./chevron-down-2X_Paxnn.js";
import { __tla as __tla_14 } from "./chevron-right-tttQlfk_.js";
import { __tla as __tla_15 } from "./x-C94K9CrB.js";
import { __tla as __tla_16 } from "./trash-BVyHiUQV.js";
import { __tla as __tla_17 } from "./trash-2-B7j0iALt.js";
import { __tla as __tla_18 } from "./index-BpKby9Va.js";
import { __tla as __tla_19 } from "./index-CEOg2jVB.js";
import { __tla as __tla_20 } from "./index-DfrOcl7X.js";
import { __tla as __tla_21 } from "./index-ChItmDsK.js";
import { __tla as __tla_22 } from "./require-react-element-D0otgQnF.js";
import { __tla as __tla_23 } from "./base-button-BHQkXpSv.js";
let A, L, B, R, O, k, F, We, qe;
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
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
  const d = l.forwardRef(({ options: n, onValueChange: a, defaultValue: r = [], placeholder: i = "Select options", title: p, popoverClass: j, addNewLabel: x = false, formRef: b, labelColor: f, setLabelColor: T, isLabelFormOpen: m, setIsLabelFormOpen: y, handleAddNewLabel: c }) => {
    const [g, w] = l.useState(r), [z, C] = l.useState(false), _ = (t) => {
      if (t.key === "Enter") C(true);
      else if (t.key === "Backspace" && !t.currentTarget.value) {
        const u = [
          ...g
        ];
        u.pop(), w(u), a(u);
      }
    }, U = (t) => {
      const u = g.includes(t) ? g.filter((v) => v !== t) : [
        ...g,
        t
      ];
      w(u), a(u);
    }, J = () => {
      w([]), a([]);
    }, K = (t) => {
      T && T(t.name);
    };
    return e.jsxs(q, {
      open: z,
      onOpenChange: C,
      children: [
        e.jsx(W, {
          children: e.jsxs(re, {
            color: "gray",
            "aria-label": "Open options menu",
            className: "flex h-8 w-8 items-center justify-center rounded-full ",
            children: [
              e.jsx(Q, {
                "aria-hidden": "true"
              }),
              e.jsx(s, {
                className: "sr-only",
                children: "Add new item"
              })
            ]
          })
        }),
        e.jsxs(P, {
          className: V("z-[88] space-y-2", j),
          align: "start",
          onEscapeKeyDown: () => C(false),
          width: "280px",
          children: [
            p && e.jsx("h1", {
              className: "font-medium",
              children: p
            }),
            e.jsxs(te, {
              className: "bg-transparent",
              children: [
                e.jsx(ae, {
                  placeholder: i,
                  onKeyDown: _,
                  className: "border-0 focus:border-0 focus:outline-none"
                }),
                e.jsxs(se, {
                  children: [
                    e.jsx(le, {
                      children: "No results found."
                    }),
                    e.jsx(I, {
                      children: n.map((t) => {
                        const u = g.includes(t.value), v = t.disable;
                        return e.jsxs(D, {
                          onSelect: () => !v && U(t.value),
                          className: V("cursor-pointer justify-between rounded-md", v && "cursor-not-allowed opacity-50 "),
                          children: [
                            e.jsxs(o, {
                              align: "center",
                              gap: "2",
                              children: [
                                t.icon && e.jsx(t.icon, {
                                  className: V(`mr-2 ${E}`, v ? "text-muted-foreground" : "")
                                }),
                                t.avatar && e.jsx(G, {
                                  src: t.avatar,
                                  className: "h-8 w-8"
                                }),
                                e.jsx(ie, {
                                  color: t.color,
                                  variant: "solid",
                                  className: "px-3 py-1.5",
                                  children: t.label
                                })
                              ]
                            }),
                            e.jsx(o, {
                              justify: "center",
                              align: "center",
                              className: V("ml-2 h-5 w-5 rounded-sm border border-secondary", u ? "bg-secondary text-primary-foreground" : "opacity-50 [&_svg]:invisible"),
                              children: !v && e.jsx(X, {
                                className: `${E} text-white`
                              })
                            })
                          ]
                        }, t.value);
                      })
                    }),
                    e.jsx(I, {
                      children: x ? e.jsx(e.Fragment, {
                        children: m ? e.jsxs("form", {
                          ref: b,
                          onSubmit: c,
                          className: "p-2",
                          children: [
                            e.jsx(oe, {
                              name: "labelName",
                              type: "text",
                              placeholder: "Enter label name",
                              className: "mb-3 w-full rounded-md border border-gray-5 bg-gray-1 px-3 py-2",
                              required: true
                            }),
                            e.jsxs(o, {
                              justify: "between",
                              children: [
                                e.jsxs(q, {
                                  children: [
                                    e.jsx(W, {
                                      children: e.jsx(N, {
                                        variant: "solid",
                                        className: "color-swatch h-7 w-8 cursor-pointer rounded-sm border border-gray-12",
                                        color: f || "blue"
                                      })
                                    }),
                                    e.jsx(P, {
                                      alignOffset: -75,
                                      width: "190px",
                                      className: "z-[888] overflow-hidden bg-white p-3",
                                      children: e.jsx(ne, {
                                        colorType: "base",
                                        onColorSelect: K
                                      })
                                    })
                                  ]
                                }),
                                e.jsxs(o, {
                                  gap: "2",
                                  children: [
                                    e.jsx(N, {
                                      type: "submit",
                                      color: "blue",
                                      variant: "solid",
                                      className: "h-8 rounded-md px-3",
                                      children: "Save"
                                    }),
                                    e.jsx(N, {
                                      type: "button",
                                      color: "red",
                                      variant: "solid",
                                      onClick: () => y == null ? void 0 : y(false),
                                      children: "\u2715"
                                    })
                                  ]
                                })
                              ]
                            })
                          ]
                        }) : e.jsx(N, {
                          onClick: () => y == null ? void 0 : y(true),
                          className: "h-10 w-full rounded-md bg-blue-500 px-4 text-white",
                          children: "Add new label"
                        })
                      }) : e.jsx(e.Fragment, {
                        children: e.jsxs(o, {
                          justify: "between",
                          align: "center",
                          className: "font-medium",
                          children: [
                            g.length > 0 && e.jsx(D, {
                              onSelect: J,
                              className: "h-10 flex-1 cursor-pointer justify-center ",
                              children: "Clear"
                            }),
                            e.jsx(D, {
                              onSelect: () => C(false),
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
  });
  d.displayName = "Combobox";
  d.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Combobox",
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
}[]`
        },
        description: `An array of option objects to be displayed in the multi-select component.
Each option object has a label, value, and an optional icon.`
      },
      onValueChange: {
        required: true,
        tsType: {
          name: "signature",
          type: "function",
          raw: "(value: string[]) => void",
          signature: {
            arguments: [
              {
                type: {
                  name: "Array",
                  elements: [
                    {
                      name: "string"
                    }
                  ],
                  raw: "string[]"
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
              name: "string"
            }
          ],
          raw: "string[]"
        },
        description: "The default selected values when the component mounts.",
        defaultValue: {
          value: "[]",
          computed: false
        }
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
      formRef: {
        required: false,
        tsType: {
          name: "ReactRefObject",
          raw: "React.RefObject<HTMLFormElement>",
          elements: [
            {
              name: "HTMLFormElement"
            }
          ]
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
      handleAddNewLabel: {
        required: false,
        tsType: {
          name: "signature",
          type: "function",
          raw: "(e: React.FormEvent) => void",
          signature: {
            arguments: [
              {
                type: {
                  name: "ReactFormEvent",
                  raw: "React.FormEvent"
                },
                name: "e"
              }
            ],
            return: {
              name: "void"
            }
          }
        },
        description: ""
      }
    }
  };
  let S, de;
  qe = {
    title: "Elements/ComboBox",
    component: d,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (n) => e.jsx($, {
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
  S = [
    {
      label: "Frontend",
      value: "frontend",
      icon: ce,
      color: "blue"
    },
    {
      label: "Backend",
      value: "backend",
      icon: H,
      color: "green"
    },
    {
      label: "Design",
      value: "design",
      icon: Y,
      color: "purple"
    },
    {
      label: "Marketing",
      value: "marketing",
      icon: Z,
      color: "orange"
    },
    {
      label: "Team Lead",
      value: "team-lead",
      icon: ee,
      color: "red",
      disable: true
    }
  ];
  de = [
    {
      label: "John Doe",
      value: "john-doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
      color: "blue"
    },
    {
      label: "Jane Smith",
      value: "jane-smith",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face",
      color: "green"
    },
    {
      label: "Mike Johnson",
      value: "mike-johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face",
      color: "purple"
    },
    {
      label: "Sarah Wilson",
      value: "sarah-wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face",
      color: "orange",
      disable: true
    }
  ];
  L = {
    render: () => {
      const [n, a] = l.useState([]);
      return e.jsxs(o, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(d, {
            options: S,
            onValueChange: a,
            placeholder: "Select team roles"
          }),
          n.length > 0 && e.jsx(h, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "200px"
            },
            children: e.jsxs(s, {
              size: "2",
              weight: "medium",
              children: [
                "Selected: ",
                n.join(", ")
              ]
            })
          })
        ]
      });
    }
  };
  F = {
    render: () => {
      const [n, a] = l.useState([
        "frontend"
      ]);
      return e.jsxs(o, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(d, {
            options: S,
            onValueChange: a,
            defaultValue: [
              "frontend"
            ],
            title: "Select Team Roles",
            placeholder: "Choose roles..."
          }),
          e.jsxs(h, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "200px"
            },
            children: [
              e.jsx(s, {
                size: "2",
                weight: "medium",
                children: "Current Selection:"
              }),
              e.jsx(s, {
                size: "2",
                color: "gray",
                children: n.length > 0 ? n.join(", ") : "None"
              })
            ]
          })
        ]
      });
    }
  };
  O = {
    render: () => {
      const [n, a] = l.useState([]);
      return e.jsxs(o, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(d, {
            options: de,
            onValueChange: a,
            title: "Select Team Members",
            placeholder: "Choose team members..."
          }),
          n.length > 0 && e.jsxs(h, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "200px"
            },
            children: [
              e.jsxs(s, {
                size: "2",
                weight: "medium",
                children: [
                  "Selected Members: ",
                  n.length
                ]
              }),
              e.jsx(s, {
                size: "2",
                color: "gray",
                children: n.join(", ")
              })
            ]
          })
        ]
      });
    }
  };
  R = {
    render: () => {
      const [n, a] = l.useState([]), [r, i] = l.useState(false), [p, j] = l.useState("blue"), x = M.useRef(null), b = (f) => {
        var _a2;
        f.preventDefault();
        const m = new FormData(f.target).get("labelName");
        if (m == null ? void 0 : m.trim()) {
          const y = m.toLowerCase().replace(/\s+/g, "-");
          a((c) => [
            ...c,
            y
          ]), i(false), (_a2 = x.current) == null ? void 0 : _a2.reset();
        }
      };
      return e.jsxs(o, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(d, {
            options: S,
            onValueChange: a,
            title: "Manage Labels",
            placeholder: "Select or create labels...",
            addNewLabel: true,
            formRef: x,
            isLabelFormOpen: r,
            setIsLabelFormOpen: i,
            labelColor: p,
            setLabelColor: j,
            handleAddNewLabel: b
          }),
          n.length > 0 && e.jsxs(h, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "250px"
            },
            children: [
              e.jsxs(s, {
                size: "2",
                weight: "medium",
                children: [
                  "Labels (",
                  n.length,
                  "):"
                ]
              }),
              e.jsx(s, {
                size: "2",
                color: "gray",
                children: n.join(", ")
              })
            ]
          })
        ]
      });
    }
  };
  k = {
    render: () => {
      const [n, a] = l.useState([]), r = [
        ...S,
        {
          label: "Admin",
          value: "admin",
          icon: H,
          color: "crimson",
          disable: true
        }
      ];
      return e.jsxs(o, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(s, {
            size: "3",
            weight: "medium",
            style: {
              textAlign: "center"
            },
            children: "Some options are disabled"
          }),
          e.jsx(d, {
            options: r,
            onValueChange: a,
            title: "Team Roles (Some Disabled)",
            placeholder: "Select available roles..."
          }),
          e.jsxs(h, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "200px"
            },
            children: [
              e.jsxs(s, {
                size: "2",
                weight: "medium",
                children: [
                  "Available Options: ",
                  r.filter((i) => !i.disable).length
                ]
              }),
              e.jsxs(s, {
                size: "2",
                color: "gray",
                children: [
                  "Disabled Options: ",
                  r.filter((i) => i.disable).length
                ]
              }),
              e.jsxs(s, {
                size: "2",
                color: "gray",
                children: [
                  "Selected: ",
                  n.length
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
      const [n, a] = l.useState([
        "design"
      ]);
      return e.jsxs(o, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(d, {
            options: S,
            onValueChange: a,
            defaultValue: [
              "design"
            ],
            title: "Custom Styled ComboBox",
            placeholder: "Select with custom styles...",
            popoverClass: "shadow-lg border-2 border-blue-200"
          }),
          e.jsx(s, {
            size: "2",
            color: "gray",
            style: {
              textAlign: "center"
            },
            children: "This ComboBox has custom popover styling"
          })
        ]
      });
    }
  };
  B = {
    render: () => {
      const [n, a] = l.useState([]), [r, i] = l.useState(true), [p, j] = l.useState(false), [x, b] = l.useState(false), [f, T] = l.useState("blue"), m = M.useRef(null), y = (c) => {
        var _a2;
        c.preventDefault();
        const w = new FormData(c.target).get("labelName");
        if (w == null ? void 0 : w.trim()) {
          const z = w.toLowerCase().replace(/\s+/g, "-");
          a((C) => [
            ...C,
            z
          ]), b(false), (_a2 = m.current) == null ? void 0 : _a2.reset();
        }
      };
      return e.jsxs(o, {
        direction: "column",
        gap: "6",
        align: "center",
        style: {
          maxWidth: "400px"
        },
        children: [
          e.jsx(s, {
            size: "4",
            weight: "bold",
            children: "Interactive ComboBox"
          }),
          e.jsxs(h, {
            style: {
              padding: "16px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "8px",
              width: "100%"
            },
            children: [
              e.jsx(s, {
                size: "3",
                weight: "medium",
                style: {
                  marginBottom: "12px",
                  display: "block"
                },
                children: "Configuration"
              }),
              e.jsxs(o, {
                direction: "column",
                gap: "2",
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
                        checked: r,
                        onChange: (c) => i(c.target.checked)
                      }),
                      e.jsx(s, {
                        size: "2",
                        children: "Show Title"
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
                        checked: p,
                        onChange: (c) => j(c.target.checked)
                      }),
                      e.jsx(s, {
                        size: "2",
                        children: "Enable Add New Labels"
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          e.jsx(d, {
            options: S,
            onValueChange: a,
            title: r ? "Select Options" : void 0,
            placeholder: "Choose your options...",
            addNewLabel: p,
            formRef: m,
            isLabelFormOpen: x,
            setIsLabelFormOpen: b,
            labelColor: f,
            setLabelColor: T,
            handleAddNewLabel: y
          }),
          e.jsxs(h, {
            style: {
              width: "100%",
              padding: "16px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "8px",
              textAlign: "center"
            },
            children: [
              e.jsxs(s, {
                size: "2",
                weight: "medium",
                children: [
                  "Selected Values (",
                  n.length,
                  "):"
                ]
              }),
              e.jsx(s, {
                size: "2",
                color: "gray",
                style: {
                  marginTop: "4px",
                  display: "block"
                },
                children: n.length > 0 ? n.join(", ") : "None selected"
              })
            ]
          })
        ]
      });
    }
  };
  L.parameters = {
    ...L.parameters,
    docs: {
      ...(_a = L.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    return <Flex direction="column" gap="4" align="center">
        <ComboBox options={sampleOptions} onValueChange={setSelectedValues} placeholder="Select team roles" />
        
        {selectedValues.length > 0 && <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "200px"
      }}>
            <Text size="2" weight="medium">
              Selected: {selectedValues.join(", ")}
            </Text>
          </Box>}
      </Flex>;
  }
}`,
        ...(_c = (_b = L.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  F.parameters = {
    ...F.parameters,
    docs: {
      ...(_d = F.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>(["frontend"]);
    return <Flex direction="column" gap="4" align="center">
        <ComboBox options={sampleOptions} onValueChange={setSelectedValues} defaultValue={["frontend"]} title="Select Team Roles" placeholder="Choose roles..." />
        
        <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "200px"
      }}>
          <Text size="2" weight="medium">
            Current Selection:
          </Text>
          <Text size="2" color="gray">
            {selectedValues.length > 0 ? selectedValues.join(", ") : "None"}
          </Text>
        </Box>
      </Flex>;
  }
}`,
        ...(_f = (_e = F.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  O.parameters = {
    ...O.parameters,
    docs: {
      ...(_g = O.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    return <Flex direction="column" gap="4" align="center">
        <ComboBox options={avatarOptions} onValueChange={setSelectedValues} title="Select Team Members" placeholder="Choose team members..." />
        
        {selectedValues.length > 0 && <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "200px"
      }}>
            <Text size="2" weight="medium">
              Selected Members: {selectedValues.length}
            </Text>
            <Text size="2" color="gray">
              {selectedValues.join(", ")}
            </Text>
          </Box>}
      </Flex>;
  }
}`,
        ...(_i = (_h = O.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  R.parameters = {
    ...R.parameters,
    docs: {
      ...(_j = R.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [isLabelFormOpen, setIsLabelFormOpen] = useState(false);
    const [labelColor, setLabelColor] = useState("blue");
    const formRef = React.useRef<HTMLFormElement>(null);
    const handleAddNewLabel = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const labelName = formData.get("labelName") as string;
      if (labelName?.trim()) {
        const newValue = labelName.toLowerCase().replace(/\\s+/g, "-");
        setSelectedValues(prev => [...prev, newValue]);
        setIsLabelFormOpen(false);
        formRef.current?.reset();
      }
    };
    return <Flex direction="column" gap="4" align="center">
        <ComboBox options={sampleOptions} onValueChange={setSelectedValues} title="Manage Labels" placeholder="Select or create labels..." addNewLabel={true} formRef={formRef} isLabelFormOpen={isLabelFormOpen} setIsLabelFormOpen={setIsLabelFormOpen} labelColor={labelColor} setLabelColor={setLabelColor} handleAddNewLabel={handleAddNewLabel} />
        
        {selectedValues.length > 0 && <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "250px"
      }}>
            <Text size="2" weight="medium">
              Labels ({selectedValues.length}):
            </Text>
            <Text size="2" color="gray">
              {selectedValues.join(", ")}
            </Text>
          </Box>}
      </Flex>;
  }
}`,
        ...(_l = (_k = R.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_m = k.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const mixedOptions = [...sampleOptions, {
      label: "Admin",
      value: "admin",
      icon: Settings,
      color: "crimson" as const,
      disable: true
    }];
    return <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium" style={{
        textAlign: "center"
      }}>
          Some options are disabled
        </Text>
        
        <ComboBox options={mixedOptions} onValueChange={setSelectedValues} title="Team Roles (Some Disabled)" placeholder="Select available roles..." />
        
        <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "200px"
      }}>
          <Text size="2" weight="medium">
            Available Options: {mixedOptions.filter(opt => !opt.disable).length}
          </Text>
          <Text size="2" color="gray">
            Disabled Options: {mixedOptions.filter(opt => opt.disable).length}
          </Text>
          <Text size="2" color="gray">
            Selected: {selectedValues.length}
          </Text>
        </Box>
      </Flex>;
  }
}`,
        ...(_o = (_n = k.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
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
    const [selectedValues, setSelectedValues] = useState<string[]>(["design"]);
    return <Flex direction="column" gap="4" align="center">
        <ComboBox options={sampleOptions} onValueChange={setSelectedValues} defaultValue={["design"]} title="Custom Styled ComboBox" placeholder="Select with custom styles..." popoverClass="shadow-lg border-2 border-blue-200" />
        
        <Text size="2" color="gray" style={{
        textAlign: "center"
      }}>
          This ComboBox has custom popover styling
        </Text>
      </Flex>;
  }
}`,
        ...(_r = (_q = A.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_s = B.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [showTitle, setShowTitle] = useState(true);
    const [enableAddNew, setEnableAddNew] = useState(false);
    const [isLabelFormOpen, setIsLabelFormOpen] = useState(false);
    const [labelColor, setLabelColor] = useState("blue");
    const formRef = React.useRef<HTMLFormElement>(null);
    const handleAddNewLabel = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const labelName = formData.get("labelName") as string;
      if (labelName?.trim()) {
        const newValue = labelName.toLowerCase().replace(/\\s+/g, "-");
        setSelectedValues(prev => [...prev, newValue]);
        setIsLabelFormOpen(false);
        formRef.current?.reset();
      }
    };
    return <Flex direction="column" gap="6" align="center" style={{
      maxWidth: "400px"
    }}>
        <Text size="4" weight="bold">
          Interactive ComboBox
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
          
          <Flex direction="column" gap="2">
            <label style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <input type="checkbox" checked={showTitle} onChange={e => setShowTitle(e.target.checked)} />
              <Text size="2">Show Title</Text>
            </label>
            
            <label style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <input type="checkbox" checked={enableAddNew} onChange={e => setEnableAddNew(e.target.checked)} />
              <Text size="2">Enable Add New Labels</Text>
            </label>
          </Flex>
        </Box>

        {/* ComboBox */}
        <ComboBox options={sampleOptions} onValueChange={setSelectedValues} title={showTitle ? "Select Options" : undefined} placeholder="Choose your options..." addNewLabel={enableAddNew} formRef={formRef} isLabelFormOpen={isLabelFormOpen} setIsLabelFormOpen={setIsLabelFormOpen} labelColor={labelColor} setLabelColor={setLabelColor} handleAddNewLabel={handleAddNewLabel} />
        
        {/* Results */}
        <Box style={{
        width: "100%",
        padding: "16px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px",
        textAlign: "center"
      }}>
          <Text size="2" weight="medium">
            Selected Values ({selectedValues.length}):
          </Text>
          <Text size="2" color="gray" style={{
          marginTop: "4px",
          display: "block"
        }}>
            {selectedValues.length > 0 ? selectedValues.join(", ") : "None selected"}
          </Text>
        </Box>
      </Flex>;
  }
}`,
        ...(_u = (_t = B.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  We = [
    "Default",
    "WithTitle",
    "WithAvatars",
    "WithAddNewLabel",
    "WithDisabledOptions",
    "CustomStyling",
    "InteractivePlayground"
  ];
});
export {
  A as CustomStyling,
  L as Default,
  B as InteractivePlayground,
  R as WithAddNewLabel,
  O as WithAvatars,
  k as WithDisabledOptions,
  F as WithTitle,
  We as __namedExportsOrder,
  __tla,
  qe as default
};
