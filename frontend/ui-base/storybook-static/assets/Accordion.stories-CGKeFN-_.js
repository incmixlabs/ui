import { c as z, r as h, j as e, k as ve, P as C, b as J, u as X, h as we, f as p, d as je, T as Ce, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { c as Ie, __tla as __tla_1 } from "./index-D3rDgx3q.js";
import { u as q, __tla as __tla_2 } from "./index-DfrOcl7X.js";
import { u as Z, __tla as __tla_3 } from "./index-CEOg2jVB.js";
import { c as $ } from "./utils-CBfrqCZ4.js";
import { C as Ne, __tla as __tla_4 } from "./chevron-down-2X_Paxnn.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_5 } from "./createLucideIcon-BUkpxZyj.js";
let N, k, P, E, R, S, T, to, no;
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
  var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
  var D = "Collapsible", [Te, ee] = z(D), [Re, F] = Te(D), oe = h.forwardRef((n, s) => {
    const { __scopeCollapsible: t, open: i, defaultOpen: a, disabled: r, onOpenChange: c, ...d } = n, [m, u] = q({
      prop: i,
      defaultProp: a ?? false,
      onChange: c,
      caller: D
    });
    return e.jsx(Re, {
      scope: t,
      disabled: r,
      contentId: Z(),
      open: m,
      onOpenToggle: h.useCallback(() => u((g) => !g), [
        u
      ]),
      children: e.jsx(C.div, {
        "data-state": U(m),
        "data-disabled": r ? "" : void 0,
        ...d,
        ref: s
      })
    });
  });
  oe.displayName = D;
  var ne = "CollapsibleTrigger", te = h.forwardRef((n, s) => {
    const { __scopeCollapsible: t, ...i } = n, a = F(ne, t);
    return e.jsx(C.button, {
      type: "button",
      "aria-controls": a.contentId,
      "aria-expanded": a.open || false,
      "data-state": U(a.open),
      "data-disabled": a.disabled ? "" : void 0,
      disabled: a.disabled,
      ...i,
      ref: s,
      onClick: J(n.onClick, a.onOpenToggle)
    });
  });
  te.displayName = ne;
  var G = "CollapsibleContent", re = h.forwardRef((n, s) => {
    const { forceMount: t, ...i } = n, a = F(G, n.__scopeCollapsible);
    return e.jsx(ve, {
      present: t || a.open,
      children: ({ present: r }) => e.jsx(ke, {
        ...i,
        ref: s,
        present: r
      })
    });
  });
  re.displayName = G;
  var ke = h.forwardRef((n, s) => {
    const { __scopeCollapsible: t, present: i, children: a, ...r } = n, c = F(G, t), [d, m] = h.useState(i), u = h.useRef(null), g = X(s, u), f = h.useRef(0), w = f.current, y = h.useRef(0), I = y.current, b = c.open || d, A = h.useRef(b), v = h.useRef(void 0);
    return h.useEffect(() => {
      const l = requestAnimationFrame(() => A.current = false);
      return () => cancelAnimationFrame(l);
    }, []), we(() => {
      const l = u.current;
      if (l) {
        v.current = v.current || {
          transitionDuration: l.style.transitionDuration,
          animationName: l.style.animationName
        }, l.style.transitionDuration = "0s", l.style.animationName = "none";
        const j = l.getBoundingClientRect();
        f.current = j.height, y.current = j.width, A.current || (l.style.transitionDuration = v.current.transitionDuration, l.style.animationName = v.current.animationName), m(i);
      }
    }, [
      c.open,
      i
    ]), e.jsx(C.div, {
      "data-state": U(c.open),
      "data-disabled": c.disabled ? "" : void 0,
      id: c.contentId,
      hidden: !b,
      ...r,
      ref: g,
      style: {
        "--radix-collapsible-content-height": w ? `${w}px` : void 0,
        "--radix-collapsible-content-width": I ? `${I}px` : void 0,
        ...n.style
      },
      children: b && a
    });
  });
  function U(n) {
    return n ? "open" : "closed";
  }
  var Pe = oe, Se = te, Ee = re, x = "Accordion", _e = [
    "Home",
    "End",
    "ArrowDown",
    "ArrowUp",
    "ArrowLeft",
    "ArrowRight"
  ], [B, De, Me] = Ie(x), [M, oo] = z(x, [
    Me,
    ee
  ]), K = ee(), se = p.forwardRef((n, s) => {
    const { type: t, ...i } = n, a = i, r = i;
    return e.jsx(B.Provider, {
      scope: n.__scopeAccordion,
      children: t === "multiple" ? e.jsx(He, {
        ...r,
        ref: s
      }) : e.jsx(Ye, {
        ...a,
        ref: s
      })
    });
  });
  se.displayName = x;
  var [ie, We] = M(x), [ae, Oe] = M(x, {
    collapsible: false
  }), Ye = p.forwardRef((n, s) => {
    const { value: t, defaultValue: i, onValueChange: a = () => {
    }, collapsible: r = false, ...c } = n, [d, m] = q({
      prop: t,
      defaultProp: i ?? "",
      onChange: a,
      caller: x
    });
    return e.jsx(ie, {
      scope: n.__scopeAccordion,
      value: p.useMemo(() => d ? [
        d
      ] : [], [
        d
      ]),
      onItemOpen: m,
      onItemClose: p.useCallback(() => r && m(""), [
        r,
        m
      ]),
      children: e.jsx(ae, {
        scope: n.__scopeAccordion,
        collapsible: r,
        children: e.jsx(ce, {
          ...c,
          ref: s
        })
      })
    });
  }), He = p.forwardRef((n, s) => {
    const { value: t, defaultValue: i, onValueChange: a = () => {
    }, ...r } = n, [c, d] = q({
      prop: t,
      defaultProp: i ?? [],
      onChange: a,
      caller: x
    }), m = p.useCallback((g) => d((f = []) => [
      ...f,
      g
    ]), [
      d
    ]), u = p.useCallback((g) => d((f = []) => f.filter((w) => w !== g)), [
      d
    ]);
    return e.jsx(ie, {
      scope: n.__scopeAccordion,
      value: c,
      onItemOpen: m,
      onItemClose: u,
      children: e.jsx(ae, {
        scope: n.__scopeAccordion,
        collapsible: true,
        children: e.jsx(ce, {
          ...r,
          ref: s
        })
      })
    });
  }), [Le, W] = M(x), ce = p.forwardRef((n, s) => {
    const { __scopeAccordion: t, disabled: i, dir: a, orientation: r = "vertical", ...c } = n, d = p.useRef(null), m = X(d, s), u = De(t), f = je(a) === "ltr", w = J(n.onKeyDown, (y) => {
      var _a2;
      if (!_e.includes(y.key)) return;
      const I = y.target, b = u().filter((L) => {
        var _a3;
        return !((_a3 = L.ref.current) == null ? void 0 : _a3.disabled);
      }), A = b.findIndex((L) => L.ref.current === I), v = b.length;
      if (A === -1) return;
      y.preventDefault();
      let l = A;
      const j = 0, O = v - 1, Y = () => {
        l = A + 1, l > O && (l = j);
      }, H = () => {
        l = A - 1, l < j && (l = O);
      };
      switch (y.key) {
        case "Home":
          l = j;
          break;
        case "End":
          l = O;
          break;
        case "ArrowRight":
          r === "horizontal" && (f ? Y() : H());
          break;
        case "ArrowDown":
          r === "vertical" && Y();
          break;
        case "ArrowLeft":
          r === "horizontal" && (f ? H() : Y());
          break;
        case "ArrowUp":
          r === "vertical" && H();
          break;
      }
      const Ae = l % v;
      (_a2 = b[Ae].ref.current) == null ? void 0 : _a2.focus();
    });
    return e.jsx(Le, {
      scope: t,
      disabled: i,
      direction: a,
      orientation: r,
      children: e.jsx(B.Slot, {
        scope: t,
        children: e.jsx(C.div, {
          ...c,
          "data-orientation": r,
          ref: m,
          onKeyDown: i ? void 0 : w
        })
      })
    });
  }), _ = "AccordionItem", [Ve, Q] = M(_), le = p.forwardRef((n, s) => {
    const { __scopeAccordion: t, value: i, ...a } = n, r = W(_, t), c = We(_, t), d = K(t), m = Z(), u = i && c.value.includes(i) || false, g = r.disabled || n.disabled;
    return e.jsx(Ve, {
      scope: t,
      open: u,
      disabled: g,
      triggerId: m,
      children: e.jsx(Pe, {
        "data-orientation": r.orientation,
        "data-state": ge(u),
        ...d,
        ...a,
        ref: s,
        disabled: g,
        open: u,
        onOpenChange: (f) => {
          f ? c.onItemOpen(i) : c.onItemClose(i);
        }
      })
    });
  });
  le.displayName = _;
  var de = "AccordionHeader", me = p.forwardRef((n, s) => {
    const { __scopeAccordion: t, ...i } = n, a = W(x, t), r = Q(de, t);
    return e.jsx(C.h3, {
      "data-orientation": a.orientation,
      "data-state": ge(r.open),
      "data-disabled": r.disabled ? "" : void 0,
      ...i,
      ref: s
    });
  });
  me.displayName = de;
  var V = "AccordionTrigger", ue = p.forwardRef((n, s) => {
    const { __scopeAccordion: t, ...i } = n, a = W(x, t), r = Q(V, t), c = Oe(V, t), d = K(t);
    return e.jsx(B.ItemSlot, {
      scope: t,
      children: e.jsx(Se, {
        "aria-disabled": r.open && !c.collapsible || void 0,
        "data-orientation": a.orientation,
        id: r.triggerId,
        ...d,
        ...i,
        ref: s
      })
    });
  });
  ue.displayName = V;
  var pe = "AccordionContent", he = p.forwardRef((n, s) => {
    const { __scopeAccordion: t, ...i } = n, a = W(x, t), r = Q(pe, t), c = K(t);
    return e.jsx(Ee, {
      role: "region",
      "aria-labelledby": r.triggerId,
      "data-orientation": a.orientation,
      ...c,
      ...i,
      ref: s,
      style: {
        "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
        "--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
        ...n.style
      }
    });
  });
  he.displayName = pe;
  function ge(n) {
    return n ? "open" : "closed";
  }
  var qe = se, $e = le, Fe = me, Ge = ue, Ue = he;
  function fe({ ...n }) {
    return e.jsx(qe, {
      "data-slot": "accordion",
      ...n
    });
  }
  function xe({ className: n, ...s }) {
    return e.jsx($e, {
      "data-slot": "accordion-item",
      className: $("border-b last:border-b-0", n),
      ...s
    });
  }
  function ye({ className: n, children: s, ...t }) {
    return e.jsx(Fe, {
      className: "flex",
      children: e.jsxs(Ge, {
        "data-slot": "accordion-trigger",
        className: $("flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-sm outline-none transition-all hover:underline focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", n),
        ...t,
        children: [
          s,
          e.jsx(Ne, {
            className: "pointer-events-none size-4 shrink-0 translate-y-0.5 text-muted-foreground transition-transform duration-200"
          })
        ]
      })
    });
  }
  function be({ className: n, children: s, ...t }) {
    return e.jsx(Ue, {
      "data-slot": "accordion-content",
      className: "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      ...t,
      children: e.jsx("div", {
        className: $("pt-0 pb-4", n),
        children: s
      })
    });
  }
  fe.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Accordion"
  };
  xe.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "AccordionItem"
  };
  ye.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "AccordionTrigger"
  };
  be.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "AccordionContent"
  };
  let o;
  o = {
    Root: fe,
    Item: xe,
    Trigger: ye,
    Content: be
  };
  no = {
    title: "Base/Accordion",
    component: o,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (n) => e.jsx(Ce, {
        children: e.jsx(n, {})
      })
    ],
    argTypes: {
      type: {
        control: "select",
        options: [
          "single",
          "multiple"
        ],
        description: "Accordion interaction type"
      },
      collapsible: {
        control: "boolean",
        description: "Whether items can be collapsed when type is single"
      },
      disabled: {
        control: "boolean",
        description: "Whether the entire accordion is disabled"
      }
    },
    args: {
      type: "single",
      collapsible: false
    }
  };
  N = {
    render: (n) => e.jsxs(o.Root, {
      ...n,
      className: "w-full max-w-md",
      children: [
        e.jsxs(o.Item, {
          value: "item-1",
          children: [
            e.jsx(o.Trigger, {
              children: "Is it accessible?"
            }),
            e.jsx(o.Content, {
              children: "Yes. It adheres to the WAI-ARIA design pattern and uses semantic HTML elements."
            })
          ]
        }),
        e.jsxs(o.Item, {
          value: "item-2",
          children: [
            e.jsx(o.Trigger, {
              children: "Is it styled?"
            }),
            e.jsx(o.Content, {
              children: "Yes. It comes with default styles that matches the other components aesthetic."
            })
          ]
        }),
        e.jsxs(o.Item, {
          value: "item-3",
          children: [
            e.jsx(o.Trigger, {
              children: "Is it animated?"
            }),
            e.jsx(o.Content, {
              children: "Yes. The accordion content smoothly expands and collapses with CSS animations."
            })
          ]
        })
      ]
    })
  };
  T = {
    args: {
      type: "single",
      collapsible: true
    },
    render: (n) => e.jsxs(o.Root, {
      ...n,
      className: "w-full max-w-md",
      children: [
        e.jsxs(o.Item, {
          value: "item-1",
          children: [
            e.jsx(o.Trigger, {
              children: "Can I close all items?"
            }),
            e.jsx(o.Content, {
              children: "Yes, with collapsible enabled, you can close all accordion items."
            })
          ]
        }),
        e.jsxs(o.Item, {
          value: "item-2",
          children: [
            e.jsx(o.Trigger, {
              children: "What about other items?"
            }),
            e.jsx(o.Content, {
              children: "Other items work the same way - you can open and close them independently."
            })
          ]
        })
      ]
    })
  };
  R = {
    args: {
      type: "multiple"
    },
    render: (n) => e.jsxs(o.Root, {
      ...n,
      className: "w-full max-w-md",
      children: [
        e.jsxs(o.Item, {
          value: "item-1",
          children: [
            e.jsx(o.Trigger, {
              children: "Can multiple items be open?"
            }),
            e.jsx(o.Content, {
              children: 'Yes, when type is set to "multiple", multiple accordion items can be open at the same time.'
            })
          ]
        }),
        e.jsxs(o.Item, {
          value: "item-2",
          children: [
            e.jsx(o.Trigger, {
              children: "How does it work?"
            }),
            e.jsx(o.Content, {
              children: "Each item maintains its own state and can be opened or closed independently of others."
            })
          ]
        }),
        e.jsxs(o.Item, {
          value: "item-3",
          children: [
            e.jsx(o.Trigger, {
              children: "Is this useful?"
            }),
            e.jsx(o.Content, {
              children: "Yes, this is great for FAQ sections or when you want users to compare multiple sections."
            })
          ]
        })
      ]
    })
  };
  k = {
    render: (n) => e.jsxs(o.Root, {
      ...n,
      className: "w-full max-w-md",
      children: [
        e.jsxs(o.Item, {
          value: "item-1",
          disabled: true,
          children: [
            e.jsx(o.Trigger, {
              children: "This is disabled"
            }),
            e.jsx(o.Content, {
              children: "You won't be able to interact with this accordion when disabled."
            })
          ]
        }),
        e.jsxs(o.Item, {
          value: "item-2",
          disabled: true,
          children: [
            e.jsx(o.Trigger, {
              children: "All items are disabled"
            }),
            e.jsx(o.Content, {
              children: "When the accordion is disabled, all items become non-interactive."
            })
          ]
        })
      ]
    })
  };
  P = {
    render: () => e.jsxs(o.Root, {
      type: "single",
      collapsible: true,
      className: "w-full max-w-2xl",
      children: [
        e.jsxs(o.Item, {
          value: "faq-1",
          children: [
            e.jsx(o.Trigger, {
              children: "What is your return policy?"
            }),
            e.jsx(o.Content, {
              children: "We offer a 30-day return policy for all unused items in their original packaging. Items must be returned within 30 days of purchase with proof of purchase. Refunds will be processed within 5-7 business days after we receive your return."
            })
          ]
        }),
        e.jsxs(o.Item, {
          value: "faq-2",
          children: [
            e.jsx(o.Trigger, {
              children: "How long does shipping take?"
            }),
            e.jsx(o.Content, {
              children: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping is available for 1-2 business days. International shipping may take 7-14 business days depending on the destination country."
            })
          ]
        }),
        e.jsxs(o.Item, {
          value: "faq-3",
          children: [
            e.jsx(o.Trigger, {
              children: "Do you offer customer support?"
            }),
            e.jsx(o.Content, {
              children: "Yes! Our customer support team is available Monday through Friday, 9 AM to 6 PM EST. You can reach us via email at support@example.com, phone at (555) 123-4567, or through our live chat feature on the website."
            })
          ]
        }),
        e.jsxs(o.Item, {
          value: "faq-4",
          children: [
            e.jsx(o.Trigger, {
              children: "What payment methods do you accept?"
            }),
            e.jsx(o.Content, {
              children: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed securely using industry-standard encryption."
            })
          ]
        }),
        e.jsxs(o.Item, {
          value: "faq-5",
          children: [
            e.jsx(o.Trigger, {
              children: "Can I track my order?"
            }),
            e.jsx(o.Content, {
              children: "Absolutely! Once your order ships, you'll receive an email with tracking information. You can also log into your account on our website to view order status and tracking details for all your purchases."
            })
          ]
        })
      ]
    })
  };
  S = {
    render: () => e.jsxs(o.Root, {
      type: "multiple",
      className: "w-full max-w-2xl",
      children: [
        e.jsxs(o.Item, {
          value: "general",
          children: [
            e.jsx(o.Trigger, {
              children: "General Settings"
            }),
            e.jsx(o.Content, {
              children: e.jsxs("div", {
                className: "space-y-4 pt-2",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsx("label", {
                        className: "text-sm font-medium",
                        children: "Display Name"
                      }),
                      e.jsx("input", {
                        type: "text",
                        placeholder: "Enter your display name",
                        className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    children: [
                      e.jsx("label", {
                        className: "text-sm font-medium",
                        children: "Email"
                      }),
                      e.jsx("input", {
                        type: "email",
                        placeholder: "Enter your email",
                        className: "mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      })
                    ]
                  })
                ]
              })
            })
          ]
        }),
        e.jsxs(o.Item, {
          value: "privacy",
          children: [
            e.jsx(o.Trigger, {
              children: "Privacy Settings"
            }),
            e.jsx(o.Content, {
              children: e.jsxs("div", {
                className: "space-y-3 pt-2",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      e.jsx("span", {
                        className: "text-sm",
                        children: "Profile Visibility"
                      }),
                      e.jsx("input", {
                        type: "checkbox",
                        className: "rounded"
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      e.jsx("span", {
                        className: "text-sm",
                        children: "Email Notifications"
                      }),
                      e.jsx("input", {
                        type: "checkbox",
                        className: "rounded",
                        defaultChecked: true
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      e.jsx("span", {
                        className: "text-sm",
                        children: "Data Collection"
                      }),
                      e.jsx("input", {
                        type: "checkbox",
                        className: "rounded"
                      })
                    ]
                  })
                ]
              })
            })
          ]
        }),
        e.jsxs(o.Item, {
          value: "notifications",
          children: [
            e.jsx(o.Trigger, {
              children: "Notification Preferences"
            }),
            e.jsx(o.Content, {
              children: e.jsxs("div", {
                className: "space-y-3 pt-2",
                children: [
                  e.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      e.jsx("span", {
                        className: "text-sm",
                        children: "Push Notifications"
                      }),
                      e.jsx("input", {
                        type: "checkbox",
                        className: "rounded",
                        defaultChecked: true
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      e.jsx("span", {
                        className: "text-sm",
                        children: "SMS Alerts"
                      }),
                      e.jsx("input", {
                        type: "checkbox",
                        className: "rounded"
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      e.jsx("span", {
                        className: "text-sm",
                        children: "Marketing Emails"
                      }),
                      e.jsx("input", {
                        type: "checkbox",
                        className: "rounded"
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
  E = {
    render: () => e.jsxs(o.Root, {
      type: "single",
      collapsible: true,
      className: "w-full max-w-2xl",
      children: [
        e.jsxs(o.Item, {
          value: "terms",
          children: [
            e.jsx(o.Trigger, {
              children: "Terms and Conditions"
            }),
            e.jsx(o.Content, {
              children: e.jsxs("div", {
                className: "space-y-4 text-sm",
                children: [
                  e.jsxs("p", {
                    children: [
                      e.jsx("strong", {
                        children: "1. Acceptance of Terms"
                      }),
                      e.jsx("br", {}),
                      "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service."
                    ]
                  }),
                  e.jsxs("p", {
                    children: [
                      e.jsx("strong", {
                        children: "2. Use License"
                      }),
                      e.jsx("br", {}),
                      "Permission is granted to temporarily download one copy of the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not modify or copy the materials."
                    ]
                  }),
                  e.jsxs("p", {
                    children: [
                      e.jsx("strong", {
                        children: "3. Disclaimer"
                      }),
                      e.jsx("br", {}),
                      "The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights."
                    ]
                  }),
                  e.jsxs("p", {
                    children: [
                      e.jsx("strong", {
                        children: "4. Limitations"
                      }),
                      e.jsx("br", {}),
                      "In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website."
                    ]
                  })
                ]
              })
            })
          ]
        }),
        e.jsxs(o.Item, {
          value: "privacy",
          children: [
            e.jsx(o.Trigger, {
              children: "Privacy Policy"
            }),
            e.jsx(o.Content, {
              children: e.jsxs("div", {
                className: "space-y-4 text-sm",
                children: [
                  e.jsxs("p", {
                    children: [
                      e.jsx("strong", {
                        children: "Information We Collect"
                      }),
                      e.jsx("br", {}),
                      "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, postal address, phone number, and payment information."
                    ]
                  }),
                  e.jsxs("p", {
                    children: [
                      e.jsx("strong", {
                        children: "How We Use Your Information"
                      }),
                      e.jsx("br", {}),
                      "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and communicate with you about products, services, and promotional offers."
                    ]
                  }),
                  e.jsxs("p", {
                    children: [
                      e.jsx("strong", {
                        children: "Information Sharing"
                      }),
                      e.jsx("br", {}),
                      "We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy. We may share your information with trusted third parties who assist us in operating our website and conducting business."
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
  N.parameters = {
    ...N.parameters,
    docs: {
      ...(_a = N.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => <Accordion.Root {...args} className="w-full max-w-md">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It adheres to the WAI-ARIA design pattern and uses semantic HTML elements.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Is it styled?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It comes with default styles that matches the other components aesthetic.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Is it animated?</Accordion.Trigger>
        <Accordion.Content>
          Yes. The accordion content smoothly expands and collapses with CSS animations.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
}`,
        ...(_c = (_b = N.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_d = T.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  args: {
    type: "single",
    collapsible: true
  },
  render: args => <Accordion.Root {...args} className="w-full max-w-md">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Can I close all items?</Accordion.Trigger>
        <Accordion.Content>
          Yes, with collapsible enabled, you can close all accordion items.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>What about other items?</Accordion.Trigger>
        <Accordion.Content>
          Other items work the same way - you can open and close them independently.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
}`,
        ...(_f = (_e2 = T.parameters) == null ? void 0 : _e2.docs) == null ? void 0 : _f.source
      }
    }
  };
  R.parameters = {
    ...R.parameters,
    docs: {
      ...(_g = R.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  args: {
    type: "multiple"
  },
  render: args => <Accordion.Root {...args} className="w-full max-w-md">
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Can multiple items be open?</Accordion.Trigger>
        <Accordion.Content>
          Yes, when type is set to "multiple", multiple accordion items can be open at the same time.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>How does it work?</Accordion.Trigger>
        <Accordion.Content>
          Each item maintains its own state and can be opened or closed independently of others.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Is this useful?</Accordion.Trigger>
        <Accordion.Content>
          Yes, this is great for FAQ sections or when you want users to compare multiple sections.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
}`,
        ...(_i = (_h = R.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  k.parameters = {
    ...k.parameters,
    docs: {
      ...(_j = k.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: args => <Accordion.Root {...args} className="w-full max-w-md">
      <Accordion.Item value="item-1" disabled>
        <Accordion.Trigger>This is disabled</Accordion.Trigger>
        <Accordion.Content>
          You won't be able to interact with this accordion when disabled.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2" disabled>
        <Accordion.Trigger>All items are disabled</Accordion.Trigger>
        <Accordion.Content>
          When the accordion is disabled, all items become non-interactive.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
}`,
        ...(_l = (_k = k.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  P.parameters = {
    ...P.parameters,
    docs: {
      ...(_m = P.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: () => <Accordion.Root type="single" collapsible className="w-full max-w-2xl">
      <Accordion.Item value="faq-1">
        <Accordion.Trigger>What is your return policy?</Accordion.Trigger>
        <Accordion.Content>
          We offer a 30-day return policy for all unused items in their original packaging.
          Items must be returned within 30 days of purchase with proof of purchase.
          Refunds will be processed within 5-7 business days after we receive your return.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="faq-2">
        <Accordion.Trigger>How long does shipping take?</Accordion.Trigger>
        <Accordion.Content>
          Standard shipping typically takes 3-5 business days within the continental US.
          Express shipping is available for 1-2 business days. International shipping
          may take 7-14 business days depending on the destination country.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="faq-3">
        <Accordion.Trigger>Do you offer customer support?</Accordion.Trigger>
        <Accordion.Content>
          Yes! Our customer support team is available Monday through Friday, 9 AM to 6 PM EST.
          You can reach us via email at support@example.com, phone at (555) 123-4567,
          or through our live chat feature on the website.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="faq-4">
        <Accordion.Trigger>What payment methods do you accept?</Accordion.Trigger>
        <Accordion.Content>
          We accept all major credit cards (Visa, MasterCard, American Express, Discover),
          PayPal, Apple Pay, Google Pay, and bank transfers. All payments are processed
          securely using industry-standard encryption.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="faq-5">
        <Accordion.Trigger>Can I track my order?</Accordion.Trigger>
        <Accordion.Content>
          Absolutely! Once your order ships, you'll receive an email with tracking information.
          You can also log into your account on our website to view order status and
          tracking details for all your purchases.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
}`,
        ...(_o = (_n = P.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_p = S.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: () => <Accordion.Root type="multiple" className="w-full max-w-2xl">
      <Accordion.Item value="general">
        <Accordion.Trigger>General Settings</Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-sm font-medium">Display Name</label>
              <input type="text" placeholder="Enter your display name" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input type="email" placeholder="Enter your email" className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="privacy">
        <Accordion.Trigger>Privacy Settings</Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Profile Visibility</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Email Notifications</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Data Collection</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="notifications">
        <Accordion.Trigger>Notification Preferences</Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Push Notifications</span>
              <input type="checkbox" className="rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">SMS Alerts</span>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Marketing Emails</span>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
}`,
        ...(_r = (_q = S.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  E.parameters = {
    ...E.parameters,
    docs: {
      ...(_s = E.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: () => <Accordion.Root type="single" collapsible className="w-full max-w-2xl">
      <Accordion.Item value="terms">
        <Accordion.Trigger>Terms and Conditions</Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-4 text-sm">
            <p>
              <strong>1. Acceptance of Terms</strong><br />
              By accessing and using this website, you accept and agree to be bound by the terms
              and provision of this agreement. If you do not agree to abide by the above, please
              do not use this service.
            </p>
            <p>
              <strong>2. Use License</strong><br />
              Permission is granted to temporarily download one copy of the materials on our website
              for personal, non-commercial transitory viewing only. This is the grant of a license,
              not a transfer of title, and under this license you may not modify or copy the materials.
            </p>
            <p>
              <strong>3. Disclaimer</strong><br />
              The materials on our website are provided on an 'as is' basis. We make no warranties,
              expressed or implied, and hereby disclaim and negate all other warranties including
              without limitation, implied warranties or conditions of merchantability, fitness for
              a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p>
              <strong>4. Limitations</strong><br />
              In no event shall our company or its suppliers be liable for any damages (including,
              without limitation, damages for loss of data or profit, or due to business interruption)
              arising out of the use or inability to use the materials on our website.
            </p>
          </div>
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="privacy">
        <Accordion.Trigger>Privacy Policy</Accordion.Trigger>
        <Accordion.Content>
          <div className="space-y-4 text-sm">
            <p>
              <strong>Information We Collect</strong><br />
              We collect information you provide directly to us, such as when you create an account,
              make a purchase, or contact us for support. This may include your name, email address,
              postal address, phone number, and payment information.
            </p>
            <p>
              <strong>How We Use Your Information</strong><br />
              We use the information we collect to provide, maintain, and improve our services,
              process transactions, send you technical notices and support messages, and communicate
              with you about products, services, and promotional offers.
            </p>
            <p>
              <strong>Information Sharing</strong><br />
              We do not sell, trade, or otherwise transfer your personal information to third parties
              without your consent, except as described in this policy. We may share your information
              with trusted third parties who assist us in operating our website and conducting business.
            </p>
          </div>
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
}`,
        ...(_u = (_t = E.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  to = [
    "Default",
    "SingleCollapsible",
    "Multiple",
    "Disabled",
    "FAQExample",
    "SettingsExample",
    "LongContent"
  ];
});
export {
  N as Default,
  k as Disabled,
  P as FAQExample,
  E as LongContent,
  R as Multiple,
  S as SettingsExample,
  T as SingleCollapsible,
  to as __namedExportsOrder,
  __tla,
  no as default
};
