import { j as e, T as b, a as n, F as s, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { S as r, __tla as __tla_1 } from "./separator-CnGbT0Tc.js";
import "./preload-helper-D9Z9MdNV.js";
let y, v, T, m, p, h, g, t, j, o, z, l, d, x, c, S, u, a, f, k;
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y, _Z, __, _$;
  k = {
    title: "Base/Separator",
    component: r,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (i) => e.jsx(b, {
        children: e.jsx("div", {
          style: {
            width: "300px",
            padding: "20px"
          },
          children: e.jsx(i, {})
        })
      })
    ],
    argTypes: {
      size: {
        control: "select",
        options: [
          "1",
          "2",
          "3",
          "4"
        ],
        description: "Separator thickness"
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
        description: "Separator color"
      },
      orientation: {
        control: "select",
        options: [
          "horizontal",
          "vertical"
        ],
        description: "Separator orientation"
      }
    },
    args: {
      size: "1",
      orientation: "horizontal"
    }
  };
  t = {
    render: (i) => e.jsxs("div", {
      children: [
        e.jsx(n, {
          size: "2",
          children: "Content above"
        }),
        e.jsx(r, {
          ...i,
          style: {
            margin: "16px 0"
          }
        }),
        e.jsx(n, {
          size: "2",
          children: "Content below"
        })
      ]
    })
  };
  o = {
    render: (i) => e.jsxs(s, {
      direction: "column",
      gap: "3",
      children: [
        e.jsx(n, {
          size: "2",
          children: "First section"
        }),
        e.jsx(r, {
          orientation: "horizontal"
        }),
        e.jsx(n, {
          size: "2",
          children: "Second section"
        }),
        e.jsx(r, {
          orientation: "horizontal"
        }),
        e.jsx(n, {
          size: "2",
          children: "Third section"
        })
      ]
    })
  };
  a = {
    render: (i) => e.jsxs(s, {
      align: "center",
      gap: "3",
      style: {
        height: "100px"
      },
      children: [
        e.jsx(n, {
          size: "2",
          children: "Left"
        }),
        e.jsx(r, {
          orientation: "vertical"
        }),
        e.jsx(n, {
          size: "2",
          children: "Middle"
        }),
        e.jsx(r, {
          orientation: "vertical"
        }),
        e.jsx(n, {
          size: "2",
          children: "Right"
        })
      ]
    })
  };
  l = {
    render: (i) => e.jsxs("div", {
      children: [
        e.jsx(n, {
          size: "2",
          children: "Size 1 (Thin)"
        }),
        e.jsx(r, {
          size: "1",
          style: {
            margin: "16px 0"
          }
        }),
        e.jsx(n, {
          size: "2",
          children: "Content below"
        })
      ]
    })
  };
  d = {
    render: (i) => e.jsxs("div", {
      children: [
        e.jsx(n, {
          size: "2",
          children: "Size 2 (Default)"
        }),
        e.jsx(r, {
          size: "2",
          style: {
            margin: "16px 0"
          }
        }),
        e.jsx(n, {
          size: "2",
          children: "Content below"
        })
      ]
    })
  };
  x = {
    render: (i) => e.jsxs("div", {
      children: [
        e.jsx(n, {
          size: "2",
          children: "Size 3 (Medium)"
        }),
        e.jsx(r, {
          size: "3",
          style: {
            margin: "16px 0"
          }
        }),
        e.jsx(n, {
          size: "2",
          children: "Content below"
        })
      ]
    })
  };
  c = {
    render: (i) => e.jsxs("div", {
      children: [
        e.jsx(n, {
          size: "2",
          children: "Size 4 (Thick)"
        }),
        e.jsx(r, {
          size: "4",
          style: {
            margin: "16px 0"
          }
        }),
        e.jsx(n, {
          size: "2",
          children: "Content below"
        })
      ]
    })
  };
  p = {
    render: (i) => e.jsxs("div", {
      children: [
        e.jsx(n, {
          size: "2",
          children: "Gray separator"
        }),
        e.jsx(r, {
          color: "gray",
          style: {
            margin: "16px 0"
          }
        }),
        e.jsx(n, {
          size: "2",
          children: "Content below"
        })
      ]
    })
  };
  m = {
    render: (i) => e.jsxs("div", {
      children: [
        e.jsx(n, {
          size: "2",
          children: "Blue separator"
        }),
        e.jsx(r, {
          color: "blue",
          style: {
            margin: "16px 0"
          }
        }),
        e.jsx(n, {
          size: "2",
          children: "Content below"
        })
      ]
    })
  };
  g = {
    render: (i) => e.jsxs("div", {
      children: [
        e.jsx(n, {
          size: "2",
          children: "Red separator"
        }),
        e.jsx(r, {
          color: "red",
          style: {
            margin: "16px 0"
          }
        }),
        e.jsx(n, {
          size: "2",
          children: "Content below"
        })
      ]
    })
  };
  h = {
    render: (i) => e.jsxs("div", {
      children: [
        e.jsx(n, {
          size: "2",
          children: "Green separator"
        }),
        e.jsx(r, {
          color: "green",
          style: {
            margin: "16px 0"
          }
        }),
        e.jsx(n, {
          size: "2",
          children: "Content below"
        })
      ]
    })
  };
  y = {
    render: () => e.jsxs(s, {
      direction: "column",
      gap: "4",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Size 1"
            }),
            e.jsx(r, {
              size: "1"
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Size 2"
            }),
            e.jsx(r, {
              size: "2"
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Size 3"
            }),
            e.jsx(r, {
              size: "3"
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "2",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Size 4"
            }),
            e.jsx(r, {
              size: "4"
            })
          ]
        })
      ]
    })
  };
  z = {
    render: () => e.jsx("div", {
      style: {
        maxWidth: "250px"
      },
      children: e.jsxs(s, {
        direction: "column",
        gap: "2",
        children: [
          e.jsx(n, {
            size: "2",
            weight: "medium",
            style: {
              padding: "8px 0"
            },
            children: "Dashboard"
          }),
          e.jsx(r, {}),
          e.jsx(n, {
            size: "2",
            weight: "medium",
            style: {
              padding: "8px 0"
            },
            children: "Projects"
          }),
          e.jsx(r, {}),
          e.jsx(n, {
            size: "2",
            weight: "medium",
            style: {
              padding: "8px 0"
            },
            children: "Team"
          }),
          e.jsx(r, {}),
          e.jsx(n, {
            size: "2",
            weight: "medium",
            style: {
              padding: "8px 0"
            },
            children: "Settings"
          })
        ]
      })
    })
  };
  u = {
    render: () => e.jsxs("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "8px 12px",
        border: "1px solid #e1e5e9",
        borderRadius: "6px"
      },
      children: [
        e.jsx(n, {
          size: "2",
          style: {
            cursor: "pointer"
          },
          children: "Bold"
        }),
        e.jsx(r, {
          orientation: "vertical",
          style: {
            height: "20px"
          }
        }),
        e.jsx(n, {
          size: "2",
          style: {
            cursor: "pointer"
          },
          children: "Italic"
        }),
        e.jsx(r, {
          orientation: "vertical",
          style: {
            height: "20px"
          }
        }),
        e.jsx(n, {
          size: "2",
          style: {
            cursor: "pointer"
          },
          children: "Underline"
        }),
        e.jsx(r, {
          orientation: "vertical",
          style: {
            height: "20px"
          }
        }),
        e.jsx(n, {
          size: "2",
          style: {
            cursor: "pointer"
          },
          children: "Link"
        })
      ]
    })
  };
  T = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "300px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        overflow: "hidden"
      },
      children: [
        e.jsxs("div", {
          style: {
            padding: "16px"
          },
          children: [
            e.jsx(n, {
              size: "3",
              weight: "bold",
              children: "User Profile"
            }),
            e.jsx(n, {
              size: "2",
              color: "gray",
              style: {
                marginTop: "4px"
              },
              children: "John Doe"
            })
          ]
        }),
        e.jsx(r, {}),
        e.jsxs("div", {
          style: {
            padding: "16px"
          },
          children: [
            e.jsx(n, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "8px"
              },
              children: "Contact Info"
            }),
            e.jsx(n, {
              size: "2",
              children: "john.doe@example.com"
            }),
            e.jsx(n, {
              size: "2",
              children: "+1 (555) 123-4567"
            })
          ]
        }),
        e.jsx(r, {}),
        e.jsxs("div", {
          style: {
            padding: "16px"
          },
          children: [
            e.jsx(n, {
              size: "2",
              weight: "medium",
              style: {
                marginBottom: "8px"
              },
              children: "Location"
            }),
            e.jsx(n, {
              size: "2",
              children: "San Francisco, CA"
            })
          ]
        })
      ]
    })
  };
  j = {
    render: () => e.jsx("div", {
      style: {
        maxWidth: "350px"
      },
      children: e.jsxs("div", {
        children: [
          e.jsx(n, {
            size: "3",
            weight: "bold",
            style: {
              marginBottom: "16px",
              display: "block"
            },
            children: "Account Settings"
          }),
          e.jsxs("div", {
            style: {
              marginBottom: "20px"
            },
            children: [
              e.jsx(n, {
                size: "2",
                weight: "medium",
                style: {
                  marginBottom: "8px",
                  display: "block"
                },
                children: "Personal Information"
              }),
              e.jsx(n, {
                size: "2",
                color: "gray",
                children: "Update your personal details"
              })
            ]
          }),
          e.jsx(r, {
            style: {
              margin: "20px 0"
            }
          }),
          e.jsxs("div", {
            style: {
              marginBottom: "20px"
            },
            children: [
              e.jsx(n, {
                size: "2",
                weight: "medium",
                style: {
                  marginBottom: "8px",
                  display: "block"
                },
                children: "Security Settings"
              }),
              e.jsx(n, {
                size: "2",
                color: "gray",
                children: "Manage your password and 2FA"
              })
            ]
          }),
          e.jsx(r, {
            style: {
              margin: "20px 0"
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
                children: "Notifications"
              }),
              e.jsx(n, {
                size: "2",
                color: "gray",
                children: "Choose what updates you receive"
              })
            ]
          })
        ]
      })
    })
  };
  v = {
    render: () => e.jsxs(s, {
      align: "center",
      gap: "2",
      children: [
        e.jsx(n, {
          size: "2",
          style: {
            cursor: "pointer"
          },
          children: "Home"
        }),
        e.jsx(r, {
          orientation: "vertical",
          style: {
            height: "16px"
          }
        }),
        e.jsx(n, {
          size: "2",
          style: {
            cursor: "pointer"
          },
          children: "Products"
        }),
        e.jsx(r, {
          orientation: "vertical",
          style: {
            height: "16px"
          }
        }),
        e.jsx(n, {
          size: "2",
          style: {
            cursor: "pointer"
          },
          children: "Electronics"
        }),
        e.jsx(r, {
          orientation: "vertical",
          style: {
            height: "16px"
          }
        }),
        e.jsx(n, {
          size: "2",
          weight: "medium",
          children: "Laptops"
        })
      ]
    })
  };
  S = {
    render: () => e.jsxs("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "0",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        overflow: "hidden"
      },
      children: [
        e.jsxs("div", {
          style: {
            padding: "20px",
            textAlign: "center"
          },
          children: [
            e.jsx(n, {
              size: "4",
              weight: "bold",
              style: {
                display: "block"
              },
              children: "1,234"
            }),
            e.jsx(n, {
              size: "2",
              color: "gray",
              children: "Users"
            })
          ]
        }),
        e.jsxs("div", {
          style: {
            position: "relative"
          },
          children: [
            e.jsx(r, {
              orientation: "vertical",
              style: {
                height: "100%"
              }
            }),
            e.jsxs("div", {
              style: {
                padding: "20px",
                textAlign: "center"
              },
              children: [
                e.jsx(n, {
                  size: "4",
                  weight: "bold",
                  style: {
                    display: "block"
                  },
                  children: "567"
                }),
                e.jsx(n, {
                  size: "2",
                  color: "gray",
                  children: "Orders"
                })
              ]
            })
          ]
        }),
        e.jsxs("div", {
          style: {
            position: "relative"
          },
          children: [
            e.jsx(r, {
              orientation: "vertical",
              style: {
                height: "100%"
              }
            }),
            e.jsxs("div", {
              style: {
                padding: "20px",
                textAlign: "center"
              },
              children: [
                e.jsx(n, {
                  size: "4",
                  weight: "bold",
                  style: {
                    display: "block"
                  },
                  children: "89%"
                }),
                e.jsx(n, {
                  size: "2",
                  color: "gray",
                  children: "Success"
                })
              ]
            })
          ]
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
  render: args => <div>
      <Text size="2">Content above</Text>
      <Separator {...args} style={{
      margin: "16px 0"
    }} />
      <Text size="2">Content below</Text>
    </div>
}`,
        ...(_c = (_b = t.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  o.parameters = {
    ...o.parameters,
    docs: {
      ...(_d = o.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: _args => <Flex direction="column" gap="3">
      <Text size="2">First section</Text>
      <Separator orientation="horizontal" />
      <Text size="2">Second section</Text>
      <Separator orientation="horizontal" />
      <Text size="2">Third section</Text>
    </Flex>
}`,
        ...(_f = (_e = o.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  a.parameters = {
    ...a.parameters,
    docs: {
      ...(_g = a.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: _args => <Flex align="center" gap="3" style={{
    height: "100px"
  }}>
      <Text size="2">Left</Text>
      <Separator orientation="vertical" />
      <Text size="2">Middle</Text>
      <Separator orientation="vertical" />
      <Text size="2">Right</Text>
    </Flex>
}`,
        ...(_i = (_h = a.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_j = l.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2">Size 1 (Thin)</Text>
      <Separator size="1" style={{
      margin: "16px 0"
    }} />
      <Text size="2">Content below</Text>
    </div>
}`,
        ...(_l = (_k = l.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  d.parameters = {
    ...d.parameters,
    docs: {
      ...(_m = d.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2">Size 2 (Default)</Text>
      <Separator size="2" style={{
      margin: "16px 0"
    }} />
      <Text size="2">Content below</Text>
    </div>
}`,
        ...(_o = (_n = d.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_p = x.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2">Size 3 (Medium)</Text>
      <Separator size="3" style={{
      margin: "16px 0"
    }} />
      <Text size="2">Content below</Text>
    </div>
}`,
        ...(_r = (_q = x.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  c.parameters = {
    ...c.parameters,
    docs: {
      ...(_s = c.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2">Size 4 (Thick)</Text>
      <Separator size="4" style={{
      margin: "16px 0"
    }} />
      <Text size="2">Content below</Text>
    </div>
}`,
        ...(_u = (_t = c.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_v = p.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2">Gray separator</Text>
      <Separator color="gray" style={{
      margin: "16px 0"
    }} />
      <Text size="2">Content below</Text>
    </div>
}`,
        ...(_x = (_w = p.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_y = m.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2">Blue separator</Text>
      <Separator color="blue" style={{
      margin: "16px 0"
    }} />
      <Text size="2">Content below</Text>
    </div>
}`,
        ...(_A = (_z = m.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  g.parameters = {
    ...g.parameters,
    docs: {
      ...(_B = g.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2">Red separator</Text>
      <Separator color="red" style={{
      margin: "16px 0"
    }} />
      <Text size="2">Content below</Text>
    </div>
}`,
        ...(_D = (_C = g.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_E = h.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: _args => <div>
      <Text size="2">Green separator</Text>
      <Separator color="green" style={{
      margin: "16px 0"
    }} />
      <Text size="2">Content below</Text>
    </div>
}`,
        ...(_G = (_F = h.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_H = y.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4">
      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Size 1
        </Text>
        <Separator size="1" />
      </div>
      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Size 2
        </Text>
        <Separator size="2" />
      </div>
      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Size 3
        </Text>
        <Separator size="3" />
      </div>
      <div>
        <Text size="2" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Size 4
        </Text>
        <Separator size="4" />
      </div>
    </Flex>
}`,
        ...(_J = (_I = y.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_K = z.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "250px"
  }}>
      <Flex direction="column" gap="2">
        <Text size="2" weight="medium" style={{
        padding: "8px 0"
      }}>
          Dashboard
        </Text>
        <Separator />
        <Text size="2" weight="medium" style={{
        padding: "8px 0"
      }}>
          Projects
        </Text>
        <Separator />
        <Text size="2" weight="medium" style={{
        padding: "8px 0"
      }}>
          Team
        </Text>
        <Separator />
        <Text size="2" weight="medium" style={{
        padding: "8px 0"
      }}>
          Settings
        </Text>
      </Flex>
    </div>
}`,
        ...(_M = (_L = z.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_N = u.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "8px 12px",
    border: "1px solid #e1e5e9",
    borderRadius: "6px"
  }}>
      <Text size="2" style={{
      cursor: "pointer"
    }}>
        Bold
      </Text>
      <Separator orientation="vertical" style={{
      height: "20px"
    }} />
      <Text size="2" style={{
      cursor: "pointer"
    }}>
        Italic
      </Text>
      <Separator orientation="vertical" style={{
      height: "20px"
    }} />
      <Text size="2" style={{
      cursor: "pointer"
    }}>
        Underline
      </Text>
      <Separator orientation="vertical" style={{
      height: "20px"
    }} />
      <Text size="2" style={{
      cursor: "pointer"
    }}>
        Link
      </Text>
    </div>
}`,
        ...(_P = (_O = u.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  T.parameters = {
    ...T.parameters,
    docs: {
      ...(_Q = T.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "300px",
    border: "1px solid #e1e5e9",
    borderRadius: "8px",
    overflow: "hidden"
  }}>
      <div style={{
      padding: "16px"
    }}>
        <Text size="3" weight="bold">
          User Profile
        </Text>
        <Text size="2" color="gray" style={{
        marginTop: "4px"
      }}>
          John Doe
        </Text>
      </div>

      <Separator />

      <div style={{
      padding: "16px"
    }}>
        <Text size="2" weight="medium" style={{
        marginBottom: "8px"
      }}>
          Contact Info
        </Text>
        <Text size="2">john.doe@example.com</Text>
        <Text size="2">+1 (555) 123-4567</Text>
      </div>

      <Separator />

      <div style={{
      padding: "16px"
    }}>
        <Text size="2" weight="medium" style={{
        marginBottom: "8px"
      }}>
          Location
        </Text>
        <Text size="2">San Francisco, CA</Text>
      </div>
    </div>
}`,
        ...(_S = (_R = T.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_T = j.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "350px"
  }}>
      <div>
        <Text size="3" weight="bold" style={{
        marginBottom: "16px",
        display: "block"
      }}>
          Account Settings
        </Text>

        <div style={{
        marginBottom: "20px"
      }}>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Personal Information
          </Text>
          <Text size="2" color="gray">
            Update your personal details
          </Text>
        </div>

        <Separator style={{
        margin: "20px 0"
      }} />

        <div style={{
        marginBottom: "20px"
      }}>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Security Settings
          </Text>
          <Text size="2" color="gray">
            Manage your password and 2FA
          </Text>
        </div>

        <Separator style={{
        margin: "20px 0"
      }} />

        <div>
          <Text size="2" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Notifications
          </Text>
          <Text size="2" color="gray">
            Choose what updates you receive
          </Text>
        </div>
      </div>
    </div>
}`,
        ...(_V = (_U = j.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  v.parameters = {
    ...v.parameters,
    docs: {
      ...(_W = v.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  render: () => <Flex align="center" gap="2">
      <Text size="2" style={{
      cursor: "pointer"
    }}>
        Home
      </Text>
      <Separator orientation="vertical" style={{
      height: "16px"
    }} />
      <Text size="2" style={{
      cursor: "pointer"
    }}>
        Products
      </Text>
      <Separator orientation="vertical" style={{
      height: "16px"
    }} />
      <Text size="2" style={{
      cursor: "pointer"
    }}>
        Electronics
      </Text>
      <Separator orientation="vertical" style={{
      height: "16px"
    }} />
      <Text size="2" weight="medium">
        Laptops
      </Text>
    </Flex>
}`,
        ...(_Y = (_X = v.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  S.parameters = {
    ...S.parameters,
    docs: {
      ...(_Z = S.parameters) == null ? void 0 : _Z.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "0",
    border: "1px solid #e1e5e9",
    borderRadius: "8px",
    overflow: "hidden"
  }}>
      <div style={{
      padding: "20px",
      textAlign: "center"
    }}>
        <Text size="4" weight="bold" style={{
        display: "block"
      }}>
          1,234
        </Text>
        <Text size="2" color="gray">
          Users
        </Text>
      </div>

      <div style={{
      position: "relative"
    }}>
        <Separator orientation="vertical" style={{
        height: "100%"
      }} />
        <div style={{
        padding: "20px",
        textAlign: "center"
      }}>
          <Text size="4" weight="bold" style={{
          display: "block"
        }}>
            567
          </Text>
          <Text size="2" color="gray">
            Orders
          </Text>
        </div>
      </div>

      <div style={{
      position: "relative"
    }}>
        <Separator orientation="vertical" style={{
        height: "100%"
      }} />
        <div style={{
        padding: "20px",
        textAlign: "center"
      }}>
          <Text size="4" weight="bold" style={{
          display: "block"
        }}>
            89%
          </Text>
          <Text size="2" color="gray">
            Success
          </Text>
        </div>
      </div>
    </div>
}`,
        ...(_$ = (__ = S.parameters) == null ? void 0 : __.docs) == null ? void 0 : _$.source
      }
    }
  };
  f = [
    "Default",
    "Horizontal",
    "Vertical",
    "Size1",
    "Size2",
    "Size3",
    "Size4",
    "ColorGray",
    "ColorBlue",
    "ColorRed",
    "ColorGreen",
    "AllSizes",
    "NavigationExample",
    "ToolbarExample",
    "CardSectionsExample",
    "FormSectionsExample",
    "BreadcrumbExample",
    "StatsDashboardExample"
  ];
});
export {
  y as AllSizes,
  v as BreadcrumbExample,
  T as CardSectionsExample,
  m as ColorBlue,
  p as ColorGray,
  h as ColorGreen,
  g as ColorRed,
  t as Default,
  j as FormSectionsExample,
  o as Horizontal,
  z as NavigationExample,
  l as Size1,
  d as Size2,
  x as Size3,
  c as Size4,
  S as StatsDashboardExample,
  u as ToolbarExample,
  a as Vertical,
  f as __namedExportsOrder,
  __tla,
  k as default
};
