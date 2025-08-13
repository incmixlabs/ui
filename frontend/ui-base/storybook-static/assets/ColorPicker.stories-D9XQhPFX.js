import { j as e, T, r as s, F as r, a as n, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { C as a, __tla as __tla_1 } from "./color-picker-VWh8MS13.js";
import { B as l, __tla as __tla_2 } from "./box-Dr3vL6g-.js";
import { P as j, a as S, b as v, __tla as __tla_3 } from "./popover-DV0bW1sX.js";
import { B as C, __tla as __tla_4 } from "./button-BF2Wetgg.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_5 } from "./icon-ClnzJwXp.js";
import { __tla as __tla_6 } from "./createLucideIcon-BUkpxZyj.js";
import { __tla as __tla_7 } from "./chevron-down-2X_Paxnn.js";
import { __tla as __tla_8 } from "./chevron-right-tttQlfk_.js";
import { __tla as __tla_9 } from "./x-C94K9CrB.js";
import { __tla as __tla_10 } from "./trash-BVyHiUQV.js";
import { __tla as __tla_11 } from "./trash-2-B7j0iALt.js";
import { __tla as __tla_12 } from "./user-DF4nMnH4.js";
import "./utils-CBfrqCZ4.js";
import { __tla as __tla_13 } from "./index-ChItmDsK.js";
import { __tla as __tla_14 } from "./index-CEOg2jVB.js";
import { __tla as __tla_15 } from "./index-DfrOcl7X.js";
import { __tla as __tla_16 } from "./require-react-element-D0otgQnF.js";
import { __tla as __tla_17 } from "./base-button-BHQkXpSv.js";
let p, u, x, m, y, h, g, L, K;
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
  })(),
  (() => {
    try {
      return __tla_10;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_11;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_12;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_13;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_14;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_15;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_16;
    } catch {
    }
  })(),
  (() => {
    try {
      return __tla_17;
    } catch {
    }
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u;
  K = {
    title: "Elements/ColorPicker",
    component: a,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (o) => e.jsx(T, {
        children: e.jsx("div", {
          style: {
            padding: "20px"
          },
          children: e.jsx(o, {})
        })
      })
    ],
    argTypes: {
      colorType: {
        control: "select",
        options: [
          "base",
          "all"
        ],
        description: "Type of color palette to display"
      },
      activeColor: {
        control: "text",
        description: "Currently active/selected color"
      },
      onColorSelect: {
        action: "color-selected",
        description: "Callback when a color is selected"
      }
    },
    args: {
      colorType: "all"
    }
  };
  x = {
    render: () => {
      const [o, i] = s.useState(null);
      return e.jsxs(r, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(a, {
            onColorSelect: i,
            colorType: "all",
            activeColor: o == null ? void 0 : o.hex
          }),
          o && e.jsxs(l, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "200px"
            },
            children: [
              e.jsx(n, {
                size: "2",
                weight: "medium",
                children: "Selected Color"
              }),
              e.jsxs(r, {
                align: "center",
                justify: "center",
                gap: "2",
                style: {
                  marginTop: "8px"
                },
                children: [
                  e.jsx(l, {
                    style: {
                      width: "24px",
                      height: "24px",
                      borderRadius: "4px",
                      backgroundColor: o.hex,
                      border: "1px solid var(--gray-6)"
                    }
                  }),
                  e.jsx(n, {
                    size: "2",
                    family: "mono",
                    children: o.hex
                  })
                ]
              }),
              o.name && e.jsx(n, {
                size: "1",
                color: "gray",
                style: {
                  marginTop: "4px"
                },
                children: o.name
              })
            ]
          })
        ]
      });
    }
  };
  p = {
    render: () => {
      const [o, i] = s.useState(null);
      return e.jsxs(r, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(a, {
            onColorSelect: i,
            colorType: "base",
            activeColor: o == null ? void 0 : o.name
          }),
          o && e.jsxs(l, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "200px"
            },
            children: [
              e.jsx(n, {
                size: "2",
                weight: "medium",
                children: "Selected Base Color"
              }),
              e.jsxs(r, {
                align: "center",
                justify: "center",
                gap: "2",
                style: {
                  marginTop: "8px"
                },
                children: [
                  e.jsx(l, {
                    style: {
                      width: "24px",
                      height: "24px",
                      borderRadius: "4px",
                      backgroundColor: o.hex,
                      border: "1px solid var(--gray-6)"
                    }
                  }),
                  e.jsx(n, {
                    size: "2",
                    family: "mono",
                    children: o.hex
                  })
                ]
              }),
              o.name && e.jsx(n, {
                size: "1",
                color: "gray",
                style: {
                  marginTop: "4px"
                },
                children: o.name
              })
            ]
          })
        ]
      });
    }
  };
  g = {
    render: () => {
      const [o, i] = s.useState({
        hex: "var(--blue-9)",
        name: "blue"
      });
      return e.jsxs(r, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(n, {
            size: "3",
            weight: "medium",
            children: "Color Picker with Pre-selected Blue"
          }),
          e.jsx(a, {
            onColorSelect: i,
            colorType: "all",
            activeColor: o.hex
          }),
          e.jsxs(l, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "200px"
            },
            children: [
              e.jsx(n, {
                size: "2",
                weight: "medium",
                children: "Current Selection"
              }),
              e.jsxs(r, {
                align: "center",
                justify: "center",
                gap: "2",
                style: {
                  marginTop: "8px"
                },
                children: [
                  e.jsx(l, {
                    style: {
                      width: "24px",
                      height: "24px",
                      borderRadius: "4px",
                      backgroundColor: o.hex,
                      border: "1px solid var(--gray-6)"
                    }
                  }),
                  e.jsx(n, {
                    size: "2",
                    family: "mono",
                    children: o.hex
                  })
                ]
              })
            ]
          })
        ]
      });
    }
  };
  m = {
    render: () => {
      const [o, i] = s.useState({
        hex: "#3B82F6",
        name: "blue"
      });
      return e.jsxs(r, {
        direction: "column",
        gap: "4",
        align: "center",
        children: [
          e.jsx(n, {
            size: "3",
            weight: "medium",
            children: "Color Picker in Popover"
          }),
          e.jsxs(j, {
            children: [
              e.jsx(S, {
                children: e.jsxs(C, {
                  variant: "outline",
                  style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 12px"
                  },
                  children: [
                    e.jsx(l, {
                      style: {
                        width: "20px",
                        height: "20px",
                        borderRadius: "4px",
                        backgroundColor: o.hex,
                        border: "1px solid var(--gray-6)"
                      }
                    }),
                    e.jsx(n, {
                      size: "2",
                      children: "Choose Color"
                    })
                  ]
                })
              }),
              e.jsx(v, {
                width: "320px",
                style: {
                  padding: "8px"
                },
                children: e.jsx(a, {
                  onColorSelect: i,
                  colorType: "all",
                  activeColor: o.hex
                })
              })
            ]
          }),
          e.jsxs(l, {
            style: {
              padding: "12px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center",
              minWidth: "200px"
            },
            children: [
              e.jsxs(n, {
                size: "2",
                weight: "medium",
                children: [
                  "Selected: ",
                  o.hex
                ]
              }),
              o.name && e.jsxs(n, {
                size: "1",
                color: "gray",
                children: [
                  "(",
                  o.name,
                  ")"
                ]
              })
            ]
          })
        ]
      });
    }
  };
  u = {
    render: () => {
      const [o, i] = s.useState(null), [t, d] = s.useState(null);
      return e.jsxs(r, {
        direction: "column",
        gap: "6",
        align: "center",
        children: [
          e.jsx(n, {
            size: "4",
            weight: "bold",
            children: "Color Picker Type Comparison"
          }),
          e.jsxs(r, {
            gap: "8",
            wrap: "wrap",
            justify: "center",
            children: [
              e.jsxs(r, {
                direction: "column",
                gap: "4",
                align: "center",
                children: [
                  e.jsx(n, {
                    size: "3",
                    weight: "medium",
                    children: 'Base Colors (colorType="base")'
                  }),
                  e.jsx(a, {
                    onColorSelect: i,
                    colorType: "base",
                    activeColor: o == null ? void 0 : o.name
                  }),
                  e.jsx(l, {
                    style: {
                      padding: "8px",
                      borderRadius: "6px",
                      backgroundColor: "var(--gray-2)",
                      textAlign: "center",
                      minWidth: "160px",
                      height: "60px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    },
                    children: o ? e.jsxs(e.Fragment, {
                      children: [
                        e.jsx(l, {
                          style: {
                            width: "20px",
                            height: "20px",
                            borderRadius: "3px",
                            backgroundColor: o.hex,
                            border: "1px solid var(--gray-6)",
                            margin: "0 auto 4px"
                          }
                        }),
                        e.jsx(n, {
                          size: "1",
                          family: "mono",
                          children: o.name
                        })
                      ]
                    }) : e.jsx(n, {
                      size: "1",
                      color: "gray",
                      children: "No selection"
                    })
                  })
                ]
              }),
              e.jsxs(r, {
                direction: "column",
                gap: "4",
                align: "center",
                children: [
                  e.jsx(n, {
                    size: "3",
                    weight: "medium",
                    children: 'All Colors (colorType="all")'
                  }),
                  e.jsx(a, {
                    onColorSelect: d,
                    colorType: "all",
                    activeColor: t == null ? void 0 : t.hex
                  }),
                  e.jsx(l, {
                    style: {
                      padding: "8px",
                      borderRadius: "6px",
                      backgroundColor: "var(--gray-2)",
                      textAlign: "center",
                      minWidth: "160px",
                      height: "60px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center"
                    },
                    children: t ? e.jsxs(e.Fragment, {
                      children: [
                        e.jsx(l, {
                          style: {
                            width: "20px",
                            height: "20px",
                            borderRadius: "3px",
                            backgroundColor: t.hex,
                            border: "1px solid var(--gray-6)",
                            margin: "0 auto 4px"
                          }
                        }),
                        e.jsx(n, {
                          size: "1",
                          family: "mono",
                          children: t.hex
                        })
                      ]
                    }) : e.jsx(n, {
                      size: "1",
                      color: "gray",
                      children: "No selection"
                    })
                  })
                ]
              })
            ]
          })
        ]
      });
    }
  };
  h = {
    render: () => {
      const [o, i] = s.useState({
        hex: "var(--blue-9)",
        name: "blue"
      }), [t, d] = s.useState({
        hex: "var(--gray-6)",
        name: "gray"
      }), [c, b] = s.useState({
        hex: "var(--orange-9)",
        name: "orange"
      });
      return e.jsxs(r, {
        direction: "column",
        gap: "6",
        style: {
          maxWidth: "600px"
        },
        children: [
          e.jsx(n, {
            size: "5",
            weight: "bold",
            style: {
              textAlign: "center"
            },
            children: "Theme Color Editor"
          }),
          e.jsxs(r, {
            direction: "column",
            gap: "4",
            children: [
              e.jsxs(l, {
                style: {
                  padding: "16px",
                  backgroundColor: "var(--gray-2)",
                  borderRadius: "8px"
                },
                children: [
                  e.jsxs(r, {
                    justify: "between",
                    align: "center",
                    style: {
                      marginBottom: "12px"
                    },
                    children: [
                      e.jsx(n, {
                        size: "3",
                        weight: "medium",
                        children: "Primary Color"
                      }),
                      e.jsxs(r, {
                        align: "center",
                        gap: "2",
                        children: [
                          e.jsx(l, {
                            style: {
                              width: "24px",
                              height: "24px",
                              borderRadius: "4px",
                              backgroundColor: o.hex,
                              border: "1px solid var(--gray-6)"
                            }
                          }),
                          e.jsx(n, {
                            size: "2",
                            family: "mono",
                            children: o.hex
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsx(a, {
                    onColorSelect: i,
                    colorType: "base",
                    activeColor: o.name
                  })
                ]
              }),
              e.jsxs(l, {
                style: {
                  padding: "16px",
                  backgroundColor: "var(--gray-2)",
                  borderRadius: "8px"
                },
                children: [
                  e.jsxs(r, {
                    justify: "between",
                    align: "center",
                    style: {
                      marginBottom: "12px"
                    },
                    children: [
                      e.jsx(n, {
                        size: "3",
                        weight: "medium",
                        children: "Secondary Color"
                      }),
                      e.jsxs(r, {
                        align: "center",
                        gap: "2",
                        children: [
                          e.jsx(l, {
                            style: {
                              width: "24px",
                              height: "24px",
                              borderRadius: "4px",
                              backgroundColor: t.hex,
                              border: "1px solid var(--gray-6)"
                            }
                          }),
                          e.jsx(n, {
                            size: "2",
                            family: "mono",
                            children: t.hex
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsx(a, {
                    onColorSelect: d,
                    colorType: "all",
                    activeColor: t.hex
                  })
                ]
              }),
              e.jsxs(l, {
                style: {
                  padding: "16px",
                  backgroundColor: "var(--gray-2)",
                  borderRadius: "8px"
                },
                children: [
                  e.jsxs(r, {
                    justify: "between",
                    align: "center",
                    style: {
                      marginBottom: "12px"
                    },
                    children: [
                      e.jsx(n, {
                        size: "3",
                        weight: "medium",
                        children: "Accent Color"
                      }),
                      e.jsxs(r, {
                        align: "center",
                        gap: "2",
                        children: [
                          e.jsx(l, {
                            style: {
                              width: "24px",
                              height: "24px",
                              borderRadius: "4px",
                              backgroundColor: c.hex,
                              border: "1px solid var(--gray-6)"
                            }
                          }),
                          e.jsx(n, {
                            size: "2",
                            family: "mono",
                            children: c.hex
                          })
                        ]
                      })
                    ]
                  }),
                  e.jsx(a, {
                    onColorSelect: b,
                    colorType: "base",
                    activeColor: c.name
                  })
                ]
              })
            ]
          }),
          e.jsxs(l, {
            style: {
              padding: "20px",
              backgroundColor: "var(--gray-1)",
              borderRadius: "8px",
              border: "1px solid var(--gray-6)"
            },
            children: [
              e.jsx(n, {
                size: "3",
                weight: "medium",
                style: {
                  marginBottom: "12px",
                  display: "block"
                },
                children: "Theme Preview"
              }),
              e.jsxs(r, {
                gap: "3",
                children: [
                  e.jsx("button", {
                    style: {
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: o.hex,
                      color: "white",
                      fontSize: "14px",
                      cursor: "pointer"
                    },
                    children: "Primary Button"
                  }),
                  e.jsx("button", {
                    style: {
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: `1px solid ${t.hex}`,
                      backgroundColor: "transparent",
                      color: t.hex,
                      fontSize: "14px",
                      cursor: "pointer"
                    },
                    children: "Secondary Button"
                  }),
                  e.jsx("button", {
                    style: {
                      padding: "8px 16px",
                      borderRadius: "6px",
                      border: "none",
                      backgroundColor: c.hex,
                      color: "white",
                      fontSize: "14px",
                      cursor: "pointer"
                    },
                    children: "Accent Button"
                  })
                ]
              })
            ]
          })
        ]
      });
    }
  };
  y = {
    render: () => {
      const [o, i] = s.useState(null), [t, d] = s.useState("all"), [c, b] = s.useState(false);
      return e.jsxs(r, {
        direction: "column",
        gap: "4",
        align: "center",
        style: {
          maxWidth: "400px"
        },
        children: [
          e.jsx(n, {
            size: "4",
            weight: "bold",
            children: "Interactive Color Picker"
          }),
          e.jsxs(r, {
            gap: "2",
            children: [
              e.jsx(C, {
                variant: t === "base" ? "solid" : "outline",
                size: "sm",
                onClick: () => d("base"),
                children: "Base Colors"
              }),
              e.jsx(C, {
                variant: t === "all" ? "solid" : "outline",
                size: "sm",
                onClick: () => d("all"),
                children: "All Colors"
              })
            ]
          }),
          e.jsx(a, {
            onColorSelect: i,
            colorType: t,
            activeColor: t === "base" ? o == null ? void 0 : o.name : o == null ? void 0 : o.hex
          }),
          o && e.jsxs(l, {
            style: {
              width: "100%",
              padding: "16px",
              borderRadius: "8px",
              backgroundColor: "var(--gray-2)",
              textAlign: "center"
            },
            children: [
              e.jsxs(r, {
                align: "center",
                justify: "center",
                gap: "3",
                style: {
                  marginBottom: "8px"
                },
                children: [
                  e.jsx(l, {
                    style: {
                      width: "32px",
                      height: "32px",
                      borderRadius: "6px",
                      backgroundColor: o.hex,
                      border: "2px solid var(--gray-6)"
                    }
                  }),
                  e.jsx(n, {
                    size: "3",
                    weight: "medium",
                    children: "Color Selected"
                  })
                ]
              }),
              e.jsx(n, {
                size: "2",
                family: "mono",
                style: {
                  marginBottom: "8px",
                  display: "block"
                },
                children: o.hex
              }),
              o.name && e.jsxs(n, {
                size: "1",
                color: "gray",
                style: {
                  marginBottom: "8px",
                  display: "block"
                },
                children: [
                  "Name: ",
                  o.name
                ]
              }),
              e.jsxs(C, {
                variant: "ghost",
                size: "sm",
                onClick: () => b(!c),
                children: [
                  c ? "Hide" : "Show",
                  " Details"
                ]
              }),
              c && e.jsx(l, {
                style: {
                  marginTop: "8px",
                  padding: "8px",
                  backgroundColor: "var(--gray-3)",
                  borderRadius: "4px",
                  fontSize: "12px"
                },
                children: e.jsxs(n, {
                  size: "1",
                  family: "mono",
                  children: [
                    "Type: ",
                    t,
                    e.jsx("br", {}),
                    "Hex: ",
                    o.hex,
                    e.jsx("br", {}),
                    o.name && `Name: ${o.name}`
                  ]
                })
              })
            ]
          }),
          !o && e.jsx(n, {
            size: "2",
            color: "gray",
            style: {
              textAlign: "center"
            },
            children: "Click on a color to select it"
          })
        ]
      });
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_a = x.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedColor, setSelectedColor] = useState<ColorSelectType | null>(null);
    return <Flex direction="column" gap="4" align="center">
        <ColorPicker onColorSelect={setSelectedColor} colorType="all" activeColor={selectedColor?.hex} />
        
        {selectedColor && <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "200px"
      }}>
            <Text size="2" weight="medium">
              Selected Color
            </Text>
            <Flex align="center" justify="center" gap="2" style={{
          marginTop: "8px"
        }}>
              <Box style={{
            width: "24px",
            height: "24px",
            borderRadius: "4px",
            backgroundColor: selectedColor.hex,
            border: "1px solid var(--gray-6)"
          }} />
              <Text size="2" family="mono">
                {selectedColor.hex}
              </Text>
            </Flex>
            {selectedColor.name && <Text size="1" color="gray" style={{
          marginTop: "4px"
        }}>
                {selectedColor.name}
              </Text>}
          </Box>}
      </Flex>;
  }
}`,
        ...(_c = (_b = x.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_d = p.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedColor, setSelectedColor] = useState<ColorSelectType | null>(null);
    return <Flex direction="column" gap="4" align="center">
        <ColorPicker onColorSelect={setSelectedColor} colorType="base" activeColor={selectedColor?.name} />
        
        {selectedColor && <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "200px"
      }}>
            <Text size="2" weight="medium">
              Selected Base Color
            </Text>
            <Flex align="center" justify="center" gap="2" style={{
          marginTop: "8px"
        }}>
              <Box style={{
            width: "24px",
            height: "24px",
            borderRadius: "4px",
            backgroundColor: selectedColor.hex,
            border: "1px solid var(--gray-6)"
          }} />
              <Text size="2" family="mono">
                {selectedColor.hex}
              </Text>
            </Flex>
            {selectedColor.name && <Text size="1" color="gray" style={{
          marginTop: "4px"
        }}>
                {selectedColor.name}
              </Text>}
          </Box>}
      </Flex>;
  }
}`,
        ...(_f = (_e = p.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  g.parameters = {
    ...g.parameters,
    docs: {
      ...(_g = g.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedColor, setSelectedColor] = useState<ColorSelectType>({
      hex: "var(--blue-9)",
      name: "blue"
    });
    return <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Color Picker with Pre-selected Blue
        </Text>
        
        <ColorPicker onColorSelect={setSelectedColor} colorType="all" activeColor={selectedColor.hex} />
        
        <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "200px"
      }}>
          <Text size="2" weight="medium">
            Current Selection
          </Text>
          <Flex align="center" justify="center" gap="2" style={{
          marginTop: "8px"
        }}>
            <Box style={{
            width: "24px",
            height: "24px",
            borderRadius: "4px",
            backgroundColor: selectedColor.hex,
            border: "1px solid var(--gray-6)"
          }} />
            <Text size="2" family="mono">
              {selectedColor.hex}
            </Text>
          </Flex>
        </Box>
      </Flex>;
  }
}`,
        ...(_i = (_h = g.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_j = m.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedColor, setSelectedColor] = useState<ColorSelectType>({
      hex: "#3B82F6",
      name: "blue"
    });
    return <Flex direction="column" gap="4" align="center">
        <Text size="3" weight="medium">
          Color Picker in Popover
        </Text>
        
        <Popover.Root>
          <Popover.Trigger>
            <Button variant="outline" style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 12px"
          }}>
              <Box style={{
              width: "20px",
              height: "20px",
              borderRadius: "4px",
              backgroundColor: selectedColor.hex,
              border: "1px solid var(--gray-6)"
            }} />
              <Text size="2">
                Choose Color
              </Text>
            </Button>
          </Popover.Trigger>
          
          <Popover.Content width="320px" style={{
          padding: "8px"
        }}>
            <ColorPicker onColorSelect={setSelectedColor} colorType="all" activeColor={selectedColor.hex} />
          </Popover.Content>
        </Popover.Root>

        <Box style={{
        padding: "12px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center",
        minWidth: "200px"
      }}>
          <Text size="2" weight="medium">
            Selected: {selectedColor.hex}
          </Text>
          {selectedColor.name && <Text size="1" color="gray">
              ({selectedColor.name})
            </Text>}
        </Box>
      </Flex>;
  }
}`,
        ...(_l = (_k = m.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_m = u.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: () => {
    const [baseColor, setBaseColor] = useState<ColorSelectType | null>(null);
    const [allColor, setAllColor] = useState<ColorSelectType | null>(null);
    return <Flex direction="column" gap="6" align="center">
        <Text size="4" weight="bold">
          Color Picker Type Comparison
        </Text>
        
        <Flex gap="8" wrap="wrap" justify="center">
          {/* Base Colors */}
          <Flex direction="column" gap="4" align="center">
            <Text size="3" weight="medium">
              Base Colors (colorType="base")
            </Text>
            
            <ColorPicker onColorSelect={setBaseColor} colorType="base" activeColor={baseColor?.name} />
            
            <Box style={{
            padding: "8px",
            borderRadius: "6px",
            backgroundColor: "var(--gray-2)",
            textAlign: "center",
            minWidth: "160px",
            height: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
              {baseColor ? <>
                  <Box style={{
                width: "20px",
                height: "20px",
                borderRadius: "3px",
                backgroundColor: baseColor.hex,
                border: "1px solid var(--gray-6)",
                margin: "0 auto 4px"
              }} />
                  <Text size="1" family="mono">
                    {baseColor.name}
                  </Text>
                </> : <Text size="1" color="gray">
                  No selection
                </Text>}
            </Box>
          </Flex>

          {/* All Colors */}
          <Flex direction="column" gap="4" align="center">
            <Text size="3" weight="medium">
              All Colors (colorType="all")
            </Text>
            
            <ColorPicker onColorSelect={setAllColor} colorType="all" activeColor={allColor?.hex} />
            
            <Box style={{
            padding: "8px",
            borderRadius: "6px",
            backgroundColor: "var(--gray-2)",
            textAlign: "center",
            minWidth: "160px",
            height: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}>
              {allColor ? <>
                  <Box style={{
                width: "20px",
                height: "20px",
                borderRadius: "3px",
                backgroundColor: allColor.hex,
                border: "1px solid var(--gray-6)",
                margin: "0 auto 4px"
              }} />
                  <Text size="1" family="mono">
                    {allColor.hex}
                  </Text>
                </> : <Text size="1" color="gray">
                  No selection
                </Text>}
            </Box>
          </Flex>
        </Flex>
      </Flex>;
  }
}`,
        ...(_o = (_n = u.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_p = h.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: () => {
    const [primaryColor, setPrimaryColor] = useState<ColorSelectType>({
      hex: "var(--blue-9)",
      name: "blue"
    });
    const [secondaryColor, setSecondaryColor] = useState<ColorSelectType>({
      hex: "var(--gray-6)",
      name: "gray"
    });
    const [accentColor, setAccentColor] = useState<ColorSelectType>({
      hex: "var(--orange-9)",
      name: "orange"
    });
    return <Flex direction="column" gap="6" style={{
      maxWidth: "600px"
    }}>
        <Text size="5" weight="bold" style={{
        textAlign: "center"
      }}>
          Theme Color Editor
        </Text>
        
        <Flex direction="column" gap="4">
          {/* Primary Color */}
          <Box style={{
          padding: "16px",
          backgroundColor: "var(--gray-2)",
          borderRadius: "8px"
        }}>
            <Flex justify="between" align="center" style={{
            marginBottom: "12px"
          }}>
              <Text size="3" weight="medium">Primary Color</Text>
              <Flex align="center" gap="2">
                <Box style={{
                width: "24px",
                height: "24px",
                borderRadius: "4px",
                backgroundColor: primaryColor.hex,
                border: "1px solid var(--gray-6)"
              }} />
                <Text size="2" family="mono">{primaryColor.hex}</Text>
              </Flex>
            </Flex>
            <ColorPicker onColorSelect={setPrimaryColor} colorType="base" activeColor={primaryColor.name} />
          </Box>

          {/* Secondary Color */}
          <Box style={{
          padding: "16px",
          backgroundColor: "var(--gray-2)",
          borderRadius: "8px"
        }}>
            <Flex justify="between" align="center" style={{
            marginBottom: "12px"
          }}>
              <Text size="3" weight="medium">Secondary Color</Text>
              <Flex align="center" gap="2">
                <Box style={{
                width: "24px",
                height: "24px",
                borderRadius: "4px",
                backgroundColor: secondaryColor.hex,
                border: "1px solid var(--gray-6)"
              }} />
                <Text size="2" family="mono">{secondaryColor.hex}</Text>
              </Flex>
            </Flex>
            <ColorPicker onColorSelect={setSecondaryColor} colorType="all" activeColor={secondaryColor.hex} />
          </Box>

          {/* Accent Color */}
          <Box style={{
          padding: "16px",
          backgroundColor: "var(--gray-2)",
          borderRadius: "8px"
        }}>
            <Flex justify="between" align="center" style={{
            marginBottom: "12px"
          }}>
              <Text size="3" weight="medium">Accent Color</Text>
              <Flex align="center" gap="2">
                <Box style={{
                width: "24px",
                height: "24px",
                borderRadius: "4px",
                backgroundColor: accentColor.hex,
                border: "1px solid var(--gray-6)"
              }} />
                <Text size="2" family="mono">{accentColor.hex}</Text>
              </Flex>
            </Flex>
            <ColorPicker onColorSelect={setAccentColor} colorType="base" activeColor={accentColor.name} />
          </Box>
        </Flex>

        {/* Preview */}
        <Box style={{
        padding: "20px",
        backgroundColor: "var(--gray-1)",
        borderRadius: "8px",
        border: "1px solid var(--gray-6)"
      }}>
          <Text size="3" weight="medium" style={{
          marginBottom: "12px",
          display: "block"
        }}>
            Theme Preview
          </Text>
          <Flex gap="3">
            <button style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: primaryColor.hex,
            color: "white",
            fontSize: "14px",
            cursor: "pointer"
          }}>
              Primary Button
            </button>
            <button style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: \`1px solid \${secondaryColor.hex}\`,
            backgroundColor: "transparent",
            color: secondaryColor.hex,
            fontSize: "14px",
            cursor: "pointer"
          }}>
              Secondary Button
            </button>
            <button style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: "none",
            backgroundColor: accentColor.hex,
            color: "white",
            fontSize: "14px",
            cursor: "pointer"
          }}>
              Accent Button
            </button>
          </Flex>
        </Box>
      </Flex>;
  }
}`,
        ...(_r = (_q = h.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_s = y.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selectedColor, setSelectedColor] = useState<ColorSelectType | null>(null);
    const [colorType, setColorType] = useState<"base" | "all">("all");
    const [showDetails, setShowDetails] = useState(false);
    return <Flex direction="column" gap="4" align="center" style={{
      maxWidth: "400px"
    }}>
        <Text size="4" weight="bold">
          Interactive Color Picker
        </Text>
        
        {/* Controls */}
        <Flex gap="2">
          <Button variant={colorType === "base" ? "solid" : "outline"} size="sm" onClick={() => setColorType("base")}>
            Base Colors
          </Button>
          <Button variant={colorType === "all" ? "solid" : "outline"} size="sm" onClick={() => setColorType("all")}>
            All Colors
          </Button>
        </Flex>

        {/* Color Picker */}
        <ColorPicker onColorSelect={setSelectedColor} colorType={colorType} activeColor={colorType === "base" ? selectedColor?.name : selectedColor?.hex} />
        
        {/* Selected Color Display */}
        {selectedColor && <Box style={{
        width: "100%",
        padding: "16px",
        borderRadius: "8px",
        backgroundColor: "var(--gray-2)",
        textAlign: "center"
      }}>
            <Flex align="center" justify="center" gap="3" style={{
          marginBottom: "8px"
        }}>
              <Box style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            backgroundColor: selectedColor.hex,
            border: "2px solid var(--gray-6)"
          }} />
              <Text size="3" weight="medium">
                Color Selected
              </Text>
            </Flex>
            
            <Text size="2" family="mono" style={{
          marginBottom: "8px",
          display: "block"
        }}>
              {selectedColor.hex}
            </Text>
            
            {selectedColor.name && <Text size="1" color="gray" style={{
          marginBottom: "8px",
          display: "block"
        }}>
                Name: {selectedColor.name}
              </Text>}
            
            <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? "Hide" : "Show"} Details
            </Button>
            
            {showDetails && <Box style={{
          marginTop: "8px",
          padding: "8px",
          backgroundColor: "var(--gray-3)",
          borderRadius: "4px",
          fontSize: "12px"
        }}>
                <Text size="1" family="mono">
                  Type: {colorType}<br />
                  Hex: {selectedColor.hex}<br />
                  {selectedColor.name && \`Name: \${selectedColor.name}\`}
                </Text>
              </Box>}
          </Box>}
        
        {!selectedColor && <Text size="2" color="gray" style={{
        textAlign: "center"
      }}>
            Click on a color to select it
          </Text>}
      </Flex>;
  }
}`,
        ...(_u = (_t = y.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  L = [
    "Default",
    "BaseColors",
    "WithPreselectedColor",
    "InPopover",
    "ColorTypeComparison",
    "ThemeEditor",
    "InteractivePlayground"
  ];
});
export {
  p as BaseColors,
  u as ColorTypeComparison,
  x as Default,
  m as InPopover,
  y as InteractivePlayground,
  h as ThemeEditor,
  g as WithPreselectedColor,
  L as __namedExportsOrder,
  __tla,
  K as default
};
