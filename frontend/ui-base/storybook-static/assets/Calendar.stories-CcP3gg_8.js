import { f as h, r as b, j as l, T as Wn, a as $, F as X, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { C as P, __tla as __tla_1 } from "./card-BBSSQJCR.js";
import { c as fe } from "./utils-CBfrqCZ4.js";
import { b as yt, __tla as __tla_2 } from "./button-Coy0SoMQ.js";
import { C as Nn, a as Tn, __tla as __tla_3 } from "./chevron-right-tttQlfk_.js";
import { B as me, __tla as __tla_4 } from "./button-BF2Wetgg.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_5 } from "./createLucideIcon-BUkpxZyj.js";
import { __tla as __tla_6 } from "./base-button-BHQkXpSv.js";
let ze, Ge, qe, Te, Be, Pe, _e, $e, je, Ye, Ie, Ee, Le, He, Fe, Re, Ae, $s, Ls;
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
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e2, _f, _g, _h, _i, _j, _k, _l, _m, _n2, _o2, _p, _q, _r2, _s, _t2, _u, _v, _w, _x, _y, _z, _A, _B, _C, _D, _E, _F, _G, _H, _I, _J, _K, _L, _M, _N, _O, _P, _Q, _R, _S, _T, _U, _V, _W, _X, _Y;
  function Yn(e, t, n = "long") {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      timeZone: e,
      timeZoneName: n
    }).format(t).split(/\s/g).slice(2).join(" ");
  }
  const En = {}, be = {};
  function De(e, t) {
    try {
      const r = (En[e] || (En[e] = new Intl.DateTimeFormat("en-US", {
        timeZone: e,
        timeZoneName: "longOffset"
      }).format))(t).split("GMT")[1];
      return r in be ? be[r] : gt(r, r.split(":"));
    } catch {
      if (e in be) return be[e];
      const n = e == null ? void 0 : e.match(Fn);
      return n ? gt(e, n.slice(1)) : NaN;
    }
  }
  const Fn = /([+-]\d\d):?(\d\d)?/;
  function gt(e, t) {
    const n = +(t[0] || 0), r = +(t[1] || 0);
    return be[e] = n > 0 ? n * 60 + r : n * 60 - r;
  }
  class ee extends Date {
    constructor(...t) {
      super(), t.length > 1 && typeof t[t.length - 1] == "string" && (this.timeZone = t.pop()), this.internal = /* @__PURE__ */ new Date(), isNaN(De(this.timeZone, this)) ? this.setTime(NaN) : t.length ? typeof t[0] == "number" && (t.length === 1 || t.length === 2 && typeof t[1] != "number") ? this.setTime(t[0]) : typeof t[0] == "string" ? this.setTime(+new Date(t[0])) : t[0] instanceof Date ? this.setTime(+t[0]) : (this.setTime(+new Date(...t)), Wt(this), at(this)) : this.setTime(Date.now());
    }
    static tz(t, ...n) {
      return n.length ? new ee(...n, t) : new ee(Date.now(), t);
    }
    withTimeZone(t) {
      return new ee(+this, t);
    }
    getTimezoneOffset() {
      return -De(this.timeZone, this);
    }
    setTime(t) {
      return Date.prototype.setTime.apply(this, arguments), at(this), +this;
    }
    [Symbol.for("constructDateFrom")](t) {
      return new ee(+new Date(t), this.timeZone);
    }
  }
  const pt = /^(get|set)(?!UTC)/;
  Object.getOwnPropertyNames(Date.prototype).forEach((e) => {
    if (!pt.test(e)) return;
    const t = e.replace(pt, "$1UTC");
    ee.prototype[t] && (e.startsWith("get") ? ee.prototype[e] = function() {
      return this.internal[t]();
    } : (ee.prototype[e] = function() {
      return Date.prototype[t].apply(this.internal, arguments), Pn(this), +this;
    }, ee.prototype[t] = function() {
      return Date.prototype[t].apply(this, arguments), at(this), +this;
    }));
  });
  function at(e) {
    e.internal.setTime(+e), e.internal.setUTCMinutes(e.internal.getUTCMinutes() - e.getTimezoneOffset());
  }
  function Pn(e) {
    Date.prototype.setFullYear.call(e, e.internal.getUTCFullYear(), e.internal.getUTCMonth(), e.internal.getUTCDate()), Date.prototype.setHours.call(e, e.internal.getUTCHours(), e.internal.getUTCMinutes(), e.internal.getUTCSeconds(), e.internal.getUTCMilliseconds()), Wt(e);
  }
  function Wt(e) {
    const t = De(e.timeZone, e), n = /* @__PURE__ */ new Date(+e);
    n.setUTCHours(n.getUTCHours() - 1);
    const r = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset(), o = -(/* @__PURE__ */ new Date(+n)).getTimezoneOffset(), s = r - o, i = Date.prototype.getHours.apply(e) !== e.internal.getUTCHours();
    s && i && e.internal.setUTCMinutes(e.internal.getUTCMinutes() + s);
    const a = r - t;
    a && Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + a);
    const c = De(e.timeZone, e), f = -(/* @__PURE__ */ new Date(+e)).getTimezoneOffset() - c, d = c !== t, m = f - a;
    if (d && m) {
      Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + m);
      const p = De(e.timeZone, e), w = c - p;
      w && (e.internal.setUTCMinutes(e.internal.getUTCMinutes() + w), Date.prototype.setUTCMinutes.call(e, Date.prototype.getUTCMinutes.call(e) + w));
    }
  }
  class A extends ee {
    static tz(t, ...n) {
      return n.length ? new A(...n, t) : new A(Date.now(), t);
    }
    toISOString() {
      const [t, n, r] = this.tzComponents(), o = `${t}${n}:${r}`;
      return this.internal.toISOString().slice(0, -1) + o;
    }
    toString() {
      return `${this.toDateString()} ${this.toTimeString()}`;
    }
    toDateString() {
      const [t, n, r, o] = this.internal.toUTCString().split(" ");
      return `${t == null ? void 0 : t.slice(0, -1)} ${r} ${n} ${o}`;
    }
    toTimeString() {
      const t = this.internal.toUTCString().split(" ")[4], [n, r, o] = this.tzComponents();
      return `${t} GMT${n}${r}${o} (${Yn(this.timeZone, this)})`;
    }
    toLocaleString(t, n) {
      return Date.prototype.toLocaleString.call(this, t, {
        ...n,
        timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
      });
    }
    toLocaleDateString(t, n) {
      return Date.prototype.toLocaleDateString.call(this, t, {
        ...n,
        timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
      });
    }
    toLocaleTimeString(t, n) {
      return Date.prototype.toLocaleTimeString.call(this, t, {
        ...n,
        timeZone: (n == null ? void 0 : n.timeZone) || this.timeZone
      });
    }
    tzComponents() {
      const t = this.getTimezoneOffset(), n = t > 0 ? "-" : "+", r = String(Math.floor(Math.abs(t) / 60)).padStart(2, "0"), o = String(Math.abs(t) % 60).padStart(2, "0");
      return [
        n,
        r,
        o
      ];
    }
    withTimeZone(t) {
      return new A(+this, t);
    }
    [Symbol.for("constructDateFrom")](t) {
      return new A(+new Date(t), this.timeZone);
    }
  }
  var y;
  (function(e) {
    e.Root = "root", e.Chevron = "chevron", e.Day = "day", e.DayButton = "day_button", e.CaptionLabel = "caption_label", e.Dropdowns = "dropdowns", e.Dropdown = "dropdown", e.DropdownRoot = "dropdown_root", e.Footer = "footer", e.MonthGrid = "month_grid", e.MonthCaption = "month_caption", e.MonthsDropdown = "months_dropdown", e.Month = "month", e.Months = "months", e.Nav = "nav", e.NextMonthButton = "button_next", e.PreviousMonthButton = "button_previous", e.Week = "week", e.Weeks = "weeks", e.Weekday = "weekday", e.Weekdays = "weekdays", e.WeekNumber = "week_number", e.WeekNumberHeader = "week_number_header", e.YearsDropdown = "years_dropdown";
  })(y || (y = {}));
  var j;
  (function(e) {
    e.disabled = "disabled", e.hidden = "hidden", e.outside = "outside", e.focused = "focused", e.today = "today";
  })(j || (j = {}));
  var U;
  (function(e) {
    e.range_end = "range_end", e.range_middle = "range_middle", e.range_start = "range_start", e.selected = "selected";
  })(U || (U = {}));
  var L;
  (function(e) {
    e.weeks_before_enter = "weeks_before_enter", e.weeks_before_exit = "weeks_before_exit", e.weeks_after_enter = "weeks_after_enter", e.weeks_after_exit = "weeks_after_exit", e.caption_after_enter = "caption_after_enter", e.caption_after_exit = "caption_after_exit", e.caption_before_enter = "caption_before_enter", e.caption_before_exit = "caption_before_exit";
  })(L || (L = {}));
  const Nt = 6048e5, _n = 864e5, wt = Symbol.for("constructDateFrom");
  function R(e, t) {
    return typeof e == "function" ? e(t) : e && typeof e == "object" && wt in e ? e[wt](t) : e instanceof Date ? new e.constructor(t) : new Date(t);
  }
  function Y(e, t) {
    return R(t || e, e);
  }
  function Tt(e, t, n) {
    const r = Y(e, n == null ? void 0 : n.in);
    return isNaN(t) ? R(e, NaN) : (t && r.setDate(r.getDate() + t), r);
  }
  function Yt(e, t, n) {
    const r = Y(e, n == null ? void 0 : n.in);
    if (isNaN(t)) return R(e, NaN);
    if (!t) return r;
    const o = r.getDate(), s = R(e, r.getTime());
    s.setMonth(r.getMonth() + t + 1, 0);
    const i = s.getDate();
    return o >= i ? s : (r.setFullYear(s.getFullYear(), s.getMonth(), o), r);
  }
  let jn = {};
  function Me() {
    return jn;
  }
  function ye(e, t) {
    var _a2, _b2, _c2, _d2;
    const n = Me(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((_b2 = (_a2 = t == null ? void 0 : t.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b2.weekStartsOn) ?? n.weekStartsOn ?? ((_d2 = (_c2 = n.locale) == null ? void 0 : _c2.options) == null ? void 0 : _d2.weekStartsOn) ?? 0, o = Y(e, t == null ? void 0 : t.in), s = o.getDay(), i = (s < r ? 7 : 0) + s - r;
    return o.setDate(o.getDate() - i), o.setHours(0, 0, 0, 0), o;
  }
  function ke(e, t) {
    return ye(e, {
      ...t,
      weekStartsOn: 1
    });
  }
  function Et(e, t) {
    const n = Y(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = R(n, 0);
    o.setFullYear(r + 1, 0, 4), o.setHours(0, 0, 0, 0);
    const s = ke(o), i = R(n, 0);
    i.setFullYear(r, 0, 4), i.setHours(0, 0, 0, 0);
    const a = ke(i);
    return n.getTime() >= s.getTime() ? r + 1 : n.getTime() >= a.getTime() ? r : r - 1;
  }
  function bt(e) {
    const t = Y(e), n = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
    return n.setUTCFullYear(t.getFullYear()), +e - +n;
  }
  function ge(e, ...t) {
    const n = R.bind(null, t.find((r) => typeof r == "object"));
    return t.map(n);
  }
  function Se(e, t) {
    const n = Y(e, t == null ? void 0 : t.in);
    return n.setHours(0, 0, 0, 0), n;
  }
  function Ft(e, t, n) {
    const [r, o] = ge(n == null ? void 0 : n.in, e, t), s = Se(r), i = Se(o), a = +s - bt(s), c = +i - bt(i);
    return Math.round((a - c) / _n);
  }
  function Bn(e, t) {
    const n = Et(e, t), r = R(e, 0);
    return r.setFullYear(n, 0, 4), r.setHours(0, 0, 0, 0), ke(r);
  }
  function Rn(e, t, n) {
    return Tt(e, t * 7, n);
  }
  function Hn(e, t, n) {
    return Yt(e, t * 12, n);
  }
  function In(e, t) {
    let n, r = t == null ? void 0 : t.in;
    return e.forEach((o) => {
      !r && typeof o == "object" && (r = R.bind(null, o));
      const s = Y(o, r);
      (!n || n < s || isNaN(+s)) && (n = s);
    }), R(r, n || NaN);
  }
  function An(e, t) {
    let n, r = t == null ? void 0 : t.in;
    return e.forEach((o) => {
      !r && typeof o == "object" && (r = R.bind(null, o));
      const s = Y(o, r);
      (!n || n > s || isNaN(+s)) && (n = s);
    }), R(r, n || NaN);
  }
  function zn(e, t, n) {
    const [r, o] = ge(n == null ? void 0 : n.in, e, t);
    return +Se(r) == +Se(o);
  }
  function Pt(e) {
    return e instanceof Date || typeof e == "object" && Object.prototype.toString.call(e) === "[object Date]";
  }
  function qn(e) {
    return !(!Pt(e) && typeof e != "number" || isNaN(+Y(e)));
  }
  function Ln(e, t, n) {
    const [r, o] = ge(n == null ? void 0 : n.in, e, t), s = r.getFullYear() - o.getFullYear(), i = r.getMonth() - o.getMonth();
    return s * 12 + i;
  }
  function $n(e, t) {
    const n = Y(e, t == null ? void 0 : t.in), r = n.getMonth();
    return n.setFullYear(n.getFullYear(), r + 1, 0), n.setHours(23, 59, 59, 999), n;
  }
  function Gn(e, t) {
    const [n, r] = ge(e, t.start, t.end);
    return {
      start: n,
      end: r
    };
  }
  function Zn(e, t) {
    const { start: n, end: r } = Gn(t == null ? void 0 : t.in, e);
    let o = +n > +r;
    const s = o ? +n : +r, i = o ? r : n;
    i.setHours(0, 0, 0, 0), i.setDate(1);
    let a = 1;
    const c = [];
    for (; +i <= s; ) c.push(R(n, i)), i.setMonth(i.getMonth() + a);
    return o ? c.reverse() : c;
  }
  function Vn(e, t) {
    const n = Y(e, t == null ? void 0 : t.in);
    return n.setDate(1), n.setHours(0, 0, 0, 0), n;
  }
  function Qn(e, t) {
    const n = Y(e, t == null ? void 0 : t.in), r = n.getFullYear();
    return n.setFullYear(r + 1, 0, 0), n.setHours(23, 59, 59, 999), n;
  }
  function _t(e, t) {
    const n = Y(e, t == null ? void 0 : t.in);
    return n.setFullYear(n.getFullYear(), 0, 1), n.setHours(0, 0, 0, 0), n;
  }
  function jt(e, t) {
    var _a2, _b2, _c2, _d2;
    const n = Me(), r = (t == null ? void 0 : t.weekStartsOn) ?? ((_b2 = (_a2 = t == null ? void 0 : t.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b2.weekStartsOn) ?? n.weekStartsOn ?? ((_d2 = (_c2 = n.locale) == null ? void 0 : _c2.options) == null ? void 0 : _d2.weekStartsOn) ?? 0, o = Y(e, t == null ? void 0 : t.in), s = o.getDay(), i = (s < r ? -7 : 0) + 6 - (s - r);
    return o.setDate(o.getDate() + i), o.setHours(23, 59, 59, 999), o;
  }
  function Xn(e, t) {
    return jt(e, {
      ...t,
      weekStartsOn: 1
    });
  }
  const Un = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  }, Jn = (e, t, n) => {
    let r;
    const o = Un[e];
    return typeof o == "string" ? r = o : t === 1 ? r = o.one : r = o.other.replace("{{count}}", t.toString()), (n == null ? void 0 : n.addSuffix) ? n.comparison && n.comparison > 0 ? "in " + r : r + " ago" : r;
  };
  function nt(e) {
    return (t = {}) => {
      const n = t.width ? String(t.width) : e.defaultWidth;
      return e.formats[n] || e.formats[e.defaultWidth];
    };
  }
  const Kn = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  }, er = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  }, tr = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  }, nr = {
    date: nt({
      formats: Kn,
      defaultWidth: "full"
    }),
    time: nt({
      formats: er,
      defaultWidth: "full"
    }),
    dateTime: nt({
      formats: tr,
      defaultWidth: "full"
    })
  }, rr = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  }, or = (e, t, n, r) => rr[e];
  function pe(e) {
    return (t, n) => {
      const r = (n == null ? void 0 : n.context) ? String(n.context) : "standalone";
      let o;
      if (r === "formatting" && e.formattingValues) {
        const i = e.defaultFormattingWidth || e.defaultWidth, a = (n == null ? void 0 : n.width) ? String(n.width) : i;
        o = e.formattingValues[a] || e.formattingValues[i];
      } else {
        const i = e.defaultWidth, a = (n == null ? void 0 : n.width) ? String(n.width) : e.defaultWidth;
        o = e.values[a] || e.values[i];
      }
      const s = e.argumentCallback ? e.argumentCallback(t) : t;
      return o[s];
    };
  }
  const sr = {
    narrow: [
      "B",
      "A"
    ],
    abbreviated: [
      "BC",
      "AD"
    ],
    wide: [
      "Before Christ",
      "Anno Domini"
    ]
  }, ar = {
    narrow: [
      "1",
      "2",
      "3",
      "4"
    ],
    abbreviated: [
      "Q1",
      "Q2",
      "Q3",
      "Q4"
    ],
    wide: [
      "1st quarter",
      "2nd quarter",
      "3rd quarter",
      "4th quarter"
    ]
  }, ir = {
    narrow: [
      "J",
      "F",
      "M",
      "A",
      "M",
      "J",
      "J",
      "A",
      "S",
      "O",
      "N",
      "D"
    ],
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  }, cr = {
    narrow: [
      "S",
      "M",
      "T",
      "W",
      "T",
      "F",
      "S"
    ],
    short: [
      "Su",
      "Mo",
      "Tu",
      "We",
      "Th",
      "Fr",
      "Sa"
    ],
    abbreviated: [
      "Sun",
      "Mon",
      "Tue",
      "Wed",
      "Thu",
      "Fri",
      "Sat"
    ],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  }, dr = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  }, lr = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  }, ur = (e, t) => {
    const n = Number(e), r = n % 100;
    if (r > 20 || r < 10) switch (r % 10) {
      case 1:
        return n + "st";
      case 2:
        return n + "nd";
      case 3:
        return n + "rd";
    }
    return n + "th";
  }, fr = {
    ordinalNumber: ur,
    era: pe({
      values: sr,
      defaultWidth: "wide"
    }),
    quarter: pe({
      values: ar,
      defaultWidth: "wide",
      argumentCallback: (e) => e - 1
    }),
    month: pe({
      values: ir,
      defaultWidth: "wide"
    }),
    day: pe({
      values: cr,
      defaultWidth: "wide"
    }),
    dayPeriod: pe({
      values: dr,
      defaultWidth: "wide",
      formattingValues: lr,
      defaultFormattingWidth: "wide"
    })
  };
  function we(e) {
    return (t, n = {}) => {
      const r = n.width, o = r && e.matchPatterns[r] || e.matchPatterns[e.defaultMatchWidth], s = t.match(o);
      if (!s) return null;
      const i = s[0], a = r && e.parsePatterns[r] || e.parsePatterns[e.defaultParseWidth], c = Array.isArray(a) ? mr(a, (d) => d.test(i)) : hr(a, (d) => d.test(i));
      let u;
      u = e.valueCallback ? e.valueCallback(c) : c, u = n.valueCallback ? n.valueCallback(u) : u;
      const f = t.slice(i.length);
      return {
        value: u,
        rest: f
      };
    };
  }
  function hr(e, t) {
    for (const n in e) if (Object.prototype.hasOwnProperty.call(e, n) && t(e[n])) return n;
  }
  function mr(e, t) {
    for (let n = 0; n < e.length; n++) if (t(e[n])) return n;
  }
  function yr(e) {
    return (t, n = {}) => {
      const r = t.match(e.matchPattern);
      if (!r) return null;
      const o = r[0], s = t.match(e.parsePattern);
      if (!s) return null;
      let i = e.valueCallback ? e.valueCallback(s[0]) : s[0];
      i = n.valueCallback ? n.valueCallback(i) : i;
      const a = t.slice(o.length);
      return {
        value: i,
        rest: a
      };
    };
  }
  const gr = /^(\d+)(th|st|nd|rd)?/i, pr = /\d+/i, wr = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  }, br = {
    any: [
      /^b/i,
      /^(a|c)/i
    ]
  }, Dr = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  }, kr = {
    any: [
      /1/i,
      /2/i,
      /3/i,
      /4/i
    ]
  }, Sr = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  }, Mr = {
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ]
  }, vr = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  }, xr = {
    narrow: [
      /^s/i,
      /^m/i,
      /^t/i,
      /^w/i,
      /^t/i,
      /^f/i,
      /^s/i
    ],
    any: [
      /^su/i,
      /^m/i,
      /^tu/i,
      /^w/i,
      /^th/i,
      /^f/i,
      /^sa/i
    ]
  }, Cr = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  }, Or = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  }, Wr = {
    ordinalNumber: yr({
      matchPattern: gr,
      parsePattern: pr,
      valueCallback: (e) => parseInt(e, 10)
    }),
    era: we({
      matchPatterns: wr,
      defaultMatchWidth: "wide",
      parsePatterns: br,
      defaultParseWidth: "any"
    }),
    quarter: we({
      matchPatterns: Dr,
      defaultMatchWidth: "wide",
      parsePatterns: kr,
      defaultParseWidth: "any",
      valueCallback: (e) => e + 1
    }),
    month: we({
      matchPatterns: Sr,
      defaultMatchWidth: "wide",
      parsePatterns: Mr,
      defaultParseWidth: "any"
    }),
    day: we({
      matchPatterns: vr,
      defaultMatchWidth: "wide",
      parsePatterns: xr,
      defaultParseWidth: "any"
    }),
    dayPeriod: we({
      matchPatterns: Cr,
      defaultMatchWidth: "any",
      parsePatterns: Or,
      defaultParseWidth: "any"
    })
  }, it = {
    code: "en-US",
    formatDistance: Jn,
    formatLong: nr,
    formatRelative: or,
    localize: fr,
    match: Wr,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  function Nr(e, t) {
    const n = Y(e, t == null ? void 0 : t.in);
    return Ft(n, _t(n)) + 1;
  }
  function Bt(e, t) {
    const n = Y(e, t == null ? void 0 : t.in), r = +ke(n) - +Bn(n);
    return Math.round(r / Nt) + 1;
  }
  function Rt(e, t) {
    var _a2, _b2, _c2, _d2;
    const n = Y(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = Me(), s = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((_b2 = (_a2 = t == null ? void 0 : t.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b2.firstWeekContainsDate) ?? o.firstWeekContainsDate ?? ((_d2 = (_c2 = o.locale) == null ? void 0 : _c2.options) == null ? void 0 : _d2.firstWeekContainsDate) ?? 1, i = R((t == null ? void 0 : t.in) || e, 0);
    i.setFullYear(r + 1, 0, s), i.setHours(0, 0, 0, 0);
    const a = ye(i, t), c = R((t == null ? void 0 : t.in) || e, 0);
    c.setFullYear(r, 0, s), c.setHours(0, 0, 0, 0);
    const u = ye(c, t);
    return +n >= +a ? r + 1 : +n >= +u ? r : r - 1;
  }
  function Tr(e, t) {
    var _a2, _b2, _c2, _d2;
    const n = Me(), r = (t == null ? void 0 : t.firstWeekContainsDate) ?? ((_b2 = (_a2 = t == null ? void 0 : t.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b2.firstWeekContainsDate) ?? n.firstWeekContainsDate ?? ((_d2 = (_c2 = n.locale) == null ? void 0 : _c2.options) == null ? void 0 : _d2.firstWeekContainsDate) ?? 1, o = Rt(e, t), s = R((t == null ? void 0 : t.in) || e, 0);
    return s.setFullYear(o, 0, r), s.setHours(0, 0, 0, 0), ye(s, t);
  }
  function Ht(e, t) {
    const n = Y(e, t == null ? void 0 : t.in), r = +ye(n, t) - +Tr(n, t);
    return Math.round(r / Nt) + 1;
  }
  function T(e, t) {
    const n = e < 0 ? "-" : "", r = Math.abs(e).toString().padStart(t, "0");
    return n + r;
  }
  const ie = {
    y(e, t) {
      const n = e.getFullYear(), r = n > 0 ? n : 1 - n;
      return T(t === "yy" ? r % 100 : r, t.length);
    },
    M(e, t) {
      const n = e.getMonth();
      return t === "M" ? String(n + 1) : T(n + 1, 2);
    },
    d(e, t) {
      return T(e.getDate(), t.length);
    },
    a(e, t) {
      const n = e.getHours() / 12 >= 1 ? "pm" : "am";
      switch (t) {
        case "a":
        case "aa":
          return n.toUpperCase();
        case "aaa":
          return n;
        case "aaaaa":
          return n[0];
        case "aaaa":
        default:
          return n === "am" ? "a.m." : "p.m.";
      }
    },
    h(e, t) {
      return T(e.getHours() % 12 || 12, t.length);
    },
    H(e, t) {
      return T(e.getHours(), t.length);
    },
    m(e, t) {
      return T(e.getMinutes(), t.length);
    },
    s(e, t) {
      return T(e.getSeconds(), t.length);
    },
    S(e, t) {
      const n = t.length, r = e.getMilliseconds(), o = Math.trunc(r * Math.pow(10, n - 3));
      return T(o, t.length);
    }
  }, he = {
    midnight: "midnight",
    noon: "noon",
    morning: "morning",
    afternoon: "afternoon",
    evening: "evening",
    night: "night"
  }, Dt = {
    G: function(e, t, n) {
      const r = e.getFullYear() > 0 ? 1 : 0;
      switch (t) {
        case "G":
        case "GG":
        case "GGG":
          return n.era(r, {
            width: "abbreviated"
          });
        case "GGGGG":
          return n.era(r, {
            width: "narrow"
          });
        case "GGGG":
        default:
          return n.era(r, {
            width: "wide"
          });
      }
    },
    y: function(e, t, n) {
      if (t === "yo") {
        const r = e.getFullYear(), o = r > 0 ? r : 1 - r;
        return n.ordinalNumber(o, {
          unit: "year"
        });
      }
      return ie.y(e, t);
    },
    Y: function(e, t, n, r) {
      const o = Rt(e, r), s = o > 0 ? o : 1 - o;
      if (t === "YY") {
        const i = s % 100;
        return T(i, 2);
      }
      return t === "Yo" ? n.ordinalNumber(s, {
        unit: "year"
      }) : T(s, t.length);
    },
    R: function(e, t) {
      const n = Et(e);
      return T(n, t.length);
    },
    u: function(e, t) {
      const n = e.getFullYear();
      return T(n, t.length);
    },
    Q: function(e, t, n) {
      const r = Math.ceil((e.getMonth() + 1) / 3);
      switch (t) {
        case "Q":
          return String(r);
        case "QQ":
          return T(r, 2);
        case "Qo":
          return n.ordinalNumber(r, {
            unit: "quarter"
          });
        case "QQQ":
          return n.quarter(r, {
            width: "abbreviated",
            context: "formatting"
          });
        case "QQQQQ":
          return n.quarter(r, {
            width: "narrow",
            context: "formatting"
          });
        case "QQQQ":
        default:
          return n.quarter(r, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    q: function(e, t, n) {
      const r = Math.ceil((e.getMonth() + 1) / 3);
      switch (t) {
        case "q":
          return String(r);
        case "qq":
          return T(r, 2);
        case "qo":
          return n.ordinalNumber(r, {
            unit: "quarter"
          });
        case "qqq":
          return n.quarter(r, {
            width: "abbreviated",
            context: "standalone"
          });
        case "qqqqq":
          return n.quarter(r, {
            width: "narrow",
            context: "standalone"
          });
        case "qqqq":
        default:
          return n.quarter(r, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    M: function(e, t, n) {
      const r = e.getMonth();
      switch (t) {
        case "M":
        case "MM":
          return ie.M(e, t);
        case "Mo":
          return n.ordinalNumber(r + 1, {
            unit: "month"
          });
        case "MMM":
          return n.month(r, {
            width: "abbreviated",
            context: "formatting"
          });
        case "MMMMM":
          return n.month(r, {
            width: "narrow",
            context: "formatting"
          });
        case "MMMM":
        default:
          return n.month(r, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    L: function(e, t, n) {
      const r = e.getMonth();
      switch (t) {
        case "L":
          return String(r + 1);
        case "LL":
          return T(r + 1, 2);
        case "Lo":
          return n.ordinalNumber(r + 1, {
            unit: "month"
          });
        case "LLL":
          return n.month(r, {
            width: "abbreviated",
            context: "standalone"
          });
        case "LLLLL":
          return n.month(r, {
            width: "narrow",
            context: "standalone"
          });
        case "LLLL":
        default:
          return n.month(r, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    w: function(e, t, n, r) {
      const o = Ht(e, r);
      return t === "wo" ? n.ordinalNumber(o, {
        unit: "week"
      }) : T(o, t.length);
    },
    I: function(e, t, n) {
      const r = Bt(e);
      return t === "Io" ? n.ordinalNumber(r, {
        unit: "week"
      }) : T(r, t.length);
    },
    d: function(e, t, n) {
      return t === "do" ? n.ordinalNumber(e.getDate(), {
        unit: "date"
      }) : ie.d(e, t);
    },
    D: function(e, t, n) {
      const r = Nr(e);
      return t === "Do" ? n.ordinalNumber(r, {
        unit: "dayOfYear"
      }) : T(r, t.length);
    },
    E: function(e, t, n) {
      const r = e.getDay();
      switch (t) {
        case "E":
        case "EE":
        case "EEE":
          return n.day(r, {
            width: "abbreviated",
            context: "formatting"
          });
        case "EEEEE":
          return n.day(r, {
            width: "narrow",
            context: "formatting"
          });
        case "EEEEEE":
          return n.day(r, {
            width: "short",
            context: "formatting"
          });
        case "EEEE":
        default:
          return n.day(r, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    e: function(e, t, n, r) {
      const o = e.getDay(), s = (o - r.weekStartsOn + 8) % 7 || 7;
      switch (t) {
        case "e":
          return String(s);
        case "ee":
          return T(s, 2);
        case "eo":
          return n.ordinalNumber(s, {
            unit: "day"
          });
        case "eee":
          return n.day(o, {
            width: "abbreviated",
            context: "formatting"
          });
        case "eeeee":
          return n.day(o, {
            width: "narrow",
            context: "formatting"
          });
        case "eeeeee":
          return n.day(o, {
            width: "short",
            context: "formatting"
          });
        case "eeee":
        default:
          return n.day(o, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    c: function(e, t, n, r) {
      const o = e.getDay(), s = (o - r.weekStartsOn + 8) % 7 || 7;
      switch (t) {
        case "c":
          return String(s);
        case "cc":
          return T(s, t.length);
        case "co":
          return n.ordinalNumber(s, {
            unit: "day"
          });
        case "ccc":
          return n.day(o, {
            width: "abbreviated",
            context: "standalone"
          });
        case "ccccc":
          return n.day(o, {
            width: "narrow",
            context: "standalone"
          });
        case "cccccc":
          return n.day(o, {
            width: "short",
            context: "standalone"
          });
        case "cccc":
        default:
          return n.day(o, {
            width: "wide",
            context: "standalone"
          });
      }
    },
    i: function(e, t, n) {
      const r = e.getDay(), o = r === 0 ? 7 : r;
      switch (t) {
        case "i":
          return String(o);
        case "ii":
          return T(o, t.length);
        case "io":
          return n.ordinalNumber(o, {
            unit: "day"
          });
        case "iii":
          return n.day(r, {
            width: "abbreviated",
            context: "formatting"
          });
        case "iiiii":
          return n.day(r, {
            width: "narrow",
            context: "formatting"
          });
        case "iiiiii":
          return n.day(r, {
            width: "short",
            context: "formatting"
          });
        case "iiii":
        default:
          return n.day(r, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    a: function(e, t, n) {
      const o = e.getHours() / 12 >= 1 ? "pm" : "am";
      switch (t) {
        case "a":
        case "aa":
          return n.dayPeriod(o, {
            width: "abbreviated",
            context: "formatting"
          });
        case "aaa":
          return n.dayPeriod(o, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "aaaaa":
          return n.dayPeriod(o, {
            width: "narrow",
            context: "formatting"
          });
        case "aaaa":
        default:
          return n.dayPeriod(o, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    b: function(e, t, n) {
      const r = e.getHours();
      let o;
      switch (r === 12 ? o = he.noon : r === 0 ? o = he.midnight : o = r / 12 >= 1 ? "pm" : "am", t) {
        case "b":
        case "bb":
          return n.dayPeriod(o, {
            width: "abbreviated",
            context: "formatting"
          });
        case "bbb":
          return n.dayPeriod(o, {
            width: "abbreviated",
            context: "formatting"
          }).toLowerCase();
        case "bbbbb":
          return n.dayPeriod(o, {
            width: "narrow",
            context: "formatting"
          });
        case "bbbb":
        default:
          return n.dayPeriod(o, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    B: function(e, t, n) {
      const r = e.getHours();
      let o;
      switch (r >= 17 ? o = he.evening : r >= 12 ? o = he.afternoon : r >= 4 ? o = he.morning : o = he.night, t) {
        case "B":
        case "BB":
        case "BBB":
          return n.dayPeriod(o, {
            width: "abbreviated",
            context: "formatting"
          });
        case "BBBBB":
          return n.dayPeriod(o, {
            width: "narrow",
            context: "formatting"
          });
        case "BBBB":
        default:
          return n.dayPeriod(o, {
            width: "wide",
            context: "formatting"
          });
      }
    },
    h: function(e, t, n) {
      if (t === "ho") {
        let r = e.getHours() % 12;
        return r === 0 && (r = 12), n.ordinalNumber(r, {
          unit: "hour"
        });
      }
      return ie.h(e, t);
    },
    H: function(e, t, n) {
      return t === "Ho" ? n.ordinalNumber(e.getHours(), {
        unit: "hour"
      }) : ie.H(e, t);
    },
    K: function(e, t, n) {
      const r = e.getHours() % 12;
      return t === "Ko" ? n.ordinalNumber(r, {
        unit: "hour"
      }) : T(r, t.length);
    },
    k: function(e, t, n) {
      let r = e.getHours();
      return r === 0 && (r = 24), t === "ko" ? n.ordinalNumber(r, {
        unit: "hour"
      }) : T(r, t.length);
    },
    m: function(e, t, n) {
      return t === "mo" ? n.ordinalNumber(e.getMinutes(), {
        unit: "minute"
      }) : ie.m(e, t);
    },
    s: function(e, t, n) {
      return t === "so" ? n.ordinalNumber(e.getSeconds(), {
        unit: "second"
      }) : ie.s(e, t);
    },
    S: function(e, t) {
      return ie.S(e, t);
    },
    X: function(e, t, n) {
      const r = e.getTimezoneOffset();
      if (r === 0) return "Z";
      switch (t) {
        case "X":
          return St(r);
        case "XXXX":
        case "XX":
          return ce(r);
        case "XXXXX":
        case "XXX":
        default:
          return ce(r, ":");
      }
    },
    x: function(e, t, n) {
      const r = e.getTimezoneOffset();
      switch (t) {
        case "x":
          return St(r);
        case "xxxx":
        case "xx":
          return ce(r);
        case "xxxxx":
        case "xxx":
        default:
          return ce(r, ":");
      }
    },
    O: function(e, t, n) {
      const r = e.getTimezoneOffset();
      switch (t) {
        case "O":
        case "OO":
        case "OOO":
          return "GMT" + kt(r, ":");
        case "OOOO":
        default:
          return "GMT" + ce(r, ":");
      }
    },
    z: function(e, t, n) {
      const r = e.getTimezoneOffset();
      switch (t) {
        case "z":
        case "zz":
        case "zzz":
          return "GMT" + kt(r, ":");
        case "zzzz":
        default:
          return "GMT" + ce(r, ":");
      }
    },
    t: function(e, t, n) {
      const r = Math.trunc(+e / 1e3);
      return T(r, t.length);
    },
    T: function(e, t, n) {
      return T(+e, t.length);
    }
  };
  function kt(e, t = "") {
    const n = e > 0 ? "-" : "+", r = Math.abs(e), o = Math.trunc(r / 60), s = r % 60;
    return s === 0 ? n + String(o) : n + String(o) + t + T(s, 2);
  }
  function St(e, t) {
    return e % 60 === 0 ? (e > 0 ? "-" : "+") + T(Math.abs(e) / 60, 2) : ce(e, t);
  }
  function ce(e, t = "") {
    const n = e > 0 ? "-" : "+", r = Math.abs(e), o = T(Math.trunc(r / 60), 2), s = T(r % 60, 2);
    return n + o + t + s;
  }
  const Mt = (e, t) => {
    switch (e) {
      case "P":
        return t.date({
          width: "short"
        });
      case "PP":
        return t.date({
          width: "medium"
        });
      case "PPP":
        return t.date({
          width: "long"
        });
      case "PPPP":
      default:
        return t.date({
          width: "full"
        });
    }
  }, It = (e, t) => {
    switch (e) {
      case "p":
        return t.time({
          width: "short"
        });
      case "pp":
        return t.time({
          width: "medium"
        });
      case "ppp":
        return t.time({
          width: "long"
        });
      case "pppp":
      default:
        return t.time({
          width: "full"
        });
    }
  }, Yr = (e, t) => {
    const n = e.match(/(P+)(p+)?/) || [], r = n[1], o = n[2];
    if (!o) return Mt(e, t);
    let s;
    switch (r) {
      case "P":
        s = t.dateTime({
          width: "short"
        });
        break;
      case "PP":
        s = t.dateTime({
          width: "medium"
        });
        break;
      case "PPP":
        s = t.dateTime({
          width: "long"
        });
        break;
      case "PPPP":
      default:
        s = t.dateTime({
          width: "full"
        });
        break;
    }
    return s.replace("{{date}}", Mt(r, t)).replace("{{time}}", It(o, t));
  }, Er = {
    p: It,
    P: Yr
  }, Fr = /^D+$/, Pr = /^Y+$/, _r = [
    "D",
    "DD",
    "YY",
    "YYYY"
  ];
  function jr(e) {
    return Fr.test(e);
  }
  function Br(e) {
    return Pr.test(e);
  }
  function Rr(e, t, n) {
    const r = Hr(e, t, n);
    if (console.warn(r), _r.includes(e)) throw new RangeError(r);
  }
  function Hr(e, t, n) {
    const r = e[0] === "Y" ? "years" : "days of the month";
    return `Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`;
  }
  const Ir = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g, Ar = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g, zr = /^'([^]*?)'?$/, qr = /''/g, Lr = /[a-zA-Z]/;
  function $r(e, t, n) {
    var _a2, _b2, _c2, _d2, _e3, _f2, _g2, _h2;
    const r = Me(), o = (n == null ? void 0 : n.locale) ?? r.locale ?? it, s = (n == null ? void 0 : n.firstWeekContainsDate) ?? ((_b2 = (_a2 = n == null ? void 0 : n.locale) == null ? void 0 : _a2.options) == null ? void 0 : _b2.firstWeekContainsDate) ?? r.firstWeekContainsDate ?? ((_d2 = (_c2 = r.locale) == null ? void 0 : _c2.options) == null ? void 0 : _d2.firstWeekContainsDate) ?? 1, i = (n == null ? void 0 : n.weekStartsOn) ?? ((_f2 = (_e3 = n == null ? void 0 : n.locale) == null ? void 0 : _e3.options) == null ? void 0 : _f2.weekStartsOn) ?? r.weekStartsOn ?? ((_h2 = (_g2 = r.locale) == null ? void 0 : _g2.options) == null ? void 0 : _h2.weekStartsOn) ?? 0, a = Y(e, n == null ? void 0 : n.in);
    if (!qn(a)) throw new RangeError("Invalid time value");
    let c = t.match(Ar).map((f) => {
      const d = f[0];
      if (d === "p" || d === "P") {
        const m = Er[d];
        return m(f, o.formatLong);
      }
      return f;
    }).join("").match(Ir).map((f) => {
      if (f === "''") return {
        isToken: false,
        value: "'"
      };
      const d = f[0];
      if (d === "'") return {
        isToken: false,
        value: Gr(f)
      };
      if (Dt[d]) return {
        isToken: true,
        value: f
      };
      if (d.match(Lr)) throw new RangeError("Format string contains an unescaped latin alphabet character `" + d + "`");
      return {
        isToken: false,
        value: f
      };
    });
    o.localize.preprocessor && (c = o.localize.preprocessor(a, c));
    const u = {
      firstWeekContainsDate: s,
      weekStartsOn: i,
      locale: o
    };
    return c.map((f) => {
      if (!f.isToken) return f.value;
      const d = f.value;
      (!(n == null ? void 0 : n.useAdditionalWeekYearTokens) && Br(d) || !(n == null ? void 0 : n.useAdditionalDayOfYearTokens) && jr(d)) && Rr(d, t, String(e));
      const m = Dt[d[0]];
      return m(a, d, o.localize, u);
    }).join("");
  }
  function Gr(e) {
    const t = e.match(zr);
    return t ? t[1].replace(qr, "'") : e;
  }
  function Zr(e, t) {
    const n = Y(e, t == null ? void 0 : t.in), r = n.getFullYear(), o = n.getMonth(), s = R(n, 0);
    return s.setFullYear(r, o + 1, 0), s.setHours(0, 0, 0, 0), s.getDate();
  }
  function Vr(e, t) {
    return Y(e, t == null ? void 0 : t.in).getMonth();
  }
  function Qr(e, t) {
    return Y(e, t == null ? void 0 : t.in).getFullYear();
  }
  function Xr(e, t) {
    return +Y(e) > +Y(t);
  }
  function Ur(e, t) {
    return +Y(e) < +Y(t);
  }
  function Jr(e, t, n) {
    const [r, o] = ge(n == null ? void 0 : n.in, e, t);
    return r.getFullYear() === o.getFullYear() && r.getMonth() === o.getMonth();
  }
  function Kr(e, t, n) {
    const [r, o] = ge(n == null ? void 0 : n.in, e, t);
    return r.getFullYear() === o.getFullYear();
  }
  function eo(e, t, n) {
    const r = Y(e, n == null ? void 0 : n.in), o = r.getFullYear(), s = r.getDate(), i = R(e, 0);
    i.setFullYear(o, t, 15), i.setHours(0, 0, 0, 0);
    const a = Zr(i);
    return r.setMonth(t, Math.min(s, a)), r;
  }
  function to(e, t, n) {
    const r = Y(e, n == null ? void 0 : n.in);
    return isNaN(+r) ? R(e, NaN) : (r.setFullYear(t), r);
  }
  const vt = 5, no = 4;
  function ro(e, t) {
    const n = t.startOfMonth(e), r = n.getDay() > 0 ? n.getDay() : 7, o = t.addDays(e, -r + 1), s = t.addDays(o, vt * 7 - 1);
    return t.getMonth(e) === t.getMonth(s) ? vt : no;
  }
  function At(e, t) {
    const n = t.startOfMonth(e), r = n.getDay();
    return r === 1 ? n : r === 0 ? t.addDays(n, -6) : t.addDays(n, -1 * (r - 1));
  }
  function oo(e, t) {
    const n = At(e, t), r = ro(e, t);
    return t.addDays(n, r * 7 - 1);
  }
  class se {
    constructor(t, n) {
      this.Date = Date, this.today = () => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.today) ? this.overrides.today() : this.options.timeZone ? A.tz(this.options.timeZone) : new this.Date();
      }, this.newDate = (r, o, s) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.newDate) ? this.overrides.newDate(r, o, s) : this.options.timeZone ? new A(r, o, s, this.options.timeZone) : new Date(r, o, s);
      }, this.addDays = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.addDays) ? this.overrides.addDays(r, o) : Tt(r, o);
      }, this.addMonths = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.addMonths) ? this.overrides.addMonths(r, o) : Yt(r, o);
      }, this.addWeeks = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.addWeeks) ? this.overrides.addWeeks(r, o) : Rn(r, o);
      }, this.addYears = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.addYears) ? this.overrides.addYears(r, o) : Hn(r, o);
      }, this.differenceInCalendarDays = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.differenceInCalendarDays) ? this.overrides.differenceInCalendarDays(r, o) : Ft(r, o);
      }, this.differenceInCalendarMonths = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.differenceInCalendarMonths) ? this.overrides.differenceInCalendarMonths(r, o) : Ln(r, o);
      }, this.eachMonthOfInterval = (r) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.eachMonthOfInterval) ? this.overrides.eachMonthOfInterval(r) : Zn(r);
      }, this.endOfBroadcastWeek = (r) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.endOfBroadcastWeek) ? this.overrides.endOfBroadcastWeek(r) : oo(r, this);
      }, this.endOfISOWeek = (r) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.endOfISOWeek) ? this.overrides.endOfISOWeek(r) : Xn(r);
      }, this.endOfMonth = (r) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.endOfMonth) ? this.overrides.endOfMonth(r) : $n(r);
      }, this.endOfWeek = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.endOfWeek) ? this.overrides.endOfWeek(r, o) : jt(r, this.options);
      }, this.endOfYear = (r) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.endOfYear) ? this.overrides.endOfYear(r) : Qn(r);
      }, this.format = (r, o, s) => {
        var _a2;
        const i = ((_a2 = this.overrides) == null ? void 0 : _a2.format) ? this.overrides.format(r, o, this.options) : $r(r, o, this.options);
        return this.options.numerals && this.options.numerals !== "latn" ? this.replaceDigits(i) : i;
      }, this.getISOWeek = (r) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.getISOWeek) ? this.overrides.getISOWeek(r) : Bt(r);
      }, this.getMonth = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.getMonth) ? this.overrides.getMonth(r, this.options) : Vr(r, this.options);
      }, this.getYear = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.getYear) ? this.overrides.getYear(r, this.options) : Qr(r, this.options);
      }, this.getWeek = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.getWeek) ? this.overrides.getWeek(r, this.options) : Ht(r, this.options);
      }, this.isAfter = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.isAfter) ? this.overrides.isAfter(r, o) : Xr(r, o);
      }, this.isBefore = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.isBefore) ? this.overrides.isBefore(r, o) : Ur(r, o);
      }, this.isDate = (r) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.isDate) ? this.overrides.isDate(r) : Pt(r);
      }, this.isSameDay = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.isSameDay) ? this.overrides.isSameDay(r, o) : zn(r, o);
      }, this.isSameMonth = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.isSameMonth) ? this.overrides.isSameMonth(r, o) : Jr(r, o);
      }, this.isSameYear = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.isSameYear) ? this.overrides.isSameYear(r, o) : Kr(r, o);
      }, this.max = (r) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.max) ? this.overrides.max(r) : In(r);
      }, this.min = (r) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.min) ? this.overrides.min(r) : An(r);
      }, this.setMonth = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.setMonth) ? this.overrides.setMonth(r, o) : eo(r, o);
      }, this.setYear = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.setYear) ? this.overrides.setYear(r, o) : to(r, o);
      }, this.startOfBroadcastWeek = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.startOfBroadcastWeek) ? this.overrides.startOfBroadcastWeek(r, this) : At(r, this);
      }, this.startOfDay = (r) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.startOfDay) ? this.overrides.startOfDay(r) : Se(r);
      }, this.startOfISOWeek = (r) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.startOfISOWeek) ? this.overrides.startOfISOWeek(r) : ke(r);
      }, this.startOfMonth = (r) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.startOfMonth) ? this.overrides.startOfMonth(r) : Vn(r);
      }, this.startOfWeek = (r, o) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.startOfWeek) ? this.overrides.startOfWeek(r, this.options) : ye(r, this.options);
      }, this.startOfYear = (r) => {
        var _a2;
        return ((_a2 = this.overrides) == null ? void 0 : _a2.startOfYear) ? this.overrides.startOfYear(r) : _t(r);
      }, this.options = {
        locale: it,
        ...t
      }, this.overrides = n;
    }
    getDigitMap() {
      const { numerals: t = "latn" } = this.options, n = new Intl.NumberFormat("en-US", {
        numberingSystem: t
      }), r = {};
      for (let o = 0; o < 10; o++) r[o.toString()] = n.format(o);
      return r;
    }
    replaceDigits(t) {
      const n = this.getDigitMap();
      return t.replace(/\d/g, (r) => n[r] || r);
    }
    formatNumber(t) {
      return this.replaceDigits(t.toString());
    }
  }
  const te = new se();
  class zt {
    constructor(t, n, r = te) {
      this.date = t, this.displayMonth = n, this.outside = !!(n && !r.isSameMonth(t, n)), this.dateLib = r;
    }
    isEqualTo(t) {
      return this.dateLib.isSameDay(t.date, this.date) && this.dateLib.isSameMonth(t.displayMonth, this.displayMonth);
    }
  }
  class so {
    constructor(t, n) {
      this.date = t, this.weeks = n;
    }
  }
  class ao {
    constructor(t, n) {
      this.days = n, this.weekNumber = t;
    }
  }
  function re(e, t, n = false, r = te) {
    let { from: o, to: s } = e;
    const { differenceInCalendarDays: i, isSameDay: a } = r;
    return o && s ? (i(s, o) < 0 && ([o, s] = [
      s,
      o
    ]), i(t, o) >= (n ? 1 : 0) && i(s, t) >= (n ? 1 : 0)) : !n && s ? a(s, t) : !n && o ? a(o, t) : false;
  }
  function qt(e) {
    return !!(e && typeof e == "object" && "before" in e && "after" in e);
  }
  function ct(e) {
    return !!(e && typeof e == "object" && "from" in e);
  }
  function Lt(e) {
    return !!(e && typeof e == "object" && "after" in e);
  }
  function $t(e) {
    return !!(e && typeof e == "object" && "before" in e);
  }
  function Gt(e) {
    return !!(e && typeof e == "object" && "dayOfWeek" in e);
  }
  function Zt(e, t) {
    return Array.isArray(e) && e.every(t.isDate);
  }
  function oe(e, t, n = te) {
    const r = Array.isArray(t) ? t : [
      t
    ], { isSameDay: o, differenceInCalendarDays: s, isAfter: i } = n;
    return r.some((a) => {
      if (typeof a == "boolean") return a;
      if (n.isDate(a)) return o(e, a);
      if (Zt(a, n)) return a.includes(e);
      if (ct(a)) return re(a, e, false, n);
      if (Gt(a)) return Array.isArray(a.dayOfWeek) ? a.dayOfWeek.includes(e.getDay()) : a.dayOfWeek === e.getDay();
      if (qt(a)) {
        const c = s(a.before, e), u = s(a.after, e), f = c > 0, d = u < 0;
        return i(a.before, a.after) ? d && f : f || d;
      }
      return Lt(a) ? s(e, a.after) > 0 : $t(a) ? s(a.before, e) > 0 : typeof a == "function" ? a(e) : false;
    });
  }
  function io(e, t, n, r, o) {
    const { disabled: s, hidden: i, modifiers: a, showOutsideDays: c, broadcastCalendar: u, today: f } = t, { isSameDay: d, isSameMonth: m, startOfMonth: p, isBefore: w, endOfMonth: C, isAfter: M } = o, x = n && p(n), E = r && C(r), S = {
      [j.focused]: [],
      [j.outside]: [],
      [j.disabled]: [],
      [j.hidden]: [],
      [j.today]: []
    }, _ = {};
    for (const g of e) {
      const { date: k, displayMonth: D } = g, O = !!(D && !m(k, D)), H = !!(x && w(k, x)), z = !!(E && M(k, E)), q = !!(s && oe(k, s, o)), G = !!(i && oe(k, i, o)) || H || z || !u && !c && O || u && c === false && O, de = d(k, f ?? o.today());
      O && S.outside.push(g), q && S.disabled.push(g), G && S.hidden.push(g), de && S.today.push(g), a && Object.keys(a).forEach((le) => {
        const ue = a == null ? void 0 : a[le];
        ue && oe(k, ue, o) && (_[le] ? _[le].push(g) : _[le] = [
          g
        ]);
      });
    }
    return (g) => {
      const k = {
        [j.focused]: false,
        [j.disabled]: false,
        [j.hidden]: false,
        [j.outside]: false,
        [j.today]: false
      }, D = {};
      for (const O in S) {
        const H = S[O];
        k[O] = H.some((z) => z === g);
      }
      for (const O in _) D[O] = _[O].some((H) => H === g);
      return {
        ...k,
        ...D
      };
    };
  }
  function co(e, t, n = {}) {
    return Object.entries(e).filter(([, o]) => o === true).reduce((o, [s]) => (n[s] ? o.push(n[s]) : t[j[s]] ? o.push(t[j[s]]) : t[U[s]] && o.push(t[U[s]]), o), [
      t[y.Day]
    ]);
  }
  function lo(e) {
    return h.createElement("button", {
      ...e
    });
  }
  function uo(e) {
    return h.createElement("span", {
      ...e
    });
  }
  function fo(e) {
    const { size: t = 24, orientation: n = "left", className: r } = e;
    return h.createElement("svg", {
      className: r,
      width: t,
      height: t,
      viewBox: "0 0 24 24"
    }, n === "up" && h.createElement("polygon", {
      points: "6.77 17 12.5 11.43 18.24 17 20 15.28 12.5 8 5 15.28"
    }), n === "down" && h.createElement("polygon", {
      points: "6.77 8 12.5 13.57 18.24 8 20 9.72 12.5 17 5 9.72"
    }), n === "left" && h.createElement("polygon", {
      points: "16 18.112 9.81111111 12 16 5.87733333 14.0888889 4 6 12 14.0888889 20"
    }), n === "right" && h.createElement("polygon", {
      points: "8 18.112 14.18888889 12 8 5.87733333 9.91111111 4 18 12 9.91111111 20"
    }));
  }
  function ho(e) {
    const { day: t, modifiers: n, ...r } = e;
    return h.createElement("td", {
      ...r
    });
  }
  function mo(e) {
    const { day: t, modifiers: n, ...r } = e, o = h.useRef(null);
    return h.useEffect(() => {
      var _a2;
      n.focused && ((_a2 = o.current) == null ? void 0 : _a2.focus());
    }, [
      n.focused
    ]), h.createElement("button", {
      ref: o,
      ...r
    });
  }
  function yo(e) {
    const { options: t, className: n, components: r, classNames: o, ...s } = e, i = [
      o[y.Dropdown],
      n
    ].join(" "), a = t == null ? void 0 : t.find(({ value: c }) => c === s.value);
    return h.createElement("span", {
      "data-disabled": s.disabled,
      className: o[y.DropdownRoot]
    }, h.createElement(r.Select, {
      className: i,
      ...s
    }, t == null ? void 0 : t.map(({ value: c, label: u, disabled: f }) => h.createElement(r.Option, {
      key: c,
      value: c,
      disabled: f
    }, u))), h.createElement("span", {
      className: o[y.CaptionLabel],
      "aria-hidden": true
    }, a == null ? void 0 : a.label, h.createElement(r.Chevron, {
      orientation: "down",
      size: 18,
      className: o[y.Chevron]
    })));
  }
  function go(e) {
    return h.createElement("div", {
      ...e
    });
  }
  function po(e) {
    return h.createElement("div", {
      ...e
    });
  }
  function wo(e) {
    const { calendarMonth: t, displayIndex: n, ...r } = e;
    return h.createElement("div", {
      ...r
    }, e.children);
  }
  function bo(e) {
    const { calendarMonth: t, displayIndex: n, ...r } = e;
    return h.createElement("div", {
      ...r
    });
  }
  function Do(e) {
    return h.createElement("table", {
      ...e
    });
  }
  function ko(e) {
    return h.createElement("div", {
      ...e
    });
  }
  const Vt = b.createContext(void 0);
  function ve() {
    const e = b.useContext(Vt);
    if (e === void 0) throw new Error("useDayPicker() must be used within a custom component.");
    return e;
  }
  function So(e) {
    const { components: t } = ve();
    return h.createElement(t.Dropdown, {
      ...e
    });
  }
  function Mo(e) {
    const { onPreviousClick: t, onNextClick: n, previousMonth: r, nextMonth: o, ...s } = e, { components: i, classNames: a, labels: { labelPrevious: c, labelNext: u } } = ve(), f = b.useCallback((m) => {
      o && (n == null ? void 0 : n(m));
    }, [
      o,
      n
    ]), d = b.useCallback((m) => {
      r && (t == null ? void 0 : t(m));
    }, [
      r,
      t
    ]);
    return h.createElement("nav", {
      ...s
    }, h.createElement(i.PreviousMonthButton, {
      type: "button",
      className: a[y.PreviousMonthButton],
      tabIndex: r ? void 0 : -1,
      "aria-disabled": r ? void 0 : true,
      "aria-label": c(r),
      onClick: d
    }, h.createElement(i.Chevron, {
      disabled: r ? void 0 : true,
      className: a[y.Chevron],
      orientation: "left"
    })), h.createElement(i.NextMonthButton, {
      type: "button",
      className: a[y.NextMonthButton],
      tabIndex: o ? void 0 : -1,
      "aria-disabled": o ? void 0 : true,
      "aria-label": u(o),
      onClick: f
    }, h.createElement(i.Chevron, {
      disabled: o ? void 0 : true,
      orientation: "right",
      className: a[y.Chevron]
    })));
  }
  function vo(e) {
    const { components: t } = ve();
    return h.createElement(t.Button, {
      ...e
    });
  }
  function xo(e) {
    return h.createElement("option", {
      ...e
    });
  }
  function Co(e) {
    const { components: t } = ve();
    return h.createElement(t.Button, {
      ...e
    });
  }
  function Oo(e) {
    const { rootRef: t, ...n } = e;
    return h.createElement("div", {
      ...n,
      ref: t
    });
  }
  function Wo(e) {
    return h.createElement("select", {
      ...e
    });
  }
  function No(e) {
    const { week: t, ...n } = e;
    return h.createElement("tr", {
      ...n
    });
  }
  function To(e) {
    return h.createElement("th", {
      ...e
    });
  }
  function Yo(e) {
    return h.createElement("thead", {
      "aria-hidden": true
    }, h.createElement("tr", {
      ...e
    }));
  }
  function Eo(e) {
    const { week: t, ...n } = e;
    return h.createElement("th", {
      ...n
    });
  }
  function Fo(e) {
    return h.createElement("th", {
      ...e
    });
  }
  function Po(e) {
    return h.createElement("tbody", {
      ...e
    });
  }
  function _o(e) {
    const { components: t } = ve();
    return h.createElement(t.Dropdown, {
      ...e
    });
  }
  const jo = Object.freeze(Object.defineProperty({
    __proto__: null,
    Button: lo,
    CaptionLabel: uo,
    Chevron: fo,
    Day: ho,
    DayButton: mo,
    Dropdown: yo,
    DropdownNav: go,
    Footer: po,
    Month: wo,
    MonthCaption: bo,
    MonthGrid: Do,
    Months: ko,
    MonthsDropdown: So,
    Nav: Mo,
    NextMonthButton: vo,
    Option: xo,
    PreviousMonthButton: Co,
    Root: Oo,
    Select: Wo,
    Week: No,
    WeekNumber: Eo,
    WeekNumberHeader: Fo,
    Weekday: To,
    Weekdays: Yo,
    Weeks: Po,
    YearsDropdown: _o
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  function Bo(e) {
    return {
      ...jo,
      ...e
    };
  }
  function Ro(e) {
    const t = {
      "data-mode": e.mode ?? void 0,
      "data-required": "required" in e ? e.required : void 0,
      "data-multiple-months": e.numberOfMonths && e.numberOfMonths > 1 || void 0,
      "data-week-numbers": e.showWeekNumber || void 0,
      "data-broadcast-calendar": e.broadcastCalendar || void 0,
      "data-nav-layout": e.navLayout || void 0
    };
    return Object.entries(e).forEach(([n, r]) => {
      n.startsWith("data-") && (t[n] = r);
    }), t;
  }
  function Ho() {
    const e = {};
    for (const t in y) e[y[t]] = `rdp-${y[t]}`;
    for (const t in j) e[j[t]] = `rdp-${j[t]}`;
    for (const t in U) e[U[t]] = `rdp-${U[t]}`;
    for (const t in L) e[L[t]] = `rdp-${L[t]}`;
    return e;
  }
  function Qt(e, t, n) {
    return (n ?? new se(t)).format(e, "LLLL y");
  }
  const Io = Qt;
  function Ao(e, t, n) {
    return (n ?? new se(t)).format(e, "d");
  }
  function zo(e, t = te) {
    return t.format(e, "LLLL");
  }
  function qo(e, t = te) {
    return e < 10 ? t.formatNumber(`0${e.toLocaleString()}`) : t.formatNumber(`${e.toLocaleString()}`);
  }
  function Lo() {
    return "";
  }
  function $o(e, t, n) {
    return (n ?? new se(t)).format(e, "cccccc");
  }
  function Xt(e, t = te) {
    return t.format(e, "yyyy");
  }
  const Go = Xt, Zo = Object.freeze(Object.defineProperty({
    __proto__: null,
    formatCaption: Qt,
    formatDay: Ao,
    formatMonthCaption: Io,
    formatMonthDropdown: zo,
    formatWeekNumber: qo,
    formatWeekNumberHeader: Lo,
    formatWeekdayName: $o,
    formatYearCaption: Go,
    formatYearDropdown: Xt
  }, Symbol.toStringTag, {
    value: "Module"
  }));
  function Vo(e) {
    return (e == null ? void 0 : e.formatMonthCaption) && !e.formatCaption && (e.formatCaption = e.formatMonthCaption), (e == null ? void 0 : e.formatYearCaption) && !e.formatYearDropdown && (e.formatYearDropdown = e.formatYearCaption), {
      ...Zo,
      ...e
    };
  }
  function Qo(e, t, n, r, o) {
    const { startOfMonth: s, startOfYear: i, endOfYear: a, eachMonthOfInterval: c, getMonth: u } = o;
    return c({
      start: i(e),
      end: a(e)
    }).map((m) => {
      const p = r.formatMonthDropdown(m, o), w = u(m), C = t && m < s(t) || n && m > s(n) || false;
      return {
        value: w,
        label: p,
        disabled: C
      };
    });
  }
  function Xo(e, t = {}, n = {}) {
    let r = {
      ...t == null ? void 0 : t[y.Day]
    };
    return Object.entries(e).filter(([, o]) => o === true).forEach(([o]) => {
      r = {
        ...r,
        ...n == null ? void 0 : n[o]
      };
    }), r;
  }
  function Uo(e, t, n) {
    const r = e.today(), o = t ? e.startOfISOWeek(r) : e.startOfWeek(r), s = [];
    for (let i = 0; i < 7; i++) {
      const a = e.addDays(o, i);
      s.push(a);
    }
    return s;
  }
  function Jo(e, t, n, r) {
    if (!e || !t) return;
    const { startOfYear: o, endOfYear: s, addYears: i, getYear: a, isBefore: c, isSameYear: u } = r, f = o(e), d = s(t), m = [];
    let p = f;
    for (; c(p, d) || u(p, d); ) m.push(p), p = i(p, 1);
    return m.map((w) => {
      const C = n.formatYearDropdown(w, r);
      return {
        value: a(w),
        label: C,
        disabled: false
      };
    });
  }
  function Ut(e, t, n) {
    return (n ?? new se(t)).format(e, "LLLL y");
  }
  const Ko = Ut;
  function es(e, t, n, r) {
    let o = (r ?? new se(n)).format(e, "PPPP");
    return (t == null ? void 0 : t.today) && (o = `Today, ${o}`), o;
  }
  function Jt(e, t, n, r) {
    let o = (r ?? new se(n)).format(e, "PPPP");
    return t.today && (o = `Today, ${o}`), t.selected && (o = `${o}, selected`), o;
  }
  const ts = Jt;
  function ns() {
    return "";
  }
  function rs(e) {
    return "Choose the Month";
  }
  function os(e) {
    return "Go to the Next Month";
  }
  function ss(e) {
    return "Go to the Previous Month";
  }
  function as(e, t, n) {
    return (n ?? new se(t)).format(e, "cccc");
  }
  function is(e, t) {
    return `Week ${e}`;
  }
  function cs(e) {
    return "Week Number";
  }
  function ds(e) {
    return "Choose the Year";
  }
  const ls = Object.freeze(Object.defineProperty({
    __proto__: null,
    labelCaption: Ko,
    labelDay: ts,
    labelDayButton: Jt,
    labelGrid: Ut,
    labelGridcell: es,
    labelMonthDropdown: rs,
    labelNav: ns,
    labelNext: os,
    labelPrevious: ss,
    labelWeekNumber: is,
    labelWeekNumberHeader: cs,
    labelWeekday: as,
    labelYearDropdown: ds
  }, Symbol.toStringTag, {
    value: "Module"
  })), xe = (e) => e instanceof HTMLElement ? e : null, rt = (e) => [
    ...e.querySelectorAll("[data-animated-month]") ?? []
  ], us = (e) => xe(e.querySelector("[data-animated-month]")), ot = (e) => xe(e.querySelector("[data-animated-caption]")), st = (e) => xe(e.querySelector("[data-animated-weeks]")), fs = (e) => xe(e.querySelector("[data-animated-nav]")), hs = (e) => xe(e.querySelector("[data-animated-weekdays]"));
  function ms(e, t, { classNames: n, months: r, focused: o, dateLib: s }) {
    const i = b.useRef(null), a = b.useRef(r), c = b.useRef(false);
    b.useLayoutEffect(() => {
      const u = a.current;
      if (a.current = r, !t || !e.current || !(e.current instanceof HTMLElement) || r.length === 0 || u.length === 0 || r.length !== u.length) return;
      const f = s.isSameMonth(r[0].date, u[0].date), d = s.isAfter(r[0].date, u[0].date), m = d ? n[L.caption_after_enter] : n[L.caption_before_enter], p = d ? n[L.weeks_after_enter] : n[L.weeks_before_enter], w = i.current, C = e.current.cloneNode(true);
      if (C instanceof HTMLElement ? (rt(C).forEach((S) => {
        if (!(S instanceof HTMLElement)) return;
        const _ = us(S);
        _ && S.contains(_) && S.removeChild(_);
        const g = ot(S);
        g && g.classList.remove(m);
        const k = st(S);
        k && k.classList.remove(p);
      }), i.current = C) : i.current = null, c.current || f || o) return;
      const M = w instanceof HTMLElement ? rt(w) : [], x = rt(e.current);
      if (x && x.every((E) => E instanceof HTMLElement) && M && M.every((E) => E instanceof HTMLElement)) {
        c.current = true, e.current.style.isolation = "isolate";
        const E = fs(e.current);
        E && (E.style.zIndex = "1"), x.forEach((S, _) => {
          const g = M[_];
          if (!g) return;
          S.style.position = "relative", S.style.overflow = "hidden";
          const k = ot(S);
          k && k.classList.add(m);
          const D = st(S);
          D && D.classList.add(p);
          const O = () => {
            c.current = false, e.current && (e.current.style.isolation = ""), E && (E.style.zIndex = ""), k && k.classList.remove(m), D && D.classList.remove(p), S.style.position = "", S.style.overflow = "", S.contains(g) && S.removeChild(g);
          };
          g.style.pointerEvents = "none", g.style.position = "absolute", g.style.overflow = "hidden", g.setAttribute("aria-hidden", "true");
          const H = hs(g);
          H && (H.style.opacity = "0");
          const z = ot(g);
          z && (z.classList.add(d ? n[L.caption_before_exit] : n[L.caption_after_exit]), z.addEventListener("animationend", O));
          const q = st(g);
          q && q.classList.add(d ? n[L.weeks_before_exit] : n[L.weeks_after_exit]), S.insertBefore(g, S.firstChild);
        });
      }
    });
  }
  function ys(e, t, n, r) {
    const o = e[0], s = e[e.length - 1], { ISOWeek: i, fixedWeeks: a, broadcastCalendar: c } = n ?? {}, { addDays: u, differenceInCalendarDays: f, differenceInCalendarMonths: d, endOfBroadcastWeek: m, endOfISOWeek: p, endOfMonth: w, endOfWeek: C, isAfter: M, startOfBroadcastWeek: x, startOfISOWeek: E, startOfWeek: S } = r, _ = c ? x(o, r) : i ? E(o) : S(o), g = c ? m(s) : i ? p(w(s)) : C(w(s)), k = f(g, _), D = d(s, o) + 1, O = [];
    for (let q = 0; q <= k; q++) {
      const G = u(_, q);
      if (t && M(G, t)) break;
      O.push(G);
    }
    const z = (c ? 35 : 42) * D;
    if (a && O.length < z) {
      const q = z - O.length;
      for (let G = 0; G < q; G++) {
        const de = u(O[O.length - 1], 1);
        O.push(de);
      }
    }
    return O;
  }
  function gs(e) {
    const t = [];
    return e.reduce((n, r) => {
      const o = r.weeks.reduce((s, i) => [
        ...s,
        ...i.days
      ], t);
      return [
        ...n,
        ...o
      ];
    }, t);
  }
  function ps(e, t, n, r) {
    const { numberOfMonths: o = 1 } = n, s = [];
    for (let i = 0; i < o; i++) {
      const a = r.addMonths(e, i);
      if (t && a > t) break;
      s.push(a);
    }
    return s;
  }
  function xt(e, t, n, r) {
    const { month: o, defaultMonth: s, today: i = r.today(), numberOfMonths: a = 1 } = e;
    let c = o || s || i;
    const { differenceInCalendarMonths: u, addMonths: f, startOfMonth: d } = r;
    if (n && u(n, c) < a - 1) {
      const m = -1 * (a - 1);
      c = f(n, m);
    }
    return t && u(c, t) < 0 && (c = t), d(c);
  }
  function ws(e, t, n, r) {
    const { addDays: o, endOfBroadcastWeek: s, endOfISOWeek: i, endOfMonth: a, endOfWeek: c, getISOWeek: u, getWeek: f, startOfBroadcastWeek: d, startOfISOWeek: m, startOfWeek: p } = r, w = e.reduce((C, M) => {
      const x = n.broadcastCalendar ? d(M, r) : n.ISOWeek ? m(M) : p(M), E = n.broadcastCalendar ? s(M) : n.ISOWeek ? i(a(M)) : c(a(M)), S = t.filter((D) => D >= x && D <= E), _ = n.broadcastCalendar ? 35 : 42;
      if (n.fixedWeeks && S.length < _) {
        const D = t.filter((O) => {
          const H = _ - S.length;
          return O > E && O <= o(E, H);
        });
        S.push(...D);
      }
      const g = S.reduce((D, O) => {
        const H = n.ISOWeek ? u(O) : f(O), z = D.find((G) => G.weekNumber === H), q = new zt(O, M, r);
        return z ? z.days.push(q) : D.push(new ao(H, [
          q
        ])), D;
      }, []), k = new so(M, g);
      return C.push(k), C;
    }, []);
    return n.reverseMonths ? w.reverse() : w;
  }
  function bs(e, t) {
    let { startMonth: n, endMonth: r } = e;
    const { startOfYear: o, startOfDay: s, startOfMonth: i, endOfMonth: a, addYears: c, endOfYear: u, newDate: f, today: d } = t, { fromYear: m, toYear: p, fromMonth: w, toMonth: C } = e;
    !n && w && (n = w), !n && m && (n = t.newDate(m, 0, 1)), !r && C && (r = C), !r && p && (r = f(p, 11, 31));
    const M = e.captionLayout === "dropdown" || e.captionLayout === "dropdown-years";
    return n ? n = i(n) : m ? n = f(m, 0, 1) : !n && M && (n = o(c(e.today ?? d(), -100))), r ? r = a(r) : p ? r = f(p, 11, 31) : !r && M && (r = u(e.today ?? d())), [
      n && s(n),
      r && s(r)
    ];
  }
  function Ds(e, t, n, r) {
    if (n.disableNavigation) return;
    const { pagedNavigation: o, numberOfMonths: s = 1 } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, u = o ? s : 1, f = i(e);
    if (!t) return a(f, u);
    if (!(c(t, e) < s)) return a(f, u);
  }
  function ks(e, t, n, r) {
    if (n.disableNavigation) return;
    const { pagedNavigation: o, numberOfMonths: s } = n, { startOfMonth: i, addMonths: a, differenceInCalendarMonths: c } = r, u = o ? s ?? 1 : 1, f = i(e);
    if (!t) return a(f, -u);
    if (!(c(f, t) <= 0)) return a(f, -u);
  }
  function Ss(e) {
    const t = [];
    return e.reduce((n, r) => [
      ...n,
      ...r.weeks
    ], t);
  }
  function Ze(e, t) {
    const [n, r] = b.useState(e);
    return [
      t === void 0 ? n : t,
      r
    ];
  }
  function Ms(e, t) {
    const [n, r] = bs(e, t), { startOfMonth: o, endOfMonth: s } = t, i = xt(e, n, r, t), [a, c] = Ze(i, e.month ? i : void 0);
    b.useEffect(() => {
      const k = xt(e, n, r, t);
      c(k);
    }, [
      e.timeZone
    ]);
    const u = ps(a, r, e, t), f = ys(u, e.endMonth ? s(e.endMonth) : void 0, e, t), d = ws(u, f, e, t), m = Ss(d), p = gs(d), w = ks(a, n, e, t), C = Ds(a, r, e, t), { disableNavigation: M, onMonthChange: x } = e, E = (k) => m.some((D) => D.days.some((O) => O.isEqualTo(k))), S = (k) => {
      if (M) return;
      let D = o(k);
      n && D < o(n) && (D = o(n)), r && D > o(r) && (D = o(r)), c(D), x == null ? void 0 : x(D);
    };
    return {
      months: d,
      weeks: m,
      days: p,
      navStart: n,
      navEnd: r,
      previousMonth: w,
      nextMonth: C,
      goToMonth: S,
      goToDay: (k) => {
        E(k) || S(k.date);
      }
    };
  }
  var K;
  (function(e) {
    e[e.Today = 0] = "Today", e[e.Selected = 1] = "Selected", e[e.LastFocused = 2] = "LastFocused", e[e.FocusedModifier = 3] = "FocusedModifier";
  })(K || (K = {}));
  function Ct(e) {
    return !e[j.disabled] && !e[j.hidden] && !e[j.outside];
  }
  function vs(e, t, n, r) {
    let o, s = -1;
    for (const i of e) {
      const a = t(i);
      Ct(a) && (a[j.focused] && s < K.FocusedModifier ? (o = i, s = K.FocusedModifier) : (r == null ? void 0 : r.isEqualTo(i)) && s < K.LastFocused ? (o = i, s = K.LastFocused) : n(i.date) && s < K.Selected ? (o = i, s = K.Selected) : a[j.today] && s < K.Today && (o = i, s = K.Today));
    }
    return o || (o = e.find((i) => Ct(t(i)))), o;
  }
  function xs(e, t, n, r, o, s, i) {
    const { ISOWeek: a, broadcastCalendar: c } = s, { addDays: u, addMonths: f, addWeeks: d, addYears: m, endOfBroadcastWeek: p, endOfISOWeek: w, endOfWeek: C, max: M, min: x, startOfBroadcastWeek: E, startOfISOWeek: S, startOfWeek: _ } = i;
    let k = {
      day: u,
      week: d,
      month: f,
      year: m,
      startOfWeek: (D) => c ? E(D, i) : a ? S(D) : _(D),
      endOfWeek: (D) => c ? p(D) : a ? w(D) : C(D)
    }[e](n, t === "after" ? 1 : -1);
    return t === "before" && r ? k = M([
      r,
      k
    ]) : t === "after" && o && (k = x([
      o,
      k
    ])), k;
  }
  function Kt(e, t, n, r, o, s, i, a = 0) {
    if (a > 365) return;
    const c = xs(e, t, n.date, r, o, s, i), u = !!(s.disabled && oe(c, s.disabled, i)), f = !!(s.hidden && oe(c, s.hidden, i)), d = c, m = new zt(c, d, i);
    return !u && !f ? m : Kt(e, t, m, r, o, s, i, a + 1);
  }
  function Cs(e, t, n, r, o) {
    const { autoFocus: s } = e, [i, a] = b.useState(), c = vs(t.days, n, r || (() => false), i), [u, f] = b.useState(s ? c : void 0);
    return {
      isFocusTarget: (C) => !!(c == null ? void 0 : c.isEqualTo(C)),
      setFocused: f,
      focused: u,
      blur: () => {
        a(u), f(void 0);
      },
      moveFocus: (C, M) => {
        if (!u) return;
        const x = Kt(C, M, u, t.navStart, t.navEnd, e, o);
        x && (t.goToDay(x), f(x));
      }
    };
  }
  function Os(e, t) {
    const { selected: n, required: r, onSelect: o } = e, [s, i] = Ze(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t, u = (p) => (a == null ? void 0 : a.some((w) => c(w, p))) ?? false, { min: f, max: d } = e;
    return {
      selected: a,
      select: (p, w, C) => {
        let M = [
          ...a ?? []
        ];
        if (u(p)) {
          if ((a == null ? void 0 : a.length) === f || r && (a == null ? void 0 : a.length) === 1) return;
          M = a == null ? void 0 : a.filter((x) => !c(x, p));
        } else (a == null ? void 0 : a.length) === d ? M = [
          p
        ] : M = [
          ...M,
          p
        ];
        return o || i(M), o == null ? void 0 : o(M, p, w, C), M;
      },
      isSelected: u
    };
  }
  function Ws(e, t, n = 0, r = 0, o = false, s = te) {
    const { from: i, to: a } = t || {}, { isSameDay: c, isAfter: u, isBefore: f } = s;
    let d;
    if (!i && !a) d = {
      from: e,
      to: n > 0 ? void 0 : e
    };
    else if (i && !a) c(i, e) ? o ? d = {
      from: i,
      to: void 0
    } : d = void 0 : f(e, i) ? d = {
      from: e,
      to: i
    } : d = {
      from: i,
      to: e
    };
    else if (i && a) if (c(i, e) && c(a, e)) o ? d = {
      from: i,
      to: a
    } : d = void 0;
    else if (c(i, e)) d = {
      from: i,
      to: n > 0 ? void 0 : e
    };
    else if (c(a, e)) d = {
      from: e,
      to: n > 0 ? void 0 : e
    };
    else if (f(e, i)) d = {
      from: e,
      to: a
    };
    else if (u(e, i)) d = {
      from: i,
      to: e
    };
    else if (u(e, a)) d = {
      from: i,
      to: e
    };
    else throw new Error("Invalid range");
    if ((d == null ? void 0 : d.from) && (d == null ? void 0 : d.to)) {
      const m = s.differenceInCalendarDays(d.to, d.from);
      r > 0 && m > r ? d = {
        from: e,
        to: void 0
      } : n > 1 && m < n && (d = {
        from: e,
        to: void 0
      });
    }
    return d;
  }
  function Ns(e, t, n = te) {
    const r = Array.isArray(t) ? t : [
      t
    ];
    let o = e.from;
    const s = n.differenceInCalendarDays(e.to, e.from), i = Math.min(s, 6);
    for (let a = 0; a <= i; a++) {
      if (r.includes(o.getDay())) return true;
      o = n.addDays(o, 1);
    }
    return false;
  }
  function Ot(e, t, n = te) {
    return re(e, t.from, false, n) || re(e, t.to, false, n) || re(t, e.from, false, n) || re(t, e.to, false, n);
  }
  function Ts(e, t, n = te) {
    const r = Array.isArray(t) ? t : [
      t
    ];
    if (r.filter((a) => typeof a != "function").some((a) => typeof a == "boolean" ? a : n.isDate(a) ? re(e, a, false, n) : Zt(a, n) ? a.some((c) => re(e, c, false, n)) : ct(a) ? a.from && a.to ? Ot(e, {
      from: a.from,
      to: a.to
    }, n) : false : Gt(a) ? Ns(e, a.dayOfWeek, n) : qt(a) ? n.isAfter(a.before, a.after) ? Ot(e, {
      from: n.addDays(a.after, 1),
      to: n.addDays(a.before, -1)
    }, n) : oe(e.from, a, n) || oe(e.to, a, n) : Lt(a) || $t(a) ? oe(e.from, a, n) || oe(e.to, a, n) : false)) return true;
    const i = r.filter((a) => typeof a == "function");
    if (i.length) {
      let a = e.from;
      const c = n.differenceInCalendarDays(e.to, e.from);
      for (let u = 0; u <= c; u++) {
        if (i.some((f) => f(a))) return true;
        a = n.addDays(a, 1);
      }
    }
    return false;
  }
  function Ys(e, t) {
    const { disabled: n, excludeDisabled: r, selected: o, required: s, onSelect: i } = e, [a, c] = Ze(o, i ? o : void 0), u = i ? o : a;
    return {
      selected: u,
      select: (m, p, w) => {
        const { min: C, max: M } = e, x = m ? Ws(m, u, C, M, s, t) : void 0;
        return r && n && (x == null ? void 0 : x.from) && x.to && Ts({
          from: x.from,
          to: x.to
        }, n, t) && (x.from = m, x.to = void 0), i || c(x), i == null ? void 0 : i(x, m, p, w), x;
      },
      isSelected: (m) => u && re(u, m, false, t)
    };
  }
  function Es(e, t) {
    const { selected: n, required: r, onSelect: o } = e, [s, i] = Ze(n, o ? n : void 0), a = o ? n : s, { isSameDay: c } = t;
    return {
      selected: a,
      select: (d, m, p) => {
        let w = d;
        return !r && a && a && c(d, a) && (w = void 0), o || i(w), o == null ? void 0 : o(w, d, m, p), w;
      },
      isSelected: (d) => a ? c(a, d) : false
    };
  }
  function Fs(e, t) {
    const n = Es(e, t), r = Os(e, t), o = Ys(e, t);
    switch (e.mode) {
      case "single":
        return n;
      case "multiple":
        return r;
      case "range":
        return o;
      default:
        return;
    }
  }
  function Ps(e) {
    var _a2;
    let t = e;
    t.timeZone && (t = {
      ...e
    }, t.today && (t.today = new A(t.today, t.timeZone)), t.month && (t.month = new A(t.month, t.timeZone)), t.defaultMonth && (t.defaultMonth = new A(t.defaultMonth, t.timeZone)), t.startMonth && (t.startMonth = new A(t.startMonth, t.timeZone)), t.endMonth && (t.endMonth = new A(t.endMonth, t.timeZone)), t.mode === "single" && t.selected ? t.selected = new A(t.selected, t.timeZone) : t.mode === "multiple" && t.selected ? t.selected = (_a2 = t.selected) == null ? void 0 : _a2.map((v) => new A(v, t.timeZone)) : t.mode === "range" && t.selected && (t.selected = {
      from: t.selected.from ? new A(t.selected.from, t.timeZone) : void 0,
      to: t.selected.to ? new A(t.selected.to, t.timeZone) : void 0
    }));
    const { components: n, formatters: r, labels: o, dateLib: s, locale: i, classNames: a } = b.useMemo(() => {
      const v = {
        ...it,
        ...t.locale
      };
      return {
        dateLib: new se({
          locale: v,
          weekStartsOn: t.broadcastCalendar ? 1 : t.weekStartsOn,
          firstWeekContainsDate: t.firstWeekContainsDate,
          useAdditionalWeekYearTokens: t.useAdditionalWeekYearTokens,
          useAdditionalDayOfYearTokens: t.useAdditionalDayOfYearTokens,
          timeZone: t.timeZone,
          numerals: t.numerals
        }, t.dateLib),
        components: Bo(t.components),
        formatters: Vo(t.formatters),
        labels: {
          ...ls,
          ...t.labels
        },
        locale: v,
        classNames: {
          ...Ho(),
          ...t.classNames
        }
      };
    }, [
      t.locale,
      t.broadcastCalendar,
      t.weekStartsOn,
      t.firstWeekContainsDate,
      t.useAdditionalWeekYearTokens,
      t.useAdditionalDayOfYearTokens,
      t.timeZone,
      t.numerals,
      t.dateLib,
      t.components,
      t.formatters,
      t.labels,
      t.classNames
    ]), { captionLayout: c, mode: u, navLayout: f, numberOfMonths: d = 1, onDayBlur: m, onDayClick: p, onDayFocus: w, onDayKeyDown: C, onDayMouseEnter: M, onDayMouseLeave: x, onNextClick: E, onPrevClick: S, showWeekNumber: _, styles: g } = t, { formatCaption: k, formatDay: D, formatMonthDropdown: O, formatWeekNumber: H, formatWeekNumberHeader: z, formatWeekdayName: q, formatYearDropdown: G } = r, de = Ms(t, s), { days: le, months: ue, navStart: Ce, navEnd: Ve, previousMonth: Z, nextMonth: V, goToMonth: ne } = de, Qe = io(le, t, Ce, Ve, s), { isSelected: Xe, select: Ue, selected: Oe } = Fs(t, s) ?? {}, { blur: dt, focused: lt, isFocusTarget: en, moveFocus: ut, setFocused: We } = Cs(t, de, Qe, Xe ?? (() => false), s), { labelDayButton: tn, labelGridcell: nn, labelGrid: rn, labelMonthDropdown: on, labelNav: ft, labelPrevious: sn, labelNext: an, labelWeekday: cn, labelWeekNumber: dn, labelWeekNumberHeader: ln, labelYearDropdown: un } = o, fn = b.useMemo(() => Uo(s, t.ISOWeek), [
      s,
      t.ISOWeek
    ]), ht = u !== void 0 || p !== void 0, Je = b.useCallback(() => {
      Z && (ne(Z), S == null ? void 0 : S(Z));
    }, [
      Z,
      ne,
      S
    ]), Ke = b.useCallback(() => {
      V && (ne(V), E == null ? void 0 : E(V));
    }, [
      ne,
      V,
      E
    ]), hn = b.useCallback((v, F) => (W) => {
      W.preventDefault(), W.stopPropagation(), We(v), Ue == null ? void 0 : Ue(v.date, F, W), p == null ? void 0 : p(v.date, F, W);
    }, [
      Ue,
      p,
      We
    ]), mn = b.useCallback((v, F) => (W) => {
      We(v), w == null ? void 0 : w(v.date, F, W);
    }, [
      w,
      We
    ]), yn = b.useCallback((v, F) => (W) => {
      dt(), m == null ? void 0 : m(v.date, F, W);
    }, [
      dt,
      m
    ]), gn = b.useCallback((v, F) => (W) => {
      const ae = {
        ArrowLeft: [
          W.shiftKey ? "month" : "day",
          t.dir === "rtl" ? "after" : "before"
        ],
        ArrowRight: [
          W.shiftKey ? "month" : "day",
          t.dir === "rtl" ? "before" : "after"
        ],
        ArrowDown: [
          W.shiftKey ? "year" : "week",
          "after"
        ],
        ArrowUp: [
          W.shiftKey ? "year" : "week",
          "before"
        ],
        PageUp: [
          W.shiftKey ? "year" : "month",
          "before"
        ],
        PageDown: [
          W.shiftKey ? "year" : "month",
          "after"
        ],
        Home: [
          "startOfWeek",
          "before"
        ],
        End: [
          "endOfWeek",
          "after"
        ]
      };
      if (ae[W.key]) {
        W.preventDefault(), W.stopPropagation();
        const [Q, Ne] = ae[W.key];
        ut(Q, Ne);
      }
      C == null ? void 0 : C(v.date, F, W);
    }, [
      ut,
      C,
      t.dir
    ]), pn = b.useCallback((v, F) => (W) => {
      M == null ? void 0 : M(v.date, F, W);
    }, [
      M
    ]), wn = b.useCallback((v, F) => (W) => {
      x == null ? void 0 : x(v.date, F, W);
    }, [
      x
    ]), bn = b.useCallback((v) => (F) => {
      const W = Number(F.target.value), ae = s.setMonth(s.startOfMonth(v), W);
      ne(ae);
    }, [
      s,
      ne
    ]), Dn = b.useCallback((v) => (F) => {
      const W = Number(F.target.value), ae = s.setYear(s.startOfMonth(v), W);
      ne(ae);
    }, [
      s,
      ne
    ]), { className: kn, style: Sn } = b.useMemo(() => ({
      className: [
        a[y.Root],
        t.className
      ].filter(Boolean).join(" "),
      style: {
        ...g == null ? void 0 : g[y.Root],
        ...t.style
      }
    }), [
      a,
      t.className,
      t.style,
      g
    ]), Mn = Ro(t), mt = b.useRef(null);
    ms(mt, !!t.animate, {
      classNames: a,
      months: ue,
      focused: lt,
      dateLib: s
    });
    const vn = {
      dayPickerProps: t,
      selected: Oe,
      select: Ue,
      isSelected: Xe,
      months: ue,
      nextMonth: V,
      previousMonth: Z,
      goToMonth: ne,
      getModifiers: Qe,
      components: n,
      classNames: a,
      styles: g,
      labels: o,
      formatters: r
    };
    return h.createElement(Vt.Provider, {
      value: vn
    }, h.createElement(n.Root, {
      rootRef: t.animate ? mt : void 0,
      className: kn,
      style: Sn,
      dir: t.dir,
      id: t.id,
      lang: t.lang,
      nonce: t.nonce,
      title: t.title,
      role: t.role,
      "aria-label": t["aria-label"],
      ...Mn
    }, h.createElement(n.Months, {
      className: a[y.Months],
      style: g == null ? void 0 : g[y.Months]
    }, !t.hideNavigation && !f && h.createElement(n.Nav, {
      "data-animated-nav": t.animate ? "true" : void 0,
      className: a[y.Nav],
      style: g == null ? void 0 : g[y.Nav],
      "aria-label": ft(),
      onPreviousClick: Je,
      onNextClick: Ke,
      previousMonth: Z,
      nextMonth: V
    }), ue.map((v, F) => {
      const W = Qo(v.date, Ce, Ve, r, s), ae = Jo(Ce, Ve, r, s);
      return h.createElement(n.Month, {
        "data-animated-month": t.animate ? "true" : void 0,
        className: a[y.Month],
        style: g == null ? void 0 : g[y.Month],
        key: F,
        displayIndex: F,
        calendarMonth: v
      }, f === "around" && !t.hideNavigation && F === 0 && h.createElement(n.PreviousMonthButton, {
        type: "button",
        className: a[y.PreviousMonthButton],
        tabIndex: Z ? void 0 : -1,
        "aria-disabled": Z ? void 0 : true,
        "aria-label": sn(Z),
        onClick: Je,
        "data-animated-button": t.animate ? "true" : void 0
      }, h.createElement(n.Chevron, {
        disabled: Z ? void 0 : true,
        className: a[y.Chevron],
        orientation: t.dir === "rtl" ? "right" : "left"
      })), h.createElement(n.MonthCaption, {
        "data-animated-caption": t.animate ? "true" : void 0,
        className: a[y.MonthCaption],
        style: g == null ? void 0 : g[y.MonthCaption],
        calendarMonth: v,
        displayIndex: F
      }, (c == null ? void 0 : c.startsWith("dropdown")) ? h.createElement(n.DropdownNav, {
        className: a[y.Dropdowns],
        style: g == null ? void 0 : g[y.Dropdowns]
      }, c === "dropdown" || c === "dropdown-months" ? h.createElement(n.MonthsDropdown, {
        className: a[y.MonthsDropdown],
        "aria-label": on(),
        classNames: a,
        components: n,
        disabled: !!t.disableNavigation,
        onChange: bn(v.date),
        options: W,
        style: g == null ? void 0 : g[y.Dropdown],
        value: s.getMonth(v.date)
      }) : h.createElement("span", null, O(v.date, s)), c === "dropdown" || c === "dropdown-years" ? h.createElement(n.YearsDropdown, {
        className: a[y.YearsDropdown],
        "aria-label": un(s.options),
        classNames: a,
        components: n,
        disabled: !!t.disableNavigation,
        onChange: Dn(v.date),
        options: ae,
        style: g == null ? void 0 : g[y.Dropdown],
        value: s.getYear(v.date)
      }) : h.createElement("span", null, G(v.date, s)), h.createElement("span", {
        role: "status",
        "aria-live": "polite",
        style: {
          border: 0,
          clip: "rect(0 0 0 0)",
          height: "1px",
          margin: "-1px",
          overflow: "hidden",
          padding: 0,
          position: "absolute",
          width: "1px",
          whiteSpace: "nowrap",
          wordWrap: "normal"
        }
      }, k(v.date, s.options, s))) : h.createElement(n.CaptionLabel, {
        className: a[y.CaptionLabel],
        role: "status",
        "aria-live": "polite"
      }, k(v.date, s.options, s))), f === "around" && !t.hideNavigation && F === d - 1 && h.createElement(n.NextMonthButton, {
        type: "button",
        className: a[y.NextMonthButton],
        tabIndex: V ? void 0 : -1,
        "aria-disabled": V ? void 0 : true,
        "aria-label": an(V),
        onClick: Ke,
        "data-animated-button": t.animate ? "true" : void 0
      }, h.createElement(n.Chevron, {
        disabled: V ? void 0 : true,
        className: a[y.Chevron],
        orientation: t.dir === "rtl" ? "left" : "right"
      })), F === d - 1 && f === "after" && !t.hideNavigation && h.createElement(n.Nav, {
        "data-animated-nav": t.animate ? "true" : void 0,
        className: a[y.Nav],
        style: g == null ? void 0 : g[y.Nav],
        "aria-label": ft(),
        onPreviousClick: Je,
        onNextClick: Ke,
        previousMonth: Z,
        nextMonth: V
      }), h.createElement(n.MonthGrid, {
        role: "grid",
        "aria-multiselectable": u === "multiple" || u === "range",
        "aria-label": rn(v.date, s.options, s) || void 0,
        className: a[y.MonthGrid],
        style: g == null ? void 0 : g[y.MonthGrid]
      }, !t.hideWeekdays && h.createElement(n.Weekdays, {
        "data-animated-weekdays": t.animate ? "true" : void 0,
        className: a[y.Weekdays],
        style: g == null ? void 0 : g[y.Weekdays]
      }, _ && h.createElement(n.WeekNumberHeader, {
        "aria-label": ln(s.options),
        className: a[y.WeekNumberHeader],
        style: g == null ? void 0 : g[y.WeekNumberHeader],
        scope: "col"
      }, z()), fn.map((Q, Ne) => h.createElement(n.Weekday, {
        "aria-label": cn(Q, s.options, s),
        className: a[y.Weekday],
        key: Ne,
        style: g == null ? void 0 : g[y.Weekday],
        scope: "col"
      }, q(Q, s.options, s)))), h.createElement(n.Weeks, {
        "data-animated-weeks": t.animate ? "true" : void 0,
        className: a[y.Weeks],
        style: g == null ? void 0 : g[y.Weeks]
      }, v.weeks.map((Q, Ne) => h.createElement(n.Week, {
        className: a[y.Week],
        key: Q.weekNumber,
        style: g == null ? void 0 : g[y.Week],
        week: Q
      }, _ && h.createElement(n.WeekNumber, {
        week: Q,
        style: g == null ? void 0 : g[y.WeekNumber],
        "aria-label": dn(Q.weekNumber, {
          locale: i
        }),
        className: a[y.WeekNumber],
        scope: "row",
        role: "rowheader"
      }, H(Q.weekNumber, s)), Q.days.map((I) => {
        const { date: J } = I, N = Qe(I);
        if (N[j.focused] = !N.hidden && !!(lt == null ? void 0 : lt.isEqualTo(I)), N[U.selected] = (Xe == null ? void 0 : Xe(J)) || N.selected, ct(Oe)) {
          const { from: et, to: tt } = Oe;
          N[U.range_start] = !!(et && tt && s.isSameDay(J, et)), N[U.range_end] = !!(et && tt && s.isSameDay(J, tt)), N[U.range_middle] = re(Oe, J, true, s);
        }
        const xn = Xo(N, g, t.modifiersStyles), Cn = co(N, a, t.modifiersClassNames), On = !ht && !N.hidden ? nn(J, N, s.options, s) : void 0;
        return h.createElement(n.Day, {
          key: `${s.format(J, "yyyy-MM-dd")}_${s.format(I.displayMonth, "yyyy-MM")}`,
          day: I,
          modifiers: N,
          className: Cn.join(" "),
          style: xn,
          role: "gridcell",
          "aria-selected": N.selected || void 0,
          "aria-label": On,
          "data-day": s.format(J, "yyyy-MM-dd"),
          "data-month": I.outside ? s.format(J, "yyyy-MM") : void 0,
          "data-selected": N.selected || void 0,
          "data-disabled": N.disabled || void 0,
          "data-hidden": N.hidden || void 0,
          "data-outside": I.outside || void 0,
          "data-focused": N.focused || void 0,
          "data-today": N.today || void 0
        }, !N.hidden && ht ? h.createElement(n.DayButton, {
          className: a[y.DayButton],
          style: g == null ? void 0 : g[y.DayButton],
          type: "button",
          day: I,
          modifiers: N,
          disabled: N.disabled || void 0,
          tabIndex: en(I) ? 0 : -1,
          "aria-label": tn(J, N, s.options, s),
          onClick: hn(I, N),
          onBlur: yn(I, N),
          onFocus: mn(I, N),
          onKeyDown: gn(I, N),
          onMouseEnter: pn(I, N),
          onMouseLeave: wn(I, N)
        }, D(J, s.options, s)) : !N.hidden && D(I.date, s.options, s));
      }))))));
    })), t.footer && h.createElement(n.Footer, {
      className: a[y.Footer],
      style: g == null ? void 0 : g[y.Footer],
      role: "status",
      "aria-live": "polite"
    }, t.footer)));
  }
  function B({ className: e, classNames: t, showOutsideDays: n = true, ...r }) {
    return l.jsx(Ps, {
      showOutsideDays: n,
      className: fe("p-3", e),
      classNames: {
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: fe(yt({
          variant: "outline"
        }), "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: fe("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md", r.mode === "range" ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md" : "[&:has([aria-selected])]:rounded-md"),
        day: fe(yt({
          variant: "ghost"
        }), "h-8 w-8 p-0 font-normal aria-selected:opacity-100"),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...t
      },
      components: {
        IconLeft: ({ className: o, ...s }) => l.jsx(Tn, {
          className: fe("h-4 w-4", o),
          ...s
        }),
        IconRight: ({ className: o, ...s }) => l.jsx(Nn, {
          className: fe("h-4 w-4", o),
          ...s
        })
      },
      ...r
    });
  }
  B.displayName = "Calendar";
  B.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "Calendar",
    props: {
      showOutsideDays: {
        defaultValue: {
          value: "true",
          computed: false
        },
        required: false
      }
    }
  };
  Ls = {
    title: "Base/Calendar",
    component: B,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (e) => l.jsx(Wn, {
        children: l.jsx(e, {})
      })
    ],
    argTypes: {
      mode: {
        control: "select",
        options: [
          "single",
          "multiple",
          "range"
        ],
        description: "Selection mode"
      },
      showOutsideDays: {
        control: "boolean",
        description: "Show days outside the current month"
      },
      captionLayout: {
        control: "select",
        options: [
          "label",
          "dropdown",
          "dropdown-months",
          "dropdown-years"
        ],
        description: "Caption layout style"
      },
      buttonVariant: {
        control: "select",
        options: [
          "ghost",
          "outline",
          "secondary"
        ],
        description: "Button variant for navigation and day buttons"
      },
      disabled: {
        control: "boolean",
        description: "Whether the calendar is disabled"
      }
    },
    args: {
      mode: "single",
      showOutsideDays: true,
      captionLayout: "label",
      buttonVariant: "ghost"
    }
  };
  Te = {
    render: (e) => {
      const [t, n] = b.useState();
      return l.jsx(B, {
        ...e,
        selected: t,
        onSelect: n
      });
    }
  };
  Ye = {
    args: {
      mode: "multiple"
    },
    render: (e) => {
      const [t, n] = b.useState([]);
      return l.jsx(B, {
        ...e,
        selected: t,
        onSelect: n
      });
    }
  };
  Ee = {
    args: {
      mode: "range"
    },
    render: (e) => {
      const [t, n] = b.useState();
      return l.jsx(B, {
        ...e,
        selected: t,
        onSelect: n
      });
    }
  };
  Fe = {
    args: {
      captionLayout: "dropdown"
    },
    render: (e) => {
      const [t, n] = b.useState();
      return l.jsx(B, {
        ...e,
        selected: t,
        onSelect: n,
        fromYear: 2020,
        toYear: 2030
      });
    }
  };
  Pe = {
    args: {
      captionLayout: "dropdown-months"
    },
    render: (e) => {
      const [t, n] = b.useState();
      return l.jsx(B, {
        ...e,
        selected: t,
        onSelect: n
      });
    }
  };
  _e = {
    args: {
      captionLayout: "dropdown-years"
    },
    render: (e) => {
      const [t, n] = b.useState();
      return l.jsx(B, {
        ...e,
        selected: t,
        onSelect: n,
        fromYear: 2020,
        toYear: 2030
      });
    }
  };
  je = {
    args: {
      showOutsideDays: false
    },
    render: (e) => {
      const [t, n] = b.useState();
      return l.jsx(B, {
        ...e,
        selected: t,
        onSelect: n
      });
    }
  };
  Be = {
    args: {
      disabled: true
    },
    render: (e) => {
      const [t, n] = b.useState();
      return l.jsx(B, {
        ...e,
        selected: t,
        onSelect: n
      });
    }
  };
  Re = {
    render: () => {
      const [e, t] = b.useState(), n = /* @__PURE__ */ new Date(), r = new Date(n.getTime() + 10080 * 60 * 1e3);
      return l.jsxs("div", {
        style: {
          textAlign: "center"
        },
        children: [
          l.jsx($, {
            size: "2",
            color: "gray",
            style: {
              marginBottom: "12px",
              display: "block"
            },
            children: "Only dates from today to next week are selectable"
          }),
          l.jsx(B, {
            selected: e,
            onSelect: t,
            disabled: [
              {
                before: n
              },
              {
                after: r
              }
            ]
          })
        ]
      });
    }
  };
  He = {
    render: () => {
      const [e, t] = b.useState();
      return l.jsxs("div", {
        style: {
          textAlign: "center"
        },
        children: [
          l.jsx($, {
            size: "2",
            color: "gray",
            style: {
              marginBottom: "12px",
              display: "block"
            },
            children: "Weekends are disabled"
          }),
          l.jsx(B, {
            selected: e,
            onSelect: t,
            disabled: [
              {
                dayOfWeek: [
                  0,
                  6
                ]
              }
            ]
          })
        ]
      });
    }
  };
  Ie = {
    render: () => {
      const [e, t] = b.useState();
      return l.jsx(B, {
        mode: "range",
        numberOfMonths: 2,
        selected: e,
        onSelect: t
      });
    }
  };
  Ae = {
    render: () => {
      const [e, t] = b.useState();
      return l.jsx(B, {
        selected: e,
        onSelect: t,
        showWeekNumber: true,
        weekStartsOn: 1
      });
    }
  };
  ze = {
    render: () => l.jsxs(X, {
      direction: "column",
      gap: "4",
      align: "center",
      children: [
        l.jsxs("div", {
          style: {
            textAlign: "center"
          },
          children: [
            l.jsx($, {
              size: "3",
              weight: "medium",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Ghost (default)"
            }),
            l.jsx(B, {
              buttonVariant: "ghost",
              selected: /* @__PURE__ */ new Date(),
              onSelect: () => {
              }
            })
          ]
        }),
        l.jsxs("div", {
          style: {
            textAlign: "center"
          },
          children: [
            l.jsx($, {
              size: "3",
              weight: "medium",
              style: {
                marginBottom: "8px",
                display: "block"
              },
              children: "Outline"
            }),
            l.jsx(B, {
              buttonVariant: "outline",
              selected: /* @__PURE__ */ new Date(),
              onSelect: () => {
              }
            })
          ]
        })
      ]
    })
  };
  qe = {
    render: () => {
      const [e, t] = b.useState();
      return l.jsxs(P.Root, {
        style: {
          width: "350px"
        },
        children: [
          l.jsxs(P.Header, {
            children: [
              l.jsx(P.Title, {
                children: "Select Date"
              }),
              l.jsx(P.Description, {
                children: "Choose a date for your appointment"
              })
            ]
          }),
          l.jsx(P.Content, {
            children: l.jsx(B, {
              selected: e,
              onSelect: t
            })
          }),
          l.jsx(P.Footer, {
            children: l.jsxs(X, {
              justify: "between",
              align: "center",
              style: {
                width: "100%"
              },
              children: [
                l.jsx($, {
                  size: "2",
                  color: "gray",
                  children: e ? e.toLocaleDateString() : "No date selected"
                }),
                l.jsxs(X, {
                  gap: "2",
                  children: [
                    l.jsx(me, {
                      variant: "outline",
                      size: "1",
                      onClick: () => t(void 0),
                      children: "Clear"
                    }),
                    l.jsx(me, {
                      size: "1",
                      disabled: !e,
                      children: "Confirm"
                    })
                  ]
                })
              ]
            })
          })
        ]
      });
    }
  };
  Le = {
    render: () => {
      const [e, t] = b.useState();
      return l.jsxs(P.Root, {
        style: {
          width: "400px"
        },
        children: [
          l.jsxs(P.Header, {
            children: [
              l.jsx(P.Title, {
                children: "Date Range Selection"
              }),
              l.jsx(P.Description, {
                children: "Select a start and end date for your booking"
              })
            ]
          }),
          l.jsx(P.Content, {
            children: l.jsx(B, {
              mode: "range",
              selected: e,
              onSelect: t,
              numberOfMonths: 1
            })
          }),
          l.jsx(P.Footer, {
            children: l.jsxs(X, {
              direction: "column",
              gap: "2",
              style: {
                width: "100%"
              },
              children: [
                l.jsxs(X, {
                  justify: "between",
                  children: [
                    l.jsx($, {
                      size: "2",
                      color: "gray",
                      children: "Start:"
                    }),
                    l.jsx($, {
                      size: "2",
                      children: (e == null ? void 0 : e.from) ? e.from.toLocaleDateString() : "Not selected"
                    })
                  ]
                }),
                l.jsxs(X, {
                  justify: "between",
                  children: [
                    l.jsx($, {
                      size: "2",
                      color: "gray",
                      children: "End:"
                    }),
                    l.jsx($, {
                      size: "2",
                      children: (e == null ? void 0 : e.to) ? e.to.toLocaleDateString() : "Not selected"
                    })
                  ]
                }),
                l.jsxs(X, {
                  gap: "2",
                  justify: "end",
                  style: {
                    marginTop: "8px"
                  },
                  children: [
                    l.jsx(me, {
                      variant: "outline",
                      size: "1",
                      onClick: () => t(void 0),
                      children: "Clear"
                    }),
                    l.jsx(me, {
                      size: "1",
                      disabled: !(e == null ? void 0 : e.from) || !(e == null ? void 0 : e.to),
                      children: "Book Dates"
                    })
                  ]
                })
              ]
            })
          })
        ]
      });
    }
  };
  $e = {
    render: () => {
      const [e, t] = b.useState(), n = [
        new Date(2024, 0, 15),
        new Date(2024, 0, 22),
        new Date(2024, 0, 28)
      ];
      return l.jsxs(P.Root, {
        style: {
          width: "380px"
        },
        children: [
          l.jsxs(P.Header, {
            children: [
              l.jsx(P.Title, {
                children: "Event Calendar"
              }),
              l.jsx(P.Description, {
                children: "Dates with events are highlighted"
              })
            ]
          }),
          l.jsx(P.Content, {
            children: l.jsx(B, {
              selected: e,
              onSelect: t,
              modifiers: {
                event: n
              },
              modifiersStyles: {
                event: {
                  backgroundColor: "var(--blue-3)",
                  borderRadius: "4px",
                  fontWeight: "bold"
                }
              }
            })
          }),
          l.jsx(P.Footer, {
            children: l.jsxs(X, {
              justify: "between",
              align: "center",
              style: {
                width: "100%"
              },
              children: [
                l.jsx($, {
                  size: "2",
                  color: "gray",
                  children: e ? `Selected: ${e.toLocaleDateString()}` : "No date selected"
                }),
                l.jsx("div", {
                  style: {
                    width: "12px",
                    height: "12px",
                    backgroundColor: "var(--blue-3)",
                    borderRadius: "2px"
                  }
                }),
                l.jsx($, {
                  size: "1",
                  color: "gray",
                  children: "Has events"
                })
              ]
            })
          })
        ]
      });
    }
  };
  Ge = {
    render: () => {
      const [e, t] = b.useState(/* @__PURE__ */ new Date());
      return l.jsx(X, {
        direction: "column",
        gap: "4",
        align: "center",
        children: l.jsxs(P.Root, {
          style: {
            width: "350px"
          },
          children: [
            l.jsxs(P.Header, {
              children: [
                l.jsx(P.Title, {
                  children: "Controlled Calendar"
                }),
                l.jsx(P.Description, {
                  children: "Date is controlled by external state"
                })
              ]
            }),
            l.jsx(P.Content, {
              children: l.jsx(B, {
                selected: e,
                onSelect: t
              })
            }),
            l.jsx(P.Footer, {
              children: l.jsxs(X, {
                gap: "2",
                justify: "between",
                align: "center",
                style: {
                  width: "100%"
                },
                children: [
                  l.jsxs($, {
                    size: "2",
                    color: "gray",
                    children: [
                      "Selected: ",
                      e.toLocaleDateString()
                    ]
                  }),
                  l.jsxs(X, {
                    gap: "2",
                    children: [
                      l.jsx(me, {
                        variant: "outline",
                        size: "1",
                        onClick: () => t(/* @__PURE__ */ new Date()),
                        children: "Today"
                      }),
                      l.jsx(me, {
                        variant: "outline",
                        size: "1",
                        onClick: () => {
                          const n = /* @__PURE__ */ new Date();
                          n.setDate(n.getDate() + 1), t(n);
                        },
                        children: "Tomorrow"
                      })
                    ]
                  })
                ]
              })
            })
          ]
        })
      });
    }
  };
  Te.parameters = {
    ...Te.parameters,
    docs: {
      ...(_a = Te.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: args => {
    const [selected, setSelected] = React.useState<Date>();
    return <Calendar {...args} selected={selected} onSelect={setSelected} />;
  }
}`,
        ...(_c = (_b = Te.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  Ye.parameters = {
    ...Ye.parameters,
    docs: {
      ...(_d = Ye.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  args: {
    mode: "multiple"
  },
  render: args => {
    const [selected, setSelected] = React.useState<Date[]>([]);
    return <Calendar {...args} selected={selected} onSelect={setSelected} />;
  }
}`,
        ...(_f = (_e2 = Ye.parameters) == null ? void 0 : _e2.docs) == null ? void 0 : _f.source
      }
    }
  };
  Ee.parameters = {
    ...Ee.parameters,
    docs: {
      ...(_g = Ee.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  args: {
    mode: "range"
  },
  render: args => {
    const [selected, setSelected] = React.useState<{
      from?: Date;
      to?: Date;
    }>();
    return <Calendar {...args} selected={selected} onSelect={setSelected} />;
  }
}`,
        ...(_i = (_h = Ee.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i.source
      }
    }
  };
  Fe.parameters = {
    ...Fe.parameters,
    docs: {
      ...(_j = Fe.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  args: {
    captionLayout: "dropdown"
  },
  render: args => {
    const [selected, setSelected] = React.useState<Date>();
    return <Calendar {...args} selected={selected} onSelect={setSelected} fromYear={2020} toYear={2030} />;
  }
}`,
        ...(_l = (_k = Fe.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  Pe.parameters = {
    ...Pe.parameters,
    docs: {
      ...(_m = Pe.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  args: {
    captionLayout: "dropdown-months"
  },
  render: args => {
    const [selected, setSelected] = React.useState<Date>();
    return <Calendar {...args} selected={selected} onSelect={setSelected} />;
  }
}`,
        ...(_o2 = (_n2 = Pe.parameters) == null ? void 0 : _n2.docs) == null ? void 0 : _o2.source
      }
    }
  };
  _e.parameters = {
    ..._e.parameters,
    docs: {
      ...(_p = _e.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  args: {
    captionLayout: "dropdown-years"
  },
  render: args => {
    const [selected, setSelected] = React.useState<Date>();
    return <Calendar {...args} selected={selected} onSelect={setSelected} fromYear={2020} toYear={2030} />;
  }
}`,
        ...(_r2 = (_q = _e.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r2.source
      }
    }
  };
  je.parameters = {
    ...je.parameters,
    docs: {
      ...(_s = je.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  args: {
    showOutsideDays: false
  },
  render: args => {
    const [selected, setSelected] = React.useState<Date>();
    return <Calendar {...args} selected={selected} onSelect={setSelected} />;
  }
}`,
        ...(_u = (_t2 = je.parameters) == null ? void 0 : _t2.docs) == null ? void 0 : _u.source
      }
    }
  };
  Be.parameters = {
    ...Be.parameters,
    docs: {
      ...(_v = Be.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  args: {
    disabled: true
  },
  render: args => {
    const [selected, setSelected] = React.useState<Date>();
    return <Calendar {...args} selected={selected} onSelect={setSelected} />;
  }
}`,
        ...(_x = (_w = Be.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  Re.parameters = {
    ...Re.parameters,
    docs: {
      ...(_y = Re.parameters) == null ? void 0 : _y.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = React.useState<Date>();
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    return <div style={{
      textAlign: "center"
    }}>
        <Text size="2" color="gray" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Only dates from today to next week are selectable
        </Text>
        <Calendar selected={selected} onSelect={setSelected} disabled={[{
        before: today
      }, {
        after: nextWeek
      }]} />
      </div>;
  }
}`,
        ...(_A = (_z = Re.parameters) == null ? void 0 : _z.docs) == null ? void 0 : _A.source
      }
    }
  };
  He.parameters = {
    ...He.parameters,
    docs: {
      ...(_B = He.parameters) == null ? void 0 : _B.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = React.useState<Date>();
    return <div style={{
      textAlign: "center"
    }}>
        <Text size="2" color="gray" style={{
        marginBottom: "12px",
        display: "block"
      }}>
          Weekends are disabled
        </Text>
        <Calendar selected={selected} onSelect={setSelected} disabled={[{
        dayOfWeek: [0, 6]
      } // Sunday and Saturday
      ]} />
      </div>;
  }
}`,
        ...(_D = (_C = He.parameters) == null ? void 0 : _C.docs) == null ? void 0 : _D.source
      }
    }
  };
  Ie.parameters = {
    ...Ie.parameters,
    docs: {
      ...(_E = Ie.parameters) == null ? void 0 : _E.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = React.useState<{
      from?: Date;
      to?: Date;
    }>();
    return <Calendar mode="range" numberOfMonths={2} selected={selected} onSelect={setSelected} />;
  }
}`,
        ...(_G = (_F = Ie.parameters) == null ? void 0 : _F.docs) == null ? void 0 : _G.source
      }
    }
  };
  Ae.parameters = {
    ...Ae.parameters,
    docs: {
      ...(_H = Ae.parameters) == null ? void 0 : _H.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = React.useState<Date>();
    return <Calendar selected={selected} onSelect={setSelected} showWeekNumber weekStartsOn={1} // Monday
    />;
  }
}`,
        ...(_J = (_I = Ae.parameters) == null ? void 0 : _I.docs) == null ? void 0 : _J.source
      }
    }
  };
  ze.parameters = {
    ...ze.parameters,
    docs: {
      ...(_K = ze.parameters) == null ? void 0 : _K.docs,
      source: {
        originalSource: `{
  render: () => <Flex direction="column" gap="4" align="center">
      <div style={{
      textAlign: "center"
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Ghost (default)
        </Text>
        <Calendar buttonVariant="ghost" selected={new Date()} onSelect={() => {}} />
      </div>
      
      <div style={{
      textAlign: "center"
    }}>
        <Text size="3" weight="medium" style={{
        marginBottom: "8px",
        display: "block"
      }}>
          Outline
        </Text>
        <Calendar buttonVariant="outline" selected={new Date()} onSelect={() => {}} />
      </div>
    </Flex>
}`,
        ...(_M = (_L = ze.parameters) == null ? void 0 : _L.docs) == null ? void 0 : _M.source
      }
    }
  };
  qe.parameters = {
    ...qe.parameters,
    docs: {
      ...(_N = qe.parameters) == null ? void 0 : _N.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = React.useState<Date>();
    return <Card.Root style={{
      width: "350px"
    }}>
        <Card.Header>
          <Card.Title>Select Date</Card.Title>
          <Card.Description>
            Choose a date for your appointment
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Calendar selected={selected} onSelect={setSelected} />
        </Card.Content>
        <Card.Footer>
          <Flex justify="between" align="center" style={{
          width: "100%"
        }}>
            <Text size="2" color="gray">
              {selected ? selected.toLocaleDateString() : "No date selected"}
            </Text>
            <Flex gap="2">
              <Button variant="outline" size="1" onClick={() => setSelected(undefined)}>
                Clear
              </Button>
              <Button size="1" disabled={!selected}>
                Confirm
              </Button>
            </Flex>
          </Flex>
        </Card.Footer>
      </Card.Root>;
  }
}`,
        ...(_P = (_O = qe.parameters) == null ? void 0 : _O.docs) == null ? void 0 : _P.source
      }
    }
  };
  Le.parameters = {
    ...Le.parameters,
    docs: {
      ...(_Q = Le.parameters) == null ? void 0 : _Q.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = React.useState<{
      from?: Date;
      to?: Date;
    }>();
    return <Card.Root style={{
      width: "400px"
    }}>
        <Card.Header>
          <Card.Title>Date Range Selection</Card.Title>
          <Card.Description>
            Select a start and end date for your booking
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Calendar mode="range" selected={selected} onSelect={setSelected} numberOfMonths={1} />
        </Card.Content>
        <Card.Footer>
          <Flex direction="column" gap="2" style={{
          width: "100%"
        }}>
            <Flex justify="between">
              <Text size="2" color="gray">Start:</Text>
              <Text size="2">
                {selected?.from ? selected.from.toLocaleDateString() : "Not selected"}
              </Text>
            </Flex>
            <Flex justify="between">
              <Text size="2" color="gray">End:</Text>
              <Text size="2">
                {selected?.to ? selected.to.toLocaleDateString() : "Not selected"}
              </Text>
            </Flex>
            <Flex gap="2" justify="end" style={{
            marginTop: "8px"
          }}>
              <Button variant="outline" size="1" onClick={() => setSelected(undefined)}>
                Clear
              </Button>
              <Button size="1" disabled={!selected?.from || !selected?.to}>
                Book Dates
              </Button>
            </Flex>
          </Flex>
        </Card.Footer>
      </Card.Root>;
  }
}`,
        ...(_S = (_R = Le.parameters) == null ? void 0 : _R.docs) == null ? void 0 : _S.source
      }
    }
  };
  $e.parameters = {
    ...$e.parameters,
    docs: {
      ...(_T = $e.parameters) == null ? void 0 : _T.docs,
      source: {
        originalSource: `{
  render: () => {
    const [selected, setSelected] = React.useState<Date>();

    // Mock events
    const events = [new Date(2024, 0, 15),
    // January 15
    new Date(2024, 0, 22),
    // January 22
    new Date(2024, 0, 28) // January 28
    ];
    return <Card.Root style={{
      width: "380px"
    }}>
        <Card.Header>
          <Card.Title>Event Calendar</Card.Title>
          <Card.Description>
            Dates with events are highlighted
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Calendar selected={selected} onSelect={setSelected} modifiers={{
          event: events
        }} modifiersStyles={{
          event: {
            backgroundColor: "var(--blue-3)",
            borderRadius: "4px",
            fontWeight: "bold"
          }
        }} />
        </Card.Content>
        <Card.Footer>
          <Flex justify="between" align="center" style={{
          width: "100%"
        }}>
            <Text size="2" color="gray">
              {selected ? \`Selected: \${selected.toLocaleDateString()}\` : "No date selected"}
            </Text>
            <div style={{
            width: "12px",
            height: "12px",
            backgroundColor: "var(--blue-3)",
            borderRadius: "2px"
          }} />
            <Text size="1" color="gray">Has events</Text>
          </Flex>
        </Card.Footer>
      </Card.Root>;
  }
}`,
        ...(_V = (_U = $e.parameters) == null ? void 0 : _U.docs) == null ? void 0 : _V.source
      }
    }
  };
  Ge.parameters = {
    ...Ge.parameters,
    docs: {
      ...(_W = Ge.parameters) == null ? void 0 : _W.docs,
      source: {
        originalSource: `{
  render: () => {
    const [controlledDate, setControlledDate] = React.useState<Date>(new Date());
    return <Flex direction="column" gap="4" align="center">
        <Card.Root style={{
        width: "350px"
      }}>
          <Card.Header>
            <Card.Title>Controlled Calendar</Card.Title>
            <Card.Description>
              Date is controlled by external state
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Calendar selected={controlledDate} onSelect={setControlledDate} />
          </Card.Content>
          <Card.Footer>
            <Flex gap="2" justify="between" align="center" style={{
            width: "100%"
          }}>
              <Text size="2" color="gray">
                Selected: {controlledDate.toLocaleDateString()}
              </Text>
              <Flex gap="2">
                <Button variant="outline" size="1" onClick={() => setControlledDate(new Date())}>
                  Today
                </Button>
                <Button variant="outline" size="1" onClick={() => {
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                setControlledDate(tomorrow);
              }}>
                  Tomorrow
                </Button>
              </Flex>
            </Flex>
          </Card.Footer>
        </Card.Root>
      </Flex>;
  }
}`,
        ...(_Y = (_X = Ge.parameters) == null ? void 0 : _X.docs) == null ? void 0 : _Y.source
      }
    }
  };
  $s = [
    "Default",
    "Multiple",
    "Range",
    "WithDropdowns",
    "DropdownMonths",
    "DropdownYears",
    "HideOutsideDays",
    "Disabled",
    "WithRestrictions",
    "WeekendDisabled",
    "MultipleMonths",
    "WithWeekNumbers",
    "ButtonVariants",
    "DatePickerCard",
    "RangePicker",
    "EventCalendar",
    "ControlledExample"
  ];
});
export {
  ze as ButtonVariants,
  Ge as ControlledExample,
  qe as DatePickerCard,
  Te as Default,
  Be as Disabled,
  Pe as DropdownMonths,
  _e as DropdownYears,
  $e as EventCalendar,
  je as HideOutsideDays,
  Ye as Multiple,
  Ie as MultipleMonths,
  Ee as Range,
  Le as RangePicker,
  He as WeekendDisabled,
  Fe as WithDropdowns,
  Re as WithRestrictions,
  Ae as WithWeekNumbers,
  $s as __namedExportsOrder,
  __tla,
  Ls as default
};
