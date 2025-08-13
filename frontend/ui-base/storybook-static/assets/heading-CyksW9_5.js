import { j as s, H as n, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
let o;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  let r;
  r = {
    hero: {
      as: "h1",
      size: "8",
      weight: "bold"
    },
    pageTitle: {
      as: "h2",
      size: "6",
      weight: "medium"
    },
    sectionTitle: {
      as: "h3",
      size: "5",
      weight: "medium"
    },
    subsection: {
      as: "h4",
      size: "4",
      weight: "regular"
    }
  };
  o = ({ children: i, variant: e, ...a }) => {
    const t = e ? r[e] : {};
    return s.jsx(n, {
      ...t,
      ...a,
      children: i
    });
  };
  o.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Heading",
    props: {
      children: {
        required: true,
        tsType: {
          name: "ReactReactNode",
          raw: "React.ReactNode"
        },
        description: ""
      },
      variant: {
        required: false,
        tsType: {
          name: "union",
          raw: '"hero" | "pageTitle" | "sectionTitle" | "subsection"',
          elements: [
            {
              name: "literal",
              value: '"hero"'
            },
            {
              name: "literal",
              value: '"pageTitle"'
            },
            {
              name: "literal",
              value: '"sectionTitle"'
            },
            {
              name: "literal",
              value: '"subsection"'
            }
          ]
        },
        description: ""
      }
    }
  };
});
export {
  o as H,
  __tla
};
