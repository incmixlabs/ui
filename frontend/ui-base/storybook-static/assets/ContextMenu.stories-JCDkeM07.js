import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as a}from"./iframe-DsuaOdjx.js";import{b as ge,c as Ie,a as P,e as fe,T as F}from"./theme-BFbej9HP.js";import{P as be,e as L,a as I,g as W}from"./high-contrast.prop-DN4VqJ5o.js";import{c as $,R as je,A as Re,P as ye,C as Se,I as Te,S as ve,a as Pe,b as we,d as Ne,G as _e,L as ke,e as Be,f as Ae,g as Ee,h as ze,i as De,j as w,k as H,l as Ge,m as Oe,n as Fe}from"./scroll-area-DDgKAQ7E.js";import{u as We}from"./index-Bg7roRMb.js";import{r as Ve}from"./require-react-element-BySUkP0S.js";import{T as Le,a as U}from"./icons-Ca5JYYu5.js";import{B as b}from"./box-CeCqNv3u.js";import{T as u}from"./text-Bwa-Y73d.js";import{F as $e}from"./flex-bym-5aeO.js";import"./preload-helper-D9Z9MdNV.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./index-DVM_hVnM.js";import"./index-FlXuF2W-.js";import"./index-DT1UHsoa.js";import"./index-BdQq_4o_.js";import"./get-subtree-COcTOnEl.js";import"./radius.prop-BFb5uVoY.js";import"./weight.prop-Rt1sSGdE.js";var V="ContextMenu",[He,Vt]=Ie(V,[$]),p=$(),[Ue,X]=He(V),J=t=>{const{__scopeContextMenu:o,children:r,onOpenChange:s,dir:i,modal:c=!0}=t,[d,l]=a.useState(!1),j=p(o),R=ge(s),C=a.useCallback(y=>{l(y),R(y)},[R]);return e.jsx(Ue,{scope:o,open:d,onOpenChange:C,modal:c,children:e.jsx(je,{...j,dir:i,open:d,onOpenChange:C,modal:c,children:r})})};J.displayName=V;var q="ContextMenuTrigger",Y=a.forwardRef((t,o)=>{const{__scopeContextMenu:r,disabled:s=!1,...i}=t,c=X(q,r),d=p(r),l=a.useRef({x:0,y:0}),j=a.useRef({getBoundingClientRect:()=>DOMRect.fromRect({width:0,height:0,...l.current})}),R=a.useRef(0),C=a.useCallback(()=>window.clearTimeout(R.current),[]),y=f=>{l.current={x:f.clientX,y:f.clientY},c.onOpenChange(!0)};return a.useEffect(()=>C,[C]),a.useEffect(()=>void(s&&C()),[s,C]),e.jsxs(e.Fragment,{children:[e.jsx(Re,{...d,virtualRef:j}),e.jsx(be.span,{"data-state":c.open?"open":"closed","data-disabled":s?"":void 0,...i,ref:o,style:{WebkitTouchCallout:"none",...t.style},onContextMenu:s?t.onContextMenu:P(t.onContextMenu,f=>{C(),y(f),f.preventDefault()}),onPointerDown:s?t.onPointerDown:P(t.onPointerDown,N(f=>{C(),R.current=window.setTimeout(()=>y(f),700)})),onPointerMove:s?t.onPointerMove:P(t.onPointerMove,N(C)),onPointerCancel:s?t.onPointerCancel:P(t.onPointerCancel,N(C)),onPointerUp:s?t.onPointerUp:P(t.onPointerUp,N(C))})]})});Y.displayName=q;var Xe="ContextMenuPortal",K=t=>{const{__scopeContextMenu:o,...r}=t,s=p(o);return e.jsx(ye,{...s,...r})};K.displayName=Xe;var Q="ContextMenuContent",Z=a.forwardRef((t,o)=>{const{__scopeContextMenu:r,...s}=t,i=X(Q,r),c=p(r),d=a.useRef(!1);return e.jsx(Se,{...c,...s,ref:o,side:"right",sideOffset:2,align:"start",onCloseAutoFocus:l=>{t.onCloseAutoFocus?.(l),!l.defaultPrevented&&d.current&&l.preventDefault(),d.current=!1},onInteractOutside:l=>{t.onInteractOutside?.(l),!l.defaultPrevented&&!i.modal&&(d.current=!0)},style:{...t.style,"--radix-context-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-context-menu-content-available-width":"var(--radix-popper-available-width)","--radix-context-menu-content-available-height":"var(--radix-popper-available-height)","--radix-context-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-context-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});Z.displayName=Q;var Je="ContextMenuGroup",ee=a.forwardRef((t,o)=>{const{__scopeContextMenu:r,...s}=t,i=p(r);return e.jsx(_e,{...i,...s,ref:o})});ee.displayName=Je;var qe="ContextMenuLabel",te=a.forwardRef((t,o)=>{const{__scopeContextMenu:r,...s}=t,i=p(r);return e.jsx(ke,{...i,...s,ref:o})});te.displayName=qe;var Ye="ContextMenuItem",ne=a.forwardRef((t,o)=>{const{__scopeContextMenu:r,...s}=t,i=p(r);return e.jsx(Te,{...i,...s,ref:o})});ne.displayName=Ye;var Ke="ContextMenuCheckboxItem",oe=a.forwardRef((t,o)=>{const{__scopeContextMenu:r,...s}=t,i=p(r);return e.jsx(Be,{...i,...s,ref:o})});oe.displayName=Ke;var Qe="ContextMenuRadioGroup",re=a.forwardRef((t,o)=>{const{__scopeContextMenu:r,...s}=t,i=p(r);return e.jsx(Ae,{...i,...s,ref:o})});re.displayName=Qe;var Ze="ContextMenuRadioItem",se=a.forwardRef((t,o)=>{const{__scopeContextMenu:r,...s}=t,i=p(r);return e.jsx(Ee,{...i,...s,ref:o})});se.displayName=Ze;var et="ContextMenuItemIndicator",ie=a.forwardRef((t,o)=>{const{__scopeContextMenu:r,...s}=t,i=p(r);return e.jsx(ze,{...i,...s,ref:o})});ie.displayName=et;var tt="ContextMenuSeparator",ae=a.forwardRef((t,o)=>{const{__scopeContextMenu:r,...s}=t,i=p(r);return e.jsx(ve,{...i,...s,ref:o})});ae.displayName=tt;var nt="ContextMenuArrow",ot=a.forwardRef((t,o)=>{const{__scopeContextMenu:r,...s}=t,i=p(r);return e.jsx(De,{...i,...s,ref:o})});ot.displayName=nt;var xe="ContextMenuSub",ue=t=>{const{__scopeContextMenu:o,children:r,onOpenChange:s,open:i,defaultOpen:c}=t,d=p(o),[l,j]=We({prop:i,defaultProp:c??!1,onChange:s,caller:xe});return e.jsx(Pe,{...d,open:l,onOpenChange:j,children:r})};ue.displayName=xe;var rt="ContextMenuSubTrigger",ce=a.forwardRef((t,o)=>{const{__scopeContextMenu:r,...s}=t,i=p(r);return e.jsx(we,{...i,...s,ref:o})});ce.displayName=rt;var st="ContextMenuSubContent",de=a.forwardRef((t,o)=>{const{__scopeContextMenu:r,...s}=t,i=p(r);return e.jsx(Ne,{...i,...s,ref:o,style:{...t.style,"--radix-context-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-context-menu-content-available-width":"var(--radix-popper-available-width)","--radix-context-menu-content-available-height":"var(--radix-popper-available-height)","--radix-context-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-context-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});de.displayName=st;function N(t){return o=>o.pointerType!=="mouse"?t(o):void 0}var it=J,at=Y,xt=K,ut=Z,ct=ee,dt=te,lt=ne,Ct=oe,mt=re,pt=se,Mt=ie,ht=ae,gt=ue,It=ce,ft=de;const m={ItemIndicator:Mt,Label:dt,CheckboxItem:Ct,Content:ut,Group:ct,RadioItem:pt,RadioGroup:mt,Item:lt,Portal:xt,Root:it,Sub:gt,SubTrigger:It,SubContent:ft,Separator:ht},M=t=>e.jsx(m.Root,{...t});M.displayName="ContextMenu.Root";const h=a.forwardRef(({children:t,...o},r)=>e.jsx(at,{...o,ref:r,asChild:!0,children:Ve(t)}));h.displayName="ContextMenu.Trigger";const le=a.createContext({}),g=a.forwardRef((t,o)=>{const r=fe(),{size:s=w.size.default,variant:i=w.variant.default,highContrast:c=w.highContrast.default}=t,{className:d,children:l,color:j,container:R,forceMount:C,...y}=L(t,w),f=j||r.accentColor;return e.jsx(m.Portal,{container:R,forceMount:C,children:e.jsx(F,{asChild:!0,children:e.jsx(m.Content,{"data-accent-color":f,alignOffset:-Number(s)*4,collisionPadding:10,...y,asChild:!1,ref:o,className:I("rt-PopperContent","rt-BaseMenuContent","rt-ContextMenuContent",d),children:e.jsx(H,{type:"auto",children:e.jsx("div",{className:I("rt-BaseMenuViewport","rt-ContextMenuViewport"),children:e.jsx(le.Provider,{value:a.useMemo(()=>({size:s,variant:i,color:f,highContrast:c}),[s,i,f,c]),children:l})})})})})})});g.displayName="ContextMenu.Content";const Ce=a.forwardRef(({className:t,...o},r)=>e.jsx(m.Label,{...o,asChild:!1,ref:r,className:I("rt-BaseMenuLabel","rt-ContextMenuLabel",t)}));Ce.displayName="ContextMenu.Label";const n=a.forwardRef((t,o)=>{const{className:r,children:s,color:i=Ge.color.default,shortcut:c,...d}=t;return e.jsxs(m.Item,{"data-accent-color":i,...d,ref:o,className:I("rt-reset","rt-BaseMenuItem","rt-ContextMenuItem",r),children:[e.jsx(W,{children:s}),c&&e.jsx("div",{className:"rt-BaseMenuShortcut rt-ContextMenuShortcut",children:c})]})});n.displayName="ContextMenu.Item";const me=a.forwardRef(({className:t,...o},r)=>e.jsx(m.Group,{...o,asChild:!1,ref:r,className:I("rt-BaseMenuGroup","rt-ContextMenuGroup",t)}));me.displayName="ContextMenu.Group";const pe=a.forwardRef(({className:t,...o},r)=>e.jsx(m.RadioGroup,{...o,asChild:!1,ref:r,className:I("rt-BaseMenuRadioGroup","rt-ContextMenuRadioGroup",t)}));pe.displayName="ContextMenu.RadioGroup";const Me=a.forwardRef((t,o)=>{const{children:r,className:s,color:i=Oe.color.default,...c}=t;return e.jsxs(m.RadioItem,{...c,asChild:!1,ref:o,"data-accent-color":i,className:I("rt-BaseMenuItem","rt-BaseMenuRadioItem","rt-ContextMenuItem","rt-ContextMenuRadioItem",s),children:[e.jsx(W,{children:r}),e.jsx(m.ItemIndicator,{className:"rt-BaseMenuItemIndicator rt-ContextMenuItemIndicator",children:e.jsx(U,{className:"rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon"})})]})});Me.displayName="ContextMenu.RadioItem";const he=a.forwardRef((t,o)=>{const{children:r,className:s,shortcut:i,color:c=Fe.color.default,...d}=t;return e.jsxs(m.CheckboxItem,{...d,asChild:!1,ref:o,"data-accent-color":c,className:I("rt-BaseMenuItem","rt-BaseMenuCheckboxItem","rt-ContextMenuItem","rt-ContextMenuCheckboxItem",s),children:[e.jsx(W,{children:r}),e.jsx(m.ItemIndicator,{className:"rt-BaseMenuItemIndicator rt-ContextMenuItemIndicator",children:e.jsx(U,{className:"rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon"})}),i&&e.jsx("div",{className:"rt-BaseMenuShortcut rt-ContextMenuShortcut",children:i})]})});he.displayName="ContextMenu.CheckboxItem";const S=t=>e.jsx(m.Sub,{...t});S.displayName="ContextMenu.Sub";const T=a.forwardRef((t,o)=>{const{className:r,children:s,...i}=t;return e.jsxs(m.SubTrigger,{...i,asChild:!1,ref:o,className:I("rt-BaseMenuItem","rt-BaseMenuSubTrigger","rt-ContextMenuItem","rt-ContextMenuSubTrigger",r),children:[s,e.jsx("div",{className:"rt-BaseMenuShortcut rt-ContextMenuShortcut",children:e.jsx(Le,{className:"rt-BaseMenuSubTriggerIcon rt-ContextMenuSubTriggerIcon"})})]})});T.displayName="ContextMenu.SubTrigger";const v=a.forwardRef((t,o)=>{const{size:r,variant:s,color:i,highContrast:c}=a.useContext(le),{className:d,children:l,container:j,forceMount:R,...C}=L({size:r,variant:s,color:i,highContrast:c,...t},w);return e.jsx(m.Portal,{container:j,forceMount:R,children:e.jsx(F,{asChild:!0,children:e.jsx(m.SubContent,{"data-accent-color":i,alignOffset:-Number(r)*4,sideOffset:1,collisionPadding:10,...C,asChild:!1,ref:o,className:I("rt-PopperContent","rt-BaseMenuContent","rt-BaseMenuSubContent","rt-ContextMenuContent","rt-ContextMenuSubContent",d),children:e.jsx(H,{type:"auto",children:e.jsx("div",{className:I("rt-BaseMenuViewport","rt-ContextMenuViewport"),children:l})})})})})});v.displayName="ContextMenu.SubContent";const x=a.forwardRef(({className:t,...o},r)=>e.jsx(m.Separator,{...o,asChild:!1,ref:r,className:I("rt-BaseMenuSeparator","rt-ContextMenuSeparator",t)}));x.displayName="ContextMenu.Separator";M.__docgenInfo={description:"",methods:[],displayName:"ContextMenu.Root"};h.__docgenInfo={description:"",methods:[],displayName:"ContextMenu.Trigger",composes:["ComponentPropsWithout"]};g.__docgenInfo={description:"",methods:[],displayName:"ContextMenu.Content",props:{container:{required:!1,tsType:{name:'ReactComponentPropsWithoutRef["container"]',raw:`React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Portal
>["container"]`},description:""}},composes:["ComponentPropsWithout"]};Ce.__docgenInfo={description:"",methods:[],displayName:"ContextMenu.Label",composes:["ComponentPropsWithout"]};n.__docgenInfo={description:"",methods:[],displayName:"ContextMenu.Item",composes:["ComponentPropsWithout"]};me.__docgenInfo={description:"",methods:[],displayName:"ContextMenu.Group",composes:["ComponentPropsWithout"]};pe.__docgenInfo={description:"",methods:[],displayName:"ContextMenu.RadioGroup",composes:["ComponentPropsWithout"]};Me.__docgenInfo={description:"",methods:[],displayName:"ContextMenu.RadioItem",composes:["ComponentPropsWithout"]};he.__docgenInfo={description:"",methods:[],displayName:"ContextMenu.CheckboxItem",composes:["ComponentPropsWithout"]};S.__docgenInfo={description:"",methods:[],displayName:"ContextMenu.Sub",composes:["ComponentPropsWithout"]};T.__docgenInfo={description:"",methods:[],displayName:"ContextMenu.SubTrigger",composes:["ComponentPropsWithout"]};v.__docgenInfo={description:"",methods:[],displayName:"ContextMenu.SubContent",props:{container:{required:!1,tsType:{name:'ReactComponentPropsWithoutRef["container"]',raw:`React.ComponentPropsWithoutRef<
  typeof ContextMenuPrimitive.Portal
>["container"]`},description:""}},composes:["ComponentPropsWithout"]};x.__docgenInfo={description:"",methods:[],displayName:"ContextMenu.Separator",composes:["ComponentPropsWithout"]};const Lt={title:"Base/ContextMenu",component:M,parameters:{layout:"centered"},decorators:[t=>e.jsx(F,{children:e.jsx("div",{style:{padding:"40px"},children:e.jsx(t,{})})})]},_={render:t=>e.jsxs(M,{children:[e.jsx(h,{children:e.jsxs(b,{style:{padding:"40px",border:"2px dashed #e1e5e9",borderRadius:"8px",textAlign:"center",cursor:"context-menu"},children:[e.jsx(u,{size:"3",children:"Right-click me"}),e.jsx(u,{size:"2",color:"gray",style:{marginTop:"4px",display:"block"},children:"Try right-clicking on this area"})]})}),e.jsxs(g,{children:[e.jsx(n,{children:"Copy"}),e.jsx(n,{children:"Paste"}),e.jsx(x,{}),e.jsx(n,{children:"Edit"}),e.jsx(n,{children:"Delete"})]})]})},k={render:t=>e.jsxs(M,{children:[e.jsx(h,{children:e.jsxs(b,{style:{padding:"20px",border:"1px solid #e1e5e9",borderRadius:"8px",backgroundColor:"#fafbfc",cursor:"context-menu",minWidth:"200px"},children:[e.jsx(u,{size:"2",weight:"medium",children:"📄 Document.pdf"}),e.jsx(u,{size:"1",color:"gray",style:{marginTop:"4px",display:"block"},children:"2.4 MB • Modified 2 hours ago"})]})}),e.jsxs(g,{children:[e.jsx(n,{children:"📂 Open"}),e.jsx(n,{children:"👁️ Preview"}),e.jsx(x,{}),e.jsx(n,{children:"📋 Copy"}),e.jsx(n,{children:"✂️ Cut"}),e.jsx(n,{children:"📄 Duplicate"}),e.jsx(x,{}),e.jsx(n,{children:"✏️ Rename"}),e.jsx(n,{children:"🗑️ Delete"}),e.jsx(x,{}),e.jsx(n,{children:"ℹ️ Properties"})]})]})},B={render:t=>e.jsxs(M,{children:[e.jsx(h,{children:e.jsx(b,{style:{padding:"20px",border:"1px solid #e1e5e9",borderRadius:"8px",backgroundColor:"#ffffff",cursor:"text",minHeight:"120px",lineHeight:"1.6"},children:e.jsx(u,{size:"2",children:"This is a sample text area. Right-click anywhere in this text to see the context menu with text editing options. You can select text and use the context menu for various operations."})})}),e.jsxs(g,{children:[e.jsx(n,{shortcut:"Ctrl+C",children:"Copy"}),e.jsx(n,{shortcut:"Ctrl+X",children:"Cut"}),e.jsx(n,{shortcut:"Ctrl+V",children:"Paste"}),e.jsx(x,{}),e.jsx(n,{shortcut:"Ctrl+A",children:"Select All"}),e.jsx(x,{}),e.jsx(n,{children:"Bold"}),e.jsx(n,{children:"Italic"}),e.jsx(n,{children:"Underline"}),e.jsx(x,{}),e.jsx(n,{children:"Find & Replace"})]})]})},A={render:t=>e.jsxs(M,{children:[e.jsx(h,{children:e.jsxs(b,{style:{padding:"30px",border:"1px solid #e1e5e9",borderRadius:"8px",backgroundColor:"#f8f9fa",cursor:"context-menu",textAlign:"center"},children:[e.jsx(u,{size:"3",children:"🎨 Design Element"}),e.jsx(u,{size:"2",color:"gray",style:{marginTop:"4px",display:"block"},children:"Right-click for design options"})]})}),e.jsxs(g,{children:[e.jsx(n,{children:"Edit"}),e.jsx(n,{children:"Duplicate"}),e.jsx(x,{}),e.jsxs(S,{children:[e.jsx(T,{children:"Arrange"}),e.jsxs(v,{children:[e.jsx(n,{children:"Bring to Front"}),e.jsx(n,{children:"Send to Back"}),e.jsx(x,{}),e.jsx(n,{children:"Bring Forward"}),e.jsx(n,{children:"Send Backward"})]})]}),e.jsxs(S,{children:[e.jsx(T,{children:"Transform"}),e.jsxs(v,{children:[e.jsx(n,{children:"Rotate 90° CW"}),e.jsx(n,{children:"Rotate 90° CCW"}),e.jsx(x,{}),e.jsx(n,{children:"Flip Horizontal"}),e.jsx(n,{children:"Flip Vertical"})]})]}),e.jsx(x,{}),e.jsx(n,{children:"Delete"})]})]})},E={render:t=>e.jsxs(M,{children:[e.jsx(h,{children:e.jsx(b,{style:{width:"200px",height:"150px",border:"1px solid #e1e5e9",borderRadius:"8px",backgroundColor:"#f0f0f0",display:"flex",alignItems:"center",justifyContent:"center",cursor:"context-menu",position:"relative"},children:e.jsxs("div",{style:{textAlign:"center"},children:[e.jsx(u,{size:"6",children:"🖼️"}),e.jsx(u,{size:"2",color:"gray",style:{marginTop:"8px",display:"block"},children:"image.jpg"})]})})}),e.jsxs(g,{children:[e.jsx(n,{children:"👁️ View Full Size"}),e.jsx(n,{children:"📋 Copy Image"}),e.jsx(n,{children:"📥 Save Image As..."}),e.jsx(x,{}),e.jsx(n,{children:"✏️ Edit Image"}),e.jsx(n,{children:"🔄 Replace Image"}),e.jsx(x,{}),e.jsxs(S,{children:[e.jsx(T,{children:"📤 Export As"}),e.jsxs(v,{children:[e.jsx(n,{children:"PNG"}),e.jsx(n,{children:"JPEG"}),e.jsx(n,{children:"WebP"}),e.jsx(n,{children:"SVG"})]})]}),e.jsx(x,{}),e.jsx(n,{children:"🗑️ Delete"})]})]})},z={render:t=>e.jsx("div",{style:{border:"1px solid #e1e5e9",borderRadius:"8px",overflow:"hidden"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{backgroundColor:"#f8f9fa"},children:[e.jsx("th",{style:{padding:"12px",border:"1px solid #e1e5e9",textAlign:"left"},children:e.jsx(u,{size:"2",weight:"medium",children:"Name"})}),e.jsx("th",{style:{padding:"12px",border:"1px solid #e1e5e9",textAlign:"left"},children:e.jsx(u,{size:"2",weight:"medium",children:"Role"})}),e.jsx("th",{style:{padding:"12px",border:"1px solid #e1e5e9",textAlign:"left"},children:e.jsx(u,{size:"2",weight:"medium",children:"Status"})})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsxs(M,{children:[e.jsx(h,{children:e.jsx("td",{style:{padding:"12px",border:"1px solid #e1e5e9",cursor:"context-menu"},children:e.jsx(u,{size:"2",children:"John Doe"})})}),e.jsxs(g,{children:[e.jsx(n,{children:"📋 Copy Cell"}),e.jsx(n,{children:"📄 Copy Row"}),e.jsx(x,{}),e.jsx(n,{children:"➕ Insert Row Above"}),e.jsx(n,{children:"➕ Insert Row Below"}),e.jsx(x,{}),e.jsx(n,{children:"✏️ Edit Cell"}),e.jsx(n,{children:"🗑️ Delete Row"})]})]}),e.jsx("td",{style:{padding:"12px",border:"1px solid #e1e5e9"},children:e.jsx(u,{size:"2",children:"Developer"})}),e.jsx("td",{style:{padding:"12px",border:"1px solid #e1e5e9"},children:e.jsx(u,{size:"2",color:"green",children:"Active"})})]})})]})})},D={render:t=>e.jsxs(M,{children:[e.jsx(h,{children:e.jsxs(b,{style:{padding:"20px",border:"1px solid #e1e5e9",borderRadius:"8px",backgroundColor:"#ffffff",cursor:"context-menu",minHeight:"100px"},children:[e.jsx(u,{size:"3",weight:"medium",style:{marginBottom:"8px",display:"block"},children:"Web Page Content"}),e.jsx(u,{size:"2",color:"blue",style:{textDecoration:"underline",cursor:"pointer",marginBottom:"8px",display:"block"},children:"https://example.com/link"}),e.jsx(u,{size:"2",children:"This simulates a web page with various elements. Right-click to see browser-like context menu options."})]})}),e.jsxs(g,{children:[e.jsx(n,{children:"⬅️ Back"}),e.jsx(n,{children:"➡️ Forward"}),e.jsx(n,{shortcut:"Ctrl+R",children:"🔄 Reload"}),e.jsx(x,{}),e.jsx(n,{shortcut:"Ctrl+S",children:"💾 Save As..."}),e.jsx(n,{children:"🖨️ Print..."}),e.jsx(x,{}),e.jsx(n,{children:"🔍 View Source"}),e.jsx(n,{shortcut:"F12",children:"🛠️ Inspect Element"})]})]})},G={render:t=>e.jsxs($e,{gap:"4",children:[e.jsxs(M,{children:[e.jsx(h,{children:e.jsx(b,{style:{padding:"20px",border:"1px solid #3b82f6",borderRadius:"8px",backgroundColor:"#eff6ff",cursor:"context-menu",textAlign:"center"},children:e.jsx(u,{size:"2",color:"blue",children:"📁 Folder"})})}),e.jsxs(g,{children:[e.jsx(n,{children:"Open"}),e.jsx(n,{children:"New File"}),e.jsx(n,{children:"New Folder"}),e.jsx(x,{}),e.jsx(n,{children:"Rename"}),e.jsx(n,{children:"Delete"})]})]}),e.jsxs(M,{children:[e.jsx(h,{children:e.jsx(b,{style:{padding:"20px",border:"1px solid #10b981",borderRadius:"8px",backgroundColor:"#ecfdf5",cursor:"context-menu",textAlign:"center"},children:e.jsx(u,{size:"2",color:"green",children:"📄 File"})})}),e.jsxs(g,{children:[e.jsx(n,{children:"Open"}),e.jsx(n,{children:"Edit"}),e.jsx(x,{}),e.jsx(n,{children:"Copy"}),e.jsx(n,{children:"Move"}),e.jsx(x,{}),e.jsx(n,{children:"Rename"}),e.jsx(n,{children:"Delete"})]})]}),e.jsxs(M,{children:[e.jsx(h,{children:e.jsx(b,{style:{padding:"20px",border:"1px solid #f59e0b",borderRadius:"8px",backgroundColor:"#fffbeb",cursor:"context-menu",textAlign:"center"},children:e.jsx(u,{size:"2",color:"orange",children:"🖼️ Image"})})}),e.jsxs(g,{children:[e.jsx(n,{children:"View"}),e.jsx(n,{children:"Edit"}),e.jsx(x,{}),e.jsx(n,{children:"Copy Image"}),e.jsx(n,{children:"Save As..."}),e.jsx(x,{}),e.jsxs(S,{children:[e.jsx(T,{children:"Export"}),e.jsxs(v,{children:[e.jsx(n,{children:"PNG"}),e.jsx(n,{children:"JPEG"}),e.jsx(n,{children:"WebP"})]})]})]})]})]})},O={render:t=>e.jsxs(M,{children:[e.jsx(h,{children:e.jsxs(b,{style:{padding:"20px",border:"1px solid #6b7280",borderRadius:"8px",backgroundColor:"#1f2937",color:"#f9fafb",cursor:"context-menu",fontFamily:"monospace"},children:[e.jsx(u,{size:"2",style:{color:"#10b981"},children:"const"})," ",e.jsx(u,{size:"2",style:{color:"#3b82f6"},children:"component"})," ",e.jsx(u,{size:"2",style:{color:"#f9fafb"},children:"="})," ",e.jsx(u,{size:"2",style:{color:"#fbbf24"},children:"'HelloWorld'"}),e.jsx("br",{}),e.jsx(u,{size:"1",color:"gray",style:{marginTop:"8px",display:"block"},children:"Right-click on this code block"})]})}),e.jsxs(g,{children:[e.jsx(n,{shortcut:"Ctrl+C",children:"📋 Copy"}),e.jsx(n,{shortcut:"Ctrl+X",children:"✂️ Cut"}),e.jsx(n,{shortcut:"Ctrl+V",children:"📄 Paste"}),e.jsx(x,{}),e.jsx(n,{children:"🔍 Find References"}),e.jsx(n,{children:"📝 Rename Symbol"}),e.jsx(x,{}),e.jsxs(S,{children:[e.jsx(T,{children:"🛠️ Refactor"}),e.jsxs(v,{children:[e.jsx(n,{children:"Extract Method"}),e.jsx(n,{children:"Extract Variable"}),e.jsx(n,{children:"Inline Variable"})]})]}),e.jsx(x,{}),e.jsx(n,{shortcut:"F12",children:"📍 Go to Definition"}),e.jsx(n,{children:"👁️ Peek Definition"})]})]})};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        padding: "40px",
        border: "2px dashed #e1e5e9",
        borderRadius: "8px",
        textAlign: "center",
        cursor: "context-menu"
      }}>
          <Text size="3">Right-click me</Text>
          <Text size="2" color="gray" style={{
          marginTop: "4px",
          display: "block"
        }}>
            Try right-clicking on this area
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>Copy</ContextMenu.Item>
        <ContextMenu.Item>Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Edit</ContextMenu.Item>
        <ContextMenu.Item>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,..._.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        padding: "20px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#fafbfc",
        cursor: "context-menu",
        minWidth: "200px"
      }}>
          <Text size="2" weight="medium">
            📄 Document.pdf
          </Text>
          <Text size="1" color="gray" style={{
          marginTop: "4px",
          display: "block"
        }}>
            2.4 MB • Modified 2 hours ago
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>📂 Open</ContextMenu.Item>
        <ContextMenu.Item>👁️ Preview</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>📋 Copy</ContextMenu.Item>
        <ContextMenu.Item>✂️ Cut</ContextMenu.Item>
        <ContextMenu.Item>📄 Duplicate</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>✏️ Rename</ContextMenu.Item>
        <ContextMenu.Item>🗑️ Delete</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>ℹ️ Properties</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,...k.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        padding: "20px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        cursor: "text",
        minHeight: "120px",
        lineHeight: "1.6"
      }}>
          <Text size="2">
            This is a sample text area. Right-click anywhere in this text to see
            the context menu with text editing options. You can select text and
            use the context menu for various operations.
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item shortcut="Ctrl+C">Copy</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+X">Cut</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+V">Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="Ctrl+A">Select All</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Bold</ContextMenu.Item>
        <ContextMenu.Item>Italic</ContextMenu.Item>
        <ContextMenu.Item>Underline</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Find & Replace</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,...B.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        padding: "30px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#f8f9fa",
        cursor: "context-menu",
        textAlign: "center"
      }}>
          <Text size="3">🎨 Design Element</Text>
          <Text size="2" color="gray" style={{
          marginTop: "4px",
          display: "block"
        }}>
            Right-click for design options
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>Edit</ContextMenu.Item>
        <ContextMenu.Item>Duplicate</ContextMenu.Item>
        <ContextMenu.Separator />

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>Arrange</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Bring to Front</ContextMenu.Item>
            <ContextMenu.Item>Send to Back</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Bring Forward</ContextMenu.Item>
            <ContextMenu.Item>Send Backward</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>Transform</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Rotate 90° CW</ContextMenu.Item>
            <ContextMenu.Item>Rotate 90° CCW</ContextMenu.Item>
            <ContextMenu.Separator />
            <ContextMenu.Item>Flip Horizontal</ContextMenu.Item>
            <ContextMenu.Item>Flip Vertical</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>

        <ContextMenu.Separator />
        <ContextMenu.Item>Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,...A.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        width: "200px",
        height: "150px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "context-menu",
        position: "relative"
      }}>
          <div style={{
          textAlign: "center"
        }}>
            <Text size="6">🖼️</Text>
            <Text size="2" color="gray" style={{
            marginTop: "8px",
            display: "block"
          }}>
              image.jpg
            </Text>
          </div>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>👁️ View Full Size</ContextMenu.Item>
        <ContextMenu.Item>📋 Copy Image</ContextMenu.Item>
        <ContextMenu.Item>📥 Save Image As...</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>✏️ Edit Image</ContextMenu.Item>
        <ContextMenu.Item>🔄 Replace Image</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>📤 Export As</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>PNG</ContextMenu.Item>
            <ContextMenu.Item>JPEG</ContextMenu.Item>
            <ContextMenu.Item>WebP</ContextMenu.Item>
            <ContextMenu.Item>SVG</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>
        <ContextMenu.Separator />
        <ContextMenu.Item>🗑️ Delete</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,...E.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: _args => <div style={{
    border: "1px solid #e1e5e9",
    borderRadius: "8px",
    overflow: "hidden"
  }}>
      <table style={{
      width: "100%",
      borderCollapse: "collapse"
    }}>
        <thead>
          <tr style={{
          backgroundColor: "#f8f9fa"
        }}>
            <th style={{
            padding: "12px",
            border: "1px solid #e1e5e9",
            textAlign: "left"
          }}>
              <Text size="2" weight="medium">
                Name
              </Text>
            </th>
            <th style={{
            padding: "12px",
            border: "1px solid #e1e5e9",
            textAlign: "left"
          }}>
              <Text size="2" weight="medium">
                Role
              </Text>
            </th>
            <th style={{
            padding: "12px",
            border: "1px solid #e1e5e9",
            textAlign: "left"
          }}>
              <Text size="2" weight="medium">
                Status
              </Text>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <ContextMenu.Root>
              <ContextMenu.Trigger>
                <td style={{
                padding: "12px",
                border: "1px solid #e1e5e9",
                cursor: "context-menu"
              }}>
                  <Text size="2">John Doe</Text>
                </td>
              </ContextMenu.Trigger>
              <ContextMenu.Content>
                <ContextMenu.Item>📋 Copy Cell</ContextMenu.Item>
                <ContextMenu.Item>📄 Copy Row</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item>➕ Insert Row Above</ContextMenu.Item>
                <ContextMenu.Item>➕ Insert Row Below</ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item>✏️ Edit Cell</ContextMenu.Item>
                <ContextMenu.Item>🗑️ Delete Row</ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu.Root>
            <td style={{
            padding: "12px",
            border: "1px solid #e1e5e9"
          }}>
              <Text size="2">Developer</Text>
            </td>
            <td style={{
            padding: "12px",
            border: "1px solid #e1e5e9"
          }}>
              <Text size="2" color="green">
                Active
              </Text>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
}`,...z.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        padding: "20px",
        border: "1px solid #e1e5e9",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        cursor: "context-menu",
        minHeight: "100px"
      }}>
          <Text size="3" weight="medium" style={{
          marginBottom: "8px",
          display: "block"
        }}>
            Web Page Content
          </Text>
          <Text size="2" color="blue" style={{
          textDecoration: "underline",
          cursor: "pointer",
          marginBottom: "8px",
          display: "block"
        }}>
            https://example.com/link
          </Text>
          <Text size="2">
            This simulates a web page with various elements. Right-click to see
            browser-like context menu options.
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item>⬅️ Back</ContextMenu.Item>
        <ContextMenu.Item>➡️ Forward</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+R">🔄 Reload</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="Ctrl+S">💾 Save As...</ContextMenu.Item>
        <ContextMenu.Item>🖨️ Print...</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>🔍 View Source</ContextMenu.Item>
        <ContextMenu.Item shortcut="F12">🛠️ Inspect Element</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,...D.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: _args => <Flex gap="4">
      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Box style={{
          padding: "20px",
          border: "1px solid #3b82f6",
          borderRadius: "8px",
          backgroundColor: "#eff6ff",
          cursor: "context-menu",
          textAlign: "center"
        }}>
            <Text size="2" color="blue">
              📁 Folder
            </Text>
          </Box>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Open</ContextMenu.Item>
          <ContextMenu.Item>New File</ContextMenu.Item>
          <ContextMenu.Item>New Folder</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Rename</ContextMenu.Item>
          <ContextMenu.Item>Delete</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>

      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Box style={{
          padding: "20px",
          border: "1px solid #10b981",
          borderRadius: "8px",
          backgroundColor: "#ecfdf5",
          cursor: "context-menu",
          textAlign: "center"
        }}>
            <Text size="2" color="green">
              📄 File
            </Text>
          </Box>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>Open</ContextMenu.Item>
          <ContextMenu.Item>Edit</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Copy</ContextMenu.Item>
          <ContextMenu.Item>Move</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Rename</ContextMenu.Item>
          <ContextMenu.Item>Delete</ContextMenu.Item>
        </ContextMenu.Content>
      </ContextMenu.Root>

      <ContextMenu.Root>
        <ContextMenu.Trigger>
          <Box style={{
          padding: "20px",
          border: "1px solid #f59e0b",
          borderRadius: "8px",
          backgroundColor: "#fffbeb",
          cursor: "context-menu",
          textAlign: "center"
        }}>
            <Text size="2" color="orange">
              🖼️ Image
            </Text>
          </Box>
        </ContextMenu.Trigger>
        <ContextMenu.Content>
          <ContextMenu.Item>View</ContextMenu.Item>
          <ContextMenu.Item>Edit</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Item>Copy Image</ContextMenu.Item>
          <ContextMenu.Item>Save As...</ContextMenu.Item>
          <ContextMenu.Separator />
          <ContextMenu.Sub>
            <ContextMenu.SubTrigger>Export</ContextMenu.SubTrigger>
            <ContextMenu.SubContent>
              <ContextMenu.Item>PNG</ContextMenu.Item>
              <ContextMenu.Item>JPEG</ContextMenu.Item>
              <ContextMenu.Item>WebP</ContextMenu.Item>
            </ContextMenu.SubContent>
          </ContextMenu.Sub>
        </ContextMenu.Content>
      </ContextMenu.Root>
    </Flex>
}`,...G.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  render: _args => <ContextMenu.Root>
      <ContextMenu.Trigger>
        <Box style={{
        padding: "20px",
        border: "1px solid #6b7280",
        borderRadius: "8px",
        backgroundColor: "#1f2937",
        color: "#f9fafb",
        cursor: "context-menu",
        fontFamily: "monospace"
      }}>
          <Text size="2" style={{
          color: "#10b981"
        }}>
            const
          </Text>{" "}
          <Text size="2" style={{
          color: "#3b82f6"
        }}>
            component
          </Text>{" "}
          <Text size="2" style={{
          color: "#f9fafb"
        }}>
            =
          </Text>{" "}
          <Text size="2" style={{
          color: "#fbbf24"
        }}>
            'HelloWorld'
          </Text>
          <br />
          <Text size="1" color="gray" style={{
          marginTop: "8px",
          display: "block"
        }}>
            Right-click on this code block
          </Text>
        </Box>
      </ContextMenu.Trigger>

      <ContextMenu.Content>
        <ContextMenu.Item shortcut="Ctrl+C">📋 Copy</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+X">✂️ Cut</ContextMenu.Item>
        <ContextMenu.Item shortcut="Ctrl+V">📄 Paste</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>🔍 Find References</ContextMenu.Item>
        <ContextMenu.Item>📝 Rename Symbol</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Sub>
          <ContextMenu.SubTrigger>🛠️ Refactor</ContextMenu.SubTrigger>
          <ContextMenu.SubContent>
            <ContextMenu.Item>Extract Method</ContextMenu.Item>
            <ContextMenu.Item>Extract Variable</ContextMenu.Item>
            <ContextMenu.Item>Inline Variable</ContextMenu.Item>
          </ContextMenu.SubContent>
        </ContextMenu.Sub>
        <ContextMenu.Separator />
        <ContextMenu.Item shortcut="F12">📍 Go to Definition</ContextMenu.Item>
        <ContextMenu.Item>👁️ Peek Definition</ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
}`,...O.parameters?.docs?.source}}};const $t=["Default","FileOperations","TextEditing","WithSubmenus","ImageContextMenu","TableCellMenu","BrowserLikeMenu","MultipleTriggerAreas","DeveloperMenu"];export{D as BrowserLikeMenu,_ as Default,O as DeveloperMenu,k as FileOperations,E as ImageContextMenu,G as MultipleTriggerAreas,z as TableCellMenu,B as TextEditing,A as WithSubmenus,$t as __namedExportsOrder,Lt as default};
