import { j as e, T as _, F as s, a as z, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { C as r, __tla as __tla_1 } from "./checkbox-B4on_Ni2.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_2 } from "./index-DfrOcl7X.js";
import { __tla as __tla_3 } from "./index-KgX6eUjc.js";
import { __tla as __tla_4 } from "./icons-DMb5RjWB.js";
let k, C, j, d, c, u, y, I, h, b, a, g, m, v, f, x, l, t, o, p, i, S, E, A;
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
  })(),
  (() => {
    try {
      return __tla_4;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa, _ga, _ha, _ia, _ja, _ka, _la;
  A = {
    title: "Base/Checkbox",
    component: r,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (n) => e.jsx(_, {
        children: e.jsx(n, {})
      })
    ],
    argTypes: {
      size: {
        control: "select",
        options: [
          "1",
          "2",
          "3"
        ],
        description: "Checkbox size"
      },
      variant: {
        control: "select",
        options: [
          "classic",
          "surface",
          "soft"
        ],
        description: "Checkbox variant style"
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
        description: "Checkbox accent color"
      },
      highContrast: {
        control: "boolean",
        description: "High contrast mode"
      },
      disabled: {
        control: "boolean",
        description: "Disabled state"
      },
      checked: {
        control: "boolean",
        description: "Checked state (controlled)"
      }
    },
    args: {
      size: "2",
      variant: "surface"
    }
  };
  a = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          ...n
        }),
        "Default Checkbox"
      ]
    })
  };
  l = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          size: "1"
        }),
        "Size 1 (Small)"
      ]
    })
  };
  t = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          size: "2"
        }),
        "Size 2 (Default)"
      ]
    })
  };
  o = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          size: "3"
        }),
        "Size 3 (Large)"
      ]
    })
  };
  c = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          variant: "classic"
        }),
        "Classic Variant"
      ]
    })
  };
  i = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          variant: "surface"
        }),
        "Surface Variant"
      ]
    })
  };
  p = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          variant: "soft"
        }),
        "Soft Variant"
      ]
    })
  };
  d = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          checked: true
        }),
        "Checked State"
      ]
    })
  };
  x = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          checked: "indeterminate"
        }),
        "Indeterminate State"
      ]
    })
  };
  g = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: "0.6"
      },
      children: [
        e.jsx(r, {
          disabled: true
        }),
        "Disabled State"
      ]
    })
  };
  m = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: "0.6"
      },
      children: [
        e.jsx(r, {
          disabled: true,
          checked: true
        }),
        "Disabled + Checked"
      ]
    })
  };
  u = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          color: "blue",
          checked: true
        }),
        "Blue Color"
      ]
    })
  };
  b = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          color: "red",
          checked: true
        }),
        "Red Color"
      ]
    })
  };
  y = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          color: "green",
          checked: true
        }),
        "Green Color"
      ]
    })
  };
  h = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          color: "purple",
          checked: true
        }),
        "Purple Color"
      ]
    })
  };
  f = {
    render: (n) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          highContrast: true,
          checked: true
        }),
        "High Contrast Mode"
      ]
    })
  };
  k = {
    render: () => e.jsxs(s, {
      gap: "4",
      align: "center",
      children: [
        e.jsxs("label", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer"
          },
          children: [
            e.jsx(r, {
              size: "1",
              checked: true
            }),
            "Size 1"
          ]
        }),
        e.jsxs("label", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer"
          },
          children: [
            e.jsx(r, {
              size: "2",
              checked: true
            }),
            "Size 2"
          ]
        }),
        e.jsxs("label", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer"
          },
          children: [
            e.jsx(r, {
              size: "3",
              checked: true
            }),
            "Size 3"
          ]
        })
      ]
    })
  };
  j = {
    render: () => e.jsxs(s, {
      gap: "4",
      align: "center",
      children: [
        e.jsxs("label", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer"
          },
          children: [
            e.jsx(r, {
              variant: "classic",
              checked: true
            }),
            "Classic"
          ]
        }),
        e.jsxs("label", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer"
          },
          children: [
            e.jsx(r, {
              variant: "surface",
              checked: true
            }),
            "Surface"
          ]
        }),
        e.jsxs("label", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer"
          },
          children: [
            e.jsx(r, {
              variant: "soft",
              checked: true
            }),
            "Soft"
          ]
        })
      ]
    })
  };
  C = {
    render: () => e.jsxs(s, {
      direction: "column",
      gap: "2",
      children: [
        e.jsxs("label", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer"
          },
          children: [
            e.jsx(r, {}),
            "Unchecked"
          ]
        }),
        e.jsxs("label", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer"
          },
          children: [
            e.jsx(r, {
              checked: true
            }),
            "Checked"
          ]
        }),
        e.jsxs("label", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer"
          },
          children: [
            e.jsx(r, {
              checked: "indeterminate"
            }),
            "Indeterminate"
          ]
        }),
        e.jsxs("label", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            opacity: "0.6"
          },
          children: [
            e.jsx(r, {
              disabled: true
            }),
            "Disabled"
          ]
        }),
        e.jsxs("label", {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "8px",
            opacity: "0.6"
          },
          children: [
            e.jsx(r, {
              disabled: true,
              checked: true
            }),
            "Disabled + Checked"
          ]
        })
      ]
    })
  };
  I = {
    render: () => e.jsx("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
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
      ].map((n) => e.jsxs("label", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer"
        },
        children: [
          e.jsx(r, {
            color: n,
            checked: true
          }),
          n
        ]
      }, n))
    })
  };
  S = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "300px"
      },
      children: [
        e.jsx(z, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "12px"
          },
          children: "Todo List"
        }),
        e.jsxs(s, {
          direction: "column",
          gap: "2",
          children: [
            e.jsxs("label", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
              },
              children: [
                e.jsx(r, {
                  checked: true
                }),
                "Complete project setup"
              ]
            }),
            e.jsxs("label", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
              },
              children: [
                e.jsx(r, {
                  checked: true
                }),
                "Design system components"
              ]
            }),
            e.jsxs("label", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
              },
              children: [
                e.jsx(r, {
                  checked: "indeterminate"
                }),
                "Write documentation (in progress)"
              ]
            }),
            e.jsxs("label", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
              },
              children: [
                e.jsx(r, {}),
                "Unit testing"
              ]
            }),
            e.jsxs("label", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
              },
              children: [
                e.jsx(r, {}),
                "Deploy to production"
              ]
            })
          ]
        })
      ]
    })
  };
  v = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "400px"
      },
      children: [
        e.jsx(z, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px"
          },
          children: "Account Settings"
        }),
        e.jsxs(s, {
          direction: "column",
          gap: "3",
          children: [
            e.jsxs("label", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
              },
              children: [
                e.jsx(r, {
                  color: "blue",
                  checked: true
                }),
                "Enable email notifications"
              ]
            }),
            e.jsxs("label", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
              },
              children: [
                e.jsx(r, {
                  color: "green"
                }),
                "Subscribe to newsletter"
              ]
            }),
            e.jsxs("label", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
              },
              children: [
                e.jsx(r, {
                  color: "purple",
                  checked: true
                }),
                "Two-factor authentication"
              ]
            }),
            e.jsxs("label", {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer"
              },
              children: [
                e.jsx(r, {
                  color: "orange"
                }),
                "Beta features access"
              ]
            }),
            e.jsx("div", {
              style: {
                marginTop: "16px",
                paddingTop: "12px",
                borderTop: "1px solid #e1e5e9"
              },
              children: e.jsxs("label", {
                style: {
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "8px",
                  cursor: "pointer"
                },
                children: [
                  e.jsx(r, {
                    style: {
                      marginTop: "2px"
                    }
                  }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("div", {
                        children: "I agree to the Terms of Service and Privacy Policy"
                      }),
                      e.jsx("div", {
                        style: {
                          fontSize: "13px",
                          color: "#666",
                          marginTop: "2px"
                        },
                        children: "By checking this box, you acknowledge that you have read and agree to our terms."
                      })
                    ]
                  })
                ]
              })
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
  render: args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox {...args} />
      Default Checkbox
    </label>
}`,
        ...(_c = (_b = a.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_d = l.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer"
  }}>
      <Checkbox size="1" />
      Size 1 (Small)
    </label>
}`,
        ...(_f = (_e = l.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  t.parameters = {
    ...t.parameters,
    docs: {
      ...(_g = t.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox size="2" />
      Size 2 (Default)
    </label>
}`,
        ...(_i = (_h = t.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  o.parameters = {
    ...o.parameters,
    docs: {
      ...(_j = o.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer"
  }}>
      <Checkbox size="3" />
      Size 3 (Large)
    </label>
}`,
        ...(_l = (_k = o.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  c.parameters = {
    ...c.parameters,
    docs: {
      ...(_m = c.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox variant="classic" />
      Classic Variant
    </label>
}`,
        ...(_o = (_n = c.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  i.parameters = {
    ...i.parameters,
    docs: {
      ...(_p = i.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox variant="surface" />
      Surface Variant
    </label>
}`,
        ...(_r = (_q = i.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_s = p.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox variant="soft" />
      Soft Variant
    </label>
}`,
        ...(_u = (_t = p.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  d.parameters = {
    ...d.parameters,
    docs: {
      ...(_v = d.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox checked />
      Checked State
    </label>
}`,
        ...(_x = (_w = d.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_y = x.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox checked="indeterminate" />
      Indeterminate State
    </label>
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
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    opacity: "0.6"
  }}>
      <Checkbox disabled />
      Disabled State
    </label>
}`,
        ...(_D = (_C = g.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_E = m.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    opacity: "0.6"
  }}>
      <Checkbox disabled checked />
      Disabled + Checked
    </label>
}`,
        ...(_G = (_F = m.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_H = u.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox color="blue" checked />
      Blue Color
    </label>
}`,
        ...(_J = (_I = u.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_K = b.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox color="red" checked />
      Red Color
    </label>
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
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox color="green" checked />
      Green Color
    </label>
}`,
        ...(_P = (_O = y.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_Q = h.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox color="purple" checked />
      Purple Color
    </label>
}`,
        ...(_S = (_R = h.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_T = f.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Checkbox highContrast checked />
      High Contrast Mode
    </label>
}`,
        ...(_V = (_U = f.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_W = k.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="4" align="center">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer"
    }}>
        <Checkbox size="1" checked />
        Size 1
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox size="2" checked />
        Size 2
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer"
    }}>
        <Checkbox size="3" checked />
        Size 3
      </label>
    </Flex>
}`,
        ...(_Y = (_X = k.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_Z = j.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="4" align="center">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox variant="classic" checked />
        Classic
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox variant="surface" checked />
        Surface
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox variant="soft" checked />
        Soft
      </label>
    </Flex>
}`,
        ...(_$ = (__ = j.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_aa = C.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="2">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox />
        Unchecked
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox checked />
        Checked
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Checkbox checked="indeterminate" />
        Indeterminate
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      opacity: "0.6"
    }}>
        <Checkbox disabled />
        Disabled
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      opacity: "0.6"
    }}>
        <Checkbox disabled checked />
        Disabled + Checked
      </label>
    </Flex>
}`,
        ...(_ca = (_ba = C.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  I.parameters = {
    ...I.parameters,
    docs: {
      ...(_da = I.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "12px"
  }}>
      {["gray", "gold", "bronze", "brown", "yellow", "amber", "orange", "tomato", "red", "ruby", "crimson", "pink", "plum", "purple", "violet", "iris", "indigo", "blue", "cyan", "teal", "jade", "green", "grass", "lime", "mint", "sky"].map(color => <label key={color} style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer"
    }}>
          <Checkbox color={color as any} checked />
          {color}
        </label>)}
    </div>
}`,
        ...(_fa = (_ea = I.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_ga = S.parameters) == null ? void 0 : _ga.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "300px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "12px"
    }}>
        Todo List
      </Text>
      <Flex direction="column" gap="2">
        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox checked />
          Complete project setup
        </label>
        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox checked />
          Design system components
        </label>
        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox checked="indeterminate" />
          Write documentation (in progress)
        </label>
        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox />
          Unit testing
        </label>
        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox />
          Deploy to production
        </label>
      </Flex>
    </div>
}`,
        ...(_ia = (_ha = S.parameters) == null ? void 0 : _ha.docs) == null ? void 0 : _ia.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_ja = v.parameters) == null ? void 0 : _ja.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "400px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px"
    }}>
        Account Settings
      </Text>

      <Flex direction="column" gap="3">
        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox color="blue" checked />
          Enable email notifications
        </label>

        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox color="green" />
          Subscribe to newsletter
        </label>

        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox color="purple" checked />
          Two-factor authentication
        </label>

        <label style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      }}>
          <Checkbox color="orange" />
          Beta features access
        </label>

        <div style={{
        marginTop: "16px",
        paddingTop: "12px",
        borderTop: "1px solid #e1e5e9"
      }}>
          <label style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "8px",
          cursor: "pointer"
        }}>
            <Checkbox style={{
            marginTop: "2px"
          }} />
            <div>
              <div>I agree to the Terms of Service and Privacy Policy</div>
              <div style={{
              fontSize: "13px",
              color: "#666",
              marginTop: "2px"
            }}>
                By checking this box, you acknowledge that you have read and
                agree to our terms.
              </div>
            </div>
          </label>
        </div>
      </Flex>
    </div>
}`,
        ...(_la = (_ka = v.parameters) == null ? void 0 : _ka.docs) == null ? void 0 : _la.source
      }
    }
  };
  E = [
    "Default",
    "Size1",
    "Size2",
    "Size3",
    "Classic",
    "Surface",
    "Soft",
    "Checked",
    "Indeterminate",
    "Disabled",
    "DisabledChecked",
    "ColorBlue",
    "ColorRed",
    "ColorGreen",
    "ColorPurple",
    "HighContrast",
    "AllSizes",
    "AllVariants",
    "AllStates",
    "ColorPalette",
    "TaskListExample",
    "FormExample"
  ];
});
export {
  k as AllSizes,
  C as AllStates,
  j as AllVariants,
  d as Checked,
  c as Classic,
  u as ColorBlue,
  y as ColorGreen,
  I as ColorPalette,
  h as ColorPurple,
  b as ColorRed,
  a as Default,
  g as Disabled,
  m as DisabledChecked,
  v as FormExample,
  f as HighContrast,
  x as Indeterminate,
  l as Size1,
  t as Size2,
  o as Size3,
  p as Soft,
  i as Surface,
  S as TaskListExample,
  E as __namedExportsOrder,
  __tla,
  A as default
};
