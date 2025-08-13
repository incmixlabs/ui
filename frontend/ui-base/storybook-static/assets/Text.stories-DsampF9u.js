import { j as e, a as r, T as M, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import "./preload-helper-D9Z9MdNV.js";
let b, y, v, R, D, n, i, o, s, f, A, L, C, j, t, k, B, c, l, d, p, h, g, m, u, x, P, W, S, w, T, z, G, E;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa, _Ba, _Ca, _Da, _Ea, _Fa, _Ga, _Ha, _Ia, _Ja, _Ka, _La, _Ma, _Na, _Oa, _Pa;
  E = {
    title: "Base/Text",
    component: r,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (a) => e.jsx(M, {
        children: e.jsx(a, {})
      })
    ],
    argTypes: {
      as: {
        control: "select",
        options: [
          "span",
          "div",
          "label",
          "p"
        ],
        description: "HTML element to render"
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
        description: "Text size"
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
        description: "Text color"
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
        description: "Text content"
      }
    },
    args: {
      children: "The quick brown fox jumps over the lazy dog",
      as: "span"
    }
  };
  t = {
    args: {
      children: "This is default text"
    }
  };
  s = {
    args: {
      as: "span",
      children: "This is a span element"
    }
  };
  n = {
    args: {
      as: "div",
      children: "This is a div element"
    }
  };
  i = {
    args: {
      as: "label",
      children: "This is a label element"
    }
  };
  o = {
    args: {
      as: "p",
      children: "This is a paragraph element with more text to demonstrate how it looks when rendered as a paragraph."
    }
  };
  c = {
    args: {
      size: "1",
      children: "Size 1 text"
    }
  };
  l = {
    args: {
      size: "2",
      children: "Size 2 text"
    }
  };
  d = {
    args: {
      size: "3",
      children: "Size 3 text"
    }
  };
  p = {
    args: {
      size: "4",
      children: "Size 4 text"
    }
  };
  h = {
    args: {
      size: "5",
      children: "Size 5 text"
    }
  };
  g = {
    args: {
      size: "6",
      children: "Size 6 text"
    }
  };
  m = {
    args: {
      size: "7",
      children: "Size 7 text"
    }
  };
  u = {
    args: {
      size: "8",
      children: "Size 8 text"
    }
  };
  x = {
    args: {
      size: "9",
      children: "Size 9 text"
    }
  };
  w = {
    args: {
      weight: "light",
      children: "Light weight text"
    }
  };
  z = {
    args: {
      weight: "regular",
      children: "Regular weight text"
    }
  };
  T = {
    args: {
      weight: "medium",
      children: "Medium weight text"
    }
  };
  S = {
    args: {
      weight: "bold",
      children: "Bold weight text"
    }
  };
  y = {
    args: {
      align: "left",
      children: "Left aligned text",
      as: "div"
    }
  };
  b = {
    args: {
      align: "center",
      children: "Center aligned text",
      as: "div"
    }
  };
  v = {
    args: {
      align: "right",
      children: "Right aligned text",
      as: "div"
    }
  };
  f = {
    args: {
      color: "blue",
      children: "Blue text"
    }
  };
  j = {
    args: {
      color: "red",
      children: "Red text"
    }
  };
  A = {
    args: {
      color: "green",
      children: "Green text"
    }
  };
  C = {
    args: {
      color: "purple",
      children: "Purple text"
    }
  };
  k = {
    args: {
      highContrast: true,
      children: "High contrast text",
      color: "blue"
    }
  };
  W = {
    args: {
      truncate: true,
      children: "This is a very long text that should be truncated with an ellipsis when it exceeds the container width",
      style: {
        width: "200px"
      }
    }
  };
  R = {
    render: () => e.jsx("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "8px"
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
          " - The quick brown fox jumps over the lazy dog"
        ]
      }, a))
    })
  };
  D = {
    render: () => e.jsx("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      },
      children: [
        "light",
        "regular",
        "medium",
        "bold"
      ].map((a) => e.jsxs(r, {
        weight: a,
        size: "4",
        children: [
          a.charAt(0).toUpperCase() + a.slice(1),
          " weight text"
        ]
      }, a))
    })
  };
  L = {
    render: () => e.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "8px"
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
        children: [
          a,
          " text"
        ]
      }, a))
    })
  };
  P = {
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
              weight: "medium",
              size: "2",
              children: "Normal wrap:"
            }),
            e.jsx(r, {
              wrap: "wrap",
              children: "This is a long sentence that will wrap normally when it reaches the end of the container."
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(r, {
              weight: "medium",
              size: "2",
              children: "No wrap:"
            }),
            e.jsx(r, {
              wrap: "nowrap",
              children: "This is a long sentence that will not wrap and may overflow the container."
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(r, {
              weight: "medium",
              size: "2",
              children: "Pretty wrap:"
            }),
            e.jsx(r, {
              wrap: "pretty",
              children: "This is a long sentence that will wrap in a prettier way, avoiding orphans and widows."
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(r, {
              weight: "medium",
              size: "2",
              children: "Balance wrap:"
            }),
            e.jsx(r, {
              wrap: "balance",
              children: "This is a long sentence that will wrap with balanced line lengths for better visual appearance."
            })
          ]
        })
      ]
    })
  };
  B = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      },
      children: [
        e.jsx(r, {
          size: "6",
          weight: "bold",
          color: "blue",
          children: "Article Title"
        }),
        e.jsx(r, {
          size: "3",
          color: "gray",
          weight: "medium",
          children: "Published on March 15, 2024"
        }),
        e.jsx(r, {
          size: "4",
          as: "p",
          children: "This is the first paragraph of an article. It demonstrates how text components can be used to create readable and well-structured content with proper typography."
        }),
        e.jsx(r, {
          size: "4",
          as: "p",
          children: "This is another paragraph that shows how multiple text elements work together to create a cohesive reading experience."
        }),
        e.jsx(r, {
          size: "2",
          color: "gray",
          align: "right",
          children: "\u2014 Author Name"
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
  args: {
    children: "This is default text"
  }
}`,
        ...(_c = (_b = t.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  s.parameters = {
    ...s.parameters,
    docs: {
      ...(_d = s.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  args: {
    as: "span",
    children: "This is a span element"
  }
}`,
        ...(_f = (_e = s.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  n.parameters = {
    ...n.parameters,
    docs: {
      ...(_g = n.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  args: {
    as: "div",
    children: "This is a div element"
  }
}`,
        ...(_i = (_h = n.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  i.parameters = {
    ...i.parameters,
    docs: {
      ...(_j = i.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  args: {
    as: "label",
    children: "This is a label element"
  }
}`,
        ...(_l = (_k = i.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  o.parameters = {
    ...o.parameters,
    docs: {
      ...(_m = o.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  args: {
    as: "p",
    children: "This is a paragraph element with more text to demonstrate how it looks when rendered as a paragraph."
  }
}`,
        ...(_o = (_n = o.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  c.parameters = {
    ...c.parameters,
    docs: {
      ...(_p = c.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  args: {
    size: "1",
    children: "Size 1 text"
  }
}`,
        ...(_r = (_q = c.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_s = l.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  args: {
    size: "2",
    children: "Size 2 text"
  }
}`,
        ...(_u = (_t = l.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  d.parameters = {
    ...d.parameters,
    docs: {
      ...(_v = d.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  args: {
    size: "3",
    children: "Size 3 text"
  }
}`,
        ...(_x = (_w = d.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_y = p.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  args: {
    size: "4",
    children: "Size 4 text"
  }
}`,
        ...(_A = (_z = p.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
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
    size: "5",
    children: "Size 5 text"
  }
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
  args: {
    size: "6",
    children: "Size 6 text"
  }
}`,
        ...(_G = (_F = g.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
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
    size: "7",
    children: "Size 7 text"
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
    size: "8",
    children: "Size 8 text"
  }
}`,
        ...(_M = (_L = u.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_N = x.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  args: {
    size: "9",
    children: "Size 9 text"
  }
}`,
        ...(_P = (_O = x.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
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
    weight: "light",
    children: "Light weight text"
  }
}`,
        ...(_S = (_R = w.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
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
    weight: "regular",
    children: "Regular weight text"
  }
}`,
        ...(_V = (_U = z.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_W = T.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  args: {
    weight: "medium",
    children: "Medium weight text"
  }
}`,
        ...(_Y = (_X = T.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_Z = S.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  args: {
    weight: "bold",
    children: "Bold weight text"
  }
}`,
        ...(_$ = (__ = S.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
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
    align: "left",
    children: "Left aligned text",
    as: "div"
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
    align: "center",
    children: "Center aligned text",
    as: "div"
  }
}`,
        ...(_fa = (_ea = b.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_ga = v.parameters) == null ? void 0 : _ga.docs,
      source: {
        originalSource: `{
  args: {
    align: "right",
    children: "Right aligned text",
    as: "div"
  }
}`,
        ...(_ia = (_ha = v.parameters) == null ? void 0 : _ha.docs) == null ? void 0 : _ia.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_ja = f.parameters) == null ? void 0 : _ja.docs,
      source: {
        originalSource: `{
  args: {
    color: "blue",
    children: "Blue text"
  }
}`,
        ...(_la = (_ka = f.parameters) == null ? void 0 : _ka.docs) == null ? void 0 : _la.source
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
    color: "red",
    children: "Red text"
  }
}`,
        ...(_oa = (_na = j.parameters) == null ? void 0 : _na.docs) == null ? void 0 : _oa.source
      }
    }
  };
  A.parameters = {
    ...A.parameters,
    docs: {
      ...(_pa = A.parameters) == null ? void 0 : _pa.docs,
      source: {
        originalSource: `{
  args: {
    color: "green",
    children: "Green text"
  }
}`,
        ...(_ra = (_qa = A.parameters) == null ? void 0 : _qa.docs) == null ? void 0 : _ra.source
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
    color: "purple",
    children: "Purple text"
  }
}`,
        ...(_ua = (_ta = C.parameters) == null ? void 0 : _ta.docs) == null ? void 0 : _ua.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_va = k.parameters) == null ? void 0 : _va.docs,
      source: {
        originalSource: `{
  args: {
    highContrast: true,
    children: "High contrast text",
    color: "blue"
  }
}`,
        ...(_xa = (_wa = k.parameters) == null ? void 0 : _wa.docs) == null ? void 0 : _xa.source
      }
    }
  };
  W.parameters = {
    ...W.parameters,
    docs: {
      ...(_ya = W.parameters) == null ? void 0 : _ya.docs,
      source: {
        originalSource: `{
  args: {
    truncate: true,
    children: "This is a very long text that should be truncated with an ellipsis when it exceeds the container width",
    style: {
      width: "200px"
    }
  }
}`,
        ...(_Aa = (_za = W.parameters) == null ? void 0 : _za.docs) == null ? void 0 : _Aa.source
      }
    }
  };
  R.parameters = {
    ...R.parameters,
    docs: {
      ...(_Ba = R.parameters) == null ? void 0 : _Ba.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  }}>
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(size => <Text key={size} size={size as any}>
          Size {size} - The quick brown fox jumps over the lazy dog
        </Text>)}
    </div>
}`,
        ...(_Da = (_Ca = R.parameters) == null ? void 0 : _Ca.docs) == null ? void 0 : _Da.source
      }
    }
  };
  D.parameters = {
    ...D.parameters,
    docs: {
      ...(_Ea = D.parameters) == null ? void 0 : _Ea.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  }}>
      {["light", "regular", "medium", "bold"].map(weight => <Text key={weight} weight={weight as any} size="4">
          {weight.charAt(0).toUpperCase() + weight.slice(1)} weight text
        </Text>)}
    </div>
}`,
        ...(_Ga = (_Fa = D.parameters) == null ? void 0 : _Fa.docs) == null ? void 0 : _Ga.source
      }
    }
  };
  L.parameters = {
    ...L.parameters,
    docs: {
      ...(_Ha = L.parameters) == null ? void 0 : _Ha.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px"
  }}>
      {["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"].map(color => <Text key={color} color={color as any}>
          {color} text
        </Text>)}
    </div>
}`,
        ...(_Ja = (_Ia = L.parameters) == null ? void 0 : _Ia.docs) == null ? void 0 : _Ja.source
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
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      <div>
        <Text weight="medium" size="2">
          Normal wrap:
        </Text>
        <Text wrap="wrap">
          This is a long sentence that will wrap normally when it reaches the
          end of the container.
        </Text>
      </div>
      <div>
        <Text weight="medium" size="2">
          No wrap:
        </Text>
        <Text wrap="nowrap">
          This is a long sentence that will not wrap and may overflow the
          container.
        </Text>
      </div>
      <div>
        <Text weight="medium" size="2">
          Pretty wrap:
        </Text>
        <Text wrap="pretty">
          This is a long sentence that will wrap in a prettier way, avoiding
          orphans and widows.
        </Text>
      </div>
      <div>
        <Text weight="medium" size="2">
          Balance wrap:
        </Text>
        <Text wrap="balance">
          This is a long sentence that will wrap with balanced line lengths for
          better visual appearance.
        </Text>
      </div>
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
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }}>
      <Text size="6" weight="bold" color="blue">
        Article Title
      </Text>
      <Text size="3" color="gray" weight="medium">
        Published on March 15, 2024
      </Text>
      <Text size="4" as="p">
        This is the first paragraph of an article. It demonstrates how text
        components can be used to create readable and well-structured content
        with proper typography.
      </Text>
      <Text size="4" as="p">
        This is another paragraph that shows how multiple text elements work
        together to create a cohesive reading experience.
      </Text>
      <Text size="2" color="gray" align="right">
        \u2014 Author Name
      </Text>
    </div>
}`,
        ...(_Pa = (_Oa = B.parameters) == null ? void 0 : _Oa.docs) == null ? void 0 : _Pa.source
      }
    }
  };
  G = [
    "Default",
    "AsSpan",
    "AsDiv",
    "AsLabel",
    "AsParagraph",
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
    "ColorPalette",
    "TextWrapping",
    "RealWorldExample"
  ];
});
export {
  b as AlignCenter,
  y as AlignLeft,
  v as AlignRight,
  R as AllSizes,
  D as AllWeights,
  n as AsDiv,
  i as AsLabel,
  o as AsParagraph,
  s as AsSpan,
  f as ColorBlue,
  A as ColorGreen,
  L as ColorPalette,
  C as ColorPurple,
  j as ColorRed,
  t as Default,
  k as HighContrast,
  B as RealWorldExample,
  c as Size1,
  l as Size2,
  d as Size3,
  p as Size4,
  h as Size5,
  g as Size6,
  m as Size7,
  u as Size8,
  x as Size9,
  P as TextWrapping,
  W as Truncated,
  S as WeightBold,
  w as WeightLight,
  T as WeightMedium,
  z as WeightRegular,
  G as __namedExportsOrder,
  __tla,
  E as default
};
