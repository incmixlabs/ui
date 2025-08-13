import { a7 as wa, a8 as W, r as c, f as Ba, a9 as Pe, j as n, T as La, a as m, F as ja, __tla as __tla_0 } from "./iframe-CGAl3eeL.js";
import { c as B } from "./utils-CBfrqCZ4.js";
import { d as we, o as je } from "./types-sXqsNS8j.js";
import { T as Ka, __tla as __tla_1 } from "./trash-2-B7j0iALt.js";
import { B as Be, __tla as __tla_2 } from "./button-BF2Wetgg.js";
import "./preload-helper-D9Z9MdNV.js";
import { __tla as __tla_3 } from "./createLucideIcon-BUkpxZyj.js";
import { __tla as __tla_4 } from "./base-button-BHQkXpSv.js";
let ye, he, ue, fe, ve, be, ge, xe, Zi, Qi;
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
  })()
]).then(async () => {
  var _a, _b, _c, _d, _e2, _f, _g, _h, _i2, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
  var Ue = {
    exports: {}
  }, _e, la;
  function Va() {
    if (la) return _e;
    la = 1;
    var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    return _e = e, _e;
  }
  var Re, pa;
  function Wa() {
    if (pa) return Re;
    pa = 1;
    var e = Va();
    function a() {
    }
    function i() {
    }
    return i.resetWarningCache = a, Re = function() {
      function t(r, s, v, T, _, S) {
        if (S !== e) {
          var O = new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");
          throw O.name = "Invariant Violation", O;
        }
      }
      t.isRequired = t;
      function l() {
        return t;
      }
      var o = {
        array: t,
        bigint: t,
        bool: t,
        func: t,
        number: t,
        object: t,
        string: t,
        symbol: t,
        any: t,
        arrayOf: l,
        element: t,
        elementType: t,
        instanceOf: l,
        node: t,
        objectOf: l,
        oneOf: l,
        oneOfType: l,
        shape: l,
        exact: l,
        checkPropTypes: i,
        resetWarningCache: a
      };
      return o.PropTypes = o, o;
    }, Re;
  }
  var ra;
  function $a() {
    return ra || (ra = 1, Ue.exports = Wa()()), Ue.exports;
  }
  var Ha = $a();
  const u = wa(Ha), Ga = /* @__PURE__ */ new Map([
    [
      "1km",
      "application/vnd.1000minds.decision-model+xml"
    ],
    [
      "3dml",
      "text/vnd.in3d.3dml"
    ],
    [
      "3ds",
      "image/x-3ds"
    ],
    [
      "3g2",
      "video/3gpp2"
    ],
    [
      "3gp",
      "video/3gp"
    ],
    [
      "3gpp",
      "video/3gpp"
    ],
    [
      "3mf",
      "model/3mf"
    ],
    [
      "7z",
      "application/x-7z-compressed"
    ],
    [
      "7zip",
      "application/x-7z-compressed"
    ],
    [
      "123",
      "application/vnd.lotus-1-2-3"
    ],
    [
      "aab",
      "application/x-authorware-bin"
    ],
    [
      "aac",
      "audio/x-acc"
    ],
    [
      "aam",
      "application/x-authorware-map"
    ],
    [
      "aas",
      "application/x-authorware-seg"
    ],
    [
      "abw",
      "application/x-abiword"
    ],
    [
      "ac",
      "application/vnd.nokia.n-gage.ac+xml"
    ],
    [
      "ac3",
      "audio/ac3"
    ],
    [
      "acc",
      "application/vnd.americandynamics.acc"
    ],
    [
      "ace",
      "application/x-ace-compressed"
    ],
    [
      "acu",
      "application/vnd.acucobol"
    ],
    [
      "acutc",
      "application/vnd.acucorp"
    ],
    [
      "adp",
      "audio/adpcm"
    ],
    [
      "aep",
      "application/vnd.audiograph"
    ],
    [
      "afm",
      "application/x-font-type1"
    ],
    [
      "afp",
      "application/vnd.ibm.modcap"
    ],
    [
      "ahead",
      "application/vnd.ahead.space"
    ],
    [
      "ai",
      "application/pdf"
    ],
    [
      "aif",
      "audio/x-aiff"
    ],
    [
      "aifc",
      "audio/x-aiff"
    ],
    [
      "aiff",
      "audio/x-aiff"
    ],
    [
      "air",
      "application/vnd.adobe.air-application-installer-package+zip"
    ],
    [
      "ait",
      "application/vnd.dvb.ait"
    ],
    [
      "ami",
      "application/vnd.amiga.ami"
    ],
    [
      "amr",
      "audio/amr"
    ],
    [
      "apk",
      "application/vnd.android.package-archive"
    ],
    [
      "apng",
      "image/apng"
    ],
    [
      "appcache",
      "text/cache-manifest"
    ],
    [
      "application",
      "application/x-ms-application"
    ],
    [
      "apr",
      "application/vnd.lotus-approach"
    ],
    [
      "arc",
      "application/x-freearc"
    ],
    [
      "arj",
      "application/x-arj"
    ],
    [
      "asc",
      "application/pgp-signature"
    ],
    [
      "asf",
      "video/x-ms-asf"
    ],
    [
      "asm",
      "text/x-asm"
    ],
    [
      "aso",
      "application/vnd.accpac.simply.aso"
    ],
    [
      "asx",
      "video/x-ms-asf"
    ],
    [
      "atc",
      "application/vnd.acucorp"
    ],
    [
      "atom",
      "application/atom+xml"
    ],
    [
      "atomcat",
      "application/atomcat+xml"
    ],
    [
      "atomdeleted",
      "application/atomdeleted+xml"
    ],
    [
      "atomsvc",
      "application/atomsvc+xml"
    ],
    [
      "atx",
      "application/vnd.antix.game-component"
    ],
    [
      "au",
      "audio/x-au"
    ],
    [
      "avi",
      "video/x-msvideo"
    ],
    [
      "avif",
      "image/avif"
    ],
    [
      "aw",
      "application/applixware"
    ],
    [
      "azf",
      "application/vnd.airzip.filesecure.azf"
    ],
    [
      "azs",
      "application/vnd.airzip.filesecure.azs"
    ],
    [
      "azv",
      "image/vnd.airzip.accelerator.azv"
    ],
    [
      "azw",
      "application/vnd.amazon.ebook"
    ],
    [
      "b16",
      "image/vnd.pco.b16"
    ],
    [
      "bat",
      "application/x-msdownload"
    ],
    [
      "bcpio",
      "application/x-bcpio"
    ],
    [
      "bdf",
      "application/x-font-bdf"
    ],
    [
      "bdm",
      "application/vnd.syncml.dm+wbxml"
    ],
    [
      "bdoc",
      "application/x-bdoc"
    ],
    [
      "bed",
      "application/vnd.realvnc.bed"
    ],
    [
      "bh2",
      "application/vnd.fujitsu.oasysprs"
    ],
    [
      "bin",
      "application/octet-stream"
    ],
    [
      "blb",
      "application/x-blorb"
    ],
    [
      "blorb",
      "application/x-blorb"
    ],
    [
      "bmi",
      "application/vnd.bmi"
    ],
    [
      "bmml",
      "application/vnd.balsamiq.bmml+xml"
    ],
    [
      "bmp",
      "image/bmp"
    ],
    [
      "book",
      "application/vnd.framemaker"
    ],
    [
      "box",
      "application/vnd.previewsystems.box"
    ],
    [
      "boz",
      "application/x-bzip2"
    ],
    [
      "bpk",
      "application/octet-stream"
    ],
    [
      "bpmn",
      "application/octet-stream"
    ],
    [
      "bsp",
      "model/vnd.valve.source.compiled-map"
    ],
    [
      "btif",
      "image/prs.btif"
    ],
    [
      "buffer",
      "application/octet-stream"
    ],
    [
      "bz",
      "application/x-bzip"
    ],
    [
      "bz2",
      "application/x-bzip2"
    ],
    [
      "c",
      "text/x-c"
    ],
    [
      "c4d",
      "application/vnd.clonk.c4group"
    ],
    [
      "c4f",
      "application/vnd.clonk.c4group"
    ],
    [
      "c4g",
      "application/vnd.clonk.c4group"
    ],
    [
      "c4p",
      "application/vnd.clonk.c4group"
    ],
    [
      "c4u",
      "application/vnd.clonk.c4group"
    ],
    [
      "c11amc",
      "application/vnd.cluetrust.cartomobile-config"
    ],
    [
      "c11amz",
      "application/vnd.cluetrust.cartomobile-config-pkg"
    ],
    [
      "cab",
      "application/vnd.ms-cab-compressed"
    ],
    [
      "caf",
      "audio/x-caf"
    ],
    [
      "cap",
      "application/vnd.tcpdump.pcap"
    ],
    [
      "car",
      "application/vnd.curl.car"
    ],
    [
      "cat",
      "application/vnd.ms-pki.seccat"
    ],
    [
      "cb7",
      "application/x-cbr"
    ],
    [
      "cba",
      "application/x-cbr"
    ],
    [
      "cbr",
      "application/x-cbr"
    ],
    [
      "cbt",
      "application/x-cbr"
    ],
    [
      "cbz",
      "application/x-cbr"
    ],
    [
      "cc",
      "text/x-c"
    ],
    [
      "cco",
      "application/x-cocoa"
    ],
    [
      "cct",
      "application/x-director"
    ],
    [
      "ccxml",
      "application/ccxml+xml"
    ],
    [
      "cdbcmsg",
      "application/vnd.contact.cmsg"
    ],
    [
      "cda",
      "application/x-cdf"
    ],
    [
      "cdf",
      "application/x-netcdf"
    ],
    [
      "cdfx",
      "application/cdfx+xml"
    ],
    [
      "cdkey",
      "application/vnd.mediastation.cdkey"
    ],
    [
      "cdmia",
      "application/cdmi-capability"
    ],
    [
      "cdmic",
      "application/cdmi-container"
    ],
    [
      "cdmid",
      "application/cdmi-domain"
    ],
    [
      "cdmio",
      "application/cdmi-object"
    ],
    [
      "cdmiq",
      "application/cdmi-queue"
    ],
    [
      "cdr",
      "application/cdr"
    ],
    [
      "cdx",
      "chemical/x-cdx"
    ],
    [
      "cdxml",
      "application/vnd.chemdraw+xml"
    ],
    [
      "cdy",
      "application/vnd.cinderella"
    ],
    [
      "cer",
      "application/pkix-cert"
    ],
    [
      "cfs",
      "application/x-cfs-compressed"
    ],
    [
      "cgm",
      "image/cgm"
    ],
    [
      "chat",
      "application/x-chat"
    ],
    [
      "chm",
      "application/vnd.ms-htmlhelp"
    ],
    [
      "chrt",
      "application/vnd.kde.kchart"
    ],
    [
      "cif",
      "chemical/x-cif"
    ],
    [
      "cii",
      "application/vnd.anser-web-certificate-issue-initiation"
    ],
    [
      "cil",
      "application/vnd.ms-artgalry"
    ],
    [
      "cjs",
      "application/node"
    ],
    [
      "cla",
      "application/vnd.claymore"
    ],
    [
      "class",
      "application/octet-stream"
    ],
    [
      "clkk",
      "application/vnd.crick.clicker.keyboard"
    ],
    [
      "clkp",
      "application/vnd.crick.clicker.palette"
    ],
    [
      "clkt",
      "application/vnd.crick.clicker.template"
    ],
    [
      "clkw",
      "application/vnd.crick.clicker.wordbank"
    ],
    [
      "clkx",
      "application/vnd.crick.clicker"
    ],
    [
      "clp",
      "application/x-msclip"
    ],
    [
      "cmc",
      "application/vnd.cosmocaller"
    ],
    [
      "cmdf",
      "chemical/x-cmdf"
    ],
    [
      "cml",
      "chemical/x-cml"
    ],
    [
      "cmp",
      "application/vnd.yellowriver-custom-menu"
    ],
    [
      "cmx",
      "image/x-cmx"
    ],
    [
      "cod",
      "application/vnd.rim.cod"
    ],
    [
      "coffee",
      "text/coffeescript"
    ],
    [
      "com",
      "application/x-msdownload"
    ],
    [
      "conf",
      "text/plain"
    ],
    [
      "cpio",
      "application/x-cpio"
    ],
    [
      "cpp",
      "text/x-c"
    ],
    [
      "cpt",
      "application/mac-compactpro"
    ],
    [
      "crd",
      "application/x-mscardfile"
    ],
    [
      "crl",
      "application/pkix-crl"
    ],
    [
      "crt",
      "application/x-x509-ca-cert"
    ],
    [
      "crx",
      "application/x-chrome-extension"
    ],
    [
      "cryptonote",
      "application/vnd.rig.cryptonote"
    ],
    [
      "csh",
      "application/x-csh"
    ],
    [
      "csl",
      "application/vnd.citationstyles.style+xml"
    ],
    [
      "csml",
      "chemical/x-csml"
    ],
    [
      "csp",
      "application/vnd.commonspace"
    ],
    [
      "csr",
      "application/octet-stream"
    ],
    [
      "css",
      "text/css"
    ],
    [
      "cst",
      "application/x-director"
    ],
    [
      "csv",
      "text/csv"
    ],
    [
      "cu",
      "application/cu-seeme"
    ],
    [
      "curl",
      "text/vnd.curl"
    ],
    [
      "cww",
      "application/prs.cww"
    ],
    [
      "cxt",
      "application/x-director"
    ],
    [
      "cxx",
      "text/x-c"
    ],
    [
      "dae",
      "model/vnd.collada+xml"
    ],
    [
      "daf",
      "application/vnd.mobius.daf"
    ],
    [
      "dart",
      "application/vnd.dart"
    ],
    [
      "dataless",
      "application/vnd.fdsn.seed"
    ],
    [
      "davmount",
      "application/davmount+xml"
    ],
    [
      "dbf",
      "application/vnd.dbf"
    ],
    [
      "dbk",
      "application/docbook+xml"
    ],
    [
      "dcr",
      "application/x-director"
    ],
    [
      "dcurl",
      "text/vnd.curl.dcurl"
    ],
    [
      "dd2",
      "application/vnd.oma.dd2+xml"
    ],
    [
      "ddd",
      "application/vnd.fujixerox.ddd"
    ],
    [
      "ddf",
      "application/vnd.syncml.dmddf+xml"
    ],
    [
      "dds",
      "image/vnd.ms-dds"
    ],
    [
      "deb",
      "application/x-debian-package"
    ],
    [
      "def",
      "text/plain"
    ],
    [
      "deploy",
      "application/octet-stream"
    ],
    [
      "der",
      "application/x-x509-ca-cert"
    ],
    [
      "dfac",
      "application/vnd.dreamfactory"
    ],
    [
      "dgc",
      "application/x-dgc-compressed"
    ],
    [
      "dic",
      "text/x-c"
    ],
    [
      "dir",
      "application/x-director"
    ],
    [
      "dis",
      "application/vnd.mobius.dis"
    ],
    [
      "disposition-notification",
      "message/disposition-notification"
    ],
    [
      "dist",
      "application/octet-stream"
    ],
    [
      "distz",
      "application/octet-stream"
    ],
    [
      "djv",
      "image/vnd.djvu"
    ],
    [
      "djvu",
      "image/vnd.djvu"
    ],
    [
      "dll",
      "application/octet-stream"
    ],
    [
      "dmg",
      "application/x-apple-diskimage"
    ],
    [
      "dmn",
      "application/octet-stream"
    ],
    [
      "dmp",
      "application/vnd.tcpdump.pcap"
    ],
    [
      "dms",
      "application/octet-stream"
    ],
    [
      "dna",
      "application/vnd.dna"
    ],
    [
      "doc",
      "application/msword"
    ],
    [
      "docm",
      "application/vnd.ms-word.template.macroEnabled.12"
    ],
    [
      "docx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ],
    [
      "dot",
      "application/msword"
    ],
    [
      "dotm",
      "application/vnd.ms-word.template.macroEnabled.12"
    ],
    [
      "dotx",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.template"
    ],
    [
      "dp",
      "application/vnd.osgi.dp"
    ],
    [
      "dpg",
      "application/vnd.dpgraph"
    ],
    [
      "dra",
      "audio/vnd.dra"
    ],
    [
      "drle",
      "image/dicom-rle"
    ],
    [
      "dsc",
      "text/prs.lines.tag"
    ],
    [
      "dssc",
      "application/dssc+der"
    ],
    [
      "dtb",
      "application/x-dtbook+xml"
    ],
    [
      "dtd",
      "application/xml-dtd"
    ],
    [
      "dts",
      "audio/vnd.dts"
    ],
    [
      "dtshd",
      "audio/vnd.dts.hd"
    ],
    [
      "dump",
      "application/octet-stream"
    ],
    [
      "dvb",
      "video/vnd.dvb.file"
    ],
    [
      "dvi",
      "application/x-dvi"
    ],
    [
      "dwd",
      "application/atsc-dwd+xml"
    ],
    [
      "dwf",
      "model/vnd.dwf"
    ],
    [
      "dwg",
      "image/vnd.dwg"
    ],
    [
      "dxf",
      "image/vnd.dxf"
    ],
    [
      "dxp",
      "application/vnd.spotfire.dxp"
    ],
    [
      "dxr",
      "application/x-director"
    ],
    [
      "ear",
      "application/java-archive"
    ],
    [
      "ecelp4800",
      "audio/vnd.nuera.ecelp4800"
    ],
    [
      "ecelp7470",
      "audio/vnd.nuera.ecelp7470"
    ],
    [
      "ecelp9600",
      "audio/vnd.nuera.ecelp9600"
    ],
    [
      "ecma",
      "application/ecmascript"
    ],
    [
      "edm",
      "application/vnd.novadigm.edm"
    ],
    [
      "edx",
      "application/vnd.novadigm.edx"
    ],
    [
      "efif",
      "application/vnd.picsel"
    ],
    [
      "ei6",
      "application/vnd.pg.osasli"
    ],
    [
      "elc",
      "application/octet-stream"
    ],
    [
      "emf",
      "image/emf"
    ],
    [
      "eml",
      "message/rfc822"
    ],
    [
      "emma",
      "application/emma+xml"
    ],
    [
      "emotionml",
      "application/emotionml+xml"
    ],
    [
      "emz",
      "application/x-msmetafile"
    ],
    [
      "eol",
      "audio/vnd.digital-winds"
    ],
    [
      "eot",
      "application/vnd.ms-fontobject"
    ],
    [
      "eps",
      "application/postscript"
    ],
    [
      "epub",
      "application/epub+zip"
    ],
    [
      "es",
      "application/ecmascript"
    ],
    [
      "es3",
      "application/vnd.eszigno3+xml"
    ],
    [
      "esa",
      "application/vnd.osgi.subsystem"
    ],
    [
      "esf",
      "application/vnd.epson.esf"
    ],
    [
      "et3",
      "application/vnd.eszigno3+xml"
    ],
    [
      "etx",
      "text/x-setext"
    ],
    [
      "eva",
      "application/x-eva"
    ],
    [
      "evy",
      "application/x-envoy"
    ],
    [
      "exe",
      "application/octet-stream"
    ],
    [
      "exi",
      "application/exi"
    ],
    [
      "exp",
      "application/express"
    ],
    [
      "exr",
      "image/aces"
    ],
    [
      "ext",
      "application/vnd.novadigm.ext"
    ],
    [
      "ez",
      "application/andrew-inset"
    ],
    [
      "ez2",
      "application/vnd.ezpix-album"
    ],
    [
      "ez3",
      "application/vnd.ezpix-package"
    ],
    [
      "f",
      "text/x-fortran"
    ],
    [
      "f4v",
      "video/mp4"
    ],
    [
      "f77",
      "text/x-fortran"
    ],
    [
      "f90",
      "text/x-fortran"
    ],
    [
      "fbs",
      "image/vnd.fastbidsheet"
    ],
    [
      "fcdt",
      "application/vnd.adobe.formscentral.fcdt"
    ],
    [
      "fcs",
      "application/vnd.isac.fcs"
    ],
    [
      "fdf",
      "application/vnd.fdf"
    ],
    [
      "fdt",
      "application/fdt+xml"
    ],
    [
      "fe_launch",
      "application/vnd.denovo.fcselayout-link"
    ],
    [
      "fg5",
      "application/vnd.fujitsu.oasysgp"
    ],
    [
      "fgd",
      "application/x-director"
    ],
    [
      "fh",
      "image/x-freehand"
    ],
    [
      "fh4",
      "image/x-freehand"
    ],
    [
      "fh5",
      "image/x-freehand"
    ],
    [
      "fh7",
      "image/x-freehand"
    ],
    [
      "fhc",
      "image/x-freehand"
    ],
    [
      "fig",
      "application/x-xfig"
    ],
    [
      "fits",
      "image/fits"
    ],
    [
      "flac",
      "audio/x-flac"
    ],
    [
      "fli",
      "video/x-fli"
    ],
    [
      "flo",
      "application/vnd.micrografx.flo"
    ],
    [
      "flv",
      "video/x-flv"
    ],
    [
      "flw",
      "application/vnd.kde.kivio"
    ],
    [
      "flx",
      "text/vnd.fmi.flexstor"
    ],
    [
      "fly",
      "text/vnd.fly"
    ],
    [
      "fm",
      "application/vnd.framemaker"
    ],
    [
      "fnc",
      "application/vnd.frogans.fnc"
    ],
    [
      "fo",
      "application/vnd.software602.filler.form+xml"
    ],
    [
      "for",
      "text/x-fortran"
    ],
    [
      "fpx",
      "image/vnd.fpx"
    ],
    [
      "frame",
      "application/vnd.framemaker"
    ],
    [
      "fsc",
      "application/vnd.fsc.weblaunch"
    ],
    [
      "fst",
      "image/vnd.fst"
    ],
    [
      "ftc",
      "application/vnd.fluxtime.clip"
    ],
    [
      "fti",
      "application/vnd.anser-web-funds-transfer-initiation"
    ],
    [
      "fvt",
      "video/vnd.fvt"
    ],
    [
      "fxp",
      "application/vnd.adobe.fxp"
    ],
    [
      "fxpl",
      "application/vnd.adobe.fxp"
    ],
    [
      "fzs",
      "application/vnd.fuzzysheet"
    ],
    [
      "g2w",
      "application/vnd.geoplan"
    ],
    [
      "g3",
      "image/g3fax"
    ],
    [
      "g3w",
      "application/vnd.geospace"
    ],
    [
      "gac",
      "application/vnd.groove-account"
    ],
    [
      "gam",
      "application/x-tads"
    ],
    [
      "gbr",
      "application/rpki-ghostbusters"
    ],
    [
      "gca",
      "application/x-gca-compressed"
    ],
    [
      "gdl",
      "model/vnd.gdl"
    ],
    [
      "gdoc",
      "application/vnd.google-apps.document"
    ],
    [
      "geo",
      "application/vnd.dynageo"
    ],
    [
      "geojson",
      "application/geo+json"
    ],
    [
      "gex",
      "application/vnd.geometry-explorer"
    ],
    [
      "ggb",
      "application/vnd.geogebra.file"
    ],
    [
      "ggt",
      "application/vnd.geogebra.tool"
    ],
    [
      "ghf",
      "application/vnd.groove-help"
    ],
    [
      "gif",
      "image/gif"
    ],
    [
      "gim",
      "application/vnd.groove-identity-message"
    ],
    [
      "glb",
      "model/gltf-binary"
    ],
    [
      "gltf",
      "model/gltf+json"
    ],
    [
      "gml",
      "application/gml+xml"
    ],
    [
      "gmx",
      "application/vnd.gmx"
    ],
    [
      "gnumeric",
      "application/x-gnumeric"
    ],
    [
      "gpg",
      "application/gpg-keys"
    ],
    [
      "gph",
      "application/vnd.flographit"
    ],
    [
      "gpx",
      "application/gpx+xml"
    ],
    [
      "gqf",
      "application/vnd.grafeq"
    ],
    [
      "gqs",
      "application/vnd.grafeq"
    ],
    [
      "gram",
      "application/srgs"
    ],
    [
      "gramps",
      "application/x-gramps-xml"
    ],
    [
      "gre",
      "application/vnd.geometry-explorer"
    ],
    [
      "grv",
      "application/vnd.groove-injector"
    ],
    [
      "grxml",
      "application/srgs+xml"
    ],
    [
      "gsf",
      "application/x-font-ghostscript"
    ],
    [
      "gsheet",
      "application/vnd.google-apps.spreadsheet"
    ],
    [
      "gslides",
      "application/vnd.google-apps.presentation"
    ],
    [
      "gtar",
      "application/x-gtar"
    ],
    [
      "gtm",
      "application/vnd.groove-tool-message"
    ],
    [
      "gtw",
      "model/vnd.gtw"
    ],
    [
      "gv",
      "text/vnd.graphviz"
    ],
    [
      "gxf",
      "application/gxf"
    ],
    [
      "gxt",
      "application/vnd.geonext"
    ],
    [
      "gz",
      "application/gzip"
    ],
    [
      "gzip",
      "application/gzip"
    ],
    [
      "h",
      "text/x-c"
    ],
    [
      "h261",
      "video/h261"
    ],
    [
      "h263",
      "video/h263"
    ],
    [
      "h264",
      "video/h264"
    ],
    [
      "hal",
      "application/vnd.hal+xml"
    ],
    [
      "hbci",
      "application/vnd.hbci"
    ],
    [
      "hbs",
      "text/x-handlebars-template"
    ],
    [
      "hdd",
      "application/x-virtualbox-hdd"
    ],
    [
      "hdf",
      "application/x-hdf"
    ],
    [
      "heic",
      "image/heic"
    ],
    [
      "heics",
      "image/heic-sequence"
    ],
    [
      "heif",
      "image/heif"
    ],
    [
      "heifs",
      "image/heif-sequence"
    ],
    [
      "hej2",
      "image/hej2k"
    ],
    [
      "held",
      "application/atsc-held+xml"
    ],
    [
      "hh",
      "text/x-c"
    ],
    [
      "hjson",
      "application/hjson"
    ],
    [
      "hlp",
      "application/winhlp"
    ],
    [
      "hpgl",
      "application/vnd.hp-hpgl"
    ],
    [
      "hpid",
      "application/vnd.hp-hpid"
    ],
    [
      "hps",
      "application/vnd.hp-hps"
    ],
    [
      "hqx",
      "application/mac-binhex40"
    ],
    [
      "hsj2",
      "image/hsj2"
    ],
    [
      "htc",
      "text/x-component"
    ],
    [
      "htke",
      "application/vnd.kenameaapp"
    ],
    [
      "htm",
      "text/html"
    ],
    [
      "html",
      "text/html"
    ],
    [
      "hvd",
      "application/vnd.yamaha.hv-dic"
    ],
    [
      "hvp",
      "application/vnd.yamaha.hv-voice"
    ],
    [
      "hvs",
      "application/vnd.yamaha.hv-script"
    ],
    [
      "i2g",
      "application/vnd.intergeo"
    ],
    [
      "icc",
      "application/vnd.iccprofile"
    ],
    [
      "ice",
      "x-conference/x-cooltalk"
    ],
    [
      "icm",
      "application/vnd.iccprofile"
    ],
    [
      "ico",
      "image/x-icon"
    ],
    [
      "ics",
      "text/calendar"
    ],
    [
      "ief",
      "image/ief"
    ],
    [
      "ifb",
      "text/calendar"
    ],
    [
      "ifm",
      "application/vnd.shana.informed.formdata"
    ],
    [
      "iges",
      "model/iges"
    ],
    [
      "igl",
      "application/vnd.igloader"
    ],
    [
      "igm",
      "application/vnd.insors.igm"
    ],
    [
      "igs",
      "model/iges"
    ],
    [
      "igx",
      "application/vnd.micrografx.igx"
    ],
    [
      "iif",
      "application/vnd.shana.informed.interchange"
    ],
    [
      "img",
      "application/octet-stream"
    ],
    [
      "imp",
      "application/vnd.accpac.simply.imp"
    ],
    [
      "ims",
      "application/vnd.ms-ims"
    ],
    [
      "in",
      "text/plain"
    ],
    [
      "ini",
      "text/plain"
    ],
    [
      "ink",
      "application/inkml+xml"
    ],
    [
      "inkml",
      "application/inkml+xml"
    ],
    [
      "install",
      "application/x-install-instructions"
    ],
    [
      "iota",
      "application/vnd.astraea-software.iota"
    ],
    [
      "ipfix",
      "application/ipfix"
    ],
    [
      "ipk",
      "application/vnd.shana.informed.package"
    ],
    [
      "irm",
      "application/vnd.ibm.rights-management"
    ],
    [
      "irp",
      "application/vnd.irepository.package+xml"
    ],
    [
      "iso",
      "application/x-iso9660-image"
    ],
    [
      "itp",
      "application/vnd.shana.informed.formtemplate"
    ],
    [
      "its",
      "application/its+xml"
    ],
    [
      "ivp",
      "application/vnd.immervision-ivp"
    ],
    [
      "ivu",
      "application/vnd.immervision-ivu"
    ],
    [
      "jad",
      "text/vnd.sun.j2me.app-descriptor"
    ],
    [
      "jade",
      "text/jade"
    ],
    [
      "jam",
      "application/vnd.jam"
    ],
    [
      "jar",
      "application/java-archive"
    ],
    [
      "jardiff",
      "application/x-java-archive-diff"
    ],
    [
      "java",
      "text/x-java-source"
    ],
    [
      "jhc",
      "image/jphc"
    ],
    [
      "jisp",
      "application/vnd.jisp"
    ],
    [
      "jls",
      "image/jls"
    ],
    [
      "jlt",
      "application/vnd.hp-jlyt"
    ],
    [
      "jng",
      "image/x-jng"
    ],
    [
      "jnlp",
      "application/x-java-jnlp-file"
    ],
    [
      "joda",
      "application/vnd.joost.joda-archive"
    ],
    [
      "jp2",
      "image/jp2"
    ],
    [
      "jpe",
      "image/jpeg"
    ],
    [
      "jpeg",
      "image/jpeg"
    ],
    [
      "jpf",
      "image/jpx"
    ],
    [
      "jpg",
      "image/jpeg"
    ],
    [
      "jpg2",
      "image/jp2"
    ],
    [
      "jpgm",
      "video/jpm"
    ],
    [
      "jpgv",
      "video/jpeg"
    ],
    [
      "jph",
      "image/jph"
    ],
    [
      "jpm",
      "video/jpm"
    ],
    [
      "jpx",
      "image/jpx"
    ],
    [
      "js",
      "application/javascript"
    ],
    [
      "json",
      "application/json"
    ],
    [
      "json5",
      "application/json5"
    ],
    [
      "jsonld",
      "application/ld+json"
    ],
    [
      "jsonl",
      "application/jsonl"
    ],
    [
      "jsonml",
      "application/jsonml+json"
    ],
    [
      "jsx",
      "text/jsx"
    ],
    [
      "jxr",
      "image/jxr"
    ],
    [
      "jxra",
      "image/jxra"
    ],
    [
      "jxrs",
      "image/jxrs"
    ],
    [
      "jxs",
      "image/jxs"
    ],
    [
      "jxsc",
      "image/jxsc"
    ],
    [
      "jxsi",
      "image/jxsi"
    ],
    [
      "jxss",
      "image/jxss"
    ],
    [
      "kar",
      "audio/midi"
    ],
    [
      "karbon",
      "application/vnd.kde.karbon"
    ],
    [
      "kdb",
      "application/octet-stream"
    ],
    [
      "kdbx",
      "application/x-keepass2"
    ],
    [
      "key",
      "application/x-iwork-keynote-sffkey"
    ],
    [
      "kfo",
      "application/vnd.kde.kformula"
    ],
    [
      "kia",
      "application/vnd.kidspiration"
    ],
    [
      "kml",
      "application/vnd.google-earth.kml+xml"
    ],
    [
      "kmz",
      "application/vnd.google-earth.kmz"
    ],
    [
      "kne",
      "application/vnd.kinar"
    ],
    [
      "knp",
      "application/vnd.kinar"
    ],
    [
      "kon",
      "application/vnd.kde.kontour"
    ],
    [
      "kpr",
      "application/vnd.kde.kpresenter"
    ],
    [
      "kpt",
      "application/vnd.kde.kpresenter"
    ],
    [
      "kpxx",
      "application/vnd.ds-keypoint"
    ],
    [
      "ksp",
      "application/vnd.kde.kspread"
    ],
    [
      "ktr",
      "application/vnd.kahootz"
    ],
    [
      "ktx",
      "image/ktx"
    ],
    [
      "ktx2",
      "image/ktx2"
    ],
    [
      "ktz",
      "application/vnd.kahootz"
    ],
    [
      "kwd",
      "application/vnd.kde.kword"
    ],
    [
      "kwt",
      "application/vnd.kde.kword"
    ],
    [
      "lasxml",
      "application/vnd.las.las+xml"
    ],
    [
      "latex",
      "application/x-latex"
    ],
    [
      "lbd",
      "application/vnd.llamagraphics.life-balance.desktop"
    ],
    [
      "lbe",
      "application/vnd.llamagraphics.life-balance.exchange+xml"
    ],
    [
      "les",
      "application/vnd.hhe.lesson-player"
    ],
    [
      "less",
      "text/less"
    ],
    [
      "lgr",
      "application/lgr+xml"
    ],
    [
      "lha",
      "application/octet-stream"
    ],
    [
      "link66",
      "application/vnd.route66.link66+xml"
    ],
    [
      "list",
      "text/plain"
    ],
    [
      "list3820",
      "application/vnd.ibm.modcap"
    ],
    [
      "listafp",
      "application/vnd.ibm.modcap"
    ],
    [
      "litcoffee",
      "text/coffeescript"
    ],
    [
      "lnk",
      "application/x-ms-shortcut"
    ],
    [
      "log",
      "text/plain"
    ],
    [
      "lostxml",
      "application/lost+xml"
    ],
    [
      "lrf",
      "application/octet-stream"
    ],
    [
      "lrm",
      "application/vnd.ms-lrm"
    ],
    [
      "ltf",
      "application/vnd.frogans.ltf"
    ],
    [
      "lua",
      "text/x-lua"
    ],
    [
      "luac",
      "application/x-lua-bytecode"
    ],
    [
      "lvp",
      "audio/vnd.lucent.voice"
    ],
    [
      "lwp",
      "application/vnd.lotus-wordpro"
    ],
    [
      "lzh",
      "application/octet-stream"
    ],
    [
      "m1v",
      "video/mpeg"
    ],
    [
      "m2a",
      "audio/mpeg"
    ],
    [
      "m2v",
      "video/mpeg"
    ],
    [
      "m3a",
      "audio/mpeg"
    ],
    [
      "m3u",
      "text/plain"
    ],
    [
      "m3u8",
      "application/vnd.apple.mpegurl"
    ],
    [
      "m4a",
      "audio/x-m4a"
    ],
    [
      "m4p",
      "application/mp4"
    ],
    [
      "m4s",
      "video/iso.segment"
    ],
    [
      "m4u",
      "application/vnd.mpegurl"
    ],
    [
      "m4v",
      "video/x-m4v"
    ],
    [
      "m13",
      "application/x-msmediaview"
    ],
    [
      "m14",
      "application/x-msmediaview"
    ],
    [
      "m21",
      "application/mp21"
    ],
    [
      "ma",
      "application/mathematica"
    ],
    [
      "mads",
      "application/mads+xml"
    ],
    [
      "maei",
      "application/mmt-aei+xml"
    ],
    [
      "mag",
      "application/vnd.ecowin.chart"
    ],
    [
      "maker",
      "application/vnd.framemaker"
    ],
    [
      "man",
      "text/troff"
    ],
    [
      "manifest",
      "text/cache-manifest"
    ],
    [
      "map",
      "application/json"
    ],
    [
      "mar",
      "application/octet-stream"
    ],
    [
      "markdown",
      "text/markdown"
    ],
    [
      "mathml",
      "application/mathml+xml"
    ],
    [
      "mb",
      "application/mathematica"
    ],
    [
      "mbk",
      "application/vnd.mobius.mbk"
    ],
    [
      "mbox",
      "application/mbox"
    ],
    [
      "mc1",
      "application/vnd.medcalcdata"
    ],
    [
      "mcd",
      "application/vnd.mcd"
    ],
    [
      "mcurl",
      "text/vnd.curl.mcurl"
    ],
    [
      "md",
      "text/markdown"
    ],
    [
      "mdb",
      "application/x-msaccess"
    ],
    [
      "mdi",
      "image/vnd.ms-modi"
    ],
    [
      "mdx",
      "text/mdx"
    ],
    [
      "me",
      "text/troff"
    ],
    [
      "mesh",
      "model/mesh"
    ],
    [
      "meta4",
      "application/metalink4+xml"
    ],
    [
      "metalink",
      "application/metalink+xml"
    ],
    [
      "mets",
      "application/mets+xml"
    ],
    [
      "mfm",
      "application/vnd.mfmp"
    ],
    [
      "mft",
      "application/rpki-manifest"
    ],
    [
      "mgp",
      "application/vnd.osgeo.mapguide.package"
    ],
    [
      "mgz",
      "application/vnd.proteus.magazine"
    ],
    [
      "mid",
      "audio/midi"
    ],
    [
      "midi",
      "audio/midi"
    ],
    [
      "mie",
      "application/x-mie"
    ],
    [
      "mif",
      "application/vnd.mif"
    ],
    [
      "mime",
      "message/rfc822"
    ],
    [
      "mj2",
      "video/mj2"
    ],
    [
      "mjp2",
      "video/mj2"
    ],
    [
      "mjs",
      "application/javascript"
    ],
    [
      "mk3d",
      "video/x-matroska"
    ],
    [
      "mka",
      "audio/x-matroska"
    ],
    [
      "mkd",
      "text/x-markdown"
    ],
    [
      "mks",
      "video/x-matroska"
    ],
    [
      "mkv",
      "video/x-matroska"
    ],
    [
      "mlp",
      "application/vnd.dolby.mlp"
    ],
    [
      "mmd",
      "application/vnd.chipnuts.karaoke-mmd"
    ],
    [
      "mmf",
      "application/vnd.smaf"
    ],
    [
      "mml",
      "text/mathml"
    ],
    [
      "mmr",
      "image/vnd.fujixerox.edmics-mmr"
    ],
    [
      "mng",
      "video/x-mng"
    ],
    [
      "mny",
      "application/x-msmoney"
    ],
    [
      "mobi",
      "application/x-mobipocket-ebook"
    ],
    [
      "mods",
      "application/mods+xml"
    ],
    [
      "mov",
      "video/quicktime"
    ],
    [
      "movie",
      "video/x-sgi-movie"
    ],
    [
      "mp2",
      "audio/mpeg"
    ],
    [
      "mp2a",
      "audio/mpeg"
    ],
    [
      "mp3",
      "audio/mpeg"
    ],
    [
      "mp4",
      "video/mp4"
    ],
    [
      "mp4a",
      "audio/mp4"
    ],
    [
      "mp4s",
      "application/mp4"
    ],
    [
      "mp4v",
      "video/mp4"
    ],
    [
      "mp21",
      "application/mp21"
    ],
    [
      "mpc",
      "application/vnd.mophun.certificate"
    ],
    [
      "mpd",
      "application/dash+xml"
    ],
    [
      "mpe",
      "video/mpeg"
    ],
    [
      "mpeg",
      "video/mpeg"
    ],
    [
      "mpg",
      "video/mpeg"
    ],
    [
      "mpg4",
      "video/mp4"
    ],
    [
      "mpga",
      "audio/mpeg"
    ],
    [
      "mpkg",
      "application/vnd.apple.installer+xml"
    ],
    [
      "mpm",
      "application/vnd.blueice.multipass"
    ],
    [
      "mpn",
      "application/vnd.mophun.application"
    ],
    [
      "mpp",
      "application/vnd.ms-project"
    ],
    [
      "mpt",
      "application/vnd.ms-project"
    ],
    [
      "mpy",
      "application/vnd.ibm.minipay"
    ],
    [
      "mqy",
      "application/vnd.mobius.mqy"
    ],
    [
      "mrc",
      "application/marc"
    ],
    [
      "mrcx",
      "application/marcxml+xml"
    ],
    [
      "ms",
      "text/troff"
    ],
    [
      "mscml",
      "application/mediaservercontrol+xml"
    ],
    [
      "mseed",
      "application/vnd.fdsn.mseed"
    ],
    [
      "mseq",
      "application/vnd.mseq"
    ],
    [
      "msf",
      "application/vnd.epson.msf"
    ],
    [
      "msg",
      "application/vnd.ms-outlook"
    ],
    [
      "msh",
      "model/mesh"
    ],
    [
      "msi",
      "application/x-msdownload"
    ],
    [
      "msl",
      "application/vnd.mobius.msl"
    ],
    [
      "msm",
      "application/octet-stream"
    ],
    [
      "msp",
      "application/octet-stream"
    ],
    [
      "msty",
      "application/vnd.muvee.style"
    ],
    [
      "mtl",
      "model/mtl"
    ],
    [
      "mts",
      "model/vnd.mts"
    ],
    [
      "mus",
      "application/vnd.musician"
    ],
    [
      "musd",
      "application/mmt-usd+xml"
    ],
    [
      "musicxml",
      "application/vnd.recordare.musicxml+xml"
    ],
    [
      "mvb",
      "application/x-msmediaview"
    ],
    [
      "mvt",
      "application/vnd.mapbox-vector-tile"
    ],
    [
      "mwf",
      "application/vnd.mfer"
    ],
    [
      "mxf",
      "application/mxf"
    ],
    [
      "mxl",
      "application/vnd.recordare.musicxml"
    ],
    [
      "mxmf",
      "audio/mobile-xmf"
    ],
    [
      "mxml",
      "application/xv+xml"
    ],
    [
      "mxs",
      "application/vnd.triscape.mxs"
    ],
    [
      "mxu",
      "video/vnd.mpegurl"
    ],
    [
      "n-gage",
      "application/vnd.nokia.n-gage.symbian.install"
    ],
    [
      "n3",
      "text/n3"
    ],
    [
      "nb",
      "application/mathematica"
    ],
    [
      "nbp",
      "application/vnd.wolfram.player"
    ],
    [
      "nc",
      "application/x-netcdf"
    ],
    [
      "ncx",
      "application/x-dtbncx+xml"
    ],
    [
      "nfo",
      "text/x-nfo"
    ],
    [
      "ngdat",
      "application/vnd.nokia.n-gage.data"
    ],
    [
      "nitf",
      "application/vnd.nitf"
    ],
    [
      "nlu",
      "application/vnd.neurolanguage.nlu"
    ],
    [
      "nml",
      "application/vnd.enliven"
    ],
    [
      "nnd",
      "application/vnd.noblenet-directory"
    ],
    [
      "nns",
      "application/vnd.noblenet-sealer"
    ],
    [
      "nnw",
      "application/vnd.noblenet-web"
    ],
    [
      "npx",
      "image/vnd.net-fpx"
    ],
    [
      "nq",
      "application/n-quads"
    ],
    [
      "nsc",
      "application/x-conference"
    ],
    [
      "nsf",
      "application/vnd.lotus-notes"
    ],
    [
      "nt",
      "application/n-triples"
    ],
    [
      "ntf",
      "application/vnd.nitf"
    ],
    [
      "numbers",
      "application/x-iwork-numbers-sffnumbers"
    ],
    [
      "nzb",
      "application/x-nzb"
    ],
    [
      "oa2",
      "application/vnd.fujitsu.oasys2"
    ],
    [
      "oa3",
      "application/vnd.fujitsu.oasys3"
    ],
    [
      "oas",
      "application/vnd.fujitsu.oasys"
    ],
    [
      "obd",
      "application/x-msbinder"
    ],
    [
      "obgx",
      "application/vnd.openblox.game+xml"
    ],
    [
      "obj",
      "model/obj"
    ],
    [
      "oda",
      "application/oda"
    ],
    [
      "odb",
      "application/vnd.oasis.opendocument.database"
    ],
    [
      "odc",
      "application/vnd.oasis.opendocument.chart"
    ],
    [
      "odf",
      "application/vnd.oasis.opendocument.formula"
    ],
    [
      "odft",
      "application/vnd.oasis.opendocument.formula-template"
    ],
    [
      "odg",
      "application/vnd.oasis.opendocument.graphics"
    ],
    [
      "odi",
      "application/vnd.oasis.opendocument.image"
    ],
    [
      "odm",
      "application/vnd.oasis.opendocument.text-master"
    ],
    [
      "odp",
      "application/vnd.oasis.opendocument.presentation"
    ],
    [
      "ods",
      "application/vnd.oasis.opendocument.spreadsheet"
    ],
    [
      "odt",
      "application/vnd.oasis.opendocument.text"
    ],
    [
      "oga",
      "audio/ogg"
    ],
    [
      "ogex",
      "model/vnd.opengex"
    ],
    [
      "ogg",
      "audio/ogg"
    ],
    [
      "ogv",
      "video/ogg"
    ],
    [
      "ogx",
      "application/ogg"
    ],
    [
      "omdoc",
      "application/omdoc+xml"
    ],
    [
      "onepkg",
      "application/onenote"
    ],
    [
      "onetmp",
      "application/onenote"
    ],
    [
      "onetoc",
      "application/onenote"
    ],
    [
      "onetoc2",
      "application/onenote"
    ],
    [
      "opf",
      "application/oebps-package+xml"
    ],
    [
      "opml",
      "text/x-opml"
    ],
    [
      "oprc",
      "application/vnd.palm"
    ],
    [
      "opus",
      "audio/ogg"
    ],
    [
      "org",
      "text/x-org"
    ],
    [
      "osf",
      "application/vnd.yamaha.openscoreformat"
    ],
    [
      "osfpvg",
      "application/vnd.yamaha.openscoreformat.osfpvg+xml"
    ],
    [
      "osm",
      "application/vnd.openstreetmap.data+xml"
    ],
    [
      "otc",
      "application/vnd.oasis.opendocument.chart-template"
    ],
    [
      "otf",
      "font/otf"
    ],
    [
      "otg",
      "application/vnd.oasis.opendocument.graphics-template"
    ],
    [
      "oth",
      "application/vnd.oasis.opendocument.text-web"
    ],
    [
      "oti",
      "application/vnd.oasis.opendocument.image-template"
    ],
    [
      "otp",
      "application/vnd.oasis.opendocument.presentation-template"
    ],
    [
      "ots",
      "application/vnd.oasis.opendocument.spreadsheet-template"
    ],
    [
      "ott",
      "application/vnd.oasis.opendocument.text-template"
    ],
    [
      "ova",
      "application/x-virtualbox-ova"
    ],
    [
      "ovf",
      "application/x-virtualbox-ovf"
    ],
    [
      "owl",
      "application/rdf+xml"
    ],
    [
      "oxps",
      "application/oxps"
    ],
    [
      "oxt",
      "application/vnd.openofficeorg.extension"
    ],
    [
      "p",
      "text/x-pascal"
    ],
    [
      "p7a",
      "application/x-pkcs7-signature"
    ],
    [
      "p7b",
      "application/x-pkcs7-certificates"
    ],
    [
      "p7c",
      "application/pkcs7-mime"
    ],
    [
      "p7m",
      "application/pkcs7-mime"
    ],
    [
      "p7r",
      "application/x-pkcs7-certreqresp"
    ],
    [
      "p7s",
      "application/pkcs7-signature"
    ],
    [
      "p8",
      "application/pkcs8"
    ],
    [
      "p10",
      "application/x-pkcs10"
    ],
    [
      "p12",
      "application/x-pkcs12"
    ],
    [
      "pac",
      "application/x-ns-proxy-autoconfig"
    ],
    [
      "pages",
      "application/x-iwork-pages-sffpages"
    ],
    [
      "pas",
      "text/x-pascal"
    ],
    [
      "paw",
      "application/vnd.pawaafile"
    ],
    [
      "pbd",
      "application/vnd.powerbuilder6"
    ],
    [
      "pbm",
      "image/x-portable-bitmap"
    ],
    [
      "pcap",
      "application/vnd.tcpdump.pcap"
    ],
    [
      "pcf",
      "application/x-font-pcf"
    ],
    [
      "pcl",
      "application/vnd.hp-pcl"
    ],
    [
      "pclxl",
      "application/vnd.hp-pclxl"
    ],
    [
      "pct",
      "image/x-pict"
    ],
    [
      "pcurl",
      "application/vnd.curl.pcurl"
    ],
    [
      "pcx",
      "image/x-pcx"
    ],
    [
      "pdb",
      "application/x-pilot"
    ],
    [
      "pde",
      "text/x-processing"
    ],
    [
      "pdf",
      "application/pdf"
    ],
    [
      "pem",
      "application/x-x509-user-cert"
    ],
    [
      "pfa",
      "application/x-font-type1"
    ],
    [
      "pfb",
      "application/x-font-type1"
    ],
    [
      "pfm",
      "application/x-font-type1"
    ],
    [
      "pfr",
      "application/font-tdpfr"
    ],
    [
      "pfx",
      "application/x-pkcs12"
    ],
    [
      "pgm",
      "image/x-portable-graymap"
    ],
    [
      "pgn",
      "application/x-chess-pgn"
    ],
    [
      "pgp",
      "application/pgp"
    ],
    [
      "php",
      "application/x-httpd-php"
    ],
    [
      "php3",
      "application/x-httpd-php"
    ],
    [
      "php4",
      "application/x-httpd-php"
    ],
    [
      "phps",
      "application/x-httpd-php-source"
    ],
    [
      "phtml",
      "application/x-httpd-php"
    ],
    [
      "pic",
      "image/x-pict"
    ],
    [
      "pkg",
      "application/octet-stream"
    ],
    [
      "pki",
      "application/pkixcmp"
    ],
    [
      "pkipath",
      "application/pkix-pkipath"
    ],
    [
      "pkpass",
      "application/vnd.apple.pkpass"
    ],
    [
      "pl",
      "application/x-perl"
    ],
    [
      "plb",
      "application/vnd.3gpp.pic-bw-large"
    ],
    [
      "plc",
      "application/vnd.mobius.plc"
    ],
    [
      "plf",
      "application/vnd.pocketlearn"
    ],
    [
      "pls",
      "application/pls+xml"
    ],
    [
      "pm",
      "application/x-perl"
    ],
    [
      "pml",
      "application/vnd.ctc-posml"
    ],
    [
      "png",
      "image/png"
    ],
    [
      "pnm",
      "image/x-portable-anymap"
    ],
    [
      "portpkg",
      "application/vnd.macports.portpkg"
    ],
    [
      "pot",
      "application/vnd.ms-powerpoint"
    ],
    [
      "potm",
      "application/vnd.ms-powerpoint.presentation.macroEnabled.12"
    ],
    [
      "potx",
      "application/vnd.openxmlformats-officedocument.presentationml.template"
    ],
    [
      "ppa",
      "application/vnd.ms-powerpoint"
    ],
    [
      "ppam",
      "application/vnd.ms-powerpoint.addin.macroEnabled.12"
    ],
    [
      "ppd",
      "application/vnd.cups-ppd"
    ],
    [
      "ppm",
      "image/x-portable-pixmap"
    ],
    [
      "pps",
      "application/vnd.ms-powerpoint"
    ],
    [
      "ppsm",
      "application/vnd.ms-powerpoint.slideshow.macroEnabled.12"
    ],
    [
      "ppsx",
      "application/vnd.openxmlformats-officedocument.presentationml.slideshow"
    ],
    [
      "ppt",
      "application/powerpoint"
    ],
    [
      "pptm",
      "application/vnd.ms-powerpoint.presentation.macroEnabled.12"
    ],
    [
      "pptx",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ],
    [
      "pqa",
      "application/vnd.palm"
    ],
    [
      "prc",
      "application/x-pilot"
    ],
    [
      "pre",
      "application/vnd.lotus-freelance"
    ],
    [
      "prf",
      "application/pics-rules"
    ],
    [
      "provx",
      "application/provenance+xml"
    ],
    [
      "ps",
      "application/postscript"
    ],
    [
      "psb",
      "application/vnd.3gpp.pic-bw-small"
    ],
    [
      "psd",
      "application/x-photoshop"
    ],
    [
      "psf",
      "application/x-font-linux-psf"
    ],
    [
      "pskcxml",
      "application/pskc+xml"
    ],
    [
      "pti",
      "image/prs.pti"
    ],
    [
      "ptid",
      "application/vnd.pvi.ptid1"
    ],
    [
      "pub",
      "application/x-mspublisher"
    ],
    [
      "pvb",
      "application/vnd.3gpp.pic-bw-var"
    ],
    [
      "pwn",
      "application/vnd.3m.post-it-notes"
    ],
    [
      "pya",
      "audio/vnd.ms-playready.media.pya"
    ],
    [
      "pyv",
      "video/vnd.ms-playready.media.pyv"
    ],
    [
      "qam",
      "application/vnd.epson.quickanime"
    ],
    [
      "qbo",
      "application/vnd.intu.qbo"
    ],
    [
      "qfx",
      "application/vnd.intu.qfx"
    ],
    [
      "qps",
      "application/vnd.publishare-delta-tree"
    ],
    [
      "qt",
      "video/quicktime"
    ],
    [
      "qwd",
      "application/vnd.quark.quarkxpress"
    ],
    [
      "qwt",
      "application/vnd.quark.quarkxpress"
    ],
    [
      "qxb",
      "application/vnd.quark.quarkxpress"
    ],
    [
      "qxd",
      "application/vnd.quark.quarkxpress"
    ],
    [
      "qxl",
      "application/vnd.quark.quarkxpress"
    ],
    [
      "qxt",
      "application/vnd.quark.quarkxpress"
    ],
    [
      "ra",
      "audio/x-realaudio"
    ],
    [
      "ram",
      "audio/x-pn-realaudio"
    ],
    [
      "raml",
      "application/raml+yaml"
    ],
    [
      "rapd",
      "application/route-apd+xml"
    ],
    [
      "rar",
      "application/x-rar"
    ],
    [
      "ras",
      "image/x-cmu-raster"
    ],
    [
      "rcprofile",
      "application/vnd.ipunplugged.rcprofile"
    ],
    [
      "rdf",
      "application/rdf+xml"
    ],
    [
      "rdz",
      "application/vnd.data-vision.rdz"
    ],
    [
      "relo",
      "application/p2p-overlay+xml"
    ],
    [
      "rep",
      "application/vnd.businessobjects"
    ],
    [
      "res",
      "application/x-dtbresource+xml"
    ],
    [
      "rgb",
      "image/x-rgb"
    ],
    [
      "rif",
      "application/reginfo+xml"
    ],
    [
      "rip",
      "audio/vnd.rip"
    ],
    [
      "ris",
      "application/x-research-info-systems"
    ],
    [
      "rl",
      "application/resource-lists+xml"
    ],
    [
      "rlc",
      "image/vnd.fujixerox.edmics-rlc"
    ],
    [
      "rld",
      "application/resource-lists-diff+xml"
    ],
    [
      "rm",
      "audio/x-pn-realaudio"
    ],
    [
      "rmi",
      "audio/midi"
    ],
    [
      "rmp",
      "audio/x-pn-realaudio-plugin"
    ],
    [
      "rms",
      "application/vnd.jcp.javame.midlet-rms"
    ],
    [
      "rmvb",
      "application/vnd.rn-realmedia-vbr"
    ],
    [
      "rnc",
      "application/relax-ng-compact-syntax"
    ],
    [
      "rng",
      "application/xml"
    ],
    [
      "roa",
      "application/rpki-roa"
    ],
    [
      "roff",
      "text/troff"
    ],
    [
      "rp9",
      "application/vnd.cloanto.rp9"
    ],
    [
      "rpm",
      "audio/x-pn-realaudio-plugin"
    ],
    [
      "rpss",
      "application/vnd.nokia.radio-presets"
    ],
    [
      "rpst",
      "application/vnd.nokia.radio-preset"
    ],
    [
      "rq",
      "application/sparql-query"
    ],
    [
      "rs",
      "application/rls-services+xml"
    ],
    [
      "rsa",
      "application/x-pkcs7"
    ],
    [
      "rsat",
      "application/atsc-rsat+xml"
    ],
    [
      "rsd",
      "application/rsd+xml"
    ],
    [
      "rsheet",
      "application/urc-ressheet+xml"
    ],
    [
      "rss",
      "application/rss+xml"
    ],
    [
      "rtf",
      "text/rtf"
    ],
    [
      "rtx",
      "text/richtext"
    ],
    [
      "run",
      "application/x-makeself"
    ],
    [
      "rusd",
      "application/route-usd+xml"
    ],
    [
      "rv",
      "video/vnd.rn-realvideo"
    ],
    [
      "s",
      "text/x-asm"
    ],
    [
      "s3m",
      "audio/s3m"
    ],
    [
      "saf",
      "application/vnd.yamaha.smaf-audio"
    ],
    [
      "sass",
      "text/x-sass"
    ],
    [
      "sbml",
      "application/sbml+xml"
    ],
    [
      "sc",
      "application/vnd.ibm.secure-container"
    ],
    [
      "scd",
      "application/x-msschedule"
    ],
    [
      "scm",
      "application/vnd.lotus-screencam"
    ],
    [
      "scq",
      "application/scvp-cv-request"
    ],
    [
      "scs",
      "application/scvp-cv-response"
    ],
    [
      "scss",
      "text/x-scss"
    ],
    [
      "scurl",
      "text/vnd.curl.scurl"
    ],
    [
      "sda",
      "application/vnd.stardivision.draw"
    ],
    [
      "sdc",
      "application/vnd.stardivision.calc"
    ],
    [
      "sdd",
      "application/vnd.stardivision.impress"
    ],
    [
      "sdkd",
      "application/vnd.solent.sdkm+xml"
    ],
    [
      "sdkm",
      "application/vnd.solent.sdkm+xml"
    ],
    [
      "sdp",
      "application/sdp"
    ],
    [
      "sdw",
      "application/vnd.stardivision.writer"
    ],
    [
      "sea",
      "application/octet-stream"
    ],
    [
      "see",
      "application/vnd.seemail"
    ],
    [
      "seed",
      "application/vnd.fdsn.seed"
    ],
    [
      "sema",
      "application/vnd.sema"
    ],
    [
      "semd",
      "application/vnd.semd"
    ],
    [
      "semf",
      "application/vnd.semf"
    ],
    [
      "senmlx",
      "application/senml+xml"
    ],
    [
      "sensmlx",
      "application/sensml+xml"
    ],
    [
      "ser",
      "application/java-serialized-object"
    ],
    [
      "setpay",
      "application/set-payment-initiation"
    ],
    [
      "setreg",
      "application/set-registration-initiation"
    ],
    [
      "sfd-hdstx",
      "application/vnd.hydrostatix.sof-data"
    ],
    [
      "sfs",
      "application/vnd.spotfire.sfs"
    ],
    [
      "sfv",
      "text/x-sfv"
    ],
    [
      "sgi",
      "image/sgi"
    ],
    [
      "sgl",
      "application/vnd.stardivision.writer-global"
    ],
    [
      "sgm",
      "text/sgml"
    ],
    [
      "sgml",
      "text/sgml"
    ],
    [
      "sh",
      "application/x-sh"
    ],
    [
      "shar",
      "application/x-shar"
    ],
    [
      "shex",
      "text/shex"
    ],
    [
      "shf",
      "application/shf+xml"
    ],
    [
      "shtml",
      "text/html"
    ],
    [
      "sid",
      "image/x-mrsid-image"
    ],
    [
      "sieve",
      "application/sieve"
    ],
    [
      "sig",
      "application/pgp-signature"
    ],
    [
      "sil",
      "audio/silk"
    ],
    [
      "silo",
      "model/mesh"
    ],
    [
      "sis",
      "application/vnd.symbian.install"
    ],
    [
      "sisx",
      "application/vnd.symbian.install"
    ],
    [
      "sit",
      "application/x-stuffit"
    ],
    [
      "sitx",
      "application/x-stuffitx"
    ],
    [
      "siv",
      "application/sieve"
    ],
    [
      "skd",
      "application/vnd.koan"
    ],
    [
      "skm",
      "application/vnd.koan"
    ],
    [
      "skp",
      "application/vnd.koan"
    ],
    [
      "skt",
      "application/vnd.koan"
    ],
    [
      "sldm",
      "application/vnd.ms-powerpoint.slide.macroenabled.12"
    ],
    [
      "sldx",
      "application/vnd.openxmlformats-officedocument.presentationml.slide"
    ],
    [
      "slim",
      "text/slim"
    ],
    [
      "slm",
      "text/slim"
    ],
    [
      "sls",
      "application/route-s-tsid+xml"
    ],
    [
      "slt",
      "application/vnd.epson.salt"
    ],
    [
      "sm",
      "application/vnd.stepmania.stepchart"
    ],
    [
      "smf",
      "application/vnd.stardivision.math"
    ],
    [
      "smi",
      "application/smil"
    ],
    [
      "smil",
      "application/smil"
    ],
    [
      "smv",
      "video/x-smv"
    ],
    [
      "smzip",
      "application/vnd.stepmania.package"
    ],
    [
      "snd",
      "audio/basic"
    ],
    [
      "snf",
      "application/x-font-snf"
    ],
    [
      "so",
      "application/octet-stream"
    ],
    [
      "spc",
      "application/x-pkcs7-certificates"
    ],
    [
      "spdx",
      "text/spdx"
    ],
    [
      "spf",
      "application/vnd.yamaha.smaf-phrase"
    ],
    [
      "spl",
      "application/x-futuresplash"
    ],
    [
      "spot",
      "text/vnd.in3d.spot"
    ],
    [
      "spp",
      "application/scvp-vp-response"
    ],
    [
      "spq",
      "application/scvp-vp-request"
    ],
    [
      "spx",
      "audio/ogg"
    ],
    [
      "sql",
      "application/x-sql"
    ],
    [
      "src",
      "application/x-wais-source"
    ],
    [
      "srt",
      "application/x-subrip"
    ],
    [
      "sru",
      "application/sru+xml"
    ],
    [
      "srx",
      "application/sparql-results+xml"
    ],
    [
      "ssdl",
      "application/ssdl+xml"
    ],
    [
      "sse",
      "application/vnd.kodak-descriptor"
    ],
    [
      "ssf",
      "application/vnd.epson.ssf"
    ],
    [
      "ssml",
      "application/ssml+xml"
    ],
    [
      "sst",
      "application/octet-stream"
    ],
    [
      "st",
      "application/vnd.sailingtracker.track"
    ],
    [
      "stc",
      "application/vnd.sun.xml.calc.template"
    ],
    [
      "std",
      "application/vnd.sun.xml.draw.template"
    ],
    [
      "stf",
      "application/vnd.wt.stf"
    ],
    [
      "sti",
      "application/vnd.sun.xml.impress.template"
    ],
    [
      "stk",
      "application/hyperstudio"
    ],
    [
      "stl",
      "model/stl"
    ],
    [
      "stpx",
      "model/step+xml"
    ],
    [
      "stpxz",
      "model/step-xml+zip"
    ],
    [
      "stpz",
      "model/step+zip"
    ],
    [
      "str",
      "application/vnd.pg.format"
    ],
    [
      "stw",
      "application/vnd.sun.xml.writer.template"
    ],
    [
      "styl",
      "text/stylus"
    ],
    [
      "stylus",
      "text/stylus"
    ],
    [
      "sub",
      "text/vnd.dvb.subtitle"
    ],
    [
      "sus",
      "application/vnd.sus-calendar"
    ],
    [
      "susp",
      "application/vnd.sus-calendar"
    ],
    [
      "sv4cpio",
      "application/x-sv4cpio"
    ],
    [
      "sv4crc",
      "application/x-sv4crc"
    ],
    [
      "svc",
      "application/vnd.dvb.service"
    ],
    [
      "svd",
      "application/vnd.svd"
    ],
    [
      "svg",
      "image/svg+xml"
    ],
    [
      "svgz",
      "image/svg+xml"
    ],
    [
      "swa",
      "application/x-director"
    ],
    [
      "swf",
      "application/x-shockwave-flash"
    ],
    [
      "swi",
      "application/vnd.aristanetworks.swi"
    ],
    [
      "swidtag",
      "application/swid+xml"
    ],
    [
      "sxc",
      "application/vnd.sun.xml.calc"
    ],
    [
      "sxd",
      "application/vnd.sun.xml.draw"
    ],
    [
      "sxg",
      "application/vnd.sun.xml.writer.global"
    ],
    [
      "sxi",
      "application/vnd.sun.xml.impress"
    ],
    [
      "sxm",
      "application/vnd.sun.xml.math"
    ],
    [
      "sxw",
      "application/vnd.sun.xml.writer"
    ],
    [
      "t",
      "text/troff"
    ],
    [
      "t3",
      "application/x-t3vm-image"
    ],
    [
      "t38",
      "image/t38"
    ],
    [
      "taglet",
      "application/vnd.mynfc"
    ],
    [
      "tao",
      "application/vnd.tao.intent-module-archive"
    ],
    [
      "tap",
      "image/vnd.tencent.tap"
    ],
    [
      "tar",
      "application/x-tar"
    ],
    [
      "tcap",
      "application/vnd.3gpp2.tcap"
    ],
    [
      "tcl",
      "application/x-tcl"
    ],
    [
      "td",
      "application/urc-targetdesc+xml"
    ],
    [
      "teacher",
      "application/vnd.smart.teacher"
    ],
    [
      "tei",
      "application/tei+xml"
    ],
    [
      "teicorpus",
      "application/tei+xml"
    ],
    [
      "tex",
      "application/x-tex"
    ],
    [
      "texi",
      "application/x-texinfo"
    ],
    [
      "texinfo",
      "application/x-texinfo"
    ],
    [
      "text",
      "text/plain"
    ],
    [
      "tfi",
      "application/thraud+xml"
    ],
    [
      "tfm",
      "application/x-tex-tfm"
    ],
    [
      "tfx",
      "image/tiff-fx"
    ],
    [
      "tga",
      "image/x-tga"
    ],
    [
      "tgz",
      "application/x-tar"
    ],
    [
      "thmx",
      "application/vnd.ms-officetheme"
    ],
    [
      "tif",
      "image/tiff"
    ],
    [
      "tiff",
      "image/tiff"
    ],
    [
      "tk",
      "application/x-tcl"
    ],
    [
      "tmo",
      "application/vnd.tmobile-livetv"
    ],
    [
      "toml",
      "application/toml"
    ],
    [
      "torrent",
      "application/x-bittorrent"
    ],
    [
      "tpl",
      "application/vnd.groove-tool-template"
    ],
    [
      "tpt",
      "application/vnd.trid.tpt"
    ],
    [
      "tr",
      "text/troff"
    ],
    [
      "tra",
      "application/vnd.trueapp"
    ],
    [
      "trig",
      "application/trig"
    ],
    [
      "trm",
      "application/x-msterminal"
    ],
    [
      "ts",
      "video/mp2t"
    ],
    [
      "tsd",
      "application/timestamped-data"
    ],
    [
      "tsv",
      "text/tab-separated-values"
    ],
    [
      "ttc",
      "font/collection"
    ],
    [
      "ttf",
      "font/ttf"
    ],
    [
      "ttl",
      "text/turtle"
    ],
    [
      "ttml",
      "application/ttml+xml"
    ],
    [
      "twd",
      "application/vnd.simtech-mindmapper"
    ],
    [
      "twds",
      "application/vnd.simtech-mindmapper"
    ],
    [
      "txd",
      "application/vnd.genomatix.tuxedo"
    ],
    [
      "txf",
      "application/vnd.mobius.txf"
    ],
    [
      "txt",
      "text/plain"
    ],
    [
      "u8dsn",
      "message/global-delivery-status"
    ],
    [
      "u8hdr",
      "message/global-headers"
    ],
    [
      "u8mdn",
      "message/global-disposition-notification"
    ],
    [
      "u8msg",
      "message/global"
    ],
    [
      "u32",
      "application/x-authorware-bin"
    ],
    [
      "ubj",
      "application/ubjson"
    ],
    [
      "udeb",
      "application/x-debian-package"
    ],
    [
      "ufd",
      "application/vnd.ufdl"
    ],
    [
      "ufdl",
      "application/vnd.ufdl"
    ],
    [
      "ulx",
      "application/x-glulx"
    ],
    [
      "umj",
      "application/vnd.umajin"
    ],
    [
      "unityweb",
      "application/vnd.unity"
    ],
    [
      "uoml",
      "application/vnd.uoml+xml"
    ],
    [
      "uri",
      "text/uri-list"
    ],
    [
      "uris",
      "text/uri-list"
    ],
    [
      "urls",
      "text/uri-list"
    ],
    [
      "usdz",
      "model/vnd.usdz+zip"
    ],
    [
      "ustar",
      "application/x-ustar"
    ],
    [
      "utz",
      "application/vnd.uiq.theme"
    ],
    [
      "uu",
      "text/x-uuencode"
    ],
    [
      "uva",
      "audio/vnd.dece.audio"
    ],
    [
      "uvd",
      "application/vnd.dece.data"
    ],
    [
      "uvf",
      "application/vnd.dece.data"
    ],
    [
      "uvg",
      "image/vnd.dece.graphic"
    ],
    [
      "uvh",
      "video/vnd.dece.hd"
    ],
    [
      "uvi",
      "image/vnd.dece.graphic"
    ],
    [
      "uvm",
      "video/vnd.dece.mobile"
    ],
    [
      "uvp",
      "video/vnd.dece.pd"
    ],
    [
      "uvs",
      "video/vnd.dece.sd"
    ],
    [
      "uvt",
      "application/vnd.dece.ttml+xml"
    ],
    [
      "uvu",
      "video/vnd.uvvu.mp4"
    ],
    [
      "uvv",
      "video/vnd.dece.video"
    ],
    [
      "uvva",
      "audio/vnd.dece.audio"
    ],
    [
      "uvvd",
      "application/vnd.dece.data"
    ],
    [
      "uvvf",
      "application/vnd.dece.data"
    ],
    [
      "uvvg",
      "image/vnd.dece.graphic"
    ],
    [
      "uvvh",
      "video/vnd.dece.hd"
    ],
    [
      "uvvi",
      "image/vnd.dece.graphic"
    ],
    [
      "uvvm",
      "video/vnd.dece.mobile"
    ],
    [
      "uvvp",
      "video/vnd.dece.pd"
    ],
    [
      "uvvs",
      "video/vnd.dece.sd"
    ],
    [
      "uvvt",
      "application/vnd.dece.ttml+xml"
    ],
    [
      "uvvu",
      "video/vnd.uvvu.mp4"
    ],
    [
      "uvvv",
      "video/vnd.dece.video"
    ],
    [
      "uvvx",
      "application/vnd.dece.unspecified"
    ],
    [
      "uvvz",
      "application/vnd.dece.zip"
    ],
    [
      "uvx",
      "application/vnd.dece.unspecified"
    ],
    [
      "uvz",
      "application/vnd.dece.zip"
    ],
    [
      "vbox",
      "application/x-virtualbox-vbox"
    ],
    [
      "vbox-extpack",
      "application/x-virtualbox-vbox-extpack"
    ],
    [
      "vcard",
      "text/vcard"
    ],
    [
      "vcd",
      "application/x-cdlink"
    ],
    [
      "vcf",
      "text/x-vcard"
    ],
    [
      "vcg",
      "application/vnd.groove-vcard"
    ],
    [
      "vcs",
      "text/x-vcalendar"
    ],
    [
      "vcx",
      "application/vnd.vcx"
    ],
    [
      "vdi",
      "application/x-virtualbox-vdi"
    ],
    [
      "vds",
      "model/vnd.sap.vds"
    ],
    [
      "vhd",
      "application/x-virtualbox-vhd"
    ],
    [
      "vis",
      "application/vnd.visionary"
    ],
    [
      "viv",
      "video/vnd.vivo"
    ],
    [
      "vlc",
      "application/videolan"
    ],
    [
      "vmdk",
      "application/x-virtualbox-vmdk"
    ],
    [
      "vob",
      "video/x-ms-vob"
    ],
    [
      "vor",
      "application/vnd.stardivision.writer"
    ],
    [
      "vox",
      "application/x-authorware-bin"
    ],
    [
      "vrml",
      "model/vrml"
    ],
    [
      "vsd",
      "application/vnd.visio"
    ],
    [
      "vsf",
      "application/vnd.vsf"
    ],
    [
      "vss",
      "application/vnd.visio"
    ],
    [
      "vst",
      "application/vnd.visio"
    ],
    [
      "vsw",
      "application/vnd.visio"
    ],
    [
      "vtf",
      "image/vnd.valve.source.texture"
    ],
    [
      "vtt",
      "text/vtt"
    ],
    [
      "vtu",
      "model/vnd.vtu"
    ],
    [
      "vxml",
      "application/voicexml+xml"
    ],
    [
      "w3d",
      "application/x-director"
    ],
    [
      "wad",
      "application/x-doom"
    ],
    [
      "wadl",
      "application/vnd.sun.wadl+xml"
    ],
    [
      "war",
      "application/java-archive"
    ],
    [
      "wasm",
      "application/wasm"
    ],
    [
      "wav",
      "audio/x-wav"
    ],
    [
      "wax",
      "audio/x-ms-wax"
    ],
    [
      "wbmp",
      "image/vnd.wap.wbmp"
    ],
    [
      "wbs",
      "application/vnd.criticaltools.wbs+xml"
    ],
    [
      "wbxml",
      "application/wbxml"
    ],
    [
      "wcm",
      "application/vnd.ms-works"
    ],
    [
      "wdb",
      "application/vnd.ms-works"
    ],
    [
      "wdp",
      "image/vnd.ms-photo"
    ],
    [
      "weba",
      "audio/webm"
    ],
    [
      "webapp",
      "application/x-web-app-manifest+json"
    ],
    [
      "webm",
      "video/webm"
    ],
    [
      "webmanifest",
      "application/manifest+json"
    ],
    [
      "webp",
      "image/webp"
    ],
    [
      "wg",
      "application/vnd.pmi.widget"
    ],
    [
      "wgt",
      "application/widget"
    ],
    [
      "wks",
      "application/vnd.ms-works"
    ],
    [
      "wm",
      "video/x-ms-wm"
    ],
    [
      "wma",
      "audio/x-ms-wma"
    ],
    [
      "wmd",
      "application/x-ms-wmd"
    ],
    [
      "wmf",
      "image/wmf"
    ],
    [
      "wml",
      "text/vnd.wap.wml"
    ],
    [
      "wmlc",
      "application/wmlc"
    ],
    [
      "wmls",
      "text/vnd.wap.wmlscript"
    ],
    [
      "wmlsc",
      "application/vnd.wap.wmlscriptc"
    ],
    [
      "wmv",
      "video/x-ms-wmv"
    ],
    [
      "wmx",
      "video/x-ms-wmx"
    ],
    [
      "wmz",
      "application/x-msmetafile"
    ],
    [
      "woff",
      "font/woff"
    ],
    [
      "woff2",
      "font/woff2"
    ],
    [
      "word",
      "application/msword"
    ],
    [
      "wpd",
      "application/vnd.wordperfect"
    ],
    [
      "wpl",
      "application/vnd.ms-wpl"
    ],
    [
      "wps",
      "application/vnd.ms-works"
    ],
    [
      "wqd",
      "application/vnd.wqd"
    ],
    [
      "wri",
      "application/x-mswrite"
    ],
    [
      "wrl",
      "model/vrml"
    ],
    [
      "wsc",
      "message/vnd.wfa.wsc"
    ],
    [
      "wsdl",
      "application/wsdl+xml"
    ],
    [
      "wspolicy",
      "application/wspolicy+xml"
    ],
    [
      "wtb",
      "application/vnd.webturbo"
    ],
    [
      "wvx",
      "video/x-ms-wvx"
    ],
    [
      "x3d",
      "model/x3d+xml"
    ],
    [
      "x3db",
      "model/x3d+fastinfoset"
    ],
    [
      "x3dbz",
      "model/x3d+binary"
    ],
    [
      "x3dv",
      "model/x3d-vrml"
    ],
    [
      "x3dvz",
      "model/x3d+vrml"
    ],
    [
      "x3dz",
      "model/x3d+xml"
    ],
    [
      "x32",
      "application/x-authorware-bin"
    ],
    [
      "x_b",
      "model/vnd.parasolid.transmit.binary"
    ],
    [
      "x_t",
      "model/vnd.parasolid.transmit.text"
    ],
    [
      "xaml",
      "application/xaml+xml"
    ],
    [
      "xap",
      "application/x-silverlight-app"
    ],
    [
      "xar",
      "application/vnd.xara"
    ],
    [
      "xav",
      "application/xcap-att+xml"
    ],
    [
      "xbap",
      "application/x-ms-xbap"
    ],
    [
      "xbd",
      "application/vnd.fujixerox.docuworks.binder"
    ],
    [
      "xbm",
      "image/x-xbitmap"
    ],
    [
      "xca",
      "application/xcap-caps+xml"
    ],
    [
      "xcs",
      "application/calendar+xml"
    ],
    [
      "xdf",
      "application/xcap-diff+xml"
    ],
    [
      "xdm",
      "application/vnd.syncml.dm+xml"
    ],
    [
      "xdp",
      "application/vnd.adobe.xdp+xml"
    ],
    [
      "xdssc",
      "application/dssc+xml"
    ],
    [
      "xdw",
      "application/vnd.fujixerox.docuworks"
    ],
    [
      "xel",
      "application/xcap-el+xml"
    ],
    [
      "xenc",
      "application/xenc+xml"
    ],
    [
      "xer",
      "application/patch-ops-error+xml"
    ],
    [
      "xfdf",
      "application/vnd.adobe.xfdf"
    ],
    [
      "xfdl",
      "application/vnd.xfdl"
    ],
    [
      "xht",
      "application/xhtml+xml"
    ],
    [
      "xhtml",
      "application/xhtml+xml"
    ],
    [
      "xhvml",
      "application/xv+xml"
    ],
    [
      "xif",
      "image/vnd.xiff"
    ],
    [
      "xl",
      "application/excel"
    ],
    [
      "xla",
      "application/vnd.ms-excel"
    ],
    [
      "xlam",
      "application/vnd.ms-excel.addin.macroEnabled.12"
    ],
    [
      "xlc",
      "application/vnd.ms-excel"
    ],
    [
      "xlf",
      "application/xliff+xml"
    ],
    [
      "xlm",
      "application/vnd.ms-excel"
    ],
    [
      "xls",
      "application/vnd.ms-excel"
    ],
    [
      "xlsb",
      "application/vnd.ms-excel.sheet.binary.macroEnabled.12"
    ],
    [
      "xlsm",
      "application/vnd.ms-excel.sheet.macroEnabled.12"
    ],
    [
      "xlsx",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ],
    [
      "xlt",
      "application/vnd.ms-excel"
    ],
    [
      "xltm",
      "application/vnd.ms-excel.template.macroEnabled.12"
    ],
    [
      "xltx",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.template"
    ],
    [
      "xlw",
      "application/vnd.ms-excel"
    ],
    [
      "xm",
      "audio/xm"
    ],
    [
      "xml",
      "application/xml"
    ],
    [
      "xns",
      "application/xcap-ns+xml"
    ],
    [
      "xo",
      "application/vnd.olpc-sugar"
    ],
    [
      "xop",
      "application/xop+xml"
    ],
    [
      "xpi",
      "application/x-xpinstall"
    ],
    [
      "xpl",
      "application/xproc+xml"
    ],
    [
      "xpm",
      "image/x-xpixmap"
    ],
    [
      "xpr",
      "application/vnd.is-xpr"
    ],
    [
      "xps",
      "application/vnd.ms-xpsdocument"
    ],
    [
      "xpw",
      "application/vnd.intercon.formnet"
    ],
    [
      "xpx",
      "application/vnd.intercon.formnet"
    ],
    [
      "xsd",
      "application/xml"
    ],
    [
      "xsl",
      "application/xml"
    ],
    [
      "xslt",
      "application/xslt+xml"
    ],
    [
      "xsm",
      "application/vnd.syncml+xml"
    ],
    [
      "xspf",
      "application/xspf+xml"
    ],
    [
      "xul",
      "application/vnd.mozilla.xul+xml"
    ],
    [
      "xvm",
      "application/xv+xml"
    ],
    [
      "xvml",
      "application/xv+xml"
    ],
    [
      "xwd",
      "image/x-xwindowdump"
    ],
    [
      "xyz",
      "chemical/x-xyz"
    ],
    [
      "xz",
      "application/x-xz"
    ],
    [
      "yaml",
      "text/yaml"
    ],
    [
      "yang",
      "application/yang"
    ],
    [
      "yin",
      "application/yin+xml"
    ],
    [
      "yml",
      "text/yaml"
    ],
    [
      "ymp",
      "text/x-suse-ymp"
    ],
    [
      "z",
      "application/x-compress"
    ],
    [
      "z1",
      "application/x-zmachine"
    ],
    [
      "z2",
      "application/x-zmachine"
    ],
    [
      "z3",
      "application/x-zmachine"
    ],
    [
      "z4",
      "application/x-zmachine"
    ],
    [
      "z5",
      "application/x-zmachine"
    ],
    [
      "z6",
      "application/x-zmachine"
    ],
    [
      "z7",
      "application/x-zmachine"
    ],
    [
      "z8",
      "application/x-zmachine"
    ],
    [
      "zaz",
      "application/vnd.zzazz.deck+xml"
    ],
    [
      "zip",
      "application/zip"
    ],
    [
      "zir",
      "application/vnd.zul"
    ],
    [
      "zirz",
      "application/vnd.zul"
    ],
    [
      "zmm",
      "application/vnd.handheld-entertainment+xml"
    ],
    [
      "zsh",
      "text/x-scriptzsh"
    ]
  ]);
  function J(e, a, i) {
    const t = Ya(e), { webkitRelativePath: l } = e, o = typeof a == "string" ? a : typeof l == "string" && l.length > 0 ? l : `./${e.name}`;
    return typeof t.path != "string" && ca(t, "path", o), ca(t, "relativePath", o), t;
  }
  function Ya(e) {
    const { name: a } = e;
    if (a && a.lastIndexOf(".") !== -1 && !e.type) {
      const t = a.split(".").pop().toLowerCase(), l = Ga.get(t);
      l && Object.defineProperty(e, "type", {
        value: l,
        writable: false,
        configurable: false,
        enumerable: true
      });
    }
    return e;
  }
  function ca(e, a, i) {
    Object.defineProperty(e, a, {
      value: i,
      writable: false,
      configurable: false,
      enumerable: true
    });
  }
  const Ja = [
    ".DS_Store",
    "Thumbs.db"
  ];
  function Xa(e) {
    return W(this, void 0, void 0, function* () {
      return ke(e) && Qa(e.dataTransfer) ? ii(e.dataTransfer, e.type) : Za(e) ? ei(e) : Array.isArray(e) && e.every((a) => "getFile" in a && typeof a.getFile == "function") ? ai(e) : [];
    });
  }
  function Qa(e) {
    return ke(e);
  }
  function Za(e) {
    return ke(e) && ke(e.target);
  }
  function ke(e) {
    return typeof e == "object" && e !== null;
  }
  function ei(e) {
    return Le(e.target.files).map((a) => J(a));
  }
  function ai(e) {
    return W(this, void 0, void 0, function* () {
      return (yield Promise.all(e.map((i) => i.getFile()))).map((i) => J(i));
    });
  }
  function ii(e, a) {
    return W(this, void 0, void 0, function* () {
      if (e.items) {
        const i = Le(e.items).filter((l) => l.kind === "file");
        if (a !== "drop") return i;
        const t = yield Promise.all(i.map(ti));
        return sa(ka(t));
      }
      return sa(Le(e.files).map((i) => J(i)));
    });
  }
  function sa(e) {
    return e.filter((a) => Ja.indexOf(a.name) === -1);
  }
  function Le(e) {
    if (e === null) return [];
    const a = [];
    for (let i = 0; i < e.length; i++) {
      const t = e[i];
      a.push(t);
    }
    return a;
  }
  function ti(e) {
    if (typeof e.webkitGetAsEntry != "function") return da(e);
    const a = e.webkitGetAsEntry();
    return a && a.isDirectory ? Fa(a) : da(e, a);
  }
  function ka(e) {
    return e.reduce((a, i) => [
      ...a,
      ...Array.isArray(i) ? ka(i) : [
        i
      ]
    ], []);
  }
  function da(e, a) {
    return W(this, void 0, void 0, function* () {
      var i;
      if (globalThis.isSecureContext && typeof e.getAsFileSystemHandle == "function") {
        const o = yield e.getAsFileSystemHandle();
        if (o === null) throw new Error(`${e} is not a File`);
        if (o !== void 0) {
          const r = yield o.getFile();
          return r.handle = o, J(r);
        }
      }
      const t = e.getAsFile();
      if (!t) throw new Error(`${e} is not a File`);
      return J(t, (i = a == null ? void 0 : a.fullPath) !== null && i !== void 0 ? i : void 0);
    });
  }
  function ni(e) {
    return W(this, void 0, void 0, function* () {
      return e.isDirectory ? Fa(e) : oi(e);
    });
  }
  function Fa(e) {
    const a = e.createReader();
    return new Promise((i, t) => {
      const l = [];
      function o() {
        a.readEntries((r) => W(this, void 0, void 0, function* () {
          if (r.length) {
            const s = Promise.all(r.map(ni));
            l.push(s), o();
          } else try {
            const s = yield Promise.all(l);
            i(s);
          } catch (s) {
            t(s);
          }
        }), (r) => {
          t(r);
        });
      }
      o();
    });
  }
  function oi(e) {
    return W(this, void 0, void 0, function* () {
      return new Promise((a, i) => {
        e.file((t) => {
          const l = J(t, e.fullPath);
          a(l);
        }, (t) => {
          i(t);
        });
      });
    });
  }
  var de = {}, ma;
  function li() {
    return ma || (ma = 1, de.__esModule = true, de.default = function(e, a) {
      if (e && a) {
        var i = Array.isArray(a) ? a : a.split(",");
        if (i.length === 0) return true;
        var t = e.name || "", l = (e.type || "").toLowerCase(), o = l.replace(/\/.*$/, "");
        return i.some(function(r) {
          var s = r.trim().toLowerCase();
          return s.charAt(0) === "." ? t.toLowerCase().endsWith(s) : s.endsWith("/*") ? o === s.replace(/\/.*$/, "") : l === s;
        });
      }
      return true;
    }), de;
  }
  var pi = li();
  const qe = wa(pi);
  function ua(e) {
    return si(e) || ci(e) || Da(e) || ri();
  }
  function ri() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function ci(e) {
    if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
  }
  function si(e) {
    if (Array.isArray(e)) return Ke(e);
  }
  function xa(e, a) {
    var i = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var t = Object.getOwnPropertySymbols(e);
      a && (t = t.filter(function(l) {
        return Object.getOwnPropertyDescriptor(e, l).enumerable;
      })), i.push.apply(i, t);
    }
    return i;
  }
  function va(e) {
    for (var a = 1; a < arguments.length; a++) {
      var i = arguments[a] != null ? arguments[a] : {};
      a % 2 ? xa(Object(i), true).forEach(function(t) {
        za(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : xa(Object(i)).forEach(function(t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }
    return e;
  }
  function za(e, a, i) {
    return a in e ? Object.defineProperty(e, a, {
      value: i,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[a] = i, e;
  }
  function ie(e, a) {
    return ui(e) || mi(e, a) || Da(e, a) || di();
  }
  function di() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function Da(e, a) {
    if (e) {
      if (typeof e == "string") return Ke(e, a);
      var i = Object.prototype.toString.call(e).slice(8, -1);
      if (i === "Object" && e.constructor && (i = e.constructor.name), i === "Map" || i === "Set") return Array.from(e);
      if (i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return Ke(e, a);
    }
  }
  function Ke(e, a) {
    (a == null || a > e.length) && (a = e.length);
    for (var i = 0, t = new Array(a); i < a; i++) t[i] = e[i];
    return t;
  }
  function mi(e, a) {
    var i = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
    if (i != null) {
      var t = [], l = true, o = false, r, s;
      try {
        for (i = i.call(e); !(l = (r = i.next()).done) && (t.push(r.value), !(a && t.length === a)); l = true) ;
      } catch (v) {
        o = true, s = v;
      } finally {
        try {
          !l && i.return != null && i.return();
        } finally {
          if (o) throw s;
        }
      }
      return t;
    }
  }
  function ui(e) {
    if (Array.isArray(e)) return e;
  }
  var xi = typeof qe == "function" ? qe : qe.default, vi = "file-invalid-type", fi = "file-too-large", gi = "file-too-small", hi = "too-many-files", bi = function() {
    var a = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "", i = a.split(","), t = i.length > 1 ? "one of ".concat(i.join(", ")) : i[0];
    return {
      code: vi,
      message: "File type must be ".concat(t)
    };
  }, fa = function(a) {
    return {
      code: fi,
      message: "File is larger than ".concat(a, " ").concat(a === 1 ? "byte" : "bytes")
    };
  }, ga = function(a) {
    return {
      code: gi,
      message: "File is smaller than ".concat(a, " ").concat(a === 1 ? "byte" : "bytes")
    };
  }, yi = {
    code: hi,
    message: "Too many files"
  };
  function Na(e, a) {
    var i = e.type === "application/x-moz-file" || xi(e, a);
    return [
      i,
      i ? null : bi(a)
    ];
  }
  function Ta(e, a, i) {
    if (V(e.size)) if (V(a) && V(i)) {
      if (e.size > i) return [
        false,
        fa(i)
      ];
      if (e.size < a) return [
        false,
        ga(a)
      ];
    } else {
      if (V(a) && e.size < a) return [
        false,
        ga(a)
      ];
      if (V(i) && e.size > i) return [
        false,
        fa(i)
      ];
    }
    return [
      true,
      null
    ];
  }
  function V(e) {
    return e != null;
  }
  function wi(e) {
    var a = e.files, i = e.accept, t = e.minSize, l = e.maxSize, o = e.multiple, r = e.maxFiles, s = e.validator;
    return !o && a.length > 1 || o && r >= 1 && a.length > r ? false : a.every(function(v) {
      var T = Na(v, i), _ = ie(T, 1), S = _[0], O = Ta(v, t, l), R = ie(O, 1), j = R[0], D = s ? s(v) : null;
      return S && j && !D;
    });
  }
  function Fe(e) {
    return typeof e.isPropagationStopped == "function" ? e.isPropagationStopped() : typeof e.cancelBubble < "u" ? e.cancelBubble : false;
  }
  function me(e) {
    return e.dataTransfer ? Array.prototype.some.call(e.dataTransfer.types, function(a) {
      return a === "Files" || a === "application/x-moz-file";
    }) : !!e.target && !!e.target.files;
  }
  function ha(e) {
    e.preventDefault();
  }
  function ji(e) {
    return e.indexOf("MSIE") !== -1 || e.indexOf("Trident/") !== -1;
  }
  function ki(e) {
    return e.indexOf("Edge/") !== -1;
  }
  function Fi() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : window.navigator.userAgent;
    return ji(e) || ki(e);
  }
  function C() {
    for (var e = arguments.length, a = new Array(e), i = 0; i < e; i++) a[i] = arguments[i];
    return function(t) {
      for (var l = arguments.length, o = new Array(l > 1 ? l - 1 : 0), r = 1; r < l; r++) o[r - 1] = arguments[r];
      return a.some(function(s) {
        return !Fe(t) && s && s.apply(void 0, [
          t
        ].concat(o)), Fe(t);
      });
    };
  }
  function zi() {
    return "showOpenFilePicker" in window;
  }
  function Di(e) {
    if (V(e)) {
      var a = Object.entries(e).filter(function(i) {
        var t = ie(i, 2), l = t[0], o = t[1], r = true;
        return Sa(l) || (console.warn('Skipped "'.concat(l, '" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')), r = false), (!Array.isArray(o) || !o.every(Oa)) && (console.warn('Skipped "'.concat(l, '" because an invalid file extension was provided.')), r = false), r;
      }).reduce(function(i, t) {
        var l = ie(t, 2), o = l[0], r = l[1];
        return va(va({}, i), {}, za({}, o, r));
      }, {});
      return [
        {
          description: "Files",
          accept: a
        }
      ];
    }
    return e;
  }
  function Ni(e) {
    if (V(e)) return Object.entries(e).reduce(function(a, i) {
      var t = ie(i, 2), l = t[0], o = t[1];
      return [].concat(ua(a), [
        l
      ], ua(o));
    }, []).filter(function(a) {
      return Sa(a) || Oa(a);
    }).join(",");
  }
  function Ti(e) {
    return e instanceof DOMException && (e.name === "AbortError" || e.code === e.ABORT_ERR);
  }
  function Si(e) {
    return e instanceof DOMException && (e.name === "SecurityError" || e.code === e.SECURITY_ERR);
  }
  function Sa(e) {
    return e === "audio/*" || e === "video/*" || e === "image/*" || e === "text/*" || e === "application/*" || /\w+\/[-+.\w]+/g.test(e);
  }
  function Oa(e) {
    return /^.*\.[\w]+$/.test(e);
  }
  var Oi = [
    "children"
  ], Ei = [
    "open"
  ], Ci = [
    "refKey",
    "role",
    "onKeyDown",
    "onFocus",
    "onBlur",
    "onClick",
    "onDragEnter",
    "onDragOver",
    "onDragLeave",
    "onDrop"
  ], Ai = [
    "refKey",
    "onChange",
    "onClick"
  ];
  function Ii(e) {
    return _i(e) || Ui(e) || Ea(e) || Pi();
  }
  function Pi() {
    throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function Ui(e) {
    if (typeof Symbol < "u" && e[Symbol.iterator] != null || e["@@iterator"] != null) return Array.from(e);
  }
  function _i(e) {
    if (Array.isArray(e)) return Ve(e);
  }
  function Me(e, a) {
    return Mi(e) || qi(e, a) || Ea(e, a) || Ri();
  }
  function Ri() {
    throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
  }
  function Ea(e, a) {
    if (e) {
      if (typeof e == "string") return Ve(e, a);
      var i = Object.prototype.toString.call(e).slice(8, -1);
      if (i === "Object" && e.constructor && (i = e.constructor.name), i === "Map" || i === "Set") return Array.from(e);
      if (i === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)) return Ve(e, a);
    }
  }
  function Ve(e, a) {
    (a == null || a > e.length) && (a = e.length);
    for (var i = 0, t = new Array(a); i < a; i++) t[i] = e[i];
    return t;
  }
  function qi(e, a) {
    var i = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
    if (i != null) {
      var t = [], l = true, o = false, r, s;
      try {
        for (i = i.call(e); !(l = (r = i.next()).done) && (t.push(r.value), !(a && t.length === a)); l = true) ;
      } catch (v) {
        o = true, s = v;
      } finally {
        try {
          !l && i.return != null && i.return();
        } finally {
          if (o) throw s;
        }
      }
      return t;
    }
  }
  function Mi(e) {
    if (Array.isArray(e)) return e;
  }
  function ba(e, a) {
    var i = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var t = Object.getOwnPropertySymbols(e);
      a && (t = t.filter(function(l) {
        return Object.getOwnPropertyDescriptor(e, l).enumerable;
      })), i.push.apply(i, t);
    }
    return i;
  }
  function f(e) {
    for (var a = 1; a < arguments.length; a++) {
      var i = arguments[a] != null ? arguments[a] : {};
      a % 2 ? ba(Object(i), true).forEach(function(t) {
        We(e, t, i[t]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i)) : ba(Object(i)).forEach(function(t) {
        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t));
      });
    }
    return e;
  }
  function We(e, a, i) {
    return a in e ? Object.defineProperty(e, a, {
      value: i,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[a] = i, e;
  }
  function ze(e, a) {
    if (e == null) return {};
    var i = Bi(e, a), t, l;
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      for (l = 0; l < o.length; l++) t = o[l], !(a.indexOf(t) >= 0) && Object.prototype.propertyIsEnumerable.call(e, t) && (i[t] = e[t]);
    }
    return i;
  }
  function Bi(e, a) {
    if (e == null) return {};
    var i = {}, t = Object.keys(e), l, o;
    for (o = 0; o < t.length; o++) l = t[o], !(a.indexOf(l) >= 0) && (i[l] = e[l]);
    return i;
  }
  var He = c.forwardRef(function(e, a) {
    var i = e.children, t = ze(e, Oi), l = Aa(t), o = l.open, r = ze(l, Ei);
    return c.useImperativeHandle(a, function() {
      return {
        open: o
      };
    }, [
      o
    ]), Ba.createElement(c.Fragment, null, i(f(f({}, r), {}, {
      open: o
    })));
  });
  He.displayName = "Dropzone";
  var Ca = {
    disabled: false,
    getFilesFromEvent: Xa,
    maxSize: 1 / 0,
    minSize: 0,
    multiple: true,
    maxFiles: 0,
    preventDropOnDocument: true,
    noClick: false,
    noKeyboard: false,
    noDrag: false,
    noDragEventsBubbling: false,
    validator: null,
    useFsAccessApi: false,
    autoFocus: false
  };
  He.defaultProps = Ca;
  He.propTypes = {
    children: u.func,
    accept: u.objectOf(u.arrayOf(u.string)),
    multiple: u.bool,
    preventDropOnDocument: u.bool,
    noClick: u.bool,
    noKeyboard: u.bool,
    noDrag: u.bool,
    noDragEventsBubbling: u.bool,
    minSize: u.number,
    maxSize: u.number,
    maxFiles: u.number,
    disabled: u.bool,
    getFilesFromEvent: u.func,
    onFileDialogCancel: u.func,
    onFileDialogOpen: u.func,
    useFsAccessApi: u.bool,
    autoFocus: u.bool,
    onDragEnter: u.func,
    onDragLeave: u.func,
    onDragOver: u.func,
    onDrop: u.func,
    onDropAccepted: u.func,
    onDropRejected: u.func,
    onError: u.func,
    validator: u.func
  };
  var $e = {
    isFocused: false,
    isFileDialogActive: false,
    isDragActive: false,
    isDragAccept: false,
    isDragReject: false,
    acceptedFiles: [],
    fileRejections: []
  };
  function Aa() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, a = f(f({}, Ca), e), i = a.accept, t = a.disabled, l = a.getFilesFromEvent, o = a.maxSize, r = a.minSize, s = a.multiple, v = a.maxFiles, T = a.onDragEnter, _ = a.onDragLeave, S = a.onDragOver, O = a.onDrop, R = a.onDropAccepted, j = a.onDropRejected, D = a.onFileDialogCancel, X = a.onFileDialogOpen, q = a.useFsAccessApi, Q = a.autoFocus, Z = a.preventDropOnDocument, ee = a.noClick, L = a.noKeyboard, te = a.noDrag, P = a.noDragEventsBubbling, ne = a.onError, M = a.validator, h = c.useMemo(function() {
      return Ni(i);
    }, [
      i
    ]), z = c.useMemo(function() {
      return Di(i);
    }, [
      i
    ]), E = c.useMemo(function() {
      return typeof X == "function" ? X : ya;
    }, [
      X
    ]), w = c.useMemo(function() {
      return typeof D == "function" ? D : ya;
    }, [
      D
    ]), x = c.useRef(null), b = c.useRef(null), Pa = c.useReducer(Li, $e), Ye = Me(Pa, 2), De = Ye[0], k = Ye[1], Ua = De.isFocused, Je = De.isFileDialogActive, oe = c.useRef(typeof window < "u" && window.isSecureContext && q && zi()), Xe = function() {
      !oe.current && Je && setTimeout(function() {
        if (b.current) {
          var d = b.current.files;
          d.length || (k({
            type: "closeDialog"
          }), w());
        }
      }, 300);
    };
    c.useEffect(function() {
      return window.addEventListener("focus", Xe, false), function() {
        window.removeEventListener("focus", Xe, false);
      };
    }, [
      b,
      Je,
      w,
      oe
    ]);
    var $ = c.useRef([]), Qe = function(d) {
      x.current && x.current.contains(d.target) || (d.preventDefault(), $.current = []);
    };
    c.useEffect(function() {
      return Z && (document.addEventListener("dragover", ha, false), document.addEventListener("drop", Qe, false)), function() {
        Z && (document.removeEventListener("dragover", ha), document.removeEventListener("drop", Qe));
      };
    }, [
      x,
      Z
    ]), c.useEffect(function() {
      return !t && Q && x.current && x.current.focus(), function() {
      };
    }, [
      x,
      Q,
      t
    ]);
    var K = c.useCallback(function(p) {
      ne ? ne(p) : console.error(p);
    }, [
      ne
    ]), Ze = c.useCallback(function(p) {
      p.preventDefault(), p.persist(), ce(p), $.current = [].concat(Ii($.current), [
        p.target
      ]), me(p) && Promise.resolve(l(p)).then(function(d) {
        if (!(Fe(p) && !P)) {
          var g = d.length, y = g > 0 && wi({
            files: d,
            accept: h,
            minSize: r,
            maxSize: o,
            multiple: s,
            maxFiles: v,
            validator: M
          }), F = g > 0 && !y;
          k({
            isDragAccept: y,
            isDragReject: F,
            isDragActive: true,
            type: "setDraggedFiles"
          }), T && T(p);
        }
      }).catch(function(d) {
        return K(d);
      });
    }, [
      l,
      T,
      K,
      P,
      h,
      r,
      o,
      s,
      v,
      M
    ]), ea = c.useCallback(function(p) {
      p.preventDefault(), p.persist(), ce(p);
      var d = me(p);
      if (d && p.dataTransfer) try {
        p.dataTransfer.dropEffect = "copy";
      } catch {
      }
      return d && S && S(p), false;
    }, [
      S,
      P
    ]), aa = c.useCallback(function(p) {
      p.preventDefault(), p.persist(), ce(p);
      var d = $.current.filter(function(y) {
        return x.current && x.current.contains(y);
      }), g = d.indexOf(p.target);
      g !== -1 && d.splice(g, 1), $.current = d, !(d.length > 0) && (k({
        type: "setDraggedFiles",
        isDragActive: false,
        isDragAccept: false,
        isDragReject: false
      }), me(p) && _ && _(p));
    }, [
      x,
      _,
      P
    ]), le = c.useCallback(function(p, d) {
      var g = [], y = [];
      p.forEach(function(F) {
        var ae = Na(F, h), Y = Me(ae, 2), Te = Y[0], Se = Y[1], Oe = Ta(F, r, o), se = Me(Oe, 2), Ee = se[0], Ce = se[1], Ae = M ? M(F) : null;
        if (Te && Ee && !Ae) g.push(F);
        else {
          var Ie = [
            Se,
            Ce
          ];
          Ae && (Ie = Ie.concat(Ae)), y.push({
            file: F,
            errors: Ie.filter(function(Ma) {
              return Ma;
            })
          });
        }
      }), (!s && g.length > 1 || s && v >= 1 && g.length > v) && (g.forEach(function(F) {
        y.push({
          file: F,
          errors: [
            yi
          ]
        });
      }), g.splice(0)), k({
        acceptedFiles: g,
        fileRejections: y,
        isDragReject: y.length > 0,
        type: "setFiles"
      }), O && O(g, y, d), y.length > 0 && j && j(y, d), g.length > 0 && R && R(g, d);
    }, [
      k,
      s,
      h,
      r,
      o,
      v,
      O,
      R,
      j,
      M
    ]), pe = c.useCallback(function(p) {
      p.preventDefault(), p.persist(), ce(p), $.current = [], me(p) && Promise.resolve(l(p)).then(function(d) {
        Fe(p) && !P || le(d, p);
      }).catch(function(d) {
        return K(d);
      }), k({
        type: "reset"
      });
    }, [
      l,
      le,
      K,
      P
    ]), H = c.useCallback(function() {
      if (oe.current) {
        k({
          type: "openDialog"
        }), E();
        var p = {
          multiple: s,
          types: z
        };
        window.showOpenFilePicker(p).then(function(d) {
          return l(d);
        }).then(function(d) {
          le(d, null), k({
            type: "closeDialog"
          });
        }).catch(function(d) {
          Ti(d) ? (w(d), k({
            type: "closeDialog"
          })) : Si(d) ? (oe.current = false, b.current ? (b.current.value = null, b.current.click()) : K(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))) : K(d);
        });
        return;
      }
      b.current && (k({
        type: "openDialog"
      }), E(), b.current.value = null, b.current.click());
    }, [
      k,
      E,
      w,
      q,
      le,
      K,
      z,
      s
    ]), ia = c.useCallback(function(p) {
      !x.current || !x.current.isEqualNode(p.target) || (p.key === " " || p.key === "Enter" || p.keyCode === 32 || p.keyCode === 13) && (p.preventDefault(), H());
    }, [
      x,
      H
    ]), ta = c.useCallback(function() {
      k({
        type: "focus"
      });
    }, []), na = c.useCallback(function() {
      k({
        type: "blur"
      });
    }, []), oa = c.useCallback(function() {
      ee || (Fi() ? setTimeout(H, 0) : H());
    }, [
      ee,
      H
    ]), G = function(d) {
      return t ? null : d;
    }, Ne = function(d) {
      return L ? null : G(d);
    }, re = function(d) {
      return te ? null : G(d);
    }, ce = function(d) {
      P && d.stopPropagation();
    }, _a2 = c.useMemo(function() {
      return function() {
        var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, d = p.refKey, g = d === void 0 ? "ref" : d, y = p.role, F = p.onKeyDown, ae = p.onFocus, Y = p.onBlur, Te = p.onClick, Se = p.onDragEnter, Oe = p.onDragOver, se = p.onDragLeave, Ee = p.onDrop, Ce = ze(p, Ci);
        return f(f(We({
          onKeyDown: Ne(C(F, ia)),
          onFocus: Ne(C(ae, ta)),
          onBlur: Ne(C(Y, na)),
          onClick: G(C(Te, oa)),
          onDragEnter: re(C(Se, Ze)),
          onDragOver: re(C(Oe, ea)),
          onDragLeave: re(C(se, aa)),
          onDrop: re(C(Ee, pe)),
          role: typeof y == "string" && y !== "" ? y : "presentation"
        }, g, x), !t && !L ? {
          tabIndex: 0
        } : {}), Ce);
      };
    }, [
      x,
      ia,
      ta,
      na,
      oa,
      Ze,
      ea,
      aa,
      pe,
      L,
      te,
      t
    ]), Ra = c.useCallback(function(p) {
      p.stopPropagation();
    }, []), qa = c.useMemo(function() {
      return function() {
        var p = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, d = p.refKey, g = d === void 0 ? "ref" : d, y = p.onChange, F = p.onClick, ae = ze(p, Ai), Y = We({
          accept: h,
          multiple: s,
          type: "file",
          style: {
            border: 0,
            clip: "rect(0, 0, 0, 0)",
            clipPath: "inset(50%)",
            height: "1px",
            margin: "0 -1px -1px 0",
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            width: "1px",
            whiteSpace: "nowrap"
          },
          onChange: G(C(y, pe)),
          onClick: G(C(F, Ra)),
          tabIndex: -1
        }, g, b);
        return f(f({}, Y), ae);
      };
    }, [
      b,
      i,
      s,
      pe,
      t
    ]);
    return f(f({}, De), {}, {
      isFocused: Ua && !t,
      getRootProps: _a2,
      getInputProps: qa,
      rootRef: x,
      inputRef: b,
      open: G(H)
    });
  }
  function Li(e, a) {
    switch (a.type) {
      case "focus":
        return f(f({}, e), {}, {
          isFocused: true
        });
      case "blur":
        return f(f({}, e), {}, {
          isFocused: false
        });
      case "openDialog":
        return f(f({}, $e), {}, {
          isFileDialogActive: true
        });
      case "closeDialog":
        return f(f({}, e), {}, {
          isFileDialogActive: false
        });
      case "setDraggedFiles":
        return f(f({}, e), {}, {
          isDragActive: a.isDragActive,
          isDragAccept: a.isDragAccept,
          isDragReject: a.isDragReject
        });
      case "setFiles":
        return f(f({}, e), {}, {
          acceptedFiles: a.acceptedFiles,
          fileRejections: a.fileRejections,
          isDragReject: a.isDragReject
        });
      case "reset":
        return f({}, $e);
      default:
        return e;
    }
  }
  function ya() {
  }
  const Ia = c.createContext(null), Ge = () => {
    const e = c.useContext(Ia);
    if (!e) throw new Error("useFileUpload must be used within a FileUploaderProvider");
    return e;
  }, N = c.forwardRef(({ className: e, dropzoneOptions: a, value: i, onValueChange: t, reSelect: l, orientation: o = je.vertical, children: r, direction: s = we.ltr, ...v }, T) => {
    const [_, S] = c.useState(false), [O, R] = c.useState(false), [j, D] = c.useState(-1), { accept: X = {
      "image/*": [
        ".jpg",
        ".jpeg",
        ".png",
        ".gif"
      ],
      "video/*": [
        ".mp4",
        ".MOV",
        ".AVI"
      ]
    }, maxFiles: q = 1, maxSize: Q = 4 * 1024 * 1024, multiple: Z = true } = a, ee = q === 1 ? true : l, L = c.useCallback((h) => {
      if (!i) return;
      const z = i.filter((E, w) => w !== h);
      t(z);
    }, [
      i,
      t
    ]), te = c.useCallback((h) => {
      var _a2;
      if (h.preventDefault(), h.stopPropagation(), !i) return;
      const z = () => {
        const b = j + 1;
        D(b > i.length - 1 ? 0 : b);
      }, E = () => {
        const b = j - 1;
        D(b < 0 ? i.length - 1 : b);
      }, w = o === je.horizontal ? s === we.ltr ? "ArrowLeft" : "ArrowRight" : "ArrowUp", x = o === je.horizontal ? s === we.ltr ? "ArrowRight" : "ArrowLeft" : "ArrowDown";
      if (h.key === x) z();
      else if (h.key === w) E();
      else if (h.key === "Enter" || h.key === "Space") j === -1 && ((_a2 = M.inputRef.current) == null ? void 0 : _a2.click());
      else if (h.key === "Delete" || h.key === "Backspace") {
        if (j !== -1) {
          if (L(j), i.length - 1 === 0) {
            D(-1);
            return;
          }
          E();
        }
      } else h.key === "Escape" && D(-1);
    }, [
      i,
      j,
      L
    ]), P = c.useCallback((h, z) => {
      var _a2, _b2;
      const E = h;
      if (!E) {
        Pe.error("file error , probably too big");
        return;
      }
      const w = i ? [
        ...i
      ] : [];
      if (ee && w.splice(0, w.length), E.forEach((x) => {
        w.length < q && w.push(x);
      }), t(w), z.length > 0) for (let x = 0; x < z.length; x++) {
        if (((_a2 = z[x].errors[0]) == null ? void 0 : _a2.code) === "file-too-large") {
          Pe.error(`File is too large. Max size is ${Q / 1024 / 1024}MB`);
          break;
        }
        if ((_b2 = z[x].errors[0]) == null ? void 0 : _b2.message) {
          Pe.error(z[x].errors[0].message);
          break;
        }
      }
    }, [
      ee,
      i
    ]);
    c.useEffect(() => {
      if (i) {
        if (i.length === q) {
          R(true);
          return;
        }
        R(false);
      }
    }, [
      i,
      q
    ]);
    const M = Aa({
      ...a || {
        accept: X,
        maxFiles: q,
        maxSize: Q,
        multiple: Z
      },
      onDrop: P,
      onDropRejected: () => S(true),
      onDropAccepted: () => S(false)
    });
    return n.jsx(Ia.Provider, {
      value: {
        dropzoneState: M,
        isLOF: O,
        isFileTooBig: _,
        removeFileFromSet: L,
        activeIndex: j,
        setActiveIndex: D,
        orientation: o,
        direction: s
      },
      children: n.jsx("div", {
        ref: T,
        onKeyDownCapture: te,
        className: B("grid w-full overflow-hidden focus:outline-none ", e, {
          "gap-2": i && i.length > 0
        }),
        dir: s,
        ...v,
        children: r
      })
    });
  });
  N.displayName = "FileUploader";
  const A = c.forwardRef(({ children: e, className: a, ...i }, t) => {
    const { orientation: l } = Ge(), o = c.useRef(null);
    return n.jsx("div", {
      className: B("w-full px-1"),
      ref: o,
      children: n.jsx("div", {
        ...i,
        ref: t,
        className: B(" gap-1 rounded-xl", l === je.horizontal ? "grid grid-cols-2" : "flex flex-col", a),
        children: e
      })
    });
  });
  A.displayName = "FileUploaderContent";
  const I = c.forwardRef(({ className: e, index: a, children: i, ...t }, l) => {
    const { removeFileFromSet: o, activeIndex: r, direction: s } = Ge(), v = a === r;
    return n.jsxs("div", {
      ref: l,
      className: B("relative h-7 w-full cursor-pointer justify-between overflow-hidden rounded-md border p-1 hover:bg-primary-foreground", e, v ? "bg-muted" : ""),
      ...t,
      children: [
        n.jsx("div", {
          className: "flex h-full w-full items-center gap-1.5 font-medium leading-none tracking-tight",
          children: i
        }),
        n.jsxs("button", {
          type: "button",
          className: B("absolute rounded bg-red-10 p-1 text-background", s === we.rtl ? "top-1 left-1" : "right-1.5 bottom-1.5"),
          onClick: () => o(a),
          children: [
            n.jsxs("span", {
              className: "sr-only",
              children: [
                "remove item ",
                a
              ]
            }),
            n.jsx(Ka, {
              className: "h-3 w-3 duration-200 ease-in-out hover:stroke-white"
            })
          ]
        })
      ]
    });
  });
  I.displayName = "FileUploaderItem";
  const U = c.forwardRef(({ className: e, parentclass: a, dropmsg: i, children: t, ...l }, o) => {
    const { dropzoneState: r, isFileTooBig: s, isLOF: v } = Ge(), T = v ? {} : r.getRootProps();
    return n.jsxs("div", {
      ref: o,
      ...l,
      className: B("relative w-full", a, v ? "cursor-not-allowed opacity-50" : "cursor-pointer"),
      children: [
        n.jsxs("div", {
          className: B("w-full rounded-lg transition-colors duration-300 ease-in-out", r.isDragAccept && "border-green-500 bg-green-50", r.isDragReject && "border-red-500 bg-red-50", s && "border-red-500 bg-red-200", !r.isDragActive && "border-gray-300 hover:border-gray-400", e),
          ...T,
          children: [
            t,
            r.isDragActive && n.jsx("div", {
              className: "absolute inset-0 flex items-center justify-center rounded-lg bg-primary-foreground/60 backdrop-blur-sm",
              children: n.jsx("p", {
                className: "font-medium text-primary",
                children: i
              })
            })
          ]
        }),
        n.jsx("input", {
          ref: r.inputRef,
          disabled: v,
          ...r.getInputProps(),
          className: B(v && "cursor-not-allowed")
        })
      ]
    });
  });
  N.__docgenInfo = {
    description: "File upload Docs: {@link: https://localhost:3000/docs/file-upload}",
    methods: [],
    displayName: "FileUploader",
    props: {
      value: {
        required: true,
        tsType: {
          name: "union",
          raw: "File[] | null",
          elements: [
            {
              name: "Array",
              elements: [
                {
                  name: "File"
                }
              ],
              raw: "File[]"
            },
            {
              name: "null"
            }
          ]
        },
        description: ""
      },
      reSelect: {
        required: false,
        tsType: {
          name: "boolean"
        },
        description: ""
      },
      onValueChange: {
        required: true,
        tsType: {
          name: "signature",
          type: "function",
          raw: "(value: File[] | null) => void",
          signature: {
            arguments: [
              {
                type: {
                  name: "union",
                  raw: "File[] | null",
                  elements: [
                    {
                      name: "Array",
                      elements: [
                        {
                          name: "File"
                        }
                      ],
                      raw: "File[]"
                    },
                    {
                      name: "null"
                    }
                  ]
                },
                name: "value"
              }
            ],
            return: {
              name: "void"
            }
          }
        },
        description: ""
      },
      dropzoneOptions: {
        required: true,
        tsType: {
          name: "DropzoneOptions"
        },
        description: ""
      },
      orientation: {
        required: false,
        tsType: {
          name: "union",
          raw: "keyof typeof orientation",
          elements: [
            {
              name: "literal",
              value: "horizontal"
            },
            {
              name: "literal",
              value: "vertical"
            }
          ]
        },
        description: "",
        defaultValue: {
          value: '"vertical"',
          computed: false
        }
      },
      direction: {
        required: false,
        tsType: {
          name: "union",
          raw: "keyof typeof direction",
          elements: [
            {
              name: "literal",
              value: "ltr"
            },
            {
              name: "literal",
              value: "rtl"
            }
          ]
        },
        description: "",
        defaultValue: {
          value: '"ltr"',
          computed: false
        }
      }
    }
  };
  A.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "FileUploaderContent"
  };
  I.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "FileUploaderItem",
    props: {
      index: {
        required: true,
        tsType: {
          name: "number"
        },
        description: ""
      }
    }
  };
  U.__docgenInfo = {
    description: "",
    methods: [],
    displayName: "FileInput",
    props: {
      parentclass: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      },
      dropmsg: {
        required: false,
        tsType: {
          name: "string"
        },
        description: ""
      }
    }
  };
  Qi = {
    title: "Elements/FileUpload",
    component: N,
    parameters: {
      layout: "centered"
    },
    decorators: [
      (e) => n.jsx(La, {
        children: n.jsx("div", {
          style: {
            padding: "20px",
            maxWidth: "600px"
          },
          children: n.jsx(e, {})
        })
      })
    ],
    argTypes: {
      orientation: {
        control: "select",
        options: [
          "horizontal",
          "vertical"
        ],
        description: "Layout orientation"
      },
      direction: {
        control: "select",
        options: [
          "ltr",
          "rtl"
        ],
        description: "Text direction"
      },
      reSelect: {
        control: "boolean",
        description: "Whether to allow reselecting files"
      }
    }
  };
  ue = {
    render: () => {
      const [e, a] = c.useState(null);
      return n.jsxs(N, {
        value: e,
        onValueChange: a,
        dropzoneOptions: {
          accept: {
            "image/*": [
              ".jpg",
              ".jpeg",
              ".png",
              ".gif"
            ]
          },
          maxFiles: 5,
          maxSize: 4 * 1024 * 1024
        },
        className: "w-full",
        children: [
          n.jsx(U, {
            className: "border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors",
            children: n.jsxs("div", {
              className: "space-y-2",
              children: [
                n.jsx("div", {
                  className: "text-2xl",
                  children: "\u{1F4C1}"
                }),
                n.jsxs("div", {
                  children: [
                    n.jsx(m, {
                      size: "3",
                      weight: "medium",
                      children: "Drop files here or click to browse"
                    }),
                    n.jsx(m, {
                      size: "2",
                      color: "gray",
                      children: "Supports: JPG, PNG, GIF up to 4MB"
                    })
                  ]
                })
              ]
            })
          }),
          e && e.length > 0 && n.jsx(A, {
            className: "mt-4",
            children: e.map((i, t) => n.jsx(I, {
              index: t,
              className: "bg-gray-50 rounded-md",
              children: n.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  n.jsx("div", {
                    className: "text-lg",
                    children: "\u{1F4C4}"
                  }),
                  n.jsxs("div", {
                    className: "flex-1 min-w-0",
                    children: [
                      n.jsx(m, {
                        size: "2",
                        weight: "medium",
                        className: "truncate",
                        children: i.name
                      }),
                      n.jsxs(m, {
                        size: "1",
                        color: "gray",
                        children: [
                          (i.size / 1024).toFixed(1),
                          " KB"
                        ]
                      })
                    ]
                  })
                ]
              })
            }, t))
          })
        ]
      });
    }
  };
  xe = {
    render: () => {
      const [e, a] = c.useState(null);
      return n.jsxs(N, {
        value: e,
        onValueChange: a,
        dropzoneOptions: {
          accept: {
            "application/pdf": [
              ".pdf"
            ],
            "application/msword": [
              ".doc"
            ],
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
              ".docx"
            ]
          },
          maxFiles: 1,
          maxSize: 10 * 1024 * 1024
        },
        className: "w-full",
        children: [
          n.jsx(U, {
            className: "border-2 border-dashed border-blue-300 rounded-lg p-6 text-center bg-blue-50 hover:bg-blue-100 transition-colors",
            children: n.jsxs("div", {
              className: "space-y-2",
              children: [
                n.jsx("div", {
                  className: "text-3xl",
                  children: "\u{1F4CE}"
                }),
                n.jsxs("div", {
                  children: [
                    n.jsx(m, {
                      size: "3",
                      weight: "medium",
                      children: "Upload Document"
                    }),
                    n.jsx(m, {
                      size: "2",
                      color: "gray",
                      children: "PDF, DOC, DOCX up to 10MB"
                    })
                  ]
                })
              ]
            })
          }),
          e && e.length > 0 && n.jsx(A, {
            className: "mt-4",
            children: n.jsx(I, {
              index: 0,
              className: "bg-blue-50 border border-blue-200 rounded-md",
              children: n.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  n.jsx("div", {
                    className: "text-lg",
                    children: "\u{1F4C4}"
                  }),
                  n.jsxs("div", {
                    className: "flex-1",
                    children: [
                      n.jsx(m, {
                        size: "2",
                        weight: "medium",
                        children: e[0].name
                      }),
                      n.jsxs(m, {
                        size: "1",
                        color: "gray",
                        children: [
                          (e[0].size / 1024 / 1024).toFixed(2),
                          " MB"
                        ]
                      })
                    ]
                  })
                ]
              })
            })
          })
        ]
      });
    }
  };
  ve = {
    render: () => {
      const [e, a] = c.useState(null);
      return n.jsxs(N, {
        value: e,
        onValueChange: a,
        dropzoneOptions: {
          accept: {
            "image/*": [
              ".jpg",
              ".jpeg",
              ".png",
              ".gif",
              ".webp"
            ]
          },
          maxFiles: 3,
          maxSize: 5 * 1024 * 1024
        },
        className: "w-full",
        children: [
          n.jsx(U, {
            className: "border-2 border-dashed border-green-300 rounded-lg p-8 text-center bg-green-50 hover:bg-green-100 transition-colors",
            children: n.jsxs("div", {
              className: "space-y-2",
              children: [
                n.jsx("div", {
                  className: "text-4xl",
                  children: "\u{1F5BC}\uFE0F"
                }),
                n.jsxs("div", {
                  children: [
                    n.jsx(m, {
                      size: "3",
                      weight: "medium",
                      children: "Upload Images"
                    }),
                    n.jsx(m, {
                      size: "2",
                      color: "gray",
                      children: "Up to 3 images, 5MB each"
                    })
                  ]
                })
              ]
            })
          }),
          e && e.length > 0 && n.jsx(A, {
            className: "mt-4",
            children: n.jsx("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
              children: e.map((i, t) => n.jsxs(I, {
                index: t,
                className: "relative bg-gray-100 rounded-lg overflow-hidden aspect-square",
                children: [
                  n.jsx("img", {
                    src: URL.createObjectURL(i),
                    alt: `Preview ${t + 1}`,
                    className: "w-full h-full object-cover"
                  }),
                  n.jsx("div", {
                    className: "absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2",
                    children: n.jsx(m, {
                      size: "1",
                      className: "text-white truncate",
                      children: i.name
                    })
                  })
                ]
              }, t))
            })
          })
        ]
      });
    }
  };
  fe = {
    render: () => {
      const [e, a] = c.useState(null);
      return n.jsxs(N, {
        value: e,
        onValueChange: a,
        orientation: "horizontal",
        dropzoneOptions: {
          accept: {
            "image/*": [
              ".jpg",
              ".jpeg",
              ".png"
            ],
            "text/*": [
              ".txt",
              ".md"
            ]
          },
          maxFiles: 4,
          maxSize: 2 * 1024 * 1024
        },
        className: "w-full",
        children: [
          n.jsx(U, {
            className: "border-2 border-dashed border-purple-300 rounded-lg p-6 text-center bg-purple-50",
            children: n.jsxs("div", {
              children: [
                n.jsx(m, {
                  size: "3",
                  weight: "medium",
                  children: "Drop files here"
                }),
                n.jsx(m, {
                  size: "2",
                  color: "gray",
                  children: "Images and text files"
                })
              ]
            })
          }),
          e && e.length > 0 && n.jsx(A, {
            className: "mt-4",
            children: e.map((i, t) => n.jsx(I, {
              index: t,
              className: "bg-purple-50 border border-purple-200 rounded-md p-3",
              children: n.jsxs("div", {
                className: "text-center",
                children: [
                  n.jsx("div", {
                    className: "text-lg mb-1",
                    children: i.type.startsWith("image/") ? "\u{1F5BC}\uFE0F" : "\u{1F4DD}"
                  }),
                  n.jsx(m, {
                    size: "2",
                    weight: "medium",
                    className: "block truncate",
                    children: i.name
                  }),
                  n.jsxs(m, {
                    size: "1",
                    color: "gray",
                    children: [
                      (i.size / 1024).toFixed(1),
                      " KB"
                    ]
                  })
                ]
              })
            }, t))
          })
        ]
      });
    }
  };
  ge = {
    render: () => {
      const [e, a] = c.useState(null);
      return n.jsxs(N, {
        value: e,
        onValueChange: a,
        direction: "rtl",
        dropzoneOptions: {
          accept: {
            "*": []
          },
          maxFiles: 3,
          maxSize: 1 * 1024 * 1024
        },
        className: "w-full",
        children: [
          n.jsx(U, {
            className: "border-2 border-dashed border-orange-300 rounded-lg p-6 text-center bg-orange-50",
            children: n.jsxs("div", {
              children: [
                n.jsx(m, {
                  size: "3",
                  weight: "medium",
                  children: "\u0627\u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0647\u0646\u0627"
                }),
                n.jsx(m, {
                  size: "2",
                  color: "gray",
                  children: "RTL Layout Example"
                })
              ]
            })
          }),
          e && e.length > 0 && n.jsx(A, {
            className: "mt-4",
            children: e.map((i, t) => n.jsx(I, {
              index: t,
              className: "bg-orange-50 border border-orange-200 rounded-md",
              children: n.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  n.jsx("div", {
                    className: "text-lg",
                    children: "\u{1F4C1}"
                  }),
                  n.jsxs("div", {
                    children: [
                      n.jsx(m, {
                        size: "2",
                        weight: "medium",
                        children: i.name
                      }),
                      n.jsxs(m, {
                        size: "1",
                        color: "gray",
                        children: [
                          (i.size / 1024).toFixed(1),
                          " KB"
                        ]
                      })
                    ]
                  })
                ]
              })
            }, t))
          })
        ]
      });
    }
  };
  he = {
    render: () => {
      const [e, a] = c.useState(null);
      return n.jsxs(N, {
        value: e,
        onValueChange: a,
        dropzoneOptions: {
          accept: {
            "video/*": [
              ".mp4",
              ".avi",
              ".mov",
              ".mkv"
            ]
          },
          maxFiles: 2,
          maxSize: 50 * 1024 * 1024
        },
        className: "w-full",
        children: [
          n.jsx(U, {
            dropmsg: "\u{1F3AC} Drop your videos here!",
            className: "border-2 border-dashed border-red-300 rounded-lg p-8 text-center bg-red-50 hover:border-red-400 transition-colors",
            children: n.jsxs("div", {
              className: "space-y-2",
              children: [
                n.jsx("div", {
                  className: "text-4xl",
                  children: "\u{1F3A5}"
                }),
                n.jsxs("div", {
                  children: [
                    n.jsx(m, {
                      size: "3",
                      weight: "medium",
                      children: "Upload Video Files"
                    }),
                    n.jsx(m, {
                      size: "2",
                      color: "gray",
                      children: "MP4, AVI, MOV, MKV up to 50MB"
                    })
                  ]
                })
              ]
            })
          }),
          e && e.length > 0 && n.jsx(A, {
            className: "mt-4",
            children: e.map((i, t) => n.jsx(I, {
              index: t,
              className: "bg-red-50 border border-red-200 rounded-md",
              children: n.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  n.jsx("div", {
                    className: "text-lg",
                    children: "\u{1F3AC}"
                  }),
                  n.jsxs("div", {
                    children: [
                      n.jsx(m, {
                        size: "2",
                        weight: "medium",
                        children: i.name
                      }),
                      n.jsxs(m, {
                        size: "1",
                        color: "gray",
                        children: [
                          (i.size / 1024 / 1024).toFixed(2),
                          " MB"
                        ]
                      })
                    ]
                  })
                ]
              })
            }, t))
          })
        ]
      });
    }
  };
  be = {
    render: () => {
      const [e, a] = c.useState(null);
      return n.jsxs(ja, {
        direction: "column",
        gap: "4",
        children: [
          n.jsxs("div", {
            children: [
              n.jsx(m, {
                size: "3",
                weight: "medium",
                children: "File Upload (No Re-select)"
              }),
              n.jsx(m, {
                size: "2",
                color: "gray",
                children: "Once files are selected, you cannot add more without removing existing ones"
              })
            ]
          }),
          n.jsxs(N, {
            value: e,
            onValueChange: a,
            reSelect: false,
            dropzoneOptions: {
              accept: {
                "*": []
              },
              maxFiles: 2,
              maxSize: 5 * 1024 * 1024
            },
            className: "w-full",
            children: [
              n.jsx(U, {
                className: "border-2 border-dashed border-gray-300 rounded-lg p-6 text-center",
                children: n.jsxs("div", {
                  children: [
                    n.jsx(m, {
                      size: "3",
                      weight: "medium",
                      children: "Select Files"
                    }),
                    n.jsx(m, {
                      size: "2",
                      color: "gray",
                      children: "Maximum 2 files"
                    })
                  ]
                })
              }),
              e && e.length > 0 && n.jsx(A, {
                className: "mt-4",
                children: e.map((i, t) => n.jsx(I, {
                  index: t,
                  className: "bg-gray-50 rounded-md",
                  children: n.jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [
                      n.jsx("div", {
                        className: "text-lg",
                        children: "\u{1F4C4}"
                      }),
                      n.jsxs("div", {
                        children: [
                          n.jsx(m, {
                            size: "2",
                            weight: "medium",
                            children: i.name
                          }),
                          n.jsxs(m, {
                            size: "1",
                            color: "gray",
                            children: [
                              (i.size / 1024).toFixed(1),
                              " KB"
                            ]
                          })
                        ]
                      })
                    ]
                  })
                }, t))
              })
            ]
          }),
          e && e.length > 0 && n.jsx(Be, {
            onClick: () => a(null),
            variant: "outline",
            children: "Clear All Files"
          })
        ]
      });
    }
  };
  ye = {
    render: () => {
      const [e, a] = c.useState(null), [i, t] = c.useState({}), l = async () => {
        if (!(e == null ? void 0 : e.length)) return;
        const o = {};
        try {
          for (const r of e) o[r.name] = "uploading", t({
            ...o
          }), await new Promise((s) => setTimeout(s, 2e3)), o[r.name] = "completed";
        } catch {
          for (const s of e) o[s.name] === "uploading" && (o[s.name] = "failed");
        }
        t(o);
      };
      return n.jsxs(ja, {
        direction: "column",
        gap: "4",
        children: [
          n.jsxs("div", {
            children: [
              n.jsx(m, {
                size: "4",
                weight: "bold",
                children: "Document Upload Portal"
              }),
              n.jsx(m, {
                size: "2",
                color: "gray",
                children: "Upload your documents for processing"
              })
            ]
          }),
          n.jsxs(N, {
            value: e,
            onValueChange: a,
            dropzoneOptions: {
              accept: {
                "application/pdf": [
                  ".pdf"
                ],
                "image/*": [
                  ".jpg",
                  ".jpeg",
                  ".png"
                ],
                "application/msword": [
                  ".doc",
                  ".docx"
                ]
              },
              maxFiles: 5,
              maxSize: 10 * 1024 * 1024
            },
            className: "w-full",
            children: [
              n.jsx(U, {
                className: "border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all",
                children: n.jsxs("div", {
                  className: "space-y-3",
                  children: [
                    n.jsx("div", {
                      className: "text-5xl",
                      children: "\u{1F4CB}"
                    }),
                    n.jsxs("div", {
                      children: [
                        n.jsx(m, {
                          size: "4",
                          weight: "medium",
                          children: "Drop documents here"
                        }),
                        n.jsx(m, {
                          size: "2",
                          color: "gray",
                          children: "PDF, Images, Word docs \u2022 Up to 5 files \u2022 10MB max each"
                        })
                      ]
                    })
                  ]
                })
              }),
              e && e.length > 0 && n.jsx(A, {
                className: "mt-6",
                children: e.map((o, r) => n.jsx(I, {
                  index: r,
                  className: "bg-white border border-gray-200 rounded-lg shadow-sm",
                  children: n.jsxs("div", {
                    className: "flex items-center justify-between w-full",
                    children: [
                      n.jsxs("div", {
                        className: "flex items-center space-x-3",
                        children: [
                          n.jsx("div", {
                            className: "text-xl",
                            children: o.type.includes("pdf") ? "\u{1F4D5}" : o.type.includes("image") ? "\u{1F5BC}\uFE0F" : o.type.includes("word") ? "\u{1F4D8}" : "\u{1F4C4}"
                          }),
                          n.jsxs("div", {
                            children: [
                              n.jsx(m, {
                                size: "2",
                                weight: "medium",
                                children: o.name
                              }),
                              n.jsxs(m, {
                                size: "1",
                                color: "gray",
                                children: [
                                  (o.size / 1024 / 1024).toFixed(2),
                                  " MB \u2022 ",
                                  o.type
                                ]
                              })
                            ]
                          })
                        ]
                      }),
                      n.jsxs("div", {
                        className: "flex items-center gap-2",
                        children: [
                          i[o.name] === "uploading" && n.jsx("div", {
                            className: "text-yellow-600",
                            children: "\u23F3"
                          }),
                          i[o.name] === "completed" && n.jsx("div", {
                            className: "text-green-600",
                            children: "\u2705"
                          })
                        ]
                      })
                    ]
                  })
                }, r))
              })
            ]
          }),
          e && e.length > 0 && n.jsxs("div", {
            className: "flex justify-between items-center pt-4 border-t border-gray-200",
            children: [
              n.jsxs(m, {
                size: "2",
                color: "gray",
                children: [
                  e.length,
                  " file",
                  e.length !== 1 ? "s" : "",
                  " ready to upload"
                ]
              }),
              n.jsxs("div", {
                className: "gap-2",
                children: [
                  n.jsx(Be, {
                    onClick: () => a(null),
                    variant: "outline",
                    children: "Clear All"
                  }),
                  n.jsx(Be, {
                    onClick: l,
                    disabled: Object.values(i).some((o) => o === "uploading"),
                    children: Object.values(i).some((o) => o === "uploading") ? "Uploading..." : "Upload Files"
                  })
                ]
              })
            ]
          })
        ]
      });
    }
  };
  ue.parameters = {
    ...ue.parameters,
    docs: {
      ...(_a = ue.parameters) == null ? void 0 : _a.docs,
      source: {
        originalSource: `{
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null);
    return <FileUploader value={files} onValueChange={setFiles} dropzoneOptions={{
      accept: {
        "image/*": [".jpg", ".jpeg", ".png", ".gif"]
      },
      maxFiles: 5,
      maxSize: 4 * 1024 * 1024 // 4MB
    }} className="w-full">
        <FileInput className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors">
          <div className="space-y-2">
            <div className="text-2xl">\u{1F4C1}</div>
            <div>
              <Text size="3" weight="medium">
                Drop files here or click to browse
              </Text>
              <Text size="2" color="gray">
                Supports: JPG, PNG, GIF up to 4MB
              </Text>
            </div>
          </div>
        </FileInput>

        {files && files.length > 0 && <FileUploaderContent className="mt-4">
            {files.map((file, index) => <FileUploaderItem key={index} index={index} className="bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="text-lg">\u{1F4C4}</div>
                  <div className="flex-1 min-w-0">
                    <Text size="2" weight="medium" className="truncate">
                      {file.name}
                    </Text>
                    <Text size="1" color="gray">
                      {(file.size / 1024).toFixed(1)} KB
                    </Text>
                  </div>
                </div>
              </FileUploaderItem>)}
          </FileUploaderContent>}
      </FileUploader>;
  }
}`,
        ...(_c = (_b = ue.parameters) == null ? void 0 : _b.docs) == null ? void 0 : _c.source
      }
    }
  };
  xe.parameters = {
    ...xe.parameters,
    docs: {
      ...(_d = xe.parameters) == null ? void 0 : _d.docs,
      source: {
        originalSource: `{
  render: () => {
    const [file, setFile] = useState<File[] | null>(null);
    return <FileUploader value={file} onValueChange={setFile} dropzoneOptions={{
      accept: {
        "application/pdf": [".pdf"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"]
      },
      maxFiles: 1,
      maxSize: 10 * 1024 * 1024 // 10MB
    }} className="w-full">
        <FileInput className="border-2 border-dashed border-blue-300 rounded-lg p-6 text-center bg-blue-50 hover:bg-blue-100 transition-colors">
          <div className="space-y-2">
            <div className="text-3xl">\u{1F4CE}</div>
            <div>
              <Text size="3" weight="medium">
                Upload Document
              </Text>
              <Text size="2" color="gray">
                PDF, DOC, DOCX up to 10MB
              </Text>
            </div>
          </div>
        </FileInput>

        {file && file.length > 0 && <FileUploaderContent className="mt-4">
            <FileUploaderItem index={0} className="bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center gap-2">
                <div className="text-lg">\u{1F4C4}</div>
                <div className="flex-1">
                  <Text size="2" weight="medium">
                    {file[0].name}
                  </Text>
                  <Text size="1" color="gray">
                    {(file[0].size / 1024 / 1024).toFixed(2)} MB
                  </Text>
                </div>
              </div>
            </FileUploaderItem>
          </FileUploaderContent>}
      </FileUploader>;
  }
}`,
        ...(_f = (_e2 = xe.parameters) == null ? void 0 : _e2.docs) == null ? void 0 : _f.source
      }
    }
  };
  ve.parameters = {
    ...ve.parameters,
    docs: {
      ...(_g = ve.parameters) == null ? void 0 : _g.docs,
      source: {
        originalSource: `{
  render: () => {
    const [images, setImages] = useState<File[] | null>(null);
    return <FileUploader value={images} onValueChange={setImages} dropzoneOptions={{
      accept: {
        "image/*": [".jpg", ".jpeg", ".png", ".gif", ".webp"]
      },
      maxFiles: 3,
      maxSize: 5 * 1024 * 1024 // 5MB
    }} className="w-full">
        <FileInput className="border-2 border-dashed border-green-300 rounded-lg p-8 text-center bg-green-50 hover:bg-green-100 transition-colors">
          <div className="space-y-2">
            <div className="text-4xl">\u{1F5BC}\uFE0F</div>
            <div>
              <Text size="3" weight="medium">
                Upload Images
              </Text>
              <Text size="2" color="gray">
                Up to 3 images, 5MB each
              </Text>
            </div>
          </div>
        </FileInput>

        {images && images.length > 0 && <FileUploaderContent className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((image, index) => <FileUploaderItem key={index} index={index} className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                  <img src={URL.createObjectURL(image)} alt={\`Preview \${index + 1}\`} className="w-full h-full object-cover" />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
                    <Text size="1" className="text-white truncate">
                      {image.name}
                    </Text>
                  </div>
                </FileUploaderItem>)}
            </div>
          </FileUploaderContent>}
      </FileUploader>;
  }
}`,
        ...(_i2 = (_h = ve.parameters) == null ? void 0 : _h.docs) == null ? void 0 : _i2.source
      }
    }
  };
  fe.parameters = {
    ...fe.parameters,
    docs: {
      ...(_j = fe.parameters) == null ? void 0 : _j.docs,
      source: {
        originalSource: `{
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null);
    return <FileUploader value={files} onValueChange={setFiles} orientation="horizontal" dropzoneOptions={{
      accept: {
        "image/*": [".jpg", ".jpeg", ".png"],
        "text/*": [".txt", ".md"]
      },
      maxFiles: 4,
      maxSize: 2 * 1024 * 1024 // 2MB
    }} className="w-full">
        <FileInput className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center bg-purple-50">
          <div>
            <Text size="3" weight="medium">
              Drop files here
            </Text>
            <Text size="2" color="gray">
              Images and text files
            </Text>
          </div>
        </FileInput>

        {files && files.length > 0 && <FileUploaderContent className="mt-4">
            {files.map((file, index) => <FileUploaderItem key={index} index={index} className="bg-purple-50 border border-purple-200 rounded-md p-3">
                <div className="text-center">
                  <div className="text-lg mb-1">
                    {file.type.startsWith('image/') ? '\u{1F5BC}\uFE0F' : '\u{1F4DD}'}
                  </div>
                  <Text size="2" weight="medium" className="block truncate">
                    {file.name}
                  </Text>
                  <Text size="1" color="gray">
                    {(file.size / 1024).toFixed(1)} KB
                  </Text>
                </div>
              </FileUploaderItem>)}
          </FileUploaderContent>}
      </FileUploader>;
  }
}`,
        ...(_l = (_k = fe.parameters) == null ? void 0 : _k.docs) == null ? void 0 : _l.source
      }
    }
  };
  ge.parameters = {
    ...ge.parameters,
    docs: {
      ...(_m = ge.parameters) == null ? void 0 : _m.docs,
      source: {
        originalSource: `{
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null);
    return <FileUploader value={files} onValueChange={setFiles} direction="rtl" dropzoneOptions={{
      accept: {
        "*": [] // Accept any file type
      },
      maxFiles: 3,
      maxSize: 1 * 1024 * 1024 // 1MB
    }} className="w-full">
        <FileInput className="border-2 border-dashed border-orange-300 rounded-lg p-6 text-center bg-orange-50">
          <div>
            <Text size="3" weight="medium">
              \u0627\u0631\u0641\u0639 \u0627\u0644\u0645\u0644\u0641\u0627\u062A \u0647\u0646\u0627
            </Text>
            <Text size="2" color="gray">
              RTL Layout Example
            </Text>
          </div>
        </FileInput>

        {files && files.length > 0 && <FileUploaderContent className="mt-4">
            {files.map((file, index) => <FileUploaderItem key={index} index={index} className="bg-orange-50 border border-orange-200 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="text-lg">\u{1F4C1}</div>
                  <div>
                    <Text size="2" weight="medium">
                      {file.name}
                    </Text>
                    <Text size="1" color="gray">
                      {(file.size / 1024).toFixed(1)} KB
                    </Text>
                  </div>
                </div>
              </FileUploaderItem>)}
          </FileUploaderContent>}
      </FileUploader>;
  }
}`,
        ...(_o = (_n = ge.parameters) == null ? void 0 : _n.docs) == null ? void 0 : _o.source
      }
    }
  };
  he.parameters = {
    ...he.parameters,
    docs: {
      ...(_p = he.parameters) == null ? void 0 : _p.docs,
      source: {
        originalSource: `{
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null);
    return <FileUploader value={files} onValueChange={setFiles} dropzoneOptions={{
      accept: {
        "video/*": [".mp4", ".avi", ".mov", ".mkv"]
      },
      maxFiles: 2,
      maxSize: 50 * 1024 * 1024 // 50MB
    }} className="w-full">
        <FileInput dropmsg="\u{1F3AC} Drop your videos here!" className="border-2 border-dashed border-red-300 rounded-lg p-8 text-center bg-red-50 hover:border-red-400 transition-colors">
          <div className="space-y-2">
            <div className="text-4xl">\u{1F3A5}</div>
            <div>
              <Text size="3" weight="medium">
                Upload Video Files
              </Text>
              <Text size="2" color="gray">
                MP4, AVI, MOV, MKV up to 50MB
              </Text>
            </div>
          </div>
        </FileInput>

        {files && files.length > 0 && <FileUploaderContent className="mt-4">
            {files.map((file, index) => <FileUploaderItem key={index} index={index} className="bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-center gap-2">
                  <div className="text-lg">\u{1F3AC}</div>
                  <div>
                    <Text size="2" weight="medium">
                      {file.name}
                    </Text>
                    <Text size="1" color="gray">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </Text>
                  </div>
                </div>
              </FileUploaderItem>)}
          </FileUploaderContent>}
      </FileUploader>;
  }
}`,
        ...(_r = (_q = he.parameters) == null ? void 0 : _q.docs) == null ? void 0 : _r.source
      }
    }
  };
  be.parameters = {
    ...be.parameters,
    docs: {
      ...(_s = be.parameters) == null ? void 0 : _s.docs,
      source: {
        originalSource: `{
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null);
    return <Flex direction="column" gap="4">
        <div>
          <Text size="3" weight="medium">
            File Upload (No Re-select)
          </Text>
          <Text size="2" color="gray">
            Once files are selected, you cannot add more without removing existing ones
          </Text>
        </div>

        <FileUploader value={files} onValueChange={setFiles} reSelect={false} dropzoneOptions={{
        accept: {
          "*": []
        },
        maxFiles: 2,
        maxSize: 5 * 1024 * 1024 // 5MB
      }} className="w-full">
          <FileInput className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div>
              <Text size="3" weight="medium">
                Select Files
              </Text>
              <Text size="2" color="gray">
                Maximum 2 files
              </Text>
            </div>
          </FileInput>

          {files && files.length > 0 && <FileUploaderContent className="mt-4">
              {files.map((file, index) => <FileUploaderItem key={index} index={index} className="bg-gray-50 rounded-md">
                  <div className="flex items-center gap-2">
                    <div className="text-lg">\u{1F4C4}</div>
                    <div>
                      <Text size="2" weight="medium">
                        {file.name}
                      </Text>
                      <Text size="1" color="gray">
                        {(file.size / 1024).toFixed(1)} KB
                      </Text>
                    </div>
                  </div>
                </FileUploaderItem>)}
            </FileUploaderContent>}
        </FileUploader>

        {files && files.length > 0 && <Button onClick={() => setFiles(null)} variant="outline">
            Clear All Files
          </Button>}
      </Flex>;
  }
}`,
        ...(_u = (_t = be.parameters) == null ? void 0 : _t.docs) == null ? void 0 : _u.source
      }
    }
  };
  ye.parameters = {
    ...ye.parameters,
    docs: {
      ...(_v = ye.parameters) == null ? void 0 : _v.docs,
      source: {
        originalSource: `{
  render: () => {
    const [files, setFiles] = useState<File[] | null>(null);
    const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({});
    const handleUpload = async () => {
      if (!files?.length) return;
      const newStatus: Record<string, string> = {};
      try {
        for (const file of files) {
          newStatus[file.name] = 'uploading';
          setUploadStatus({
            ...newStatus
          });

          // Simulate upload
          await new Promise(resolve => setTimeout(resolve, 2000));
          newStatus[file.name] = 'completed';
        }
      } catch (error) {
        // Mark failed uploads
        for (const file of files) {
          if (newStatus[file.name] === 'uploading') {
            newStatus[file.name] = 'failed';
          }
        }
      }
      setUploadStatus(newStatus);
    };
    return <Flex direction="column" gap="4">
        <div>
          <Text size="4" weight="bold">
            Document Upload Portal
          </Text>
          <Text size="2" color="gray">
            Upload your documents for processing
          </Text>
        </div>

        <FileUploader value={files} onValueChange={setFiles} dropzoneOptions={{
        accept: {
          "application/pdf": [".pdf"],
          "image/*": [".jpg", ".jpeg", ".png"],
          "application/msword": [".doc", ".docx"]
        },
        maxFiles: 5,
        maxSize: 10 * 1024 * 1024 // 10MB
      }} className="w-full">
          <FileInput className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center bg-gradient-to-br from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all">
            <div className="space-y-3">
              <div className="text-5xl">\u{1F4CB}</div>
              <div>
                <Text size="4" weight="medium">
                  Drop documents here
                </Text>
                <Text size="2" color="gray">
                  PDF, Images, Word docs \u2022 Up to 5 files \u2022 10MB max each
                </Text>
              </div>
            </div>
          </FileInput>

          {files && files.length > 0 && <FileUploaderContent className="mt-6">
              {files.map((file, index) => <FileUploaderItem key={index} index={index} className="bg-white border border-gray-200 rounded-lg shadow-sm">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-3">
                      <div className="text-xl">
                        {file.type.includes('pdf') ? '\u{1F4D5}' : file.type.includes('image') ? '\u{1F5BC}\uFE0F' : file.type.includes('word') ? '\u{1F4D8}' : '\u{1F4C4}'}
                      </div>
                      <div>
                        <Text size="2" weight="medium">
                          {file.name}
                        </Text>
                        <Text size="1" color="gray">
                          {(file.size / 1024 / 1024).toFixed(2)} MB \u2022 {file.type}
                        </Text>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {uploadStatus[file.name] === 'uploading' && <div className="text-yellow-600">\u23F3</div>}
                      {uploadStatus[file.name] === 'completed' && <div className="text-green-600">\u2705</div>}
                    </div>
                  </div>
                </FileUploaderItem>)}
            </FileUploaderContent>}
        </FileUploader>

        {files && files.length > 0 && <div className="flex justify-between items-center pt-4 border-t border-gray-200">
            <Text size="2" color="gray">
              {files.length} file{files.length !== 1 ? 's' : ''} ready to upload
            </Text>
            <div className="gap-2">
              <Button onClick={() => setFiles(null)} variant="outline">
                Clear All
              </Button>
              <Button onClick={handleUpload} disabled={Object.values(uploadStatus).some(status => status === 'uploading')}>
                {Object.values(uploadStatus).some(status => status === 'uploading') ? 'Uploading...' : 'Upload Files'}
              </Button>
            </div>
          </div>}
      </Flex>;
  }
}`,
        ...(_x = (_w = ye.parameters) == null ? void 0 : _w.docs) == null ? void 0 : _x.source
      }
    }
  };
  Zi = [
    "Default",
    "SingleFile",
    "ImageUpload",
    "HorizontalOrientation",
    "RTLDirection",
    "CustomDropMessage",
    "NoReSelect",
    "ComplexExample"
  ];
});
export {
  ye as ComplexExample,
  he as CustomDropMessage,
  ue as Default,
  fe as HorizontalOrientation,
  ve as ImageUpload,
  be as NoReSelect,
  ge as RTLDirection,
  xe as SingleFile,
  Zi as __namedExportsOrder,
  __tla,
  Qi as default
};
