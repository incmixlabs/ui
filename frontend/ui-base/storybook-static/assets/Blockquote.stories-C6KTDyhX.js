import { r as D, j as e, a as r, l as W, S as P, T as I, F as t, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import "./preload-helper-D9Z9MdNV.js";
let v, f, T, B, x, g, y, k, b, i, j, z, w, S, s, a, l, c, d, q, h, u, m, p, G, J;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra;
  const o = D.forwardRef((n, C) => {
    const { asChild: R, children: A, className: _, ...E } = n, F = R ? P : "blockquote";
    return e.jsx(r, {
      asChild: true,
      ...E,
      ref: C,
      className: W("rt-Blockquote", _),
      children: e.jsx(F, {
        children: A
      })
    });
  });
  o.displayName = "Blockquote";
  o.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Blockquote",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  J = {
    title: "Base/Blockquote",
    component: o,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (n) => e.jsx(I, {
        children: e.jsx("div", {
          style: {
            maxWidth: "600px",
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
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9"
        ],
        description: "Blockquote text size"
      },
      weight: {
        control: "select",
        options: [
          "light",
          "regular",
          "medium",
          "bold"
        ],
        description: "Blockquote text weight"
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
        description: "Blockquote color"
      },
      highContrast: {
        control: "boolean",
        description: "High contrast mode"
      }
    },
    args: {
      size: "3",
      children: "The only way to do great work is to love what you do."
    }
  };
  i = {
    render: (n) => e.jsx(o, {
      ...n,
      children: "The only way to do great work is to love what you do. If you haven't found it yet, keep looking. Don't settle."
    })
  };
  s = {
    render: (n) => e.jsx(o, {
      size: "1",
      children: "Small blockquote with size 1 text."
    })
  };
  a = {
    render: (n) => e.jsx(o, {
      size: "2",
      children: "Medium blockquote with size 2 text."
    })
  };
  l = {
    render: (n) => e.jsx(o, {
      size: "3",
      children: "Default blockquote with size 3 text."
    })
  };
  c = {
    render: (n) => e.jsx(o, {
      size: "4",
      children: "Large blockquote with size 4 text for emphasis."
    })
  };
  d = {
    render: (n) => e.jsx(o, {
      size: "5",
      children: "Extra large blockquote with size 5 text."
    })
  };
  u = {
    render: (n) => e.jsx(o, {
      weight: "light",
      children: "This blockquote uses light weight text for a subtle appearance."
    })
  };
  p = {
    render: (n) => e.jsx(o, {
      weight: "regular",
      children: "This blockquote uses regular weight text which is the default."
    })
  };
  m = {
    render: (n) => e.jsx(o, {
      weight: "medium",
      children: "This blockquote uses medium weight text for better emphasis."
    })
  };
  h = {
    render: (n) => e.jsx(o, {
      weight: "bold",
      children: "This blockquote uses bold weight text for strong emphasis."
    })
  };
  g = {
    render: (n) => e.jsx(o, {
      color: "gray",
      children: "This is a gray blockquote that blends subtly with the background."
    })
  };
  x = {
    render: (n) => e.jsx(o, {
      color: "blue",
      children: "This is a blue blockquote that stands out with color emphasis."
    })
  };
  b = {
    render: (n) => e.jsx(o, {
      color: "red",
      children: "This is a red blockquote that draws attention with warning colors."
    })
  };
  y = {
    render: (n) => e.jsx(o, {
      color: "green",
      children: "This is a green blockquote that suggests success or positive feedback."
    })
  };
  k = {
    render: (n) => e.jsx(o, {
      color: "purple",
      children: "This is a purple blockquote that adds a creative, distinctive touch."
    })
  };
  w = {
    render: (n) => e.jsx(o, {
      highContrast: true,
      children: "This blockquote uses high contrast mode for better accessibility and readability."
    })
  };
  v = {
    render: () => e.jsxs(t, {
      direction: "column",
      gap: "4",
      children: [
        e.jsx(o, {
          size: "1",
          children: "Size 1 - Small blockquote"
        }),
        e.jsx(o, {
          size: "2",
          children: "Size 2 - Medium blockquote"
        }),
        e.jsx(o, {
          size: "3",
          children: "Size 3 - Default blockquote"
        }),
        e.jsx(o, {
          size: "4",
          children: "Size 4 - Large blockquote"
        }),
        e.jsx(o, {
          size: "5",
          children: "Size 5 - Extra large blockquote"
        })
      ]
    })
  };
  f = {
    render: () => e.jsxs(t, {
      direction: "column",
      gap: "3",
      children: [
        e.jsx(o, {
          weight: "light",
          children: "Light weight blockquote"
        }),
        e.jsx(o, {
          weight: "regular",
          children: "Regular weight blockquote"
        }),
        e.jsx(o, {
          weight: "medium",
          children: "Medium weight blockquote"
        }),
        e.jsx(o, {
          weight: "bold",
          children: "Bold weight blockquote"
        })
      ]
    })
  };
  z = {
    render: () => e.jsxs(t, {
      direction: "column",
      gap: "4",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(o, {
              size: "4",
              weight: "medium",
              children: '"The future belongs to those who believe in the beauty of their dreams."'
            }),
            e.jsx(r, {
              size: "2",
              color: "gray",
              style: {
                marginTop: "8px",
                fontStyle: "italic"
              },
              children: "\u2014 Eleanor Roosevelt"
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(o, {
              size: "3",
              color: "blue",
              children: '"Innovation distinguishes between a leader and a follower."'
            }),
            e.jsx(r, {
              size: "2",
              color: "gray",
              style: {
                marginTop: "8px",
                fontStyle: "italic"
              },
              children: "\u2014 Steve Jobs"
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(o, {
              size: "3",
              color: "green",
              children: '"Be yourself; everyone else is already taken."'
            }),
            e.jsx(r, {
              size: "2",
              color: "gray",
              style: {
                marginTop: "8px",
                fontStyle: "italic"
              },
              children: "\u2014 Oscar Wilde"
            })
          ]
        })
      ]
    })
  };
  q = {
    render: () => e.jsxs("div", {
      children: [
        e.jsx(r, {
          size: "4",
          weight: "bold",
          style: {
            marginBottom: "24px",
            display: "block"
          },
          children: "What Our Customers Say"
        }),
        e.jsxs(t, {
          direction: "column",
          gap: "6",
          children: [
            e.jsxs("div", {
              style: {
                padding: "20px",
                border: "1px solid #e1e5e9",
                borderRadius: "8px",
                backgroundColor: "#fafbfc"
              },
              children: [
                e.jsx(o, {
                  size: "3",
                  color: "gray",
                  children: '"This component library has completely transformed our development workflow. The quality and consistency of the components is outstanding."'
                }),
                e.jsxs(t, {
                  align: "center",
                  gap: "3",
                  style: {
                    marginTop: "16px"
                  },
                  children: [
                    e.jsx("div", {
                      style: {
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#e1e5e9",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      children: e.jsx(r, {
                        size: "2",
                        weight: "bold",
                        children: "JD"
                      })
                    }),
                    e.jsxs("div", {
                      children: [
                        e.jsx(r, {
                          size: "2",
                          weight: "medium",
                          children: "John Doe"
                        }),
                        e.jsx(r, {
                          size: "1",
                          color: "gray",
                          children: "Senior Developer, TechCorp"
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                padding: "20px",
                border: "1px solid #e1e5e9",
                borderRadius: "8px",
                backgroundColor: "#fafbfc"
              },
              children: [
                e.jsx(o, {
                  size: "3",
                  color: "blue",
                  children: '"The documentation is excellent and the components are so well-designed. Our team productivity has increased significantly since we started using it."'
                }),
                e.jsxs(t, {
                  align: "center",
                  gap: "3",
                  style: {
                    marginTop: "16px"
                  },
                  children: [
                    e.jsx("div", {
                      style: {
                        width: "40px",
                        height: "40px",
                        backgroundColor: "#e1e5e9",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      children: e.jsx(r, {
                        size: "2",
                        weight: "bold",
                        children: "AS"
                      })
                    }),
                    e.jsxs("div", {
                      children: [
                        e.jsx(r, {
                          size: "2",
                          weight: "medium",
                          children: "Alice Smith"
                        }),
                        e.jsx(r, {
                          size: "1",
                          color: "gray",
                          children: "Product Manager, StartupXYZ"
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
  T = {
    render: () => e.jsxs("div", {
      children: [
        e.jsx(r, {
          size: "4",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "The Future of Web Development"
        }),
        e.jsx(r, {
          size: "3",
          style: {
            marginBottom: "20px",
            lineHeight: "1.6"
          },
          children: "The landscape of web development continues to evolve rapidly, with new frameworks and tools emerging regularly. However, certain principles remain constant."
        }),
        e.jsx(o, {
          size: "4",
          weight: "medium",
          style: {
            margin: "24px 0"
          },
          children: '"The best frameworks are those that get out of your way and let you focus on solving real problems for real people."'
        }),
        e.jsx(r, {
          size: "3",
          style: {
            marginBottom: "16px",
            lineHeight: "1.6"
          },
          children: "This philosophy drives much of the modern web development ecosystem. Tools that prioritize developer experience while maintaining performance and accessibility are becoming the standard."
        }),
        e.jsx(r, {
          size: "2",
          color: "gray",
          style: {
            fontStyle: "italic"
          },
          children: 'From "Modern Web Development Principles" by Developer Weekly'
        })
      ]
    })
  };
  B = {
    render: () => e.jsxs("div", {
      children: [
        e.jsx(r, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Code Review Feedback"
        }),
        e.jsxs(t, {
          direction: "column",
          gap: "4",
          children: [
            e.jsxs("div", {
              style: {
                padding: "16px",
                backgroundColor: "#f0f9ff",
                border: "1px solid #bfdbfe",
                borderRadius: "6px"
              },
              children: [
                e.jsx(o, {
                  size: "2",
                  color: "blue",
                  children: '"Great implementation! The error handling is solid and the component API is intuitive. Just one small suggestion about the prop naming."'
                }),
                e.jsx(r, {
                  size: "1",
                  color: "gray",
                  style: {
                    marginTop: "8px"
                  },
                  children: "\u2014 Sarah Chen, Senior Engineer"
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                padding: "16px",
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
                borderRadius: "6px"
              },
              children: [
                e.jsx(o, {
                  size: "2",
                  color: "green",
                  children: '"Excellent work on the accessibility features. All ARIA attributes are properly implemented and the keyboard navigation works perfectly."'
                }),
                e.jsx(r, {
                  size: "1",
                  color: "gray",
                  style: {
                    marginTop: "8px"
                  },
                  children: "\u2014 Alex Rodriguez, Accessibility Specialist"
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                padding: "16px",
                backgroundColor: "#fffbeb",
                border: "1px solid #fed7aa",
                borderRadius: "6px"
              },
              children: [
                e.jsx(o, {
                  size: "2",
                  color: "orange",
                  children: '"The performance looks good, but consider memoizing the expensive calculations in the render function to optimize re-renders."'
                }),
                e.jsx(r, {
                  size: "1",
                  color: "gray",
                  style: {
                    marginTop: "8px"
                  },
                  children: "\u2014 Mike Johnson, Performance Engineer"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  j = {
    render: () => e.jsxs("div", {
      children: [
        e.jsx(r, {
          size: "4",
          weight: "bold",
          style: {
            marginBottom: "20px",
            display: "block"
          },
          children: "Component Guidelines"
        }),
        e.jsxs("div", {
          style: {
            marginBottom: "24px"
          },
          children: [
            e.jsx(r, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Accessibility Best Practices"
            }),
            e.jsx(o, {
              size: "2",
              color: "blue",
              children: "Always ensure that interactive elements are keyboard accessible and provide appropriate ARIA labels for screen readers. Test your components with actual assistive technologies."
            })
          ]
        }),
        e.jsxs("div", {
          style: {
            marginBottom: "24px"
          },
          children: [
            e.jsx(r, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Performance Considerations"
            }),
            e.jsx(o, {
              size: "2",
              color: "green",
              children: "Keep components lightweight and avoid unnecessary re-renders. Use React.memo and useMemo judiciously, and always measure performance impact rather than optimizing prematurely."
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(r, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Design Consistency"
            }),
            e.jsx(o, {
              size: "2",
              color: "purple",
              children: "Follow the established design tokens and patterns. When creating new components, ensure they feel like a natural part of the existing system rather than standalone elements."
            })
          ]
        })
      ]
    })
  };
  S = {
    render: () => e.jsxs("div", {
      children: [
        e.jsx(r, {
          size: "3",
          style: {
            marginBottom: "20px",
            lineHeight: "1.6"
          },
          children: "Component libraries have revolutionized the way we build user interfaces. They provide consistency, reduce development time, and ensure accessibility standards are met across entire applications."
        }),
        e.jsx("div", {
          style: {
            textAlign: "center",
            margin: "40px 0",
            padding: "0 20px"
          },
          children: e.jsx(o, {
            size: "5",
            weight: "medium",
            color: "indigo",
            style: {
              fontSize: "1.5rem",
              lineHeight: "1.4",
              position: "relative"
            },
            children: '"A well-designed component library is like a shared language that helps teams communicate more effectively through code."'
          })
        }),
        e.jsx(r, {
          size: "3",
          style: {
            lineHeight: "1.6"
          },
          children: "The investment in creating and maintaining a component library pays dividends in the long term. Teams can focus on solving business problems rather than recreating basic UI elements, leading to more innovative and polished products."
        })
      ]
    })
  };
  i.parameters = {
    ...i.parameters,
    docs: {
      ...(_a = i.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => <Blockquote {...args}>
      The only way to do great work is to love what you do. If you haven't found
      it yet, keep looking. Don't settle.
    </Blockquote>
}`,
        ...(_c = (_b = i.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  s.parameters = {
    ...s.parameters,
    docs: {
      ...(_d = s.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote size="1">Small blockquote with size 1 text.</Blockquote>
}`,
        ...(_f = (_e = s.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  a.parameters = {
    ...a.parameters,
    docs: {
      ...(_g = a.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote size="2">Medium blockquote with size 2 text.</Blockquote>
}`,
        ...(_i = (_h = a.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_j = l.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote size="3">Default blockquote with size 3 text.</Blockquote>
}`,
        ...(_l = (_k = l.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  c.parameters = {
    ...c.parameters,
    docs: {
      ...(_m = c.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote size="4">
      Large blockquote with size 4 text for emphasis.
    </Blockquote>
}`,
        ...(_o = (_n = c.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  d.parameters = {
    ...d.parameters,
    docs: {
      ...(_p = d.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote size="5">Extra large blockquote with size 5 text.</Blockquote>
}`,
        ...(_r = (_q = d.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_s = u.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote weight="light">
      This blockquote uses light weight text for a subtle appearance.
    </Blockquote>
}`,
        ...(_u = (_t = u.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_v = p.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote weight="regular">
      This blockquote uses regular weight text which is the default.
    </Blockquote>
}`,
        ...(_x = (_w = p.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_y = m.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote weight="medium">
      This blockquote uses medium weight text for better emphasis.
    </Blockquote>
}`,
        ...(_A = (_z = m.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_B = h.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote weight="bold">
      This blockquote uses bold weight text for strong emphasis.
    </Blockquote>
}`,
        ...(_D = (_C = h.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  g.parameters = {
    ...g.parameters,
    docs: {
      ...(_E = g.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote color="gray">
      This is a gray blockquote that blends subtly with the background.
    </Blockquote>
}`,
        ...(_G = (_F = g.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_H = x.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote color="blue">
      This is a blue blockquote that stands out with color emphasis.
    </Blockquote>
}`,
        ...(_J = (_I = x.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_K = b.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote color="red">
      This is a red blockquote that draws attention with warning colors.
    </Blockquote>
}`,
        ...(_M = (_L = b.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_N = y.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote color="green">
      This is a green blockquote that suggests success or positive feedback.
    </Blockquote>
}`,
        ...(_P = (_O = y.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_Q = k.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote color="purple">
      This is a purple blockquote that adds a creative, distinctive touch.
    </Blockquote>
}`,
        ...(_S = (_R = k.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_T = w.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  render: _args => <Blockquote highContrast>
      This blockquote uses high contrast mode for better accessibility and
      readability.
    </Blockquote>
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
  render: () => <Flex direction="column" gap="4">
      <Blockquote size="1">Size 1 - Small blockquote</Blockquote>
      <Blockquote size="2">Size 2 - Medium blockquote</Blockquote>
      <Blockquote size="3">Size 3 - Default blockquote</Blockquote>
      <Blockquote size="4">Size 4 - Large blockquote</Blockquote>
      <Blockquote size="5">Size 5 - Extra large blockquote</Blockquote>
    </Flex>
}`,
        ...(_Y = (_X = v.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_Z = f.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="3">
      <Blockquote weight="light">Light weight blockquote</Blockquote>
      <Blockquote weight="regular">Regular weight blockquote</Blockquote>
      <Blockquote weight="medium">Medium weight blockquote</Blockquote>
      <Blockquote weight="bold">Bold weight blockquote</Blockquote>
    </Flex>
}`,
        ...(_$ = (__ = f.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_aa = z.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Blockquote size="4" weight="medium">
          "The future belongs to those who believe in the beauty of their
          dreams."
        </Blockquote>
        <Text size="2" color="gray" style={{
        marginTop: "8px",
        fontStyle: "italic"
      }}>
          \u2014 Eleanor Roosevelt
        </Text>
      </div>

      <div>
        <Blockquote size="3" color="blue">
          "Innovation distinguishes between a leader and a follower."
        </Blockquote>
        <Text size="2" color="gray" style={{
        marginTop: "8px",
        fontStyle: "italic"
      }}>
          \u2014 Steve Jobs
        </Text>
      </div>

      <div>
        <Blockquote size="3" color="green">
          "Be yourself; everyone else is already taken."
        </Blockquote>
        <Text size="2" color="gray" style={{
        marginTop: "8px",
        fontStyle: "italic"
      }}>
          \u2014 Oscar Wilde
        </Text>
      </div>
    </Flex>
}`,
        ...(_ca = (_ba = z.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  q.parameters = {
    ...q.parameters,
    docs: {
      ...(_da = q.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  render: () => <div>
      <Text size="4" weight="bold" style={{
      marginBottom: "24px",
      display: "block"
    }}>
        What Our Customers Say
      </Text>

      <Flex direction="column" gap="6">
        <div style={{
        padding: "20px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#fafbfc"
      }}>
          <Blockquote size="3" color="gray">
            "This component library has completely transformed our development
            workflow. The quality and consistency of the components is
            outstanding."
          </Blockquote>
          <Flex align="center" gap="3" style={{
          marginTop: "16px"
        }}>
            <div style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#e1e5e9",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
              <Text size="2" weight="bold">
                JD
              </Text>
            </div>
            <div>
              <Text size="2" weight="medium">
                John Doe
              </Text>
              <Text size="1" color="gray">
                Senior Developer, TechCorp
              </Text>
            </div>
          </Flex>
        </div>

        <div style={{
        padding: "20px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#fafbfc"
      }}>
          <Blockquote size="3" color="blue">
            "The documentation is excellent and the components are so
            well-designed. Our team productivity has increased significantly
            since we started using it."
          </Blockquote>
          <Flex align="center" gap="3" style={{
          marginTop: "16px"
        }}>
            <div style={{
            width: "40px",
            height: "40px",
            backgroundColor: "#e1e5e9",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
              <Text size="2" weight="bold">
                AS
              </Text>
            </div>
            <div>
              <Text size="2" weight="medium">
                Alice Smith
              </Text>
              <Text size="1" color="gray">
                Product Manager, StartupXYZ
              </Text>
            </div>
          </Flex>
        </div>
      </Flex>
    </div>
}`,
        ...(_fa = (_ea = q.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_ga = T.parameters) == null ? void 0 : _ga.docs,
      source: {
        originalSource: `{
  render: () => <div>
      <Text size="4" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        The Future of Web Development
      </Text>

      <Text size="3" style={{
      marginBottom: "20px",
      lineHeight: "1.6"
    }}>
        The landscape of web development continues to evolve rapidly, with new
        frameworks and tools emerging regularly. However, certain principles
        remain constant.
      </Text>

      <Blockquote size="4" weight="medium" style={{
      margin: "24px 0"
    }}>
        "The best frameworks are those that get out of your way and let you
        focus on solving real problems for real people."
      </Blockquote>

      <Text size="3" style={{
      marginBottom: "16px",
      lineHeight: "1.6"
    }}>
        This philosophy drives much of the modern web development ecosystem.
        Tools that prioritize developer experience while maintaining performance
        and accessibility are becoming the standard.
      </Text>

      <Text size="2" color="gray" style={{
      fontStyle: "italic"
    }}>
        From "Modern Web Development Principles" by Developer Weekly
      </Text>
    </div>
}`,
        ...(_ia = (_ha = T.parameters) == null ? void 0 : _ha.docs) == null ? void 0 : _ia.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_ja = B.parameters) == null ? void 0 : _ja.docs,
      source: {
        originalSource: `{
  render: () => <div>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Code Review Feedback
      </Text>

      <Flex direction="column" gap="4">
        <div style={{
        padding: "16px",
        backgroundColor: "#f0f9ff",
        border: "1px solid #bfdbfe",
        borderRadius: "6px"
      }}>
          <Blockquote size="2" color="blue">
            "Great implementation! The error handling is solid and the component
            API is intuitive. Just one small suggestion about the prop naming."
          </Blockquote>
          <Text size="1" color="gray" style={{
          marginTop: "8px"
        }}>
            \u2014 Sarah Chen, Senior Engineer
          </Text>
        </div>

        <div style={{
        padding: "16px",
        backgroundColor: "#f0fdf4",
        border: "1px solid #bbf7d0",
        borderRadius: "6px"
      }}>
          <Blockquote size="2" color="green">
            "Excellent work on the accessibility features. All ARIA attributes
            are properly implemented and the keyboard navigation works
            perfectly."
          </Blockquote>
          <Text size="1" color="gray" style={{
          marginTop: "8px"
        }}>
            \u2014 Alex Rodriguez, Accessibility Specialist
          </Text>
        </div>

        <div style={{
        padding: "16px",
        backgroundColor: "#fffbeb",
        border: "1px solid #fed7aa",
        borderRadius: "6px"
      }}>
          <Blockquote size="2" color="orange">
            "The performance looks good, but consider memoizing the expensive
            calculations in the render function to optimize re-renders."
          </Blockquote>
          <Text size="1" color="gray" style={{
          marginTop: "8px"
        }}>
            \u2014 Mike Johnson, Performance Engineer
          </Text>
        </div>
      </Flex>
    </div>
}`,
        ...(_la = (_ka = B.parameters) == null ? void 0 : _ka.docs) == null ? void 0 : _la.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_ma = j.parameters) == null ? void 0 : _ma.docs,
      source: {
        originalSource: `{
  render: () => <div>
      <Text size="4" weight="bold" style={{
      marginBottom: "20px",
      display: "block"
    }}>
        Component Guidelines
      </Text>

      <div style={{
      marginBottom: "24px"
    }}>
        <Text size="2" weight="medium" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Accessibility Best Practices
        </Text>
        <Blockquote size="2" color="blue">
          Always ensure that interactive elements are keyboard accessible and
          provide appropriate ARIA labels for screen readers. Test your
          components with actual assistive technologies.
        </Blockquote>
      </div>

      <div style={{
      marginBottom: "24px"
    }}>
        <Text size="2" weight="medium" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Performance Considerations
        </Text>
        <Blockquote size="2" color="green">
          Keep components lightweight and avoid unnecessary re-renders. Use
          React.memo and useMemo judiciously, and always measure performance
          impact rather than optimizing prematurely.
        </Blockquote>
      </div>

      <div>
        <Text size="2" weight="medium" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Design Consistency
        </Text>
        <Blockquote size="2" color="purple">
          Follow the established design tokens and patterns. When creating new
          components, ensure they feel like a natural part of the existing
          system rather than standalone elements.
        </Blockquote>
      </div>
    </div>
}`,
        ...(_oa = (_na = j.parameters) == null ? void 0 : _na.docs) == null ? void 0 : _oa.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_pa = S.parameters) == null ? void 0 : _pa.docs,
      source: {
        originalSource: `{
  render: () => <div>
      <Text size="3" style={{
      marginBottom: "20px",
      lineHeight: "1.6"
    }}>
        Component libraries have revolutionized the way we build user
        interfaces. They provide consistency, reduce development time, and
        ensure accessibility standards are met across entire applications.
      </Text>

      <div style={{
      textAlign: "center",
      margin: "40px 0",
      padding: "0 20px"
    }}>
        <Blockquote size="5" weight="medium" color="indigo" style={{
        fontSize: "1.5rem",
        lineHeight: "1.4",
        position: "relative"
      }}>
          "A well-designed component library is like a shared language that
          helps teams communicate more effectively through code."
        </Blockquote>
      </div>

      <Text size="3" style={{
      lineHeight: "1.6"
    }}>
        The investment in creating and maintaining a component library pays
        dividends in the long term. Teams can focus on solving business problems
        rather than recreating basic UI elements, leading to more innovative and
        polished products.
      </Text>
    </div>
}`,
        ...(_ra = (_qa = S.parameters) == null ? void 0 : _qa.docs) == null ? void 0 : _ra.source
      }
    }
  };
  G = [
    "Default",
    "Size1",
    "Size2",
    "Size3",
    "Size4",
    "Size5",
    "WeightLight",
    "WeightRegular",
    "WeightMedium",
    "WeightBold",
    "ColorGray",
    "ColorBlue",
    "ColorRed",
    "ColorGreen",
    "ColorPurple",
    "HighContrast",
    "AllSizes",
    "AllWeights",
    "FamousQuotesExample",
    "TestimonialsExample",
    "ArticleQuotesExample",
    "CodeReviewExample",
    "DocumentationExample",
    "PullQuoteExample"
  ];
});
export {
  v as AllSizes,
  f as AllWeights,
  T as ArticleQuotesExample,
  B as CodeReviewExample,
  x as ColorBlue,
  g as ColorGray,
  y as ColorGreen,
  k as ColorPurple,
  b as ColorRed,
  i as Default,
  j as DocumentationExample,
  z as FamousQuotesExample,
  w as HighContrast,
  S as PullQuoteExample,
  s as Size1,
  a as Size2,
  l as Size3,
  c as Size4,
  d as Size5,
  q as TestimonialsExample,
  h as WeightBold,
  u as WeightLight,
  m as WeightMedium,
  p as WeightRegular,
  G as __namedExportsOrder,
  __tla,
  J as default
};
