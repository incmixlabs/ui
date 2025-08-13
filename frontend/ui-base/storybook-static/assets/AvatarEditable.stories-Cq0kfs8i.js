import { r as z, j as e, F as o, T as B, a as t, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { A, __tla as __tla_1 } from "./avatar-DxZO6dds.js";
import { c as E } from "./utils-CBfrqCZ4.js";
import { P as J, T as F, __tla as __tla_2 } from "./trash-BVyHiUQV.js";
import { B as T, __tla as __tla_3 } from "./box-Dr3vL6g-.js";
import { B as W, __tla as __tla_4 } from "./button-BF2Wetgg.js";
import "./preload-helper-D9Z9MdNV.js";
import "./types-sXqsNS8j.js";
import { __tla as __tla_5 } from "./user-DF4nMnH4.js";
import { __tla as __tla_6 } from "./createLucideIcon-BUkpxZyj.js";
import { __tla as __tla_7 } from "./base-button-BHQkXpSv.js";
let x, p, d, u, m, b, f, g, h, y, l, Q, K;
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
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G;
  const n = ({ size: a = "3", src: s, name: v, deletable: i = true, onImageChange: c, onImageDelete: I, isDeletingImage: r = false, className: w }) => {
    const [D, S] = z.useState(false), j = z.useRef(null), q = async (k) => {
      var _a2;
      const C = (_a2 = k.target.files) == null ? void 0 : _a2[0];
      C && c && await c(C);
    };
    return e.jsxs(T, {
      position: "relative",
      className: "rounded-app",
      children: [
        e.jsx(A, {
          size: a,
          src: s,
          name: v,
          className: E("", w)
        }),
        e.jsxs(o, {
          position: "absolute",
          inset: "0",
          align: "center",
          justify: "center",
          className: "rounded-app",
          onMouseEnter: () => S(true),
          onMouseLeave: () => S(false),
          children: [
            e.jsx(o, {
              align: "center",
              justify: "center",
              className: `h-full w-full cursor-pointer rounded-app bg-black/50 transition-opacity ${D ? "opacity-100" : "opacity-0"}`,
              onClick: () => {
                var _a2;
                return (_a2 = j.current) == null ? void 0 : _a2.click();
              },
              children: e.jsx(J, {
                color: "white",
                size: 24
              })
            }),
            e.jsx("input", {
              ref: j,
              type: "file",
              accept: "image/*",
              style: {
                display: "none"
              },
              onChange: q
            })
          ]
        }),
        i && s && e.jsx(W, {
          onClick: I,
          variant: "ghost",
          color: "red",
          disabled: r,
          className: "absolute top-0 right-0 rounded-app bg-red-3 p-1",
          children: e.jsx(F, {
            width: "16",
            height: "16"
          })
        })
      ]
    });
  };
  n.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "AvatarEditable",
    props: {
      size: {
        defaultValue: {
          value: '"3"',
          computed: false
        },
        required: false
      },
      deletable: {
        defaultValue: {
          value: "true",
          computed: false
        },
        required: false
      },
      isDeletingImage: {
        defaultValue: {
          value: "false",
          computed: false
        },
        required: false
      }
    }
  };
  K = {
    title: "Elements/AvatarEditable",
    component: n,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (a) => e.jsx(B, {
        children: e.jsx(a, {})
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
          "5",
          "6",
          "7",
          "8",
          "9"
        ],
        description: "Avatar size"
      },
      src: {
        control: "text",
        description: "Image source URL"
      },
      name: {
        control: "text",
        description: "User name for fallback initials"
      },
      deletable: {
        control: "boolean",
        description: "Whether the delete button should be shown"
      },
      isDeletingImage: {
        control: "boolean",
        description: "Whether the delete action is in progress"
      },
      onImageChange: {
        action: "image-change",
        description: "Callback when image is changed"
      },
      onImageDelete: {
        action: "image-delete",
        description: "Callback when image is deleted"
      }
    },
    args: {
      size: "3",
      name: "John Doe",
      deletable: true,
      isDeletingImage: false
    }
  };
  p = {
    args: {
      src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
      name: "John Doe"
    }
  };
  l = {
    args: {
      name: "Jane Smith",
      deletable: false
    }
  };
  m = {
    args: {
      src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
      name: "Alice Johnson",
      deletable: false
    }
  };
  d = {
    args: {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
      name: "Carol Davis",
      isDeletingImage: true
    }
  };
  f = {
    args: {
      size: "1",
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
      name: "Bob Wilson"
    }
  };
  g = {
    args: {
      size: "5",
      src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?&w=192&h=192&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
      name: "David Brown"
    }
  };
  h = {
    args: {
      size: "9",
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=256&h=256&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
      name: "Eva Martinez"
    }
  };
  u = {
    render: () => {
      const [a, s] = z.useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"), [v, i] = z.useState(false), c = async (r) => {
        await new Promise((D) => setTimeout(D, 1e3));
        const w = URL.createObjectURL(r);
        s(w);
      }, I = async () => {
        i(true), await new Promise((r) => setTimeout(r, 1e3)), s(void 0), i(false);
      };
      return e.jsxs(o, {
        direction: "column",
        align: "center",
        gap: "4",
        children: [
          e.jsx(n, {
            size: "5",
            src: a,
            name: "Interactive User",
            onImageChange: c,
            onImageDelete: I,
            isDeletingImage: v
          }),
          e.jsx(t, {
            size: "2",
            color: "gray",
            children: a ? "Hover to edit, click delete to remove" : "Click to upload image"
          })
        ]
      });
    }
  };
  x = {
    render: () => e.jsx(o, {
      align: "center",
      gap: "4",
      wrap: "wrap",
      children: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9"
      ].map((a) => e.jsxs(o, {
        direction: "column",
        align: "center",
        gap: "2",
        children: [
          e.jsx(n, {
            size: a,
            src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
            name: `Size ${a}`,
            onImageChange: async () => {
            },
            onImageDelete: async () => {
            }
          }),
          e.jsxs(t, {
            size: "1",
            color: "gray",
            children: [
              "Size ",
              a
            ]
          })
        ]
      }, a))
    })
  };
  y = {
    render: () => e.jsxs(o, {
      direction: "column",
      gap: "6",
      align: "center",
      children: [
        e.jsxs("div", {
          children: [
            e.jsx(t, {
              size: "4",
              weight: "bold",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "With Image (Deletable)"
            }),
            e.jsx(n, {
              size: "4",
              src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
              name: "John Doe",
              deletable: true,
              onImageChange: async () => {
              },
              onImageDelete: async () => {
              }
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(t, {
              size: "4",
              weight: "bold",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "With Image (Not Deletable)"
            }),
            e.jsx(n, {
              size: "4",
              src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
              name: "Jane Smith",
              deletable: false,
              onImageChange: async () => {
              }
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(t, {
              size: "4",
              weight: "bold",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Without Image"
            }),
            e.jsx(n, {
              size: "4",
              name: "Alice Johnson",
              onImageChange: async () => {
              }
            })
          ]
        }),
        e.jsxs("div", {
          children: [
            e.jsx(t, {
              size: "4",
              weight: "bold",
              style: {
                marginBottom: "12px",
                display: "block"
              },
              children: "Deleting State"
            }),
            e.jsx(n, {
              size: "4",
              src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
              name: "Carol Davis",
              isDeletingImage: true,
              onImageChange: async () => {
              },
              onImageDelete: async () => {
              }
            })
          ]
        })
      ]
    })
  };
  b = {
    render: () => e.jsxs(T, {
      style: {
        padding: "24px",
        backgroundColor: "var(--gray-2)",
        borderRadius: "12px",
        maxWidth: "400px"
      },
      children: [
        e.jsx(t, {
          size: "5",
          weight: "bold",
          style: {
            marginBottom: "16px",
            display: "block"
          },
          children: "Profile Settings"
        }),
        e.jsxs(o, {
          align: "center",
          gap: "4",
          children: [
            e.jsx(n, {
              size: "6",
              src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=160&h=160&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
              name: "John Doe",
              onImageChange: async () => {
              },
              onImageDelete: async () => {
              }
            }),
            e.jsxs(o, {
              direction: "column",
              gap: "2",
              style: {
                flex: 1
              },
              children: [
                e.jsx(t, {
                  size: "4",
                  weight: "medium",
                  children: "John Doe"
                }),
                e.jsx(t, {
                  size: "2",
                  color: "gray",
                  children: "Senior Software Engineer"
                }),
                e.jsx(t, {
                  size: "2",
                  color: "gray",
                  children: "Hover over avatar to change profile picture"
                })
              ]
            })
          ]
        })
      ]
    })
  };
  p.parameters = {
    ...p.parameters,
    docs: {
      ...(_a = p.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  args: {
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    name: "John Doe"
  }
}`,
        ...(_c = (_b = p.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  l.parameters = {
    ...l.parameters,
    docs: {
      ...(_d = l.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  args: {
    name: "Jane Smith",
    deletable: false // No delete button when no image
  }
}`,
        ...(_f = (_e = l.parameters) == null ? void 0 : _e.docs) == null ? void 0 : _f.source
      }
    }
  };
  m.parameters = {
    ...m.parameters,
    docs: {
      ...(_g = m.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  args: {
    src: "https://images.unsplash.com/photo-1494790108755-2616b612b786?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    name: "Alice Johnson",
    deletable: false
  }
}`,
        ...(_i = (_h = m.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
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
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    name: "Carol Davis",
    isDeletingImage: true
  }
}`,
        ...(_l = (_k = d.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  f.parameters = {
    ...f.parameters,
    docs: {
      ...(_m = f.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  args: {
    size: "1",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    name: "Bob Wilson"
  }
}`,
        ...(_o = (_n = f.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  g.parameters = {
    ...g.parameters,
    docs: {
      ...(_p = g.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  args: {
    size: "5",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?&w=192&h=192&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    name: "David Brown"
  }
}`,
        ...(_r = (_q = g.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  h.parameters = {
    ...h.parameters,
    docs: {
      ...(_s = h.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  args: {
    size: "9",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?&w=256&h=256&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop",
    name: "Eva Martinez"
  }
}`,
        ...(_u = (_t = h.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  u.parameters = {
    ...u.parameters,
    docs: {
      ...(_v = u.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: () => {
    const [currentSrc, setCurrentSrc] = useState<string | undefined>("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop");
    const [isDeleting, setIsDeleting] = useState(false);
    const handleImageChange = async (file: File) => {
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file);
      setCurrentSrc(objectUrl);
    };
    const handleImageDelete = async () => {
      setIsDeleting(true);
      // Simulate delete delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setCurrentSrc(undefined);
      setIsDeleting(false);
    };
    return <Flex direction="column" align="center" gap="4">
        <AvatarEditable size="5" src={currentSrc} name="Interactive User" onImageChange={handleImageChange} onImageDelete={handleImageDelete} isDeletingImage={isDeleting} />
        <Text size="2" color="gray">
          {currentSrc ? "Hover to edit, click delete to remove" : "Click to upload image"}
        </Text>
      </Flex>;
  }
}`,
        ...(_x = (_w = u.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  x.parameters = {
    ...x.parameters,
    docs: {
      ...(_y = x.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: () => <Flex align="center" gap="4" wrap="wrap">
      {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map(size => <Flex key={size} direction="column" align="center" gap="2">
          <AvatarEditable size={size as any} src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" name={\`Size \${size}\`} onImageChange={async () => {}} onImageDelete={async () => {}} />
          <Text size="1" color="gray">
            Size {size}
          </Text>
        </Flex>)}
    </Flex>
}`,
        ...(_A = (_z = x.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  y.parameters = {
    ...y.parameters,
    docs: {
      ...(_B = y.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="6" align="center">
      <div>
        <Text size="4" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          With Image (Deletable)
        </Text>
        <AvatarEditable size="4" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" name="John Doe" deletable={true} onImageChange={async () => {}} onImageDelete={async () => {}} />
      </div>

      <div>
        <Text size="4" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          With Image (Not Deletable)
        </Text>
        <AvatarEditable size="4" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" name="Jane Smith" deletable={false} onImageChange={async () => {}} />
      </div>

      <div>
        <Text size="4" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Without Image
        </Text>
        <AvatarEditable size="4" name="Alice Johnson" onImageChange={async () => {}} />
      </div>

      <div>
        <Text size="4" weight="bold" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Deleting State
        </Text>
        <AvatarEditable size="4" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?&w=128&h=128&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" name="Carol Davis" isDeletingImage={true} onImageChange={async () => {}} onImageDelete={async () => {}} />
      </div>
    </Flex>
}`,
        ...(_D = (_C = y.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  b.parameters = {
    ...b.parameters,
    docs: {
      ...(_E = b.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: () => <Box style={{
    padding: "24px",
    backgroundColor: "var(--gray-2)",
    borderRadius: "12px",
    maxWidth: "400px"
  }}>
      <Text size="5" weight="bold" style={{
      marginBottom: "16px",
      display: "block"
    }}>
        Profile Settings
      </Text>

      <Flex align="center" gap="4">
        <AvatarEditable size="6" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?&w=160&h=160&dpr=2&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop" name="John Doe" onImageChange={async () => {}} onImageDelete={async () => {}} />

        <Flex direction="column" gap="2" style={{
        flex: 1
      }}>
          <Text size="4" weight="medium">
            John Doe
          </Text>
          <Text size="2" color="gray">
            Senior Software Engineer
          </Text>
          <Text size="2" color="gray">
            Hover over avatar to change profile picture
          </Text>
        </Flex>
      </Flex>
    </Box>
}`,
        ...(_G = (_F = b.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  Q = [
    "Default",
    "WithoutImage",
    "NotDeletable",
    "DeletingImage",
    "Size1",
    "Size5",
    "Size9",
    "Interactive",
    "AllSizes",
    "StatesComparison",
    "ProfileSettings"
  ];
});
export {
  x as AllSizes,
  p as Default,
  d as DeletingImage,
  u as Interactive,
  m as NotDeletable,
  b as ProfileSettings,
  f as Size1,
  g as Size5,
  h as Size9,
  y as StatesComparison,
  l as WithoutImage,
  Q as __namedExportsOrder,
  __tla,
  K as default
};
