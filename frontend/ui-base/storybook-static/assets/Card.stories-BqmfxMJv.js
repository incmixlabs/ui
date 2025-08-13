import { j as e, T as w, a as r, F as t, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { A as v, __tla as __tla_1 } from "./avatar-DxZO6dds.js";
import { C as n, a as z, __tla as __tla_2 } from "./card-BBSSQJCR.js";
import { H as a, __tla as __tla_3 } from "./heading-CyksW9_5.js";
import { B as i, __tla as __tla_4 } from "./button-BF2Wetgg.js";
import "./preload-helper-D9Z9MdNV.js";
import "./types-sXqsNS8j.js";
import { __tla as __tla_5 } from "./user-DF4nMnH4.js";
import { __tla as __tla_6 } from "./createLucideIcon-BUkpxZyj.js";
import "./utils-CBfrqCZ4.js";
import { __tla as __tla_7 } from "./base-button-BHQkXpSv.js";
let c, j, y, d, x, C, g, p, m, u, h, l, U, P;
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J;
  P = {
    title: "Base/Card",
    component: n.Root,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (s) => e.jsx(w, {
        children: e.jsx(s, {})
      })
    ],
    argTypes: {
      size: {
        control: "select",
        options: [
          "1",
          "2",
          "3",
          "4",
          "5"
        ],
        description: "Card size (affects padding)"
      },
      variant: {
        control: "select",
        options: [
          "surface",
          "classic",
          "ghost"
        ],
        description: "Card variant style"
      },
      asChild: {
        control: "boolean",
        description: "Merge props with the child element"
      }
    },
    args: {
      size: "1",
      variant: "surface"
    }
  };
  d = {
    render: (s) => e.jsxs(n.Root, {
      ...s,
      style: {
        width: "300px"
      },
      children: [
        e.jsxs(n.Header, {
          children: [
            e.jsx(n.Title, {
              children: "Card Title"
            }),
            e.jsx(n.Description, {
              children: "Card description goes here."
            })
          ]
        }),
        e.jsx(n.Content, {
          children: e.jsx(r, {
            size: "2",
            children: "This is the main content of the card using the new Card API structure."
          })
        })
      ]
    })
  };
  l = {
    render: () => e.jsxs(z, {
      style: {
        width: "300px"
      },
      children: [
        e.jsx(a, {
          size: "4",
          style: {
            marginBottom: "8px"
          },
          children: "CardContainer"
        }),
        e.jsx(r, {
          size: "2",
          color: "gray",
          children: "This uses the CardContainer component which wraps content with Radix Card styling."
        })
      ]
    })
  };
  c = {
    render: () => e.jsxs(n.Root, {
      style: {
        width: "350px"
      },
      children: [
        e.jsxs(n.Header, {
          children: [
            e.jsx(n.Title, {
              children: "Getting Started"
            }),
            e.jsx(n.Description, {
              children: "Learn how to use the new Card components with proper structure."
            })
          ]
        }),
        e.jsx(n.Content, {
          children: e.jsx(r, {
            size: "2",
            children: "The Card now uses a composite pattern with separate components for header, title, description, content, and footer."
          })
        }),
        e.jsx(n.Footer, {
          children: e.jsxs(t, {
            gap: "2",
            justify: "end",
            style: {
              width: "100%"
            },
            children: [
              e.jsx(i, {
                variant: "outline",
                size: "1",
                children: "Cancel"
              }),
              e.jsx(i, {
                size: "1",
                children: "Continue"
              })
            ]
          })
        })
      ]
    })
  };
  x = {
    render: () => e.jsxs(n.Root, {
      style: {
        width: "400px"
      },
      children: [
        e.jsxs(n.Header, {
          children: [
            e.jsx(n.Title, {
              children: "Complete Card Example"
            }),
            e.jsx(n.Description, {
              children: "This card demonstrates all available sections and proper usage."
            })
          ]
        }),
        e.jsx(n.Content, {
          children: e.jsxs(t, {
            direction: "column",
            gap: "3",
            children: [
              e.jsx(r, {
                size: "2",
                children: "This is the main content area where you can place any content."
              }),
              e.jsx("div", {
                style: {
                  padding: "12px",
                  backgroundColor: "var(--gray-3)",
                  borderRadius: "6px"
                },
                children: e.jsx(r, {
                  size: "1",
                  color: "gray",
                  children: "Example content block with background"
                })
              })
            ]
          })
        }),
        e.jsx(n.Footer, {
          children: e.jsxs(t, {
            gap: "2",
            justify: "between",
            align: "center",
            style: {
              width: "100%"
            },
            children: [
              e.jsx(r, {
                size: "1",
                color: "gray",
                children: "Footer information"
              }),
              e.jsxs(t, {
                gap: "2",
                children: [
                  e.jsx(i, {
                    variant: "outline",
                    size: "1",
                    children: "Secondary"
                  }),
                  e.jsx(i, {
                    size: "1",
                    children: "Primary"
                  })
                ]
              })
            ]
          })
        })
      ]
    })
  };
  p = {
    render: () => e.jsxs(n, {
      size: "3",
      style: {
        width: "300px"
      },
      children: [
        e.jsx(a, {
          size: "4",
          style: {
            marginBottom: "8px"
          },
          children: "Card Title"
        }),
        e.jsx(r, {
          size: "2",
          color: "gray",
          children: "This is a simple card with a title and some descriptive text content."
        })
      ]
    })
  };
  h = {
    render: () => e.jsx(n, {
      size: "3",
      style: {
        width: "300px"
      },
      children: e.jsxs(t, {
        direction: "column",
        gap: "3",
        children: [
          e.jsxs("div", {
            children: [
              e.jsx(a, {
                size: "4",
                style: {
                  marginBottom: "8px"
                },
                children: "Settings"
              }),
              e.jsx(r, {
                size: "2",
                color: "gray",
                children: "Manage your account settings and preferences."
              })
            ]
          }),
          e.jsxs(t, {
            gap: "2",
            justify: "end",
            children: [
              e.jsx(i, {
                variant: "outline",
                size: "1",
                children: "Cancel"
              }),
              e.jsx(i, {
                size: "1",
                children: "Save"
              })
            ]
          })
        ]
      })
    })
  };
  u = {
    render: () => e.jsx(n, {
      size: "4",
      style: {
        width: "350px"
      },
      children: e.jsxs(t, {
        direction: "column",
        gap: "3",
        children: [
          e.jsxs(t, {
            gap: "3",
            align: "center",
            children: [
              e.jsx(v, {
                src: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
                fallback: "JD",
                size: "5"
              }),
              e.jsxs(t, {
                direction: "column",
                gap: "1",
                children: [
                  e.jsx(a, {
                    size: "4",
                    children: "John Doe"
                  }),
                  e.jsx(r, {
                    size: "2",
                    color: "gray",
                    children: "Senior Developer"
                  })
                ]
              })
            ]
          }),
          e.jsx(r, {
            size: "2",
            children: "Passionate about creating great user experiences and building scalable applications."
          }),
          e.jsxs(t, {
            gap: "2",
            children: [
              e.jsx(i, {
                variant: "outline",
                size: "1",
                style: {
                  flex: 1
                },
                children: "Message"
              }),
              e.jsx(i, {
                size: "1",
                style: {
                  flex: 1
                },
                children: "Follow"
              })
            ]
          })
        ]
      })
    })
  };
  g = {
    render: () => e.jsx(n, {
      size: "3",
      style: {
        width: "280px"
      },
      children: e.jsxs(t, {
        direction: "column",
        gap: "3",
        children: [
          e.jsx("div", {
            style: {
              height: "120px",
              backgroundColor: "var(--gray-3)",
              borderRadius: "6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            },
            children: e.jsx(r, {
              size: "2",
              color: "gray",
              children: "Product Image"
            })
          }),
          e.jsxs("div", {
            children: [
              e.jsx(a, {
                size: "3",
                style: {
                  marginBottom: "4px"
                },
                children: "Wireless Headphones"
              }),
              e.jsx(r, {
                size: "2",
                color: "gray",
                style: {
                  marginBottom: "8px"
                },
                children: "High-quality sound with noise cancellation"
              }),
              e.jsxs(t, {
                justify: "between",
                align: "center",
                children: [
                  e.jsx(r, {
                    size: "4",
                    weight: "bold",
                    color: "blue",
                    children: "$199"
                  }),
                  e.jsx(i, {
                    size: "1",
                    children: "Add to Cart"
                  })
                ]
              })
            ]
          })
        ]
      })
    })
  };
  m = {
    render: () => e.jsx(t, {
      gap: "3",
      wrap: "wrap",
      children: [
        {
          title: "Total Users",
          value: "12,345",
          change: "+12%",
          color: "green"
        },
        {
          title: "Revenue",
          value: "$45,678",
          change: "+8%",
          color: "blue"
        },
        {
          title: "Orders",
          value: "1,234",
          change: "-3%",
          color: "red"
        }
      ].map((s, o) => e.jsx(n, {
        size: "3",
        style: {
          minWidth: "160px"
        },
        children: e.jsxs(t, {
          direction: "column",
          gap: "2",
          children: [
            e.jsx(r, {
              size: "2",
              color: "gray",
              children: s.title
            }),
            e.jsx(a, {
              size: "5",
              children: s.value
            }),
            e.jsxs(r, {
              size: "1",
              color: s.color,
              children: [
                s.change,
                " from last month"
              ]
            })
          ]
        })
      }, o))
    })
  };
  C = {
    render: () => e.jsx(n, {
      size: "3",
      style: {
        width: "320px"
      },
      children: e.jsxs(t, {
        gap: "3",
        align: "start",
        children: [
          e.jsx("div", {
            style: {
              width: "8px",
              height: "8px",
              backgroundColor: "var(--blue-9)",
              borderRadius: "50%",
              marginTop: "6px",
              flexShrink: 0
            }
          }),
          e.jsxs(t, {
            direction: "column",
            gap: "2",
            style: {
              flex: 1
            },
            children: [
              e.jsxs(t, {
                justify: "between",
                align: "start",
                children: [
                  e.jsx(r, {
                    size: "2",
                    weight: "medium",
                    children: "New message received"
                  }),
                  e.jsx(r, {
                    size: "1",
                    color: "gray",
                    children: "2m ago"
                  })
                ]
              }),
              e.jsx(r, {
                size: "2",
                color: "gray",
                children: "You have a new message from Sarah. Click to view the conversation."
              }),
              e.jsxs(t, {
                gap: "2",
                justify: "end",
                children: [
                  e.jsx(i, {
                    variant: "ghost",
                    size: "1",
                    children: "Dismiss"
                  }),
                  e.jsx(i, {
                    variant: "outline",
                    size: "1",
                    children: "View"
                  })
                ]
              })
            ]
          })
        ]
      })
    })
  };
  y = {
    render: () => e.jsxs(t, {
      direction: "column",
      gap: "4",
      style: {
        width: "600px"
      },
      children: [
        e.jsx(a, {
          size: "6",
          children: "Dashboard"
        }),
        e.jsx(t, {
          gap: "3",
          wrap: "wrap",
          children: [
            {
              title: "Active Users",
              value: "2,543",
              icon: "\u{1F465}"
            },
            {
              title: "Total Sales",
              value: "$12,345",
              icon: "\u{1F4B0}"
            },
            {
              title: "Conversion Rate",
              value: "3.2%",
              icon: "\u{1F4C8}"
            },
            {
              title: "Support Tickets",
              value: "23",
              icon: "\u{1F3AB}"
            }
          ].map((s, o) => e.jsx(n, {
            size: "2",
            style: {
              flex: 1,
              minWidth: "140px"
            },
            children: e.jsxs(t, {
              gap: "2",
              align: "center",
              children: [
                e.jsx(r, {
                  size: "4",
                  children: s.icon
                }),
                e.jsxs(t, {
                  direction: "column",
                  gap: "1",
                  children: [
                    e.jsx(r, {
                      size: "1",
                      color: "gray",
                      children: s.title
                    }),
                    e.jsx(r, {
                      size: "3",
                      weight: "bold",
                      children: s.value
                    })
                  ]
                })
              ]
            })
          }, o))
        }),
        e.jsxs(t, {
          gap: "4",
          align: "start",
          children: [
            e.jsx(n, {
              size: "3",
              style: {
                flex: 2
              },
              children: e.jsxs(t, {
                direction: "column",
                gap: "3",
                children: [
                  e.jsx(a, {
                    size: "4",
                    children: "Recent Activity"
                  }),
                  e.jsx(t, {
                    direction: "column",
                    gap: "2",
                    children: [
                      "User John signed up",
                      "Order #1234 completed",
                      "Payment received from client",
                      "New support ticket created"
                    ].map((s, o) => e.jsxs(t, {
                      gap: "2",
                      align: "center",
                      children: [
                        e.jsx("div", {
                          style: {
                            width: "6px",
                            height: "6px",
                            backgroundColor: "var(--green-9)",
                            borderRadius: "50%"
                          }
                        }),
                        e.jsx(r, {
                          size: "2",
                          children: s
                        })
                      ]
                    }, o))
                  })
                ]
              })
            }),
            e.jsx(n, {
              size: "3",
              style: {
                flex: 1
              },
              children: e.jsxs(t, {
                direction: "column",
                gap: "3",
                children: [
                  e.jsx(a, {
                    size: "4",
                    children: "Quick Actions"
                  }),
                  e.jsxs(t, {
                    direction: "column",
                    gap: "2",
                    children: [
                      e.jsx(i, {
                        size: "2",
                        variant: "outline",
                        children: "Add User"
                      }),
                      e.jsx(i, {
                        size: "2",
                        variant: "outline",
                        children: "Create Order"
                      }),
                      e.jsx(i, {
                        size: "2",
                        variant: "outline",
                        children: "View Reports"
                      }),
                      e.jsx(i, {
                        size: "2",
                        children: "Settings"
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
  j = {
    render: () => e.jsxs(t, {
      gap: "4",
      align: "start",
      wrap: "wrap",
      children: [
        e.jsxs("div", {
          style: {
            flex: 1,
            minWidth: "300px"
          },
          children: [
            e.jsx(r, {
              size: "3",
              weight: "bold",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "CardContainer"
            }),
            e.jsx(z, {
              children: e.jsxs(t, {
                direction: "column",
                gap: "2",
                children: [
                  e.jsx(r, {
                    size: "2",
                    weight: "medium",
                    children: "Simple wrapper"
                  }),
                  e.jsx(r, {
                    size: "2",
                    color: "gray",
                    children: "Uses Radix Card with predefined styling. Good for simple content without structured sections."
                  }),
                  e.jsx(i, {
                    size: "1",
                    variant: "outline",
                    children: "Action"
                  })
                ]
              })
            })
          ]
        }),
        e.jsxs("div", {
          style: {
            flex: 1,
            minWidth: "300px"
          },
          children: [
            e.jsx(r, {
              size: "3",
              weight: "bold",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Card.Root Structure"
            }),
            e.jsxs(n.Root, {
              children: [
                e.jsxs(n.Header, {
                  children: [
                    e.jsx(n.Title, {
                      children: "Structured card"
                    }),
                    e.jsx(n.Description, {
                      children: "Uses shadcn Card components"
                    })
                  ]
                }),
                e.jsx(n.Content, {
                  children: e.jsx(r, {
                    size: "2",
                    color: "gray",
                    children: "Provides semantic structure with header, content, and footer sections."
                  })
                }),
                e.jsx(n.Footer, {
                  children: e.jsx(i, {
                    size: "1",
                    variant: "outline",
                    children: "Action"
                  })
                })
              ]
            })
          ]
        })
      ]
    })
  };
  d.parameters = {
    ...d.parameters,
    docs: {
      ...(_a = d.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => <Card.Root {...args} style={{
    width: "300px"
  }}>
      <Card.Header>
        <Card.Title>Card Title</Card.Title>
        <Card.Description>Card description goes here.</Card.Description>
      </Card.Header>
      <Card.Content>
        <Text size="2">
          This is the main content of the card using the new Card API structure.
        </Text>
      </Card.Content>
    </Card.Root>
}`,
        ...(_c = (_b = d.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_d = l.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: () => <CardContainer style={{
    width: "300px"
  }}>
      <Heading size="4" style={{
      marginBottom: "8px"
    }}>
        CardContainer
      </Heading>
      <Text size="2" color="gray">
        This uses the CardContainer component which wraps content with Radix Card styling.
      </Text>
    </CardContainer>
}`,
        ...(_f = (_e = l.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  c.parameters = {
    ...c.parameters,
    docs: {
      ...(_g = c.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: () => <Card.Root style={{
    width: "350px"
  }}>
      <Card.Header>
        <Card.Title>Getting Started</Card.Title>
        <Card.Description>
          Learn how to use the new Card components with proper structure.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Text size="2">
          The Card now uses a composite pattern with separate components for header, 
          title, description, content, and footer.
        </Text>
      </Card.Content>
      <Card.Footer>
        <Flex gap="2" justify="end" style={{
        width: "100%"
      }}>
          <Button variant="outline" size="1">
            Cancel
          </Button>
          <Button size="1">Continue</Button>
        </Flex>
      </Card.Footer>
    </Card.Root>
}`,
        ...(_i = (_h = c.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_j = x.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: () => <Card.Root style={{
    width: "400px"
  }}>
      <Card.Header>
        <Card.Title>Complete Card Example</Card.Title>
        <Card.Description>
          This card demonstrates all available sections and proper usage.
        </Card.Description>
      </Card.Header>
      <Card.Content>
        <Flex direction="column" gap="3">
          <Text size="2">
            This is the main content area where you can place any content.
          </Text>
          <div style={{
          padding: "12px",
          backgroundColor: "var(--gray-3)",
          borderRadius: "6px"
        }}>
            <Text size="1" color="gray">
              Example content block with background
            </Text>
          </div>
        </Flex>
      </Card.Content>
      <Card.Footer>
        <Flex gap="2" justify="between" align="center" style={{
        width: "100%"
      }}>
          <Text size="1" color="gray">
            Footer information
          </Text>
          <Flex gap="2">
            <Button variant="outline" size="1">Secondary</Button>
            <Button size="1">Primary</Button>
          </Flex>
        </Flex>
      </Card.Footer>
    </Card.Root>
}`,
        ...(_l = (_k = x.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_m = p.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: () => <Card size="3" style={{
    width: "300px"
  }}>
      <Heading size="4" style={{
      marginBottom: "8px"
    }}>
        Card Title
      </Heading>
      <Text size="2" color="gray">
        This is a simple card with a title and some descriptive text content.
      </Text>
    </Card>
}`,
        ...(_o = (_n = p.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_p = h.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: () => <Card size="3" style={{
    width: "300px"
  }}>
      <Flex direction="column" gap="3">
        <div>
          <Heading size="4" style={{
          marginBottom: "8px"
        }}>
            Settings
          </Heading>
          <Text size="2" color="gray">
            Manage your account settings and preferences.
          </Text>
        </div>
        <Flex gap="2" justify="end">
          <Button variant="outline" size="1">
            Cancel
          </Button>
          <Button size="1">Save</Button>
        </Flex>
      </Flex>
    </Card>
}`,
        ...(_r = (_q = h.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_s = u.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: () => <Card size="4" style={{
    width: "350px"
  }}>
      <Flex direction="column" gap="3">
        <Flex gap="3" align="center">
          <Avatar src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" fallback="JD" size="5" />
          <Flex direction="column" gap="1">
            <Heading size="4">John Doe</Heading>
            <Text size="2" color="gray">
              Senior Developer
            </Text>
          </Flex>
        </Flex>
        <Text size="2">
          Passionate about creating great user experiences and building scalable
          applications.
        </Text>
        <Flex gap="2">
          <Button variant="outline" size="1" style={{
          flex: 1
        }}>
            Message
          </Button>
          <Button size="1" style={{
          flex: 1
        }}>
            Follow
          </Button>
        </Flex>
      </Flex>
    </Card>
}`,
        ...(_u = (_t = u.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  g.parameters = {
    ...g.parameters,
    docs: {
      ...(_v = g.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: () => <Card size="3" style={{
    width: "280px"
  }}>
      <Flex direction="column" gap="3">
        <div style={{
        height: "120px",
        backgroundColor: "var(--gray-3)",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
          <Text size="2" color="gray">
            Product Image
          </Text>
        </div>
        <div>
          <Heading size="3" style={{
          marginBottom: "4px"
        }}>
            Wireless Headphones
          </Heading>
          <Text size="2" color="gray" style={{
          marginBottom: "8px"
        }}>
            High-quality sound with noise cancellation
          </Text>
          <Flex justify="between" align="center">
            <Text size="4" weight="bold" color="blue">
              $199
            </Text>
            <Button size="1">Add to Cart</Button>
          </Flex>
        </div>
      </Flex>
    </Card>
}`,
        ...(_x = (_w = g.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_y = m.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="3" wrap="wrap">
      {[{
      title: "Total Users",
      value: "12,345",
      change: "+12%",
      color: "green"
    }, {
      title: "Revenue",
      value: "$45,678",
      change: "+8%",
      color: "blue"
    }, {
      title: "Orders",
      value: "1,234",
      change: "-3%",
      color: "red"
    }].map((stat, index) => <Card key={index} size="3" style={{
      minWidth: "160px"
    }}>
          <Flex direction="column" gap="2">
            <Text size="2" color="gray">
              {stat.title}
            </Text>
            <Heading size="5">{stat.value}</Heading>
            <Text size="1" color={stat.color as any}>
              {stat.change} from last month
            </Text>
          </Flex>
        </Card>)}
    </Flex>
}`,
        ...(_A = (_z = m.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  C.parameters = {
    ...C.parameters,
    docs: {
      ...(_B = C.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: () => <Card size="3" style={{
    width: "320px"
  }}>
      <Flex gap="3" align="start">
        <div style={{
        width: "8px",
        height: "8px",
        backgroundColor: "var(--blue-9)",
        borderRadius: "50%",
        marginTop: "6px",
        flexShrink: 0
      }} />
        <Flex direction="column" gap="2" style={{
        flex: 1
      }}>
          <Flex justify="between" align="start">
            <Text size="2" weight="medium">
              New message received
            </Text>
            <Text size="1" color="gray">
              2m ago
            </Text>
          </Flex>
          <Text size="2" color="gray">
            You have a new message from Sarah. Click to view the conversation.
          </Text>
          <Flex gap="2" justify="end">
            <Button variant="ghost" size="1">
              Dismiss
            </Button>
            <Button variant="outline" size="1">
              View
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Card>
}`,
        ...(_D = (_C = C.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_E = y.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4" style={{
    width: "600px"
  }}>
      <Heading size="6">Dashboard</Heading>

      {/* Stats Row */}
      <Flex gap="3" wrap="wrap">
        {[{
        title: "Active Users",
        value: "2,543",
        icon: "\u{1F465}"
      }, {
        title: "Total Sales",
        value: "$12,345",
        icon: "\u{1F4B0}"
      }, {
        title: "Conversion Rate",
        value: "3.2%",
        icon: "\u{1F4C8}"
      }, {
        title: "Support Tickets",
        value: "23",
        icon: "\u{1F3AB}"
      }].map((stat, index) => <Card key={index} size="2" style={{
        flex: 1,
        minWidth: "140px"
      }}>
            <Flex gap="2" align="center">
              <Text size="4">{stat.icon}</Text>
              <Flex direction="column" gap="1">
                <Text size="1" color="gray">
                  {stat.title}
                </Text>
                <Text size="3" weight="bold">
                  {stat.value}
                </Text>
              </Flex>
            </Flex>
          </Card>)}
      </Flex>

      {/* Main Content Row */}
      <Flex gap="4" align="start">
        <Card size="3" style={{
        flex: 2
      }}>
          <Flex direction="column" gap="3">
            <Heading size="4">Recent Activity</Heading>
            <Flex direction="column" gap="2">
              {["User John signed up", "Order #1234 completed", "Payment received from client", "New support ticket created"].map((activity, index) => <Flex key={index} gap="2" align="center">
                  <div style={{
                width: "6px",
                height: "6px",
                backgroundColor: "var(--green-9)",
                borderRadius: "50%"
              }} />
                  <Text size="2">{activity}</Text>
                </Flex>)}
            </Flex>
          </Flex>
        </Card>

        <Card size="3" style={{
        flex: 1
      }}>
          <Flex direction="column" gap="3">
            <Heading size="4">Quick Actions</Heading>
            <Flex direction="column" gap="2">
              <Button size="2" variant="outline">
                Add User
              </Button>
              <Button size="2" variant="outline">
                Create Order
              </Button>
              <Button size="2" variant="outline">
                View Reports
              </Button>
              <Button size="2">Settings</Button>
            </Flex>
          </Flex>
        </Card>
      </Flex>
    </Flex>
}`,
        ...(_G = (_F = y.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  j.parameters = {
    ...j.parameters,
    docs: {
      ...(_H = j.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: () => <Flex gap="4" align="start" wrap="wrap">
      <div style={{
      flex: 1,
      minWidth: "300px"
    }}>
        <Text size="3" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          CardContainer
        </Text>
        <CardContainer>
          <Flex direction="column" gap="2">
            <Text size="2" weight="medium">Simple wrapper</Text>
            <Text size="2" color="gray">
              Uses Radix Card with predefined styling. Good for simple content without structured sections.
            </Text>
            <Button size="1" variant="outline">Action</Button>
          </Flex>
        </CardContainer>
      </div>
      
      <div style={{
      flex: 1,
      minWidth: "300px"
    }}>
        <Text size="3" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Card.Root Structure
        </Text>
        <Card.Root>
          <Card.Header>
            <Card.Title>Structured card</Card.Title>
            <Card.Description>Uses shadcn Card components</Card.Description>
          </Card.Header>
          <Card.Content>
            <Text size="2" color="gray">
              Provides semantic structure with header, content, and footer sections.
            </Text>
          </Card.Content>
          <Card.Footer>
            <Button size="1" variant="outline">Action</Button>
          </Card.Footer>
        </Card.Root>
      </div>
    </Flex>
}`,
        ...(_J = (_I = j.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  U = [
    "Default",
    "WithCardContainer",
    "BasicStructure",
    "FullStructure",
    "SimpleContent",
    "WithActions",
    "UserProfile",
    "ProductCard",
    "StatsCard",
    "NotificationCard",
    "DashboardLayout",
    "ComponentComparison"
  ];
});
export {
  c as BasicStructure,
  j as ComponentComparison,
  y as DashboardLayout,
  d as Default,
  x as FullStructure,
  C as NotificationCard,
  g as ProductCard,
  p as SimpleContent,
  m as StatsCard,
  u as UserProfile,
  h as WithActions,
  l as WithCardContainer,
  U as __namedExportsOrder,
  __tla,
  P as default
};
