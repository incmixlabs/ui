import { j as t, E as o, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { c as r } from "./utils-CBfrqCZ4.js";
let f, m;
let __tla = Promise.all([
  (() => {
    try {
      return __tla_0;
    } catch {
    }
  })()
]).then(async () => {
  function d({ className: e, ...a }) {
    return t.jsx("div", {
      "data-slot": "card-header",
      className: r("@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6", e),
      ...a
    });
  }
  function s({ className: e, ...a }) {
    return t.jsx("div", {
      "data-slot": "card-title",
      className: r("font-semibold leading-none", e),
      ...a
    });
  }
  function n({ className: e, ...a }) {
    return t.jsx("div", {
      "data-slot": "card-description",
      className: r("text-muted-foreground text-sm", e),
      ...a
    });
  }
  function i({ className: e, ...a }) {
    return t.jsx("div", {
      "data-slot": "card-content",
      className: r("px-6", e),
      ...a
    });
  }
  function c({ className: e, ...a }) {
    return t.jsx("div", {
      "data-slot": "card-footer",
      className: r("flex items-center px-6 [.border-t]:pt-6", e),
      ...a
    });
  }
  d.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CardHeader"
  };
  c.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CardFooter"
  };
  s.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CardTitle"
  };
  n.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CardDescription"
  };
  i.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CardContent"
  };
  m = ({ children: e, className: a = "", ...l }) => t.jsx(o, {
    variant: "surface",
    className: r("border-0 bg-gray-2 p-4", a),
    ...l,
    children: e
  });
  f = {
    Root: o,
    Header: d,
    Title: s,
    Description: n,
    Content: i,
    Footer: c
  };
  m.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "CardContainer",
    props: {
      className: {
        defaultValue: {
          value: '""',
          computed: false
        },
        required: false
      }
    }
  };
});
export {
  f as C,
  __tla,
  m as a
};
