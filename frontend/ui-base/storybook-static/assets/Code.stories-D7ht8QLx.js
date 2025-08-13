import { G, I as N, q as U, z as H, J as M, t as O, r as _, v as V, j as e, S as q, l as J, w as K, T as Q, F as o, a as r, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import "./preload-helper-D9Z9MdNV.js";
let B, T, S, w, x, u, v, h, t, P, g, f, b, p, a, n, d, l, m, c, I, k, j, C, z, y, re, se;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa;
  const X = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ], Y = [
    "solid",
    "soft",
    "outline",
    "ghost"
  ], Z = {
    ...O,
    size: {
      type: "enum",
      className: "rt-r-size",
      values: X,
      responsive: true
    },
    variant: {
      type: "enum",
      className: "rt-variant",
      values: Y,
      default: "soft"
    },
    ...M,
    ...H,
    ...U,
    ...N,
    ...G
  }, s = _.forwardRef((i, E) => {
    const { asChild: F, className: L, color: W, ...A } = V(i, Z, K), D = i.variant === "ghost" ? W || void 0 : W, R = F ? q : "code";
    return e.jsx(R, {
      "data-accent-color": D,
      ...A,
      ref: E,
      className: J("rt-reset", "rt-Code", L)
    });
  });
  s.displayName = "Code";
  s.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Code",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  se = {
    title: "Components/Code",
    component: s,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (i) => e.jsx(Q, {
        children: e.jsx("div", {
          style: {
            padding: "20px"
          },
          children: e.jsx(i, {})
        })
      })
    ],
    argTypes: {
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
        description: "Code text size"
      },
      variant: {
        control: "select",
        options: [
          "solid",
          "soft",
          "outline",
          "ghost"
        ],
        description: "Code variant style"
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
        description: "Code color"
      },
      weight: {
        control: "select",
        options: [
          "light",
          "regular",
          "medium",
          "bold"
        ],
        description: "Code text weight"
      },
      highContrast: {
        control: "boolean",
        description: "High contrast mode"
      }
    },
    args: {
      size: "2",
      variant: "soft",
      children: 'console.log("hello world")'
    }
  };
  t = {
    render: (i) => e.jsx(s, {
      ...i,
      children: 'console.log("Hello, World!")'
    })
  };
  a = {
    render: (i) => e.jsx(s, {
      size: "1",
      children: "npm install"
    })
  };
  n = {
    render: (i) => e.jsx(s, {
      size: "2",
      children: "npm install"
    })
  };
  d = {
    render: (i) => e.jsx(s, {
      size: "3",
      children: "npm install"
    })
  };
  l = {
    render: (i) => e.jsx(s, {
      size: "4",
      children: "npm install"
    })
  };
  c = {
    render: (i) => e.jsx(s, {
      variant: "solid",
      children: 'git commit -m "fix: resolve issue"'
    })
  };
  m = {
    render: (i) => e.jsx(s, {
      variant: "soft",
      children: 'git commit -m "fix: resolve issue"'
    })
  };
  p = {
    render: (i) => e.jsx(s, {
      variant: "outline",
      children: 'git commit -m "fix: resolve issue"'
    })
  };
  g = {
    render: (i) => e.jsx(s, {
      variant: "ghost",
      children: 'git commit -m "fix: resolve issue"'
    })
  };
  x = {
    render: (i) => e.jsx(s, {
      color: "blue",
      children: "const isActive = true"
    })
  };
  h = {
    render: (i) => e.jsx(s, {
      color: "red",
      children: 'throw new Error("Something went wrong")'
    })
  };
  u = {
    render: (i) => e.jsx(s, {
      color: "green",
      children: "\u2713 Tests passed"
    })
  };
  v = {
    render: (i) => e.jsx(s, {
      color: "purple",
      children: "function myFunction() "
    })
  };
  C = {
    render: (i) => e.jsx(s, {
      weight: "light",
      children: "// This is a comment"
    })
  };
  y = {
    render: (i) => e.jsx(s, {
      weight: "regular",
      children: "const value = 42;"
    })
  };
  z = {
    render: (i) => e.jsx(s, {
      weight: "medium",
      children: "import React from 'react'"
    })
  };
  j = {
    render: (i) => e.jsx(s, {
      weight: "bold",
      children: "ERROR: Build failed"
    })
  };
  f = {
    render: (i) => e.jsx(s, {
      highContrast: true,
      children: "sudo rm -rf /"
    })
  };
  T = {
    render: () => e.jsxs(o, {
      direction: "column",
      gap: "2",
      children: [
        e.jsx(s, {
          size: "1",
          children: 'size="1"'
        }),
        e.jsx(s, {
          size: "2",
          children: 'size="2"'
        }),
        e.jsx(s, {
          size: "3",
          children: 'size="3"'
        }),
        e.jsx(s, {
          size: "4",
          children: 'size="4"'
        }),
        e.jsx(s, {
          size: "5",
          children: 'size="5"'
        })
      ]
    })
  };
  S = {
    render: () => e.jsxs(o, {
      direction: "column",
      gap: "2",
      children: [
        e.jsx(s, {
          variant: "solid",
          children: 'variant="solid"'
        }),
        e.jsx(s, {
          variant: "soft",
          children: 'variant="soft"'
        }),
        e.jsx(s, {
          variant: "outline",
          children: 'variant="outline"'
        }),
        e.jsx(s, {
          variant: "ghost",
          children: 'variant="ghost"'
        })
      ]
    })
  };
  b = {
    render: () => e.jsxs(r, {
      size: "3",
      style: {
        maxWidth: "500px",
        lineHeight: "1.6"
      },
      children: [
        "To install the package, run ",
        e.jsx(s, {
          children: "npm install @my-org/ui"
        }),
        " in your terminal. Then you can import components like ",
        e.jsxs(s, {
          children: [
            "import ",
            "{ Button }",
            " from '@my-org/ui'"
          ]
        }),
        "and use them in your React application."
      ]
    })
  };
  w = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "600px"
      },
      children: [
        e.jsx(r, {
          size: "4",
          weight: "bold",
          style: {
            marginBottom: "20px",
            display: "block"
          },
          children: "Installation Guide"
        }),
        e.jsxs(o, {
          direction: "column",
          gap: "4",
          children: [
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px",
                    display: "block"
                  },
                  children: "Using npm:"
                }),
                e.jsx(s, {
                  variant: "outline",
                  size: "2",
                  children: "npm install @radix-ui/react-components"
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px",
                    display: "block"
                  },
                  children: "Using yarn:"
                }),
                e.jsx(s, {
                  variant: "outline",
                  size: "2",
                  color: "blue",
                  children: "yarn add @radix-ui/react-components"
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px",
                    display: "block"
                  },
                  children: "Using pnpm:"
                }),
                e.jsx(s, {
                  variant: "outline",
                  size: "2",
                  color: "green",
                  children: "pnpm add @radix-ui/react-components"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  B = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "600px"
      },
      children: [
        e.jsx(r, {
          size: "4",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Button Component API"
        }),
        e.jsxs(o, {
          direction: "column",
          gap: "3",
          children: [
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  size: "2",
                  weight: "medium",
                  children: "Import:"
                }),
                e.jsx("div", {
                  style: {
                    marginTop: "4px"
                  },
                  children: e.jsxs(s, {
                    children: [
                      "import ",
                      "{ Button }",
                      " from './components'"
                    ]
                  })
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  size: "2",
                  weight: "medium",
                  children: "Basic Usage:"
                }),
                e.jsx("div", {
                  style: {
                    marginTop: "4px"
                  },
                  children: e.jsx(s, {
                    children: '<Button variant="solid">Click me</Button>'
                  })
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  size: "2",
                  weight: "medium",
                  children: "Props:"
                }),
                e.jsx("div", {
                  style: {
                    marginTop: "8px"
                  },
                  children: e.jsxs(o, {
                    direction: "column",
                    gap: "2",
                    children: [
                      e.jsxs("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        },
                        children: [
                          e.jsx(s, {
                            size: "1",
                            variant: "ghost",
                            children: "variant"
                          }),
                          e.jsx(r, {
                            size: "1",
                            color: "gray",
                            children: ': "solid" | "outline" | "ghost"'
                          })
                        ]
                      }),
                      e.jsxs("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        },
                        children: [
                          e.jsx(s, {
                            size: "1",
                            variant: "ghost",
                            children: "size"
                          }),
                          e.jsx(r, {
                            size: "1",
                            color: "gray",
                            children: ': "1" | "2" | "3" | "4"'
                          })
                        ]
                      }),
                      e.jsxs("div", {
                        style: {
                          display: "flex",
                          alignItems: "center",
                          gap: "8px"
                        },
                        children: [
                          e.jsx(s, {
                            size: "1",
                            variant: "ghost",
                            children: "disabled"
                          }),
                          e.jsx(r, {
                            size: "1",
                            color: "gray",
                            children: "?: boolean"
                          })
                        ]
                      })
                    ]
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  };
  k = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "500px"
      },
      children: [
        e.jsx(r, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Common Git Commands"
        }),
        e.jsxs(o, {
          direction: "column",
          gap: "3",
          children: [
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  size: "2",
                  style: {
                    marginBottom: "4px",
                    display: "block"
                  },
                  children: "Clone a repository:"
                }),
                e.jsx(s, {
                  variant: "solid",
                  size: "1",
                  children: "git clone https://github.com/user/repo.git"
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  size: "2",
                  style: {
                    marginBottom: "4px",
                    display: "block"
                  },
                  children: "Add all changes:"
                }),
                e.jsx(s, {
                  variant: "solid",
                  size: "1",
                  children: "git add ."
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  size: "2",
                  style: {
                    marginBottom: "4px",
                    display: "block"
                  },
                  children: "Commit with message:"
                }),
                e.jsx(s, {
                  variant: "solid",
                  size: "1",
                  children: 'git commit -m "Add new feature"'
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  size: "2",
                  style: {
                    marginBottom: "4px",
                    display: "block"
                  },
                  children: "Push to origin:"
                }),
                e.jsx(s, {
                  variant: "solid",
                  size: "1",
                  children: "git push origin main"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  I = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "400px"
      },
      children: [
        e.jsx(r, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Build Status"
        }),
        e.jsxs(o, {
          direction: "column",
          gap: "3",
          children: [
            e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px"
              },
              children: [
                e.jsx(r, {
                  size: "2",
                  children: "Tests:"
                }),
                e.jsx(s, {
                  color: "green",
                  variant: "soft",
                  size: "1",
                  children: "PASSED"
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px"
              },
              children: [
                e.jsx(r, {
                  size: "2",
                  children: "Build:"
                }),
                e.jsx(s, {
                  color: "green",
                  variant: "soft",
                  size: "1",
                  children: "SUCCESS"
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px"
              },
              children: [
                e.jsx(r, {
                  size: "2",
                  children: "Deploy:"
                }),
                e.jsx(s, {
                  color: "yellow",
                  variant: "soft",
                  size: "1",
                  children: "PENDING"
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px"
              },
              children: [
                e.jsx(r, {
                  size: "2",
                  children: "Coverage:"
                }),
                e.jsx(s, {
                  color: "blue",
                  variant: "soft",
                  size: "1",
                  children: "87%"
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px"
              },
              children: [
                e.jsx(r, {
                  size: "2",
                  children: "Bundle size:"
                }),
                e.jsx(s, {
                  color: "orange",
                  variant: "soft",
                  size: "1",
                  children: "2.4MB"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  P = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "500px"
      },
      children: [
        e.jsx(r, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Project Structure"
        }),
        e.jsxs(o, {
          direction: "column",
          gap: "1",
          children: [
            e.jsx(s, {
              variant: "ghost",
              size: "1",
              children: "src/"
            }),
            e.jsx(s, {
              variant: "ghost",
              size: "1",
              style: {
                marginLeft: "16px"
              },
              children: "components/"
            }),
            e.jsx(s, {
              variant: "ghost",
              size: "1",
              style: {
                marginLeft: "32px"
              },
              children: "Button.tsx"
            }),
            e.jsx(s, {
              variant: "ghost",
              size: "1",
              style: {
                marginLeft: "32px"
              },
              children: "Input.tsx"
            }),
            e.jsx(s, {
              variant: "ghost",
              size: "1",
              style: {
                marginLeft: "32px"
              },
              children: "Modal.tsx"
            }),
            e.jsx(s, {
              variant: "ghost",
              size: "1",
              style: {
                marginLeft: "16px"
              },
              children: "utils/"
            }),
            e.jsx(s, {
              variant: "ghost",
              size: "1",
              style: {
                marginLeft: "32px"
              },
              children: "helpers.ts"
            }),
            e.jsx(s, {
              variant: "ghost",
              size: "1",
              style: {
                marginLeft: "32px"
              },
              children: "constants.ts"
            }),
            e.jsx(s, {
              variant: "ghost",
              size: "1",
              style: {
                marginLeft: "16px"
              },
              children: "App.tsx"
            }),
            e.jsx(s, {
              variant: "ghost",
              size: "1",
              style: {
                marginLeft: "16px"
              },
              children: "main.tsx"
            }),
            e.jsx(s, {
              variant: "ghost",
              size: "1",
              children: "package.json"
            }),
            e.jsx(s, {
              variant: "ghost",
              size: "1",
              children: "tsconfig.json"
            })
          ]
        })
      ]
    })
  };
  t.parameters = {
    ...t.parameters,
    docs: {
      ...(_a = t.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => <Code {...args}>
      console.log("Hello, World!")
    </Code>
}`,
        ...(_c = (_b = t.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  a.parameters = {
    ...a.parameters,
    docs: {
      ...(_d = a.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: args => <Code size="1">
      npm install
    </Code>
}`,
        ...(_f = (_e = a.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  n.parameters = {
    ...n.parameters,
    docs: {
      ...(_g = n.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: args => <Code size="2">
      npm install
    </Code>
}`,
        ...(_i = (_h = n.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  d.parameters = {
    ...d.parameters,
    docs: {
      ...(_j = d.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: args => <Code size="3">
      npm install
    </Code>
}`,
        ...(_l = (_k = d.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_m = l.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: args => <Code size="4">
      npm install
    </Code>
}`,
        ...(_o = (_n = l.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  c.parameters = {
    ...c.parameters,
    docs: {
      ...(_p = c.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: args => <Code variant="solid">
      git commit -m "fix: resolve issue"
    </Code>
}`,
        ...(_r = (_q = c.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_s = m.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: args => <Code variant="soft">
      git commit -m "fix: resolve issue"
    </Code>
}`,
        ...(_u = (_t = m.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_v = p.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: args => <Code variant="outline">
      git commit -m "fix: resolve issue"
    </Code>
}`,
        ...(_x = (_w = p.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  g.parameters = {
    ...g.parameters,
    docs: {
      ...(_y = g.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: args => <Code variant="ghost">
      git commit -m "fix: resolve issue"
    </Code>
}`,
        ...(_A = (_z = g.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_B = x.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: args => <Code color="blue">
      const isActive = true
    </Code>
}`,
        ...(_D = (_C = x.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_E = h.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: args => <Code color="red">
      throw new Error("Something went wrong")
    </Code>
}`,
        ...(_G = (_F = h.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_H = u.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: args => <Code color="green">
      \u2713 Tests passed
    </Code>
}`,
        ...(_J = (_I = u.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_K = v.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: args => <Code color="purple">
      function myFunction() {}
    </Code>
}`,
        ...(_M = (_L = v.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_N = C.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  render: args => <Code weight="light">
      // This is a comment
    </Code>
}`,
        ...(_P = (_O = C.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_Q = y.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: args => <Code weight="regular">
      const value = 42;
    </Code>
}`,
        ...(_S = (_R = y.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_T = z.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  render: args => <Code weight="medium">
      import React from 'react'
    </Code>
}`,
        ...(_V = (_U = z.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_W = j.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  render: args => <Code weight="bold">
      ERROR: Build failed
    </Code>
}`,
        ...(_Y = (_X = j.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_Z = f.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  render: args => <Code highContrast>
      sudo rm -rf /
    </Code>
}`,
        ...(_$ = (__ = f.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_aa = T.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="2">
      <Code size="1">size="1"</Code>
      <Code size="2">size="2"</Code>
      <Code size="3">size="3"</Code>
      <Code size="4">size="4"</Code>
      <Code size="5">size="5"</Code>
    </Flex>
}`,
        ...(_ca = (_ba = T.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_da = S.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="2">
      <Code variant="solid">variant="solid"</Code>
      <Code variant="soft">variant="soft"</Code>
      <Code variant="outline">variant="outline"</Code>
      <Code variant="ghost">variant="ghost"</Code>
    </Flex>
}`,
        ...(_fa = (_ea = S.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_ga = b.parameters) == null ? void 0 : _ga.docs,
      source: {
        originalSource: `{
  render: () => <Text size="3" style={{
    maxWidth: '500px',
    lineHeight: '1.6'
  }}>
      To install the package, run <Code>npm install @my-org/ui</Code> in your terminal.
      Then you can import components like <Code>import {"{ Button }"} from '@my-org/ui'</Code>
      and use them in your React application.
    </Text>
}`,
        ...(_ia = (_ha = b.parameters) == null ? void 0 : _ha.docs) == null ? void 0 : _ia.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_ja = w.parameters) == null ? void 0 : _ja.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: '600px'
  }}>
      <Text size="4" weight="bold" style={{
      marginBottom: '20px',
      display: 'block'
    }}>
        Installation Guide
      </Text>

      <Flex direction="column" gap="4">
        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: '8px',
          display: 'block'
        }}>
            Using npm:
          </Text>
          <Code variant="outline" size="2">
            npm install @radix-ui/react-components
          </Code>
        </div>

        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: '8px',
          display: 'block'
        }}>
            Using yarn:
          </Text>
          <Code variant="outline" size="2" color="blue">
            yarn add @radix-ui/react-components
          </Code>
        </div>

        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: '8px',
          display: 'block'
        }}>
            Using pnpm:
          </Text>
          <Code variant="outline" size="2" color="green">
            pnpm add @radix-ui/react-components
          </Code>
        </div>
      </Flex>
    </div>
}`,
        ...(_la = (_ka = w.parameters) == null ? void 0 : _ka.docs) == null ? void 0 : _la.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_ma = B.parameters) == null ? void 0 : _ma.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: '600px'
  }}>
      <Text size="4" weight="bold" style={{
      marginBottom: '16px',
      display: 'block'
    }}>
        Button Component API
      </Text>

      <Flex direction="column" gap="3">
        <div>
          <Text size="2" weight="medium">Import:</Text>
          <div style={{
          marginTop: '4px'
        }}>
            <Code>import {"{ Button }"} from './components'</Code>
          </div>
        </div>

        <div>
          <Text size="2" weight="medium">Basic Usage:</Text>
          <div style={{
          marginTop: '4px'
        }}>
            <Code>&lt;Button variant="solid"&gt;Click me&lt;/Button&gt;</Code>
          </div>
        </div>

        <div>
          <Text size="2" weight="medium">Props:</Text>
          <div style={{
          marginTop: '8px'
        }}>
            <Flex direction="column" gap="2">
              <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
                <Code size="1" variant="ghost">variant</Code>
                <Text size="1" color="gray">: "solid" | "outline" | "ghost"</Text>
              </div>
              <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
                <Code size="1" variant="ghost">size</Code>
                <Text size="1" color="gray">: "1" | "2" | "3" | "4"</Text>
              </div>
              <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
                <Code size="1" variant="ghost">disabled</Code>
                <Text size="1" color="gray">?: boolean</Text>
              </div>
            </Flex>
          </div>
        </div>
      </Flex>
    </div>
}`,
        ...(_oa = (_na = B.parameters) == null ? void 0 : _na.docs) == null ? void 0 : _oa.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_pa = k.parameters) == null ? void 0 : _pa.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: '500px'
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: '16px',
      display: 'block'
    }}>
        Common Git Commands
      </Text>

      <Flex direction="column" gap="3">
        <div>
          <Text size="2" style={{
          marginBottom: '4px',
          display: 'block'
        }}>
            Clone a repository:
          </Text>
          <Code variant="solid" size="1">
            git clone https://github.com/user/repo.git
          </Code>
        </div>

        <div>
          <Text size="2" style={{
          marginBottom: '4px',
          display: 'block'
        }}>
            Add all changes:
          </Text>
          <Code variant="solid" size="1">
            git add .
          </Code>
        </div>

        <div>
          <Text size="2" style={{
          marginBottom: '4px',
          display: 'block'
        }}>
            Commit with message:
          </Text>
          <Code variant="solid" size="1">
            git commit -m "Add new feature"
          </Code>
        </div>

        <div>
          <Text size="2" style={{
          marginBottom: '4px',
          display: 'block'
        }}>
            Push to origin:
          </Text>
          <Code variant="solid" size="1">
            git push origin main
          </Code>
        </div>
      </Flex>
    </div>
}`,
        ...(_ra = (_qa = k.parameters) == null ? void 0 : _qa.docs) == null ? void 0 : _ra.source
      }
    }
  };
  I.parameters = {
    ...I.parameters,
    docs: {
      ...(_sa = I.parameters) == null ? void 0 : _sa.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: '400px'
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: '16px',
      display: 'block'
    }}>
        Build Status
      </Text>

      <Flex direction="column" gap="3">
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
          <Text size="2">Tests:</Text>
          <Code color="green" variant="soft" size="1">PASSED</Code>
        </div>

        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
          <Text size="2">Build:</Text>
          <Code color="green" variant="soft" size="1">SUCCESS</Code>
        </div>

        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
          <Text size="2">Deploy:</Text>
          <Code color="yellow" variant="soft" size="1">PENDING</Code>
        </div>

        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
          <Text size="2">Coverage:</Text>
          <Code color="blue" variant="soft" size="1">87%</Code>
        </div>

        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
          <Text size="2">Bundle size:</Text>
          <Code color="orange" variant="soft" size="1">2.4MB</Code>
        </div>
      </Flex>
    </div>
}`,
        ...(_ua = (_ta = I.parameters) == null ? void 0 : _ta.docs) == null ? void 0 : _ua.source
      }
    }
  };
  P.parameters = {
    ...P.parameters,
    docs: {
      ...(_va = P.parameters) == null ? void 0 : _va.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: '500px'
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: '16px',
      display: 'block'
    }}>
        Project Structure
      </Text>

      <Flex direction="column" gap="1">
        <Code variant="ghost" size="1">src/</Code>
        <Code variant="ghost" size="1" style={{
        marginLeft: '16px'
      }}>components/</Code>
        <Code variant="ghost" size="1" style={{
        marginLeft: '32px'
      }}>Button.tsx</Code>
        <Code variant="ghost" size="1" style={{
        marginLeft: '32px'
      }}>Input.tsx</Code>
        <Code variant="ghost" size="1" style={{
        marginLeft: '32px'
      }}>Modal.tsx</Code>
        <Code variant="ghost" size="1" style={{
        marginLeft: '16px'
      }}>utils/</Code>
        <Code variant="ghost" size="1" style={{
        marginLeft: '32px'
      }}>helpers.ts</Code>
        <Code variant="ghost" size="1" style={{
        marginLeft: '32px'
      }}>constants.ts</Code>
        <Code variant="ghost" size="1" style={{
        marginLeft: '16px'
      }}>App.tsx</Code>
        <Code variant="ghost" size="1" style={{
        marginLeft: '16px'
      }}>main.tsx</Code>
        <Code variant="ghost" size="1">package.json</Code>
        <Code variant="ghost" size="1">tsconfig.json</Code>
      </Flex>
    </div>
}`,
        ...(_xa = (_wa = P.parameters) == null ? void 0 : _wa.docs) == null ? void 0 : _xa.source
      }
    }
  };
  re = [
    "Default",
    "Size1",
    "Size2",
    "Size3",
    "Size4",
    "Solid",
    "Soft",
    "Outline",
    "Ghost",
    "ColorBlue",
    "ColorRed",
    "ColorGreen",
    "ColorPurple",
    "WeightLight",
    "WeightRegular",
    "WeightMedium",
    "WeightBold",
    "HighContrast",
    "AllSizes",
    "AllVariants",
    "InlineCode",
    "CodeSnippetsExample",
    "APIDocumentationExample",
    "TerminalCommandsExample",
    "StatusIndicatorsExample",
    "FilePathsExample"
  ];
});
export {
  B as APIDocumentationExample,
  T as AllSizes,
  S as AllVariants,
  w as CodeSnippetsExample,
  x as ColorBlue,
  u as ColorGreen,
  v as ColorPurple,
  h as ColorRed,
  t as Default,
  P as FilePathsExample,
  g as Ghost,
  f as HighContrast,
  b as InlineCode,
  p as Outline,
  a as Size1,
  n as Size2,
  d as Size3,
  l as Size4,
  m as Soft,
  c as Solid,
  I as StatusIndicatorsExample,
  k as TerminalCommandsExample,
  j as WeightBold,
  C as WeightLight,
  z as WeightMedium,
  y as WeightRegular,
  re as __namedExportsOrder,
  __tla,
  se as default
};
