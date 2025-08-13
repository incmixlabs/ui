import { t as f, r as S, v as B, j as e, S as E, l as k, w as A, T as I, F as i, a as s, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import "./preload-helper-D9Z9MdNV.js";
let m, j, o, z, x, r, p, g, K, h, y, b, t, l, c, a, u, _, V;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y;
  const P = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9"
  ], W = {
    ...f,
    size: {
      type: "enum",
      className: "rt-r-size",
      values: P,
      responsive: true
    }
  }, n = S.forwardRef((d, T) => {
    const { asChild: F, className: w, ...v } = B(d, W, A), C = F ? E : "kbd";
    return e.jsx(C, {
      ...v,
      ref: T,
      className: k("rt-reset", "rt-Kbd", w)
    });
  });
  n.displayName = "Kbd";
  n.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Kbd",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  V = {
    title: "Base/Kbd",
    component: n,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (d) => e.jsx(I, {
        children: e.jsx("div", {
          style: {
            padding: "20px"
          },
          children: e.jsx(d, {})
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
          "4"
        ],
        description: "Keyboard key size"
      }
    },
    args: {
      size: "2",
      children: "Ctrl"
    }
  };
  r = {
    render: (d) => e.jsx(n, {
      ...d,
      children: "Enter"
    })
  };
  t = {
    render: (d) => e.jsx(n, {
      size: "1",
      children: "Esc"
    })
  };
  l = {
    render: (d) => e.jsx(n, {
      size: "2",
      children: "Esc"
    })
  };
  c = {
    render: (d) => e.jsx(n, {
      size: "3",
      children: "Esc"
    })
  };
  a = {
    render: (d) => e.jsx(n, {
      size: "4",
      children: "Esc"
    })
  };
  x = {
    render: () => e.jsxs(i, {
      gap: "2",
      wrap: "wrap",
      children: [
        e.jsx(n, {
          children: "Ctrl"
        }),
        e.jsx(n, {
          children: "Alt"
        }),
        e.jsx(n, {
          children: "Shift"
        }),
        e.jsx(n, {
          children: "Cmd"
        }),
        e.jsx(n, {
          children: "Tab"
        }),
        e.jsx(n, {
          children: "Enter"
        }),
        e.jsx(n, {
          children: "Esc"
        }),
        e.jsx(n, {
          children: "Space"
        })
      ]
    })
  };
  o = {
    render: () => e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "4px",
        width: "120px"
      },
      children: [
        e.jsx("div", {}),
        e.jsx(n, {
          children: "\u2191"
        }),
        e.jsx("div", {}),
        e.jsx(n, {
          children: "\u2190"
        }),
        e.jsx(n, {
          children: "\u2193"
        }),
        e.jsx(n, {
          children: "\u2192"
        })
      ]
    })
  };
  p = {
    render: () => e.jsxs(i, {
      gap: "1",
      wrap: "wrap",
      children: [
        e.jsx(n, {
          size: "1",
          children: "F1"
        }),
        e.jsx(n, {
          size: "1",
          children: "F2"
        }),
        e.jsx(n, {
          size: "1",
          children: "F3"
        }),
        e.jsx(n, {
          size: "1",
          children: "F4"
        }),
        e.jsx(n, {
          size: "1",
          children: "F5"
        }),
        e.jsx(n, {
          size: "1",
          children: "F6"
        }),
        e.jsx(n, {
          size: "1",
          children: "F7"
        }),
        e.jsx(n, {
          size: "1",
          children: "F8"
        }),
        e.jsx(n, {
          size: "1",
          children: "F9"
        }),
        e.jsx(n, {
          size: "1",
          children: "F10"
        }),
        e.jsx(n, {
          size: "1",
          children: "F11"
        }),
        e.jsx(n, {
          size: "1",
          children: "F12"
        })
      ]
    })
  };
  b = {
    render: () => e.jsxs(i, {
      gap: "1",
      children: [
        e.jsx(n, {
          children: "1"
        }),
        e.jsx(n, {
          children: "2"
        }),
        e.jsx(n, {
          children: "3"
        }),
        e.jsx(n, {
          children: "4"
        }),
        e.jsx(n, {
          children: "5"
        }),
        e.jsx(n, {
          children: "6"
        }),
        e.jsx(n, {
          children: "7"
        }),
        e.jsx(n, {
          children: "8"
        }),
        e.jsx(n, {
          children: "9"
        }),
        e.jsx(n, {
          children: "0"
        })
      ]
    })
  };
  h = {
    render: () => e.jsx(i, {
      gap: "1",
      wrap: "wrap",
      style: {
        maxWidth: "300px"
      },
      children: "QWERTYUIOPASDFGHJKLZXCVBNM".split("").map((d) => e.jsx(n, {
        size: "1",
        children: d
      }, d))
    })
  };
  m = {
    render: () => e.jsxs(i, {
      gap: "3",
      align: "end",
      children: [
        e.jsx(n, {
          size: "1",
          children: "A"
        }),
        e.jsx(n, {
          size: "2",
          children: "A"
        }),
        e.jsx(n, {
          size: "3",
          children: "A"
        }),
        e.jsx(n, {
          size: "4",
          children: "A"
        })
      ]
    })
  };
  K = {
    render: () => e.jsx("div", {
      style: {
        maxWidth: "500px"
      },
      children: e.jsxs(s, {
        size: "3",
        style: {
          lineHeight: "1.6"
        },
        children: [
          "Use ",
          e.jsx(n, {
            children: "Ctrl"
          }),
          " + ",
          e.jsx(n, {
            children: "C"
          }),
          " to copy, ",
          e.jsx(n, {
            children: "Ctrl"
          }),
          " +",
          " ",
          e.jsx(n, {
            children: "V"
          }),
          " to paste, and ",
          e.jsx(n, {
            children: "Ctrl"
          }),
          " + ",
          e.jsx(n, {
            children: "Z"
          }),
          " to undo. Press",
          " ",
          e.jsx(n, {
            children: "F5"
          }),
          " to refresh the page or ",
          e.jsx(n, {
            children: "Ctrl"
          }),
          " + ",
          e.jsx(n, {
            children: "Shift"
          }),
          " ",
          "+ ",
          e.jsx(n, {
            children: "R"
          }),
          " for a hard refresh."
        ]
      })
    })
  };
  j = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "400px"
      },
      children: [
        e.jsx(s, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Keyboard Shortcuts"
        }),
        e.jsxs(i, {
          direction: "column",
          gap: "3",
          children: [
            e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              },
              children: [
                e.jsx(s, {
                  size: "2",
                  children: "Save document"
                }),
                e.jsxs(i, {
                  gap: "1",
                  align: "center",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "Ctrl"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "S"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              },
              children: [
                e.jsx(s, {
                  size: "2",
                  children: "Open file"
                }),
                e.jsxs(i, {
                  gap: "1",
                  align: "center",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "Ctrl"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "O"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              },
              children: [
                e.jsx(s, {
                  size: "2",
                  children: "New document"
                }),
                e.jsxs(i, {
                  gap: "1",
                  align: "center",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "Ctrl"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "N"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              },
              children: [
                e.jsx(s, {
                  size: "2",
                  children: "Find in document"
                }),
                e.jsxs(i, {
                  gap: "1",
                  align: "center",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "Ctrl"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "F"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              },
              children: [
                e.jsx(s, {
                  size: "2",
                  children: "Replace text"
                }),
                e.jsxs(i, {
                  gap: "1",
                  align: "center",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "Ctrl"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "H"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              },
              children: [
                e.jsx(s, {
                  size: "2",
                  children: "Print document"
                }),
                e.jsxs(i, {
                  gap: "1",
                  align: "center",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "Ctrl"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "P"
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    })
  };
  z = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "450px"
      },
      children: [
        e.jsx(s, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "VS Code Shortcuts"
        }),
        e.jsxs(i, {
          direction: "column",
          gap: "3",
          children: [
            e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              },
              children: [
                e.jsx(s, {
                  size: "2",
                  children: "Command palette"
                }),
                e.jsxs(i, {
                  gap: "1",
                  align: "center",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "Ctrl"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "Shift"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "P"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              },
              children: [
                e.jsx(s, {
                  size: "2",
                  children: "Quick file open"
                }),
                e.jsxs(i, {
                  gap: "1",
                  align: "center",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "Ctrl"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "P"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              },
              children: [
                e.jsx(s, {
                  size: "2",
                  children: "Toggle sidebar"
                }),
                e.jsxs(i, {
                  gap: "1",
                  align: "center",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "Ctrl"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "B"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              },
              children: [
                e.jsx(s, {
                  size: "2",
                  children: "Integrated terminal"
                }),
                e.jsxs(i, {
                  gap: "1",
                  align: "center",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "Ctrl"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "`"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              },
              children: [
                e.jsx(s, {
                  size: "2",
                  children: "Format document"
                }),
                e.jsxs(i, {
                  gap: "1",
                  align: "center",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "Shift"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "Alt"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "F"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              },
              children: [
                e.jsx(s, {
                  size: "2",
                  children: "Multi-cursor"
                }),
                e.jsxs(i, {
                  gap: "1",
                  align: "center",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "Ctrl"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "Alt"
                    }),
                    e.jsx(s, {
                      size: "1",
                      children: "+"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "\u2193"
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    })
  };
  g = {
    render: () => e.jsxs("div", {
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
          children: "Gaming Controls"
        }),
        e.jsxs(i, {
          direction: "column",
          gap: "3",
          children: [
            e.jsxs("div", {
              children: [
                e.jsx(s, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px",
                    display: "block"
                  },
                  children: "Movement"
                }),
                e.jsxs(i, {
                  gap: "2",
                  children: [
                    e.jsx(n, {
                      children: "W"
                    }),
                    e.jsx(n, {
                      children: "A"
                    }),
                    e.jsx(n, {
                      children: "S"
                    }),
                    e.jsx(n, {
                      children: "D"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(s, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px",
                    display: "block"
                  },
                  children: "Actions"
                }),
                e.jsxs(i, {
                  gap: "2",
                  wrap: "wrap",
                  children: [
                    e.jsx(n, {
                      children: "Space"
                    }),
                    e.jsx(n, {
                      children: "Shift"
                    }),
                    e.jsx(n, {
                      children: "Ctrl"
                    }),
                    e.jsx(n, {
                      children: "E"
                    }),
                    e.jsx(n, {
                      children: "R"
                    }),
                    e.jsx(n, {
                      children: "F"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(s, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px",
                    display: "block"
                  },
                  children: "Numbers"
                }),
                e.jsxs(i, {
                  gap: "1",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "1"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "2"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "3"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "4"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "5"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(s, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px",
                    display: "block"
                  },
                  children: "System"
                }),
                e.jsxs(i, {
                  gap: "2",
                  wrap: "wrap",
                  children: [
                    e.jsx(n, {
                      size: "1",
                      children: "Tab"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "Esc"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "Enter"
                    }),
                    e.jsx(n, {
                      size: "1",
                      children: "M"
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    })
  };
  y = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "500px"
      },
      children: [
        e.jsx(s, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Platform Shortcuts"
        }),
        e.jsxs(i, {
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
                  children: "Copy & Paste"
                }),
                e.jsxs(i, {
                  justify: "between",
                  align: "center",
                  style: {
                    marginBottom: "8px"
                  },
                  children: [
                    e.jsx(s, {
                      size: "2",
                      color: "gray",
                      children: "Windows/Linux:"
                    }),
                    e.jsxs(i, {
                      gap: "1",
                      children: [
                        e.jsx(n, {
                          size: "1",
                          children: "Ctrl"
                        }),
                        e.jsx(s, {
                          size: "1",
                          children: "+"
                        }),
                        e.jsx(n, {
                          size: "1",
                          children: "C"
                        }),
                        e.jsx(s, {
                          size: "1",
                          style: {
                            margin: "0 8px"
                          },
                          children: "/"
                        }),
                        e.jsx(n, {
                          size: "1",
                          children: "Ctrl"
                        }),
                        e.jsx(s, {
                          size: "1",
                          children: "+"
                        }),
                        e.jsx(n, {
                          size: "1",
                          children: "V"
                        })
                      ]
                    })
                  ]
                }),
                e.jsxs(i, {
                  justify: "between",
                  align: "center",
                  children: [
                    e.jsx(s, {
                      size: "2",
                      color: "gray",
                      children: "macOS:"
                    }),
                    e.jsxs(i, {
                      gap: "1",
                      children: [
                        e.jsx(n, {
                          size: "1",
                          children: "\u2318"
                        }),
                        e.jsx(s, {
                          size: "1",
                          children: "+"
                        }),
                        e.jsx(n, {
                          size: "1",
                          children: "C"
                        }),
                        e.jsx(s, {
                          size: "1",
                          style: {
                            margin: "0 8px"
                          },
                          children: "/"
                        }),
                        e.jsx(n, {
                          size: "1",
                          children: "\u2318"
                        }),
                        e.jsx(s, {
                          size: "1",
                          children: "+"
                        }),
                        e.jsx(n, {
                          size: "1",
                          children: "V"
                        })
                      ]
                    })
                  ]
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
                  children: "Select All"
                }),
                e.jsxs(i, {
                  justify: "between",
                  align: "center",
                  style: {
                    marginBottom: "8px"
                  },
                  children: [
                    e.jsx(s, {
                      size: "2",
                      color: "gray",
                      children: "Windows/Linux:"
                    }),
                    e.jsxs(i, {
                      gap: "1",
                      children: [
                        e.jsx(n, {
                          size: "1",
                          children: "Ctrl"
                        }),
                        e.jsx(s, {
                          size: "1",
                          children: "+"
                        }),
                        e.jsx(n, {
                          size: "1",
                          children: "A"
                        })
                      ]
                    })
                  ]
                }),
                e.jsxs(i, {
                  justify: "between",
                  align: "center",
                  children: [
                    e.jsx(s, {
                      size: "2",
                      color: "gray",
                      children: "macOS:"
                    }),
                    e.jsxs(i, {
                      gap: "1",
                      children: [
                        e.jsx(n, {
                          size: "1",
                          children: "\u2318"
                        }),
                        e.jsx(s, {
                          size: "1",
                          children: "+"
                        }),
                        e.jsx(n, {
                          size: "1",
                          children: "A"
                        })
                      ]
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    })
  };
  u = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "400px"
      },
      children: [
        e.jsx(s, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Special Keys"
        }),
        e.jsxs(i, {
          direction: "column",
          gap: "3",
          children: [
            e.jsxs("div", {
              children: [
                e.jsx(s, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px",
                    display: "block"
                  },
                  children: "Modifier Keys"
                }),
                e.jsxs(i, {
                  gap: "2",
                  wrap: "wrap",
                  children: [
                    e.jsx(n, {
                      children: "\u2318"
                    }),
                    e.jsx(n, {
                      children: "\u2303"
                    }),
                    e.jsx(n, {
                      children: "\u2325"
                    }),
                    e.jsx(n, {
                      children: "\u21E7"
                    }),
                    e.jsx(n, {
                      children: "\u21EA"
                    }),
                    e.jsx(n, {
                      children: "\u232B"
                    }),
                    e.jsx(n, {
                      children: "\u2326"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(s, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px",
                    display: "block"
                  },
                  children: "Navigation Keys"
                }),
                e.jsxs(i, {
                  gap: "2",
                  wrap: "wrap",
                  children: [
                    e.jsx(n, {
                      children: "\u2191"
                    }),
                    e.jsx(n, {
                      children: "\u2193"
                    }),
                    e.jsx(n, {
                      children: "\u2190"
                    }),
                    e.jsx(n, {
                      children: "\u2192"
                    }),
                    e.jsx(n, {
                      children: "\u21DE"
                    }),
                    e.jsx(n, {
                      children: "\u21DF"
                    }),
                    e.jsx(n, {
                      children: "\u2196"
                    }),
                    e.jsx(n, {
                      children: "\u2198"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(s, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px",
                    display: "block"
                  },
                  children: "Action Keys"
                }),
                e.jsxs(i, {
                  gap: "2",
                  wrap: "wrap",
                  children: [
                    e.jsx(n, {
                      children: "\u23CE"
                    }),
                    e.jsx(n, {
                      children: "\u21E5"
                    }),
                    e.jsx(n, {
                      children: "\u238B"
                    }),
                    e.jsx(n, {
                      children: "\u2327"
                    }),
                    e.jsx(n, {
                      children: "\u23CF"
                    })
                  ]
                })
              ]
            })
          ]
        })
      ]
    })
  };
  r.parameters = {
    ...r.parameters,
    docs: {
      ...(_a = r.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => <Kbd {...args}>Enter</Kbd>
}`,
        ...(_c = (_b = r.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  t.parameters = {
    ...t.parameters,
    docs: {
      ...(_d = t.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: _args => <Kbd size="1">Esc</Kbd>
}`,
        ...(_f = (_e = t.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_g = l.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <Kbd size="2">Esc</Kbd>
}`,
        ...(_i = (_h = l.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  c.parameters = {
    ...c.parameters,
    docs: {
      ...(_j = c.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: _args => <Kbd size="3">Esc</Kbd>
}`,
        ...(_l = (_k = c.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  a.parameters = {
    ...a.parameters,
    docs: {
      ...(_m = a.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: _args => <Kbd size="4">Esc</Kbd>
}`,
        ...(_o = (_n = a.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_p = x.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="2" wrap="wrap">
      <Kbd>Ctrl</Kbd>
      <Kbd>Alt</Kbd>
      <Kbd>Shift</Kbd>
      <Kbd>Cmd</Kbd>
      <Kbd>Tab</Kbd>
      <Kbd>Enter</Kbd>
      <Kbd>Esc</Kbd>
      <Kbd>Space</Kbd>
    </Flex>
}`,
        ...(_r = (_q = x.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  o.parameters = {
    ...o.parameters,
    docs: {
      ...(_s = o.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "4px",
    width: "120px"
  }}>
      <div />
      <Kbd>\u2191</Kbd>
      <div />
      <Kbd>\u2190</Kbd>
      <Kbd>\u2193</Kbd>
      <Kbd>\u2192</Kbd>
    </div>
}`,
        ...(_u = (_t = o.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_v = p.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="1" wrap="wrap">
      <Kbd size="1">F1</Kbd>
      <Kbd size="1">F2</Kbd>
      <Kbd size="1">F3</Kbd>
      <Kbd size="1">F4</Kbd>
      <Kbd size="1">F5</Kbd>
      <Kbd size="1">F6</Kbd>
      <Kbd size="1">F7</Kbd>
      <Kbd size="1">F8</Kbd>
      <Kbd size="1">F9</Kbd>
      <Kbd size="1">F10</Kbd>
      <Kbd size="1">F11</Kbd>
      <Kbd size="1">F12</Kbd>
    </Flex>
}`,
        ...(_x = (_w = p.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_y = b.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="1">
      <Kbd>1</Kbd>
      <Kbd>2</Kbd>
      <Kbd>3</Kbd>
      <Kbd>4</Kbd>
      <Kbd>5</Kbd>
      <Kbd>6</Kbd>
      <Kbd>7</Kbd>
      <Kbd>8</Kbd>
      <Kbd>9</Kbd>
      <Kbd>0</Kbd>
    </Flex>
}`,
        ...(_A = (_z = b.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_B = h.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="1" wrap="wrap" style={{
    maxWidth: "300px"
  }}>
      {"QWERTYUIOPASDFGHJKLZXCVBNM".split("").map(letter => <Kbd key={letter} size="1">
          {letter}
        </Kbd>)}
    </Flex>
}`,
        ...(_D = (_C = h.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_E = m.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="3" align="end">
      <Kbd size="1">A</Kbd>
      <Kbd size="2">A</Kbd>
      <Kbd size="3">A</Kbd>
      <Kbd size="4">A</Kbd>
    </Flex>
}`,
        ...(_G = (_F = m.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  K.parameters = {
    ...K.parameters,
    docs: {
      ...(_H = K.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "500px"
  }}>
      <Text size="3" style={{
      lineHeight: "1.6"
    }}>
        Use <Kbd>Ctrl</Kbd> + <Kbd>C</Kbd> to copy, <Kbd>Ctrl</Kbd> +{" "}
        <Kbd>V</Kbd> to paste, and <Kbd>Ctrl</Kbd> + <Kbd>Z</Kbd> to undo. Press{" "}
        <Kbd>F5</Kbd> to refresh the page or <Kbd>Ctrl</Kbd> + <Kbd>Shift</Kbd>{" "}
        + <Kbd>R</Kbd> for a hard refresh.
      </Text>
    </div>
}`,
        ...(_J = (_I = K.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_K = j.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "400px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Keyboard Shortcuts
      </Text>

      <Flex direction="column" gap="3">
        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
          <Text size="2">Save document</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">S</Kbd>
          </Flex>
        </div>

        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
          <Text size="2">Open file</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">O</Kbd>
          </Flex>
        </div>

        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
          <Text size="2">New document</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">N</Kbd>
          </Flex>
        </div>

        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
          <Text size="2">Find in document</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">F</Kbd>
          </Flex>
        </div>

        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
          <Text size="2">Replace text</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">H</Kbd>
          </Flex>
        </div>

        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
          <Text size="2">Print document</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">P</Kbd>
          </Flex>
        </div>
      </Flex>
    </div>
}`,
        ...(_M = (_L = j.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_N = z.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "450px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        VS Code Shortcuts
      </Text>

      <Flex direction="column" gap="3">
        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
          <Text size="2">Command palette</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">Shift</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">P</Kbd>
          </Flex>
        </div>

        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
          <Text size="2">Quick file open</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">P</Kbd>
          </Flex>
        </div>

        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
          <Text size="2">Toggle sidebar</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">B</Kbd>
          </Flex>
        </div>

        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
          <Text size="2">Integrated terminal</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">\`</Kbd>
          </Flex>
        </div>

        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
          <Text size="2">Format document</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Shift</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">Alt</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">F</Kbd>
          </Flex>
        </div>

        <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
          <Text size="2">Multi-cursor</Text>
          <Flex gap="1" align="center">
            <Kbd size="1">Ctrl</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">Alt</Kbd>
            <Text size="1">+</Text>
            <Kbd size="1">\u2193</Kbd>
          </Flex>
        </div>
      </Flex>
    </div>
}`,
        ...(_P = (_O = z.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  g.parameters = {
    ...g.parameters,
    docs: {
      ...(_Q = g.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "350px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Gaming Controls
      </Text>

      <Flex direction="column" gap="3">
        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Movement
          </Text>
          <Flex gap="2">
            <Kbd>W</Kbd>
            <Kbd>A</Kbd>
            <Kbd>S</Kbd>
            <Kbd>D</Kbd>
          </Flex>
        </div>

        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Actions
          </Text>
          <Flex gap="2" wrap="wrap">
            <Kbd>Space</Kbd>
            <Kbd>Shift</Kbd>
            <Kbd>Ctrl</Kbd>
            <Kbd>E</Kbd>
            <Kbd>R</Kbd>
            <Kbd>F</Kbd>
          </Flex>
        </div>

        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Numbers
          </Text>
          <Flex gap="1">
            <Kbd size="1">1</Kbd>
            <Kbd size="1">2</Kbd>
            <Kbd size="1">3</Kbd>
            <Kbd size="1">4</Kbd>
            <Kbd size="1">5</Kbd>
          </Flex>
        </div>

        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            System
          </Text>
          <Flex gap="2" wrap="wrap">
            <Kbd size="1">Tab</Kbd>
            <Kbd size="1">Esc</Kbd>
            <Kbd size="1">Enter</Kbd>
            <Kbd size="1">M</Kbd>
          </Flex>
        </div>
      </Flex>
    </div>
}`,
        ...(_S = (_R = g.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_T = y.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "500px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Platform Shortcuts
      </Text>

      <Flex direction="column" gap="4">
        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "12px",
          display: "block"
        }}>
            Copy & Paste
          </Text>
          <Flex justify="between" align="center" style={{
          marginBottom: "8px"
        }}>
            <Text size="2" color="gray">
              Windows/Linux:
            </Text>
            <Flex gap="1">
              <Kbd size="1">Ctrl</Kbd>
              <Text size="1">+</Text>
              <Kbd size="1">C</Kbd>
              <Text size="1" style={{
              margin: "0 8px"
            }}>
                /
              </Text>
              <Kbd size="1">Ctrl</Kbd>
              <Text size="1">+</Text>
              <Kbd size="1">V</Kbd>
            </Flex>
          </Flex>
          <Flex justify="between" align="center">
            <Text size="2" color="gray">
              macOS:
            </Text>
            <Flex gap="1">
              <Kbd size="1">\u2318</Kbd>
              <Text size="1">+</Text>
              <Kbd size="1">C</Kbd>
              <Text size="1" style={{
              margin: "0 8px"
            }}>
                /
              </Text>
              <Kbd size="1">\u2318</Kbd>
              <Text size="1">+</Text>
              <Kbd size="1">V</Kbd>
            </Flex>
          </Flex>
        </div>

        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "12px",
          display: "block"
        }}>
            Select All
          </Text>
          <Flex justify="between" align="center" style={{
          marginBottom: "8px"
        }}>
            <Text size="2" color="gray">
              Windows/Linux:
            </Text>
            <Flex gap="1">
              <Kbd size="1">Ctrl</Kbd>
              <Text size="1">+</Text>
              <Kbd size="1">A</Kbd>
            </Flex>
          </Flex>
          <Flex justify="between" align="center">
            <Text size="2" color="gray">
              macOS:
            </Text>
            <Flex gap="1">
              <Kbd size="1">\u2318</Kbd>
              <Text size="1">+</Text>
              <Kbd size="1">A</Kbd>
            </Flex>
          </Flex>
        </div>
      </Flex>
    </div>
}`,
        ...(_V = (_U = y.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_W = u.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "400px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Special Keys
      </Text>

      <Flex direction="column" gap="3">
        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Modifier Keys
          </Text>
          <Flex gap="2" wrap="wrap">
            <Kbd>\u2318</Kbd>
            <Kbd>\u2303</Kbd>
            <Kbd>\u2325</Kbd>
            <Kbd>\u21E7</Kbd>
            <Kbd>\u21EA</Kbd>
            <Kbd>\u232B</Kbd>
            <Kbd>\u2326</Kbd>
          </Flex>
        </div>

        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Navigation Keys
          </Text>
          <Flex gap="2" wrap="wrap">
            <Kbd>\u2191</Kbd>
            <Kbd>\u2193</Kbd>
            <Kbd>\u2190</Kbd>
            <Kbd>\u2192</Kbd>
            <Kbd>\u21DE</Kbd>
            <Kbd>\u21DF</Kbd>
            <Kbd>\u2196</Kbd>
            <Kbd>\u2198</Kbd>
          </Flex>
        </div>

        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Action Keys
          </Text>
          <Flex gap="2" wrap="wrap">
            <Kbd>\u23CE</Kbd>
            <Kbd>\u21E5</Kbd>
            <Kbd>\u238B</Kbd>
            <Kbd>\u2327</Kbd>
            <Kbd>\u23CF</Kbd>
          </Flex>
        </div>
      </Flex>
    </div>
}`,
        ...(_Y = (_X = u.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  _ = [
    "Default",
    "Size1",
    "Size2",
    "Size3",
    "Size4",
    "CommonKeys",
    "ArrowKeys",
    "FunctionKeys",
    "NumberKeys",
    "LetterKeys",
    "AllSizes",
    "InlineShortcuts",
    "ApplicationShortcutsExample",
    "CodeEditorShortcutsExample",
    "GamingShortcutsExample",
    "MacVsPCExample",
    "SpecialCharactersExample"
  ];
});
export {
  m as AllSizes,
  j as ApplicationShortcutsExample,
  o as ArrowKeys,
  z as CodeEditorShortcutsExample,
  x as CommonKeys,
  r as Default,
  p as FunctionKeys,
  g as GamingShortcutsExample,
  K as InlineShortcuts,
  h as LetterKeys,
  y as MacVsPCExample,
  b as NumberKeys,
  t as Size1,
  l as Size2,
  c as Size3,
  a as Size4,
  u as SpecialCharactersExample,
  _ as __namedExportsOrder,
  __tla,
  V as default
};
