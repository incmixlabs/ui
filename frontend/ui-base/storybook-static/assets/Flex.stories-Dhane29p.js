import { j as e, F as r, T as R, a as t, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { B as i, __tla as __tla_1 } from "./button-BF2Wetgg.js";
import { B as S, __tla as __tla_2 } from "./box-Dr3vL6g-.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_3 } from "./base-button-BHQkXpSv.js";
let u, m, g, c, h, a, o, p, d, x, T, I, y, j, F, C, z, b, v, w, O, L;
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
  let n;
  L = {
    title: "Base/Flex",
    component: r,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (s) => e.jsx(R, {
        children: e.jsx(s, {})
      })
    ],
    argTypes: {
      as: {
        control: "select",
        options: [
          "div",
          "span"
        ],
        description: "HTML element to render"
      },
      display: {
        control: "select",
        options: [
          "none",
          "inline-flex",
          "flex"
        ],
        description: "CSS display property"
      },
      direction: {
        control: "select",
        options: [
          "row",
          "column",
          "row-reverse",
          "column-reverse"
        ],
        description: "Flex direction"
      },
      align: {
        control: "select",
        options: [
          "start",
          "center",
          "end",
          "baseline",
          "stretch"
        ],
        description: "Align items (cross-axis)"
      },
      justify: {
        control: "select",
        options: [
          "start",
          "center",
          "end",
          "between"
        ],
        description: "Justify content (main-axis)"
      },
      wrap: {
        control: "select",
        options: [
          "nowrap",
          "wrap",
          "wrap-reverse"
        ],
        description: "Flex wrap behavior"
      },
      gap: {
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
        description: "Gap between items"
      },
      asChild: {
        control: "boolean",
        description: "Merge props with the child element"
      }
    },
    args: {
      as: "div",
      display: "flex",
      gap: "2"
    }
  };
  n = ({ children: s, ...l }) => e.jsx(S, {
    style: {
      padding: "12px",
      backgroundColor: "var(--blue-3)",
      borderRadius: "6px",
      minWidth: "60px",
      textAlign: "center",
      ...l.style
    },
    ...l,
    children: e.jsx(t, {
      size: "2",
      children: s
    })
  });
  a = {
    render: (s) => e.jsxs(r, {
      ...s,
      children: [
        e.jsx(n, {
          children: "Item 1"
        }),
        e.jsx(n, {
          children: "Item 2"
        }),
        e.jsx(n, {
          children: "Item 3"
        })
      ]
    })
  };
  d = {
    render: () => e.jsxs(r, {
      direction: "row",
      gap: "3",
      children: [
        e.jsx(n, {
          children: "First"
        }),
        e.jsx(n, {
          children: "Second"
        }),
        e.jsx(n, {
          children: "Third"
        })
      ]
    })
  };
  o = {
    render: () => e.jsxs(r, {
      direction: "column",
      gap: "3",
      children: [
        e.jsx(n, {
          children: "First"
        }),
        e.jsx(n, {
          children: "Second"
        }),
        e.jsx(n, {
          children: "Third"
        })
      ]
    })
  };
  x = {
    render: () => e.jsxs(r, {
      direction: "row-reverse",
      gap: "3",
      children: [
        e.jsx(n, {
          children: "First"
        }),
        e.jsx(n, {
          children: "Second"
        }),
        e.jsx(n, {
          children: "Third"
        })
      ]
    })
  };
  p = {
    render: () => e.jsxs(r, {
      direction: "column-reverse",
      gap: "3",
      children: [
        e.jsx(n, {
          children: "First"
        }),
        e.jsx(n, {
          children: "Second"
        }),
        e.jsx(n, {
          children: "Third"
        })
      ]
    })
  };
  c = {
    render: () => e.jsxs(r, {
      align: "start",
      gap: "2",
      style: {
        height: "100px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px"
      },
      children: [
        e.jsx(n, {
          style: {
            height: "40px"
          },
          children: "Small"
        }),
        e.jsx(n, {
          style: {
            height: "60px"
          },
          children: "Medium"
        }),
        e.jsx(n, {
          style: {
            height: "30px"
          },
          children: "Tiny"
        })
      ]
    })
  };
  m = {
    render: () => e.jsxs(r, {
      align: "center",
      gap: "2",
      style: {
        height: "100px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px"
      },
      children: [
        e.jsx(n, {
          style: {
            height: "40px"
          },
          children: "Small"
        }),
        e.jsx(n, {
          style: {
            height: "60px"
          },
          children: "Medium"
        }),
        e.jsx(n, {
          style: {
            height: "30px"
          },
          children: "Tiny"
        })
      ]
    })
  };
  g = {
    render: () => e.jsxs(r, {
      align: "end",
      gap: "2",
      style: {
        height: "100px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px"
      },
      children: [
        e.jsx(n, {
          style: {
            height: "40px"
          },
          children: "Small"
        }),
        e.jsx(n, {
          style: {
            height: "60px"
          },
          children: "Medium"
        }),
        e.jsx(n, {
          style: {
            height: "30px"
          },
          children: "Tiny"
        })
      ]
    })
  };
  h = {
    render: () => e.jsxs(r, {
      align: "stretch",
      gap: "2",
      style: {
        height: "100px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px"
      },
      children: [
        e.jsx(n, {
          children: "Stretched"
        }),
        e.jsx(n, {
          children: "Items"
        }),
        e.jsx(n, {
          children: "All Same Height"
        })
      ]
    })
  };
  u = {
    render: () => e.jsxs(r, {
      align: "baseline",
      gap: "2",
      style: {
        height: "100px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px"
      },
      children: [
        e.jsx(n, {
          style: {
            fontSize: "12px",
            padding: "8px"
          },
          children: "Small text"
        }),
        e.jsx(n, {
          style: {
            fontSize: "20px",
            padding: "16px"
          },
          children: "Large text"
        }),
        e.jsx(n, {
          style: {
            fontSize: "14px",
            padding: "10px"
          },
          children: "Medium text"
        })
      ]
    })
  };
  F = {
    render: () => e.jsxs(r, {
      justify: "start",
      gap: "2",
      style: {
        width: "300px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px"
      },
      children: [
        e.jsx(n, {
          children: "One"
        }),
        e.jsx(n, {
          children: "Two"
        })
      ]
    })
  };
  y = {
    render: () => e.jsxs(r, {
      justify: "center",
      gap: "2",
      style: {
        width: "300px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px"
      },
      children: [
        e.jsx(n, {
          children: "One"
        }),
        e.jsx(n, {
          children: "Two"
        })
      ]
    })
  };
  j = {
    render: () => e.jsxs(r, {
      justify: "end",
      gap: "2",
      style: {
        width: "300px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px"
      },
      children: [
        e.jsx(n, {
          children: "One"
        }),
        e.jsx(n, {
          children: "Two"
        })
      ]
    })
  };
  I = {
    render: () => e.jsxs(r, {
      justify: "between",
      gap: "2",
      style: {
        width: "300px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px"
      },
      children: [
        e.jsx(n, {
          children: "One"
        }),
        e.jsx(n, {
          children: "Two"
        }),
        e.jsx(n, {
          children: "Three"
        })
      ]
    })
  };
  b = {
    render: () => e.jsxs(r, {
      wrap: "nowrap",
      gap: "2",
      style: {
        width: "200px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px"
      },
      children: [
        e.jsx(n, {
          style: {
            minWidth: "80px"
          },
          children: "Item 1"
        }),
        e.jsx(n, {
          style: {
            minWidth: "80px"
          },
          children: "Item 2"
        }),
        e.jsx(n, {
          style: {
            minWidth: "80px"
          },
          children: "Item 3"
        }),
        e.jsx(n, {
          style: {
            minWidth: "80px"
          },
          children: "Item 4"
        })
      ]
    })
  };
  w = {
    render: () => e.jsxs(r, {
      wrap: "wrap",
      gap: "2",
      style: {
        width: "200px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px"
      },
      children: [
        e.jsx(n, {
          style: {
            minWidth: "80px"
          },
          children: "Item 1"
        }),
        e.jsx(n, {
          style: {
            minWidth: "80px"
          },
          children: "Item 2"
        }),
        e.jsx(n, {
          style: {
            minWidth: "80px"
          },
          children: "Item 3"
        }),
        e.jsx(n, {
          style: {
            minWidth: "80px"
          },
          children: "Item 4"
        })
      ]
    })
  };
  v = {
    render: () => e.jsxs(r, {
      wrap: "wrap-reverse",
      gap: "2",
      style: {
        width: "200px",
        backgroundColor: "var(--gray-2)",
        padding: "8px",
        borderRadius: "8px"
      },
      children: [
        e.jsx(n, {
          style: {
            minWidth: "80px"
          },
          children: "Item 1"
        }),
        e.jsx(n, {
          style: {
            minWidth: "80px"
          },
          children: "Item 2"
        }),
        e.jsx(n, {
          style: {
            minWidth: "80px"
          },
          children: "Item 3"
        }),
        e.jsx(n, {
          style: {
            minWidth: "80px"
          },
          children: "Item 4"
        })
      ]
    })
  };
  T = {
    render: () => e.jsxs(r, {
      direction: "column",
      gap: "4",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(t, {
              size: "2",
              weight: "medium",
              color: "gray",
              children: "Gap 1:"
            }),
            e.jsxs(r, {
              gap: "1",
              style: {
                marginTop: "4px"
              },
              children: [
                e.jsx(n, {
                  children: "A"
                }),
                e.jsx(n, {
                  children: "B"
                }),
                e.jsx(n, {
                  children: "C"
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(t, {
              size: "2",
              weight: "medium",
              color: "gray",
              children: "Gap 3:"
            }),
            e.jsxs(r, {
              gap: "3",
              style: {
                marginTop: "4px"
              },
              children: [
                e.jsx(n, {
                  children: "A"
                }),
                e.jsx(n, {
                  children: "B"
                }),
                e.jsx(n, {
                  children: "C"
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(t, {
              size: "2",
              weight: "medium",
              color: "gray",
              children: "Gap 6:"
            }),
            e.jsxs(r, {
              gap: "6",
              style: {
                marginTop: "4px"
              },
              children: [
                e.jsx(n, {
                  children: "A"
                }),
                e.jsx(n, {
                  children: "B"
                }),
                e.jsx(n, {
                  children: "C"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  C = {
    render: () => e.jsxs(r, {
      direction: "column",
      gap: "6",
      style: {
        width: "400px"
      },
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(t, {
              size: "3",
              weight: "bold",
              children: "Header Layout"
            }),
            e.jsxs(r, {
              justify: "between",
              align: "center",
              gap: "3",
              style: {
                padding: "12px",
                backgroundColor: "var(--blue-2)",
                borderRadius: "8px",
                marginTop: "8px"
              },
              children: [
                e.jsx(t, {
                  size: "4",
                  weight: "medium",
                  children: "Logo"
                }),
                e.jsxs(r, {
                  gap: "2",
                  children: [
                    e.jsx(i, {
                      size: "1",
                      variant: "ghost",
                      children: "Home"
                    }),
                    e.jsx(i, {
                      size: "1",
                      variant: "ghost",
                      children: "About"
                    }),
                    e.jsx(i, {
                      size: "1",
                      variant: "ghost",
                      children: "Contact"
                    })
                  ]
                }),
                e.jsx(i, {
                  size: "1",
                  children: "Sign In"
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(t, {
              size: "3",
              weight: "bold",
              children: "Card Layout"
            }),
            e.jsxs(r, {
              direction: "column",
              gap: "3",
              style: {
                padding: "16px",
                backgroundColor: "var(--gray-2)",
                borderRadius: "8px",
                marginTop: "8px"
              },
              children: [
                e.jsx(t, {
                  size: "4",
                  weight: "medium",
                  children: "Card Title"
                }),
                e.jsx(t, {
                  size: "2",
                  children: "Card description content goes here."
                }),
                e.jsxs(r, {
                  justify: "end",
                  gap: "2",
                  children: [
                    e.jsx(i, {
                      size: "1",
                      variant: "outline",
                      children: "Cancel"
                    }),
                    e.jsx(i, {
                      size: "1",
                      children: "Save"
                    })
                  ]
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(t, {
              size: "3",
              weight: "bold",
              children: "Form Row"
            }),
            e.jsxs(r, {
              align: "center",
              gap: "3",
              style: {
                padding: "12px",
                backgroundColor: "var(--green-2)",
                borderRadius: "8px",
                marginTop: "8px"
              },
              children: [
                e.jsx(S, {
                  style: {
                    minWidth: "80px"
                  },
                  children: e.jsx(t, {
                    size: "2",
                    weight: "medium",
                    children: "Label:"
                  })
                }),
                e.jsx(S, {
                  style: {
                    flex: 1,
                    padding: "8px",
                    backgroundColor: "white",
                    borderRadius: "4px"
                  },
                  children: e.jsx(t, {
                    size: "2",
                    color: "gray",
                    children: "Input field"
                  })
                }),
                e.jsx(i, {
                  size: "1",
                  children: "Submit"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  z = {
    render: () => e.jsxs(r, {
      direction: "column",
      gap: "4",
      style: {
        maxWidth: "500px"
      },
      children: [
        e.jsx(t, {
          size: "5",
          weight: "bold",
          children: "Dashboard Layout"
        }),
        e.jsxs(r, {
          justify: "between",
          align: "center",
          style: {
            padding: "12px 16px",
            backgroundColor: "var(--blue-9)",
            borderRadius: "8px"
          },
          children: [
            e.jsx(t, {
              size: "3",
              weight: "medium",
              style: {
                color: "white"
              },
              children: "Dashboard"
            }),
            e.jsxs(r, {
              gap: "2",
              children: [
                e.jsx(i, {
                  size: "1",
                  variant: "ghost",
                  style: {
                    color: "white"
                  },
                  children: "Profile"
                }),
                e.jsx(i, {
                  size: "1",
                  variant: "ghost",
                  style: {
                    color: "white"
                  },
                  children: "Settings"
                })
              ]
            })
          ]
        }),
        e.jsx(r, {
          gap: "3",
          wrap: "wrap",
          children: [
            "Users",
            "Orders",
            "Revenue"
          ].map((s, l) => e.jsxs(r, {
            direction: "column",
            gap: "1",
            style: {
              padding: "16px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "8px",
              flex: "1",
              minWidth: "120px"
            },
            children: [
              e.jsx(t, {
                size: "1",
                weight: "medium",
                color: "gray",
                children: s
              }),
              e.jsx(t, {
                size: "4",
                weight: "bold",
                children: 1e3 + l * 500
              })
            ]
          }, s))
        }),
        e.jsxs(r, {
          gap: "4",
          wrap: "wrap",
          align: "start",
          children: [
            e.jsxs(r, {
              direction: "column",
              gap: "2",
              style: {
                flex: "2",
                minWidth: "200px"
              },
              children: [
                e.jsx(t, {
                  size: "3",
                  weight: "medium",
                  children: "Recent Activity"
                }),
                e.jsx(r, {
                  direction: "column",
                  gap: "2",
                  children: [
                    "New user registered",
                    "Order completed",
                    "Payment received"
                  ].map((s, l) => e.jsxs(r, {
                    align: "center",
                    gap: "2",
                    style: {
                      padding: "8px 12px",
                      backgroundColor: "var(--gray-2)",
                      borderRadius: "6px"
                    },
                    children: [
                      e.jsx(S, {
                        style: {
                          width: "8px",
                          height: "8px",
                          backgroundColor: l === 0 ? "var(--green-9)" : "var(--blue-9)",
                          borderRadius: "50%"
                        }
                      }),
                      e.jsx(t, {
                        size: "2",
                        children: s
                      })
                    ]
                  }, l))
                })
              ]
            }),
            e.jsxs(r, {
              direction: "column",
              gap: "2",
              style: {
                flex: "1",
                minWidth: "150px"
              },
              children: [
                e.jsx(t, {
                  size: "3",
                  weight: "medium",
                  children: "Quick Actions"
                }),
                e.jsxs(r, {
                  direction: "column",
                  gap: "2",
                  children: [
                    e.jsx(i, {
                      size: "2",
                      variant: "outline",
                      children: "Add User"
                    }),
                    e.jsx(i, {
                      size: "2",
                      variant: "outline",
                      children: "Create Order"
                    }),
                    e.jsx(i, {
                      size: "2",
                      variant: "outline",
                      children: "View Reports"
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
  a.parameters = {
    ...a.parameters,
    docs: {
      ...(_a = a.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => <Flex {...args}>
      <FlexItem>Item 1</FlexItem>
      <FlexItem>Item 2</FlexItem>
      <FlexItem>Item 3</FlexItem>
    </Flex>
}`,
        ...(_c = (_b = a.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  d.parameters = {
    ...d.parameters,
    docs: {
      ...(_d = d.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="row" gap="3">
      <FlexItem>First</FlexItem>
      <FlexItem>Second</FlexItem>
      <FlexItem>Third</FlexItem>
    </Flex>
}`,
        ...(_f = (_e = d.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  o.parameters = {
    ...o.parameters,
    docs: {
      ...(_g = o.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="3">
      <FlexItem>First</FlexItem>
      <FlexItem>Second</FlexItem>
      <FlexItem>Third</FlexItem>
    </Flex>
}`,
        ...(_i = (_h = o.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_j = x.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="row-reverse" gap="3">
      <FlexItem>First</FlexItem>
      <FlexItem>Second</FlexItem>
      <FlexItem>Third</FlexItem>
    </Flex>
}`,
        ...(_l = (_k = x.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_m = p.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column-reverse" gap="3">
      <FlexItem>First</FlexItem>
      <FlexItem>Second</FlexItem>
      <FlexItem>Third</FlexItem>
    </Flex>
}`,
        ...(_o = (_n = p.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  c.parameters = {
    ...c.parameters,
    docs: {
      ...(_p = c.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: () => <Flex align="start" gap="2" style={{
    height: "100px",
    backgroundColor: "var(--gray-2)",
    padding: "8px",
    borderRadius: "8px"
  }}>
      <FlexItem style={{
      height: "40px"
    }}>Small</FlexItem>
      <FlexItem style={{
      height: "60px"
    }}>Medium</FlexItem>
      <FlexItem style={{
      height: "30px"
    }}>Tiny</FlexItem>
    </Flex>
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
  render: () => <Flex align="center" gap="2" style={{
    height: "100px",
    backgroundColor: "var(--gray-2)",
    padding: "8px",
    borderRadius: "8px"
  }}>
      <FlexItem style={{
      height: "40px"
    }}>Small</FlexItem>
      <FlexItem style={{
      height: "60px"
    }}>Medium</FlexItem>
      <FlexItem style={{
      height: "30px"
    }}>Tiny</FlexItem>
    </Flex>
}`,
        ...(_u = (_t = m.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  g.parameters = {
    ...g.parameters,
    docs: {
      ...(_v = g.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: () => <Flex align="end" gap="2" style={{
    height: "100px",
    backgroundColor: "var(--gray-2)",
    padding: "8px",
    borderRadius: "8px"
  }}>
      <FlexItem style={{
      height: "40px"
    }}>Small</FlexItem>
      <FlexItem style={{
      height: "60px"
    }}>Medium</FlexItem>
      <FlexItem style={{
      height: "30px"
    }}>Tiny</FlexItem>
    </Flex>
}`,
        ...(_x = (_w = g.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_y = h.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: () => <Flex align="stretch" gap="2" style={{
    height: "100px",
    backgroundColor: "var(--gray-2)",
    padding: "8px",
    borderRadius: "8px"
  }}>
      <FlexItem>Stretched</FlexItem>
      <FlexItem>Items</FlexItem>
      <FlexItem>All Same Height</FlexItem>
    </Flex>
}`,
        ...(_A = (_z = h.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_B = u.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: () => <Flex align="baseline" gap="2" style={{
    height: "100px",
    backgroundColor: "var(--gray-2)",
    padding: "8px",
    borderRadius: "8px"
  }}>
      <FlexItem style={{
      fontSize: "12px",
      padding: "8px"
    }}>
        Small text
      </FlexItem>
      <FlexItem style={{
      fontSize: "20px",
      padding: "16px"
    }}>
        Large text
      </FlexItem>
      <FlexItem style={{
      fontSize: "14px",
      padding: "10px"
    }}>
        Medium text
      </FlexItem>
    </Flex>
}`,
        ...(_D = (_C = u.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  F.parameters = {
    ...F.parameters,
    docs: {
      ...(_E = F.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: () => <Flex justify="start" gap="2" style={{
    width: "300px",
    backgroundColor: "var(--gray-2)",
    padding: "8px",
    borderRadius: "8px"
  }}>
      <FlexItem>One</FlexItem>
      <FlexItem>Two</FlexItem>
    </Flex>
}`,
        ...(_G = (_F = F.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_H = y.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: () => <Flex justify="center" gap="2" style={{
    width: "300px",
    backgroundColor: "var(--gray-2)",
    padding: "8px",
    borderRadius: "8px"
  }}>
      <FlexItem>One</FlexItem>
      <FlexItem>Two</FlexItem>
    </Flex>
}`,
        ...(_J = (_I = y.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_K = j.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: () => <Flex justify="end" gap="2" style={{
    width: "300px",
    backgroundColor: "var(--gray-2)",
    padding: "8px",
    borderRadius: "8px"
  }}>
      <FlexItem>One</FlexItem>
      <FlexItem>Two</FlexItem>
    </Flex>
}`,
        ...(_M = (_L = j.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  I.parameters = {
    ...I.parameters,
    docs: {
      ...(_N = I.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  render: () => <Flex justify="between" gap="2" style={{
    width: "300px",
    backgroundColor: "var(--gray-2)",
    padding: "8px",
    borderRadius: "8px"
  }}>
      <FlexItem>One</FlexItem>
      <FlexItem>Two</FlexItem>
      <FlexItem>Three</FlexItem>
    </Flex>
}`,
        ...(_P = (_O = I.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_Q = b.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: () => <Flex wrap="nowrap" gap="2" style={{
    width: "200px",
    backgroundColor: "var(--gray-2)",
    padding: "8px",
    borderRadius: "8px"
  }}>
      <FlexItem style={{
      minWidth: "80px"
    }}>Item 1</FlexItem>
      <FlexItem style={{
      minWidth: "80px"
    }}>Item 2</FlexItem>
      <FlexItem style={{
      minWidth: "80px"
    }}>Item 3</FlexItem>
      <FlexItem style={{
      minWidth: "80px"
    }}>Item 4</FlexItem>
    </Flex>
}`,
        ...(_S = (_R = b.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_T = w.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  render: () => <Flex wrap="wrap" gap="2" style={{
    width: "200px",
    backgroundColor: "var(--gray-2)",
    padding: "8px",
    borderRadius: "8px"
  }}>
      <FlexItem style={{
      minWidth: "80px"
    }}>Item 1</FlexItem>
      <FlexItem style={{
      minWidth: "80px"
    }}>Item 2</FlexItem>
      <FlexItem style={{
      minWidth: "80px"
    }}>Item 3</FlexItem>
      <FlexItem style={{
      minWidth: "80px"
    }}>Item 4</FlexItem>
    </Flex>
}`,
        ...(_V = (_U = w.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_W = v.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  render: () => <Flex wrap="wrap-reverse" gap="2" style={{
    width: "200px",
    backgroundColor: "var(--gray-2)",
    padding: "8px",
    borderRadius: "8px"
  }}>
      <FlexItem style={{
      minWidth: "80px"
    }}>Item 1</FlexItem>
      <FlexItem style={{
      minWidth: "80px"
    }}>Item 2</FlexItem>
      <FlexItem style={{
      minWidth: "80px"
    }}>Item 3</FlexItem>
      <FlexItem style={{
      minWidth: "80px"
    }}>Item 4</FlexItem>
    </Flex>
}`,
        ...(_Y = (_X = v.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_Z = T.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" weight="medium" color="gray">
          Gap 1:
        </Text>
        <Flex gap="1" style={{
        marginTop: "4px"
      }}>
          <FlexItem>A</FlexItem>
          <FlexItem>B</FlexItem>
          <FlexItem>C</FlexItem>
        </Flex>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Gap 3:
        </Text>
        <Flex gap="3" style={{
        marginTop: "4px"
      }}>
          <FlexItem>A</FlexItem>
          <FlexItem>B</FlexItem>
          <FlexItem>C</FlexItem>
        </Flex>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Gap 6:
        </Text>
        <Flex gap="6" style={{
        marginTop: "4px"
      }}>
          <FlexItem>A</FlexItem>
          <FlexItem>B</FlexItem>
          <FlexItem>C</FlexItem>
        </Flex>
      </div>
    </Flex>
}`,
        ...(_$ = (__ = T.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_aa = C.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="6" style={{
    width: "400px"
  }}>
      <div>
        <Text size="3" weight="bold">
          Header Layout
        </Text>
        <Flex justify="between" align="center" gap="3" style={{
        padding: "12px",
        backgroundColor: "var(--blue-2)",
        borderRadius: "8px",
        marginTop: "8px"
      }}>
          <Text size="4" weight="medium">
            Logo
          </Text>
          <Flex gap="2">
            <Button size="1" variant="ghost">
              Home
            </Button>
            <Button size="1" variant="ghost">
              About
            </Button>
            <Button size="1" variant="ghost">
              Contact
            </Button>
          </Flex>
          <Button size="1">Sign In</Button>
        </Flex>
      </div>

      <div>
        <Text size="3" weight="bold">
          Card Layout
        </Text>
        <Flex direction="column" gap="3" style={{
        padding: "16px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px",
        marginTop: "8px"
      }}>
          <Text size="4" weight="medium">
            Card Title
          </Text>
          <Text size="2">Card description content goes here.</Text>
          <Flex justify="end" gap="2">
            <Button size="1" variant="outline">
              Cancel
            </Button>
            <Button size="1">Save</Button>
          </Flex>
        </Flex>
      </div>

      <div>
        <Text size="3" weight="bold">
          Form Row
        </Text>
        <Flex align="center" gap="3" style={{
        padding: "12px",
        backgroundColor: "var(--green-2)",
        borderRadius: "8px",
        marginTop: "8px"
      }}>
          <Box style={{
          minWidth: "80px"
        }}>
            <Text size="2" weight="medium">
              Label:
            </Text>
          </Box>
          <Box style={{
          flex: 1,
          padding: "8px",
          backgroundColor: "white",
          borderRadius: "4px"
        }}>
            <Text size="2" color="gray">
              Input field
            </Text>
          </Box>
          <Button size="1">Submit</Button>
        </Flex>
      </div>
    </Flex>
}`,
        ...(_ca = (_ba = C.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_da = z.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4" style={{
    maxWidth: "500px"
  }}>
      <Text size="5" weight="bold">
        Dashboard Layout
      </Text>

      {/* Navigation */}
      <Flex justify="between" align="center" style={{
      padding: "12px 16px",
      backgroundColor: "var(--blue-9)",
      borderRadius: "8px"
    }}>
        <Text size="3" weight="medium" style={{
        color: "white"
      }}>
          Dashboard
        </Text>
        <Flex gap="2">
          <Button size="1" variant="ghost" style={{
          color: "white"
        }}>
            Profile
          </Button>
          <Button size="1" variant="ghost" style={{
          color: "white"
        }}>
            Settings
          </Button>
        </Flex>
      </Flex>

      {/* Stats Cards */}
      <Flex gap="3" wrap="wrap">
        {["Users", "Orders", "Revenue"].map((stat, index) => <Flex key={stat} direction="column" gap="1" style={{
        padding: "16px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px",
        flex: "1",
        minWidth: "120px"
      }}>
            <Text size="1" weight="medium" color="gray">
              {stat}
            </Text>
            <Text size="4" weight="bold">
              {1000 + index * 500}
            </Text>
          </Flex>)}
      </Flex>

      {/* Content Area */}
      <Flex gap="4" wrap="wrap" align="start">
        <Flex direction="column" gap="2" style={{
        flex: "2",
        minWidth: "200px"
      }}>
          <Text size="3" weight="medium">
            Recent Activity
          </Text>
          <Flex direction="column" gap="2">
            {["New user registered", "Order completed", "Payment received"].map((activity, index) => <Flex key={index} align="center" gap="2" style={{
            padding: "8px 12px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "6px"
          }}>
                  <Box style={{
              width: "8px",
              height: "8px",
              backgroundColor: index === 0 ? "var(--green-9)" : "var(--blue-9)",
              borderRadius: "50%"
            }} />
                  <Text size="2">{activity}</Text>
                </Flex>)}
          </Flex>
        </Flex>

        <Flex direction="column" gap="2" style={{
        flex: "1",
        minWidth: "150px"
      }}>
          <Text size="3" weight="medium">
            Quick Actions
          </Text>
          <Flex direction="column" gap="2">
            <Button size="2" variant="outline">
              Add User
            </Button>
            <Button size="2" variant="outline">
              Create Order
            </Button>
            <Button size="2" variant="outline">
              View Reports
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
}`,
        ...(_fa = (_ea = z.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  O = [
    "Default",
    "DirectionRow",
    "DirectionColumn",
    "DirectionRowReverse",
    "DirectionColumnReverse",
    "AlignStart",
    "AlignCenter",
    "AlignEnd",
    "AlignStretch",
    "AlignBaseline",
    "JustifyStart",
    "JustifyCenter",
    "JustifyEnd",
    "JustifyBetween",
    "WrapNowrap",
    "WrapWrap",
    "WrapReverse",
    "GapSizes",
    "LayoutExamples",
    "RealWorldUsage"
  ];
});
export {
  u as AlignBaseline,
  m as AlignCenter,
  g as AlignEnd,
  c as AlignStart,
  h as AlignStretch,
  a as Default,
  o as DirectionColumn,
  p as DirectionColumnReverse,
  d as DirectionRow,
  x as DirectionRowReverse,
  T as GapSizes,
  I as JustifyBetween,
  y as JustifyCenter,
  j as JustifyEnd,
  F as JustifyStart,
  C as LayoutExamples,
  z as RealWorldUsage,
  b as WrapNowrap,
  v as WrapReverse,
  w as WrapWrap,
  O as __namedExportsOrder,
  __tla,
  L as default
};
