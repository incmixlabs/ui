import { j as e, F as o, T as N, a as d, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { A as D, __tla as __tla_1 } from "./avatar-DxZO6dds.js";
import "./preload-helper-D9Z9MdNV.js";
import "./types-sXqsNS8j.js";
import { __tla as __tla_2 } from "./user-DF4nMnH4.js";
import { __tla as __tla_3 } from "./createLucideIcon-BUkpxZyj.js";
let P, L, x, b, v, T, R, j, q, C, S, w, z, f, h, k, y, A, U, V, se, ee;
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa;
  const J = {
    1: "1",
    2: "1",
    3: "2",
    4: "2",
    5: "3",
    6: "3",
    7: "4",
    8: "4",
    9: "5"
  }, M = {
    1: "-4px",
    2: "-6px",
    3: "-8px",
    4: "-10px",
    5: "-12px",
    6: "-14px",
    7: "-16px",
    8: "-18px",
    9: "-20px"
  }, $ = {
    1: "1px",
    2: "2px",
    3: "2px",
    4: "3px",
    5: "3px",
    6: "4px",
    7: "4px",
    8: "4px",
    9: "6px"
  }, W = (r, t) => {
    const a = r.length > t ? t - 1 : r.length, n = r.length - a;
    return {
      visibleCount: a,
      remainingCount: n
    };
  }, B = ({ users: r, maxVisible: t = 5, size: a = "3", direction: n = "left" }) => {
    const { visibleCount: m, remainingCount: c } = W(r, t), u = r.slice(0, m), g = n === "right" ? [
      ...u
    ].reverse() : u;
    return e.jsxs(o, {
      align: "center",
      gap: J[a],
      direction: n === "right" ? "row-reverse" : "row",
      children: [
        g.map((p) => e.jsx(D, {
          id: p.id,
          size: a,
          src: p.src,
          name: p.name
        }, p.id)),
        c > 0 && e.jsx(D, {
          size: a,
          name: `+${c}`
        })
      ]
    });
  };
  B.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "SpreadLayout",
    props: {
      maxVisible: {
        defaultValue: {
          value: "5",
          computed: false
        },
        required: false
      },
      size: {
        defaultValue: {
          value: '"3"',
          computed: false
        },
        required: false
      },
      direction: {
        defaultValue: {
          value: '"left"',
          computed: false
        },
        required: false
      }
    }
  };
  const G = ({ users: r, maxVisible: t = 5, size: a = "3", direction: n = "left", stackOrder: m = "descending" }) => {
    const { visibleCount: c, remainingCount: u } = W(r, t), g = r.slice(0, c), p = n === "left" && m === "descending" || n === "right" && m === "ascending", O = (i) => ({
      marginLeft: n === "left" ? i === 0 ? "0" : M[a] : "0",
      marginRight: n === "right" ? i === 0 ? "0" : M[a] : "0",
      zIndex: p ? c - i : i + 1,
      boxShadow: `0 0 0 ${$[a]} var(--color-background)`
    }), _ = n === "right" ? [
      ...g
    ].reverse() : g;
    return e.jsxs(o, {
      align: "center",
      direction: n === "right" ? "row-reverse" : "row",
      children: [
        _.map((i, E) => e.jsx(D, {
          id: i.id,
          size: a,
          src: i.src,
          name: i.name,
          style: O(E)
        }, i.id)),
        u > 0 && e.jsx(D, {
          size: a,
          name: `+${u}`,
          style: O(c)
        })
      ]
    });
  };
  G.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "StackLayout",
    props: {
      users: {
        required: true,
        tsType: {
          name: "Array",
          elements: [
            {
              name: "signature",
              type: "object",
              raw: `{
  email?: string
  id?: string
  size?: ExtendSize
  src?: string
  name?: string
  radius?: RadixProps["radius"]
  variant?: RadixProps["variant"]
  className?: string
  style?: React.CSSProperties
}`,
              signature: {
                properties: [
                  {
                    key: "email",
                    value: {
                      name: "string",
                      required: false
                    }
                  },
                  {
                    key: "id",
                    value: {
                      name: "string",
                      required: false
                    }
                  },
                  {
                    key: "size",
                    value: {
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
                      ],
                      required: false
                    }
                  },
                  {
                    key: "src",
                    value: {
                      name: "string",
                      required: false
                    }
                  },
                  {
                    key: "name",
                    value: {
                      name: "string",
                      required: false
                    }
                  },
                  {
                    key: "radius",
                    value: {
                      name: 'RadixProps["radius"]',
                      raw: 'RadixProps["radius"]',
                      required: false
                    }
                  },
                  {
                    key: "variant",
                    value: {
                      name: 'RadixProps["variant"]',
                      raw: 'RadixProps["variant"]',
                      required: false
                    }
                  },
                  {
                    key: "className",
                    value: {
                      name: "string",
                      required: false
                    }
                  },
                  {
                    key: "style",
                    value: {
                      name: "ReactCSSProperties",
                      raw: "React.CSSProperties",
                      required: false
                    }
                  }
                ]
              }
            }
          ],
          raw: "AvatarProps[]"
        },
        description: ""
      },
      maxVisible: {
        required: false,
        tsType: {
          name: "number"
        },
        description: "",
        defaultValue: {
          value: "5",
          computed: false
        }
      },
      size: {
        required: false,
        tsType: {
          name: "unknown[number]",
          raw: "(typeof sizes)[number]"
        },
        description: "",
        defaultValue: {
          value: '"3"',
          computed: false
        }
      },
      layout: {
        required: false,
        tsType: {
          name: "unknown[number]",
          raw: "(typeof layouts)[number]"
        },
        description: ""
      },
      direction: {
        required: false,
        tsType: {
          name: "unknown[number]",
          raw: "(typeof directions)[number]"
        },
        description: "",
        defaultValue: {
          value: '"left"',
          computed: false
        }
      },
      stackOrder: {
        required: false,
        tsType: {
          name: "unknown[number]",
          raw: "(typeof stackOrders)[number]"
        },
        description: "",
        defaultValue: {
          value: '"descending"',
          computed: false
        }
      }
    }
  };
  const l = (r) => {
    const { layout: t = "spread" } = r;
    return t === "stack" ? e.jsx(G, {
      ...r
    }) : e.jsx(B, {
      ...r
    });
  };
  l.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "AvatarGroup",
    props: {
      users: {
        required: true,
        tsType: {
          name: "Array",
          elements: [
            {
              name: "signature",
              type: "object",
              raw: `{
  email?: string
  id?: string
  size?: ExtendSize
  src?: string
  name?: string
  radius?: RadixProps["radius"]
  variant?: RadixProps["variant"]
  className?: string
  style?: React.CSSProperties
}`,
              signature: {
                properties: [
                  {
                    key: "email",
                    value: {
                      name: "string",
                      required: false
                    }
                  },
                  {
                    key: "id",
                    value: {
                      name: "string",
                      required: false
                    }
                  },
                  {
                    key: "size",
                    value: {
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
                      ],
                      required: false
                    }
                  },
                  {
                    key: "src",
                    value: {
                      name: "string",
                      required: false
                    }
                  },
                  {
                    key: "name",
                    value: {
                      name: "string",
                      required: false
                    }
                  },
                  {
                    key: "radius",
                    value: {
                      name: 'RadixProps["radius"]',
                      raw: 'RadixProps["radius"]',
                      required: false
                    }
                  },
                  {
                    key: "variant",
                    value: {
                      name: 'RadixProps["variant"]',
                      raw: 'RadixProps["variant"]',
                      required: false
                    }
                  },
                  {
                    key: "className",
                    value: {
                      name: "string",
                      required: false
                    }
                  },
                  {
                    key: "style",
                    value: {
                      name: "ReactCSSProperties",
                      raw: "React.CSSProperties",
                      required: false
                    }
                  }
                ]
              }
            }
          ],
          raw: "AvatarProps[]"
        },
        description: ""
      },
      maxVisible: {
        required: false,
        tsType: {
          name: "number"
        },
        description: ""
      },
      size: {
        required: false,
        tsType: {
          name: "unknown[number]",
          raw: "(typeof sizes)[number]"
        },
        description: ""
      },
      layout: {
        required: false,
        tsType: {
          name: "unknown[number]",
          raw: "(typeof layouts)[number]"
        },
        description: ""
      },
      direction: {
        required: false,
        tsType: {
          name: "unknown[number]",
          raw: "(typeof directions)[number]"
        },
        description: ""
      },
      stackOrder: {
        required: false,
        tsType: {
          name: "unknown[number]",
          raw: "(typeof stackOrders)[number]"
        },
        description: ""
      }
    }
  };
  let s, F;
  s = [
    {
      id: "1",
      name: "John Doe",
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
    },
    {
      id: "2",
      name: "Jane Smith",
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
    },
    {
      id: "3",
      name: "Alice Johnson",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
    },
    {
      id: "4",
      name: "Bob Wilson",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
    },
    {
      id: "5",
      name: "Carol Davis",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
    },
    {
      id: "6",
      name: "David Brown",
      src: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
    },
    {
      id: "7",
      name: "Eva Martinez",
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
    },
    {
      id: "8",
      name: "Frank Miller",
      src: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
    }
  ];
  F = [
    {
      id: "1",
      name: "John Doe"
    },
    {
      id: "2",
      name: "Jane Smith"
    },
    {
      id: "3",
      name: "Alice Johnson"
    },
    {
      id: "4",
      name: "Bob Wilson"
    },
    {
      id: "5",
      name: "Carol Davis"
    },
    {
      id: "6",
      name: "David Brown"
    },
    {
      id: "7",
      name: "Eva Martinez"
    }
  ];
  ee = {
    title: "Elements/AvatarGroup",
    component: l,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (r) => e.jsx(N, {
        children: e.jsx(r, {})
      })
    ],
    argTypes: {
      users: {
        control: "object",
        description: "Array of user objects with avatar data"
      },
      maxVisible: {
        control: "number",
        description: "Maximum number of avatars to show before overflow"
      },
      size: {
        control: "select",
        options: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9"
        ],
        description: "Size of the avatars"
      },
      layout: {
        control: "select",
        options: [
          "spread",
          "stack"
        ],
        description: "Layout style for the avatar group"
      },
      direction: {
        control: "select",
        options: [
          "left",
          "right"
        ],
        description: "Direction for avatar ordering"
      },
      stackOrder: {
        control: "select",
        options: [
          "ascending",
          "descending"
        ],
        description: "Stack order (only applies to stack layout)"
      }
    },
    args: {
      users: s.slice(0, 4),
      maxVisible: 5,
      size: "3",
      layout: "spread",
      direction: "left",
      stackOrder: "descending"
    }
  };
  x = {
    args: {
      users: s.slice(0, 4)
    }
  };
  f = {
    args: {
      layout: "spread",
      users: s.slice(0, 5)
    }
  };
  y = {
    args: {
      layout: "stack",
      users: s.slice(0, 5)
    }
  };
  b = {
    args: {
      direction: "left",
      users: s.slice(0, 4)
    }
  };
  v = {
    args: {
      direction: "right",
      users: s.slice(0, 4)
    }
  };
  h = {
    args: {
      layout: "stack",
      stackOrder: "ascending",
      users: s.slice(0, 4)
    }
  };
  k = {
    args: {
      layout: "stack",
      stackOrder: "descending",
      users: s.slice(0, 4)
    }
  };
  S = {
    args: {
      size: "1",
      users: s.slice(0, 4)
    }
  };
  w = {
    args: {
      size: "3",
      users: s.slice(0, 4)
    }
  };
  z = {
    args: {
      size: "5",
      users: s.slice(0, 4)
    }
  };
  j = {
    args: {
      maxVisible: 3,
      users: s
    }
  };
  q = {
    args: {
      maxVisible: 5,
      users: s
    }
  };
  V = {
    args: {
      users: s,
      maxVisible: 3
    }
  };
  T = {
    args: {
      users: s,
      maxVisible: 2
    }
  };
  U = {
    args: {
      users: F.slice(0, 4)
    }
  };
  C = {
    args: {
      users: [
        s[0],
        F[1],
        s[2],
        F[3],
        s[4]
      ],
      maxVisible: 4
    }
  };
  R = {
    render: () => e.jsxs(o, {
      direction: "column",
      gap: "6",
      align: "center",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(d, {
              size: "4",
              weight: "bold",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Spread Layout"
            }),
            e.jsx(l, {
              layout: "spread",
              users: s.slice(0, 5),
              maxVisible: 4,
              size: "3"
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(d, {
              size: "4",
              weight: "bold",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Stack Layout"
            }),
            e.jsx(l, {
              layout: "stack",
              users: s.slice(0, 5),
              maxVisible: 4,
              size: "3"
            })
          ]
        })
      ]
    })
  };
  P = {
    render: () => e.jsx(o, {
      direction: "column",
      gap: "4",
      align: "center",
      children: [
        "1",
        "2",
        "3",
        "4",
        "5"
      ].map((r) => e.jsxs(o, {
        direction: "column",
        align: "center",
        gap: "2",
        children: [
          e.jsx(l, {
            size: r,
            users: s.slice(0, 4),
            maxVisible: 3
          }),
          e.jsxs(d, {
            size: "1",
            color: "gray",
            children: [
              "Size ",
              r
            ]
          })
        ]
      }, r))
    })
  };
  A = {
    render: () => e.jsxs(o, {
      direction: "column",
      gap: "4",
      style: {
        padding: "20px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px",
        maxWidth: "400px"
      },
      children: [
        e.jsx(d, {
          size: "4",
          weight: "bold",
          children: "Project Team"
        }),
        e.jsxs(o, {
          align: "center",
          justify: "between",
          children: [
            e.jsx(l, {
              users: s.slice(0, 6),
              maxVisible: 4,
              size: "3",
              layout: "spread"
            }),
            e.jsxs(d, {
              size: "2",
              color: "gray",
              children: [
                s.length,
                " members"
              ]
            })
          ]
        })
      ]
    })
  };
  L = {
    render: () => e.jsxs(o, {
      align: "center",
      justify: "between",
      style: {
        padding: "12px 16px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px",
        maxWidth: "300px"
      },
      children: [
        e.jsx(d, {
          size: "3",
          weight: "medium",
          children: "Currently editing"
        }),
        e.jsx(l, {
          users: s.slice(0, 3),
          maxVisible: 3,
          size: "2",
          layout: "stack"
        })
      ]
    })
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_a = x.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  args: {
    users: sampleUsers.slice(0, 4)
  }
}`,
        ...(_c = (_b = x.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_d = f.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  args: {
    layout: "spread",
    users: sampleUsers.slice(0, 5)
  }
}`,
        ...(_f = (_e = f.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_g = y.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  args: {
    layout: "stack",
    users: sampleUsers.slice(0, 5)
  }
}`,
        ...(_i = (_h = y.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_j = b.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  args: {
    direction: "left",
    users: sampleUsers.slice(0, 4)
  }
}`,
        ...(_l = (_k = b.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_m = v.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  args: {
    direction: "right",
    users: sampleUsers.slice(0, 4)
  }
}`,
        ...(_o = (_n = v.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_p = h.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  args: {
    layout: "stack",
    stackOrder: "ascending",
    users: sampleUsers.slice(0, 4)
  }
}`,
        ...(_r = (_q = h.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_s = k.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  args: {
    layout: "stack",
    stackOrder: "descending",
    users: sampleUsers.slice(0, 4)
  }
}`,
        ...(_u = (_t = k.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_v = S.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  args: {
    size: "1",
    users: sampleUsers.slice(0, 4)
  }
}`,
        ...(_x = (_w = S.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_y = w.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  args: {
    size: "3",
    users: sampleUsers.slice(0, 4)
  }
}`,
        ...(_A = (_z = w.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_B = z.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  args: {
    size: "5",
    users: sampleUsers.slice(0, 4)
  }
}`,
        ...(_D = (_C = z.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_E = j.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  args: {
    maxVisible: 3,
    users: sampleUsers
  }
}`,
        ...(_G = (_F = j.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  q.parameters = {
    ...q.parameters,
    docs: {
      ...(_H = q.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  args: {
    maxVisible: 5,
    users: sampleUsers
  }
}`,
        ...(_J = (_I = q.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  V.parameters = {
    ...V.parameters,
    docs: {
      ...(_K = V.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  args: {
    users: sampleUsers,
    maxVisible: 3
  }
}`,
        ...(_M = (_L = V.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_N = T.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  args: {
    users: sampleUsers,
    maxVisible: 2
  }
}`,
        ...(_P = (_O = T.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  U.parameters = {
    ...U.parameters,
    docs: {
      ...(_Q = U.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  args: {
    users: fallbackUsers.slice(0, 4)
  }
}`,
        ...(_S = (_R = U.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_T = C.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  args: {
    users: [sampleUsers[0], fallbackUsers[1], sampleUsers[2], fallbackUsers[3], sampleUsers[4]],
    maxVisible: 4
  }
}`,
        ...(_V = (_U = C.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  R.parameters = {
    ...R.parameters,
    docs: {
      ...(_W = R.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="6" align="center">
      <div>
        <Text size="4" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Spread Layout
        </Text>
        <AvatarGroup layout="spread" users={sampleUsers.slice(0, 5)} maxVisible={4} size="3" />
      </div>
      <div>
        <Text size="4" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Stack Layout
        </Text>
        <AvatarGroup layout="stack" users={sampleUsers.slice(0, 5)} maxVisible={4} size="3" />
      </div>
    </Flex>
}`,
        ...(_Y = (_X = R.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  P.parameters = {
    ...P.parameters,
    docs: {
      ...(_Z = P.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4" align="center">
      {(["1", "2", "3", "4", "5"] as const).map(size => <Flex key={size} direction="column" align="center" gap="2">
          <AvatarGroup size={size} users={sampleUsers.slice(0, 4)} maxVisible={3} />
          <Text size="1" color="gray">
            Size {size}
          </Text>
        </Flex>)}
    </Flex>
}`,
        ...(_$ = (__ = P.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  A.parameters = {
    ...A.parameters,
    docs: {
      ...(_aa = A.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4" style={{
    padding: "20px",
    backgroundColor: "var(--gray-2)",
    borderRadius: "8px",
    maxWidth: "400px"
  }}>
      <Text size="4" weight="bold">
        Project Team
      </Text>
      <Flex align="center" justify="between">
        <AvatarGroup users={sampleUsers.slice(0, 6)} maxVisible={4} size="3" layout="spread" />
        <Text size="2" color="gray">
          {sampleUsers.length} members
        </Text>
      </Flex>
    </Flex>
}`,
        ...(_ca = (_ba = A.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  L.parameters = {
    ...L.parameters,
    docs: {
      ...(_da = L.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  render: () => <Flex align="center" justify="between" style={{
    padding: "12px 16px",
    backgroundColor: "var(--gray-2)",
    borderRadius: "8px",
    maxWidth: "300px"
  }}>
      <Text size="3" weight="medium">
        Currently editing
      </Text>
      <AvatarGroup users={sampleUsers.slice(0, 3)} maxVisible={3} size="2" layout="stack" />
    </Flex>
}`,
        ...(_fa = (_ea = L.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  se = [
    "Default",
    "SpreadLayout",
    "StackLayout",
    "DirectionLeft",
    "DirectionRight",
    "StackAscending",
    "StackDescending",
    "Size1",
    "Size3",
    "Size5",
    "MaxVisible3",
    "MaxVisible5",
    "WithOverflow",
    "LargeOverflow",
    "WithFallbacks",
    "MixedContent",
    "LayoutComparison",
    "AllSizes",
    "TeamMembers",
    "CollaborativeDocument"
  ];
});
export {
  P as AllSizes,
  L as CollaborativeDocument,
  x as Default,
  b as DirectionLeft,
  v as DirectionRight,
  T as LargeOverflow,
  R as LayoutComparison,
  j as MaxVisible3,
  q as MaxVisible5,
  C as MixedContent,
  S as Size1,
  w as Size3,
  z as Size5,
  f as SpreadLayout,
  h as StackAscending,
  k as StackDescending,
  y as StackLayout,
  A as TeamMembers,
  U as WithFallbacks,
  V as WithOverflow,
  se as __namedExportsOrder,
  __tla,
  ee as default
};
