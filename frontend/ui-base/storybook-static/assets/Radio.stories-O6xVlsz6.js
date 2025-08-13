import { o as W, P, q as B, s as V, r as _, v as N, j as e, l as O, n as $, w as A, T as H, F as I, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import "./preload-helper-D9Z9MdNV.js";
let h, v, d, i, x, y, j, b, m, s, u, g, z, f, l, o, t, p, c, S, U, Q;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa;
  const D = P;
  D.dispatchDiscreteCustomEvent = W;
  D.Root = P;
  function G(a, R, C = {
    checkForDefaultPrevented: true
  }) {
    return function(n) {
      a == null ? void 0 : a(n), (!C.checkForDefaultPrevented || !n.defaultPrevented) && (R == null ? void 0 : R(n));
    };
  }
  const L = [
    "1",
    "2",
    "3"
  ], q = [
    "classic",
    "surface",
    "soft"
  ], M = {
    size: {
      type: "enum",
      className: "rt-r-size",
      values: L,
      default: "2",
      responsive: true
    },
    variant: {
      type: "enum",
      className: "rt-variant",
      values: q,
      default: "surface"
    },
    ...V,
    ...B
  }, r = _.forwardRef((a, R) => {
    const C = _.useRef(null), { className: k, color: n, onChange: w, onValueChange: F, ...T } = N(a, M, A);
    return e.jsx("input", {
      type: "radio",
      "data-accent-color": n,
      ...T,
      onChange: G(w, (E) => F == null ? void 0 : F(E.currentTarget.value)),
      ref: $(C, R),
      className: O("rt-reset", "rt-BaseRadioRoot", "rt-RadioRoot", k)
    });
  });
  r.displayName = "Radio";
  r.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Radio",
    props: {
      value: {
        required: true,
        tsType: {
          name: "string"
        },
        description: ""
      },
      onValueChange: {
        required: false,
        tsType: {
          name: "signature",
          type: "function",
          raw: "(value: string) => void",
          signature: {
            arguments: [
              {
                type: {
                  name: "string"
                },
                name: "value"
              }
            ],
            return: {
              name: "void"
            }
          }
        },
        description: ""
      }
    },
    composes: [
      "RadioInputProps"
    ]
  };
  Q = {
    title: "Base/Radio",
    component: r,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (a) => e.jsx(H, {
        children: e.jsx(a, {})
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
        description: "Radio button size"
      },
      variant: {
        control: "select",
        options: [
          "classic",
          "surface",
          "soft"
        ],
        description: "Radio button variant style"
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
        description: "Radio button accent color"
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
  s = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          ...a,
          value: "default"
        }),
        "Default Radio"
      ]
    })
  };
  l = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          size: "1",
          value: "size1"
        }),
        "Size 1 (Small)"
      ]
    })
  };
  o = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          size: "2",
          value: "size2"
        }),
        "Size 2 (Default)"
      ]
    })
  };
  t = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          size: "3",
          value: "size3"
        }),
        "Size 3 (Large)"
      ]
    })
  };
  i = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          variant: "classic",
          value: "classic"
        }),
        "Classic Variant"
      ]
    })
  };
  c = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          variant: "surface",
          value: "surface"
        }),
        "Surface Variant"
      ]
    })
  };
  p = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          variant: "soft",
          value: "soft"
        }),
        "Soft Variant"
      ]
    })
  };
  d = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          checked: true,
          value: "checked"
        }),
        "Checked State"
      ]
    })
  };
  u = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: "0.6"
      },
      children: [
        e.jsx(r, {
          disabled: true,
          value: "disabled"
        }),
        "Disabled State"
      ]
    })
  };
  g = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: "0.6"
      },
      children: [
        e.jsx(r, {
          disabled: true,
          checked: true,
          value: "disabled-checked"
        }),
        "Disabled + Checked"
      ]
    })
  };
  x = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          color: "blue",
          checked: true,
          value: "color-blue"
        }),
        "Blue Color"
      ]
    })
  };
  m = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          color: "red",
          checked: true,
          value: "color-red"
        }),
        "Red Color"
      ]
    })
  };
  y = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          color: "green",
          checked: true,
          value: "color-green"
        }),
        "Green Color"
      ]
    })
  };
  b = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          color: "purple",
          checked: true,
          value: "color-purple"
        }),
        "Purple Color"
      ]
    })
  };
  f = {
    render: (a) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(r, {
          highContrast: true,
          checked: true,
          value: "high-contrast"
        }),
        "High Contrast Mode"
      ]
    })
  };
  h = {
    render: () => e.jsxs(I, {
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
              checked: true,
              value: "size1-showcase"
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
              checked: true,
              value: "size2-showcase"
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
              checked: true,
              value: "size3-showcase"
            }),
            "Size 3"
          ]
        })
      ]
    })
  };
  v = {
    render: () => e.jsxs(I, {
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
              checked: true,
              value: "classic-showcase"
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
              checked: true,
              value: "surface-showcase"
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
              checked: true,
              value: "soft-showcase"
            }),
            "Soft"
          ]
        })
      ]
    })
  };
  j = {
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
      ].map((a) => e.jsxs("label", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "6px",
          cursor: "pointer"
        },
        children: [
          e.jsx(r, {
            color: a,
            checked: true,
            value: `color-${a}`
          }),
          a
        ]
      }, a))
    })
  };
  S = {
    render: () => e.jsxs(I, {
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
              name: "option",
              value: "option1"
            }),
            "Option 1"
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
              name: "option",
              value: "option2"
            }),
            "Option 2"
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
              name: "option",
              value: "option3"
            }),
            "Option 3"
          ]
        })
      ]
    })
  };
  z = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "300px"
      },
      children: [
        e.jsx("h3", {
          style: {
            marginBottom: "12px",
            fontSize: "16px",
            fontWeight: "bold"
          },
          children: "Choose your plan"
        }),
        e.jsxs(I, {
          direction: "column",
          gap: "3",
          children: [
            e.jsxs("label", {
              style: {
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #e1e5e9"
              },
              children: [
                e.jsx(r, {
                  name: "plan",
                  value: "basic",
                  style: {
                    marginTop: "2px"
                  }
                }),
                e.jsxs("div", {
                  children: [
                    e.jsx("div", {
                      style: {
                        fontWeight: "bold"
                      },
                      children: "Basic Plan"
                    }),
                    e.jsx("div", {
                      style: {
                        fontSize: "14px",
                        color: "#666"
                      },
                      children: "$9/month - Essential features"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("label", {
              style: {
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #e1e5e9"
              },
              children: [
                e.jsx(r, {
                  name: "plan",
                  value: "pro",
                  style: {
                    marginTop: "2px"
                  }
                }),
                e.jsxs("div", {
                  children: [
                    e.jsx("div", {
                      style: {
                        fontWeight: "bold"
                      },
                      children: "Pro Plan"
                    }),
                    e.jsx("div", {
                      style: {
                        fontSize: "14px",
                        color: "#666"
                      },
                      children: "$19/month - Advanced features"
                    })
                  ]
                })
              ]
            }),
            e.jsxs("label", {
              style: {
                display: "flex",
                alignItems: "flex-start",
                gap: "8px",
                cursor: "pointer",
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #e1e5e9"
              },
              children: [
                e.jsx(r, {
                  name: "plan",
                  value: "enterprise",
                  style: {
                    marginTop: "2px"
                  }
                }),
                e.jsxs("div", {
                  children: [
                    e.jsx("div", {
                      style: {
                        fontWeight: "bold"
                      },
                      children: "Enterprise"
                    }),
                    e.jsx("div", {
                      style: {
                        fontSize: "14px",
                        color: "#666"
                      },
                      children: "Contact us - Custom solution"
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
  s.parameters = {
    ...s.parameters,
    docs: {
      ...(_a = s.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio {...args} value="default" />
      Default Radio
    </label>
}`,
        ...(_c = (_b = s.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
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
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio size="1" value="size1" />
      Size 1 (Small)
    </label>
}`,
        ...(_f = (_e = l.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  o.parameters = {
    ...o.parameters,
    docs: {
      ...(_g = o.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio size="2" value="size2" />
      Size 2 (Default)
    </label>
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
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio size="3" value="size3" />
      Size 3 (Large)
    </label>
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
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio variant="classic" value="classic" />
      Classic Variant
    </label>
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
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio variant="surface" value="surface" />
      Surface Variant
    </label>
}`,
        ...(_r = (_q = c.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
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
      <Radio variant="soft" value="soft" />
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
      <Radio checked value="checked" />
      Checked State
    </label>
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
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    opacity: "0.6"
  }}>
      <Radio disabled value="disabled" />
      Disabled State
    </label>
}`,
        ...(_A = (_z = u.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
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
      <Radio disabled checked value="disabled-checked" />
      Disabled + Checked
    </label>
}`,
        ...(_D = (_C = g.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_E = x.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio color="blue" checked value="color-blue" />
      Blue Color
    </label>
}`,
        ...(_G = (_F = x.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_H = m.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio color="red" checked value="color-red" />
      Red Color
    </label>
}`,
        ...(_J = (_I = m.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_K = y.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio color="green" checked value="color-green" />
      Green Color
    </label>
}`,
        ...(_M = (_L = y.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_N = b.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio color="purple" checked value="color-purple" />
      Purple Color
    </label>
}`,
        ...(_P = (_O = b.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_Q = f.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Radio highContrast checked value="high-contrast" />
      High Contrast Mode
    </label>
}`,
        ...(_S = (_R = f.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_T = h.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="4" align="center">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer"
    }}>
        <Radio size="1" checked value="size1-showcase" />
        Size 1
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio size="2" checked value="size2-showcase" />
        Size 2
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer"
    }}>
        <Radio size="3" checked value="size3-showcase" />
        Size 3
      </label>
    </Flex>
}`,
        ...(_V = (_U = h.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_W = v.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="4" align="center">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio variant="classic" checked value="classic-showcase" />
        Classic
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio variant="surface" checked value="surface-showcase" />
        Surface
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio variant="soft" checked value="soft-showcase" />
        Soft
      </label>
    </Flex>
}`,
        ...(_Y = (_X = v.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_Z = j.parameters) == null ? void 0 : _Z.docs,
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
          <Radio color={color as any} checked value={\`color-\${color}\`} />
          {color}
        </label>)}
    </div>
}`,
        ...(_$ = (__ = j.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_aa = S.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="2">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio name="option" value="option1" />
        Option 1
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio name="option" value="option2" />
        Option 2
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Radio name="option" value="option3" />
        Option 3
      </label>
    </Flex>
}`,
        ...(_ca = (_ba = S.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
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
    maxWidth: "300px"
  }}>
      <h3 style={{
      marginBottom: "12px",
      fontSize: "16px",
      fontWeight: "bold"
    }}>
        Choose your plan
      </h3>
      <Flex direction="column" gap="3">
        <label style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #e1e5e9"
      }}>
          <Radio name="plan" value="basic" style={{
          marginTop: "2px"
        }} />
          <div>
            <div style={{
            fontWeight: "bold"
          }}>Basic Plan</div>
            <div style={{
            fontSize: "14px",
            color: "#666"
          }}>
              $9/month - Essential features
            </div>
          </div>
        </label>
        <label style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #e1e5e9"
      }}>
          <Radio name="plan" value="pro" style={{
          marginTop: "2px"
        }} />
          <div>
            <div style={{
            fontWeight: "bold"
          }}>Pro Plan</div>
            <div style={{
            fontSize: "14px",
            color: "#666"
          }}>
              $19/month - Advanced features
            </div>
          </div>
        </label>
        <label style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        cursor: "pointer",
        padding: "8px",
        borderRadius: "6px",
        border: "1px solid #e1e5e9"
      }}>
          <Radio name="plan" value="enterprise" style={{
          marginTop: "2px"
        }} />
          <div>
            <div style={{
            fontWeight: "bold"
          }}>Enterprise</div>
            <div style={{
            fontSize: "14px",
            color: "#666"
          }}>
              Contact us - Custom solution
            </div>
          </div>
        </label>
      </Flex>
    </div>
}`,
        ...(_fa = (_ea = z.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  U = [
    "Default",
    "Size1",
    "Size2",
    "Size3",
    "Classic",
    "Surface",
    "Soft",
    "Checked",
    "Disabled",
    "DisabledChecked",
    "ColorBlue",
    "ColorRed",
    "ColorGreen",
    "ColorPurple",
    "HighContrast",
    "AllSizes",
    "AllVariants",
    "ColorPalette",
    "WithLabels",
    "FormExample"
  ];
});
export {
  h as AllSizes,
  v as AllVariants,
  d as Checked,
  i as Classic,
  x as ColorBlue,
  y as ColorGreen,
  j as ColorPalette,
  b as ColorPurple,
  m as ColorRed,
  s as Default,
  u as Disabled,
  g as DisabledChecked,
  z as FormExample,
  f as HighContrast,
  l as Size1,
  o as Size2,
  t as Size3,
  p as Soft,
  c as Surface,
  S as WithLabels,
  U as __namedExportsOrder,
  __tla,
  Q as default
};
