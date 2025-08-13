import { q as N, z as I, G, I as M, N as Y, J, t as K, r as V, v as q, j as e, a as i, l as O, T as Q, F as s, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import "./preload-helper-D9Z9MdNV.js";
let b, v, w, P, _, F, m, x, k, u, o, W, B, j, S, T, a, t, l, c, C, y, L, f, z, g, d, p, h, ie, ne;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga;
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
  ], Z = [
    "auto",
    "always",
    "hover",
    "none"
  ], $ = {
    ...K,
    size: {
      type: "enum",
      className: "rt-r-size",
      values: X,
      responsive: true
    },
    ...J,
    ...Y,
    ...M,
    ...G,
    underline: {
      type: "enum",
      className: "rt-underline",
      values: Z,
      default: "auto"
    },
    ...I,
    ...N
  }, r = V.forwardRef((n, E) => {
    const { children: A, className: H, color: R, asChild: U, ...D } = q(n, $);
    return e.jsx(i, {
      ...D,
      "data-accent-color": R,
      ref: E,
      asChild: true,
      className: O("rt-reset", "rt-Link", H),
      children: U ? A : e.jsx("a", {
        children: A
      })
    });
  });
  r.displayName = "Link";
  r.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Link",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  ne = {
    title: "Base/Link",
    component: r,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (n) => e.jsx(Q, {
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
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9"
        ],
        description: "Link text size"
      },
      weight: {
        control: "select",
        options: [
          "light",
          "regular",
          "medium",
          "bold"
        ],
        description: "Link text weight"
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
        description: "Link color"
      },
      highContrast: {
        control: "boolean",
        description: "High contrast mode"
      },
      underline: {
        control: "select",
        options: [
          "auto",
          "hover",
          "always",
          "never"
        ],
        description: "Link underline behavior"
      }
    },
    args: {
      size: "2",
      children: "Example link",
      href: "#"
    }
  };
  o = {
    render: (n) => e.jsx(r, {
      ...n,
      children: "Default Link"
    })
  };
  a = {
    render: (n) => e.jsx(r, {
      size: "1",
      href: "#",
      children: "Size 1 Link"
    })
  };
  t = {
    render: (n) => e.jsx(r, {
      size: "2",
      href: "#",
      children: "Size 2 Link"
    })
  };
  l = {
    render: (n) => e.jsx(r, {
      size: "3",
      href: "#",
      children: "Size 3 Link"
    })
  };
  c = {
    render: (n) => e.jsx(r, {
      size: "4",
      href: "#",
      children: "Size 4 Link"
    })
  };
  d = {
    render: (n) => e.jsx(r, {
      weight: "light",
      href: "#",
      children: "Light Weight Link"
    })
  };
  h = {
    render: (n) => e.jsx(r, {
      weight: "regular",
      href: "#",
      children: "Regular Weight Link"
    })
  };
  p = {
    render: (n) => e.jsx(r, {
      weight: "medium",
      href: "#",
      children: "Medium Weight Link"
    })
  };
  g = {
    render: (n) => e.jsx(r, {
      weight: "bold",
      href: "#",
      children: "Bold Weight Link"
    })
  };
  m = {
    render: (n) => e.jsx(r, {
      color: "blue",
      href: "#",
      children: "Blue Link"
    })
  };
  u = {
    render: (n) => e.jsx(r, {
      color: "red",
      href: "#",
      children: "Red Link"
    })
  };
  x = {
    render: (n) => e.jsx(r, {
      color: "green",
      href: "#",
      children: "Green Link"
    })
  };
  k = {
    render: (n) => e.jsx(r, {
      color: "purple",
      href: "#",
      children: "Purple Link"
    })
  };
  L = {
    render: (n) => e.jsx(r, {
      underline: "auto",
      href: "#",
      children: "Auto Underline (default)"
    })
  };
  f = {
    render: (n) => e.jsx(r, {
      underline: "hover",
      href: "#",
      children: "Hover Underline"
    })
  };
  y = {
    render: (n) => e.jsx(r, {
      underline: "always",
      href: "#",
      children: "Always Underlined"
    })
  };
  z = {
    render: (n) => e.jsx(r, {
      underline: "never",
      href: "#",
      children: "Never Underlined"
    })
  };
  j = {
    render: (n) => e.jsx(r, {
      highContrast: true,
      href: "#",
      children: "High Contrast Link"
    })
  };
  b = {
    render: () => e.jsxs(s, {
      direction: "column",
      gap: "2",
      children: [
        e.jsx(r, {
          size: "1",
          href: "#",
          children: "Size 1"
        }),
        e.jsx(r, {
          size: "2",
          href: "#",
          children: "Size 2"
        }),
        e.jsx(r, {
          size: "3",
          href: "#",
          children: "Size 3"
        }),
        e.jsx(r, {
          size: "4",
          href: "#",
          children: "Size 4"
        }),
        e.jsx(r, {
          size: "5",
          href: "#",
          children: "Size 5"
        }),
        e.jsx(r, {
          size: "6",
          href: "#",
          children: "Size 6"
        })
      ]
    })
  };
  w = {
    render: () => e.jsxs(s, {
      direction: "column",
      gap: "2",
      children: [
        e.jsx(r, {
          weight: "light",
          href: "#",
          children: "Light Weight"
        }),
        e.jsx(r, {
          weight: "regular",
          href: "#",
          children: "Regular Weight"
        }),
        e.jsx(r, {
          weight: "medium",
          href: "#",
          children: "Medium Weight"
        }),
        e.jsx(r, {
          weight: "bold",
          href: "#",
          children: "Bold Weight"
        })
      ]
    })
  };
  v = {
    render: () => e.jsxs(s, {
      direction: "column",
      gap: "2",
      children: [
        e.jsx(r, {
          underline: "auto",
          href: "#",
          children: "Auto underline"
        }),
        e.jsx(r, {
          underline: "hover",
          href: "#",
          children: "Hover underline"
        }),
        e.jsx(r, {
          underline: "always",
          href: "#",
          children: "Always underlined"
        }),
        e.jsx(r, {
          underline: "never",
          href: "#",
          children: "Never underlined"
        })
      ]
    })
  };
  S = {
    render: () => e.jsxs(i, {
      size: "3",
      style: {
        maxWidth: "400px",
        lineHeight: "1.6"
      },
      children: [
        "This is a paragraph of text that contains several",
        " ",
        e.jsx(r, {
          href: "#",
          children: "inline links"
        }),
        " to demonstrate how links appear within text content. You can also have",
        " ",
        e.jsx(r, {
          href: "#",
          color: "red",
          children: "colored links"
        }),
        " ",
        "and",
        " ",
        e.jsx(r, {
          href: "#",
          weight: "bold",
          children: "bold links"
        }),
        " ",
        "for emphasis."
      ]
    })
  };
  T = {
    render: () => e.jsxs("div", {
      children: [
        e.jsx(i, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Navigation Menu"
        }),
        e.jsxs(s, {
          gap: "6",
          children: [
            e.jsx(r, {
              href: "#",
              size: "2",
              weight: "medium",
              children: "Home"
            }),
            e.jsx(r, {
              href: "#",
              size: "2",
              weight: "medium",
              children: "Products"
            }),
            e.jsx(r, {
              href: "#",
              size: "2",
              weight: "medium",
              children: "About"
            }),
            e.jsx(r, {
              href: "#",
              size: "2",
              weight: "medium",
              children: "Contact"
            })
          ]
        })
      ]
    })
  };
  B = {
    render: () => e.jsx("div", {
      style: {
        backgroundColor: "#f8f9fa",
        padding: "24px",
        borderRadius: "8px",
        maxWidth: "500px"
      },
      children: e.jsxs(s, {
        direction: "column",
        gap: "4",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx(i, {
                size: "2",
                weight: "bold",
                style: {
                  marginBottom: "8px",
                  display: "block"
                },
                children: "Company"
              }),
              e.jsxs(s, {
                direction: "column",
                gap: "1",
                children: [
                  e.jsx(r, {
                    href: "#",
                    size: "1",
                    color: "gray",
                    children: "About Us"
                  }),
                  e.jsx(r, {
                    href: "#",
                    size: "1",
                    color: "gray",
                    children: "Careers"
                  }),
                  e.jsx(r, {
                    href: "#",
                    size: "1",
                    color: "gray",
                    children: "Press"
                  }),
                  e.jsx(r, {
                    href: "#",
                    size: "1",
                    color: "gray",
                    children: "News"
                  })
                ]
              })
            ]
          }),
          e.jsxs("div", {
            children: [
              e.jsx(i, {
                size: "2",
                weight: "bold",
                style: {
                  marginBottom: "8px",
                  display: "block"
                },
                children: "Support"
              }),
              e.jsxs(s, {
                direction: "column",
                gap: "1",
                children: [
                  e.jsx(r, {
                    href: "#",
                    size: "1",
                    color: "gray",
                    children: "Help Center"
                  }),
                  e.jsx(r, {
                    href: "#",
                    size: "1",
                    color: "gray",
                    children: "Documentation"
                  }),
                  e.jsx(r, {
                    href: "#",
                    size: "1",
                    color: "gray",
                    children: "Contact Support"
                  }),
                  e.jsx(r, {
                    href: "#",
                    size: "1",
                    color: "gray",
                    children: "Status Page"
                  })
                ]
              })
            ]
          }),
          e.jsxs("div", {
            children: [
              e.jsx(i, {
                size: "2",
                weight: "bold",
                style: {
                  marginBottom: "8px",
                  display: "block"
                },
                children: "Legal"
              }),
              e.jsxs(s, {
                direction: "column",
                gap: "1",
                children: [
                  e.jsx(r, {
                    href: "#",
                    size: "1",
                    color: "gray",
                    children: "Privacy Policy"
                  }),
                  e.jsx(r, {
                    href: "#",
                    size: "1",
                    color: "gray",
                    children: "Terms of Service"
                  }),
                  e.jsx(r, {
                    href: "#",
                    size: "1",
                    color: "gray",
                    children: "Cookie Policy"
                  })
                ]
              })
            ]
          })
        ]
      })
    })
  };
  _ = {
    render: () => e.jsxs("div", {
      children: [
        e.jsx(i, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Breadcrumb Navigation"
        }),
        e.jsxs(s, {
          align: "center",
          gap: "2",
          children: [
            e.jsx(r, {
              href: "#",
              size: "2",
              color: "gray",
              children: "Home"
            }),
            e.jsx(i, {
              size: "2",
              color: "gray",
              children: "/"
            }),
            e.jsx(r, {
              href: "#",
              size: "2",
              color: "gray",
              children: "Products"
            }),
            e.jsx(i, {
              size: "2",
              color: "gray",
              children: "/"
            }),
            e.jsx(r, {
              href: "#",
              size: "2",
              color: "gray",
              children: "Electronics"
            }),
            e.jsx(i, {
              size: "2",
              color: "gray",
              children: "/"
            }),
            e.jsx(i, {
              size: "2",
              weight: "medium",
              children: "Laptop"
            })
          ]
        })
      ]
    })
  };
  C = {
    render: () => e.jsxs("div", {
      children: [
        e.jsx(i, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Follow Us"
        }),
        e.jsxs(s, {
          gap: "4",
          children: [
            e.jsx(r, {
              href: "#",
              color: "blue",
              weight: "medium",
              children: "Twitter"
            }),
            e.jsx(r, {
              href: "#",
              color: "indigo",
              weight: "medium",
              children: "Facebook"
            }),
            e.jsx(r, {
              href: "#",
              color: "purple",
              weight: "medium",
              children: "Instagram"
            }),
            e.jsx(r, {
              href: "#",
              color: "blue",
              weight: "medium",
              children: "LinkedIn"
            }),
            e.jsx(r, {
              href: "#",
              color: "red",
              weight: "medium",
              children: "YouTube"
            })
          ]
        })
      ]
    })
  };
  F = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "400px"
      },
      children: [
        e.jsx(i, {
          size: "4",
          weight: "bold",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Get Started Today"
        }),
        e.jsx(i, {
          size: "2",
          style: {
            marginBottom: "16px",
            display: "block",
            lineHeight: "1.6"
          },
          children: "Join thousands of developers who are already building amazing applications with our component library."
        }),
        e.jsxs(s, {
          gap: "4",
          children: [
            e.jsx(r, {
              href: "#",
              size: "3",
              weight: "bold",
              color: "blue",
              children: "Start Free Trial \u2192"
            }),
            e.jsx(r, {
              href: "#",
              size: "2",
              underline: "always",
              children: "View Documentation"
            })
          ]
        })
      ]
    })
  };
  W = {
    render: () => e.jsxs("div", {
      children: [
        e.jsx(i, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "External Resources"
        }),
        e.jsxs(s, {
          direction: "column",
          gap: "2",
          children: [
            e.jsx(r, {
              href: "https://react.dev",
              target: "_blank",
              rel: "noopener noreferrer",
              children: "React Documentation \u2197"
            }),
            e.jsx(r, {
              href: "https://www.typescriptlang.org",
              target: "_blank",
              rel: "noopener noreferrer",
              children: "TypeScript Handbook \u2197"
            }),
            e.jsx(r, {
              href: "https://storybook.js.org",
              target: "_blank",
              rel: "noopener noreferrer",
              children: "Storybook Docs \u2197"
            }),
            e.jsx(r, {
              href: "https://github.com",
              target: "_blank",
              rel: "noopener noreferrer",
              children: "GitHub Repository \u2197"
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
        e.jsx(i, {
          size: "4",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Recent Blog Posts"
        }),
        e.jsxs(s, {
          direction: "column",
          gap: "4",
          children: [
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  href: "#",
                  size: "3",
                  weight: "medium",
                  style: {
                    display: "block",
                    marginBottom: "4px"
                  },
                  children: "Building Accessible React Components"
                }),
                e.jsx(i, {
                  size: "2",
                  color: "gray",
                  children: "Learn how to create components that work for everyone..."
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  href: "#",
                  size: "3",
                  weight: "medium",
                  style: {
                    display: "block",
                    marginBottom: "4px"
                  },
                  children: "Advanced TypeScript Patterns for UI Libraries"
                }),
                e.jsx(i, {
                  size: "2",
                  color: "gray",
                  children: "Explore sophisticated type patterns for better developer experience..."
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  href: "#",
                  size: "3",
                  weight: "medium",
                  style: {
                    display: "block",
                    marginBottom: "4px"
                  },
                  children: "Design System Best Practices in 2024"
                }),
                e.jsx(i, {
                  size: "2",
                  color: "gray",
                  children: "Key principles for creating scalable design systems..."
                })
              ]
            })
          ]
        })
      ]
    })
  };
  o.parameters = {
    ...o.parameters,
    docs: {
      ...(_a = o.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => <Link {...args}>Default Link</Link>
}`,
        ...(_c = (_b = o.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  a.parameters = {
    ...a.parameters,
    docs: {
      ...(_d = a.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: _args => <Link size="1" href="#">
      Size 1 Link
    </Link>
}`,
        ...(_f = (_e = a.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  t.parameters = {
    ...t.parameters,
    docs: {
      ...(_g = t.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <Link size="2" href="#">
      Size 2 Link
    </Link>
}`,
        ...(_i = (_h = t.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_j = l.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: _args => <Link size="3" href="#">
      Size 3 Link
    </Link>
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
  render: _args => <Link size="4" href="#">
      Size 4 Link
    </Link>
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
  render: _args => <Link weight="light" href="#">
      Light Weight Link
    </Link>
}`,
        ...(_r = (_q = d.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_s = h.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: _args => <Link weight="regular" href="#">
      Regular Weight Link
    </Link>
}`,
        ...(_u = (_t = h.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_v = p.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: _args => <Link weight="medium" href="#">
      Medium Weight Link
    </Link>
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
  render: _args => <Link weight="bold" href="#">
      Bold Weight Link
    </Link>
}`,
        ...(_A = (_z = g.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_B = m.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: _args => <Link color="blue" href="#">
      Blue Link
    </Link>
}`,
        ...(_D = (_C = m.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_E = u.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: _args => <Link color="red" href="#">
      Red Link
    </Link>
}`,
        ...(_G = (_F = u.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_H = x.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: _args => <Link color="green" href="#">
      Green Link
    </Link>
}`,
        ...(_J = (_I = x.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_K = k.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: _args => <Link color="purple" href="#">
      Purple Link
    </Link>
}`,
        ...(_M = (_L = k.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  L.parameters = {
    ...L.parameters,
    docs: {
      ...(_N = L.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  render: _args => <Link underline="auto" href="#">
      Auto Underline (default)
    </Link>
}`,
        ...(_P = (_O = L.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_Q = f.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: _args => <Link underline="hover" href="#">
      Hover Underline
    </Link>
}`,
        ...(_S = (_R = f.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_T = y.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  render: _args => <Link underline="always" href="#">
      Always Underlined
    </Link>
}`,
        ...(_V = (_U = y.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_W = z.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  render: _args => <Link underline="never" href="#">
      Never Underlined
    </Link>
}`,
        ...(_Y = (_X = z.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_Z = j.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  render: _args => <Link highContrast href="#">
      High Contrast Link
    </Link>
}`,
        ...(_$ = (__ = j.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_aa = b.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="2">
      <Link size="1" href="#">
        Size 1
      </Link>
      <Link size="2" href="#">
        Size 2
      </Link>
      <Link size="3" href="#">
        Size 3
      </Link>
      <Link size="4" href="#">
        Size 4
      </Link>
      <Link size="5" href="#">
        Size 5
      </Link>
      <Link size="6" href="#">
        Size 6
      </Link>
    </Flex>
}`,
        ...(_ca = (_ba = b.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_da = w.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="2">
      <Link weight="light" href="#">
        Light Weight
      </Link>
      <Link weight="regular" href="#">
        Regular Weight
      </Link>
      <Link weight="medium" href="#">
        Medium Weight
      </Link>
      <Link weight="bold" href="#">
        Bold Weight
      </Link>
    </Flex>
}`,
        ...(_fa = (_ea = w.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_ga = v.parameters) == null ? void 0 : _ga.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="2">
      <Link underline="auto" href="#">
        Auto underline
      </Link>
      <Link underline="hover" href="#">
        Hover underline
      </Link>
      <Link underline="always" href="#">
        Always underlined
      </Link>
      <Link underline="never" href="#">
        Never underlined
      </Link>
    </Flex>
}`,
        ...(_ia = (_ha = v.parameters) == null ? void 0 : _ha.docs) == null ? void 0 : _ia.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_ja = S.parameters) == null ? void 0 : _ja.docs,
      source: {
        originalSource: `{
  render: () => <Text size="3" style={{
    maxWidth: "400px",
    lineHeight: "1.6"
  }}>
      This is a paragraph of text that contains several{" "}
      <Link href="#">inline links</Link> to demonstrate how links appear within
      text content. You can also have{" "}
      <Link href="#" color="red">
        colored links
      </Link>{" "}
      and{" "}
      <Link href="#" weight="bold">
        bold links
      </Link>{" "}
      for emphasis.
    </Text>
}`,
        ...(_la = (_ka = S.parameters) == null ? void 0 : _ka.docs) == null ? void 0 : _la.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_ma = T.parameters) == null ? void 0 : _ma.docs,
      source: {
        originalSource: `{
  render: () => <div>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Navigation Menu
      </Text>
      <Flex gap="6">
        <Link href="#" size="2" weight="medium">
          Home
        </Link>
        <Link href="#" size="2" weight="medium">
          Products
        </Link>
        <Link href="#" size="2" weight="medium">
          About
        </Link>
        <Link href="#" size="2" weight="medium">
          Contact
        </Link>
      </Flex>
    </div>
}`,
        ...(_oa = (_na = T.parameters) == null ? void 0 : _na.docs) == null ? void 0 : _oa.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_pa = B.parameters) == null ? void 0 : _pa.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    backgroundColor: "#f8f9fa",
    padding: "24px",
    borderRadius: "8px",
    maxWidth: "500px"
  }}>
      <Flex direction="column" gap="4">
        <div>
          <Text size="2" weight="bold" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Company
          </Text>
          <Flex direction="column" gap="1">
            <Link href="#" size="1" color="gray">
              About Us
            </Link>
            <Link href="#" size="1" color="gray">
              Careers
            </Link>
            <Link href="#" size="1" color="gray">
              Press
            </Link>
            <Link href="#" size="1" color="gray">
              News
            </Link>
          </Flex>
        </div>

        <div>
          <Text size="2" weight="bold" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Support
          </Text>
          <Flex direction="column" gap="1">
            <Link href="#" size="1" color="gray">
              Help Center
            </Link>
            <Link href="#" size="1" color="gray">
              Documentation
            </Link>
            <Link href="#" size="1" color="gray">
              Contact Support
            </Link>
            <Link href="#" size="1" color="gray">
              Status Page
            </Link>
          </Flex>
        </div>

        <div>
          <Text size="2" weight="bold" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Legal
          </Text>
          <Flex direction="column" gap="1">
            <Link href="#" size="1" color="gray">
              Privacy Policy
            </Link>
            <Link href="#" size="1" color="gray">
              Terms of Service
            </Link>
            <Link href="#" size="1" color="gray">
              Cookie Policy
            </Link>
          </Flex>
        </div>
      </Flex>
    </div>
}`,
        ...(_ra = (_qa = B.parameters) == null ? void 0 : _qa.docs) == null ? void 0 : _ra.source
      }
    }
  };
  _.parameters = {
    ..._.parameters,
    docs: {
      ...(_sa = _.parameters) == null ? void 0 : _sa.docs,
      source: {
        originalSource: `{
  render: () => <div>
      <Text size="3" weight="bold" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Breadcrumb Navigation
      </Text>
      <Flex align="center" gap="2">
        <Link href="#" size="2" color="gray">
          Home
        </Link>
        <Text size="2" color="gray">
          /
        </Text>
        <Link href="#" size="2" color="gray">
          Products
        </Link>
        <Text size="2" color="gray">
          /
        </Text>
        <Link href="#" size="2" color="gray">
          Electronics
        </Link>
        <Text size="2" color="gray">
          /
        </Text>
        <Text size="2" weight="medium">
          Laptop
        </Text>
      </Flex>
    </div>
}`,
        ...(_ua = (_ta = _.parameters) == null ? void 0 : _ta.docs) == null ? void 0 : _ua.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_va = C.parameters) == null ? void 0 : _va.docs,
      source: {
        originalSource: `{
  render: () => <div>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Follow Us
      </Text>
      <Flex gap="4">
        <Link href="#" color="blue" weight="medium">
          Twitter
        </Link>
        <Link href="#" color="indigo" weight="medium">
          Facebook
        </Link>
        <Link href="#" color="purple" weight="medium">
          Instagram
        </Link>
        <Link href="#" color="blue" weight="medium">
          LinkedIn
        </Link>
        <Link href="#" color="red" weight="medium">
          YouTube
        </Link>
      </Flex>
    </div>
}`,
        ...(_xa = (_wa = C.parameters) == null ? void 0 : _wa.docs) == null ? void 0 : _xa.source
      }
    }
  };
  F.parameters = {
    ...F.parameters,
    docs: {
      ...(_ya = F.parameters) == null ? void 0 : _ya.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "400px"
  }}>
      <Text size="4" weight="bold" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Get Started Today
      </Text>
      <Text size="2" style={{
      marginBottom: "16px",
      display: "block",
      lineHeight: "1.6"
    }}>
        Join thousands of developers who are already building amazing
        applications with our component library.
      </Text>
      <Flex gap="4">
        <Link href="#" size="3" weight="bold" color="blue">
          Start Free Trial \u2192
        </Link>
        <Link href="#" size="2" underline="always">
          View Documentation
        </Link>
      </Flex>
    </div>
}`,
        ...(_Aa = (_za = F.parameters) == null ? void 0 : _za.docs) == null ? void 0 : _Aa.source
      }
    }
  };
  W.parameters = {
    ...W.parameters,
    docs: {
      ...(_Ba = W.parameters) == null ? void 0 : _Ba.docs,
      source: {
        originalSource: `{
  render: () => <div>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        External Resources
      </Text>
      <Flex direction="column" gap="2">
        <Link href="https://react.dev" target="_blank" rel="noopener noreferrer">
          React Documentation \u2197
        </Link>
        <Link href="https://www.typescriptlang.org" target="_blank" rel="noopener noreferrer">
          TypeScript Handbook \u2197
        </Link>
        <Link href="https://storybook.js.org" target="_blank" rel="noopener noreferrer">
          Storybook Docs \u2197
        </Link>
        <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
          GitHub Repository \u2197
        </Link>
      </Flex>
    </div>
}`,
        ...(_Da = (_Ca = W.parameters) == null ? void 0 : _Ca.docs) == null ? void 0 : _Da.source
      }
    }
  };
  P.parameters = {
    ...P.parameters,
    docs: {
      ...(_Ea = P.parameters) == null ? void 0 : _Ea.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "500px"
  }}>
      <Text size="4" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Recent Blog Posts
      </Text>
      <Flex direction="column" gap="4">
        <div>
          <Link href="#" size="3" weight="medium" style={{
          display: "block",
          marginBottom: "4px"
        }}>
            Building Accessible React Components
          </Link>
          <Text size="2" color="gray">
            Learn how to create components that work for everyone...
          </Text>
        </div>

        <div>
          <Link href="#" size="3" weight="medium" style={{
          display: "block",
          marginBottom: "4px"
        }}>
            Advanced TypeScript Patterns for UI Libraries
          </Link>
          <Text size="2" color="gray">
            Explore sophisticated type patterns for better developer
            experience...
          </Text>
        </div>

        <div>
          <Link href="#" size="3" weight="medium" style={{
          display: "block",
          marginBottom: "4px"
        }}>
            Design System Best Practices in 2024
          </Link>
          <Text size="2" color="gray">
            Key principles for creating scalable design systems...
          </Text>
        </div>
      </Flex>
    </div>
}`,
        ...(_Ga = (_Fa = P.parameters) == null ? void 0 : _Fa.docs) == null ? void 0 : _Ga.source
      }
    }
  };
  ie = [
    "Default",
    "Size1",
    "Size2",
    "Size3",
    "Size4",
    "WeightLight",
    "WeightRegular",
    "WeightMedium",
    "WeightBold",
    "ColorBlue",
    "ColorRed",
    "ColorGreen",
    "ColorPurple",
    "UnderlineAuto",
    "UnderlineHover",
    "UnderlineAlways",
    "UnderlineNever",
    "HighContrast",
    "AllSizes",
    "AllWeights",
    "AllUnderlines",
    "InlineLinks",
    "NavigationExample",
    "FooterLinksExample",
    "BreadcrumbExample",
    "SocialLinksExample",
    "CTALinksExample",
    "ExternalLinksExample",
    "ArticleLinksExample"
  ];
});
export {
  b as AllSizes,
  v as AllUnderlines,
  w as AllWeights,
  P as ArticleLinksExample,
  _ as BreadcrumbExample,
  F as CTALinksExample,
  m as ColorBlue,
  x as ColorGreen,
  k as ColorPurple,
  u as ColorRed,
  o as Default,
  W as ExternalLinksExample,
  B as FooterLinksExample,
  j as HighContrast,
  S as InlineLinks,
  T as NavigationExample,
  a as Size1,
  t as Size2,
  l as Size3,
  c as Size4,
  C as SocialLinksExample,
  y as UnderlineAlways,
  L as UnderlineAuto,
  f as UnderlineHover,
  z as UnderlineNever,
  g as WeightBold,
  d as WeightLight,
  p as WeightMedium,
  h as WeightRegular,
  ie as __namedExportsOrder,
  __tla,
  ne as default
};
