import{j as e}from"./jsx-runtime-D_zvdyIk.js";import{r as a}from"./iframe-DsuaOdjx.js";import{I as $}from"./icon-button-eAI2XZbo.js";import{c as ge,a as V,e as De,T as J}from"./theme-BFbej9HP.js";import{P as je,i as fe,e as K,a as g,g as Ie}from"./high-contrast.prop-DN4VqJ5o.js";import{u as Y}from"./index-Bg7roRMb.js";import{c as q,R as ye,A as ve,P as be,C as Se,I as Ce,S as Re,L as Te,a as Ne,b as Pe,d as _e,f as ke,g as ze,h as Ae,e as Be,G as Ee,i as Le,j as R,k as X,l as Oe,m as Ge,n as We}from"./scroll-area-DDgKAQ7E.js";import{u as H}from"./index-FlXuF2W-.js";import{r as Fe}from"./require-react-element-BySUkP0S.js";import{T as Ve,a as Q}from"./icons-Ca5JYYu5.js";import{B as v}from"./button-jOk6Qw9K.js";import{T as l}from"./text-Bwa-Y73d.js";import{F as $e}from"./flex-bym-5aeO.js";import"./preload-helper-D9Z9MdNV.js";import"./icon-button-QpiRLWqf.js";import"./base-button-Dyf4vkZD.js";import"./radius.prop-BFb5uVoY.js";import"./index-CVlKO6je.js";import"./index-BW54sZL3.js";import"./index-DVM_hVnM.js";import"./index-DT1UHsoa.js";import"./index-BdQq_4o_.js";import"./get-subtree-COcTOnEl.js";import"./button-ClCv9eVs.js";import"./weight.prop-Rt1sSGdE.js";var U="DropdownMenu",[Ue,Kn]=ge(U,[q]),h=q(),[Je,Z]=Ue(U),ee=n=>{const{__scopeDropdownMenu:o,children:r,dir:d,open:s,defaultOpen:i,onOpenChange:u,modal:c=!0}=n,D=h(o),y=a.useRef(null),[I,b]=Y({prop:s,defaultProp:i??!1,onChange:u,caller:U});return e.jsx(Je,{scope:o,triggerId:H(),triggerRef:y,contentId:H(),open:I,onOpenChange:b,onOpenToggle:a.useCallback(()=>b(C=>!C),[b]),modal:c,children:e.jsx(ye,{...D,open:I,onOpenChange:b,dir:d,modal:c,children:r})})};ee.displayName=U;var ne="DropdownMenuTrigger",oe=a.forwardRef((n,o)=>{const{__scopeDropdownMenu:r,disabled:d=!1,...s}=n,i=Z(ne,r),u=h(r);return e.jsx(ve,{asChild:!0,...u,children:e.jsx(je.button,{type:"button",id:i.triggerId,"aria-haspopup":"menu","aria-expanded":i.open,"aria-controls":i.open?i.contentId:void 0,"data-state":i.open?"open":"closed","data-disabled":d?"":void 0,disabled:d,...s,ref:fe(o,i.triggerRef),onPointerDown:V(n.onPointerDown,c=>{!d&&c.button===0&&c.ctrlKey===!1&&(i.onOpenToggle(),i.open||c.preventDefault())}),onKeyDown:V(n.onKeyDown,c=>{d||(["Enter"," "].includes(c.key)&&i.onOpenToggle(),c.key==="ArrowDown"&&i.onOpenChange(!0),["Enter"," ","ArrowDown"].includes(c.key)&&c.preventDefault())})})})});oe.displayName=ne;var He="DropdownMenuPortal",re=n=>{const{__scopeDropdownMenu:o,...r}=n,d=h(o);return e.jsx(be,{...d,...r})};re.displayName=He;var te="DropdownMenuContent",de=a.forwardRef((n,o)=>{const{__scopeDropdownMenu:r,...d}=n,s=Z(te,r),i=h(r),u=a.useRef(!1);return e.jsx(Se,{id:s.contentId,"aria-labelledby":s.triggerId,...i,...d,ref:o,onCloseAutoFocus:V(n.onCloseAutoFocus,c=>{u.current||s.triggerRef.current?.focus(),u.current=!1,c.preventDefault()}),onInteractOutside:V(n.onInteractOutside,c=>{const D=c.detail.originalEvent,y=D.button===0&&D.ctrlKey===!0,I=D.button===2||y;(!s.modal||I)&&(u.current=!0)}),style:{...n.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});de.displayName=te;var Ke="DropdownMenuGroup",se=a.forwardRef((n,o)=>{const{__scopeDropdownMenu:r,...d}=n,s=h(r);return e.jsx(Ee,{...s,...d,ref:o})});se.displayName=Ke;var Ye="DropdownMenuLabel",ae=a.forwardRef((n,o)=>{const{__scopeDropdownMenu:r,...d}=n,s=h(r);return e.jsx(Te,{...s,...d,ref:o})});ae.displayName=Ye;var qe="DropdownMenuItem",ie=a.forwardRef((n,o)=>{const{__scopeDropdownMenu:r,...d}=n,s=h(r);return e.jsx(Ce,{...s,...d,ref:o})});ie.displayName=qe;var Xe="DropdownMenuCheckboxItem",pe=a.forwardRef((n,o)=>{const{__scopeDropdownMenu:r,...d}=n,s=h(r);return e.jsx(Be,{...s,...d,ref:o})});pe.displayName=Xe;var Qe="DropdownMenuRadioGroup",le=a.forwardRef((n,o)=>{const{__scopeDropdownMenu:r,...d}=n,s=h(r);return e.jsx(ke,{...s,...d,ref:o})});le.displayName=Qe;var Ze="DropdownMenuRadioItem",ue=a.forwardRef((n,o)=>{const{__scopeDropdownMenu:r,...d}=n,s=h(r);return e.jsx(ze,{...s,...d,ref:o})});ue.displayName=Ze;var en="DropdownMenuItemIndicator",ce=a.forwardRef((n,o)=>{const{__scopeDropdownMenu:r,...d}=n,s=h(r);return e.jsx(Ae,{...s,...d,ref:o})});ce.displayName=en;var nn="DropdownMenuSeparator",me=a.forwardRef((n,o)=>{const{__scopeDropdownMenu:r,...d}=n,s=h(r);return e.jsx(Re,{...s,...d,ref:o})});me.displayName=nn;var on="DropdownMenuArrow",rn=a.forwardRef((n,o)=>{const{__scopeDropdownMenu:r,...d}=n,s=h(r);return e.jsx(Le,{...s,...d,ref:o})});rn.displayName=on;var tn=n=>{const{__scopeDropdownMenu:o,children:r,open:d,onOpenChange:s,defaultOpen:i}=n,u=h(o),[c,D]=Y({prop:d,defaultProp:i??!1,onChange:s,caller:"DropdownMenuSub"});return e.jsx(Ne,{...u,open:c,onOpenChange:D,children:r})},dn="DropdownMenuSubTrigger",he=a.forwardRef((n,o)=>{const{__scopeDropdownMenu:r,...d}=n,s=h(r);return e.jsx(Pe,{...s,...d,ref:o})});he.displayName=dn;var sn="DropdownMenuSubContent",xe=a.forwardRef((n,o)=>{const{__scopeDropdownMenu:r,...d}=n,s=h(r);return e.jsx(_e,{...s,...d,ref:o,style:{...n.style,"--radix-dropdown-menu-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-dropdown-menu-content-available-width":"var(--radix-popper-available-width)","--radix-dropdown-menu-content-available-height":"var(--radix-popper-available-height)","--radix-dropdown-menu-trigger-width":"var(--radix-popper-anchor-width)","--radix-dropdown-menu-trigger-height":"var(--radix-popper-anchor-height)"}})});xe.displayName=sn;var an=ee,pn=oe,ln=re,un=de,cn=se,mn=ae,hn=ie,xn=pe,wn=le,Mn=ue,gn=ce,Dn=me,jn=tn,fn=he,In=xe;const m={CheckboxItem:xn,Content:un,ItemIndicator:gn,Group:cn,Item:hn,Label:mn,Portal:ln,RadioGroup:wn,RadioItem:Mn,Root:an,Sub:jn,SubContent:In,SubTrigger:fn,Separator:Dn,Trigger:pn},x=n=>e.jsx(m.Root,{...n});x.displayName="DropdownMenu.Root";const w=a.forwardRef(({children:n,...o},r)=>e.jsx(m.Trigger,{...o,ref:r,asChild:!0,children:Fe(n)}));w.displayName="DropdownMenu.Trigger";const we=a.createContext({}),M=a.forwardRef((n,o)=>{const r=De(),{size:d=R.size.default,variant:s=R.variant.default,highContrast:i=R.highContrast.default}=n,{className:u,children:c,color:D,container:y,forceMount:I,...b}=K(n,R),C=D||r.accentColor;return e.jsx(m.Portal,{container:y,forceMount:I,children:e.jsx(J,{asChild:!0,children:e.jsx(m.Content,{"data-accent-color":C,align:"start",sideOffset:4,collisionPadding:10,...b,asChild:!1,ref:o,className:g("rt-PopperContent","rt-BaseMenuContent","rt-DropdownMenuContent",u),children:e.jsx(X,{type:"auto",children:e.jsx("div",{className:g("rt-BaseMenuViewport","rt-DropdownMenuViewport"),children:e.jsx(we.Provider,{value:a.useMemo(()=>({size:d,variant:s,color:C,highContrast:i}),[d,s,C,i]),children:c})})})})})})});M.displayName="DropdownMenu.Content";const f=a.forwardRef(({className:n,...o},r)=>e.jsx(m.Label,{...o,asChild:!1,ref:r,className:g("rt-BaseMenuLabel","rt-DropdownMenuLabel",n)}));f.displayName="DropdownMenu.Label";const t=a.forwardRef((n,o)=>{const{className:r,children:d,color:s=Oe.color.default,shortcut:i,...u}=n;return e.jsxs(m.Item,{"data-accent-color":s,...u,ref:o,className:g("rt-reset","rt-BaseMenuItem","rt-DropdownMenuItem",r),children:[e.jsx(Ie,{children:d}),i&&e.jsx("div",{className:"rt-BaseMenuShortcut rt-DropdownMenuShortcut",children:i})]})});t.displayName="DropdownMenu.Item";const Me=a.forwardRef(({className:n,...o},r)=>e.jsx(m.Group,{...o,asChild:!1,ref:r,className:g("rt-BaseMenuGroup","rt-DropdownMenuGroup",n)}));Me.displayName="DropdownMenu.Group";const _=a.forwardRef(({className:n,...o},r)=>e.jsx(m.RadioGroup,{...o,asChild:!1,ref:r,className:g("rt-BaseMenuRadioGroup","rt-DropdownMenuRadioGroup",n)}));_.displayName="DropdownMenu.RadioGroup";const j=a.forwardRef((n,o)=>{const{children:r,className:d,color:s=Ge.color.default,...i}=n;return e.jsxs(m.RadioItem,{...i,asChild:!1,ref:o,"data-accent-color":s,className:g("rt-BaseMenuItem","rt-BaseMenuRadioItem","rt-DropdownMenuItem","rt-DropdownMenuRadioItem",d),children:[r,e.jsx(m.ItemIndicator,{className:"rt-BaseMenuItemIndicator rt-DropdownMenuItemIndicator",children:e.jsx(Q,{className:"rt-BaseMenuItemIndicatorIcon rt-DropdownMenuItemIndicatorIcon"})})]})});j.displayName="DropdownMenu.RadioItem";const S=a.forwardRef((n,o)=>{const{children:r,className:d,shortcut:s,color:i=We.color.default,...u}=n;return e.jsxs(m.CheckboxItem,{...u,asChild:!1,ref:o,"data-accent-color":i,className:g("rt-BaseMenuItem","rt-BaseMenuCheckboxItem","rt-DropdownMenuItem","rt-DropdownMenuCheckboxItem",d),children:[r,e.jsx(m.ItemIndicator,{className:"rt-BaseMenuItemIndicator rt-DropdownMenuItemIndicator",children:e.jsx(Q,{className:"rt-BaseMenuItemIndicatorIcon rt-ContextMenuItemIndicatorIcon"})}),s&&e.jsx("div",{className:"rt-BaseMenuShortcut rt-DropdownMenuShortcut",children:s})]})});S.displayName="DropdownMenu.CheckboxItem";const T=n=>e.jsx(m.Sub,{...n});T.displayName="DropdownMenu.Sub";const N=a.forwardRef((n,o)=>{const{className:r,children:d,...s}=n;return e.jsxs(m.SubTrigger,{...s,asChild:!1,ref:o,className:g("rt-BaseMenuItem","rt-BaseMenuSubTrigger","rt-DropdownMenuItem","rt-DropdownMenuSubTrigger",r),children:[d,e.jsx("div",{className:"rt-BaseMenuShortcut rt-DropdownMenuShortcut",children:e.jsx(Ve,{className:"rt-BaseMenuSubTriggerIcon rt-DropdownMenuSubtriggerIcon"})})]})});N.displayName="DropdownMenu.SubTrigger";const P=a.forwardRef((n,o)=>{const{size:r,variant:d,color:s,highContrast:i}=a.useContext(we),{className:u,children:c,container:D,forceMount:y,...I}=K({size:r,variant:d,color:s,highContrast:i,...n},R);return e.jsx(m.Portal,{container:D,forceMount:y,children:e.jsx(J,{asChild:!0,children:e.jsx(m.SubContent,{"data-accent-color":s,alignOffset:-Number(r)*4,sideOffset:1,collisionPadding:10,...I,asChild:!1,ref:o,className:g("rt-PopperContent","rt-BaseMenuContent","rt-BaseMenuSubContent","rt-DropdownMenuContent","rt-DropdownMenuSubContent",u),children:e.jsx(X,{type:"auto",children:e.jsx("div",{className:g("rt-BaseMenuViewport","rt-DropdownMenuViewport"),children:c})})})})})});P.displayName="DropdownMenu.SubContent";const p=a.forwardRef(({className:n,...o},r)=>e.jsx(m.Separator,{...o,asChild:!1,ref:r,className:g("rt-BaseMenuSeparator","rt-DropdownMenuSeparator",n)}));p.displayName="DropdownMenu.Separator";x.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu.Root"};w.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu.Trigger",composes:["ComponentPropsWithout"]};M.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu.Content",props:{container:{required:!1,tsType:{name:'ReactComponentPropsWithoutRef["container"]',raw:`React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Portal
>["container"]`},description:""}},composes:["ComponentPropsWithout"]};f.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu.Label",composes:["ComponentPropsWithout"]};t.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu.Item",composes:["ComponentPropsWithout"]};Me.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu.Group",composes:["ComponentPropsWithout"]};_.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu.RadioGroup",composes:["ComponentPropsWithout"]};j.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu.RadioItem",composes:["ComponentPropsWithout"]};S.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu.CheckboxItem",composes:["ComponentPropsWithout"]};T.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu.Sub"};N.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu.SubTrigger",composes:["ComponentPropsWithout"]};P.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu.SubContent",props:{container:{required:!1,tsType:{name:'ReactComponentPropsWithoutRef["container"]',raw:`React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Portal
>["container"]`},description:""}},composes:["ComponentPropsWithout"]};p.__docgenInfo={description:"",methods:[],displayName:"DropdownMenu.Separator",composes:["ComponentPropsWithout"]};const Yn={title:"Base/DropdownMenu",component:x,parameters:{layout:"centered"},decorators:[n=>e.jsx(J,{children:e.jsx("div",{style:{padding:"40px"},children:e.jsx(n,{})})})]},k={render:n=>e.jsxs(x,{children:[e.jsx(w,{children:e.jsx(v,{variant:"outline",children:"Options ▼"})}),e.jsxs(M,{children:[e.jsx(t,{children:"Edit"}),e.jsx(t,{children:"Duplicate"}),e.jsx(p,{}),e.jsx(t,{children:"Archive"}),e.jsx(t,{color:"red",children:"Delete"})]})]})},z={render:n=>e.jsxs(x,{children:[e.jsx(w,{children:e.jsx(v,{variant:"ghost",style:{padding:"8px"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx("div",{style:{width:"32px",height:"32px",backgroundColor:"#3b82f6",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"14px",fontWeight:"bold"},children:"JD"}),e.jsx(l,{size:"2",children:"John Doe"})]})})}),e.jsxs(M,{style:{minWidth:"200px"},children:[e.jsx(f,{children:e.jsxs("div",{style:{padding:"4px 0"},children:[e.jsx(l,{size:"2",weight:"medium",children:"John Doe"}),e.jsx(l,{size:"1",color:"gray",style:{display:"block"},children:"john@example.com"})]})}),e.jsx(p,{}),e.jsx(t,{children:"👤 Profile"}),e.jsx(t,{children:"⚙️ Settings"}),e.jsx(t,{children:"💳 Billing"}),e.jsx(p,{}),e.jsx(t,{children:"👥 Team"}),e.jsx(t,{children:"📊 Analytics"}),e.jsx(p,{}),e.jsx(t,{children:"❓ Help & Support"}),e.jsx(t,{children:"📋 Changelog"}),e.jsx(p,{}),e.jsx(t,{color:"red",children:"🚪 Sign out"})]})]})},A={render:n=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",padding:"12px",border:"1px solid #e1e5e9",borderRadius:"8px"},children:[e.jsx("div",{style:{fontSize:"24px"},children:"📄"}),e.jsxs("div",{style:{flex:1},children:[e.jsx(l,{size:"2",weight:"medium",children:"project-proposal.pdf"}),e.jsx(l,{size:"1",color:"gray",style:{display:"block"},children:"2.4 MB • Modified 2 hours ago"})]}),e.jsxs(x,{children:[e.jsx(w,{children:e.jsx($,{variant:"ghost",size:"1",children:"⋯"})}),e.jsxs(M,{children:[e.jsx(t,{children:"📂 Open"}),e.jsx(t,{children:"📥 Download"}),e.jsx(t,{children:"👁️ Preview"}),e.jsx(p,{}),e.jsx(t,{children:"📋 Copy Link"}),e.jsx(t,{children:"🔗 Share"}),e.jsx(p,{}),e.jsx(t,{children:"✏️ Rename"}),e.jsx(t,{children:"📁 Move"}),e.jsx(t,{children:"📄 Duplicate"}),e.jsx(p,{}),e.jsx(t,{color:"red",children:"🗑️ Delete"})]})]})]})},B={render:n=>e.jsxs(x,{children:[e.jsx(w,{children:e.jsx(v,{variant:"outline",children:"Create New ▼"})}),e.jsxs(M,{children:[e.jsx(t,{children:"📄 Document"}),e.jsx(t,{children:"📊 Spreadsheet"}),e.jsx(t,{children:"🎨 Presentation"}),e.jsx(p,{}),e.jsxs(T,{children:[e.jsx(N,{children:"📁 Folder"}),e.jsxs(P,{children:[e.jsx(t,{children:"📂 Regular Folder"}),e.jsx(t,{children:"🔒 Private Folder"}),e.jsx(t,{children:"👥 Shared Folder"})]})]}),e.jsxs(T,{children:[e.jsx(N,{children:"🎯 Project"}),e.jsxs(P,{children:[e.jsx(t,{children:"💻 Web Project"}),e.jsx(t,{children:"📱 Mobile Project"}),e.jsx(t,{children:"🖥️ Desktop Project"}),e.jsx(p,{}),e.jsx(t,{children:"📋 From Template"})]})]}),e.jsx(p,{}),e.jsx(t,{children:"📤 Import"})]})]})},E={render:n=>e.jsxs($e,{gap:"6",align:"center",children:[e.jsx(l,{size:"3",weight:"bold",children:"MyApp"}),e.jsxs(x,{children:[e.jsx(w,{children:e.jsx(v,{variant:"ghost",children:"Products ▼"})}),e.jsxs(M,{children:[e.jsx(t,{children:"💻 Desktop App"}),e.jsx(t,{children:"📱 Mobile App"}),e.jsx(t,{children:"🌐 Web Platform"}),e.jsx(p,{}),e.jsx(t,{children:"🔧 Developer Tools"}),e.jsx(t,{children:"📊 Analytics"}),e.jsx(p,{}),e.jsx(t,{children:"🎯 Enterprise Solutions"})]})]}),e.jsxs(x,{children:[e.jsx(w,{children:e.jsx(v,{variant:"ghost",children:"Resources ▼"})}),e.jsxs(M,{children:[e.jsx(t,{children:"📚 Documentation"}),e.jsx(t,{children:"🎓 Tutorials"}),e.jsx(t,{children:"💡 Examples"}),e.jsx(p,{}),e.jsx(t,{children:"📝 Blog"}),e.jsx(t,{children:"🎙️ Podcast"}),e.jsx(p,{}),e.jsx(t,{children:"👥 Community"}),e.jsx(t,{children:"💬 Discord"})]})]})]})},L={render:n=>{const[o,r]=a.useState("light"),[d,s]=a.useState(!0),[i,u]=a.useState(!1);return e.jsxs(x,{children:[e.jsx(w,{children:e.jsx($,{variant:"ghost",children:"⚙️"})}),e.jsxs(M,{children:[e.jsx(f,{children:"Display Settings"}),e.jsxs(_,{value:o,onValueChange:r,children:[e.jsx(j,{value:"light",children:"☀️ Light Mode"}),e.jsx(j,{value:"dark",children:"🌙 Dark Mode"}),e.jsx(j,{value:"auto",children:"🔄 Auto"})]}),e.jsx(p,{}),e.jsx(f,{children:"Preferences"}),e.jsx(S,{checked:d,onCheckedChange:s,children:"🔔 Enable Notifications"}),e.jsx(S,{checked:i,onCheckedChange:u,children:"💾 Auto-save"}),e.jsx(p,{}),e.jsx(t,{children:"⚙️ Advanced Settings"})]})]})}},O={render:n=>e.jsx("div",{style:{border:"1px solid #e1e5e9",borderRadius:"8px",overflow:"hidden"},children:e.jsxs("table",{style:{width:"100%",borderCollapse:"collapse"},children:[e.jsx("thead",{children:e.jsxs("tr",{style:{backgroundColor:"#f8f9fa"},children:[e.jsx("th",{style:{padding:"12px",border:"1px solid #e1e5e9",textAlign:"left"},children:e.jsx(l,{size:"2",weight:"medium",children:"User"})}),e.jsx("th",{style:{padding:"12px",border:"1px solid #e1e5e9",textAlign:"left"},children:e.jsx(l,{size:"2",weight:"medium",children:"Role"})}),e.jsx("th",{style:{padding:"12px",border:"1px solid #e1e5e9",textAlign:"left"},children:e.jsx(l,{size:"2",weight:"medium",children:"Status"})}),e.jsx("th",{style:{padding:"12px",border:"1px solid #e1e5e9",width:"60px"}})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{style:{padding:"12px",border:"1px solid #e1e5e9"},children:e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px"},children:[e.jsx("div",{style:{width:"32px",height:"32px",backgroundColor:"#e1e5e9",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"},children:e.jsx(l,{size:"1",weight:"bold",children:"JD"})}),e.jsxs("div",{children:[e.jsx(l,{size:"2",weight:"medium",children:"John Doe"}),e.jsx(l,{size:"1",color:"gray",style:{display:"block"},children:"john@example.com"})]})]})}),e.jsx("td",{style:{padding:"12px",border:"1px solid #e1e5e9"},children:e.jsx(l,{size:"2",children:"Admin"})}),e.jsx("td",{style:{padding:"12px",border:"1px solid #e1e5e9"},children:e.jsx(l,{size:"2",color:"green",children:"Active"})}),e.jsx("td",{style:{padding:"12px",border:"1px solid #e1e5e9",textAlign:"center"},children:e.jsxs(x,{children:[e.jsx(w,{children:e.jsx($,{variant:"ghost",size:"1",children:"⋯"})}),e.jsxs(M,{children:[e.jsx(t,{children:"👁️ View Profile"}),e.jsx(t,{children:"✏️ Edit User"}),e.jsx(p,{}),e.jsx(t,{children:"🔄 Reset Password"}),e.jsx(t,{children:"📧 Send Email"}),e.jsx(p,{}),e.jsxs(T,{children:[e.jsx(N,{children:"👤 Change Role"}),e.jsxs(P,{children:[e.jsx(t,{children:"Admin"}),e.jsx(t,{children:"Editor"}),e.jsx(t,{children:"Viewer"})]})]}),e.jsx(p,{}),e.jsx(t,{color:"red",children:"🚫 Deactivate"})]})]})})]})})]})})},G={render:n=>e.jsxs(x,{children:[e.jsx(w,{children:e.jsxs($,{variant:"ghost",style:{position:"relative"},children:["🔔",e.jsx("div",{style:{position:"absolute",top:"-2px",right:"-2px",width:"8px",height:"8px",backgroundColor:"#ef4444",borderRadius:"50%"}})]})}),e.jsxs(M,{style:{minWidth:"320px"},children:[e.jsx(f,{children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[e.jsx(l,{size:"2",weight:"medium",children:"Notifications"}),e.jsx(l,{size:"1",color:"blue",style:{cursor:"pointer"},children:"Mark all read"})]})}),e.jsx(p,{}),e.jsxs("div",{style:{maxHeight:"300px",overflowY:"auto"},children:[e.jsx(t,{style:{padding:"12px"},children:e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("div",{style:{fontSize:"16px"},children:"💬"}),e.jsxs("div",{style:{flex:1},children:[e.jsx(l,{size:"2",weight:"medium",style:{display:"block"},children:"New comment on your post"}),e.jsx(l,{size:"1",color:"gray",children:'Sarah commented: "Great work on this feature!"'}),e.jsx(l,{size:"1",color:"gray",style:{marginTop:"4px"},children:"2 minutes ago"})]})]})}),e.jsx(t,{style:{padding:"12px"},children:e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("div",{style:{fontSize:"16px"},children:"✅"}),e.jsxs("div",{style:{flex:1},children:[e.jsx(l,{size:"2",weight:"medium",style:{display:"block"},children:"Task completed"}),e.jsx(l,{size:"1",color:"gray",children:'"Update user dashboard" has been marked as complete'}),e.jsx(l,{size:"1",color:"gray",style:{marginTop:"4px"},children:"1 hour ago"})]})]})}),e.jsx(t,{style:{padding:"12px"},children:e.jsxs("div",{style:{display:"flex",gap:"8px"},children:[e.jsx("div",{style:{fontSize:"16px"},children:"🎉"}),e.jsxs("div",{style:{flex:1},children:[e.jsx(l,{size:"2",weight:"medium",style:{display:"block"},children:"Welcome to the team!"}),e.jsx(l,{size:"1",color:"gray",children:`You've been added to the "Frontend Development" team`}),e.jsx(l,{size:"1",color:"gray",style:{marginTop:"4px"},children:"3 hours ago"})]})]})})]}),e.jsx(p,{}),e.jsx(t,{style:{textAlign:"center"},children:e.jsx(l,{size:"2",color:"blue",children:"View all notifications"})})]})]})},W={render:n=>{const[o,r]=a.useState("en"),d={en:{flag:"🇺🇸",name:"English"},es:{flag:"🇪🇸",name:"Español"},fr:{flag:"🇫🇷",name:"Français"},de:{flag:"🇩🇪",name:"Deutsch"},zh:{flag:"🇨🇳",name:"中文"},ja:{flag:"🇯🇵",name:"日本語"}};return e.jsxs(x,{children:[e.jsx(w,{children:e.jsxs(v,{variant:"outline",size:"2",children:[d[o].flag," ",d[o].name]})}),e.jsxs(M,{style:{minWidth:"160px"},children:[e.jsx(f,{children:"Choose Language"}),e.jsx(p,{}),e.jsx(_,{value:o,onValueChange:r,children:Object.entries(d).map(([s,i])=>e.jsxs(j,{value:s,children:[i.flag," ",i.name]},s))})]})]})}},F={render:n=>{const[o,r]=a.useState("date"),[d,s]=a.useState(!0),[i,u]=a.useState(!0);return e.jsxs(x,{children:[e.jsx(w,{children:e.jsx(v,{variant:"outline",children:"🔧 Sort & Filter"})}),e.jsxs(M,{style:{minWidth:"200px"},children:[e.jsx(f,{children:"Sort by"}),e.jsxs(_,{value:o,onValueChange:r,children:[e.jsx(j,{value:"date",children:"📅 Date Created"}),e.jsx(j,{value:"name",children:"📝 Name"}),e.jsx(j,{value:"size",children:"📏 Size"}),e.jsx(j,{value:"modified",children:"🔄 Last Modified"})]}),e.jsx(p,{}),e.jsx(f,{children:"Show items"}),e.jsx(S,{checked:d,onCheckedChange:s,children:"✅ Completed"}),e.jsx(S,{checked:i,onCheckedChange:u,children:"⏳ Pending"}),e.jsx(p,{}),e.jsx(t,{children:"🔄 Reset Filters"})]})]})}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  render: _args => <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">Options ▼</Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
        <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item>Archive</DropdownMenu.Item>
        <DropdownMenu.Item color="red">Delete</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
}`,...k.parameters?.docs?.source}}};z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
  render: _args => <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="ghost" style={{
        padding: "8px"
      }}>
          <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px"
        }}>
            <div style={{
            width: "32px",
            height: "32px",
            backgroundColor: "#3b82f6",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "14px",
            fontWeight: "bold"
          }}>
              JD
            </div>
            <Text size="2">John Doe</Text>
          </div>
        </Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content style={{
      minWidth: "200px"
    }}>
        <DropdownMenu.Label>
          <div style={{
          padding: "4px 0"
        }}>
            <Text size="2" weight="medium">
              John Doe
            </Text>
            <Text size="1" color="gray" style={{
            display: "block"
          }}>
              john@example.com
            </Text>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />

        <DropdownMenu.Item>👤 Profile</DropdownMenu.Item>
        <DropdownMenu.Item>⚙️ Settings</DropdownMenu.Item>
        <DropdownMenu.Item>💳 Billing</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Item>👥 Team</DropdownMenu.Item>
        <DropdownMenu.Item>📊 Analytics</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Item>❓ Help & Support</DropdownMenu.Item>
        <DropdownMenu.Item>📋 Changelog</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Item color="red">🚪 Sign out</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
}`,...z.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  render: _args => <div style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px",
    border: "1px solid #e1e5e9",
    borderRadius: "8px"
  }}>
      <div style={{
      fontSize: "24px"
    }}>📄</div>
      <div style={{
      flex: 1
    }}>
        <Text size="2" weight="medium">
          project-proposal.pdf
        </Text>
        <Text size="1" color="gray" style={{
        display: "block"
      }}>
          2.4 MB • Modified 2 hours ago
        </Text>
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost" size="1">
            ⋯
          </IconButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item>📂 Open</DropdownMenu.Item>
          <DropdownMenu.Item>📥 Download</DropdownMenu.Item>
          <DropdownMenu.Item>👁️ Preview</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>📋 Copy Link</DropdownMenu.Item>
          <DropdownMenu.Item>🔗 Share</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>✏️ Rename</DropdownMenu.Item>
          <DropdownMenu.Item>📁 Move</DropdownMenu.Item>
          <DropdownMenu.Item>📄 Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item color="red">🗑️ Delete</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
}`,...A.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  render: _args => <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button variant="outline">Create New ▼</Button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.Item>📄 Document</DropdownMenu.Item>
        <DropdownMenu.Item>📊 Spreadsheet</DropdownMenu.Item>
        <DropdownMenu.Item>🎨 Presentation</DropdownMenu.Item>
        <DropdownMenu.Separator />

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>📁 Folder</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>📂 Regular Folder</DropdownMenu.Item>
            <DropdownMenu.Item>🔒 Private Folder</DropdownMenu.Item>
            <DropdownMenu.Item>👥 Shared Folder</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Sub>
          <DropdownMenu.SubTrigger>🎯 Project</DropdownMenu.SubTrigger>
          <DropdownMenu.SubContent>
            <DropdownMenu.Item>💻 Web Project</DropdownMenu.Item>
            <DropdownMenu.Item>📱 Mobile Project</DropdownMenu.Item>
            <DropdownMenu.Item>🖥️ Desktop Project</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>📋 From Template</DropdownMenu.Item>
          </DropdownMenu.SubContent>
        </DropdownMenu.Sub>

        <DropdownMenu.Separator />
        <DropdownMenu.Item>📤 Import</DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
}`,...B.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  render: _args => <Flex gap="6" align="center">
      <Text size="3" weight="bold">
        MyApp
      </Text>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost">Products ▼</Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item>💻 Desktop App</DropdownMenu.Item>
          <DropdownMenu.Item>📱 Mobile App</DropdownMenu.Item>
          <DropdownMenu.Item>🌐 Web Platform</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>🔧 Developer Tools</DropdownMenu.Item>
          <DropdownMenu.Item>📊 Analytics</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>🎯 Enterprise Solutions</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="ghost">Resources ▼</Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Item>📚 Documentation</DropdownMenu.Item>
          <DropdownMenu.Item>🎓 Tutorials</DropdownMenu.Item>
          <DropdownMenu.Item>💡 Examples</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>📝 Blog</DropdownMenu.Item>
          <DropdownMenu.Item>🎙️ Podcast</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>👥 Community</DropdownMenu.Item>
          <DropdownMenu.Item>💬 Discord</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
}`,...E.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const [theme, setTheme] = React.useState("light");
    const [notifications, setNotifications] = React.useState(true);
    const [autoSave, setAutoSave] = React.useState(false);
    return <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton variant="ghost">⚙️</IconButton>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Label>Display Settings</DropdownMenu.Label>

          <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
            <DropdownMenu.RadioItem value="light">
              ☀️ Light Mode
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="dark">
              🌙 Dark Mode
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="auto">
              🔄 Auto
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Separator />
          <DropdownMenu.Label>Preferences</DropdownMenu.Label>

          <DropdownMenu.CheckboxItem checked={notifications} onCheckedChange={setNotifications}>
            🔔 Enable Notifications
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.CheckboxItem checked={autoSave} onCheckedChange={setAutoSave}>
            💾 Auto-save
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator />
          <DropdownMenu.Item>⚙️ Advanced Settings</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>;
  }
}`,...L.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
                User
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
            <th style={{
            padding: "12px",
            border: "1px solid #e1e5e9",
            width: "60px"
          }} />
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{
            padding: "12px",
            border: "1px solid #e1e5e9"
          }}>
              <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}>
                <div style={{
                width: "32px",
                height: "32px",
                backgroundColor: "#e1e5e9",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                  <Text size="1" weight="bold">
                    JD
                  </Text>
                </div>
                <div>
                  <Text size="2" weight="medium">
                    John Doe
                  </Text>
                  <Text size="1" color="gray" style={{
                  display: "block"
                }}>
                    john@example.com
                  </Text>
                </div>
              </div>
            </td>
            <td style={{
            padding: "12px",
            border: "1px solid #e1e5e9"
          }}>
              <Text size="2">Admin</Text>
            </td>
            <td style={{
            padding: "12px",
            border: "1px solid #e1e5e9"
          }}>
              <Text size="2" color="green">
                Active
              </Text>
            </td>
            <td style={{
            padding: "12px",
            border: "1px solid #e1e5e9",
            textAlign: "center"
          }}>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <IconButton variant="ghost" size="1">
                    ⋯
                  </IconButton>
                </DropdownMenu.Trigger>

                <DropdownMenu.Content>
                  <DropdownMenu.Item>👁️ View Profile</DropdownMenu.Item>
                  <DropdownMenu.Item>✏️ Edit User</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>🔄 Reset Password</DropdownMenu.Item>
                  <DropdownMenu.Item>📧 Send Email</DropdownMenu.Item>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger>
                      👤 Change Role
                    </DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent>
                      <DropdownMenu.Item>Admin</DropdownMenu.Item>
                      <DropdownMenu.Item>Editor</DropdownMenu.Item>
                      <DropdownMenu.Item>Viewer</DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Sub>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item color="red">
                    🚫 Deactivate
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
}`,...O.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  render: _args => <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <IconButton variant="ghost" style={{
        position: "relative"
      }}>
          🔔
          <div style={{
          position: "absolute",
          top: "-2px",
          right: "-2px",
          width: "8px",
          height: "8px",
          backgroundColor: "#ef4444",
          borderRadius: "50%"
        }} />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content style={{
      minWidth: "320px"
    }}>
        <DropdownMenu.Label>
          <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
            <Text size="2" weight="medium">
              Notifications
            </Text>
            <Text size="1" color="blue" style={{
            cursor: "pointer"
          }}>
              Mark all read
            </Text>
          </div>
        </DropdownMenu.Label>
        <DropdownMenu.Separator />

        <div style={{
        maxHeight: "300px",
        overflowY: "auto"
      }}>
          <DropdownMenu.Item style={{
          padding: "12px"
        }}>
            <div style={{
            display: "flex",
            gap: "8px"
          }}>
              <div style={{
              fontSize: "16px"
            }}>💬</div>
              <div style={{
              flex: 1
            }}>
                <Text size="2" weight="medium" style={{
                display: "block"
              }}>
                  New comment on your post
                </Text>
                <Text size="1" color="gray">
                  Sarah commented: "Great work on this feature!"
                </Text>
                <Text size="1" color="gray" style={{
                marginTop: "4px"
              }}>
                  2 minutes ago
                </Text>
              </div>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item style={{
          padding: "12px"
        }}>
            <div style={{
            display: "flex",
            gap: "8px"
          }}>
              <div style={{
              fontSize: "16px"
            }}>✅</div>
              <div style={{
              flex: 1
            }}>
                <Text size="2" weight="medium" style={{
                display: "block"
              }}>
                  Task completed
                </Text>
                <Text size="1" color="gray">
                  "Update user dashboard" has been marked as complete
                </Text>
                <Text size="1" color="gray" style={{
                marginTop: "4px"
              }}>
                  1 hour ago
                </Text>
              </div>
            </div>
          </DropdownMenu.Item>

          <DropdownMenu.Item style={{
          padding: "12px"
        }}>
            <div style={{
            display: "flex",
            gap: "8px"
          }}>
              <div style={{
              fontSize: "16px"
            }}>🎉</div>
              <div style={{
              flex: 1
            }}>
                <Text size="2" weight="medium" style={{
                display: "block"
              }}>
                  Welcome to the team!
                </Text>
                <Text size="1" color="gray">
                  You've been added to the "Frontend Development" team
                </Text>
                <Text size="1" color="gray" style={{
                marginTop: "4px"
              }}>
                  3 hours ago
                </Text>
              </div>
            </div>
          </DropdownMenu.Item>
        </div>

        <DropdownMenu.Separator />
        <DropdownMenu.Item style={{
        textAlign: "center"
      }}>
          <Text size="2" color="blue">
            View all notifications
          </Text>
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
}`,...G.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const [language, setLanguage] = React.useState("en");
    const languages = {
      en: {
        flag: "🇺🇸",
        name: "English"
      },
      es: {
        flag: "🇪🇸",
        name: "Español"
      },
      fr: {
        flag: "🇫🇷",
        name: "Français"
      },
      de: {
        flag: "🇩🇪",
        name: "Deutsch"
      },
      zh: {
        flag: "🇨🇳",
        name: "中文"
      },
      ja: {
        flag: "🇯🇵",
        name: "日本語"
      }
    };
    return <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline" size="2">
            {languages[language].flag} {languages[language].name}
          </Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content style={{
        minWidth: "160px"
      }}>
          <DropdownMenu.Label>Choose Language</DropdownMenu.Label>
          <DropdownMenu.Separator />

          <DropdownMenu.RadioGroup value={language} onValueChange={setLanguage}>
            {Object.entries(languages).map(([code, lang]) => <DropdownMenu.RadioItem key={code} value={code}>
                {lang.flag} {lang.name}
              </DropdownMenu.RadioItem>)}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>;
  }
}`,...W.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  render: _args => {
    const [sortBy, setSortBy] = React.useState("date");
    const [showCompleted, setShowCompleted] = React.useState(true);
    const [showPending, setShowPending] = React.useState(true);
    return <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="outline">🔧 Sort & Filter</Button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content style={{
        minWidth: "200px"
      }}>
          <DropdownMenu.Label>Sort by</DropdownMenu.Label>

          <DropdownMenu.RadioGroup value={sortBy} onValueChange={setSortBy}>
            <DropdownMenu.RadioItem value="date">
              📅 Date Created
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="name">
              📝 Name
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="size">
              📏 Size
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="modified">
              🔄 Last Modified
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>

          <DropdownMenu.Separator />
          <DropdownMenu.Label>Show items</DropdownMenu.Label>

          <DropdownMenu.CheckboxItem checked={showCompleted} onCheckedChange={setShowCompleted}>
            ✅ Completed
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.CheckboxItem checked={showPending} onCheckedChange={setShowPending}>
            ⏳ Pending
          </DropdownMenu.CheckboxItem>

          <DropdownMenu.Separator />
          <DropdownMenu.Item>🔄 Reset Filters</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>;
  }
}`,...F.parameters?.docs?.source}}};const qn=["Default","UserMenu","FileActionsMenu","WithSubmenus","NavigationMenu","SettingsMenu","TableRowActions","NotificationDropdown","LanguageSelector","SortAndFilterMenu"];export{k as Default,A as FileActionsMenu,W as LanguageSelector,E as NavigationMenu,G as NotificationDropdown,L as SettingsMenu,F as SortAndFilterMenu,O as TableRowActions,z as UserMenu,B as WithSubmenus,qn as __namedExportsOrder,Yn as default};
