import { j as e, T as k, a as n, F as c, r as T, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { S as x, __tla as __tla_1 } from "./separator-CnGbT0Tc.js";
import { P as a, a as d, b as p, __tla as __tla_2 } from "./popover-DV0bW1sX.js";
import { B as t, __tla as __tla_3 } from "./button-BF2Wetgg.js";
import { I as z, __tla as __tla_4 } from "./icon-button-DBeYp-S7.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_5 } from "./index-ChItmDsK.js";
import { __tla as __tla_6 } from "./index-CEOg2jVB.js";
import { __tla as __tla_7 } from "./index-DfrOcl7X.js";
import { __tla as __tla_8 } from "./require-react-element-D0otgQnF.js";
import { __tla as __tla_9 } from "./base-button-BHQkXpSv.js";
let j, v, u, w, b, m, C, y, f, h, N, L;
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
  })(),
  (() => {
    try {
      return __tla_8;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_9;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D;
  L = {
    title: "Base/Popover",
    component: a,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (r) => e.jsx(k, {
        children: e.jsx("div", {
          style: {
            padding: "40px"
          },
          children: e.jsx(r, {})
        })
      })
    ]
  };
  u = {
    render: (r) => e.jsxs(a, {
      children: [
        e.jsx(d, {
          children: e.jsx(t, {
            children: "Open Popover"
          })
        }),
        e.jsxs(p, {
          style: {
            width: "300px"
          },
          children: [
            e.jsx(n, {
              size: "3",
              weight: "medium",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Popover Title"
            }),
            e.jsx(n, {
              size: "2",
              style: {
                lineHeight: "1.5"
              },
              children: "This is a simple popover with some content. You can put any elements inside the popover content area."
            })
          ]
        })
      ]
    })
  };
  h = {
    render: (r) => e.jsxs(a, {
      children: [
        e.jsx(d, {
          children: e.jsx(t, {
            variant: "ghost",
            style: {
              padding: "4px"
            },
            children: e.jsx("div", {
              style: {
                width: "32px",
                height: "32px",
                backgroundColor: "#3b82f6",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: "14px",
                fontWeight: "bold"
              },
              children: "JD"
            })
          })
        }),
        e.jsxs(p, {
          style: {
            width: "280px"
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
                    width: "60px",
                    height: "60px",
                    backgroundColor: "#3b82f6",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "24px",
                    fontWeight: "bold",
                    margin: "0 auto 12px"
                  },
                  children: "JD"
                }),
                e.jsx(n, {
                  size: "3",
                  weight: "bold",
                  style: {
                    display: "block"
                  },
                  children: "John Doe"
                }),
                e.jsx(n, {
                  size: "2",
                  color: "gray",
                  style: {
                    display: "block"
                  },
                  children: "Senior Developer"
                }),
                e.jsx(n, {
                  size: "2",
                  color: "gray",
                  style: {
                    display: "block"
                  },
                  children: "john.doe@company.com"
                })
              ]
            }),
            e.jsx(x, {
              style: {
                margin: "12px 0"
              }
            }),
            e.jsxs(c, {
              direction: "column",
              gap: "2",
              children: [
                e.jsxs(n, {
                  size: "2",
                  style: {
                    display: "flex",
                    justifyContent: "space-between"
                  },
                  children: [
                    e.jsx("span", {
                      children: "Projects:"
                    }),
                    e.jsx("span", {
                      style: {
                        fontWeight: "medium"
                      },
                      children: "12"
                    })
                  ]
                }),
                e.jsxs(n, {
                  size: "2",
                  style: {
                    display: "flex",
                    justifyContent: "space-between"
                  },
                  children: [
                    e.jsx("span", {
                      children: "Tasks completed:"
                    }),
                    e.jsx("span", {
                      style: {
                        fontWeight: "medium"
                      },
                      children: "89"
                    })
                  ]
                }),
                e.jsxs(n, {
                  size: "2",
                  style: {
                    display: "flex",
                    justifyContent: "space-between"
                  },
                  children: [
                    e.jsx("span", {
                      children: "Team:"
                    }),
                    e.jsx("span", {
                      style: {
                        fontWeight: "medium"
                      },
                      children: "Frontend"
                    })
                  ]
                })
              ]
            }),
            e.jsx(x, {
              style: {
                margin: "12px 0"
              }
            }),
            e.jsxs(c, {
              gap: "2",
              children: [
                e.jsx(t, {
                  size: "1",
                  variant: "soft",
                  style: {
                    flex: 1
                  },
                  children: "\u{1F4AC} Message"
                }),
                e.jsx(t, {
                  size: "1",
                  variant: "outline",
                  style: {
                    flex: 1
                  },
                  children: "\u{1F441}\uFE0F View Profile"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  m = {
    render: (r) => e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px"
      },
      children: [
        e.jsx(n, {
          size: "2",
          children: "API Key"
        }),
        e.jsxs(a, {
          children: [
            e.jsx(d, {
              children: e.jsx(z, {
                size: "1",
                variant: "ghost",
                style: {
                  color: "#6b7280"
                },
                children: "\u2753"
              })
            }),
            e.jsxs(p, {
              style: {
                width: "250px"
              },
              children: [
                e.jsx(n, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px",
                    display: "block"
                  },
                  children: "What is an API Key?"
                }),
                e.jsx(n, {
                  size: "2",
                  style: {
                    lineHeight: "1.5",
                    marginBottom: "12px"
                  },
                  children: "An API key is a unique identifier that authenticates your requests to our service. Keep it secure and don't share it publicly."
                }),
                e.jsx(n, {
                  size: "1",
                  color: "blue",
                  style: {
                    cursor: "pointer"
                  },
                  children: "Learn more about API security \u2192"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  y = {
    render: (r) => e.jsxs(a, {
      children: [
        e.jsx(d, {
          children: e.jsx(z, {
            variant: "ghost",
            children: "\u2699\uFE0F"
          })
        }),
        e.jsxs(p, {
          style: {
            width: "240px"
          },
          children: [
            e.jsx(n, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Quick Settings"
            }),
            e.jsxs(c, {
              direction: "column",
              gap: "3",
              children: [
                e.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  },
                  children: [
                    e.jsx(n, {
                      size: "2",
                      children: "Dark Mode"
                    }),
                    e.jsx(t, {
                      size: "1",
                      variant: "soft",
                      children: "Toggle"
                    })
                  ]
                }),
                e.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  },
                  children: [
                    e.jsx(n, {
                      size: "2",
                      children: "Notifications"
                    }),
                    e.jsx(t, {
                      size: "1",
                      variant: "soft",
                      children: "On"
                    })
                  ]
                }),
                e.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  },
                  children: [
                    e.jsx(n, {
                      size: "2",
                      children: "Auto-save"
                    }),
                    e.jsx(t, {
                      size: "1",
                      variant: "outline",
                      children: "Off"
                    })
                  ]
                })
              ]
            }),
            e.jsx(x, {
              style: {
                margin: "12px 0"
              }
            }),
            e.jsx(t, {
              size: "2",
              variant: "outline",
              style: {
                width: "100%"
              },
              children: "Advanced Settings"
            })
          ]
        })
      ]
    })
  };
  v = {
    render: (r) => {
      const [o, l] = T.useState("#3b82f6"), i = [
        "#ef4444",
        "#f97316",
        "#f59e0b",
        "#eab308",
        "#22c55e",
        "#10b981",
        "#06b6d4",
        "#3b82f6",
        "#6366f1",
        "#8b5cf6",
        "#a855f7",
        "#d946ef",
        "#ec4899",
        "#f43f5e",
        "#6b7280",
        "#374151"
      ];
      return e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px"
        },
        children: [
          e.jsx(n, {
            size: "2",
            children: "Color:"
          }),
          e.jsxs(a, {
            children: [
              e.jsx(d, {
                children: e.jsx("button", {
                  style: {
                    width: "32px",
                    height: "32px",
                    borderRadius: "6px",
                    border: "2px solid #e1e5e9",
                    backgroundColor: o,
                    cursor: "pointer"
                  }
                })
              }),
              e.jsxs(p, {
                style: {
                  width: "200px"
                },
                children: [
                  e.jsx(n, {
                    size: "2",
                    weight: "medium",
                    style: {
                      marginBottom: "12px",
                      display: "block"
                    },
                    children: "Choose Color"
                  }),
                  e.jsx("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(4, 1fr)",
                      gap: "8px",
                      marginBottom: "12px"
                    },
                    children: i.map((s) => e.jsx("button", {
                      onClick: () => l(s),
                      style: {
                        width: "32px",
                        height: "32px",
                        borderRadius: "4px",
                        border: o === s ? "2px solid #000" : "1px solid #e1e5e9",
                        backgroundColor: s,
                        cursor: "pointer"
                      }
                    }, s))
                  }),
                  e.jsxs("div", {
                    style: {
                      marginBottom: "8px"
                    },
                    children: [
                      e.jsx(n, {
                        size: "1",
                        color: "gray",
                        style: {
                          display: "block",
                          marginBottom: "4px"
                        },
                        children: "Custom Color"
                      }),
                      e.jsx("input", {
                        type: "color",
                        value: o,
                        onChange: (s) => l(s.target.value),
                        style: {
                          width: "100%",
                          height: "32px",
                          border: "none",
                          borderRadius: "4px"
                        }
                      })
                    ]
                  }),
                  e.jsxs(n, {
                    size: "1",
                    color: "gray",
                    children: [
                      "Selected: ",
                      o
                    ]
                  })
                ]
              })
            ]
          })
        ]
      });
    }
  };
  f = {
    render: (r) => e.jsxs(a, {
      children: [
        e.jsx(d, {
          children: e.jsx(t, {
            variant: "outline",
            children: "\u{1F4E4} Share"
          })
        }),
        e.jsxs(p, {
          style: {
            width: "320px"
          },
          children: [
            e.jsx(n, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Share this project"
            }),
            e.jsxs("div", {
              style: {
                padding: "8px",
                backgroundColor: "#f8f9fa",
                borderRadius: "6px",
                marginBottom: "12px",
                display: "flex",
                gap: "8px"
              },
              children: [
                e.jsx("input", {
                  type: "text",
                  value: "https://app.example.com/projects/abc123",
                  readOnly: true,
                  style: {
                    flex: 1,
                    padding: "4px 8px",
                    border: "none",
                    backgroundColor: "transparent",
                    fontSize: "14px"
                  }
                }),
                e.jsx(t, {
                  size: "1",
                  variant: "soft",
                  children: "\u{1F4CB} Copy"
                })
              ]
            }),
            e.jsx(n, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Share via"
            }),
            e.jsxs(c, {
              gap: "2",
              style: {
                marginBottom: "12px"
              },
              children: [
                e.jsx(t, {
                  size: "1",
                  variant: "soft",
                  style: {
                    flex: 1
                  },
                  children: "\u{1F4E7} Email"
                }),
                e.jsx(t, {
                  size: "1",
                  variant: "soft",
                  style: {
                    flex: 1
                  },
                  children: "\u{1F4AC} Slack"
                }),
                e.jsx(t, {
                  size: "1",
                  variant: "soft",
                  style: {
                    flex: 1
                  },
                  children: "\u{1F426} Twitter"
                })
              ]
            }),
            e.jsx(x, {
              style: {
                margin: "12px 0"
              }
            }),
            e.jsxs("div", {
              children: [
                e.jsx(n, {
                  size: "2",
                  weight: "medium",
                  style: {
                    marginBottom: "8px",
                    display: "block"
                  },
                  children: "Access Level"
                }),
                e.jsxs("select", {
                  style: {
                    width: "100%",
                    padding: "8px",
                    border: "1px solid #e1e5e9",
                    borderRadius: "4px",
                    fontSize: "14px"
                  },
                  children: [
                    e.jsx("option", {
                      children: "Can view"
                    }),
                    e.jsx("option", {
                      children: "Can edit"
                    }),
                    e.jsx("option", {
                      children: "Can admin"
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
  j = {
    render: (r) => {
      const [o, l] = T.useState(/* @__PURE__ */ new Date());
      return e.jsxs(a, {
        children: [
          e.jsx(d, {
            children: e.jsxs(t, {
              variant: "outline",
              children: [
                "\u{1F4C5} ",
                o.toLocaleDateString()
              ]
            })
          }),
          e.jsxs(p, {
            style: {
              width: "280px"
            },
            children: [
              e.jsx(n, {
                size: "2",
                weight: "medium",
                style: {
                  marginBottom: "12px",
                  display: "block"
                },
                children: "Select Date"
              }),
              e.jsxs("div", {
                style: {
                  display: "grid",
                  gridTemplateColumns: "repeat(7, 1fr)",
                  gap: "4px",
                  marginBottom: "12px"
                },
                children: [
                  [
                    "Su",
                    "Mo",
                    "Tu",
                    "We",
                    "Th",
                    "Fr",
                    "Sa"
                  ].map((i) => e.jsx("div", {
                    style: {
                      padding: "8px 4px",
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#6b7280"
                    },
                    children: i
                  }, i)),
                  Array.from({
                    length: 35
                  }, (i, s) => {
                    const g = new Date(2024, 2, s - 5), P = g.toDateString() === o.toDateString(), B = g.toDateString() === (/* @__PURE__ */ new Date()).toDateString(), S = g.getMonth() === 2;
                    return e.jsx("button", {
                      onClick: () => l(g),
                      style: {
                        padding: "8px 4px",
                        border: "none",
                        borderRadius: "4px",
                        backgroundColor: P ? "#3b82f6" : "transparent",
                        color: P ? "white" : S ? "#374151" : "#d1d5db",
                        fontSize: "14px",
                        cursor: "pointer",
                        fontWeight: B ? "bold" : "normal"
                      },
                      children: g.getDate()
                    }, s);
                  })
                ]
              }),
              e.jsxs(c, {
                justify: "between",
                children: [
                  e.jsx(t, {
                    size: "1",
                    variant: "ghost",
                    children: "\u2190 Previous"
                  }),
                  e.jsx(n, {
                    size: "2",
                    weight: "medium",
                    children: "March 2024"
                  }),
                  e.jsx(t, {
                    size: "1",
                    variant: "ghost",
                    children: "Next \u2192"
                  })
                ]
              })
            ]
          })
        ]
      });
    }
  };
  b = {
    render: (r) => {
      const [o, l] = T.useState({
        status: "all",
        priority: "all",
        assignee: "all"
      });
      return e.jsxs(a, {
        children: [
          e.jsx(d, {
            children: e.jsxs(t, {
              variant: "outline",
              children: [
                "\u{1F50D} Filters",
                Object.values(o).some((i) => i !== "all") && e.jsx("span", {
                  style: {
                    marginLeft: "4px",
                    backgroundColor: "#3b82f6",
                    color: "white",
                    borderRadius: "50%",
                    width: "16px",
                    height: "16px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "10px"
                  },
                  children: "\u2022"
                })
              ]
            })
          }),
          e.jsxs(p, {
            style: {
              width: "240px"
            },
            children: [
              e.jsx(n, {
                size: "2",
                weight: "medium",
                style: {
                  marginBottom: "12px",
                  display: "block"
                },
                children: "Filter Tasks"
              }),
              e.jsxs(c, {
                direction: "column",
                gap: "3",
                children: [
                  e.jsxs("div", {
                    children: [
                      e.jsx(n, {
                        size: "2",
                        style: {
                          marginBottom: "4px",
                          display: "block"
                        },
                        children: "Status"
                      }),
                      e.jsxs("select", {
                        value: o.status,
                        onChange: (i) => l({
                          ...o,
                          status: i.target.value
                        }),
                        style: {
                          width: "100%",
                          padding: "6px",
                          border: "1px solid #e1e5e9",
                          borderRadius: "4px",
                          fontSize: "14px"
                        },
                        children: [
                          e.jsx("option", {
                            value: "all",
                            children: "All"
                          }),
                          e.jsx("option", {
                            value: "todo",
                            children: "To Do"
                          }),
                          e.jsx("option", {
                            value: "progress",
                            children: "In Progress"
                          }),
                          e.jsx("option", {
                            value: "done",
                            children: "Done"
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    children: [
                      e.jsx(n, {
                        size: "2",
                        style: {
                          marginBottom: "4px",
                          display: "block"
                        },
                        children: "Priority"
                      }),
                      e.jsxs("select", {
                        value: o.priority,
                        onChange: (i) => l({
                          ...o,
                          priority: i.target.value
                        }),
                        style: {
                          width: "100%",
                          padding: "6px",
                          border: "1px solid #e1e5e9",
                          borderRadius: "4px",
                          fontSize: "14px"
                        },
                        children: [
                          e.jsx("option", {
                            value: "all",
                            children: "All"
                          }),
                          e.jsx("option", {
                            value: "high",
                            children: "High"
                          }),
                          e.jsx("option", {
                            value: "medium",
                            children: "Medium"
                          }),
                          e.jsx("option", {
                            value: "low",
                            children: "Low"
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsxs("div", {
                    children: [
                      e.jsx(n, {
                        size: "2",
                        style: {
                          marginBottom: "4px",
                          display: "block"
                        },
                        children: "Assignee"
                      }),
                      e.jsxs("select", {
                        value: o.assignee,
                        onChange: (i) => l({
                          ...o,
                          assignee: i.target.value
                        }),
                        style: {
                          width: "100%",
                          padding: "6px",
                          border: "1px solid #e1e5e9",
                          borderRadius: "4px",
                          fontSize: "14px"
                        },
                        children: [
                          e.jsx("option", {
                            value: "all",
                            children: "All"
                          }),
                          e.jsx("option", {
                            value: "me",
                            children: "Assigned to me"
                          }),
                          e.jsx("option", {
                            value: "unassigned",
                            children: "Unassigned"
                          })
                        ]
                      })
                    ]
                  })
                ]
              }),
              e.jsx(x, {
                style: {
                  margin: "12px 0"
                }
              }),
              e.jsxs(c, {
                gap: "2",
                children: [
                  e.jsx(t, {
                    size: "1",
                    variant: "ghost",
                    onClick: () => l({
                      status: "all",
                      priority: "all",
                      assignee: "all"
                    }),
                    style: {
                      flex: 1
                    },
                    children: "Reset"
                  }),
                  e.jsx(t, {
                    size: "1",
                    variant: "solid",
                    style: {
                      flex: 1
                    },
                    children: "Apply"
                  })
                ]
              })
            ]
          })
        ]
      });
    }
  };
  C = {
    render: (r) => e.jsxs(a, {
      children: [
        e.jsx(d, {
          children: e.jsx(z, {
            variant: "solid",
            style: {
              borderRadius: "50%"
            },
            children: "\u2795"
          })
        }),
        e.jsxs(p, {
          style: {
            width: "200px"
          },
          children: [
            e.jsx(n, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Quick Actions"
            }),
            e.jsxs(c, {
              direction: "column",
              gap: "2",
              children: [
                e.jsx(t, {
                  variant: "ghost",
                  style: {
                    justifyContent: "flex-start"
                  },
                  children: "\u{1F4DD} New Document"
                }),
                e.jsx(t, {
                  variant: "ghost",
                  style: {
                    justifyContent: "flex-start"
                  },
                  children: "\u{1F4C1} New Folder"
                }),
                e.jsx(t, {
                  variant: "ghost",
                  style: {
                    justifyContent: "flex-start"
                  },
                  children: "\u{1F4CA} New Project"
                }),
                e.jsx(t, {
                  variant: "ghost",
                  style: {
                    justifyContent: "flex-start"
                  },
                  children: "\u{1F465} Invite People"
                })
              ]
            }),
            e.jsx(x, {
              style: {
                margin: "12px 0"
              }
            }),
            e.jsx(t, {
              variant: "ghost",
              style: {
                justifyContent: "flex-start",
                width: "100%"
              },
              children: "\u{1F4E4} Import Files"
            })
          ]
        })
      ]
    })
  };
  w = {
    render: (r) => {
      const [o, l] = T.useState("\u{1F600}"), i = [
        "\u{1F600}",
        "\u{1F603}",
        "\u{1F604}",
        "\u{1F601}",
        "\u{1F60A}",
        "\u{1F607}",
        "\u{1F642}",
        "\u{1F643}",
        "\u{1F609}",
        "\u{1F60C}",
        "\u{1F60D}",
        "\u{1F970}",
        "\u{1F618}",
        "\u{1F617}",
        "\u{1F619}",
        "\u{1F61A}",
        "\u{1F60B}",
        "\u{1F61B}",
        "\u{1F61D}",
        "\u{1F61C}",
        "\u{1F92A}",
        "\u{1F928}",
        "\u{1F9D0}",
        "\u{1F913}",
        "\u{1F60E}",
        "\u{1F929}",
        "\u{1F973}",
        "\u{1F60F}",
        "\u{1F612}",
        "\u{1F61E}",
        "\u{1F614}",
        "\u{1F61F}"
      ];
      return e.jsxs("div", {
        style: {
          display: "flex",
          alignItems: "center",
          gap: "8px"
        },
        children: [
          e.jsx(n, {
            size: "2",
            children: "Reaction:"
          }),
          e.jsxs(a, {
            children: [
              e.jsx(d, {
                children: e.jsx(t, {
                  variant: "outline",
                  size: "2",
                  children: o
                })
              }),
              e.jsxs(p, {
                style: {
                  width: "280px"
                },
                children: [
                  e.jsx(n, {
                    size: "2",
                    weight: "medium",
                    style: {
                      marginBottom: "12px",
                      display: "block"
                    },
                    children: "Choose Emoji"
                  }),
                  e.jsx("div", {
                    style: {
                      display: "grid",
                      gridTemplateColumns: "repeat(8, 1fr)",
                      gap: "4px",
                      maxHeight: "200px",
                      overflowY: "auto"
                    },
                    children: i.map((s) => e.jsx("button", {
                      onClick: () => l(s),
                      style: {
                        width: "32px",
                        height: "32px",
                        border: o === s ? "2px solid #3b82f6" : "1px solid #e1e5e9",
                        borderRadius: "4px",
                        backgroundColor: o === s ? "#eff6ff" : "transparent",
                        fontSize: "18px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      },
                      children: s
                    }, s))
                  })
                ]
              })
            ]
          })
        ]
      });
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_a = u.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: _args => <Popover.Root>
      <Popover.Trigger>
        <Button>Open Popover</Button>
      </Popover.Trigger>

      <Popover.Content style={{
      width: "300px"
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Popover Title
        </Text>
        <Text size="2" style={{
        lineHeight: "1.5"
      }}>
          This is a simple popover with some content. You can put any elements
          inside the popover content area.
        </Text>
      </Popover.Content>
    </Popover.Root>
}`,
        ...(_c = (_b = u.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_d = h.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: _args => <Popover.Root>
      <Popover.Trigger>
        <Button variant="ghost" style={{
        padding: "4px"
      }}>
          <div style={{
          width: "32px",
          height: "32px",
          backgroundColor: "#3b82f6",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "14px",
          fontWeight: "bold"
        }}>
            JD
          </div>
        </Button>
      </Popover.Trigger>

      <Popover.Content style={{
      width: "280px"
    }}>
        <div style={{
        textAlign: "center",
        marginBottom: "16px"
      }}>
          <div style={{
          width: "60px",
          height: "60px",
          backgroundColor: "#3b82f6",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          margin: "0 auto 12px"
        }}>
            JD
          </div>
          <Text size="3" weight="bold" style={{
          display: "block"
        }}>
            John Doe
          </Text>
          <Text size="2" color="gray" style={{
          display: "block"
        }}>
            Senior Developer
          </Text>
          <Text size="2" color="gray" style={{
          display: "block"
        }}>
            john.doe@company.com
          </Text>
        </div>

        <Separator style={{
        margin: "12px 0"
      }} />

        <Flex direction="column" gap="2">
          <Text size="2" style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
            <span>Projects:</span>
            <span style={{
            fontWeight: "medium"
          }}>12</span>
          </Text>
          <Text size="2" style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
            <span>Tasks completed:</span>
            <span style={{
            fontWeight: "medium"
          }}>89</span>
          </Text>
          <Text size="2" style={{
          display: "flex",
          justifyContent: "space-between"
        }}>
            <span>Team:</span>
            <span style={{
            fontWeight: "medium"
          }}>Frontend</span>
          </Text>
        </Flex>

        <Separator style={{
        margin: "12px 0"
      }} />

        <Flex gap="2">
          <Button size="1" variant="soft" style={{
          flex: 1
        }}>
            \u{1F4AC} Message
          </Button>
          <Button size="1" variant="outline" style={{
          flex: 1
        }}>
            \u{1F441}\uFE0F View Profile
          </Button>
        </Flex>
      </Popover.Content>
    </Popover.Root>
}`,
        ...(_f = (_e = h.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_g = m.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "8px"
  }}>
      <Text size="2">API Key</Text>
      <Popover.Root>
        <Popover.Trigger>
          <IconButton size="1" variant="ghost" style={{
          color: "#6b7280"
        }}>
            \u2753
          </IconButton>
        </Popover.Trigger>

        <Popover.Content style={{
        width: "250px"
      }}>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            What is an API Key?
          </Text>
          <Text size="2" style={{
          lineHeight: "1.5",
          marginBottom: "12px"
        }}>
            An API key is a unique identifier that authenticates your requests
            to our service. Keep it secure and don't share it publicly.
          </Text>
          <Text size="1" color="blue" style={{
          cursor: "pointer"
        }}>
            Learn more about API security \u2192
          </Text>
        </Popover.Content>
      </Popover.Root>
    </div>
}`,
        ...(_i = (_h = m.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_j = y.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: _args => <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="ghost">\u2699\uFE0F</IconButton>
      </Popover.Trigger>

      <Popover.Content style={{
      width: "240px"
    }}>
        <Text size="2" weight="medium" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Quick Settings
        </Text>

        <Flex direction="column" gap="3">
          <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
            <Text size="2">Dark Mode</Text>
            <Button size="1" variant="soft">
              Toggle
            </Button>
          </div>

          <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
            <Text size="2">Notifications</Text>
            <Button size="1" variant="soft">
              On
            </Button>
          </div>

          <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
            <Text size="2">Auto-save</Text>
            <Button size="1" variant="outline">
              Off
            </Button>
          </div>
        </Flex>

        <Separator style={{
        margin: "12px 0"
      }} />

        <Button size="2" variant="outline" style={{
        width: "100%"
      }}>
          Advanced Settings
        </Button>
      </Popover.Content>
    </Popover.Root>
}`,
        ...(_l = (_k = y.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_m = v.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: _args => {
    const [selectedColor, setSelectedColor] = React.useState("#3b82f6");
    const colors = ["#ef4444", "#f97316", "#f59e0b", "#eab308", "#22c55e", "#10b981", "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e", "#6b7280", "#374151"];
    return <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}>
        <Text size="2">Color:</Text>
        <Popover.Root>
          <Popover.Trigger>
            <button style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            border: "2px solid #e1e5e9",
            backgroundColor: selectedColor,
            cursor: "pointer"
          }} />
          </Popover.Trigger>

          <Popover.Content style={{
          width: "200px"
        }}>
            <Text size="2" weight="medium" style={{
            marginBottom: "12px",
            display: "block"
          }}>
              Choose Color
            </Text>

            <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "8px",
            marginBottom: "12px"
          }}>
              {colors.map(color => <button key={color} onClick={() => setSelectedColor(color)} style={{
              width: "32px",
              height: "32px",
              borderRadius: "4px",
              border: selectedColor === color ? "2px solid #000" : "1px solid #e1e5e9",
              backgroundColor: color,
              cursor: "pointer"
            }} />)}
            </div>

            <div style={{
            marginBottom: "8px"
          }}>
              <Text size="1" color="gray" style={{
              display: "block",
              marginBottom: "4px"
            }}>
                Custom Color
              </Text>
              <input type="color" value={selectedColor} onChange={e => setSelectedColor(e.target.value)} style={{
              width: "100%",
              height: "32px",
              border: "none",
              borderRadius: "4px"
            }} />
            </div>

            <Text size="1" color="gray">
              Selected: {selectedColor}
            </Text>
          </Popover.Content>
        </Popover.Root>
      </div>;
  }
}`,
        ...(_o = (_n = v.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_p = f.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: _args => <Popover.Root>
      <Popover.Trigger>
        <Button variant="outline">\u{1F4E4} Share</Button>
      </Popover.Trigger>

      <Popover.Content style={{
      width: "320px"
    }}>
        <Text size="2" weight="medium" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Share this project
        </Text>

        <div style={{
        padding: "8px",
        backgroundColor: "#f8f9fa",
        borderRadius: "6px",
        marginBottom: "12px",
        display: "flex",
        gap: "8px"
      }}>
          <input type="text" value="https://app.example.com/projects/abc123" readOnly style={{
          flex: 1,
          padding: "4px 8px",
          border: "none",
          backgroundColor: "transparent",
          fontSize: "14px"
        }} />
          <Button size="1" variant="soft">
            \u{1F4CB} Copy
          </Button>
        </div>

        <Text size="2" weight="medium" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Share via
        </Text>

        <Flex gap="2" style={{
        marginBottom: "12px"
      }}>
          <Button size="1" variant="soft" style={{
          flex: 1
        }}>
            \u{1F4E7} Email
          </Button>
          <Button size="1" variant="soft" style={{
          flex: 1
        }}>
            \u{1F4AC} Slack
          </Button>
          <Button size="1" variant="soft" style={{
          flex: 1
        }}>
            \u{1F426} Twitter
          </Button>
        </Flex>

        <Separator style={{
        margin: "12px 0"
      }} />

        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Access Level
          </Text>
          <select style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #e1e5e9",
          borderRadius: "4px",
          fontSize: "14px"
        }}>
            <option>Can view</option>
            <option>Can edit</option>
            <option>Can admin</option>
          </select>
        </div>
      </Popover.Content>
    </Popover.Root>
}`,
        ...(_r = (_q = f.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_s = j.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: _args => {
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    return <Popover.Root>
        <Popover.Trigger>
          <Button variant="outline">
            \u{1F4C5} {selectedDate.toLocaleDateString()}
          </Button>
        </Popover.Trigger>

        <Popover.Content style={{
        width: "280px"
      }}>
          <Text size="2" weight="medium" style={{
          marginBottom: "12px",
          display: "block"
        }}>
            Select Date
          </Text>

          <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: "4px",
          marginBottom: "12px"
        }}>
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(day => <div key={day} style={{
            padding: "8px 4px",
            textAlign: "center",
            fontSize: "12px",
            fontWeight: "bold",
            color: "#6b7280"
          }}>
                {day}
              </div>)}

            {Array.from({
            length: 35
          }, (_, i) => {
            const date = new Date(2024, 2, i - 5); // March 2024 example
            const isSelected = date.toDateString() === selectedDate.toDateString();
            const isToday = date.toDateString() === new Date().toDateString();
            const isCurrentMonth = date.getMonth() === 2;
            return <button key={i} onClick={() => setSelectedDate(date)} style={{
              padding: "8px 4px",
              border: "none",
              borderRadius: "4px",
              backgroundColor: isSelected ? "#3b82f6" : "transparent",
              color: isSelected ? "white" : isCurrentMonth ? "#374151" : "#d1d5db",
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: isToday ? "bold" : "normal"
            }}>
                  {date.getDate()}
                </button>;
          })}
          </div>

          <Flex justify="between">
            <Button size="1" variant="ghost">
              \u2190 Previous
            </Button>
            <Text size="2" weight="medium">
              March 2024
            </Text>
            <Button size="1" variant="ghost">
              Next \u2192
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>;
  }
}`,
        ...(_u = (_t = j.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_v = b.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: _args => {
    const [filters, setFilters] = React.useState({
      status: "all",
      priority: "all",
      assignee: "all"
    });
    return <Popover.Root>
        <Popover.Trigger>
          <Button variant="outline">
            \u{1F50D} Filters
            {Object.values(filters).some(v => v !== "all") && <span style={{
            marginLeft: "4px",
            backgroundColor: "#3b82f6",
            color: "white",
            borderRadius: "50%",
            width: "16px",
            height: "16px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "10px"
          }}>
                \u2022
              </span>}
          </Button>
        </Popover.Trigger>

        <Popover.Content style={{
        width: "240px"
      }}>
          <Text size="2" weight="medium" style={{
          marginBottom: "12px",
          display: "block"
        }}>
            Filter Tasks
          </Text>

          <Flex direction="column" gap="3">
            <div>
              <Text size="2" style={{
              marginBottom: "4px",
              display: "block"
            }}>
                Status
              </Text>
              <select value={filters.status} onChange={e => setFilters({
              ...filters,
              status: e.target.value
            })} style={{
              width: "100%",
              padding: "6px",
              border: "1px solid #e1e5e9",
              borderRadius: "4px",
              fontSize: "14px"
            }}>
                <option value="all">All</option>
                <option value="todo">To Do</option>
                <option value="progress">In Progress</option>
                <option value="done">Done</option>
              </select>
            </div>

            <div>
              <Text size="2" style={{
              marginBottom: "4px",
              display: "block"
            }}>
                Priority
              </Text>
              <select value={filters.priority} onChange={e => setFilters({
              ...filters,
              priority: e.target.value
            })} style={{
              width: "100%",
              padding: "6px",
              border: "1px solid #e1e5e9",
              borderRadius: "4px",
              fontSize: "14px"
            }}>
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <Text size="2" style={{
              marginBottom: "4px",
              display: "block"
            }}>
                Assignee
              </Text>
              <select value={filters.assignee} onChange={e => setFilters({
              ...filters,
              assignee: e.target.value
            })} style={{
              width: "100%",
              padding: "6px",
              border: "1px solid #e1e5e9",
              borderRadius: "4px",
              fontSize: "14px"
            }}>
                <option value="all">All</option>
                <option value="me">Assigned to me</option>
                <option value="unassigned">Unassigned</option>
              </select>
            </div>
          </Flex>

          <Separator style={{
          margin: "12px 0"
        }} />

          <Flex gap="2">
            <Button size="1" variant="ghost" onClick={() => setFilters({
            status: "all",
            priority: "all",
            assignee: "all"
          })} style={{
            flex: 1
          }}>
              Reset
            </Button>
            <Button size="1" variant="solid" style={{
            flex: 1
          }}>
              Apply
            </Button>
          </Flex>
        </Popover.Content>
      </Popover.Root>;
  }
}`,
        ...(_x = (_w = b.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_y = C.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: _args => <Popover.Root>
      <Popover.Trigger>
        <IconButton variant="solid" style={{
        borderRadius: "50%"
      }}>
          \u2795
        </IconButton>
      </Popover.Trigger>

      <Popover.Content style={{
      width: "200px"
    }}>
        <Text size="2" weight="medium" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Quick Actions
        </Text>

        <Flex direction="column" gap="2">
          <Button variant="ghost" style={{
          justifyContent: "flex-start"
        }}>
            \u{1F4DD} New Document
          </Button>
          <Button variant="ghost" style={{
          justifyContent: "flex-start"
        }}>
            \u{1F4C1} New Folder
          </Button>
          <Button variant="ghost" style={{
          justifyContent: "flex-start"
        }}>
            \u{1F4CA} New Project
          </Button>
          <Button variant="ghost" style={{
          justifyContent: "flex-start"
        }}>
            \u{1F465} Invite People
          </Button>
        </Flex>

        <Separator style={{
        margin: "12px 0"
      }} />

        <Button variant="ghost" style={{
        justifyContent: "flex-start",
        width: "100%"
      }}>
          \u{1F4E4} Import Files
        </Button>
      </Popover.Content>
    </Popover.Root>
}`,
        ...(_A = (_z = C.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  w.parameters = {
    ...w.parameters,
    docs: {
      ...(_B = w.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: _args => {
    const [selectedEmoji, setSelectedEmoji] = React.useState("\u{1F600}");
    const emojis = ["\u{1F600}", "\u{1F603}", "\u{1F604}", "\u{1F601}", "\u{1F60A}", "\u{1F607}", "\u{1F642}", "\u{1F643}", "\u{1F609}", "\u{1F60C}", "\u{1F60D}", "\u{1F970}", "\u{1F618}", "\u{1F617}", "\u{1F619}", "\u{1F61A}", "\u{1F60B}", "\u{1F61B}", "\u{1F61D}", "\u{1F61C}", "\u{1F92A}", "\u{1F928}", "\u{1F9D0}", "\u{1F913}", "\u{1F60E}", "\u{1F929}", "\u{1F973}", "\u{1F60F}", "\u{1F612}", "\u{1F61E}", "\u{1F614}", "\u{1F61F}"];
    return <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}>
        <Text size="2">Reaction:</Text>
        <Popover.Root>
          <Popover.Trigger>
            <Button variant="outline" size="2">
              {selectedEmoji}
            </Button>
          </Popover.Trigger>

          <Popover.Content style={{
          width: "280px"
        }}>
            <Text size="2" weight="medium" style={{
            marginBottom: "12px",
            display: "block"
          }}>
              Choose Emoji
            </Text>

            <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: "4px",
            maxHeight: "200px",
            overflowY: "auto"
          }}>
              {emojis.map(emoji => <button key={emoji} onClick={() => setSelectedEmoji(emoji)} style={{
              width: "32px",
              height: "32px",
              border: selectedEmoji === emoji ? "2px solid #3b82f6" : "1px solid #e1e5e9",
              borderRadius: "4px",
              backgroundColor: selectedEmoji === emoji ? "#eff6ff" : "transparent",
              fontSize: "18px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
                  {emoji}
                </button>)}
            </div>
          </Popover.Content>
        </Popover.Root>
      </div>;
  }
}`,
        ...(_D = (_C = w.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  N = [
    "Default",
    "UserProfile",
    "HelpTooltip",
    "SettingsPopover",
    "ColorPicker",
    "SharePopover",
    "CalendarPopover",
    "FilterPopover",
    "QuickActions",
    "EmojiPicker"
  ];
});
export {
  j as CalendarPopover,
  v as ColorPicker,
  u as Default,
  w as EmojiPicker,
  b as FilterPopover,
  m as HelpTooltip,
  C as QuickActions,
  y as SettingsPopover,
  f as SharePopover,
  h as UserProfile,
  N as __namedExportsOrder,
  __tla,
  L as default
};
