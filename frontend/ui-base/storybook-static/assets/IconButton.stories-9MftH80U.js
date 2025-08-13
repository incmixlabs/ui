import { j as n, T as W, F as o, a as t, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { I as e, __tla as __tla_1 } from "./icon-button-DBeYp-S7.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_2 } from "./base-button-BHQkXpSv.js";
let A, C, _, T, l, I, z, v, j, k, s, m, h, F, B, E, g, w, S, f, y, b, D, a, i, c, d, P, p, u, x, R, O, H;
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa;
  H = {
    title: "Base/IconButton",
    component: e,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (r) => n.jsx(W, {
        children: n.jsx(r, {})
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
        description: "IconButton size"
      },
      variant: {
        control: "select",
        options: [
          "classic",
          "solid",
          "soft",
          "surface",
          "outline",
          "ghost"
        ],
        description: "IconButton variant style"
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
        description: "IconButton accent color"
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
        description: "IconButton border radius"
      },
      highContrast: {
        control: "boolean",
        description: "High contrast mode"
      },
      disabled: {
        control: "boolean",
        description: "Disabled state"
      },
      loading: {
        control: "boolean",
        description: "Loading state"
      }
    },
    args: {
      size: "2",
      variant: "soft",
      children: "\u2713"
    }
  };
  s = {
    render: (r) => n.jsx(e, {
      ...r,
      children: "\u2713"
    })
  };
  a = {
    render: (r) => n.jsx(e, {
      size: "1",
      children: "\u2713"
    })
  };
  i = {
    render: (r) => n.jsx(e, {
      size: "2",
      children: "\u2713"
    })
  };
  c = {
    render: (r) => n.jsx(e, {
      size: "3",
      children: "\u2713"
    })
  };
  d = {
    render: (r) => n.jsx(e, {
      size: "4",
      children: "\u2713"
    })
  };
  l = {
    render: (r) => n.jsx(e, {
      variant: "classic",
      children: "\u2699\uFE0F"
    })
  };
  u = {
    render: (r) => n.jsx(e, {
      variant: "solid",
      children: "\u2699\uFE0F"
    })
  };
  p = {
    render: (r) => n.jsx(e, {
      variant: "soft",
      children: "\u2699\uFE0F"
    })
  };
  x = {
    render: (r) => n.jsx(e, {
      variant: "surface",
      children: "\u2699\uFE0F"
    })
  };
  g = {
    render: (r) => n.jsx(e, {
      variant: "outline",
      children: "\u2699\uFE0F"
    })
  };
  h = {
    render: (r) => n.jsx(e, {
      variant: "ghost",
      children: "\u2699\uFE0F"
    })
  };
  m = {
    render: (r) => n.jsx(e, {
      disabled: true,
      children: "\u2713"
    })
  };
  B = {
    render: (r) => n.jsx(e, {
      loading: true,
      children: "\u2713"
    })
  };
  I = {
    render: (r) => n.jsx(e, {
      color: "blue",
      children: "\u{1F499}"
    })
  };
  j = {
    render: (r) => n.jsx(e, {
      color: "red",
      children: "\u2764\uFE0F"
    })
  };
  z = {
    render: (r) => n.jsx(e, {
      color: "green",
      children: "\u{1F49A}"
    })
  };
  v = {
    render: (r) => n.jsx(e, {
      color: "purple",
      children: "\u{1F49C}"
    })
  };
  y = {
    render: (r) => n.jsx(e, {
      radius: "none",
      children: "\u2B1C"
    })
  };
  b = {
    render: (r) => n.jsx(e, {
      radius: "small",
      children: "\u{1F533}"
    })
  };
  f = {
    render: (r) => n.jsx(e, {
      radius: "medium",
      children: "\u{1F532}"
    })
  };
  S = {
    render: (r) => n.jsx(e, {
      radius: "large",
      children: "\u{1F518}"
    })
  };
  w = {
    render: (r) => n.jsx(e, {
      radius: "full",
      children: "\u{1F534}"
    })
  };
  F = {
    render: (r) => n.jsx(e, {
      highContrast: true,
      children: "\u26A1"
    })
  };
  _ = {
    render: () => n.jsxs(o, {
      gap: "3",
      align: "center",
      children: [
        n.jsx(e, {
          size: "1",
          children: "\u2713"
        }),
        n.jsx(e, {
          size: "2",
          children: "\u2713"
        }),
        n.jsx(e, {
          size: "3",
          children: "\u2713"
        }),
        n.jsx(e, {
          size: "4",
          children: "\u2713"
        })
      ]
    })
  };
  T = {
    render: () => n.jsxs(o, {
      gap: "2",
      wrap: "wrap",
      children: [
        n.jsx(e, {
          variant: "classic",
          children: "\u2699\uFE0F"
        }),
        n.jsx(e, {
          variant: "solid",
          children: "\u2699\uFE0F"
        }),
        n.jsx(e, {
          variant: "soft",
          children: "\u2699\uFE0F"
        }),
        n.jsx(e, {
          variant: "surface",
          children: "\u2699\uFE0F"
        }),
        n.jsx(e, {
          variant: "outline",
          children: "\u2699\uFE0F"
        }),
        n.jsx(e, {
          variant: "ghost",
          children: "\u2699\uFE0F"
        })
      ]
    })
  };
  C = {
    render: () => n.jsxs(o, {
      gap: "3",
      align: "center",
      children: [
        n.jsx(e, {
          radius: "none",
          children: "\u2B1C"
        }),
        n.jsx(e, {
          radius: "small",
          children: "\u{1F533}"
        }),
        n.jsx(e, {
          radius: "medium",
          children: "\u{1F532}"
        }),
        n.jsx(e, {
          radius: "large",
          children: "\u{1F518}"
        }),
        n.jsx(e, {
          radius: "full",
          children: "\u{1F534}"
        })
      ]
    })
  };
  k = {
    render: () => n.jsxs(o, {
      gap: "2",
      wrap: "wrap",
      children: [
        n.jsx(e, {
          children: "\u2713"
        }),
        n.jsx(e, {
          children: "\u2715"
        }),
        n.jsx(e, {
          children: "\u2764\uFE0F"
        }),
        n.jsx(e, {
          children: "\u2B50"
        }),
        n.jsx(e, {
          children: "\u{1F4C1}"
        }),
        n.jsx(e, {
          children: "\u{1F50D}"
        }),
        n.jsx(e, {
          children: "\u2699\uFE0F"
        }),
        n.jsx(e, {
          children: "\u{1F4DD}"
        }),
        n.jsx(e, {
          children: "\u{1F512}"
        }),
        n.jsx(e, {
          children: "\u{1F4CA}"
        }),
        n.jsx(e, {
          children: "\u{1F3E0}"
        }),
        n.jsx(e, {
          children: "\u{1F464}"
        })
      ]
    })
  };
  R = {
    render: () => n.jsxs("div", {
      children: [
        n.jsx(t, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Text Editor Toolbar"
        }),
        n.jsxs(o, {
          gap: "1",
          style: {
            padding: "8px",
            backgroundColor: "#f8f9fa",
            borderRadius: "6px",
            border: "1px solid #e1e5e9"
          },
          children: [
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "B"
            }),
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "I"
            }),
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "U"
            }),
            n.jsx("div", {
              style: {
                width: "1px",
                height: "24px",
                backgroundColor: "#e1e5e9",
                margin: "0 4px"
              }
            }),
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "\u26AA"
            }),
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "\u{1F4CB}"
            }),
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "\u{1F517}"
            }),
            n.jsx("div", {
              style: {
                width: "1px",
                height: "24px",
                backgroundColor: "#e1e5e9",
                margin: "0 4px"
              }
            }),
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "\u21B6"
            }),
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "\u21B7"
            })
          ]
        })
      ]
    })
  };
  E = {
    render: () => n.jsxs("div", {
      children: [
        n.jsx(t, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "12px",
            display: "block"
          },
          children: "Media Player Controls"
        }),
        n.jsxs(o, {
          gap: "2",
          align: "center",
          style: {
            padding: "16px",
            backgroundColor: "#111",
            borderRadius: "8px",
            color: "white"
          },
          children: [
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "\u23EE\uFE0F"
            }),
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "\u23EA"
            }),
            n.jsx(e, {
              size: "3",
              variant: "solid",
              color: "blue",
              children: "\u25B6\uFE0F"
            }),
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "\u23E9"
            }),
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "\u23ED\uFE0F"
            }),
            n.jsx("div", {
              style: {
                width: "1px",
                height: "32px",
                backgroundColor: "#333",
                margin: "0 8px"
              }
            }),
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "\u{1F50A}"
            }),
            n.jsx(e, {
              size: "1",
              variant: "ghost",
              children: "\u2699\uFE0F"
            })
          ]
        })
      ]
    })
  };
  A = {
    render: () => n.jsxs("div", {
      style: {
        maxWidth: "300px"
      },
      children: [
        n.jsx(t, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Quick Actions"
        }),
        n.jsxs(o, {
          direction: "column",
          gap: "3",
          children: [
            n.jsxs(o, {
              justify: "between",
              align: "center",
              children: [
                n.jsx(t, {
                  size: "2",
                  children: "Enable notifications"
                }),
                n.jsxs(o, {
                  gap: "1",
                  children: [
                    n.jsx(e, {
                      size: "1",
                      color: "green",
                      variant: "soft",
                      children: "\u2713"
                    }),
                    n.jsx(e, {
                      size: "1",
                      color: "red",
                      variant: "soft",
                      children: "\u2715"
                    })
                  ]
                })
              ]
            }),
            n.jsxs(o, {
              justify: "between",
              align: "center",
              children: [
                n.jsx(t, {
                  size: "2",
                  children: "Save to favorites"
                }),
                n.jsx(e, {
                  size: "1",
                  color: "yellow",
                  variant: "soft",
                  children: "\u2B50"
                })
              ]
            }),
            n.jsxs(o, {
              justify: "between",
              align: "center",
              children: [
                n.jsx(t, {
                  size: "2",
                  children: "Share document"
                }),
                n.jsx(e, {
                  size: "1",
                  color: "blue",
                  variant: "soft",
                  children: "\u{1F4E4}"
                })
              ]
            }),
            n.jsxs(o, {
              justify: "between",
              align: "center",
              children: [
                n.jsx(t, {
                  size: "2",
                  children: "Delete item"
                }),
                n.jsx(e, {
                  size: "1",
                  color: "red",
                  variant: "soft",
                  children: "\u{1F5D1}\uFE0F"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  P = {
    render: () => n.jsx("div", {
      style: {
        maxWidth: "350px"
      },
      children: n.jsxs("div", {
        style: {
          padding: "16px",
          border: "1px solid #e1e5e9",
          borderRadius: "8px",
          marginBottom: "12px"
        },
        children: [
          n.jsx(t, {
            size: "2",
            style: {
              marginBottom: "12px",
              display: "block"
            },
            children: "Just shared a new design system component! What do you think? #design #ui #react"
          }),
          n.jsxs(o, {
            justify: "between",
            align: "center",
            children: [
              n.jsxs(o, {
                gap: "1",
                children: [
                  n.jsx(e, {
                    size: "1",
                    variant: "ghost",
                    color: "red",
                    children: "\u2764\uFE0F"
                  }),
                  n.jsx(t, {
                    size: "1",
                    color: "gray",
                    children: "24"
                  })
                ]
              }),
              n.jsxs(o, {
                gap: "1",
                children: [
                  n.jsx(e, {
                    size: "1",
                    variant: "ghost",
                    color: "blue",
                    children: "\u{1F4AC}"
                  }),
                  n.jsx(t, {
                    size: "1",
                    color: "gray",
                    children: "8"
                  })
                ]
              }),
              n.jsxs(o, {
                gap: "1",
                children: [
                  n.jsx(e, {
                    size: "1",
                    variant: "ghost",
                    color: "green",
                    children: "\u{1F504}"
                  }),
                  n.jsx(t, {
                    size: "1",
                    color: "gray",
                    children: "12"
                  })
                ]
              }),
              n.jsx(e, {
                size: "1",
                variant: "ghost",
                children: "\u{1F4E4}"
              })
            ]
          })
        ]
      })
    })
  };
  D = {
    render: () => n.jsxs("div", {
      style: {
        maxWidth: "280px"
      },
      children: [
        n.jsx(t, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Account Settings"
        }),
        n.jsxs(o, {
          direction: "column",
          gap: "2",
          children: [
            n.jsxs(o, {
              justify: "between",
              align: "center",
              style: {
                padding: "8px 0"
              },
              children: [
                n.jsx(t, {
                  size: "2",
                  children: "Edit profile"
                }),
                n.jsx(e, {
                  size: "1",
                  variant: "ghost",
                  children: "\u270F\uFE0F"
                })
              ]
            }),
            n.jsxs(o, {
              justify: "between",
              align: "center",
              style: {
                padding: "8px 0"
              },
              children: [
                n.jsx(t, {
                  size: "2",
                  children: "Privacy settings"
                }),
                n.jsx(e, {
                  size: "1",
                  variant: "ghost",
                  children: "\u{1F512}"
                })
              ]
            }),
            n.jsxs(o, {
              justify: "between",
              align: "center",
              style: {
                padding: "8px 0"
              },
              children: [
                n.jsx(t, {
                  size: "2",
                  children: "Notification preferences"
                }),
                n.jsx(e, {
                  size: "1",
                  variant: "ghost",
                  children: "\u{1F514}"
                })
              ]
            }),
            n.jsxs(o, {
              justify: "between",
              align: "center",
              style: {
                padding: "8px 0"
              },
              children: [
                n.jsx(t, {
                  size: "2",
                  children: "Billing information"
                }),
                n.jsx(e, {
                  size: "1",
                  variant: "ghost",
                  children: "\u{1F4B3}"
                })
              ]
            }),
            n.jsx("div", {
              style: {
                height: "1px",
                backgroundColor: "#e1e5e9",
                margin: "8px 0"
              }
            }),
            n.jsxs(o, {
              justify: "between",
              align: "center",
              style: {
                padding: "8px 0"
              },
              children: [
                n.jsx(t, {
                  size: "2",
                  color: "red",
                  children: "Delete account"
                }),
                n.jsx(e, {
                  size: "1",
                  variant: "ghost",
                  color: "red",
                  children: "\u{1F5D1}\uFE0F"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  s.parameters = {
    ...s.parameters,
    docs: {
      ...(_a = s.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => <IconButton {...args}>\u2713</IconButton>
}`,
        ...(_c = (_b = s.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  a.parameters = {
    ...a.parameters,
    docs: {
      ...(_d = a.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton size="1">\u2713</IconButton>
}`,
        ...(_f = (_e = a.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  i.parameters = {
    ...i.parameters,
    docs: {
      ...(_g = i.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton size="2">\u2713</IconButton>
}`,
        ...(_i = (_h = i.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  c.parameters = {
    ...c.parameters,
    docs: {
      ...(_j = c.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton size="3">\u2713</IconButton>
}`,
        ...(_l = (_k = c.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  d.parameters = {
    ...d.parameters,
    docs: {
      ...(_m = d.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton size="4">\u2713</IconButton>
}`,
        ...(_o = (_n = d.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_p = l.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton variant="classic">\u2699\uFE0F</IconButton>
}`,
        ...(_r = (_q = l.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_s = u.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton variant="solid">\u2699\uFE0F</IconButton>
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
  render: _args => <IconButton variant="soft">\u2699\uFE0F</IconButton>
}`,
        ...(_x = (_w = p.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_y = x.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton variant="surface">\u2699\uFE0F</IconButton>
}`,
        ...(_A = (_z = x.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  g.parameters = {
    ...g.parameters,
    docs: {
      ...(_B = g.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton variant="outline">\u2699\uFE0F</IconButton>
}`,
        ...(_D = (_C = g.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_E = h.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton variant="ghost">\u2699\uFE0F</IconButton>
}`,
        ...(_G = (_F = h.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_H = m.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton disabled>\u2713</IconButton>
}`,
        ...(_J = (_I = m.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_K = B.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton loading>\u2713</IconButton>
}`,
        ...(_M = (_L = B.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  I.parameters = {
    ...I.parameters,
    docs: {
      ...(_N = I.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton color="blue">\u{1F499}</IconButton>
}`,
        ...(_P = (_O = I.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_Q = j.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton color="red">\u2764\uFE0F</IconButton>
}`,
        ...(_S = (_R = j.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_T = z.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton color="green">\u{1F49A}</IconButton>
}`,
        ...(_V = (_U = z.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_W = v.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton color="purple">\u{1F49C}</IconButton>
}`,
        ...(_Y = (_X = v.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_Z = y.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton radius="none">\u2B1C</IconButton>
}`,
        ...(_$ = (__ = y.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_aa = b.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton radius="small">\u{1F533}</IconButton>
}`,
        ...(_ca = (_ba = b.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_da = f.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton radius="medium">\u{1F532}</IconButton>
}`,
        ...(_fa = (_ea = f.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_ga = S.parameters) == null ? void 0 : _ga.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton radius="large">\u{1F518}</IconButton>
}`,
        ...(_ia = (_ha = S.parameters) == null ? void 0 : _ha.docs) == null ? void 0 : _ia.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_ja = w.parameters) == null ? void 0 : _ja.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton radius="full">\u{1F534}</IconButton>
}`,
        ...(_la = (_ka = w.parameters) == null ? void 0 : _ka.docs) == null ? void 0 : _la.source
      }
    }
  };
  F.parameters = {
    ...F.parameters,
    docs: {
      ...(_ma = F.parameters) == null ? void 0 : _ma.docs,
      source: {
        originalSource: `{
  render: _args => <IconButton highContrast>\u26A1</IconButton>
}`,
        ...(_oa = (_na = F.parameters) == null ? void 0 : _na.docs) == null ? void 0 : _oa.source
      }
    }
  };
  _.parameters = {
    ..._.parameters,
    docs: {
      ...(_pa = _.parameters) == null ? void 0 : _pa.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="3" align="center">
      <IconButton size="1">\u2713</IconButton>
      <IconButton size="2">\u2713</IconButton>
      <IconButton size="3">\u2713</IconButton>
      <IconButton size="4">\u2713</IconButton>
    </Flex>
}`,
        ...(_ra = (_qa = _.parameters) == null ? void 0 : _qa.docs) == null ? void 0 : _ra.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_sa = T.parameters) == null ? void 0 : _sa.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="2" wrap="wrap">
      <IconButton variant="classic">\u2699\uFE0F</IconButton>
      <IconButton variant="solid">\u2699\uFE0F</IconButton>
      <IconButton variant="soft">\u2699\uFE0F</IconButton>
      <IconButton variant="surface">\u2699\uFE0F</IconButton>
      <IconButton variant="outline">\u2699\uFE0F</IconButton>
      <IconButton variant="ghost">\u2699\uFE0F</IconButton>
    </Flex>
}`,
        ...(_ua = (_ta = T.parameters) == null ? void 0 : _ta.docs) == null ? void 0 : _ua.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_va = C.parameters) == null ? void 0 : _va.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="3" align="center">
      <IconButton radius="none">\u2B1C</IconButton>
      <IconButton radius="small">\u{1F533}</IconButton>
      <IconButton radius="medium">\u{1F532}</IconButton>
      <IconButton radius="large">\u{1F518}</IconButton>
      <IconButton radius="full">\u{1F534}</IconButton>
    </Flex>
}`,
        ...(_xa = (_wa = C.parameters) == null ? void 0 : _wa.docs) == null ? void 0 : _xa.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_ya = k.parameters) == null ? void 0 : _ya.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="2" wrap="wrap">
      <IconButton>\u2713</IconButton>
      <IconButton>\u2715</IconButton>
      <IconButton>\u2764\uFE0F</IconButton>
      <IconButton>\u2B50</IconButton>
      <IconButton>\u{1F4C1}</IconButton>
      <IconButton>\u{1F50D}</IconButton>
      <IconButton>\u2699\uFE0F</IconButton>
      <IconButton>\u{1F4DD}</IconButton>
      <IconButton>\u{1F512}</IconButton>
      <IconButton>\u{1F4CA}</IconButton>
      <IconButton>\u{1F3E0}</IconButton>
      <IconButton>\u{1F464}</IconButton>
    </Flex>
}`,
        ...(_Aa = (_za = k.parameters) == null ? void 0 : _za.docs) == null ? void 0 : _Aa.source
      }
    }
  };
  R.parameters = {
    ...R.parameters,
    docs: {
      ...(_Ba = R.parameters) == null ? void 0 : _Ba.docs,
      source: {
        originalSource: `{
  render: () => <div>
      <Text size="3" weight="bold" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Text Editor Toolbar
      </Text>
      <Flex gap="1" style={{
      padding: "8px",
      backgroundColor: "#f8f9fa",
      borderRadius: "6px",
      border: "1px solid #e1e5e9"
    }}>
        <IconButton size="1" variant="ghost">
          B
        </IconButton>
        <IconButton size="1" variant="ghost">
          I
        </IconButton>
        <IconButton size="1" variant="ghost">
          U
        </IconButton>
        <div style={{
        width: "1px",
        height: "24px",
        backgroundColor: "#e1e5e9",
        margin: "0 4px"
      }} />
        <IconButton size="1" variant="ghost">
          \u26AA
        </IconButton>
        <IconButton size="1" variant="ghost">
          \u{1F4CB}
        </IconButton>
        <IconButton size="1" variant="ghost">
          \u{1F517}
        </IconButton>
        <div style={{
        width: "1px",
        height: "24px",
        backgroundColor: "#e1e5e9",
        margin: "0 4px"
      }} />
        <IconButton size="1" variant="ghost">
          \u21B6
        </IconButton>
        <IconButton size="1" variant="ghost">
          \u21B7
        </IconButton>
      </Flex>
    </div>
}`,
        ...(_Da = (_Ca = R.parameters) == null ? void 0 : _Ca.docs) == null ? void 0 : _Da.source
      }
    }
  };
  E.parameters = {
    ...E.parameters,
    docs: {
      ...(_Ea = E.parameters) == null ? void 0 : _Ea.docs,
      source: {
        originalSource: `{
  render: () => <div>
      <Text size="3" weight="bold" style={{
      marginBottom: "12px",
      display: "block"
    }}>
        Media Player Controls
      </Text>
      <Flex gap="2" align="center" style={{
      padding: "16px",
      backgroundColor: "#111",
      borderRadius: "8px",
      color: "white"
    }}>
        <IconButton size="1" variant="ghost">
          \u23EE\uFE0F
        </IconButton>
        <IconButton size="1" variant="ghost">
          \u23EA
        </IconButton>
        <IconButton size="3" variant="solid" color="blue">
          \u25B6\uFE0F
        </IconButton>
        <IconButton size="1" variant="ghost">
          \u23E9
        </IconButton>
        <IconButton size="1" variant="ghost">
          \u23ED\uFE0F
        </IconButton>
        <div style={{
        width: "1px",
        height: "32px",
        backgroundColor: "#333",
        margin: "0 8px"
      }} />
        <IconButton size="1" variant="ghost">
          \u{1F50A}
        </IconButton>
        <IconButton size="1" variant="ghost">
          \u2699\uFE0F
        </IconButton>
      </Flex>
    </div>
}`,
        ...(_Ga = (_Fa = E.parameters) == null ? void 0 : _Fa.docs) == null ? void 0 : _Ga.source
      }
    }
  };
  A.parameters = {
    ...A.parameters,
    docs: {
      ...(_Ha = A.parameters) == null ? void 0 : _Ha.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "300px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Quick Actions
      </Text>

      <Flex direction="column" gap="3">
        <Flex justify="between" align="center">
          <Text size="2">Enable notifications</Text>
          <Flex gap="1">
            <IconButton size="1" color="green" variant="soft">
              \u2713
            </IconButton>
            <IconButton size="1" color="red" variant="soft">
              \u2715
            </IconButton>
          </Flex>
        </Flex>

        <Flex justify="between" align="center">
          <Text size="2">Save to favorites</Text>
          <IconButton size="1" color="yellow" variant="soft">
            \u2B50
          </IconButton>
        </Flex>

        <Flex justify="between" align="center">
          <Text size="2">Share document</Text>
          <IconButton size="1" color="blue" variant="soft">
            \u{1F4E4}
          </IconButton>
        </Flex>

        <Flex justify="between" align="center">
          <Text size="2">Delete item</Text>
          <IconButton size="1" color="red" variant="soft">
            \u{1F5D1}\uFE0F
          </IconButton>
        </Flex>
      </Flex>
    </div>
}`,
        ...(_Ja = (_Ia = A.parameters) == null ? void 0 : _Ia.docs) == null ? void 0 : _Ja.source
      }
    }
  };
  P.parameters = {
    ...P.parameters,
    docs: {
      ...(_Ka = P.parameters) == null ? void 0 : _Ka.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "350px"
  }}>
      <div style={{
      padding: "16px",
      border: "1px solid #e1e5e9",
      borderRadius: "8px",
      marginBottom: "12px"
    }}>
        <Text size="2" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Just shared a new design system component! What do you think? #design
          #ui #react
        </Text>
        <Flex justify="between" align="center">
          <Flex gap="1">
            <IconButton size="1" variant="ghost" color="red">
              \u2764\uFE0F
            </IconButton>
            <Text size="1" color="gray">
              24
            </Text>
          </Flex>
          <Flex gap="1">
            <IconButton size="1" variant="ghost" color="blue">
              \u{1F4AC}
            </IconButton>
            <Text size="1" color="gray">
              8
            </Text>
          </Flex>
          <Flex gap="1">
            <IconButton size="1" variant="ghost" color="green">
              \u{1F504}
            </IconButton>
            <Text size="1" color="gray">
              12
            </Text>
          </Flex>
          <IconButton size="1" variant="ghost">
            \u{1F4E4}
          </IconButton>
        </Flex>
      </div>
    </div>
}`,
        ...(_Ma = (_La = P.parameters) == null ? void 0 : _La.docs) == null ? void 0 : _Ma.source
      }
    }
  };
  D.parameters = {
    ...D.parameters,
    docs: {
      ...(_Na = D.parameters) == null ? void 0 : _Na.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "280px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Account Settings
      </Text>

      <Flex direction="column" gap="2">
        <Flex justify="between" align="center" style={{
        padding: "8px 0"
      }}>
          <Text size="2">Edit profile</Text>
          <IconButton size="1" variant="ghost">
            \u270F\uFE0F
          </IconButton>
        </Flex>

        <Flex justify="between" align="center" style={{
        padding: "8px 0"
      }}>
          <Text size="2">Privacy settings</Text>
          <IconButton size="1" variant="ghost">
            \u{1F512}
          </IconButton>
        </Flex>

        <Flex justify="between" align="center" style={{
        padding: "8px 0"
      }}>
          <Text size="2">Notification preferences</Text>
          <IconButton size="1" variant="ghost">
            \u{1F514}
          </IconButton>
        </Flex>

        <Flex justify="between" align="center" style={{
        padding: "8px 0"
      }}>
          <Text size="2">Billing information</Text>
          <IconButton size="1" variant="ghost">
            \u{1F4B3}
          </IconButton>
        </Flex>

        <div style={{
        height: "1px",
        backgroundColor: "#e1e5e9",
        margin: "8px 0"
      }} />

        <Flex justify="between" align="center" style={{
        padding: "8px 0"
      }}>
          <Text size="2" color="red">
            Delete account
          </Text>
          <IconButton size="1" variant="ghost" color="red">
            \u{1F5D1}\uFE0F
          </IconButton>
        </Flex>
      </Flex>
    </div>
}`,
        ...(_Pa = (_Oa = D.parameters) == null ? void 0 : _Oa.docs) == null ? void 0 : _Pa.source
      }
    }
  };
  O = [
    "Default",
    "Size1",
    "Size2",
    "Size3",
    "Size4",
    "Classic",
    "Solid",
    "Soft",
    "Surface",
    "Outline",
    "Ghost",
    "Disabled",
    "Loading",
    "ColorBlue",
    "ColorRed",
    "ColorGreen",
    "ColorPurple",
    "RadiusNone",
    "RadiusSmall",
    "RadiusMedium",
    "RadiusLarge",
    "RadiusFull",
    "HighContrast",
    "AllSizes",
    "AllVariants",
    "AllRadius",
    "CommonIcons",
    "ToolbarExample",
    "MediaPlayerExample",
    "ActionButtonsExample",
    "SocialActionsExample",
    "SettingsPanelExample"
  ];
});
export {
  A as ActionButtonsExample,
  C as AllRadius,
  _ as AllSizes,
  T as AllVariants,
  l as Classic,
  I as ColorBlue,
  z as ColorGreen,
  v as ColorPurple,
  j as ColorRed,
  k as CommonIcons,
  s as Default,
  m as Disabled,
  h as Ghost,
  F as HighContrast,
  B as Loading,
  E as MediaPlayerExample,
  g as Outline,
  w as RadiusFull,
  S as RadiusLarge,
  f as RadiusMedium,
  y as RadiusNone,
  b as RadiusSmall,
  D as SettingsPanelExample,
  a as Size1,
  i as Size2,
  c as Size3,
  d as Size4,
  P as SocialActionsExample,
  p as Soft,
  u as Solid,
  x as Surface,
  R as ToolbarExample,
  O as __namedExportsOrder,
  __tla,
  H as default
};
