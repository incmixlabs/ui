import { c as q, r as u, d as ce, j as e, P as B, u as H, b as W, O as ue, k as xe, q as me, s as ge, t as fe, v as $, l as U, w as X, a as n, T as ye, F as c, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { c as Y, R as ve, I as Re, __tla as __tla_1 } from "./index-NEJkd5JU.js";
import { u as he, __tla as __tla_2 } from "./index-DfrOcl7X.js";
import { u as je, __tla as __tla_3 } from "./index-KgX6eUjc.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_4 } from "./index-D3rDgx3q.js";
import { __tla as __tla_5 } from "./index-CEOg2jVB.js";
let D, C, V, w, G, k, _, N, z, E, T, S, O, F, P, Ke, Ue;
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
  })(),
  (() => {
    try {
      return __tla_5;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S;
  var K = "Radio", [be, J] = q(K), [Ie, Ge] = be(K), Q = u.forwardRef((a, d) => {
    const { __scopeRadio: t, name: p, checked: s = false, required: i, disabled: r, value: x = "on", onCheck: g, form: f, ...R } = a, [v, h] = u.useState(null), m = H(d, (b) => h(b)), y = u.useRef(false), j = v ? f || !!v.closest("form") : true;
    return e.jsxs(Ie, {
      scope: t,
      checked: s,
      disabled: r,
      children: [
        e.jsx(B.button, {
          type: "button",
          role: "radio",
          "aria-checked": s,
          "data-state": ae(s),
          "data-disabled": r ? "" : void 0,
          disabled: r,
          value: x,
          ...R,
          ref: m,
          onClick: W(a.onClick, (b) => {
            s || (g == null ? void 0 : g()), j && (y.current = b.isPropagationStopped(), y.current || b.stopPropagation());
          })
        }),
        j && e.jsx(ne, {
          control: v,
          bubbles: !y.current,
          name: p,
          value: x,
          checked: s,
          required: i,
          disabled: r,
          form: f,
          style: {
            transform: "translateX(-100%)"
          }
        })
      ]
    });
  });
  Q.displayName = K;
  var Z = "RadioIndicator", ee = u.forwardRef((a, d) => {
    const { __scopeRadio: t, forceMount: p, ...s } = a, i = Ge(Z, t);
    return e.jsx(xe, {
      present: p || i.checked,
      children: e.jsx(B.span, {
        "data-state": ae(i.checked),
        "data-disabled": i.disabled ? "" : void 0,
        ...s,
        ref: d
      })
    });
  });
  ee.displayName = Z;
  var ze = "RadioBubbleInput", ne = u.forwardRef(({ __scopeRadio: a, control: d, checked: t, bubbles: p = true, ...s }, i) => {
    const r = u.useRef(null), x = H(r, i), g = je(t), f = ue(d);
    return u.useEffect(() => {
      const R = r.current;
      if (!R) return;
      const v = window.HTMLInputElement.prototype, m = Object.getOwnPropertyDescriptor(v, "checked").set;
      if (g !== t && m) {
        const y = new Event("click", {
          bubbles: p
        });
        m.call(R, t), R.dispatchEvent(y);
      }
    }, [
      g,
      t,
      p
    ]), e.jsx(B.input, {
      type: "radio",
      "aria-hidden": true,
      defaultChecked: t,
      ...s,
      tabIndex: -1,
      ref: x,
      style: {
        ...s.style,
        ...f,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0
      }
    });
  });
  ne.displayName = ze;
  function ae(a) {
    return a ? "checked" : "unchecked";
  }
  var Te = [
    "ArrowUp",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight"
  ], A = "RadioGroup", [Se, Oe] = q(A, [
    Y,
    J
  ]), oe = Y(), te = J(), [Ce, Pe] = Se(A), se = u.forwardRef((a, d) => {
    const { __scopeRadioGroup: t, name: p, defaultValue: s, value: i, required: r = false, disabled: x = false, orientation: g, dir: f, loop: R = true, onValueChange: v, ...h } = a, m = oe(t), y = ce(f), [j, b] = he({
      prop: i,
      defaultProp: s ?? null,
      onChange: v,
      caller: A
    });
    return e.jsx(Ce, {
      scope: t,
      name: p,
      required: r,
      disabled: x,
      value: j,
      onValueChange: b,
      children: e.jsx(ve, {
        asChild: true,
        ...m,
        orientation: g,
        dir: y,
        loop: R,
        children: e.jsx(B.div, {
          role: "radiogroup",
          "aria-required": r,
          "aria-orientation": g,
          "data-disabled": x ? "" : void 0,
          dir: y,
          ...h,
          ref: d
        })
      })
    });
  });
  se.displayName = A;
  var ie = "RadioGroupItem", re = u.forwardRef((a, d) => {
    const { __scopeRadioGroup: t, disabled: p, ...s } = a, i = Pe(ie, t), r = i.disabled || p, x = oe(t), g = te(t), f = u.useRef(null), R = H(d, f), v = i.value === s.value, h = u.useRef(false);
    return u.useEffect(() => {
      const m = (j) => {
        Te.includes(j.key) && (h.current = true);
      }, y = () => h.current = false;
      return document.addEventListener("keydown", m), document.addEventListener("keyup", y), () => {
        document.removeEventListener("keydown", m), document.removeEventListener("keyup", y);
      };
    }, []), e.jsx(Re, {
      asChild: true,
      ...x,
      focusable: !r,
      active: v,
      children: e.jsx(Q, {
        disabled: r,
        required: i.required,
        checked: v,
        ...g,
        ...s,
        name: i.name,
        ref: R,
        onCheck: () => i.onValueChange(s.value),
        onKeyDown: W((m) => {
          m.key === "Enter" && m.preventDefault();
        }),
        onFocus: W(s.onFocus, () => {
          var _a2;
          h.current && ((_a2 = f.current) == null ? void 0 : _a2.click());
        })
      })
    });
  });
  re.displayName = ie;
  var Fe = "RadioGroupIndicator", Ve = u.forwardRef((a, d) => {
    const { __scopeRadioGroup: t, ...p } = a, s = te(t);
    return e.jsx(ee, {
      ...s,
      ...p,
      ref: d
    });
  });
  Ve.displayName = Fe;
  var we = se, ke = re;
  const Ne = [
    "1",
    "2",
    "3"
  ], De = [
    "classic",
    "surface",
    "soft"
  ], I = {
    ...fe,
    size: {
      type: "enum",
      className: "rt-r-size",
      values: Ne,
      default: "2",
      responsive: true
    },
    variant: {
      type: "enum",
      className: "rt-variant",
      values: De,
      default: "surface"
    },
    ...ge,
    ...me
  }, le = "RadioGroup", M = {
    Root: we,
    createRadioGroupScope: Oe,
    Item: ke
  }, [_e] = q(le, [
    M.createRadioGroupScope
  ]), pe = M.createRadioGroupScope(), [Ee, de] = _e(le), l = u.forwardRef(({ color: a = I.color.default, highContrast: d = I.highContrast.default, size: t = I.size.default, variant: p = I.variant.default, ...s }, i) => {
    const { __scopeRadioGroup: r, className: x, ...g } = $(s, X), f = pe(r);
    return e.jsx(Ee, {
      scope: r,
      color: a,
      highContrast: d,
      size: t,
      variant: p,
      children: e.jsx(M.Root, {
        ...f,
        ...g,
        ref: i,
        className: U("rt-RadioGroupRoot", x)
      })
    });
  });
  l.displayName = "RadioGroup.Root";
  const o = u.forwardRef((a, d) => {
    const { __scopeRadioGroup: t, children: p, className: s, style: i, ...r } = a, { size: x } = de("RadioGroupItem", t);
    return p ? e.jsxs(n, {
      as: "label",
      size: x,
      className: U("rt-RadioGroupItem", s),
      style: i,
      children: [
        e.jsx(L, {
          __scopeRadioGroup: t,
          ...r,
          ref: d
        }),
        p && e.jsx("span", {
          className: "rt-RadioGroupItemInner",
          children: p
        })
      ]
    }) : e.jsx(L, {
      __scopeRadioGroup: t,
      ...r,
      ref: d,
      className: s,
      style: i
    });
  });
  o.displayName = "RadioGroup.Item";
  const L = u.forwardRef(({ __scopeRadioGroup: a, ...d }, t) => {
    const p = de("RadioGroupItemRadio", a), s = pe(a), { color: i, className: r } = $({
      ...d,
      ...p
    }, I, X);
    return e.jsx(M.Item, {
      ...s,
      "data-accent-color": i,
      ...d,
      asChild: false,
      ref: t,
      className: U("rt-reset", "rt-BaseRadioRoot", r)
    });
  });
  L.displayName = "RadioGroup.ItemRadio";
  l.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "RadioGroup.Root",
    props: {
      __scopeRadioGroup: {
        required: false,
        tsType: {
          name: "Context.Scope"
        },
        description: ""
      },
      color: {
        defaultValue: {
          value: "radioGroupRootPropDefs.color.default",
          computed: true
        },
        required: false
      },
      highContrast: {
        defaultValue: {
          value: "radioGroupRootPropDefs.highContrast.default",
          computed: true
        },
        required: false
      },
      size: {
        defaultValue: {
          value: "radioGroupRootPropDefs.size.default",
          computed: true
        },
        required: false
      },
      variant: {
        defaultValue: {
          value: "radioGroupRootPropDefs.variant.default",
          computed: true
        },
        required: false
      }
    },
    composes: [
      "ComponentPropsWithout"
    ]
  };
  o.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "RadioGroup.Item",
    props: {
      __scopeRadioGroup: {
        required: false,
        tsType: {
          name: "Context.Scope"
        },
        description: ""
      }
    },
    composes: [
      "ComponentPropsWithout"
    ]
  };
  Ue = {
    title: "Base/RadioGroup",
    component: l,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (a) => e.jsx(ye, {
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
        description: "Radio group size"
      },
      variant: {
        control: "select",
        options: [
          "classic",
          "surface",
          "soft"
        ],
        description: "Radio group variant style"
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
        description: "Radio group accent color"
      },
      highContrast: {
        control: "boolean",
        description: "High contrast mode"
      },
      disabled: {
        control: "boolean",
        description: "Disabled state"
      },
      orientation: {
        control: "select",
        options: [
          "horizontal",
          "vertical"
        ],
        description: "Layout orientation"
      }
    },
    args: {
      size: "2",
      variant: "surface",
      orientation: "vertical"
    }
  };
  G = {
    render: (a) => e.jsx(l, {
      ...a,
      defaultValue: "option1",
      children: e.jsxs(c, {
        direction: "column",
        gap: "2",
        children: [
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option1"
              }),
              "Option 1"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option2"
              }),
              "Option 2"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option3"
              }),
              "Option 3"
            ]
          })
        ]
      })
    })
  };
  z = {
    render: (a) => e.jsx(l, {
      ...a,
      orientation: "horizontal",
      defaultValue: "option1",
      children: e.jsxs(c, {
        gap: "4",
        align: "center",
        children: [
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option1"
              }),
              "Option 1"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option2"
              }),
              "Option 2"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option3"
              }),
              "Option 3"
            ]
          })
        ]
      })
    })
  };
  T = {
    render: (a) => e.jsx(l, {
      ...a,
      size: "1",
      defaultValue: "option1",
      children: e.jsxs(c, {
        direction: "column",
        gap: "2",
        children: [
          e.jsxs(n, {
            as: "label",
            size: "1",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "6px"
            },
            children: [
              e.jsx(o, {
                value: "option1"
              }),
              "Small Option 1"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "1",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "6px"
            },
            children: [
              e.jsx(o, {
                value: "option2"
              }),
              "Small Option 2"
            ]
          })
        ]
      })
    })
  };
  S = {
    render: (a) => e.jsx(l, {
      ...a,
      size: "2",
      defaultValue: "option1",
      children: e.jsxs(c, {
        direction: "column",
        gap: "2",
        children: [
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option1"
              }),
              "Medium Option 1"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option2"
              }),
              "Medium Option 2"
            ]
          })
        ]
      })
    })
  };
  O = {
    render: (a) => e.jsx(l, {
      ...a,
      size: "3",
      defaultValue: "option1",
      children: e.jsxs(c, {
        direction: "column",
        gap: "3",
        children: [
          e.jsxs(n, {
            as: "label",
            size: "3",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "10px"
            },
            children: [
              e.jsx(o, {
                value: "option1"
              }),
              "Large Option 1"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "3",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "10px"
            },
            children: [
              e.jsx(o, {
                value: "option2"
              }),
              "Large Option 2"
            ]
          })
        ]
      })
    })
  };
  C = {
    render: (a) => e.jsx(l, {
      ...a,
      variant: "classic",
      defaultValue: "option1",
      children: e.jsxs(c, {
        direction: "column",
        gap: "2",
        children: [
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option1"
              }),
              "Classic Option 1"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option2"
              }),
              "Classic Option 2"
            ]
          })
        ]
      })
    })
  };
  P = {
    render: (a) => e.jsx(l, {
      ...a,
      variant: "surface",
      defaultValue: "option1",
      children: e.jsxs(c, {
        direction: "column",
        gap: "2",
        children: [
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option1"
              }),
              "Surface Option 1"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option2"
              }),
              "Surface Option 2"
            ]
          })
        ]
      })
    })
  };
  F = {
    render: (a) => e.jsx(l, {
      ...a,
      variant: "soft",
      defaultValue: "option1",
      children: e.jsxs(c, {
        direction: "column",
        gap: "2",
        children: [
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option1"
              }),
              "Soft Option 1"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option2"
              }),
              "Soft Option 2"
            ]
          })
        ]
      })
    })
  };
  V = {
    render: (a) => e.jsx(l, {
      ...a,
      color: "blue",
      defaultValue: "option1",
      children: e.jsxs(c, {
        direction: "column",
        gap: "2",
        children: [
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option1"
              }),
              "Blue Option 1"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option2"
              }),
              "Blue Option 2"
            ]
          })
        ]
      })
    })
  };
  w = {
    render: (a) => e.jsx(l, {
      ...a,
      color: "green",
      defaultValue: "option1",
      children: e.jsxs(c, {
        direction: "column",
        gap: "2",
        children: [
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option1"
              }),
              "Green Option 1"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option2"
              }),
              "Green Option 2"
            ]
          })
        ]
      })
    })
  };
  k = {
    render: (a) => e.jsx(l, {
      ...a,
      disabled: true,
      defaultValue: "option1",
      children: e.jsxs(c, {
        direction: "column",
        gap: "2",
        children: [
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: 0.6
            },
            children: [
              e.jsx(o, {
                value: "option1"
              }),
              "Disabled Option 1"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px",
              opacity: 0.6
            },
            children: [
              e.jsx(o, {
                value: "option2"
              }),
              "Disabled Option 2"
            ]
          })
        ]
      })
    })
  };
  N = {
    render: (a) => e.jsx(l, {
      ...a,
      highContrast: true,
      defaultValue: "option1",
      children: e.jsxs(c, {
        direction: "column",
        gap: "2",
        children: [
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option1"
              }),
              "High Contrast Option 1"
            ]
          }),
          e.jsxs(n, {
            as: "label",
            size: "2",
            style: {
              display: "flex",
              alignItems: "center",
              gap: "8px"
            },
            children: [
              e.jsx(o, {
                value: "option2"
              }),
              "High Contrast Option 2"
            ]
          })
        ]
      })
    })
  };
  D = {
    render: () => e.jsxs(c, {
      direction: "column",
      gap: "4",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "2",
              weight: "bold",
              style: {
                marginBottom: "8px"
              },
              children: "Classic"
            }),
            e.jsx(l, {
              variant: "classic",
              defaultValue: "classic1",
              children: e.jsx(c, {
                direction: "column",
                gap: "1",
                children: e.jsxs(n, {
                  as: "label",
                  size: "2",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  },
                  children: [
                    e.jsx(o, {
                      value: "classic1"
                    }),
                    "Classic Option"
                  ]
                })
              })
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "2",
              weight: "bold",
              style: {
                marginBottom: "8px"
              },
              children: "Surface"
            }),
            e.jsx(l, {
              variant: "surface",
              defaultValue: "surface1",
              children: e.jsx(c, {
                direction: "column",
                gap: "1",
                children: e.jsxs(n, {
                  as: "label",
                  size: "2",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  },
                  children: [
                    e.jsx(o, {
                      value: "surface1"
                    }),
                    "Surface Option"
                  ]
                })
              })
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "2",
              weight: "bold",
              style: {
                marginBottom: "8px"
              },
              children: "Soft"
            }),
            e.jsx(l, {
              variant: "soft",
              defaultValue: "soft1",
              children: e.jsx(c, {
                direction: "column",
                gap: "1",
                children: e.jsxs(n, {
                  as: "label",
                  size: "2",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  },
                  children: [
                    e.jsx(o, {
                      value: "soft1"
                    }),
                    "Soft Option"
                  ]
                })
              })
            })
          ]
        })
      ]
    })
  };
  _ = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "400px"
      },
      children: [
        e.jsx(n, {
          size: "4",
          weight: "bold",
          style: {
            marginBottom: "16px"
          },
          children: "Notification Preferences"
        }),
        e.jsxs("div", {
          style: {
            marginBottom: "24px"
          },
          children: [
            e.jsx(n, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "8px"
              },
              children: "Email Notifications"
            }),
            e.jsx(l, {
              defaultValue: "daily",
              name: "email",
              children: e.jsxs(c, {
                direction: "column",
                gap: "2",
                children: [
                  e.jsxs(n, {
                    as: "label",
                    size: "2",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    },
                    children: [
                      e.jsx(o, {
                        value: "immediate"
                      }),
                      "Immediate - Get notified instantly"
                    ]
                  }),
                  e.jsxs(n, {
                    as: "label",
                    size: "2",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    },
                    children: [
                      e.jsx(o, {
                        value: "daily"
                      }),
                      "Daily - Once per day digest"
                    ]
                  }),
                  e.jsxs(n, {
                    as: "label",
                    size: "2",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    },
                    children: [
                      e.jsx(o, {
                        value: "weekly"
                      }),
                      "Weekly - Weekly summary"
                    ]
                  }),
                  e.jsxs(n, {
                    as: "label",
                    size: "2",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    },
                    children: [
                      e.jsx(o, {
                        value: "never"
                      }),
                      "Never - No email notifications"
                    ]
                  })
                ]
              })
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "8px"
              },
              children: "Theme Preference"
            }),
            e.jsx(l, {
              defaultValue: "system",
              name: "theme",
              color: "purple",
              children: e.jsxs(c, {
                direction: "column",
                gap: "2",
                children: [
                  e.jsxs(n, {
                    as: "label",
                    size: "2",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    },
                    children: [
                      e.jsx(o, {
                        value: "light"
                      }),
                      "Light mode"
                    ]
                  }),
                  e.jsxs(n, {
                    as: "label",
                    size: "2",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    },
                    children: [
                      e.jsx(o, {
                        value: "dark"
                      }),
                      "Dark mode"
                    ]
                  }),
                  e.jsxs(n, {
                    as: "label",
                    size: "2",
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "8px"
                    },
                    children: [
                      e.jsx(o, {
                        value: "system"
                      }),
                      "System preference"
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
  E = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "350px"
      },
      children: [
        e.jsx(n, {
          size: "3",
          weight: "bold",
          style: {
            marginBottom: "16px"
          },
          children: "Payment Method"
        }),
        e.jsx(l, {
          defaultValue: "card",
          variant: "surface",
          children: e.jsxs(c, {
            direction: "column",
            gap: "2",
            children: [
              e.jsx("div", {
                style: {
                  padding: "12px",
                  border: "1px solid #e1e5e9",
                  borderRadius: "8px",
                  backgroundColor: "#fafbfc"
                },
                children: e.jsxs(n, {
                  as: "label",
                  size: "2",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer"
                  },
                  children: [
                    e.jsx(o, {
                      value: "card"
                    }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("div", {
                          style: {
                            fontWeight: "bold"
                          },
                          children: "Credit Card"
                        }),
                        e.jsx("div", {
                          style: {
                            fontSize: "13px",
                            color: "#666",
                            marginTop: "2px"
                          },
                          children: "Visa, Mastercard, American Express"
                        })
                      ]
                    })
                  ]
                })
              }),
              e.jsx("div", {
                style: {
                  padding: "12px",
                  border: "1px solid #e1e5e9",
                  borderRadius: "8px"
                },
                children: e.jsxs(n, {
                  as: "label",
                  size: "2",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer"
                  },
                  children: [
                    e.jsx(o, {
                      value: "paypal"
                    }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("div", {
                          style: {
                            fontWeight: "bold"
                          },
                          children: "PayPal"
                        }),
                        e.jsx("div", {
                          style: {
                            fontSize: "13px",
                            color: "#666",
                            marginTop: "2px"
                          },
                          children: "Pay with your PayPal account"
                        })
                      ]
                    })
                  ]
                })
              }),
              e.jsx("div", {
                style: {
                  padding: "12px",
                  border: "1px solid #e1e5e9",
                  borderRadius: "8px"
                },
                children: e.jsxs(n, {
                  as: "label",
                  size: "2",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer"
                  },
                  children: [
                    e.jsx(o, {
                      value: "bank"
                    }),
                    e.jsxs("div", {
                      children: [
                        e.jsx("div", {
                          style: {
                            fontWeight: "bold"
                          },
                          children: "Bank Transfer"
                        }),
                        e.jsx("div", {
                          style: {
                            fontSize: "13px",
                            color: "#666",
                            marginTop: "2px"
                          },
                          children: "Direct bank account transfer"
                        })
                      ]
                    })
                  ]
                })
              })
            ]
          })
        })
      ]
    })
  };
  G.parameters = {
    ...G.parameters,
    docs: {
      ...(_a = G.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => <RadioGroup.Root {...args} defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Option 2
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option3" />
          Option 3
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,
        ...(_c = (_b = G.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_d = z.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: args => <RadioGroup.Root {...args} orientation="horizontal" defaultValue="option1">
      <Flex gap="4" align="center">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Option 2
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option3" />
          Option 3
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,
        ...(_f = (_e2 = z.parameters) == null ? void 0 : _e2.docs) == null ? void 0 : _f.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_g = T.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: args => <RadioGroup.Root {...args} size="1" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="1" style={{
        display: "flex",
        alignItems: "center",
        gap: "6px"
      }}>
          <RadioGroup.Item value="option1" />
          Small Option 1
        </Text>
        <Text as="label" size="1" style={{
        display: "flex",
        alignItems: "center",
        gap: "6px"
      }}>
          <RadioGroup.Item value="option2" />
          Small Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,
        ...(_i = (_h = T.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_j = S.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: args => <RadioGroup.Root {...args} size="2" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Medium Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Medium Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,
        ...(_l = (_k = S.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  O.parameters = {
    ...O.parameters,
    docs: {
      ...(_m = O.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: args => <RadioGroup.Root {...args} size="3" defaultValue="option1">
      <Flex direction="column" gap="3">
        <Text as="label" size="3" style={{
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
          <RadioGroup.Item value="option1" />
          Large Option 1
        </Text>
        <Text as="label" size="3" style={{
        display: "flex",
        alignItems: "center",
        gap: "10px"
      }}>
          <RadioGroup.Item value="option2" />
          Large Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,
        ...(_o = (_n = O.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_p = C.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: args => <RadioGroup.Root {...args} variant="classic" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Classic Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Classic Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,
        ...(_r = (_q = C.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  P.parameters = {
    ...P.parameters,
    docs: {
      ...(_s = P.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: args => <RadioGroup.Root {...args} variant="surface" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Surface Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Surface Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,
        ...(_u = (_t = P.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  F.parameters = {
    ...F.parameters,
    docs: {
      ...(_v = F.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: args => <RadioGroup.Root {...args} variant="soft" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Soft Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Soft Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,
        ...(_x = (_w = F.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  V.parameters = {
    ...V.parameters,
    docs: {
      ...(_y = V.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: args => <RadioGroup.Root {...args} color="blue" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Blue Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Blue Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,
        ...(_A = (_z = V.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_B = w.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: args => <RadioGroup.Root {...args} color="green" defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          Green Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          Green Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,
        ...(_D = (_C = w.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_E = k.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: args => <RadioGroup.Root {...args} disabled defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: 0.6
      }}>
          <RadioGroup.Item value="option1" />
          Disabled Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        opacity: 0.6
      }}>
          <RadioGroup.Item value="option2" />
          Disabled Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,
        ...(_G = (_F = k.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  N.parameters = {
    ...N.parameters,
    docs: {
      ...(_H = N.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: args => <RadioGroup.Root {...args} highContrast defaultValue="option1">
      <Flex direction="column" gap="2">
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option1" />
          High Contrast Option 1
        </Text>
        <Text as="label" size="2" style={{
        display: "flex",
        alignItems: "center",
        gap: "8px"
      }}>
          <RadioGroup.Item value="option2" />
          High Contrast Option 2
        </Text>
      </Flex>
    </RadioGroup.Root>
}`,
        ...(_J = (_I = N.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  D.parameters = {
    ...D.parameters,
    docs: {
      ...(_K = D.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" weight="bold" style={{
        marginBottom: "8px"
      }}>
          Classic
        </Text>
        <RadioGroup.Root variant="classic" defaultValue="classic1">
          <Flex direction="column" gap="1">
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="classic1" />
              Classic Option
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>
      <div>
        <Text size="2" weight="bold" style={{
        marginBottom: "8px"
      }}>
          Surface
        </Text>
        <RadioGroup.Root variant="surface" defaultValue="surface1">
          <Flex direction="column" gap="1">
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="surface1" />
              Surface Option
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>
      <div>
        <Text size="2" weight="bold" style={{
        marginBottom: "8px"
      }}>
          Soft
        </Text>
        <RadioGroup.Root variant="soft" defaultValue="soft1">
          <Flex direction="column" gap="1">
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="soft1" />
              Soft Option
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>
    </Flex>
}`,
        ...(_M = (_L = D.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  _.parameters = {
    ..._.parameters,
    docs: {
      ...(_N = _.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "400px"
  }}>
      <Text size="4" weight="bold" style={{
      marginBottom: "16px"
    }}>
        Notification Preferences
      </Text>

      <div style={{
      marginBottom: "24px"
    }}>
        <Text size="2" weight="medium" style={{
        marginBottom: "8px"
      }}>
          Email Notifications
        </Text>
        <RadioGroup.Root defaultValue="daily" name="email">
          <Flex direction="column" gap="2">
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="immediate" />
              Immediate - Get notified instantly
            </Text>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="daily" />
              Daily - Once per day digest
            </Text>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="weekly" />
              Weekly - Weekly summary
            </Text>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="never" />
              Never - No email notifications
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>

      <div>
        <Text size="2" weight="medium" style={{
        marginBottom: "8px"
      }}>
          Theme Preference
        </Text>
        <RadioGroup.Root defaultValue="system" name="theme" color="purple">
          <Flex direction="column" gap="2">
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="light" />
              Light mode
            </Text>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="dark" />
              Dark mode
            </Text>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px"
          }}>
              <RadioGroup.Item value="system" />
              System preference
            </Text>
          </Flex>
        </RadioGroup.Root>
      </div>
    </div>
}`,
        ...(_P = (_O = _.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  E.parameters = {
    ...E.parameters,
    docs: {
      ...(_Q = E.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "350px"
  }}>
      <Text size="3" weight="bold" style={{
      marginBottom: "16px"
    }}>
        Payment Method
      </Text>
      <RadioGroup.Root defaultValue="card" variant="surface">
        <Flex direction="column" gap="2">
          <div style={{
          padding: "12px",
          border: "1px solid #e1e5e9",
          borderRadius: "8px",
          backgroundColor: "#fafbfc"
        }}>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer"
          }}>
              <RadioGroup.Item value="card" />
              <div>
                <div style={{
                fontWeight: "bold"
              }}>Credit Card</div>
                <div style={{
                fontSize: "13px",
                color: "#666",
                marginTop: "2px"
              }}>
                  Visa, Mastercard, American Express
                </div>
              </div>
            </Text>
          </div>

          <div style={{
          padding: "12px",
          border: "1px solid #e1e5e9",
          borderRadius: "8px"
        }}>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer"
          }}>
              <RadioGroup.Item value="paypal" />
              <div>
                <div style={{
                fontWeight: "bold"
              }}>PayPal</div>
                <div style={{
                fontSize: "13px",
                color: "#666",
                marginTop: "2px"
              }}>
                  Pay with your PayPal account
                </div>
              </div>
            </Text>
          </div>

          <div style={{
          padding: "12px",
          border: "1px solid #e1e5e9",
          borderRadius: "8px"
        }}>
            <Text as="label" size="2" style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer"
          }}>
              <RadioGroup.Item value="bank" />
              <div>
                <div style={{
                fontWeight: "bold"
              }}>Bank Transfer</div>
                <div style={{
                fontSize: "13px",
                color: "#666",
                marginTop: "2px"
              }}>
                  Direct bank account transfer
                </div>
              </div>
            </Text>
          </div>
        </Flex>
      </RadioGroup.Root>
    </div>
}`,
        ...(_S = (_R = E.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  Ke = [
    "Default",
    "Horizontal",
    "Size1",
    "Size2",
    "Size3",
    "Classic",
    "Surface",
    "Soft",
    "ColorBlue",
    "ColorGreen",
    "Disabled",
    "HighContrast",
    "AllVariants",
    "FormExample",
    "PaymentMethodExample"
  ];
});
export {
  D as AllVariants,
  C as Classic,
  V as ColorBlue,
  w as ColorGreen,
  G as Default,
  k as Disabled,
  _ as FormExample,
  N as HighContrast,
  z as Horizontal,
  E as PaymentMethodExample,
  T as Size1,
  S as Size2,
  O as Size3,
  F as Soft,
  P as Surface,
  Ke as __namedExportsOrder,
  __tla,
  Ue as default
};
