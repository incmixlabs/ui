import { j as r, T as L, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { B as e, __tla as __tla_1 } from "./button-BF2Wetgg.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_2 } from "./base-button-BHQkXpSv.js";
let D, j, n, g, S, G, B, h, s, z, l, f, v, c, R, C, b, x, y, w, d, u, p, m, t, o, i, A, T;
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la, _ma, _na, _oa, _pa, _qa, _ra, _sa, _ta, _ua, _va, _wa, _xa, _ya, _za, _Aa;
  T = {
    title: "Base/Button",
    component: e,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (a) => r.jsx(L, {
        children: r.jsx(a, {})
      })
    ],
    argTypes: {
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
        description: "Button variant style"
      },
      size: {
        control: "select",
        options: [
          "1",
          "2",
          "3",
          "4"
        ],
        description: "Button size"
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
        description: "Button accent color"
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
        description: "Button border radius"
      },
      loading: {
        control: "boolean",
        description: "Loading state with spinner"
      },
      disabled: {
        control: "boolean",
        description: "Disabled state"
      },
      highContrast: {
        control: "boolean",
        description: "High contrast mode"
      },
      children: {
        control: "text",
        description: "Button content"
      }
    },
    args: {
      children: "Button",
      variant: "solid",
      size: "2"
    }
  };
  s = {
    args: {
      children: "Default Button"
    }
  };
  n = {
    args: {
      variant: "classic",
      children: "Classic Button"
    }
  };
  o = {
    args: {
      variant: "solid",
      children: "Solid Button"
    }
  };
  t = {
    args: {
      variant: "soft",
      children: "Soft Button"
    }
  };
  i = {
    args: {
      variant: "surface",
      children: "Surface Button"
    }
  };
  c = {
    args: {
      variant: "outline",
      children: "Outline Button"
    }
  };
  l = {
    args: {
      variant: "ghost",
      children: "Ghost Button"
    }
  };
  d = {
    args: {
      size: "1",
      children: "Size 1"
    }
  };
  u = {
    args: {
      size: "2",
      children: "Size 2"
    }
  };
  p = {
    args: {
      size: "3",
      children: "Size 3"
    }
  };
  m = {
    args: {
      size: "4",
      children: "Size 4"
    }
  };
  g = {
    args: {
      color: "blue",
      children: "Blue Button"
    }
  };
  h = {
    args: {
      color: "red",
      children: "Red Button"
    }
  };
  S = {
    args: {
      color: "green",
      children: "Green Button"
    }
  };
  B = {
    args: {
      color: "purple",
      children: "Purple Button"
    }
  };
  v = {
    args: {
      loading: true,
      children: "Loading Button"
    }
  };
  z = {
    args: {
      disabled: true,
      children: "Disabled Button"
    }
  };
  f = {
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
  y = {
    args: {
      radius: "small",
      children: "Small Radius"
    }
  };
  b = {
    args: {
      radius: "medium",
      children: "Medium Radius"
    }
  };
  C = {
    args: {
      radius: "large",
      children: "Large Radius"
    }
  };
  R = {
    args: {
      radius: "full",
      children: "Full Radius"
    }
  };
  j = {
    render: () => r.jsxs("div", {
      style: {
        display: "flex",
        gap: "8px",
        flexWrap: "wrap"
      },
      children: [
        r.jsx(e, {
          variant: "classic",
          children: "Classic"
        }),
        r.jsx(e, {
          variant: "solid",
          children: "Solid"
        }),
        r.jsx(e, {
          variant: "soft",
          children: "Soft"
        }),
        r.jsx(e, {
          variant: "surface",
          children: "Surface"
        }),
        r.jsx(e, {
          variant: "outline",
          children: "Outline"
        }),
        r.jsx(e, {
          variant: "ghost",
          children: "Ghost"
        })
      ]
    })
  };
  D = {
    render: () => r.jsxs("div", {
      style: {
        display: "flex",
        gap: "8px",
        alignItems: "center"
      },
      children: [
        r.jsx(e, {
          size: "1",
          children: "Size 1"
        }),
        r.jsx(e, {
          size: "2",
          children: "Size 2"
        }),
        r.jsx(e, {
          size: "3",
          children: "Size 3"
        }),
        r.jsx(e, {
          size: "4",
          children: "Size 4"
        })
      ]
    })
  };
  G = {
    render: () => r.jsx("div", {
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
      ].map((a) => r.jsx(e, {
        color: a,
        size: "1",
        children: a
      }, a))
    })
  };
  w = {
    render: () => r.jsxs("div", {
      style: {
        display: "flex",
        gap: "12px",
        alignItems: "center"
      },
      children: [
        r.jsx(e, {
          variant: "solid",
          color: "blue",
          children: "Save Changes"
        }),
        r.jsx(e, {
          variant: "outline",
          color: "gray",
          children: "Cancel"
        }),
        r.jsx(e, {
          variant: "ghost",
          color: "red",
          children: "Delete"
        }),
        r.jsx(e, {
          variant: "soft",
          color: "green",
          loading: true,
          children: "Processing..."
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
    children: "Default Button"
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
    variant: "classic",
    children: "Classic Button"
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
    variant: "solid",
    children: "Solid Button"
  }
}`,
        ...(_i = (_h = o.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  t.parameters = {
    ...t.parameters,
    docs: {
      ...(_j = t.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  args: {
    variant: "soft",
    children: "Soft Button"
  }
}`,
        ...(_l = (_k = t.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  i.parameters = {
    ...i.parameters,
    docs: {
      ...(_m = i.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  args: {
    variant: "surface",
    children: "Surface Button"
  }
}`,
        ...(_o = (_n = i.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
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
    variant: "outline",
    children: "Outline Button"
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
    variant: "ghost",
    children: "Ghost Button"
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
    size: "1",
    children: "Size 1"
  }
}`,
        ...(_x = (_w = d.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_y = u.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  args: {
    size: "2",
    children: "Size 2"
  }
}`,
        ...(_A = (_z = u.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_B = p.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  args: {
    size: "3",
    children: "Size 3"
  }
}`,
        ...(_D = (_C = p.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_E = m.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  args: {
    size: "4",
    children: "Size 4"
  }
}`,
        ...(_G = (_F = m.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  g.parameters = {
    ...g.parameters,
    docs: {
      ...(_H = g.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  args: {
    color: "blue",
    children: "Blue Button"
  }
}`,
        ...(_J = (_I = g.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
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
    color: "red",
    children: "Red Button"
  }
}`,
        ...(_M = (_L = h.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_N = S.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  args: {
    color: "green",
    children: "Green Button"
  }
}`,
        ...(_P = (_O = S.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_Q = B.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  args: {
    color: "purple",
    children: "Purple Button"
  }
}`,
        ...(_S = (_R = B.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_T = v.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  args: {
    loading: true,
    children: "Loading Button"
  }
}`,
        ...(_V = (_U = v.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_W = z.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  args: {
    disabled: true,
    children: "Disabled Button"
  }
}`,
        ...(_Y = (_X = z.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
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
    highContrast: true,
    children: "High Contrast"
  }
}`,
        ...(_$ = (__ = f.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_aa = x.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  args: {
    radius: "none",
    children: "No Radius"
  }
}`,
        ...(_ca = (_ba = x.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_da = y.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  args: {
    radius: "small",
    children: "Small Radius"
  }
}`,
        ...(_fa = (_ea = y.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_ga = b.parameters) == null ? void 0 : _ga.docs,
      source: {
        originalSource: `{
  args: {
    radius: "medium",
    children: "Medium Radius"
  }
}`,
        ...(_ia = (_ha = b.parameters) == null ? void 0 : _ha.docs) == null ? void 0 : _ia.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_ja = C.parameters) == null ? void 0 : _ja.docs,
      source: {
        originalSource: `{
  args: {
    radius: "large",
    children: "Large Radius"
  }
}`,
        ...(_la = (_ka = C.parameters) == null ? void 0 : _ka.docs) == null ? void 0 : _la.source
      }
    }
  };
  R.parameters = {
    ...R.parameters,
    docs: {
      ...(_ma = R.parameters) == null ? void 0 : _ma.docs,
      source: {
        originalSource: `{
  args: {
    radius: "full",
    children: "Full Radius"
  }
}`,
        ...(_oa = (_na = R.parameters) == null ? void 0 : _na.docs) == null ? void 0 : _oa.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_pa = j.parameters) == null ? void 0 : _pa.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    gap: "8px",
    flexWrap: "wrap"
  }}>
      <Button variant="classic">Classic</Button>
      <Button variant="solid">Solid</Button>
      <Button variant="soft">Soft</Button>
      <Button variant="surface">Surface</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
}`,
        ...(_ra = (_qa = j.parameters) == null ? void 0 : _qa.docs) == null ? void 0 : _ra.source
      }
    }
  };
  D.parameters = {
    ...D.parameters,
    docs: {
      ...(_sa = D.parameters) == null ? void 0 : _sa.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    gap: "8px",
    alignItems: "center"
  }}>
      <Button size="1">Size 1</Button>
      <Button size="2">Size 2</Button>
      <Button size="3">Size 3</Button>
      <Button size="4">Size 4</Button>
    </div>
}`,
        ...(_ua = (_ta = D.parameters) == null ? void 0 : _ta.docs) == null ? void 0 : _ua.source
      }
    }
  };
  G.parameters = {
    ...G.parameters,
    docs: {
      ...(_va = G.parameters) == null ? void 0 : _va.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "8px"
  }}>
      {["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"].map(color => <Button key={color} color={color as any} size="1">
          {color}
        </Button>)}
    </div>
}`,
        ...(_xa = (_wa = G.parameters) == null ? void 0 : _wa.docs) == null ? void 0 : _xa.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_ya = w.parameters) == null ? void 0 : _ya.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    gap: "12px",
    alignItems: "center"
  }}>
      <Button variant="solid" color="blue">
        Save Changes
      </Button>
      <Button variant="outline" color="gray">
        Cancel
      </Button>
      <Button variant="ghost" color="red">
        Delete
      </Button>
      <Button variant="soft" color="green" loading>
        Processing...
      </Button>
    </div>
}`,
        ...(_Aa = (_za = w.parameters) == null ? void 0 : _za.docs) == null ? void 0 : _Aa.source
      }
    }
  };
  A = [
    "Default",
    "Classic",
    "Solid",
    "Soft",
    "Surface",
    "Outline",
    "Ghost",
    "Size1",
    "Size2",
    "Size3",
    "Size4",
    "ColorBlue",
    "ColorRed",
    "ColorGreen",
    "ColorPurple",
    "Loading",
    "Disabled",
    "HighContrast",
    "RadiusNone",
    "RadiusSmall",
    "RadiusMedium",
    "RadiusLarge",
    "RadiusFull",
    "AllVariants",
    "AllSizes",
    "ColorPalette",
    "RealWorldExample"
  ];
});
export {
  D as AllSizes,
  j as AllVariants,
  n as Classic,
  g as ColorBlue,
  S as ColorGreen,
  G as ColorPalette,
  B as ColorPurple,
  h as ColorRed,
  s as Default,
  z as Disabled,
  l as Ghost,
  f as HighContrast,
  v as Loading,
  c as Outline,
  R as RadiusFull,
  C as RadiusLarge,
  b as RadiusMedium,
  x as RadiusNone,
  y as RadiusSmall,
  w as RealWorldExample,
  d as Size1,
  u as Size2,
  p as Size3,
  m as Size4,
  t as Soft,
  o as Solid,
  i as Surface,
  A as __namedExportsOrder,
  __tla,
  T as default
};
