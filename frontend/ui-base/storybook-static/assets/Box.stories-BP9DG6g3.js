import { j as e, T as b, a as n, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { B as r, __tla as __tla_1 } from "./box-Dr3vL6g-.js";
import "./preload-helper-D9Z9MdNV.js";
let g, o, s, i, d, a, l, t, x, c, p, k, v;
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G;
  v = {
    title: "Base/Box",
    component: r,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (u) => e.jsx(b, {
        children: e.jsx(u, {})
      })
    ],
    argTypes: {
      as: {
        control: "select",
        options: [
          "div",
          "span"
        ],
        description: "HTML element to render"
      },
      display: {
        control: "select",
        options: [
          "none",
          "inline",
          "inline-block",
          "block",
          "contents"
        ],
        description: "CSS display property"
      },
      asChild: {
        control: "boolean",
        description: "Merge props with the child element"
      },
      style: {
        control: "object",
        description: "Custom styles"
      },
      children: {
        control: "text",
        description: "Box content"
      }
    },
    args: {
      as: "div",
      children: "Box content"
    }
  };
  i = {
    args: {
      children: "This is a default box",
      style: {
        padding: "16px",
        backgroundColor: "var(--gray-3)",
        borderRadius: "8px"
      }
    }
  };
  o = {
    args: {
      as: "div",
      children: "This is a div box",
      style: {
        padding: "16px",
        backgroundColor: "var(--blue-3)",
        borderRadius: "8px"
      }
    }
  };
  s = {
    args: {
      as: "span",
      children: "This is a span box",
      style: {
        padding: "8px",
        backgroundColor: "var(--green-3)",
        borderRadius: "4px"
      }
    }
  };
  d = {
    args: {
      display: "block",
      children: "Block display box",
      style: {
        padding: "16px",
        backgroundColor: "var(--red-3)",
        borderRadius: "8px",
        width: "200px"
      }
    }
  };
  a = {
    args: {
      display: "inline",
      children: "Inline display box",
      style: {
        padding: "8px",
        backgroundColor: "var(--purple-3)",
        borderRadius: "4px"
      }
    }
  };
  l = {
    args: {
      display: "inline-block",
      children: "Inline-block display box",
      style: {
        padding: "12px",
        backgroundColor: "var(--orange-3)",
        borderRadius: "6px"
      }
    }
  };
  t = {
    render: () => e.jsxs("div", {
      children: [
        e.jsx(n, {
          children: "You should not see a box below this text:"
        }),
        e.jsx(r, {
          display: "none",
          style: {
            padding: "16px",
            backgroundColor: "var(--red-9)"
          },
          children: "This box is hidden"
        }),
        e.jsx(n, {
          children: "The box above is hidden with display: none"
        })
      ]
    })
  };
  x = {
    render: () => e.jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        width: "400px"
      },
      children: [
        e.jsx(n, {
          size: "4",
          weight: "bold",
          children: "Box Layout Examples"
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "2",
              weight: "medium",
              color: "gray",
              children: "Block boxes (stack vertically):"
            }),
            e.jsx(r, {
              display: "block",
              style: {
                padding: "8px",
                backgroundColor: "var(--blue-3)",
                marginBottom: "4px"
              },
              children: "Block Box 1"
            }),
            e.jsx(r, {
              display: "block",
              style: {
                padding: "8px",
                backgroundColor: "var(--blue-4)"
              },
              children: "Block Box 2"
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "2",
              weight: "medium",
              color: "gray",
              children: "Inline boxes (flow with text):"
            }),
            e.jsxs("div", {
              children: [
                "Here is some text with",
                " ",
                e.jsx(r, {
                  display: "inline",
                  style: {
                    padding: "4px",
                    backgroundColor: "var(--green-3)"
                  },
                  children: "inline box 1"
                }),
                " ",
                "and",
                " ",
                e.jsx(r, {
                  display: "inline",
                  style: {
                    padding: "4px",
                    backgroundColor: "var(--green-4)"
                  },
                  children: "inline box 2"
                }),
                " ",
                "in the middle."
              ]
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "2",
              weight: "medium",
              color: "gray",
              children: "Inline-block boxes (inline but with block properties):"
            }),
            e.jsxs("div", {
              children: [
                e.jsx(r, {
                  display: "inline-block",
                  style: {
                    padding: "12px",
                    backgroundColor: "var(--purple-3)",
                    marginRight: "8px",
                    width: "80px",
                    textAlign: "center"
                  },
                  children: "Box 1"
                }),
                e.jsx(r, {
                  display: "inline-block",
                  style: {
                    padding: "12px",
                    backgroundColor: "var(--purple-4)",
                    width: "80px",
                    textAlign: "center"
                  },
                  children: "Box 2"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  p = {
    render: () => e.jsxs("div", {
      style: {
        maxWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      },
      children: [
        e.jsx(n, {
          size: "4",
          weight: "bold",
          children: "Semantic Box Usage"
        }),
        e.jsxs(r, {
          as: "div",
          style: {
            padding: "16px",
            backgroundColor: "var(--blue-2)",
            borderRadius: "8px",
            border: "1px solid var(--blue-6)"
          },
          children: [
            e.jsx(n, {
              size: "3",
              weight: "medium",
              color: "blue",
              children: "Card Container"
            }),
            e.jsx(n, {
              size: "2",
              style: {
                marginTop: "8px"
              },
              children: "This box acts as a card container with padding and background styling."
            })
          ]
        }),
        e.jsxs(r, {
          as: "div",
          style: {
            padding: "12px",
            backgroundColor: "var(--yellow-2)",
            borderRadius: "4px",
            borderLeft: "4px solid var(--yellow-9)"
          },
          children: [
            e.jsx(n, {
              size: "2",
              weight: "medium",
              color: "yellow",
              children: "Warning Notice"
            }),
            e.jsx(n, {
              size: "2",
              style: {
                marginTop: "4px"
              },
              children: "This box is styled as a warning message with a left border accent."
            })
          ]
        }),
        e.jsx(r, {
          as: "div",
          style: {
            display: "flex",
            padding: "8px",
            backgroundColor: "var(--gray-2)",
            borderRadius: "20px"
          },
          children: e.jsx(r, {
            as: "span",
            style: {
              padding: "4px 12px",
              backgroundColor: "var(--green-9)",
              color: "white",
              borderRadius: "16px",
              fontSize: "12px"
            },
            children: "Status: Active"
          })
        })
      ]
    })
  };
  c = {
    render: () => e.jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      },
      children: [
        e.jsx(n, {
          size: "4",
          weight: "bold",
          children: "Responsive Box Concepts"
        }),
        e.jsx(n, {
          size: "2",
          color: "gray",
          children: "These boxes demonstrate different responsive behaviors. In a real responsive setup, the display properties would change based on viewport size."
        }),
        e.jsxs("div", {
          style: {
            display: "flex",
            gap: "8px",
            flexWrap: "wrap"
          },
          children: [
            e.jsxs(r, {
              display: "block",
              style: {
                padding: "16px",
                backgroundColor: "var(--blue-3)",
                borderRadius: "8px",
                minWidth: "150px",
                flex: "1"
              },
              children: [
                e.jsx(n, {
                  size: "2",
                  weight: "medium",
                  children: "Mobile: Block"
                }),
                e.jsx(n, {
                  size: "1",
                  children: "Full width on small screens"
                })
              ]
            }),
            e.jsxs(r, {
              display: "inline-block",
              style: {
                padding: "16px",
                backgroundColor: "var(--green-3)",
                borderRadius: "8px",
                minWidth: "150px",
                flex: "1"
              },
              children: [
                e.jsx(n, {
                  size: "2",
                  weight: "medium",
                  children: "Tablet: Inline-block"
                }),
                e.jsx(n, {
                  size: "1",
                  children: "Side by side on medium screens"
                })
              ]
            }),
            e.jsxs(r, {
              display: "block",
              style: {
                padding: "16px",
                backgroundColor: "var(--purple-3)",
                borderRadius: "8px",
                minWidth: "150px",
                flex: "1"
              },
              children: [
                e.jsx(n, {
                  size: "2",
                  weight: "medium",
                  children: "Desktop: Flex item"
                }),
                e.jsx(n, {
                  size: "1",
                  children: "Flexible layout on large screens"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  g = {
    render: () => e.jsxs("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "16px"
      },
      children: [
        e.jsx(n, {
          size: "4",
          weight: "bold",
          children: "AsChild Usage"
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "2",
              weight: "medium",
              color: "gray",
              children: "Normal Box:"
            }),
            e.jsx(r, {
              style: {
                padding: "12px",
                backgroundColor: "var(--blue-3)",
                borderRadius: "8px"
              },
              children: e.jsx("button", {
                children: "I'm inside a Box"
              })
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(n, {
              size: "2",
              weight: "medium",
              color: "gray",
              children: "AsChild Box (merges with button):"
            }),
            e.jsx(r, {
              asChild: true,
              style: {
                padding: "12px",
                backgroundColor: "var(--green-3)",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer"
              },
              children: e.jsx("button", {
                children: "I am the Box (merged props)"
              })
            })
          ]
        })
      ]
    })
  };
  i.parameters = {
    ...i.parameters,
    docs: {
      ...(_a = i.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  args: {
    children: "This is a default box",
    style: {
      padding: "16px",
      backgroundColor: "var(--gray-3)",
      borderRadius: "8px"
    }
  }
}`,
        ...(_c = (_b = i.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  o.parameters = {
    ...o.parameters,
    docs: {
      ...(_d = o.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  args: {
    as: "div",
    children: "This is a div box",
    style: {
      padding: "16px",
      backgroundColor: "var(--blue-3)",
      borderRadius: "8px"
    }
  }
}`,
        ...(_f = (_e = o.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  s.parameters = {
    ...s.parameters,
    docs: {
      ...(_g = s.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  args: {
    as: "span",
    children: "This is a span box",
    style: {
      padding: "8px",
      backgroundColor: "var(--green-3)",
      borderRadius: "4px"
    }
  }
}`,
        ...(_i = (_h = s.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  d.parameters = {
    ...d.parameters,
    docs: {
      ...(_j = d.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  args: {
    display: "block",
    children: "Block display box",
    style: {
      padding: "16px",
      backgroundColor: "var(--red-3)",
      borderRadius: "8px",
      width: "200px"
    }
  }
}`,
        ...(_l = (_k = d.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  a.parameters = {
    ...a.parameters,
    docs: {
      ...(_m = a.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  args: {
    display: "inline",
    children: "Inline display box",
    style: {
      padding: "8px",
      backgroundColor: "var(--purple-3)",
      borderRadius: "4px"
    }
  }
}`,
        ...(_o = (_n = a.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_p = l.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  args: {
    display: "inline-block",
    children: "Inline-block display box",
    style: {
      padding: "12px",
      backgroundColor: "var(--orange-3)",
      borderRadius: "6px"
    }
  }
}`,
        ...(_r = (_q = l.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  t.parameters = {
    ...t.parameters,
    docs: {
      ...(_s = t.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: () => <div>
      <Text>You should not see a box below this text:</Text>
      <Box display="none" style={{
      padding: "16px",
      backgroundColor: "var(--red-9)"
    }}>
        This box is hidden
      </Box>
      <Text>The box above is hidden with display: none</Text>
    </div>
}`,
        ...(_u = (_t = t.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_v = x.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "400px"
  }}>
      <Text size="4" weight="bold">
        Box Layout Examples
      </Text>

      <div>
        <Text size="2" weight="medium" color="gray">
          Block boxes (stack vertically):
        </Text>
        <Box display="block" style={{
        padding: "8px",
        backgroundColor: "var(--blue-3)",
        marginBottom: "4px"
      }}>
          Block Box 1
        </Box>
        <Box display="block" style={{
        padding: "8px",
        backgroundColor: "var(--blue-4)"
      }}>
          Block Box 2
        </Box>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Inline boxes (flow with text):
        </Text>
        <div>
          Here is some text with{" "}
          <Box display="inline" style={{
          padding: "4px",
          backgroundColor: "var(--green-3)"
        }}>
            inline box 1
          </Box>{" "}
          and{" "}
          <Box display="inline" style={{
          padding: "4px",
          backgroundColor: "var(--green-4)"
        }}>
            inline box 2
          </Box>{" "}
          in the middle.
        </div>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          Inline-block boxes (inline but with block properties):
        </Text>
        <div>
          <Box display="inline-block" style={{
          padding: "12px",
          backgroundColor: "var(--purple-3)",
          marginRight: "8px",
          width: "80px",
          textAlign: "center"
        }}>
            Box 1
          </Box>
          <Box display="inline-block" style={{
          padding: "12px",
          backgroundColor: "var(--purple-4)",
          width: "80px",
          textAlign: "center"
        }}>
            Box 2
          </Box>
        </div>
      </div>
    </div>
}`,
        ...(_x = (_w = x.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_y = p.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      <Text size="4" weight="bold">
        Semantic Box Usage
      </Text>

      <Box as="div" style={{
      padding: "16px",
      backgroundColor: "var(--blue-2)",
      borderRadius: "8px",
      border: "1px solid var(--blue-6)"
    }}>
        <Text size="3" weight="medium" color="blue">
          Card Container
        </Text>
        <Text size="2" style={{
        marginTop: "8px"
      }}>
          This box acts as a card container with padding and background styling.
        </Text>
      </Box>

      <Box as="div" style={{
      padding: "12px",
      backgroundColor: "var(--yellow-2)",
      borderRadius: "4px",
      borderLeft: "4px solid var(--yellow-9)"
    }}>
        <Text size="2" weight="medium" color="yellow">
          Warning Notice
        </Text>
        <Text size="2" style={{
        marginTop: "4px"
      }}>
          This box is styled as a warning message with a left border accent.
        </Text>
      </Box>

      <Box as="div" style={{
      display: "flex",
      padding: "8px",
      backgroundColor: "var(--gray-2)",
      borderRadius: "20px"
    }}>
        <Box as="span" style={{
        padding: "4px 12px",
        backgroundColor: "var(--green-9)",
        color: "white",
        borderRadius: "16px",
        fontSize: "12px"
      }}>
          Status: Active
        </Box>
      </Box>
    </div>
}`,
        ...(_A = (_z = p.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  c.parameters = {
    ...c.parameters,
    docs: {
      ...(_B = c.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      <Text size="4" weight="bold">
        Responsive Box Concepts
      </Text>
      <Text size="2" color="gray">
        These boxes demonstrate different responsive behaviors. In a real
        responsive setup, the display properties would change based on viewport
        size.
      </Text>

      <div style={{
      display: "flex",
      gap: "8px",
      flexWrap: "wrap"
    }}>
        <Box display="block" style={{
        padding: "16px",
        backgroundColor: "var(--blue-3)",
        borderRadius: "8px",
        minWidth: "150px",
        flex: "1"
      }}>
          <Text size="2" weight="medium">
            Mobile: Block
          </Text>
          <Text size="1">Full width on small screens</Text>
        </Box>

        <Box display="inline-block" style={{
        padding: "16px",
        backgroundColor: "var(--green-3)",
        borderRadius: "8px",
        minWidth: "150px",
        flex: "1"
      }}>
          <Text size="2" weight="medium">
            Tablet: Inline-block
          </Text>
          <Text size="1">Side by side on medium screens</Text>
        </Box>

        <Box display="block" style={{
        padding: "16px",
        backgroundColor: "var(--purple-3)",
        borderRadius: "8px",
        minWidth: "150px",
        flex: "1"
      }}>
          <Text size="2" weight="medium">
            Desktop: Flex item
          </Text>
          <Text size="1">Flexible layout on large screens</Text>
        </Box>
      </div>
    </div>
}`,
        ...(_D = (_C = c.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  g.parameters = {
    ...g.parameters,
    docs: {
      ...(_E = g.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: () => <div style={{
    display: "flex",
    flexDirection: "column",
    gap: "16px"
  }}>
      <Text size="4" weight="bold">
        AsChild Usage
      </Text>

      <div>
        <Text size="2" weight="medium" color="gray">
          Normal Box:
        </Text>
        <Box style={{
        padding: "12px",
        backgroundColor: "var(--blue-3)",
        borderRadius: "8px"
      }}>
          <button>I'm inside a Box</button>
        </Box>
      </div>

      <div>
        <Text size="2" weight="medium" color="gray">
          AsChild Box (merges with button):
        </Text>
        <Box asChild style={{
        padding: "12px",
        backgroundColor: "var(--green-3)",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer"
      }}>
          <button>I am the Box (merged props)</button>
        </Box>
      </div>
    </div>
}`,
        ...(_G = (_F = g.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  k = [
    "Default",
    "AsDiv",
    "AsSpan",
    "DisplayBlock",
    "DisplayInline",
    "DisplayInlineBlock",
    "DisplayNone",
    "LayoutExamples",
    "SemanticUsage",
    "ResponsiveBoxes",
    "AsChildExample"
  ];
});
export {
  g as AsChildExample,
  o as AsDiv,
  s as AsSpan,
  i as Default,
  d as DisplayBlock,
  a as DisplayInline,
  l as DisplayInlineBlock,
  t as DisplayNone,
  x as LayoutExamples,
  c as ResponsiveBoxes,
  p as SemanticUsage,
  k as __namedExportsOrder,
  __tla,
  v as default
};
