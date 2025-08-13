import { r as v, j as e, P as W, b as se, f as u, c as ie, d as de, y as me, v as ce, l as J, w as ue, T as ge, F as q, a, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { c as K, I as pe, R as ve, __tla as __tla_1 } from "./index-NEJkd5JU.js";
import { u as U, __tla as __tla_2 } from "./index-DfrOcl7X.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_3 } from "./index-D3rDgx3q.js";
import { __tla as __tla_4 } from "./index-CEOg2jVB.js";
let B, A, y, T, R, z, V, h, _, E, O, P, w, k, I, j, f, F, b, L, N, M, D, G, Be, _e;
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
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra;
  var Q = "Toggle", X = v.forwardRef((n, o) => {
    const { pressed: l, defaultPressed: s, onPressedChange: d, ...c } = n, [m, i] = U({
      prop: l,
      onChange: d,
      defaultProp: s ?? false,
      caller: Q
    });
    return e.jsx(W.button, {
      type: "button",
      "aria-pressed": m,
      "data-state": m ? "on" : "off",
      "data-disabled": n.disabled ? "" : void 0,
      ...c,
      ref: o,
      onClick: se(n.onClick, () => {
        n.disabled || i(!m);
      })
    });
  });
  X.displayName = Q;
  var x = "ToggleGroup", [Z, Pe] = ie(x, [
    K
  ]), ee = K(), $ = u.forwardRef((n, o) => {
    const { type: l, ...s } = n;
    if (l === "single") {
      const d = s;
      return e.jsx(Se, {
        ...d,
        ref: o
      });
    }
    if (l === "multiple") {
      const d = s;
      return e.jsx(xe, {
        ...d,
        ref: o
      });
    }
    throw new Error(`Missing prop \`type\` expected on \`${x}\``);
  });
  $.displayName = x;
  var [te, ne] = Z(x), Se = u.forwardRef((n, o) => {
    const { value: l, defaultValue: s, onValueChange: d = () => {
    }, ...c } = n, [m, i] = U({
      prop: l,
      defaultProp: s ?? "",
      onChange: d,
      caller: x
    });
    return e.jsx(te, {
      scope: n.__scopeToggleGroup,
      type: "single",
      value: u.useMemo(() => m ? [
        m
      ] : [], [
        m
      ]),
      onItemActivate: i,
      onItemDeactivate: u.useCallback(() => i(""), [
        i
      ]),
      children: e.jsx(oe, {
        ...c,
        ref: o
      })
    });
  }), xe = u.forwardRef((n, o) => {
    const { value: l, defaultValue: s, onValueChange: d = () => {
    }, ...c } = n, [m, i] = U({
      prop: l,
      defaultProp: s ?? [],
      onChange: d,
      caller: x
    }), g = u.useCallback((S) => i((p = []) => [
      ...p,
      S
    ]), [
      i
    ]), C = u.useCallback((S) => i((p = []) => p.filter((ae) => ae !== S)), [
      i
    ]);
    return e.jsx(te, {
      scope: n.__scopeToggleGroup,
      type: "multiple",
      value: m,
      onItemActivate: g,
      onItemDeactivate: C,
      children: e.jsx(oe, {
        ...c,
        ref: o
      })
    });
  });
  $.displayName = x;
  var [Ce, he] = Z(x), oe = u.forwardRef((n, o) => {
    const { __scopeToggleGroup: l, disabled: s = false, rovingFocus: d = true, orientation: c, dir: m, loop: i = true, ...g } = n, C = ee(l), S = de(m), p = {
      role: "group",
      dir: S,
      ...g
    };
    return e.jsx(Ce, {
      scope: l,
      rovingFocus: d,
      disabled: s,
      children: d ? e.jsx(ve, {
        asChild: true,
        ...C,
        orientation: c,
        dir: S,
        loop: i,
        children: e.jsx(W.div, {
          ...p,
          ref: o
        })
      }) : e.jsx(W.div, {
        ...p,
        ref: o
      })
    });
  }), H = "ToggleGroupItem", re = u.forwardRef((n, o) => {
    const l = ne(H, n.__scopeToggleGroup), s = he(H, n.__scopeToggleGroup), d = ee(n.__scopeToggleGroup), c = l.value.includes(n.value), m = s.disabled || n.disabled, i = {
      ...n,
      pressed: c,
      disabled: m
    }, g = u.useRef(null);
    return s.rovingFocus ? e.jsx(pe, {
      asChild: true,
      ...d,
      focusable: !m,
      active: c,
      ref: g,
      children: e.jsx(Y, {
        ...i,
        ref: o
      })
    }) : e.jsx(Y, {
      ...i,
      ref: o
    });
  });
  re.displayName = H;
  var Y = u.forwardRef((n, o) => {
    const { __scopeToggleGroup: l, value: s, ...d } = n, c = ne(H, l), m = {
      role: "radio",
      "aria-checked": n.pressed,
      "aria-pressed": void 0
    }, i = c.type === "single" ? m : void 0;
    return e.jsx(X, {
      ...i,
      ...d,
      ref: o,
      onPressedChange: (g) => {
        g ? c.onItemActivate(s) : c.onItemDeactivate(s);
      }
    });
  }), Ie = $, je = re;
  const fe = [
    "1",
    "2",
    "3"
  ], ye = [
    "surface",
    "classic"
  ], be = {
    disabled: {
      type: "boolean",
      className: "disabled",
      default: false
    },
    size: {
      type: "enum",
      className: "rt-r-size",
      values: fe,
      default: "2",
      responsive: true
    },
    variant: {
      type: "enum",
      className: "rt-variant",
      values: ye,
      default: "surface"
    },
    ...me
  }, le = {
    Item: je,
    Root: Ie
  }, r = v.forwardRef((n, o) => {
    const { className: l, children: s, radius: d, value: c, defaultValue: m, onValueChange: i, ...g } = ce(n, be, ue), [C, S] = U({
      prop: c,
      onChange: i,
      defaultProp: m ?? ""
    });
    return e.jsxs(le.Root, {
      "data-disabled": n.disabled || void 0,
      "data-radius": d,
      ref: o,
      className: J("rt-SegmentedControlRoot", l),
      onValueChange: (p) => {
        p && S(p);
      },
      ...g,
      type: "single",
      value: C,
      asChild: false,
      disabled: !!n.disabled,
      children: [
        s,
        e.jsx("div", {
          className: "rt-SegmentedControlIndicator"
        })
      ]
    });
  });
  r.displayName = "SegmentedControl.Root";
  const t = v.forwardRef(({ children: n, className: o, ...l }, s) => e.jsxs(le.Item, {
    ref: s,
    className: J("rt-reset", "rt-SegmentedControlItem", o),
    ...l,
    disabled: false,
    asChild: false,
    children: [
      e.jsx("span", {
        className: "rt-SegmentedControlItemSeparator"
      }),
      e.jsxs("span", {
        className: "rt-SegmentedControlItemLabel",
        children: [
          e.jsx("span", {
            className: "rt-SegmentedControlItemLabelActive",
            children: n
          }),
          e.jsx("span", {
            className: "rt-SegmentedControlItemLabelInactive",
            "aria-hidden": true,
            children: n
          })
        ]
      })
    ]
  }));
  t.displayName = "SegmentedControl.Item";
  r.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "SegmentedControl.Root",
    props: {
      value: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      defaultValue: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      }
    },
    composes: [
      "ComponentPropsWithout"
    ]
  };
  t.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "SegmentedControl.Item",
    props: {
      value: {
        required: true,
        tsType: {
          name: "string"
        },
        description: ""
      }
    },
    composes: [
      "ComponentPropsWithout"
    ]
  };
  _e = {
    title: "Base/SegmentedControl",
    component: r,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (n) => e.jsx(ge, {
        children: e.jsx("div", {
          style: {
            padding: "20px"
          },
          children: e.jsx(n, {})
        })
      })
    ],
    argTypes: {
      size: {
        control: "select",
        options: [
          "1",
          "2",
          "3"
        ],
        description: "Segmented control size"
      },
      variant: {
        control: "select",
        options: [
          "classic",
          "surface"
        ],
        description: "Segmented control variant"
      },
      color: {
        control: "select",
        options: [
          "gray",
          "gold",
          "bronze",
          "brown",
          "yellow",
          "amber",
          "orange",
          "tomato",
          "red",
          "ruby",
          "crimson",
          "pink",
          "plum",
          "purple",
          "violet",
          "iris",
          "indigo",
          "blue",
          "cyan",
          "teal",
          "jade",
          "green",
          "grass",
          "lime",
          "mint",
          "sky"
        ],
        description: "Segmented control color"
      },
      radius: {
        control: "select",
        options: [
          "none",
          "small",
          "medium",
          "large",
          "full"
        ],
        description: "Border radius"
      },
      highContrast: {
        control: "boolean",
        description: "High contrast mode"
      }
    },
    args: {
      size: "2",
      variant: "surface",
      defaultValue: "option1"
    }
  };
  h = {
    render: (n) => e.jsxs(r, {
      ...n,
      children: [
        e.jsx(t, {
          value: "option1",
          children: "Option 1"
        }),
        e.jsx(t, {
          value: "option2",
          children: "Option 2"
        }),
        e.jsx(t, {
          value: "option3",
          children: "Option 3"
        })
      ]
    })
  };
  I = {
    render: (n) => e.jsxs(r, {
      size: "1",
      defaultValue: "small",
      children: [
        e.jsx(t, {
          value: "small",
          children: "Small"
        }),
        e.jsx(t, {
          value: "medium",
          children: "Medium"
        }),
        e.jsx(t, {
          value: "large",
          children: "Large"
        })
      ]
    })
  };
  j = {
    render: (n) => e.jsxs(r, {
      size: "2",
      defaultValue: "medium",
      children: [
        e.jsx(t, {
          value: "small",
          children: "Small"
        }),
        e.jsx(t, {
          value: "medium",
          children: "Medium"
        }),
        e.jsx(t, {
          value: "large",
          children: "Large"
        })
      ]
    })
  };
  f = {
    render: (n) => e.jsxs(r, {
      size: "3",
      defaultValue: "large",
      children: [
        e.jsx(t, {
          value: "small",
          children: "Small"
        }),
        e.jsx(t, {
          value: "medium",
          children: "Medium"
        }),
        e.jsx(t, {
          value: "large",
          children: "Large"
        })
      ]
    })
  };
  y = {
    render: (n) => e.jsxs(r, {
      variant: "classic",
      defaultValue: "classic",
      children: [
        e.jsx(t, {
          value: "classic",
          children: "Classic"
        }),
        e.jsx(t, {
          value: "modern",
          children: "Modern"
        }),
        e.jsx(t, {
          value: "minimal",
          children: "Minimal"
        })
      ]
    })
  };
  b = {
    render: (n) => e.jsxs(r, {
      variant: "surface",
      defaultValue: "surface",
      children: [
        e.jsx(t, {
          value: "surface",
          children: "Surface"
        }),
        e.jsx(t, {
          value: "elevated",
          children: "Elevated"
        }),
        e.jsx(t, {
          value: "flat",
          children: "Flat"
        })
      ]
    })
  };
  T = {
    render: (n) => e.jsxs(r, {
      color: "blue",
      defaultValue: "option1",
      children: [
        e.jsx(t, {
          value: "option1",
          children: "Blue Option"
        }),
        e.jsx(t, {
          value: "option2",
          children: "Another"
        }),
        e.jsx(t, {
          value: "option3",
          children: "Third"
        })
      ]
    })
  };
  R = {
    render: (n) => e.jsxs(r, {
      color: "green",
      defaultValue: "option1",
      children: [
        e.jsx(t, {
          value: "option1",
          children: "Green Option"
        }),
        e.jsx(t, {
          value: "option2",
          children: "Another"
        }),
        e.jsx(t, {
          value: "option3",
          children: "Third"
        })
      ]
    })
  };
  z = {
    render: (n) => e.jsxs(r, {
      color: "purple",
      defaultValue: "option1",
      children: [
        e.jsx(t, {
          value: "option1",
          children: "Purple Option"
        }),
        e.jsx(t, {
          value: "option2",
          children: "Another"
        }),
        e.jsx(t, {
          value: "option3",
          children: "Third"
        })
      ]
    })
  };
  V = {
    render: (n) => e.jsxs(r, {
      color: "red",
      defaultValue: "option1",
      children: [
        e.jsx(t, {
          value: "option1",
          children: "Red Option"
        }),
        e.jsx(t, {
          value: "option2",
          children: "Another"
        }),
        e.jsx(t, {
          value: "option3",
          children: "Third"
        })
      ]
    })
  };
  w = {
    render: (n) => e.jsxs(r, {
      radius: "none",
      defaultValue: "option1",
      children: [
        e.jsx(t, {
          value: "option1",
          children: "Square"
        }),
        e.jsx(t, {
          value: "option2",
          children: "Corners"
        }),
        e.jsx(t, {
          value: "option3",
          children: "Sharp"
        })
      ]
    })
  };
  k = {
    render: (n) => e.jsxs(r, {
      radius: "small",
      defaultValue: "option1",
      children: [
        e.jsx(t, {
          value: "option1",
          children: "Small"
        }),
        e.jsx(t, {
          value: "option2",
          children: "Radius"
        }),
        e.jsx(t, {
          value: "option3",
          children: "Rounded"
        })
      ]
    })
  };
  P = {
    render: (n) => e.jsxs(r, {
      radius: "full",
      defaultValue: "option1",
      children: [
        e.jsx(t, {
          value: "option1",
          children: "Fully"
        }),
        e.jsx(t, {
          value: "option2",
          children: "Rounded"
        }),
        e.jsx(t, {
          value: "option3",
          children: "Pills"
        })
      ]
    })
  };
  _ = {
    render: (n) => e.jsxs(r, {
      highContrast: true,
      defaultValue: "option1",
      children: [
        e.jsx(t, {
          value: "option1",
          children: "High"
        }),
        e.jsx(t, {
          value: "option2",
          children: "Contrast"
        }),
        e.jsx(t, {
          value: "option3",
          children: "Mode"
        })
      ]
    })
  };
  B = {
    render: () => e.jsxs(q, {
      direction: "column",
      gap: "4",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(a, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Size 1"
            }),
            e.jsxs(r, {
              size: "1",
              defaultValue: "option1",
              children: [
                e.jsx(t, {
                  value: "option1",
                  children: "First"
                }),
                e.jsx(t, {
                  value: "option2",
                  children: "Second"
                }),
                e.jsx(t, {
                  value: "option3",
                  children: "Third"
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(a, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Size 2"
            }),
            e.jsxs(r, {
              size: "2",
              defaultValue: "option1",
              children: [
                e.jsx(t, {
                  value: "option1",
                  children: "First"
                }),
                e.jsx(t, {
                  value: "option2",
                  children: "Second"
                }),
                e.jsx(t, {
                  value: "option3",
                  children: "Third"
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(a, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Size 3"
            }),
            e.jsxs(r, {
              size: "3",
              defaultValue: "option1",
              children: [
                e.jsx(t, {
                  value: "option1",
                  children: "First"
                }),
                e.jsx(t, {
                  value: "option2",
                  children: "Second"
                }),
                e.jsx(t, {
                  value: "option3",
                  children: "Third"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  A = {
    render: () => e.jsxs(q, {
      direction: "column",
      gap: "4",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(a, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Classic"
            }),
            e.jsxs(r, {
              variant: "classic",
              defaultValue: "option1",
              children: [
                e.jsx(t, {
                  value: "option1",
                  children: "First"
                }),
                e.jsx(t, {
                  value: "option2",
                  children: "Second"
                }),
                e.jsx(t, {
                  value: "option3",
                  children: "Third"
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(a, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Surface"
            }),
            e.jsxs(r, {
              variant: "surface",
              defaultValue: "option1",
              children: [
                e.jsx(t, {
                  value: "option1",
                  children: "First"
                }),
                e.jsx(t, {
                  value: "option2",
                  children: "Second"
                }),
                e.jsx(t, {
                  value: "option3",
                  children: "Third"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  G = {
    render: () => {
      const [n, o] = v.useState("grid");
      return e.jsxs("div", {
        children: [
          e.jsx(a, {
            size: "3",
            weight: "bold",
            style: {
              marginBottom: "12px",
              display: "block"
            },
            children: "View Options"
          }),
          e.jsxs(r, {
            value: n,
            onValueChange: o,
            children: [
              e.jsx(t, {
                value: "grid",
                children: "\u{1F4CB} Grid"
              }),
              e.jsx(t, {
                value: "list",
                children: "\u{1F4C4} List"
              }),
              e.jsx(t, {
                value: "card",
                children: "\u{1F5C3}\uFE0F Cards"
              })
            ]
          }),
          e.jsx("div", {
            style: {
              marginTop: "16px",
              padding: "16px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px",
              backgroundColor: "#fafbfc"
            },
            children: e.jsxs(a, {
              size: "2",
              children: [
                "Currently viewing in ",
                e.jsx("strong", {
                  children: n
                }),
                " mode"
              ]
            })
          })
        ]
      });
    }
  };
  F = {
    render: () => {
      const [n, o] = v.useState("active");
      return e.jsxs("div", {
        children: [
          e.jsx(a, {
            size: "3",
            weight: "bold",
            style: {
              marginBottom: "12px",
              display: "block"
            },
            children: "Task Status Filter"
          }),
          e.jsxs(r, {
            value: n,
            onValueChange: o,
            color: "blue",
            children: [
              e.jsx(t, {
                value: "all",
                children: "\u{1F4CA} All (24)"
              }),
              e.jsx(t, {
                value: "active",
                children: "\u26A1 Active (8)"
              }),
              e.jsx(t, {
                value: "completed",
                children: "\u2705 Done (12)"
              }),
              e.jsx(t, {
                value: "pending",
                children: "\u23F3 Pending (4)"
              })
            ]
          }),
          e.jsx("div", {
            style: {
              marginTop: "16px",
              padding: "16px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px"
            },
            children: e.jsxs(a, {
              size: "2",
              children: [
                "Showing",
                " ",
                e.jsx("strong", {
                  children: n === "all" ? "all tasks" : `${n} tasks`
                })
              ]
            })
          })
        ]
      });
    }
  };
  M = {
    render: () => {
      const [n, o] = v.useState("week");
      return e.jsxs("div", {
        children: [
          e.jsx(a, {
            size: "3",
            weight: "bold",
            style: {
              marginBottom: "12px",
              display: "block"
            },
            children: "Analytics Period"
          }),
          e.jsxs(r, {
            value: n,
            onValueChange: o,
            size: "1",
            children: [
              e.jsx(t, {
                value: "day",
                children: "Day"
              }),
              e.jsx(t, {
                value: "week",
                children: "Week"
              }),
              e.jsx(t, {
                value: "month",
                children: "Month"
              }),
              e.jsx(t, {
                value: "year",
                children: "Year"
              })
            ]
          }),
          e.jsxs("div", {
            style: {
              marginTop: "16px",
              padding: "20px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px",
              textAlign: "center"
            },
            children: [
              e.jsx(a, {
                size: "4",
                weight: "bold",
                style: {
                  display: "block",
                  marginBottom: "8px"
                },
                children: "1,234"
              }),
              e.jsxs(a, {
                size: "2",
                color: "gray",
                children: [
                  "Total views this ",
                  n
                ]
              })
            ]
          })
        ]
      });
    }
  };
  N = {
    render: () => {
      const [n, o] = v.useState("light");
      return e.jsxs("div", {
        children: [
          e.jsx(a, {
            size: "3",
            weight: "bold",
            style: {
              marginBottom: "12px",
              display: "block"
            },
            children: "Theme Selection"
          }),
          e.jsxs(r, {
            value: n,
            onValueChange: o,
            color: "purple",
            children: [
              e.jsx(t, {
                value: "light",
                children: "\u2600\uFE0F Light"
              }),
              e.jsx(t, {
                value: "dark",
                children: "\u{1F319} Dark"
              }),
              e.jsx(t, {
                value: "auto",
                children: "\u{1F504} Auto"
              })
            ]
          }),
          e.jsx("div", {
            style: {
              marginTop: "16px",
              padding: "16px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px",
              backgroundColor: n === "dark" ? "#1f2937" : n === "light" ? "#ffffff" : "#f3f4f6",
              color: n === "dark" ? "#f9fafb" : "#111827"
            },
            children: e.jsxs(a, {
              size: "2",
              children: [
                "Preview of ",
                e.jsx("strong", {
                  children: n
                }),
                " theme"
              ]
            })
          })
        ]
      });
    }
  };
  O = {
    render: () => {
      const [n, o] = v.useState("medium"), l = {
        low: "green",
        medium: "yellow",
        high: "orange",
        urgent: "red"
      };
      return e.jsxs("div", {
        children: [
          e.jsx(a, {
            size: "3",
            weight: "bold",
            style: {
              marginBottom: "12px",
              display: "block"
            },
            children: "Set Priority"
          }),
          e.jsxs(r, {
            value: n,
            onValueChange: o,
            color: l[n],
            children: [
              e.jsx(t, {
                value: "low",
                children: "\u{1F7E2} Low"
              }),
              e.jsx(t, {
                value: "medium",
                children: "\u{1F7E1} Medium"
              }),
              e.jsx(t, {
                value: "high",
                children: "\u{1F7E0} High"
              }),
              e.jsx(t, {
                value: "urgent",
                children: "\u{1F534} Urgent"
              })
            ]
          }),
          e.jsx("div", {
            style: {
              marginTop: "16px",
              padding: "16px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px"
            },
            children: e.jsxs(a, {
              size: "2",
              children: [
                "Task priority set to ",
                e.jsx("strong", {
                  children: n
                })
              ]
            })
          })
        ]
      });
    }
  };
  L = {
    render: () => {
      const [n, o] = v.useState("overview"), l = {
        overview: "Overview dashboard with key metrics and recent activity.",
        analytics: "Detailed analytics and performance charts.",
        users: "User management and access control settings.",
        settings: "Application configuration and preferences."
      };
      return e.jsxs("div", {
        style: {
          maxWidth: "500px"
        },
        children: [
          e.jsxs(r, {
            value: n,
            onValueChange: o,
            size: "2",
            children: [
              e.jsx(t, {
                value: "overview",
                children: "\u{1F4CA} Overview"
              }),
              e.jsx(t, {
                value: "analytics",
                children: "\u{1F4C8} Analytics"
              }),
              e.jsx(t, {
                value: "users",
                children: "\u{1F465} Users"
              }),
              e.jsx(t, {
                value: "settings",
                children: "\u2699\uFE0F Settings"
              })
            ]
          }),
          e.jsxs("div", {
            style: {
              marginTop: "20px",
              padding: "24px",
              border: "1px solid #e1e5e9",
              borderRadius: "8px",
              backgroundColor: "#fafbfc"
            },
            children: [
              e.jsx(a, {
                size: "3",
                weight: "bold",
                style: {
                  marginBottom: "12px",
                  display: "block"
                },
                children: n.charAt(0).toUpperCase() + n.slice(1)
              }),
              e.jsx(a, {
                size: "2",
                style: {
                  lineHeight: "1.5"
                },
                children: l[n]
              })
            ]
          })
        ]
      });
    }
  };
  D = {
    render: () => e.jsxs(q, {
      direction: "column",
      gap: "4",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(a, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Toggle View"
            }),
            e.jsxs(r, {
              defaultValue: "on",
              children: [
                e.jsx(t, {
                  value: "on",
                  children: "\u2705 On"
                }),
                e.jsx(t, {
                  value: "off",
                  children: "\u274C Off"
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(a, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Edit Mode"
            }),
            e.jsxs(r, {
              defaultValue: "view",
              color: "blue",
              children: [
                e.jsx(t, {
                  value: "view",
                  children: "\u{1F441}\uFE0F View"
                }),
                e.jsx(t, {
                  value: "edit",
                  children: "\u270F\uFE0F Edit"
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(a, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Layout"
            }),
            e.jsxs(r, {
              defaultValue: "horizontal",
              size: "3",
              children: [
                e.jsx(t, {
                  value: "horizontal",
                  children: "\u2194\uFE0F Horizontal"
                }),
                e.jsx(t, {
                  value: "vertical",
                  children: "\u2195\uFE0F Vertical"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  E = {
    render: () => e.jsxs("div", {
      children: [
        e.jsx(a, {
          size: "2",
          style: {
            marginBottom: "8px",
            display: "block"
          },
          children: "Chart Type"
        }),
        e.jsxs(r, {
          defaultValue: "line",
          size: "1",
          children: [
            e.jsx(t, {
              value: "line",
              children: "\u{1F4C8} Line"
            }),
            e.jsx(t, {
              value: "bar",
              children: "\u{1F4CA} Bar"
            }),
            e.jsx(t, {
              value: "pie",
              children: "\u{1F967} Pie"
            }),
            e.jsx(t, {
              value: "area",
              children: "\u{1F4C9} Area"
            }),
            e.jsx(t, {
              value: "scatter",
              children: "\u26AA Scatter"
            }),
            e.jsx(t, {
              value: "bubble",
              children: "\u{1F535} Bubble"
            })
          ]
        })
      ]
    })
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_a = h.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => <SegmentedControl.Root {...args}>
      <SegmentedControl.Item value="option1">Option 1</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Option 2</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Option 3</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_c = (_b = h.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  I.parameters = {
    ...I.parameters,
    docs: {
      ...(_d = I.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: _args => <SegmentedControl.Root size="1" defaultValue="small">
      <SegmentedControl.Item value="small">Small</SegmentedControl.Item>
      <SegmentedControl.Item value="medium">Medium</SegmentedControl.Item>
      <SegmentedControl.Item value="large">Large</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_f = (_e2 = I.parameters) == null ? void 0 : _e2.docs) == null ? void 0 : _f.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_g = j.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <SegmentedControl.Root size="2" defaultValue="medium">
      <SegmentedControl.Item value="small">Small</SegmentedControl.Item>
      <SegmentedControl.Item value="medium">Medium</SegmentedControl.Item>
      <SegmentedControl.Item value="large">Large</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_i = (_h = j.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_j = f.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: _args => <SegmentedControl.Root size="3" defaultValue="large">
      <SegmentedControl.Item value="small">Small</SegmentedControl.Item>
      <SegmentedControl.Item value="medium">Medium</SegmentedControl.Item>
      <SegmentedControl.Item value="large">Large</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_l = (_k = f.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_m = y.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: _args => <SegmentedControl.Root variant="classic" defaultValue="classic">
      <SegmentedControl.Item value="classic">Classic</SegmentedControl.Item>
      <SegmentedControl.Item value="modern">Modern</SegmentedControl.Item>
      <SegmentedControl.Item value="minimal">Minimal</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_o = (_n = y.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_p = b.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: _args => <SegmentedControl.Root variant="surface" defaultValue="surface">
      <SegmentedControl.Item value="surface">Surface</SegmentedControl.Item>
      <SegmentedControl.Item value="elevated">Elevated</SegmentedControl.Item>
      <SegmentedControl.Item value="flat">Flat</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_r = (_q = b.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_s = T.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: _args => <SegmentedControl.Root color="blue" defaultValue="option1">
      <SegmentedControl.Item value="option1">Blue Option</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Another</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_u = (_t = T.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  R.parameters = {
    ...R.parameters,
    docs: {
      ...(_v = R.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: _args => <SegmentedControl.Root color="green" defaultValue="option1">
      <SegmentedControl.Item value="option1">
        Green Option
      </SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Another</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_x = (_w = R.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_y = z.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: _args => <SegmentedControl.Root color="purple" defaultValue="option1">
      <SegmentedControl.Item value="option1">
        Purple Option
      </SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Another</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_A = (_z = z.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  V.parameters = {
    ...V.parameters,
    docs: {
      ...(_B = V.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: _args => <SegmentedControl.Root color="red" defaultValue="option1">
      <SegmentedControl.Item value="option1">Red Option</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Another</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_D = (_C = V.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_E = w.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: _args => <SegmentedControl.Root radius="none" defaultValue="option1">
      <SegmentedControl.Item value="option1">Square</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Corners</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Sharp</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_G = (_F = w.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_H = k.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: _args => <SegmentedControl.Root radius="small" defaultValue="option1">
      <SegmentedControl.Item value="option1">Small</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Radius</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Rounded</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_J = (_I = k.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  P.parameters = {
    ...P.parameters,
    docs: {
      ...(_K = P.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: _args => <SegmentedControl.Root radius="full" defaultValue="option1">
      <SegmentedControl.Item value="option1">Fully</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Rounded</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Pills</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_M = (_L = P.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  _.parameters = {
    ..._.parameters,
    docs: {
      ...(_N = _.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  render: _args => <SegmentedControl.Root highContrast defaultValue="option1">
      <SegmentedControl.Item value="option1">High</SegmentedControl.Item>
      <SegmentedControl.Item value="option2">Contrast</SegmentedControl.Item>
      <SegmentedControl.Item value="option3">Mode</SegmentedControl.Item>
    </SegmentedControl.Root>
}`,
        ...(_P = (_O = _.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_Q = B.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Size 1
        </Text>
        <SegmentedControl.Root size="1" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Size 2
        </Text>
        <SegmentedControl.Root size="2" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Size 3
        </Text>
        <SegmentedControl.Root size="3" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
    </Flex>
}`,
        ...(_S = (_R = B.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  A.parameters = {
    ...A.parameters,
    docs: {
      ...(_T = A.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" weight="medium" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Classic
        </Text>
        <SegmentedControl.Root variant="classic" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" weight="medium" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Surface
        </Text>
        <SegmentedControl.Root variant="surface" defaultValue="option1">
          <SegmentedControl.Item value="option1">First</SegmentedControl.Item>
          <SegmentedControl.Item value="option2">Second</SegmentedControl.Item>
          <SegmentedControl.Item value="option3">Third</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
    </Flex>
}`,
        ...(_V = (_U = A.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  G.parameters = {
    ...G.parameters,
    docs: {
      ...(_W = G.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  render: () => {
    const [view, setView] = React.useState("grid");
    return <div>
        <Text size="3" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          View Options
        </Text>

        <SegmentedControl.Root value={view} onValueChange={setView}>
          <SegmentedControl.Item value="grid">\u{1F4CB} Grid</SegmentedControl.Item>
          <SegmentedControl.Item value="list">\u{1F4C4} List</SegmentedControl.Item>
          <SegmentedControl.Item value="card">\u{1F5C3}\uFE0F Cards</SegmentedControl.Item>
        </SegmentedControl.Root>

        <div style={{
        marginTop: "16px",
        padding: "16px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#fafbfc"
      }}>
          <Text size="2">
            Currently viewing in <strong>{view}</strong> mode
          </Text>
        </div>
      </div>;
  }
}`,
        ...(_Y = (_X = G.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  F.parameters = {
    ...F.parameters,
    docs: {
      ...(_Z = F.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  render: () => {
    const [status, setStatus] = React.useState("active");
    return <div>
        <Text size="3" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Task Status Filter
        </Text>

        <SegmentedControl.Root value={status} onValueChange={setStatus} color="blue">
          <SegmentedControl.Item value="all">\u{1F4CA} All (24)</SegmentedControl.Item>
          <SegmentedControl.Item value="active">
            \u26A1 Active (8)
          </SegmentedControl.Item>
          <SegmentedControl.Item value="completed">
            \u2705 Done (12)
          </SegmentedControl.Item>
          <SegmentedControl.Item value="pending">
            \u23F3 Pending (4)
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <div style={{
        marginTop: "16px",
        padding: "16px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px"
      }}>
          <Text size="2">
            Showing{" "}
            <strong>
              {status === "all" ? "all tasks" : \`\${status} tasks\`}
            </strong>
          </Text>
        </div>
      </div>;
  }
}`,
        ...(_$ = (__ = F.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  M.parameters = {
    ...M.parameters,
    docs: {
      ...(_aa = M.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  render: () => {
    const [period, setPeriod] = React.useState("week");
    return <div>
        <Text size="3" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Analytics Period
        </Text>

        <SegmentedControl.Root value={period} onValueChange={setPeriod} size="1">
          <SegmentedControl.Item value="day">Day</SegmentedControl.Item>
          <SegmentedControl.Item value="week">Week</SegmentedControl.Item>
          <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
          <SegmentedControl.Item value="year">Year</SegmentedControl.Item>
        </SegmentedControl.Root>

        <div style={{
        marginTop: "16px",
        padding: "20px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        textAlign: "center"
      }}>
          <Text size="4" weight="bold" style={{
          display: "block",
          marginBottom: "8px"
        }}>
            1,234
          </Text>
          <Text size="2" color="gray">
            Total views this {period}
          </Text>
        </div>
      </div>;
  }
}`,
        ...(_ca = (_ba = M.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  N.parameters = {
    ...N.parameters,
    docs: {
      ...(_da = N.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  render: () => {
    const [theme, setTheme] = React.useState("light");
    return <div>
        <Text size="3" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Theme Selection
        </Text>

        <SegmentedControl.Root value={theme} onValueChange={setTheme} color="purple">
          <SegmentedControl.Item value="light">\u2600\uFE0F Light</SegmentedControl.Item>
          <SegmentedControl.Item value="dark">\u{1F319} Dark</SegmentedControl.Item>
          <SegmentedControl.Item value="auto">\u{1F504} Auto</SegmentedControl.Item>
        </SegmentedControl.Root>

        <div style={{
        marginTop: "16px",
        padding: "16px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: theme === "dark" ? "#1f2937" : theme === "light" ? "#ffffff" : "#f3f4f6",
        color: theme === "dark" ? "#f9fafb" : "#111827"
      }}>
          <Text size="2">
            Preview of <strong>{theme}</strong> theme
          </Text>
        </div>
      </div>;
  }
}`,
        ...(_fa = (_ea = N.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  O.parameters = {
    ...O.parameters,
    docs: {
      ...(_ga = O.parameters) == null ? void 0 : _ga.docs,
      source: {
        originalSource: `{
  render: () => {
    const [priority, setPriority] = React.useState("medium");
    const priorityColors = {
      low: "green",
      medium: "yellow",
      high: "orange",
      urgent: "red"
    };
    return <div>
        <Text size="3" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Set Priority
        </Text>

        <SegmentedControl.Root value={priority} onValueChange={setPriority} color={priorityColors[priority]}>
          <SegmentedControl.Item value="low">\u{1F7E2} Low</SegmentedControl.Item>
          <SegmentedControl.Item value="medium">
            \u{1F7E1} Medium
          </SegmentedControl.Item>
          <SegmentedControl.Item value="high">\u{1F7E0} High</SegmentedControl.Item>
          <SegmentedControl.Item value="urgent">
            \u{1F534} Urgent
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <div style={{
        marginTop: "16px",
        padding: "16px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px"
      }}>
          <Text size="2">
            Task priority set to <strong>{priority}</strong>
          </Text>
        </div>
      </div>;
  }
}`,
        ...(_ia = (_ha = O.parameters) == null ? void 0 : _ha.docs) == null ? void 0 : _ia.source
      }
    }
  };
  L.parameters = {
    ...L.parameters,
    docs: {
      ...(_ja = L.parameters) == null ? void 0 : _ja.docs,
      source: {
        originalSource: `{
  render: () => {
    const [activeTab, setActiveTab] = React.useState("overview");
    const tabContent = {
      overview: "Overview dashboard with key metrics and recent activity.",
      analytics: "Detailed analytics and performance charts.",
      users: "User management and access control settings.",
      settings: "Application configuration and preferences."
    };
    return <div style={{
      maxWidth: "500px"
    }}>
        <SegmentedControl.Root value={activeTab} onValueChange={setActiveTab} size="2">
          <SegmentedControl.Item value="overview">
            \u{1F4CA} Overview
          </SegmentedControl.Item>
          <SegmentedControl.Item value="analytics">
            \u{1F4C8} Analytics
          </SegmentedControl.Item>
          <SegmentedControl.Item value="users">\u{1F465} Users</SegmentedControl.Item>
          <SegmentedControl.Item value="settings">
            \u2699\uFE0F Settings
          </SegmentedControl.Item>
        </SegmentedControl.Root>

        <div style={{
        marginTop: "20px",
        padding: "24px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#fafbfc"
      }}>
          <Text size="3" weight="bold" style={{
          marginBottom: "12px",
          display: "block"
        }}>
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </Text>
          <Text size="2" style={{
          lineHeight: "1.5"
        }}>
            {tabContent[activeTab]}
          </Text>
        </div>
      </div>;
  }
}`,
        ...(_la = (_ka = L.parameters) == null ? void 0 : _ka.docs) == null ? void 0 : _la.source
      }
    }
  };
  D.parameters = {
    ...D.parameters,
    docs: {
      ...(_ma = D.parameters) == null ? void 0 : _ma.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Toggle View
        </Text>
        <SegmentedControl.Root defaultValue="on">
          <SegmentedControl.Item value="on">\u2705 On</SegmentedControl.Item>
          <SegmentedControl.Item value="off">\u274C Off</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Edit Mode
        </Text>
        <SegmentedControl.Root defaultValue="view" color="blue">
          <SegmentedControl.Item value="view">\u{1F441}\uFE0F View</SegmentedControl.Item>
          <SegmentedControl.Item value="edit">\u270F\uFE0F Edit</SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>

      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Layout
        </Text>
        <SegmentedControl.Root defaultValue="horizontal" size="3">
          <SegmentedControl.Item value="horizontal">
            \u2194\uFE0F Horizontal
          </SegmentedControl.Item>
          <SegmentedControl.Item value="vertical">
            \u2195\uFE0F Vertical
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </div>
    </Flex>
}`,
        ...(_oa = (_na = D.parameters) == null ? void 0 : _na.docs) == null ? void 0 : _oa.source
      }
    }
  };
  E.parameters = {
    ...E.parameters,
    docs: {
      ...(_pa = E.parameters) == null ? void 0 : _pa.docs,
      source: {
        originalSource: `{
  render: () => <div>
      <Text size="2" style={{
      marginBottom: "8px",
      display: "block"
    }}>
        Chart Type
      </Text>
      <SegmentedControl.Root defaultValue="line" size="1">
        <SegmentedControl.Item value="line">\u{1F4C8} Line</SegmentedControl.Item>
        <SegmentedControl.Item value="bar">\u{1F4CA} Bar</SegmentedControl.Item>
        <SegmentedControl.Item value="pie">\u{1F967} Pie</SegmentedControl.Item>
        <SegmentedControl.Item value="area">\u{1F4C9} Area</SegmentedControl.Item>
        <SegmentedControl.Item value="scatter">
          \u26AA Scatter
        </SegmentedControl.Item>
        <SegmentedControl.Item value="bubble">\u{1F535} Bubble</SegmentedControl.Item>
      </SegmentedControl.Root>
    </div>
}`,
        ...(_ra = (_qa = E.parameters) == null ? void 0 : _qa.docs) == null ? void 0 : _ra.source
      }
    }
  };
  Be = [
    "Default",
    "Size1",
    "Size2",
    "Size3",
    "Classic",
    "Surface",
    "ColorBlue",
    "ColorGreen",
    "ColorPurple",
    "ColorRed",
    "RadiusNone",
    "RadiusSmall",
    "RadiusFull",
    "HighContrast",
    "AllSizes",
    "AllVariants",
    "ViewSwitcher",
    "StatusFilter",
    "TimePeriodSelector",
    "ThemeSelector",
    "PrioritySelector",
    "TabNavigation",
    "TwoItems",
    "ManyItems"
  ];
});
export {
  B as AllSizes,
  A as AllVariants,
  y as Classic,
  T as ColorBlue,
  R as ColorGreen,
  z as ColorPurple,
  V as ColorRed,
  h as Default,
  _ as HighContrast,
  E as ManyItems,
  O as PrioritySelector,
  P as RadiusFull,
  w as RadiusNone,
  k as RadiusSmall,
  I as Size1,
  j as Size2,
  f as Size3,
  F as StatusFilter,
  b as Surface,
  L as TabNavigation,
  N as ThemeSelector,
  M as TimePeriodSelector,
  D as TwoItems,
  G as ViewSwitcher,
  Be as __namedExportsOrder,
  __tla,
  _e as default
};
