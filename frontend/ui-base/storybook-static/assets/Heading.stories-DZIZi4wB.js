import { j as e, T as Y, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { H as r, __tla as __tla_1 } from "./heading-CyksW9_5.js";
import "./preload-helper-D9Z9MdNV.js";
let T, f, j, D, P, v, W, L, A, C, n, i, s, o, t, d, c, R, G, B, l, g, h, p, m, u, z, w, H, M, k, b, S, y, x, F, q;
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
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa, _Qa, _Ra, _Sa, _Ta, _Ua, _Va, _Wa, _Xa, _Ya;
  q = {
    title: "Base/Heading",
    component: r,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (a) => e.jsx(Y, {
        children: e.jsx(a, {})
      })
    ],
    argTypes: {
      as: {
        control: "select",
        options: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6"
        ],
        description: "HTML heading element to render"
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
        description: "Heading size"
      },
      weight: {
        control: "select",
        options: [
          "light",
          "regular",
          "medium",
          "bold"
        ],
        description: "Font weight"
      },
      align: {
        control: "select",
        options: [
          "left",
          "center",
          "right"
        ],
        description: "Text alignment"
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
        description: "Heading color"
      },
      highContrast: {
        control: "boolean",
        description: "High contrast mode"
      },
      truncate: {
        control: "boolean",
        description: "Truncate text with ellipsis"
      },
      wrap: {
        control: "select",
        options: [
          "wrap",
          "nowrap",
          "pretty",
          "balance"
        ],
        description: "Text wrapping behavior"
      },
      trim: {
        control: "select",
        options: [
          "normal",
          "start",
          "end",
          "both"
        ],
        description: "Leading trim for better text alignment"
      },
      children: {
        control: "text",
        description: "Heading content"
      }
    },
    args: {
      children: "The quick brown fox jumps over the lazy dog",
      as: "h1",
      size: "6"
    }
  };
  n = {
    args: {
      children: "This is a default heading"
    }
  };
  i = {
    args: {
      as: "h1",
      children: "This is an H1 heading"
    }
  };
  s = {
    args: {
      as: "h2",
      children: "This is an H2 heading"
    }
  };
  o = {
    args: {
      as: "h3",
      children: "This is an H3 heading"
    }
  };
  t = {
    args: {
      as: "h4",
      children: "This is an H4 heading"
    }
  };
  d = {
    args: {
      as: "h5",
      children: "This is an H5 heading"
    }
  };
  c = {
    args: {
      as: "h6",
      children: "This is an H6 heading"
    }
  };
  l = {
    args: {
      size: "1",
      children: "Size 1 heading"
    }
  };
  g = {
    args: {
      size: "2",
      children: "Size 2 heading"
    }
  };
  h = {
    args: {
      size: "3",
      children: "Size 3 heading"
    }
  };
  p = {
    args: {
      size: "4",
      children: "Size 4 heading"
    }
  };
  m = {
    args: {
      size: "5",
      children: "Size 5 heading"
    }
  };
  u = {
    args: {
      size: "6",
      children: "Size 6 heading"
    }
  };
  z = {
    args: {
      size: "7",
      children: "Size 7 heading"
    }
  };
  w = {
    args: {
      size: "8",
      children: "Size 8 heading"
    }
  };
  H = {
    args: {
      size: "9",
      children: "Size 9 heading"
    }
  };
  S = {
    args: {
      weight: "light",
      children: "Light weight heading"
    }
  };
  x = {
    args: {
      weight: "regular",
      children: "Regular weight heading"
    }
  };
  y = {
    args: {
      weight: "medium",
      children: "Medium weight heading"
    }
  };
  b = {
    args: {
      weight: "bold",
      children: "Bold weight heading"
    }
  };
  f = {
    args: {
      align: "left",
      children: "Left aligned heading"
    }
  };
  T = {
    args: {
      align: "center",
      children: "Center aligned heading"
    }
  };
  j = {
    args: {
      align: "right",
      children: "Right aligned heading"
    }
  };
  v = {
    args: {
      color: "blue",
      children: "Blue heading"
    }
  };
  C = {
    args: {
      color: "red",
      children: "Red heading"
    }
  };
  W = {
    args: {
      color: "green",
      children: "Green heading"
    }
  };
  A = {
    args: {
      color: "purple",
      children: "Purple heading"
    }
  };
  R = {
    args: {
      highContrast: true,
      children: "High contrast heading",
      color: "blue"
    }
  };
  k = {
    args: {
      truncate: true,
      children: "This is a very long heading that should be truncated with an ellipsis when it exceeds the container width",
      style: {
        width: "300px"
      }
    }
  };
  D = {
    render: () => e.jsx("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      },
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
      ].map((a) => e.jsxs(r, {
        size: a,
        children: [
          "Size ",
          a,
          " - The quick brown fox"
        ]
      }, a))
    })
  };
  P = {
    render: () => e.jsx("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      },
      children: [
        "light",
        "regular",
        "medium",
        "bold"
      ].map((a) => e.jsxs(r, {
        weight: a,
        size: "6",
        children: [
          a.charAt(0).toUpperCase() + a.slice(1),
          " weight heading"
        ]
      }, a))
    })
  };
  B = {
    render: () => e.jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      },
      children: [
        e.jsx(r, {
          as: "h1",
          size: "8",
          children: "Main Page Title (H1)"
        }),
        e.jsx(r, {
          as: "h2",
          size: "7",
          children: "Section Title (H2)"
        }),
        e.jsx(r, {
          as: "h3",
          size: "6",
          children: "Subsection Title (H3)"
        }),
        e.jsx(r, {
          as: "h4",
          size: "5",
          children: "Sub-subsection Title (H4)"
        }),
        e.jsx(r, {
          as: "h5",
          size: "4",
          children: "Minor Heading (H5)"
        }),
        e.jsx(r, {
          as: "h6",
          size: "3",
          children: "Smallest Heading (H6)"
        })
      ]
    })
  };
  L = {
    render: () => e.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px"
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
      ].map((a) => e.jsxs(r, {
        color: a,
        size: "4",
        children: [
          a,
          " heading"
        ]
      }, a))
    })
  };
  M = {
    render: () => e.jsxs("div", {
      style: {
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      },
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(r, {
              size: "3",
              weight: "medium",
              color: "gray",
              children: "Normal wrap:"
            }),
            e.jsx(r, {
              wrap: "wrap",
              size: "5",
              children: "This is a long heading that will wrap normally when it reaches the end"
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(r, {
              size: "3",
              weight: "medium",
              color: "gray",
              children: "No wrap:"
            }),
            e.jsx(r, {
              wrap: "nowrap",
              size: "5",
              children: "This is a long heading that will not wrap and may overflow"
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(r, {
              size: "3",
              weight: "medium",
              color: "gray",
              children: "Balance wrap:"
            }),
            e.jsx(r, {
              wrap: "balance",
              size: "5",
              children: "This is a long heading that will wrap with balanced line lengths"
            })
          ]
        })
      ]
    })
  };
  G = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      },
      children: [
        e.jsx(r, {
          as: "h1",
          size: "8",
          weight: "bold",
          color: "blue",
          children: "Welcome to Our Platform"
        }),
        e.jsx(r, {
          as: "h2",
          size: "6",
          weight: "medium",
          color: "gray",
          children: "Getting Started Guide"
        }),
        e.jsx(r, {
          as: "h3",
          size: "5",
          weight: "medium",
          children: "Step 1: Create Your Account"
        }),
        e.jsx(r, {
          as: "h4",
          size: "4",
          weight: "regular",
          children: "Fill in your personal information"
        }),
        e.jsx(r, {
          as: "h3",
          size: "5",
          weight: "medium",
          children: "Step 2: Set Up Your Profile"
        }),
        e.jsx(r, {
          as: "h4",
          size: "4",
          weight: "regular",
          children: "Add a profile picture and bio"
        }),
        e.jsx(r, {
          as: "h2",
          size: "6",
          weight: "medium",
          color: "green",
          align: "center",
          children: "You're all set! \u{1F389}"
        })
      ]
    })
  };
  n.parameters = {
    ...n.parameters,
    docs: {
      ...(_a = n.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  args: {
    children: "This is a default heading"
  }
}`,
        ...(_c = (_b = n.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  i.parameters = {
    ...i.parameters,
    docs: {
      ...(_d = i.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  args: {
    as: "h1",
    children: "This is an H1 heading"
  }
}`,
        ...(_f = (_e = i.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  s.parameters = {
    ...s.parameters,
    docs: {
      ...(_g = s.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  args: {
    as: "h2",
    children: "This is an H2 heading"
  }
}`,
        ...(_i = (_h = s.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  o.parameters = {
    ...o.parameters,
    docs: {
      ...(_j = o.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  args: {
    as: "h3",
    children: "This is an H3 heading"
  }
}`,
        ...(_l = (_k = o.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
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
    as: "h4",
    children: "This is an H4 heading"
  }
}`,
        ...(_o = (_n = t.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  d.parameters = {
    ...d.parameters,
    docs: {
      ...(_p = d.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  args: {
    as: "h5",
    children: "This is an H5 heading"
  }
}`,
        ...(_r = (_q = d.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  c.parameters = {
    ...c.parameters,
    docs: {
      ...(_s = c.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  args: {
    as: "h6",
    children: "This is an H6 heading"
  }
}`,
        ...(_u = (_t = c.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_v = l.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  args: {
    size: "1",
    children: "Size 1 heading"
  }
}`,
        ...(_x = (_w = l.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
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
    size: "2",
    children: "Size 2 heading"
  }
}`,
        ...(_A = (_z = g.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_B = h.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  args: {
    size: "3",
    children: "Size 3 heading"
  }
}`,
        ...(_D = (_C = h.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_E = p.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  args: {
    size: "4",
    children: "Size 4 heading"
  }
}`,
        ...(_G = (_F = p.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_H = m.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  args: {
    size: "5",
    children: "Size 5 heading"
  }
}`,
        ...(_J = (_I = m.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_K = u.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  args: {
    size: "6",
    children: "Size 6 heading"
  }
}`,
        ...(_M = (_L = u.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_N = z.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  args: {
    size: "7",
    children: "Size 7 heading"
  }
}`,
        ...(_P = (_O = z.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_Q = w.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  args: {
    size: "8",
    children: "Size 8 heading"
  }
}`,
        ...(_S = (_R = w.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  H.parameters = {
    ...H.parameters,
    docs: {
      ...(_T = H.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  args: {
    size: "9",
    children: "Size 9 heading"
  }
}`,
        ...(_V = (_U = H.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
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
    weight: "light",
    children: "Light weight heading"
  }
}`,
        ...(_Y = (_X = S.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_Z = x.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  args: {
    weight: "regular",
    children: "Regular weight heading"
  }
}`,
        ...(_$ = (__ = x.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_aa = y.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  args: {
    weight: "medium",
    children: "Medium weight heading"
  }
}`,
        ...(_ca = (_ba = y.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_da = b.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  args: {
    weight: "bold",
    children: "Bold weight heading"
  }
}`,
        ...(_fa = (_ea = b.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_ga = f.parameters) == null ? void 0 : _ga.docs,
      source: {
        originalSource: `{
  args: {
    align: "left",
    children: "Left aligned heading"
  }
}`,
        ...(_ia = (_ha = f.parameters) == null ? void 0 : _ha.docs) == null ? void 0 : _ia.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_ja = T.parameters) == null ? void 0 : _ja.docs,
      source: {
        originalSource: `{
  args: {
    align: "center",
    children: "Center aligned heading"
  }
}`,
        ...(_la = (_ka = T.parameters) == null ? void 0 : _ka.docs) == null ? void 0 : _la.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_ma = j.parameters) == null ? void 0 : _ma.docs,
      source: {
        originalSource: `{
  args: {
    align: "right",
    children: "Right aligned heading"
  }
}`,
        ...(_oa = (_na = j.parameters) == null ? void 0 : _na.docs) == null ? void 0 : _oa.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_pa = v.parameters) == null ? void 0 : _pa.docs,
      source: {
        originalSource: `{
  args: {
    color: "blue",
    children: "Blue heading"
  }
}`,
        ...(_ra = (_qa = v.parameters) == null ? void 0 : _qa.docs) == null ? void 0 : _ra.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_sa = C.parameters) == null ? void 0 : _sa.docs,
      source: {
        originalSource: `{
  args: {
    color: "red",
    children: "Red heading"
  }
}`,
        ...(_ua = (_ta = C.parameters) == null ? void 0 : _ta.docs) == null ? void 0 : _ua.source
      }
    }
  };
  W.parameters = {
    ...W.parameters,
    docs: {
      ...(_va = W.parameters) == null ? void 0 : _va.docs,
      source: {
        originalSource: `{
  args: {
    color: "green",
    children: "Green heading"
  }
}`,
        ...(_xa = (_wa = W.parameters) == null ? void 0 : _wa.docs) == null ? void 0 : _xa.source
      }
    }
  };
  A.parameters = {
    ...A.parameters,
    docs: {
      ...(_ya = A.parameters) == null ? void 0 : _ya.docs,
      source: {
        originalSource: `{
  args: {
    color: "purple",
    children: "Purple heading"
  }
}`,
        ...(_Aa = (_za = A.parameters) == null ? void 0 : _za.docs) == null ? void 0 : _Aa.source
      }
    }
  };
  R.parameters = {
    ...R.parameters,
    docs: {
      ...(_Ba = R.parameters) == null ? void 0 : _Ba.docs,
      source: {
        originalSource: `{
  args: {
    highContrast: true,
    children: "High contrast heading",
    color: "blue"
  }
}`,
        ...(_Da = (_Ca = R.parameters) == null ? void 0 : _Ca.docs) == null ? void 0 : _Da.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_Ea = k.parameters) == null ? void 0 : _Ea.docs,
      source: {
        originalSource: `{
  args: {
    truncate: true,
    children: "This is a very long heading that should be truncated with an ellipsis when it exceeds the container width",
    style: {
      width: "300px"
    }
  }
}`,
        ...(_Ga = (_Fa = k.parameters) == null ? void 0 : _Fa.docs) == null ? void 0 : _Ga.source
      }
    }
  };
  D.parameters = {
    ...D.parameters,
    docs: {
      ...(_Ha = D.parameters) == null ? void 0 : _Ha.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(size => <Heading key={size} size={size as any}>
          Size {size} - The quick brown fox
        </Heading>)}
    </div>
}`,
        ...(_Ja = (_Ia = D.parameters) == null ? void 0 : _Ia.docs) == null ? void 0 : _Ja.source
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
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      {["light", "regular", "medium", "bold"].map(weight => <Heading key={weight} weight={weight as any} size="6">
          {weight.charAt(0).toUpperCase() + weight.slice(1)} weight heading
        </Heading>)}
    </div>
}`,
        ...(_Ma = (_La = P.parameters) == null ? void 0 : _La.docs) == null ? void 0 : _Ma.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_Na = B.parameters) == null ? void 0 : _Na.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }}>
      <Heading as="h1" size="8">
        Main Page Title (H1)
      </Heading>
      <Heading as="h2" size="7">
        Section Title (H2)
      </Heading>
      <Heading as="h3" size="6">
        Subsection Title (H3)
      </Heading>
      <Heading as="h4" size="5">
        Sub-subsection Title (H4)
      </Heading>
      <Heading as="h5" size="4">
        Minor Heading (H5)
      </Heading>
      <Heading as="h6" size="3">
        Smallest Heading (H6)
      </Heading>
    </div>
}`,
        ...(_Pa = (_Oa = B.parameters) == null ? void 0 : _Oa.docs) == null ? void 0 : _Pa.source
      }
    }
  };
  L.parameters = {
    ...L.parameters,
    docs: {
      ...(_Qa = L.parameters) == null ? void 0 : _Qa.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "12px"
  }}>
      {["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"].map(color => <Heading key={color} color={color as any} size="4">
          {color} heading
        </Heading>)}
    </div>
}`,
        ...(_Sa = (_Ra = L.parameters) == null ? void 0 : _Ra.docs) == null ? void 0 : _Sa.source
      }
    }
  };
  M.parameters = {
    ...M.parameters,
    docs: {
      ...(_Ta = M.parameters) == null ? void 0 : _Ta.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      <div>
        <Heading size="3" weight="medium" color="gray">
          Normal wrap:
        </Heading>
        <Heading wrap="wrap" size="5">
          This is a long heading that will wrap normally when it reaches the end
        </Heading>
      </div>
      <div>
        <Heading size="3" weight="medium" color="gray">
          No wrap:
        </Heading>
        <Heading wrap="nowrap" size="5">
          This is a long heading that will not wrap and may overflow
        </Heading>
      </div>
      <div>
        <Heading size="3" weight="medium" color="gray">
          Balance wrap:
        </Heading>
        <Heading wrap="balance" size="5">
          This is a long heading that will wrap with balanced line lengths
        </Heading>
      </div>
    </div>
}`,
        ...(_Va = (_Ua = M.parameters) == null ? void 0 : _Ua.docs) == null ? void 0 : _Va.source
      }
    }
  };
  G.parameters = {
    ...G.parameters,
    docs: {
      ...(_Wa = G.parameters) == null ? void 0 : _Wa.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      <Heading as="h1" size="8" weight="bold" color="blue">
        Welcome to Our Platform
      </Heading>
      <Heading as="h2" size="6" weight="medium" color="gray">
        Getting Started Guide
      </Heading>
      <Heading as="h3" size="5" weight="medium">
        Step 1: Create Your Account
      </Heading>
      <Heading as="h4" size="4" weight="regular">
        Fill in your personal information
      </Heading>
      <Heading as="h3" size="5" weight="medium">
        Step 2: Set Up Your Profile
      </Heading>
      <Heading as="h4" size="4" weight="regular">
        Add a profile picture and bio
      </Heading>
      <Heading as="h2" size="6" weight="medium" color="green" align="center">
        You're all set! \u{1F389}
      </Heading>
    </div>
}`,
        ...(_Ya = (_Xa = G.parameters) == null ? void 0 : _Xa.docs) == null ? void 0 : _Ya.source
      }
    }
  };
  F = [
    "Default",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "Size1",
    "Size2",
    "Size3",
    "Size4",
    "Size5",
    "Size6",
    "Size7",
    "Size8",
    "Size9",
    "WeightLight",
    "WeightRegular",
    "WeightMedium",
    "WeightBold",
    "AlignLeft",
    "AlignCenter",
    "AlignRight",
    "ColorBlue",
    "ColorRed",
    "ColorGreen",
    "ColorPurple",
    "HighContrast",
    "Truncated",
    "AllSizes",
    "AllWeights",
    "SemanticHierarchy",
    "ColorPalette",
    "TextWrapping",
    "RealWorldExample"
  ];
});
export {
  T as AlignCenter,
  f as AlignLeft,
  j as AlignRight,
  D as AllSizes,
  P as AllWeights,
  v as ColorBlue,
  W as ColorGreen,
  L as ColorPalette,
  A as ColorPurple,
  C as ColorRed,
  n as Default,
  i as H1,
  s as H2,
  o as H3,
  t as H4,
  d as H5,
  c as H6,
  R as HighContrast,
  G as RealWorldExample,
  B as SemanticHierarchy,
  l as Size1,
  g as Size2,
  h as Size3,
  p as Size4,
  m as Size5,
  u as Size6,
  z as Size7,
  w as Size8,
  H as Size9,
  M as TextWrapping,
  k as Truncated,
  b as WeightBold,
  S as WeightLight,
  y as WeightMedium,
  x as WeightRegular,
  F as __namedExportsOrder,
  __tla,
  q as default
};
