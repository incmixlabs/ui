import { j as e, T as M, F as a, a as n, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { A as s, __tla as __tla_1 } from "./avatar-DxZO6dds.js";
import "./preload-helper-D9Z9MdNV.js";
import "./types-sXqsNS8j.js";
import { __tla as __tla_2 } from "./user-DF4nMnH4.js";
import { __tla as __tla_3 } from "./createLucideIcon-BUkpxZyj.js";
let A, C, k, S, R, y, z, o, i, D, L, J, w, F, T, j, v, B, c, t, p, d, m, g, u, x, f, h, b, l, E, q;
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja;
  q = {
    title: "Base/Avatar",
    component: s,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (r) => e.jsx(M, {
        children: e.jsx(r, {})
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
        description: "Avatar size"
      },
      variant: {
        control: "select",
        options: [
          "solid",
          "soft"
        ],
        description: "Avatar variant style"
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
        description: "Avatar accent color"
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
        description: "Avatar border radius"
      },
      highContrast: {
        control: "boolean",
        description: "High contrast mode"
      },
      fallback: {
        control: "text",
        description: "Fallback content when image fails to load"
      },
      src: {
        control: "text",
        description: "Image source URL"
      },
      alt: {
        control: "text",
        description: "Alternative text for the image"
      }
    },
    args: {
      size: "3",
      variant: "soft",
      fallback: "JD"
    }
  };
  o = {
    args: {
      fallback: "JD"
    }
  };
  l = {
    args: {
      src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
      alt: "John Doe",
      fallback: "JD"
    }
  };
  i = {
    args: {
      src: "https://broken-image-url.jpg",
      alt: "Broken image",
      fallback: "AB"
    }
  };
  c = {
    args: {
      size: "1",
      fallback: "XS"
    }
  };
  t = {
    args: {
      size: "2",
      fallback: "S"
    }
  };
  p = {
    args: {
      size: "3",
      fallback: "M"
    }
  };
  d = {
    args: {
      size: "4",
      fallback: "L"
    }
  };
  m = {
    args: {
      size: "5",
      fallback: "XL"
    }
  };
  g = {
    args: {
      size: "6",
      fallback: "XXL"
    }
  };
  u = {
    args: {
      size: "7",
      fallback: "3XL"
    }
  };
  x = {
    args: {
      size: "8",
      fallback: "4XL"
    }
  };
  f = {
    args: {
      size: "9",
      fallback: "5XL"
    }
  };
  b = {
    args: {
      variant: "solid",
      fallback: "S",
      color: "blue"
    }
  };
  h = {
    args: {
      variant: "soft",
      fallback: "S",
      color: "blue"
    }
  };
  k = {
    args: {
      color: "blue",
      fallback: "B"
    }
  };
  z = {
    args: {
      color: "red",
      fallback: "R"
    }
  };
  S = {
    args: {
      color: "green",
      fallback: "G"
    }
  };
  y = {
    args: {
      color: "purple",
      fallback: "P"
    }
  };
  j = {
    args: {
      radius: "none",
      fallback: "SQ"
    }
  };
  v = {
    args: {
      radius: "small",
      fallback: "SM"
    }
  };
  T = {
    args: {
      radius: "medium",
      fallback: "MD"
    }
  };
  F = {
    args: {
      radius: "large",
      fallback: "LG"
    }
  };
  w = {
    args: {
      radius: "full",
      fallback: "FL"
    }
  };
  L = {
    args: {
      highContrast: true,
      fallback: "HC",
      color: "blue"
    }
  };
  A = {
    render: () => e.jsx(a, {
      align: "center",
      gap: "3",
      wrap: "wrap",
      children: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ].map((r) => e.jsxs(a, {
        direction: "column",
        align: "center",
        gap: "1",
        children: [
          e.jsx(s, {
            size: r,
            fallback: r
          }),
          e.jsxs(n, {
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
  C = {
    render: () => e.jsxs(a, {
      gap: "4",
      align: "center",
      children: [
        e.jsxs(a, {
          direction: "column",
          align: "center",
          gap: "2",
          children: [
            e.jsx(s, {
              variant: "solid",
              color: "blue",
              fallback: "S"
            }),
            e.jsx(n, {
              size: "2",
              children: "Solid"
            })
          ]
        }),
        e.jsxs(a, {
          direction: "column",
          align: "center",
          gap: "2",
          children: [
            e.jsx(s, {
              variant: "soft",
              color: "blue",
              fallback: "S"
            }),
            e.jsx(n, {
              size: "2",
              children: "Soft"
            })
          ]
        })
      ]
    })
  };
  R = {
    render: () => e.jsx(a, {
      gap: "2",
      wrap: "wrap",
      style: {
        maxWidth: "400px"
      },
      children: [
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
      ].map((r) => e.jsxs(a, {
        direction: "column",
        align: "center",
        gap: "1",
        children: [
          e.jsx(s, {
            color: r,
            fallback: r.slice(0, 2).toUpperCase(),
            size: "2"
          }),
          e.jsx(n, {
            size: "1",
            color: "gray",
            children: r
          })
        ]
      }, r))
    })
  };
  D = {
    render: () => e.jsxs(a, {
      gap: "4",
      align: "center",
      children: [
        e.jsxs(a, {
          direction: "column",
          align: "center",
          gap: "2",
          children: [
            e.jsx(s, {
              fallback: "J",
              size: "4"
            }),
            e.jsx(n, {
              size: "2",
              children: "Single Letter"
            })
          ]
        }),
        e.jsxs(a, {
          direction: "column",
          align: "center",
          gap: "2",
          children: [
            e.jsx(s, {
              fallback: "JD",
              size: "4"
            }),
            e.jsx(n, {
              size: "2",
              children: "Initials"
            })
          ]
        }),
        e.jsxs(a, {
          direction: "column",
          align: "center",
          gap: "2",
          children: [
            e.jsx(s, {
              fallback: "\u{1F464}",
              size: "4"
            }),
            e.jsx(n, {
              size: "2",
              children: "Icon/Emoji"
            })
          ]
        })
      ]
    })
  };
  J = {
    render: () => e.jsxs(a, {
      direction: "column",
      gap: "4",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "3",
              weight: "medium",
              children: "Loading Image (valid URL):"
            }),
            e.jsxs(a, {
              gap: "2",
              align: "center",
              style: {
                marginTop: "8px"
              },
              children: [
                e.jsx(s, {
                  src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
                  alt: "Loading image",
                  fallback: "L",
                  size: "4"
                }),
                e.jsx(n, {
                  size: "2",
                  color: "gray",
                  children: "Image loads successfully"
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "3",
              weight: "medium",
              children: "Failed Image (broken URL):"
            }),
            e.jsxs(a, {
              gap: "2",
              align: "center",
              style: {
                marginTop: "8px"
              },
              children: [
                e.jsx(s, {
                  src: "https://broken-image-url.jpg",
                  alt: "Broken image",
                  fallback: "F",
                  size: "4",
                  color: "red"
                }),
                e.jsx(n, {
                  size: "2",
                  color: "gray",
                  children: "Falls back to initials"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  B = {
    render: () => e.jsxs(a, {
      direction: "column",
      gap: "6",
      style: {
        maxWidth: "400px"
      },
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "4",
              weight: "bold",
              children: "User Profile Header"
            }),
            e.jsxs(a, {
              gap: "3",
              align: "center",
              style: {
                marginTop: "12px",
                padding: "16px",
                backgroundColor: "var(--gray-2)",
                borderRadius: "8px"
              },
              children: [
                e.jsx(s, {
                  src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
                  fallback: "JD",
                  size: "5",
                  color: "blue"
                }),
                e.jsxs(a, {
                  direction: "column",
                  gap: "1",
                  children: [
                    e.jsx(n, {
                      size: "4",
                      weight: "medium",
                      children: "John Doe"
                    }),
                    e.jsx(n, {
                      size: "2",
                      color: "gray",
                      children: "Senior Developer"
                    })
                  ]
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "4",
              weight: "bold",
              children: "Comment Thread"
            }),
            e.jsx(a, {
              direction: "column",
              gap: "3",
              style: {
                marginTop: "12px"
              },
              children: [
                {
                  name: "Alice Johnson",
                  initials: "AJ",
                  comment: "Great work on this feature!",
                  color: "green"
                },
                {
                  name: "Bob Smith",
                  initials: "BS",
                  comment: "I have some feedback on the implementation.",
                  color: "purple"
                },
                {
                  name: "Carol Davis",
                  initials: "CD",
                  comment: "Thanks for the detailed explanation.",
                  color: "orange"
                }
              ].map((r, I) => e.jsxs(a, {
                gap: "3",
                align: "start",
                style: {
                  padding: "12px",
                  backgroundColor: "var(--gray-2)",
                  borderRadius: "8px"
                },
                children: [
                  e.jsx(s, {
                    fallback: r.initials,
                    size: "3",
                    color: r.color
                  }),
                  e.jsxs(a, {
                    direction: "column",
                    gap: "1",
                    style: {
                      flex: 1
                    },
                    children: [
                      e.jsx(n, {
                        size: "2",
                        weight: "medium",
                        children: r.name
                      }),
                      e.jsx(n, {
                        size: "2",
                        children: r.comment
                      })
                    ]
                  })
                ]
              }, I))
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "4",
              weight: "bold",
              children: "Team Members"
            }),
            e.jsx(a, {
              gap: "2",
              wrap: "wrap",
              style: {
                marginTop: "12px"
              },
              children: [
                {
                  initials: "JD",
                  color: "blue"
                },
                {
                  initials: "SM",
                  color: "green"
                },
                {
                  initials: "AL",
                  color: "purple"
                },
                {
                  initials: "MK",
                  color: "orange"
                },
                {
                  initials: "TW",
                  color: "red"
                },
                {
                  initials: "+3",
                  color: "gray"
                }
              ].map((r, I) => e.jsx(s, {
                fallback: r.initials,
                size: "3",
                color: r.color,
                variant: r.initials === "+3" ? "solid" : "soft"
              }, I))
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
  args: {
    fallback: "JD"
  }
}`,
        ...(_c = (_b = o.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_d = l.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  args: {
    src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    alt: "John Doe",
    fallback: "JD"
  }
}`,
        ...(_f = (_e = l.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  i.parameters = {
    ...i.parameters,
    docs: {
      ...(_g = i.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  args: {
    src: "https://broken-image-url.jpg",
    alt: "Broken image",
    fallback: "AB"
  }
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
  args: {
    size: "1",
    fallback: "XS"
  }
}`,
        ...(_l = (_k = c.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  t.parameters = {
    ...t.parameters,
    docs: {
      ...(_m = t.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  args: {
    size: "2",
    fallback: "S"
  }
}`,
        ...(_o = (_n = t.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_p = p.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  args: {
    size: "3",
    fallback: "M"
  }
}`,
        ...(_r = (_q = p.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  d.parameters = {
    ...d.parameters,
    docs: {
      ...(_s = d.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  args: {
    size: "4",
    fallback: "L"
  }
}`,
        ...(_u = (_t = d.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_v = m.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  args: {
    size: "5",
    fallback: "XL"
  }
}`,
        ...(_x = (_w = m.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  g.parameters = {
    ...g.parameters,
    docs: {
      ...(_y = g.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  args: {
    size: "6",
    fallback: "XXL"
  }
}`,
        ...(_A = (_z = g.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_B = u.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  args: {
    size: "7",
    fallback: "3XL"
  }
}`,
        ...(_D = (_C = u.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_E = x.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  args: {
    size: "8",
    fallback: "4XL"
  }
}`,
        ...(_G = (_F = x.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_H = f.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  args: {
    size: "9",
    fallback: "5XL"
  }
}`,
        ...(_J = (_I = f.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_K = b.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  args: {
    variant: "solid",
    fallback: "S",
    color: "blue"
  }
}`,
        ...(_M = (_L = b.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_N = h.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  args: {
    variant: "soft",
    fallback: "S",
    color: "blue"
  }
}`,
        ...(_P = (_O = h.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_Q = k.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  args: {
    color: "blue",
    fallback: "B"
  }
}`,
        ...(_S = (_R = k.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_T = z.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  args: {
    color: "red",
    fallback: "R"
  }
}`,
        ...(_V = (_U = z.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_W = S.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  args: {
    color: "green",
    fallback: "G"
  }
}`,
        ...(_Y = (_X = S.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_Z = y.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  args: {
    color: "purple",
    fallback: "P"
  }
}`,
        ...(_$ = (__ = y.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_aa = j.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  args: {
    radius: "none",
    fallback: "SQ"
  }
}`,
        ...(_ca = (_ba = j.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_da = v.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  args: {
    radius: "small",
    fallback: "SM"
  }
}`,
        ...(_fa = (_ea = v.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_ga = T.parameters) == null ? void 0 : _ga.docs,
      source: {
        originalSource: `{
  args: {
    radius: "medium",
    fallback: "MD"
  }
}`,
        ...(_ia = (_ha = T.parameters) == null ? void 0 : _ha.docs) == null ? void 0 : _ia.source
      }
    }
  };
  F.parameters = {
    ...F.parameters,
    docs: {
      ...(_ja = F.parameters) == null ? void 0 : _ja.docs,
      source: {
        originalSource: `{
  args: {
    radius: "large",
    fallback: "LG"
  }
}`,
        ...(_la = (_ka = F.parameters) == null ? void 0 : _ka.docs) == null ? void 0 : _la.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_ma = w.parameters) == null ? void 0 : _ma.docs,
      source: {
        originalSource: `{
  args: {
    radius: "full",
    fallback: "FL"
  }
}`,
        ...(_oa = (_na = w.parameters) == null ? void 0 : _na.docs) == null ? void 0 : _oa.source
      }
    }
  };
  L.parameters = {
    ...L.parameters,
    docs: {
      ...(_pa = L.parameters) == null ? void 0 : _pa.docs,
      source: {
        originalSource: `{
  args: {
    highContrast: true,
    fallback: "HC",
    color: "blue"
  }
}`,
        ...(_ra = (_qa = L.parameters) == null ? void 0 : _qa.docs) == null ? void 0 : _ra.source
      }
    }
  };
  A.parameters = {
    ...A.parameters,
    docs: {
      ...(_sa = A.parameters) == null ? void 0 : _sa.docs,
      source: {
        originalSource: `{
  render: () => <Flex align="center" gap="3" wrap="wrap">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(size => <Flex key={size} direction="column" align="center" gap="1">
          <Avatar size={size as any} fallback={size} />
          <Text size="1" color="gray">
            Size {size}
          </Text>
        </Flex>)}
    </Flex>
}`,
        ...(_ua = (_ta = A.parameters) == null ? void 0 : _ta.docs) == null ? void 0 : _ua.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_va = C.parameters) == null ? void 0 : _va.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="4" align="center">
      <Flex direction="column" align="center" gap="2">
        <Avatar variant="solid" color="blue" fallback="S" />
        <Text size="2">Solid</Text>
      </Flex>
      <Flex direction="column" align="center" gap="2">
        <Avatar variant="soft" color="blue" fallback="S" />
        <Text size="2">Soft</Text>
      </Flex>
    </Flex>
}`,
        ...(_xa = (_wa = C.parameters) == null ? void 0 : _wa.docs) == null ? void 0 : _xa.source
      }
    }
  };
  R.parameters = {
    ...R.parameters,
    docs: {
      ...(_ya = R.parameters) == null ? void 0 : _ya.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="2" wrap="wrap" style={{
    maxWidth: "400px"
  }}>
      {["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"].map(color => <Flex key={color} direction="column" align="center" gap="1">
          <Avatar color={color as any} fallback={color.slice(0, 2).toUpperCase()} size="2" />
          <Text size="1" color="gray">
            {color}
          </Text>
        </Flex>)}
    </Flex>
}`,
        ...(_Aa = (_za = R.parameters) == null ? void 0 : _za.docs) == null ? void 0 : _Aa.source
      }
    }
  };
  D.parameters = {
    ...D.parameters,
    docs: {
      ...(_Ba = D.parameters) == null ? void 0 : _Ba.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="4" align="center">
      <Flex direction="column" align="center" gap="2">
        <Avatar fallback="J" size="4" />
        <Text size="2">Single Letter</Text>
      </Flex>
      <Flex direction="column" align="center" gap="2">
        <Avatar fallback="JD" size="4" />
        <Text size="2">Initials</Text>
      </Flex>
      <Flex direction="column" align="center" gap="2">
        <Avatar fallback="\u{1F464}" size="4" />
        <Text size="2">Icon/Emoji</Text>
      </Flex>
    </Flex>
}`,
        ...(_Da = (_Ca = D.parameters) == null ? void 0 : _Ca.docs) == null ? void 0 : _Da.source
      }
    }
  };
  J.parameters = {
    ...J.parameters,
    docs: {
      ...(_Ea = J.parameters) == null ? void 0 : _Ea.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="3" weight="medium">
          Loading Image (valid URL):
        </Text>
        <Flex gap="2" align="center" style={{
        marginTop: "8px"
      }}>
          <Avatar src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" alt="Loading image" fallback="L" size="4" />
          <Text size="2" color="gray">
            Image loads successfully
          </Text>
        </Flex>
      </div>

      <div>
        <Text size="3" weight="medium">
          Failed Image (broken URL):
        </Text>
        <Flex gap="2" align="center" style={{
        marginTop: "8px"
      }}>
          <Avatar src="https://broken-image-url.jpg" alt="Broken image" fallback="F" size="4" color="red" />
          <Text size="2" color="gray">
            Falls back to initials
          </Text>
        </Flex>
      </div>
    </Flex>
}`,
        ...(_Ga = (_Fa = J.parameters) == null ? void 0 : _Fa.docs) == null ? void 0 : _Ga.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_Ha = B.parameters) == null ? void 0 : _Ha.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="6" style={{
    maxWidth: "400px"
  }}>
      <div>
        <Text size="4" weight="bold">
          User Profile Header
        </Text>
        <Flex gap="3" align="center" style={{
        marginTop: "12px",
        padding: "16px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px"
      }}>
          <Avatar src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" fallback="JD" size="5" color="blue" />
          <Flex direction="column" gap="1">
            <Text size="4" weight="medium">
              John Doe
            </Text>
            <Text size="2" color="gray">
              Senior Developer
            </Text>
          </Flex>
        </Flex>
      </div>

      <div>
        <Text size="4" weight="bold">
          Comment Thread
        </Text>
        <Flex direction="column" gap="3" style={{
        marginTop: "12px"
      }}>
          {[{
          name: "Alice Johnson",
          initials: "AJ",
          comment: "Great work on this feature!",
          color: "green"
        }, {
          name: "Bob Smith",
          initials: "BS",
          comment: "I have some feedback on the implementation.",
          color: "purple"
        }, {
          name: "Carol Davis",
          initials: "CD",
          comment: "Thanks for the detailed explanation.",
          color: "orange"
        }].map((user, index) => <Flex key={index} gap="3" align="start" style={{
          padding: "12px",
          backgroundColor: "var(--gray-2)",
          borderRadius: "8px"
        }}>
              <Avatar fallback={user.initials} size="3" color={user.color as any} />
              <Flex direction="column" gap="1" style={{
            flex: 1
          }}>
                <Text size="2" weight="medium">
                  {user.name}
                </Text>
                <Text size="2">{user.comment}</Text>
              </Flex>
            </Flex>)}
        </Flex>
      </div>

      <div>
        <Text size="4" weight="bold">
          Team Members
        </Text>
        <Flex gap="2" wrap="wrap" style={{
        marginTop: "12px"
      }}>
          {[{
          initials: "JD",
          color: "blue"
        }, {
          initials: "SM",
          color: "green"
        }, {
          initials: "AL",
          color: "purple"
        }, {
          initials: "MK",
          color: "orange"
        }, {
          initials: "TW",
          color: "red"
        }, {
          initials: "+3",
          color: "gray"
        }].map((member, index) => <Avatar key={index} fallback={member.initials} size="3" color={member.color as any} variant={member.initials === "+3" ? "solid" : "soft"} />)}
        </Flex>
      </div>
    </Flex>
}`,
        ...(_Ja = (_Ia = B.parameters) == null ? void 0 : _Ia.docs) == null ? void 0 : _Ja.source
      }
    }
  };
  E = [
    "Default",
    "WithImage",
    "FallbackOnly",
    "Size1",
    "Size2",
    "Size3",
    "Size4",
    "Size5",
    "Size6",
    "Size7",
    "Size8",
    "Size9",
    "VariantSolid",
    "VariantSoft",
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
    "ColorPalette",
    "FallbackTypes",
    "LoadingStates",
    "RealWorldExamples"
  ];
});
export {
  A as AllSizes,
  C as AllVariants,
  k as ColorBlue,
  S as ColorGreen,
  R as ColorPalette,
  y as ColorPurple,
  z as ColorRed,
  o as Default,
  i as FallbackOnly,
  D as FallbackTypes,
  L as HighContrast,
  J as LoadingStates,
  w as RadiusFull,
  F as RadiusLarge,
  T as RadiusMedium,
  j as RadiusNone,
  v as RadiusSmall,
  B as RealWorldExamples,
  c as Size1,
  t as Size2,
  p as Size3,
  d as Size4,
  m as Size5,
  g as Size6,
  u as Size7,
  x as Size8,
  f as Size9,
  h as VariantSoft,
  b as VariantSolid,
  l as WithImage,
  E as __namedExportsOrder,
  __tla,
  q as default
};
