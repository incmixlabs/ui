import { j as e, r as a, u as Y, c as oe, b as re, W as ne, Q as le, U as E, t as ie, v as O, T as k, l as ae, H as se, a as g, F as s, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { B as o, __tla as __tla_1 } from "./button-BF2Wetgg.js";
import { c as M, R as ce, T as de, P as ge, O as pe, W as ue, C as xe, a as he, D as me, b as L, __tla as __tla_2 } from "./index-BpKby9Va.js";
import { r as I, __tla as __tla_3 } from "./require-react-element-D0otgQnF.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_4 } from "./base-button-BHQkXpSv.js";
import { __tla as __tla_5 } from "./index-CEOg2jVB.js";
import { __tla as __tla_6 } from "./index-DfrOcl7X.js";
import { __tla as __tla_7 } from "./index-ChItmDsK.js";
let B, N, W, T, b, _, R, S, P, z, w, Ve, Ge;
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
  })(),
  (() => {
    try {
      return __tla_6;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_7;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G;
  var $ = "AlertDialog", [De, qe] = oe($, [
    M
  ]), A = M(), H = (t) => {
    const { __scopeAlertDialog: r, ...n } = t, l = A(r);
    return e.jsx(ce, {
      ...l,
      ...n,
      modal: true
    });
  };
  H.displayName = $;
  var Ae = "AlertDialogTrigger", U = a.forwardRef((t, r) => {
    const { __scopeAlertDialog: n, ...l } = t, i = A(n);
    return e.jsx(de, {
      ...i,
      ...l,
      ref: r
    });
  });
  U.displayName = Ae;
  var ye = "AlertDialogPortal", q = (t) => {
    const { __scopeAlertDialog: r, ...n } = t, l = A(r);
    return e.jsx(ge, {
      ...l,
      ...n
    });
  };
  q.displayName = ye;
  var fe = "AlertDialogOverlay", G = a.forwardRef((t, r) => {
    const { __scopeAlertDialog: n, ...l } = t, i = A(n);
    return e.jsx(pe, {
      ...i,
      ...l,
      ref: r
    });
  });
  G.displayName = fe;
  var j = "AlertDialogContent", [je, ve] = De(j), Ce = ne("AlertDialogContent"), V = a.forwardRef((t, r) => {
    const { __scopeAlertDialog: n, children: l, ...i } = t, v = A(n), f = a.useRef(null), F = Y(r, f), C = a.useRef(null);
    return e.jsx(ue, {
      contentName: j,
      titleName: K,
      docsSlug: "alert-dialog",
      children: e.jsx(je, {
        scope: n,
        cancelRef: C,
        children: e.jsxs(xe, {
          role: "alertdialog",
          ...v,
          ...i,
          ref: F,
          onOpenAutoFocus: re(i.onOpenAutoFocus, (y) => {
            var _a2;
            y.preventDefault(), (_a2 = C.current) == null ? void 0 : _a2.focus({
              preventScroll: true
            });
          }),
          onPointerDownOutside: (y) => y.preventDefault(),
          onInteractOutside: (y) => y.preventDefault(),
          children: [
            e.jsx(Ce, {
              children: l
            }),
            e.jsx(be, {
              contentRef: f
            })
          ]
        })
      })
    });
  });
  V.displayName = j;
  var K = "AlertDialogTitle", Q = a.forwardRef((t, r) => {
    const { __scopeAlertDialog: n, ...l } = t, i = A(n);
    return e.jsx(he, {
      ...i,
      ...l,
      ref: r
    });
  });
  Q.displayName = K;
  var J = "AlertDialogDescription", X = a.forwardRef((t, r) => {
    const { __scopeAlertDialog: n, ...l } = t, i = A(n);
    return e.jsx(me, {
      ...i,
      ...l,
      ref: r
    });
  });
  X.displayName = J;
  var Te = "AlertDialogAction", Z = a.forwardRef((t, r) => {
    const { __scopeAlertDialog: n, ...l } = t, i = A(n);
    return e.jsx(L, {
      ...i,
      ...l,
      ref: r
    });
  });
  Z.displayName = Te;
  var ee = "AlertDialogCancel", te = a.forwardRef((t, r) => {
    const { __scopeAlertDialog: n, ...l } = t, { cancelRef: i } = ve(ee, n), v = A(n), f = Y(r, i);
    return e.jsx(L, {
      ...v,
      ...l,
      ref: f
    });
  });
  te.displayName = ee;
  var be = ({ contentRef: t }) => {
    const r = `\`${j}\` requires a description for the component to be accessible for screen reader users.

You can add a description to the \`${j}\` by passing a \`${J}\` component as a child, which also benefits sighted users by adding visible context to the dialog.

Alternatively, you can use your own component as a description by assigning it an \`id\` and passing the same value to the \`aria-describedby\` prop in \`${j}\`. If the description is confusing or duplicative for sighted users, you can use the \`@radix-ui/react-visually-hidden\` primitive as a wrapper around your description component.

For more information, see https://radix-ui.com/primitives/docs/components/alert-dialog`;
    return a.useEffect(() => {
      var _a2;
      document.getElementById((_a2 = t.current) == null ? void 0 : _a2.getAttribute("aria-describedby")) || console.warn(r);
    }, [
      r,
      t
    ]), null;
  }, Be = H, we = U, Re = q, Se = G, _e = V, Pe = Z, Ne = te, ze = Q, We = X;
  const Fe = [
    "1",
    "2",
    "3",
    "4"
  ], Ee = {
    ...ie,
    align: {
      type: "enum",
      className: "rt-r-align",
      values: [
        "start",
        "center"
      ],
      default: "center"
    },
    size: {
      type: "enum",
      className: "rt-r-size",
      values: Fe,
      default: "3",
      responsive: true
    },
    width: E.width,
    minWidth: E.minWidth,
    maxWidth: {
      ...E.maxWidth,
      default: "600px"
    },
    ...le
  }, D = {
    Root: Be,
    Trigger: we,
    Content: _e,
    Title: ze,
    Description: We,
    Action: Pe,
    Cancel: Ne,
    Overlay: Se,
    Portal: Re
  }, d = (t) => e.jsx(D.Root, {
    ...t
  });
  d.displayName = "AlertDialog.Root";
  const p = a.forwardRef(({ children: t, ...r }, n) => e.jsx(D.Trigger, {
    ...r,
    ref: n,
    asChild: true,
    children: I(t)
  }));
  p.displayName = "AlertDialog.Trigger";
  const u = a.forwardRef(({ align: t, ...r }, n) => {
    const { align: l, ...i } = Ee, { className: v } = O({
      align: t
    }, {
      align: l
    }), { className: f, forceMount: F, container: C, ...y } = O(r, i);
    return e.jsx(D.Portal, {
      container: C,
      forceMount: F,
      children: e.jsx(k, {
        asChild: true,
        children: e.jsx(D.Overlay, {
          className: "rt-BaseDialogOverlay rt-AlertDialogOverlay",
          children: e.jsx("div", {
            className: "rt-BaseDialogScroll rt-AlertDialogScroll",
            children: e.jsx("div", {
              className: `rt-BaseDialogScrollPadding rt-AlertDialogScrollPadding ${v}`,
              children: e.jsx(D.Content, {
                ...y,
                ref: n,
                className: ae("rt-BaseDialogContent", "rt-AlertDialogContent", f)
              })
            })
          })
        })
      })
    });
  });
  u.displayName = "AlertDialog.Content";
  const x = a.forwardRef((t, r) => e.jsx(D.Title, {
    asChild: true,
    children: e.jsx(se, {
      size: "5",
      mb: "3",
      trim: "start",
      ...t,
      asChild: false,
      ref: r
    })
  }));
  x.displayName = "AlertDialog.Title";
  const h = a.forwardRef((t, r) => e.jsx(D.Description, {
    asChild: true,
    children: e.jsx(g, {
      as: "p",
      size: "3",
      ...t,
      asChild: false,
      ref: r
    })
  }));
  h.displayName = "AlertDialog.Description";
  const c = a.forwardRef(({ children: t, ...r }, n) => e.jsx(D.Action, {
    ...r,
    ref: n,
    asChild: true,
    children: I(t)
  }));
  c.displayName = "AlertDialog.Action";
  const m = a.forwardRef(({ children: t, ...r }, n) => e.jsx(D.Cancel, {
    ...r,
    ref: n,
    asChild: true,
    children: I(t)
  }));
  m.displayName = "AlertDialog.Cancel";
  d.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "AlertDialog.Root"
  };
  p.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "AlertDialog.Trigger",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  u.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "AlertDialog.Content",
    props: {
      container: {
        required: false,
        tsType: {
          name: 'ReactComponentPropsWithoutRef["container"]',
          raw: `React.ComponentPropsWithoutRef<
  typeof AlertDialogPrimitive.Portal
>["container"]`
        },
        description: ""
      }
    },
    composes: [
      "ComponentPropsWithout",
      "AlertDialogContentOwnProps"
    ]
  };
  x.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "AlertDialog.Title"
  };
  h.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "AlertDialog.Description"
  };
  c.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "AlertDialog.Action",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  m.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "AlertDialog.Cancel",
    composes: [
      "ComponentPropsWithout"
    ]
  };
  Ge = {
    title: "Base/AlertDialog",
    component: d,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (t) => e.jsx(k, {
        children: e.jsx(t, {})
      })
    ]
  };
  T = {
    render: (t) => e.jsxs(d, {
      children: [
        e.jsx(p, {
          children: e.jsx(o, {
            color: "red",
            children: "Delete Account"
          })
        }),
        e.jsxs(u, {
          style: {
            maxWidth: "450px"
          },
          children: [
            e.jsx(x, {
              children: "Are you absolutely sure?"
            }),
            e.jsx(h, {
              children: "This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            }),
            e.jsxs(s, {
              gap: "3",
              mt: "4",
              justify: "end",
              children: [
                e.jsx(m, {
                  children: e.jsx(o, {
                    variant: "soft",
                    color: "gray",
                    children: "Cancel"
                  })
                }),
                e.jsx(c, {
                  children: e.jsx(o, {
                    variant: "solid",
                    color: "red",
                    children: "Yes, delete account"
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  };
  b = {
    render: (t) => e.jsxs(d, {
      children: [
        e.jsx(p, {
          children: e.jsx(o, {
            color: "red",
            variant: "solid",
            children: "Delete Project"
          })
        }),
        e.jsxs(u, {
          style: {
            maxWidth: "450px"
          },
          children: [
            e.jsx(x, {
              children: "Delete Project"
            }),
            e.jsx(h, {
              children: "Are you sure you want to delete this project? This action cannot be undone and will permanently remove all project files, settings, and associated data."
            }),
            e.jsxs(s, {
              gap: "3",
              mt: "4",
              justify: "end",
              children: [
                e.jsx(m, {
                  children: e.jsx(o, {
                    variant: "soft",
                    color: "gray",
                    children: "Cancel"
                  })
                }),
                e.jsx(c, {
                  children: e.jsx(o, {
                    variant: "solid",
                    color: "red",
                    children: "Delete Project"
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  };
  B = {
    render: (t) => e.jsxs(d, {
      children: [
        e.jsx(p, {
          children: e.jsx(o, {
            color: "blue",
            children: "Save Changes"
          })
        }),
        e.jsxs(u, {
          style: {
            maxWidth: "400px"
          },
          children: [
            e.jsx(x, {
              children: "Save Changes?"
            }),
            e.jsx(h, {
              children: "You have unsaved changes. Do you want to save your changes before leaving?"
            }),
            e.jsxs(s, {
              gap: "3",
              mt: "4",
              justify: "end",
              children: [
                e.jsx(m, {
                  children: e.jsx(o, {
                    variant: "soft",
                    color: "gray",
                    children: "Don't Save"
                  })
                }),
                e.jsx(c, {
                  children: e.jsx(o, {
                    variant: "solid",
                    color: "blue",
                    children: "Save Changes"
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  };
  w = {
    render: (t) => e.jsxs(d, {
      children: [
        e.jsx(p, {
          children: e.jsx(o, {
            color: "orange",
            variant: "outline",
            children: "Reset Settings"
          })
        }),
        e.jsxs(u, {
          style: {
            maxWidth: "450px"
          },
          children: [
            e.jsx(x, {
              children: "Reset All Settings"
            }),
            e.jsx(h, {
              children: "This will reset all your preferences to their default values. Your personal data will not be affected, but you'll need to reconfigure your settings."
            }),
            e.jsxs(s, {
              gap: "3",
              mt: "4",
              justify: "end",
              children: [
                e.jsx(m, {
                  children: e.jsx(o, {
                    variant: "soft",
                    color: "gray",
                    children: "Cancel"
                  })
                }),
                e.jsx(c, {
                  children: e.jsx(o, {
                    variant: "solid",
                    color: "orange",
                    children: "Reset Settings"
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  };
  R = {
    render: (t) => e.jsxs(d, {
      children: [
        e.jsx(p, {
          children: e.jsx(o, {
            color: "blue",
            variant: "soft",
            children: "Show Info"
          })
        }),
        e.jsxs(u, {
          style: {
            maxWidth: "400px"
          },
          children: [
            e.jsx(x, {
              children: "Important Information"
            }),
            e.jsx(h, {
              children: "Your subscription will expire in 7 days. To continue using all features, please renew your subscription before it expires."
            }),
            e.jsxs(s, {
              gap: "3",
              mt: "4",
              justify: "end",
              children: [
                e.jsx(m, {
                  children: e.jsx(o, {
                    variant: "soft",
                    color: "gray",
                    children: "Later"
                  })
                }),
                e.jsx(c, {
                  children: e.jsx(o, {
                    variant: "solid",
                    color: "blue",
                    children: "Renew Now"
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  };
  S = {
    render: (t) => e.jsxs(d, {
      children: [
        e.jsx(p, {
          children: e.jsx(o, {
            color: "gray",
            variant: "outline",
            children: "Logout"
          })
        }),
        e.jsxs(u, {
          style: {
            maxWidth: "400px"
          },
          children: [
            e.jsx(x, {
              children: "Logout Confirmation"
            }),
            e.jsx(h, {
              children: "Are you sure you want to logout? Any unsaved changes will be lost."
            }),
            e.jsxs(s, {
              gap: "3",
              mt: "4",
              justify: "end",
              children: [
                e.jsx(m, {
                  children: e.jsx(o, {
                    variant: "soft",
                    color: "gray",
                    children: "Stay Logged In"
                  })
                }),
                e.jsx(c, {
                  children: e.jsx(o, {
                    variant: "solid",
                    color: "red",
                    children: "Logout"
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  };
  _ = {
    render: (t) => e.jsxs(d, {
      children: [
        e.jsx(p, {
          children: e.jsx(o, {
            color: "red",
            size: "1",
            children: "\u{1F5D1}\uFE0F Delete"
          })
        }),
        e.jsxs(u, {
          style: {
            maxWidth: "500px"
          },
          children: [
            e.jsx(x, {
              children: "Delete File"
            }),
            e.jsx(h, {
              style: {
                marginBottom: "16px"
              },
              children: "You are about to permanently delete the following file:"
            }),
            e.jsxs("div", {
              style: {
                padding: "12px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
                border: "1px solid #e1e5e9",
                marginBottom: "16px"
              },
              children: [
                e.jsx(g, {
                  size: "2",
                  weight: "medium",
                  children: "\u{1F4C4} project-proposal.pdf"
                }),
                e.jsx(g, {
                  size: "1",
                  color: "gray",
                  style: {
                    marginTop: "4px",
                    display: "block"
                  },
                  children: "Size: 2.4 MB \u2022 Modified: 2 hours ago"
                })
              ]
            }),
            e.jsx(g, {
              size: "2",
              color: "red",
              children: "This action cannot be undone. The file will be permanently removed from your account."
            }),
            e.jsxs(s, {
              gap: "3",
              mt: "4",
              justify: "end",
              children: [
                e.jsx(m, {
                  children: e.jsx(o, {
                    variant: "soft",
                    color: "gray",
                    children: "Keep File"
                  })
                }),
                e.jsx(c, {
                  children: e.jsx(o, {
                    variant: "solid",
                    color: "red",
                    children: "Delete Forever"
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  };
  P = {
    render: (t) => e.jsxs(d, {
      children: [
        e.jsx(p, {
          children: e.jsx(o, {
            color: "orange",
            children: "Unsaved Changes"
          })
        }),
        e.jsxs(u, {
          style: {
            maxWidth: "450px"
          },
          children: [
            e.jsx(x, {
              children: "Unsaved Changes"
            }),
            e.jsx(h, {
              children: "You have unsaved changes in your document. What would you like to do?"
            }),
            e.jsxs(s, {
              gap: "2",
              mt: "4",
              justify: "end",
              wrap: "wrap",
              children: [
                e.jsx(m, {
                  children: e.jsx(o, {
                    variant: "ghost",
                    color: "gray",
                    size: "2",
                    children: "Cancel"
                  })
                }),
                e.jsx(c, {
                  children: e.jsx(o, {
                    variant: "soft",
                    color: "red",
                    size: "2",
                    children: "Discard Changes"
                  })
                }),
                e.jsx(c, {
                  children: e.jsx(o, {
                    variant: "solid",
                    color: "blue",
                    size: "2",
                    children: "Save & Continue"
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  };
  N = {
    render: (t) => e.jsxs(d, {
      children: [
        e.jsx(p, {
          children: e.jsx(o, {
            color: "purple",
            variant: "solid",
            children: "Custom Dialog"
          })
        }),
        e.jsxs(u, {
          style: {
            maxWidth: "480px",
            padding: "24px",
            borderRadius: "12px",
            border: "2px solid #7c3aed"
          },
          children: [
            e.jsxs("div", {
              style: {
                textAlign: "center",
                marginBottom: "16px"
              },
              children: [
                e.jsx("div", {
                  style: {
                    fontSize: "48px",
                    marginBottom: "8px"
                  },
                  children: "\u{1F389}"
                }),
                e.jsx(x, {
                  style: {
                    fontSize: "24px",
                    color: "#7c3aed"
                  },
                  children: "Congratulations!"
                })
              ]
            }),
            e.jsx(h, {
              style: {
                textAlign: "center",
                fontSize: "16px",
                lineHeight: "1.5"
              },
              children: "You've successfully completed all tasks in your project! Your team's productivity has increased by 40% this month."
            }),
            e.jsxs(s, {
              gap: "3",
              mt: "6",
              justify: "center",
              children: [
                e.jsx(m, {
                  children: e.jsx(o, {
                    variant: "soft",
                    color: "gray",
                    children: "Close"
                  })
                }),
                e.jsx(c, {
                  children: e.jsx(o, {
                    variant: "solid",
                    color: "purple",
                    children: "View Report"
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  };
  z = {
    render: (t) => e.jsxs(d, {
      children: [
        e.jsx(p, {
          children: e.jsx(o, {
            color: "green",
            variant: "solid",
            children: "Complete Purchase"
          })
        }),
        e.jsxs(u, {
          style: {
            maxWidth: "450px"
          },
          children: [
            e.jsx(x, {
              children: "Confirm Purchase"
            }),
            e.jsx(h, {
              style: {
                marginBottom: "16px"
              },
              children: "Please confirm your purchase details:"
            }),
            e.jsxs("div", {
              style: {
                padding: "16px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px",
                marginBottom: "16px",
                border: "1px solid #e1e5e9"
              },
              children: [
                e.jsxs(s, {
                  justify: "between",
                  style: {
                    marginBottom: "8px"
                  },
                  children: [
                    e.jsx(g, {
                      size: "2",
                      children: "Pro Plan (Monthly)"
                    }),
                    e.jsx(g, {
                      size: "2",
                      weight: "medium",
                      children: "$29.00"
                    })
                  ]
                }),
                e.jsxs(s, {
                  justify: "between",
                  style: {
                    marginBottom: "8px"
                  },
                  children: [
                    e.jsx(g, {
                      size: "2",
                      color: "gray",
                      children: "Tax"
                    }),
                    e.jsx(g, {
                      size: "2",
                      color: "gray",
                      children: "$2.32"
                    })
                  ]
                }),
                e.jsx("div", {
                  style: {
                    height: "1px",
                    backgroundColor: "#e1e5e9",
                    margin: "8px 0"
                  }
                }),
                e.jsxs(s, {
                  justify: "between",
                  children: [
                    e.jsx(g, {
                      size: "2",
                      weight: "bold",
                      children: "Total"
                    }),
                    e.jsx(g, {
                      size: "2",
                      weight: "bold",
                      children: "$31.32"
                    })
                  ]
                })
              ]
            }),
            e.jsx(g, {
              size: "2",
              color: "gray",
              children: "Payment will be charged to your default payment method."
            }),
            e.jsxs(s, {
              gap: "3",
              mt: "4",
              justify: "end",
              children: [
                e.jsx(m, {
                  children: e.jsx(o, {
                    variant: "soft",
                    color: "gray",
                    children: "Cancel"
                  })
                }),
                e.jsx(c, {
                  children: e.jsx(o, {
                    variant: "solid",
                    color: "green",
                    children: "Complete Purchase"
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  };
  W = {
    render: (t) => e.jsxs(d, {
      children: [
        e.jsx(p, {
          children: e.jsx(o, {
            color: "blue",
            variant: "outline",
            children: "Export Data"
          })
        }),
        e.jsxs(u, {
          style: {
            maxWidth: "500px"
          },
          children: [
            e.jsx(x, {
              children: "Export Your Data"
            }),
            e.jsx(h, {
              style: {
                marginBottom: "16px"
              },
              children: "We'll prepare a downloadable archive containing all your account data. This may take a few minutes depending on the amount of data."
            }),
            e.jsxs("div", {
              style: {
                padding: "12px",
                backgroundColor: "#eff6ff",
                borderRadius: "6px",
                border: "1px solid #bfdbfe",
                marginBottom: "16px"
              },
              children: [
                e.jsx(g, {
                  size: "2",
                  weight: "medium",
                  color: "blue",
                  style: {
                    marginBottom: "4px",
                    display: "block"
                  },
                  children: "\u{1F4E6} Export will include:"
                }),
                e.jsxs("ul", {
                  style: {
                    margin: 0,
                    paddingLeft: "16px",
                    fontSize: "14px",
                    color: "#374151"
                  },
                  children: [
                    e.jsx("li", {
                      children: "Profile information and settings"
                    }),
                    e.jsx("li", {
                      children: "All your projects and files"
                    }),
                    e.jsx("li", {
                      children: "Activity history and logs"
                    }),
                    e.jsx("li", {
                      children: "Shared content and collaborations"
                    })
                  ]
                })
              ]
            }),
            e.jsx(g, {
              size: "2",
              color: "gray",
              children: "You'll receive an email with the download link when your export is ready."
            }),
            e.jsxs(s, {
              gap: "3",
              mt: "4",
              justify: "end",
              children: [
                e.jsx(m, {
                  children: e.jsx(o, {
                    variant: "soft",
                    color: "gray",
                    children: "Cancel"
                  })
                }),
                e.jsx(c, {
                  children: e.jsx(o, {
                    variant: "solid",
                    color: "blue",
                    children: "Start Export"
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_a = T.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">Delete Account</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "450px"
    }}>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Yes, delete account
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,
        ...(_c = (_b = T.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_d = b.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" variant="solid">
          Delete Project
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "450px"
    }}>
        <AlertDialog.Title>Delete Project</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to delete this project? This action cannot be
          undone and will permanently remove all project files, settings, and
          associated data.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Delete Project
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,
        ...(_f = (_e2 = b.parameters) == null ? void 0 : _e2.docs) == null ? void 0 : _f.source
      }
    }
  };
  B.parameters = {
    ...B.parameters,
    docs: {
      ...(_g = B.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="blue">Save Changes</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "400px"
    }}>
        <AlertDialog.Title>Save Changes?</AlertDialog.Title>
        <AlertDialog.Description>
          You have unsaved changes. Do you want to save your changes before
          leaving?
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Don't Save
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="blue">
              Save Changes
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,
        ...(_i = (_h = B.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_j = w.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="orange" variant="outline">
          Reset Settings
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "450px"
    }}>
        <AlertDialog.Title>Reset All Settings</AlertDialog.Title>
        <AlertDialog.Description>
          This will reset all your preferences to their default values. Your
          personal data will not be affected, but you'll need to reconfigure
          your settings.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="orange">
              Reset Settings
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,
        ...(_l = (_k = w.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  R.parameters = {
    ...R.parameters,
    docs: {
      ...(_m = R.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="blue" variant="soft">
          Show Info
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "400px"
    }}>
        <AlertDialog.Title>Important Information</AlertDialog.Title>
        <AlertDialog.Description>
          Your subscription will expire in 7 days. To continue using all
          features, please renew your subscription before it expires.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Later
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="blue">
              Renew Now
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,
        ...(_o = (_n = R.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_p = S.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="gray" variant="outline">
          Logout
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "400px"
    }}>
        <AlertDialog.Title>Logout Confirmation</AlertDialog.Title>
        <AlertDialog.Description>
          Are you sure you want to logout? Any unsaved changes will be lost.
        </AlertDialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Stay Logged In
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Logout
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,
        ...(_r = (_q = S.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  _.parameters = {
    ..._.parameters,
    docs: {
      ...(_s = _.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" size="1">
          \u{1F5D1}\uFE0F Delete
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "500px"
    }}>
        <AlertDialog.Title>Delete File</AlertDialog.Title>
        <AlertDialog.Description style={{
        marginBottom: "16px"
      }}>
          You are about to permanently delete the following file:
        </AlertDialog.Description>
        <div style={{
        padding: "12px",
        backgroundColor: "#f8f9fa",
        borderRadius: "6px",
        border: "1px solid #e1e5e9",
        marginBottom: "16px"
      }}>
          <Text size="2" weight="medium">
            \u{1F4C4} project-proposal.pdf
          </Text>
          <Text size="1" color="gray" style={{
          marginTop: "4px",
          display: "block"
        }}>
            Size: 2.4 MB \u2022 Modified: 2 hours ago
          </Text>
        </div>
        <Text size="2" color="red">
          This action cannot be undone. The file will be permanently removed
          from your account.
        </Text>
        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Keep File
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red">
              Delete Forever
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,
        ...(_u = (_t = _.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  P.parameters = {
    ...P.parameters,
    docs: {
      ...(_v = P.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="orange">Unsaved Changes</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "450px"
    }}>
        <AlertDialog.Title>Unsaved Changes</AlertDialog.Title>
        <AlertDialog.Description>
          You have unsaved changes in your document. What would you like to do?
        </AlertDialog.Description>
        <Flex gap="2" mt="4" justify="end" wrap="wrap">
          <AlertDialog.Cancel>
            <Button variant="ghost" color="gray" size="2">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="soft" color="red" size="2">
              Discard Changes
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Action>
            <Button variant="solid" color="blue" size="2">
              Save & Continue
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,
        ...(_x = (_w = P.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  N.parameters = {
    ...N.parameters,
    docs: {
      ...(_y = N.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="purple" variant="solid">
          Custom Dialog
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "480px",
      padding: "24px",
      borderRadius: "12px",
      border: "2px solid #7c3aed"
    }}>
        <div style={{
        textAlign: "center",
        marginBottom: "16px"
      }}>
          <div style={{
          fontSize: "48px",
          marginBottom: "8px"
        }}>\u{1F389}</div>
          <AlertDialog.Title style={{
          fontSize: "24px",
          color: "#7c3aed"
        }}>
            Congratulations!
          </AlertDialog.Title>
        </div>
        <AlertDialog.Description style={{
        textAlign: "center",
        fontSize: "16px",
        lineHeight: "1.5"
      }}>
          You've successfully completed all tasks in your project! Your team's
          productivity has increased by 40% this month.
        </AlertDialog.Description>
        <Flex gap="3" mt="6" justify="center">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Close
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="purple">
              View Report
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,
        ...(_A = (_z = N.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_B = z.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="green" variant="solid">
          Complete Purchase
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "450px"
    }}>
        <AlertDialog.Title>Confirm Purchase</AlertDialog.Title>
        <AlertDialog.Description style={{
        marginBottom: "16px"
      }}>
          Please confirm your purchase details:
        </AlertDialog.Description>

        <div style={{
        padding: "16px",
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        marginBottom: "16px",
        border: "1px solid #e1e5e9"
      }}>
          <Flex justify="between" style={{
          marginBottom: "8px"
        }}>
            <Text size="2">Pro Plan (Monthly)</Text>
            <Text size="2" weight="medium">
              $29.00
            </Text>
          </Flex>
          <Flex justify="between" style={{
          marginBottom: "8px"
        }}>
            <Text size="2" color="gray">
              Tax
            </Text>
            <Text size="2" color="gray">
              $2.32
            </Text>
          </Flex>
          <div style={{
          height: "1px",
          backgroundColor: "#e1e5e9",
          margin: "8px 0"
        }} />
          <Flex justify="between">
            <Text size="2" weight="bold">
              Total
            </Text>
            <Text size="2" weight="bold">
              $31.32
            </Text>
          </Flex>
        </div>

        <Text size="2" color="gray">
          Payment will be charged to your default payment method.
        </Text>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="green">
              Complete Purchase
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,
        ...(_D = (_C = z.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  W.parameters = {
    ...W.parameters,
    docs: {
      ...(_E = W.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: _args => <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="blue" variant="outline">
          Export Data
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content style={{
      maxWidth: "500px"
    }}>
        <AlertDialog.Title>Export Your Data</AlertDialog.Title>
        <AlertDialog.Description style={{
        marginBottom: "16px"
      }}>
          We'll prepare a downloadable archive containing all your account data.
          This may take a few minutes depending on the amount of data.
        </AlertDialog.Description>

        <div style={{
        padding: "12px",
        backgroundColor: "#eff6ff",
        borderRadius: "6px",
        border: "1px solid #bfdbfe",
        marginBottom: "16px"
      }}>
          <Text size="2" weight="medium" color="blue" style={{
          marginBottom: "4px",
          display: "block"
        }}>
            \u{1F4E6} Export will include:
          </Text>
          <ul style={{
          margin: 0,
          paddingLeft: "16px",
          fontSize: "14px",
          color: "#374151"
        }}>
            <li>Profile information and settings</li>
            <li>All your projects and files</li>
            <li>Activity history and logs</li>
            <li>Shared content and collaborations</li>
          </ul>
        </div>

        <Text size="2" color="gray">
          You'll receive an email with the download link when your export is
          ready.
        </Text>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="blue">
              Start Export
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
}`,
        ...(_G = (_F = W.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  Ve = [
    "Default",
    "DestructiveAction",
    "Confirmation",
    "Warning",
    "Information",
    "LogoutConfirmation",
    "FileDeleteWithDetails",
    "MultipleActions",
    "CustomStyled",
    "PaymentConfirmation",
    "DataExport"
  ];
});
export {
  B as Confirmation,
  N as CustomStyled,
  W as DataExport,
  T as Default,
  b as DestructiveAction,
  _ as FileDeleteWithDetails,
  R as Information,
  S as LogoutConfirmation,
  P as MultipleActions,
  z as PaymentConfirmation,
  w as Warning,
  Ve as __namedExportsOrder,
  __tla,
  Ge as default
};
