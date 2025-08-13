import { j as e, T as B, F as r, a as n, r as F, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { S as t, __tla as __tla_1 } from "./base-button-BHQkXpSv.js";
import { B as o, __tla as __tla_2 } from "./box-Dr3vL6g-.js";
import { B as a, __tla as __tla_3 } from "./button-BF2Wetgg.js";
import "./preload-helper-D9Z9MdNV.js";
let p, h, s, u, m, x, y, g, z, d, l, c, w, f;
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
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J;
  f = {
    title: "Base/Spinner",
    component: t,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (i) => e.jsx(B, {
        children: e.jsx(i, {})
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
        description: "Spinner size"
      },
      loading: {
        control: "boolean",
        description: "Whether the spinner is loading/visible"
      }
    },
    args: {
      size: "2",
      loading: true
    }
  };
  s = {
    args: {}
  };
  d = {
    args: {
      size: "1"
    }
  };
  l = {
    args: {
      size: "2"
    }
  };
  c = {
    args: {
      size: "3"
    }
  };
  g = {
    args: {
      loading: true
    }
  };
  x = {
    args: {
      loading: false
    }
  };
  p = {
    render: () => e.jsx(r, {
      align: "center",
      gap: "4",
      children: [
        "1",
        "2",
        "3"
      ].map((i) => e.jsxs(r, {
        direction: "column",
        align: "center",
        gap: "2",
        children: [
          e.jsx(t, {
            size: i
          }),
          e.jsxs(n, {
            size: "1",
            color: "gray",
            children: [
              "Size ",
              i
            ]
          })
        ]
      }, i))
    })
  };
  u = {
    render: () => e.jsxs(r, {
      gap: "3",
      align: "center",
      children: [
        e.jsx(a, {
          loading: true,
          size: "1",
          children: "Small Button"
        }),
        e.jsx(a, {
          loading: true,
          size: "2",
          children: "Medium Button"
        }),
        e.jsx(a, {
          loading: true,
          size: "3",
          children: "Large Button"
        }),
        e.jsx(a, {
          loading: true,
          size: "4",
          children: "Extra Large Button"
        })
      ]
    })
  };
  m = {
    render: () => e.jsx(r, {
      direction: "column",
      gap: "6",
      style: {
        width: "400px"
      },
      children: e.jsxs("div", {
        children: [
          e.jsx(n, {
            size: "3",
            weight: "medium",
            style: {
              marginBottom: "12px"
            },
            children: "Loading States"
          }),
          e.jsxs(r, {
            direction: "column",
            gap: "4",
            children: [
              e.jsxs(r, {
                gap: "2",
                align: "center",
                children: [
                  e.jsx(t, {
                    size: "1"
                  }),
                  e.jsx(n, {
                    size: "2",
                    children: "Loading content..."
                  })
                ]
              }),
              e.jsx(o, {
                style: {
                  padding: "16px",
                  backgroundColor: "var(--gray-2)",
                  borderRadius: "8px"
                },
                children: e.jsxs(r, {
                  direction: "column",
                  gap: "3",
                  align: "center",
                  children: [
                    e.jsx(t, {
                      size: "2"
                    }),
                    e.jsx(n, {
                      size: "2",
                      color: "gray",
                      children: "Loading dashboard data"
                    })
                  ]
                })
              }),
              e.jsxs(r, {
                gap: "2",
                children: [
                  e.jsx(a, {
                    loading: true,
                    variant: "solid",
                    children: "Saving..."
                  }),
                  e.jsx(a, {
                    loading: true,
                    variant: "outline",
                    children: "Processing..."
                  }),
                  e.jsx(a, {
                    loading: true,
                    variant: "ghost",
                    children: "Loading..."
                  })
                ]
              })
            ]
          })
        ]
      })
    })
  };
  h = {
    render: () => {
      const [i, j] = F.useState(false), b = () => {
        j(true), setTimeout(() => j(false), 3e3);
      };
      return e.jsxs(r, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(n, {
            size: "3",
            weight: "medium",
            children: "Interactive Loading Demo"
          }),
          e.jsx(o, {
            style: {
              padding: "32px",
              backgroundColor: "var(--gray-2)",
              borderRadius: "8px",
              minHeight: "120px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "200px"
            },
            children: i ? e.jsxs(r, {
              direction: "column",
              gap: "2",
              align: "center",
              children: [
                e.jsx(t, {
                  size: "2"
                }),
                e.jsx(n, {
                  size: "2",
                  color: "gray",
                  children: "Loading data..."
                })
              ]
            }) : e.jsx(n, {
              size: "3",
              children: "Content loaded!"
            })
          }),
          e.jsx(a, {
            onClick: b,
            disabled: i,
            children: i ? "Loading..." : "Start Loading"
          })
        ]
      });
    }
  };
  y = {
    render: () => e.jsxs(o, {
      style: {
        position: "relative",
        width: "300px",
        height: "200px"
      },
      children: [
        e.jsxs(o, {
          style: {
            padding: "20px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "8px",
            height: "100%"
          },
          children: [
            e.jsx(n, {
              size: "3",
              weight: "medium",
              style: {
                marginBottom: "12px"
              },
              children: "Card Content"
            }),
            e.jsx(n, {
              size: "2",
              color: "gray",
              children: "This is some content that would be shown when not loading."
            })
          ]
        }),
        e.jsx(o, {
          style: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          },
          children: e.jsxs(r, {
            direction: "column",
            gap: "2",
            align: "center",
            children: [
              e.jsx(t, {
                size: "2"
              }),
              e.jsx(n, {
                size: "2",
                color: "gray",
                children: "Loading..."
              })
            ]
          })
        })
      ]
    })
  };
  z = {
    render: () => e.jsxs(r, {
      direction: "column",
      gap: "6",
      style: {
        width: "400px"
      },
      children: [
        e.jsx("div", {
          children: e.jsx(n, {
            size: "4",
            weight: "bold",
            children: "Common Loading Patterns"
          })
        }),
        e.jsxs(o, {
          style: {
            padding: "16px",
            backgroundColor: "var(--blue-2)",
            borderRadius: "8px"
          },
          children: [
            e.jsx(n, {
              size: "3",
              weight: "medium",
              style: {
                marginBottom: "12px"
              },
              children: "Form Submission"
            }),
            e.jsxs(r, {
              gap: "2",
              align: "center",
              children: [
                e.jsx(a, {
                  loading: true,
                  size: "2",
                  children: "Save Changes"
                }),
                e.jsx(n, {
                  size: "2",
                  color: "gray",
                  children: "Processing your request..."
                })
              ]
            })
          ]
        }),
        e.jsxs(o, {
          style: {
            padding: "16px",
            backgroundColor: "var(--green-2)",
            borderRadius: "8px"
          },
          children: [
            e.jsx(n, {
              size: "3",
              weight: "medium",
              style: {
                marginBottom: "12px"
              },
              children: "Data Fetching"
            }),
            e.jsxs(r, {
              direction: "column",
              gap: "3",
              children: [
                e.jsxs(r, {
                  gap: "2",
                  align: "center",
                  children: [
                    e.jsx(t, {
                      size: "1"
                    }),
                    e.jsx(n, {
                      size: "2",
                      children: "Fetching user data..."
                    })
                  ]
                }),
                e.jsx(o, {
                  style: {
                    height: "40px",
                    backgroundColor: "var(--gray-3)",
                    borderRadius: "4px",
                    opacity: 0.5
                  }
                }),
                e.jsx(o, {
                  style: {
                    height: "40px",
                    backgroundColor: "var(--gray-3)",
                    borderRadius: "4px",
                    opacity: 0.5
                  }
                })
              ]
            })
          ]
        }),
        e.jsxs(o, {
          style: {
            padding: "16px",
            backgroundColor: "var(--orange-2)",
            borderRadius: "8px"
          },
          children: [
            e.jsx(n, {
              size: "3",
              weight: "medium",
              style: {
                marginBottom: "12px"
              },
              children: "File Upload"
            }),
            e.jsxs(r, {
              direction: "column",
              gap: "2",
              children: [
                e.jsxs(r, {
                  gap: "2",
                  align: "center",
                  children: [
                    e.jsx(t, {
                      size: "1"
                    }),
                    e.jsx(n, {
                      size: "2",
                      children: "Uploading document.pdf..."
                    })
                  ]
                }),
                e.jsx(o, {
                  style: {
                    height: "4px",
                    backgroundColor: "var(--gray-4)",
                    borderRadius: "2px",
                    overflow: "hidden"
                  },
                  children: e.jsx(o, {
                    style: {
                      height: "100%",
                      width: "60%",
                      backgroundColor: "var(--orange-9)",
                      borderRadius: "2px"
                    }
                  })
                }),
                e.jsx(n, {
                  size: "1",
                  color: "gray",
                  children: "60% complete"
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
  args: {}
}`,
        ...(_c = (_b = s.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  d.parameters = {
    ...d.parameters,
    docs: {
      ...(_d = d.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  args: {
    size: "1"
  }
}`,
        ...(_f = (_e = d.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_g = l.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  args: {
    size: "2"
  }
}`,
        ...(_i = (_h = l.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  c.parameters = {
    ...c.parameters,
    docs: {
      ...(_j = c.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  args: {
    size: "3"
  }
}`,
        ...(_l = (_k = c.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  g.parameters = {
    ...g.parameters,
    docs: {
      ...(_m = g.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  args: {
    loading: true
  }
}`,
        ...(_o = (_n = g.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_p = x.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  args: {
    loading: false
  }
}`,
        ...(_r = (_q = x.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_s = p.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: () => <Flex align="center" gap="4">
      {["1", "2", "3"].map(size => <Flex key={size} direction="column" align="center" gap="2">
          <Spinner size={size as any} />
          <Text size="1" color="gray">
            Size {size}
          </Text>
        </Flex>)}
    </Flex>
}`,
        ...(_u = (_t = p.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_v = u.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="3" align="center">
      <Button loading size="1">
        Small Button
      </Button>
      <Button loading size="2">
        Medium Button
      </Button>
      <Button loading size="3">
        Large Button
      </Button>
      <Button loading size="4">
        Extra Large Button
      </Button>
    </Flex>
}`,
        ...(_x = (_w = u.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_y = m.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="6" style={{
    width: "400px"
  }}>
      <div>
        <Text size="3" weight="medium" style={{
        marginBottom: "12px"
      }}>
          Loading States
        </Text>

        <Flex direction="column" gap="4">
          {/* Inline loading */}
          <Flex gap="2" align="center">
            <Spinner size="1" />
            <Text size="2">Loading content...</Text>
          </Flex>

          {/* Card loading */}
          <Box style={{
          padding: "16px",
          backgroundColor: "var(--gray-2)",
          borderRadius: "8px"
        }}>
            <Flex direction="column" gap="3" align="center">
              <Spinner size="2" />
              <Text size="2" color="gray">
                Loading dashboard data
              </Text>
            </Flex>
          </Box>

          {/* Button states */}
          <Flex gap="2">
            <Button loading variant="solid">
              Saving...
            </Button>
            <Button loading variant="outline">
              Processing...
            </Button>
            <Button loading variant="ghost">
              Loading...
            </Button>
          </Flex>
        </Flex>
      </div>
    </Flex>
}`,
        ...(_A = (_z = m.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_B = h.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: () => {
    const [isLoading, setIsLoading] = React.useState(false);
    const handleLoad = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 3000);
    };
    return <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Interactive Loading Demo
        </Text>

        <Box style={{
        padding: "32px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "8px",
        minHeight: "120px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "200px"
      }}>
          {isLoading ? <Flex direction="column" gap="2" align="center">
              <Spinner size="2" />
              <Text size="2" color="gray">
                Loading data...
              </Text>
            </Flex> : <Text size="3">Content loaded!</Text>}
        </Box>

        <Button onClick={handleLoad} disabled={isLoading}>
          {isLoading ? "Loading..." : "Start Loading"}
        </Button>
      </Flex>;
  }
}`,
        ...(_D = (_C = h.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_E = y.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: () => <Box style={{
    position: "relative",
    width: "300px",
    height: "200px"
  }}>
      {/* Content */}
      <Box style={{
      padding: "20px",
      backgroundColor: "var(--gray-2)",
      borderRadius: "8px",
      height: "100%"
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: "12px"
      }}>
          Card Content
        </Text>
        <Text size="2" color="gray">
          This is some content that would be shown when not loading.
        </Text>
      </Box>

      {/* Loading overlay */}
      <Box style={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderRadius: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
        <Flex direction="column" gap="2" align="center">
          <Spinner size="2" />
          <Text size="2" color="gray">
            Loading...
          </Text>
        </Flex>
      </Box>
    </Box>
}`,
        ...(_G = (_F = y.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  z.parameters = {
    ...z.parameters,
    docs: {
      ...(_H = z.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="6" style={{
    width: "400px"
  }}>
      <div>
        <Text size="4" weight="bold">
          Common Loading Patterns
        </Text>
      </div>

      {/* Form submission */}
      <Box style={{
      padding: "16px",
      backgroundColor: "var(--blue-2)",
      borderRadius: "8px"
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: "12px"
      }}>
          Form Submission
        </Text>
        <Flex gap="2" align="center">
          <Button loading size="2">
            Save Changes
          </Button>
          <Text size="2" color="gray">
            Processing your request...
          </Text>
        </Flex>
      </Box>

      {/* Data fetching */}
      <Box style={{
      padding: "16px",
      backgroundColor: "var(--green-2)",
      borderRadius: "8px"
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: "12px"
      }}>
          Data Fetching
        </Text>
        <Flex direction="column" gap="3">
          <Flex gap="2" align="center">
            <Spinner size="1" />
            <Text size="2">Fetching user data...</Text>
          </Flex>
          <Box style={{
          height: "40px",
          backgroundColor: "var(--gray-3)",
          borderRadius: "4px",
          opacity: 0.5
        }} />
          <Box style={{
          height: "40px",
          backgroundColor: "var(--gray-3)",
          borderRadius: "4px",
          opacity: 0.5
        }} />
        </Flex>
      </Box>

      {/* File upload */}
      <Box style={{
      padding: "16px",
      backgroundColor: "var(--orange-2)",
      borderRadius: "8px"
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: "12px"
      }}>
          File Upload
        </Text>
        <Flex direction="column" gap="2">
          <Flex gap="2" align="center">
            <Spinner size="1" />
            <Text size="2">Uploading document.pdf...</Text>
          </Flex>
          <Box style={{
          height: "4px",
          backgroundColor: "var(--gray-4)",
          borderRadius: "2px",
          overflow: "hidden"
        }}>
            <Box style={{
            height: "100%",
            width: "60%",
            backgroundColor: "var(--orange-9)",
            borderRadius: "2px"
          }} />
          </Box>
          <Text size="1" color="gray">
            60% complete
          </Text>
        </Flex>
      </Box>
    </Flex>
}`,
        ...(_J = (_I = z.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  w = [
    "Default",
    "Size1",
    "Size2",
    "Size3",
    "LoadingTrue",
    "LoadingFalse",
    "AllSizes",
    "InButtons",
    "InDifferentContexts",
    "ConditionalLoading",
    "LoadingOverlay",
    "RealWorldPatterns"
  ];
});
export {
  p as AllSizes,
  h as ConditionalLoading,
  s as Default,
  u as InButtons,
  m as InDifferentContexts,
  x as LoadingFalse,
  y as LoadingOverlay,
  g as LoadingTrue,
  z as RealWorldPatterns,
  d as Size1,
  l as Size2,
  c as Size3,
  w as __namedExportsOrder,
  __tla,
  f as default
};
