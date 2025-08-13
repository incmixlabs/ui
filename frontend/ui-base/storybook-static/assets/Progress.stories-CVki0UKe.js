import { r as p, j as e, c as K, P as L, y as Y, q as Z, s as ee, v as re, X as se, l as ne, w as oe, T as ae, a as s, F as d, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { B as Q, __tla as __tla_1 } from "./button-BF2Wetgg.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_2 } from "./base-button-BHQkXpSv.js";
let R, I, N, h, B, C, w, k, T, u, F, z, f, _, D, E, P, x, v, y, A, b, j, S, fe, Pe;
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra;
  var $ = "Progress", M = 100, [te, ze] = K($), [ie, le] = te($), O = p.forwardRef((r, n) => {
    const { __scopeProgress: t, value: l = null, max: i, getValueLabel: g = ce, ...m } = r;
    (i || i === 0) && !H(i) && console.error(de(`${i}`, "Progress"));
    const a = H(i) ? i : M;
    l !== null && !W(l, a) && console.error(pe(`${l}`, "Progress"));
    const c = W(l, a) ? l : null, U = V(c) ? g(c, a) : void 0;
    return e.jsx(ie, {
      scope: t,
      value: c,
      max: a,
      children: e.jsx(L.div, {
        "aria-valuemax": a,
        "aria-valuemin": 0,
        "aria-valuenow": V(c) ? c : void 0,
        "aria-valuetext": U,
        role: "progressbar",
        "data-state": J(c, a),
        "data-value": c ?? void 0,
        "data-max": a,
        ...m,
        ref: n
      })
    });
  });
  O.displayName = $;
  var q = "ProgressIndicator", X = p.forwardRef((r, n) => {
    const { __scopeProgress: t, ...l } = r, i = le(q, t);
    return e.jsx(L.div, {
      "data-state": J(i.value, i.max),
      "data-value": i.value ?? void 0,
      "data-max": i.max,
      ...l,
      ref: n
    });
  });
  X.displayName = q;
  function ce(r, n) {
    return `${Math.round(r / n * 100)}%`;
  }
  function J(r, n) {
    return r == null ? "indeterminate" : r === n ? "complete" : "loading";
  }
  function V(r) {
    return typeof r == "number";
  }
  function H(r) {
    return V(r) && !isNaN(r) && r > 0;
  }
  function W(r, n) {
    return V(r) && !isNaN(r) && r <= n && r >= 0;
  }
  function de(r, n) {
    return `Invalid prop \`max\` of value \`${r}\` supplied to \`${n}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${M}\`.`;
  }
  function pe(r, n) {
    return `Invalid prop \`value\` of value \`${r}\` supplied to \`${n}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${M} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
  }
  var me = O, ge = X;
  const ue = [
    "1",
    "2",
    "3"
  ], xe = [
    "classic",
    "surface",
    "soft"
  ], ve = {
    size: {
      type: "enum",
      className: "rt-r-size",
      values: ue,
      default: "2",
      responsive: true
    },
    variant: {
      type: "enum",
      className: "rt-variant",
      values: xe,
      default: "surface"
    },
    ...ee,
    ...Z,
    ...Y,
    duration: {
      type: "string"
    }
  }, G = {
    Root: me,
    Indicator: ge
  }, o = p.forwardRef((r, n) => {
    const { className: t, style: l, color: i, radius: g, duration: m, ...a } = re(r, ve, oe);
    return e.jsx(G.Root, {
      "data-accent-color": i,
      "data-radius": g,
      ref: n,
      className: ne("rt-ProgressRoot", t),
      style: se({
        "--progress-duration": "value" in a ? void 0 : m,
        "--progress-value": "value" in a ? a.value : void 0,
        "--progress-max": "max" in a ? a.max : void 0
      }, l),
      ...a,
      asChild: false,
      children: e.jsx(G.Indicator, {
        className: "rt-ProgressIndicator"
      })
    });
  });
  o.displayName = "Progress";
  o.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Progress",
    props: {
      duration: {
        required: false,
        tsType: {
          name: "union",
          raw: "`${number}s` | `${number}ms`",
          elements: [
            {
              name: "literal",
              value: "`${number}s`"
            },
            {
              name: "literal",
              value: "`${number}ms`"
            }
          ]
        },
        description: ""
      }
    },
    composes: [
      "ComponentPropsWithout"
    ]
  };
  Pe = {
    title: "Base/Progress",
    component: o,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (r) => e.jsx(ae, {
        children: e.jsx("div", {
          style: {
            width: "300px",
            padding: "20px"
          },
          children: e.jsx(r, {})
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
        description: "Progress bar size"
      },
      variant: {
        control: "select",
        options: [
          "classic",
          "surface",
          "soft"
        ],
        description: "Progress bar variant style"
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
        description: "Progress bar accent color"
      },
      highContrast: {
        control: "boolean",
        description: "High contrast mode"
      },
      value: {
        control: "number",
        min: 0,
        max: 100,
        description: "Progress value (0-100)"
      },
      max: {
        control: "number",
        description: "Maximum value"
      }
    },
    args: {
      size: "2",
      variant: "surface",
      value: 50,
      max: 100
    }
  };
  u = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsxs(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: [
            "Default Progress (",
            r.value,
            "%)"
          ]
        }),
        e.jsx(o, {
          ...r
        })
      ]
    })
  };
  x = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "1",
          style: {
            marginBottom: "8px",
            display: "block"
          },
          children: "Size 1 (Small) - 25%"
        }),
        e.jsx(o, {
          size: "1",
          value: 25
        })
      ]
    })
  };
  v = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "10px",
            display: "block"
          },
          children: "Size 2 (Default) - 50%"
        }),
        e.jsx(o, {
          size: "2",
          value: 50
        })
      ]
    })
  };
  y = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "3",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Size 3 (Large) - 75%"
        }),
        e.jsx(o, {
          size: "3",
          value: 75
        })
      ]
    })
  };
  h = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Classic Variant - 60%"
        }),
        e.jsx(o, {
          variant: "classic",
          value: 60
        })
      ]
    })
  };
  j = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Surface Variant - 60%"
        }),
        e.jsx(o, {
          variant: "surface",
          value: 60
        })
      ]
    })
  };
  b = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Soft Variant - 60%"
        }),
        e.jsx(o, {
          variant: "soft",
          value: 60
        })
      ]
    })
  };
  z = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Empty Progress - 0%"
        }),
        e.jsx(o, {
          value: 0
        })
      ]
    })
  };
  P = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Quarter Progress - 25%"
        }),
        e.jsx(o, {
          value: 25
        })
      ]
    })
  };
  f = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Half Progress - 50%"
        }),
        e.jsx(o, {
          value: 50
        })
      ]
    })
  };
  S = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Three Quarters Progress - 75%"
        }),
        e.jsx(o, {
          value: 75
        })
      ]
    })
  };
  T = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Complete Progress - 100%"
        }),
        e.jsx(o, {
          value: 100
        })
      ]
    })
  };
  B = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Blue Color - 70%"
        }),
        e.jsx(o, {
          color: "blue",
          value: 70
        })
      ]
    })
  };
  k = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Red Color - 70%"
        }),
        e.jsx(o, {
          color: "red",
          value: 70
        })
      ]
    })
  };
  C = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Green Color - 70%"
        }),
        e.jsx(o, {
          color: "green",
          value: 70
        })
      ]
    })
  };
  w = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Purple Color - 70%"
        }),
        e.jsx(o, {
          color: "purple",
          value: 70
        })
      ]
    })
  };
  _ = {
    render: (r) => e.jsxs("div", {
      children: [
        e.jsx(s, {
          size: "2",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "High Contrast Mode - 60%"
        }),
        e.jsx(o, {
          highContrast: true,
          value: 60
        })
      ]
    })
  };
  R = {
    render: () => e.jsxs(d, {
      direction: "column",
      gap: "4",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(s, {
              size: "1",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Size 1"
            }),
            e.jsx(o, {
              size: "1",
              value: 30
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(s, {
              size: "2",
              style: {
                marginBottom: "10px",
                display: "block"
              },
              children: "Size 2"
            }),
            e.jsx(o, {
              size: "2",
              value: 50
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(s, {
              size: "3",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Size 3"
            }),
            e.jsx(o, {
              size: "3",
              value: 70
            })
          ]
        })
      ]
    })
  };
  I = {
    render: () => e.jsxs(d, {
      direction: "column",
      gap: "4",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(s, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Classic"
            }),
            e.jsx(o, {
              variant: "classic",
              value: 40
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(s, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Surface"
            }),
            e.jsx(o, {
              variant: "surface",
              value: 60
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(s, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Soft"
            }),
            e.jsx(o, {
              variant: "soft",
              value: 80
            })
          ]
        })
      ]
    })
  };
  D = {
    render: () => e.jsxs(d, {
      direction: "column",
      gap: "3",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(s, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Not Started"
            }),
            e.jsx(o, {
              value: 0
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(s, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "In Progress"
            }),
            e.jsx(o, {
              value: 35,
              color: "blue"
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(s, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Almost Done"
            }),
            e.jsx(o, {
              value: 85,
              color: "orange"
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(s, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Complete"
            }),
            e.jsx(o, {
              value: 100,
              color: "green"
            })
          ]
        })
      ]
    })
  };
  N = {
    render: () => {
      const [r, n] = p.useState(0), [t, l] = p.useState(false);
      p.useEffect(() => {
        let m;
        return t && r < 100 && (m = setInterval(() => {
          n((a) => {
            const c = a + 1;
            return c >= 100 ? (l(false), 100) : c;
          });
        }, 100)), () => clearInterval(m);
      }, [
        t,
        r
      ]);
      const i = () => {
        l(true);
      }, g = () => {
        n(0), l(false);
      };
      return e.jsxs("div", {
        children: [
          e.jsxs(s, {
            size: "2",
            weight: "medium",
            style: {
              marginBottom: "12px",
              display: "block"
            },
            children: [
              "Animated Progress - ",
              r,
              "%"
            ]
          }),
          e.jsx(o, {
            value: r,
            color: "blue",
            style: {
              marginBottom: "16px"
            }
          }),
          e.jsxs(d, {
            gap: "2",
            children: [
              e.jsx(Q, {
                onClick: i,
                disabled: t || r >= 100,
                size: "1",
                children: "Start"
              }),
              e.jsx(Q, {
                onClick: g,
                variant: "outline",
                size: "1",
                children: "Reset"
              })
            ]
          })
        ]
      });
    }
  };
  F = {
    render: () => {
      const [r] = p.useState([
        {
          name: "document.pdf",
          progress: 100,
          color: "green"
        },
        {
          name: "presentation.pptx",
          progress: 67,
          color: "blue"
        },
        {
          name: "spreadsheet.xlsx",
          progress: 23,
          color: "orange"
        },
        {
          name: "video.mp4",
          progress: 0,
          color: "gray"
        }
      ]);
      return e.jsxs("div", {
        style: {
          maxWidth: "350px"
        },
        children: [
          e.jsx(s, {
            size: "3",
            weight: "bold",
            style: {
              marginBottom: "16px",
              display: "block"
            },
            children: "Downloads"
          }),
          e.jsx(d, {
            direction: "column",
            gap: "3",
            children: r.map((n, t) => e.jsxs("div", {
              children: [
                e.jsxs(d, {
                  justify: "between",
                  align: "center",
                  style: {
                    marginBottom: "6px"
                  },
                  children: [
                    e.jsx(s, {
                      size: "2",
                      children: n.name
                    }),
                    e.jsxs(s, {
                      size: "1",
                      color: "gray",
                      children: [
                        n.progress,
                        "%"
                      ]
                    })
                  ]
                }),
                e.jsx(o, {
                  value: n.progress,
                  color: n.color,
                  size: "1"
                })
              ]
            }, t))
          })
        ]
      });
    }
  };
  A = {
    render: () => {
      const r = [
        {
          name: "React",
          level: 90,
          color: "blue"
        },
        {
          name: "TypeScript",
          level: 85,
          color: "indigo"
        },
        {
          name: "Node.js",
          level: 75,
          color: "green"
        },
        {
          name: "Python",
          level: 60,
          color: "yellow"
        },
        {
          name: "Docker",
          level: 45,
          color: "cyan"
        },
        {
          name: "GraphQL",
          level: 30,
          color: "purple"
        }
      ];
      return e.jsxs("div", {
        style: {
          maxWidth: "300px"
        },
        children: [
          e.jsx(s, {
            size: "3",
            weight: "bold",
            style: {
              marginBottom: "20px",
              display: "block"
            },
            children: "Technical Skills"
          }),
          e.jsx(d, {
            direction: "column",
            gap: "3",
            children: r.map((n, t) => e.jsxs("div", {
              children: [
                e.jsxs(d, {
                  justify: "between",
                  align: "center",
                  style: {
                    marginBottom: "8px"
                  },
                  children: [
                    e.jsx(s, {
                      size: "2",
                      weight: "medium",
                      children: n.name
                    }),
                    e.jsxs(s, {
                      size: "1",
                      color: "gray",
                      children: [
                        n.level,
                        "%"
                      ]
                    })
                  ]
                }),
                e.jsx(o, {
                  value: n.level,
                  color: n.color,
                  size: "2",
                  variant: "soft"
                })
              ]
            }, t))
          })
        ]
      });
    }
  };
  E = {
    render: () => {
      const r = [
        {
          name: "Website Redesign",
          progress: 100,
          status: "Complete",
          color: "green"
        },
        {
          name: "Mobile App",
          progress: 72,
          status: "In Progress",
          color: "blue"
        },
        {
          name: "API Integration",
          progress: 45,
          status: "In Progress",
          color: "orange"
        },
        {
          name: "Database Migration",
          progress: 15,
          status: "Starting",
          color: "yellow"
        },
        {
          name: "Testing Suite",
          progress: 0,
          status: "Not Started",
          color: "gray"
        }
      ];
      return e.jsxs("div", {
        style: {
          maxWidth: "400px"
        },
        children: [
          e.jsx(s, {
            size: "3",
            weight: "bold",
            style: {
              marginBottom: "20px",
              display: "block"
            },
            children: "Project Status Dashboard"
          }),
          e.jsx(d, {
            direction: "column",
            gap: "4",
            children: r.map((n, t) => e.jsxs("div", {
              style: {
                padding: "12px",
                border: "1px solid #e1e5e9",
                borderRadius: "8px"
              },
              children: [
                e.jsxs(d, {
                  justify: "between",
                  align: "center",
                  style: {
                    marginBottom: "8px"
                  },
                  children: [
                    e.jsx(s, {
                      size: "2",
                      weight: "medium",
                      children: n.name
                    }),
                    e.jsx(s, {
                      size: "1",
                      color: "gray",
                      children: n.status
                    })
                  ]
                }),
                e.jsx(o, {
                  value: n.progress,
                  color: n.color,
                  size: "2",
                  style: {
                    marginBottom: "6px"
                  }
                }),
                e.jsxs(s, {
                  size: "1",
                  color: "gray",
                  children: [
                    n.progress,
                    "% complete"
                  ]
                })
              ]
            }, t))
          })
        ]
      });
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_a = u.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Default Progress ({args.value}%)
      </Text>
      <Progress {...args} />
    </div>
}`,
        ...(_c = (_b = u.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_d = x.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="1" style={{
      marginBottom: "8px",
      display: "block"
    }}>
        Size 1 (Small) - 25%
      </Text>
      <Progress size="1" value={25} />
    </div>
}`,
        ...(_f = (_e = x.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_g = v.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "10px",
      display: "block"
    }}>
        Size 2 (Default) - 50%
      </Text>
      <Progress size="2" value={50} />
    </div>
}`,
        ...(_i = (_h = v.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_j = y.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="3" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Size 3 (Large) - 75%
      </Text>
      <Progress size="3" value={75} />
    </div>
}`,
        ...(_l = (_k = y.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_m = h.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Classic Variant - 60%
      </Text>
      <Progress variant="classic" value={60} />
    </div>
}`,
        ...(_o = (_n = h.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_p = j.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Surface Variant - 60%
      </Text>
      <Progress variant="surface" value={60} />
    </div>
}`,
        ...(_r = (_q = j.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_s = b.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Soft Variant - 60%
      </Text>
      <Progress variant="soft" value={60} />
    </div>
}`,
        ...(_u = (_t = b.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_v = z.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Empty Progress - 0%
      </Text>
      <Progress value={0} />
    </div>
}`,
        ...(_x = (_w = z.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  P.parameters = {
    ...P.parameters,
    docs: {
      ...(_y = P.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Quarter Progress - 25%
      </Text>
      <Progress value={25} />
    </div>
}`,
        ...(_A = (_z = P.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_B = f.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Half Progress - 50%
      </Text>
      <Progress value={50} />
    </div>
}`,
        ...(_D = (_C = f.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_E = S.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Three Quarters Progress - 75%
      </Text>
      <Progress value={75} />
    </div>
}`,
        ...(_G = (_F = S.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_H = T.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Complete Progress - 100%
      </Text>
      <Progress value={100} />
    </div>
}`,
        ...(_J = (_I = T.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_K = B.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Blue Color - 70%
      </Text>
      <Progress color="blue" value={70} />
    </div>
}`,
        ...(_M = (_L = B.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_N = k.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Red Color - 70%
      </Text>
      <Progress color="red" value={70} />
    </div>
}`,
        ...(_P = (_O = k.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_Q = C.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Green Color - 70%
      </Text>
      <Progress color="green" value={70} />
    </div>
}`,
        ...(_S = (_R = C.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_T = w.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Purple Color - 70%
      </Text>
      <Progress color="purple" value={70} />
    </div>
}`,
        ...(_V = (_U = w.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  _.parameters = {
    ..._.parameters,
    docs: {
      ...(_W = _.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        High Contrast Mode - 60%
      </Text>
      <Progress highContrast value={60} />
    </div>
}`,
        ...(_Y = (_X = _.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  R.parameters = {
    ...R.parameters,
    docs: {
      ...(_Z = R.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="1" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Size 1
        </Text>
        <Progress size="1" value={30} />
      </div>
      <div>
        <Text size="2" style={{
        marginBottom: "10px",
        display: "block"
      }}>
          Size 2
        </Text>
        <Progress size="2" value={50} />
      </div>
      <div>
        <Text size="3" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Size 3
        </Text>
        <Progress size="3" value={70} />
      </div>
    </Flex>
}`,
        ...(_$ = (__ = R.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  I.parameters = {
    ...I.parameters,
    docs: {
      ...(_aa = I.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" weight="medium" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Classic
        </Text>
        <Progress variant="classic" value={40} />
      </div>
      <div>
        <Text size="2" weight="medium" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Surface
        </Text>
        <Progress variant="surface" value={60} />
      </div>
      <div>
        <Text size="2" weight="medium" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Soft
        </Text>
        <Progress variant="soft" value={80} />
      </div>
    </Flex>
}`,
        ...(_ca = (_ba = I.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  D.parameters = {
    ...D.parameters,
    docs: {
      ...(_da = D.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="3">
      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Not Started
        </Text>
        <Progress value={0} />
      </div>
      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          In Progress
        </Text>
        <Progress value={35} color="blue" />
      </div>
      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Almost Done
        </Text>
        <Progress value={85} color="orange" />
      </div>
      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Complete
        </Text>
        <Progress value={100} color="green" />
      </div>
    </Flex>
}`,
        ...(_fa = (_ea = D.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  N.parameters = {
    ...N.parameters,
    docs: {
      ...(_ga = N.parameters) == null ? void 0 : _ga.docs,
      source: {
        originalSource: `{
  render: () => {
    const [progress, setProgress] = React.useState(0);
    const [isRunning, setIsRunning] = React.useState(false);
    React.useEffect(() => {
      let interval: NodeJS.Timeout;
      if (isRunning && progress < 100) {
        interval = setInterval(() => {
          setProgress(prev => {
            const next = prev + 1;
            if (next >= 100) {
              setIsRunning(false);
              return 100;
            }
            return next;
          });
        }, 100);
      }
      return () => clearInterval(interval);
    }, [isRunning, progress]);
    const handleStart = () => {
      setIsRunning(true);
    };
    const handleReset = () => {
      setProgress(0);
      setIsRunning(false);
    };
    return <div>
        <Text size="2" weight="medium" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Animated Progress - {progress}%
        </Text>
        <Progress value={progress} color="blue" style={{
        marginBottom: "16px"
      }} />
        <Flex gap="2">
          <Button onClick={handleStart} disabled={isRunning || progress >= 100} size="1">
            Start
          </Button>
          <Button onClick={handleReset} variant="outline" size="1">
            Reset
          </Button>
        </Flex>
      </div>;
  }
}`,
        ...(_ia = (_ha = N.parameters) == null ? void 0 : _ha.docs) == null ? void 0 : _ia.source
      }
    }
  };
  F.parameters = {
    ...F.parameters,
    docs: {
      ...(_ja = F.parameters) == null ? void 0 : _ja.docs,
      source: {
        originalSource: `{
  render: () => {
    const [downloads] = React.useState([{
      name: "document.pdf",
      progress: 100,
      color: "green"
    }, {
      name: "presentation.pptx",
      progress: 67,
      color: "blue"
    }, {
      name: "spreadsheet.xlsx",
      progress: 23,
      color: "orange"
    }, {
      name: "video.mp4",
      progress: 0,
      color: "gray"
    }]);
    return <div style={{
      maxWidth: "350px"
    }}>
        <Text size="3" weight="bold" style={{
        marginBottom: "16px",
        display: "block"
      }}>
          Downloads
        </Text>
        <Flex direction="column" gap="3">
          {downloads.map((download, index) => <div key={index}>
              <Flex justify="between" align="center" style={{
            marginBottom: "6px"
          }}>
                <Text size="2">{download.name}</Text>
                <Text size="1" color="gray">
                  {download.progress}%
                </Text>
              </Flex>
              <Progress value={download.progress} color={download.color as any} size="1" />
            </div>)}
        </Flex>
      </div>;
  }
}`,
        ...(_la = (_ka = F.parameters) == null ? void 0 : _ka.docs) == null ? void 0 : _la.source
      }
    }
  };
  A.parameters = {
    ...A.parameters,
    docs: {
      ...(_ma = A.parameters) == null ? void 0 : _ma.docs,
      source: {
        originalSource: `{
  render: () => {
    const skills = [{
      name: "React",
      level: 90,
      color: "blue"
    }, {
      name: "TypeScript",
      level: 85,
      color: "indigo"
    }, {
      name: "Node.js",
      level: 75,
      color: "green"
    }, {
      name: "Python",
      level: 60,
      color: "yellow"
    }, {
      name: "Docker",
      level: 45,
      color: "cyan"
    }, {
      name: "GraphQL",
      level: 30,
      color: "purple"
    }];
    return <div style={{
      maxWidth: "300px"
    }}>
        <Text size="3" weight="bold" style={{
        marginBottom: "20px",
        display: "block"
      }}>
          Technical Skills
        </Text>
        <Flex direction="column" gap="3">
          {skills.map((skill, index) => <div key={index}>
              <Flex justify="between" align="center" style={{
            marginBottom: "8px"
          }}>
                <Text size="2" weight="medium">
                  {skill.name}
                </Text>
                <Text size="1" color="gray">
                  {skill.level}%
                </Text>
              </Flex>
              <Progress value={skill.level} color={skill.color as any} size="2" variant="soft" />
            </div>)}
        </Flex>
      </div>;
  }
}`,
        ...(_oa = (_na = A.parameters) == null ? void 0 : _na.docs) == null ? void 0 : _oa.source
      }
    }
  };
  E.parameters = {
    ...E.parameters,
    docs: {
      ...(_pa = E.parameters) == null ? void 0 : _pa.docs,
      source: {
        originalSource: `{
  render: () => {
    const projects = [{
      name: "Website Redesign",
      progress: 100,
      status: "Complete",
      color: "green"
    }, {
      name: "Mobile App",
      progress: 72,
      status: "In Progress",
      color: "blue"
    }, {
      name: "API Integration",
      progress: 45,
      status: "In Progress",
      color: "orange"
    }, {
      name: "Database Migration",
      progress: 15,
      status: "Starting",
      color: "yellow"
    }, {
      name: "Testing Suite",
      progress: 0,
      status: "Not Started",
      color: "gray"
    }];
    return <div style={{
      maxWidth: "400px"
    }}>
        <Text size="3" weight="bold" style={{
        marginBottom: "20px",
        display: "block"
      }}>
          Project Status Dashboard
        </Text>
        <Flex direction="column" gap="4">
          {projects.map((project, index) => <div key={index} style={{
          padding: "12px",
          border: "1px solid #e1e5e9",
          borderRadius: "8px"
        }}>
              <Flex justify="between" align="center" style={{
            marginBottom: "8px"
          }}>
                <Text size="2" weight="medium">
                  {project.name}
                </Text>
                <Text size="1" color="gray">
                  {project.status}
                </Text>
              </Flex>
              <Progress value={project.progress} color={project.color as any} size="2" style={{
            marginBottom: "6px"
          }} />
              <Text size="1" color="gray">
                {project.progress}% complete
              </Text>
            </div>)}
        </Flex>
      </div>;
  }
}`,
        ...(_ra = (_qa = E.parameters) == null ? void 0 : _qa.docs) == null ? void 0 : _ra.source
      }
    }
  };
  fe = [
    "Default",
    "Size1",
    "Size2",
    "Size3",
    "Classic",
    "Surface",
    "Soft",
    "Empty",
    "Quarter",
    "Half",
    "ThreeQuarters",
    "Complete",
    "ColorBlue",
    "ColorRed",
    "ColorGreen",
    "ColorPurple",
    "HighContrast",
    "AllSizes",
    "AllVariants",
    "ProgressStates",
    "AnimatedProgress",
    "DownloadProgress",
    "SkillsProgress",
    "ProjectStatus"
  ];
});
export {
  R as AllSizes,
  I as AllVariants,
  N as AnimatedProgress,
  h as Classic,
  B as ColorBlue,
  C as ColorGreen,
  w as ColorPurple,
  k as ColorRed,
  T as Complete,
  u as Default,
  F as DownloadProgress,
  z as Empty,
  f as Half,
  _ as HighContrast,
  D as ProgressStates,
  E as ProjectStatus,
  P as Quarter,
  x as Size1,
  v as Size2,
  y as Size3,
  A as SkillsProgress,
  b as Soft,
  j as Surface,
  S as ThreeQuarters,
  fe as __namedExportsOrder,
  __tla,
  Pe as default
};
