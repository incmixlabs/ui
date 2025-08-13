import { j as e, T as C, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { B as r, __tla as __tla_1 } from "./badge-GocNDIsR.js";
import "./preload-helper-D9Z9MdNV.js";
let z, B, p, g, j, m, u, s, h, l, f, y, S, x, v, b, d, t, c, o, n, R, i, P, A;
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa;
  A = {
    title: "Base/Badge",
    component: r,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (a) => e.jsx(C, {
        children: e.jsx(a, {})
      })
    ],
    argTypes: {
      variant: {
        control: "select",
        options: [
          "solid",
          "soft",
          "surface",
          "outline"
        ],
        description: "Badge variant style"
      },
      size: {
        control: "select",
        options: [
          "1",
          "2",
          "3"
        ],
        description: "Badge size"
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
        description: "Badge accent color"
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
        description: "Badge border radius"
      },
      highContrast: {
        control: "boolean",
        description: "High contrast mode"
      },
      children: {
        control: "text",
        description: "Badge content"
      }
    },
    args: {
      children: "Badge",
      variant: "soft",
      size: "1"
    }
  };
  s = {
    args: {
      children: "Default"
    }
  };
  n = {
    args: {
      variant: "solid",
      children: "Solid"
    }
  };
  o = {
    args: {
      variant: "soft",
      children: "Soft"
    }
  };
  i = {
    args: {
      variant: "surface",
      children: "Surface"
    }
  };
  l = {
    args: {
      variant: "outline",
      children: "Outline"
    }
  };
  d = {
    args: {
      size: "1",
      children: "Size 1"
    }
  };
  t = {
    args: {
      size: "2",
      children: "Size 2"
    }
  };
  c = {
    args: {
      size: "3",
      children: "Size 3"
    }
  };
  p = {
    args: {
      color: "blue",
      children: "Blue"
    }
  };
  u = {
    args: {
      color: "red",
      children: "Red"
    }
  };
  g = {
    args: {
      color: "green",
      children: "Green"
    }
  };
  m = {
    args: {
      color: "purple",
      children: "Purple"
    }
  };
  h = {
    args: {
      highContrast: true,
      children: "High Contrast"
    }
  };
  x = {
    args: {
      radius: "none",
      children: "No Radius"
    }
  };
  v = {
    args: {
      radius: "small",
      children: "Small Radius"
    }
  };
  S = {
    args: {
      radius: "medium",
      children: "Medium Radius"
    }
  };
  y = {
    args: {
      radius: "large",
      children: "Large Radius"
    }
  };
  f = {
    args: {
      radius: "full",
      children: "Full Radius"
    }
  };
  B = {
    render: () => e.jsxs("div", {
      style: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap"
      },
      children: [
        e.jsx(r, {
          variant: "solid",
          children: "Solid"
        }),
        e.jsx(r, {
          variant: "soft",
          children: "Soft"
        }),
        e.jsx(r, {
          variant: "surface",
          children: "Surface"
        }),
        e.jsx(r, {
          variant: "outline",
          children: "Outline"
        })
      ]
    })
  };
  z = {
    render: () => e.jsxs("div", {
      style: {
        display: "flex",
        gap: "8px",
        alignItems: "center"
      },
      children: [
        e.jsx(r, {
          size: "1",
          children: "Size 1"
        }),
        e.jsx(r, {
          size: "2",
          children: "Size 2"
        }),
        e.jsx(r, {
          size: "3",
          children: "Size 3"
        })
      ]
    })
  };
  j = {
    render: () => e.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
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
      ].map((a) => e.jsx(r, {
        color: a,
        children: a
      }, a))
    })
  };
  R = {
    render: () => e.jsxs("div", {
      style: {
        display: "flex",
        gap: "8px",
        alignItems: "center"
      },
      children: [
        e.jsx(r, {
          variant: "solid",
          color: "green",
          children: "Active"
        }),
        e.jsx(r, {
          variant: "solid",
          color: "yellow",
          children: "Warning"
        }),
        e.jsx(r, {
          variant: "solid",
          color: "red",
          children: "Error"
        }),
        e.jsx(r, {
          variant: "solid",
          color: "blue",
          children: "Info"
        }),
        e.jsx(r, {
          variant: "outline",
          color: "gray",
          children: "Inactive"
        })
      ]
    })
  };
  b = {
    render: () => e.jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "12px"
      },
      children: [
        e.jsxs("div", {
          style: {
            display: "flex",
            gap: "8px",
            alignItems: "center"
          },
          children: [
            e.jsx("span", {
              children: "User Role:"
            }),
            e.jsx(r, {
              variant: "solid",
              color: "blue",
              children: "Admin"
            })
          ]
        }),
        e.jsxs("div", {
          style: {
            display: "flex",
            gap: "8px",
            alignItems: "center"
          },
          children: [
            e.jsx("span", {
              children: "Status:"
            }),
            e.jsx(r, {
              variant: "soft",
              color: "green",
              children: "Online"
            })
          ]
        }),
        e.jsxs("div", {
          style: {
            display: "flex",
            gap: "8px",
            alignItems: "center"
          },
          children: [
            e.jsx("span", {
              children: "Priority:"
            }),
            e.jsx(r, {
              variant: "outline",
              color: "red",
              children: "High"
            })
          ]
        }),
        e.jsxs("div", {
          style: {
            display: "flex",
            gap: "8px",
            alignItems: "center"
          },
          children: [
            e.jsx("span", {
              children: "Category:"
            }),
            e.jsx(r, {
              variant: "surface",
              color: "purple",
              children: "Feature"
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
  args: {
    children: "Default"
  }
}`,
        ...(_c = (_b = s.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  n.parameters = {
    ...n.parameters,
    docs: {
      ...(_d = n.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  args: {
    variant: "solid",
    children: "Solid"
  }
}`,
        ...(_f = (_e = n.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  o.parameters = {
    ...o.parameters,
    docs: {
      ...(_g = o.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  args: {
    variant: "soft",
    children: "Soft"
  }
}`,
        ...(_i = (_h = o.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
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
    variant: "surface",
    children: "Surface"
  }
}`,
        ...(_l = (_k = i.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_m = l.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  args: {
    variant: "outline",
    children: "Outline"
  }
}`,
        ...(_o = (_n = l.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
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
    size: "1",
    children: "Size 1"
  }
}`,
        ...(_r = (_q = d.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  t.parameters = {
    ...t.parameters,
    docs: {
      ...(_s = t.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  args: {
    size: "2",
    children: "Size 2"
  }
}`,
        ...(_u = (_t = t.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  c.parameters = {
    ...c.parameters,
    docs: {
      ...(_v = c.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  args: {
    size: "3",
    children: "Size 3"
  }
}`,
        ...(_x = (_w = c.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
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
    color: "blue",
    children: "Blue"
  }
}`,
        ...(_A = (_z = p.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
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
    color: "red",
    children: "Red"
  }
}`,
        ...(_D = (_C = u.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
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
    color: "green",
    children: "Green"
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
    color: "purple",
    children: "Purple"
  }
}`,
        ...(_J = (_I = m.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_K = h.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  args: {
    highContrast: true,
    children: "High Contrast"
  }
}`,
        ...(_M = (_L = h.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
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
    radius: "none",
    children: "No Radius"
  }
}`,
        ...(_P = (_O = x.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_Q = v.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  args: {
    radius: "small",
    children: "Small Radius"
  }
}`,
        ...(_S = (_R = v.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_T = S.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  args: {
    radius: "medium",
    children: "Medium Radius"
  }
}`,
        ...(_V = (_U = S.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_W = y.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  args: {
    radius: "large",
    children: "Large Radius"
  }
}`,
        ...(_Y = (_X = y.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_Z = f.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  args: {
    radius: "full",
    children: "Full Radius"
  }
}`,
        ...(_$ = (__ = f.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_aa = B.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  }}>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="soft">Soft</Badge>
      <Badge variant="surface">Surface</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
}`,
        ...(_ca = (_ba = B.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_da = z.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    gap: "8px",
    alignItems: "center"
  }}>
      <Badge size="1">Size 1</Badge>
      <Badge size="2">Size 2</Badge>
      <Badge size="3">Size 3</Badge>
    </div>
}`,
        ...(_fa = (_ea = z.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_ga = j.parameters) == null ? void 0 : _ga.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "8px"
  }}>
      {["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"].map(color => <Badge key={color} color={color as any}>
          {color}
        </Badge>)}
    </div>
}`,
        ...(_ia = (_ha = j.parameters) == null ? void 0 : _ha.docs) == null ? void 0 : _ia.source
      }
    }
  };
  R.parameters = {
    ...R.parameters,
    docs: {
      ...(_ja = R.parameters) == null ? void 0 : _ja.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    gap: "8px",
    alignItems: "center"
  }}>
      <Badge variant="solid" color="green">
        Active
      </Badge>
      <Badge variant="solid" color="yellow">
        Warning
      </Badge>
      <Badge variant="solid" color="red">
        Error
      </Badge>
      <Badge variant="solid" color="blue">
        Info
      </Badge>
      <Badge variant="outline" color="gray">
        Inactive
      </Badge>
    </div>
}`,
        ...(_la = (_ka = R.parameters) == null ? void 0 : _ka.docs) == null ? void 0 : _la.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_ma = b.parameters) == null ? void 0 : _ma.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  }}>
      <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "center"
    }}>
        <span>User Role:</span>
        <Badge variant="solid" color="blue">
          Admin
        </Badge>
      </div>
      <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "center"
    }}>
        <span>Status:</span>
        <Badge variant="soft" color="green">
          Online
        </Badge>
      </div>
      <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "center"
    }}>
        <span>Priority:</span>
        <Badge variant="outline" color="red">
          High
        </Badge>
      </div>
      <div style={{
      display: "flex",
      gap: "8px",
      alignItems: "center"
    }}>
        <span>Category:</span>
        <Badge variant="surface" color="purple">
          Feature
        </Badge>
      </div>
    </div>
}`,
        ...(_oa = (_na = b.parameters) == null ? void 0 : _na.docs) == null ? void 0 : _oa.source
      }
    }
  };
  P = [
    "Default",
    "Solid",
    "Soft",
    "Surface",
    "Outline",
    "Size1",
    "Size2",
    "Size3",
    "ColorBlue",
    "ColorRed",
    "ColorGreen",
    "ColorPurple",
    "HighContrast",
    "RadiusNone",
    "RadiusSmall",
    "RadiusMedium",
    "RadiusLarge",
    "RadiusFull",
    "AllVariants",
    "AllSizes",
    "ColorPalette",
    "StatusIndicators",
    "RealWorldExample"
  ];
});
export {
  z as AllSizes,
  B as AllVariants,
  p as ColorBlue,
  g as ColorGreen,
  j as ColorPalette,
  m as ColorPurple,
  u as ColorRed,
  s as Default,
  h as HighContrast,
  l as Outline,
  f as RadiusFull,
  y as RadiusLarge,
  S as RadiusMedium,
  x as RadiusNone,
  v as RadiusSmall,
  b as RealWorldExample,
  d as Size1,
  t as Size2,
  c as Size3,
  o as Soft,
  n as Solid,
  R as StatusIndicators,
  i as Surface,
  P as __namedExportsOrder,
  __tla,
  A as default
};
