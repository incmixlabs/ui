import { r as i, u as X, j as e, c as se, P as $, b as re, O as te, y as ae, q as le, s as ie, v as ce, l as q, w as oe, T as de, F as o, a as r, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { u as pe, __tla as __tla_1 } from "./index-DfrOcl7X.js";
import { u as ue, __tla as __tla_2 } from "./index-KgX6eUjc.js";
import "./preload-helper-D9Z9MdNV.js";
let N, A, R, I, v, _, D, B, P, b, k, T, F, O, E, S, j, w, C, z, Te, ke;
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$, _aa, _ba, _ca, _da, _ea, _fa;
  var V = "Switch", [xe, Ie] = se(V), [me, ge] = xe(V), J = i.forwardRef((s, c) => {
    const { __scopeSwitch: t, name: l, checked: a, defaultChecked: u, required: x, disabled: d, value: m = "on", onCheckedChange: H, form: p, ...M } = s, [g, h] = i.useState(null), G = X(c, (f) => h(f)), L = i.useRef(false), W = g ? p || !!g.closest("form") : true, [y, ee] = pe({
      prop: a,
      defaultProp: u ?? false,
      onChange: H,
      caller: V
    });
    return e.jsxs(me, {
      scope: t,
      checked: y,
      disabled: d,
      children: [
        e.jsx($.button, {
          type: "button",
          role: "switch",
          "aria-checked": y,
          "aria-required": x,
          "data-state": Z(y),
          "data-disabled": d ? "" : void 0,
          disabled: d,
          value: m,
          ...M,
          ref: G,
          onClick: re(s.onClick, (f) => {
            ee((ne) => !ne), W && (L.current = f.isPropagationStopped(), L.current || f.stopPropagation());
          })
        }),
        W && e.jsx(Y, {
          control: g,
          bubbles: !L.current,
          name: l,
          value: m,
          checked: y,
          required: x,
          disabled: d,
          form: p,
          style: {
            transform: "translateX(-100%)"
          }
        })
      ]
    });
  });
  J.displayName = V;
  var K = "SwitchThumb", Q = i.forwardRef((s, c) => {
    const { __scopeSwitch: t, ...l } = s, a = ge(K, t);
    return e.jsx($.span, {
      "data-state": Z(a.checked),
      "data-disabled": a.disabled ? "" : void 0,
      ...l,
      ref: c
    });
  });
  Q.displayName = K;
  var he = "SwitchBubbleInput", Y = i.forwardRef(({ __scopeSwitch: s, control: c, checked: t, bubbles: l = true, ...a }, u) => {
    const x = i.useRef(null), d = X(x, u), m = ue(t), H = te(c);
    return i.useEffect(() => {
      const p = x.current;
      if (!p) return;
      const M = window.HTMLInputElement.prototype, h = Object.getOwnPropertyDescriptor(M, "checked").set;
      if (m !== t && h) {
        const G = new Event("click", {
          bubbles: l
        });
        h.call(p, t), p.dispatchEvent(G);
      }
    }, [
      m,
      t,
      l
    ]), e.jsx("input", {
      type: "checkbox",
      "aria-hidden": true,
      defaultChecked: t,
      ...a,
      tabIndex: -1,
      ref: d,
      style: {
        ...a.style,
        ...H,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0
      }
    });
  });
  Y.displayName = he;
  function Z(s) {
    return s ? "checked" : "unchecked";
  }
  var ye = J, fe = Q;
  const be = [
    "1",
    "2",
    "3"
  ], Se = [
    "classic",
    "surface",
    "soft"
  ], je = {
    size: {
      type: "enum",
      className: "rt-r-size",
      values: be,
      default: "2",
      responsive: true
    },
    variant: {
      type: "enum",
      className: "rt-variant",
      values: Se,
      default: "surface"
    },
    ...ie,
    ...le,
    ...ae
  }, U = {
    Root: ye,
    Thumb: fe
  }, n = i.forwardRef((s, c) => {
    const { className: t, color: l, radius: a, ...u } = ce(s, je, oe);
    return e.jsx(U.Root, {
      "data-accent-color": l,
      "data-radius": a,
      ...u,
      asChild: false,
      ref: c,
      className: q("rt-reset", "rt-SwitchRoot", t),
      children: e.jsx(U.Thumb, {
        className: q("rt-SwitchThumb", {
          "rt-high-contrast": s.highContrast
        })
      })
    });
  });
  n.displayName = "Switch";
  n.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Switch",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  ke = {
    title: "Base/Switch",
    component: n,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (s) => e.jsx(de, {
        children: e.jsx(s, {})
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
        description: "Switch size"
      },
      variant: {
        control: "select",
        options: [
          "classic",
          "surface",
          "soft"
        ],
        description: "Switch variant style"
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
        description: "Switch accent color"
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
  b = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(n, {
          ...s
        }),
        "Default Switch"
      ]
    })
  };
  S = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "6px",
        cursor: "pointer"
      },
      children: [
        e.jsx(n, {
          size: "1"
        }),
        "Size 1 (Small)"
      ]
    })
  };
  j = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(n, {
          size: "2"
        }),
        "Size 2 (Default)"
      ]
    })
  };
  w = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer"
      },
      children: [
        e.jsx(n, {
          size: "3"
        }),
        "Size 3 (Large)"
      ]
    })
  };
  v = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(n, {
          variant: "classic"
        }),
        "Classic Variant"
      ]
    })
  };
  z = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(n, {
          variant: "surface"
        }),
        "Surface Variant"
      ]
    })
  };
  C = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(n, {
          variant: "soft"
        }),
        "Soft Variant"
      ]
    })
  };
  I = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(n, {
          checked: true
        }),
        "Checked State"
      ]
    })
  };
  k = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: "0.6"
      },
      children: [
        e.jsx(n, {
          disabled: true
        }),
        "Disabled State"
      ]
    })
  };
  T = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: "0.6"
      },
      children: [
        e.jsx(n, {
          disabled: true,
          checked: true
        }),
        "Disabled + Checked"
      ]
    })
  };
  _ = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(n, {
          color: "blue",
          checked: true
        }),
        "Blue Color"
      ]
    })
  };
  P = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(n, {
          color: "red",
          checked: true
        }),
        "Red Color"
      ]
    })
  };
  D = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(n, {
          color: "green",
          checked: true
        }),
        "Green Color"
      ]
    })
  };
  B = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(n, {
          color: "purple",
          checked: true
        }),
        "Purple Color"
      ]
    })
  };
  F = {
    render: (s) => e.jsxs("label", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        cursor: "pointer"
      },
      children: [
        e.jsx(n, {
          highContrast: true,
          checked: true
        }),
        "High Contrast Mode"
      ]
    })
  };
  N = {
    render: () => e.jsxs(o, {
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
            e.jsx(n, {
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
            e.jsx(n, {
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
            e.jsx(n, {
              size: "3",
              checked: true
            }),
            "Size 3"
          ]
        })
      ]
    })
  };
  R = {
    render: () => e.jsxs(o, {
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
            e.jsx(n, {
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
            e.jsx(n, {
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
            e.jsx(n, {
              variant: "soft",
              checked: true
            }),
            "Soft"
          ]
        })
      ]
    })
  };
  A = {
    render: () => e.jsxs(o, {
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
            e.jsx(n, {}),
            "Off"
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
            e.jsx(n, {
              checked: true
            }),
            "On"
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
            e.jsx(n, {
              disabled: true
            }),
            "Disabled Off"
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
            e.jsx(n, {
              disabled: true,
              checked: true
            }),
            "Disabled On"
          ]
        })
      ]
    })
  };
  E = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "350px"
      },
      children: [
        e.jsx(r, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px"
          },
          children: "Notification Settings"
        }),
        e.jsxs(o, {
          direction: "column",
          gap: "3",
          children: [
            e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              },
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsx(r, {
                      size: "2",
                      weight: "medium",
                      children: "Email Notifications"
                    }),
                    e.jsx(r, {
                      size: "1",
                      color: "gray",
                      children: "Receive updates via email"
                    })
                  ]
                }),
                e.jsx(n, {
                  color: "blue",
                  checked: true
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              },
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsx(r, {
                      size: "2",
                      weight: "medium",
                      children: "Push Notifications"
                    }),
                    e.jsx(r, {
                      size: "1",
                      color: "gray",
                      children: "Get notified on your device"
                    })
                  ]
                }),
                e.jsx(n, {
                  color: "green"
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              },
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsx(r, {
                      size: "2",
                      weight: "medium",
                      children: "Dark Mode"
                    }),
                    e.jsx(r, {
                      size: "1",
                      color: "gray",
                      children: "Switch to dark theme"
                    })
                  ]
                }),
                e.jsx(n, {
                  color: "purple",
                  checked: true
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
              },
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsx(r, {
                      size: "2",
                      weight: "medium",
                      children: "Auto-save"
                    }),
                    e.jsx(r, {
                      size: "1",
                      color: "gray",
                      children: "Automatically save your work"
                    })
                  ]
                }),
                e.jsx(n, {
                  color: "orange",
                  checked: true
                })
              ]
            }),
            e.jsxs("div", {
              style: {
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                opacity: "0.6"
              },
              children: [
                e.jsxs("div", {
                  children: [
                    e.jsx(r, {
                      size: "2",
                      weight: "medium",
                      children: "Beta Features"
                    }),
                    e.jsx(r, {
                      size: "1",
                      color: "gray",
                      children: "Access experimental features (unavailable)"
                    })
                  ]
                }),
                e.jsx(n, {
                  disabled: true
                })
              ]
            })
          ]
        })
      ]
    })
  };
  O = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "400px"
      },
      children: [
        e.jsx(r, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px"
          },
          children: "Privacy & Security"
        }),
        e.jsxs(o, {
          direction: "column",
          gap: "4",
          children: [
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px"
                  },
                  children: "Account Visibility"
                }),
                e.jsxs(o, {
                  direction: "column",
                  gap: "2",
                  children: [
                    e.jsxs("label", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer"
                      },
                      children: [
                        e.jsx(r, {
                          size: "2",
                          children: "Public profile"
                        }),
                        e.jsx(n, {
                          size: "1",
                          color: "blue"
                        })
                      ]
                    }),
                    e.jsxs("label", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer"
                      },
                      children: [
                        e.jsx(r, {
                          size: "2",
                          children: "Show activity status"
                        }),
                        e.jsx(n, {
                          size: "1",
                          color: "green",
                          checked: true
                        })
                      ]
                    }),
                    e.jsxs("label", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer"
                      },
                      children: [
                        e.jsx(r, {
                          size: "2",
                          children: "Allow search by email"
                        }),
                        e.jsx(n, {
                          size: "1",
                          color: "orange"
                        })
                      ]
                    })
                  ]
                })
              ]
            }),
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px"
                  },
                  children: "Security Features"
                }),
                e.jsxs(o, {
                  direction: "column",
                  gap: "2",
                  children: [
                    e.jsxs("label", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer"
                      },
                      children: [
                        e.jsx(r, {
                          size: "2",
                          children: "Two-factor authentication"
                        }),
                        e.jsx(n, {
                          color: "red",
                          checked: true
                        })
                      ]
                    }),
                    e.jsxs("label", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer"
                      },
                      children: [
                        e.jsx(r, {
                          size: "2",
                          children: "Login notifications"
                        }),
                        e.jsx(n, {
                          color: "purple",
                          checked: true
                        })
                      ]
                    }),
                    e.jsxs("label", {
                      style: {
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer"
                      },
                      children: [
                        e.jsx(r, {
                          size: "2",
                          children: "Session timeout"
                        }),
                        e.jsx(n, {
                          color: "cyan"
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
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_a = b.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch {...args} />
      Default Switch
    </label>
}`,
        ...(_c = (_b = b.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_d = S.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    cursor: "pointer"
  }}>
      <Switch size="1" />
      Size 1 (Small)
    </label>
}`,
        ...(_f = (_e = S.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_g = j.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch size="2" />
      Size 2 (Default)
    </label>
}`,
        ...(_i = (_h = j.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_j = w.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer"
  }}>
      <Switch size="3" />
      Size 3 (Large)
    </label>
}`,
        ...(_l = (_k = w.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_m = v.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch variant="classic" />
      Classic Variant
    </label>
}`,
        ...(_o = (_n = v.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_p = z.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch variant="surface" />
      Surface Variant
    </label>
}`,
        ...(_r = (_q = z.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_s = C.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch variant="soft" />
      Soft Variant
    </label>
}`,
        ...(_u = (_t = C.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  I.parameters = {
    ...I.parameters,
    docs: {
      ...(_v = I.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch checked />
      Checked State
    </label>
}`,
        ...(_x = (_w = I.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_y = k.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    opacity: "0.6"
  }}>
      <Switch disabled />
      Disabled State
    </label>
}`,
        ...(_A = (_z = k.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_B = T.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    opacity: "0.6"
  }}>
      <Switch disabled checked />
      Disabled + Checked
    </label>
}`,
        ...(_D = (_C = T.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  _.parameters = {
    ..._.parameters,
    docs: {
      ...(_E = _.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch color="blue" checked />
      Blue Color
    </label>
}`,
        ...(_G = (_F = _.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  P.parameters = {
    ...P.parameters,
    docs: {
      ...(_H = P.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch color="red" checked />
      Red Color
    </label>
}`,
        ...(_J = (_I = P.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  D.parameters = {
    ...D.parameters,
    docs: {
      ...(_K = D.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch color="green" checked />
      Green Color
    </label>
}`,
        ...(_M = (_L = D.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_N = B.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch color="purple" checked />
      Purple Color
    </label>
}`,
        ...(_P = (_O = B.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  F.parameters = {
    ...F.parameters,
    docs: {
      ...(_Q = F.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: _args => <label style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer"
  }}>
      <Switch highContrast checked />
      High Contrast Mode
    </label>
}`,
        ...(_S = (_R = F.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  N.parameters = {
    ...N.parameters,
    docs: {
      ...(_T = N.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="4" align="center">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "6px",
      cursor: "pointer"
    }}>
        <Switch size="1" checked />
        Size 1
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Switch size="2" checked />
        Size 2
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      cursor: "pointer"
    }}>
        <Switch size="3" checked />
        Size 3
      </label>
    </Flex>
}`,
        ...(_V = (_U = N.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  R.parameters = {
    ...R.parameters,
    docs: {
      ...(_W = R.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="4" align="center">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Switch variant="classic" checked />
        Classic
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Switch variant="surface" checked />
        Surface
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Switch variant="soft" checked />
        Soft
      </label>
    </Flex>
}`,
        ...(_Y = (_X = R.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  A.parameters = {
    ...A.parameters,
    docs: {
      ...(_Z = A.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="2">
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Switch />
        Off
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      cursor: "pointer"
    }}>
        <Switch checked />
        On
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      opacity: "0.6"
    }}>
        <Switch disabled />
        Disabled Off
      </label>
      <label style={{
      display: "flex",
      alignItems: "center",
      gap: "8px",
      opacity: "0.6"
    }}>
        <Switch disabled checked />
        Disabled On
      </label>
    </Flex>
}`,
        ...(_$ = (__ = A.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  E.parameters = {
    ...E.parameters,
    docs: {
      ...(_aa = E.parameters) == null ? void 0 : _aa.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "350px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px"
    }}>
        Notification Settings
      </Text>

      <Flex direction="column" gap="3">
        <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
          <div>
            <Text size="2" weight="medium">
              Email Notifications
            </Text>
            <Text size="1" color="gray">
              Receive updates via email
            </Text>
          </div>
          <Switch color="blue" checked />
        </div>

        <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
          <div>
            <Text size="2" weight="medium">
              Push Notifications
            </Text>
            <Text size="1" color="gray">
              Get notified on your device
            </Text>
          </div>
          <Switch color="green" />
        </div>

        <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
          <div>
            <Text size="2" weight="medium">
              Dark Mode
            </Text>
            <Text size="1" color="gray">
              Switch to dark theme
            </Text>
          </div>
          <Switch color="purple" checked />
        </div>

        <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
          <div>
            <Text size="2" weight="medium">
              Auto-save
            </Text>
            <Text size="1" color="gray">
              Automatically save your work
            </Text>
          </div>
          <Switch color="orange" checked />
        </div>

        <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: "0.6"
      }}>
          <div>
            <Text size="2" weight="medium">
              Beta Features
            </Text>
            <Text size="1" color="gray">
              Access experimental features (unavailable)
            </Text>
          </div>
          <Switch disabled />
        </div>
      </Flex>
    </div>
}`,
        ...(_ca = (_ba = E.parameters) == null ? void 0 : _ba.docs) == null ? void 0 : _ca.source
      }
    }
  };
  O.parameters = {
    ...O.parameters,
    docs: {
      ...(_da = O.parameters) == null ? void 0 : _da.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "400px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px"
    }}>
        Privacy & Security
      </Text>

      <Flex direction="column" gap="4">
        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px"
        }}>
            Account Visibility
          </Text>
          <Flex direction="column" gap="2">
            <label style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
              <Text size="2">Public profile</Text>
              <Switch size="1" color="blue" />
            </label>
            <label style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
              <Text size="2">Show activity status</Text>
              <Switch size="1" color="green" checked />
            </label>
            <label style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
              <Text size="2">Allow search by email</Text>
              <Switch size="1" color="orange" />
            </label>
          </Flex>
        </div>

        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px"
        }}>
            Security Features
          </Text>
          <Flex direction="column" gap="2">
            <label style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
              <Text size="2">Two-factor authentication</Text>
              <Switch color="red" checked />
            </label>
            <label style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
              <Text size="2">Login notifications</Text>
              <Switch color="purple" checked />
            </label>
            <label style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer"
          }}>
              <Text size="2">Session timeout</Text>
              <Switch color="cyan" />
            </label>
          </Flex>
        </div>
      </Flex>
    </div>
}`,
        ...(_fa = (_ea = O.parameters) == null ? void 0 : _ea.docs) == null ? void 0 : _fa.source
      }
    }
  };
  Te = [
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
    "AllStates",
    "SettingsExample",
    "PrivacyExample"
  ];
});
export {
  N as AllSizes,
  A as AllStates,
  R as AllVariants,
  I as Checked,
  v as Classic,
  _ as ColorBlue,
  D as ColorGreen,
  B as ColorPurple,
  P as ColorRed,
  b as Default,
  k as Disabled,
  T as DisabledChecked,
  F as HighContrast,
  O as PrivacyExample,
  E as SettingsExample,
  S as Size1,
  j as Size2,
  w as Size3,
  C as Soft,
  z as Surface,
  Te as __namedExportsOrder,
  __tla,
  ke as default
};
